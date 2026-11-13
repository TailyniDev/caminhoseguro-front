import { Link } from 'react-router'

export default function Home() {
  return (
    <section className="py-8 text-center">
      <h1 className="text-3xl font-bold text-primary md:text-5xl">CaminhoSeguro</h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-700">
        Um mapa colaborativo com informações reais sobre acessibilidade, alagamentos e
        iluminação, para que ninguém descubra um obstáculo só ao chegar nele.
      </p>
      <Link
        to="/locais"
        className="mt-8 inline-block rounded bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark"
      >
        Ver locais mapeados
      </Link>
    </section>
  )
}