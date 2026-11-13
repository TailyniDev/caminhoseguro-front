import { Link } from 'react-router'
import { classificarNota } from '../../utils/acessibilidade'
import type { Local } from '../../types'

interface CardLocalProps {
  local: Local
}

export default function CardLocal({ local }: CardLocalProps) {
  const nota = classificarNota(local.notaAcessibilidade)

  return (
    <li>
      <Link
        to={`/locais/${local.id}`}
        className="flex h-full flex-col justify-between gap-3 rounded border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
      >
        <div>
          <h2 className="font-semibold">{local.nome}</h2>
          <p className="text-sm text-slate-600">{local.endereco}</p>
        </div>
        <span className={`w-fit rounded px-2 py-1 text-sm font-medium ${nota.classe}`}>
          Acessibilidade:{' '}
          {local.notaAcessibilidade !== null ? local.notaAcessibilidade.toFixed(1) : '—'} ·{' '}
          {nota.rotulo}
        </span>
      </Link>
    </li>
  )
}