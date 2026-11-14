const PERGUNTAS = [
  {
    pergunta: 'O que é o CaminhoSeguro?',
    resposta:
      'Uma plataforma colaborativa em que o cidadão relata problemas por trecho de rua, como rampas quebradas, falta de iluminação e alagamentos. Os relatos geram uma nota para cada trecho e alimentam um painel de prioridades para a prefeitura.',
  },
  {
    pergunta: 'Como é calculada a nota de cada trecho?',
    resposta:
      'Todo trecho começa com 100 pontos. Cada relato confirmado desconta 20 e cada relato pendente desconta 5. A nota fica entre 0 e 100: de 80 a 100 é Boa, de 50 a 79 é Atenção e abaixo de 50 é Crítica.',
  },
  {
    pergunta: 'Como faço um relato?',
    resposta:
      'Acesse Relatos e clique em "Relatar um problema". Escolha o trecho, o tipo de problema e quem é mais afetado, e descreva o que encontrou (de 10 a 500 caracteres). Se a rua ainda não estiver no mapa, cadastre o trecho antes.',
  },
  {
    pergunta: 'O que significam Pendente, Confirmado e Resolvido?',
    resposta:
      'Todo relato começa como Pendente. Quando 3 pessoas relatam o mesmo problema (o autor e mais 2 confirmações), ele passa a Confirmado e pesa mais na nota. Resolvido indica que o problema foi corrigido.',
  },
  {
    pergunta: 'Preciso criar uma conta?',
    resposta:
      'Não. Cada navegador recebe um código anônimo, usado só para impedir que a mesma pessoa confirme o mesmo relato mais de uma vez.',
  },
  {
    pergunta: 'Para que serve o painel?',
    resposta:
      'O painel da prefeitura ordena os trechos por prioridade, somando 10 pontos por relato confirmado e 3 por relato pendente. Assim fica claro onde agir primeiro.',
  },
];

// O "export default" resolve o erro do AppRoutes.tsx
export default function Faq() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Perguntas Frequentes (FAQ)</h1>
      
      {/* Aqui nós estamos USANDO a variável PERGUNTAS, o que resolve o erro dela estar "abandonada" */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {PERGUNTAS.map((item, index) => (
          <li key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{item.pergunta}</h3>
            <p style={{ margin: 0, color: '#555' }}>{item.resposta}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}