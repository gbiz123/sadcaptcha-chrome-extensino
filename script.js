var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var creditsUrl = "https://www.sadcaptcha.com/api/v1/license/credits?licenseKey=";
var rotateUrl = "https://www.sadcaptcha.com/api/v1/rotate?licenseKey=";
var puzzleUrl = "https://www.sadcaptcha.com/api/v1/puzzle?licenseKey=";
var shapesUrl = "https://www.sadcaptcha.com/api/v1/shapes?licenseKey=";
var iconUrl = "https://www.sadcaptcha.com/api/v1/icon?licenseKey=";
var successXpath = "//*[contains(text(), 'Verification complete')]";
var apiHeaders = new Headers({ "Content-Type": "application/json" });
var ctr;
if (document.documentElement instanceof Node) {
    ctr = document.documentElement;
}
else {
    ctr = document.body;
}
var CONTAINER = ctr;
var Wrappers = {
    V1: ".captcha-disable-scroll",
    V2: ".captcha-verify-container"
};
var RotateV1 = {
    INNER: "[data-testid=whirl-inner-img]",
    OUTER: "[data-testid=whirl-outer-img]",
    SLIDE_BAR: ".captcha_verify_slide--slidebar",
    SLIDER_DRAG_BUTTON: ".secsdk-captcha-drag-icon",
    UNIQUE_IDENTIFIER: ".captcha-disable-scroll [data-testid=whirl-inner-img]"
};
var RotateV2 = {
    INNER: ".captcha-verify-container > div > div > div > img.cap-absolute",
    OUTER: ".captcha-verify-container > div > div > div > img:first-child",
    SLIDE_BAR: ".captcha-verify-container > div > div > div.cap-w-full > div.cap-rounded-full",
    SLIDER_DRAG_BUTTON: "div[draggable=true]:has(.secsdk-captcha-drag-icon)",
    UNIQUE_IDENTIFIER: ".captcha-verify-container > div > div > div > img.cap-absolute"
};
var PuzzleV1 = {
    PIECE: "img.captcha_verify_img_slide",
    PUZZLE: "#captcha-verify-image",
    SLIDER_DRAG_BUTTON: ".secsdk-captcha-drag-icon",
    UNIQUE_IDENTIFIER: ".captcha-disable-scroll img.captcha_verify_img_slide"
};
var PuzzleV2 = {
    PIECE: ".captcha-verify-container .cap-absolute img",
    PUZZLE: "#captcha-verify-image",
    SLIDER_DRAG_BUTTON: "div[draggable=true]:has(.secsdk-captcha-drag-icon)",
    PIECE_IMAGE_CONTAINER: ".captcha-verify-container div[draggable=true]:has(img[draggable=false])",
    UNIQUE_IDENTIFIER: ".captcha-verify-container #captcha-verify-image"
};
var ShapesV1 = {
    IMAGE: "#captcha-verify-image",
    SUBMIT_BUTTON: ".verify-captcha-submit-button",
    UNIQUE_IDENTIFIER: ".captcha-disable-scroll .verify-captcha-submit-button"
};
var ShapesV2 = {
    IMAGE: ".captcha-verify-container div.cap-relative img",
    SUBMIT_BUTTON: ".captcha-verify-container .cap-relative button.cap-w-full",
    UNIQUE_IDENTIFIER: ".captcha-verify-container .cap-relative button.cap-w-full"
};
var IconV1 = {
    IMAGE: "#captcha-verify-image",
    SUBMIT_BUTTON: ".verify-captcha-submit-button",
    TEXT: ".captcha_verify_bar",
    UNIQUE_IDENTIFIER: ".captcha-disable-scroll .verify-captcha-submit-button"
};
var IconV2 = {
    IMAGE: ".captcha-verify-container div.cap-relative img",
    SUBMIT_BUTTON: ".captcha-verify-container .cap-relative button.cap-w-full",
    TEXT: ".captcha-verify-container > div > div > span"
};
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
function waitForAnyElementInList(selectors) {
    return new Promise(function (resolve) {
        var selectorFound = null;
        // Check if already present
        selectors.forEach(function (selector) {
            if (document.querySelector(selector)) {
                selectorFound = selector;
                console.log("Selector found: " + selector);
                return resolve(document.querySelector(selectorFound));
            }
        });
        if (selectorFound !== null) {
            return resolve(document.querySelector(selectorFound));
        }
        // Then start waiting if not found immediately
        var observer = new MutationObserver(function (mutations) {
            selectors.forEach(function (selector) {
                if (document.querySelector(selector)) {
                    selectorFound = selector;
                    console.log("Selector found by mutation observer: " + selector);
                    observer.disconnect();
                    return;
                }
            });
            if (selectorFound !== null) {
                console.log("returning selector from mutation observer: " + selectorFound);
                return resolve(document.querySelector(selectorFound));
            }
            else {
                console.log("unimportant mutation seen");
            }
        });
        observer.observe(CONTAINER, {
            childList: true,
            subtree: true
        });
    });
}
function waitForElement(selector) {
    return new Promise(function (resolve) {
        if (document.querySelector(selector)) {
            console.log("Selector found: " + selector);
            return resolve(document.querySelector(selector));
        }
        else {
            var observer_1 = new MutationObserver(function (mutations) {
                if (document.querySelector(selector)) {
                    observer_1.disconnect();
                    console.log("Selector found by mutation observer: " + selector);
                    return resolve(document.querySelector(selector));
                }
            });
            observer_1.observe(CONTAINER, {
                childList: true,
                subtree: true
            });
        }
    });
}
function creditsApiCall() {
    return __awaiter(this, void 0, void 0, function () {
        var resp, credits;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(creditsUrl + apiKey, {
                        method: "GET",
                        headers: apiHeaders,
                    })];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    credits = (_a.sent()).credits;
                    console.log("api credits = " + credits);
                    return [2 /*return*/, credits];
            }
        });
    });
}
function rotateApiCall(outerB64, innerB64) {
    return __awaiter(this, void 0, void 0, function () {
        var resp, angle;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(rotateUrl + apiKey, {
                        method: "POST",
                        headers: apiHeaders,
                        body: JSON.stringify({
                            outerImageB64: outerB64,
                            innerImageB64: innerB64
                        })
                    })];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    angle = (_a.sent()).angle;
                    console.log("angle = " + angle);
                    return [2 /*return*/, angle];
            }
        });
    });
}
function puzzleApiCall(puzzleB64, pieceB64) {
    return __awaiter(this, void 0, void 0, function () {
        var resp, slideXProportion;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(puzzleUrl + apiKey, {
                        method: "POST",
                        headers: apiHeaders,
                        body: JSON.stringify({
                            puzzleImageB64: puzzleB64,
                            pieceImageB64: pieceB64
                        })
                    })];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    slideXProportion = (_a.sent()).slideXProportion;
                    console.log("slideXProportion = " + slideXProportion);
                    return [2 /*return*/, slideXProportion];
            }
        });
    });
}
function shapesApiCall(imageB64) {
    return __awaiter(this, void 0, void 0, function () {
        var resp, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(shapesUrl + apiKey, {
                        method: "POST",
                        headers: apiHeaders,
                        body: JSON.stringify({
                            imageB64: imageB64
                        })
                    })];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    data = _a.sent();
                    console.log("Shapes response data:");
                    console.log(data);
                    return [2 /*return*/, {
                            pointOneProportionX: data.pointOneProportionX,
                            pointOneProportionY: data.pointOneProportionY,
                            pointTwoProportionX: data.pointTwoProportionX,
                            pointTwoProportionY: data.pointTwoProportionY
                        }];
            }
        });
    });
}
function iconApiCall(challenge, imageB64) {
    return __awaiter(this, void 0, void 0, function () {
        var resp, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(iconUrl + apiKey, {
                        method: "POST",
                        headers: apiHeaders,
                        body: JSON.stringify({
                            challenge: challenge,
                            imageB64: imageB64
                        })
                    })];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    data = _a.sent();
                    console.log("Icon response data:");
                    console.log(data);
                    return [2 /*return*/, data];
            }
        });
    });
}
function anySelectorInListPresent(selectors) {
    for (var _i = 0, selectors_1 = selectors; _i < selectors_1.length; _i++) {
        var selector = selectors_1[_i];
        var ele = document.querySelector(selector);
        if (ele !== null) {
            return true;
        }
    }
    return false;
}
function identifyCaptcha() {
    return __awaiter(this, void 0, void 0, function () {
        var i, imgUrl, imgUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 30)) return [3 /*break*/, 12];
                    if (!anySelectorInListPresent([RotateV1.UNIQUE_IDENTIFIER])) return [3 /*break*/, 2];
                    console.log("rotate v1 detected");
                    return [2 /*return*/, CaptchaType.ROTATE_V1];
                case 2:
                    if (!anySelectorInListPresent([PuzzleV1.UNIQUE_IDENTIFIER])) return [3 /*break*/, 3];
                    console.log("puzzle v1 detected");
                    return [2 /*return*/, CaptchaType.PUZZLE_V1];
                case 3:
                    if (!anySelectorInListPresent([ShapesV1.UNIQUE_IDENTIFIER])) return [3 /*break*/, 5];
                    return [4 /*yield*/, getImageSource(ShapesV2.IMAGE)];
                case 4:
                    imgUrl = _a.sent();
                    if (imgUrl.includes("/icon")) {
                        console.log("icon v1 detected");
                        return [2 /*return*/, CaptchaType.ICON_V1];
                    }
                    else {
                        console.log("shapes v1 detected");
                        return [2 /*return*/, CaptchaType.SHAPES_V1];
                    }
                    return [3 /*break*/, 11];
                case 5:
                    if (!anySelectorInListPresent([RotateV2.UNIQUE_IDENTIFIER])) return [3 /*break*/, 6];
                    console.log("rotate v2 detected");
                    return [2 /*return*/, CaptchaType.ROTATE_V2];
                case 6:
                    if (!anySelectorInListPresent([PuzzleV2.UNIQUE_IDENTIFIER])) return [3 /*break*/, 7];
                    console.log("puzzle v2 detected");
                    return [2 /*return*/, CaptchaType.PUZZLE_V2];
                case 7:
                    if (!anySelectorInListPresent([ShapesV2.UNIQUE_IDENTIFIER])) return [3 /*break*/, 9];
                    return [4 /*yield*/, getImageSource(ShapesV2.IMAGE)];
                case 8:
                    imgUrl = _a.sent();
                    if (imgUrl.includes("/icon")) {
                        console.log("icon v1 detected");
                        return [2 /*return*/, CaptchaType.ICON_V2];
                    }
                    else {
                        console.log("shapes v2 detected");
                        return [2 /*return*/, CaptchaType.SHAPES_V2];
                    }
                    return [3 /*break*/, 11];
                case 9: return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1000); })];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11:
                    i++;
                    return [3 /*break*/, 1];
                case 12: throw new Error("Could not identify CaptchaType");
            }
        });
    });
}
function getImageSource(selector) {
    return __awaiter(this, void 0, void 0, function () {
        var ele, src;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, waitForElement(selector)];
                case 1:
                    ele = _a.sent();
                    src = ele.getAttribute("src");
                    console.log("src = " + selector);
                    return [2 /*return*/, src];
            }
        });
    });
}
function getBase64StringFromDataURL(dataUrl) {
    return dataUrl.replace('data:', '').replace(/^.+,/, '');
}
function fetchImageBase64(imageSource) {
    return __awaiter(this, void 0, void 0, function () {
        var res, img, reader;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(imageSource)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.blob()];
                case 2:
                    img = _a.sent();
                    reader = new FileReader();
                    reader.readAsDataURL(img);
                    return [2 /*return*/, new Promise(function (resolve) {
                            reader.onloadend = function () {
                                resolve(getBase64StringFromDataURL(reader.result));
                            };
                        })];
            }
        });
    });
}
function moveMouseTo(x, y) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            CONTAINER.dispatchEvent(new MouseEvent("mousemove", {
                bubbles: true,
                view: window,
                clientX: x,
                clientY: y
            }));
            console.log("moved mouse to " + x + ", " + y);
            return [2 /*return*/];
        });
    });
}
function dragElementHorizontal(selector_1, xOffset_1) {
    return __awaiter(this, arguments, void 0, function (selector, xOffset, breakCondition) {
        var ele, box, startX, startY, pixel, _loop_1, state_1;
        if (breakCondition === void 0) { breakCondition = null; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("preparing to drag " + selector + " by " + xOffset + " pixels");
                    ele = document.querySelector(selector);
                    box = ele.getBoundingClientRect();
                    startX = (box.x + (box.width / 133.7));
                    startY = (box.y + (box.height / 133.7));
                    moveMouseTo(startX, startY);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 133.7); })];
                case 1:
                    _a.sent();
                    ele.dispatchEvent(new PointerEvent("mousedown", {
                        pointerType: "mouse",
                        width: 1,
                        height: 1,
                        cancelable: true,
                        bubbles: true,
                        view: window,
                        clientX: startX,
                        clientY: startY
                    }));
                    ele.dispatchEvent(new DragEvent("dragstart", {
                        cancelable: true,
                        bubbles: true,
                        view: window,
                        clientX: startX,
                        clientY: startY
                    }));
                    console.log("sent mouse down at " + startX + ", " + startY);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 133.7); })];
                case 2:
                    _a.sent();
                    pixel = 0;
                    _loop_1 = function () {
                        var pauseTime;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    // V1 responds to PointerEvents
                                    ele.dispatchEvent(new PointerEvent("mouseover", {
                                        pointerType: "mouse",
                                        width: 1,
                                        height: 1,
                                        cancelable: true,
                                        bubbles: true,
                                        view: window,
                                        clientX: startX + pixel,
                                        clientY: startY
                                    }));
                                    ele.dispatchEvent(new PointerEvent("mousemove", {
                                        pointerType: "mouse",
                                        width: 1,
                                        height: 1,
                                        cancelable: true,
                                        bubbles: true,
                                        view: window,
                                        clientX: startX + pixel,
                                        clientY: startY
                                    }));
                                    // V2 responds to dragevents
                                    ele.dispatchEvent(new DragEvent("drag", {
                                        cancelable: true,
                                        bubbles: true,
                                        view: window,
                                        clientX: startX + pixel,
                                        clientY: startY
                                    }));
                                    pauseTime = (200 / (pixel + 1)) + (Math.random() * 5);
                                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, pauseTime); })];
                                case 1:
                                    _b.sent();
                                    console.log("sent mouse mouse move at " + (startX + pixel) + ", " + startY);
                                    // if this callback evaluates to true, stop the loop
                                    if (breakCondition !== null) {
                                        if (breakCondition()) {
                                            console.log("break condition has been reached. exiting mouse drag loop");
                                            return [2 /*return*/, "break"];
                                        }
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    pixel = 0;
                    _a.label = 3;
                case 3:
                    if (!(pixel < xOffset)) return [3 /*break*/, 6];
                    return [5 /*yield**/, _loop_1()];
                case 4:
                    state_1 = _a.sent();
                    if (state_1 === "break")
                        return [3 /*break*/, 6];
                    _a.label = 5;
                case 5:
                    pixel++;
                    return [3 /*break*/, 3];
                case 6: return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 133.7); })];
                case 7:
                    _a.sent();
                    ele.dispatchEvent(new PointerEvent("mouseup", {
                        pointerType: "mouse",
                        width: 1,
                        height: 1,
                        cancelable: true,
                        bubbles: true,
                        view: window,
                        clientX: pixel,
                        clientY: startY
                    }));
                    ele.dispatchEvent(new DragEvent("dragend", {
                        cancelable: true,
                        bubbles: true,
                        view: window,
                        clientX: pixel,
                        clientY: startY
                    }));
                    console.log("sent mouse up");
                    return [2 /*return*/];
            }
        });
    });
}
function clickMouse(element, x, y) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            element.dispatchEvent(new MouseEvent("click", {
                bubbles: true,
                clientX: x,
                clientY: y
            }));
            return [2 /*return*/];
        });
    });
}
function clickCenterOfElement(element) {
    return __awaiter(this, void 0, void 0, function () {
        var rect, x, y;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rect = element.getBoundingClientRect();
                    x = rect.x + (rect.width / 2);
                    y = rect.y + (rect.height / 2);
                    return [4 /*yield*/, clickMouse(element, x, y)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function clickProportional(element, proportionX, proportionY) {
    return __awaiter(this, void 0, void 0, function () {
        var boundingBox, xOrigin, yOrigin, xOffset, yOffset, x, y;
        return __generator(this, function (_a) {
            boundingBox = element.getBoundingClientRect();
            xOrigin = boundingBox.x;
            yOrigin = boundingBox.y;
            xOffset = (proportionX * boundingBox.width);
            yOffset = (proportionY * boundingBox.height);
            x = xOrigin + xOffset;
            y = yOrigin + yOffset;
            clickMouse(element, x, y);
            return [2 /*return*/];
        });
    });
}
function computeRotateSlideDistance(angle, slideBarEle, slideIconEle) {
    return __awaiter(this, void 0, void 0, function () {
        var slideLength, iconLength;
        return __generator(this, function (_a) {
            slideLength = slideBarEle.getBoundingClientRect().width;
            iconLength = slideIconEle.getBoundingClientRect().width;
            return [2 /*return*/, ((slideLength - iconLength) * angle) / 360];
        });
    });
}
function computePuzzleSlideDistance(proportionX, puzzleImageEle) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, puzzleImageEle.getBoundingClientRect().width * proportionX];
        });
    });
}
function checkCaptchaSuccess() {
    return __awaiter(this, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 20)) return [3 /*break*/, 5];
                    if (!(document.evaluate(successXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue !== null)) return [3 /*break*/, 2];
                    return [2 /*return*/, true];
                case 2: return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1000); })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/, false];
            }
        });
    });
}
function solveShapesV1() {
    return __awaiter(this, void 0, void 0, function () {
        var i, src, img, res, ele, submitButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 3)) return [3 /*break*/, 10];
                    return [4 /*yield*/, getImageSource(ShapesV1.IMAGE)];
                case 2:
                    src = _a.sent();
                    return [4 /*yield*/, fetchImageBase64(src)];
                case 3:
                    img = _a.sent();
                    return [4 /*yield*/, shapesApiCall(img)];
                case 4:
                    res = _a.sent();
                    ele = document.querySelector(ShapesV1.IMAGE);
                    clickProportional(ele, res.pointOneProportionX, res.pointOneProportionY);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1337); })];
                case 5:
                    _a.sent();
                    clickProportional(ele, res.pointTwoProportionX, res.pointTwoProportionY);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 2337); })];
                case 6:
                    _a.sent();
                    submitButton = document.querySelector(ShapesV1.SUBMIT_BUTTON);
                    clickCenterOfElement(submitButton);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1337); })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, checkCaptchaSuccess()];
                case 8:
                    if (_a.sent())
                        return [2 /*return*/];
                    _a.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 1];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function solveShapesV2() {
    return __awaiter(this, void 0, void 0, function () {
        var i, src, img, res, ele, submitButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 3)) return [3 /*break*/, 10];
                    return [4 /*yield*/, getImageSource(ShapesV2.IMAGE)];
                case 2:
                    src = _a.sent();
                    return [4 /*yield*/, fetchImageBase64(src)];
                case 3:
                    img = _a.sent();
                    return [4 /*yield*/, shapesApiCall(img)];
                case 4:
                    res = _a.sent();
                    ele = document.querySelector(ShapesV2.IMAGE);
                    clickProportional(ele, res.pointOneProportionX, res.pointOneProportionY);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1337); })];
                case 5:
                    _a.sent();
                    clickProportional(ele, res.pointTwoProportionX, res.pointTwoProportionY);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 2337); })];
                case 6:
                    _a.sent();
                    submitButton = document.querySelector(ShapesV2.SUBMIT_BUTTON);
                    clickCenterOfElement(submitButton);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1337); })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, checkCaptchaSuccess()];
                case 8:
                    if (_a.sent())
                        return [2 /*return*/];
                    _a.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 1];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function solveRotateV1() {
    return __awaiter(this, void 0, void 0, function () {
        var i, outerSrc, innerSrc, outerImg, innerImg, solution, slideBar, slideButton, distance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 3)) return [3 /*break*/, 11];
                    return [4 /*yield*/, getImageSource(RotateV1.OUTER)];
                case 2:
                    outerSrc = _a.sent();
                    return [4 /*yield*/, getImageSource(RotateV1.INNER)];
                case 3:
                    innerSrc = _a.sent();
                    return [4 /*yield*/, fetchImageBase64(outerSrc)];
                case 4:
                    outerImg = _a.sent();
                    return [4 /*yield*/, fetchImageBase64(innerSrc)];
                case 5:
                    innerImg = _a.sent();
                    return [4 /*yield*/, rotateApiCall(outerImg, innerImg)];
                case 6:
                    solution = _a.sent();
                    slideBar = document.querySelector(RotateV1.SLIDE_BAR);
                    slideButton = document.querySelector(RotateV1.SLIDER_DRAG_BUTTON);
                    return [4 /*yield*/, computeRotateSlideDistance(solution, slideBar, slideButton)];
                case 7:
                    distance = _a.sent();
                    return [4 /*yield*/, dragElementHorizontal(RotateV1.SLIDER_DRAG_BUTTON, distance)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, checkCaptchaSuccess()];
                case 9:
                    if (_a.sent())
                        return [2 /*return*/];
                    _a.label = 10;
                case 10:
                    i++;
                    return [3 /*break*/, 1];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function solveRotateV2() {
    return __awaiter(this, void 0, void 0, function () {
        var i, outerSrc, innerSrc, outerImg, innerImg, solution, slideBar, slideButton, distance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 3)) return [3 /*break*/, 11];
                    return [4 /*yield*/, getImageSource(RotateV2.OUTER)];
                case 2:
                    outerSrc = _a.sent();
                    return [4 /*yield*/, getImageSource(RotateV2.INNER)];
                case 3:
                    innerSrc = _a.sent();
                    return [4 /*yield*/, fetchImageBase64(outerSrc)];
                case 4:
                    outerImg = _a.sent();
                    return [4 /*yield*/, fetchImageBase64(innerSrc)];
                case 5:
                    innerImg = _a.sent();
                    return [4 /*yield*/, rotateApiCall(outerImg, innerImg)];
                case 6:
                    solution = _a.sent();
                    slideBar = document.querySelector(RotateV2.SLIDE_BAR);
                    slideButton = document.querySelector(RotateV2.SLIDER_DRAG_BUTTON);
                    return [4 /*yield*/, computeRotateSlideDistance(solution, slideBar, slideButton)];
                case 7:
                    distance = _a.sent();
                    return [4 /*yield*/, dragElementHorizontal(RotateV2.SLIDER_DRAG_BUTTON, distance)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, checkCaptchaSuccess()];
                case 9:
                    if (_a.sent())
                        return [2 /*return*/];
                    _a.label = 10;
                case 10:
                    i++;
                    return [3 /*break*/, 1];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function solvePuzzleV1() {
    return __awaiter(this, void 0, void 0, function () {
        var i, puzzleSrc, pieceSrc, puzzleImg, pieceImg, solution, puzzleImageEle, distance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 3)) return [3 /*break*/, 11];
                    return [4 /*yield*/, getImageSource(PuzzleV1.PUZZLE)];
                case 2:
                    puzzleSrc = _a.sent();
                    return [4 /*yield*/, getImageSource(PuzzleV1.PIECE)];
                case 3:
                    pieceSrc = _a.sent();
                    return [4 /*yield*/, fetchImageBase64(puzzleSrc)];
                case 4:
                    puzzleImg = _a.sent();
                    return [4 /*yield*/, fetchImageBase64(pieceSrc)];
                case 5:
                    pieceImg = _a.sent();
                    return [4 /*yield*/, puzzleApiCall(puzzleImg, pieceImg)];
                case 6:
                    solution = _a.sent();
                    puzzleImageEle = document.querySelector(PuzzleV1.PUZZLE);
                    return [4 /*yield*/, computePuzzleSlideDistance(solution, puzzleImageEle)];
                case 7:
                    distance = _a.sent();
                    return [4 /*yield*/, dragElementHorizontal(PuzzleV1.SLIDER_DRAG_BUTTON, distance)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, checkCaptchaSuccess()];
                case 9:
                    if (_a.sent())
                        return [2 /*return*/];
                    _a.label = 10;
                case 10:
                    i++;
                    return [3 /*break*/, 1];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function solvePuzzleV2() {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_2, i, state_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_2 = function (i) {
                        function pieceHasReachedTargetLocation() {
                            var piece = document.querySelector(PuzzleV2.PIECE_IMAGE_CONTAINER);
                            var style = piece.getAttribute("style");
                            console.log("piece style: " + style);
                            var translateX = parseInt(style.match("(?<=translateX\\()[0-9]+").toString());
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
                        var puzzleSrc, pieceSrc, puzzleImg, pieceImg, solution, puzzleImageEle, distance;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, getImageSource(PuzzleV2.PUZZLE)];
                                case 1:
                                    puzzleSrc = _b.sent();
                                    return [4 /*yield*/, getImageSource(PuzzleV2.PIECE)];
                                case 2:
                                    pieceSrc = _b.sent();
                                    return [4 /*yield*/, fetchImageBase64(puzzleSrc)];
                                case 3:
                                    puzzleImg = _b.sent();
                                    return [4 /*yield*/, fetchImageBase64(pieceSrc)];
                                case 4:
                                    pieceImg = _b.sent();
                                    return [4 /*yield*/, puzzleApiCall(puzzleImg, pieceImg)];
                                case 5:
                                    solution = _b.sent();
                                    puzzleImageEle = document.querySelector(PuzzleV2.PUZZLE);
                                    return [4 /*yield*/, computePuzzleSlideDistance(solution, puzzleImageEle)];
                                case 6:
                                    distance = _b.sent();
                                    return [4 /*yield*/, dragElementHorizontal(PuzzleV2.SLIDER_DRAG_BUTTON, distance, pieceHasReachedTargetLocation)];
                                case 7:
                                    _b.sent();
                                    return [4 /*yield*/, checkCaptchaSuccess()];
                                case 8:
                                    if (_b.sent())
                                        return [2 /*return*/, { value: void 0 }];
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 3)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_2(i)];
                case 2:
                    state_2 = _a.sent();
                    if (typeof state_2 === "object")
                        return [2 /*return*/, state_2.value];
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function solveIconV1() {
    return __awaiter(this, void 0, void 0, function () {
        var i, src, img, challenge, res, ele, _i, _a, point, submitButton;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < 3)) return [3 /*break*/, 12];
                    return [4 /*yield*/, getImageSource(IconV1.IMAGE)];
                case 2:
                    src = _b.sent();
                    return [4 /*yield*/, fetchImageBase64(src)];
                case 3:
                    img = _b.sent();
                    challenge = document.querySelector(IconV1.TEXT).textContent;
                    return [4 /*yield*/, iconApiCall(challenge, img)];
                case 4:
                    res = _b.sent();
                    ele = document.querySelector(IconV1.IMAGE);
                    _i = 0, _a = res.proportionalPoints;
                    _b.label = 5;
                case 5:
                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                    point = _a[_i];
                    clickProportional(ele, point.proportionX, point.proportionY);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1337); })];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 5];
                case 8:
                    submitButton = document.querySelector(IconV1.SUBMIT_BUTTON);
                    clickCenterOfElement(submitButton);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1337); })];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, checkCaptchaSuccess()];
                case 10:
                    if (_b.sent())
                        return [2 /*return*/];
                    _b.label = 11;
                case 11:
                    i++;
                    return [3 /*break*/, 1];
                case 12: return [2 /*return*/];
            }
        });
    });
}
function solveIconV2() {
    return __awaiter(this, void 0, void 0, function () {
        var i, src, img, challenge, res, ele, _i, _a, point, submitButton;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < 3)) return [3 /*break*/, 12];
                    return [4 /*yield*/, getImageSource(IconV2.IMAGE)];
                case 2:
                    src = _b.sent();
                    return [4 /*yield*/, fetchImageBase64(src)];
                case 3:
                    img = _b.sent();
                    challenge = document.querySelector(IconV2.TEXT).textContent;
                    return [4 /*yield*/, iconApiCall(challenge, img)];
                case 4:
                    res = _b.sent();
                    ele = document.querySelector(IconV2.IMAGE);
                    _i = 0, _a = res.proportionalPoints;
                    _b.label = 5;
                case 5:
                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                    point = _a[_i];
                    clickProportional(ele, point.proportionX, point.proportionY);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1337); })];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 5];
                case 8:
                    submitButton = document.querySelector(IconV2.SUBMIT_BUTTON);
                    clickCenterOfElement(submitButton);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1337); })];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, checkCaptchaSuccess()];
                case 10:
                    if (_b.sent())
                        return [2 /*return*/];
                    _b.label = 11;
                case 11:
                    i++;
                    return [3 /*break*/, 1];
                case 12: return [2 /*return*/];
            }
        });
    });
}
var isCurrentSolve = false;
function solveCaptchaLoop() {
    return __awaiter(this, void 0, void 0, function () {
        var _, captchaType, e_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!isCurrentSolve) return [3 /*break*/, 12];
                    return [4 /*yield*/, waitForAnyElementInList([Wrappers.V1, Wrappers.V2])];
                case 1:
                    _ = _a.sent();
                    return [4 /*yield*/, identifyCaptcha()];
                case 2:
                    captchaType = _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, creditsApiCall()];
                case 4:
                    if ((_a.sent()) <= 0) {
                        console.log("out of credits");
                        alert("Out of SadCaptcha credits. Please boost your balance on sadcaptcha.com/dashboard.");
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    // Catch the error because we dont want to break the solver just because we failed to fetch the credits API
                    console.log("error making check credits api call: " + e_1);
                    return [3 /*break*/, 6];
                case 6:
                    isCurrentSolve = true;
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 8, 9, 12]);
                    switch (captchaType) {
                        case CaptchaType.PUZZLE_V1:
                            solvePuzzleV1();
                            break;
                        case CaptchaType.ROTATE_V1:
                            solveRotateV1();
                            break;
                        case CaptchaType.SHAPES_V1:
                            solveShapesV1();
                            break;
                        case CaptchaType.ICON_V1:
                            solveIconV1();
                            break;
                        case CaptchaType.PUZZLE_V2:
                            solvePuzzleV2();
                            break;
                        case CaptchaType.ROTATE_V2:
                            solveRotateV2();
                            break;
                        case CaptchaType.SHAPES_V2:
                            solveShapesV2();
                            break;
                        case CaptchaType.ICON_V2:
                            solveIconV2();
                            break;
                    }
                    return [3 /*break*/, 12];
                case 8:
                    err_1 = _a.sent();
                    console.log("error solving captcha");
                    console.error(err_1);
                    console.log("restarting captcha loop");
                    return [3 /*break*/, 12];
                case 9:
                    isCurrentSolve = false;
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 5000); })];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, solveCaptchaLoop()];
                case 11:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
