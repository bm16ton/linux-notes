const _LOWER_ENV_REGEXP = /www-/;
const _CHINA_DOMAIN_REGEXP = /\.ti\.com\.cn$/;
const _CURRENCY_CHANGE = "tiCurrencyChange";
const _SAFARI_REGEXP = /^((?!chrome|android|CriOS|FxiOS|YaBrowser).)*safari/i;
const _EXT_DOMAINS = /^(www-uat-rm\..*|www-int-rm\..*)/;
const _PUB_DOMAINS = /^(www-perf\..*)/;

const NO_CONSOLELOG_ENV = document.getElementById("no_console_log_env").value;

var _NO_CONSOLE_ENV_LIST = NO_CONSOLELOG_ENV.split(",");

if(_NO_CONSOLE_ENV_LIST.includes(window.location.hostname)){
    console.log = function(){}
}

if (document.readyState !== 'loading') {
    init(0);
} else {
    document.addEventListener('DOMContentLoaded', function() { init(0); });
}

function getLLCValuesAndRedirect(targetHostname) {
    let redirectUrl = 'https://' + targetHostname + '/store/session-transfer/redirect?forwardUrl=' + encodeURIComponent(window.location.href.replace(window.location.origin, ''));
    if(!com || !com.TI || !com.TI.UserPreferences) {
      throw new Error("UserPreferences not instantiated");
    }

    com.TI.UserPreferences.getUserCurrencyPreference().then(function(currency) {
        redirectUrl += '&currency=' + currency;
        com.TI.UserPreferences.getUserShipToPreference().then(function(shipTo){
            redirectUrl += '&shipTo=' + shipTo;
            com.TI.UserPreferences.getUserLanguagePreference().then(function(language) {
                redirectUrl += '&language=' + language;
                window.location = redirectUrl;
            }).catch(function(languageError) {
                console.error("Unable to retrieve language", languageError);
                window.location = redirectUrl;
            });
        }).catch(function(shipToError) {
            console.error("Unable to retrieve shipTo", shipToError);
            window.location = redirectUrl;
        });
    }).catch(function(currencyError) {
        console.error("Unable to retrieve currency", currencyError);
        window.location = redirectUrl;
    });
}

function init(retryCount) {
    //Check if singleton's are initialized
    if(!com || !com.TI || !com.TI.UserPreferences || !com.TI.User) {
        console.warn("com.TI.UserPreferences or com.TI.User not initialized. Retry count = " + retryCount);
	if(retryCount <= 3) {
	  console.log("Retrying initilization after 1 second delay");
	  setTimeout(function() { init(retryCount+1); }, 1000);
	} else {
	  console.error("Exceeded retry attempts. Aborting domain enforcement.");
	}
        return;
    }

    if(window.location.hostname !== 'localhost') {
        //Check if login check has completed before attempting re-route (important for initial login so login component can store it's login state)
        com.TI.User.getLoginStatus('store-session-enforcement.js').then(function(loggedIn) {
            //Get User Currency Preference (which should return after session transfer is complete) and check domain
            com.TI.UserPreferences.getUserCurrencyPreference()
            .then(function(currency) {
                //Enforce domain - triggering reload if currency after session transfer mismatches the currency used to load the page on the server
                enforceStoreDomain(currency, !loadedCurrencyMatches(currency));
            })
            .catch(function(error) {
                console.error("Failed to retrieve user currency preference", error);
            });
        });

        //Enforce domain on currency changes
        window.addEventListener(_CURRENCY_CHANGE, function(event) {
            enforceStoreDomain(event.detail, true);
        });
    } else {
        console.log("Skipping session enforcement on localhost");
    }
}

function enforceStoreDomain(currency, reload) {
    let targetHostname;

    //Redirect if the currency & domain combination does not match our desired state
    if(!_CHINA_DOMAIN_REGEXP.test(window.location.hostname) && currency === 'CNY') {
        targetHostname = getCnDomain();
    } else if(_CHINA_DOMAIN_REGEXP.test(window.location.hostname) && currency !== 'CNY') {
        targetHostname = getTicomDomain();
    }

    if(targetHostname) {
        if(_SAFARI_REGEXP.test(navigator.userAgent)) {
            //If safari, we can't use UserPreference pushSession which uses XHR - so use a redirect instead
            getLLCValuesAndRedirect(targetHostname);
        } else {
            com.TI.UserPreferences.pushSession(targetHostname)
            .then(function(sessionCookies) {
                console.log("Pushed session ", sessionCookies);
            }).catch(function(error) {
                console.log("Unable to push session to new domain prior to redirect", error);
            }).finally(function() {
                //Tell all the other domains
                com.TI.UserPreferences.updateLastDomain(targetHostname)
                .then(function(){
                    console.log("Pushed target host to other domains.hostname:", targetHostname);
                }).catch(function(){
                    console.log("Unable to push targethost to other domains:", targetHostname);
                }).finally(function() {
                    window.location.hostname = targetHostname;
                });
                
            });
        }
    } else {
        console.log("Already on the correct domain and reload = " + reload);
        if(reload) {
            window.location.reload();
        }
    }

}

function loadedCurrencyMatches(currency) {
    const loadedCurrencyElement = document.getElementById("loaded_currency");
    const loadedCurrency = loadedCurrencyElement ? loadedCurrencyElement.value : "";
    return currency === loadedCurrency;
}

function getCnDomain() {
    return window.location.hostname.replace('ti.com', 'ti.com.cn').replace(/(\.itg|\.ext)/, '').replace('-cn', '');
}

function getTicomDomain() {
    if(_LOWER_ENV_REGEXP.test(window.location.hostname)) {
        if(_EXT_DOMAINS.test(window.location.hostname)) {
            return window.location.hostname.replace('ti.com.cn', 'ext.ti.com').replace('-cn', '');
        } else if(_PUB_DOMAINS.test(window.location.hostname)) {
            return window.location.hostname.replace('ti.com.cn', 'ti.com').replace('-cn','');
        } else {
            return window.location.hostname.replace('ti.com.cn', 'itg.ti.com').replace('-cn', '');
        }
    } else {
        return window.location.hostname.replace('ti.com.cn', 'ti.com');
    }
}