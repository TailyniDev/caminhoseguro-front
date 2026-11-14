import { Link } from 'react-router'
import { Accessibility, CheckCircle2, ClipboardList, Droplets, Lightbulb, MapPin } from 'lucide-react'
import IlustracaoCaminho from '../../components/IlustracaoCaminho'

const DESTAQUES = [
  {
    icone: Accessibility,
    titulo: 'Acessibilidade',
    texto: 'Rampas, piso tátil e calçadas: saiba o que está quebrado antes de sair de casa.',
  },
  {
    icone: Droplets,
    titulo: 'Alagamentos',
    texto: 'Veja os trechos que acumulam água e evite o risco em dias de chuva.',
  },
  {
    icone: Lightbulb,
    titulo: 'Iluminação',
    texto: 'Encontre ruas escuras e escolha caminhos mais seguros à noite.',
  },
]

const PASSOS = [
  { icone: MapPin, titulo: 'Encontre', texto: 'Consulte a nota de cada trecho no mapa ou na lista.' },
  { icone: ClipboardList, titulo: 'Relate', texto: 'Viu um problema? Conte em poucos campos.' },
  {
    icone: CheckCircle2,
    titulo: 'Confirme',
    texto: 'Com 3 pessoas, o relato vira Confirmado e ganha mais peso na nota e no painel da prefeitura.',
  },
]

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold text-primary md:text-5xl">CaminhoSeguro</h1>
          <p className="mt-4 text-lg text-slate-700">
            Um mapa colaborativo com informações reais sobre acessibilidade, alagamentos e iluminação, para que
            ninguém descubra um obstáculo só ao chegar nele.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/trechos"
              className="rounded bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark"
            >
              Ver trechos mapeados
            </Link>
            <Link
              to="/relatos/novo"
              className="rounded border border-primary px-6 py-3 font-semibold text-primary hover:bg-primary-bg"
            >
              Relatar um problema
            </Link>
          </div>
        </div>
        <IlustracaoCaminho />
      </section>

      <section aria-labelledby="titulo-destaques">
        <h2 id="titulo-destaques" className="mb-6 text-2xl font-bold">
          O que você encontra
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {DESTAQUES.map(({ icone: Icone, titulo, texto }) => (
            <li key={titulo} className="rounded border border-slate-200 bg-white p-5">
              <Icone aria-hidden="true" className="h-8 w-8 text-primary" />
              <h3 className="mt-3 font-semibold">{titulo}</h3>
              <p className="mt-1 text-sm text-slate-700">{texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="titulo-passos">
        <h2 id="titulo-passos" className="mb-6 text-2xl font-bold">
          Como funciona
        </h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {PASSOS.map(({ icone: Icone, titulo, texto }, indice) => (
            <li key={titulo} className="rounded bg-primary-bg p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-white">
                  {indice + 1}
                </span>
                <Icone aria-hidden="true" className="h-6 w-6 text-primary-dark" />
              </div>
              <h3 className="mt-3 font-semibold text-primary-dark">{titulo}</h3>
              <p className="mt-1 text-sm text-slate-800">{texto}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}