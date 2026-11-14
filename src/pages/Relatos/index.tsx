import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router'
import TituloPagina from '../../components/TituloPagina'
import Carregando from '../../components/Carregando'
import MensagemErro from '../../components/MensagemErro'
import MensagemVazia from '../../components/MensagemVazia'
import CardRelato from '../../components/CardRelato'
import CaixaAviso from '../../components/CaixaAviso'
import { useConfirmarRelato } from '../../hooks/useConfirmarRelato'
import { listarRelatos } from '../../services/api'
import { classeInput } from '../../utils/estilos'
import { PERFIS } from '../../utils/rotulos'
import type { PerfilAfetado, Relato, StatusRelato } from '../../types'

const OPCOES_STATUS: { valor: StatusRelato; rotulo: string }[] = [
  { valor: 'PENDENTE', rotulo: 'Pendente' },
  { valor: 'CONFIRMADO', rotulo: 'Confirmado' },
  { valor: 'RESOLVIDO', rotulo: 'Resolvido' },
]

export default function Relatos() {
  const [relatos, setRelatos] = useState<Relato[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [tentativa, setTentativa] = useState(0)

  const [status, setStatus] = useState<StatusRelato | ''>('')
  const [perfil, setPerfil] = useState<PerfilAfetado | ''>('')
  const [busca, setBusca] = useState('')
  const [buscaAplicada, setBuscaAplicada] = useState('')

  // Depois de confirmar, recarrega a lista para mostrar a nova contagem
  const { confirmar, emConfirmacao, aviso } = useConfirmarRelato(() => setTentativa((t) => t + 1))

  useEffect(() => {
    let ativo = true

    listarRelatos({ status, perfil, busca: buscaAplicada })
      .then((dados) => {
        if (ativo) setRelatos(dados)
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
  }, [status, perfil, buscaAplicada, tentativa])

  function iniciarCarregamento() {
    setErro('')
    setCarregando(true)
  }

  function mudarStatus(valor: string) {
    iniciarCarregamento()
    setStatus(valor as StatusRelato | '')
  }

  function mudarPerfil(valor: string) {
    iniciarCarregamento()
    setPerfil(valor as PerfilAfetado | '')
  }

  function buscar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const novaBusca = busca.trim()
    if (novaBusca === buscaAplicada) return
    iniciarCarregamento()
    setBuscaAplicada(novaBusca)
  }

  function limparFiltros() {
    setBusca('')
    if (!status && !perfil && !buscaAplicada) return
    iniciarCarregamento()
    setStatus('')
    setPerfil('')
    setBuscaAplicada('')
  }

  function tentarNovamente() {
    iniciarCarregamento()
    setTentativa((t) => t + 1)
  }

  const temFiltro = Boolean(status || perfil || buscaAplicada)
  const relatosOrdenados = [...relatos].sort((a, b) => b.dataRegistro.localeCompare(a.dataRegistro))

  return (
    <section>
      <TituloPagina
        titulo="Relatos"
        subtitulo="Problemas relatados pela comunidade. Se você também viu algum deles, confirme: com 3 pessoas o relato passa a pesar na nota do trecho."
      />

      <Link
        to="/relatos/novo"
        className="mb-6 inline-block rounded bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
      >
        Relatar um problema
      </Link>

      <form onSubmit={buscar} className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="filtro-status" className="mb-1 block text-sm font-medium">
            Situação
          </label>
          <select
            id="filtro-status"
            className={classeInput}
            value={status}
            onChange={(e) => mudarStatus(e.target.value)}
          >
            <option value="">Todas</option>
            {OPCOES_STATUS.map((opcao) => (
              <option key={opcao.valor} value={opcao.valor}>
                {opcao.rotulo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filtro-perfil" className="mb-1 block text-sm font-medium">
            Perfil afetado
          </label>
          <select
            id="filtro-perfil"
            className={classeInput}
            value={perfil}
            onChange={(e) => mudarPerfil(e.target.value)}
          >
            <option value="">Todos</option>
            {Object.entries(PERFIS).map(([valor, rotulo]) => (
              <option key={valor} value={valor}>
                {rotulo}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="filtro-busca" className="mb-1 block text-sm font-medium">
            Buscar na descrição
          </label>
          <div className="flex gap-2">
            <input
              id="filtro-busca"
              type="search"
              className={classeInput}
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <button
              type="submit"
              className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              Buscar
            </button>
            <button
              type="button"
              onClick={limparFiltros}
              className="rounded border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100"
            >
              Limpar
            </button>
          </div>
        </div>
      </form>

      <div className="mb-4">
        <CaixaAviso aviso={aviso} />
      </div>

      {carregando && <Carregando texto="Carregando relatos..." />}
      {erro && <MensagemErro mensagem={erro} aoTentarNovamente={tentarNovamente} />}

      {!carregando && !erro && relatosOrdenados.length === 0 && (
        <MensagemVazia
          texto={temFiltro ? 'Nenhum relato encontrado com esses filtros.' : 'Ainda não há relatos.'}
        />
      )}

      {!carregando && !erro && relatosOrdenados.length > 0 && (
        <>
          <p className="mb-3 text-sm text-slate-600">{relatosOrdenados.length} relato(s)</p>
          <ul className="space-y-3">
            {relatosOrdenados.map((relato) => (
              <CardRelato
                key={relato.id}
                relato={relato}
                mostrarLocal
                confirmando={emConfirmacao === relato.id}
                aoConfirmar={confirmar}
              />
            ))}
          </ul>
        </>
      )}
    </section>
  )
}