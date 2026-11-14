import type { ReactNode } from 'react'

interface MensagemVaziaProps {
  texto: string
  children?: ReactNode
}

export default function MensagemVazia({ texto, children }: MensagemVaziaProps) {
  return (
    <div className="rounded border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
      <p>{texto}</p>
      {children}
    </div>
  )
}