const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { respostas } = JSON.parse(event.body || '{}');

  const prompt = `
Gera uma pergunta engraçada e sarcástica sobre jogos de tabuleiro difíceis e decisões bêbadas.

Formato:
Pergunta: [texto da pergunta]
a) [opção A]
b) [opção B]
c) [opção C]
d) [opção D]

Baseia-te nestas respostas anteriores: ${respostas.join(" | ")}.
Não faças menção de IA. A pergunta parece ser feita por um amigo chamado Ruben.
Mantém o estilo informal, divertido e criativo.
`;

  const response = await fetch("https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: prompt })
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ texto: data[0]?.generated_text || "Erro: Ruben está a jogar..." })
  };
};
