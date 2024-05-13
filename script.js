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
var container = document.documentElement || document.body;
var apiKey = prompt("Please enter your SadCaptcha license key to enable automatic captcha solving.");
var corsProxy = "https://corsproxy.io/?";
var rotateUrl = corsProxy + "https://www.sadcaptcha.com/api/v1/rotate?licenseKey=" + apiKey;
var puzzleUrl = corsProxy + "https://www.sadcaptcha.com/api/v1/puzzle?licenseKey=" + apiKey;
var shapesUrl = corsProxy + "https://www.sadcaptcha.com/api/v1/shapes?licenseKey=" + apiKey;
var CaptchaType;
(function (CaptchaType) {
    CaptchaType[CaptchaType["PUZZLE"] = 0] = "PUZZLE";
    CaptchaType[CaptchaType["ROTATE"] = 1] = "ROTATE";
    CaptchaType[CaptchaType["SHAPES"] = 2] = "SHAPES";
})(CaptchaType || (CaptchaType = {}));
function waitForElm(selector) {
    return new Promise(function (resolve) {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        var observer = new MutationObserver(function (mutations) {
            if (document.querySelector(selector)) {
                observer.disconnect();
                return resolve(document.querySelector(selector));
            }
        });
        observer.observe(container, {
            childList: true,
            subtree: true
        });
    });
}
function rotateApiCall(outerB64, innerB64) {
    return __awaiter(this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(rotateUrl, {
                        method: "POST",
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
                case 0: return [4 /*yield*/, fetch(puzzleUrl, {
                        method: "POST",
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
                case 0: return [4 /*yield*/, fetch(shapesUrl, {
                        method: "POST",
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
                    if (!(document.querySelector("[data-testid=whirl-inner-img]") !== null)) return [3 /*break*/, 2];
                    return [2 /*return*/, CaptchaType.ROTATE];
                case 2:
                    if (!(document.querySelector("img.captcha_verify_img_slide") !== null)) return [3 /*break*/, 3];
                    return [2 /*return*/, CaptchaType.PUZZLE];
                case 3:
                    if (!(document.querySelector("#verify-points") !== null)) return [3 /*break*/, 4];
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
        return __generator(this, function (_a) {
            return [2 /*return*/, document.querySelector("[data-testid=whirl-outer-img]").getAttribute("src")];
        });
    });
}
function getRotateInnerImageSource() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, document.querySelector("[data-testid=whirl-inner-img]").getAttribute("src")];
        });
    });
}
function getPuzzleImageSource() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, document.querySelector("#captcha-verify-image").getAttribute("src")];
        });
    });
}
function getPieceImageSource() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, document.querySelector(".captcha_verify_img_slide").getAttribute("src")];
        });
    });
}
function getShapesImageSource() {
    return __awaiter(this, void 0, void 0, function () {
        var ele;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, waitForElm("#captcha-verify-image")];
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
                clientX: x,
                clientY: y
            }));
            return [2 /*return*/];
        });
    });
}
function clickMouse(x, y) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    container.dispatchEvent(new MouseEvent("mousedown", {
                        clientX: x,
                        clientY: y
                    }));
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 0.07); })];
                case 1:
                    _a.sent();
                    container.dispatchEvent(new MouseEvent("mouseup", {
                        clientX: x,
                        clientY: y
                    }));
                    return [2 /*return*/];
            }
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
                    return [4 /*yield*/, clickMouse(x, y)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function clickProportional(boundingBox, proportionX, proportionY) {
    return __awaiter(this, void 0, void 0, function () {
        var xOrigin, yOrigin, xOffset, yOffset;
        return __generator(this, function (_a) {
            xOrigin = boundingBox.x;
            yOrigin = boundingBox.y;
            xOffset = (proportionX * boundingBox.width);
            yOffset = (proportionY * boundingBox.height);
            clickMouse(xOrigin + xOffset, yOrigin + yOffset);
            return [2 /*return*/];
        });
    });
}
function solveShapes() {
    return __awaiter(this, void 0, void 0, function () {
        var src, img, res, ele, rect, submitButton;
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
                    rect = ele.getBoundingClientRect();
                    clickProportional(rect, res.pointOneProportionX, res.pointOneProportionY);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1.337); })];
                case 4:
                    _a.sent();
                    clickProportional(rect, res.pointTwoProportionX, res.pointTwoProportionY);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 0.91337); })];
                case 5:
                    _a.sent();
                    submitButton = document.querySelector(".verify-captcha-submit-button");
                    clickCenterOfElement(submitButton);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1.337); })];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
waitForElm("#captcha_container").then(function (ele) {
    identifyCaptcha().then(function (captchaType) {
        switch (captchaType) {
            case CaptchaType.PUZZLE:
                alert("Puzzle");
            case CaptchaType.ROTATE:
                alert("Rotate");
            case CaptchaType.SHAPES:
                solveShapes();
        }
    });
});
