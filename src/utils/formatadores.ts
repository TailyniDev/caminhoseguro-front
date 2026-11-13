// Formata "2026-09-03" (ou "2026-09-03T10:00:00") como "03/09/2026", sem passar por Date para não deslocar o dia por fuso.
export function formatarData(data: string): string {
  const [ano, mes, dia] = data.slice(0, 10).split('-')
  if (!ano || !mes || !dia) return data
  return `${dia}/${mes}/${ano}`
}