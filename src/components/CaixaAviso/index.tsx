import type { Aviso } from '../../types'

interface CaixaAvisoProps {
  aviso: Aviso | null
}

export default function CaixaAviso({ aviso }: CaixaAvisoProps) {
  if (!aviso) return null

  const classe =
    aviso.tipo === 'sucesso'
      ? 'bg-primary-bg text-primary-dark'
      : 'border border-red-200 bg-red-50 text-red-800'

  return (
    <p role={aviso.tipo === 'erro' ? 'alert' : 'status'} className={`rounded p-3 ${classe}`}>
      {aviso.texto}
    </p>
  )
}