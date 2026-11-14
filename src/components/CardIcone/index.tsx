import type { LucideIcon } from 'lucide-react'

interface CardIconeProps {
  icone: LucideIcon
  titulo: string
  texto: string
}

// Cartão com ícone, título e texto curto. Reaproveitável em qualquer página.
export default function CardIcone({ icone: Icone, titulo, texto }: CardIconeProps) {
  return (
    <li className="rounded-xl border border-slate-200 bg-white p-5">
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-bg">
        <Icone aria-hidden="true" className="h-6 w-6 text-primary" />
      </span>
      <h3 className="mt-3 font-semibold">{titulo}</h3>
      <p className="mt-1 text-sm text-slate-700">{texto}</p>
    </li>
  )
}