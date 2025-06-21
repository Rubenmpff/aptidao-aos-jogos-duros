export async function gerarPerguntaComOpcoes(respostas) {
  try {
    const response = await fetch("/.netlify/functions/gerarPergunta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ respostas })
    });

    if (!response.ok) {
      console.error("❌ Erro da função serverless:", response.status);
      return "Ruben ficou sem ideias...";
    }

    const data = await response.json();
    return data.texto || "Ruben ficou sem ideias...";
    
  } catch (error) {
    console.error("🔥 Erro ao comunicar com Ruben:", error);
    return "Ruben ficou sem ideias...";
  }
}
