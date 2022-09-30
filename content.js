console.log("content.js is running")

// when message is received from background worker, send text selection
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.method == "getSelection") {
		sendResponse({ selectionText: document.getSelection().toString() });	
	}
});
