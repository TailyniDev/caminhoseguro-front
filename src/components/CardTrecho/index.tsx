import { Link } from 'react-router'
import { estiloClassificacao } from '../../utils/rotulos'
import type { Trecho } from '../../types'

interface CardTrechoProps {
  trecho: Trecho
}

export default function CardTrecho({ trecho }: CardTrechoProps) {
  const classificacao = estiloClassificacao(trecho.classificacao)

  return (
    <li>
      <Link
        to={`/trechos/${trecho.id}`}
        className="flex h-full flex-col justify-between gap-3 rounded border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
      >
        <div>
          <h2 className="break-words font-semibold">{trecho.nomeRua}</h2>
          <p className="break-words text-sm text-slate-600">
            {trecho.bairro} · {trecho.cidade}
          </p>
        </div>

        <div className="space-y-2">
          <span className={`inline-block rounded px-2 py-1 text-sm font-medium ${classificacao.classe}`}>
            Nota {trecho.notaAcessibilidade}/100 · {classificacao.rotulo}
          </span>
          <p className="text-sm text-slate-600">
            {trecho.qtRelatosConfirmados} confirmado(s) · {trecho.qtRelatosPendentes} pendente(s)
          </p>
        </div>
      </Link>
    </li>
  )
}
