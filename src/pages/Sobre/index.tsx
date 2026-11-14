import { Link } from 'react-router'
import { Accessibility, CheckCircle2, ClipboardList, Droplets, Landmark, MapPin, Moon, Users } from 'lucide-react'
import CardIcone from '../../components/CardIcone'

const BENEFICIADOS = [
  {
    icone: Accessibility,
    titulo: 'Pessoas com deficiência e idosas',
    texto: 'Dependem de calçadas, rampas e travessias em bom estado para chegar aonde precisam.',
  },
  {
    icone: Droplets,
    titulo: 'Moradores de áreas alagáveis',
    texto: 'Sabem quais trechos acumulam água e podem escolher outro caminho em dias de chuva.',
  },
  {
    icone: Moon,
    titulo: 'Quem anda a pé à noite',
    texto: 'Trabalhadores noturnos e estudantes descobrem os trechos escuros antes de passar por eles.',
  },
  {
    icone: Landmark,
    titulo: 'A prefeitura',
    texto: 'Recebe um painel com os trechos prioritários e passa a decidir com base em dados.',
  },
]

const PASSOS = [
  {
    icone: MapPin,
    titulo: 'Mapeia',
    texto: 'Qualquer pessoa cadastra um trecho de rua e, se quiser, marca o ponto no mapa.',
  },
  {
    icone: ClipboardList,
    titulo: 'Relata',
    texto: 'Escolhe o tipo de problema (rampa quebrada, sem iluminação, alagamento...) e quem é mais afetado.',
  },
  {
    icone: Users,
    titulo: 'Confirma',
    texto:
      'Outras pessoas que viram o mesmo problema confirmam. Com 3 pessoas, o relato passa de Pendente para Confirmado.',
  },
  {
    icone: CheckCircle2,
    titulo: 'Prioriza e resolve',
    texto:
      'O painel da prefeitura ordena os trechos por prioridade. Quando o problema é corrigido, o relato vira Resolvido.',
  },
]

const NIVEIS = [
  { rotulo: 'Boa', faixa: '80 a 100', cor: '#15803d' },
  { rotulo: 'Atenção', faixa: '50 a 79', cor: '#d97706' },
  { rotulo: 'Crítica', faixa: '0 a 49', cor: '#dc2626' },
]

// Remova 'Leaflet e OpenStreetMap' se o grupo não fez o mapa
const TECNOLOGIAS = [
  'React',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'React Router',
  'React Hook Form',
  'Leaflet e OpenStreetMap',
  'Java e Spring Boot',
  'Oracle',
  'Render',
  'Vercel',
]

const ODS = [
  {
    numero: 11,
    titulo: 'Cidades e comunidades sustentáveis',
    texto: 'Espaços públicos e deslocamentos seguros, inclusivos e acessíveis (metas 11.2 e 11.7).',
    fundo: '#fd9d24',
    corTexto: '#1e293b',
  },
  {
    numero: 10,
    titulo: 'Redução das desigualdades',
    texto: 'Inclusão de pessoas com deficiência e idosas, que enfrentam mais barreiras no espaço urbano (meta 10.2).',
    fundo: '#dd1367',
    corTexto: '#ffffff',
  },
  {
    numero: 13,
    titulo: 'Ação contra a mudança global do clima',
    texto: 'Mapear pontos de alagamento ajuda a população a se adaptar a chuvas intensas (meta 13.1).',
    fundo: '#3f7e44',
    corTexto: '#ffffff',
  },
]

