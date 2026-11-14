import { Outlet } from 'react-router'
import Cabecalho from './components/Cabecalho'
import Rodape from './components/Rodape'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-primary"
      >
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo" tabIndex={-1} className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 focus:outline-none">
        <Outlet />
      </main>
      <Rodape />
    </div>
  )
}