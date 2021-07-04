/******************************
    Mantra Theme
    custom scripting
    (c) Cryout Creations
    www.cryoutcreations.eu
*******************************/


jQuery(document).ready(function() {

/* Standard menu touch support for tablets */
var custom_event = ('ontouchstart' in window) ? 'touchstart' : 'click'; /* check touch support */
var ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
	jQuery('#access .menu > ul > li a').on('click', function(e){
		var $link_id = jQuery(this).attr('href');
		if (jQuery(this).parent().data('clicked') == $link_id) { /* second touch */
			jQuery(this).parent().data('clicked', null);
		}
		else { /* first touch */
			if (custom_event != 'click' && !ios && (jQuery(this).parent().children('ul').length >0)) {e.preventDefault();}
			jQuery(this).parent().data('clicked', $link_id);
		}
	});

/* Back to top button animation */
jQuery(function() {
	jQuery(window).scroll(function() {
		var x=jQuery(this).scrollTop();

		if(x != 0) {
				jQuery('#toTop').addClass('showtop')
			} else {
				jQuery('#toTop').removeClass('showtop');
			}

	});
	jQuery('#toTop').click(function() { jQuery('body,html').animate({scrollTop:0},800); });
});


/* Menu animation */
jQuery("#access ul ul").css({display: "none"}); /* Opera Fix */
jQuery("#access").removeClass("jssafe"); /* JS failsafe */
jQuery("#access .menu ul li").hoverIntent({
	over: function(){jQuery(this).children("ul").fadeIn(300);},
	out: function(){ jQuery(this).children('ul').fadeOut();},
	timeout:300}
);


/* detect and apply custom class for safari */
if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
	jQuery('body').addClass('safari');
}

/* Add custom borders to images */
jQuery("img.alignnone, img.alignleft, img.aligncenter,  img.alignright").addClass(mantra_options.image_class);


});
/* end document.ready */

/* Mobile Menu v2 */
function mantra_mobilemenu_init() {
	var state = false;
	jQuery("#nav-toggle").click(function(){
		jQuery("#access").slideToggle(function(){ if (state) {jQuery(this).removeAttr( 'style' )}; state = ! state; } );
	});
}

jQuery(window).load(function() {
	mantra_mobilemenu_init();
});

/* Columns equalizer, used if at least one sidebar has a bg color */
function equalizeHeights(){
    var h1 = jQuery("#primary").height();
	var h2 = jQuery("#secondary").height();
	var h3 = jQuery("#content").height();
    var max = Math.max(h1,h2,h3);
	if (h1<max) { jQuery("#primary").height(max); };
	if (h2<max) { jQuery("#secondary").height(max); };
}

function makeDoubleDelegate(function1, function2) {
// concatenate functions
    return function() { if (function1) function1(); if (function2) function2(); }
}

function mantra_onload() {
	if ( mantra_options.responsive == 1 ) {
		/* Add responsive videos */
		if (jQuery(window).width() < 800) jQuery(".entry-content").fitVids();
	}
	if ( mantra_options.equalizesidebars = 1 ) {
		/* Check if sidebars have user colors and if so equalize their heights */
		equalizeHeights();
	}
}; // mantra_onload

// make sure not to lose previous onload events
window.onload = makeDoubleDelegate(window.onload, mantra_onload );

/*!
* FitVids 1.0
*
* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    }

    var div = document.createElement('div'),
        ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];

   div.className = 'fit-vids-style';
    div.innerHTML = '&shy;<style> .fluid-width-video-wrapper { width: 100%; position: relative; padding: 0; } .fluid-width-video-wrapper iframe, .fluid-width-video-wrapper object, .fluid-width-video-wrapper embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; } </style>';

    ref.parentNode.insertBefore(div,ref);

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='www.youtube.com']",
        "iframe[src*='www.kickstarter.com']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() == 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = this.tagName.toLowerCase() == 'object' ? $this.attr('height') : $this.height(),
            aspectRatio = height / $this.width();
			if(!$this.attr('id')){
				var videoID = 'fitvid' + Math.floor(Math.random()*999999);
				$this.attr('id', videoID);
			}
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });

  }
})( jQuery );


/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license.
 * Copyright 2007, 2013 Brian Cherne
 */
(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery)


/* Returns the version of Internet Explorer or a -1
 * (indicating the use of another browser).
 */
function getInternetExplorerVersion()
{
  var rv = -1; /* Return value assumes failure. */
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}
