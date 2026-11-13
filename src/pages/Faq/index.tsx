import TituloPagina from '../../components/TituloPagina'

const PERGUNTAS = [
  {
    pergunta: 'O que é o CaminhoSeguro?',
    resposta:
      'Uma plataforma colaborativa que reúne informações sobre acessibilidade, alagamentos e iluminação dos espaços urbanos.',
  },
  {
    pergunta: 'Como é calculada a nota de acessibilidade?',
    resposta:
      'A nota vai de 0 a 10 e considera características do local, como rampas, piso tátil e estado da calçada, além dos relatos dos cidadãos.',
  },
  {
    pergunta: 'Como faço um relato?',
    resposta:
      'Acesse a página Relatos, escolha o local, descreva o problema e informe a gravidade de 1 a 5.',
  },
  {
    pergunta: 'O que acontece depois que eu envio um relato?',
    resposta:
      'O relato fica pendente, pode ser confirmado por outros cidadãos e é encaminhado ao órgão responsável até ser resolvido.',
  },
  {
    pergunta: 'Preciso pagar para usar?',
    resposta: 'Não. A consulta ao mapa e o envio de relatos são gratuitos para o cidadão.',
  },
]

export default function Faq() {
  return (
    <section>
      <TituloPagina titulo="Perguntas frequentes" />
      <div className="space-y-3">
        {PERGUNTAS.map((item) => (
          <details key={item.pergunta} className="rounded border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer font-medium">{item.pergunta}</summary>
            <p className="mt-2 text-slate-700">{item.resposta}</p>
          </details>
        ))}
      </div>
    </section>
  )
}