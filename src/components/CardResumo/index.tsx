interface CardResumoProps {
  titulo: string
  valor: number
}

export default function CardResumo({ titulo, valor }: CardResumoProps) {
  return (
    <div className="rounded border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-600">{titulo}</p>
      <p className="mt-1 text-3xl font-bold text-primary">{valor}</p>
    </div>
  )
}