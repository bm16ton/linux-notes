jQuery(document).ready(function($){

	var cookies = document.cookie.split(";");

	var euCookieSet = eucookielaw_data.euCookieSet;
	var expireTimer = eucookielaw_data.expireTimer;
	var scrollConsent = eucookielaw_data.scrollConsent;
	var networkShareURL = eucookielaw_data.networkShareURL;
	var isCookiePage = eucookielaw_data.isCookiePage;
	var isRefererWebsite = eucookielaw_data.isRefererWebsite;
	var deleteCookieUrl = eucookielaw_data.deleteCookieUrl;
	var autoBlock = eucookielaw_data.autoBlock;

	// Navigation Consent
	if ( autoBlock == 0 && isRefererWebsite && document.cookie.indexOf('euCookie') < 0 ) {
		euCookieConsent();
	}

	// Scroll Consent
	jQuery(window).scroll(function(){
		if ( autoBlock == 0 && scrollConsent > 0 && document.cookie.indexOf("euCookie") < 0 && !euCookieSet ) {
			if (!isCookiePage && getCookie('euCookie') != "block" ) {
				euCookieConsent();
			}
		}	
	});

	// Accept Button
	$('#pea_cook_btn, .eucookie').click(function() {
		euCookieConsent();
	});

	if ( getCookie('euCookie') == "set" || euCookieSet == 1 ) {
	  $(".pea_cook_wrapper").fadeOut("fast");
	}

	// Cookie-Control shortcode - REVOKE
	$("#eu_revoke_cookies").click(function() {
		deleteCookies();
		//createCookie( "block" );
		location.reload();
	});
	

	// Banner open / close
	$("#fom").click(function() {
		if( $('#fom').attr('href') === '#') { 
			$(".pea_cook_more_info_popover").fadeIn("slow");
			$(".pea_cook_wrapper").fadeOut("fast");
		}
	});
	
	$("#pea_close").click(function() {
		$(".pea_cook_wrapper").fadeIn("fast");
		$(".pea_cook_more_info_popover").fadeOut("slow");
	});

	// AUX Functions
	function euCookieConsent() {
		if (typeof euCookieConsentFilter === "function") {
			euCookieConsentFilter();
		}
		deleteCookies()
		createCookie();
		if (autoBlock == 1) {
			location.reload();
		}
	}
	
	function createCookie() {
		var today = new Date(), expire = new Date();
		
		if (expireTimer > 0) {
			expire.setTime(today.getTime() + (expireTimer * 24 * 60 * 60 * 1000) );
			cookiestring = "euCookie=set; "+networkShareURL+"expires=" + expire.toUTCString() + "; path=/";
		} else {
			cookiestring = "euCookie=set; "+networkShareURL+"path=/";
		}
		document.cookie = cookiestring;
		$(".pea_cook_wrapper").fadeOut("fast");
	}

	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	function deleteCookies() {
		document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
		window.location = window.location;
	}
});