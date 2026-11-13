import { Link } from 'react-router'

export default function NaoEncontrada() {
  return (
    <section className="py-8 text-center">
      <h1 className="text-3xl font-bold">Página não encontrada</h1>
      <p className="mt-2 text-slate-700">O endereço que você tentou acessar não existe.</p>
      <Link to="/" className="mt-6 inline-block text-primary underline">
        Voltar para a Home
      </Link>
    </section>
  )
}