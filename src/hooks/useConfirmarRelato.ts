import { useState } from 'react'
import { confirmarRelato } from '../services/api'
import { obterCodigoDispositivo } from '../utils/dispositivo'
import type { Aviso } from '../types'

// Reúne a lógica de confirmar um relato
export function useConfirmarRelato(aoConfirmar: () => void) {
  const [emConfirmacao, setEmConfirmacao] = useState<number | null>(null)
  const [aviso, setAviso] = useState<Aviso | null>(null)

  async function confirmar(idRelato: number) {
    setAviso(null)
    setEmConfirmacao(idRelato)
    try {
      await confirmarRelato(idRelato, { codigoDispositivo: obterCodigoDispositivo() })
      setAviso({ tipo: 'sucesso', texto: 'Confirmação registrada. Obrigado por ajudar!' })
      aoConfirmar()
    } catch (e) {
      setAviso({ tipo: 'erro', texto: (e as Error).message })
    } finally {
      setEmConfirmacao(null)
    }
  }

  return { confirmar, emConfirmacao, aviso }
}