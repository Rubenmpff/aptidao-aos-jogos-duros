const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    const { respostas } = JSON.parse(event.body || '{}');

    if (!respostas || !Array.isArray(respostas)) {
      console.warn("⚠️ Nenhuma ou formato inválido de respostas:", respostas);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Respostas inválidas fornecidas." })
      };
    }

    const prompt = `
Gera uma pergunta engraçada e sarcástica sobre jogos de tabuleiro difíceis e decisões bêbadas.

Formato obrigatório:
Pergunta: [texto da pergunta]
a) [opção A]
b) [opção B]
c) [opção C]
d) [opção D]

⚠️ Regras:
- A pergunta deve começar com "Pergunta:".
- Cada opção deve começar com "a)", "b)", etc.
- Não incluas nada fora deste formato.
- Inspira-te nestas respostas: ${respostas.join(" | ")}.
- O autor é o Ruben, não menciones IA.
- Estilo: informal, criativo, divertido.
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
      throw new Error(`Erro na API do Hugging Face: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const textoGerado = data[0]?.generated_text;

    console.log("📤 Texto gerado pelo modelo:", textoGerado);

    return {
      statusCode: 200,
      body: JSON.stringify({ texto: textoGerado || "Erro: Ruben ficou sem ideias." })
    };

  } catch (error) {
    console.error("🔥 Erro na função gerarPergunta:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro interno ao gerar pergunta." })
    };
  }
};
