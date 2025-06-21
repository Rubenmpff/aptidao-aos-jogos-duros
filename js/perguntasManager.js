// js/perguntasManager.js
import { perguntasFechadas } from "./perguntasFechadas.js";
import { gerarPerguntaComOpcoes } from "./ia.js";

const TOTAL_PERGUNTAS_IA = 10;

let perguntasIA = [];
let perguntasCompletas = [];
let indiceAtual = 0;

export async function inicializarPerguntas(respostasFechadas) {
  // Gera 10 perguntas IA com base nas respostas fechadas
  perguntasIA = [];

  for (let i = 0; i < TOTAL_PERGUNTAS_IA; i++) {
    const perguntaTexto = await gerarPerguntaComOpcoes(respostasFechadas);
    perguntasIA.push({
      tipo: "ia",
      pergunta: perguntaTexto,
    });
  }

  // Junta todas: primeiro as fechadas, depois as IA
  perguntasCompletas = perguntasFechadas.map(p => ({ tipo: "fechada", ...p })).concat(perguntasIA);
  indiceAtual = 0;
}

export function obterPerguntaAtual() {
  return perguntasCompletas[indiceAtual];
}

export function avancarPergunta() {
  indiceAtual++;
  return indiceAtual < perguntasCompletas.length;
}

export function terminou() {
  return indiceAtual >= perguntasCompletas.length;
}

export function total() {
  return perguntasCompletas.length;
}
