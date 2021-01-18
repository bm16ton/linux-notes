
var scriptTag = document.currentScript;
// IE doesnt support document.currentScript, use getElementById instead
if (!scriptTag) {
    scriptTag = document.getElementById("sa-url-script")
}

if (scriptTag) {
    var pixelUrl = scriptTag.getAttribute("purl")
    var auctionID = scriptTag.getAttribute("aid");
    var impId = scriptTag.getAttribute("iid");
    var brDomain = scriptTag.getAttribute("br_domain");
    var brIp = scriptTag.getAttribute("br_ip");
    var network = scriptTag.getAttribute("network");
    var brPageUrl = scriptTag.getAttribute("br_page_url");

    window.onload = function () {
        var url = pixelUrl + "/track_user_page?" +
            "aid=" + auctionID +
            "&iid=" + impId +
            "&br_domain=" + brDomain +
            "&br_ip=" + brIp +
            "&window_location_href=" + encodeURIComponent(window.location.href) +
            "&top_location_href=" + encodeURIComponent(window.top.location.href) +
            "&is_iframe=" + (window !== top) +
            "&network=" + network +
            "&br_page_url=" + brPageUrl;

        var img = new Image();
        function remove() {
            document.body.removeChild(img);
        }
        img.onerror = remove;
        img.onload = remove;
        img.src = url;
        document.body.appendChild(img);
    }
}