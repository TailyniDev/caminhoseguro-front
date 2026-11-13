import type { ReactNode } from 'react'

interface CampoFormularioProps {
  id: string
  label: string
  erro?: string
  children: ReactNode
}

export default function CampoFormulario({ id, label, erro, children }: CampoFormularioProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-800">
        {label}
      </label>
      {children}
      {erro && (
        <p id={`${id}-erro`} role="alert" className="text-sm text-red-600">
          {erro}
        </p>
      )}
    </div>
  )
}