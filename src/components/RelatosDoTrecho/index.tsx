import { useEffect, useState } from 'react'
import Carregando from '../Carregando'
import MensagemErro from '../MensagemErro'
import { listarRelatosDoTrecho } from '../../services/api'
import { formatarData } from '../../utils/formatadores'
import { PERFIS, TIPOS_PROBLEMA, estiloStatus, rotuloDe } from '../../utils/rotulos'
import type { Relato } from '../../types'

interface RelatosDoTrechoProps {
  idTrecho: number
  versao: number
  emResolucao: number | null
  aoResolver: (relato: Relato) => void
}

// Lista os relatos em aberto de um trecho. Só relatos Confirmados podem ser marcados como resolvidos.
export default function RelatosDoTrecho({ idTrecho, versao, emResolucao, aoResolver }: RelatosDoTrechoProps) {
  const [relatos, setRelatos] = useState<Relato[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ativo = true

    listarRelatosDoTrecho(idTrecho)
      .then((dados) => {
        if (ativo) setRelatos(dados)
      })
      .catch((e: Error) => {
        if (ativo) setErro(e.message)
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [idTrecho, versao, tentativa])

  function tentarNovamente() {
    setErro('')
    setCarregando(true)
    setTentativa((t) => t + 1)
  }

  function pedirResolucao(relato: Relato) {
    // Relato resolvido não pode mais ser alterado, então pedimos confirmação antes
    if (window.confirm('Marcar este relato como resolvido? Depois disso ele não poderá mais ser alterado.')) {
      aoResolver(relato)
    }
  }

  if (carregando) return <Carregando texto="Carregando relatos..." />
  if (erro) return <MensagemErro mensagem={erro} aoTentarNovamente={tentarNovamente} />

  const abertos = relatos.filter((relato) => relato.status !== 'RESOLVIDO')

  if (abertos.length === 0) {
    return <p className="text-sm text-slate-600">Nenhum relato em aberto neste trecho.</p>
  }

  return (
    <ul className="space-y-3">
      {abertos.map((relato) => {
        const status = estiloStatus(relato.status)
        return (
          <li key={relato.id} className="rounded border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className={`rounded px-2 py-1 text-sm font-medium ${status.classe}`}>{status.rotulo}</span>
              <span className="text-sm text-slate-600">{formatarData(relato.dataRegistro)}</span>
            </div>
            <h4 className="mt-2 break-words font-semibold">{rotuloDe(TIPOS_PROBLEMA, relato.tipoProblema)}</h4>
            <p className="mt-1 break-words text-slate-800">{relato.descricao}</p>
            <p className="mt-1 text-sm text-slate-600">
              Afeta: {rotuloDe(PERFIS, relato.perfilAfetado)} · {relato.qtConfirmacoes} confirmação(ões)
            </p>

            {relato.status === 'CONFIRMADO' ? (
              <button
                type="button"
                onClick={() => pedirResolucao(relato)}
                disabled={emResolucao === relato.id}
                className="mt-3 rounded bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
              >
                {emResolucao === relato.id ? 'Salvando...' : 'Marcar como resolvido'}
              </button>
            ) : (
              <p className="mt-3 text-sm text-slate-600">
                Aguardando a confirmação de 3 pessoas para poder ser marcado como resolvido.
              </p>
            )}
          </li>
        )
      })}
    </ul>
  )
}