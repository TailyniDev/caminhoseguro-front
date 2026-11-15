import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router'
import TituloPagina from '../../components/TituloPagina'
import Carregando from '../../components/Carregando'
import MensagemErro from '../../components/MensagemErro'
import MensagemVazia from '../../components/MensagemVazia'
import CardResumo from '../../components/CardResumo'
import GraficoBarras from '../../components/GraficoBarras'
import CaixaAviso from '../../components/CaixaAviso'
import RelatosDoTrecho from '../../components/RelatosDoTrecho'
import { useResolverRelato } from '../../hooks/useResolverRelato'
import { buscarPainel } from '../../services/api'
import { estiloNivel } from '../../utils/rotulos'
import type { Painel } from '../../types'

export default function PainelPrefeitura() {
  const [painel, setPainel] = useState<Painel | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [tentativa, setTentativa] = useState(0)
  const [trechoAberto, setTrechoAberto] = useState<number | null>(null)

  // Depois de resolver, recarrega o painel (e a lista de relatos aberta) para atualizar os números
  const { resolver, emResolucao, aviso } = useResolverRelato(() => setTentativa((t) => t + 1))

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

  function alternar(idTrecho: number) {
    setTrechoAberto((atual) => (atual === idTrecho ? null : idTrecho))
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

          <h2 className="mb-4 text-xl font-semibold">Relatos por situação</h2>
          <div className="mb-8 max-w-xl rounded border border-slate-200 bg-white p-4">
            <GraficoBarras
              itens={[
                { rotulo: 'Pendentes', valor: painel.pendentes, cor: 'bg-alerta' },
                { rotulo: 'Confirmados', valor: painel.confirmados, cor: 'bg-primary' },
                { rotulo: 'Resolvidos', valor: painel.resolvidos, cor: 'bg-slate-500' },
              ]}
            />
          </div>

          <h2 className="text-xl font-semibold">Trechos por prioridade</h2>
          <p className="mb-4 mt-1 text-sm text-slate-600">
            Pontuação = confirmados × 10 + pendentes × 3. Alta a partir de 20 pontos, média a partir de 10. Abra os
            relatos de um trecho para marcar como resolvidos os problemas já corrigidos.
          </p>

          <div className="mb-4">
            <CaixaAviso aviso={aviso} />
          </div>

          {painel.prioridades.length === 0 ? (
            <MensagemVazia texto="Nenhum trecho com problemas em aberto no momento." />
          ) : (
            <>
              {/* Celular: um cartão por trecho */}
              <ul className="space-y-3 md:hidden">
                {painel.prioridades.map((item) => {
                  const nivel = estiloNivel(item.nivel)
                  const aberto = trechoAberto === item.idTrecho
                  return (
                    <li key={item.idTrecho} className="rounded border border-slate-200 bg-white p-4">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/trechos/${item.idTrecho}`}
                          className="break-words font-semibold text-primary hover:text-primary-dark hover:underline focus-visible:underline"
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
                      <button
                        type="button"
                        onClick={() => alternar(item.idTrecho)}
                        aria-expanded={aberto}
                        className="mt-3 rounded border border-primary px-3 py-1 text-sm font-medium text-primary hover:bg-primary-bg"
                      >
                        {aberto ? 'Fechar relatos' : 'Ver relatos'}
                      </button>
                      {aberto && (
                        <div className="mt-3">
                          <RelatosDoTrecho
                            idTrecho={item.idTrecho}
                            versao={tentativa}
                            emResolucao={emResolucao}
                            aoResolver={resolver}
                          />
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>

              {/* Tablet e desktop: tabela */}
              <div className="hidden overflow-x-auto rounded border border-slate-200 bg-white md:block">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Trechos com problemas em aberto, por prioridade</caption>
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th scope="col" className="px-4 py-3">Trecho</th>
                      <th scope="col" className="px-4 py-3">Bairro</th>
                      <th scope="col" className="px-4 py-3">Confirmados</th>
                      <th scope="col" className="px-4 py-3">Pendentes</th>
                      <th scope="col" className="px-4 py-3">Pontos</th>
                      <th scope="col" className="px-4 py-3">Prioridade</th>
                      <th scope="col" className="px-4 py-3">Relatos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {painel.prioridades.map((item) => {
                      const nivel = estiloNivel(item.nivel)
                      const aberto = trechoAberto === item.idTrecho
                      return (
                        <Fragment key={item.idTrecho}>
                          <tr className="border-t border-slate-200">
                            <td className="px-4 py-3">
                              <Link
                                to={`/trechos/${item.idTrecho}`}
                                className="font-medium text-primary hover:text-primary-dark hover:underline focus-visible:underline"
                              >
                                {item.nomeRua}
                              </Link>
                            </td>
                            <td className="px-4 py-3">{item.bairro}</td>
                            <td className="px-4 py-3">{item.qtConfirmados}</td>
                            <td className="px-4 py-3">{item.qtPendentes}</td>
                            <td className="px-4 py-3">{item.pontuacao}</td>
                            <td className="px-4 py-3">
                              <span className={`rounded px-2 py-1 font-medium ${nivel.classe}`}>{nivel.rotulo}</span>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                type="button"
                                onClick={() => alternar(item.idTrecho)}
                                aria-expanded={aberto}
                                aria-controls={`relatos-trecho-${item.idTrecho}`}
                                className="whitespace-nowrap rounded border border-primary px-3 py-1 font-medium text-primary hover:bg-primary-bg"
                              >
                                {aberto ? 'Fechar' : 'Ver relatos'}
                              </button>
                            </td>
                          </tr>
                          {aberto && (
                            <tr id={`relatos-trecho-${item.idTrecho}`} className="bg-slate-50">
                              <td colSpan={7} className="px-4 py-4">
                                <RelatosDoTrecho
                                  idTrecho={item.idTrecho}
                                  versao={tentativa}
                                  emResolucao={emResolucao}
                                  aoResolver={resolver}
                                />
                              </td>
                            </tr>
                          )}
                        </Fragment>
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