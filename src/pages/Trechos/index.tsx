import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import TituloPagina from '../../components/TituloPagina'
import Carregando from '../../components/Carregando'
import MensagemErro from '../../components/MensagemErro'
import MensagemVazia from '../../components/MensagemVazia'
import CardTrecho from '../../components/CardTrecho'
import { classeInput } from '../../utils/estilos'
import { listarTrechos } from '../../services/api'
import type { Trecho } from '../../types'

export default function Trechos() {
  const [trechos, setTrechos] = useState<Trecho[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [tentativa, setTentativa] = useState(0)
  const [busca, setBusca] = useState('')

  useEffect(() => {
    let ativo = true

    listarTrechos()
      .then((dados) => {
        if (ativo) setTrechos(dados)
      })
      .catch((e: Error) => {
        if (ativo) setErro(e.message)
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    // Evita atualizar o estado se a página for fechada antes da resposta chegar
    return () => {
      ativo = false
    }
  }, [tentativa])

  function tentarNovamente() {
    setErro('')
    setCarregando(true)
    setTentativa((t) => t + 1)
  }

  const termo = busca.trim().toLowerCase()
  const filtrados = trechos
    .filter(
      (t) =>
        t.nomeRua.toLowerCase().includes(termo) ||
        t.bairro.toLowerCase().includes(termo) ||
        t.cidade.toLowerCase().includes(termo),
    )
    // Os trechos mais críticos aparecem primeiro
    .sort((a, b) => a.notaAcessibilidade - b.notaAcessibilidade)

  return (
    <section>
      <TituloPagina
        titulo="Trechos mapeados"
        subtitulo="Ruas com a nota de acessibilidade calculada a partir dos relatos, dos mais críticos aos melhores."
      />

      <Link
        to="/trechos/novo"
        className="mb-6 inline-block rounded bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
      >
        Cadastrar trecho
      </Link>

      <div className="mb-6 max-w-md">
        <label htmlFor="busca" className="mb-1 block text-sm font-medium">
          Buscar por rua, bairro ou cidade
        </label>
        <input
          id="busca"
          type="search"
          className={classeInput}
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {carregando && <Carregando texto="Carregando trechos..." />}
      {erro && <MensagemErro mensagem={erro} aoTentarNovamente={tentarNovamente} />}

      {!carregando && !erro && filtrados.length === 0 && (
        <MensagemVazia
          texto={busca ? 'Nenhum trecho encontrado para essa busca.' : 'Ainda não há trechos mapeados.'}
        />
      )}

      {!carregando && !erro && filtrados.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((trecho) => (
            <CardTrecho key={trecho.id} trecho={trecho} />
          ))}
        </ul>
      )}
    </section>
  )
}
