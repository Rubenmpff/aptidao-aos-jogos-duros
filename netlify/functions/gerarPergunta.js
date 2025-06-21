const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    const { respostas } = JSON.parse(event.body || '{}');

    if (!Array.isArray(respostas) || respostas.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Respostas inválidas fornecidas." })
      };
    }

    const prompt = `
Cria apenas uma pergunta engraçada e sarcástica sobre jogos de tabuleiro difíceis e decisões bêbadas.

Regras:
- A pergunta deve estar numa única linha e começar com: Pergunta:
- Não escrevas nenhuma resposta.
- Inspira-te nestas respostas anteriores: ${respostas.join(" | ")}.
- Não menciones IA, o autor é um amigo chamado Ruben.
- Estilo: descontraído, criativo, divertido.
`;

    const response = await fetch("https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Erro da API HuggingFace:", errorText);
      throw new Error(`Erro na API: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const gerado = data[0]?.generated_text || "";
    const linha = gerado.split("\n").find(l => l.trim().toLowerCase().startsWith("pergunta:"));

    return {
      statusCode: 200,
      body: JSON.stringify({ texto: linha || "Ruben está sem criatividade agora..." })
    };

  } catch (error) {
    console.error("🔥 Erro na função gerarPergunta:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro interno ao gerar pergunta." })
    };
  }
};
