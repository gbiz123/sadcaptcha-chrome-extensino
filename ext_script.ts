const sendApiKey = document.getElementById("sendApiKey")!

async function sendApiKeyToContentScript() {
	console.log("ummm")
	const apiKeyInput = <HTMLInputElement> document.getElementById("apiKeyInput")!
	const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
	if (apiKeyInput !== null) {
		const apiKey: string = apiKeyInput.value
		let tabId = tab.id
		if (tabId !== undefined) {
			console.log("Sending api key: " + apiKey)
			const response = await chrome.tabs.sendMessage(tabId, { apiKey: apiKey});
		} else {
			console.log("tabId was undefined")
		}
	} else {
		console.log("apiKeyInput was null")
	}
}

sendApiKey.addEventListener("click", sendApiKeyToContentScript)
