export interface ErroApi {
  status: number
  mensagem: string
}

export interface Local {
  id: number
  nome: string
  endereco: string
  latitude: number | null
  longitude: number | null
  notaAcessibilidade: number | null
  bairroId: number
}

export type StatusRelato = 'PENDENTE' | 'CONFIRMADO' | 'RESOLVIDO'

export interface Relato {
  id: number
  localId: number
  descricao: string
  data: string
  gravidade: number
  status: StatusRelato
}

export type NovoRelato = Omit<Relato, 'id' | 'data' | 'status'>