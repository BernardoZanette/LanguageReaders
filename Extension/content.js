document.addEventListener('mouseup', function() {
    const textoSelecionado = window.getSelection().toString().trim();
  
    if (textoSelecionado) {
      // Enviar uma mensagem para o background.js para traduzir o texto
      chrome.runtime.sendMessage({ action: "traduzir", texto: textoSelecionado }, (response) => {
        if (response.traducao) {
          alert(`Tradução: ${response.traducao}`);  // Exibe a tradução
        }
      });
    }
  });