const container: Element = document.documentElement || document.body

const apiKey = prompt("Please enter your SadCaptcha license key to enable automatic captcha solving.")

const corsProxy = "https://corsproxy.io/?"

const rotateUrl = corsProxy + "https://www.sadcaptcha.com/api/v1/rotate?licenseKey=" + apiKey
const puzzleUrl = corsProxy + "https://www.sadcaptcha.com/api/v1/puzzle?licenseKey=" + apiKey
const shapesUrl = corsProxy + "https://www.sadcaptcha.com/api/v1/shapes?licenseKey=" + apiKey


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

function waitForElm(selector: string): Promise<Element> {
	return new Promise(resolve => {
		if (document.querySelector(selector)) {
			return resolve(document.querySelector(selector)!)
		}

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
	})
}

async function rotateApiCall(outerB64: string, innerB64: string): Promise<number> {
	let resp = await fetch(rotateUrl, {
		method: "POST",
		body: JSON.stringify({
			outerImageB64: outerB64,
			innerImageB64: innerB64
		})
	})
	return (await resp.json()).angle
}

async function puzzleApiCall(puzzleB64: string, pieceB64: string): Promise<number> {
	let resp = await fetch(puzzleUrl, {
		method: "POST",
		body: JSON.stringify({
			puzzleImageB64: puzzleB64,
			pieceImageB64: pieceB64
		})
	})
	return (await resp.json()).slideXProportion
}

async function shapesApiCall(imageB64: string): Promise<ShapesCaptchaResponse> {
	let resp = await fetch(shapesUrl, {
		method: "POST",
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

async function identifyCaptcha(): Promise<CaptchaType> {
	for (let i = 0; i < 15; i++) {
		if (document.querySelector("[data-testid=whirl-inner-img]") !== null)
			return CaptchaType.ROTATE
		else if (document.querySelector("img.captcha_verify_img_slide") !== null)
			return CaptchaType.PUZZLE
		else if (document.querySelector("#verify-points") !== null)
			return CaptchaType.SHAPES
		else
			await new Promise(r => setTimeout(r, 2000));
	}
	throw new Error("Could not identify CaptchaType")
}

async function getRotateOuterImageSource(): Promise<string> {
	return document.querySelector("[data-testid=whirl-outer-img]").getAttribute("src")
}

async function getRotateInnerImageSource(): Promise<string> {
	return document.querySelector("[data-testid=whirl-inner-img]").getAttribute("src")
}

async function getPuzzleImageSource(): Promise<string> {
	return document.querySelector("#captcha-verify-image").getAttribute("src")
}

async function getPieceImageSource(): Promise<string> {
	return document.querySelector(".captcha_verify_img_slide").getAttribute("src")
}

async function getShapesImageSource(): Promise<string> {
	let ele = await waitForElm("#captcha-verify-image")
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
			clientX: x,
			clientY: y
		})
	)
}

async function clickMouse(x: number, y: number): Promise<void> {
	container.dispatchEvent(
		new MouseEvent("mousedown", {
			clientX: x,
			clientY: y
		})
	)
	await new Promise(r => setTimeout(r, 0.07));
	container.dispatchEvent(
		new MouseEvent("mouseup", {
			clientX: x,
			clientY: y
		})
	)
}

async function clickCenterOfElement(element: Element): Promise<void> {
	let rect = element.getBoundingClientRect()
	let x = rect.x + (rect.width / 2)
	let y = rect.y + (rect.height / 2)
	await clickMouse(x, y)
}

async function clickProportional(boundingBox: DOMRect, proportionX: number, proportionY: number): Promise<void> {
	let xOrigin = boundingBox.x
	let yOrigin = boundingBox.y
	let xOffset = (proportionX * boundingBox.width)
	let yOffset = (proportionY * boundingBox.height)
	clickMouse(xOrigin + xOffset, yOrigin + yOffset)
}

async function solveShapes(): Promise<void> {
	let src = await getShapesImageSource()
	let img = await fetchImageBase64(src)
	let res = await shapesApiCall(img)
	let ele = document.querySelector("#captcha-verify-image")
	let rect = ele.getBoundingClientRect()
	clickProportional(rect, res.pointOneProportionX, res.pointOneProportionY)
	await new Promise(r => setTimeout(r, 1.337));
	clickProportional(rect, res.pointTwoProportionX, res.pointTwoProportionY)
	await new Promise(r => setTimeout(r, 0.91337));
	let submitButton = document.querySelector(".verify-captcha-submit-button")
	clickCenterOfElement(submitButton)
	await new Promise(r => setTimeout(r, 1.337));
}

waitForElm("#captcha_container").then(ele => {
	identifyCaptcha().then(captchaType => {
		switch (captchaType) {
			case CaptchaType.PUZZLE:
				alert("Puzzle")
			case CaptchaType.ROTATE:
				alert("Rotate")
			case CaptchaType.SHAPES:
				solveShapes()
		}
	})
})
