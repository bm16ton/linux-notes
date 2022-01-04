(self.AMP=self.AMP||[]).push({m:1,v:"2109032350000",n:"amp-auto-lightbox",ev:"0.1",l:true,f:function(AMP,_){function m(a){return a?Array.prototype.slice.call(a):[]}
/* https://mths.be/cssescape v1.5.1 by @mathias | MIT license */
function p(a,b){for(;a&&void 0!==a;a=a.parentElement)if(b(a))return a;return null}function q(a,b){return a.closest?a.closest(b):p(a,(c=>{let e=c.matches||c.webkitMatchesSelector||c.mozMatchesSelector||c.msMatchesSelector||c.oMatchesSelector;return e?e.call(c,b):!1}))}function u(a,b){for(a=a.lastElementChild;a;a=a.previousElementSibling)if(b(a))return a;return null}let v={bubbles:!0,cancelable:!0};let w;class x{constructor(){this.promise=new Promise(((a,b)=>{this.resolve=a;this.reject=b}))}}function y(a){a.tagName.startsWith("AMP-");if(a.createdCallback)return Promise.resolve(a);if(!a.__AMP_UPG_PRM){let b=new x;a.__AMP_UPG_PRM=b.promise;a.__AMP_UPG_RES=b.resolve}return a.__AMP_UPG_PRM}function z(a,b){var c={needsRootBounds:!1};let e=c.needsRootBounds;return new b.IntersectionObserver(a,{threshold:c.threshold,root:b.parent&&b.parent!=b&&e?b.document:void 0})}new WeakMap;new WeakMap;let A,B;function C(a){A||(A=new WeakMap,B=new WeakMap);let b=B.get(a);b||(b=z((c=>{let e=new Set;for(let d=c.length-1;0<=d;d--){let{target:f}=c[d];e.has(f)||(e.add(f),b.unobserve(f),A.get(f).resolve(c[d]),A.delete(f))}}),a),B.set(a,b));return b}function D(a){var b;if(null!==(b=A)&&void 0!==b&&b.has(a))return A.get(a).promise;C(a.ownerDocument.defaultView).observe(a);let c=new x;A.set(a,c);return c.promise}let E=self.AMP_CONFIG||{},F=("string"==typeof E.cdnProxyRegex?new RegExp(E.cdnProxyRegex):E.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/;function G(a){if(self.document&&self.document.head&&(!self.location||!F.test(self.location.origin))){var b=self.document.head.querySelector(`meta[name="${a}"]`);b&&b.getAttribute("content")}}E.cdnUrl||G("runtime-host");E.geoApiUrl||G("amp-geo-api");self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null};let H=self.__AMP_LOG;function I(a,b){a=a.__AMP_TOP||(a.__AMP_TOP=a);return J(a,b)}function N(a,b){var c=O(a);c=P(c);return J(c,b)}function O(a){return a.nodeType?I((a.ownerDocument||a).defaultView,"ampdoc").getAmpDoc(a):a}function P(a){a=O(a);return a.isSingleDoc()?a.win:a}function J(a,b){Q(a,b);let c=a.__AMP_SERVICES;c||(c=a.__AMP_SERVICES={});a=c[b];a.obj||(a.obj=new a.ctor(a.context),a.context=null,a.resolve&&a.resolve(a.obj));return a.obj}function Q(a,b){a=a.__AMP_SERVICES&&a.__AMP_SERVICES[b];return!(!a||!a.ctor)}let R;function S(a,b,c,e){let d=a,f=c,g=h=>{try{return f(h)}catch(r){var n,t;null===(n=(t=self).__AMP_REPORT_ERROR)||void 0===n?void 0:n.call(t,r);throw r}};let k=T(),l=!(null===e||void 0===e||!e.capture);d.addEventListener(b,g,k?e:l);return()=>{var h;null===(h=d)||void 0===h?void 0:h.removeEventListener(b,g,k?e:l);g=d=f=null}}function T(){if(void 0!==R)return R;R=!1;try{let a={get capture(){R=!0}};self.addEventListener("test-options",null,a);self.removeEventListener("test-options",null,a)}catch(a){}return R}function U(a,b,c,e){let d=c;let f=S(a,b,(g=>{try{d(g)}finally{d=null,f()}}),e);return f}function V(a){return!!(a.complete||"complete"==a.readyState||W(a)&&0<a.readyState||a.document&&"complete"==a.document.readyState)}function X(a){let b,c;if(V(a))return Promise.resolve(a);let e=W(a);return e&&a.__AMP_MEDIA_LOAD_FAILURE_SRC===a.currentSrc?Promise.reject(a):new Promise(((d,f)=>{b=e?U(a,"loadedmetadata",d,{capture:!0}):U(a,"load",d);if(a.tagName){var g=a;if(e&&!a.hasAttribute("src")&&(g=u(a,(k=>"SOURCE"===k.tagName)),!g))return f(Error("Media has no source."));c=U(g,"error",f)}})).then((()=>{c&&c();return a}),(()=>{b&&b();W(a)&&(a.__AMP_MEDIA_LOAD_FAILURE_SRC=a.currentSrc||!0);let d=a;d&&d.src&&(d=d.src);if(!H.user)throw Error("failed to call initLogConstructor");throw H.user.createError("Failed to load:",d)}))}function W(a){return"AUDIO"===a.tagName||"VIDEO"===a.tagName}/nochunking=1/.test(self.location.hash);(function(){return w?w:w=Promise.resolve(void 0)})();let aa={Article:!0,NewsArticle:!0,BlogPosting:!0,LiveBlogPosting:!0,DiscussionForumPosting:!0},ba=()=>{},ca=/\s+([0-9]+)w(,|[\S\s]*$)/g;function da(a){return N(a,"mutator").mutateElement(a,(()=>{a.setAttribute("i-amphtml-auto-lightbox-visited","")}))}function ea(){return["amp-img","img"].map((a=>`${a}:not([lightbox]):not([i-amphtml-auto-lightbox-visited])`)).join(",")}function fa(a){return"IMG"===a.tagName?X(a):y(a).then((b=>b.signals().whenSignal("load-end")))}function ha(a){return m(a.getRootNode().querySelectorAll('script[type="application/ld+json"]')).map((b=>{try{var c=JSON.parse(b.textContent)}catch(e){void 0,c=null}return(c||{})["@type"]})).filter(Boolean)}function ia(a){return ha(a).some((b=>aa[b]))}function ja(a){let b=c=>!!a.getRootNode().querySelector(c);return b('script[custom-element="amp-lightbox-gallery"]')&&b("[lightbox]:not([i-amphtml-auto-lightbox-visited])")}let ka=0;function la(a,b){return N(a,"mutator").mutateElement(b,(()=>{b.setAttribute("lightbox",`i-amphtml-auto-lightbox-${ka++}`)})).then((()=>{I(a.win,"extensions").installExtensionForDoc(a,"amp-lightbox-gallery");let c=b.ownerDocument.createEvent("Event");c.data={};let{bubbles:e,cancelable:d}=v;c.initEvent("amp-auto-lightbox:newly-set",e,d);b.dispatchEvent(c);return b}))}function ma(a,b){b.map((c=>fa(c).then((()=>D(c).then((({boundingClientRect:e})=>{var d;if(d="IMG"===c.tagName||c.signals().get("load-end")){d=e.width;var f=e.height,g=c.querySelector("img")||c,k=g.naturalHeight;let n=g.naturalWidth,t=n/k;var l=-1;if(g=g.getAttribute("srcset"))for(var h;h=ca.exec(g);)h=parseInt(h[1],10),h>l&&(l=h);let{naturalHeight:r,naturalWidth:K}=l>n?{naturalWidth:l,naturalHeight:l/t}:{naturalWidth:n,naturalHeight:k};k=N(a,"viewport");let{height:L,width:M}=k.getSize();d*=f;f=.25<=d/(M*L);k=K>M||r>L;if(d=1.2<=K*r/d||k||f)"IMG"===c.tagName&&q(c,"amp-img")||q(c,"a[href],amp-script,amp-story,button,amp-lightbox,amp-carousel,[placeholder],[data-amp-auto-lightbox-disable],amp-selector [option],[subscriptions-action]")?d=!1:(d=O(a||c),d=P(d),d=!(Q(d,"action")?J(d,"action"):null).hasResolvableAction(c,"tap"))}if(d)return la(a,c)}))),ba)))}function Y(a){var b=Z;if(ja(b))var c=0;else c=(c=b.getRootNode().querySelector('meta[property="og:type"]'))?c.getAttribute("content"):void 0,c="article"==c||ia(b);if(c){c=a||b.win.document;let e=ea();c=m(c.querySelectorAll(e));c.forEach(da);ma(b,c)}}let Z=AMP.ampdoc;Z.whenReady().then((()=>{Z.getRootNode().addEventListener("amp:dom-update",(a=>{Y(a.target)}));Y()}))}});//# sourceMappingURL=amp-auto-lightbox-0.1.mjs.map