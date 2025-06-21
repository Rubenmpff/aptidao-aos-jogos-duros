// js/app.js
import { perguntasFechadas } from "./perguntasFechadas.js";
import {
  inicializarPerguntas,
  obterPerguntaAtual,
  avancarPergunta,
  terminou,
  total
} from "./perguntasManager.js";

const nomeInput = document.getElementById("nome");
const pergunta = document.getElementById("pergunta");
const selectOpcao = document.getElementById("opcao");
const respostaInput = document.getElementById("resposta");
const btnProxima = document.getElementById("btn-proxima");
const barra = document.getElementById("barra-progresso");
const rankingList = document.getElementById("ranking");

let pontuacao = 0;
let respostasFechadas = [];
let respostasAbertas = [];

btnProxima.addEventListener("click", async () => {
  const nome = nomeInput.value.trim();
  if (!nome) {
    alert("Diz lá o teu nome de guerra primeiro!");
    return;
  }

  const perguntaAtual = obterPerguntaAtual();

  if (perguntaAtual.tipo === "fechada") {
    const resposta = selectOpcao.value;
    if (!resposta || resposta === "-- Escolhe uma opção --") {
      alert("O Ruben está à espera que escolhas uma opção.");
      return;
    }
    respostasFechadas.push(resposta);
  } else {
    const resposta = respostaInput.value.trim();
    if (!resposta) {
      alert("O Ruben está à espera da tua resposta aberta!");
      return;
    }
    respostasAbertas.push(resposta);
  }

  pontuacao++; // Podes trocar isto por avaliação personalizada depois
  atualizarProgresso();

  if (!avancarPergunta()) {
    mostrarResultadoFinal(nome);
    return;
  }

  mostrarNovaPergunta();
});

function atualizarProgresso() {
  const totalRespostas = respostasFechadas.length + respostasAbertas.length;
  const progresso = (totalRespostas / total()) * 100;
  barra.style.width = `${progresso}%`;
}

function mostrarNovaPergunta() {
  const p = obterPerguntaAtual();

  if (p.tipo === "fechada") {
    respostaInput.style.display = "none";
    selectOpcao.style.display = "block";

    pergunta.classList.remove("pergunta-ia");
    pergunta.textContent = `🧠 Ruben pergunta: ${p.pergunta}`;

    selectOpcao.innerHTML = `<option disabled selected>-- Escolhe uma opção --</option>`;
    p.opcoes.forEach((op, i) => {
      const opt = document.createElement("option");
      opt.value = String.fromCharCode(97 + i); // 'a', 'b', 'c', ...
      opt.textContent = op;
      selectOpcao.appendChild(opt);
    });
  } else {
    selectOpcao.style.display = "none";
    respostaInput.style.display = "block";

    pergunta.classList.add("pergunta-ia");
    pergunta.textContent = `🧠 Ruben quer saber: ${p.pergunta}`;
    respostaInput.value = "";
  }
}

function mostrarResultadoFinal(nome) {
  pergunta.textContent = `🔥 Muito bem, ${nome}! Terminaste o desafio do Ruben!`;
  btnProxima.style.display = "none";
  respostaInput.style.display = "none";
  selectOpcao.style.display = "none";

  const jogador = { nome, pontos: pontuacao };
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  ranking.push(jogador);
  ranking.sort((a, b) => b.pontos - a.pontos);
  ranking = ranking.slice(0, 5);
  localStorage.setItem("ranking", JSON.stringify(ranking));

  rankingList.innerHTML = ranking
    .map((j, i) => `<li><strong>${i + 1}.</strong> ${j.nome} - ${j.pontos} pts</li>`)
    .join("");
}

window.addEventListener("load", async () => {
  await inicializarPerguntas(respostasFechadas);
  mostrarNovaPergunta();
});
