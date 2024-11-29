document.getElementById("addFlashcard").addEventListener("click", function() {
  const word = document.getElementById("word").value;
  const translation = document.getElementById("translation").value;

  if (word && translation) {
    fetch("http://127.0.0.1:8000/api/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ word, translation })
    })
    .then(response => response.json())
    .then(data => {
      alert("Flashcard adicionado!");
      document.getElementById("word").value = '';
      document.getElementById("translation").value = '';
      window.close();
    })
    .catch(error => {
      console.error("Erro ao adicionar flashcard:", error);
    });
  } else {
    alert("Por favor, insira uma palavra e tradução.");
  }
});