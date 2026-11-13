import { formatarData } from '../../utils/formatadores'
import type { Relato, StatusRelato } from '../../types'

const STATUS: Record<StatusRelato, { rotulo: string; classe: string }> = {
  PENDENTE: { rotulo: 'Pendente', classe: 'bg-alerta-bg text-amber-900' },
  CONFIRMADO: { rotulo: 'Confirmado', classe: 'bg-primary-bg text-primary-dark' },
  RESOLVIDO: { rotulo: 'Resolvido', classe: 'bg-slate-200 text-slate-800' },
}

interface CardRelatoProps {
  relato: Relato
}

export default function CardRelato({ relato }: CardRelatoProps) {
  const status = STATUS[relato.status] ?? STATUS.PENDENTE

  return (
    <li className="rounded border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className={`rounded px-2 py-1 text-sm font-medium ${status.classe}`}>
          {status.rotulo}
        </span>
        <span className="text-sm text-slate-600">
          {formatarData(relato.data)} · Gravidade {relato.gravidade}/5
        </span>
      </div>
      <p className="mt-3 text-slate-800">{relato.descricao}</p>
    </li>
  )
}