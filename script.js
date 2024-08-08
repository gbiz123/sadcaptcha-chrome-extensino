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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
(function () {
    // Avoid multiple instances running: 
    if (window.hasRun === true)
        return true;
    window.hasRun = true;
    var container = document.documentElement || document.body;
    // Api key is passed from extension via message
    var apiKey;
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.apiKey !== null) {
            console.log("Api key: " + request.apiKey);
            apiKey = request.apiKey;
            sendResponse({ message: "API key set.", success: 1 });
        }
        else {
            sendResponse({ message: "API key cannot be empty.", success: 0 });
        }
    });
    var rotateUrl = "https://www.sadcaptcha.com/api/v1/rotate?licenseKey=";
    var puzzleUrl = "https://www.sadcaptcha.com/api/v1/puzzle?licenseKey=";
    var shapesUrl = "https://www.sadcaptcha.com/api/v1/shapes?licenseKey=";
    var corsProxy = "https://corsproxy.io/?";
    var apiHeaders = new Headers({ "Content-Type": "application/json" });
    var successXpath = "//*[contains(text(), 'Verification complete')]";
    var captchaWrapper = ".captcha-disable-scroll";
    var rotateSelectors = [
        "[data-testid=whirl-inner-img]",
        "[data-testid=whirl-outer-img]"
    ];
    var puzzleSelectors = [
        "img.captcha_verify_img_slide"
    ];
    var shapesSelectors = [
        ".verify-captcha-submit-button"
    ];
    var CaptchaType;
    (function (CaptchaType) {
        CaptchaType[CaptchaType["PUZZLE"] = 0] = "PUZZLE";
        CaptchaType[CaptchaType["ROTATE"] = 1] = "ROTATE";
        CaptchaType[CaptchaType["SHAPES"] = 2] = "SHAPES";
    })(CaptchaType || (CaptchaType = {}));
    function waitForElement(selector) {
        return new Promise(function (resolve) {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }
            else {
                var observer_1 = new MutationObserver(function (mutations) {
                    if (document.querySelector(selector)) {
                        observer_1.disconnect();
                        return resolve(document.querySelector(selector));
                    }
                });
                observer_1.observe(container, {
                    childList: true,
                    subtree: true
                });
            }
        });
    }
    function rotateApiCall(outerB64, innerB64) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
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
                    case 2: return [2 /*return*/, (_a.sent()).angle];
                }
            });
        });
    }
    function puzzleApiCall(puzzleB64, pieceB64) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
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
                    case 2: return [2 /*return*/, (_a.sent()).slideXProportion];
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
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 15)) return [3 /*break*/, 7];
                        if (!anySelectorInListPresent(rotateSelectors)) return [3 /*break*/, 2];
                        return [2 /*return*/, CaptchaType.ROTATE];
                    case 2:
                        if (!anySelectorInListPresent(puzzleSelectors)) return [3 /*break*/, 3];
                        return [2 /*return*/, CaptchaType.PUZZLE];
                    case 3:
                        if (!anySelectorInListPresent(shapesSelectors)) return [3 /*break*/, 4];
                        return [2 /*return*/, CaptchaType.SHAPES];
                    case 4: return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 2000); })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 1];
                    case 7: throw new Error("Could not identify CaptchaType");
                }
            });
        });
    }
    function getRotateOuterImageSource() {
        return __awaiter(this, void 0, void 0, function () {
            var ele;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForElement("[data-testid=whirl-outer-img]")];
                    case 1:
                        ele = _a.sent();
                        return [2 /*return*/, ele.getAttribute("src")];
                }
            });
        });
    }
    function getRotateInnerImageSource() {
        return __awaiter(this, void 0, void 0, function () {
            var ele;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForElement("[data-testid=whirl-inner-img]")];
                    case 1:
                        ele = _a.sent();
                        return [2 /*return*/, ele.getAttribute("src")];
                }
            });
        });
    }
    function getPuzzleImageSource() {
        return __awaiter(this, void 0, void 0, function () {
            var ele;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForElement("#captcha-verify-image")];
                    case 1:
                        ele = _a.sent();
                        return [2 /*return*/, ele.getAttribute("src")];
                }
            });
        });
    }
    function getPieceImageSource() {
        return __awaiter(this, void 0, void 0, function () {
            var ele;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForElement(".captcha_verify_img_slide")];
                    case 1:
                        ele = _a.sent();
                        return [2 /*return*/, ele.getAttribute("src")];
                }
            });
        });
    }
    function getShapesImageSource() {
        return __awaiter(this, void 0, void 0, function () {
            var ele;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForElement("#captcha-verify-image")];
                    case 1:
                        ele = _a.sent();
                        return [2 /*return*/, ele.getAttribute("src")];
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
                    case 0: return [4 /*yield*/, fetch(corsProxy + imageSource)];
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
                container.dispatchEvent(new MouseEvent("mousemove", {
                    bubbles: true,
                    view: window,
                    clientX: x,
                    clientY: y
                }));
                return [2 /*return*/];
            });
        });
    }
    function dragElementHorizontal(selector, x) {
        return __awaiter(this, void 0, void 0, function () {
            var ele, box, startX, startY, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ele = document.querySelector(selector);
                        box = ele.getBoundingClientRect();
                        startX = (box.x + (box.width / 133.7));
                        startY = (box.y + (box.height / 133.7));
                        moveMouseTo(startX, startY);
                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 133.7); })];
                    case 1:
                        _a.sent();
                        ele.dispatchEvent(new MouseEvent("mousedown", {
                            bubbles: true,
                            clientX: startX,
                            clientY: startY
                        }));
                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 133.7); })];
                    case 2:
                        _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < x)) return [3 /*break*/, 6];
                        ele.dispatchEvent(new MouseEvent("mousemove", {
                            bubbles: true,
                            clientX: startX + i,
                            clientY: startY
                        }));
                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1.337); })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 133.7); })];
                    case 7:
                        _a.sent();
                        ele.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
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
    function computeRotateSlideDistance(angle) {
        return __awaiter(this, void 0, void 0, function () {
            var slidebar, slideLength, slideIcon, iconLength;
            return __generator(this, function (_a) {
                slidebar = document.querySelector(".captcha_verify_slide--slidebar");
                slideLength = slidebar.getBoundingClientRect().width;
                slideIcon = document.querySelector(".secsdk-captcha-drag-icon");
                iconLength = slideIcon.getBoundingClientRect().width;
                return [2 /*return*/, ((slideLength - iconLength) * angle) / 360];
            });
        });
    }
    function computePuzzleSlideDistance(proportionX) {
        return __awaiter(this, void 0, void 0, function () {
            var image;
            return __generator(this, function (_a) {
                image = document.querySelector("#captcha-verify-image");
                return [2 /*return*/, image.getBoundingClientRect().width * proportionX];
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
    function solveShapes() {
        return __awaiter(this, void 0, void 0, function () {
            var src, img, res, ele, submitButton;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getShapesImageSource()];
                    case 1:
                        src = _a.sent();
                        return [4 /*yield*/, fetchImageBase64(src)];
                    case 2:
                        img = _a.sent();
                        return [4 /*yield*/, shapesApiCall(img)];
                    case 3:
                        res = _a.sent();
                        ele = document.querySelector("#captcha-verify-image");
                        clickProportional(ele, res.pointOneProportionX, res.pointOneProportionY);
                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1337); })];
                    case 4:
                        _a.sent();
                        clickProportional(ele, res.pointTwoProportionX, res.pointTwoProportionY);
                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 2337); })];
                    case 5:
                        _a.sent();
                        submitButton = document.querySelector(".verify-captcha-submit-button");
                        clickCenterOfElement(submitButton);
                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1337); })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, checkCaptchaSuccess()];
                    case 7:
                        if (_a.sent())
                            return [2 /*return*/];
                        return [2 /*return*/];
                }
            });
        });
    }
    function solveRotate() {
        return __awaiter(this, void 0, void 0, function () {
            var i, outerSrc, innerSrc, outerImg, innerImg, solution, distance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 3)) return [3 /*break*/, 11];
                        return [4 /*yield*/, getRotateOuterImageSource()];
                    case 2:
                        outerSrc = _a.sent();
                        return [4 /*yield*/, getRotateInnerImageSource()];
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
                        return [4 /*yield*/, computeRotateSlideDistance(solution)];
                    case 7:
                        distance = _a.sent();
                        return [4 /*yield*/, dragElementHorizontal(".secsdk-captcha-drag-icon", distance)];
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
    function solvePuzzle() {
        return __awaiter(this, void 0, void 0, function () {
            var i, puzzleSrc, pieceSrc, puzzleImg, pieceImg, solution, distance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 3)) return [3 /*break*/, 11];
                        return [4 /*yield*/, getPuzzleImageSource()];
                    case 2:
                        puzzleSrc = _a.sent();
                        return [4 /*yield*/, getPieceImageSource()];
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
                        return [4 /*yield*/, computePuzzleSlideDistance(solution)];
                    case 7:
                        distance = _a.sent();
                        return [4 /*yield*/, dragElementHorizontal(".secsdk-captcha-drag-icon", distance)];
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
    var isCurrentSolve;
    function solveCaptchaLoop() {
        return __awaiter(this, void 0, void 0, function () {
            var _, captchaType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForElement(captchaWrapper)];
                    case 1:
                        _ = _a.sent();
                        return [4 /*yield*/, identifyCaptcha()];
                    case 2:
                        captchaType = _a.sent();
                        if (!isCurrentSolve) {
                            isCurrentSolve = true;
                            switch (captchaType) {
                                case CaptchaType.PUZZLE:
                                    solvePuzzle();
                                    break;
                                case CaptchaType.ROTATE:
                                    solveRotate();
                                    break;
                                case CaptchaType.SHAPES:
                                    solveShapes();
                                    break;
                            }
                        }
                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 30000); })];
                    case 3:
                        _a.sent();
                        isCurrentSolve = false;
                        return [4 /*yield*/, solveCaptchaLoop()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    solveCaptchaLoop();
})();
