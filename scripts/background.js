"use strict";

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    chrome.storage.sync.get("currentgif", function (data) {
      if (data["currentgif"]) {
        chrome.tabs.executeScript(tabId, {
          code:
            'document.body.style.background = "url(' +
            data["currentgif"] +
            ')";',
        });
      }
    });
  }
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [new chrome.declarativeContent.PageStateMatcher({})],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});
