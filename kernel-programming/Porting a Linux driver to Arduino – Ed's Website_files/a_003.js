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
/**
 * author Christopher Blum
 *    - based on the idea of Remy Sharp, http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 *    - forked from http://github.com/zuk/jquery.inview/
 */
(function ($) {
  var inviewObjects = {}, viewportSize, viewportOffset,
      d = document, w = window, documentElement = d.documentElement, expando = $.expando;

  $.event.special.inview = {
    add: function(data) {
      inviewObjects[data.guid + "-" + this[expando]] = { data: data, $element: $(this) };
    },

    remove: function(data) {
      try { delete inviewObjects[data.guid + "-" + this[expando]]; } catch(e) {}
    }
  };

  function getViewportSize() {
    var mode, domObject, size = { height: w.innerHeight, width: w.innerWidth };

    // if this is correct then return it. iPad has compat Mode, so will
    // go into check clientHeight/clientWidth (which has the wrong value).
    if (!size.height) {
      mode = d.compatMode;
      if (mode || !$.support.boxModel) { // IE, Gecko
        domObject = mode === 'CSS1Compat' ?
          documentElement : // Standards
          d.body; // Quirks
        size = {
          height: domObject.clientHeight,
          width:  domObject.clientWidth
        };
      }
    }

    return size;
  }

  function getViewportOffset() {
    return {
      top:  w.pageYOffset || documentElement.scrollTop   || d.body.scrollTop,
      left: w.pageXOffset || documentElement.scrollLeft  || d.body.scrollLeft
    };
  }

  function checkInView() {
    var $elements = $(), elementsLength, i = 0;

    $.each(inviewObjects, function(i, inviewObject) {
      var selector  = inviewObject.data.selector,
          $element  = inviewObject.$element;
      $elements = $elements.add(selector ? $element.find(selector) : $element);
    });

    elementsLength = $elements.length;
    if (elementsLength) {
      viewportSize   = viewportSize   || getViewportSize();
      viewportOffset = viewportOffset || getViewportOffset();

      for (; i<elementsLength; i++) {
        // Ignore elements that are not in the DOM tree
        if (!$.contains(documentElement, $elements[i])) {
          continue;
        }

        var element       = $elements[i],
            $element      = $(element),
            elementSize   = {},
            elementOffset = {},
            inView        = $element.data('inview'),
            visiblePartX,
            visiblePartY,
            visiblePartsMerged;

        // for the case where 'display:none' is used in place of 'visibility:hidden'
        // count and sum the above items to get and move closer to the correct values
        // IMPORTANT :: insert element into container empty
        if($element.css('display') == 'none')
        {
            var parentElement = $element.parent();

            elementOffset.top = parentElement.offset().top;
            elementOffset.left = parentElement.offset().left;
            elementSize.height = parentElement.height();
            elementSize.width = parentElement.width();
        } else {
       	    elementSize = { height: $element.height(), width: $element.width() }
       	    elementOffset = $element.offset();
       	}

        // Don't ask me why because I haven't figured out yet:
        // viewportOffset and viewportSize are sometimes suddenly null in Firefox 5.
        // Even though it sounds weird:
        // It seems that the execution of this function is interferred by the onresize/onscroll event
        // where viewportOffset and viewportSize are unset
        if (!viewportOffset || !viewportSize) {
          return;
        }

        if (element.offsetWidth >= 0 && element.offsetHeight >= 0 && element.style.display != "none" &&
            elementOffset.top + elementSize.height > viewportOffset.top &&
            elementOffset.top < viewportOffset.top + viewportSize.height &&
            elementOffset.left + elementSize.width > viewportOffset.left &&
            elementOffset.left < viewportOffset.left + viewportSize.width) {
          visiblePartX = (viewportOffset.left > elementOffset.left ?
            'right' : (viewportOffset.left + viewportSize.width) < (elementOffset.left + elementSize.width) ?
            'left' : 'both');
          visiblePartY = (viewportOffset.top > elementOffset.top ?
            'bottom' : (viewportOffset.top + viewportSize.height) < (elementOffset.top + elementSize.height) ?
            'top' : 'both');
          visiblePartsMerged = visiblePartX + "-" + visiblePartY;
          if (!inView || inView !== visiblePartsMerged) {
            $element.data('inview', visiblePartsMerged).trigger('inview', [true, visiblePartX, visiblePartY]);
          }
        } else if (inView) {
          $element.data('inview', false).trigger('inview', [false]);
        }
      }
    }
  }

  $(w).bind("scroll resize", function() {
    viewportSize = viewportOffset = null;
  });

  // IE < 9 scrolls to focused elements without firing the "scroll" event
  if (!documentElement.addEventListener && documentElement.attachEvent) {
    documentElement.attachEvent("onfocusin", function() {
      viewportOffset = null;
    });
  }

  // Use setInterval in order to also make sure this captures elements within
  // "overflow:scroll" elements or elements that appeared in the dom tree due to
  // dom manipulation and reflow
  // old: $(window).scroll(checkInView);
  //
  // By the way, iOS (iPad, iPhone, ...) seems to not execute, or at least delays
  // intervals while the user scrolls. Therefore the inview event might fire a bit late there
  setInterval(checkInView, 250);
})(jQuery);;
/* global Jetpack, JSON */
/**
 * Resizeable Iframes.
 *
 * Start listening to resize postMessage events for selected iframes:
 * $( selector ).Jetpack( 'resizeable' );
 * - OR -
 * Jetpack.resizeable( 'on', context );
 *
 * Resize selected iframes:
 * $( selector ).Jetpack( 'resizeable', 'resize', { width: 100, height: 200 } );
 * - OR -
 * Jetpack.resizeable( 'resize', { width: 100, height: 200 }, context );
 *
 * Stop listening to resize postMessage events for selected iframes:
 * $( selector ).Jetpack( 'resizeable', 'off' );
 * - OR -
 * Jetpack.resizeable( 'off', context );
 *
 * Stop listening to all resize postMessage events:
 * Jetpack.resizeable( 'off' );
 */
