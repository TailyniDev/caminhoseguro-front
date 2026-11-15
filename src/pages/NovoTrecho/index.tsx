import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import TituloPagina from '../../components/TituloPagina'
import CampoFormulario from '../../components/CampoFormulario'
import CaixaAviso from '../../components/CaixaAviso'
import SeletorLocalizacao from '../../components/SeletorLocalizacao'
import { cadastrarTrecho } from '../../services/api'
import { classeInput } from '../../utils/estilos'
import type { Aviso, Trecho } from '../../types'

interface TrechoFormData {
  nomeRua: string
  bairro: string
  cidade: string
}

interface Ponto {
  latitude: number
  longitude: number
}

export default function NovoTrecho() {
  const [criado, setCriado] = useState<Trecho | null>(null)
  const [aviso, setAviso] = useState<Aviso | null>(null)
  const [ponto, setPonto] = useState<Ponto | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TrechoFormData>({ defaultValues: { nomeRua: '', bairro: '', cidade: '' } })

  // A coluna do banco guarda 6 casas decimais
  function escolherPonto(latitude: number, longitude: number) {
    setPonto({ latitude: Number(latitude.toFixed(6)), longitude: Number(longitude.toFixed(6)) })
  }

  async function onSubmit(dados: TrechoFormData) {
    setAviso(null)
    setCriado(null)
    try {
      const trecho = await cadastrarTrecho({
        nomeRua: dados.nomeRua.trim(),
        bairro: dados.bairro.trim(),
        cidade: dados.cidade.trim(),
        ...(ponto ?? {}),
      })
      setCriado(trecho)
      reset()
      setPonto(null)
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

        <div>
          <p className="mb-1 text-sm font-medium text-slate-800">Localização no mapa (opcional)</p>
          <p className="mb-2 text-sm text-slate-600">
            Clique no mapa para marcar onde fica o trecho. Sem localização, ele aparece só na lista.
          </p>
          <SeletorLocalizacao latitude={ponto?.latitude} longitude={ponto?.longitude} aoEscolher={escolherPonto} />
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-700">
            <span role="status">
              {ponto
                ? `Ponto marcado: ${ponto.latitude}, ${ponto.longitude}`
                : 'Nenhum ponto marcado.'}
            </span>
            {ponto && (
              <button
                type="button"
                onClick={() => setPonto(null)}
                className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100"
              >
                Remover localização
              </button>
            )}
          </div>
        </div>

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