// Api key is passed from extension via message
var apiKey = localStorage.getItem("sadCaptchaKey");
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
/**
async function dragElementHorizontal(selector: string, xOffset: number, breakCondition: Function = null): Promise<void> {
    console.log("preparing to drag " + selector + " by " + xOffset + " pixels")
    
    // Get element and initial position
    const ele = document.querySelector(selector)
    const box = ele.getBoundingClientRect()
    const startX = (box.x + (box.width / 2)) // Center of element
    const startY = (box.y + (box.height / 2))

    // Add slight random initial delay (humans aren't instant)
    await new Promise(r => setTimeout(r, 150 + Math.random() * 100));

    // Initial mousedown with slight shake
    const shakeY = startY + (Math.random() * 2 - 1) // +/- 1px variance
    moveMouseTo(startX, shakeY)
    
    // Mouse down events
    ele.dispatchEvent(
        new PointerEvent("mousedown", {
            pointerType: "mouse",
            width: 1,
            height: 1,
            cancelable: true,
            bubbles: true,
            view: window,
            clientX: startX,
            clientY: shakeY
        })
    )
    
    ele.dispatchEvent(
        new DragEvent("dragstart", {
            cancelable: true,
            bubbles: true,
            view: window,
            clientX: startX,
            clientY: shakeY
        })
    )

    console.log("sent mouse down at " + startX + ", " + shakeY)
    await new Promise(r => setTimeout(r, 100 + Math.random() * 50));

    // Use easing function for natural acceleration/deceleration
    const easeInOutQuad = (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    
    // Break movement into chunks for more natural motion
    const chunks = 20
    const pixelsPerChunk = xOffset / chunks
    
    for (let i = 1; i <= chunks; i++) {
        const progress = i / chunks
        const easedProgress = easeInOutQuad(progress)
        const currentX = startX + (xOffset * easedProgress)
        
        // Add slight vertical wobble
        const wobbleY = startY + (Math.sin(progress * Math.PI * 2) * 2)

        // Emit events with natural wobble
        ele.dispatchEvent(
            new PointerEvent("mouseover", {
                pointerType: "mouse",
                width: 1,
                height: 1,
                cancelable: true,
                bubbles: true,
                view: window,
                clientX: currentX,
                clientY: wobbleY
            })
        )

        ele.dispatchEvent(
            new PointerEvent("mousemove", {
                pointerType: "mouse",
                width: 1,
                height: 1,
                cancelable: true,
                bubbles: true,
                view: window,
                clientX: currentX,
                clientY: wobbleY
            })
        )

        ele.dispatchEvent(
            new DragEvent("drag", {
                cancelable: true,
                bubbles: true,
                view: window,
                clientX: currentX,
                clientY: wobbleY
            })
        )

        // Variable delay based on acceleration/deceleration
        const delay = 50 + (Math.sin(progress * Math.PI) * 30)
        await new Promise(r => setTimeout(r, delay));

        if (breakCondition?.()) {
            console.log("break condition reached. exiting mouse drag loop")
            break
        }
    }

    // Add slight delay before release
    await new Promise(r => setTimeout(r, 100 + Math.random() * 50));

    // Release with slight position variance
    const finalX = startX + xOffset
    const finalY = startY + (Math.random() * 2 - 1)

    ele.dispatchEvent(
        new PointerEvent("mouseup", {
            pointerType: "mouse",
            width: 1,
            height: 1,
            cancelable: true,
            bubbles: true,
            view: window,
            clientX: finalX,
            clientY: finalY
        })
    )

    ele.dispatchEvent(
        new DragEvent("dragend", {
            cancelable: true,
            bubbles: true,
            view: window,
            clientX: finalX,
            clientY: finalY
        })
    )

    console.log("sent mouse up")
}
*/
