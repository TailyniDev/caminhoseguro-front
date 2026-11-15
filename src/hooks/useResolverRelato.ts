import { useState } from 'react'
import { resolverRelato } from '../services/api'
import type { Aviso, Relato } from '../types'

export function useResolverRelato(aoResolver: () => void) {
  const [emResolucao, setEmResolucao] = useState<number | null>(null)
  const [aviso, setAviso] = useState<Aviso | null>(null)

  async function resolver(relato: Relato) {
    setAviso(null)
    setEmResolucao(relato.id)
    try {
      await resolverRelato(relato)
      setAviso({ tipo: 'sucesso', texto: 'Relato marcado como resolvido.' })
      aoResolver()
    } catch (e) {
      setAviso({ tipo: 'erro', texto: (e as Error).message })
    } finally {
      setEmResolucao(null)
    }
  }

  return { resolver, emResolucao, aviso }
}