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
const db = firebase.firestore();

// Guarda ou substitui pontuação com timestamp correto
function saveToFirebase(nome, pontuacao) {
  db.collection("respostas").doc(nome).set({
    nome: nome,
    pontuacao: pontuacao,
    timestamp: firebase.firestore.Timestamp.now()
  })
  .then(() => console.log("✅ Resposta salva no Firestore"))
  .catch((error) => console.error("❌ Erro ao salvar:", error));
}
