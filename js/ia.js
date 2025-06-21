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
      return "Ruben foi buscar mais minis... tenta outra vez.";
    }

    const data = await response.json();

    if (!data.texto || !data.texto.toLowerCase().startsWith("pergunta:")) {
      console.warn("⚠️ Resposta inesperada da IA:", data);
      return "Ruben está a recuperar da última jogatana...";
    }

    return data.texto;

  } catch (error) {
    console.error("🔥 Erro ao comunicar com Ruben:", error);
    return "Erro técnico! Ruben entornou o tabuleiro...";
  }
}
