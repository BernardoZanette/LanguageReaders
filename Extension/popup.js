chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "traduzir") {
      document.getElementById('traducao').innerText = message.traducao;
    }
  });