( function ( $ ) {
	var listening = false, // Are we listening for resize postMessage events
		sourceOrigins = [], // What origins are allowed to send resize postMessage events
		$sources = false, // What iframe elements are we tracking resize postMessage events from
		URLtoOrigin, // Utility to convert URLs into origins
		setupListener, // Binds global resize postMessage event handler
		destroyListener, // Unbinds global resize postMessage event handler
		methods; // Jetpack.resizeable methods

	// Setup the Jetpack global
	if ( 'undefined' === typeof window.Jetpack ) {
		window.Jetpack = {
			/**
			 * Handles the two different calling methods:
			 * $( selector ).Jetpack( 'namespace', 'method', context ) // here, context is optional and is used to filter the collection
			 * - vs. -
			 * Jetpack.namespace( 'method', context ) // here context defines the collection
			 *
			 * @internal
			 *
			 * Call as: Jetpack.getTarget.call( this, context )
			 *
			 * @param string context: jQuery selector
			 * @return jQuery|undefined object on which to perform operations or undefined when context cannot be determined
			 */
			getTarget: function ( context ) {
				if ( this instanceof jQuery ) {
					return context ? this.filter( context ) : this;
				}

				return context ? $( context ) : context;
			},
		};
	}

	// Setup the Jetpack jQuery method
	if ( 'undefined' === typeof $.fn.Jetpack ) {
		/**
		 * Dispatches calls to the correct namespace
		 *
		 * @param string namespace
		 * @param ...
		 * @return mixed|jQuery (chainable)
		 */
		$.fn.Jetpack = function ( namespace ) {
			if ( 'function' === typeof Jetpack[ namespace ] ) {
				// Send the call to the correct Jetpack.namespace
				return Jetpack[ namespace ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
			} else {
				$.error( 'Namespace "' + namespace + '" does not exist on jQuery.Jetpack' );
			}
		};
	}

	// Define Jetpack.resizeable() namespace to just always bail if no postMessage
	if ( 'function' !== typeof window.postMessage ) {
		$.extend( window.Jetpack, {
			/**
			 * Defines the Jetpack.resizeable() namespace.
			 * See below for non-trivial definition for browsers with postMessage.
			 */
			resizeable: function () {
				$.error( 'Browser does not support window.postMessage' );
			},
		} );

		return;
	}

	/**
	 * Utility to convert URLs into origins
	 *
	 * http://example.com:port/path?query#fragment -> http://example.com:port
	 *
	 * @param string URL
	 * @return string origin
	 */
	URLtoOrigin = function ( URL ) {
		if ( ! URL.match( /^https?:\/\// ) ) {
			URL = document.location.href;
		}
		return URL.split( '/' ).slice( 0, 3 ).join( '/' );
	};

	/**
	 * Binds global resize postMessage event handler
	 */
	setupListener = function () {
		listening = true;

		$( window ).on( 'message.JetpackResizeableIframe', function ( e ) {
			var event = e.originalEvent,
				data;

			// Ensure origin is allowed
			if ( -1 === $.inArray( event.origin, sourceOrigins ) ) {
				return;
			}

			// Some browsers send structured data, some send JSON strings
			if ( 'object' === typeof event.data ) {
				data = event.data.data;
			} else {
				try {
					data = JSON.parse( event.data );
				} catch ( err ) {
					data = false;
				}
			}

			if ( ! data.data ) {
				return;
			}

			// Un-nest
			data = data.data;

			// Is it a resize event?
			if ( 'undefined' === typeof data.action || 'resize' !== data.action ) {
				return;
			}

			// Find the correct iframe and resize it
			$sources
				.filter( function () {
					if ( 'undefined' !== typeof data.name ) {
						return this.name === data.name;
					} else {
						return event.source === this.contentWindow;
					}
				} )
				.first()
				.Jetpack( 'resizeable', 'resize', data );
		} );
	};

	/**
	 * Unbinds global resize postMessage event handler
	 */
	destroyListener = function () {
		listening = false;
		$( window ).off( 'message.JetpackResizeableIframe' );

		sourceOrigins = [];
		$( '.jetpack-resizeable' ).removeClass( 'jetpack-resizeable' );
		$sources = false;
	};

	// Methods for Jetpack.resizeable() namespace
	methods = {
		/**
		 * Start listening for resize postMessage events on the given iframes
		 *
		 * Call statically as: Jetpack.resizeable( 'on', context )
		 * Call as: $( selector ).Jetpack( 'resizeable', 'on', context ) // context optional: used to filter the collectino
		 *
		 * @param string context jQuery selector.
		 * @return jQuery (chainable)
		 */
		on: function ( context ) {
			var target = Jetpack.getTarget.call( this, context );

			if ( ! listening ) {
				setupListener();
			}

			target
				.each( function () {
					sourceOrigins.push( URLtoOrigin( $( this ).attr( 'src' ) ) );
				} )
				.addClass( 'jetpack-resizeable' );

			$sources = $( '.jetpack-resizeable' );

			return target;
		},

		/**
		 * Stop listening for resize postMessage events on the given iframes
		 *
		 * Call statically as: Jetpack.resizeable( 'off', context )
		 * Call as: $( selector ).Jetpack( 'resizeable', 'off', context ) // context optional: used to filter the collectino
		 *
		 * @param string context jQuery selector
		 * @return jQuery (chainable)
		 */
		off: function ( context ) {
			var target = Jetpack.getTarget.call( this, context );

			if ( 'undefined' === typeof target ) {
				destroyListener();

				return target;
			}

			target
				.each( function () {
					var origin = URLtoOrigin( $( this ).attr( 'src' ) ),
						pos = $.inArray( origin, sourceOrigins );

					if ( -1 !== pos ) {
						sourceOrigins.splice( pos, 1 );
					}
				} )
				.removeClass( 'jetpack-resizeable' );

			$sources = $( '.jetpack-resizeable' );

			return target;
		},

		/**
		 * Resize the given iframes
		 *
		 * Call statically as: Jetpack.resizeable( 'resize', dimensions, context )
		 * Call as: $( selector ).Jetpack( 'resizeable', 'resize', dimensions, context ) // context optional: used to filter the collectino
		 *
		 * @param object dimensions in pixels: { width: (int), height: (int) }
		 * @param string context jQuery selector
		 * @return jQuery (chainable)
		 */
		resize: function ( dimensions, context ) {
			var target = Jetpack.getTarget.call( this, context );

			$.each( [ 'width', 'height' ], function ( i, variable ) {
				var value = 0,
					container;
				if ( 'undefined' !== typeof dimensions[ variable ] ) {
					value = parseInt( dimensions[ variable ], 10 );
				}

				if ( 0 !== value ) {
					target[ variable ]( value );
					container = target.parent();
					if ( container.hasClass( 'slim-likes-widget' ) ) {
						container[ variable ]( value );
					}
				}
			} );

			return target;
		},
	};

	// Define Jetpack.resizeable() namespace
	$.extend( window.Jetpack, {
		/**
		 * Defines the Jetpack.resizeable() namespace.
		 * See above for trivial definition for browsers with no postMessage.
		 *
		 * @param string method
		 * @param ...
		 * @return mixed|jQuery (chainable)
		 */
		resizeable: function ( method ) {
			if ( methods[ method ] ) {
				// Send the call to the correct Jetpack.resizeable() method
				return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
			} else if ( ! method ) {
				// By default, send to Jetpack.resizeable( 'on' ), which isn't useful in that form but is when called as
				// jQuery( selector ).Jetpack( 'resizeable' )
				return methods.on.apply( this );
			} else {
				$.error( 'Method ' + method + ' does not exist on Jetpack.resizeable' );
			}
		},
	} );
} )( jQuery );
;
/* global pm, wpcom_reblog */

var jetpackLikesWidgetQueue = [];
var jetpackLikesWidgetBatch = [];
var jetpackLikesMasterReady = false;

function JetpackLikespostMessage( message, target ) {
	if ( 'string' === typeof message ){
		try {
			message = JSON.parse( message );
		} catch(e) {
			return;
		}
	}

	pm( {
		target: target,
		type: 'likesMessage',
		data: message,
		origin: '*'
	} );
}

function JetpackLikesBatchHandler() {
	var requests = [];
	jQuery( 'div.jetpack-likes-widget-unloaded' ).each( function() {
		if ( jetpackLikesWidgetBatch.indexOf( this.id ) > -1 ) {
			return;
		}
		jetpackLikesWidgetBatch.push( this.id );
		var regex = /like-(post|comment)-wrapper-(\d+)-(\d+)-(\w+)/,
			match = regex.exec( this.id ),
			info;

		if ( ! match || match.length !== 5 ) {
			return;
		}

		info = {
			blog_id: match[2],
			width:   this.width
		};

		if ( 'post' === match[1] ) {
			info.post_id = match[3];
		} else if ( 'comment' === match[1] ) {
			info.comment_id = match[3];
		}

		info.obj_id = match[4];

		requests.push( info );
	});

	if ( requests.length > 0 ) {
		JetpackLikespostMessage( { event: 'initialBatch', requests: requests }, window.frames['likes-master'] );
	}
}

function JetpackLikesMessageListener( event, message ) {
	var allowedOrigin, $container, $list, offset, rowLength, height, scrollbarWidth;

	if ( 'undefined' === typeof event.event ) {
		return;
	}

	// We only allow messages from one origin
	allowedOrigin = window.location.protocol + '//widgets.wp.com';
	if ( allowedOrigin !== message.origin ) {
		return;
	}

	if ( 'masterReady' === event.event ) {
		jQuery( document ).ready( function() {
			jetpackLikesMasterReady = true;

			var stylesData = {
					event: 'injectStyles'
				},
				$sdTextColor = jQuery( '.sd-text-color' ),
				$sdLinkColor = jQuery( '.sd-link-color' );

			if ( jQuery( 'iframe.admin-bar-likes-widget' ).length > 0 ) {
				JetpackLikespostMessage( { event: 'adminBarEnabled' }, window.frames[ 'likes-master' ] );

				stylesData.adminBarStyles = {
					background: jQuery( '#wpadminbar .quicklinks li#wp-admin-bar-wpl-like > a' ).css( 'background' ),
					isRtl: ( 'rtl' === jQuery( '#wpadminbar' ).css( 'direction' ) )
				};
			}

			// enable reblogs if we're on a single post page
			if ( jQuery( 'body' ).hasClass( 'single' ) ) {
				JetpackLikespostMessage( { event: 'reblogsEnabled' }, window.frames[ 'likes-master' ] );
			}

			if ( ! window.addEventListener ) {
				jQuery( '#wp-admin-bar-admin-bar-likes-widget' ).hide();
			}

			stylesData.textStyles = {
				color:          $sdTextColor.css( 'color' ),
				fontFamily:     $sdTextColor.css( 'font-family' ),
				fontSize:       $sdTextColor.css( 'font-size' ),
				direction:      $sdTextColor.css( 'direction' ),
				fontWeight:     $sdTextColor.css( 'font-weight' ),
				fontStyle:      $sdTextColor.css( 'font-style' ),
				textDecoration: $sdTextColor.css('text-decoration')
			};

			stylesData.linkStyles = {
				color:          $sdLinkColor.css('color'),
				fontFamily:     $sdLinkColor.css('font-family'),
				fontSize:       $sdLinkColor.css('font-size'),
				textDecoration: $sdLinkColor.css('text-decoration'),
				fontWeight:     $sdLinkColor.css( 'font-weight' ),
				fontStyle:      $sdLinkColor.css( 'font-style' )
			};

			JetpackLikespostMessage( stylesData, window.frames[ 'likes-master' ] );

			JetpackLikesBatchHandler();

			jQuery( document ).on( 'inview', 'div.jetpack-likes-widget-unloaded', function() {
				jetpackLikesWidgetQueue.push( this.id );
			});
		});
	}

	if ( 'showLikeWidget' === event.event ) {
		jQuery( '#' + event.id + ' .post-likes-widget-placeholder'  ).fadeOut( 'fast', function() {
			jQuery( '#' + event.id + ' .post-likes-widget' ).fadeIn( 'fast', function() {
				JetpackLikespostMessage( { event: 'likeWidgetDisplayed', blog_id: event.blog_id, post_id: event.post_id, obj_id: event.obj_id }, window.frames['likes-master'] );
			});
		});
	}

	if ( 'clickReblogFlair' === event.event ) {
		wpcom_reblog.toggle_reblog_box_flair( event.obj_id );
	}

	if ( 'showOtherGravatars' === event.event ) {
		$container = jQuery( '#likes-other-gravatars' );
		$list = $container.find( 'ul' );

		$container.hide();
		$list.html( '' );

		$container.find( '.likes-text span' ).text( event.total );

		jQuery.each( event.likers, function( i, liker ) {
			var element = jQuery( '<li><a><img /></a></li>' );
			element.addClass( liker.css_class );

			element.find( 'a' ).
				attr({
					href: liker.profile_URL,
					rel: 'nofollow',
					target: '_parent'
				}).
				addClass( 'wpl-liker' );

			element.find( 'img' ).
				attr({
					src: liker.avatar_URL,
					alt: liker.name
				}).
				css({
					width: '30px',
					height: '30px',
					paddingRight: '3px'
				});

			$list.append( element );
		} );

		offset = jQuery( '[name=\'' + event.parent + '\']' ).offset();

		$container.css( 'left', offset.left + event.position.left - 10 + 'px' );
		$container.css( 'top', offset.top + event.position.top - 33 + 'px' );

		rowLength = Math.floor( event.width / 37 );
		height = ( Math.ceil( event.likers.length / rowLength ) * 37 ) + 13;
		if ( height > 204 ) {
			height = 204;
		}

		$container.css( 'height', height + 'px' );
		$container.css( 'width', rowLength * 37 - 7 + 'px' );

		$list.css( 'width', rowLength * 37 + 'px' );

		$container.fadeIn( 'slow' );

		scrollbarWidth = $list[0].offsetWidth - $list[0].clientWidth;
		if ( scrollbarWidth > 0 ) {
			$container.width( $container.width() + scrollbarWidth );
			$list.width( $list.width() + scrollbarWidth );
		}
	}
}

pm.bind( 'likesMessage', JetpackLikesMessageListener );

jQuery( document ).click( function( e ) {
	var $container = jQuery( '#likes-other-gravatars' );

	if ( $container.has( e.target ).length === 0 ) {
		$container.fadeOut( 'slow' );
	}
});

function JetpackLikesWidgetQueueHandler() {
	var $wrapper, wrapperID, found;
	if ( ! jetpackLikesMasterReady ) {
		setTimeout( JetpackLikesWidgetQueueHandler, 500 );
		return;
	}

	if ( jetpackLikesWidgetQueue.length > 0 ) {
		// We may have a widget that needs creating now
		found = false;
		while( jetpackLikesWidgetQueue.length > 0 ) {
			// Grab the first member of the queue that isn't already loading.
			wrapperID = jetpackLikesWidgetQueue.splice( 0, 1 )[0];
			if ( jQuery( '#' + wrapperID ).hasClass( 'jetpack-likes-widget-unloaded' ) ) {
				found = true;
				break;
			}
		}
		if ( ! found ) {
			setTimeout( JetpackLikesWidgetQueueHandler, 500 );
			return;
		}
	} else if ( jQuery( 'div.jetpack-likes-widget-unloaded' ).length > 0 ) {
		// Grab any unloaded widgets for a batch request
		JetpackLikesBatchHandler();

		// Get the next unloaded widget
		wrapperID = jQuery( 'div.jetpack-likes-widget-unloaded' ).first()[0].id;
		if ( ! wrapperID ) {
			// Everything is currently loaded
			setTimeout( JetpackLikesWidgetQueueHandler, 500 );
			return;
		}
	}

	if ( 'undefined' === typeof wrapperID ) {
		setTimeout( JetpackLikesWidgetQueueHandler, 500 );
		return;
	}

	$wrapper = jQuery( '#' + wrapperID );
	$wrapper.find( 'iframe' ).remove();

	var postLikesFrame = document.createElement( 'iframe' );

	postLikesFrame.classList.add( 'post-likes-widget', 'jetpack-likes-widget' );
	postLikesFrame.name = $wrapper.data( 'name' );
	postLikesFrame.src = $wrapper.data( 'src' );
	postLikesFrame.height = '55px';
	postLikesFrame.width = '100%';
	postLikesFrame.frameBorder = '0';
	postLikesFrame.title = $wrapper.data( 'title' );

	if ( $wrapper.hasClass( 'slim-likes-widget' ) ) {
		postLikesFrame.height = '22px';
		postLikesFrame.width = '68px';
		postLikesFrame.scrolling = 'no';
	}

	$wrapper.find( '.post-likes-widget-placeholder' ).after( postLikesFrame );

	$wrapper.removeClass( 'jetpack-likes-widget-unloaded' ).addClass( 'jetpack-likes-widget-loading' );

	$wrapper.find( 'iframe' ).load( function( e ) {
		var $iframe = jQuery( e.target );
		$wrapper.removeClass( 'jetpack-likes-widget-loading' ).addClass( 'jetpack-likes-widget-loaded' );

		JetpackLikespostMessage( { event: 'loadLikeWidget', name: $iframe.attr( 'name' ), width: $iframe.width(), domain: window.location.hostname }, window.frames[ 'likes-master' ] );

		if ( $wrapper.hasClass( 'slim-likes-widget' ) ) {
			$wrapper.find( 'iframe' ).Jetpack( 'resizeable' );
		}
	});
	setTimeout( JetpackLikesWidgetQueueHandler, 250 );
}
JetpackLikesWidgetQueueHandler();
;
/*
 * Swipe 2.0
 *
 * Brad Birdsall
 * Copyright 2013, MIT License
 *
*/

function Swipe(container, options) {

  "use strict";

  // utilities
  var noop = function() {}; // simple no operation function
  var offloadFn = function(fn) { setTimeout(fn || noop, 0) }; // offload a functions execution
  
  // check browser capabilities
  var browser = {
    addEventListener: !!window.addEventListener,
    touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
    transitions: (function(temp) {
      var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
      for ( var i in props ) if (temp.style[ props[i] ] !== undefined) return true;
      return false;
    })(document.createElement('swipe'))
  };

  // quit if no root element
  if (!container) return;
  var element = container.children[0];
  var slides, slidePos, width, length;
  options = options || {};
  var index = parseInt(options.startSlide, 10) || 0;
  var speed = options.speed || 300;
  options.continuous = options.continuous !== undefined ? options.continuous : true;

  function setup() {

    // cache slides
    slides = element.children;
    length = slides.length;

    // set continuous to false if only one slide
    if (slides.length < 2) options.continuous = false;

    //special case if two slides
    if (browser.transitions && options.continuous && slides.length < 3) {
      element.appendChild(slides[0].cloneNode(true));
      element.appendChild(element.children[1].cloneNode(true));
      slides = element.children;
    }

    // create an array to store current positions of each slide
    slidePos = new Array(slides.length);

    // determine width of each slide
    width = container.getBoundingClientRect().width || container.offsetWidth;

    element.style.width = (slides.length * width) + 'px';

    // stack elements
    var pos = slides.length;
    while(pos--) {

      var slide = slides[pos];

      slide.style.width = width + 'px';
      slide.setAttribute('data-index', pos);

      if (browser.transitions) {
        slide.style.left = (pos * -width) + 'px';
        move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
      }

    }

    // reposition elements before and after index
    if (options.continuous && browser.transitions) {
      move(circle(index-1), -width, 0);
      move(circle(index+1), width, 0);
    }

    if (!browser.transitions) element.style.left = (index * -width) + 'px';

    container.style.visibility = 'visible';

  }

  function prev() {

    if (options.continuous) slide(index-1);
    else if (index) slide(index-1);

  }

  function next() {

    if (options.continuous) slide(index+1);
    else if (index < slides.length - 1) slide(index+1);

  }

  function circle(index) {

    // a simple positive modulo using slides.length
    return (slides.length + (index % slides.length)) % slides.length;

  }

  function slide(to, slideSpeed) {

    // do nothing if already on requested slide
    if (index == to) return;
    
    if (browser.transitions) {

      var direction = Math.abs(index-to) / (index-to); // 1: backward, -1: forward

      // get the actual position of the slide
      if (options.continuous) {
        var natural_direction = direction;
        direction = -slidePos[circle(to)] / width;

        // if going forward but to < index, use to = slides.length + to
        // if going backward but to > index, use to = -slides.length + to
        if (direction !== natural_direction) to =  -direction * slides.length + to;

      }

      var diff = Math.abs(index-to) - 1;

      // move all the slides between index and to in the right direction
      while (diff--) move( circle((to > index ? to : index) - diff - 1), width * direction, 0);
            
      to = circle(to);

      move(index, width * direction, slideSpeed || speed);
      move(to, 0, slideSpeed || speed);

      if (options.continuous) move(circle(to - direction), -(width * direction), 0); // we need to get the next in place
      
    } else {     
      
      to = circle(to);
      animate(index * -width, to * -width, slideSpeed || speed);
      //no fallback for a circular continuous if the browser does not accept transitions
    }

    index = to;
    offloadFn(options.callback && options.callback(index, slides[index]));
  }

  function move(index, dist, speed) {

    translate(index, dist, speed);
    slidePos[index] = dist;

  }

  function translate(index, dist, speed) {

    var slide = slides[index];
    var style = slide && slide.style;

    if (!style) return;

    style.webkitTransitionDuration = 
    style.MozTransitionDuration = 
    style.msTransitionDuration = 
    style.OTransitionDuration = 
    style.transitionDuration = speed + 'ms';

    style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
    style.msTransform = 
    style.MozTransform = 
    style.OTransform = 'translateX(' + dist + 'px)';

  }

  function animate(from, to, speed) {

    // if not an animation, just reposition
    if (!speed) {

      element.style.left = to + 'px';
      return;

    }
    
    var start = +new Date;
    
    var timer = setInterval(function() {

      var timeElap = +new Date - start;
      
      if (timeElap > speed) {

        element.style.left = to + 'px';

        if (delay) begin();

        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

        clearInterval(timer);
        return;

      }

      element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px';

    }, 4);

  }

  // setup auto slideshow
  var delay = options.auto || 0;
  var interval;

  function begin() {

    interval = setTimeout(next, delay);

  }

  function stop() {

    delay = 0;
    clearTimeout(interval);

  }


  // setup initial vars
  var start = {};
  var delta = {};
  var isScrolling;      

  // setup event capturing
  var events = {

    handleEvent: function(event) {

      switch (event.type) {
        case 'touchstart': this.start(event); break;
        case 'touchmove': this.move(event); break;
        case 'touchend': offloadFn(this.end(event)); break;
        case 'webkitTransitionEnd':
        case 'msTransitionEnd':
        case 'oTransitionEnd':
        case 'otransitionend':
        case 'transitionend': offloadFn(this.transitionEnd(event)); break;
        case 'resize': offloadFn(setup.call()); break;
      }

      if (options.stopPropagation) event.stopPropagation();

    },
    start: function(event) {

      var touches = event.touches[0];

      // measure start values
      start = {

        // get initial touch coords
        x: touches.pageX,
        y: touches.pageY,

        // store time to determine touch duration
        time: +new Date

      };
      
      // used for testing first move event
      isScrolling = undefined;

      // reset delta and end measurements
      delta = {};

      // attach touchmove and touchend listeners
      element.addEventListener('touchmove', this, false);
      element.addEventListener('touchend', this, false);

    },
    move: function(event) {

      // ensure swiping with one touch and not pinching
      if ( event.touches.length > 1 || event.scale && event.scale !== 1) return

      if (options.disableScroll) event.preventDefault();

      var touches = event.touches[0];

      // measure change in x and y
      delta = {
        x: touches.pageX - start.x,
        y: touches.pageY - start.y
      }

      // determine if scrolling test has run - one time test
      if ( typeof isScrolling == 'undefined') {
        isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
      }

      // if user is not trying to scroll vertically
      if (!isScrolling) {

        // prevent native scrolling 
        event.preventDefault();

        // stop slideshow
        stop();

        // increase resistance if first or last slide
        if (options.continuous) { // we don't add resistance at the end

          translate(circle(index-1), delta.x + slidePos[circle(index-1)], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(circle(index+1), delta.x + slidePos[circle(index+1)], 0);

        } else {

          delta.x = 
            delta.x / 
              ( (!index && delta.x > 0               // if first slide and sliding left
                || index == slides.length - 1        // or if last slide and sliding right
                && delta.x < 0                       // and if sliding at all
              ) ?                      
              ( Math.abs(delta.x) / width + 1 )      // determine resistance level
              : 1 );                                 // no resistance if false
          
          // translate 1:1
          translate(index-1, delta.x + slidePos[index-1], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(index+1, delta.x + slidePos[index+1], 0);
        }

      }

    },
    end: function(event) {

      // measure duration
      var duration = +new Date - start.time;

      // determine if slide attempt triggers next/prev slide
      var isValidSlide = 
            Number(duration) < 250               // if slide duration is less than 250ms
            && Math.abs(delta.x) > 20            // and if slide amt is greater than 20px
            || Math.abs(delta.x) > width/2;      // or if slide amt is greater than half the width

      // determine if slide attempt is past start and end
      var isPastBounds = 
            !index && delta.x > 0                            // if first slide and slide amt is greater than 0
            || index == slides.length - 1 && delta.x < 0;    // or if last slide and slide amt is less than 0

      if (options.continuous) isPastBounds = false;
      
      // determine direction of swipe (true:right, false:left)
      var direction = delta.x < 0;

      // if not scrolling vertically
      if (!isScrolling) {

        if (isValidSlide && !isPastBounds) {

          if (direction) {

            if (options.continuous) { // we need to get the next in this direction in place

              move(circle(index-1), -width, 0);
              move(circle(index+2), width, 0);

            } else {
              move(index-1, -width, 0);
            }

            move(index, slidePos[index]-width, speed);
            move(circle(index+1), slidePos[circle(index+1)]-width, speed);
            index = circle(index+1);  
                      
          } else {
            if (options.continuous) { // we need to get the next in this direction in place

              move(circle(index+1), width, 0);
              move(circle(index-2), -width, 0);

            } else {
              move(index+1, width, 0);
            }

            move(index, slidePos[index]+width, speed);
            move(circle(index-1), slidePos[circle(index-1)]+width, speed);
            index = circle(index-1);

          }

          options.callback && options.callback(index, slides[index]);

        } else {

          if (options.continuous) {

            move(circle(index-1), -width, speed);
            move(index, 0, speed);
            move(circle(index+1), width, speed);

          } else {

            move(index-1, -width, speed);
            move(index, 0, speed);
            move(index+1, width, speed);
          }

        }

      }

      // kill touchmove and touchend event listeners until touchstart called again
      element.removeEventListener('touchmove', events, false)
      element.removeEventListener('touchend', events, false)

    },
    transitionEnd: function(event) {

      if (parseInt(event.target.getAttribute('data-index'), 10) == index) {
        
        if (delay) begin();

        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

      }

    }

  }

  // trigger setup
  setup();

  // start auto slideshow if applicable
  if (delay) begin();


  // add event listeners
  if (browser.addEventListener) {
    
    // set touchstart event on element    
    if (browser.touch) element.addEventListener('touchstart', events, false);

    if (browser.transitions) {
      element.addEventListener('webkitTransitionEnd', events, false);
      element.addEventListener('msTransitionEnd', events, false);
      element.addEventListener('oTransitionEnd', events, false);
      element.addEventListener('otransitionend', events, false);
      element.addEventListener('transitionend', events, false);
    }

    // set resize event on window
    window.addEventListener('resize', events, false);

  } else {

    window.onresize = function () { setup() }; // to play nice with old IE

  }

  // expose the Swipe API
  return {
    setup: function() {

      setup();

    },
    slide: function(to, speed) {
      
      // cancel slideshow
      stop();
      
      slide(to, speed);

    },
    prev: function() {

      // cancel slideshow
      stop();

      prev();

    },
    next: function() {

      // cancel slideshow
      stop();

      next();

    },
    getPos: function() {

      // return current index position
      return index;

    },
    getNumSlides: function() {
      
      // return total number of slides
      return length;
    },
    kill: function() {

      // cancel slideshow
      stop();

      // reset element
      element.style.width = 'auto';
      element.style.left = 0;

      // reset slides
      var pos = slides.length;
      while(pos--) {

        var slide = slides[pos];
        slide.style.width = '100%';
        slide.style.left = 0;

        if (browser.transitions) translate(pos, 0, 0);

      }

      // removed event listeners
      if (browser.addEventListener) {

        // remove current event listeners
        element.removeEventListener('touchstart', events, false);
        element.removeEventListener('webkitTransitionEnd', events, false);
        element.removeEventListener('msTransitionEnd', events, false);
        element.removeEventListener('oTransitionEnd', events, false);
        element.removeEventListener('otransitionend', events, false);
        element.removeEventListener('transitionend', events, false);
        window.removeEventListener('resize', events, false);

      }
      else {

        window.onresize = null;

      }

    }
  }

}


if ( window.jQuery || window.Zepto ) {
  (function($) {
    $.fn.Swipe = function(params) {
      return this.each(function() {
        $(this).data('Swipe', new Swipe($(this)[0], params));
      });
    }
  })( window.jQuery || window.Zepto )
}
;
/**
 * Comment Likes - JavaScript
 *
 * This handles liking and unliking comments, as well as viewing who has
 * liked a particular comment.
 *
 * @dependency  jQuery
 * @dependency  Swipe
 *
 * @package     Comment_Likes
 * @subpackage  JavaScript
 */
jQuery( function() {
	var $ = jQuery;
	var extWin;
	var extWinCheck;
	var commentLikeEvent;

	// The O2 theme re-injects this script into the DOM when somebody
	// creates a new thread and the page is already open, but we don't
	// want to run this script a second time.
	if ( window.comment_likes_loaded ) return;
	window.comment_likes_loaded = true;

	// Client-side cache of who liked a particular comment to avoid
	// having to hit the server multiple times for the same data.
	var comment_like_cache = {};

	/**
	 * Parse the comment ID from a comment like link.
	 */
	var get_comment_id = function( $link ) {
		var comment_id = $link.attr( 'href' ).split( 'like_comment=' );
		return comment_id[1].split( '&_wpnonce=' )[0];
	};

	/**
	 * Handle an ajax action on the comment like link.
	 */
	var handle_link_action = function( $link, action, comment_id, callback ) {
		var nonce = $link.attr( 'href' ).split( '_wpnonce=' )[1];

		$.post( '/wp-admin/admin-ajax.php', {
			'action': action,
			'_wpnonce': nonce,
			'like_comment': comment_id,
			'blog_id': Number( $link.data( 'blog' ) )
		}, callback, 'json' );
	};

	// Overlay used for displaying comment like info.
	var overlay = {

		// Overlay element.
		$el: $( '<div/>' )
			.appendTo( 'body' )
			.addClass( 'comment-likes-overlay' )
			.hide()
			.mouseenter( function() {
				// Don't hide the overlay if the user is mousing over it.
				overlay.cancel_hide();
			} ).mouseleave( function() {
				overlay.request_hide();
			} ),

		// Inner contents of overlay.
		$inner: null,

		// Instance of the Swipe library.
		swipe: null,

		// Initialise the overlay for use, removing any old content.
		clear: function() {
			// Unload any previous instance of Swipe (to avoid leaking a global
			// event handler). This is done before clearing the contents of the
			// overlay because Swipe expects the slides to still be present.
			if ( this.swipe ) {
				this.swipe.kill();
				this.swipe = null;
			}
			this.$el.html( '' );
			this.$inner = $( '<div/>' ).addClass( 'inner' ).appendTo( this.$el );
		},

		/**
		 * Construct a list (<ul>) of user (gravatar, name) details.
		 *
		 * @param  data     liker data returned from the server
		 * @param  klass    CSS class to apply to the <ul> element
		 * @param  start    index of user to start at
		 * @param  length   number of users to include in the list
		 *
		 * @return          HTML for the list
		 */
		get_user_bits: function( data, klass, start, length ) {
			start = start || 0;
			var last = start + ( length || data.length );
			last = ( last > data.length ) ? data.length : last;
			var html = '<div class="liker-list"><ul class="' + ( klass || '' ) + '">';
			for ( var i = start; i < last; ++i ) {
				var user = data[ i ];
				html += '<li>';
				html += '<a rel="nofollow" title="' + user.display_name_esc + '" href="' + user.profile_url_esc + '"><img src="' + user.avatar_url_esc + '" alt="' + user.display_name_esc + '"  /> <span class="user-name">' + user.display_name_esc + '</span></a>';
				html += '</li>';
			}
			html += '</ul></div>';
			return html;
		},

		/**
		 * Render the display of who has liked this comment. The type of
		 * display depends on how many people have liked the comment.
		 * If more than 10 people have liked the comment, this function
		 * renders navigation controls and sets up the Swipe library for
		 * changing between pages.
		 *
		 * @param link  the element over which the user is hovering
		 * @param data  the results retrieved from the server
		 */
		show_likes: function( $link, data ) {
			this.clear();

			$link.data( 'likeCount', data.length );
			if ( 0 === data.length ) {
				// No likers after all.
				return this.$el.hide();
			}

			this.$inner.css( 'padding', 12 );

			if ( data.length < 6 ) {
				// Only one column needed.
				this.$inner.css( 'max-width', 200 );
				this.$inner.html( this.get_user_bits( data, 'single' ) );

			} else if ( data.length < 11 ) {
				// Two columns, but only one page.
				this.$inner.html( this.get_user_bits( data, 'double' ) );

			} else {
				// Multiple pages.
				this.render_likes_with_pagination( data );
			}

			// Move the overlay into the correct position and then show it.
			this.set_position( $link );
		},

		/**
		 * Render multiple pages of likes with pagination controls.
		 * This function is intended to be called by `show_likes` above.
		 *
		 * @param data  the results retrieved from the server
		 */
		render_likes_with_pagination: function( data ) {
			var page_count = Math.ceil( data.length / 10 );
			// Swipe requires two nested containers.
			var $swipe = $( '<div/>' ).addClass( 'swipe' ).appendTo( this.$inner );
			var $div = $( '<div/>' ).addClass( 'swipe-wrap' ).appendTo( $swipe );
			for ( var i = 0; i < page_count; ++i ) {
				$( this.get_user_bits( data, 'double', i * 10, 10 ) ).appendTo( $div );
			}

			/** Navigation controls.
			 *  This is based on the Newdash controls found in
			 *    reader/recommendations-templates.php
			 */
			var nav_html = '<nav class="slider-nav"><a href="#" class="prev"><span class="noticon noticon-previous" title="Previous" alt="<"></span></a><span class="position">';
			for ( var i = 0; i < page_count; ++i ) {
				nav_html += '<em data-page="' + i + '" class="' + ( ( i === 0 ) ? 'on' : '' ) + '">&bull;</em>';
			}
			nav_html += '</span><a href="#" class="next"><span class="noticon noticon-next" title="Next" alt=">"></span></a></nav>';
			var $nav = $( nav_html ).appendTo( this.$inner );

			/** Set up Swipe. **/

			// Swipe cannot be set up successfully unless its container
			// is visible, so we show it now.
			this.$el.show();

			var swipe = this.swipe = new Swipe( $swipe[0], {
				callback: function( pos ) {
					// Update the pagination indicators.
					//
					// If there are exactly two pages, Swipe has a weird
					// special case where it duplicates both pages and
					// can return index 2 and 3 even though those aren't
					// real pages (see swipe.js, line 47). To deal with
					// this, we use the expression `pos % page_count`.
					pos = pos % page_count;
					$nav.find( 'em' ).each( function() {
						var page = Number( $( this ).data( 'page' ) );
						$( this ).attr( 'class', ( pos === page ) ? 'on' : '' );
					} );
				}
			} );
			$nav.find( 'em' ).on( 'click', function( $e ) {
				// Go to the page corresponding to the indicator clicked.
				swipe.slide( Number( $( this ).data( 'page' ) ) );
				$e.preventDefault();
			} );
			// Previous and next buttons.
			$nav.find( '.prev' ).on( 'click', function( $e ) {
				swipe.prev();
				$e.preventDefault();
			} );
			$nav.find( '.next' ).on( 'click', function( $e ) {
				swipe.next();
				$e.preventDefault();
			} );
		},

		/**
		 * Open the overlay and show a loading message.
		 */
		show_loading_message: function( $link ) {
			this.clear();
			this.$inner.text( comment_like_text.loading );
			this.set_position( $link );
		},

		/**
		 * Position the overlay near the current comment.
		 *
		 * @param $link  element near which to position the overlay
		 */
		set_position: function( $link ) {
			// Prepare a down arrow icon for the bottom of the overlay.
			var $icon = $( '<span/>' )
				.appendTo( this.$el )
				.addClass( 'icon noticon noticon-downarrow' )
				.css( 'text-shadow', '0px 1px 1px rgb(223, 223, 223)' );

			var offset = $link.offset();
			var left = offset.left - ( this.$el.width() - $link.width() ) / 2;
			left = left < 5 ? 5 : left;
			var top = offset.top - this.$el.height() + 5;

			// Check if the overlay would appear off the screen.
			if ( top < ( $( window ).scrollTop() + ( $( '#wpadminbar' ).height() || 0 ) ) ) {
				// We'll display the overlay beneath the link instead.
				top = offset.top + $link.height();
				// Instead of using the down arrow icon, use an up arrow.
				$icon.remove().prependTo( this.$el )
					.removeClass( 'noticon-downarrow')
					.addClass( 'noticon-uparrow' )
					.css( {
						'text-shadow': '0px -1px 1px rgb(223, 223, 223)',
						'vertical-align': 'bottom'
					} );
			}

			this.$el.css( { 'left': left, 'top': top } ).show();

			$icon.css( {
				// The height of the arrow icon differs slightly between browsers,
				// so we compute the margin here to make sure it isn't disjointed
				// from the overlay.
				'margin-top': $icon[0].scrollHeight - 26,
				'margin-bottom': 20 - $icon[0].scrollHeight,

				// Position the arrow to be horizontally centred on the link.
				'padding-left': offset.left - left + ( $link.width() - $icon[0].scrollWidth ) / 2
			} );
		},

		/**
		 * Return whether the overlay is visible.
		 */
		is_visible: function() {
			return ( 'none' !== this.$el.css( 'display' ) );
		},

		// Timeout used for hiding the overlay.
		hide_timeout: null,

		/**
		 * Request that the overlay be hidden after a short delay.
		 */
		request_hide: function() {
			if ( null !== this.hide_timeout ) {
				return;
			}
			var self = this;
			this.hide_timeout = setTimeout( function() {
				self.$el.hide();
				self.clear();
			}, 300 );
		},

		/**
		 * Cancel a request to hide the overlay.
		 */
		cancel_hide: function() {
			if ( null !== this.hide_timeout ) {
				clearTimeout( this.hide_timeout );
				this.hide_timeout = null;
			}
		}
	};

	// The most recent comment for which the user has requested to see
	// who liked it.
	var relevant_comment;

	// Precache after this timeout.
	var precache_timeout = null;

	/**
	 * Fetch the like data for a particular comment.
	 */
	var fetch_like_data = function( $link, comment_id ) {
		comment_like_cache[ comment_id ] = null;

		var $star = $link.parent().parent().find( 'a.comment-like-link' );
		handle_link_action( $star, 'view_comment_likes', comment_id, function( data ) {
			// Populate the cache.
			comment_like_cache[ comment_id ] = data;

			// Only show the overlay if the user is interested.
			if ( overlay.is_visible() && ( relevant_comment === comment_id ) ) {
				overlay.show_likes( $link, data );
			}
		} );
	};

	function readCookie( c ) {
		var nameEQ = c + '=',
			cookieStrings = document.cookie.split( ';' ),
			i, cookieString, num, chunk, pairs, pair, cookie_data;
		for ( i = 0; i < cookieStrings.length; i++ ) {
			cookieString = cookieStrings[ i ];
			while ( cookieString.charAt( 0 ) === ' ' ) {
				cookieString = cookieString.substring( 1, cookieString.length );
			}
			if ( cookieString.indexOf( nameEQ ) === 0 ) {
				chunk = cookieString.substring( nameEQ.length, cookieString.length );
				pairs = chunk.split( '&' );
				cookie_data = {};
				for ( num = pairs.length - 1; num >= 0; num-- ) {
					pair = pairs[ num ].split( '=' );
					cookie_data[ pair[0] ] = decodeURIComponent( pair[1] );
				}
				return cookie_data;
			}
		}
		return null;
	}

	function getServiceData() {
		var data = readCookie( 'wpc_wpc' );
		if ( null === data || 'undefined' === typeof data.access_token || ! data.access_token ) {
			return false;
		}
		return data;
	}

	function readMessage( event ) {
		if ( 'undefined' == typeof event.event ) {
			return;
		}

		if ( 'login' == event.event && event.success ) {
			extWinCheck = setInterval( function() {
				if ( ! extWin || extWin.closed ) {
					clearInterval( extWinCheck );
					if ( getServiceData() ) {

						// Load page in an iframe to get the current comment nonce
						var nonceIframe = document.createElement( 'iframe' );
						nonceIframe.id = 'wp-login-comment-nonce-iframe';
						nonceIframe.style.display = 'none';
						nonceIframe.src = commentLikeEvent + '';
						document.body.appendChild( nonceIframe );

						var commentLikeId = ( commentLikeEvent + '' ).split( 'like_comment=' )[1].split( '&_wpnonce=' )[0];
						var c = false;

						// Set a 5 second timeout to redirect to the comment page without doing the Like as a fallback
						var commentLikeTimeout = setTimeout( function() {
							window.location = commentLikeEvent;
						}, 5000 );

						// Check for a new nonced redirect and use that if available before timing out
						var commentLikeCheck = setInterval( function() {
							c = $( '#wp-login-comment-nonce-iframe' ).contents().find( '#comment-like-' + commentLikeId + ' .comment-like-link' );
							if ( 'undefined' !== typeof c && 'undefined' !== typeof c[0] && 'undefined' !== typeof c[0].href ) {
								clearTimeout( commentLikeTimeout );
								clearInterval( commentLikeCheck );
								window.location = c[0].href;
							}
						}, 100 );
					}
				}
			}, 100 );

			if ( extWin ) {
				if ( ! extWin.closed ) {
					extWin.close();
				}
				extWin = false;
			}

			$( '#wp-login-polling-iframe' ).remove();
		}
	}

	if ( 'undefined' != typeof window.pm ) {
		pm.bind( 'loginMessage', function( e ) { readMessage( e ); } );
	}

	$( 'body' ).on( 'click', 'a.comment-like-link', function( $e ) {
		if ( $( $e.target ).hasClass( 'needs-login' ) ) {
			$e.preventDefault();
			commentLikeEvent = $e.target;
			if ( extWin ) {
				if ( ! extWin.closed ) {
					extWin.close();
				}
				extWin = false;
			}

			$( '#wp-login-polling-iframe' ).remove();

			var url = 'https://wordpress.com/public.api/connect/?action=request&service=wordpress';
			extWin = window.open( url, 'likeconn', 'status=0,toolbar=0,location=1,menubar=0,directories=0,resizable=1,scrollbars=1,height=560,width=500' );

			// Append cookie polling login iframe to this window to wait for user to finish logging in (or cancel)
			var loginIframe = $( "<iframe id='wp-login-polling-iframe'></iframe>" );
			loginIframe.attr( "src", "https://wordpress.com/public.api/connect/?iframe=true" );
			loginIframe.css( "display", "none" );
			$( document.body ).append( loginIframe );

			return false;
		}

		// Record that the user likes or does not like this comment.
		var $star = $( this );
		var comment_id = get_comment_id( $star );
		$star.addClass( 'loading' );
		// Determine whether to like or unlike based on whether the comment is
		// currently liked.
		var action = ( $( 'p#comment-like-' + comment_id ).data( 'liked' ) === 'comment-liked' ) ? 'unlike_comment' : 'like_comment';
		handle_link_action( $star, action, comment_id, function( data ) {
			// Invalidate the like cache for this comment.
			delete comment_like_cache[ comment_id ];

			$( '#comment-like-count-' + data.context ).html( data.display );

			if ( 'like_comment' === action ) {
				$( 'p#comment-like-' + data.context ).removeClass( 'comment-not-liked' )
					.addClass( 'comment-liked' )
					.data( 'liked', 'comment-liked' );
			} else {
				$( 'p#comment-like-' + data.context ).removeClass( 'comment-liked' )
					.addClass( 'comment-not-liked' )
					.data( 'liked', 'comment-not-liked' );
			}

			// Prefetch new data for this comment (if there are likers left).
			var $link = $star.parent().find( 'a.view-likers' );
			if ( 0 !== $link.length ) {
				fetch_like_data( $link, comment_id );
			}

			$star.removeClass( 'loading' );
		} );
		$e.preventDefault();
		$e.stopPropagation();

	} ).on( 'click', 'p.comment-not-liked', function() {
		// When a comment hasn't been liked, make the text clickable, too
		$( this ).find( 'a.comment-like-link' ).click();

	} ).on( 'mouseenter', 'p.comment-likes a.view-likers', function() {
		// Show the user a list of who has liked this comment.

		var $link = $( this );
		if ( 0 === Number( $link.data( 'likeCount' ) || 0 ) ) {
			// No one has liked this comment.
			return;
		}

		// Don't hide the overlay.
		overlay.cancel_hide();

		// Get the comment ID.
		var $star = $link.parent().parent().find( 'a.comment-like-link' );
		var comment_id = relevant_comment = get_comment_id( $star );

		// Check if the list of likes for this comment is already in
		// the cache.
		if ( comment_id in comment_like_cache ) {
			var entry = comment_like_cache[ comment_id ];
			// Only display the likes if the ajax request is
			// actually done.
			if ( null !== entry ) {
				overlay.show_likes( $link, entry );
			} else {
				// Make sure the overlay is visible (in case
				// the user moved the mouse away while loading
				// but then came back before it finished
				// loading).
				overlay.show_loading_message( $link );
			}
			return;
		}

		// Position the "Loading..." overlay.
		overlay.show_loading_message( $link );

		// Fetch the data.
		fetch_like_data( $link, comment_id );

	} ).on( 'mouseleave', 'p.comment-likes a.view-likers', function() {
		// User has moved cursor away - hide the overlay.
		overlay.request_hide();

	} ).on( 'click', 'p.comment-likes a.view-likers', function( $e ) {
		// Don't do anything when clicking on the text.
		$e.preventDefault();

	} ).on( 'mouseenter', '.comment:has(a.comment-like-link)', function() {
		// User is moving over a comment - precache the comment like data.
		if ( null !== precache_timeout ) {
			clearTimeout( precache_timeout );
			precache_timeout = null;
		}

		var $star = $( this ).find( 'a.comment-like-link' );
		var $link = $star.parent().find( 'a.view-likers' );
		if ( 0 === Number( $link.data( 'likeCount' ) || 0 ) ) {
			// No likes.
			return;
		}
		var comment_id = get_comment_id( $star );
		if ( comment_id in comment_like_cache ) {
			// Already in cache.
			return;
		}

		precache_timeout = setTimeout( function() {
			precache_timeout = null;
			if ( comment_id in comment_like_cache ) {
				// Was cached in the interim.
				return;
			}
			fetch_like_data( $link, comment_id );
		}, 1000 );
	} );
} );
;
!function(e){var t={};function n(o){if(t[o])return t[o].exports;var c=t[o]={i:o,l:!1,exports:{}};return e[o].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)n.d(o,c,function(t){return e[t]}.bind(null,c));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=291)}({291:function(e,t){!function(){"use strict";var e=coblocksLigthboxData,t=e.closeLabel,n=e.leftLabel,o=e.rightLabel,c=document.getElementsByClassName("has-lightbox");Array.from(c).forEach((function(e,c){e.className+=" lightbox-"+c+" ",function(e){var c=document.createElement("div");c.setAttribute("class","coblocks-lightbox");var r=document.createElement("div");r.setAttribute("class","coblocks-lightbox__background");var a=document.createElement("div");a.setAttribute("class","coblocks-lightbox__heading");var i=document.createElement("button");i.setAttribute("class","coblocks-lightbox__close"),i.setAttribute("aria-label",t);var l=document.createElement("span");l.setAttribute("class","coblocks-lightbox__count");var s=document.createElement("div");s.setAttribute("class","coblocks-lightbox__image");var u=document.createElement("img"),b=document.createElement("figcaption");b.setAttribute("class","coblocks-lightbox__caption");var d=document.createElement("button");d.setAttribute("class","coblocks-lightbox__arrow coblocks-lightbox__arrow--left");var g=document.createElement("button");g.setAttribute("class","coblocks-lightbox__arrow coblocks-lightbox__arrow--right");var f=document.createElement("div");f.setAttribute("class","arrow-right"),f.setAttribute("aria-label",o);var m=document.createElement("div");m.setAttribute("class","arrow-left"),m.setAttribute("aria-label",n);var h,v=[".has-lightbox.lightbox-".concat(e," > :not(.carousel-nav) figure img"),"figure.has-lightbox.lightbox-".concat(e," > img"),".has-lightbox.lightbox-".concat(e,' > figure[class^="align"] img')].join(", "),p=[".has-lightbox.lightbox-".concat(e," > :not(.carousel-nav) figure figcaption")].join(", "),x=document.querySelectorAll(v),y=document.querySelectorAll(p);a.append(l,i),s.append(u,b),d.append(m),g.append(f),c.append(r,a,s,d,g),x.length>0&&(document.getElementsByTagName("BODY")[0].append(c),1===x.length&&(g.remove(),d.remove()));y.length>0&&Array.from(y).forEach((function(e,t){e.addEventListener("click",(function(){E(t)}))}));Array.from(x).forEach((function(e,t){e.closest("figure").addEventListener("click",(function(){E(t)}))})),d.addEventListener("click",(function(){E(h=0===h?x.length-1:h-1)})),g.addEventListener("click",(function(){E(h=h===x.length-1?0:h+1)})),r.addEventListener("click",(function(){c.style.display="none"})),i.addEventListener("click",(function(){c.style.display="none"}));var k={preloaded:!1,setPreloadImages:function(){k.preloaded||(k.preloaded=!0,Array.from(x).forEach((function(e,t){k["img-".concat(t)]=new window.Image,k["img-".concat(t)].src=e.attributes.src.value,k["img-".concat(t)]["data-caption"]=x[t]&&x[t].nextElementSibling?function(e){for(var t=e.nextElementSibling;t;){if(t.matches("figcaption"))return t.innerHTML;t=t.nextElementSibling}return""}(x[t]):""})),document.onkeydown=function(e){if(void 0!==c&&"none"!==c)switch((e=e||window.event).keyCode){case 27:i.click();break;case 37:case 65:d.click();break;case 39:case 68:g.click()}})}};function E(e){k.setPreloadImages(),h=e,c.style.display="flex",r.style.backgroundImage="url(".concat(k["img-".concat(h)].src,")"),u.src=k["img-".concat(h)].src,b.innerHTML=k["img-".concat(h)]["data-caption"],l.textContent="".concat(h+1," / ").concat(x.length)}}(c)}))}()}});;
/*! This file is auto-generated */
window.addComment=function(v){var I,C,h,E=v.document,b={commentReplyClass:"comment-reply-link",commentReplyTitleId:"reply-title",cancelReplyId:"cancel-comment-reply-link",commentFormId:"commentform",temporaryFormId:"wp-temp-form-div",parentIdFieldId:"comment_parent",postIdFieldId:"comment_post_ID"},e=v.MutationObserver||v.WebKitMutationObserver||v.MozMutationObserver,r="querySelector"in E&&"addEventListener"in v,n=!!E.documentElement.dataset;function t(){d(),e&&new e(o).observe(E.body,{childList:!0,subtree:!0})}function d(e){if(r&&(I=g(b.cancelReplyId),C=g(b.commentFormId),I)){I.addEventListener("touchstart",l),I.addEventListener("click",l);var t=function(e){if((e.metaKey||e.ctrlKey)&&13===e.keyCode)return C.removeEventListener("keydown",t),e.preventDefault(),C.submit.click(),!1};C&&C.addEventListener("keydown",t);for(var n,d=function(e){var t=b.commentReplyClass;e&&e.childNodes||(e=E);t=E.getElementsByClassName?e.getElementsByClassName(t):e.querySelectorAll("."+t);return t}(e),o=0,i=d.length;o<i;o++)(n=d[o]).addEventListener("touchstart",a),n.addEventListener("click",a)}}function l(e){var t,n,d=g(b.temporaryFormId);d&&h&&(g(b.parentIdFieldId).value="0",t=d.textContent,d.parentNode.replaceChild(h,d),this.style.display="none",n=(d=(n=g(b.commentReplyTitleId))&&n.firstChild)&&d.nextSibling,d&&d.nodeType===Node.TEXT_NODE&&t&&(n&&"A"===n.nodeName&&n.id!==b.cancelReplyId&&(n.style.display=""),d.textContent=t),e.preventDefault())}function a(e){var t=g(b.commentReplyTitleId),n=t&&t.firstChild.textContent,d=this,o=m(d,"belowelement"),i=m(d,"commentid"),r=m(d,"respondelement"),t=m(d,"postid"),n=m(d,"replyto")||n;o&&i&&r&&t&&!1===v.addComment.moveForm(o,i,r,t,n)&&e.preventDefault()}function o(e){for(var t=e.length;t--;)if(e[t].addedNodes.length)return void d()}function m(e,t){return n?e.dataset[t]:e.getAttribute("data-"+t)}function g(e){return E.getElementById(e)}return r&&"loading"!==E.readyState?t():r&&v.addEventListener("DOMContentLoaded",t,!1),{init:d,moveForm:function(e,t,n,d,o){var i=g(e);h=g(n);var r,l,a,m,c,s=g(b.parentIdFieldId),y=g(b.postIdFieldId),p=(c=g(b.commentReplyTitleId))&&c.firstChild,u=p&&p.nextSibling;if(i&&h&&s){void 0===o&&(o=p&&p.textContent),m=h,e=b.temporaryFormId,n=g(e),c=(c=g(b.commentReplyTitleId))?c.firstChild.textContent:"",n||((n=E.createElement("div")).id=e,n.style.display="none",n.textContent=c,m.parentNode.insertBefore(n,m)),d&&y&&(y.value=d),s.value=t,I.style.display="",i.parentNode.insertBefore(h,i.nextSibling),p&&p.nodeType===Node.TEXT_NODE&&(u&&"A"===u.nodeName&&u.id!==b.cancelReplyId&&(u.style.display="none"),p.textContent=o),I.onclick=function(){return!1};try{for(var f=0;f<C.elements.length;f++)if(r=C.elements[f],l=!1,"getComputedStyle"in v?a=v.getComputedStyle(r):E.documentElement.currentStyle&&(a=r.currentStyle),(r.offsetWidth<=0&&r.offsetHeight<=0||"hidden"===a.visibility)&&(l=!0),"hidden"!==r.type&&!r.disabled&&!l){r.focus();break}}catch(e){}return!1}}}}(window);;
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
	var swiper;
	/////////////////////////////////////
	// Utility functions
	/////////////////////////////////////
	var util = ( function () {
		var noop = function () {};

		function texturize( text ) {
			// Ensure we get a string.
			text = text + '';
			text = text.replace( /'/g, '&#8217;' ).replace( /&#039;/g, '&#8217;' );
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

		function getBackgroundImage( imgEl ) {
			var canvas = document.createElement( 'canvas' ),
				context = canvas.getContext && canvas.getContext( '2d' );

			if ( ! imgEl ) {
				return;
			}

			context.filter = 'blur(20px) ';
			context.drawImage( imgEl, 0, 0 );
			var url = canvas.toDataURL( 'image/png' );
			canvas = null;

			return url;
		}

		return {
			noop: noop,
			texturize: texturize,
			applyReplacements: applyReplacements,
			getBackgroundImage: getBackgroundImage,
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
				if ( el ) {
					el.style.display = 'none';
				}
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

		// From: https://easings.net/#easeInOutQuad
		function easeInOutQuad( num ) {
			return num < 0.5 ? 2 * num * num : 1 - Math.pow( -2 * num + 2, 2 ) / 2;
		}

		function getFooterClearance( container ) {
			var footer = container.querySelector( '.jp-carousel-info-footer' );
			var infoArea = container.querySelector( '.jp-carousel-info-extra' );
			var contentArea = container.querySelector( '.jp-carousel-info-content-wrapper' );

			if ( footer && infoArea && contentArea ) {
				var styles = window.getComputedStyle( infoArea );
				var padding = parseInt( styles.paddingTop, 10 ) + parseInt( styles.paddingBottom, 10 );
				padding = isNaN( padding ) ? 0 : padding;
				return contentArea.offsetHeight + footer.offsetHeight + padding;
			}
			return 0;
		}

		function scrollToElement( el, container, callback ) {
			if ( ! el || ! container ) {
				if ( callback ) {
					return callback();
				}
				return;
			}

			// For iOS Safari compatibility, use JS to set the minimum height.
			var infoArea = container.querySelector( '.jp-carousel-info-extra' );
			if ( infoArea ) {
				// 64px is the same height as `.jp-carousel-info-footer` in the CSS.
				infoArea.style.minHeight = window.innerHeight - 64 + 'px';
			}

			var isScrolling = true;
			var startTime = Date.now();
			var duration = 300;
			var originalPosition = container.scrollTop;
			var targetPosition = Math.max(
				0,
				el.offsetTop - Math.max( 0, window.innerHeight - getFooterClearance( container ) )
			);
			var distance = targetPosition - container.scrollTop;
			distance = Math.min( distance, container.scrollHeight - window.innerHeight );

			function stopScroll() {
				isScrolling = false;
			}

			function runScroll() {
				var now = Date.now();
				var progress = easeInOutQuad( ( now - startTime ) / duration );

				progress = progress > 1 ? 1 : progress;
				var newVal = progress * distance;
				container.scrollTop = originalPosition + newVal;

				if ( now <= startTime + duration && isScrolling ) {
					return requestAnimationFrame( runScroll );
				}
				if ( callback ) {
					callback();
				}
				if ( infoArea ) {
					infoArea.style.minHeight = '';
				}
				isScrolling = false;
				container.removeEventListener( 'wheel', stopScroll );
			}

			// Allow scroll to be cancelled by user interaction.
			container.addEventListener( 'wheel', stopScroll );
			runScroll();
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

		function stripHTML( text ) {
			return text.replace( /<[^>]*>?/gm, '' );
		}

		return {
			closest: closest,
			matches: matches,
			hide: hide,
			show: show,
			fadeIn: fadeIn,
			fadeOut: fadeOut,
			scrollToElement: scrollToElement,
			getJSONAttribute: getJSONAttribute,
			convertToPlainText: convertToPlainText,
			stripHTML: stripHTML,
			emitEvent: emitEvent,
		};
	} )();

	/////////////////////////////////////
	// Carousel implementation
	/////////////////////////////////////
	function init() {
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

		// Selector for items within a gallery or tiled gallery.
		var galleryItemSelector =
			'.gallery-item, .tiled-gallery-item, .blocks-gallery-item, ' + ' .tiled-gallery__item';

		// Selector for all items including single images.
		var itemSelector = galleryItemSelector + ', .wp-block-image';

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
						carousel.overlay.scrollTop -= 100;
						break;
					case 40: // down
						e.preventDefault();
						carousel.overlay.scrollTop += 100;
						break;
					case 39: // right
						e.preventDefault();
						swiper.slideNext();
						break;
					case 37: // left
					case 8: // backspace
						e.preventDefault();
						swiper.slidePrev();
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

		function initializeCarousel() {
			if ( ! carousel.overlay ) {
				carousel.overlay = document.querySelector( '.jp-carousel-overlay' );
				carousel.container = carousel.overlay.querySelector( '.jp-carousel-wrap' );
				carousel.gallery = carousel.container.querySelector( '.jp-carousel' );
				carousel.info = carousel.overlay.querySelector( '.jp-carousel-info' );
				carousel.caption = carousel.info.querySelector( '.jp-carousel-caption' );
				carousel.commentField = carousel.overlay.querySelector(
					'#jp-carousel-comment-form-comment-field'
				);
				carousel.emailField = carousel.overlay.querySelector(
					'#jp-carousel-comment-form-email-field'
				);
				carousel.authorField = carousel.overlay.querySelector(
					'#jp-carousel-comment-form-author-field'
				);
				carousel.urlField = carousel.overlay.querySelector( '#jp-carousel-comment-form-url-field' );

				calculatePadding();

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

				carousel.overlay.addEventListener( 'click', function ( e ) {
					var target = e.target;
					var isTargetCloseHint = !! domUtil.closest( target, '.jp-carousel-close-hint' );
					var isSmallScreen = !! window.matchMedia( '(max-device-width: 760px)' ).matches;
					if ( target === carousel.overlay ) {
						if ( isSmallScreen ) {
							return;
						} else {
							closeCarousel();
						}
					} else if ( isTargetCloseHint ) {
						closeCarousel();
					} else if ( target.classList.contains( 'jp-carousel-image-download' ) ) {
						stat( 'download_original_click' );
					} else if ( target.classList.contains( 'jp-carousel-comment-login' ) ) {
						handleCommentLoginClick( e );
					} else if ( domUtil.closest( target, '#jp-carousel-comment-form-container' ) ) {
						handleCommentFormClick( e );
					} else if (
						domUtil.closest( target, '.jp-carousel-photo-icons-container' ) ||
						target.classList.contains( 'jp-carousel-photo-title' )
					) {
						handleFooterElementClick( e );
					} else if ( ! domUtil.closest( target, '.jp-carousel-info' ) ) {
						return;
					}
				} );

				window.addEventListener( 'keydown', handleKeyboardEvent );

				carousel.overlay.addEventListener( 'jp_carousel.afterOpen', function () {
					enableKeyboardNavigation();

					// Don't show navigation if there's only one image.
					if ( carousel.slides.length <= 1 ) {
						return;
					}
					// Show dot pagination if slide count is <= 5, otherwise show n/total.
					if ( carousel.slides.length <= 5 ) {
						domUtil.show( carousel.info.querySelector( '.jp-swiper-pagination' ) );
					} else {
						domUtil.show( carousel.info.querySelector( '.jp-carousel-pagination' ) );
					}
				} );

				carousel.overlay.addEventListener( 'jp_carousel.beforeClose', function () {
					disableKeyboardNavigation();

					// Fixes some themes where closing carousel brings view back to top.
					document.documentElement.style.removeProperty( 'height' );

					// If we disable the swiper (because there's only one image)
					// we have to re-enable it here again as Swiper doesn't, for some reason,
					// show the navigation buttons again after reinitialization.
					if ( swiper ) {
						swiper.enable();
					}

					// Hide pagination.
					domUtil.hide( carousel.info.querySelector( '.jp-swiper-pagination' ) );
					domUtil.hide( carousel.info.querySelector( '.jp-carousel-pagination' ) );
				} );

				carousel.overlay.addEventListener( 'jp_carousel.afterClose', function () {
					// don't force the browser back when the carousel closes.
					if ( window.history.pushState ) {
						history.pushState(
							'',
							document.title,
							window.location.pathname + window.location.search
						);
					} else {
						window.location.href = '';
					}
					lastKnownLocationHash = '';
					carousel.isOpen = false;
				} );

				// Prevent native browser zooming
				carousel.overlay.addEventListener( 'touchstart', function ( e ) {
					if ( e.touches.length > 1 ) {
						e.preventDefault();
					}
				} );
			}
		}

		function handleCommentLoginClick() {
			var slide = carousel.currentSlide;
			var attachmentId = slide ? slide.attrs.attachmentId : '0';

			window.location.href = jetpackCarouselStrings.login_url + '%23jp-carousel-' + attachmentId;
		}

		function updatePostResults( msg, isSuccess ) {
			var results = carousel.overlay.querySelector( '#jp-carousel-comment-post-results' );
			var elClass = 'jp-carousel-comment-post-' + ( isSuccess ? 'success' : 'error' );
			results.innerHTML = '<span class="' + elClass + '">' + msg + '</span>';
			domUtil.hide( carousel.overlay.querySelector( '#jp-carousel-comment-form-spinner' ) );
			carousel.overlay
				.querySelector( '#jp-carousel-comment-form' )
				.classList.remove( 'jp-carousel-is-disabled' );
			domUtil.show( results );
		}

		function handleCommentFormClick( e ) {
			var target = e.target;
			var data = domUtil.getJSONAttribute( carousel.container, 'data-carousel-extra' ) || {};
			var attachmentId = carousel.currentSlide.attrs.attachmentId;

			var wrapper = document.querySelector( '#jp-carousel-comment-form-submit-and-info-wrapper' );
			var spinner = document.querySelector( '#jp-carousel-comment-form-spinner' );
			var submit = document.querySelector( '#jp-carousel-comment-form-button-submit' );
			var form = document.querySelector( '#jp-carousel-comment-form' );

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
				form.classList.add( 'jp-carousel-is-disabled' );

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
						form.classList.remove( 'jp-carousel-is-disabled' );
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

		/**
		 * Handles clicks to icons and other action elements in the icon container.
		 * @param {MouseEvent|TouchEvent|KeyBoardEvent} Event object.
		 */
		function handleFooterElementClick( e ) {
			e.preventDefault();

			var target = e.target;
			var extraInfoContainer = carousel.info.querySelector( '.jp-carousel-info-extra' );
			var photoMetaContainer = carousel.info.querySelector( '.jp-carousel-image-meta' );
			var commentsContainer = carousel.info.querySelector( '.jp-carousel-comments-wrapper' );
			var infoIcon = carousel.info.querySelector( '.jp-carousel-icon-info' );
			var commentsIcon = carousel.info.querySelector( '.jp-carousel-icon-comments' );

			function handleInfoToggle() {
				if ( commentsIcon ) {
					commentsIcon.classList.remove( 'jp-carousel-selected' );
				}
				infoIcon.classList.toggle( 'jp-carousel-selected' );

				if ( commentsContainer ) {
					commentsContainer.classList.remove( 'jp-carousel-show' );
				}
				if ( photoMetaContainer ) {
					photoMetaContainer.classList.toggle( 'jp-carousel-show' );
					if ( photoMetaContainer.classList.contains( 'jp-carousel-show' ) ) {
						extraInfoContainer.classList.add( 'jp-carousel-show' );
					} else {
						extraInfoContainer.classList.remove( 'jp-carousel-show' );
					}
				}
			}

			function handleCommentToggle() {
				if ( infoIcon ) {
					infoIcon.classList.remove( 'jp-carousel-selected' );
				}
				commentsIcon.classList.toggle( 'jp-carousel-selected' );

				if ( photoMetaContainer ) {
					photoMetaContainer.classList.remove( 'jp-carousel-show' );
				}
				if ( commentsContainer ) {
					commentsContainer.classList.toggle( 'jp-carousel-show' );
					if ( commentsContainer.classList.contains( 'jp-carousel-show' ) ) {
						extraInfoContainer.classList.add( 'jp-carousel-show' );
					} else {
						extraInfoContainer.classList.remove( 'jp-carousel-show' );
					}
				}
			}

			if (
				domUtil.closest( target, '.jp-carousel-icon-info' ) ||
				target.classList.contains( 'jp-carousel-photo-title' )
			) {
				if ( photoMetaContainer && photoMetaContainer.classList.contains( 'jp-carousel-show' ) ) {
					domUtil.scrollToElement( carousel.overlay, carousel.overlay, handleInfoToggle );
				} else {
					handleInfoToggle();
					domUtil.scrollToElement( carousel.info, carousel.overlay );
				}
			}

			if ( domUtil.closest( target, '.jp-carousel-icon-comments' ) ) {
				if ( commentsContainer && commentsContainer.classList.contains( 'jp-carousel-show' ) ) {
					domUtil.scrollToElement( carousel.overlay, carousel.overlay, handleCommentToggle );
				} else {
					handleCommentToggle();
					domUtil.scrollToElement( carousel.info, carousel.overlay );
				}
			}
		}

		function processSingleImageGallery() {
			var images = document.querySelectorAll( 'a img[data-attachment-id]' );
			Array.prototype.forEach.call( images, function ( image ) {
				var link = image.parentElement;
				var container = link.parentElement;

				// Skip if image was already added to gallery by shortcode.
				if ( container.classList.contains( 'gallery-icon' ) ) {
					return;
				}

				// Skip if image is part of a gallery.
				if ( domUtil.closest( container, galleryItemSelector ) ) {
					return;
				}

				// Skip if the parent is not actually a link.
				if ( ! link.hasAttribute( 'href' ) ) {
					return;
				}

				var valid = false;

				// If link points to 'Media File' (ignoring GET parameters) and flag is set, allow it.
				if (
					link.getAttribute( 'href' ).split( '?' )[ 0 ] ===
						image.getAttribute( 'data-orig-file' ).split( '?' )[ 0 ] &&
					Number( jetpackCarouselStrings.single_image_gallery_media_file ) === 1
				) {
					valid = true;
				}

				// If link points to 'Attachment Page', allow it.
				if ( link.getAttribute( 'href' ) === image.getAttribute( 'data-permalink' ) ) {
					valid = true;
				}

				// Links to 'Custom URL' or 'Media File' when flag is not set are not valid.
				if ( ! valid ) {
					return;
				}

				// Make this node a gallery recognizable by event listener above.
				link.classList.add( 'single-image-gallery' );
				// blog_id is needed to allow posting comments to correct blog.
				link.setAttribute(
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
				loadSwiper( gal, { startIndex: index } );
			} else {
				selectSlideAtIndex( index );
				// We have to force swiper to slide to the index onHasChange.
				swiper.slideTo( index + 1 );
			}
		}

		function selectSlideAtIndex( index ) {
			if ( ! index || index < 0 || index > carousel.slides.length ) {
				index = 0;
			}
			carousel.currentSlide = carousel.slides[ index ];

			var current = carousel.currentSlide;
			var attachmentId = current.attrs.attachmentId;
			var extraInfoContainer = carousel.info.querySelector( '.jp-carousel-info-extra' );
			var photoMetaContainer = carousel.info.querySelector( '.jp-carousel-image-meta' );
			var commentsContainer = carousel.info.querySelector( '.jp-carousel-comments-wrapper' );
			var infoIcon = carousel.info.querySelector( '.jp-carousel-icon-info' );
			var commentsIcon = carousel.info.querySelector( '.jp-carousel-icon-comments' );

			// Hide comments and photo info
			if ( extraInfoContainer ) {
				extraInfoContainer.classList.remove( 'jp-carousel-show' );
			}
			if ( photoMetaContainer ) {
				photoMetaContainer.classList.remove( 'jp-carousel-show' );
			}
			if ( infoIcon ) {
				infoIcon.classList.remove( 'jp-carousel-selected' );
			}
			if ( commentsContainer ) {
				commentsContainer.classList.remove( 'jp-carousel-show' );
			}
			if ( commentsIcon ) {
				commentsIcon.classList.remove( 'jp-carousel-selected' );
			}

			loadFullImage( carousel.slides[ index ] );

			if (
				Number( jetpackCarouselStrings.display_background_image ) === 1 &&
				! carousel.slides[ index ].backgroundImage
			) {
				loadBackgroundImage( carousel.slides[ index ] );
			}

			domUtil.hide( carousel.caption );
			updateTitleCaptionAndDesc( {
				caption: current.attrs.caption,
				title: current.attrs.title,
				desc: current.attrs.desc,
			} );

			var imageMeta = carousel.slides[ index ].attrs.imageMeta;
			updateExif( imageMeta );
			updateFullSizeLink( current );

			if ( Number( jetpackCarouselStrings.display_comments ) === 1 ) {
				testCommentsOpened( carousel.slides[ index ].attrs.commentsOpened );
				fetchComments( attachmentId );
				domUtil.hide( carousel.info.querySelector( '#jp-carousel-comment-post-results' ) );
			}

			// Update pagination in footer.
			var pagination = carousel.info.querySelector( '.jp-carousel-pagination' );
			if ( pagination && carousel.slides.length > 5 ) {
				var currentPage = index + 1;
				pagination.innerHTML = '<span>' + currentPage + ' / ' + carousel.slides.length + '</span>';
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

			window.location.hash = lastKnownLocationHash = '#jp-carousel-' + attachmentId;
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

			domUtil.emitEvent( carousel.overlay, 'jp_carousel.beforeClose' );
			restoreScroll();
			swiper.destroy();
			carousel.isOpen = false;
			// Clear slide data for DOM garbage collection.
			carousel.slides = [];
			carousel.currentSlide = undefined;
			carousel.gallery.innerHTML = '';

			domUtil.fadeOut( carousel.overlay, function () {
				domUtil.emitEvent( carousel.overlay, 'jp_carousel.afterClose' );
			} );
		}

		function calculateMaxSlideDimensions() {
			return {
				width: window.innerWidth,
				height: window.innerHeight - 64, //subtract height of bottom info bar,
			};
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

			// Assign max width and height -- @3x to support hiPPI/Retina devices when zooming in.
			args.origMaxWidth = args.maxWidth * 3;
			args.origMaxHeight = args.maxHeight * 3;

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
						// @2x the max sizes so we get a high enough resolution for zooming.
						args.origMaxWidth = args.maxWidth * 2;
						args.origMaxHeight = args.maxHeight * 2;
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

		function updateTitleCaptionAndDesc( data ) {
			var caption = '';
			var title = '';
			var desc = '';
			var captionMainElement;
			var captionInfoExtraElement;
			var titleElement;
			var descriptionElement;

			captionMainElement = carousel.overlay.querySelector( '.jp-carousel-photo-caption' );
			captionInfoExtraElement = carousel.overlay.querySelector( '.jp-carousel-caption' );

			titleElement = carousel.overlay.querySelector( '.jp-carousel-photo-title' );
			descriptionElement = carousel.overlay.querySelector( '.jp-carousel-photo-description' );

			domUtil.hide( captionMainElement );
			domUtil.hide( captionInfoExtraElement );
			domUtil.hide( titleElement );
			domUtil.hide( descriptionElement );

			caption = parseTitleOrDesc( data.caption ) || '';
			title = parseTitleOrDesc( data.title ) || '';
			desc = parseTitleOrDesc( data.desc ) || '';

			if ( caption || title || desc ) {
				if ( caption ) {
					captionMainElement.innerHTML = caption;
					captionInfoExtraElement.innerHTML = caption;

					domUtil.show( captionMainElement );
					domUtil.show( captionInfoExtraElement );
				}

				if ( domUtil.stripHTML( caption ) === domUtil.stripHTML( title ) ) {
					title = '';
				}

				if ( domUtil.stripHTML( caption ) === domUtil.stripHTML( desc ) ) {
					desc = '';
				}

				if ( domUtil.stripHTML( title ) === domUtil.stripHTML( desc ) ) {
					desc = '';
				}

				if ( desc ) {
					descriptionElement.innerHTML = desc;
					domUtil.show( descriptionElement );
				}

				if ( title ) {
					var plainTitle = domUtil.stripHTML( title );
					titleElement.innerHTML = plainTitle;

					if ( ! caption ) {
						captionMainElement.innerHTML = plainTitle;
						captionInfoExtraElement.innerHTML = plainTitle;

						domUtil.show( captionMainElement );
					}

					domUtil.show( titleElement );
				}
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

			var downloadText = carousel.info.querySelector( '.jp-carousel-download-text' );
			var permalink = carousel.info.querySelector( '.jp-carousel-image-download' );

			downloadText.innerHTML = util.applyReplacements(
				jetpackCarouselStrings.download_original,
				origSize
			);
			permalink.setAttribute( 'href', original );
			permalink.style.removeProperty( 'display' );
		}

		function testCommentsOpened( opened ) {
			var commentForm = carousel.container.querySelector( '.jp-carousel-comment-form-container' );
			var isOpened = parseInt( opened, 10 ) === 1;

			if ( isOpened ) {
				domUtil.fadeIn( commentForm );
			} else {
				domUtil.fadeOut( commentForm );
			}
		}

		function fetchComments( attachmentId, offset ) {
			var shouldClear = offset === undefined;
			var commentsIndicator = carousel.info.querySelector(
				'.jp-carousel-icon-comments .jp-carousel-has-comments-indicator'
			);

			commentsIndicator.classList.remove( 'jp-carousel-show' );

			clearInterval( commentInterval );

			if ( ! attachmentId ) {
				return;
			}

			if ( ! offset || offset < 1 ) {
				offset = 0;
			}

			var comments = carousel.info.querySelector( '.jp-carousel-comments' );
			var commentsLoading = carousel.info.querySelector( '#jp-carousel-comments-loading' );
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
						'<div class="comment-content">' +
						'<div class="comment-author">' +
						entry.author_markup +
						'</div>' +
						'<div class="comment-date">' +
						entry.date_gmt +
						'</div>' +
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

				if ( data.length > 0 ) {
					domUtil.show( comments );
					commentsIndicator.innerText = data.length;
					commentsIndicator.classList.add( 'jp-carousel-show' );
				}

				domUtil.hide( commentsLoading );
			};

			xhr.onerror = onError;

			xhr.send();
		}

		function loadFullImage( slide ) {
			var el = slide.el;
			var attrs = slide.attrs;
			var image = el.querySelector( 'img' );

			if ( ! image.hasAttribute( 'data-loaded' ) ) {
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

		function loadBackgroundImage( slide ) {
			var currentSlide = slide.el;

			if ( swiper && swiper.slides ) {
				currentSlide = swiper.slides[ swiper.activeIndex ];
			}

			var image = slide.attrs.originalElement;
			var isLoaded = image.complete && image.naturalHeight !== 0;

			if ( isLoaded ) {
				applyBackgroundImage( slide, currentSlide, image );
				return;
			}

			image.onload = function () {
				applyBackgroundImage( slide, currentSlide, image );
			};
		}

		function applyBackgroundImage( slide, currentSlide, image ) {
			var url = util.getBackgroundImage( image );
			slide.backgroundImage = url;
			currentSlide.style.backgroundImage = 'url(' + url + ')';
			currentSlide.style.backgroundSize = 'cover';
		}

		function clearCommentTextAreaValue() {
			if ( carousel.commentField ) {
				carousel.commentField.value = '';
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

			var max = calculateMaxSlideDimensions();

			// If the startIndex is not 0 then preload the clicked image first.
			if ( startIndex !== 0 ) {
				var img = new Image();
				img.src = items[ startIndex ].getAttribute( 'data-gallery-src' );
			}

			var useInPageThumbnails = !! domUtil.closest( items[ 0 ], '.tiled-gallery.type-rectangular' );

			// create the 'slide'
			Array.prototype.forEach.call( items, function ( item, i ) {
				var permalinkEl = domUtil.closest( item, 'a' );
				var origFile = item.getAttribute( 'data-orig-file' ) || item.getAttribute( 'src-orig' );
				var attrID =
					item.getAttribute( 'data-attachment-id' ) || item.getAttribute( 'data-id' ) || '0';
				var caption = document.querySelector(
					'img[data-attachment-id="' + attrID + '"] + figcaption'
				);

				if ( caption ) {
					caption = caption.innerHTML;
				} else {
					caption = item.getAttribute( 'data-image-caption' );
				}

				var attrs = {
					originalElement: item,
					attachmentId: attrID,
					commentsOpened: item.getAttribute( 'data-comments-opened' ) || '0',
					imageMeta: domUtil.getJSONAttribute( item, 'data-image-meta' ) || {},
					title: item.getAttribute( 'data-image-title' ) || '',
					desc: item.getAttribute( 'data-image-description' ) || '',
					mediumFile: item.getAttribute( 'data-medium-file' ) || '',
					largeFile: item.getAttribute( 'data-large-file' ) || '',
					origFile: origFile || '',
					thumbSize: { width: item.naturalWidth, height: item.naturalHeight },
					caption: caption || '',
					permalink: permalinkEl && permalinkEl.getAttribute( 'href' ),
					src: origFile || item.getAttribute( 'src' ) || '',
				};

				var tiledGalleryItem = domUtil.closest( item, '.tiled-gallery-item' );
				var tiledCaptionEl =
					tiledGalleryItem && tiledGalleryItem.querySelector( '.tiled-gallery-caption' );
				var tiledCaption = tiledCaptionEl && tiledCaptionEl.innerHTML;
				if ( tiledCaption ) {
					attrs.caption = tiledCaption;
				}

				var origDimensions = getOriginalDimensions( item );

				attrs.origWidth = origDimensions.width || attrs.thumbSize.width;
				attrs.origHeight = origDimensions.height || attrs.thumbSize.height;

				if ( typeof wpcom !== 'undefined' && wpcom.carousel && wpcom.carousel.generateImgSrc ) {
					attrs.src = wpcom.carousel.generateImgSrc( item, max );
				} else {
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
					image.src = attrs.src;

					var slideEl = document.createElement( 'div' );
					slideEl.classList.add( 'swiper-slide' );
					slideEl.setAttribute( 'itemprop', 'associatedMedia' );
					slideEl.setAttribute( 'itemscope', '' );
					slideEl.setAttribute( 'itemtype', 'https://schema.org/ImageObject' );
					var zoomEl = document.createElement( 'div' );
					zoomEl.classList.add( 'swiper-zoom-container' );

					carousel.gallery.appendChild( slideEl );

					slideEl.appendChild( zoomEl );
					zoomEl.appendChild( image );
					slideEl.setAttribute( 'data-attachment-id', attrs.attachmentId );
					slideEl.setAttribute( 'data-permalink', attrs.permalink );
					slideEl.setAttribute( 'data-orig-file', attrs.origFile );

					if ( useInPageThumbnails ) {
						// Use the image already loaded in the gallery as a preview.
						attrs.previewImage = attrs.src;
					}

					var slide = { el: slideEl, attrs: attrs, index: i };
					carousel.slides.push( slide );
				}
			} );
		}

		function loadSwiper( gallery, options ) {
			if ( ! window.Swiper670 ) {
				var loader = document.querySelector( '#jp-carousel-loading-overlay' );
				domUtil.show( loader );
				var jsScript = document.createElement( 'script' );
				jsScript.id = 'jetpack-carousel-swiper-js';
				jsScript.src = window.jetpackSwiperLibraryPath.url;
				jsScript.async = true;
				jsScript.onload = function () {
					domUtil.hide( loader );
					openCarousel( gallery, options );
				};
				jsScript.onerror = function () {
					domUtil.hide( loader );
				};
				document.head.appendChild( jsScript );
				return;
			}
			openCarousel( gallery, options );
		}

		function openCarousel( gallery, options ) {
			var settings = {
				imgSelector:
					'.gallery-item [data-attachment-id], .tiled-gallery-item [data-attachment-id], img[data-attachment-id], img[data-id]',
				startIndex: 0,
			};

			var data = domUtil.getJSONAttribute( gallery, 'data-carousel-extra' );
			var tapTimeout;

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

			domUtil.emitEvent( carousel.overlay, 'jp_carousel.beforeOpen' );
			carousel.gallery.innerHTML = '';

			// Need to set the overlay manually to block or swiper does't initialise properly.
			carousel.overlay.style.opacity = 1;
			carousel.overlay.style.display = 'block';

			initCarouselSlides( gallery.querySelectorAll( settings.imgSelector ), settings.startIndex );

			swiper = new window.Swiper670( '.jp-carousel-swiper-container', {
				centeredSlides: true,
				zoom: true,
				loop: carousel.slides.length > 1,
				// Turn off interactions and hide navigation arrows if there is only one slide.
				enabled: carousel.slides.length > 1,
				pagination: {
					el: '.jp-swiper-pagination',
					clickable: true,
				},
				navigation: {
					nextEl: '.jp-swiper-button-next',
					prevEl: '.jp-swiper-button-prev',
				},
				initialSlide: settings.startIndex,
				on: {
					init: function () {
						selectSlideAtIndex( settings.startIndex );
					},
				},
				preventClicks: false,
				preventClicksPropagation: false,
				threshold: 5,
			} );

			swiper.on( 'slideChange', function ( swiper ) {
				var index;
				// Swiper indexes slides from 1, plus when looping to left last slide ends up
				// as 0 and looping to right first slide as total slides + 1. These are adjusted
				// here to match index of carousel.slides.
				if ( swiper.activeIndex === 0 ) {
					index = carousel.slides.length - 1;
				} else if ( swiper.activeIndex === carousel.slides.length + 1 ) {
					index = 0;
				} else {
					index = swiper.activeIndex - 1;
				}
				selectSlideAtIndex( index );

				carousel.overlay.classList.remove( 'jp-carousel-hide-controls' );
			} );

			swiper.on( 'zoomChange', function ( swiper, scale ) {
				if ( scale > 1 ) {
					carousel.overlay.classList.add( 'jp-carousel-hide-controls' );
				}

				if ( scale === 1 ) {
					carousel.overlay.classList.remove( 'jp-carousel-hide-controls' );
				}
			} );

			swiper.on( 'doubleTap', function ( swiper ) {
				clearTimeout( tapTimeout );
				if ( swiper.zoom.scale === 1 ) {
					var zoomTimeout = setTimeout( function () {
						carousel.overlay.classList.remove( 'jp-carousel-hide-controls' );
						clearTimeout( zoomTimeout );
					}, 150 );
				}
			} );

			swiper.on( 'tap', function () {
				if ( swiper.zoom.scale > 1 ) {
					tapTimeout = setTimeout( function () {
						carousel.overlay.classList.toggle( 'jp-carousel-hide-controls' );
					}, 150 );
				}
			} );

			domUtil.fadeIn( carousel.overlay, function () {
				domUtil.emitEvent( carousel.overlay, 'jp_carousel.afterOpen' );
			} );
		}

		// Register the event listener for starting the gallery
		document.body.addEventListener( 'click', function ( e ) {
			var isCompatible =
				window.CSS && window.CSS.supports && window.CSS.supports( 'display', 'grid' );

			// IE11 support is being dropped in August 2021. The new swiper.js libray is not IE11 compat
			// so just default to opening individual image attachment/media pages for IE.
			if ( ! isCompatible ) {
				return;
			}

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
				loadSwiper( gallery, { startIndex: index } );
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
					if (
						parseInt( images[ j ].getAttribute( 'data-attachment-id' ), 10 ) === attachmentId ||
						parseInt( images[ j ].getAttribute( 'data-id' ), 10 ) === attachmentId
					) {
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
