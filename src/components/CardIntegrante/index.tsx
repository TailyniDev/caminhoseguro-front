import { ExternalLink } from 'lucide-react'

export interface Integrante {
  nome: string
  rm: string
  turma?: string
  funcao?: string
  foto?: string
  github?: string
  linkedin?: string
}

interface CardIntegranteProps {
  integrante: Integrante
  corAvatar: string
}

// Primeira letra do primeiro e do último nome: "Sabrina Fraga Lima" vira "SL"
function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/)
  const primeira = partes[0]?.[0] ?? ''
  const ultima = partes.length > 1 ? (partes[partes.length - 1]?.[0] ?? '') : ''
  return (primeira + ultima).toUpperCase()
}

export default function CardIntegrante({ integrante, corAvatar }: CardIntegranteProps) {
  const { nome, rm, turma, funcao, foto, github, linkedin } = integrante

  return (
    <li className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
      {foto ? (
        <img
          src={foto}
          alt={`Foto de ${nome}`}
          loading="lazy"
          className="h-24 w-24 rounded-full border-4 border-primary-bg object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className={`flex h-24 w-24 items-center justify-center rounded-full border-4 border-primary-bg text-3xl font-bold text-white ${corAvatar}`}
        >
          {iniciais(nome)}
        </div>
      )}

      <h2 className="mt-4 break-words text-lg font-semibold">{nome}</h2>
      {funcao && <p className="mt-1 text-sm font-medium text-primary">{funcao}</p>}

      <div className="mt-3 flex flex-wrap justify-center gap-2 text-sm">
        <span className="rounded-full bg-primary-bg px-3 py-1 font-medium text-primary-dark">RM {rm}</span>
        {turma && <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{turma}</span>}
      </div>

      {(github || linkedin) && (
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary underline"
            >
              GitHub
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              <span className="sr-only">de {nome} (abre em nova aba)</span>
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary underline"
            >
              LinkedIn
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              <span className="sr-only">de {nome} (abre em nova aba)</span>
            </a>
          )}
        </div>
      )}
    </li>
  )
}