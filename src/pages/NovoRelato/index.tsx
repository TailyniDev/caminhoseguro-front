import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import TituloPagina from '../../components/TituloPagina'
import Carregando from '../../components/Carregando'
import MensagemErro from '../../components/MensagemErro'
import MensagemVazia from '../../components/MensagemVazia'
import FormularioRelato from '../../components/FormularioRelato'
import { listarTrechos } from '../../services/api'
import type { Trecho } from '../../types'

export default function NovoRelato() {
  const [trechos, setTrechos] = useState<Trecho[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [tentativa, setTentativa] = useState(0)
  const [searchParams] = useSearchParams()
  const trechoInicial = searchParams.get('trecho') ?? undefined

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

    return () => {
      ativo = false
    }
  }, [tentativa])

  function tentarNovamente() {
    setErro('')
    setCarregando(true)
    setTentativa((t) => t + 1)
  }

  return (
    <section>
      <Link to="/relatos" className="text-sm text-primary underline">
        ← Voltar para Relatos
      </Link>

      <div className="mt-4">
        <TituloPagina
          titulo="Relatar um problema"
          subtitulo="Encontrou uma rampa quebrada, um trecho alagado ou uma rua sem luz? Conte para a gente."
        />
      </div>

      {carregando && <Carregando texto="Carregando trechos..." />}
      {erro && <MensagemErro mensagem={erro} aoTentarNovamente={tentarNovamente} />}

      {!carregando && !erro && trechos.length === 0 && (
        <MensagemVazia texto="Ainda não há trechos cadastrados para receber relatos." />
      )}

      {!carregando && !erro && trechos.length > 0 && (
        <FormularioRelato trechos={trechos} trechoInicial={trechoInicial} />
      )}
    </section>
  )
}