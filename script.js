"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const creditsUrl = "https://www.sadcaptcha.com/api/v1/license/credits?licenseKey=";
const rotateUrl = "https://www.sadcaptcha.com/api/v1/rotate?licenseKey=";
const puzzleUrl = "https://www.sadcaptcha.com/api/v1/puzzle?licenseKey=";
const shapesUrl = "https://www.sadcaptcha.com/api/v1/shapes?licenseKey=";
const iconUrl = "https://www.sadcaptcha.com/api/v1/icon?licenseKey=";
const successXpath = "//*[contains(text(), 'Verification complete')]";
const apiHeaders = new Headers({ "Content-Type": "application/json" });
const CONTAINER = document.documentElement || document.body;
const Wrappers = {
    V1: ".captcha-disable-scroll",
    V2: ".captcha-verify-container"
};
const RotateV1 = {
    INNER: "[data-testid=whirl-inner-img]",
    OUTER: "[data-testid=whirl-outer-img]",
    SLIDE_BAR: ".captcha_verify_slide--slidebar",
    SLIDER_DRAG_BUTTON: ".secsdk-captcha-drag-icon",
    UNIQUE_IDENTIFIER: ".captcha-disable-scroll [data-testid=whirl-inner-img]"
};
const RotateV2 = {
    INNER: ".captcha-verify-container > div > div > div > img.cap-absolute",
    OUTER: ".captcha-verify-container > div > div > div > img:first-child",
    SLIDE_BAR: ".captcha-verify-container > div > div > div.cap-w-full > div.cap-rounded-full",
    SLIDER_DRAG_BUTTON: "div[draggable=true]:has(.secsdk-captcha-drag-icon)",
    UNIQUE_IDENTIFIER: ".captcha-verify-container > div > div > div > img.cap-absolute"
};
const PuzzleV1 = {
    PIECE: "img.captcha_verify_img_slide",
    PUZZLE: "#captcha-verify-image",
    SLIDER_DRAG_BUTTON: ".secsdk-captcha-drag-icon",
    UNIQUE_IDENTIFIER: ".captcha-disable-scroll img.captcha_verify_img_slide"
};
const PuzzleV2 = {
    PIECE: ".captcha-verify-container .cap-absolute img",
    PUZZLE: "#captcha-verify-image",
    SLIDER_DRAG_BUTTON: "div[draggable=true]:has(.secsdk-captcha-drag-icon)",
    PIECE_IMAGE_CONTAINER: ".captcha-verify-container div[draggable=true]:has(img[draggable=false])",
    UNIQUE_IDENTIFIER: ".captcha-verify-container #captcha-verify-image"
};
const ShapesV1 = {
    IMAGE: "#captcha-verify-image",
    SUBMIT_BUTTON: ".verify-captcha-submit-button",
    UNIQUE_IDENTIFIER: ".captcha-disable-scroll .verify-captcha-submit-button"
};
const ShapesV2 = {
    IMAGE: ".captcha-verify-container div.cap-relative img, #captcha-verify-image",
    SUBMIT_BUTTON: ".captcha-verify-container .cap-relative button.cap-w-full, .verify-captcha-submit-button",
    UNIQUE_IDENTIFIER: ".captcha-verify-container .cap-relative button.cap-w-full, .verify-captcha-submit-button"
};
const IconV1 = {
    IMAGE: "#captcha-verify-image",
    SUBMIT_BUTTON: ".verify-captcha-submit-button",
    TEXT: ".captcha_verify_bar",
    UNIQUE_IDENTIFIER: ".captcha-disable-scroll .verify-captcha-submit-button"
};
const IconV2 = {
    IMAGE: ".captcha-verify-container div.cap-relative img",
    SUBMIT_BUTTON: ".captcha-verify-container .cap-relative button.cap-w-full",
    TEXT: ".captcha-verify-container > div > div > span"
};
const CAPTCHA_PRESENCE_INDICATORS = [
    IconV2.TEXT,
    IconV2.IMAGE,
    IconV2.SUBMIT_BUTTON,
    ShapesV2.SUBMIT_BUTTON,
    ShapesV2.IMAGE,
    PuzzleV1.PIECE,
    PuzzleV2.PIECE,
    PuzzleV1.PUZZLE,
    PuzzleV2.PUZZLE,
    PuzzleV1.UNIQUE_IDENTIFIER,
    PuzzleV2.UNIQUE_IDENTIFIER,
    RotateV2.UNIQUE_IDENTIFIER,
    RotateV1.UNIQUE_IDENTIFIER,
    RotateV2.INNER,
    RotateV1.INNER,
    RotateV2.OUTER,
    RotateV1.OUTER,
];
var CaptchaType;
(function (CaptchaType) {
    CaptchaType[CaptchaType["PUZZLE_V1"] = 0] = "PUZZLE_V1";
    CaptchaType[CaptchaType["ROTATE_V1"] = 1] = "ROTATE_V1";
    CaptchaType[CaptchaType["SHAPES_V1"] = 2] = "SHAPES_V1";
    CaptchaType[CaptchaType["ICON_V1"] = 3] = "ICON_V1";
    CaptchaType[CaptchaType["PUZZLE_V2"] = 4] = "PUZZLE_V2";
    CaptchaType[CaptchaType["ROTATE_V2"] = 5] = "ROTATE_V2";
    CaptchaType[CaptchaType["SHAPES_V2"] = 6] = "SHAPES_V2";
    CaptchaType[CaptchaType["ICON_V2"] = 7] = "ICON_V2";
})(CaptchaType || (CaptchaType = {}));
function findFirstElementToAppear(selectors) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            const observer = new MutationObserver(mutations => {
                for (const mutation of mutations) {
                    if (mutation.addedNodes === null)
                        continue;
                    let addedNode = [];
                    mutation.addedNodes.forEach(node => addedNode.push(node));
                    for (const node of addedNode)
                        for (const selector of selectors) {
                            try {
                                if (node instanceof HTMLIFrameElement) {
                                    let iframe = node;
                                    setTimeout(() => {
                                        if (iframe.contentWindow) {
                                            let iframeElement = iframe.contentWindow.document.body.querySelector(selector);
                                            if (iframeElement) {
                                                console.debug(`element matched ${selector} in iframe`);
                                                observer.disconnect();
                                                console.dir(iframeElement);
                                                return resolve(iframeElement);
                                            }
                                        }
                                        else {
                                            console.log(`no iframe with selector ${selector}, contentWindow was null`);
                                        }
                                    }, 3000);
                                }
                                if (node instanceof Element) {
                                    let element = document.querySelector(selector);
                                    if (element) {
                                        console.debug(`element matched ${selector}`);
                                        observer.disconnect();
                                        console.dir(element);
                                        return resolve(element);
                                    }
                                }
                            }
                            catch (err) {
                                console.log(`error occurred when finding element with css selector ${selector}, error was: ` + err);
                                console.log("trying again");
                            }
                        }
                }
            });
            observer.observe(CONTAINER, {
                childList: true,
                subtree: true
            });
        });
    });
}
function waitForElement(selector, iframeSelector) {
    for (let i = 0; i < 5; i++) {
        try {
            return new Promise(resolve => {
                let targetDocument;
                if (iframeSelector !== undefined) {
                    let iframe = document.querySelector(iframeSelector);
                    targetDocument = iframe.contentWindow.document;
                }
                else {
                    targetDocument = window.document;
                }
                if (targetDocument.querySelector(selector)) {
                    console.log("Selector found: " + selector);
                    return resolve(targetDocument.querySelector(selector));
                }
                else {
                    const observer = new MutationObserver(_ => {
                        if (targetDocument.querySelector(selector)) {
                            observer.disconnect();
                            console.log("Selector found by mutation observer: " + selector);
                            return resolve(targetDocument.querySelector(selector));
                        }
                    });
                    observer.observe(CONTAINER, {
                        childList: true,
                        subtree: true
                    });
                }
            });
        }
        catch (err) {
            console.log(`error occurred when finding element with css selector ${selector}, error was: ` + err);
            console.log("trying again");
        }
    }
    throw new Error(`Could not get element ${selector} after 5 tries`);
}
function creditsApiCall() {
    return __awaiter(this, void 0, void 0, function* () {
        let resp = yield fetch(creditsUrl + apiKey, {
            method: "GET",
            headers: apiHeaders,
        });
        let credits = (yield resp.json()).credits;
        console.log("api credits = " + credits);
        return credits;
    });
}
function rotateApiCall(outerB64, innerB64) {
    return __awaiter(this, void 0, void 0, function* () {
        let resp = yield fetch(rotateUrl + apiKey, {
            method: "POST",
            headers: apiHeaders,
            body: JSON.stringify({
                outerImageB64: outerB64,
                innerImageB64: innerB64
            })
        });
        let angle = (yield resp.json()).angle;
        console.log("angle = " + angle);
        return angle;
    });
}
function puzzleApiCall(puzzleB64, pieceB64) {
    return __awaiter(this, void 0, void 0, function* () {
        let resp = yield fetch(puzzleUrl + apiKey, {
            method: "POST",
            headers: apiHeaders,
            body: JSON.stringify({
                puzzleImageB64: puzzleB64,
                pieceImageB64: pieceB64
            })
        });
        let slideXProportion = (yield resp.json()).slideXProportion;
        console.log("slideXProportion = " + slideXProportion);
        return slideXProportion;
    });
}
function shapesApiCall(imageB64) {
    return __awaiter(this, void 0, void 0, function* () {
        let resp = yield fetch(shapesUrl + apiKey, {
            method: "POST",
            headers: apiHeaders,
            body: JSON.stringify({
                imageB64: imageB64
            })
        });
        let data = yield resp.json();
        console.log("Shapes response data:");
        console.log(data);
        return {
            pointOneProportionX: data.pointOneProportionX,
            pointOneProportionY: data.pointOneProportionY,
            pointTwoProportionX: data.pointTwoProportionX,
            pointTwoProportionY: data.pointTwoProportionY
        };
    });
}
function iconApiCall(challenge, imageB64) {
    return __awaiter(this, void 0, void 0, function* () {
        let resp = yield fetch(iconUrl + apiKey, {
            method: "POST",
            headers: apiHeaders,
            body: JSON.stringify({
                challenge: challenge,
                imageB64: imageB64
            })
        });
        let data = yield resp.json();
        console.log("Icon response data:");
        console.log(data);
        return data;
    });
}
function anySelectorInListPresent(selectors) {
    for (const selector of selectors) {
        let ele = document.querySelector(selector);
        if (ele !== null) {
            return true;
        }
    }
    return false;
}
function identifyCaptcha() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 30; i++) {
            if (anySelectorInListPresent([RotateV1.UNIQUE_IDENTIFIER])) {
                console.log("rotate v1 detected");
                return CaptchaType.ROTATE_V1;
            }
            else if (anySelectorInListPresent([PuzzleV1.UNIQUE_IDENTIFIER])) {
                console.log("puzzle v1 detected");
                return CaptchaType.PUZZLE_V1;
            }
            else if (anySelectorInListPresent([ShapesV1.UNIQUE_IDENTIFIER])) {
                let imgUrl = yield getImageSource(ShapesV2.IMAGE);
                if (imgUrl.includes("/icon")) {
                    console.log("icon v1 detected");
                    return CaptchaType.ICON_V1;
                }
                else {
                    console.log("shapes v1 detected");
                    return CaptchaType.SHAPES_V1;
                }
            }
            else if (anySelectorInListPresent([RotateV2.UNIQUE_IDENTIFIER])) {
                console.log("rotate v2 detected");
                return CaptchaType.ROTATE_V2;
            }
            else if (anySelectorInListPresent([PuzzleV2.UNIQUE_IDENTIFIER])) {
                console.log("puzzle v2 detected");
                return CaptchaType.PUZZLE_V2;
            }
            else if (anySelectorInListPresent([ShapesV2.UNIQUE_IDENTIFIER])) {
                let imgUrl = yield getImageSource(ShapesV2.IMAGE);
                if (imgUrl.includes("/icon")) {
                    console.log("icon v1 detected");
                    return CaptchaType.ICON_V2;
                }
                else {
                    console.log("shapes v2 detected");
                    return CaptchaType.SHAPES_V2;
                }
            }
            else {
                yield new Promise(r => setTimeout(r, 1000));
            }
        }
        throw new Error("Could not identify CaptchaType");
    });
}
function getImageSource(selector) {
    return __awaiter(this, void 0, void 0, function* () {
        let ele = yield waitForElement(selector);
        let src = ele.getAttribute("src");
        if (src === null) {
            throw new Error("src was null for element: " + selector);
        }
        console.log("src = " + src);
        return src;
    });
}
function getBase64StringFromDataURL(dataUrl) {
    return dataUrl.replace('data:', '').replace(/^.+,/, '');
}
function fetchImageBase64(imageSource) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(imageSource);
        let img = yield res.blob();
        let reader = new FileReader();
        reader.readAsDataURL(img);
        return new Promise(resolve => {
            reader.onloadend = () => {
                resolve(getBase64StringFromDataURL(reader.result));
            };
        });
    });
}
function moveMouseTo(x, y) {
    return __awaiter(this, void 0, void 0, function* () {
        CONTAINER.dispatchEvent(new MouseEvent("mousemove", {
            bubbles: true,
            view: window,
            clientX: x,
            clientY: y
        }));
        console.log("moved mouse to " + x + ", " + y);
    });
}
function solvePuzzleV2() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 3; i++) {
            let puzzleSrc = yield getImageSource(PuzzleV2.PUZZLE);
            let pieceSrc = yield getImageSource(PuzzleV2.PIECE);
            let puzzleImg = yield fetchImageBase64(puzzleSrc);
            let pieceImg = yield fetchImageBase64(pieceSrc);
            let solution = yield puzzleApiCall(puzzleImg, pieceImg);
            let puzzleImageEle = yield waitForElement(PuzzleV2.PUZZLE);
            let distance = yield computePuzzleSlideDistance(solution, puzzleImageEle);
            let adjustment = 3;
            distance = distance - adjustment;
            function pieceHasReachedTargetLocation() {
                let piece = document.querySelector(PuzzleV2.PIECE_IMAGE_CONTAINER);
                if (piece === null) {
                    console.log("puzzle piece was null");
                    throw new Error("puzzle piece was null");
                }
                let style = piece.getAttribute("style");
                if (style === null) {
                    console.log("puzzle piece css .style attr was null");
                    throw new Error("puzzle piece css .style attr was null");
                }
                console.log("piece style: " + style);
                let translateXStyleMatch = style.match("(?<=translateX\\()[0-9]+");
                if (translateXStyleMatch === null) {
                    console.log("puzzle piece css .style did not match translateX regex");
                    throw new Error("puzzle piece css .style did not match translateX regex");
                }
                let translateX = parseInt(translateXStyleMatch.toString());
                console.debug("translateX: " + translateX);
                if (translateX >= distance) {
                    console.debug("piece has reached target location");
                    return true;
                }
                else {
                    console.debug("piece has not reached target location");
                    return false;
                }
            }
            yield dragWithPreciseMonitoring(PuzzleV2.SLIDER_DRAG_BUTTON, distance, pieceHasReachedTargetLocation);
            if (yield checkCaptchaSuccess())
                return;
        }
    });
}
function dragWithPreciseMonitoring(selector_1, targetDistance_1) {
    return __awaiter(this, arguments, void 0, function* (selector, targetDistance, breakCondition = null, retries = 3) {
        let success = false;
        console.log(`Preparing to drag ${selector} with precise monitoring`);
        const adjustedTarget = targetDistance;
        try {
            const handle = yield waitForElement(selector);
            const box = handle.getBoundingClientRect();
            const startX = box.x + (box.width / 2);
            const startY = box.y + (box.height / 2);
            const endX = startX + adjustedTarget;
            // Natural approach to the handle
            const approachStartX = startX - 80 - Math.random() * 40;
            const approachStartY = startY + 40 + Math.random() * 30;
            const approachPoints = generateNaturalApproach({ x: approachStartX, y: approachStartY }, { x: startX, y: startY }, 8 + Math.floor(Math.random() * 4));
            // Move cursor to approach the handle naturally
            for (const point of approachPoints) {
                moveMouseTo(point.x, point.y);
                yield new Promise(r => setTimeout(r, 15 + Math.random() * 25));
            }
            // Hover on handle with slight jitter
            yield new Promise(r => setTimeout(r, 200 + Math.random() * 150));
            moveMouseTo(startX + (Math.random() * 1.5 - 0.75), startY + (Math.random() * 1.5 - 0.75));
            // Press down after a natural delay
            yield new Promise(r => setTimeout(r, 350 + Math.random() * 200));
            // Mouse down and initial movement
            handle.dispatchEvent(new PointerEvent("mousedown", {
                pointerType: "mouse",
                width: 1,
                height: 1,
                cancelable: true,
                bubbles: true,
                view: window,
                clientX: startX,
                clientY: startY
            }));
            handle.dispatchEvent(new DragEvent("dragstart", {
                cancelable: true,
                bubbles: true,
                view: window,
                clientX: startX,
                clientY: startY
            }));
            yield new Promise(r => setTimeout(r, 180 + Math.random() * 120));
            // Initial small movement
            const initialX = startX + 2 + (Math.random() * 1.5);
            const initialY = startY + (Math.random() * 1 - 0.5);
            moveMouseTo(initialX, initialY);
            handle.dispatchEvent(new DragEvent("drag", {
                cancelable: true,
                bubbles: true,
                view: window,
                clientX: initialX,
                clientY: initialY
            }));
            yield new Promise(r => setTimeout(r, 120 + Math.random() * 80));
            // Create segmented movement with waypoints
            const numSegments = 3 + Math.floor(Math.random() * 3);
            let lastX = initialX;
            let lastY = initialY;
            const waypoints = [];
            for (let i = 1; i <= numSegments; i++) {
                const segmentTarget = startX + (adjustedTarget * (i / numSegments) * (0.85 + Math.random() * 0.3));
                const yVariation = Math.sin(i / numSegments * Math.PI) * (Math.random() * 4 - 2);
                waypoints.push({
                    x: segmentTarget,
                    y: startY + yVariation
                });
            }
            waypoints.push({
                x: endX,
                y: startY + (Math.random() * 1.2 - 0.6)
            });
            // Move through each waypoint with natural curves
            for (let i = 0; i < waypoints.length; i++) {
                if (breakCondition && breakCondition()) {
                    console.log('Break condition satisfied, puzzle solved!');
                    success = true;
                    break;
                }
                const point = waypoints[i];
                const curvePoints = generateNaturalCurve({ x: lastX, y: lastY }, point, 10 + Math.floor(Math.random() * 8));
                for (const curvePoint of curvePoints) {
                    if (breakCondition && breakCondition()) {
                        console.log('Break condition satisfied, puzzle solved!');
                        success = true;
                        break;
                    }
                    // Add slight tremor to movement
                    const tremorX = curvePoint.x + (Math.random() * 0.6 - 0.3);
                    const tremorY = curvePoint.y + (Math.random() * 0.6 - 0.3);
                    moveMouseTo(tremorX, tremorY);
                    handle.dispatchEvent(new DragEvent("drag", {
                        cancelable: true,
                        bubbles: true,
                        view: window,
                        clientX: tremorX,
                        clientY: tremorY
                    }));
                    const isSlowingDown = i >= waypoints.length - 2;
                    const baseDelay = isSlowingDown ? 20 : 8;
                    yield new Promise(r => setTimeout(r, baseDelay + Math.random() * (isSlowingDown ? 15 : 8)));
                }
                // Random pauses during movement
                if (Math.random() < 0.3 && i < waypoints.length - 1) {
                    yield new Promise(r => setTimeout(r, 80 + Math.random() * 120));
                }
                lastX = point.x;
                lastY = point.y;
            }
            // Final micro-adjustments
            const finalAdjustments = 4 + Math.floor(Math.random() * 3);
            let finalX = lastX;
            let finalY = lastY;
            for (let i = 0; i < finalAdjustments; i++) {
                if (breakCondition && breakCondition()) {
                    console.log('Break condition satisfied, puzzle solved!');
                    success = true;
                    break;
                }
                const precision = 1 - (i / finalAdjustments);
                const adjustX = (Math.random() * 1.0 - 0.5) * precision * (i === finalAdjustments - 1 ? 0.3 : 0.8);
                const adjustY = (Math.random() * 0.8 - 0.4) * precision * (i === finalAdjustments - 1 ? 0.3 : 0.8);
                finalX += adjustX;
                finalY += adjustY;
                moveMouseTo(finalX, finalY);
                handle.dispatchEvent(new DragEvent("drag", {
                    cancelable: true,
                    bubbles: true,
                    view: window,
                    clientX: finalX,
                    clientY: finalY
                }));
                yield new Promise(r => setTimeout(r, 120 + Math.random() * 180));
                // Last-second correction toward target
                if (i === finalAdjustments - 2) {
                    const targetX = endX - finalX;
                    if (Math.abs(targetX) > 0.5) {
                        finalX += targetX * 0.8;
                        moveMouseTo(finalX, finalY);
                        handle.dispatchEvent(new DragEvent("drag", {
                            cancelable: true,
                            bubbles: true,
                            view: window,
                            clientX: finalX,
                            clientY: finalY
                        }));
                        yield new Promise(r => setTimeout(r, 200 + Math.random() * 100));
                    }
                }
            }
            // Hold at final position
            const holdTime = Math.random() * 1000;
            console.log(`Holding at final position for ${Math.round(holdTime)}ms`);
            yield new Promise(r => setTimeout(r, holdTime));
            // Small final tremor
            const veryFinalX = finalX + (Math.random() * 0.3 - 0.15);
            const veryFinalY = finalY + (Math.random() * 0.3 - 0.15);
            moveMouseTo(veryFinalX, veryFinalY);
            yield new Promise(r => setTimeout(r, 50 + Math.random() * 30));
            // Release mouse
            handle.dispatchEvent(new PointerEvent("mouseup", {
                pointerType: "mouse",
                width: 1,
                height: 1,
                cancelable: true,
                bubbles: true,
                view: window,
                clientX: veryFinalX,
                clientY: veryFinalY
            }));
            handle.dispatchEvent(new DragEvent("dragend", {
                cancelable: true,
                bubbles: true,
                view: window,
                clientX: veryFinalX,
                clientY: veryFinalY
            }));
            // Check if we're done
            yield new Promise(r => setTimeout(r, 2500));
        }
        catch (err) {
            console.error(`Drag error: ${err}`);
        }
        return success;
    });
}
function clickMouse(element, x, y) {
    return __awaiter(this, void 0, void 0, function* () {
        element.dispatchEvent(new MouseEvent("click", {
            bubbles: true,
            clientX: x,
            clientY: y
        }));
    });
}
function clickCenterOfElement(element) {
    return __awaiter(this, void 0, void 0, function* () {
        let rect = element.getBoundingClientRect();
        let x = rect.x + (rect.width / 2);
        let y = rect.y + (rect.height / 2);
        yield clickMouse(element, x, y);
    });
}
function clickProportional(element, proportionX, proportionY) {
    return __awaiter(this, void 0, void 0, function* () {
        let boundingBox = element.getBoundingClientRect();
        let xOrigin = boundingBox.x;
        let yOrigin = boundingBox.y;
        let xOffset = (proportionX * boundingBox.width);
        let yOffset = (proportionY * boundingBox.height);
        let x = xOrigin + xOffset;
        let y = yOrigin + yOffset;
        clickMouse(element, x, y);
    });
}
function computeRotateSlideDistance(angle, slideBarEle, slideIconEle) {
    return __awaiter(this, void 0, void 0, function* () {
        let slideLength = slideBarEle.getBoundingClientRect().width;
        let iconLength = slideIconEle.getBoundingClientRect().width;
        return ((slideLength - iconLength) * angle) / 360;
    });
}
function computePuzzleSlideDistance(proportionX, puzzleImageEle) {
    return __awaiter(this, void 0, void 0, function* () {
        return puzzleImageEle.getBoundingClientRect().width * proportionX;
    });
}
function checkCaptchaSuccess() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 20; i++) {
            if (document.evaluate(successXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue !== null)
                return true;
            else
                yield new Promise(r => setTimeout(r, 1000));
        }
        return false;
    });
}
function solveShapesV1() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 3; i++) {
            let src = yield getImageSource(ShapesV1.IMAGE);
            let img = yield fetchImageBase64(src);
            let res = yield shapesApiCall(img);
            let ele = yield waitForElement(ShapesV1.IMAGE);
            clickProportional(ele, res.pointOneProportionX, res.pointOneProportionY);
            yield new Promise(r => setTimeout(r, 1337));
            clickProportional(ele, res.pointTwoProportionX, res.pointTwoProportionY);
            yield new Promise(r => setTimeout(r, 2337));
            let submitButton = yield waitForElement(ShapesV1.SUBMIT_BUTTON);
            clickCenterOfElement(submitButton);
            yield new Promise(r => setTimeout(r, 1337));
            if (yield checkCaptchaSuccess())
                return;
        }
    });
}
function solveShapesV2() {
    return __awaiter(this, void 0, void 0, function* () {
        let src = yield getImageSource(ShapesV2.IMAGE);
        let img = yield fetchImageBase64(src);
        let res = yield shapesApiCall(img);
        let ele = yield waitForElement(ShapesV2.IMAGE);
        clickProportional(ele, res.pointOneProportionX, res.pointOneProportionY);
        yield new Promise(r => setTimeout(r, 1337));
        clickProportional(ele, res.pointTwoProportionX, res.pointTwoProportionY);
        yield new Promise(r => setTimeout(r, 2337));
        let submitButton = yield waitForElement(ShapesV2.SUBMIT_BUTTON);
        clickCenterOfElement(submitButton);
        yield new Promise(r => setTimeout(r, 1337));
    });
}
function solveRotateV1() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 3; i++) {
            let outerSrc = yield getImageSource(RotateV1.OUTER);
            let innerSrc = yield getImageSource(RotateV1.INNER);
            let outerImg = yield fetchImageBase64(outerSrc);
            let innerImg = yield fetchImageBase64(innerSrc);
            let solution = yield rotateApiCall(outerImg, innerImg);
            let slideBar = yield waitForElement(RotateV1.SLIDE_BAR);
            let slideButton = yield waitForElement(RotateV1.SLIDER_DRAG_BUTTON);
            let distance = yield computeRotateSlideDistance(solution, slideBar, slideButton);
            yield dragWithPreciseMonitoring(RotateV1.SLIDER_DRAG_BUTTON, distance);
            if (yield checkCaptchaSuccess())
                return;
        }
    });
}
function solveRotateV2() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 3; i++) {
            let outerSrc = yield getImageSource(RotateV2.OUTER);
            let innerSrc = yield getImageSource(RotateV2.INNER);
            let outerImg = yield fetchImageBase64(outerSrc);
            let innerImg = yield fetchImageBase64(innerSrc);
            let solution = yield rotateApiCall(outerImg, innerImg);
            let slideBar = yield waitForElement(RotateV2.SLIDE_BAR);
            let slideButton = yield waitForElement(RotateV2.SLIDER_DRAG_BUTTON);
            let distance = yield computeRotateSlideDistance(solution, slideBar, slideButton);
            yield dragWithPreciseMonitoring(RotateV2.SLIDER_DRAG_BUTTON, distance);
            if (yield checkCaptchaSuccess())
                return;
        }
    });
}
function solvePuzzleV1() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 3; i++) {
            let puzzleSrc = yield getImageSource(PuzzleV1.PUZZLE);
            let pieceSrc = yield getImageSource(PuzzleV1.PIECE);
            let puzzleImg = yield fetchImageBase64(puzzleSrc);
            let pieceImg = yield fetchImageBase64(pieceSrc);
            let solution = yield puzzleApiCall(puzzleImg, pieceImg);
            let puzzleImageEle = yield waitForElement(PuzzleV1.PUZZLE);
            let distance = yield computePuzzleSlideDistance(solution, puzzleImageEle);
            yield dragWithPreciseMonitoring(PuzzleV1.SLIDER_DRAG_BUTTON, distance);
            if (yield checkCaptchaSuccess())
                return;
        }
    });
}
function solveIconV1() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 3; i++) {
            let src = yield getImageSource(IconV1.IMAGE);
            let img = yield fetchImageBase64(src);
            let challenge = (yield waitForElement(IconV1.TEXT)).textContent;
            let res = yield iconApiCall(challenge, img);
            let ele = yield waitForElement(IconV1.IMAGE);
            for (const point of res.proportionalPoints) {
                clickProportional(ele, point.proportionX, point.proportionY);
                yield new Promise(r => setTimeout(r, 1337));
            }
            let submitButton = yield waitForElement(IconV1.SUBMIT_BUTTON);
            clickCenterOfElement(submitButton);
            yield new Promise(r => setTimeout(r, 1337));
            if (yield checkCaptchaSuccess())
                return;
        }
    });
}
function solveIconV2() {
    return __awaiter(this, void 0, void 0, function* () {
        let src = yield getImageSource(IconV2.IMAGE);
        let img = yield fetchImageBase64(src);
        let challenge = (yield waitForElement(IconV2.TEXT)).textContent;
        let res = yield iconApiCall(challenge, img);
        let ele = yield waitForElement(IconV2.IMAGE);
        for (const point of res.proportionalPoints) {
            clickProportional(ele, point.proportionX, point.proportionY);
            yield new Promise(r => setTimeout(r, 1337));
        }
        let submitButton = yield waitForElement(IconV2.SUBMIT_BUTTON);
        clickCenterOfElement(submitButton);
        yield new Promise(r => setTimeout(r, 1337));
        if (yield checkCaptchaSuccess())
            return;
    });
}
function generateNaturalCurve(start, end, steps) {
    const points = [];
    const controlPoint = {
        x: start.x + (end.x - start.x) * (0.3 + Math.random() * 0.4),
        y: start.y + (Math.random() * 12 - 6)
    };
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = Math.pow(1 - t, 2) * start.x + 2 * (1 - t) * t * controlPoint.x + Math.pow(t, 2) * end.x;
        const y = Math.pow(1 - t, 2) * start.y + 2 * (1 - t) * t * controlPoint.y + Math.pow(t, 2) * end.y;
        points.push({ x: x, y: y });
    }
    return points;
}
function generateNaturalApproach(start, end, steps) {
    const control1 = {
        x: start.x + (end.x - start.x) * (0.2 + Math.random() * 0.2),
        y: start.y + (Math.random() * 15 - 5)
    };
    const control2 = {
        x: start.x + (end.x - start.x) * (0.6 + Math.random() * 0.2),
        y: end.y + (Math.random() * 10 - 5)
    };
    const points = [];
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = Math.pow(1 - t, 3) * start.x +
            3 * Math.pow(1 - t, 2) * t * control1.x +
            3 * (1 - t) * Math.pow(t, 2) * control2.x +
            Math.pow(t, 3) * end.x;
        const y = Math.pow(1 - t, 3) * start.y +
            3 * Math.pow(1 - t, 2) * t * control1.y +
            3 * (1 - t) * Math.pow(t, 2) * control2.y +
            Math.pow(t, 3) * end.y;
        points.push({ x: x, y: y });
    }
    return points;
}
function captchaIsPresent() {
    for (let i = 0; i < CAPTCHA_PRESENCE_INDICATORS.length; i++) {
        if (document.querySelector(CAPTCHA_PRESENCE_INDICATORS[i])) {
            console.log("captcha present based on selector: " + CAPTCHA_PRESENCE_INDICATORS[i]);
            return true;
        }
    }
    console.log("captcha not present");
    return false;
}
let isCurrentSolve = false;
function solveCaptchaLoop() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("starting captcha solve loop");
        if (!isCurrentSolve) {
            if (captchaIsPresent()) {
                console.log("captcha detected by css selector");
            }
            else {
                console.log("waiting for captcha");
                yield findFirstElementToAppear(CAPTCHA_PRESENCE_INDICATORS);
                console.log("captcha detected by mutation observer");
            }
            const captchaType = yield identifyCaptcha();
            try {
                if ((yield creditsApiCall()) <= 0) {
                    console.log("out of credits");
                    alert("Out of SadCaptcha credits. Please boost your balance on sadcaptcha.com/dashboard.");
                    return;
                }
            }
            catch (e) {
                // Catch the error because we dont want to break the solver just because we failed to fetch the credits API
                console.log("error making check credits api call: " + e);
            }
            isCurrentSolve = true;
            try {
                switch (captchaType) {
                    case CaptchaType.PUZZLE_V1:
                        yield solvePuzzleV1();
                        break;
                    case CaptchaType.ROTATE_V1:
                        yield solveRotateV1();
                        break;
                    // case CaptchaType.SHAPES_V1:
                    // 	await solveShapesV1()
                    // 	break
                    // case CaptchaType.ICON_V1:
                    // 	await solveIconV1()
                    // 	break
                    case CaptchaType.PUZZLE_V2:
                        yield solvePuzzleV2();
                        break;
                    case CaptchaType.ROTATE_V2:
                        yield solveRotateV2();
                        break;
                    case CaptchaType.SHAPES_V2:
                        yield solveShapesV2();
                        break;
                    case CaptchaType.ICON_V2:
                        yield solveIconV2();
                        break;
                }
            }
            catch (err) {
                console.log("error solving captcha");
                console.error(err);
                console.log("restarting captcha loop");
            }
            finally {
                isCurrentSolve = false;
                yield new Promise(r => setTimeout(r, 500));
                yield solveCaptchaLoop();
            }
        }
    });
}
// Api key is passed from extension via message
let apiKey = localStorage.getItem("sadCaptchaKey");
try {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.apiKey !== null) {
            console.log("Api key: " + request.apiKey);
            apiKey = request.apiKey;
            localStorage.setItem("sadCaptchaKey", apiKey);
            sendResponse({ message: "API key set.", success: 1 });
        }
        else {
            sendResponse({ message: "API key cannot be empty.", success: 0 });
        }
    });
}
catch (err) {
    console.warn("Chrome runtime is not available");
}
solveCaptchaLoop();
//# sourceMappingURL=script.js.map