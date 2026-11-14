import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import TituloPagina from '../../components/TituloPagina'
import Carregando from '../../components/Carregando'
import MensagemErro from '../../components/MensagemErro'
import MensagemVazia from '../../components/MensagemVazia'
import CardResumo from '../../components/CardResumo'
import { buscarPainel } from '../../services/api'
import { estiloNivel } from '../../utils/rotulos'
import type { Painel } from '../../types'

export default function PainelPrefeitura() {
  const [painel, setPainel] = useState<Painel | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ativo = true

    buscarPainel()
      .then((dados) => {
        if (ativo) setPainel(dados)
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
        titulo="Painel da prefeitura"
        subtitulo="Resumo dos relatos e os trechos que merecem atenção primeiro."
      />

      {carregando && <Carregando texto="Carregando painel..." />}
      {erro && <MensagemErro mensagem={erro} aoTentarNovamente={tentarNovamente} />}

      {!carregando && !erro && painel && (
        <>
          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <CardResumo titulo="Total de relatos" valor={painel.totalRelatos} />
            <CardResumo titulo="Pendentes" valor={painel.pendentes} />
            <CardResumo titulo="Confirmados" valor={painel.confirmados} />
            <CardResumo titulo="Resolvidos" valor={painel.resolvidos} />
          </div>

          <h2 className="text-xl font-semibold">Trechos por prioridade</h2>
          <p className="mb-4 mt-1 text-sm text-slate-600">
            Pontuação = confirmados × 10 + pendentes × 3. Alta a partir de 20 pontos, média a partir de 10.
          </p>

          {painel.prioridades.length === 0 ? (
            <MensagemVazia texto="Nenhum trecho com problemas em aberto no momento." />
          ) : (
            <>
              {/* Celular: um cartão por trecho */}
              <ul className="space-y-3 md:hidden">
                {painel.prioridades.map((item) => {
                  const nivel = estiloNivel(item.nivel)
                  return (
                    <li key={item.idTrecho} className="rounded border border-slate-200 bg-white p-4">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/trechos/${item.idTrecho}`}
                          className="break-words font-semibold text-primary underline"
                        >
                          {item.nomeRua}
                        </Link>
                        <span className={`shrink-0 rounded px-2 py-1 text-sm font-medium ${nivel.classe}`}>
                          {nivel.rotulo}
                        </span>
                      </div>
                      <p className="break-words text-sm text-slate-600">{item.bairro}</p>
                      <p className="mt-2 text-sm text-slate-700">
                        {item.qtConfirmados} confirmado(s) · {item.qtPendentes} pendente(s) · {item.pontuacao} pontos
                      </p>
                    </li>
                  )
                })}
              </ul>

              {/* Tablet e desktop: tabela */}
              <div className="hidden overflow-x-auto rounded border border-slate-200 bg-white md:block">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">
                    Trechos com problemas em aberto, por prioridade
                  </caption>
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th scope="col" className="px-4 py-3">Trecho</th>
                      <th scope="col" className="px-4 py-3">Bairro</th>
                      <th scope="col" className="px-4 py-3">Confirmados</th>
                      <th scope="col" className="px-4 py-3">Pendentes</th>
                      <th scope="col" className="px-4 py-3">Pontos</th>
                      <th scope="col" className="px-4 py-3">Prioridade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {painel.prioridades.map((item) => {
                      const nivel = estiloNivel(item.nivel)
                      return (
                        <tr key={item.idTrecho} className="border-t border-slate-200">
                          <td className="px-4 py-3">
                            <Link
                              to={`/trechos/${item.idTrecho}`}
                              className="font-medium text-primary underline"
                            >
                              {item.nomeRua}
                            </Link>
                          </td>
                          <td className="px-4 py-3">{item.bairro}</td>
                          <td className="px-4 py-3">{item.qtConfirmados}</td>
                          <td className="px-4 py-3">{item.qtPendentes}</td>
                          <td className="px-4 py-3">{item.pontuacao}</td>
                          <td className="px-4 py-3">
                            <span className={`rounded px-2 py-1 font-medium ${nivel.classe}`}>
                              {nivel.rotulo}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}
