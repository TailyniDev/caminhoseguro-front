import { useEffect, useState } from 'react'
import TituloPagina from '../../components/TituloPagina'
import Carregando from '../../components/Carregando'
import MensagemErro from '../../components/MensagemErro'
import MensagemVazia from '../../components/MensagemVazia'
import CardLocal from '../../components/CardLocal'
import { classeInput } from '../../utils/estilos'
import { listarLocais } from '../../services/api'
import type { Local } from '../../types'

export default function Locais() {
  const [locais, setLocais] = useState<Local[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [tentativa, setTentativa] = useState(0)
  const [busca, setBusca] = useState('')

  useEffect(() => {
    let ativo = true

    listarLocais()
      .then((dados) => {
        if (ativo) setLocais(dados)
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
  const filtrados = locais.filter(
    (local) =>
      local.nome.toLowerCase().includes(termo) || local.endereco.toLowerCase().includes(termo),
  )

  return (
    <section>
      <TituloPagina
        titulo="Locais mapeados"
        subtitulo="Consulte a nota de acessibilidade de cada local antes de sair de casa."
      />

      <div className="mb-6 max-w-md">
        <label htmlFor="busca" className="mb-1 block text-sm font-medium">
          Buscar por nome ou endereço
        </label>
        <input
          id="busca"
          type="search"
          className={classeInput}
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {carregando && <Carregando texto="Carregando locais..." />}
      {erro && <MensagemErro mensagem={erro} aoTentarNovamente={tentarNovamente} />}

      {!carregando && !erro && filtrados.length === 0 && (
        <MensagemVazia
          texto={busca ? 'Nenhum local encontrado para essa busca.' : 'Ainda não há locais mapeados.'}
        />
      )}

      {!carregando && !erro && filtrados.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((local) => (
            <CardLocal key={local.id} local={local} />
          ))}
        </ul>
      )}
    </section>
  )
}