import type {
  Confirmacao,
  ErroApi,
  FiltroRelatos,
  NovaConfirmacao,
  NovoRelato,
  Relato,
  Trecho,
  Painel,
  NovoTrecho,
} from '../types'

const BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:8080').replace(/\/$/, '')

async function requisicao<T>(caminho: string, opcoes?: RequestInit): Promise<T> {
  // Só envia Content-Type quando há corpo, para evitar preflight de CORS nos GET
  const headers: HeadersInit = opcoes?.body ? { 'Content-Type': 'application/json' } : {}

  let resposta: Response
  try {
    resposta = await fetch(`${BASE_URL}${caminho}`, { ...opcoes, headers })
  } catch {
    throw new Error(
      'Não foi possível conectar à API. Se ela estiver iniciando, aguarde cerca de 1 minuto e tente de novo.',
    )
  }

  if (!resposta.ok) {
    const erro: ErroApi | null = await resposta.json().catch(() => null)
    const base = erro?.mensagem ?? 'Erro ao acessar a API.'
    const detalhes = erro?.detalhes?.map((d) => d.mensagem).join('; ')
    throw new Error(detalhes ? `${base}: ${detalhes}` : base)
  }
  return resposta.status === 204 ? (undefined as T) : resposta.json()
}

export const listarTrechos = () => requisicao<Trecho[]>('/trechos')

export const buscarTrecho = (id: number) => requisicao<Trecho>(`/trechos/${id}`)

export const listarRelatosDoTrecho = (idTrecho: number) =>
  requisicao<Relato[]>(`/trechos/${idTrecho}/relatos`)

export const cadastrarRelato = (idTrecho: number, dados: NovoRelato) =>
  requisicao<Relato>(`/trechos/${idTrecho}/relatos`, {
    method: 'POST',
    body: JSON.stringify(dados),
  })

export function listarRelatos(filtro: FiltroRelatos = {}) {
  const params = new URLSearchParams()
  if (filtro.status) params.set('status', filtro.status)
  if (filtro.perfil) params.set('perfil', filtro.perfil)
  if (filtro.busca?.trim()) params.set('busca', filtro.busca.trim())
  const consulta = params.toString()
  return requisicao<Relato[]>(`/relatos${consulta ? `?${consulta}` : ''}`)
}

export const confirmarRelato = (idRelato: number, dados: NovaConfirmacao) =>
  requisicao<Confirmacao>(`/relatos/${idRelato}/confirmacoes`, {
    method: 'POST',
    body: JSON.stringify(dados),
  })

export const buscarPainel = () => requisicao<Painel>('/painel')

export const cadastrarTrecho = (dados: NovoTrecho) =>
  requisicao<Trecho>('/trechos', {
    method: 'POST',
    body: JSON.stringify(dados),
  })