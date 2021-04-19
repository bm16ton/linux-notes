(function () {
    var storage;
    try {
        storage = window.localStorage;
    } catch (error) {
        return;
    }
    var url = __headerData.bannerUrl;
    var closeDuration = __headerData.bannerCloseDuration;
    var key = __headerData.cur + ';' + url;

    var bannerInfo = (function () {
        var text = storage.getItem('banner_message');
        if (text) {
            try {
                return JSON.parse(text);
            } catch (error) {
                return undefined;
            }
        } else {
            return undefined;
        }
    })();

    var age = bannerInfo ? (new Date() - bannerInfo.date) / 86400000 : 0;

    if (bannerInfo && bannerInfo.hide) {
        if (age >= closeDuration) {
            bannerInfo = undefined;
            storage.removeItem('banner_message');
        }
    }

    window.createShippingCookieLS = function () {
        try {
            storage.setItem('banner_message', JSON.stringify({
                date: +new Date(),
                hide: true
            }));
        } catch (error) {
            // Nothing
        }
    
        document.getElementsByClassName('shipping-notice-banner')[0].style.display = 'none';
        document.getElementsByClassName('header-shipping-msg')[0].style.display = 'none';
        document.getElementsByClassName('header-shipping-msg-close')[0].style.display = 'none';
        document.getElementsByTagName('body')[0].style.marginTop = '0';
        document.getElementsByTagName('body')[0].style.backgroundPosition = '0px 0px';
        document.body.classList.remove('shipping-msg');
        document.body.classList.remove('mini-msg');
    };

    function applyText() {
        if (bannerInfo.text) {
            document.body.insertAdjacentHTML('beforeend', bannerInfo.text);
            document.body.className += ' shipping-msg';
        }
        if (window.location.href.indexOf("/products") > -1) {
            document.body.className += " mini-msg ";
        }
        dk._internal.auto.autoModal()
    }

    function fetchText() {
        if (!url) {
            return;
        }

        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200 || this.status === 204) {
                    bannerInfo = {
                        date: +new Date(),
                        text: this.responseText,
                        key: key
                    };

                    try {
                        window.localStorage.setItem('banner_message', JSON.stringify(bannerInfo));
                    } catch (error) {
                        // Nothing
                    }

                    applyText();
                }
            }
        }
        request.send();
    }

    if (bannerInfo && bannerInfo.hide) {
        // Nothing
    } else if (bannerInfo && bannerInfo.key === key) {
        if (!bannerInfo.text && age >= 1) {
            fetchText();
        } else {
            applyText();
        }
    } else {
        fetchText();
    }
})();
