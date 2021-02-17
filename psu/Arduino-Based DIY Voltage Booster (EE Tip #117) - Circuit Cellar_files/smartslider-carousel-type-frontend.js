(function(){var e=this;e.N2_=e.N2_||{r:[],d:[]},e.N2R=e.N2R||function(){e.N2_.r.push(arguments)},e.N2D=e.N2D||function(){e.N2_.d.push(arguments)}}).call(window),N2D("SmartSliderCarousel",["SmartSliderAbstract"],function(r,n){function e(e,i){this.type="carousel",N2Classes.SmartSliderAbstract.prototype.constructor.call(this,e,r.extend({maxPaneWidth:3e3},i))}return((e.prototype=Object.create(N2Classes.SmartSliderAbstract.prototype)).constructor=e).prototype.initResponsiveMode=function(){this.responsive=new N2Classes.SmartSliderResponsiveCarousel(this,this.parameters.responsive),this.responsive.start(),N2Classes.SmartSliderAbstract.prototype.initResponsiveMode.call(this)},e.prototype.initMainAnimation=function(){this.mainAnimation=new N2Classes.SmartSliderMainAnimationCarousel(this,this.parameters.mainanimation)},e.prototype.createEmptyGroup=function(e){return new N2Classes.FrontendCarouselGroupOfSlides(this,e)},e.prototype.initSlides=function(){var e=this.sliderElement.find(".n2-ss-slide");this.slides=[],this.realSlides=[];for(var i=0;i<e.length;i++){this.slides.push(new N2Classes.FrontendCarouselGroupOfSlides(this,i));var t=new N2Classes.FrontendSliderSlide(this,e.eq(i),this.slides[i].originalIndex);t.index=this.slides[i].index,this.realSlides.push(t),t.init(),this.slides[i].addSlide(t),1===t.$element.data("first")&&(this.originalRealStarterSlide=t)}this.initSlidesEnd()},e.prototype.setCurrentRealSlide=function(e){this.currentRealSlide=e,this.currentSlide=e.group},e.prototype._changeCurrentSlide=function(e){this.setCurrentRealSlide(this.slides[e].slides[0]),this.sliderElement.triggerHandler("sliderChangeCurrentSlide")},e.prototype.initUI=function(){for(var e=0;e<this.slides.length;e++)this.slides[e].setNext(this.slides[e+1>this.slides.length-1?0:e+1]);N2Classes.SmartSliderAbstract.prototype.initUI.call(this),this.parameters.carousel||this.initNotCarousel()},e.prototype.calibrateGroup=function(){var e,i;delete this.currentRealSlide;var t=r.extend([],this.slides);this.slides=[];var s=this.createEmptyGroup(-1);for(this.mainAnimation.hideSlide(s),i=e=0;e<this.visibleRealSlides.length;e++)e%this.responsive.slidesInGroup==0&&(this.slides.push(this.createEmptyGroup(i)),i++),this.slides[i-1].addSlide(this.visibleRealSlides[e]);for(e=0;e<this.slides.length;e++)this.slides[e].setNext(this.slides[e+1>this.slides.length-1?0:e+1]);for(this.parameters.carousel||(this.slides[0].setPrevious(!1),this.slides[this.slides.length-1].setNext(!1)),e=0;e<this.realSlides.length;e++)this.realSlides[e].isVisible||s.addSlide(this.realSlides[e]);for(e=0;e<t.length;e++)t[e].destroy();this.invisibleSlidesGroup!==n&&this.invisibleSlidesGroup.destroy(),this.invisibleSlidesGroup=s,this.visibleSlides=this.slides},e.prototype.updateInsideSlides=function(e){for(var i=this.invisibleSlidesGroup.slides,t=0;t<i.length;t++)i[t].setInside(!1);N2Classes.SmartSliderAbstract.prototype.updateInsideSlides.call(this,e)},e.prototype.getRealIndex=function(e){return e*this.responsive.slidesInGroup},e.prototype.getSlideIndex=function(e){return Math.floor(e/this.responsive.slidesInGroup)},e.prototype.directionalChangeToReal=function(e){this.directionalChangeTo(this.getSlideIndex(e))},e.prototype.getSlideBackgroundContainer=function(){return this.sliderElement.find(".n2-ss-slider-2")},e.prototype.getVisibleSlides=function(e){return e===n&&(e=this.currentSlide),e.slides.slice()},e.prototype.forceSetActiveSlide=function(e){this.mainAnimation.refreshSlideVisibility(),e.setActive()},e.prototype.getAnimationAxis=function(){return"vertical"===this.mainAnimation.parameters.type?"vertical":"horizontal"},e}),N2D("SmartSliderResponsiveCarousel",["SmartSliderResponsive"],function(t,n){function e(e,i){this.slidesInGroup=0,this.wH=0,this.forceSlidesGroupCalibration=!1,N2Classes.SmartSliderResponsive.prototype.constructor.call(this,e,t.extend({minimumSlideGap:10,sideSpacing:{desktop:[0,0,0,0],tablet:[0,0,0,0],mobile:[0,0,0,0]},border:0},i))}return((e.prototype=Object.create(N2Classes.SmartSliderResponsive.prototype)).constructor=e).prototype.init=function(){this.$cache={"n2-ss-slider-3":this.sliderElement.find(".n2-ss-slider-3"),"n2-ss-slide":this.sliderElement.find(".n2-ss-slide"),"n2-ss-layers-container":this.sliderElement.find(".n2-ss-layers-container"),"n2-ss-slider-pane":this.sliderElement.find(".n2-ss-slider-pane")},this.$cache["n2-ss-slider-pane"][0].addEventListener("scroll",function(e){e.currentTarget.scrollTop=0,e.currentTarget.scrollLeft=0},{capture:!0}),this.base={sliderWidth:this.sliderElement.width(),sliderHeight:this.sliderElement.height(),slideContainerWidth:this.$cache["n2-ss-slider-3"].width(),slideContainerHeight:this.$cache["n2-ss-slider-3"].height(),slideOuterWidth:this.$cache["n2-ss-slide"].outerWidth(),slideOuterHeight:this.$cache["n2-ss-slide"].outerHeight(),slideWidth:this.$cache["n2-ss-layers-container"].width(),slideHeight:this.$cache["n2-ss-layers-container"].height()}},e.prototype.resizeStage1Width=function(){N2Classes.SmartSliderResponsive.prototype.resizeStage1Width.call(this),this.stage1CalculateSliderWidth(),this.stage1CalculateSlideWidth()},e.prototype.stage1CalculateSliderWidth=function(){this.resizeContext={};var e=this.containerElementPadding.width();this.parameters.upscale||(e=Math.min(e,this.base.sliderWidth)),this.parameters.downscale||(e=Math.max(e,this.base.sliderWidth)),this.resizeContext.sliderWidth=this.applyFilter("SliderWidth",e),this.resizeContext.sliderInnerWidth=this.resizeContext.sliderWidth-(this.base.sliderWidth-this.base.slideContainerWidth),this.resizeContext.sliderRatio=this.resizeContext.sliderWidth/this.base.sliderWidth,this.sliderElement.css({width:this.resizeContext.sliderWidth})},e.prototype.stage1CalculateSlideWidth=function(){var e=this.resizeContext.sliderWidth-(this.base.sliderWidth-this.base.slideContainerWidth);this.resizeContext.slideContainerWidth=Math.min(e,this.slider.parameters.maxPaneWidth);var i=Math.floor((e-this.resizeContext.slideContainerWidth)/2);this.$cache["n2-ss-slider-3"].css({width:this.resizeContext.slideContainerWidth,marginLeft:i,marginRight:i});var t=this.parameters.sideSpacing[this.getDeviceGroup()],s=this.resizeContext.slideContainerWidth-t[1]-t[3];this.resizeContext.paneWidth=s,this.$cache["n2-ss-slider-pane"].css({width:s,marginLeft:t[1],marginRight:t[3]});var r=Math.max(1,Math.floor(s/(this.base.slideOuterWidth+this.parameters.minimumSlideGap)));!this.forceSlidesGroupCalibration&&r===this.slidesInGroup||(this.slidesInGroup=r,this.slider.calibrateGroup(),this.visibleRealSlidesChanged=!0),1===this.slidesInGroup&&s<this.base.slideOuterWidth?this.resizeContext.slideOuterWidth=s:this.resizeContext.slideOuterWidth=this.base.slideOuterWidth,this.$cache["n2-ss-slide"].css({width:this.resizeContext.slideOuterWidth});var n,l,o=Math.floor((s-this.slidesInGroup*this.resizeContext.slideOuterWidth)/this.slidesInGroup/2);for(l=0;l<this.slider.visibleRealSlides.length;l++)(n={marginLeft:o,marginRight:o})[n2const.rtl.left]=this.slider.visibleRealSlides[l].groupIndex*(this.resizeContext.slideOuterWidth+2*o),this.slider.visibleRealSlides[l].$element.css(n);var a=this.slider.slides[this.slider.slides.length-1];if(a.slides.length!==this.slidesInGroup){var h=Math.floor((s-a.slides.length*this.resizeContext.slideOuterWidth)/a.slides.length/2);for(l=0;l<a.slides.length;l++)(n={marginLeft:h,marginRight:h})[n2const.rtl.left]=this.slider.visibleRealSlides[l].groupIndex*(this.resizeContext.slideOuterWidth+2*h),a.slides[l].$element.css(n)}this.resizeContext.slideWidth=this.resizeContext.slideOuterWidth-(this.base.slideOuterWidth-this.base.slideWidth),this.resizeContext.slideRatio=this.resizeContext.slideWidth/this.base.slideWidth,this.sliderElement.css({fontSize:this.prepareFontSize(16*this.resizeContext.slideRatio)})},e.prototype.getResizeStage2CSS=function(){var e=[];return this.stage2CalculateSlideHeight(e),this.stage2CalculateSliderHeight(e),e},e.prototype.stage2CalculateSlideHeight=function(e){var i=this.base.slideHeight,t=Math.floor(this.resizeContext.slideWidth/this.base.slideWidth*i);this.minimumSlideHeight=t,this.resizeContext.slideHeight=Math.max(t,this.getMinimumContentHeight()),this.resizeContext.slideOuterHeight=this.resizeContext.slideHeight+(this.base.slideOuterHeight-this.base.slideHeight),e.push(new N2Classes.CSSData(this.$cache["n2-ss-slide"],{height:this.resizeContext.slideOuterHeight}))},e.prototype.stage2CalculateSliderHeight=function(e){var i=this.parameters.sideSpacing[this.getDeviceGroup()],t=this.resizeContext.slideOuterHeight+i[0]+i[2]+(this.base.sliderHeight-this.base.slideContainerHeight),s=this.parameters.sizes[this.device];if(0<s.height){var r=Math.min(s.height,Math.floor(this.resizeContext.sliderWidth/s.width*s.height));t=Math.max(t,r)}this.resizeContext.sliderHeight=Math.max(t,this.parameters.minimumHeight,this.fullPageMinimumSliderHeight),this.resizeContext.sliderInnerHeight=this.resizeContext.sliderHeight-(this.base.sliderHeight-this.base.slideContainerHeight),this.resizeContext.slideContainerHeight=this.resizeContext.sliderHeight-(this.base.sliderHeight-this.base.slideContainerHeight),e.push(new N2Classes.CSSData(this.$cache["n2-ss-slider-3"],{height:this.resizeContext.slideContainerHeight}));var n=Math.floor((this.resizeContext.slideContainerHeight-this.resizeContext.slideOuterHeight-i[0]-i[2])/2),l=i[0]+n,o=i[2]+n;this.resizeContext.paneHeight=this.resizeContext.slideContainerHeight-l-o,e.push(new N2Classes.CSSData(this.$cache["n2-ss-slider-pane"],{height:this.resizeContext.paneHeight,marginTop:l,marginBottom:o}))},e.prototype.updateVisibleSlides=function(){this.forceSlidesGroupCalibration=!0},e.prototype.calibrateActiveSlide=function(e){if(this.state.StarterSlide){var i=e;if(this.slider.isAdmin)i=this.slider.originalRealStarterSlide;else if(i===n||!i.isVisible){var t=this.slider.currentSlide.slides;if(t[0].isVisible)i=t[0];else{var s=t[0].getPrevious();if(s)i=s;else{var r=t[0].getNext();i=r||this.slider.slides[0]}}}this.resetActiveRealSlide(i)}},e}),N2D("SmartSliderMainAnimationCarousel",["SmartSliderMainAnimationAbstract"],function(S,e){function t(e,i){switch(this.hideAxis="x",i=S.extend({type:"horizontal"},i),N2Classes.SmartSliderMainAnimationAbstract.prototype.constructor.apply(this,arguments),this.parameters.type){case"fade":this.animation=this._mainAnimationFade;break;case"no":this.parameters.duration=0,this.animation=this._mainAnimationFade;break;case"vertical":this.animation=this._mainAnimationVertical,this.hideAxis="y";break;default:this.animation=this._mainAnimationHorizontal}}return((t.prototype=Object.create(N2Classes.SmartSliderMainAnimationAbstract.prototype)).constructor=t).prototype.refreshSlideVisibility=function(){for(var e=0;e<this.slider.slides.length;e++)this.slider.slides[e]!==this.slider.currentSlide?this.hideSlide(this.slider.slides[e]):this.showSlide(this.slider.slides[e])},t.prototype.hideSlide=function(e){for(var i=0;i<e.slides.length;i++){var t={};t[this.hideAxis]=1e4,NextendTween.set(e.slides[i].$element,t)}},t.prototype.showSlide=function(e){for(var i=0;i<e.slides.length;i++){var t={};t[this.hideAxis]=0,NextendTween.set(e.slides[i].$element,t)}},t.prototype._initAnimation=function(e,i,t){this.animation(e,i,t)},t.prototype.onChangeToComplete=function(e,i,t){this.hideSlide(e),N2Classes.SmartSliderMainAnimationAbstract.prototype.onChangeToComplete.apply(this,arguments)},t.prototype._mainAnimationFade=function(e,t,s){var r=[];for(i=0;i<t.slides.length;i++)r.push(t.slides[i].$element[0]);var n=S(r),l=[];for(i=0;i<e.slides.length;i++)l.push(e.slides[i].$element[0]);var o=S(l);o.css("zIndex",5),this.showSlide(t),e.unsetActive(),t.setActive(),this.timeline.to(o,this.parameters.duration,{opacity:0,ease:this.getEase()},0),n.css("opacity",""),this.sliderElement.one("mainAnimationComplete.n2-carousel",function(e,i){e.css("zIndex","").css("opacity",""),i.css("opacity","")}.bind(this,o,n))},t.prototype._mainAnimationHorizontal=function(e,i,t){this.__mainAnimationDirection(e,i,"horizontal",t)},t.prototype._mainAnimationVertical=function(e,i,t){this.showSlide(i),this.__mainAnimationDirection(e,i,"vertical",t)},t.prototype.__mainAnimationDirection=function(e,i,t,s){var r,n="x",l=0,o=[];for(r=0;r<i.slides.length;r++)o.push(i.slides[r].$element[0]);var a=S(o),h=[];for(r=0;r<e.slides.length;r++)h.push(e.slides[r].$element[0]);var d=S(h);"horizontal"===t?l=n2const.isRTL()?-this.slider.responsive.resizeContext.paneWidth:this.slider.responsive.resizeContext.paneWidth:"vertical"===t&&(n="y",l=this.slider.responsive.resizeContext.paneHeight),s&&(l*=-1),a.css("zIndex",5),d.css("zIndex",4),e.unsetActive(),i.setActive();var p={},c={ease:this.getEase(),n2RoundProps:"x,y"};p[n]=l,c[n]=0,this.timeline.fromTo(a,this.parameters.duration,p,c,0);var u={},m={ease:this.getEase(),n2RoundProps:"x,y"};u[n]=0,m[n]=-l,this.timeline.fromTo(d,this.parameters.duration,u,m,0),this.sliderElement.one("mainAnimationComplete.n2-carousel",function(e,i){i.css("zIndex","").css(n,""),e.css("zIndex","")}.bind(this,d,a)),this.slider.updateInsideSlides([e,i])},t}),N2D("FrontendCarouselGroupOfSlides","FrontendSliderSlideAbstract",function(t,e){function i(e,i){N2Classes.FrontendSliderSlideAbstract.prototype.constructor.call(this,e,t("<div></div>"),i)}return((i.prototype=Object.create(N2Classes.FrontendSliderSlideAbstract.prototype)).constructor=i).prototype.is=function(e){if(this===e)return!0;for(var i=0;i<this.slides.length;i++)if(this.slides[i]===e)return!0;return!1},i.prototype.addSlide=function(e){e.groupIndex=this.slides.length,this.slides.push(e),e.group=this},i.prototype.destroy=function(){this.isVisible=0},i.prototype.call=function(e){for(var i=0;i<this.slides.length;i++)this.slides[i][e].call(this.slides[i])},i.prototype.playIn=function(){this.call("playIn")},i.prototype.playSpecialEventOnly=function(){this.call("playSpecialEventOnly")},i.prototype.suspend=function(){this.call("suspend")},i.prototype.playOut=function(){this.call("playOut")},i.prototype.onOutAnimationsPlayed=function(){this.call("onOutAnimationsPlayed")},i.prototype.reset=function(){this.call("reset")},i.prototype.setIndex=function(e){this._setIndex(e),N2Classes.FrontendSliderSlideAbstract.prototype.setIndex.call(this,e)},i.prototype.setInside=function(e){this.isInside=e,N2Classes.FrontendSliderSlideAbstract.prototype.setInside.call(this,e)},i.prototype.setActive=function(){this.call("setActive")},i.prototype.unsetActive=function(){this.call("unsetActive")},i.prototype.focus=function(){this.slides[0].focus()},i}),N2D("smartslider-carousel-type-frontend");