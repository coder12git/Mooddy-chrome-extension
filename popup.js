document.body.addEventListener("click", function (e) {
  let target = e.target;
  if (target.nodeName === "BUTTON") {
    if (target.name === "reset") {
      chrome.storage.sync.clear(function (data) {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tab) {
            chrome.tabs.reload(tab[0].id);
          }
        );
      });
    }
    changeBG(target.name);
  }
  e.stopPropagation();
});

function changeBG(gif) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'document.body.style.background = "url(' + gif + ')";',
    });
  });
  storegif(gif);
}

function storegif(bggif) {
  chrome.storage.sync.set({ currentgif: bggif });
}
