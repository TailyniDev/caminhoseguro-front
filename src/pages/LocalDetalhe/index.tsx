import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import Carregando from '../../components/Carregando'
import MensagemErro from '../../components/MensagemErro'
import MensagemVazia from '../../components/MensagemVazia'
import CardRelato from '../../components/CardRelato'
import { buscarLocal, listarRelatosDoLocal } from '../../services/api'
import { classificarNota } from '../../utils/acessibilidade'
import type { Local, Relato } from '../../types'

export default function LocalDetalhe() {
  const { id } = useParams()
  const localId = Number(id)
  const idValido = Number.isInteger(localId) && localId > 0

  const [local, setLocal] = useState<Local | null>(null)
  const [relatos, setRelatos] = useState<Relato[]>([])
  const [carregando, setCarregando] = useState(idValido)
  const [erro, setErro] = useState('')
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    if (!idValido) return
    let ativo = true

    Promise.all([buscarLocal(localId), listarRelatosDoLocal(localId)])
      .then(([dadosLocal, dadosRelatos]) => {
        if (!ativo) return
        setLocal(dadosLocal)
        setRelatos(dadosRelatos)
      })
      .catch((e: Error) => {
        if (ativo) setErro(e.message)
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [localId, idValido, tentativa])

  function tentarNovamente() {
    setErro('')
    setCarregando(true)
    setTentativa((t) => t + 1)
  }

  const voltar = (
    <Link to="/locais" className="text-sm text-primary underline">
      ← Voltar para Locais
    </Link>
  )

  if (!idValido) {
    return (
      <section>
        {voltar}
        <div className="mt-4">
          <MensagemErro mensagem={`"${id}" não é um local válido.`} />
        </div>
      </section>
    )
  }

  if (carregando) return <Carregando texto="Carregando local..." />

  if (erro || !local) {
    return (
      <section>
        {voltar}
        <div className="mt-4">
          <MensagemErro mensagem={erro || 'Local não encontrado.'} aoTentarNovamente={tentarNovamente} />
        </div>
      </section>
    )
  }

  const nota = classificarNota(local.notaAcessibilidade)
  const relatosOrdenados = [...relatos].sort((a, b) => b.data.localeCompare(a.data))

  return (
    <section>
      {voltar}

      <header className="mt-4 mb-8">
        <h1 className="text-3xl font-bold text-primary">{local.nome}</h1>
        <p className="mt-1 text-slate-700">{local.endereco}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className={`rounded px-3 py-1 text-sm font-medium ${nota.classe}`}>
            Acessibilidade:{' '}
            {local.notaAcessibilidade !== null ? local.notaAcessibilidade.toFixed(1) : '—'} ·{' '}
            {nota.rotulo}
          </span>
          <Link
            to={`/relatos?local=${local.id}`}
            className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Relatar um problema aqui
          </Link>
        </div>
      </header>

      <h2 className="mb-4 text-xl font-semibold">Relatos ({relatosOrdenados.length})</h2>

      {relatosOrdenados.length === 0 ? (
        <MensagemVazia texto="Este local ainda não recebeu relatos." />
      ) : (
        <ul className="space-y-3">
          {relatosOrdenados.map((relato) => (
            <CardRelato key={relato.id} relato={relato} />
          ))}
        </ul>
      )}
    </section>
  )
}