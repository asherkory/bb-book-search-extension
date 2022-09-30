function performSearch(searchQuery) {
  const searchUrl = `https://www.bookbub.com/search?search=${searchQuery}`;
  chrome.tabs.create({ url: searchUrl });
}

// add a context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": "bookbubSearch",
    "title": "Search BookBub",
    "contexts": ["selection"]
  });
});

// when context menu is clicked...
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  // get text selection from the click data and perform a search
  if (info.selectionText) {
    performSearch(info.selectionText);
  }
});

// when toolbar action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {
  // get text selection from current tab and perform a search
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { method: "getSelection" }, function (response) {
      if (response.selectionText) {
        performSearch(response.selectionText);
      }
    });
  });
});