export default function Sobre() {
  return (
    <div className="space-y-16">
      <section className="rounded-2xl bg-primary-bg px-6 py-10 text-center">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">Sobre o CaminhoSeguro</h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-700">
          Informação confiável sobre o espaço urbano, feita com e para o cidadão.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/trechos" className="rounded bg-primary px-5 py-2 font-semibold text-white hover:bg-primary-dark">
            Ver trechos
          </Link>
          <Link
            to="/relatos/novo"
            className="rounded border border-primary px-5 py-2 font-semibold text-primary hover:bg-white"
          >
            Relatar um problema
          </Link>
        </div>
      </section>

      <section aria-labelledby="titulo-problema" className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h2 id="titulo-problema" className="text-2xl font-bold">
            O problema
          </h2>
          <p className="mt-3 text-slate-800">
            Quem tem mobilidade reduzida costuma descobrir que um local é inacessível só ao chegar nele. Quem anda
            a pé não sabe quais trechos alagam ou são mal iluminados.
          </p>
          <p className="mt-3 text-slate-800">
            As informações existem, mas estão dispersas, ou nem chegam a ser coletadas. O CaminhoSeguro reúne tudo
            num só lugar: o cidadão relata, outras pessoas confirmam e a prefeitura recebe um painel de prioridades.
          </p>
        </div>
        <blockquote className="rounded-xl border-l-4 border-primary bg-white p-6 text-lg font-medium text-primary-dark shadow-sm">
          Ninguém deveria descobrir um obstáculo só ao chegar nele.
        </blockquote>
      </section>

      <section aria-labelledby="titulo-beneficiados">
        <h2 id="titulo-beneficiados" className="mb-6 text-2xl font-bold">
          Quem beneficiamos
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFICIADOS.map((item) => (
            <CardIcone key={item.titulo} icone={item.icone} titulo={item.titulo} texto={item.texto} />
          ))}
        </ul>
      </section>

      <section aria-labelledby="titulo-funcionamento">
        <h2 id="titulo-funcionamento" className="mb-6 text-2xl font-bold">
          Como funciona
        </h2>
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PASSOS.map(({ icone: Icone, titulo, texto }, indice) => (
            <li key={titulo} className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-white">
                  {indice + 1}
                </span>
                <Icone aria-hidden="true" className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-3 font-semibold">{titulo}</h3>
              <p className="mt-1 text-sm text-slate-700">{texto}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-slate-600">
          Ninguém precisa criar conta: cada navegador recebe um código anônimo, que impede que a mesma pessoa
          confirme o mesmo relato duas vezes.
        </p>
      </section>

      <section aria-labelledby="titulo-nota" className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 id="titulo-nota" className="text-2xl font-bold">
          Como calculamos a nota de cada trecho
        </h2>
        <p className="mt-3 text-slate-800">Todo trecho começa com 100 pontos. Cada relato desconta pontos:</p>
        <p className="mt-3 rounded bg-slate-100 p-4 font-mono text-sm md:text-base">
          nota = 100 − (20 × relatos confirmados) − (5 × relatos pendentes)
        </p>
        <p className="mt-2 text-sm text-slate-600">A nota nunca fica abaixo de 0.</p>

        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {NIVEIS.map((nivel) => (
            <li key={nivel.rotulo} className="flex items-center gap-3 rounded border border-slate-200 p-3">
              <span
                aria-hidden="true"
                className="inline-block h-4 w-4 shrink-0 rounded-full"
                style={{ backgroundColor: nivel.cor }}
              />
              <span>
                <strong>{nivel.rotulo}</strong>: nota de {nivel.faixa}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-sm text-slate-700">
          <strong>Exemplo:</strong> um trecho com 1 relato confirmado e 2 pendentes tem 100 − 20 − 10 = 70 pontos, e
          fica na faixa de Atenção.
        </p>
      </section>

      <section aria-labelledby="titulo-ods">
        <h2 id="titulo-ods" className="mb-2 text-2xl font-bold">
          Objetivos de Desenvolvimento Sustentável
        </h2>
        <p className="mb-6 text-sm text-slate-600">Agenda 2030 da ONU (sdgs.un.org)</p>
        <ul className="grid gap-4 md:grid-cols-3">
          {ODS.map((item) => (
            <li key={item.numero} className="rounded-xl p-5" style={{ backgroundColor: item.fundo, color: item.corTexto }}>
              <p className="text-4xl font-bold">ODS {item.numero}</p>
              <h3 className="mt-2 font-semibold">{item.titulo}</h3>
              <p className="mt-1 text-sm">{item.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="titulo-tecnologias">
        <h2 id="titulo-tecnologias" className="mb-6 text-2xl font-bold">
          Tecnologias
        </h2>
        <ul className="flex flex-wrap gap-2">
          {TECNOLOGIAS.map((tecnologia) => (
            <li
              key={tecnologia}
              className="rounded-full border border-slate-300 bg-white px-4 py-1 text-sm font-medium text-slate-800"
            >
              {tecnologia}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}