/* exported global_var */
var createCookieLS = function() { // eslint-disable-line no-unused-vars
    try {
        window.localStorage.setItem("gdpr_cookie_consent", JSON.stringify({ "acceptedOn": new Date() }));
        document.getElementsByClassName("cookie-notice")[0].style.display = "none";
        document.getElementsByClassName("cookie-mask")[0].style.display = "none";
        //document.getElementsByTagName("body")[0].style.marginTop = "0";
        //document.getElementsByTagName("body")[0].style.backgroundPosition = "0px 0px";
        document.body.className = document.body.className.replace("gdpr","");
    }
    catch (error) {}
}

if (window.__gdprtext) {
    try {
        if (window.localStorage.getItem("gdpr_cookie_consent") == null) {
            document.body.insertAdjacentHTML("beforeend", window.__gdprtext);
            document.body.className +=  " gdpr";
          }
    }
    catch (error) {
        document.body.insertAdjacentHTML("beforeend", window.__gdprtext);
        document.body.className +=  " gdpr";
    }
}