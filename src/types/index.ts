export type StatusRelato = 'PENDENTE' | 'CONFIRMADO' | 'RESOLVIDO'

export type TipoProblema =
  | 'RAMPA_QUEBRADA'
  | 'CALCADA_DANIFICADA'
  | 'SEM_RAMPA'
  | 'SEM_ILUMINACAO'
  | 'ALAGAMENTO'
  | 'OBSTACULO_NA_VIA'
  | 'OUTRO'

export type PerfilAfetado = 'TODOS' | 'IDOSA' | 'CADEIRANTE' | 'DEFICIENCIA_VISUAL' | 'PEDESTRE_NOTURNO'

export type Classificacao = 'BOA' | 'ATENCAO' | 'CRITICA'

export interface CampoErro {
  campo: string
  mensagem: string
}

// Formato único de erro devolvido pela API
export interface ErroApi {
  timestamp: string
  status: number
  erro: string
  mensagem: string
  caminho: string
  detalhes?: CampoErro[]
}

// A API omite campos nulos (non_null), por isso alguns são opcionais
export interface Trecho {
  id: number
  nomeRua: string
  bairro: string
  cidade: string
  latitude?: number
  longitude?: number
  dataCadastro: string
  qtRelatosConfirmados: number
  qtRelatosPendentes: number
  notaAcessibilidade: number
  classificacao: Classificacao
}

export interface Relato {
  id: number
  idTrecho: number
  nomeRua: string
  bairro: string
  tipoProblema: TipoProblema
  perfilAfetado: PerfilAfetado
  descricao: string
  status: StatusRelato
  qtConfirmacoes: number
  dataRegistro: string
  dataResolucao?: string
}

export interface NovoRelato {
  tipoProblema: TipoProblema
  perfilAfetado: PerfilAfetado
  descricao: string
  codigoDispositivo: string
}

export interface NovaConfirmacao {
  codigoDispositivo: string
  comentario?: string
}

export interface Confirmacao {
  id: number
  idRelato: number
  comentario?: string
  dataConfirmacao: string
}

export interface FiltroRelatos {
  status?: StatusRelato | ''
  perfil?: PerfilAfetado | ''
  busca?: string
}

export interface Aviso {
  tipo: 'sucesso' | 'erro'
  texto: string
}

export type NivelPrioridade = 'ALTA' | 'MEDIA' | 'BAIXA'

export interface Prioridade {
  idTrecho: number
  nomeRua: string
  bairro: string
  qtConfirmados: number
  qtPendentes: number
  pontuacao: number
  nivel: NivelPrioridade
}

export interface Painel {
  totalRelatos: number
  pendentes: number
  confirmados: number
  resolvidos: number
  prioridades: Prioridade[]
}