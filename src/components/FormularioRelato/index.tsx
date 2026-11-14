import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import CampoFormulario from '../CampoFormulario'
import CaixaAviso from '../CaixaAviso'
import { cadastrarRelato } from '../../services/api'
import { obterCodigoDispositivo } from '../../utils/dispositivo'
import { classeInput } from '../../utils/estilos'
import { PERFIS, TIPOS_PROBLEMA } from '../../utils/rotulos'
import type { Aviso, PerfilAfetado, Relato, TipoProblema, Trecho } from '../../types'

interface RelatoFormData {
  idTrecho: string
  tipoProblema: TipoProblema | ''
  perfilAfetado: PerfilAfetado | ''
  descricao: string
}

interface FormularioRelatoProps {
  trechos: Trecho[]
  trechoInicial?: string
}

export default function FormularioRelato({ trechos, trechoInicial }: FormularioRelatoProps) {
  const [criado, setCriado] = useState<Relato | null>(null)
  const [aviso, setAviso] = useState<Aviso | null>(null)

  // Só pré-seleciona o trecho se o id da URL existir mesmo na lista
  const trechoPadrao = trechos.some((t) => String(t.id) === trechoInicial) ? (trechoInicial ?? '') : ''

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RelatoFormData>({
    defaultValues: { idTrecho: trechoPadrao, tipoProblema: '', perfilAfetado: '', descricao: '' },
  })

  async function onSubmit(dados: RelatoFormData) {
    if (!dados.tipoProblema || !dados.perfilAfetado) return

    setAviso(null)
    setCriado(null)
    try {
      const relato = await cadastrarRelato(Number(dados.idTrecho), {
        tipoProblema: dados.tipoProblema,
        perfilAfetado: dados.perfilAfetado,
        descricao: dados.descricao.trim(),
        codigoDispositivo: obterCodigoDispositivo(),
      })
      setCriado(relato)
      // Mantém o trecho escolhido, caso a pessoa queira relatar outro problema na mesma rua
      reset({ idTrecho: dados.idTrecho, tipoProblema: '', perfilAfetado: '', descricao: '' })
    } catch (e) {
      setAviso({ tipo: 'erro', texto: (e as Error).message })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-xl space-y-4">
      <CampoFormulario id="idTrecho" label="Trecho (rua)" erro={errors.idTrecho?.message}>
        <select
          id="idTrecho"
          className={classeInput}
          aria-invalid={Boolean(errors.idTrecho)}
          aria-describedby={errors.idTrecho ? 'idTrecho-erro' : undefined}
          {...register('idTrecho', { required: 'Escolha o trecho do problema.' })}
        >
          <option value="">Selecione um trecho</option>
          {trechos.map((trecho) => (
            <option key={trecho.id} value={trecho.id}>
              {trecho.nomeRua} · {trecho.bairro}
            </option>
          ))}
        </select>
      </CampoFormulario>

      <CampoFormulario id="tipoProblema" label="Tipo de problema" erro={errors.tipoProblema?.message}>
        <select
          id="tipoProblema"
          className={classeInput}
          aria-invalid={Boolean(errors.tipoProblema)}
          aria-describedby={errors.tipoProblema ? 'tipoProblema-erro' : undefined}
          {...register('tipoProblema', { required: 'Escolha o tipo de problema.' })}
        >
          <option value="">Selecione</option>
          {Object.entries(TIPOS_PROBLEMA).map(([valor, rotulo]) => (
            <option key={valor} value={valor}>
              {rotulo}
            </option>
          ))}
        </select>
      </CampoFormulario>

      <CampoFormulario id="perfilAfetado" label="Quem é mais afetado?" erro={errors.perfilAfetado?.message}>
        <select
          id="perfilAfetado"
          className={classeInput}
          aria-invalid={Boolean(errors.perfilAfetado)}
          aria-describedby={errors.perfilAfetado ? 'perfilAfetado-erro' : undefined}
          {...register('perfilAfetado', { required: 'Informe quem é mais afetado.' })}
        >
          <option value="">Selecione</option>
          {Object.entries(PERFIS).map(([valor, rotulo]) => (
            <option key={valor} value={valor}>
              {rotulo}
            </option>
          ))}
        </select>
      </CampoFormulario>

      <CampoFormulario id="descricao" label="O que você encontrou?" erro={errors.descricao?.message}>
        <textarea
          id="descricao"
          rows={4}
          className={classeInput}
          aria-invalid={Boolean(errors.descricao)}
          aria-describedby={errors.descricao ? 'descricao-erro' : undefined}
          {...register('descricao', {
            required: 'Descreva o problema.',
            validate: (valor) =>
              valor.trim().length >= 10 || 'A descrição precisa ter pelo menos 10 caracteres.',
            maxLength: { value: 500, message: 'A descrição pode ter no máximo 500 caracteres.' },
          })}
        />
      </CampoFormulario>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar relato'}
      </button>

      <CaixaAviso aviso={aviso} />

      {criado && (
        <p role="status" className="rounded bg-primary-bg p-3 text-primary-dark">
          Relato enviado! Obrigado por ajudar.{' '}
          <Link to={`/trechos/${criado.idTrecho}`} className="font-semibold underline">
            Ver o trecho
          </Link>
        </p>
      )}
    </form>
  )
}