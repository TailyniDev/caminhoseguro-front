import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import TituloPagina from '../../components/TituloPagina'
import CampoFormulario from '../../components/CampoFormulario'
import CaixaAviso from '../../components/CaixaAviso'
import { cadastrarTrecho } from '../../services/api'
import { classeInput } from '../../utils/estilos'
import type { Aviso, NovoTrecho as NovoTrechoDados, Trecho } from '../../types'

export default function NovoTrecho() {
  const [criado, setCriado] = useState<Trecho | null>(null)
  const [aviso, setAviso] = useState<Aviso | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NovoTrechoDados>({ defaultValues: { nomeRua: '', bairro: '', cidade: '' } })

  async function onSubmit(dados: NovoTrechoDados) {
    setAviso(null)
    setCriado(null)
    try {
      const trecho = await cadastrarTrecho({
        nomeRua: dados.nomeRua.trim(),
        bairro: dados.bairro.trim(),
        cidade: dados.cidade.trim(),
      })
      setCriado(trecho)
      reset()
    } catch (e) {
      // Ex.: 409 quando o trecho já existe
      setAviso({ tipo: 'erro', texto: (e as Error).message })
    }
  }

  return (
    <section>
      <Link to="/trechos" className="text-sm text-primary underline">
        ← Voltar para Trechos
      </Link>

      <div className="mt-4">
        <TituloPagina
          titulo="Cadastrar trecho"
          subtitulo="Não encontrou a rua que queria relatar? Cadastre o trecho para que ele apareça no mapa."
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-xl space-y-4">
        <CampoFormulario id="nomeRua" label="Rua" erro={errors.nomeRua?.message}>
          <input
            id="nomeRua"
            type="text"
            className={classeInput}
            aria-invalid={Boolean(errors.nomeRua)}
            aria-describedby={errors.nomeRua ? 'nomeRua-erro' : undefined}
            {...register('nomeRua', {
              validate: (valor) => valor.trim().length > 0 || 'Informe o nome da rua.',
              maxLength: { value: 120, message: 'A rua pode ter no máximo 120 caracteres.' },
            })}
          />
        </CampoFormulario>

        <CampoFormulario id="bairro" label="Bairro" erro={errors.bairro?.message}>
          <input
            id="bairro"
            type="text"
            className={classeInput}
            aria-invalid={Boolean(errors.bairro)}
            aria-describedby={errors.bairro ? 'bairro-erro' : undefined}
            {...register('bairro', {
              validate: (valor) => valor.trim().length > 0 || 'Informe o bairro.',
              maxLength: { value: 80, message: 'O bairro pode ter no máximo 80 caracteres.' },
            })}
          />
        </CampoFormulario>

        <CampoFormulario id="cidade" label="Cidade" erro={errors.cidade?.message}>
          <input
            id="cidade"
            type="text"
            className={classeInput}
            aria-invalid={Boolean(errors.cidade)}
            aria-describedby={errors.cidade ? 'cidade-erro' : undefined}
            {...register('cidade', {
              validate: (valor) => valor.trim().length > 0 || 'Informe a cidade.',
              maxLength: { value: 80, message: 'A cidade pode ter no máximo 80 caracteres.' },
            })}
          />
        </CampoFormulario>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar trecho'}
        </button>

        <CaixaAviso aviso={aviso} />

        {criado && (
          <p role="status" className="rounded bg-primary-bg p-3 text-primary-dark">
            Trecho cadastrado!{' '}
            <Link to={`/trechos/${criado.id}`} className="font-semibold underline">
              Ver {criado.nomeRua}
            </Link>
          </p>
        )}
      </form>
    </section>
  )
}