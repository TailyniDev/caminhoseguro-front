import type { ErroApi, Local, NovoRelato, Relato } from '../types'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

async function requisicao<T>(caminho: string, opcoes?: RequestInit): Promise<T> {
  let resposta: Response
  try {
    resposta = await fetch(`${BASE_URL}${caminho}`, {
      headers: { 'Content-Type': 'application/json' },
      ...opcoes,
    })
  } catch {
    throw new Error(
      'Não foi possível conectar ao servidor. Se a API estiver iniciando, aguarde cerca de 1 minuto e tente de novo.',
    )
  }

  if (!resposta.ok) {
    const erro: ErroApi | null = await resposta.json().catch(() => null)
    throw new Error(erro?.mensagem ?? 'Erro ao acessar a API.')
  }
  return resposta.status === 204 ? (undefined as T) : resposta.json()
}

export const listarLocais = () => requisicao<Local[]>('/locais')

export const buscarLocal = (id: number) => requisicao<Local>(`/locais/${id}`)

export const listarRelatosDoLocal = (localId: number) =>
  requisicao<Relato[]>(`/locais/${localId}/relatos`)

export const cadastrarRelato = (dados: NovoRelato) =>
  requisicao<Relato>(`/locais/${dados.localId}/relatos`, {
    method: 'POST',
    body: JSON.stringify(dados),
  })