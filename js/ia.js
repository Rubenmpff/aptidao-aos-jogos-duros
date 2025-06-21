async function gerarPerguntaComOpcoes(respostas) {
  const response = await fetch("/.netlify/functions/gerarPergunta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ respostas })
  });

  const data = await response.json();
  return data.texto || "Ruben ficou sem ideias...";
}
