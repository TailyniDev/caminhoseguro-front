import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import CampoFormulario from '../CampoFormulario'
import MensagemErro from '../MensagemErro'
import { cadastrarRelato } from '../../services/api'
import { classeInput } from '../../utils/estilos'
import type { Local, Relato } from '../../types'

interface RelatoFormData {
  localId: string
  descricao: string
  gravidade: string
}

interface FormularioRelatoProps {
  locais: Local[]
  localInicial?: string
}

const GRAVIDADES = [
  { valor: 1, rotulo: '1 · Leve' },
  { valor: 2, rotulo: '2 · Moderada' },
  { valor: 3, rotulo: '3 · Importante' },
  { valor: 4, rotulo: '4 · Grave' },
  { valor: 5, rotulo: '5 · Crítica' },
]

export default function FormularioRelato({ locais, localInicial }: FormularioRelatoProps) {
  const [criado, setCriado] = useState<Relato | null>(null)
  const [erroApi, setErroApi] = useState('')

  // Só pré-seleciona o local se o id da URL existir mesmo na lista
  const localPadrao = locais.some((l) => String(l.id) === localInicial) ? (localInicial ?? '') : ''

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RelatoFormData>({
    defaultValues: { localId: localPadrao, descricao: '', gravidade: '' },
  })

  async function onSubmit(dados: RelatoFormData) {
    setErroApi('')
    setCriado(null)
    try {
      const relato = await cadastrarRelato({
        localId: Number(dados.localId),
        descricao: dados.descricao.trim(),
        gravidade: Number(dados.gravidade),
      })
      setCriado(relato)
      // Mantém o local escolhido, caso a pessoa queira relatar outro problema no mesmo lugar
      reset({ localId: dados.localId, descricao: '', gravidade: '' })
    } catch (e) {
      setErroApi((e as Error).message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-xl space-y-4">
      <CampoFormulario id="localId" label="Local" erro={errors.localId?.message}>
        <select
          id="localId"
          className={classeInput}
          aria-invalid={Boolean(errors.localId)}
          aria-describedby={errors.localId ? 'localId-erro' : undefined}
          {...register('localId', { required: 'Escolha o local do problema.' })}
        >
          <option value="">Selecione um local</option>
          {locais.map((local) => (
            <option key={local.id} value={local.id}>
              {local.nome}
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
            minLength: { value: 10, message: 'A descrição precisa ter pelo menos 10 caracteres.' },
            maxLength: { value: 300, message: 'A descrição pode ter no máximo 300 caracteres.' },
          })}
        />
      </CampoFormulario>

      <CampoFormulario id="gravidade" label="Gravidade" erro={errors.gravidade?.message}>
        <select
          id="gravidade"
          className={classeInput}
          aria-invalid={Boolean(errors.gravidade)}
          aria-describedby={errors.gravidade ? 'gravidade-erro' : undefined}
          {...register('gravidade', { required: 'Informe a gravidade de 1 a 5.' })}
        >
          <option value="">Selecione</option>
          {GRAVIDADES.map((g) => (
            <option key={g.valor} value={g.valor}>
              {g.rotulo}
            </option>
          ))}
        </select>
      </CampoFormulario>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar relato'}
      </button>

      {erroApi && <MensagemErro mensagem={erroApi} />}

      {criado && (
        <p role="status" className="rounded bg-primary-bg p-3 text-primary-dark">
          Relato enviado! Obrigado por ajudar.{' '}
          <Link to={`/locais/${criado.localId}`} className="font-semibold underline">
            Ver o local
          </Link>
        </p>
      )}
    </form>
  )
}