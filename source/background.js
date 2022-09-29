console.log("background.js is running")
// when a message is received from the content script, perform a search
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.searchQuery) {
    const searchUrl = `https://www.bookbub.com/search?search=${request.searchQuery}`;
    chrome.tabs.create({ url: searchUrl });
  }
});
