/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /npm/css-element-queries@1.2.2/src/ResizeSensor.js
 * 
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
"use strict";!function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.ResizeSensor=t()}("undefined"!=typeof window?window:this,function(){if("undefined"==typeof window)return null;var e="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),t=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame||function(t){return e.setTimeout(t,20)};function n(e,t){var n=Object.prototype.toString.call(e),i="[object Array]"===n||"[object NodeList]"===n||"[object HTMLCollection]"===n||"[object Object]"===n||"undefined"!=typeof jQuery&&e instanceof jQuery||"undefined"!=typeof Elements&&e instanceof Elements,o=0,r=e.length;if(i)for(;o<r;o++)t(e[o]);else t(e)}function i(e){if(!e.getBoundingClientRect)return{width:e.offsetWidth,height:e.offsetHeight};var t=e.getBoundingClientRect();return{width:Math.round(t.width),height:Math.round(t.height)}}function o(e,t){Object.keys(t).forEach(function(n){e.style[n]=t[n]})}var r=function(e,s){var d=0;function a(){var e,t,n=[];this.add=function(e){n.push(e)},this.call=function(i){for(e=0,t=n.length;e<t;e++)n[e].call(this,i)},this.remove=function(i){var o=[];for(e=0,t=n.length;e<t;e++)n[e]!==i&&o.push(n[e]);n=o},this.length=function(){return n.length}}function c(e,n){if(e)if(e.resizedAttached)e.resizedAttached.add(n);else{e.resizedAttached=new a,e.resizedAttached.add(n),e.resizeSensor=document.createElement("div"),e.resizeSensor.dir="ltr",e.resizeSensor.className="resize-sensor";var r={pointerEvents:"none",position:"absolute",left:"0px",top:"0px",right:"0px",bottom:"0px",overflow:"hidden",zIndex:"-1",visibility:"hidden",maxWidth:"100%"},s={position:"absolute",left:"0px",top:"0px",transition:"0s"};o(e.resizeSensor,r);var c=document.createElement("div");c.className="resize-sensor-expand",o(c,r);var f=document.createElement("div");o(f,s),c.appendChild(f);var h=document.createElement("div");h.className="resize-sensor-shrink",o(h,r);var l=document.createElement("div");o(l,s),o(l,{width:"200%",height:"200%"}),h.appendChild(l),e.resizeSensor.appendChild(c),e.resizeSensor.appendChild(h),e.appendChild(e.resizeSensor);var u,p,v=window.getComputedStyle(e),m=v?v.getPropertyValue("position"):null;"absolute"!==m&&"relative"!==m&&"fixed"!==m&&"sticky"!==m&&(e.style.position="relative");var z=i(e),w=0,g=0,y=!0;d=0;var S=function(){if(y){if(0===e.offsetWidth&&0===e.offsetHeight)return void(d||(d=t(function(){d=0,S()})));y=!1}var n,i;n=e.offsetWidth,i=e.offsetHeight,f.style.width=n+10+"px",f.style.height=i+10+"px",c.scrollLeft=n+10,c.scrollTop=i+10,h.scrollLeft=n+10,h.scrollTop=i+10};e.resizeSensor.resetSensor=S;var b=function(){p=0,u&&(w=z.width,g=z.height,e.resizedAttached&&e.resizedAttached.call(z))},A=function(){z=i(e),(u=z.width!==w||z.height!==g)&&!p&&(p=t(b)),S()},x=function(e,t,n){e.attachEvent?e.attachEvent("on"+t,n):e.addEventListener(t,n)};x(c,"scroll",A),x(h,"scroll",A),d=t(S)}}n(e,function(e){c(e,s)}),this.detach=function(t){d||(window.cancelAnimationFrame(d),d=0),r.detach(e,t)},this.reset=function(){e.resizeSensor.resetSensor()}};if(r.reset=function(e){n(e,function(e){e.resizeSensor.resetSensor()})},r.detach=function(e,t){n(e,function(e){e&&(e.resizedAttached&&"function"==typeof t&&(e.resizedAttached.remove(t),e.resizedAttached.length())||e.resizeSensor&&(e.contains(e.resizeSensor)&&e.removeChild(e.resizeSensor),delete e.resizeSensor,delete e.resizedAttached))})},"undefined"!=typeof MutationObserver){var s=new MutationObserver(function(e){for(var t in e)if(e.hasOwnProperty(t))for(var n=e[t].addedNodes,i=0;i<n.length;i++)n[i].resizeSensor&&r.reset(n[i])});document.addEventListener("DOMContentLoaded",function(e){s.observe(document.body,{childList:!0,subtree:!0})})}return r});
//# sourceMappingURL=/sm/14d355a2c1a636079709bc2562c20ea99cebd90ee2cba7282e3ccae202cc060e.map