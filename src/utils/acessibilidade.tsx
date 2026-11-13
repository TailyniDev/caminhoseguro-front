interface ClasseNota {
  rotulo: string
  classe: string
}

// Além da cor, o texto ("Boa", "Parcial", "Baixa") informa o nível: a cor sozinha não basta para acessibilidade.
export function classificarNota(nota: number | null): ClasseNota {
  if (nota === null) return { rotulo: 'Sem nota', classe: 'bg-slate-100 text-slate-700' }
  if (nota >= 7) return { rotulo: 'Boa', classe: 'bg-primary-bg text-primary-dark' }
  if (nota >= 5) return { rotulo: 'Parcial', classe: 'bg-alerta-bg text-amber-900' }
  return { rotulo: 'Baixa', classe: 'bg-red-100 text-red-800' }
}