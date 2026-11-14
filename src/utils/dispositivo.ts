const CHAVE = 'caminhoseguro:codigo-dispositivo'

// Gera um código anônimo por navegador e guarda no localStorage.
export function obterCodigoDispositivo(): string {
  try {
    const salvo = localStorage.getItem(CHAVE)
    if (salvo) return salvo
    const novo = `disp-${crypto.randomUUID()}`
    localStorage.setItem(CHAVE, novo)
    return novo
  } catch {
    // localStorage indisponível: o código vale só nesta sessão
    return `disp-${crypto.randomUUID()}`
  }
}