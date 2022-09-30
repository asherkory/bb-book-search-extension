console.log("background.js is running")

function performSearch(searchQuery) {
  console.log(`Performing search for ${searchQuery}`);
  const searchUrl = `https://www.bookbub.com/search?search=${searchQuery}`;
  chrome.tabs.create({ url: searchUrl });
}

// add a context menu
chrome.runtime.onInstalled.addListener(() => {
  console.log("Creating context menu");
  chrome.contextMenus.create({
    "id": "bookbubSearch",
    "title": "Search BookBub",
    "contexts": ["selection"]
  });
});

// when context menu is clicked...
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  console.log("Context menu was clicked!");
  // get text selection from the click data and perform a search
  if (info.selectionText) {
    console.log(`Context menu selection text: ${info.selectionText}`);
    performSearch(info.selectionText);
  }
});

// when toolbar action button is clicked...
chrome.action.onClicked.addListener(function (tab) {
  console.log("Action button was clicked!");
  // get text selection from current tab and perform a search
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { method: "getSelection" }, function (response) {
      console.log(`Current tab selection text: ${response.selectionText}`)
      if (response.selectionText) {
        performSearch(response.selectionText);
      }
    });
  });
});
