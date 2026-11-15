
import { useState } from 'react'
import Menu from '../Menu'
import Logo from '../Logo'

export default function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between px-4 py-3">
        <Logo />

        <button
          type="button"
          onClick={() => setMenuAberto((aberto) => !aberto)}
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
          className="rounded border border-slate-300 px-3 py-2 text-sm lg:hidden"
        >
          {menuAberto ? 'Fechar' : 'Menu'}
        </button>

        <Menu aberto={menuAberto} aoNavegar={() => setMenuAberto(false)} />
      </div>
    </header>
  )
}
