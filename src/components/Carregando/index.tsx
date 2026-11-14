interface CarregandoProps {
  texto?: string
}

export default function Carregando({ texto = 'Carregando...' }: CarregandoProps) {
  return (
    <div role="status" className="flex items-center gap-3 py-8 text-slate-700">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <span>{texto}</span>
    </div>
  )
}