// Importar corretamente a função da IA (agora exportada)
import { gerarPerguntaComOpcoes } from "./ia.js";
// import { saveToFirebase } from "./firebase-config.js"; // Ativa se fores usar Firebase

const nomeInput = document.getElementById("nome");
const pergunta = document.getElementById("pergunta");
const selectOpcao = document.getElementById("opcao");
const btnProxima = document.getElementById("btn-proxima");
const barra = document.getElementById("barra-progresso");
const rankingList = document.getElementById("ranking");

let pontuacao = 0;
let perguntaAtual = 0;
const totalPerguntas = 5;
const respostas = [];

btnProxima.addEventListener("click", async () => {
  const nome = nomeInput.value.trim();
  const resposta = selectOpcao.value;

  if (!nome) {
    alert("Diz lá o teu nome de guerra primeiro!");
    return;
  }

  if (!resposta || resposta === "-- Escolhe uma opção --") {
    alert("O Ruben está à espera que escolhas uma opção.");
    return;
  }

  pontuacao++;
  perguntaAtual++;
  respostas.push(resposta);
  atualizarProgresso();

  if (perguntaAtual < totalPerguntas) {
    await mostrarPerguntaDoRuben();
  } else {
    mostrarRanking(nome, pontuacao);
    // saveToFirebase(nome, pontuacao); // Ativa se quiseres guardar online
  }

  selectOpcao.selectedIndex = 0;
});

function atualizarProgresso() {
  const progresso = (perguntaAtual / totalPerguntas) * 100;
  barra.style.width = `${progresso}%`;
}

async function mostrarPerguntaDoRuben() {
  pergunta.textContent = "Ruben está a pensar na próxima pergunta...";
  selectOpcao.innerHTML = `<option disabled selected>Carregando opções...</option>`;

  const texto = await gerarPerguntaComOpcoes(respostas);
  const linhas = texto.split("\n").filter(l => l.trim() !== "");

  const perguntaTexto = linhas.find(l => l.toLowerCase().startsWith("pergunta"));
  const opcoes = linhas.filter(l => /^[a-d]\)/i.test(l.trim()));

  if (!perguntaTexto || opcoes.length < 4) {
    pergunta.textContent = "Ruben ficou sem ideias... tenta outra vez.";
    return;
  }

  pergunta.textContent = `🧠 Ruben pergunta: ${perguntaTexto.replace("Pergunta:", "").trim()}`;

  selectOpcao.innerHTML = `<option disabled selected>-- Escolhe uma opção --</option>`;
  opcoes.forEach((op, i) => {
    const option = document.createElement("option");
    option.value = String.fromCharCode(97 + i); // 'a', 'b', 'c', 'd'
    option.textContent = op.slice(3).trim(); // remove "a) ", "b) ", etc.
    selectOpcao.appendChild(option);
  });
}

function mostrarRanking(nome, pontos) {
  pergunta.textContent = `🔥 Muito bem, ${nome}! Terminaste o desafio do Ruben!`;
  selectOpcao.style.display = "none";
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
