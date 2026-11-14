import Logo from '../Logo'

export default function Rodape() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center text-sm text-slate-600">
        <Logo className="h-8 w-auto" />
        <p>CaminhoSeguro · Global Solution 2026/2 · FIAP</p>
      </div>
    </footer>
  )
}