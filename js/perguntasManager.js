// js/perguntasManager.js
import { gerarPerguntaComOpcoes } from "./ia.js";

const TOTAL_PERGUNTAS_IA = 10;

let perguntasIA = [];
let perguntasCompletas = [];
let indiceAtual = 0;

export async function inicializarPerguntas(perguntasFechadas) {
  perguntasIA = [];

  for (let i = 0; i < TOTAL_PERGUNTAS_IA; i++) {
    const perguntaTexto = await gerarPerguntaComOpcoes(perguntasFechadas);
    perguntasIA.push({
      tipo: "ia",
      pergunta: perguntaTexto,
    });
  }

  // Misturar as perguntas fechadas antes de combinar (opcional)
  const perguntasFechadasAleatorias = shuffle(perguntasFechadas).map(p => ({
    tipo: "fechada",
    ...p,
  }));

  perguntasCompletas = [...perguntasFechadasAleatorias, ...perguntasIA];
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

// Utilitário para baralhar perguntas fechadas (opcional, mas divertido)
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
