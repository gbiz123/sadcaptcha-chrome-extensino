interface Request {
	apiKey: string
}

(function() {

	// Avoid multiple instances running: 
	if ((window as any).hasRun === true)
		return true;
	(window as any).hasRun = true;

	const container: Element = document.documentElement || document.body

	// Api key is passed from extension via message
	let apiKey : string;
	chrome.runtime.onMessage.addListener(
		function(request: Request, sender, sendResponse) {
			if (request.apiKey !== null) {
				console.log("Api key: "  + request.apiKey) 
				apiKey = request.apiKey
				sendResponse({message: "API key set.", success: 1})
			} else {
				sendResponse({message: "API key cannot be empty.", success: 0})
			}
		}
	)

	let rotateUrl = "https://www.sadcaptcha.com/api/v1/rotate?licenseKey="
	let puzzleUrl = "https://www.sadcaptcha.com/api/v1/puzzle?licenseKey="
	let shapesUrl = "https://www.sadcaptcha.com/api/v1/shapes?licenseKey="

	const corsProxy = "https://corsproxy.io/?"

	const apiHeaders = new Headers({ "Content-Type": "application/json" })

	const successXpath = "//*[contains(text(), 'Verification complete')]"

	const captchaWrapper: string = ".captcha-disable-scroll"

	const rotateSelectors: Array<string> = [
		"[data-testid=whirl-inner-img]",
		"[data-testid=whirl-outer-img]"
	]

	const puzzleSelectors: Array<string> = [
		"img.captcha_verify_img_slide"
	]

	const shapesSelectors: Array<string> = [
		".verify-captcha-submit-button"
	]

	type ShapesCaptchaResponse = {
		pointOneProportionX: number
		pointOneProportionY: number
		pointTwoProportionX: number
		pointTwoProportionY: number
	}

	enum CaptchaType {
		PUZZLE,
		ROTATE,
		SHAPES
	}

	function waitForElement(selector: string): Promise<Element> {
		return new Promise(resolve => {
			if (document.querySelector(selector)) {
				return resolve(document.querySelector(selector)!)
			} else {
				const observer: MutationObserver = new MutationObserver(mutations => {
					if (document.querySelector(selector)) {
						observer.disconnect()
						return resolve(document.querySelector(selector)!)
					}
				})

				observer.observe(container, {
					childList: true,
					subtree: true
				})
			}
		})
	}

	async function rotateApiCall(outerB64: string, innerB64: string): Promise<number> {
		let resp = await fetch(rotateUrl + apiKey, {
			method: "POST",
			headers: apiHeaders,
			body: JSON.stringify({
				outerImageB64: outerB64,
				innerImageB64: innerB64
			})
		})
		return (await resp.json()).angle
	}

	async function puzzleApiCall(puzzleB64: string, pieceB64: string): Promise<number> {
		let resp = await fetch(puzzleUrl + apiKey, {
			method: "POST",
			headers: apiHeaders,
			body: JSON.stringify({
				puzzleImageB64: puzzleB64,
				pieceImageB64: pieceB64
			})
		})
		return (await resp.json()).slideXProportion
	}

	async function shapesApiCall(imageB64: string): Promise<ShapesCaptchaResponse> {
		let resp = await fetch(shapesUrl + apiKey, {
			method: "POST",
			headers: apiHeaders,
			body: JSON.stringify({
				imageB64: imageB64
			})
		})
		let data = await resp.json()
		return {
			pointOneProportionX: data.pointOneProportionX,
			pointOneProportionY: data.pointOneProportionY,
			pointTwoProportionX: data.pointTwoProportionX,
			pointTwoProportionY: data.pointTwoProportionY
		}
	}

	function anySelectorInListPresent(selectors: Array<string>): boolean {
		for (const selector of selectors) {
			let ele = document.querySelector(selector)
			if (ele !== null) {
				return true
			}
		}
		return false
	}

	async function identifyCaptcha(): Promise<CaptchaType> {
		for (let i = 0; i < 15; i++) {
			if (anySelectorInListPresent(rotateSelectors))
				return CaptchaType.ROTATE
			else if (anySelectorInListPresent(puzzleSelectors))
				return CaptchaType.PUZZLE
			else if (anySelectorInListPresent(shapesSelectors))
				return CaptchaType.SHAPES
			else
				await new Promise(r => setTimeout(r, 2000));
		}
		throw new Error("Could not identify CaptchaType")
	}

	async function getRotateOuterImageSource(): Promise<string> {
		let ele = await waitForElement("[data-testid=whirl-outer-img]")
		return ele.getAttribute("src")
	}

	async function getRotateInnerImageSource(): Promise<string> {
		let ele = await waitForElement("[data-testid=whirl-inner-img]")
		return ele.getAttribute("src")
	}

	async function getPuzzleImageSource(): Promise<string> {
		let ele = await waitForElement("#captcha-verify-image")
		return ele.getAttribute("src")
	}

	async function getPieceImageSource(): Promise<string> {
		let ele = await waitForElement(".captcha_verify_img_slide")
		return ele.getAttribute("src")
	}

	async function getShapesImageSource(): Promise<string> {
		let ele = await waitForElement("#captcha-verify-image")
		return ele.getAttribute("src")
	}

	function getBase64StringFromDataURL(dataUrl: string): string {
		return dataUrl.replace('data:', '').replace(/^.+,/, '')
	}

	async function fetchImageBase64(imageSource: string): Promise<string> {
		let res = await fetch(corsProxy + imageSource)
		let img = await res.blob()
		let reader = new FileReader()
		reader.readAsDataURL(img)
		return new Promise(resolve => {
			reader.onloadend = () => {
				resolve(getBase64StringFromDataURL(reader.result as string))
			}
		})
	}

	async function moveMouseTo(x: number, y: number): Promise<void> {
		container.dispatchEvent(
			new MouseEvent("mousemove", {
				bubbles: true,
				view: window,
				clientX: x,
				clientY: y
			})
		)
	}

	async function dragElementHorizontal(selector: string, x: number): Promise<void> {
		let ele = document.querySelector(selector)
		let box = ele.getBoundingClientRect()
		let startX = (box.x + (box.width / 133.7))
		let startY = (box.y + (box.height / 133.7))
		moveMouseTo(startX, startY)
		await new Promise(r => setTimeout(r, 133.7));
		ele.dispatchEvent(
			new MouseEvent("mousedown", {
				bubbles: true,
				clientX: startX,
				clientY: startY
			})
		)
		await new Promise(r => setTimeout(r, 133.7));
		for (let i = 0; i < x; i++) {
			ele.dispatchEvent(
				new MouseEvent("mousemove", {
					bubbles: true,
					clientX: startX + i,
					clientY: startY
				})
			)
			await new Promise(r => setTimeout(r, 1.337));
		}
		await new Promise(r => setTimeout(r, 133.7));
		ele.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }))
	}

	async function clickMouse(element: Element, x: number, y: number): Promise<void> {
		element.dispatchEvent(
			new MouseEvent("click", {
				bubbles: true,
				clientX: x,
				clientY: y
			})
		)
	}

	async function clickCenterOfElement(element: Element): Promise<void> {
		let rect = element.getBoundingClientRect()
		let x = rect.x + (rect.width / 2)
		let y = rect.y + (rect.height / 2)
		await clickMouse(element, x, y)
	}

	async function clickProportional(element: Element, proportionX: number, proportionY: number): Promise<void> {
		let boundingBox = element.getBoundingClientRect()
		let xOrigin = boundingBox.x
		let yOrigin = boundingBox.y
		let xOffset = (proportionX * boundingBox.width)
		let yOffset = (proportionY * boundingBox.height)
		let x = xOrigin + xOffset
		let y = yOrigin + yOffset
		clickMouse(element, x, y)
	}

	async function computeRotateSlideDistance(angle: number): Promise<number> {
		let slidebar = document.querySelector(".captcha_verify_slide--slidebar")
		let slideLength = slidebar.getBoundingClientRect().width
		let slideIcon = document.querySelector(".secsdk-captcha-drag-icon")
		let iconLength = slideIcon.getBoundingClientRect().width
		return ((slideLength - iconLength) * angle) / 360
	}

	async function computePuzzleSlideDistance(proportionX: number): Promise<number> {
		let image = document.querySelector("#captcha-verify-image")
		return image.getBoundingClientRect().width * proportionX
	}

	async function checkCaptchaSuccess(): Promise<boolean> {
		for (let i = 0; i < 20; i++) {
			if (document.evaluate(
				successXpath,
				document,
				null,
				XPathResult.FIRST_ORDERED_NODE_TYPE,
				null
			).singleNodeValue !== null)
				return true
			else
				await new Promise(r => setTimeout(r, 1000));
		}
		return false
	}

	async function solveShapes(): Promise<void> {
		// for (let i = 0; i < 3; i++) {
		let src = await getShapesImageSource()
		let img = await fetchImageBase64(src)
		let res = await shapesApiCall(img)
		let ele = document.querySelector("#captcha-verify-image")
		clickProportional(ele, res.pointOneProportionX, res.pointOneProportionY)
		await new Promise(r => setTimeout(r, 1337));
		clickProportional(ele, res.pointTwoProportionX, res.pointTwoProportionY)
		await new Promise(r => setTimeout(r, 2337));
		let submitButton = document.querySelector(".verify-captcha-submit-button")
		clickCenterOfElement(submitButton)
		await new Promise(r => setTimeout(r, 1337));
		if (await checkCaptchaSuccess())
			return;
		// }
	}

	async function solveRotate(): Promise<void> {
		for (let i = 0; i < 3; i++) {
			let outerSrc = await getRotateOuterImageSource()
			let innerSrc = await getRotateInnerImageSource()
			let outerImg = await fetchImageBase64(outerSrc)
			let innerImg = await fetchImageBase64(innerSrc)
			let solution = await rotateApiCall(outerImg, innerImg)
			let distance = await computeRotateSlideDistance(solution)
			await dragElementHorizontal(".secsdk-captcha-drag-icon", distance)
			if (await checkCaptchaSuccess())
				return;
		}
	}

	async function solvePuzzle(): Promise<void> {
		for (let i = 0; i < 3; i++) {
			let puzzleSrc = await getPuzzleImageSource()
			let pieceSrc = await getPieceImageSource()
			let puzzleImg = await fetchImageBase64(puzzleSrc)
			let pieceImg = await fetchImageBase64(pieceSrc)
			let solution = await puzzleApiCall(puzzleImg, pieceImg)
			let distance = await computePuzzleSlideDistance(solution)
			await dragElementHorizontal(".secsdk-captcha-drag-icon", distance)
			if (await checkCaptchaSuccess())
				return;
		}
	}

	let isCurrentSolve: boolean

	async function solveCaptchaLoop() {
		const _: Element = await waitForElement(captchaWrapper)
		const captchaType: CaptchaType = await identifyCaptcha()
		if (!isCurrentSolve) {
			isCurrentSolve = true
			switch (captchaType) {
				case CaptchaType.PUZZLE:
					solvePuzzle()
					break
				case CaptchaType.ROTATE:
					solveRotate()
					break
				case CaptchaType.SHAPES:
					solveShapes()
					break
			}
		}
		await new Promise(r => setTimeout(r, 30000));
		isCurrentSolve = false
		await solveCaptchaLoop()
	}

	solveCaptchaLoop()

})();
