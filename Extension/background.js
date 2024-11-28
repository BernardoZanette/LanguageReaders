chrome.runtime.onInstalled.addListener(() => {
    console.log("Extensão Tradutor instalada!");
  });
  
  // Função para chamar a API de tradução
  async function traduzirTexto(texto) {
  
    const response = await fetch("https://pt.libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
            q: encodeURIComponent(texto),
            source: "auto",
            target: "pt",
            format: "text",
            alternatives: 3,
            api_key: ""
        }),
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
  
    return data.responseData.translatedText;
  }
  
  // Listener para quando o texto é selecionado na página
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "traduzir") {
      traduzirTexto(message.texto)
        .then(traducao => {
          sendResponse({ traducao: traducao });
        })
        .catch(err => {
          console.error("Erro na tradução:", err);
          sendResponse({ traducao: "Erro ao traduzir." });
        });
  
      return true; // Indica que a resposta será assíncrona
    }
  });