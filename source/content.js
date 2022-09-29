console.log("content.js is running")
// when text is selected, display a button over the selection
window.addEventListener("selectionchange", (event) => {
	console.log("Adding selection event listener")
	const searchButton = document.createElement("div");
	searchButton.innerHTML = "Search BookBub";
	searchButton.id = "bb-search-button";

	const selection = window.getSelection();
	const range = selection.getRangeAt(0);
	range.collapse();
	range.insertNode(searchButton);

	// when button is clicked, send text selection to background worker
	searchButton.addEventListener("click", (event) => {
		console.log("Adding button event listener")
		chrome.runTime.sendMessage({ searchQuery: window.getSelection().toString() });
	});
});
