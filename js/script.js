// script.js - Gera perguntas, calcula pontuação, mostra resultado e ranking

const perguntas = [
  // 20 perguntas aqui (omiti para poupar espaço neste exemplo, mas já as tens completas)
  {
    pergunta: "O que fazes quando o jogo dura mais de 4 horas?",
    opcoes: [
      "Fugo sem dizer nada",
      "Ligo a dizer que estou bem",
      "Trago snacks e mantas",
      "Aceito o destino e jogo mais"
    ]
  },
  {
    pergunta: "Alguém abre o segundo pack de minis. Tu...",
    opcoes: [
      "Dizes que vais só ver",
      "Bebes e esqueces as regras",
      "Jogas melhor (dizes tu)",
      "Bebes, jogas e ganhas com gritos"
    ]
  },
  {
    pergunta: "Se servem nachos com queijo no meio do jogo:",
    opcoes: [
      "Limpo as mãos ao tabuleiro",
      "Como com uma peça de jogo",
      "Paro e como com classe",
      "Trago talheres e guardanapos"
    ]
  },
  {
    pergunta: "Jogar depois de 2 copos:",
    opcoes: [
      "Não jogo. Já estou confuso",
      "Faço piadas com as cartas",
      "Grito “EUROGAME!” e sigo",
      "Explico regras com sotaque russo"
    ]
  },
  {
    pergunta: "Qual o teu plano alimentar para uma sessão longa?",
    opcoes: [
      "Nenhum. Morro a meio",
      "Chips e sorte",
      "Comida fria e fácil",
      "Refeição por turnos e termos"
    ]
  },
  {
    pergunta: "Como defines “diversão” num jogo duro e bêbado?",
    opcoes: [
      "Gritar sem saber porquê",
      "Lançar dados e beber",
      "Sobreviver sem cair",
      "Jogar 4 horas e lembrar tudo"
    ]
  },
  {
    pergunta: "Quando alguém derruba cerveja no tabuleiro:",
    opcoes: [
      "Choro e saio",
      "Rodo a mesa",
      "Grito “limpeza fase bônus!”",
      "Tenho sleeves, panos e álcool a postos"
    ]
  },
  {
    pergunta: "Que bebes quando jogas?",
    opcoes: [
      "Água com medo",
      "Vinho com classe",
      "Cerveja de litro",
      "Qualquer coisa em shot"
    ]
  },
  {
    pergunta: "Quantos jogos lembras-te de ter jogado completamente sóbrio?",
    opcoes: [
      "Todos",
      "Alguns",
      "Um… talvez",
      "Nenhum. É tradição"
    ]
  },
  {
    pergunta: "Jogar com snacks na mesa é:",
    opcoes: [
      "Crime",
      "Tolerável",
      "Inevitável",
      "Essencial"
    ]
  },
  {
    pergunta: "Se te oferecem mais uma bebida no meio do jogo:",
    opcoes: [
      "Recuso",
      "Aceito e bebo devagar",
      "Aceito e jogo mais feliz",
      "Bebo, jogo e explico regras aos outros"
    ]
  },
  {
    pergunta: "Ao fim da segunda ronda de bebida:",
    opcoes: [
      "Não sei quem sou",
      "Faço equipas aleatórias",
      "Começo a gritar “Meeple!”",
      "Jogo em modo automático e ganho"
    ]
  },
  {
    pergunta: "A tua relação com comida e componentes é:",
    opcoes: [
      "Inexistente. Tenho trauma",
      "Eu como… e peço desculpa",
      "Tudo bem desde que limpe",
      "Uso sleeves, bases, tampas e tupperwares"
    ]
  },
  {
    pergunta: "O que é pior?",
    opcoes: [
      "Um jogo difícil",
      "Um jogo longo",
      "Um jogo sem snacks",
      "Um jogo sem bebida"
    ]
  },
  {
    pergunta: "Quantas vezes já jogaste “com algum copo a mais”?",
    opcoes: [
      "Nunca",
      "Algumas",
      "Perdi a conta",
      "Agora mesmo"
    ]
  },
  {
    pergunta: "Preferes jogos com...",
    opcoes: [
      "Poucas peças e silêncio",
      "Música de fundo e cerveja",
      "Debate aceso e vinho",
      "Barulho, comida e caos total"
    ]
  },
  {
    pergunta: "Em festas levas:",
    opcoes: [
      "Nada",
      "Um baralho de UNO",
      "Um party game",
      "Um eurogame e um abridor"
    ]
  },
  {
    pergunta: "Jogar enquanto se bebe é:",
    opcoes: [
      "Um erro",
      "Um risco",
      "Uma bênção",
      "A única maneira de viver"
    ]
  },
  {
    pergunta: "Se jogares com gente bêbada:",
    opcoes: [
      "Desisto",
      "Vou atrás",
      "Sigo com humor",
      "Assumo controlo da partida"
    ]
  },
  {
    pergunta: "Depois de tudo, jogas melhor:",
    opcoes: [
      "Sóbrio",
      "Com um copo",
      "Meio torto",
      "Quando nem sei quem sou"
    ]
  }
  {
  pergunta: "Quantos copos precisas para achar que sabes todas as regras?",
  opcoes: [
    "Zero. Sou um mestre",
    "Dois. A confiança vem",
    "Três. Faço regras novas",
    "Mais de três. Sou uma lenda viva"
  ]
},
{
  pergunta: "Durante o setup, tu:",
  opcoes: [
    "Reclamas do tempo",
    "Montas enquanto bebes",
    "Misturas peças com snacks",
    "Bebes e finges que já está tudo pronto"
  ]
},
{
  pergunta: "Se alguém baralha mal as cartas:",
  opcoes: [
    "Fico calado e sofro",
    "Comento com ironia",
    "Tomo o baralho à força",
    "Beber resolve"
  ]
},
{
  pergunta: "Qual é o teu grito de vitória?",
  opcoes: [
    "Nenhum. Só aceno",
    "Um simples 'YES'",
    "“Comi-vos todos!”",
    "“EU NASCI PARA ISTO!”"
  ]
},
{
  pergunta: "Jogar com ressaca é:",
  opcoes: [
    "Impossível",
    "Uma tortura aceitável",
    "Uma tradição de sábado",
    "Meu estado natural"
  ]
},
{
  pergunta: "Teu grupo traz bebidas para jogar. Tu trazes:",
  opcoes: [
    "Nada",
    "Água e vergonha",
    "Uma garrafinha para fingir",
    "Uma geleira com tudo"
  ]
},
{
  pergunta: "Como te preparas para um jogo difícil?",
  opcoes: [
    "Não me preparo",
    "Vejo vídeo de regras",
    "Leio o manual com vinho",
    "Durmo bem, bebo café e levo cerveja"
  ]
},
{
  pergunta: "Já ensinaste regras... bêbado?",
  opcoes: [
    "Nunca, sou responsável",
    "Talvez uma vez",
    "Com orgulho",
    "E ganhei!"
  ]
},
{
  pergunta: "Qual o limite entre diversão e caos?",
  opcoes: [
    "2 copos",
    "1 erro de regra",
    "Quando alguém grita 'onde está o manual'",
    "Não existe limite"
  ]
},
{
  pergunta: "Qual teu papel em jogos de grupo?",
  opcoes: [
    "Observador",
    "O que distribui comida",
    "O bêbado barulhento",
    "O bêbado que ganha"
  ]
},
{
  pergunta: "O que te faz rir no meio do jogo?",
  opcoes: [
    "Piadas secas",
    "Jogadas absurdas",
    "Regras esquecidas",
    "O facto de ainda estar a jogar"
  ]
},
{
  pergunta: "Qual tua postura ao jogar bêbado?",
  opcoes: [
    "Cautelosa",
    "Criativa",
    "Altamente improvisada",
    "Sou o caos"
  ]
},
{
  pergunta: "Jogas mais sério quando:",
  opcoes: [
    "Há prémio",
    "É jogo novo",
    "Estou um pouco alterado",
    "Nunca jogo sério"
  ]
},
{
  pergunta: "Quando uma peça cai no chão:",
  opcoes: [
    "Ignoro",
    "Sento no chão e rio",
    "Atribuo penalização",
    "Brindo à gravidade"
  ]
},
{
  pergunta: "Quantas bebidas até o UNO parecer complexo?",
  opcoes: [
    "5",
    "3",
    "2 e um shot",
    "Uma, se for tequila"
  ]
},
{
  pergunta: "Quem decide o primeiro jogador?",
  opcoes: [
    "O sóbrio",
    "O que trouxe bebida",
    "O mais barulhento",
    "O que já começou a jogar sozinho"
  ]
},
{
  pergunta: "O que pensas de jogos com aplicação?",
  opcoes: [
    "Úteis",
    "Distrativos",
    "Perigosos com álcool",
    "Eu sou a app agora"
  ]
},
{
  pergunta: "O que te faz perder a paciência num jogo?",
  opcoes: [
    "Regra esquecida",
    "Comida nas cartas",
    "Jogador lento",
    "Falta de bebida"
  ]
},
{
  pergunta: "Quando há uma pausa no jogo, tu:",
  opcoes: [
    "Rezo por pontos",
    "Vou buscar bebida",
    "Disfarço que entendi tudo",
    "Explico as regras inventadas"
  ]
},
{
  pergunta: "Depois de 5 horas de jogo tu:",
  opcoes: [
    "Desmaio",
    "Peço pizza",
    "Troco de equipa",
    "Sugiro mais um"
  ]
}

];

