/* Detect-zoom
 * -----------
 * Cross Browser Zoom and Pixel Ratio Detector
 * Version 1.0.4 | Apr 1 2013
 * dual-licensed under the WTFPL and MIT license
 * Maintained by https://github/tombigel
 * Original developer https://github.com/yonran
 */

//AMD and CommonJS initialization copied from https://github.com/zohararad/audio5js
(function (root, ns, factory) {
    "use strict";

    if (typeof (module) !== 'undefined' && module.exports) { // CommonJS
        module.exports = factory(ns, root);
    } else if (typeof (define) === 'function' && define.amd) { // AMD
        define("factory", function () {
            return factory(ns, root);
        });
    } else {
        root[ns] = factory(ns, root);
    }

}(window, 'detectZoom', function () {

    /**
     * Use devicePixelRatio if supported by the browser
     * @return {Number}
     * @private
     */
    var devicePixelRatio = function () {
        return window.devicePixelRatio || 1;
    };

    /**
     * Fallback function to set default values
     * @return {Object}
     * @private
     */
    var fallback = function () {
        return {
            zoom: 1,
            devicePxPerCssPx: 1
        };
    };
    /**
     * IE 8 and 9: no trick needed!
     * TODO: Test on IE10 and Windows 8 RT
     * @return {Object}
     * @private
     **/
    var ie8 = function () {
        var zoom = Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * For IE10 we need to change our technique again...
     * thanks https://github.com/stefanvanburen
     * @return {Object}
     * @private
     */
    var ie10 = function () {
        var zoom = Math.round((document.documentElement.offsetHeight / window.innerHeight) * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Mobile WebKit
     * the trick: window.innerWIdth is in CSS pixels, while
     * screen.width and screen.height are in system pixels.
     * And there are no scrollbars to mess up the measurement.
     * @return {Object}
     * @private
     */
    var webkitMobile = function () {
        var deviceWidth = (Math.abs(window.orientation) == 90) ? screen.height : screen.width;
        var zoom = deviceWidth / window.innerWidth;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Desktop Webkit
     * the trick: an element's clientHeight is in CSS pixels, while you can
     * set its line-height in system pixels using font-size and
     * -webkit-text-size-adjust:none.
     * device-pixel-ratio: http://www.webkit.org/blog/55/high-dpi-web-sites/
     *
     * Previous trick (used before http://trac.webkit.org/changeset/100847):
     * documentElement.scrollWidth is in CSS pixels, while
     * document.width was in system pixels. Note that this is the
     * layout width of the document, which is slightly different from viewport
     * because document width does not include scrollbars and might be wider
     * due to big elements.
     * @return {Object}
     * @private
     */
    var webkit = function () {
        var important = function (str) {
            return str.replace(/;/g, " !important;");
        };

        var div = document.createElement('div');
        div.innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0";
        div.setAttribute('style', important('font: 100px/1em sans-serif; -webkit-text-size-adjust: none; text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;'));

        // The container exists so that the div will be laid out in its own flow
        // while not impacting the layout, viewport size, or display of the
        // webpage as a whole.
        // Add !important and relevant CSS rule resets
        // so that other rules cannot affect the results.
        var container = document.createElement('div');
        container.setAttribute('style', important('width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;'));
        container.appendChild(div);

        document.body.appendChild(container);
        var zoom = 1000 / div.clientHeight;
        zoom = Math.round(zoom * 100) / 100;
        document.body.removeChild(container);

        return{
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * no real trick; device-pixel-ratio is the ratio of device dpi / css dpi.
     * (Note that this is a different interpretation than Webkit's device
     * pixel ratio, which is the ratio device dpi / system dpi).
     *
     * Also, for Mozilla, there is no difference between the zoom factor and the device ratio.
     *
     * @return {Object}
     * @private
     */
    var firefox4 = function () {
        var zoom = mediaQueryBinarySearch('min--moz-device-pixel-ratio', '', 0, 10, 20, 0.0001);
        zoom = Math.round(zoom * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom
        };
    };

    /**
     * Firefox 18.x
     * Mozilla added support for devicePixelRatio to Firefox 18,
     * but it is affected by the zoom level, so, like in older
     * Firefox we can't tell if we are in zoom mode or in a device
     * with a different pixel ratio
     * @return {Object}
     * @private
     */
    var firefox18 = function () {
        return {
            zoom: firefox4().zoom,
            devicePxPerCssPx: devicePixelRatio()
        };
    };

    /**
     * works starting Opera 11.11
     * the trick: outerWidth is the viewport width including scrollbars in
     * system px, while innerWidth is the viewport width including scrollbars
     * in CSS px
     * @return {Object}
     * @private
     */
    var opera11 = function () {
        var zoom = window.top.outerWidth / window.top.innerWidth;
        zoom = Math.round(zoom * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Use a binary search through media queries to find zoom level in Firefox
     * @param property
     * @param unit
     * @param a
     * @param b
     * @param maxIter
     * @param epsilon
     * @return {Number}
     */
    var mediaQueryBinarySearch = function (property, unit, a, b, maxIter, epsilon) {
        var matchMedia;
        var head, style, div;
        if (window.matchMedia) {
            matchMedia = window.matchMedia;
        } else {
            head = document.getElementsByTagName('head')[0];
            style = document.createElement('style');
            head.appendChild(style);

            div = document.createElement('div');
            div.className = 'mediaQueryBinarySearch';
            div.style.display = 'none';
            document.body.appendChild(div);

            matchMedia = function (query) {
                style.sheet.insertRule('@media ' + query + '{.mediaQueryBinarySearch ' + '{text-decoration: underline} }', 0);
                var matched = getComputedStyle(div, null).textDecoration == 'underline';
                style.sheet.deleteRule(0);
                return {matches: matched};
            };
        }
        var ratio = binarySearch(a, b, maxIter);
        if (div) {
            head.removeChild(style);
            document.body.removeChild(div);
        }
        return ratio;

        function binarySearch(a, b, maxIter) {
            var mid = (a + b) / 2;
            if (maxIter <= 0 || b - a < epsilon) {
                return mid;
            }
            var query = "(" + property + ":" + mid + unit + ")";
            if (matchMedia(query).matches) {
                return binarySearch(mid, b, maxIter - 1);
            } else {
                return binarySearch(a, mid, maxIter - 1);
            }
        }
    };

    /**
     * Generate detection function
     * @private
     */
    var detectFunction = (function () {
        var func = fallback;
        //IE8+
        if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) {
            func = ie8;
        }
        // IE10+ / Touch
        else if (window.navigator.msMaxTouchPoints) {
            func = ie10;
        }
        //Mobile Webkit
        else if ('orientation' in window && typeof document.body.style.webkitMarquee === 'string') {
            func = webkitMobile;
        }
        //WebKit
        else if (typeof document.body.style.webkitMarquee === 'string') {
            func = webkit;
        }
        //Opera
        else if (navigator.userAgent.indexOf('Opera') >= 0) {
            func = opera11;
        }
        //Last one is Firefox
        //FF 18.x
        else if (window.devicePixelRatio) {
            func = firefox18;
        }
        //FF 4.0 - 17.x
        else if (firefox4().zoom > 0.001) {
            func = firefox4;
        }

        return func;
    }());


    return ({

        /**
         * Ratios.zoom shorthand
         * @return {Number} Zoom level
         */
        zoom: function () {
            return detectFunction().zoom;
        },

        /**
         * Ratios.devicePxPerCssPx shorthand
         * @return {Number} devicePxPerCssPx level
         */
        device: function () {
            return detectFunction().devicePxPerCssPx;
        }
    });
}));

var wpcom_img_zoomer = {
        clientHintSupport: {
                gravatar: false,
                files: false,
                photon: false,
                mshots: false,
                staticAssets: false,
                latex: false,
                imgpress: false,
        },
	useHints: false,
	zoomed: false,
	timer: null,
	interval: 1000, // zoom polling interval in millisecond

	// Should we apply width/height attributes to control the image size?
	imgNeedsSizeAtts: function( img ) {
		// Do not overwrite existing width/height attributes.
		if ( img.getAttribute('width') !== null || img.getAttribute('height') !== null )
			return false;
		// Do not apply the attributes if the image is already constrained by a parent element.
		if ( img.width < img.naturalWidth || img.height < img.naturalHeight )
			return false;
		return true;
	},

        hintsFor: function( service ) {
                if ( this.useHints === false ) {
                        return false;
                }
                if ( this.hints() === false ) {
                        return false;
                }
                if ( typeof this.clientHintSupport[service] === "undefined" ) {
                        return false;
                }
                if ( this.clientHintSupport[service] === true ) {
                        return true;
                }
                return false;
        },

	hints: function() {
		try {
			var chrome = window.navigator.userAgent.match(/\sChrome\/([0-9]+)\.[.0-9]+\s/)
			if (chrome !== null) {
				var version = parseInt(chrome[1], 10)
				if (isNaN(version) === false && version >= 46) {
					return true
				}
			}
		} catch (e) {
			return false
		}
		return false
	},

	init: function() {
		var t = this;
		try{
			t.zoomImages();
			t.timer = setInterval( function() { t.zoomImages(); }, t.interval );
		}
		catch(e){
		}
	},

	stop: function() {
		if ( this.timer )
			clearInterval( this.timer );
	},

	getScale: function() {
		var scale = detectZoom.device();
		// Round up to 1.5 or the next integer below the cap.
		if      ( scale <= 1.0 ) scale = 1.0;
		else if ( scale <= 1.5 ) scale = 1.5;
		else if ( scale <= 2.0 ) scale = 2.0;
		else if ( scale <= 3.0 ) scale = 3.0;
		else if ( scale <= 4.0 ) scale = 4.0;
		else                     scale = 5.0;
		return scale;
	},

	shouldZoom: function( scale ) {
		var t = this;
		// Do not operate on hidden frames.
		if ( "innerWidth" in window && !window.innerWidth )
			return false;
		// Don't do anything until scale > 1
		if ( scale == 1.0 && t.zoomed == false )
			return false;
		return true;
	},

	zoomImages: function() {
		var t = this;
		var scale = t.getScale();
		if ( ! t.shouldZoom( scale ) ){
			return;
		}
		t.zoomed = true;
		// Loop through all the <img> elements on the page.
		var imgs = document.getElementsByTagName("img");

		for ( var i = 0; i < imgs.length; i++ ) {
			// Wait for original images to load
			if ( "complete" in imgs[i] && ! imgs[i].complete )
				continue;

			// Skip images that have srcset attributes.
			if ( imgs[i].hasAttribute('srcset') ) {
				continue;
			}

			// Skip images that don't need processing.
			var imgScale = imgs[i].getAttribute("scale");
			if ( imgScale == scale || imgScale == "0" )
				continue;

			// Skip images that have already failed at this scale
			var scaleFail = imgs[i].getAttribute("scale-fail");
			if ( scaleFail && scaleFail <= scale )
				continue;

			// Skip images that have no dimensions yet.
			if ( ! ( imgs[i].width && imgs[i].height ) )
				continue;

			// Skip images from Lazy Load plugins
			if ( ! imgScale && imgs[i].getAttribute("data-lazy-src") && (imgs[i].getAttribute("data-lazy-src") !== imgs[i].getAttribute("src")))
				continue;

			if ( t.scaleImage( imgs[i], scale ) ) {
				// Mark the img as having been processed at this scale.
				imgs[i].setAttribute("scale", scale);
			}
			else {
				// Set the flag to skip this image.
				imgs[i].setAttribute("scale", "0");
			}
		}
	},

	scaleImage: function( img, scale ) {
		var t = this;
		var newSrc = img.src;

                var isFiles = false;
                var isLatex = false;
                var isPhoton = false;

		// Skip slideshow images
		if ( img.parentNode.className.match(/slideshow-slide/) )
			return false;

		// Skip CoBlocks Lightbox images
		if ( img.parentNode.className.match(/coblocks-lightbox__image/) )
			return false;

		// Scale gravatars that have ?s= or ?size=
		if ( img.src.match( /^https?:\/\/([^\/]*\.)?gravatar\.com\/.+[?&](s|size)=/ ) ) {
                        if ( this.hintsFor( "gravatar" ) === true ) {
                                return false;
                        }
			newSrc = img.src.replace( /([?&](s|size)=)(\d+)/, function( $0, $1, $2, $3 ) {
				// Stash the original size
				var originalAtt = "originals",
				originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $3;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width/height of the image in CSS pixels
				var size = img.clientWidth;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(img.clientWidth * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go larger than the service supports
				targetSize = Math.min( targetSize, 512 );
				return $1 + targetSize;
			});
		}

		// Scale mshots that have width
		else if ( img.src.match(/^https?:\/\/([^\/]+\.)*(wordpress|wp)\.com\/mshots\/.+[?&]w=\d+/) ) {
                        if ( this.hintsFor( "mshots" ) === true ) {
                                return false;
                        }
			newSrc = img.src.replace( /([?&]w=)(\d+)/, function($0, $1, $2) {
				// Stash the original size
				var originalAtt = 'originalw', originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $2;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width of the image in CSS pixels
				var size = img.clientWidth;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(size * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go bigger unless the current one is actually lacking
				if ( scale > img.getAttribute("scale") && targetSize <= img.naturalWidth )
					targetSize = $2;
				if ( $2 != targetSize )
					return $1 + targetSize;
				return $0;
			});

			// Update height attribute to match width
			newSrc = newSrc.replace( /([?&]h=)(\d+)/, function($0, $1, $2) {
				if ( newSrc == img.src ) {
					return $0;
				}
				// Stash the original size
				var originalAtt = 'originalh', originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $2;
					img.setAttribute(originalAtt, originalSize);
				}
				// Get the height of the image in CSS pixels
				var size = img.clientHeight;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(size * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go bigger unless the current one is actually lacking
				if ( scale > img.getAttribute("scale") && targetSize <= img.naturalHeight )
					targetSize = $2;
				if ( $2 != targetSize )
					return $1 + targetSize;
				return $0;
			});
		}

		// Scale simple imgpress queries (s0.wp.com) that only specify w/h/fit
		else if ( img.src.match(/^https?:\/\/([^\/.]+\.)*(wp|wordpress)\.com\/imgpress\?(.+)/) ) {
                        if ( this.hintsFor( "imgpress" ) === true ) {
                                return false; 
                        }
			var imgpressSafeFunctions = ["zoom", "url", "h", "w", "fit", "filter", "brightness", "contrast", "colorize", "smooth", "unsharpmask"];
			// Search the query string for unsupported functions.
			var qs = RegExp.$3.split('&');
			for ( var q in qs ) {
				q = qs[q].split('=')[0];
				if ( imgpressSafeFunctions.indexOf(q) == -1 ) {
					return false;
				}
			}
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			// Compute new src
			if ( scale == 1 )
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?');
			else
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?zoom=' + scale + '&');
		}

		// Scale files.wordpress.com, LaTeX, or Photon images (i#.wp.com)
		else if (
			( isFiles = img.src.match(/^https?:\/\/([^\/]+)\.files\.wordpress\.com\/.+[?&][wh]=/) ) ||
			( isLatex = img.src.match(/^https?:\/\/([^\/.]+\.)*(wp|wordpress)\.com\/latex\.php\?(latex|zoom)=(.+)/) ) ||
			( isPhoton = img.src.match(/^https?:\/\/i[\d]{1}\.wp\.com\/(.+)/) )
		) {
                        if ( false !== isFiles && this.hintsFor( "files" ) === true ) {
                                return false
                        }
                        if ( false !== isLatex && this.hintsFor( "latex" ) === true ) {
                                return false
                        }
                        if ( false !== isPhoton && this.hintsFor( "photon" ) === true ) {
                                return false
                        }
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			// Compute new src
			if ( scale == 1 ) {
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?');
			} else {
				newSrc = img.src;

				var url_var = newSrc.match( /([?&]w=)(\d+)/ );
				if ( url_var !== null && url_var[2] ) {
					newSrc = newSrc.replace( url_var[0], url_var[1] + img.width );
				}

				url_var = newSrc.match( /([?&]h=)(\d+)/ );
				if ( url_var !== null && url_var[2] ) {
					newSrc = newSrc.replace( url_var[0], url_var[1] + img.height );
				}

				var zoom_arg = '&zoom=2';
				if ( !newSrc.match( /\?/ ) ) {
					zoom_arg = '?zoom=2';
				}
				img.setAttribute( 'srcset', newSrc + zoom_arg + ' ' + scale + 'x' );
			}
		}

		// Scale static assets that have a name matching *-1x.png or *@1x.png
		else if ( img.src.match(/^https?:\/\/[^\/]+\/.*[-@]([12])x\.(gif|jpeg|jpg|png)(\?|$)/) ) {
                        if ( this.hintsFor( "staticAssets" ) === true ) {
                                return false; 
                        }
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			var currentSize = RegExp.$1, newSize = currentSize;
			if ( scale <= 1 )
				newSize = 1;
			else
				newSize = 2;
			if ( currentSize != newSize )
				newSrc = img.src.replace(/([-@])[12]x\.(gif|jpeg|jpg|png)(\?|$)/, '$1'+newSize+'x.$2$3');
		}

		else {
			return false;
		}

		// Don't set img.src unless it has changed. This avoids unnecessary reloads.
		if ( newSrc != img.src ) {
			// Store the original img.src
			var prevSrc, origSrc = img.getAttribute("src-orig");
			if ( !origSrc ) {
				origSrc = img.src;
				img.setAttribute("src-orig", origSrc);
			}
			// In case of error, revert img.src
			prevSrc = img.src;
			img.onerror = function(){
				img.src = prevSrc;
				if ( img.getAttribute("scale-fail") < scale )
					img.setAttribute("scale-fail", scale);
				img.onerror = null;
			};
			// Finally load the new image
			img.src = newSrc;
		}

		return true;
	}
};

wpcom_img_zoomer.init();
;
/*! This file is auto-generated */
window.addComment=function(v){var I,C,h,E=v.document,b={commentReplyClass:"comment-reply-link",commentReplyTitleId:"reply-title",cancelReplyId:"cancel-comment-reply-link",commentFormId:"commentform",temporaryFormId:"wp-temp-form-div",parentIdFieldId:"comment_parent",postIdFieldId:"comment_post_ID"},e=v.MutationObserver||v.WebKitMutationObserver||v.MozMutationObserver,r="querySelector"in E&&"addEventListener"in v,n=!!E.documentElement.dataset;function t(){d(),e&&new e(o).observe(E.body,{childList:!0,subtree:!0})}function d(e){if(r&&(I=g(b.cancelReplyId),C=g(b.commentFormId),I)){I.addEventListener("touchstart",l),I.addEventListener("click",l);var t=function(e){if((e.metaKey||e.ctrlKey)&&13===e.keyCode)return C.removeEventListener("keydown",t),e.preventDefault(),C.submit.click(),!1};C&&C.addEventListener("keydown",t);for(var n,d=function(e){var t=b.commentReplyClass;e&&e.childNodes||(e=E);t=E.getElementsByClassName?e.getElementsByClassName(t):e.querySelectorAll("."+t);return t}(e),o=0,i=d.length;o<i;o++)(n=d[o]).addEventListener("touchstart",a),n.addEventListener("click",a)}}function l(e){var t,n,d=g(b.temporaryFormId);d&&h&&(g(b.parentIdFieldId).value="0",t=d.textContent,d.parentNode.replaceChild(h,d),this.style.display="none",n=(d=(n=g(b.commentReplyTitleId))&&n.firstChild)&&d.nextSibling,d&&d.nodeType===Node.TEXT_NODE&&t&&(n&&"A"===n.nodeName&&n.id!==b.cancelReplyId&&(n.style.display=""),d.textContent=t),e.preventDefault())}function a(e){var t=g(b.commentReplyTitleId),n=t&&t.firstChild.textContent,d=this,o=m(d,"belowelement"),i=m(d,"commentid"),r=m(d,"respondelement"),t=m(d,"postid"),n=m(d,"replyto")||n;o&&i&&r&&t&&!1===v.addComment.moveForm(o,i,r,t,n)&&e.preventDefault()}function o(e){for(var t=e.length;t--;)if(e[t].addedNodes.length)return void d()}function m(e,t){return n?e.dataset[t]:e.getAttribute("data-"+t)}function g(e){return E.getElementById(e)}return r&&"loading"!==E.readyState?t():r&&v.addEventListener("DOMContentLoaded",t,!1),{init:d,moveForm:function(e,t,n,d,o){var i=g(e);h=g(n);var r,l,a,m,c,s=g(b.parentIdFieldId),y=g(b.postIdFieldId),p=(c=g(b.commentReplyTitleId))&&c.firstChild,u=p&&p.nextSibling;if(i&&h&&s){void 0===o&&(o=p&&p.textContent),m=h,e=b.temporaryFormId,n=g(e),c=(c=g(b.commentReplyTitleId))?c.firstChild.textContent:"",n||((n=E.createElement("div")).id=e,n.style.display="none",n.textContent=c,m.parentNode.insertBefore(n,m)),d&&y&&(y.value=d),s.value=t,I.style.display="",i.parentNode.insertBefore(h,i.nextSibling),p&&p.nodeType===Node.TEXT_NODE&&(u&&"A"===u.nodeName&&u.id!==b.cancelReplyId&&(u.style.display="none"),p.textContent=o),I.onclick=function(){return!1};try{for(var f=0;f<C.elements.length;f++)if(r=C.elements[f],l=!1,"getComputedStyle"in v?a=v.getComputedStyle(r):E.documentElement.currentStyle&&(a=r.currentStyle),(r.offsetWidth<=0&&r.offsetHeight<=0||"hidden"===a.visibility)&&(l=!0),"hidden"!==r.type&&!r.disabled&&!l){r.focus();break}}catch(e){}return!1}}}}(window);;
( function( $ ) {
	var cookieValue = document.cookie.replace( /(?:(?:^|.*;\s*)eucookielaw\s*\=\s*([^;]*).*$)|^.*$/, '$1' ),
		overlay = $( '#eu-cookie-law' ),
		container = $( '.widget_eu_cookie_law_widget' ),
		initialScrollPosition,
		scrollFunction;

	if ( overlay.hasClass( 'ads-active' ) ) {
		var adsCookieValue = document.cookie.replace( /(?:(?:^|.*;\s*)personalized-ads-consent\s*\=\s*([^;]*).*$)|^.*$/, '$1' );
		if ( '' !== cookieValue && '' !== adsCookieValue ) {
			overlay.remove();
		}
	} else if ( '' !== cookieValue ) {
		overlay.remove();
	}

	$( '.widget_eu_cookie_law_widget' ).appendTo( 'body' ).fadeIn();

	overlay.find( 'form' ).on( 'submit', accept );

	if ( overlay.hasClass( 'hide-on-scroll' ) ) {
		initialScrollPosition = $( window ).scrollTop();
		scrollFunction = function() {
			if ( Math.abs( $( window ).scrollTop() - initialScrollPosition ) > 50 ) {
				accept();
			}
		};
		$( window ).on( 'scroll', scrollFunction );
	} else if ( overlay.hasClass( 'hide-on-time' ) ) {
		setTimeout( accept, overlay.data( 'hide-timeout' ) * 1000 );
	}

	var accepted = false;
	function accept( event ) {
		if ( accepted ) {
			return;
		}
		accepted = true;

		if ( event && event.preventDefault ) {
			event.preventDefault();
		}

		if ( overlay.hasClass( 'hide-on-scroll' ) ) {
			$( window ).off( 'scroll', scrollFunction );
		}

		var expireTime = new Date();
		expireTime.setTime( expireTime.getTime() + ( overlay.data( 'consent-expiration' ) * 24 * 60 * 60 * 1000 ) );

		document.cookie = 'eucookielaw=' + expireTime.getTime() + ';path=/;expires=' + expireTime.toGMTString();
		if ( overlay.hasClass( 'ads-active' ) && overlay.hasClass( 'hide-on-button' ) ) {
			document.cookie = 'personalized-ads-consent=' + expireTime.getTime() + ';path=/;expires=' + expireTime.toGMTString();
		}

		overlay.fadeOut( 400, function() {
			overlay.remove();
			container.remove();
		} );
	}
} )( jQuery );
;
/* globals JSON */
( function () {
	var eventName = 'wpcom_masterbar_click';

	var linksTracksEvents = {
		// top level items
		'wp-admin-bar-blog'                        : 'my_sites',
		'wp-admin-bar-newdash'                     : 'reader',
		'wp-admin-bar-ab-new-post'                 : 'write_button',
		'wp-admin-bar-my-account'                  : 'my_account',
		'wp-admin-bar-notes'                       : 'notifications',
		// my sites - top items
		'wp-admin-bar-switch-site'                 : 'my_sites_switch_site',
		'wp-admin-bar-blog-info'                   : 'my_sites_site_info',
		'wp-admin-bar-site-view'                   : 'my_sites_view_site',
		'wp-admin-bar-blog-stats'                  : 'my_sites_site_stats',
		'wp-admin-bar-plan'                        : 'my_sites_plan',
		'wp-admin-bar-plan-badge'                  : 'my_sites_plan_badge',
		// my sites - manage
		'wp-admin-bar-edit-page'                   : 'my_sites_manage_site_pages',
		'wp-admin-bar-new-page-badge'              : 'my_sites_manage_add_page',
		'wp-admin-bar-edit-post'                   : 'my_sites_manage_blog_posts',
		'wp-admin-bar-new-post-badge'              : 'my_sites_manage_add_post',
		'wp-admin-bar-edit-attachment'             : 'my_sites_manage_media',
		'wp-admin-bar-new-attachment-badge'        : 'my_sites_manage_add_media',
		'wp-admin-bar-comments'                    : 'my_sites_manage_comments',
		'wp-admin-bar-edit-jetpack-testimonial'    : 'my_sites_manage_testimonials',
		'wp-admin-bar-new-jetpack-testimonial'     : 'my_sites_manage_add_testimonial',
		'wp-admin-bar-edit-jetpack-portfolio'      : 'my_sites_manage_portfolio',
		'wp-admin-bar-new-jetpack-portfolio'       : 'my_sites_manage_add_portfolio',
		// my sites - personalize
		'wp-admin-bar-themes'                      : 'my_sites_personalize_themes',
		'wp-admin-bar-cmz'                         : 'my_sites_personalize_themes_customize',
		// my sites - configure
		'wp-admin-bar-sharing'                     : 'my_sites_configure_sharing',
		'wp-admin-bar-people'                      : 'my_sites_configure_people',
		'wp-admin-bar-people-add'                  : 'my_sites_configure_people_add_button',
		'wp-admin-bar-plugins'                     : 'my_sites_configure_plugins',
		'wp-admin-bar-domains'                     : 'my_sites_configure_domains',
		'wp-admin-bar-domains-add'                 : 'my_sites_configure_add_domain',
		'wp-admin-bar-blog-settings'               : 'my_sites_configure_settings',
		'wp-admin-bar-legacy-dashboard'            : 'my_sites_configure_wp_admin',
		// reader
		'wp-admin-bar-followed-sites'              : 'reader_followed_sites',
		'wp-admin-bar-reader-followed-sites-manage': 'reader_manage_followed_sites',
		'wp-admin-bar-discover-discover'           : 'reader_discover',
		'wp-admin-bar-discover-search'             : 'reader_search',
		'wp-admin-bar-my-activity-my-likes'        : 'reader_my_likes',
		// account
		'wp-admin-bar-user-info'                   : 'my_account_user_name',
		// account - profile
		'wp-admin-bar-my-profile'                  : 'my_account_profile_my_profile',
		'wp-admin-bar-account-settings'            : 'my_account_profile_account_settings',
		'wp-admin-bar-billing'                     : 'my_account_profile_manage_purchases',
		'wp-admin-bar-security'                    : 'my_account_profile_security',
		'wp-admin-bar-notifications'               : 'my_account_profile_notifications',
		// account - special
		'wp-admin-bar-get-apps'                    : 'my_account_special_get_apps',
		'wp-admin-bar-next-steps'                  : 'my_account_special_next_steps',
		'wp-admin-bar-help'                        : 'my_account_special_help',
	};

	var notesTracksEvents = {
		openSite: function ( data ) {
			return {
				clicked: 'masterbar_notifications_panel_site',
				site_id: data.siteId
			};
		},
		openPost: function ( data ) {
			return {
				clicked: 'masterbar_notifications_panel_post',
				site_id: data.siteId,
				post_id: data.postId
			};
		},
		openComment: function ( data ) {
			return {
				clicked: 'masterbar_notifications_panel_comment',
				site_id: data.siteId,
				post_id: data.postId,
				comment_id: data.commentId
			};
		}
	};

	// Element.prototype.matches as a standalone function, with old browser fallback
	function matches( node, selector ) {
		if ( ! node ) {
			return undefined;
		}

		if ( ! Element.prototype.matches && ! Element.prototype.msMatchesSelector ) {
			throw new Error( 'Unsupported browser' );
		}

		return Element.prototype.matches ? node.matches( selector ) : node.msMatchesSelector( selector );
	}

	// Element.prototype.closest as a standalone function, with old browser fallback
	function closest( node, selector ) {
		if ( ! node ) {
			return undefined;
		}

		if ( Element.prototype.closest ) {
			return node.closest( selector );
		}

		do {
			if ( matches( node, selector ) ) {
				return node;
			}

			node = node.parentElement || node.parentNode;
		} while ( node !== null && node.nodeType === 1 );

		return null;
	}

	function recordTracksEvent( eventProps ) {
		eventProps = eventProps || {};
		window._tkq = window._tkq || [];
		window._tkq.push( [ 'recordEvent', eventName, eventProps ] );
	}

	function parseJson( s, defaultValue ) {
		try {
			return JSON.parse( s );
		} catch ( e ) {
			return defaultValue;
		}
	}

	function createTrackableLinkEventHandler( link ) {
		return function () {
			var parent = closest( link, 'li' );

			if ( ! parent ) {
				return;
			}

			var trackingId = link.getAttribute( 'ID' ) || parent.getAttribute( 'ID' );

			if ( ! linksTracksEvents.hasOwnProperty( trackingId ) ) {
				return;
			}

			var eventProps = { 'clicked': linksTracksEvents[ trackingId ] };
			recordTracksEvent( eventProps );
		}
	}

	function init() {
		var trackableLinkSelector = '.mb-trackable .ab-item:not(div),' +
			'#wp-admin-bar-notes .ab-item,' +
			'#wp-admin-bar-user-info .ab-item,' +
			'.mb-trackable .ab-secondary';

		var trackableLinks = document.querySelectorAll( trackableLinkSelector );

		for ( var i = 0; i < trackableLinks.length; i++ ) {
			var link = trackableLinks[ i ];
			var handler = createTrackableLinkEventHandler( link );

			link.addEventListener( 'click', handler );
			link.addEventListener( 'touchstart', handler );
		}
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}

	// listen for postMessage events from the notifications iframe
	window.addEventListener( 'message', function ( event ) {
		if ( event.origin !== 'https://widgets.wp.com' ) {
			return;
		}

		var data = ( typeof event.data === 'string' ) ? parseJson( event.data, {} ) : event.data;
		if ( data.type !== 'notesIframeMessage' ) {
			return;
		}

		var eventData = notesTracksEvents[ data.action ];
		if ( ! eventData ) {
			return;
		}

		recordTracksEvent( eventData( data ) );
	}, false );

} )();
;
/*! This file is auto-generated */
!function(c,d){"use strict";var e=!1,n=!1;if(d.querySelector)if(c.addEventListener)e=!0;if(c.wp=c.wp||{},!c.wp.receiveEmbedMessage)if(c.wp.receiveEmbedMessage=function(e){var t=e.data;if(t)if(t.secret||t.message||t.value)if(!/[^a-zA-Z0-9]/.test(t.secret)){for(var r,a,i,s=d.querySelectorAll('iframe[data-secret="'+t.secret+'"]'),n=d.querySelectorAll('blockquote[data-secret="'+t.secret+'"]'),o=0;o<n.length;o++)n[o].style.display="none";for(o=0;o<s.length;o++)if(r=s[o],e.source===r.contentWindow){if(r.removeAttribute("style"),"height"===t.message){if(1e3<(i=parseInt(t.value,10)))i=1e3;else if(~~i<200)i=200;r.height=i}if("link"===t.message)if(a=d.createElement("a"),i=d.createElement("a"),a.href=r.getAttribute("src"),i.href=t.value,i.host===a.host)if(d.activeElement===r)c.top.location.href=t.value}}},e)c.addEventListener("message",c.wp.receiveEmbedMessage,!1),d.addEventListener("DOMContentLoaded",t,!1),c.addEventListener("load",t,!1);function t(){if(!n){n=!0;for(var e,t,r=-1!==navigator.appVersion.indexOf("MSIE 10"),a=!!navigator.userAgent.match(/Trident.*rv:11\./),i=d.querySelectorAll("iframe.wp-embedded-content"),s=0;s<i.length;s++){if(!(e=i[s]).getAttribute("data-secret"))t=Math.random().toString(36).substr(2,10),e.src+="#?secret="+t,e.setAttribute("data-secret",t);if(r||a)(t=e.cloneNode(!0)).removeAttribute("security"),e.parentNode.replaceChild(t,e)}}}}(window,document);;
/* global wpcom, jetpackCarouselStrings, DocumentTouch */

( function () {
	'use strict';

	/////////////////////////////////////
	// Utility functions
	/////////////////////////////////////
	var util = ( function () {
		var noop = function () {};

		function unique( array ) {
			var newArray = [];
			array.forEach( function ( item ) {
				if ( item !== undefined && newArray.indexOf( item ) === -1 ) {
					newArray.push( item );
				}
			} );

			return newArray;
		}

		function texturize( text ) {
			// Ensure we get a string.
			text = text + '';
			text = text
				.replace( /'/g, '&#8217;' )
				.replace( /&#039;/g, '&#8217;' )
				.replace( /[\u2019]/g, '&#8217;' );
			text = text
				.replace( /"/g, '&#8221;' )
				.replace( /&#034;/g, '&#8221;' )
				.replace( /&quot;/g, '&#8221;' )
				.replace( /[\u201D]/g, '&#8221;' );
			// Untexturize allowed HTML tags params double-quotes.
			text = text.replace( /([\w]+)=&#[\d]+;(.+?)&#[\d]+;/g, '$1="$2"' );
			return text.trim();
		}

		function applyReplacements( text, replacements ) {
			if ( ! text ) {
				return;
			}
			if ( ! replacements ) {
				return text;
			}
			return text.replace( /{(\d+)}/g, function ( match, number ) {
				return typeof replacements[ number ] !== 'undefined' ? replacements[ number ] : match;
			} );
		}

		return {
			noop: noop,
			unique: unique,
			texturize: texturize,
			applyReplacements: applyReplacements,
		};
	} )();

	/////////////////////////////////////
	// DOM-related utility functions
	/////////////////////////////////////
	var domUtil = ( function () {
		// Helper matches function (not a polyfill), compatible with IE 11.
		function matches( el, sel ) {
			if ( Element.prototype.matches ) {
				return el.matches( sel );
			}

			if ( Element.prototype.msMatchesSelector ) {
				return el.msMatchesSelector( sel );
			}
		}

		// Helper closest parent node function (not a polyfill) based on
		// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
		function closest( el, sel ) {
			if ( el.closest ) {
				return el.closest( sel );
			}

			var current = el;

			do {
				if ( matches( current, sel ) ) {
					return current;
				}
				current = current.parentElement || current.parentNode;
			} while ( current !== null && current.nodeType === 1 );

			return null;
		}

		function hide( el ) {
			if ( el ) {
				el.style.display = 'none';
			}
		}

		function show( el ) {
			if ( el ) {
				// Everything we show and hide in Carousel is currently a block,
				// so we can make this really straightforward.
				el.style.display = 'block';
			}
		}

		function fade( el, start, end, callback ) {
			if ( ! el ) {
				return callback();
			}

			// Prepare for transition.
			// Ensure the item is in the render tree, in its initial state.
			el.style.removeProperty( 'display' );
			el.style.opacity = start;
			el.style.transition = 'opacity 0.2s';
			el.style.pointerEvents = 'none';

			var finished = function ( e ) {
				if ( e.target === el && e.propertyName === 'opacity' ) {
					el.style.removeProperty( 'transition' );
					el.style.removeProperty( 'opacity' );
					el.style.removeProperty( 'pointer-events' );
					el.removeEventListener( 'transitionend', finished );
					el.removeEventListener( 'transitioncancel', finished );
					callback();
				}
			};

			requestAnimationFrame( function () {
				// Double rAF for browser compatibility.
				requestAnimationFrame( function () {
					el.addEventListener( 'transitionend', finished );
					el.addEventListener( 'transitioncancel', finished );
					// Trigger transition.
					el.style.opacity = end;
				} );
			} );
		}

		function fadeIn( el, callback ) {
			callback = callback || util.noop;
			fade( el, '0', '1', callback );
		}

		function fadeOut( el, callback ) {
			callback = callback || util.noop;
			fade( el, '1', '0', function () {
				el.style.display = 'none';
				callback();
			} );
		}

		function emitEvent( el, type, detail ) {
			var e;
			try {
				e = new CustomEvent( type, {
					bubbles: true,
					cancelable: true,
					detail: detail || null,
				} );
			} catch ( err ) {
				e = document.createEvent( 'CustomEvent' );
				e.initCustomEvent( type, true, true, detail || null );
			}
			el.dispatchEvent( e );
		}

		function scrollToY( el, top ) {
			if ( ! el ) {
				return;
			}

			if (
				typeof el.scrollTo === 'function' &&
				'scrollBehavior' in document.documentElement.style
			) {
				el.scrollTo( { top: top, behavior: 'smooth' } );
			} else {
				el.scrollTop = top;
			}
		}

		function scrollToElement( el ) {
			if ( ! el || typeof el.scrollIntoView !== 'function' ) {
				return;
			}

			if ( 'scrollBehavior' in document.documentElement.style ) {
				el.scrollIntoView( { behavior: 'smooth' } );
			} else {
				el.scrollIntoView();
			}
		}

		function getJSONAttribute( el, attr ) {
			if ( ! el || ! el.hasAttribute( attr ) ) {
				return undefined;
			}

			try {
				return JSON.parse( el.getAttribute( attr ) );
			} catch ( e ) {
				return undefined;
			}
		}

		function convertToPlainText( html ) {
			var dummy = document.createElement( 'div' );
			dummy.textContent = html;
			return dummy.innerHTML;
		}

		return {
			closest: closest,
			matches: matches,
			hide: hide,
			show: show,
			fadeIn: fadeIn,
			fadeOut: fadeOut,
			scrollToY: scrollToY,
			scrollToElement: scrollToElement,
			getJSONAttribute: getJSONAttribute,
			convertToPlainText: convertToPlainText,
			emitEvent: emitEvent,
		};
	} )();

	/////////////////////////////////////
	// Touch-related utility functions
	/////////////////////////////////////
	var touchUtil = ( function () {
		// Wipe handler, inspired by https://www.netcu.de/jquery-touchwipe-iphone-ipad-library
		function addWipeHandler( args ) {
			args = args || {};
			var config = {
				root: document.body,
				threshold: 150, // Required min distance traveled to be considered swipe.
				restraint: 100, // Maximum distance allowed at the same time in perpendicular direction.
				allowedTime: 300, // Maximum time allowed to travel that distance.
				wipeLeft: function () {},
				wipeRight: function () {},
				wipeUp: function () {},
				wipeDown: function () {},
			};

			for ( var arg in args ) {
				config[ arg ] = args[ arg ];
			}

			var startX, startY, isMoving, startTime, elapsedTime;

			function cancelTouch() {
				config.root.removeEventListener( 'touchmove', onTouchMove );
				startX = null;
				isMoving = false;
			}

			function onTouchMove( e ) {
				if ( isMoving ) {
					var x = e.touches[ 0 ].pageX;
					var y = e.touches[ 0 ].pageY;
					var dx = startX - x;
					var dy = startY - y;
					elapsedTime = new Date().getTime() - startTime;
					if ( elapsedTime <= config.allowedTime ) {
						if ( Math.abs( dx ) >= config.threshold && Math.abs( dy ) <= config.restraint ) {
							cancelTouch();
							if ( dx > 0 ) {
								config.wipeLeft( e );
							} else {
								config.wipeRight( e );
							}
						} else if ( Math.abs( dy ) >= config.threshold && Math.abs( dx ) <= config.restraint ) {
							cancelTouch();
							if ( dy > 0 ) {
								config.wipeDown( e );
							} else {
								config.wipeUp( e );
							}
						}
					}
				}
			}

			function onTouchStart( e ) {
				if ( e.touches.length === 1 ) {
					startTime = new Date().getTime();
					startX = e.touches[ 0 ].pageX;
					startY = e.touches[ 0 ].pageY;
					isMoving = true;
					config.root.addEventListener( 'touchmove', onTouchMove, false );
				}
			}

			if ( 'ontouchstart' in document.documentElement ) {
				config.root.addEventListener( 'touchstart', onTouchStart, false );
			}
		}

		return { addWipeHandler: addWipeHandler };
	} )();

	/////////////////////////////////////
	// Carousel implementation
	/////////////////////////////////////
	function init() {
		var resizeTimeout;
		var commentInterval;
		var screenPadding;
		var originalOverflow;
		var originalHOverflow;
		var scrollPos;

		var lastKnownLocationHash = '';
		var isUserTyping = false;

		var gallerySelector =
			'div.gallery, div.tiled-gallery, ul.wp-block-gallery, ul.blocks-gallery-grid, ' +
			'figure.blocks-gallery-grid, div.wp-block-jetpack-tiled-gallery, a.single-image-gallery';

		var itemSelector =
			'.gallery-item, .tiled-gallery-item, .blocks-gallery-item, ' +
			' .tiled-gallery__item, .wp-block-image';

		var carousel = {};

		var stat =
			typeof wpcom !== 'undefined' && wpcom.carousel && wpcom.carousel.stat
				? wpcom.carousel.stat
				: util.noop;

		var pageview =
			typeof wpcom !== 'undefined' && wpcom.carousel && wpcom.carousel.pageview
				? wpcom.carousel.pageview
				: util.noop;

		function handleKeyboardEvent( e ) {
			if ( ! isUserTyping ) {
				switch ( e.which ) {
					case 38: // up
						e.preventDefault();
						carousel.container.scrollTop -= 100;
						break;
					case 40: // down
						e.preventDefault();
						carousel.container.scrollTop += 100;
						break;
					case 39: // right
						e.preventDefault();
						moveToNextSlide();
						break;
					case 37: // left
					case 8: // backspace
						e.preventDefault();
						moveToPreviousSlide();
						break;
					case 27: // escape
						e.preventDefault();
						closeCarousel();
						break;
					default:
						break;
				}
			}
		}

		function disableKeyboardNavigation() {
			isUserTyping = true;
		}

		function enableKeyboardNavigation() {
			isUserTyping = false;
		}

		function calculatePadding() {
			var baseScreenPadding = 110;
			screenPadding = baseScreenPadding;

			if ( window.innerWidth <= 760 ) {
				screenPadding = Math.round( ( window.innerWidth / 760 ) * baseScreenPadding );
				var isTouch =
					'ontouchstart' in window || ( window.DocumentTouch && document instanceof DocumentTouch );

				if ( screenPadding < 40 && isTouch ) {
					screenPadding = 0;
				}
			}
		}

		function resizeListener() {
			clearTimeout( resizeTimeout );
			resizeTimeout = setTimeout( function () {
				calculatePadding();
				fitSlides( carousel.slides );
				updateSlidePositions();
				fitMeta();
			}, 200 );
		}

		function fitMeta() {
			carousel.info.style.left = screenPadding + 'px';
			carousel.info.style.right = screenPadding + 'px';
		}

		function initializeCarousel() {
			if ( ! carousel.overlay ) {
				carousel.container = document.querySelector( '.jp-carousel-wrap' );
				carousel.overlay = carousel.container.querySelector( '.jp-carousel-overlay' );
				carousel.gallery = carousel.container.querySelector( '.jp-carousel' );
				carousel.info = carousel.container.querySelector( '.jp-carousel-info' );
				carousel.caption = carousel.container.querySelector( '.jp-carousel-caption' );
				carousel.nextButton = carousel.container.querySelector( '.jp-carousel-next-button' );
				carousel.prevButton = carousel.container.querySelector( '.jp-carousel-previous-button' );
				carousel.commentField = carousel.container.querySelector(
					'#jp-carousel-comment-form-comment-field'
				);
				carousel.emailField = carousel.container.querySelector(
					'#jp-carousel-comment-form-email-field'
				);
				carousel.authorField = carousel.container.querySelector(
					'#jp-carousel-comment-form-author-field'
				);
				carousel.urlField = carousel.container.querySelector(
					'#jp-carousel-comment-form-url-field'
				);

				calculatePadding();
				fitMeta();

				[
					carousel.commentField,
					carousel.emailField,
					carousel.authorField,
					carousel.urlField,
				].forEach( function ( field ) {
					if ( field ) {
						field.addEventListener( 'focus', disableKeyboardNavigation );
						field.addEventListener( 'blur', enableKeyboardNavigation );
					}
				} );

				carousel.container.addEventListener( 'click', function ( e ) {
					var target = e.target;
					var isTargetCloseHint = !! domUtil.closest( target, '.jp-carousel-close-hint' );
					var isSmallScreen = !! window.matchMedia( '(max-device-width: 760px)' ).matches;

					if ( target === carousel.gallery ) {
						if ( isSmallScreen ) {
							handleCarouselGalleryTouch( e );
						} else {
							closeCarousel();
						}
					} else if ( isTargetCloseHint ) {
						closeCarousel();
					} else if ( target.classList.contains( 'jp-carousel-image-download' ) ) {
						stat( 'download_original_click' );
					} else if ( target.classList.contains( 'jp-carousel-commentlink' ) ) {
						handleCommentLinkClick( e );
					} else if ( target.classList.contains( 'jp-carousel-comment-login' ) ) {
						handleCommentLoginClick( e );
					} else if ( domUtil.closest( target, '#jp-carousel-comment-form-container' ) ) {
						handleCommentFormClick( e );
					} else if ( ! domUtil.closest( target, '.jp-carousel-info' ) ) {
						if ( isSmallScreen ) {
							handleCarouselGalleryTouch( e );
						} else {
							moveToNextSlide();
						}
					}
				} );

				window.addEventListener( 'keydown', handleKeyboardEvent );

				carousel.container.addEventListener( 'jp_carousel.beforeOpen', function () {
					window.addEventListener( 'resize', resizeListener );
					resizeListener();
				} );

				carousel.container.addEventListener( 'jp_carousel.afterOpen', function () {
					enableKeyboardNavigation();
				} );

				carousel.container.addEventListener( 'jp_carousel.beforeClose', function () {
					disableKeyboardNavigation();
					window.removeEventListener( 'resize', resizeListener );
					domUtil.hide( carousel.prevButton );
					domUtil.hide( carousel.nextButton );

					// Fixes some themes where closing carousel brings view back to top.
					document.documentElement.style.removeProperty( 'height' );
				} );

				carousel.container.addEventListener( 'jp_carousel.afterClose', function () {
					if ( window.location.hash && history.back ) {
						history.back();
					}
					lastKnownLocationHash = '';
					carousel.isOpen = false;
				} );

				touchUtil.addWipeHandler( {
					root: carousel.container,
					wipeLeft: function ( e ) {
						e.preventDefault();
						moveToNextSlide();
					},
					wipeRight: function ( e ) {
						e.preventDefault();
						moveToPreviousSlide();
					},
				} );

				carousel.nextButton.addEventListener( 'click', function ( e ) {
					e.preventDefault();
					e.stopPropagation();
					moveToNextSlide();
				} );

				carousel.prevButton.addEventListener( 'click', function ( e ) {
					e.preventDefault();
					e.stopPropagation();
					moveToPreviousSlide();
				} );
			}
		}

		function handleCarouselGalleryTouch( e ) {
			if ( typeof e.pageX === 'undefined' ) {
				return;
			}

			if ( e.pageX <= 70 ) {
				moveToPreviousSlide();
			}

			if ( window.innerWidth - e.pageX <= 70 ) {
				moveToNextSlide();
			}
		}

		function handleCommentLinkClick( e ) {
			e.preventDefault();
			e.stopPropagation();
			disableKeyboardNavigation();
			domUtil.scrollToElement( carousel.info );
			domUtil.show(
				carousel.container.querySelector( '#jp-carousel-comment-form-submit-and-info-wrapper' )
			);
			var field = carousel.commentField;
			field.focus();
		}

		function handleCommentLoginClick() {
			var slide = carousel.currentSlide;
			var attachmentId = slide ? slide.attrs.attachmentId : '0';

			window.location.href = jetpackCarouselStrings.login_url + '%23jp-carousel-' + attachmentId;
		}

		function updatePostResults( msg, isSuccess ) {
			var results = carousel.container.querySelector( '#jp-carousel-comment-post-results' );
			var elClass = 'jp-carousel-comment-post-' + ( isSuccess ? 'success' : 'error' );
			results.innerHTML = '<span class="' + elClass + '">' + msg + '</span>';
			domUtil.hide( carousel.container.querySelector( '#jp-carousel-comment-form-spinner' ) );
			domUtil.show( results );
		}

		function handleCommentFormClick( e ) {
			var target = e.target;
			var data = domUtil.getJSONAttribute( carousel.container, 'data-carousel-extra' ) || {};
			var attachmentId = carousel.currentSlide.attrs.attachmentId;

			var wrapper = document.querySelector( '#jp-carousel-comment-form-submit-and-info-wrapper' );
			var spinner = document.querySelector( '#jp-carousel-comment-form-spinner' );
			var submit = document.querySelector( '#jp-carousel-comment-form-button-submit' );

			if (
				carousel.commentField &&
				carousel.commentField.getAttribute( 'id' ) === target.getAttribute( 'id' )
			) {
				// For first page load
				disableKeyboardNavigation();
				domUtil.show( wrapper );
			} else if ( domUtil.matches( target, 'input[type="submit"]' ) ) {
				e.preventDefault();
				e.stopPropagation();

				domUtil.show( spinner );

				var ajaxData = {
					action: 'post_attachment_comment',
					nonce: jetpackCarouselStrings.nonce,
					blog_id: data.blog_id,
					id: attachmentId,
					comment: carousel.commentField.value,
				};

				if ( ! ajaxData.comment.length ) {
					updatePostResults( jetpackCarouselStrings.no_comment_text, false );
					return;
				}

				if ( Number( jetpackCarouselStrings.is_logged_in ) !== 1 ) {
					ajaxData.email = carousel.emailField.value;
					ajaxData.author = carousel.authorField.value;
					ajaxData.url = carousel.urlField.value;

					if ( Number( jetpackCarouselStrings.require_name_email ) === 1 ) {
						if ( ! ajaxData.email.length || ! ajaxData.email.match( '@' ) ) {
							updatePostResults( jetpackCarouselStrings.no_comment_email, false );
							return;
						} else if ( ! ajaxData.author.length ) {
							updatePostResults( jetpackCarouselStrings.no_comment_author, false );
							return;
						}
					}
				}

				var xhr = new XMLHttpRequest();
				xhr.open( 'POST', jetpackCarouselStrings.ajaxurl, true );
				xhr.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );
				xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' );

				xhr.onreadystatechange = function () {
					if (
						this.readyState === XMLHttpRequest.DONE &&
						this.status >= 200 &&
						this.status < 300
					) {
						var response;
						try {
							response = JSON.parse( this.response );
						} catch ( error ) {
							updatePostResults( jetpackCarouselStrings.comment_post_error, false );
							return;
						}
						if ( response.comment_status === 'approved' ) {
							updatePostResults( jetpackCarouselStrings.comment_approved, true );
						} else if ( response.comment_status === 'unapproved' ) {
							updatePostResults( jetpackCarouselStrings.comment_unapproved, true );
						} else {
							// 'deleted', 'spam', false
							updatePostResults( jetpackCarouselStrings.comment_post_error, false );
						}
						clearCommentTextAreaValue();
						fetchComments( attachmentId );
						submit.value = jetpackCarouselStrings.post_comment;
						domUtil.hide( spinner );
					} else {
						// TODO: Add error handling and display here
						updatePostResults( jetpackCarouselStrings.comment_post_error, false );
					}
				};

				var params = [];
				for ( var item in ajaxData ) {
					if ( item ) {
						// Encode each form element into a URI-compatible string.
						var encoded = encodeURIComponent( item ) + '=' + encodeURIComponent( ajaxData[ item ] );
						// In x-www-form-urlencoded, spaces should be `+`, not `%20`.
						params.push( encoded.replace( /%20/g, '+' ) );
					}
				}
				var encodedData = params.join( '&' );

				xhr.send( encodedData );
			}
		}

		function processSingleImageGallery() {
			var images = document.querySelectorAll( 'a img[data-attachment-id]' );
			Array.prototype.forEach.call( images, function ( image ) {
				var container = image.parentElement;

				// Skip if image was already added to gallery by shortcode.
				if ( container.parentElement.classList.contains( 'gallery-icon' ) ) {
					return;
				}

				// Skip if the container is not a link.
				if ( ! container.hasAttribute( 'href' ) ) {
					return;
				}

				var valid = false;

				// If link points to 'Media File' (ignoring GET parameters) and flag is set, allow it.
				if (
					container.getAttribute( 'href' ).split( '?' )[ 0 ] ===
						image.getAttribute( 'data-orig-file' ).split( '?' )[ 0 ] &&
					Number( jetpackCarouselStrings.single_image_gallery_media_file ) === 1
				) {
					valid = true;
				}

				// If link points to 'Attachment Page', allow it.
				if ( container.getAttribute( 'href' ) === image.getAttribute( 'data-permalink' ) ) {
					valid = true;
				}

				// Links to 'Custom URL' or 'Media File' when flag is not set are not valid.
				if ( ! valid ) {
					return;
				}

				// Make this node a gallery recognizable by event listener above.
				container.classList.add( 'single-image-gallery' );
				// blog_id is needed to allow posting comments to correct blog.
				container.setAttribute(
					'data-carousel-extra',
					JSON.stringify( {
						blog_id: Number( jetpackCarouselStrings.blog_id ),
					} )
				);
			} );
		}

		function testForData( el ) {
			return !! ( el && el.getAttribute( 'data-carousel-extra' ) );
		}

		function openOrSelectSlide( gal, index ) {
			if ( ! carousel.isOpen ) {
				// The `open` method selects the correct slide during the initialization.
				openCarousel( gal, { startIndex: index } );
			} else {
				selectSlideAtIndex( index );
			}
		}

		function selectSlideAtIndex( index ) {
			if ( ! index || index < 0 || index > carousel.slides.length ) {
				index = 0;
			}

			if ( carousel.currentSlide ) {
				carousel.lastSlide = carousel.currentSlide;
				carousel.currentSlide.el.classList.remove( 'selected' );
			}

			carousel.currentSlide = carousel.slides[ index ];

			var current = carousel.currentSlide;
			var attachmentId = current.attrs.attachmentId;
			var prev = getPrevSlide( carousel.currentSlide );
			var next = getNextSlide( carousel.currentSlide );
			var previousPrevious = getPrevSlide( prev );
			var nextNext = getNextSlide( next );
			var captionHtml;

			carousel.slides.forEach( function ( slide ) {
				slide.el.style.position = 'fixed';
			} );
			current.el.classList.add( 'selected' );
			current.el.style.position = 'relative';

			// Center the main image.
			loadFullImage( carousel.slides[ index ] );

			domUtil.hide( carousel.caption );

			if ( ! next || ( next.index < current.index && carousel.slides.length <= 2 ) ) {
				domUtil.hide( carousel.nextButton );
			} else {
				domUtil.show( carousel.nextButton );
			}

			if ( ! prev || ( prev.index > current.index && carousel.slides.length <= 2 ) ) {
				domUtil.hide( carousel.prevButton );
			} else {
				domUtil.show( carousel.prevButton );
			}

			var inUse = util.unique( [ current, prev, previousPrevious, next, nextNext ] );
			loadSlides( inUse );

			carousel.slides.forEach( function ( slide ) {
				if ( inUse.indexOf( slide ) === -1 ) {
					domUtil.hide( slide.el );
				}
			} );

			updateSlidePositions();
			domUtil.emitEvent( carousel.container, 'jp_carousel.selectSlide', current.el );

			updateTitleAndDesc( { title: current.attrs.title, desc: current.attrs.desc } );

			var imageMeta = carousel.slides[ index ].attrs.imageMeta;
			updateExif( imageMeta );
			updateFullSizeLink( current );

			if ( Number( jetpackCarouselStrings.display_comments ) === 1 ) {
				testCommentsOpened( carousel.slides[ index ].attrs.commentsOpened );
				fetchComments( attachmentId );
				domUtil.hide( carousel.container.querySelector( '#jp-carousel-comment-post-results' ) );
			}

			if ( current.attrs.caption ) {
				captionHtml = domUtil.convertToPlainText( current.attrs.caption );

				if ( domUtil.convertToPlainText( current.attrs.title ) === captionHtml ) {
					var title = carousel.container.querySelector( '.jp-carousel-titleanddesc-title' );
					domUtil.fadeOut( title, function () {
						title.innerHTML = '';
					} );
				}

				if ( domUtil.convertToPlainText( current.attrs.desc ) === captionHtml ) {
					var desc = carousel.container.querySelector( '.jp-carousel-titleanddesc-desc' );
					domUtil.fadeOut( desc, function () {
						desc.innerHTML = '';
					} );
				}

				carousel.caption.innerHTML = current.attrs.caption;
				domUtil.fadeIn( carousel.caption );
			} else {
				domUtil.fadeOut( carousel.caption, function () {
					carousel.caption.innerHTML = '';
				} );
			}

			// Record pageview in WP Stats, for each new image loaded full-screen.
			if ( jetpackCarouselStrings.stats ) {
				new Image().src =
					document.location.protocol +
					'//pixel.wp.com/g.gif?' +
					jetpackCarouselStrings.stats +
					'&post=' +
					encodeURIComponent( attachmentId ) +
					'&rand=' +
					Math.random();
			}

			pageview( attachmentId );

			// Load previous and next slides, while trying to ensure that the current one is first.
			setTimeout( function () {
				if ( next ) {
					loadFullImage( next );
				}
				if ( prev ) {
					loadFullImage( next );
				}
			} );

			window.location.hash = lastKnownLocationHash = '#jp-carousel-' + attachmentId;
		}

		function moveToNextSlide() {
			moveToPreviousOrNextSlide( getNextSlide );
		}

		function moveToPreviousSlide() {
			moveToPreviousOrNextSlide( getPrevSlide );
		}

		function moveToPreviousOrNextSlide( slideSelectionMethod ) {
			if ( carousel.slides.length <= 1 ) {
				return false;
			}

			var newIndex = slideSelectionMethod( carousel.currentSlide ).index;

			if ( newIndex >= 0 ) {
				domUtil.scrollToY( carousel.container, 0 );
				clearCommentTextAreaValue();
				selectSlideAtIndex( newIndex );
				stat( [ 'previous', 'view_image' ] );
			}
		}

		function getNextSlide( slide ) {
			var isLast = slide && slide.index === carousel.slides.length - 1;

			if ( slide === undefined || ( carousel.slides.length > 2 && isLast ) ) {
				return carousel.slides[ 0 ];
			}

			return carousel.slides[ slide.index + 1 ];
		}

		function getPrevSlide( slide ) {
			var isFirst = slide && slide.index === 0;

			if ( slide === undefined || ( carousel.slides.length > 2 && isFirst ) ) {
				return carousel.slides[ carousel.slides.length - 1 ];
			}

			return carousel.slides[ slide.index - 1 ];
		}

		function restoreScroll() {
			window.scrollTo( window.scrollX || window.pageXOffset || 0, scrollPos || 0 );
		}

		function closeCarousel() {
			// Make sure to let the page scroll again.
			document.body.style.overflow = originalOverflow;
			document.documentElement.style.overflow = originalHOverflow;
			clearCommentTextAreaValue();

			disableKeyboardNavigation();

			domUtil.emitEvent( carousel.container, 'jp_carousel.beforeClose' );

			restoreScroll();

			domUtil.fadeOut( carousel.container, function () {
				// Clear slide data for DOM garbage collection.
				carousel.slides = [];
				carousel.currentSlide = undefined;
				carousel.gallery.innerHTML = '';

				restoreScroll();

				domUtil.emitEvent( carousel.container, 'jp_carousel.afterClose' );
			} );
		}

		function setSlidePosition( slideEl, x ) {
			if ( ! slideEl ) {
				return;
			}
			slideEl.style.transform = 'translate3d(' + x + 'px,0,0)';
		}

		function getSlideWidth( slide ) {
			return parseInt( getComputedStyle( slide.el ).width, 10 );
		}

		function updateSlidePositions() {
			var current = carousel.currentSlide;
			var last = carousel.lastSlide;

			var galleryWidth = carousel.gallery.offsetWidth;
			var currentWidth = getSlideWidth( current );

			var previous = getPrevSlide( current );
			var next = getNextSlide( current );
			var previousPrevious = getPrevSlide( previous );
			var nextNext = getNextSlide( next );

			var left = Math.floor( ( galleryWidth - currentWidth ) * 0.5 );

			setSlidePosition( current.el, left );
			domUtil.show( current.el );

			// minimum width
			fitInfo();

			// prep the slides
			var direction = current && last && last.index < current.index ? 1 : -1;

			if ( carousel.slides.length > 1 ) {
				// Since we preload the `previousPrevious` and `nextNext` slides, we need
				// to make sure they technically visible in the DOM, but invisible to the
				// user. To hide them from the user, we position them outside the edges
				// of the window.
				//
				// This section of code only applies when there are more than three
				// slides. Otherwise, the `previousPrevious` and `nextNext` slides will
				// overlap with the `previous` and `next` slides which must be visible
				// regardless.
				if ( direction === 1 ) {
					if ( nextNext !== previous ) {
						setSlidePosition( nextNext.el, galleryWidth + getSlideWidth( next ) );
						domUtil.show( nextNext.el );
					}

					if ( previousPrevious !== next ) {
						setSlidePosition(
							previousPrevious.el,
							-getSlideWidth( previousPrevious ) - currentWidth
						);
						domUtil.show( previousPrevious.el );
					}
				} else {
					if ( nextNext !== previous ) {
						setSlidePosition( nextNext.el, galleryWidth + currentWidth );
						domUtil.show( nextNext.el );
					}
				}

				setSlidePosition(
					previous.el,
					Math.floor( -getSlideWidth( previous ) + screenPadding * 0.75 )
				);
				domUtil.show( previous.el );

				setSlidePosition( next.el, Math.ceil( galleryWidth - screenPadding * 0.75 ) );
				domUtil.show( next.el );
			}
		}

		function calculateMaxSlideDimensions() {
			var screenHeightPercent = 80;

			return {
				width: window.innerWidth - screenPadding * 2,
				height: Math.floor( ( window.innerHeight / 100 ) * screenHeightPercent - 60 ),
			};
		}

		function calculateBestFit( slide ) {
			var max = calculateMaxSlideDimensions();
			var origRatio = slide.attrs.origWidth / slide.attrs.origHeight,
				wRatio = 1,
				hRatio = 1,
				width,
				height;

			if ( slide.attrs.origWidth > max.width ) {
				wRatio = max.width / slide.attrs.origWidth;
			}
			if ( slide.attrs.origHeight > max.height ) {
				hRatio = max.height / slide.attrs.origHeight;
			}

			if ( wRatio < hRatio ) {
				width = max.width;
				height = Math.floor( width / origRatio );
			} else if ( hRatio < wRatio ) {
				height = max.height;
				width = Math.floor( height * origRatio );
			} else {
				width = slide.attrs.origWidth;
				height = slide.attrs.origHeight;
			}

			return {
				width: width,
				height: height,
			};
		}

		function loadSlides( slides ) {
			for ( var i = 0; i < slides.length; i++ ) {
				var slide = slides[ i ];
				var img = slide.el.querySelector( 'img' );

				var loadHandler = function () {
					// set the width/height of the image if it's too big
					fitSlides( [ slide ] );
				};
				img.addEventListener( 'load', loadHandler );
			}
		}

		function fitInfo() {
			var size = calculateBestFit( carousel.currentSlide );

			var photoInfos = carousel.container.querySelectorAll( '.jp-carousel-photo-info' );
			Array.prototype.forEach.call( photoInfos, function ( photoInfo ) {
				photoInfo.style.left =
					Math.floor( ( carousel.info.offsetWidth - size.width ) * 0.5 ) + 'px';
				photoInfo.style.width = Math.floor( size.width ) + 'px';
			} );
		}

		function fitSlides( slides ) {
			if ( ! slides ) {
				return;
			}

			slides.forEach( function ( slide ) {
				var dimensions = calculateBestFit( slide );
				var max = calculateMaxSlideDimensions();

				dimensions.left = 0;
				dimensions.top = Math.floor( ( max.height - dimensions.height ) * 0.5 ) + 40;

				for ( var dimension in dimensions ) {
					slide.el.style.setProperty( dimension, dimensions[ dimension ] + 'px' );
				}
			} );
		}

		function selectBestImageUrl( args ) {
			if ( typeof args !== 'object' ) {
				args = {};
			}

			if ( typeof args.origFile === 'undefined' ) {
				return '';
			}

			if ( typeof args.origWidth === 'undefined' || typeof args.maxWidth === 'undefined' ) {
				return args.origFile;
			}

			if ( typeof args.mediumFile === 'undefined' || typeof args.largeFile === 'undefined' ) {
				return args.origFile;
			}

			// Check if the image is being served by Photon (using a regular expression on the hostname).

			var imageLinkParser = document.createElement( 'a' );
			imageLinkParser.href = args.largeFile;

			var isPhotonUrl = /^i[0-2]\.wp\.com$/i.test( imageLinkParser.hostname );

			var mediumSizeParts = getImageSizeParts( args.mediumFile, args.origWidth, isPhotonUrl );
			var largeSizeParts = getImageSizeParts( args.largeFile, args.origWidth, isPhotonUrl );

			var largeWidth = parseInt( largeSizeParts[ 0 ], 10 );
			var largeHeight = parseInt( largeSizeParts[ 1 ], 10 );
			var mediumWidth = parseInt( mediumSizeParts[ 0 ], 10 );
			var mediumHeight = parseInt( mediumSizeParts[ 1 ], 10 );

			// Assign max width and height.
			args.origMaxWidth = args.maxWidth;
			args.origMaxHeight = args.maxHeight;

			// Give devices with a higher devicePixelRatio higher-res images (Retina display = 2, Android phones = 1.5, etc)
			if ( typeof window.devicePixelRatio !== 'undefined' && window.devicePixelRatio > 1 ) {
				args.maxWidth = args.maxWidth * window.devicePixelRatio;
				args.maxHeight = args.maxHeight * window.devicePixelRatio;
			}

			if ( largeWidth >= args.maxWidth || largeHeight >= args.maxHeight ) {
				return args.largeFile;
			}

			if ( mediumWidth >= args.maxWidth || mediumHeight >= args.maxHeight ) {
				return args.mediumFile;
			}

			if ( isPhotonUrl ) {
				// args.origFile doesn't point to a Photon url, so in this case we use args.largeFile
				// to return the photon url of the original image.
				var largeFileIndex = args.largeFile.lastIndexOf( '?' );
				var origPhotonUrl = args.largeFile;
				if ( largeFileIndex !== -1 ) {
					origPhotonUrl = args.largeFile.substring( 0, largeFileIndex );
					// If we have a really large image load a smaller version
					// that is closer to the viewable size
					if ( args.origWidth > args.maxWidth || args.origHeight > args.maxHeight ) {
						origPhotonUrl += '?fit=' + args.origMaxWidth + '%2C' + args.origMaxHeight;
					}
				}
				return origPhotonUrl;
			}

			return args.origFile;
		}

		function getImageSizeParts( file, origWidth, isPhotonUrl ) {
			var size = isPhotonUrl
				? file.replace( /.*=([\d]+%2C[\d]+).*$/, '$1' )
				: file.replace( /.*-([\d]+x[\d]+)\..+$/, '$1' );

			var sizeParts =
				size !== file
					? isPhotonUrl
						? size.split( '%2C' )
						: size.split( 'x' )
					: [ origWidth, 0 ];

			// If one of the dimensions is set to 9999, then the actual value of that dimension can't be retrieved from the url.
			// In that case, we set the value to 0.
			if ( sizeParts[ 0 ] === '9999' ) {
				sizeParts[ 0 ] = '0';
			}

			if ( sizeParts[ 1 ] === '9999' ) {
				sizeParts[ 1 ] = '0';
			}

			return sizeParts;
		}

		/**
		 * Returns a number in a fraction format that represents the shutter speed.
		 * @param Number speed
		 * @return String
		 */
		function formatShutterSpeed( speed ) {
			var denominator;

			// round to one decimal if value > 1s by multiplying it by 10, rounding, then dividing by 10 again
			if ( speed >= 1 ) {
				return Math.round( speed * 10 ) / 10 + 's';
			}

			// If the speed is less than one, we find the denominator by inverting
			// the number. Since cameras usually use rational numbers as shutter
			// speeds, we should get a nice round number. Or close to one in cases
			// like 1/30. So we round it.
			denominator = Math.round( 1 / speed );

			return '1/' + denominator + 's';
		}

		function parseTitleOrDesc( value ) {
			if ( ! value.match( ' ' ) && value.match( '_' ) ) {
				return '';
			}

			return value;
		}

		function updateTitleAndDesc( data ) {
			var title = '';
			var desc = '';
			var markup = '';
			var target;

			target = carousel.container.querySelector( '.jp-carousel-titleanddesc' );
			domUtil.hide( target );

			title = parseTitleOrDesc( data.title ) || '';
			desc = parseTitleOrDesc( data.desc ) || '';

			if ( title || desc ) {
				// Convert from HTML to plain text (including HTML entities decode, etc)
				if ( domUtil.convertToPlainText( title ) === domUtil.convertToPlainText( desc ) ) {
					title = '';
				}

				markup = title ? '<div class="jp-carousel-titleanddesc-title">' + title + '</div>' : '';
				markup += desc ? '<div class="jp-carousel-titleanddesc-desc">' + desc + '</div>' : '';

				target.innerHTML = markup;
				domUtil.fadeIn( target );
			}
		}

		// updateExif updates the contents of the exif UL (.jp-carousel-image-exif)
		function updateExif( meta ) {
			if ( ! meta || Number( jetpackCarouselStrings.display_exif ) !== 1 ) {
				return false;
			}

			var ul = carousel.info.querySelector( '.jp-carousel-image-meta ul.jp-carousel-image-exif' );
			var html = '';

			for ( var key in meta ) {
				var val = meta[ key ];
				var metaKeys = jetpackCarouselStrings.meta_data || [];

				if ( parseFloat( val ) === 0 || ! val.length || metaKeys.indexOf( key ) === -1 ) {
					continue;
				}

				switch ( key ) {
					case 'focal_length':
						val = val + 'mm';
						break;
					case 'shutter_speed':
						val = formatShutterSpeed( val );
						break;
					case 'aperture':
						val = 'f/' + val;
						break;
				}

				html += '<li><h5>' + jetpackCarouselStrings[ key ] + '</h5>' + val + '</li>';
			}

			ul.innerHTML = html;
			ul.style.removeProperty( 'display' );
		}

		// Update the contents of the jp-carousel-image-download link
		function updateFullSizeLink( currentSlide ) {
			if ( ! currentSlide ) {
				return false;
			}
			var original;
			var origSize = [ currentSlide.attrs.origWidth, currentSlide.attrs.origHeight ];
			var imageLinkParser = document.createElement( 'a' );

			imageLinkParser.href = currentSlide.attrs.src.replace( /\?.+$/, '' );

			// Is this a Photon URL?
			if ( imageLinkParser.hostname.match( /^i[\d]{1}\.wp\.com$/i ) !== null ) {
				original = imageLinkParser.href;
			} else {
				original = currentSlide.attrs.origFile.replace( /\?.+$/, '' );
			}

			var permalink = carousel.info.querySelector( '.jp-carousel-image-download' );
			permalink.innerHTML = util.applyReplacements(
				jetpackCarouselStrings.download_original,
				origSize
			);
			permalink.setAttribute( 'href', original );
			permalink.style.removeProperty( 'display' );
		}

		function testCommentsOpened( opened ) {
			var commentForm = carousel.container.querySelector( '.jp-carousel-comment-form-container' );
			var commentLink = carousel.container.querySelector( '.jp-carousel-commentlink' );
			var buttons = carousel.container.querySelector( '.jp-carousel-buttons' );
			var control = Number( jetpackCarouselStrings.is_logged_in ) === 1 ? commentLink : buttons;
			var isOpened = parseInt( opened, 10 ) === 1;

			if ( isOpened ) {
				domUtil.fadeIn( control );
				domUtil.fadeIn( commentForm );
			} else {
				domUtil.fadeOut( control );
				domUtil.fadeOut( commentForm );
			}
		}

		function fetchComments( attachmentId, offset ) {
			var shouldClear = offset === undefined;

			clearInterval( commentInterval );

			if ( ! attachmentId ) {
				return;
			}

			if ( ! offset || offset < 1 ) {
				offset = 0;
			}

			var comments = carousel.container.querySelector( '.jp-carousel-comments' );
			var commentsLoading = carousel.container.querySelector( '#jp-carousel-comments-loading' );
			domUtil.show( commentsLoading );

			if ( shouldClear ) {
				domUtil.hide( comments );
				comments.innerHTML = '';
			}

			var xhr = new XMLHttpRequest();
			var url =
				jetpackCarouselStrings.ajaxurl +
				'?action=get_attachment_comments' +
				'&nonce=' +
				jetpackCarouselStrings.nonce +
				'&id=' +
				attachmentId +
				'&offset=' +
				offset;
			xhr.open( 'GET', url );
			xhr.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );

			var onError = function () {
				domUtil.fadeIn( comments );
				domUtil.fadeOut( commentsLoading );
			};

			xhr.onload = function () {
				// Ignore the results if they arrive late and we're now on a different slide.
				if (
					! carousel.currentSlide ||
					carousel.currentSlide.attrs.attachmentId !== attachmentId
				) {
					return;
				}

				var isSuccess = xhr.status >= 200 && xhr.status < 300;
				var data;
				try {
					data = JSON.parse( xhr.responseText );
				} catch ( e ) {
					// Do nothing.
				}

				if ( ! isSuccess || ! data || ! Array.isArray( data ) ) {
					return onError();
				}

				if ( shouldClear ) {
					comments.innerHTML = '';
				}

				for ( var i = 0; i < data.length; i++ ) {
					var entry = data[ i ];
					var comment = document.createElement( 'div' );
					comment.classList.add( 'jp-carousel-comment' );
					comment.setAttribute( 'id', 'jp-carousel-comment-' + entry.id );
					comment.innerHTML =
						'<div class="comment-gravatar">' +
						entry.gravatar_markup +
						'</div>' +
						'<div class="comment-author">' +
						entry.author_markup +
						'</div>' +
						'<div class="comment-date">' +
						entry.date_gmt +
						'</div>' +
						'<div class="comment-content">' +
						entry.content +
						'</div>';
					comments.appendChild( comment );

					// Set the interval to check for a new page of comments.
					clearInterval( commentInterval );
					commentInterval = setInterval( function () {
						if ( carousel.container.scrollTop + 150 > window.innerHeight ) {
							fetchComments( attachmentId, offset + 10 );
							clearInterval( commentInterval );
						}
					}, 300 );
				}

				domUtil.show( comments );
				domUtil.hide( commentsLoading );
			};

			xhr.onerror = onError;

			xhr.send();
		}

		function clearCommentTextAreaValue() {
			if ( carousel.commentField ) {
				carousel.commentField.value = '';
			}
		}

		function loadFullImage( slide ) {
			var el = slide.el;
			var attrs = slide.attrs;
			var image = el.querySelector( 'img' );

			if ( ! image.hasAttribute( 'data-loaded' ) ) {
				// If the width of the slide is smaller than the width of the "thumbnail" we're already using,
				// don't load the full image.

				var loadListener = function () {
					image.removeEventListener( 'load', loadListener );
					el.style.backgroundImage = '';
				};
				image.addEventListener( 'load', loadListener );

				var hasPreview = !! attrs.previewImage;
				var thumbSize = attrs.thumbSize;

				if ( ! hasPreview || ( thumbSize && el.offsetWidth > thumbSize.width ) ) {
					image.src = attrs.src;
				} else {
					image.src = attrs.previewImage;
				}

				image.setAttribute( 'itemprop', 'image' );
				image.setAttribute( 'data-loaded', 1 );
			}
		}

		function getOriginalDimensions( el ) {
			var size = el.getAttribute( 'data-orig-size' ) || '';

			if ( size ) {
				var parts = size.split( ',' );
				return { width: parseInt( parts[ 0 ], 10 ), height: parseInt( parts[ 1 ], 10 ) };
			} else {
				return {
					width:
						el.getAttribute( 'data-original-width' ) || el.getAttribute( 'width' ) || undefined,
					height:
						el.getAttribute( 'data-original-height' ) || el.getAttribute( 'height' ) || undefined,
				};
			}
		}

		function initCarouselSlides( items, startIndex ) {
			carousel.slides = [];

			if ( items.length < 2 ) {
				domUtil.hide( carousel.nextButton );
				domUtil.hide( carousel.prevButton );
			} else {
				domUtil.show( carousel.nextButton );
				domUtil.show( carousel.prevButton );
			}

			var max = calculateMaxSlideDimensions();

			// If the startIndex is not 0 then preload the clicked image first.
			if ( startIndex !== 0 ) {
				var img = new Image();
				img.src = items[ startIndex ].getAttribute( 'data-gallery-src' );
			}

			var useInPageThumbnails = !! domUtil.closest( items[ 0 ], '.tiled-gallery.type-rectangular' );

			// create the 'slide'
			Array.prototype.forEach.call( items, function ( item, i ) {
				var galleryItem = domUtil.closest( item, '.gallery-item' );
				var captionEl = galleryItem && galleryItem.querySelector( '.gallery-caption' );
				var permalinkEl = domUtil.closest( item, 'a' );

				var attrs = {
					attachmentId: item.getAttribute( 'data-attachment-id' ) || '0',
					commentsOpened: item.getAttribute( 'data-comments-opened' ) || '0',
					imageMeta: domUtil.getJSONAttribute( item, 'data-image-meta' ) || {},
					title: item.getAttribute( 'data-image-title' ) || '',
					desc: item.getAttribute( 'data-image-description' ) || '',
					mediumFile: item.getAttribute( 'data-medium-file' ) || '',
					largeFile: item.getAttribute( 'data-large-file' ) || '',
					origFile: item.getAttribute( 'data-orig-file' ) || '',
					thumbSize: { width: item.naturalWidth, height: item.naturalHeight },
					caption: ( captionEl && captionEl.innerHTML ) || '',
					permalink: permalinkEl && permalinkEl.getAttribute( 'href' ),
				};

				var tiledGalleryItem = domUtil.closest( item, '.tiled-gallery-item' );
				var tiledCaptionEl =
					tiledGalleryItem && tiledGalleryItem.querySelector( '.tiled-gallery-caption' );
				var tiledCaption = tiledCaptionEl && tiledCaptionEl.innerHTML;
				if ( tiledCaption ) {
					attrs.caption = tiledCaption;
				}

				var origDimensions = getOriginalDimensions( item );

				attrs.origWidth = origDimensions.width;
				attrs.origHeight = origDimensions.height;

				if ( typeof wpcom !== 'undefined' && wpcom.carousel && wpcom.carousel.generateImgSrc ) {
					attrs.src = wpcom.carousel.generateImgSrc( item, max );
				} else {
					attrs.src = item.getAttribute( 'data-orig-file' );

					attrs.src = selectBestImageUrl( {
						origFile: attrs.src,
						origWidth: attrs.origWidth,
						origHeight: attrs.origHeight,
						maxWidth: max.width,
						maxHeight: max.height,
						mediumFile: attrs.mediumFile,
						largeFile: attrs.largeFile,
					} );
				}

				// Set the final src.
				item.setAttribute( 'data-gallery-src', attrs.src );

				if ( attrs.attachmentId !== '0' ) {
					attrs.title = util.texturize( attrs.title );
					attrs.desc = util.texturize( attrs.desc );
					attrs.caption = util.texturize( attrs.caption );

					// Initially, the image is a 1x1 transparent gif.
					// The preview is shown as a background image on the slide itself.
					var image = new Image();
					image.src =
						'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
					image.style.width = '100%';
					image.style.height = '100%';

					var slideEl = document.createElement( 'div' );
					slideEl.classList.add( 'jp-carousel-slide' );
					slideEl.setAttribute( 'itemprop', 'associatedMedia' );
					slideEl.setAttribute( 'itemscope', '' );
					slideEl.setAttribute( 'itemtype', 'https://schema.org/ImageObject' );
					domUtil.hide( slideEl );

					slideEl.style.left = i < startIndex ? -1000 : carousel.gallery.offsetWidth;
					carousel.gallery.appendChild( slideEl );
					slideEl.appendChild( image );

					slideEl.setAttribute( 'data-attachment-id', attrs.attachmentId );
					slideEl.setAttribute( 'data-permalink', attrs.permalink );
					slideEl.setAttribute( 'data-orig-file', attrs.origFile );

					if ( useInPageThumbnails ) {
						// Use the image already loaded in the gallery as a preview.
						attrs.previewImage = attrs.src;
						slideEl.style.backgroundImage = 'url("' + attrs.src + '")';
						slideEl.style.backgroundSize = '100% 100%';
						slideEl.style.backgroundPosition = 'center center';
					}

					var slide = { el: slideEl, attrs: attrs, index: i };
					carousel.slides.push( slide );
					fitSlides( [ slide ] );
				}
			} );
		}

		function openCarousel( gallery, options ) {
			var settings = {
				imgSelector:
					'.gallery-item [data-attachment-id], .tiled-gallery-item [data-attachment-id], img[data-attachment-id]',
				startIndex: 0,
			};

			var data = domUtil.getJSONAttribute( gallery, 'data-carousel-extra' );

			if ( ! data ) {
				return; // don't run if the default gallery functions weren't used
			}

			initializeCarousel();

			if ( carousel.isOpen ) {
				return; // don't open if already opened
			}

			carousel.isOpen = true;

			// make sure to stop the page from scrolling behind the carousel overlay, so we don't trigger
			// infiniscroll for it when enabled (Reader, theme infiniscroll, etc).
			originalOverflow = getComputedStyle( document.body ).overflow;
			document.body.style.overflow = 'hidden';
			// prevent html from overflowing on some of the new themes.
			originalHOverflow = getComputedStyle( document.documentElement ).overflow;
			document.documentElement.style.overflow = 'hidden';
			scrollPos = window.scrollY || window.pageYOffset || 0;

			carousel.container.setAttribute( 'data-carousel-extra', JSON.stringify( data ) );
			stat( [ 'open', 'view_image' ] );

			// If options exist, lets merge them
			// with our default settings
			for ( var option in options || {} ) {
				settings[ option ] = options[ option ];
			}

			if ( settings.startIndex === -1 ) {
				settings.startIndex = 0; // -1 returned if can't find index, so start from beginning
			}

			domUtil.emitEvent( carousel.container, 'jp_carousel.beforeOpen' );

			domUtil.fadeIn( carousel.container, function () {
				domUtil.emitEvent( carousel.container, 'jp_carousel.afterOpen' );
			} );

			carousel.gallery.innerHTML = '';
			initCarouselSlides( gallery.querySelectorAll( settings.imgSelector ), settings.startIndex );
			selectSlideAtIndex( settings.startIndex );
		}

		// Register the event listener for starting the gallery
		document.body.addEventListener( 'click', function ( e ) {
			var target = e.target;
			var gallery = domUtil.closest( target, gallerySelector );

			if ( gallery ) {
				if ( ! testForData( gallery ) ) {
					return;
				}

				var parent = target.parentElement;
				var grandparent = parent.parentElement;

				// If Gallery is made up of individual Image blocks check for custom link before
				// loading carousel.
				if ( grandparent && grandparent.classList.contains( 'wp-block-image' ) ) {
					var parentHref = parent.getAttribute( 'href' );

					// If the link does not point to the attachment or media file then assume Image has
					// a custom link so don't load the carousel.
					if (
						parentHref.split( '?' )[ 0 ] !==
							target.getAttribute( 'data-orig-file' ).split( '?' )[ 0 ] &&
						parentHref !== target.getAttribute( 'data-permalink' )
					) {
						return;
					}
				}

				// Do not open the modal if we are looking at a gallery caption from before WP5, which may contain a link.
				if ( parent.classList.contains( 'gallery-caption' ) ) {
					return;
				}

				// Do not open the modal if we are looking at a caption of a gallery block, which may contain a link.
				if ( domUtil.matches( parent, 'figcaption' ) ) {
					return;
				}

				// Set height to auto.
				// Fix some themes where closing carousel brings view back to top.
				document.documentElement.style.height = 'auto';

				e.preventDefault();

				// Stopping propagation in case there are parent elements
				// with .gallery or .tiled-gallery class
				e.stopPropagation();

				var item = domUtil.closest( target, itemSelector );
				var index = Array.prototype.indexOf.call( gallery.querySelectorAll( itemSelector ), item );

				openCarousel( gallery, { startIndex: index } );
			}
		} );

		// Handle lightbox (single image gallery) for images linking to 'Attachment Page'.
		if ( Number( jetpackCarouselStrings.single_image_gallery ) === 1 ) {
			processSingleImageGallery();
			document.body.addEventListener( 'is.post-load', function () {
				processSingleImageGallery();
			} );
		}

		// Makes carousel work on page load and when back button leads to same URL with carousel hash
		// (i.e. no actual document.ready trigger).
		window.addEventListener( 'hashchange', function () {
			var hashRegExp = /jp-carousel-(\d+)/;

			if ( ! window.location.hash || ! hashRegExp.test( window.location.hash ) ) {
				if ( carousel.isOpen ) {
					closeCarousel();
				}

				return;
			}

			if ( window.location.hash === lastKnownLocationHash && carousel.isOpen ) {
				return;
			}

			if ( window.location.hash && carousel.gallery && ! carousel.isOpen && history.back ) {
				history.back();
				return;
			}

			lastKnownLocationHash = window.location.hash;
			var matchList = window.location.hash.match( hashRegExp );
			var attachmentId = parseInt( matchList[ 1 ], 10 );
			var galleries = document.querySelectorAll( gallerySelector );

			// Find the first thumbnail that matches the attachment ID in the location
			// hash, then open the gallery that contains it.
			for ( var i = 0; i < galleries.length; i++ ) {
				var gallery = galleries[ i ];
				var selected;

				var images = gallery.querySelectorAll( 'img' );
				for ( var j = 0; j < images.length; j++ ) {
					if ( parseInt( images[ j ].getAttribute( 'data-attachment-id' ), 10 ) === attachmentId ) {
						selected = j;
						break;
					}
				}

				if ( selected !== undefined ) {
					openOrSelectSlide( gallery, selected );
					break;
				}
			}
		} );

		if ( window.location.hash ) {
			domUtil.emitEvent( window, 'hashchange' );
		}
	}

	if ( document.readyState !== 'loading' ) {
		init();
	} else {
		document.addEventListener( 'DOMContentLoaded', init );
	}
} )();
;
/* globals related_posts_js_options */

/**
 * Load related posts
 */
( function () {
	'use strict';

	var jprp = {
		response: null,

		/**
		 * Utility get related posts JSON endpoint from URLs
		 *
		 * @param  {string} URL (optional)
		 * @return {string} Endpoint URL
		 */
		getEndpointURL: function ( URL ) {
			var locationObject,
				is_customizer =
					'undefined' !== typeof wp &&
					wp.customize &&
					wp.customize.settings &&
					wp.customize.settings.url &&
					wp.customize.settings.url.self;

			// If we're in Customizer, write the correct URL.
			if ( is_customizer ) {
				locationObject = document.createElement( 'a' );
				locationObject.href = wp.customize.settings.url.self;
			} else {
				locationObject = document.location;
			}

			if ( 'string' === typeof URL && URL.match( /^https?:\/\// ) ) {
				locationObject = document.createElement( 'a' );
				locationObject.href = URL;
			}

			var args = 'relatedposts=1';
			var relatedPosts = document.querySelector( '#jp-relatedposts' );
			if ( relatedPosts.hasAttribute( 'data-exclude' ) ) {
				args += '&relatedposts_exclude=' + relatedPosts.getAttribute( 'data-exclude' );
			}

			if ( is_customizer ) {
				args += '&jetpackrpcustomize=1';
			}

			var pathname = locationObject.pathname;
			if ( '/' !== pathname[ 0 ] ) {
				pathname = '/' + pathname;
			}

			if ( '' === locationObject.search ) {
				return pathname + '?' + args;
			} else {
				return pathname + locationObject.search + '&' + args;
			}
		},

		getAnchor: function ( post, classNames ) {
			var anchorTitle = post.title;
			var anchor = document.createElement( 'a' );
			anchor.setAttribute( 'class', classNames );
			anchor.setAttribute( 'href', post.url );
			anchor.setAttribute( 'title', anchorTitle );
			anchor.setAttribute( 'data-origin', post.url_meta.origin );
			anchor.setAttribute( 'data-position', post.url_meta.position );

			if ( '' !== post.rel ) {
				anchor.setAttribute( 'rel', post.rel );
			}

			var div = document.createElement( 'div' );
			div.appendChild( anchor );

			var anchorHTML = div.innerHTML;
			return [ anchorHTML.substring( 0, anchorHTML.length - 4 ), '</a>' ];
		},

		generateMinimalHtml: function ( posts, options ) {
			var self = this;
			var html = '';

			posts.forEach( function ( post, index ) {
				var anchor = self.getAnchor( post, 'jp-relatedposts-post-a' );
				var classes = 'jp-relatedposts-post jp-relatedposts-post' + index;

				if ( post.classes.length > 0 ) {
					classes += ' ' + post.classes.join( ' ' );
				}

				html +=
					'<p class="' +
					classes +
					'" data-post-id="' +
					post.id +
					'" data-post-format="' +
					post.format +
					'">';
				html +=
					'<span class="jp-relatedposts-post-title">' +
					anchor[ 0 ] +
					post.title +
					anchor[ 1 ] +
					'</span>';
				if ( options.showDate ) {
					html +=
						'<time class="jp-relatedposts-post-date" datetime="' +
						post.date +
						'">' +
						post.date +
						'</time>';
				}
				if ( options.showContext ) {
					html += '<span class="jp-relatedposts-post-context">' + post.context + '</span>';
				}
				html += '</p>';
			} );
			return (
				'<div class="jp-relatedposts-items jp-relatedposts-items-minimal jp-relatedposts-' +
				options.layout +
				' ">' +
				html +
				'</div>'
			);
		},

		generateVisualHtml: function ( posts, options ) {
			var self = this;
			var html = '';

			posts.forEach( function ( post, index ) {
				var anchor = self.getAnchor( post, 'jp-relatedposts-post-a' );
				var classes = 'jp-relatedposts-post jp-relatedposts-post' + index;

				if ( post.classes.length > 0 ) {
					classes += ' ' + post.classes.join( ' ' );
				}

				if ( ! post.img.src ) {
					classes += ' jp-relatedposts-post-nothumbs';
				} else {
					classes += ' jp-relatedposts-post-thumbs';
				}

				var dummyContainer = document.createElement( 'p' );
				dummyContainer.innerHTML = post.excerpt;
				var excerpt = dummyContainer.textContent;

				html +=
					'<div class="' +
					classes +
					'" data-post-id="' +
					post.id +
					'" data-post-format="' +
					post.format +
					'">';
				if ( post.img.src ) {
					html +=
						anchor[ 0 ] +
						'<img class="jp-relatedposts-post-img" src="' +
						post.img.src +
						'" width="' +
						post.img.width +
						'" alt="' +
						post.img.alt_text +
						'" />' +
						anchor[ 1 ];
				} else {
					var anchor_overlay = self.getAnchor(
						post,
						'jp-relatedposts-post-a jp-relatedposts-post-aoverlay'
					);
					html += anchor_overlay[ 0 ] + anchor_overlay[ 1 ];
				}
				html +=
					'<' +
					related_posts_js_options.post_heading +
					' class="jp-relatedposts-post-title">' +
					anchor[ 0 ] +
					post.title +
					anchor[ 1 ] +
					'</' +
					related_posts_js_options.post_heading +
					'>';
				html += '<p class="jp-relatedposts-post-excerpt">' + excerpt + '</p>';
				if ( options.showDate ) {
					html +=
						'<time class="jp-relatedposts-post-date" datetime="' +
						post.date +
						'">' +
						post.date +
						'</time>';
				}
				if ( options.showContext ) {
					html += '<p class="jp-relatedposts-post-context">' + post.context + '</p>';
				}
				html += '</div>';
			} );
			return (
				'<div class="jp-relatedposts-items jp-relatedposts-items-visual jp-relatedposts-' +
				options.layout +
				' ">' +
				html +
				'</div>'
			);
		},

		/**
		 * We want to set a max height on the excerpt however we want to set
		 * this according to the natual pacing of the page as we never want to
		 * cut off a line of text in the middle so we need to do some detective
		 * work.
		 */
		setVisualExcerptHeights: function () {
			var elements = document.querySelectorAll(
				'#jp-relatedposts .jp-relatedposts-post-nothumbs .jp-relatedposts-post-excerpt'
			);

			if ( ! elements.length ) {
				return;
			}

			var firstElementStyles = getComputedStyle( elements[ 0 ] );

			var fontSize = parseInt( firstElementStyles.fontSize, 10 );
			var lineHeight = parseInt( firstElementStyles.lineHeight, 10 );

			// Show 5 lines of text
			for ( var i = 0; i < elements.length; i++ ) {
				elements[ i ].style.maxHeight = ( 5 * lineHeight ) / fontSize + 'em';
			}
		},

		getTrackedUrl: function ( anchor ) {
			var args = 'relatedposts_hit=1';
			args += '&relatedposts_origin=' + anchor.getAttribute( 'data-origin' );
			args += '&relatedposts_position=' + anchor.getAttribute( 'data-position' );

			var pathname = anchor.pathname;
			if ( '/' !== pathname[ 0 ] ) {
				pathname = '/' + pathname;
			}

			if ( '' === anchor.search ) {
				return pathname + '?' + args;
			} else {
				return pathname + anchor.search + '&' + args;
			}
		},

		cleanupTrackedUrl: function () {
			if ( 'function' !== typeof history.replaceState ) {
				return;
			}

			var cleaned_search = document.location.search.replace(
				/\brelatedposts_[a-z]+=[0-9]*&?\b/gi,
				''
			);
			if ( '?' === cleaned_search ) {
				cleaned_search = '';
			}
			if ( document.location.search !== cleaned_search ) {
				history.replaceState( {}, document.title, document.location.pathname + cleaned_search );
			}
		},
	};

	function afterPostsHaveLoaded() {
		jprp.setVisualExcerptHeights();
		var posts = document.querySelectorAll( '#jp-relatedposts a.jp-relatedposts-post-a' );

		Array.prototype.forEach.call( posts, function ( post ) {
			document.addEventListener( 'click', function () {
				post.href = jprp.getTrackedUrl( post );
			} );
		} );
	}

	/**
	 * Initialize Related Posts.
	 */
	function startRelatedPosts() {
		jprp.cleanupTrackedUrl();

		var endpointURL = jprp.getEndpointURL();
		var relatedPosts = document.querySelector( '#jp-relatedposts' );

		if ( document.querySelectorAll( '#jp-relatedposts .jp-relatedposts-post' ).length ) {
			afterPostsHaveLoaded();
			return;
		}

		var request = new XMLHttpRequest();
		request.open( 'GET', endpointURL, true );
		request.setRequestHeader( 'x-requested-with', 'XMLHttpRequest' );

		request.onreadystatechange = function () {
			if ( this.readyState === XMLHttpRequest.DONE && this.status === 200 ) {
				try {
					var response = JSON.parse( request.responseText );

					if ( 0 === response.items.length || 0 === relatedPosts.length ) {
						return;
					}

					jprp.response = response;

					var html,
						showThumbnails,
						options = {};

					if ( 'undefined' !== typeof wp && wp.customize ) {
						showThumbnails = wp.customize.instance( 'jetpack_relatedposts[show_thumbnails]' ).get();
						options.showDate = wp.customize.instance( 'jetpack_relatedposts[show_date]' ).get();
						options.showContext = wp.customize
							.instance( 'jetpack_relatedposts[show_context]' )
							.get();
						options.layout = wp.customize.instance( 'jetpack_relatedposts[layout]' ).get();
					} else {
						showThumbnails = response.show_thumbnails;
						options.showDate = response.show_date;
						options.showContext = response.show_context;
						options.layout = response.layout;
					}

					html = ! showThumbnails
						? jprp.generateMinimalHtml( response.items, options )
						: jprp.generateVisualHtml( response.items, options );

					var div = document.createElement( 'div' );
					relatedPosts.appendChild( div );
					div.outerHTML = html;

					if ( options.showDate ) {
						var dates = relatedPosts.querySelectorAll( '.jp-relatedposts-post-date' );

						Array.prototype.forEach.call( dates, function ( date ) {
							date.style.display = 'block';
						} );
					}

					relatedPosts.style.display = 'block';
					afterPostsHaveLoaded();
				} catch ( error ) {
					// Do nothing
				}
			}
		};

		request.send();
	}

	function init() {
		if ( 'undefined' !== typeof wp && wp.customize ) {
			if ( wp.customize.selectiveRefresh ) {
				wp.customize.selectiveRefresh.bind( 'partial-content-rendered', function ( placement ) {
					if ( 'jetpack_relatedposts' === placement.partial.id ) {
						startRelatedPosts();
					}
				} );
			}
			wp.customize.bind( 'preview-ready', startRelatedPosts );
		} else {
			startRelatedPosts();
		}
	}

	if ( document.readyState !== 'loading' ) {
		init();
	} else {
		document.addEventListener( 'DOMContentLoaded', init );
	}
} )();
;
var ak_js = document.getElementById( "ak_js" );

if ( ! ak_js ) {
	ak_js = document.createElement( 'input' );
	ak_js.setAttribute( 'id', 'ak_js' );
	ak_js.setAttribute( 'name', 'ak_js' );
	ak_js.setAttribute( 'type', 'hidden' );
}
else {
	ak_js.parentNode.removeChild( ak_js );
}

ak_js.setAttribute( 'value', ( new Date() ).getTime() );

var commentForm = document.getElementById( 'commentform' );

if ( commentForm ) {
	commentForm.appendChild( ak_js );
}
else {
	var replyRowContainer = document.getElementById( 'replyrow' );

	if ( replyRowContainer ) {
		var children = replyRowContainer.getElementsByTagName( 'td' );

		if ( children.length > 0 ) {
			children[0].appendChild( ak_js );
		}
	}
};
( function () {
	'use strict';

	if ( typeof window.wpcom === 'undefined' ) {
		window.wpcom = {};
	}

	if ( window.wpcom.carousel ) {
		return;
	}

	var prebuilt_widths = jetpackCarouselStrings.widths;
	var pageviews_stats_args = jetpackCarouselStrings.stats_query_args;

	var findFirstLargeEnoughWidth = function ( original_w, original_h, dest_w, dest_h ) {
		var inverse_ratio = original_h / original_w;

		for ( var i = 0; i < prebuilt_widths.length; ++i ) {
			if ( prebuilt_widths[ i ] >= dest_w || prebuilt_widths[ i ] * inverse_ratio >= dest_h ) {
				return prebuilt_widths[ i ];
			}
		}

		return original_w;
	};

	var removeResizeFromImageURL = function ( url ) {
		return removeArgFromURL( url, 'resize' );
	};

	var removeArgFromURL = function ( url, arg ) {
		var re = new RegExp( '[\\?&]' + arg + '(=[^?&]+)?' );
		if ( url.match( re ) ) {
			return url.replace( re, '' );
		}
		return url;
	};

	var addWidthToImageURL = function ( url, width ) {
		width = parseInt( width, 10 );
		// Give devices with a higher devicePixelRatio higher-res images (Retina display = 2, Android phones = 1.5, etc)
		if ( 'undefined' !== typeof window.devicePixelRatio && window.devicePixelRatio > 1 ) {
			width = Math.round( width * window.devicePixelRatio );
		}
		url = addArgToURL( url, 'w', width );
		url = addArgToURL( url, 'h', '' );
		return url;
	};

	var addArgToURL = function ( url, arg, value ) {
		var re = new RegExp( arg + '=[^?&]+' );
		if ( url.match( re ) ) {
			return url.replace( re, arg + '=' + value );
		} else {
			var divider = url.indexOf( '?' ) !== -1 ? '&' : '?';
			return url + divider + arg + '=' + value;
		}
	};

	var stat = function ( names ) {
		if ( typeof names !== 'string' ) {
			names = names.join( ',' );
		}

		new Image().src = window.location.protocol +
			'//pixel.wp.com/g.gif?v=wpcom-no-pv' +
			'&x_carousel=' + names +
			'&baba=' + Math.random();
	};

	var pageview = function ( post_id ) {
		new Image().src = window.location.protocol +
			'//pixel.wp.com/g.gif?host=' + encodeURIComponent( window.location.host ) +
			'&ref=' + encodeURIComponent( document.referrer ) +
			'&rand=' + Math.random() +
			'&' + pageviews_stats_args +
			'&post=' + encodeURIComponent( post_id );
	};

	var generateImgSrc = function ( srcItem, max ) {
		var origSize = srcItem.getAttribute( 'data-orig-size' ) || '';

		var src = srcItem.getAttribute( 'src' ) || srcItem.getAttribute( 'original' ) || srcItem.getAttribute( 'data-original' ) || srcItem.getAttribute( 'data-lazy-src' );
		if ( src.indexOf( 'imgpress' ) !== -1 ) {
			src = srcItem.getAttribute( 'data-orig-file' );
		}
		// Square/Circle galleries use a resize param that needs to be removed.
		src = removeResizeFromImageURL( src );
		src = addWidthToImageURL(
			src,
			findFirstLargeEnoughWidth( origSize.width, origSize.height, max.width, max.height )
		);

		return src;
	};

	window.wpcom.carousel = {
		findFirstLargeEnoughWidth: findFirstLargeEnoughWidth,
		removeResizeFromImageURL: removeResizeFromImageURL,
		addWidthToImageURL: addWidthToImageURL,
		stat: stat,
		pageview: pageview,
		generateImgSrc: generateImgSrc
	};

} )();
;
/* global WPCOM_sharing_counts, grecaptcha */

// NOTE: This file intentionally does not make use of polyfills or libraries,
// including jQuery. Please keep all code as IE11-compatible vanilla ES5, and
// ensure everything is inside an IIFE to avoid global namespace pollution.
// Code follows WordPress browser support guidelines. For an up to date list,
// see https://make.wordpress.org/core/handbook/best-practices/browser-support/

( function () {
	var currentScript = document.currentScript;
	var recaptchaScriptAdded = false;

	// -------------------------- UTILITY FUNCTIONS -------------------------- //

	// Helper function to load an external script.
	function loadScript( url ) {
		var script = document.createElement( 'script' );
		var prev = currentScript || document.getElementsByTagName( 'script' )[ 0 ];
		script.setAttribute( 'async', true );
		script.setAttribute( 'src', url );
		prev.parentNode.insertBefore( script, prev );
	}

	// Helper matches function (not a polyfill), compatible with IE 11.
	function matches( el, sel ) {
		if ( Element.prototype.matches ) {
			return el.matches( sel );
		}

		if ( Element.prototype.msMatchesSelector ) {
			return el.msMatchesSelector( sel );
		}
	}

	// Helper closest parent node function (not a polyfill) based on
	// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
	function closest( el, sel ) {
		if ( el.closest ) {
			return el.closest( sel );
		}

		var current = el;

		do {
			if ( matches( current, sel ) ) {
				return current;
			}
			current = current.parentElement || current.parentNode;
		} while ( current !== null && current.nodeType === 1 );

		return null;
	}

	// Helper function to iterate over a NodeList
	// (since IE 11 doesn't have NodeList.prototype.forEach)
	function forEachNode( list, fn ) {
		for ( var i = 0; i < list.length; i++ ) {
			var node = list[ i ];
			fn( node, i, list );
		}
	}

	// Helper function to remove a node from the DOM.
	function removeNode( node ) {
		if ( node && node.parentNode ) {
			node.parentNode.removeChild( node );
		}
	}

	// Helper functions to show/hide a node, and check its status.
	function hideNode( node ) {
		if ( node ) {
			node.style.display = 'none';
		}
	}

	function showNode( node ) {
		if ( node ) {
			node.style.removeProperty( 'display' );
		}
	}

	function isNodeHidden( node ) {
		return ! node || node.style.display === 'none';
	}

	// ------------------------------- CLASSES ------------------------------- //

	var PANE_SELECTOR = '.sharing-hidden .inner';
	var PANE_DATA_ATTR = 'data-sharing-more-button-id';

	// Implements a MoreButton class, which controls the lifecycle and behavior
	// of a "more" button and its dialog.
	function MoreButton( buttonEl ) {
		this.button = buttonEl;
		this.pane = closest( buttonEl, 'div' ).querySelector( PANE_SELECTOR );
		this.openedBy = null;
		this.recentlyOpenedByHover = false;

		MoreButton.instances.push( this );
		this.pane.setAttribute( PANE_DATA_ATTR, MoreButton.instances.length - 1 );

		this.attachHandlers();
	}

	// Keep a reference to each instance, so we can get back to it from the DOM.
	MoreButton.instances = [];

	// Delay time configs.
	MoreButton.hoverOpenDelay = 200;
	MoreButton.recentOpenDelay = 400;
	MoreButton.hoverCloseDelay = 300;

	// Use this to avoid creating new instances for buttons which already have one.
	MoreButton.instantiateOrReuse = function ( buttonEl ) {
		var pane = closest( buttonEl, 'div' ).querySelector( PANE_SELECTOR );
		var paneId = pane && pane.getAttribute( PANE_DATA_ATTR );

		var existingInstance = MoreButton.instances[ paneId ];
		if ( existingInstance ) {
			return existingInstance;
		}

		return new MoreButton( buttonEl );
	};

	// Retrieve a button instance from the pane DOM element.
	MoreButton.getButtonInstanceFromPane = function ( paneEl ) {
		var paneId = paneEl && paneEl.getAttribute( PANE_DATA_ATTR );
		return MoreButton.instances[ paneId ];
	};

	// Close all open More Button dialogs.
	MoreButton.closeAll = function () {
		for ( var i = 0; i < MoreButton.instances.length; i++ ) {
			MoreButton.instances[ i ].close();
		}
	};

	MoreButton.prototype.open = function () {
		var offset;
		var offsetParent;
		var parentOffset = [ 0, 0 ];

		function getOffsets( el ) {
			var rect = el.getBoundingClientRect();
			return [
				rect.left + ( window.scrollX || window.pageXOffset || 0 ),
				rect.top + ( window.scrollY || window.pageYOffset || 0 ),
			];
		}

		function getStyleValue( el, prop ) {
			return parseInt( getComputedStyle( el ).getPropertyValue( prop ) || 0 );
		}

		offset = getOffsets( this.button );
		offsetParent = this.button.offsetParent || document.documentElement;

		while (
			offsetParent &&
			( offsetParent === document.body || offsetParent === document.documentElement ) &&
			getComputedStyle( offsetParent ).getPropertyValue( 'position' ) === 'static'
		) {
			offsetParent = offsetParent.parentNode;
		}

		if ( offsetParent && offsetParent !== this.button && offsetParent.nodeType === 1 ) {
			parentOffset = getOffsets( offsetParent );
			parentOffset = [
				parentOffset[ 0 ] + getStyleValue( offsetParent, 'border-left-width' ),
				parentOffset[ 1 ] + getStyleValue( offsetParent, 'border-top-width' ),
			];
		}

		var positionLeft =
			offset[ 0 ] - parentOffset[ 0 ] - getStyleValue( this.button, 'margin-left' );
		var positionTop = offset[ 1 ] - parentOffset[ 1 ] - getStyleValue( this.button, 'margin-top' );

		this.pane.style.left = positionLeft + 'px';
		this.pane.style.top = positionTop + this.button.offsetHeight + 3 + 'px';

		showNode( this.pane );
	};

	MoreButton.prototype.close = function () {
		hideNode( this.pane );
		this.openedBy = null;
	};

	MoreButton.prototype.toggle = function () {
		if ( isNodeHidden( this.pane ) ) {
			this.open();
		} else {
			this.close();
		}
	};

	MoreButton.prototype.resetCloseTimer = function () {
		clearTimeout( this.closeTimer );
		this.closeTimer = setTimeout( this.close.bind( this ), MoreButton.hoverCloseDelay );
	};

	MoreButton.prototype.attachHandlers = function () {
		this.buttonClick = function ( event ) {
			event.preventDefault();
			event.stopPropagation();

			this.openedBy = 'click';
			clearTimeout( this.openTimer );
			clearTimeout( this.closeTimer );

			closeEmailDialog();

			if ( this.recentlyOpenedByHover ) {
				this.recentlyOpenedByHover = false;
				clearTimeout( this.hoverOpenTimer );
				this.open();
			} else {
				this.toggle();
			}
		}.bind( this );

		this.buttonEnter = function () {
			if ( ! this.openedBy ) {
				this.openTimer = setTimeout(
					function () {
						closeEmailDialog();
						this.open();
						this.openedBy = 'hover';
						this.recentlyOpenedByHover = true;
						this.hoverOpenTimer = setTimeout(
							function () {
								this.recentlyOpenedByHover = false;
							}.bind( this ),
							MoreButton.recentOpenDelay
						);
					}.bind( this ),
					MoreButton.hoverOpenDelay
				);
			}
			clearTimeout( this.closeTimer );
		}.bind( this );

		this.buttonLeave = function () {
			if ( this.openedBy === 'hover' ) {
				this.resetCloseTimer();
			}
			clearTimeout( this.openTimer );
		}.bind( this );

		this.paneEnter = function () {
			clearTimeout( this.closeTimer );
		}.bind( this );

		this.paneLeave = function () {
			if ( this.openedBy === 'hover' ) {
				this.resetCloseTimer();
			}
		}.bind( this );

		this.documentClick = function () {
			this.close();
		}.bind( this );

		this.button.addEventListener( 'click', this.buttonClick );
		document.addEventListener( 'click', this.documentClick );

		if ( document.ontouchstart === undefined ) {
			// Non-touchscreen device: use hover/mouseout with delay
			this.button.addEventListener( 'mouseenter', this.buttonEnter );
			this.button.addEventListener( 'mouseleave', this.buttonLeave );
			this.pane.addEventListener( 'mouseenter', this.paneEnter );
			this.pane.addEventListener( 'mouseleave', this.paneLeave );
		}
	};

	// ---------------------------- SHARE COUNTS ---------------------------- //

	if ( window.sharing_js_options && window.sharing_js_options.counts ) {
		var WPCOMSharing = {
			done_urls: [],
			get_counts: function () {
				var url, requests, id, service, service_request;

				if ( 'undefined' === typeof WPCOM_sharing_counts ) {
					return;
				}

				for ( url in WPCOM_sharing_counts ) {
					id = WPCOM_sharing_counts[ url ];

					if ( 'undefined' !== typeof WPCOMSharing.done_urls[ id ] ) {
						continue;
					}

					requests = {
						// Pinterest handles share counts for both http and https
						pinterest: [
							window.location.protocol +
								'//api.pinterest.com/v1/urls/count.json?callback=WPCOMSharing.update_pinterest_count&url=' +
								encodeURIComponent( url ),
						],
						// Facebook protocol summing has been shown to falsely double counts, so we only request the current URL
						facebook: [
							window.location.protocol +
								'//graph.facebook.com/?callback=WPCOMSharing.update_facebook_count&ids=' +
								encodeURIComponent( url ),
						],
					};

					for ( service in requests ) {
						if ( ! document.querySelector( 'a[data-shared=sharing-' + service + '-' + id + ']' ) ) {
							continue;
						}

						while ( ( service_request = requests[ service ].pop() ) ) {
							loadScript( service_request );
						}

						if ( window.sharing_js_options.is_stats_active ) {
							WPCOMSharing.bump_sharing_count_stat( service );
						}
					}

					WPCOMSharing.done_urls[ id ] = true;
				}
			},

			// get the version of the url that was stored in the dom
			get_permalink: function ( url ) {
				if ( 'https:' === window.location.protocol ) {
					url = url.replace( /^http:\/\//i, 'https://' );
				} else {
					url = url.replace( /^https:\/\//i, 'http://' );
				}

				return url;
			},
			update_facebook_count: function ( data ) {
				var url, permalink;

				if ( ! data ) {
					return;
				}

				for ( url in data ) {
					if (
						! Object.prototype.hasOwnProperty.call( data, url ) ||
						! data[ url ].share ||
						! data[ url ].share.share_count
					) {
						continue;
					}

					permalink = WPCOMSharing.get_permalink( url );

					if ( ! ( permalink in WPCOM_sharing_counts ) ) {
						continue;
					}

					WPCOMSharing.inject_share_count(
						'sharing-facebook-' + WPCOM_sharing_counts[ permalink ],
						data[ url ].share.share_count
					);
				}
			},
			update_pinterest_count: function ( data ) {
				if ( 'undefined' !== typeof data.count && data.count * 1 > 0 ) {
					WPCOMSharing.inject_share_count(
						'sharing-pinterest-' + WPCOM_sharing_counts[ data.url ],
						data.count
					);
				}
			},
			inject_share_count: function ( id, count ) {
				forEachNode( document.querySelectorAll( 'a[data-shared=' + id + '] > span' ), function (
					span
				) {
					var countNode = span.querySelector( '.share-count' );
					removeNode( countNode );
					var newNode = document.createElement( 'span' );
					newNode.className = 'share-count';
					newNode.textContent = WPCOMSharing.format_count( count );
					span.appendChild( newNode );
				} );
			},
			format_count: function ( count ) {
				if ( count < 1000 ) {
					return count;
				}
				if ( count >= 1000 && count < 10000 ) {
					return String( count ).substring( 0, 1 ) + 'K+';
				}
				return '10K+';
			},
			bump_sharing_count_stat: function ( service ) {
				new Image().src =
					document.location.protocol +
					'//pixel.wp.com/g.gif?v=wpcom-no-pv&x_sharing-count-request=' +
					service +
					'&r=' +
					Math.random();
			},
		};
		window.WPCOMSharing = WPCOMSharing;
	}

	// ------------------------ BUTTON FUNCTIONALITY ------------------------ //

	function shareIsEmail( val ) {
		return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(
			val
		);
	}

	function closeEmailDialog() {
		var dialog = document.querySelector( '#sharing_email' );
		hideNode( dialog );
	}

	// Sharing initialization.
	// Will run immediately or on `DOMContentLoaded`, depending on current page status.
	function init() {
		// Move email dialog to end of body.
		var emailDialog = document.querySelector( '#sharing_email' );
		if ( emailDialog ) {
			document.body.appendChild( emailDialog );
		}

		WPCOMSharing_do();
	}
	if ( document.readyState !== 'loading' ) {
		init();
	} else {
		document.addEventListener( 'DOMContentLoaded', init );
	}

	// Set up sharing again whenever a new post loads, to pick up any new buttons.
	document.body.addEventListener( 'is.post-load', WPCOMSharing_do );

	// Set up sharing, updating counts and adding all button functionality.
	function WPCOMSharing_do() {
		if ( window.WPCOMSharing ) {
			window.WPCOMSharing.get_counts();
		}

		forEachNode( document.querySelectorAll( '.sharedaddy a' ), function ( anchor ) {
			var href = anchor.getAttribute( 'href' );
			if ( href && href.indexOf( 'share=' ) !== -1 && href.indexOf( '&nb=1' ) === -1 ) {
				anchor.setAttribute( 'href', href + '&nb=1' );
			}
		} );

		// Show hidden buttons

		// Touchscreen device: use click.
		// Non-touchscreen device: use click if not already appearing due to a hover event

		forEachNode( document.querySelectorAll( '.sharedaddy a.sharing-anchor' ), function (
			buttonEl
		) {
			MoreButton.instantiateOrReuse( buttonEl );
		} );

		if ( document.ontouchstart !== undefined ) {
			document.body.classList.add( 'jp-sharing-input-touch' );
		}

		// Add click functionality
		forEachNode( document.querySelectorAll( '.sharedaddy ul' ), function ( group ) {
			if ( group.getAttribute( 'data-sharing-events-added' ) === 'true' ) {
				return;
			}
			group.setAttribute( 'data-sharing-events-added', 'true' );

			var printUrl = function ( uniqueId, urlToPrint ) {
				var iframe = document.createElement( 'iframe' );
				iframe.setAttribute(
					'style',
					'position:fixed; top:100; left:100; height:1px; width:1px; border:none;'
				);
				iframe.setAttribute( 'id', 'printFrame-' + uniqueId );
				iframe.setAttribute( 'name', iframe.getAttribute( 'id' ) );
				iframe.setAttribute( 'src', urlToPrint );
				iframe.setAttribute(
					'onload',
					'frames["printFrame-' +
						uniqueId +
						'"].focus();frames["printFrame-' +
						uniqueId +
						'"].print();'
				);
				document.body.appendChild( iframe );
			};

			// Print button
			forEachNode( group.querySelectorAll( 'a.share-print' ), function ( printButton ) {
				printButton.addEventListener( 'click', function ( event ) {
					event.preventDefault();
					event.stopPropagation();

					var ref = printButton.getAttribute( 'href' ) || '';
					var doPrint = function () {
						if ( ref.indexOf( '#print' ) === -1 ) {
							var uid = new Date().getTime();
							printUrl( uid, ref );
						} else {
							window.print();
						}
					};

					// Is the button in a dropdown?
					var pane = closest( printButton, PANE_SELECTOR );
					if ( pane ) {
						var moreButton = MoreButton.getButtonInstanceFromPane( pane );
						if ( moreButton ) {
							moreButton.close();
							doPrint();
						}
					} else {
						doPrint();
					}
				} );
			} );

			// Press This button
			forEachNode( group.querySelectorAll( 'a.share-press-this' ), function ( pressThisButton ) {
				pressThisButton.addEventListener( 'click', function ( event ) {
					event.preventDefault();
					event.stopPropagation();

					var s = '';

					if ( window.getSelection ) {
						s = window.getSelection();
					} else if ( document.getSelection ) {
						s = document.getSelection();
					} else if ( document.selection ) {
						s = document.selection.createRange().text;
					}

					if ( s ) {
						var href = pressThisButton.getAttribute( 'href' );
						pressThisButton.setAttribute( 'href', href + '&sel=' + encodeURI( s ) );
					}

					if (
						! window.open(
							pressThisButton.getAttribute( 'href' ),
							't',
							'toolbar=0,resizable=1,scrollbars=1,status=1,width=720,height=570'
						)
					) {
						document.location.href = pressThisButton.getAttribute( 'href' );
					}
				} );
			} );

			// Email button
			forEachNode( group.querySelectorAll( 'a.share-email' ), function ( emailButton ) {
				var dialog = document.querySelector( '#sharing_email' );

				emailButton.addEventListener( 'click', function ( event ) {
					event.preventDefault();
					event.stopPropagation();

					// Load reCAPTCHA if needed.
					if ( typeof grecaptcha !== 'object' && ! recaptchaScriptAdded ) {
						var configEl = document.querySelector( '.g-recaptcha' );

						if ( configEl && configEl.getAttribute( 'data-lazy' ) === 'true' ) {
							recaptchaScriptAdded = true;
							loadScript( decodeURI( configEl.getAttribute( 'data-url' ) ) );
						}
					}

					var url = emailButton.getAttribute( 'href' );
					var currentDomain = window.location.protocol + '//' + window.location.hostname + '/';
					if ( url.indexOf( currentDomain ) !== 0 ) {
						return true;
					}

					if ( ! isNodeHidden( dialog ) ) {
						closeEmailDialog();
						return;
					}

					removeNode( document.querySelector( '#sharing_email .response' ) );

					var form = document.querySelector( '#sharing_email form' );
					showNode( form );
					form.querySelector( 'input[type=submit]' ).removeAttribute( 'disabled' );
					showNode( form.querySelector( 'a.sharing_cancel' ) );

					// Reset reCATPCHA if exists.
					if (
						'object' === typeof grecaptcha &&
						'function' === typeof grecaptcha.reset &&
						window.___grecaptcha_cfg.count
					) {
						grecaptcha.reset();
					}

					// Show dialog
					var rect = emailButton.getBoundingClientRect();
					var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || 0;
					var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
					dialog.style.left = scrollLeft + rect.left + 'px';
					dialog.style.top = scrollTop + rect.top + rect.height + 'px';
					showNode( dialog );

					// Close all open More Button dialogs.
					MoreButton.closeAll();
				} );

				// Hook up other buttons
				dialog.querySelector( 'a.sharing_cancel' ).addEventListener( 'click', function ( event ) {
					event.preventDefault();
					event.stopPropagation();

					hideNode( dialog.querySelector( '.errors' ) );
					hideNode( dialog );
					hideNode( document.querySelector( '#sharing_background' ) );
				} );

				var submitButton = dialog.querySelector( 'input[type=submit]' );
				submitButton.addEventListener( 'click', function ( event ) {
					event.preventDefault();
					event.stopPropagation();

					var form = closest( submitButton, 'form' );
					var source_email_input = form.querySelector( 'input[name=source_email]' );
					var target_email_input = form.querySelector( 'input[name=target_email]' );

					// Disable buttons + enable loading icon
					submitButton.setAttribute( 'disabled', true );
					hideNode( form.querySelector( 'a.sharing_cancel' ) );
					forEachNode( form.querySelectorAll( 'img.loading' ), function ( img ) {
						showNode( img );
					} );

					hideNode( form.querySelector( '.errors' ) );

					forEachNode( form.querySelectorAll( '.error' ), function ( node ) {
						node.classList.remove( 'error' );
					} );

					if ( ! shareIsEmail( source_email_input.value ) ) {
						source_email_input.classList.add( 'error' );
					}

					if ( ! shareIsEmail( target_email_input.value ) ) {
						target_email_input.classList.add( 'error' );
					}

					if ( ! form.querySelector( '.error' ) ) {
						// Encode form data. This would be much easier if we could rely on URLSearchParams...
						var params = [];
						for ( var i = 0; i < form.elements.length; i++ ) {
							if ( form.elements[ i ].name ) {
								// Encode each form element into a URI-compatible string.
								var encoded =
									encodeURIComponent( form.elements[ i ].name ) +
									'=' +
									encodeURIComponent( form.elements[ i ].value );
								// In x-www-form-urlencoded, spaces should be `+`, not `%20`.
								params.push( encoded.replace( '%20', '+' ) );
							}
						}
						var data = params.join( '&' );

						// AJAX send the form
						var request = new XMLHttpRequest();
						request.open( 'POST', emailButton.getAttribute( 'href' ), true );
						request.setRequestHeader(
							'Content-Type',
							'application/x-www-form-urlencoded; charset=UTF-8'
						);
						request.setRequestHeader( 'x-requested-with', 'XMLHttpRequest' );

						request.onreadystatechange = function () {
							if ( this.readyState === XMLHttpRequest.DONE && this.status === 200 ) {
								forEachNode( form.querySelectorAll( 'img.loading' ), function ( img ) {
									hideNode( img );
								} );

								if ( this.response === '1' || this.response === '2' || this.response === '3' ) {
									showNode( dialog.querySelector( '.errors-' + this.response ) );
									dialog.querySelector( 'input[type=submit]' ).removeAttribute( 'disabled' );
									showNode( dialog.querySelector( 'a.sharing_cancel' ) );

									if ( typeof grecaptcha === 'object' && typeof grecaptcha.reset === 'function' ) {
										grecaptcha.reset();
									}
								} else {
									hideNode( form );
									var temp = document.createElement( 'div' );
									temp.innerHTML = this.response;
									dialog.appendChild( temp.firstChild );
									showNode( dialog.querySelector( 'a.sharing_cancel' ) );
									var closeButton = dialog.querySelector( '.response a.sharing_cancel' );
									if ( closeButton ) {
										closeButton.addEventListener( 'click', function ( event ) {
											event.preventDefault();
											event.stopPropagation();

											closeEmailDialog();
											hideNode( document.querySelector( '#sharing_background' ) );
										} );
									}
								}
							}
						};

						request.send( data );

						return;
					}

					forEachNode( dialog.querySelectorAll( 'img.loading' ), function ( img ) {
						hideNode( img );
					} );
					submitButton.removeAttribute( 'disabled' );
					showNode( dialog.querySelector( 'a.sharing_cancel' ) );
					forEachNode( dialog.querySelectorAll( '.errors-1' ), function ( error ) {
						showNode( error );
					} );
				} );
			} );
		} );

		forEachNode(
			document.querySelectorAll( 'li.share-email, li.share-custom a.sharing-anchor' ),
			function ( node ) {
				node.classList.add( 'share-service-visible' );
			}
		);
	}
} )();
;
