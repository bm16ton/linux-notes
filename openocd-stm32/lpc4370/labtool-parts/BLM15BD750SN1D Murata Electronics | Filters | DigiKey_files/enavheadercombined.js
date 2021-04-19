"use strict";
/// <reference path="globals.d.ts" />
// helpers need to be in the ordering and punchout headers too when the time comes
var __helpers = {
    head: document.getElementsByTagName('head')[0],
    body: document.getElementsByTagName('body')[0],
    headerDiv: document.getElementById('header'),
    footerDiv: document.getElementsByClassName('footer')[0],
    x: window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth,
    y: window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight,
    Y: Math.max(document.getElementsByTagName('body')[0].scrollHeight, document.getElementsByTagName('body')[0].offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight),
    menuNav: document.getElementsByClassName('pushmenu')[0],
    menuOverlay: document.getElementsByClassName('pushmenu__overlay')[0],
    menuOpen: document.getElementsByClassName('pushmenu__open')[0],
    menuClose: document.getElementsByClassName('pushmenu__close'),
    isiDevice: /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase()),
    isAndroid: /android/i.test(navigator.userAgent.toLowerCase()),
    htmlEscape: function (str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },
    getHeight: function (element) {
        return Math.max(element.scrollHeight, element.offsetHeight, element.clientHeight);
    },
    parentElement: function (node) {
        if ('parentElement' in node) {
            return node.parentElement;
        }
        var parent = node.parentNode;
        while (parent) {
            if ('className' in parent) {
                return parent;
            }
            else {
                parent = parent.parentNode;
            }
        }
        return null;
    },
    getText: function (element) {
        if ('textContent' in element) {
            return element.textContent;
        }
        else {
            return element.innerText;
        }
    },
    setText: function (element, text) {
        if ('textContent' in element) {
            element.textContent = text;
        }
        else {
            element.innerText = text;
        }
    },
    getTarget: function (e) {
        return (e.target || e.srcElement);
    },
    bind: function (f, that) {
        return function () {
            return f.apply(that, arguments);
        };
    },
    onEvent: function (targets, type, f) {
        var i, node;
        for (i = 0; i < targets.length; i++) {
            node = targets[i];
            if (!node) {
                continue;
            }
            if (node.addEventListener) {
                node.addEventListener(type, __helpers.bind(f, node), false);
            }
            else if (node.attachEvent) {
                node.attachEvent('on' + type, __helpers.bind(f, node));
            }
        }
    },
    hasClass: function (element, className) {
        if (typeof element.className !== "string") {
            return false;
        }
        if (element.className === '') {
            return false;
        }
        var parts = element.className.split(' '), i;
        for (i = 0; i < parts.length; i++) {
            if (parts[i] === className) {
                return true;
            }
        }
        return false;
    },
    hasParentWithClass: function (element, className) {
        var ptr = element;
        while (ptr) {
            if (this.hasClass(ptr, className)) {
                return true;
            }
            ptr = this.parentElement(ptr);
        }
    },
    createCookie: function (name, value) {
        document.cookie = name + "=" + value + "; path=/";
    },
    readCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    checkVisible: function (elm) {
        if (elm === undefined) {
            return true;
        }
        var rect = elm.getBoundingClientRect(), viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    },
    getQueryStringValue: function (key) {
        var kvs = window.location.search.substring(1).split('&');
        var i, parts;
        for (i = 0; i < kvs.length; i++) {
            parts = kvs[i].split('=');
            if (parts[0] === key) {
                return parts[1];
            }
        }
        return undefined;
    },
    setCookieValue: function (val) {
        if (!/^[a-z]{3}$/i.test(val)) {
            val = window.curs[0];
        }
        var now = new Date();
        var expires = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
        var domain = /\.digikey\..*/.exec(location.hostname)[0];
        document.cookie = 'cur=' + val + '; expires=' + expires.toUTCString() + '; domain=' + domain + '; path=/';
    },
    formatProperty: function (prop) {
        return prop['Label'] + ' ' + prop['Value'];
    },
    preventDefault: function (e) {
        if (e.preventDefault) {
            e.preventDefault(true);
        }
        else {
            e.returnValue = false;
        }
    },
    computeStyle: function (node) {
        return window.getComputedStyle ? window.getComputedStyle(node, null) : node.currentStyle;
    },
    getBrowserDims: function () {
        var docEl = document.documentElement;
        if (typeof (window.innerWidth) === 'number') {
            return { width: window.innerWidth, height: window.innerHeight };
        }
        else if (docEl && (docEl.clientWidth || docEl.clientHeight)) {
            return { width: docEl.clientWidth, height: docEl.clientHeight };
        }
        else {
            return { width: document.body.clientWidth, height: document.body.clientHeight };
        }
    },
    setLocationToFormattedLogin: function () {
        window.location.href = __headerData.loginReturnUrlFormat.replace("{returnurl}", encodeURIComponent(window.location.href));
    }
};
/// <reference path="helpers.ts" />
var __headerLayout = (function () {
    var regListeners = [];
    var intervalId;
    return {
        effectiveCur: (window.location.hostname.indexOf('punchout') > -1) ? window.__headerData.cur : __helpers.readCookie('cur') || __helpers.getQueryStringValue('curr') || window.__headerData.cur,
        hideDropdown: function () {
            if (document.querySelector('.activeDropdown') !== null) {
                var headerDropdowns = document.querySelectorAll(".header__dropdown, .lang-dropdown-list, .cur-dropdown-list");
                for (var i = 0; i < headerDropdowns.length; i++) {
                    headerDropdowns[i].removeAttribute("style");
                }
                document.getElementsByClassName("activeDropdown")[0].className = document.getElementsByClassName("activeDropdown")[0].className.replace(" activeDropdown", "");
            }
        },
        lastScrollTop: 0,
        navbarHeight: document.getElementById("header").offsetHeight,
        hasScrolled: function () {
            var _y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
            var _Y = Math.max(document.getElementsByTagName('body')[0].scrollHeight, document.getElementsByTagName('body')[0].offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
            var newScrollTop = document.documentElement.scrollTop || __helpers.body.scrollTop;
            if (Math.abs(__headerLayout.lastScrollTop - newScrollTop) <= 5) {
                return;
            }
            if (!__helpers.hasClass(__helpers.headerDiv, "nav-down") && !__helpers.hasClass(__helpers.headerDiv, "nav-up")) {
                __helpers.headerDiv.className += " nav-down";
            }
            if (newScrollTop > __headerLayout.lastScrollTop && newScrollTop > __headerLayout.navbarHeight) {
                __helpers.headerDiv.className = __helpers.headerDiv.className.replace('nav-down', 'nav-up');
            }
            else {
                if (newScrollTop + _y < _Y) {
                    __helpers.headerDiv.className = __helpers.headerDiv.className.replace('nav-up', 'nav-down');
                }
            }
            __headerLayout.lastScrollTop = newScrollTop;
        },
        registrationStatus: undefined,
        addRegistrationStatusListener: function (f) {
            var status = __headerLayout.registrationStatus;
            if (status) {
                f(status);
            }
            else {
                regListeners.push(f);
            }
            return function () {
                var idx = regListeners.indexOf(f);
                if (idx !== -1) {
                    regListeners.splice(idx, 1);
                }
            };
        },
        setRegistrationStatus: function (dataStr) {
            var data;
            try {
                data = JSON.parse(dataStr);
            }
            catch (_) {
                // Swallow it
                return;
            }
            __headerLayout.registrationStatus = data;
            var listeners = regListeners;
            regListeners = [];
            for (var i = 0; i < listeners.length; i++) {
                try {
                    listeners[i](data);
                }
                catch (_) { }
            }
            var isLoggedIn = data['IsLoggedIn'];
            if (isLoggedIn == undefined) {
                isLoggedIn = data['DisplayName'] != '';
            }
            var myDK = document.querySelector('#my_digikey_logged_in');
            if (myDK) {
                __headerLayout.setMyDigikey(myDK, document.querySelector('#my_digikey_links'), data['DisplayName']);
            }
        },
        setMyDigikey: function (title, body, name) {
            if (name === '') {
                body.innerHTML = window.__headerData.notLoggedInLinks;
                var loggedInList = document.querySelectorAll('.logged_in_bottom');
                [].slice.call(loggedInList).forEach(function (elem) {
                    elem.style.display = 'none';
                });
                return;
            }
            var loggedOutList = document.querySelectorAll('.logged_out_bottom');
            [].slice.call(loggedOutList).forEach(function (elem) {
                elem.style.display = 'none';
            });
            title.innerHTML = window.__headerData.loggedInTitle.replace('{0}', __helpers.htmlEscape(name));
            title.href = window.__headerData.loggedInNonDropdownLink;
            body.innerHTML = window.__headerData.loggedInLinks;
        },
        updateTimeToShip: function () {
            var now = new Date();
            //8pm central time in UTC format
            var utc_offset = 2;
            if (__headerData.isDst) {
                utc_offset = 1;
            }
            var utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), utc_offset, 0, 0);
            var date8pm = new Date(utc);
            //find the hours left
            var hh = date8pm.getUTCHours() - now.getUTCHours() - 1;
            if (date8pm.getUTCHours() <= now.getUTCHours()) {
                hh = 24 - Math.abs(date8pm.getUTCHours() - now.getUTCHours() - 1);
            }
            //find mins left
            var mm = (60 - now.getMinutes()) % 60;
            if (mm == 0) {
                hh++;
            }
            if (mm < 10) {
                mm = fixTimeformat(mm);
            }
            function fixTimeformat(num) {
                return "0" + num;
            }
            if (hh < 20) {
                //Cart Dropdown
                var format = __headerData.timeToShipFormat;
                var el = document.getElementsByClassName('timetoship-title')[0];
                if (el) {
                    el.innerHTML = __headerData.timeToShipText;
                }
                var el = document.getElementsByClassName('timetoship-timer')[0];
                if (el) {
                    el.innerHTML = format.replace('{0}', '&nbsp;' + hh).replace('{1}', mm);
                }
                //Currency Prompt
                var promptElement = document.getElementById('cur-prompt-order-within');
                if (promptElement) {
                    var promptFormat = promptElement.getAttribute('data-format');
                    promptElement.innerHTML = promptFormat.replace('{0}', '&nbsp;' + hh).replace('{1}', mm);
                }
            }
            else {
                //Cart Dropdown
                var el = document.getElementsByClassName('timetoship-title')[0];
                el.innerHTML = "";
                var el = document.getElementsByClassName('timetoship-timer')[0];
                el.innerHTML = "";
                //Currency Prompt
                var promptElement = document.getElementById('cur-prompt-order-within');
                if (promptElement) {
                    promptElement.innerHTML = "";
                }
            }
        },
        setTimeToShip: function () {
            intervalId = setInterval(this.updateTimeToShip, 1000);
        },
        setCart: function (title, body, data) {
            if (intervalId) {
                clearInterval(intervalId);
            }
            var count = data['Count'];
            var viewCart = body.querySelector('.dropdown--button');
            var effective = data['Details'].length;
            var i, detail, div, el, imgSrc, children, anc, href, sp;
            title.innerHTML = window.__headerData.cartTitle.replace('{0}', count);
            viewCart.innerHTML = window.__headerData.viewCart.replace('{0}', count);
            // Add analytics to View Cart link
            viewCart.setAttribute("cookie-event", "ref_page_event=View%20Cart;");
            var quantityEl = document.querySelector('.toggle--cart-total');
            quantityEl.textContent = count;
            // Remove any content we added eariler
            children = body.children;
            for (i = children.length - 1; i >= 0; i--) {
                body.removeChild(children[i]);
            }
            //Add parts to the cart here
            for (i = 0; i < effective; i++) {
                detail = data['Details'][i];
                div = document.createElement('div');
                div.className = 'cart__detail';
                anc = document.createElement('a');
                href = detail['URL'];
                if (!href) {
                    href = '#';
                }
                anc.href = href;
                if (href) {
                    div.appendChild(anc);
                    // Add analytics to anchor tag
                    anc.setAttribute("cookie-event", "ref_page_event=View%20Recent%20Part;");
                }
                //Part Image
                el = document.createElement('img');
                imgSrc = detail['Image'];
                if (!imgSrc) {
                    imgSrc = window.__headerData.noImage;
                }
                el.src = imgSrc;
                if (imgSrc) {
                    div.appendChild(el);
                }
                el.className = "detail__image";
                anc.appendChild(el);
                sp = document.createElement('span');
                //Part Number
                sp.className = "detail__text";
                el = document.createElement('span');
                el.innerHTML = __helpers.formatProperty(detail['PartNumber']);
                sp.appendChild(el);
                //Customer Reference
                el = document.createElement('span');
                el.className = 'detail__text--small';
                el.textContent = detail['CustomerReference']['Value'];
                sp.appendChild(el);
                //Part Quantity
                el = document.createElement('span');
                el.textContent = __helpers.formatProperty(detail['Quantity']);
                sp.appendChild(el);
                //Part Price
                el = document.createElement('span');
                el.className = 'detail__text--small';
                el.textContent = detail['Price']['Value'];
                sp.appendChild(el);
                anc.appendChild(sp);
                //Shipped by text
                var shippedByName = detail['SellerName'];
                if (shippedByName) { //Check against empty string, null or undefined
                    sp = document.createElement('span');
                    sp.className = 'detail__shipped-by';
                    var tempDiv = document.createElement('div');
                    tempDiv.innerText = shippedByName;
                    sp.innerHTML = __headerData.shippedByFormat.replace('{0}', '<a>' + tempDiv.innerHTML + '</a>');
                    anc.appendChild(sp);
                }
                div.appendChild(anc);
                body.appendChild(div);
            }
            el = document.createElement('p');
            el.className = 'cart--disclaimer';
            el.innerHTML = data['Disclaimer'];
            body.appendChild(el);
            body.appendChild(viewCart);
            //cart subtotal
            el = document.createElement('hr');
            el.className = 'header-dropdown-sep';
            body.appendChild(el);
            var subtotal = document.createElement('p');
            subtotal.className = 'header-cart-ref subtotal';
            el = document.createElement('span');
            el.className = 'subtotal-title';
            el.innerHTML = __headerData.cartSubtotal;
            subtotal.appendChild(el);
            el = document.createElement('span');
            el.className = 'subtotal-value';
            el.innerHTML = data['Subtotal'];
            subtotal.appendChild(el);
            body.appendChild(subtotal);
            //checkout
            if (count !== null && parseInt(count) !== 0 && __headerData.cartCheckoutURL && __headerData.cartCheckout !== "") {
                var checkout = document.createElement('a');
                checkout.className = 'dropdown--button checkout';
                checkout.href = __headerData.cartCheckoutURL;
                checkout.innerHTML = __headerData.cartCheckout;
                body.appendChild(checkout);
                checkout.setAttribute("cookie-event", "ref_page_event=Checkout;checkout_step=1;");
            }
            //free shipping threshold
            var freeShipDiff = data.FreeShipDifference;
            if (typeof freeShipDiff !== 'undefined' && freeShipDiff !== '' && __headerData.freeShippingThresholdText !== null) {
                var freeshippingthreshold = document.createElement('p');
                freeshippingthreshold.className = 'header-cart-ref freeshipping';
                el = document.createElement('span');
                el.className = 'freeshipping-title';
                el.innerHTML = __headerData.freeShippingThresholdText.replace('{0}', freeShipDiff);
                freeshippingthreshold.appendChild(el);
                body.appendChild(freeshippingthreshold);
            }
            //time to ship notification
            if (__headerData.timeToShipText !== null) {
                // US-only logic
                var today = new Date();
                // not on the weekend
                if (today.getDay() != 6 && today.getDay() != 0) {
                    var timeToShip = document.createElement('p');
                    timeToShip.className = 'header-cart-ref timetoship';
                    el = document.createElement('span');
                    el.className = 'timetoship-title';
                    timeToShip.appendChild(el);
                    el = document.createElement('span');
                    el.className = 'timetoship-timer';
                    timeToShip.appendChild(el);
                    body.appendChild(timeToShip);
                    this.setTimeToShip();
                    var shippingDisclaimer = document.createElement('p');
                    shippingDisclaimer.className = 'header-cart-ref timetoship shipping-disclaimer';
                    shippingDisclaimer.textContent = __headerData.shippingTimeDisclaimer;
                    body.appendChild(shippingDisclaimer);
                }
            }
        },
        setPersonalization: function (dataStr) {
            var data;
            try {
                data = JSON.parse(dataStr);
            }
            catch (_) {
                // Swallow it
                return;
            }
            var cartDropDownTitle = document.querySelector('.cart-dropdown-title');
            if (cartDropDownTitle) {
                var cartDiv = document.querySelector('.dropdown--cart');
                __headerLayout.setCart(cartDropDownTitle, cartDiv, data);
            }
        },
        getPersonalization: function () {
            if (!document.querySelector('.resource--cart')) {
                return;
            }
            var settings = __headerData.__settings;
            var request = new XMLHttpRequest();
            var _a = settings.getHeaderInfoUrl(__headerData.orderSite, __headerData.orderLang, __headerLayout.effectiveCur), url = _a.url, hasUser = _a.hasUser;
            request.open('GET', url, true);
            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status >= 200 && this.status < 400) {
                        __headerLayout.setPersonalization(this.responseText);
                        if (hasUser) {
                            __headerLayout.setRegistrationStatus(this.responseText);
                        }
                    }
                    else {
                        if (window.mobileCartQuantity) {
                            window.mobileCartQuantity.style.display = 'none';
                        }
                    }
                }
            };
            request.send();
            request = null;
            if (!hasUser) {
                __headerLayout.getRegistrationStatus();
            }
        },
        getRegistrationStatus: function () {
            if (!document.querySelector('.resource--cart') || window.location.hostname.indexOf('punchout') !== -1) {
                return;
            }
            var request = new XMLHttpRequest();
            var site = __headerData.orderSite;
            var lang = __headerData.orderLang;
            var url = '/MyDigiKey/Home/GetCurrentUser';
            if (window.location.host.match(/^local/)) {
                url = url.replace('classic', 'localordering');
            }
            request.open('GET', url, true);
            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status >= 200 && this.status < 400) {
                        __headerLayout.setRegistrationStatus(this.responseText);
                    }
                    else {
                        if (window.mobileCartQuantity) {
                            window.mobileCartQuantity.style.display = 'none';
                        }
                    }
                }
            };
            request.send();
            request = null;
        }
    };
})();
var format = (function () {
    var Tokenizer = /** @class */ (function () {
        function Tokenizer() {
            this.patterns = [];
        }
        Tokenizer.prototype.add = function (name, pattern) {
            this.patterns.push({ name: name, pattern: new RegExp(pattern, 'g') });
        };
        Tokenizer.prototype.parse = function (input) {
            var res = [];
            var ptr = 0;
            var i, pattern, match, matched;
            while (ptr < input.length) {
                matched = false;
                for (i = 0; i < this.patterns.length; i++) {
                    pattern = this.patterns[i];
                    pattern.pattern.lastIndex = ptr;
                    match = pattern.pattern.exec(input);
                    if (match && match.index === ptr) {
                        matched = true;
                        res.push({ name: pattern.name, groups: match, text: match[0] });
                        ptr = ptr + match[0].length;
                        break;
                    }
                }
                if (!matched) {
                    throw new Error();
                }
            }
            return res;
        };
        return Tokenizer;
    }());
    var formatGrammar = new Tokenizer();
    formatGrammar.add('{', '\\{\\{');
    formatGrammar.add('placeholder', '\\{(\\d+)\\}');
    formatGrammar.add('literal', '[^{]+');
    function format(pattern) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var tokens = formatGrammar.parse(pattern);
        var i, token, ent;
        var res = [];
        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            switch (token.name) {
                case '{':
                    res.push('{');
                    break;
                case 'placeholder':
                    res.push(args[parseInt(token.groups[1])]);
                    break;
                case 'literal':
                    res.push(token.text);
                    break;
            }
        }
        return res.join('');
    }
    return format;
})();
/// <reference path="helpers.ts" />
/// <reference path="headerLayout.ts" />
// Other Teams rely on this
var __langCurr = {
    headerData: __headerData,
    curToggleEnabled: __headerData.enableCurToggle && (!window.headerLanguageToggle || !window.headerLanguageToggle.disableCur),
    langToggleEnabled: __headerData.enableToggle && (!window.headerLanguageToggle || !window.headerLanguageToggle.disableLang),
    invokeChange: function (lang, cur) {
        var basePath = window.location.pathname;
        var baseSearch = window.location.search;
        var config = window.headerLanguageToggle;
        var site = __langCurr.headerData.site;
        var settings = __headerData.__settings;
        var locale = { site: site, lang: lang, cur: cur };
        settings.adjustSelection(locale);
        site = locale.site;
        lang = locale.lang;
        cur = locale.cur;
        //Only does something if the site is currently cn
        function tweakRMB(href) {
            if (!settings) {
                return href;
            }
            return settings.tweakRMB(href, site, lang, cur);
        }
        function toggleChina() {
            if (!settings) {
                return false;
            }
            return settings.toggleChina(site, lang, cur);
        }
        function defaultOnChange() {
            // Try the qsp
            var currentParam = 'lang=' + __langCurr.headerData.lang;
            if (baseSearch.indexOf(currentParam) !== -1) {
                window.location.href = tweakRMB(basePath + baseSearch.replace(currentParam, 'lang=' + lang));
                return;
            }
            // Try finding site/lang
            var parts = basePath.split('/');
            var i;
            for (i = 1; i < (parts.length - 1); i++) {
                if (parts[i].toLowerCase() === __langCurr.headerData.site.toLowerCase() && parts[i + 1].toLowerCase() === __langCurr.headerData.lang.toLowerCase()) {
                    parts[i + 1] = lang;
                    window.location.href = tweakRMB(parts.join('/') + baseSearch);
                    return;
                }
            }
            // Try finding lang
            for (i = 1; i < parts.length; i++) {
                if (parts[i].toLowerCase() === __langCurr.headerData.lang.toLowerCase()) {
                    parts[i] = lang;
                    window.location.href = tweakRMB(parts.join('/') + baseSearch);
                    return;
                }
            }
            // Handle the homepage
            if (parts.length === 2 && parts[1] === '') {
                parts[1] = lang;
                window.location.href = tweakRMB(parts.join('/') + baseSearch);
                return;
            }
            // Give up and reset
            if (lang !== __langCurr.headerData.lang) {
                var langSelect = document.querySelector('.lang-select');
                if (langSelect) {
                    langSelect.value = __langCurr.headerData.lang;
                }
                return;
            }
            // Reload since the currency has changed
            if (cur !== __headerLayout.effectiveCur) {
                window.location.reload();
            }
        }
        function invokeOnChange() {
            __helpers.setCookieValue(cur);
            // Hack to handle China; would be nice to get rid of someday
            if (__langCurr.headerData.site === 'CN' && cur !== __headerLayout.effectiveCur) {
                if (!toggleChina()) {
                    defaultOnChange();
                }
                return;
            }
            if (config && config.change) {
                config.change(lang, cur);
            }
            else {
                defaultOnChange();
            }
        }
        // Delay execution to prevent weirdness when setting window.location
        window.setTimeout(invokeOnChange, 0);
    },
    resetCurSelection: function () {
        var curEl = document.querySelector('.cur-select');
        if (curEl) {
            curEl.value = __headerLayout.effectiveCur;
        }
    }
};
(function () {
    //show and hide language dropdown  
    if (__langCurr.langToggleEnabled) {
        var langButtons = document.querySelectorAll(".lang-dropdown > div:not(.regions)");
        for (var i = 0; i < langButtons.length; i++) {
            langButtons[i].addEventListener('click', function () {
                var whichButton = __helpers.parentElement(this).className;
                if (!__helpers.hasClass(this, "activeDropdown")) {
                    __headerLayout.hideDropdown();
                    this.className = this.className + " activeDropdown";
                    document.getElementsByClassName(whichButton + "-list")[0].style.display = "block";
                }
                else {
                    __headerLayout.hideDropdown();
                }
            });
        }
    }
    else {
        var langSelector = document.querySelector('#lang-dropdown');
        if (langSelector) {
            langSelector.style.display = 'none';
        }
        var disableLangSelector = document.querySelector('#disabled-lang');
        if (disableLangSelector) {
            disableLangSelector.style.display = '';
        }
    }
    if (document.querySelector('.lang-dropdown-list span')) {
        __helpers.onEvent(document.querySelectorAll('.lang-dropdown-list span'), 'click', function () {
            var span = this;
            __langCurr.invokeChange(span.dataset.lang, __headerLayout.effectiveCur);
        });
    }
    if (document.querySelector('.flymenu__clc-lang .flymenu__radio-container input')) {
        __helpers.onEvent(document.querySelectorAll('.flymenu__clc-lang .flymenu__radio-container input'), 'change', function () {
            var input = this;
            __langCurr.invokeChange(input.dataset.lang, __headerLayout.effectiveCur);
        });
    }
})();
//brought in as is for now, look into replacing with something simpler later
// http://spin.js.org/#v2.1.3
var Spinner = (function () {
    "use strict";
    function a(a, b) { var c, d = document.createElement(a || "div"); for (c in b)
        d[c] = b[c]; return d; }
    function b(a) { for (var b = 1, c = arguments.length; c > b; b++)
        a.appendChild(arguments[b]); return a; }
    function c(a, b, c, d) { var e = ["opacity", b, ~~(100 * a), c, d].join("-"), f = .01 + c / d * 100, g = Math.max(1 - (1 - a) / b * (100 - f), a), h = j.substring(0, j.indexOf("Animation")).toLowerCase(), i = h && "-" + h + "-" || ""; return m[e] || (k.insertRule("@" + i + "keyframes " + e + "{0%{opacity:" + g + "}" + f + "%{opacity:" + a + "}" + (f + .01) + "%{opacity:1}" + (f + b) % 100 + "%{opacity:" + a + "}100%{opacity:" + g + "}}", k.cssRules.length), m[e] = 1), e; }
    function d(a, b) { var c, d, e = a.style; if (b = b.charAt(0).toUpperCase() + b.slice(1), void 0 !== e[b])
        return b; for (d = 0; d < l.length; d++)
        if (c = l[d] + b, void 0 !== e[c])
            return c; }
    function e(a, b) { for (var c in b)
        a.style[d(a, c) || c] = b[c]; return a; }
    function f(a) { for (var b = 1; b < arguments.length; b++) {
        var c = arguments[b];
        for (var d in c)
            void 0 === a[d] && (a[d] = c[d]);
    } return a; }
    function g(a, b) { return "string" == typeof a ? a : a[b % a.length]; }
    function h(a) { this.opts = f(a || {}, h.defaults, n); }
    function i() { function c(b, c) { return a("<" + b + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', c); } k.addRule(".spin-vml", "behavior:url(#default#VML)"), h.prototype.lines = function (a, d) { function f() { return e(c("group", { coordsize: k + " " + k, coordorigin: -j + " " + -j }), { width: k, height: k }); } function h(a, h, i) { b(m, b(e(f(), { rotation: 360 / d.lines * a + "deg", left: ~~h }), b(e(c("roundrect", { arcsize: d.corners }), { width: j, height: d.scale * d.width, left: d.scale * d.radius, top: -d.scale * d.width >> 1, filter: i }), c("fill", { color: g(d.color, a), opacity: d.opacity }), c("stroke", { opacity: 0 })))); } var i, j = d.scale * (d.length + d.width), k = 2 * d.scale * j, l = -(d.width + d.length) * d.scale * 2 + "px", m = e(f(), { position: "absolute", top: l, left: l }); if (d.shadow)
        for (i = 1; i <= d.lines; i++)
            h(i, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)"); for (i = 1; i <= d.lines; i++)
        h(i); return b(a, m); }, h.prototype.opacity = function (a, b, c, d) { var e = a.firstChild; d = d.shadow && d.lines || 0, e && b + d < e.childNodes.length && (e = e.childNodes[b + d], e = e && e.firstChild, e = e && e.firstChild, e && (e.opacity = c)); }; }
    var j, k, l = ["webkit", "Moz", "ms", "O"], m = {}, n = { lines: 12, length: 7, width: 5, radius: 10, scale: 1, corners: 1, color: "#000", opacity: .25, rotate: 0, direction: 1, speed: 1, trail: 100, fps: 20, zIndex: 2e9, className: "spinner", top: "50%", left: "50%", shadow: !1, hwaccel: !1, position: "absolute" };
    if (h.defaults = {}, f(h.prototype, { spin: function (b) { this.stop(); var c = this, d = c.opts, f = c.el = a(null, { className: d.className }); if (e(f, { position: d.position, width: 0, zIndex: d.zIndex, left: d.left, top: d.top }), b && b.insertBefore(f, b.firstChild || null), f.setAttribute("role", "progressbar"), c.lines(f, c.opts), !j) {
            var g, h = 0, i = (d.lines - 1) * (1 - d.direction) / 2, k = d.fps, l = k / d.speed, m = (1 - d.opacity) / (l * d.trail / 100), n = l / d.lines;
            !function o() { h++; for (var a = 0; a < d.lines; a++)
                g = Math.max(1 - (h + (d.lines - a) * n) % l * m, d.opacity), c.opacity(f, a * d.direction + i, g, d); c.timeout = c.el && setTimeout(o, ~~(1e3 / k)); }();
        } return c; }, stop: function () { var a = this.el; return a && (clearTimeout(this.timeout), a.parentNode && a.parentNode.removeChild(a), this.el = void 0), this; }, lines: function (d, f) { function h(b, c) { return e(a(), { position: "absolute", width: f.scale * (f.length + f.width) + "px", height: f.scale * f.width + "px", background: b, boxShadow: c, transformOrigin: "left", transform: "rotate(" + ~~(360 / f.lines * k + f.rotate) + "deg) translate(" + f.scale * f.radius + "px,0)", borderRadius: (f.corners * f.scale * f.width >> 1) + "px" }); } for (var i, k = 0, l = (f.lines - 1) * (1 - f.direction) / 2; k < f.lines; k++)
            i = e(a(), { position: "absolute", top: 1 + ~(f.scale * f.width / 2) + "px", transform: f.hwaccel ? "translate3d(0,0,0)" : "", opacity: f.opacity, animation: j && c(f.opacity, f.trail, l + k * f.direction, f.lines) + " " + 1 / f.speed + "s linear infinite" }), f.shadow && b(i, e(h("#000", "0 0 4px #000"), { top: "2px" })), b(d, b(i, h(g(f.color, k), "0 0 1px rgba(0,0,0,.1)"))); return d; }, opacity: function (a, b, c) { b < a.childNodes.length && (a.childNodes[b].style.opacity = c); } }), "undefined" != typeof document) {
        k = function () { var c = a("style", { type: "text/css" }); return b(document.getElementsByTagName("head")[0], c), c.sheet || c.styleSheet; }();
        var o = e(a("group"), { behavior: "url(#default#VML)" });
        !d(o, "transform") && o.adj ? i() : j = d(o, "animation");
    }
    return h;
})();
/// <reference path="helpers.ts" />
/// <reference path="spinner.js" />
var createDialog = (function () {
    var dialogState = { active: false, overlay: undefined, queueSpinner: false, spinner: undefined };
    function createDialog(url, classes, onCancel, onLoad) {
        if (dialogState.active) {
            throw 'A dialog is already active';
        }
        dialogState.active = true;
        var overlay = dialogState.overlay;
        var spinner = dialogState.spinner;
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'header-overlay';
            document.body.appendChild(overlay);
            spinner = new Spinner({ color: '#fff', position: 'fixed' }).spin();
            document.body.appendChild(spinner.el);
            dialogState.overlay = overlay;
            dialogState.spinner = spinner;
            if (window.mobile && window.mobile.showOverlay) {
                window.mobile.showOverlay();
            }
        }
        function showSpinnerLater() {
            setTimeout(function () {
                if (dialogState.overlay && dialogState.queueSpinner) {
                    spinner.el.style.display = '';
                }
            }, 500);
        }
        function clearOverlay() {
            dialogState.active = false;
            if (overlay) {
                document.body.removeChild(overlay);
            }
            dialogState.overlay = undefined;
            if (window.mobile && window.mobile.hideOverlay) {
                window.mobile.hideOverlay();
            }
        }
        spinner.el.style.display = 'none';
        dialogState.queueSpinner = true;
        showSpinnerLater();
        var container = document.createElement('div');
        container.innerHTML = '<div class="header-popup" tabindex="-1" role="dialog" aria-labelledby="header-popup-title-title"><div class="header-popup-titlebar" unselectable="on"><span class="header-popup-title" id="header-popup-title-title" unselectable="on"></span><a href="#" class="header-popup-close" role="button" unselectable="on"><span class="header-popup-icon" unselectable="on">close</span></a></div><iframe class="' + classes + '" src="' + __helpers.htmlEscape(url) + '"></iframe></div>';
        var dialog = container.querySelector('.header-popup');
        var title = container.querySelector('.header-popup-title');
        var frame = container.querySelector('iframe');
        var closeButton = dialog.querySelector('.header-popup-icon');
        var headerOverlay = document.querySelector('.header-overlay');
        var armed = true;
        dialog.style.zIndex = '1002';
        dialog.style.display = 'none';
        document.body.appendChild(dialog);
        __helpers.onEvent([frame], 'load', function () {
            if (!armed) {
                return;
            }
            var doc;
            try {
                doc = frame.contentDocument;
            }
            catch (e) {
                onCancel();
                return;
            }
            if (!doc) {
                onCancel();
                return;
            }
            var redirectText = doc.querySelector('#redirect');
            var titleText = doc.querySelector('#title');
            var titleElText = doc.querySelector('title');
            var heightText = doc.querySelector('#height');
            var dims = __helpers.getBrowserDims();
            function showDialog() {
                dialogState.queueSpinner = false;
                spinner.el.style.display = 'none';
                if (title.innerHTML !== 'Untitled') {
                    dialog.style.display = '';
                    if (heightText && __helpers.getText(heightText)) {
                        frame.style.maxHeight = __helpers.getText(heightText) + 'px';
                        __helpers.parentElement(heightText).removeChild(heightText);
                    }
                    else {
                        frame.style.maxHeight = __helpers.getHeight(frame.contentDocument.body) + 'px';
                    }
                    dialog.style.top = ((dims.height - __helpers.getHeight(dialog)) / 2) + 'px';
                }
            }
            if (redirectText) {
                frame.src = redirectText.innerHTML;
            }
            else {
                if (titleText) {
                    title.innerHTML = titleText.innerHTML;
                    __helpers.parentElement(titleText).removeChild(titleText);
                }
                else {
                    title.innerHTML = titleElText ? titleElText.innerHTML : 'Untitled';
                }
                // Hook the forms
                __helpers.onEvent(doc.forms, 'submit', function () {
                    spinner.el.style.display = 'none';
                    dialogState.queueSpinner = true;
                    showSpinnerLater();
                    dialog.style.display = 'none';
                    clearOverlay();
                    var curPrompt = document.getElementById('currency-prompt');
                    if (curPrompt && curPrompt.style.display === "block") {
                        curPrompt.style.display = 'none';
                        dk.siteMask.hide();
                    }
                });
                if (onLoad) {
                    onLoad(frame, showDialog);
                }
                else {
                    showDialog();
                }
            }
        });
        __helpers.onEvent([closeButton, headerOverlay], 'click', function (e) {
            onCancel();
            __helpers.preventDefault(e);
        });
        //escape key close in the future
        return {
            close: function () {
                dialogState.active = false;
                armed = false;
                document.body.removeChild(dialog);
                setTimeout(function () {
                    if (!dialogState.active) {
                        if (overlay) {
                            document.body.removeChild(overlay);
                        }
                        dialogState.overlay = undefined;
                        document.body.removeChild(spinner.el);
                        spinner.stop();
                        if (window.mobile && window.mobile.hideOverlay) {
                            window.mobile.hideOverlay();
                        }
                    }
                }, 0);
            },
            frame: frame
        };
    }
    return createDialog;
})();
/// <reference path="helpers.ts" />
/// <reference path="headerLayout.ts" />
/// <reference path="format.ts" />
/// <reference path="langCurr.ts" />
/// <reference path="dialog.ts" />
(function () {
    //close dropdowns or the cur prompt when clicking elsewhere
    document.addEventListener("click", function (e) {
        var thisTarget = __helpers.getTarget(e);
        if (!__helpers.hasParentWithClass(thisTarget, 'lang-dropdown') && !__helpers.hasParentWithClass(thisTarget, 'cur-dropdown') && !__helpers.hasParentWithClass(thisTarget, 'regions') && !__helpers.hasParentWithClass(thisTarget, 'cur-dropdown') && !__helpers.hasParentWithClass(thisTarget, 'currency-prompt')) {
            __headerLayout.hideDropdown();
            var curPrompt = document.getElementById('currency-prompt');
            if (curPrompt && curPrompt.style.display === "block" && !__helpers.hasParentWithClass(thisTarget, 'cur-prompt-click')) {
                curPrompt.style.display = 'none';
                dk.siteMask.hide();
            }
        }
        else if (!__helpers.hasParentWithClass(thisTarget, 'currency-prompt') && !__helpers.hasParentWithClass(thisTarget, 'cur-dropdown')) {
            var curPrompt = document.getElementById('currency-prompt');
            if (curPrompt && curPrompt.style.display === "block" && !__helpers.hasParentWithClass(thisTarget, 'cur-prompt-click')) {
                curPrompt.style.display = 'none';
                dk.siteMask.hide();
            }
        }
        else if (!__helpers.hasParentWithClass(thisTarget, 'lang-dropdown') && !__helpers.hasParentWithClass(thisTarget, 'cur-dropdown') && !__helpers.hasParentWithClass(thisTarget, 'regions')) {
            __headerLayout.hideDropdown();
        }
    });
    window.addEventListener('scroll', __headerLayout.hasScrolled);
    function updateTextDirection(e) {
        var target = __helpers.getTarget(e);
        if (__helpers.hasParentWithClass(target, 'rtl')) {
            target.style.direction = 'rtl';
            return;
        }
        if (__helpers.computeStyle(__helpers.parentElement(target)).direction === 'ltr') {
            target.style.direction = 'ltr';
            return;
        }
        setTimeout(function () {
            var value = target.value;
            var rtl = false;
            var i, char;
            for (i = 0; i < value.length; i++) {
                char = value.charCodeAt(i);
                if (char >= 1488 && char <= 1514) {
                    rtl = true;
                }
            }
            target.style.direction = rtl ? 'rtl' : 'ltr';
        }, 0);
    }
    function registerDirChanger() {
        var targets = document.querySelectorAll('.dkdirchanger');
        __helpers.onEvent(targets, 'change', updateTextDirection);
        __helpers.onEvent(targets, 'paste', updateTextDirection);
        __helpers.onEvent(targets, 'keydown', updateTextDirection);
        __helpers.onEvent(targets, 'keyup', updateTextDirection);
        var i;
        for (i = 0; i < targets.length; i++) {
            updateTextDirection({ target: targets[i] });
        }
    }
    registerDirChanger();
    function curPomptLangChange() {
        var langSelect = document.getElementById("language-prompt-dropdown");
        var promptNameSelect = document.getElementById("currency-prompt");
        if (langSelect && promptNameSelect) {
            var langValue = langSelect.options[langSelect.selectedIndex].value;
            var promptNameValue = promptNameSelect.getAttribute("data-name");
            var url = "/api/scTools/CurrencyPrompt/GetCurrencyPrompt";
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var response = xhr.responseText;
                        if (response) {
                            replaceCurrencyPrompt(response);
                        }
                    }
                }
            };
            xhr.onerror = function (e) {
                alert("An error occured");
            };
            xhr.send('name=' + promptNameValue + '&lang=' + langValue);
        }
    }
    function replaceCurrencyPrompt(prompt) {
        var promptRadioButtons = document.getElementsByClassName("cur-prompt-radio");
        var cur = __headerLayout.effectiveCur;
        for (var i = 0; i < promptRadioButtons.length; i++) {
            if (promptRadioButtons[i].checked) {
                cur = promptRadioButtons[i].value;
                break;
            }
        }
        var promptLocation = document.getElementById("currency-prompt");
        if (promptLocation) {
            promptLocation.outerHTML = prompt;
            selectCurPromptCur(cur);
            applyListenersToCurrencyPrompt();
            dk.dropdowns('#language-prompt-dropdown');
        }
    }
    function selectCurPromptCur(cur) {
        var additionalTextSections = document.getElementsByClassName("additional-text-for-cur");
        for (var i = 0; i < additionalTextSections.length; i++) {
            if (additionalTextSections[i].getAttribute("data-cur") === cur) {
                additionalTextSections[i].style.display = 'block';
            }
            else {
                additionalTextSections[i].style.display = 'none';
            }
        }
        var paymentInfoSections = document.getElementsByClassName("currency-prompt-payment-types-section");
        for (var i = 0; i < paymentInfoSections.length; i++) {
            if (paymentInfoSections[i].getAttribute("data-cur") === cur) {
                paymentInfoSections[i].style.display = 'block';
            }
            else {
                paymentInfoSections[i].style.display = 'none';
            }
        }
        var promptRadioButtons = document.getElementsByClassName("cur-prompt-radio");
        for (var i = 0; i < promptRadioButtons.length; i++) {
            if (promptRadioButtons[i].value === cur) {
                promptRadioButtons[i].checked = true;
            }
        }
    }
    function applyListenersToCurrencyPrompt() {
        var langSelect = document.getElementById("language-prompt-dropdown");
        var updatedPreferencesButton = document.getElementById("cur-prompt-update");
        var promptClose = document.getElementById("cur-prompt-close");
        if (langSelect) {
            langSelect.onchange = curPomptLangChange;
        }
        if (updatedPreferencesButton) {
            updatedPreferencesButton.onclick = updateSiteLangCur;
        }
        if (promptClose) {
            promptClose.onclick = function () {
                var curPrompt = document.getElementById('currency-prompt');
                if (curPrompt && curPrompt.style.display === "block") {
                    curPrompt.style.display = 'none';
                    dk.siteMask.hide();
                }
            };
        }
        var promptRadioButtons = document.getElementsByClassName("cur-prompt-radio");
        for (var j = 0; j < promptRadioButtons.length; j++) {
            promptRadioButtons[j].addEventListener('change', function () {
                selectCurPromptCur(this.value);
            });
        }
    }
    function updateSiteLangCur() {
        var langSelect = document.getElementById("language-prompt-dropdown");
        var curSelect = document.querySelector('input[name="currency"]:checked');
        var lang = langSelect ? langSelect.value.substring(0, 2) : __headerData.lang;
        var cur = curSelect ? curSelect.value : __headerData.cur;
        if (cur !== __headerData.cur) {
            // Change the language and currency
            changeCur(lang, cur);
        }
        else if (lang !== __headerData.lang) {
            // Change just the language
            __langCurr.invokeChange(lang, cur);
        }
        else {
            // Reset selection
            __langCurr.resetCurSelection();
            var close_1 = document.getElementById("cur-prompt-close");
            if (close_1) {
                close_1.click();
            }
        }
    }
    function changeCur(lang, cur) {
        function contRemoveDenied(accepted) {
            if (accepted) {
                __langCurr.invokeChange(lang, cur);
            }
            else {
                __langCurr.resetCurSelection();
            }
        }
        if (document.domain.indexOf('.cn') > -1) {
            __langCurr.invokeChange(lang, cur);
        }
        else {
            window.headerAcceptCurrencyChange = contRemoveDenied;
            var url = format('/classic/ordering/currencysmall.aspx?headerCurrChange=true&cscur={0}', cur);
            createDialog(url, 'currency-denied-frame', function () { return contRemoveDenied(false); });
        }
    }
    function displayCurPrompt(cur) {
        selectCurPromptCur(cur || __headerLayout.effectiveCur);
        var prompt = document.querySelector("#currency-prompt");
        if (prompt && prompt.style.display !== "block") {
            prompt.style.display = 'block';
            dk.dropdowns('#language-prompt-dropdown');
            dk.siteMask.show();
        }
    }
    //show and hide currency dropdown 
    if (__langCurr.curToggleEnabled === false) {
        var curDropdown = document.querySelector('#cur-dropdown');
        if (curDropdown) {
            curDropdown.style.display = 'none';
        }
        var cur = document.querySelector('#disabled-cur');
        if (cur) {
            cur.style.display = '';
        }
    }
    else {
        var curButtons = document.querySelectorAll(".cur-dropdown > ul");
        for (var i = 0; i < curButtons.length; i++) {
            curButtons[i].addEventListener('click', function () {
                var whichButton = __helpers.parentElement(this).className;
                if (!__helpers.hasClass(this, "activeDropdown")) {
                    __headerLayout.hideDropdown();
                    this.className = this.className + " activeDropdown";
                    document.getElementsByClassName(whichButton + "-list")[0].style.display = "block";
                }
                else {
                    __headerLayout.hideDropdown();
                }
            });
        }
    }
    if (document.querySelectorAll('.cur-dropdown-list li')) {
        __helpers.onEvent(document.querySelectorAll('.cur-dropdown-list span'), 'click', function () {
            displayCurPrompt(this.getAttribute("data-cur"));
        });
    }
    if (document.querySelectorAll('.lower-currencies a')) {
        __helpers.onEvent(document.querySelectorAll('.flymenu__clc-curr a'), 'click', function () {
            displayCurPrompt(this.getAttribute("data-cur"));
        });
    }
    var inbar = document.getElementById("banner__graybar--inNav");
    var graybar = document.getElementById("banner__graybar");
    if (graybar !== null && inbar !== null) {
        var marquees = document.querySelectorAll(".graybar--marquee");
        if (marquees.length > 2) {
            var slideIndex = 0;
            var inNavSlides = inbar.querySelectorAll(".graybar--marquee");
            var grayBarSlides = graybar.querySelectorAll(".graybar--marquee");
            var displayOff = function (o) {
                grayBarSlides[o].classList.remove("onDisplay");
                inNavSlides[o].classList.remove("onDisplay");
            };
            var opaqueOff = function (o) {
                grayBarSlides[o].classList.remove("opaque");
                inNavSlides[o].classList.remove("opaque");
            };
            var displayOn = function (si) {
                grayBarSlides[si - 1].classList.add("onDisplay");
                inNavSlides[si - 1].classList.add("onDisplay");
            };
            var opaqueOn = function (si) {
                grayBarSlides[si - 1].classList.add("opaque");
                inNavSlides[si - 1].classList.add("opaque");
            };
            var runMarquee = function () {
                for (var o = 0; o < grayBarSlides.length; o++) {
                    setTimeout(opaqueOff, 7500, o);
                    setTimeout(displayOff, 8000, o);
                }
                slideIndex++;
                if (slideIndex > grayBarSlides.length) {
                    slideIndex = 1;
                }
                setTimeout(displayOn, 0, slideIndex);
                setTimeout(opaqueOn, 500, slideIndex);
                setTimeout(runMarquee, 8000);
            };
            runMarquee();
        }
        else {
            for (i = 0; i < marquees.length; i++) {
                marquees[i].classList.remove("graybar--marquee");
            }
        }
    }
    applyListenersToCurrencyPrompt();
    // For RMB's use
    window.refreshHeaderPersonalization = __headerLayout.getPersonalization.bind(__headerLayout);
})();
/// <reference path="header.ts" />
__headerData.__settings = {
    toggleChina: function (site, lang, cur) {
        var path = window.location.pathname;
        var cdlocation = window.location.toString();
        var phttps = 'https://';
        if (cdlocation.indexOf('#') != -1) {
            cdlocation = cdlocation.split('#')[0];
        }
        if (cur == 'USD') {
            if (path.indexOf('/ordering/OrderStatusEntryView') == 0) {
                cdlocation = phttps + window.location.hostname + '/mydigikey/revieworder/status';
            }
            else if (path.indexOf('/ordering/') == 0) {
                cdlocation = phttps + window.location.hostname + '/ordering/shoppingcart';
            }
            else if (/\/\w{2}\/ordering/.test(path)) {
                cdlocation = phttps + window.location.hostname + '/ordering/shoppingcart';
            }
            else if (path.indexOf('/mydigikey/') == 0) {
                cdlocation = phttps + window.location.hostname + '/MyDigiKey';
            }
            else if (path.indexOf('/products/zh/PartCompare') == 0) {
                cdlocation = phttps + window.location.hostname + '/products/zh';
            }
            else if (path.indexOf('/zh/resources/no-results') == 0) {
                cdlocation = phttps + window.location.hostname + '/products/zh' + window.location.search;
            }
            else {
                cdlocation = cdlocation;
            }
        }
        else {
            if (path.indexOf('/ordering/') == 0) {
                cdlocation = phttps + window.location.hostname + '/ordering/ShoppingCartView';
            }
            else if (path.indexOf('/MyDigiKey/ReviewOrder/Status') == 0 || path.indexOf('/mydigikey/revieworder/status') == 0) {
                cdlocation = phttps + window.location.hostname + '/ordering/OrderStatusEntryView';
            }
            else if (path.indexOf('/MyDigiKey') == 0 || path.indexOf('/BOM') == 0) {
                cdlocation = phttps + window.location.hostname + '/mydigikey/LogonForm';
            }
            else if (path.indexOf('/zh/resources/no-results') == 0 || path.indexOf('/en/resources/no-results') == 0) {
                cdlocation = phttps + window.location.hostname + '/products/zh' + window.location.search;
            }
            else if (path.indexOf('/en/') != -1) {
                cdlocation = phttps + window.location.hostname + path.replace('/en/', '/zh/') + window.location.search;
            }
            else if (path.indexOf('/en') == (path.length - 3)) {
                cdlocation = phttps + window.location.hostname;
            }
            else if (path.indexOf('/products/compare/') == 0) {
                cdlocation = phttps + window.location.hostname + '/products/zh';
            }
            else if (path.indexOf('/products/zh') == -1 && path.indexOf('product-detail/zh') == -1 && path.indexOf('/zh') > 0) {
                cdlocation = phttps + window.location.hostname + '/products/zh';
            }
            else {
                cdlocation = cdlocation;
            }
        }
        window.location.href = cdlocation;
        return true;
    },
    getHeaderInfoUrl: function (site, lang, cur) {
        if (site == 'GB') {
            site = 'UK';
        }
        var url = '/classic/headerinfo.ashx?site=' + site + '&lang=' + lang + '&cur=' + cur;
        if (cur === 'CNY') {
            url = '/zh/ordering/headerinfo';
        }
        return {
            url: url,
            hasUser: false
        };
    },
    tweakRMB: function (href, site, lang, cur) {
        if (site !== 'CN') {
            return href;
        }
        var searchStart = href.indexOf('?');
        var path = href.substring(0, searchStart < 0 ? href.length : searchStart);
        var newPath = undefined;
        if (cur === 'USD') {
            if (path.indexOf('/ordering/') === 0) {
                newPath = '/ordering/shoppingcart';
            }
            else if (path.indexOf('/mydigikey/') === 0) {
                newPath = '/MyDigiKey';
            }
            else if (/\/products\/\w{2}\/PartCompare/.test(path)) {
                newPath = '/products/' + lang;
            }
        }
        else {
            if (path.indexOf('/ordering/') === 0) {
                newPath = '/ordering/ShoppingCartView';
            }
            else if (path.indexOf('/MyDigiKey') === 0) {
                newPath = '/mydigikey/LogonForm';
            }
            else if (path.indexOf('/products/zh') === -1 && path.indexOf('/zh') > 0) {
                newPath = '/products/zh';
            }
            else if (path.indexOf('/products/compare/zh') === 0 || path.indexOf('/products/compare/en') === 0) {
                newPath = '/products/zh';
            }
        }
        return newPath || href;
    },
    adjustSelection: function (locale) {
        if (locale.lang !== __headerData.lang && locale.cur === 'CNY' && locale.lang === 'en') {
            locale.cur = 'USD';
        }
        else if (locale.cur !== __headerData.cur && locale.cur === 'CNY') {
            locale.lang = 'zh';
        }
    }
};
__headerLayout.getPersonalization();
//# sourceMappingURL=standard.js.map