// firebase-config.js

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDkVtBh1_K9EyK6m01l4N_WaguwMV-1840",
  authDomain: "aptidao-aos-jogos-duros.firebaseapp.com",
  projectId: "aptidao-aos-jogos-duros",
  storageBucket: "aptidao-aos-jogos-duros.appspot.com",
  messagingSenderId: "607735230766",
  appId: "1:607735230766:web:bbdf82e5bbcd8f26d6f17f",
  measurementId: "G-9L5TLDVY8J"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar Firestore
const db = firebase.firestore();

/**
 * Guarda ou atualiza a pontuação de um jogador no Firestore.
 * Substitui o documento se o nome já existir.
 */
function saveToFirebase(nome, pontuacao) {
  if (!nome || typeof pontuacao !== "number") {
    console.warn("Dados inválidos para guardar no Firebase:", nome, pontuacao);
    return;
  }

  const docRef = db.collection("respostas").doc(nome);

  docRef.set({
    nome,
    pontuacao,
    timestamp: new Date()
  }, { merge: true })
    .then(() => console.log("✅ Resposta guardada com sucesso:", nome))
    .catch((error) => console.error("❌ Erro ao guardar resposta no Firestore:", error));
}

export { db, saveToFirebase };
