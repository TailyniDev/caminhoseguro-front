interface ItemGrafico {
  rotulo: string
  valor: number
  cor: string
}

interface GraficoBarrasProps {
  itens: ItemGrafico[]
}

// Gráfico de barras horizontais feito só com CSS. O número fica visível, então não depende da cor.
export default function GraficoBarras({ itens }: GraficoBarrasProps) {
  const total = itens.reduce((soma, item) => soma + item.valor, 0)

  return (
    <ul className="space-y-3">
      {itens.map((item) => {
        const percentual = total === 0 ? 0 : Math.round((item.valor / total) * 100)
        return (
          <li key={item.rotulo}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium">{item.rotulo}</span>
              <span className="text-slate-600">
                {item.valor} ({percentual}%)
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded bg-slate-200" aria-hidden="true">
              <div className={`h-full rounded ${item.cor}`} style={{ width: `${percentual}%` }} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}