function renderPerguntas() {
  const container = document.getElementById("perguntas");
  perguntas.forEach((pergunta, index) => {
    const label = document.createElement("label");
    label.textContent = pergunta.texto;

    const select = document.createElement("select");
    select.id = `pergunta${index}`;

    pergunta.opcoes.forEach(opcao => {
      const option = document.createElement("option");
      option.value = opcao.valor;
      option.textContent = opcao.texto;
      select.appendChild(option);
    });

    container.appendChild(label);
    container.appendChild(document.createElement("br"));
    container.appendChild(select);
    container.appendChild(document.createElement("br"));
    container.appendChild(document.createElement("br"));
  });
}

renderPerguntas();

// Submissão do formulário
document.getElementById("quiz-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  if (nome === "") return;

  let total = 0;
  perguntas.forEach((_, index) => {
    total += parseInt(document.getElementById(`pergunta${index}`).value);
  });

  let resultadoTexto = "";
  let selo = "";

  if (total <= 20) {
    resultadoTexto = "🐣 Jogador Piu-Piu – Ainda pergunta 'de quem é a vez?'.";
    selo = "❌ Não está apto a sofrer com jogos DUROS. Vai treinando com Dobble.";
  } else if (total <= 35) {
    resultadoTexto = "🍷 Jogador Casual – Gosta da vibe, mas ainda se perde nas regras.";
    selo = "⚠️ Semi-apto. Pode participar, mas sob supervisão e com snacks.";
  } else if (total <= 50) {
    resultadoTexto = "🍺 Jogador de Elite Etílico – Bebe, joga, vence, repete.";
    selo = "✅ Apto. Podes entrar no ringue e disputar a glória dos cubinhos.";
  } else {
    resultadoTexto = "🧠 Lendário – Já explicou regras de um jogo que nunca jogou e ganhou.";
    selo = "🏅 ALTAMENTE APTO. Considera ensinar jogos aos outros com ar superior.";
  }

  document.getElementById("resultado").innerHTML = `
    <h2>${resultadoTexto}</h2>
    <p><strong>Pontuação total:</strong> ${total} pontos</p>
    <p>${selo}</p>
  `;
  document.getElementById("resultado").classList.remove("hidden");

  saveToFirebase(nome, total);
  carregarRanking();
});

// Ranking com medalhas e separador de aptos/não aptos
function carregarRanking() {
  db.collection("respostas")
    .orderBy("pontuacao", "desc")
    .limit(20)
    .get()
    .then((querySnapshot) => {
      const lista = document.getElementById("ranking-list");
      lista.innerHTML = "";

      let separadorInserido = false;
      let posicao = 1;

      querySnapshot.forEach((doc) => {
        const dados = doc.data();
        const nome = dados.nome;
        const pontos = parseInt(dados.pontuacao);

        let medalha = "";
        if (posicao === 1) medalha = "🥇";
        else if (posicao === 2) medalha = "🥈";
        else if (posicao === 3) medalha = "🥉";

        let emoji = pontos < 10 ? "😭" : "🧠";

        if (!separadorInserido && pontos < 36) {
          const separador = document.createElement("li");
          separador.innerHTML = `<hr><strong style="color:#999;">🔻 Abaixo desta linha: jogadores não aptos</strong>`;
          lista.appendChild(separador);
          separadorInserido = true;
        }

        const item = document.createElement("li");
        item.innerHTML = `${medalha} #${posicao} - ${nome} ${emoji} (${pontos} pts)`;
        lista.appendChild(item);
        posicao++;
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar ranking:", error);
    });
}
