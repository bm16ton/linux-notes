"use strict";
(function(){ // start of closure

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
    }
    return arr2;
}

function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally {
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally {
            if (_d) throw _e;
        }
    }
    return _arr;
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

function getCSSValue() {
    return new Promise(function (resolve) {
        var cssId = 'sa-css';

        if (!document.getElementById(cssId)) {
            var link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'https://tags.srv.stackadapt.com/sa.css';
            link.media = 'all';

            link.onload = function () {
                var cssValue = window.getComputedStyle(document.head).getPropertyValue('--sa-uid');
                return resolve(cssValue);
            };

            link.onerror = function () {
                return resolve('');
            };

            document.head.appendChild(link);
        } else {
            return resolve(window.getComputedStyle(document.head).getPropertyValue('--sa-uid'));
        }
    });
}

function getImageValue() {
    return new Promise(function (resolve) {
        return fetch('https://tags.srv.stackadapt.com/sa.jpeg',{cache:'force-cache'}).then(function (response) {
            return response.blob();
        }).then(function (blob) {
            var reader = new FileReader();

            reader.onload = function () {
                var rawText = this.result;
                var startIndex = rawText.indexOf(',');
                var b64Value = rawText.substr(startIndex + 1);
                var decodedStr = window.atob(b64Value);
                return resolve(ascii_to_hexa(decodedStr));
            };

            reader.readAsDataURL(blob);
        }).catch(function () {
            return resolve('');
        });
    });
}

function ascii_to_hexa(str) {
    var arr1 = [];

    for (var n = 0, l = str.length; n < l; n++) {
        var hex = str.charCodeAt(n).toString(16);
        if (hex.length === 1) hex = "0" + hex;
        arr1.push(hex);
    }

    return arr1.join('');
}

function detectIE() {
    var ua = window.navigator.userAgent; // Test values; Uncomment to check result …
    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');

    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');

    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');

    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    } // other browser


    return false;
}

if (document.currentScript != null) {
    var pixelURL = document.currentScript.getAttribute("purl");
    var auctionID = document.currentScript.getAttribute("aid");
    var impIndex = document.currentScript.getAttribute("iidx");
}

function run() {
    var ieVersion = detectIE();

    if (ieVersion === false || ieVersion > 11) {
        var wait = new Promise(function (resolve) {
            return setTimeout(resolve, 500);
        });
        var callFunc = Promise.all([getCSSValue(), getImageValue()]).then(function (result) {
            var _result = _slicedToArray(result, 2),
                cssValue = _result[0],
                imageValue = _result[1];

            var url = pixelURL + "/cv?aid=" + auctionID + "&iidx=" + impIndex + "&cv=" + cssValue + "&iv=" + imageValue;
            var img = new Image();

            function remove() {
                document.body.removeChild(img);
            }

            img.onerror = remove;
            img.onload = remove;
            img.src = url;
            document.body.appendChild(img);
        }).catch(function () {
        });
        Promise.race([callFunc, wait.then(function () {
            throw new Error("Timeout after " + ms + " ms");
        })]).catch(function () {
        });
    }
};

// if document is already loaded
if (document.readyState === "complete"
    || document.readyState === "loaded"
    || document.readyState === "interactive") {
  run();
} else { // run after document load
  document.addEventListener("DOMContentLoaded", run);
}

})(); // end of closure
