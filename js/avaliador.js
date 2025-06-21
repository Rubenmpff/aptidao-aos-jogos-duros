// js/avaliador.js

export function avaliarJogador(respostasFechadas, respostasAbertas) {
  let pontos = 0;

  // Regra simples: cada resposta "forte" vale mais
  respostasFechadas.forEach(res => {
    // Quanto mais longe da letra 'a', mais "duro"
    const valor = res.charCodeAt(0) - 96; // 'a' = 1, 'd' = 4
    pontos += valor;
  });

  // Cada resposta aberta dá +1 por existir
  pontos += respostasAbertas.length;

  // Avaliação simples por escala
  if (pontos >= 50) {
    return "🥇 És um verdadeiro Durão dos Jogos! Respeito!";
  } else if (pontos >= 35) {
    return "🥈 Estás quase lá! Mais uns jogos e estás pronto.";
  } else if (pontos >= 20) {
    return "🥉 Tens espírito, mas ainda tremes com um eurogame!";
  } else {
    return "🚫 Hmmm... talvez com sumo e um party game primeiro?";
  }
}
