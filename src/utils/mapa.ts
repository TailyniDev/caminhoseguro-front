import type { Classificacao, Trecho } from '../types'

// Centro padrão do mapa: Suzano - SP, cidade piloto da solução
export const CENTRO_PADRAO: [number, number] = [-23.5445, -46.311]

const CORES: Record<Classificacao, string> = {
  BOA: '#15803d',
  ATENCAO: '#d97706',
  CRITICA: '#dc2626',
}

export function corDaClassificacao(classificacao: string): string {
  return CORES[classificacao as Classificacao] ?? '#64748b'
}

type TrechoComCoordenadas = Trecho & { latitude: number; longitude: number }

// A API omite latitude e longitude quando não foram cadastradas
export function temCoordenadas(trecho: Trecho): trecho is TrechoComCoordenadas {
  return typeof trecho.latitude === 'number' && typeof trecho.longitude === 'number'
}