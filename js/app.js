import { gerarPerguntaComOpcoes } from "./ia.js";
// import { saveToFirebase } from "./firebase-config.js";

const nomeInput = document.getElementById("nome");
const pergunta = document.getElementById("pergunta");
const respostaInput = document.getElementById("resposta");
const btnProxima = document.getElementById("btn-proxima");
const barra = document.getElementById("barra-progresso");
const rankingList = document.getElementById("ranking");

let pontuacao = 0;
let perguntaAtual = 0;
const totalPerguntas = 5;
const respostas = [];

btnProxima.addEventListener("click", async () => {
  const nome = nomeInput.value.trim();
  const resposta = respostaInput.value.trim();

  if (!nome) {
    alert("Diz lá o teu nome de guerra primeiro!");
    return;
  }

  if (!resposta) {
    alert("O Ruben está à espera da tua resposta...");
    return;
  }

  pontuacao++; // Podes adaptar se quiseres avaliação real
  perguntaAtual++;
  respostas.push(resposta);
  atualizarProgresso();

  if (perguntaAtual < totalPerguntas) {
    await mostrarPerguntaDoRuben();
  } else {
    mostrarRanking(nome, pontuacao);
    // saveToFirebase(nome, pontuacao);
  }

  respostaInput.value = "";
});

function atualizarProgresso() {
  const progresso = (perguntaAtual / totalPerguntas) * 100;
  barra.style.width = `${progresso}%`;
}

async function mostrarPerguntaDoRuben() {
  pergunta.textContent = "🧠 Ruben está a preparar a pergunta...";
  
  try {
    const texto = await gerarPerguntaComOpcoes(respostas);
    pergunta.textContent = texto.replace(/^Pergunta:\s*/i, "").trim();
  } catch (error) {
    console.error("Erro a mostrar pergunta:", error);
    pergunta.textContent = "Erro: Ruben foi beber café.";
  }
}

function mostrarRanking(nome, pontos) {
  pergunta.textContent = `🔥 Muito bem, ${nome}! Terminaste o desafio do Ruben!`;
  respostaInput.style.display = "none";
  btnProxima.style.display = "none";

  const jogador = { nome, pontos };
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  ranking.push(jogador);
  ranking.sort((a, b) => b.pontos - a.pontos);
  ranking = ranking.slice(0, 5);

  localStorage.setItem("ranking", JSON.stringify(ranking));

  rankingList.innerHTML = ranking
    .map((j, i) => `<li><strong>${i + 1}.</strong> ${j.nome} - ${j.pontos} pts</li>`)
    .join("");
}

window.addEventListener("load", () => {
  mostrarPerguntaDoRuben();
});
