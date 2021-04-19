(function () {
    function runFooterScript() {
        var __footerLayout = {
            body : document.getElementsByTagName('body')[0],
            headerDiv : document.getElementsByClassName('header')[0],
            footerDiv : document.getElementsByClassName('footer')[0],
            isiDevice : /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase()),
            isAndroid : /android/i.test(navigator.userAgent.toLowerCase()),
            feedbackButton : document.querySelector('.footer #feedback'),
            optGlobalVar : document.getElementsByClassName('.optimizely-info')[0],
            readCookie : function (name) {
                "use strict";
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            },
            checkVisible : function (elm) {
                "use strict";
                var rect = elm.getBoundingClientRect();
                var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
                return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
            },
    
            moveFeedback : function () {
                var feedback = document.getElementById("floater");
                if (!__footerLayout.checkVisible(__footerLayout.footerDiv) && document.querySelector('.floating')) {
                    feedback.className = feedback.className.replace('floating', '')
                } else if (__footerLayout.checkVisible(__footerLayout.footerDiv) && !document.querySelector('.floating')) {
                    feedback.className = feedback.className + ' floating';
                }
            },
            setFullsite : function () {
                __footerLayout.body.className += ' fullsite';
                __footerLayout.headerDiv.className = __footerLayout.headerDiv.className.replace('resp', '')
                __footerLayout.footerDiv.className = __footerLayout.footerDiv.className.replace('resp', '')
            },
            sendFeedback : function () {
                if(window.optimizely && window.optimizely.data && document.querySelectorAll('script[src*="//cdn.optimizely.com"]').length > 0) {
                    var optExpName;
                    var optExpVar;
                    var optExpNum = 1;
                    var optimizelyTest = "";
                    var activeExps = optimizely.get("state").getActiveExperimentIds();
                    if(Object.keys(activeExps).length > 0 && typeof activeExps !== "undefined") {
                        for(var i = activeExps.length - 1; i >= 0; i--) {
                            var exp = activeExps[i];
                            optExpName = optimizely.get("data").experiments[exp].name;
                            optExpVar = optimizely.get("state").getVariationMap()[exp].name;
                            optExpName = optExpName.replace(/[^\w-]/gi, '+');
                            optExpVar = optExpVar.replace(/[^\w]/gi, '+');
                            optimizelyTest += "&optExpName"+optExpNum+"="+optExpName+"&optExpVar"+optExpNum+"="+optExpVar;  
                            optExpNum++;
                        }
                    } else {
                        // NO ACTIVE EXPERIMENTS
                        optimizelyTest = "";
                    }
                } else {
                    // NO OR INCORRECT OPTIMIZELY SNIPPET
                    optimizelyTest = "";
                }
    
                var additionalParams = "";
                if (typeof __feedbackParams !== "undefined") {
                    additionalParams = "&" + __feedbackParams;
                }

                try {
                    var googleAnalyticsParam = "&" + ga.getAll()[0].get('linkerParam');
                } 
                catch(err) {
                    var googleAnalyticsParam = ""
                }
    
                // IF __headerData is undefined, use utag_data instead.  If utag_data is undefined, use simplified link.
                if(typeof __headerData !== "undefined") {
                    var feedbackURL = "https://surveydirector.qualtrics.com/SD/?Q_SDID=SD_3UhijQGKDeuapz7&domain="+__headerData.site+"&lang="+__headerData.lang+"&currency="+__headerData.cur+"&url="+location+optimizelyTest+additionalParams+googleAnalyticsParam;
                    window.open(feedbackURL, '_blank');
                } else if(typeof utag_data !== "undefined") {
                    var feedbackURL = "https://surveydirector.qualtrics.com/SD/?Q_SDID=SD_3UhijQGKDeuapz7&domain="+utag_data.page_site+"&lang="+utag_data.page_language+"&url="+location+optimizelyTest+additionalParams+googleAnalyticsParam;
                    window.open(feedbackURL, '_blank');
                } else {
                    var feedbackURL = "https://surveydirector.qualtrics.com/SD/?Q_SDID=SD_3UhijQGKDeuapz7&url="+location+optimizelyTest+additionalParams+googleAnalyticsParam;
                    window.open(feedbackURL, '_blank');
                }
            }
        }
    
        //feedback and live chat float triggers
        if (document.getElementById("floater")) {
            window.addEventListener('scroll', __footerLayout.moveFeedback);
            window.onload = __footerLayout.moveFeedback();
        }
    
        if (document.querySelector('.footer #feedback')) {
            __footerLayout.feedbackButton.addEventListener('click', __footerLayout.sendFeedback);    
        }
    
        //Analytics for opening Need Help modal
        var needHelpElement = document.querySelector('.open-egain-chat-button');
        if (needHelpElement) {
            needHelpElement.addEventListener('click', function() {
                if (window.utag) {
                    window.utag.dkView({
                        ref_page_event: "Need Help",
                        page_content_group: "Resources",
                        page_content_sub_group: "Help",
                        page_title: "Need Help",
                        page_type: "RE",
                        page_sub_type: "HLP",
                        page_id: "HLP"
                    });
                }
            });
        }
    }

    function waitForElementToDisplay(selector, time) {
        if (document.querySelector(selector) != null) {
            runFooterScript();
            return;
        }
        else {
            setTimeout(function () {
                waitForElementToDisplay(selector, time);
            }, time);
        }
    }
    waitForElementToDisplay("#footer", 250);

    function selectDomain(domain) {
        try { window.localStorage.setItem('domainPromptedOn', new Date().toISOString()); } catch (_) { }
        redirectToDomain(domain);
    }
    
    function redirectToDomain(domain) {
        if (domain === 'com') {
            var dialog = document.querySelector('#domainSuggest');
            if (dialog) {
                dk.modal(dialog).hide();
            }
        } else {
            var url = document.location.href.replace('.digikey.com', '.digikey.' + domain);
            document.location.href = '/api/scTools/Footer/SetDomain?url=' + encodeURIComponent(url);
        }
    }

    var isDotCom = document.location.hostname.match(/\.digikey\.com$/);
    var shownOn = new Date(0);
    try {
        var promptedOn = window.localStorage.getItem('domainPromptedOn');
        if (promptedOn) {
            shownOn = new Date(promptedOn);
        }
    } catch (_) { }

    if (isDotCom && (new Date() - shownOn) > 30 * 3600 * 24) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/scTools/Footer/DomainPopup', true);
        xhr.onload = function () {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status === 200) {
                var container = document.createElement('div');
                container.innerHTML = xhr.responseText;
                var dialog = container.querySelector('#domainSuggest');
                if (!dialog) {
                    return;
                }

                var tidbits = container.querySelector('.domain-suggest__info');
                if (!tidbits || tidbits.innerText.trim() === '') {
                    selectDomain('com');
                    return;
                }

                window.__footerDomainSelect = selectDomain;
                document.body.appendChild(dialog);
                dialog.querySelector('.dk-modal__close').addEventListener('click', function () {
                    dk.modal(dialog).hide();
                });
                dk.modal(dialog).show();
                if (window.utag && window.utag.dkLink) {
                    utag.dkLink('ref_page_event=Choose Your Location');
                }
            } else if (xhr.status === 204) {
                selectDomain('com');
            }
        };
        xhr.send();
    }
})();
