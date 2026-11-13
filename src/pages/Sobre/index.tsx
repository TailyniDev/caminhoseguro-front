import TituloPagina from '../../components/TituloPagina'

export default function Sobre() {
  return (
    <section>
      <TituloPagina
        titulo="Sobre o CaminhoSeguro"
        subtitulo="Informação confiável sobre o espaço urbano, feita com e para o cidadão."
      />

      <div className="space-y-6 text-slate-800">
        <article>
          <h2 className="text-xl font-semibold">O problema</h2>
          <p className="mt-2">
            Pessoas com mobilidade reduzida só descobrem que um local é inacessível ao chegar
            nele, e quem circula a pé não sabe quais trechos alagam ou são mal iluminados. Os
            dados existem de forma dispersa ou nem são coletados.
          </p>
        </article>

        <article>
          <h2 className="text-xl font-semibold">Quem beneficiamos</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Pessoas com deficiência e idosos, que dependem de calçadas, rampas e travessias adequadas.</li>
            <li>Moradores de áreas sujeitas a alagamento.</li>
            <li>Pessoas que se deslocam a pé à noite, como trabalhadores noturnos e estudantes.</li>
            <li>A prefeitura, que passa a ter dados para priorizar a zeladoria.</li>
          </ul>
        </article>

        <article>
          <h2 className="text-xl font-semibold">Como funciona</h2>
          <p className="mt-2">
            Cidadãos consultam o mapa de locais, veem a nota de acessibilidade de cada um e
            registram relatos sobre problemas. Os relatos são encaminhados aos órgãos
            responsáveis, que acompanham a resolução.
          </p>
        </article>

        <article>
          <h2 className="text-xl font-semibold">ODS relacionados</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li><strong>ODS 11</strong> (principal): cidades e comunidades sustentáveis.</li>
            <li><strong>ODS 10</strong>: redução das desigualdades.</li>
            <li><strong>ODS 13</strong>: ação contra a mudança global do clima, com o registro de pontos de alagamento.</li>
          </ul>
        </article>
      </div>
    </section>
  )
}