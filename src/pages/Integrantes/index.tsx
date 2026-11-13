import TituloPagina from '../../components/TituloPagina'

interface Integrante {
  nome: string
  rm: string
  turma: string
}

const INTEGRANTES: Integrante[] = [
  { nome: 'Tailyni Victoria Renovato Satirio', rm: 'RM570517', turma: '1TDSPJ' },
  { nome: 'Sabrina Fraga Lima', rm: 'RM572548', turma: '1TDSPJ' },
  { nome: 'Gabriel Tadeu Telles Brando', rm: 'RM571074', turma: '1TDSPJ' },
]

export default function Integrantes() {
  return (
    <section>
      <TituloPagina titulo="Integrantes" subtitulo="Quem construiu o CaminhoSeguro." />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INTEGRANTES.map((pessoa) => (
          <li key={pessoa.rm + pessoa.nome} className="rounded border border-slate-200 bg-white p-4">
            <p className="font-semibold">{pessoa.nome}</p>
            <p className="text-sm text-slate-600">{pessoa.rm}</p>
            <p className="text-sm text-slate-600">Turma {pessoa.turma}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}