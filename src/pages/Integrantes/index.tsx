import { BrainCircuit, Database, Monitor, Server } from 'lucide-react'
import CardIntegrante from '../../components/CardIntegrante'
import type { Integrante } from '../../components/CardIntegrante'
import fotoTailyni from '../../assets/imagens/tailyni.jpg';
import fotoGabriel from '../../assets/imagens/gabriel.jpg';
import fotoSabrina from '../../assets/imagens/sabrina.jpg';


// Preencha funcao, turma, foto, github e linkedin de cada pessoa. Campos vazios não aparecem na página.
// Fotos: coloque o arquivo em public/integrantes/ e use o caminho, por exemplo '/integrantes/tailyni.jpg'.
const INTEGRANTES: Integrante[] = [
  {
    nome: 'Tailyni Victoria Renovato Satirio',
    rm: '570517',
    turma: '1TDSPG',
    funcao: 'FullStack Developer',
    foto: fotoTailyni,
    github: 'https://github.com/TailyniDev',
    linkedin: 'https://www.linkedin.com/in/tailynisatiriodev/',
  },
  {
    nome: 'Sabrina Fraga Lima',
    rm: '572548',
    turma: '1TDSPJ',
    funcao: 'Front-End Developer',
    foto: fotoSabrina,
    github: 'https://github.com/sabrinafraga',
    linkedin: 'https://www.linkedin.com/in/sabrina-fraga-562777403/',
  },
  {
    nome: 'Gabriel Tadeu Telles Brando',
    rm: '571074',
    turma: '1TDSPG',
    funcao: 'Back-End Developer',
    foto: fotoGabriel,
    github: 'https://github.com/Tadeul',
    linkedin: 'https://www.linkedin.com/in/gabriel-tadeu-telles-brando-330216337/',
  },
]

const CORES_AVATAR = ['bg-primary', 'bg-emerald-700', 'bg-amber-700']

const FRENTES = [
  { icone: Database, titulo: 'Banco de dados', texto: 'Modelagem e script em Oracle.' },
  { icone: Server, titulo: 'API REST', texto: 'Java e Spring Boot, publicada no Render.' },
  { icone: Monitor, titulo: 'Front-end', texto: 'React, TypeScript e Tailwind, na Vercel.' },
  { icone: BrainCircuit, titulo: 'Inteligência artificial', texto: 'Modelos de classificação e agrupamento.' },
]

export default function Integrantes() {
  return (
    <section>
      <div className="mb-10 rounded-2xl bg-primary-bg px-6 py-10 text-center">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">Quem construiu o CaminhoSeguro</h1>
        <p className="mt-3 text-slate-700">Equipe da Global Solution 2026/2 · CitizenTech · FIAP</p>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {INTEGRANTES.map((integrante, indice) => (
          <CardIntegrante
            key={integrante.rm}
            integrante={integrante}
            corAvatar={CORES_AVATAR[indice % CORES_AVATAR.length] ?? 'bg-primary'}
          />
        ))}
      </ul>

      <section aria-labelledby="titulo-frentes" className="mt-14">
        <h2 id="titulo-frentes" className="mb-2 text-2xl font-bold">
          Uma solução, todas as frentes
        </h2>
        <p className="mb-6 text-slate-700">O mesmo projeto percorre todas as disciplinas da Global Solution.</p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FRENTES.map(({ icone: Icone, titulo, texto }) => (
            <li key={titulo} className="rounded-xl border border-slate-200 bg-white p-5">
              <Icone aria-hidden="true" className="h-7 w-7 text-primary" />
              <h3 className="mt-3 font-semibold">{titulo}</h3>
              <p className="mt-1 text-sm text-slate-700">{texto}</p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}