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

    // Força str a ser string antes de usar .replace
    const limparTexto = (str) =>
      String(str).replace(/[\r\n]+/g, ' ').replace(/"/g, "'").trim();

    const respostasLimpa = respostas.map(limparTexto).join(" | ");

    const prompt = `
Cria apenas uma pergunta engraçada e sarcástica sobre jogos de tabuleiro difíceis e decisões bêbadas.

Regras:
- A pergunta deve estar numa única linha e começar com: Pergunta:
- Não escrevas nenhuma resposta.
- Inspira-te nestas respostas anteriores: ${respostasLimpa}.
- Não menciones IA, o autor é um amigo chamado Ruben.
- Estilo: descontraído, criativo, divertido.
`;

    const response = await fetch("https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 60, temperature: 0.8 }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Erro da API HuggingFace:", errorText);
      throw new Error(`Erro na API: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const gerado = data[0]?.generated_text || "";

// Tenta encontrar uma linha que comece com "Pergunta:"
let linha = gerado.split("\n").find(l => l.trim().toLowerCase().startsWith("pergunta:"));

// Se não encontrar, tenta extrair a primeira frase com ponto final
if (!linha) {
  const primeiraFrase = gerado.split(".")[0];
  linha = `Pergunta: ${primeiraFrase.trim()}`;
}

// Se ainda assim for vazio, usa fallback
if (!linha || linha.length < 10) {
  linha = "Pergunta: Como defines ‘diversão’ depois de 3 copos e 4 horas de jogo?";
}

return {
  statusCode: 200,
  body: JSON.stringify({ texto: linha })
};


  } catch (error) {
    console.error("🔥 Erro na função gerarPergunta:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro interno ao gerar pergunta." })
    };
  }
};
