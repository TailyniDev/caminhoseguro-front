import { formatarData } from '../../utils/formatadores'
import { PERFIS, TIPOS_PROBLEMA, estiloStatus, rotuloDe } from '../../utils/rotulos'
import type { Relato } from '../../types'

interface CardRelatoProps {
  relato: Relato
  mostrarLocal?: boolean
  confirmando?: boolean
  aoConfirmar?: (idRelato: number) => void
}

export default function CardRelato({ relato, mostrarLocal, confirmando, aoConfirmar }: CardRelatoProps) {
  const status = estiloStatus(relato.status)
  const podeConfirmar = aoConfirmar && relato.status !== 'RESOLVIDO'

  return (
    <li className="rounded border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className={`rounded px-2 py-1 text-sm font-medium ${status.classe}`}>{status.rotulo}</span>
        <span className="text-sm text-slate-600">{formatarData(relato.dataRegistro)}</span>
      </div>

      <h3 className="mt-3 font-semibold">{rotuloDe(TIPOS_PROBLEMA, relato.tipoProblema)}</h3>
      {mostrarLocal && (
        <p className="text-sm text-slate-600">
          {relato.nomeRua} · {relato.bairro}
        </p>
      )}
      <p className="mt-2 text-slate-800">{relato.descricao}</p>
      <p className="mt-2 text-sm text-slate-600">
        Afeta: {rotuloDe(PERFIS, relato.perfilAfetado)} · {relato.qtConfirmacoes} confirmação(ões)
      </p>

      {podeConfirmar && (
        <button
          type="button"
          onClick={() => aoConfirmar(relato.id)}
          disabled={confirmando}
          className="mt-3 rounded border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-bg disabled:opacity-60"
        >
          {confirmando ? 'Confirmando...' : 'Também vi esse problema'}
        </button>
      )}
    </li>
  )
}