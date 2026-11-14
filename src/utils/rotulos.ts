import type { Classificacao, PerfilAfetado, StatusRelato, TipoProblema } from '../types'

interface Estilo {
  rotulo: string
  classe: string
}

export const TIPOS_PROBLEMA: Record<TipoProblema, string> = {
  RAMPA_QUEBRADA: 'Rampa quebrada',
  CALCADA_DANIFICADA: 'Calçada danificada',
  SEM_RAMPA: 'Falta de rampa',
  SEM_ILUMINACAO: 'Sem iluminação',
  ALAGAMENTO: 'Alagamento',
  OBSTACULO_NA_VIA: 'Obstáculo na via',
  OUTRO: 'Outro problema',
}

export const PERFIS: Record<PerfilAfetado, string> = {
  TODOS: 'Todos os pedestres',
  IDOSA: 'Pessoas idosas',
  CADEIRANTE: 'Cadeirantes',
  DEFICIENCIA_VISUAL: 'Deficiência visual',
  PEDESTRE_NOTURNO: 'Pedestres à noite',
}

const NEUTRO: Estilo = { rotulo: 'Sem classificação', classe: 'bg-slate-100 text-slate-700' }

const STATUS: Record<StatusRelato, Estilo> = {
  PENDENTE: { rotulo: 'Pendente', classe: 'bg-alerta-bg text-amber-900' },
  CONFIRMADO: { rotulo: 'Confirmado', classe: 'bg-primary-bg text-primary-dark' },
  RESOLVIDO: { rotulo: 'Resolvido', classe: 'bg-slate-200 text-slate-800' },
}

// Além da cor, o texto informa o nível: a cor sozinha não basta para acessibilidade.
const CLASSIFICACAO: Record<Classificacao, Estilo> = {
  BOA: { rotulo: 'Boa', classe: 'bg-primary-bg text-primary-dark' },
  ATENCAO: { rotulo: 'Atenção', classe: 'bg-alerta-bg text-amber-900' },
  CRITICA: { rotulo: 'Crítica', classe: 'bg-red-100 text-red-800' },
}

export function estiloStatus(status: string): Estilo {
  return STATUS[status as StatusRelato] ?? NEUTRO
}

export function estiloClassificacao(classificacao: string): Estilo {
  return CLASSIFICACAO[classificacao as Classificacao] ?? NEUTRO
}

export function rotuloDe(mapa: Record<string, string>, chave: string): string {
  return mapa[chave] ?? chave
}