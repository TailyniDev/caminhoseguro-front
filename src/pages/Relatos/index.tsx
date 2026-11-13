import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import TituloPagina from '../../components/TituloPagina'
import Carregando from '../../components/Carregando'
import MensagemErro from '../../components/MensagemErro'
import MensagemVazia from '../../components/MensagemVazia'
import FormularioRelato from '../../components/FormularioRelato'
import { listarLocais } from '../../services/api'
import type { Local } from '../../types'

export default function Relatos() {
  const [locais, setLocais] = useState<Local[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [tentativa, setTentativa] = useState(0)
  const [searchParams] = useSearchParams()
  const localInicial = searchParams.get('local') ?? undefined

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
      <TituloPagina
        titulo="Relatar um problema"
        subtitulo="Encontrou uma rampa quebrada, um trecho alagado ou uma rua sem luz? Conte para a gente."
      />

      {carregando && <Carregando texto="Carregando locais..." />}
      {erro && <MensagemErro mensagem={erro} aoTentarNovamente={tentarNovamente} />}

      {!carregando && !erro && locais.length === 0 && (
        <MensagemVazia texto="Ainda não há locais cadastrados para receber relatos." />
      )}

      {!carregando && !erro && locais.length > 0 && (
        <FormularioRelato locais={locais} localInicial={localInicial} />
      )}
    </section>
  )
}