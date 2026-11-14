import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Carregando from "../../components/Carregando";
import MensagemErro from "../../components/MensagemErro";
import MensagemVazia from "../../components/MensagemVazia";
import CardRelato from "../../components/CardRelato";
import CaixaAviso from "../../components/CaixaAviso";
import { useConfirmarRelato } from "../../hooks/useConfirmarRelato";
import { buscarTrecho, listarRelatosDoTrecho } from "../../services/api";
import { estiloClassificacao } from "../../utils/rotulos";
import type { Relato, Trecho } from "../../types";
import MapaTrechos from "../../components/MapaTrechos";
import { temCoordenadas } from "../../utils/mapa";

export default function TrechoDetalhe() {
  const { id } = useParams();
  const idTrecho = Number(id);
  const idValido = Number.isInteger(idTrecho) && idTrecho > 0;

  const [trecho, setTrecho] = useState<Trecho | null>(null);
  const [relatos, setRelatos] = useState<Relato[]>([]);
  const [carregando, setCarregando] = useState(idValido);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);

  // Depois de confirmar, recarrega os dados para mostrar a nova contagem
  const { confirmar, emConfirmacao, aviso } = useConfirmarRelato(() =>
    setTentativa((t) => t + 1),
  );

  useEffect(() => {
    if (!idValido) return;
    let ativo = true;

    Promise.all([buscarTrecho(idTrecho), listarRelatosDoTrecho(idTrecho)])
      .then(([dadosTrecho, dadosRelatos]) => {
        if (!ativo) return;
        setTrecho(dadosTrecho);
        setRelatos(dadosRelatos);
      })
      .catch((e: Error) => {
        if (ativo) setErro(e.message);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [idTrecho, idValido, tentativa]);

  function tentarNovamente() {
    setErro("");
    setCarregando(true);
    setTentativa((t) => t + 1);
  }

  const voltar = (
    <Link to="/trechos" className="text-sm text-primary underline">
      ← Voltar para Trechos
    </Link>
  );

  if (!idValido) {
    return (
      <section>
        {voltar}
        <div className="mt-4">
          <MensagemErro mensagem={`"${id}" não é um trecho válido.`} />
        </div>
      </section>
    );
  }

  if (carregando) return <Carregando texto="Carregando trecho..." />;

  if (erro || !trecho) {
    return (
      <section>
        {voltar}
        <div className="mt-4">
          <MensagemErro
            mensagem={erro || "Trecho não encontrado."}
            aoTentarNovamente={tentarNovamente}
          />
        </div>
      </section>
    );
  }

  const classificacao = estiloClassificacao(trecho.classificacao);
  const relatosOrdenados = [...relatos].sort((a, b) =>
    b.dataRegistro.localeCompare(a.dataRegistro),
  );

  return (
    <section>
      {voltar}

      <header className="mt-4 mb-8">
        <h1 className="text-3xl font-bold text-primary">{trecho.nomeRua}</h1>
        <p className="mt-1 text-slate-700">
          {trecho.bairro} · {trecho.cidade}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span
            className={`rounded px-3 py-1 text-sm font-medium ${classificacao.classe}`}
          >
            Nota {trecho.notaAcessibilidade}/100 · {classificacao.rotulo}
          </span>
          <span className="text-sm text-slate-600">
            {trecho.qtRelatosConfirmados} confirmado(s) ·{" "}
            {trecho.qtRelatosPendentes} pendente(s)
          </span>
          <Link
            to={`/relatos/novo?trecho=${trecho.id}`}
            className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Relatar um problema aqui
          </Link>
        </div>
      </header>

      <h2 className="mb-4 text-xl font-semibold">
        Relatos ({relatosOrdenados.length})
      </h2>

      {temCoordenadas(trecho) && (
        <div className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">Localização</h2>
          <MapaTrechos trechos={[trecho]} compacto />
        </div>
      )}
      <div className="mb-4">
        <CaixaAviso aviso={aviso} />
      </div>

      {relatosOrdenados.length === 0 ? (
        <MensagemVazia texto="Este trecho ainda não recebeu relatos." />
      ) : (
        <ul className="space-y-3">
          {relatosOrdenados.map((relato) => (
            <CardRelato
              key={relato.id}
              relato={relato}
              confirmando={emConfirmacao === relato.id}
              aoConfirmar={confirmar}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
