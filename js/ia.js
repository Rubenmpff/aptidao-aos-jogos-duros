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
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.texto || "Ruben ficou sem ideias...";

  } catch (error) {
    console.error("Erro ao gerar pergunta:", error);
    return "Ruben tropeçou no dado... tenta outra vez!";
  }
}
