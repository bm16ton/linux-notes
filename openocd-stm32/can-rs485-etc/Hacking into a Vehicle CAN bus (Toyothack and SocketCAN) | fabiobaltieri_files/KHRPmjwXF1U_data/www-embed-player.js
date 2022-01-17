(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';var m;function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}
var ba="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
function ca(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}
var da=ca(this);function r(a,b){if(b)a:{var c=da;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];if(!(e in c))break a;c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&ba(c,a,{configurable:!0,writable:!0,value:b})}}
r("Symbol",function(a){function b(f){if(this instanceof b)throw new TypeError("Symbol is not a constructor");return new c(d+(f||"")+"_"+e++,f)}
function c(f,g){this.h=f;ba(this,"description",{configurable:!0,writable:!0,value:g})}
if(a)return a;c.prototype.toString=function(){return this.h};
var d="jscomp_symbol_"+(1E9*Math.random()>>>0)+"_",e=0;return b});
r("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=da[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&ba(d.prototype,a,{configurable:!0,writable:!0,value:function(){return ea(aa(this))}})}return a});
function ea(a){a={next:a};a[Symbol.iterator]=function(){return this};
return a}
function t(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}
function fa(a){if(!(a instanceof Array)){a=t(a);for(var b,c=[];!(b=a.next()).done;)c.push(b.value);a=c}return a}
var ha="function"==typeof Object.create?Object.create:function(a){function b(){}
b.prototype=a;return new b},ia=function(){function a(){function c(){}
new c;Reflect.construct(c,[],function(){});
return new c instanceof c}
if("undefined"!=typeof Reflect&&Reflect.construct){if(a())return Reflect.construct;var b=Reflect.construct;return function(c,d,e){c=b(c,d);e&&Reflect.setPrototypeOf(c,e.prototype);return c}}return function(c,d,e){void 0===e&&(e=c);
e=ha(e.prototype||Object.prototype);return Function.prototype.apply.call(c,e,d)||e}}(),ja;
if("function"==typeof Object.setPrototypeOf)ja=Object.setPrototypeOf;else{var ka;a:{var la={a:!0},ma={};try{ma.__proto__=la;ka=ma.a;break a}catch(a){}ka=!1}ja=ka?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var na=ja;
function v(a,b){a.prototype=ha(b.prototype);a.prototype.constructor=a;if(na)na(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.S=b.prototype}
function oa(){this.o=!1;this.l=null;this.i=void 0;this.h=1;this.u=this.m=0;this.D=this.j=null}
function pa(a){if(a.o)throw new TypeError("Generator is already running");a.o=!0}
oa.prototype.B=function(a){this.i=a};
function qa(a,b){a.j={gb:b,ib:!0};a.h=a.m||a.u}
oa.prototype.return=function(a){this.j={return:a};this.h=this.u};
function w(a,b,c){a.h=c;return{value:b}}
oa.prototype.A=function(a){this.h=a};
function ra(a,b,c){a.m=b;void 0!=c&&(a.u=c)}
function sa(a){a.m=0;var b=a.j.gb;a.j=null;return b}
function ta(a){a.D=[a.j];a.m=0;a.u=0}
function ua(a){var b=a.D.splice(0)[0];(b=a.j=a.j||b)?b.ib?a.h=a.m||a.u:void 0!=b.A&&a.u<b.A?(a.h=b.A,a.j=null):a.h=a.u:a.h=0}
function va(a){this.h=new oa;this.i=a}
function wa(a,b){pa(a.h);var c=a.h.l;if(c)return xa(a,"return"in c?c["return"]:function(d){return{value:d,done:!0}},b,a.h.return);
a.h.return(b);return za(a)}
function xa(a,b,c,d){try{var e=b.call(a.h.l,c);if(!(e instanceof Object))throw new TypeError("Iterator result "+e+" is not an object");if(!e.done)return a.h.o=!1,e;var f=e.value}catch(g){return a.h.l=null,qa(a.h,g),za(a)}a.h.l=null;d.call(a.h,f);return za(a)}
function za(a){for(;a.h.h;)try{var b=a.i(a.h);if(b)return a.h.o=!1,{value:b.value,done:!1}}catch(c){a.h.i=void 0,qa(a.h,c)}a.h.o=!1;if(a.h.j){b=a.h.j;a.h.j=null;if(b.ib)throw b.gb;return{value:b.return,done:!0}}return{value:void 0,done:!0}}
function Ca(a){this.next=function(b){pa(a.h);a.h.l?b=xa(a,a.h.l.next,b,a.h.B):(a.h.B(b),b=za(a));return b};
this.throw=function(b){pa(a.h);a.h.l?b=xa(a,a.h.l["throw"],b,a.h.B):(qa(a.h,b),b=za(a));return b};
this.return=function(b){return wa(a,b)};
this[Symbol.iterator]=function(){return this}}
function Da(a){function b(d){return a.next(d)}
function c(d){return a.throw(d)}
return new Promise(function(d,e){function f(g){g.done?d(g.value):Promise.resolve(g.value).then(b,c).then(f,e)}
f(a.next())})}
function x(a){return Da(new Ca(new va(a)))}
r("Reflect",function(a){return a?a:{}});
r("Reflect.construct",function(){return ia});
r("Reflect.setPrototypeOf",function(a){return a?a:na?function(b,c){try{return na(b,c),!0}catch(d){return!1}}:null});
r("Promise",function(a){function b(g){this.h=0;this.j=void 0;this.i=[];this.o=!1;var h=this.l();try{g(h.resolve,h.reject)}catch(k){h.reject(k)}}
function c(){this.h=null}
function d(g){return g instanceof b?g:new b(function(h){h(g)})}
if(a)return a;c.prototype.i=function(g){if(null==this.h){this.h=[];var h=this;this.j(function(){h.u()})}this.h.push(g)};
var e=da.setTimeout;c.prototype.j=function(g){e(g,0)};
c.prototype.u=function(){for(;this.h&&this.h.length;){var g=this.h;this.h=[];for(var h=0;h<g.length;++h){var k=g[h];g[h]=null;try{k()}catch(l){this.l(l)}}}this.h=null};
c.prototype.l=function(g){this.j(function(){throw g;})};
b.prototype.l=function(){function g(l){return function(n){k||(k=!0,l.call(h,n))}}
var h=this,k=!1;return{resolve:g(this.R),reject:g(this.u)}};
b.prototype.R=function(g){if(g===this)this.u(new TypeError("A Promise cannot resolve to itself"));else if(g instanceof b)this.ka(g);else{a:switch(typeof g){case "object":var h=null!=g;break a;case "function":h=!0;break a;default:h=!1}h?this.N(g):this.m(g)}};
b.prototype.N=function(g){var h=void 0;try{h=g.then}catch(k){this.u(k);return}"function"==typeof h?this.la(h,g):this.m(g)};
b.prototype.u=function(g){this.B(2,g)};
b.prototype.m=function(g){this.B(1,g)};
b.prototype.B=function(g,h){if(0!=this.h)throw Error("Cannot settle("+g+", "+h+"): Promise already settled in state"+this.h);this.h=g;this.j=h;2===this.h&&this.Y();this.D()};
b.prototype.Y=function(){var g=this;e(function(){if(g.H()){var h=da.console;"undefined"!==typeof h&&h.error(g.j)}},1)};
b.prototype.H=function(){if(this.o)return!1;var g=da.CustomEvent,h=da.Event,k=da.dispatchEvent;if("undefined"===typeof k)return!0;"function"===typeof g?g=new g("unhandledrejection",{cancelable:!0}):"function"===typeof h?g=new h("unhandledrejection",{cancelable:!0}):(g=da.document.createEvent("CustomEvent"),g.initCustomEvent("unhandledrejection",!1,!0,g));g.promise=this;g.reason=this.j;return k(g)};
b.prototype.D=function(){if(null!=this.i){for(var g=0;g<this.i.length;++g)f.i(this.i[g]);this.i=null}};
var f=new c;b.prototype.ka=function(g){var h=this.l();g.xa(h.resolve,h.reject)};
b.prototype.la=function(g,h){var k=this.l();try{g.call(h,k.resolve,k.reject)}catch(l){k.reject(l)}};
b.prototype.then=function(g,h){function k(u,p){return"function"==typeof u?function(y){try{l(u(y))}catch(C){n(C)}}:p}
var l,n,q=new b(function(u,p){l=u;n=p});
this.xa(k(g,l),k(h,n));return q};
b.prototype.catch=function(g){return this.then(void 0,g)};
b.prototype.xa=function(g,h){function k(){switch(l.h){case 1:g(l.j);break;case 2:h(l.j);break;default:throw Error("Unexpected state: "+l.h);}}
var l=this;null==this.i?f.i(k):this.i.push(k);this.o=!0};
b.resolve=d;b.reject=function(g){return new b(function(h,k){k(g)})};
b.race=function(g){return new b(function(h,k){for(var l=t(g),n=l.next();!n.done;n=l.next())d(n.value).xa(h,k)})};
b.all=function(g){var h=t(g),k=h.next();return k.done?d([]):new b(function(l,n){function q(y){return function(C){u[y]=C;p--;0==p&&l(u)}}
var u=[],p=0;do u.push(void 0),p++,d(k.value).xa(q(u.length-1),n),k=h.next();while(!k.done)})};
return b});
function Ea(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
r("WeakMap",function(a){function b(k){this.h=(h+=Math.random()+1).toString();if(k){k=t(k);for(var l;!(l=k.next()).done;)l=l.value,this.set(l[0],l[1])}}
function c(){}
function d(k){var l=typeof k;return"object"===l&&null!==k||"function"===l}
function e(k){if(!Ea(k,g)){var l=new c;ba(k,g,{value:l})}}
function f(k){var l=Object[k];l&&(Object[k]=function(n){if(n instanceof c)return n;Object.isExtensible(n)&&e(n);return l(n)})}
if(function(){if(!a||!Object.seal)return!1;try{var k=Object.seal({}),l=Object.seal({}),n=new a([[k,2],[l,3]]);if(2!=n.get(k)||3!=n.get(l))return!1;n.delete(k);n.set(l,4);return!n.has(k)&&4==n.get(l)}catch(q){return!1}}())return a;
var g="$jscomp_hidden_"+Math.random();f("freeze");f("preventExtensions");f("seal");var h=0;b.prototype.set=function(k,l){if(!d(k))throw Error("Invalid WeakMap key");e(k);if(!Ea(k,g))throw Error("WeakMap key fail: "+k);k[g][this.h]=l;return this};
b.prototype.get=function(k){return d(k)&&Ea(k,g)?k[g][this.h]:void 0};
b.prototype.has=function(k){return d(k)&&Ea(k,g)&&Ea(k[g],this.h)};
b.prototype.delete=function(k){return d(k)&&Ea(k,g)&&Ea(k[g],this.h)?delete k[g][this.h]:!1};
return b});
r("Map",function(a){function b(){var h={};return h.previous=h.next=h.head=h}
function c(h,k){var l=h.h;return ea(function(){if(l){for(;l.head!=h.h;)l=l.previous;for(;l.next!=l.head;)return l=l.next,{done:!1,value:k(l)};l=null}return{done:!0,value:void 0}})}
function d(h,k){var l=k&&typeof k;"object"==l||"function"==l?f.has(k)?l=f.get(k):(l=""+ ++g,f.set(k,l)):l="p_"+k;var n=h.data_[l];if(n&&Ea(h.data_,l))for(h=0;h<n.length;h++){var q=n[h];if(k!==k&&q.key!==q.key||k===q.key)return{id:l,list:n,index:h,entry:q}}return{id:l,list:n,index:-1,entry:void 0}}
function e(h){this.data_={};this.h=b();this.size=0;if(h){h=t(h);for(var k;!(k=h.next()).done;)k=k.value,this.set(k[0],k[1])}}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var h=Object.seal({x:4}),k=new a(t([[h,"s"]]));if("s"!=k.get(h)||1!=k.size||k.get({x:4})||k.set({x:4},"t")!=k||2!=k.size)return!1;var l=k.entries(),n=l.next();if(n.done||n.value[0]!=h||"s"!=n.value[1])return!1;n=l.next();return n.done||4!=n.value[0].x||"t"!=n.value[1]||!l.next().done?!1:!0}catch(q){return!1}}())return a;
var f=new WeakMap;e.prototype.set=function(h,k){h=0===h?0:h;var l=d(this,h);l.list||(l.list=this.data_[l.id]=[]);l.entry?l.entry.value=k:(l.entry={next:this.h,previous:this.h.previous,head:this.h,key:h,value:k},l.list.push(l.entry),this.h.previous.next=l.entry,this.h.previous=l.entry,this.size++);return this};
e.prototype.delete=function(h){h=d(this,h);return h.entry&&h.list?(h.list.splice(h.index,1),h.list.length||delete this.data_[h.id],h.entry.previous.next=h.entry.next,h.entry.next.previous=h.entry.previous,h.entry.head=null,this.size--,!0):!1};
e.prototype.clear=function(){this.data_={};this.h=this.h.previous=b();this.size=0};
e.prototype.has=function(h){return!!d(this,h).entry};
e.prototype.get=function(h){return(h=d(this,h).entry)&&h.value};
e.prototype.entries=function(){return c(this,function(h){return[h.key,h.value]})};
e.prototype.keys=function(){return c(this,function(h){return h.key})};
e.prototype.values=function(){return c(this,function(h){return h.value})};
e.prototype.forEach=function(h,k){for(var l=this.entries(),n;!(n=l.next()).done;)n=n.value,h.call(k,n[1],n[0],this)};
e.prototype[Symbol.iterator]=e.prototype.entries;var g=0;return e});
function Fa(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""}
r("String.prototype.endsWith",function(a){return a?a:function(b,c){var d=Fa(this,b,"endsWith");b+="";void 0===c&&(c=d.length);c=Math.max(0,Math.min(c|0,d.length));for(var e=b.length;0<e&&0<c;)if(d[--c]!=b[--e])return!1;return 0>=e}});
r("Array.prototype.find",function(a){return a?a:function(b,c){a:{var d=this;d instanceof String&&(d=String(d));for(var e=d.length,f=0;f<e;f++){var g=d[f];if(b.call(c,g,f,d)){b=g;break a}}b=void 0}return b}});
r("String.prototype.startsWith",function(a){return a?a:function(b,c){var d=Fa(this,b,"startsWith");b+="";var e=d.length,f=b.length;c=Math.max(0,Math.min(c|0,d.length));for(var g=0;g<f&&c<e;)if(d[c++]!=b[g++])return!1;return g>=f}});
r("Object.setPrototypeOf",function(a){return a||na});
var Ga="function"==typeof Object.assign?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)Ea(d,e)&&(a[e]=d[e])}return a};
r("Object.assign",function(a){return a||Ga});
function Ha(a,b){a instanceof String&&(a+="");var c=0,d=!1,e={next:function(){if(!d&&c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d=!0;return{done:!0,value:void 0}}};
e[Symbol.iterator]=function(){return e};
return e}
r("Array.prototype.entries",function(a){return a?a:function(){return Ha(this,function(b,c){return[b,c]})}});
r("Set",function(a){function b(c){this.h=new Map;if(c){c=t(c);for(var d;!(d=c.next()).done;)this.add(d.value)}this.size=this.h.size}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var c=Object.seal({x:4}),d=new a(t([c]));if(!d.has(c)||1!=d.size||d.add(c)!=d||1!=d.size||d.add({x:4})!=d||2!=d.size)return!1;var e=d.entries(),f=e.next();if(f.done||f.value[0]!=c||f.value[1]!=c)return!1;f=e.next();return f.done||f.value[0]==c||4!=f.value[0].x||f.value[1]!=f.value[0]?!1:e.next().done}catch(g){return!1}}())return a;
b.prototype.add=function(c){c=0===c?0:c;this.h.set(c,c);this.size=this.h.size;return this};
b.prototype.delete=function(c){c=this.h.delete(c);this.size=this.h.size;return c};
b.prototype.clear=function(){this.h.clear();this.size=0};
b.prototype.has=function(c){return this.h.has(c)};
b.prototype.entries=function(){return this.h.entries()};
b.prototype.values=function(){return this.h.values()};
b.prototype.keys=b.prototype.values;b.prototype[Symbol.iterator]=b.prototype.values;b.prototype.forEach=function(c,d){var e=this;this.h.forEach(function(f){return c.call(d,f,f,e)})};
return b});
r("Object.entries",function(a){return a?a:function(b){var c=[],d;for(d in b)Ea(b,d)&&c.push([d,b[d]]);return c}});
r("Array.prototype.keys",function(a){return a?a:function(){return Ha(this,function(b){return b})}});
r("Array.prototype.values",function(a){return a?a:function(){return Ha(this,function(b,c){return c})}});
r("Object.is",function(a){return a?a:function(b,c){return b===c?0!==b||1/b===1/c:b!==b&&c!==c}});
r("Array.prototype.includes",function(a){return a?a:function(b,c){var d=this;d instanceof String&&(d=String(d));var e=d.length;c=c||0;for(0>c&&(c=Math.max(c+e,0));c<e;c++){var f=d[c];if(f===b||Object.is(f,b))return!0}return!1}});
r("String.prototype.includes",function(a){return a?a:function(b,c){return-1!==Fa(this,b,"includes").indexOf(b,c||0)}});
r("Array.from",function(a){return a?a:function(b,c,d){c=null!=c?c:function(h){return h};
var e=[],f="undefined"!=typeof Symbol&&Symbol.iterator&&b[Symbol.iterator];if("function"==typeof f){b=f.call(b);for(var g=0;!(f=b.next()).done;)e.push(c.call(d,f.value,g++))}else for(f=b.length,g=0;g<f;g++)e.push(c.call(d,b[g],g));return e}});
r("Number.isNaN",function(a){return a?a:function(b){return"number"===typeof b&&isNaN(b)}});
r("Number.MAX_SAFE_INTEGER",function(){return 9007199254740991});
r("Object.values",function(a){return a?a:function(b){var c=[],d;for(d in b)Ea(b,d)&&c.push(b[d]);return c}});
var z=this||self;function A(a,b,c){a=a.split(".");c=c||z;a[0]in c||"undefined"==typeof c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b}
function B(a,b){a=a.split(".");b=b||z;for(var c=0;c<a.length;c++)if(b=b[a[c]],null==b)return null;return b}
function Ia(){}
function Ja(a){a.Qa=void 0;a.getInstance=function(){return a.Qa?a.Qa:a.Qa=new a}}
function Ka(a){var b=typeof a;return"object"!=b?b:a?Array.isArray(a)?"array":b:"null"}
function La(a){var b=Ka(a);return"array"==b||"object"==b&&"number"==typeof a.length}
function Na(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
function Oa(a){return Object.prototype.hasOwnProperty.call(a,Pa)&&a[Pa]||(a[Pa]=++Qa)}
var Pa="closure_uid_"+(1E9*Math.random()>>>0),Qa=0;function Ra(a,b,c){return a.call.apply(a.bind,arguments)}
function Sa(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}}
function Ta(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?Ta=Ra:Ta=Sa;return Ta.apply(null,arguments)}
function Ua(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();d.push.apply(d,arguments);return a.apply(this,d)}}
function Va(a,b){A(a,b,void 0)}
function D(a,b){function c(){}
c.prototype=b.prototype;a.S=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Qm=function(d,e,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[e].apply(d,g)}}
function Wa(a){return a}
;function Xa(a,b){if(Error.captureStackTrace)Error.captureStackTrace(this,Xa);else{var c=Error().stack;c&&(this.stack=c)}a&&(this.message=String(a));void 0!==b&&(this.vb=b)}
D(Xa,Error);Xa.prototype.name="CustomError";function Ya(a){a=a.url;var b=/[?&]dsh=1(&|$)/.test(a);this.j=!b&&/[?&]ae=1(&|$)/.test(a);this.l=!b&&/[?&]ae=2(&|$)/.test(a);if((this.h=/[?&]adurl=([^&]*)/.exec(a))&&this.h[1]){try{var c=decodeURIComponent(this.h[1])}catch(d){c=null}this.i=c}}
;function Za(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}
;var $a=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if("string"===typeof a)return"string"!==typeof b||1!=b.length?-1:a.indexOf(b,0);
for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},E=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e="string"===typeof a?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},ab=Array.prototype.filter?function(a,b){return Array.prototype.filter.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=[],e=0,f="string"===typeof a?a.split(""):a,g=0;g<c;g++)if(g in f){var h=f[g];
b.call(void 0,h,g,a)&&(d[e++]=h)}return d},bb=Array.prototype.map?function(a,b){return Array.prototype.map.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=Array(c),e="string"===typeof a?a.split(""):a,f=0;f<c;f++)f in e&&(d[f]=b.call(void 0,e[f],f,a));
return d},cb=Array.prototype.reduce?function(a,b,c){return Array.prototype.reduce.call(a,b,c)}:function(a,b,c){var d=c;
E(a,function(e,f){d=b.call(void 0,d,e,f,a)});
return d};
function db(a,b){a:{for(var c=a.length,d="string"===typeof a?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:"string"===typeof a?a.charAt(b):a[b]}
function eb(a,b){b=$a(a,b);var c;(c=0<=b)&&Array.prototype.splice.call(a,b,1);return c}
function fb(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}
function gb(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(La(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}}
;function hb(a,b){for(var c in a)b.call(void 0,a[c],c,a)}
function ib(a){var b=jb,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
function kb(a){for(var b in a)return!1;return!0}
function lb(a,b){if(null!==a&&b in a)throw Error('The object already contains the key "'+b+'"');a[b]=!0}
function mb(){var a=G("PLAYER_VARS",{});return null!==a&&"privembed"in a?a.privembed:!1}
function nb(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(var d in b)if(!(d in a))return!1;return!0}
function ob(a){var b={},c;for(c in a)b[c]=a[c];return b}
function pb(a){if(!a||"object"!==typeof a)return a;if("function"===typeof a.clone)return a.clone();if("undefined"!==typeof Map&&a instanceof Map)return new Map(a);if("undefined"!==typeof Set&&a instanceof Set)return new Set(a);var b=Array.isArray(a)?[]:"function"!==typeof ArrayBuffer||"function"!==typeof ArrayBuffer.isView||!ArrayBuffer.isView(a)||a instanceof DataView?{}:new a.constructor(a.length),c;for(c in a)b[c]=pb(a[c]);return b}
var qb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function rb(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<qb.length;f++)c=qb[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;var sb;function tb(){if(void 0===sb){var a=null,b=z.trustedTypes;if(b&&b.createPolicy){try{a=b.createPolicy("goog#html",{createHTML:Wa,createScript:Wa,createScriptURL:Wa})}catch(c){z.console&&z.console.error(c.message)}sb=a}else sb=a}return sb}
;function ub(a,b){this.h=a===vb&&b||""}
ub.prototype.ca=!0;ub.prototype.ba=function(){return this.h};
function wb(a){return new ub(vb,a)}
var vb={};wb("");var xb={};function yb(a){this.h=xb===xb?a:"";this.ca=!0}
yb.prototype.ba=function(){return this.h.toString()};
yb.prototype.toString=function(){return this.h.toString()};function zb(a,b){this.h=b===Ab?a:""}
m=zb.prototype;m.ca=!0;m.ba=function(){return this.h.toString()};
m.Pa=!0;m.La=function(){return 1};
m.toString=function(){return this.h+""};
function Bb(a){if(a instanceof zb&&a.constructor===zb)return a.h;Ka(a);return"type_error:TrustedResourceUrl"}
var Ab={};function Cb(a){var b=tb();a=b?b.createScriptURL(a):a;return new zb(a,Ab)}
;var Db=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]},Eb=/&/g,Fb=/</g,Gb=/>/g,Ib=/"/g,Jb=/'/g,Kb=/\x00/g,Lb=/[\x00&<>"']/;function Mb(a,b){this.h=b===Nb?a:""}
m=Mb.prototype;m.ca=!0;m.ba=function(){return this.h.toString()};
m.Pa=!0;m.La=function(){return 1};
m.toString=function(){return this.h.toString()};
function Ob(a){if(a instanceof Mb&&a.constructor===Mb)return a.h;Ka(a);return"type_error:SafeUrl"}
var Pb=RegExp('^(?:audio/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|font/\\w+|image/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|video/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))(?:;\\w+=(?:\\w+|"[\\w;,= ]+"))*$',"i"),Qb=/^data:(.*);base64,[a-z0-9+\/]+=*$/i,Rb=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,Nb={},Sb=new Mb("about:invalid#zClosurez",Nb);var Tb;a:{var Ub=z.navigator;if(Ub){var Vb=Ub.userAgent;if(Vb){Tb=Vb;break a}}Tb=""}function H(a){return-1!=Tb.indexOf(a)}
;function Wb(){return(H("Chrome")||H("CriOS"))&&!H("Edge")}
;var Xb={};function Yb(a,b,c){this.h=c===Xb?a:"";this.i=b;this.ca=this.Pa=!0}
Yb.prototype.La=function(){return this.i};
Yb.prototype.ba=function(){return this.h.toString()};
Yb.prototype.toString=function(){return this.h.toString()};
function Zb(a,b){var c=tb();a=c?c.createHTML(a):a;return new Yb(a,b,Xb)}
;function $b(a,b){b instanceof Mb||b instanceof Mb||(b="object"==typeof b&&b.ca?b.ba():String(b),Rb.test(b)||(b="about:invalid#zClosurez"),b=new Mb(b,Nb));a.href=Ob(b)}
function ac(a,b){a.rel="stylesheet";a.href=Bb(b).toString();(b=bc('style[nonce],link[rel="stylesheet"][nonce]',a.ownerDocument&&a.ownerDocument.defaultView))&&a.setAttribute("nonce",b)}
function cc(){return bc("script[nonce]",void 0)}
var dc=/^[\w+/_-]+[=]{0,2}$/;function bc(a,b){b=(b||z).document;return b.querySelector?(a=b.querySelector(a))&&(a=a.nonce||a.getAttribute("nonce"))&&dc.test(a)?a:"":""}
;function ec(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c)>>>0;return b}
;var fc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function gc(a){return a?decodeURI(a):a}
function hc(a){return gc(a.match(fc)[3]||null)}
function ic(a,b,c){if(Array.isArray(b))for(var d=0;d<b.length;d++)ic(a,String(b[d]),c);else null!=b&&c.push(a+(""===b?"":"="+encodeURIComponent(String(b))))}
function jc(a){var b=[],c;for(c in a)ic(c,a[c],b);return b.join("&")}
function kc(a,b){b=jc(b);if(b){var c=a.indexOf("#");0>c&&(c=a.length);var d=a.indexOf("?");if(0>d||d>c){d=c;var e=""}else e=a.substring(d+1,c);a=[a.substr(0,d),e,a.substr(c)];c=a[1];a[1]=b?c?c+"&"+b:b:c;b=a[0]+(a[1]?"?"+a[1]:"")+a[2]}else b=a;return b}
var lc=/#|$/;function mc(a){z.setTimeout(function(){throw a;},0)}
;var nc="symbol"===typeof Symbol(),oc=Symbol("INTERNAL_ARRAY_STATE");function pc(a){if(!Array.isArray(a))return a;Object.isFrozen(a)||(nc?a[oc]|=1:void 0!==a.h?a.h|=1:Object.defineProperties(a,{h:{value:1,configurable:!0,writable:!0,enumerable:!1}}));return a}
;function qc(){return H("iPhone")&&!H("iPod")&&!H("iPad")}
;function rc(a){rc[" "](a);return a}
rc[" "]=Ia;var sc=H("Opera"),tc=H("Trident")||H("MSIE"),uc=H("Edge"),vc=H("Gecko")&&!(-1!=Tb.toLowerCase().indexOf("webkit")&&!H("Edge"))&&!(H("Trident")||H("MSIE"))&&!H("Edge"),wc=-1!=Tb.toLowerCase().indexOf("webkit")&&!H("Edge"),xc=H("Android");function yc(){var a=z.document;return a?a.documentMode:void 0}
var zc;a:{var Ac="",Bc=function(){var a=Tb;if(vc)return/rv:([^\);]+)(\)|;)/.exec(a);if(uc)return/Edge\/([\d\.]+)/.exec(a);if(tc)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(wc)return/WebKit\/(\S+)/.exec(a);if(sc)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
Bc&&(Ac=Bc?Bc[1]:"");if(tc){var Cc=yc();if(null!=Cc&&Cc>parseFloat(Ac)){zc=String(Cc);break a}}zc=Ac}var Dc=zc,Ec;if(z.document&&tc){var Fc=yc();Ec=Fc?Fc:parseInt(Dc,10)||void 0}else Ec=void 0;var Gc=Ec;var Hc=qc()||H("iPod"),Ic=H("iPad");!H("Android")||Wb();Wb();var Jc=H("Safari")&&!(Wb()||H("Coast")||H("Opera")||H("Edge")||H("Edg/")||H("OPR")||H("Firefox")||H("FxiOS")||H("Silk")||H("Android"))&&!(qc()||H("iPad")||H("iPod"));var Kc={},Lc=null;
function Mc(a,b){La(a);void 0===b&&(b=0);if(!Lc){Lc={};for(var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),d=["+/=","+/","-_=","-_.","-_"],e=0;5>e;e++){var f=c.concat(d[e].split(""));Kc[e]=f;for(var g=0;g<f.length;g++){var h=f[g];void 0===Lc[h]&&(Lc[h]=g)}}}b=Kc[b];c=Array(Math.floor(a.length/3));d=b[64]||"";for(e=f=0;f<a.length-2;f+=3){var k=a[f],l=a[f+1];h=a[f+2];g=b[k>>2];k=b[(k&3)<<4|l>>4];l=b[(l&15)<<2|h>>6];h=b[h&63];c[e++]=""+g+k+l+h}g=0;h=d;switch(a.length-
f){case 2:g=a[f+1],h=b[(g&15)<<2]||d;case 1:a=a[f],c[e]=""+b[a>>2]+b[(a&3)<<4|g>>4]+h+d}return c.join("")}
;var Nc="function"===typeof Uint8Array;function Oc(a){return null!==a&&"object"===typeof a&&a.constructor===Object}
function Pc(a,b){if(null!=a)return Array.isArray(a)||Oc(a)?Qc(a,b):b(a)}
function Qc(a,b){if(Array.isArray(a)){for(var c=Array(a.length),d=0;d<a.length;d++)c[d]=Pc(a[d],b);if(a){var e;nc?e=a[oc]:e=a.h;a=null==e?0:e}else a=0;a&1&&pc(c);return c}e={};for(c in a)e[c]=Pc(a[c],b);return e}
function Rc(a){switch(typeof a){case "number":return isFinite(a)?a:String(a);case "object":return Nc&&null!=a&&a instanceof Uint8Array?Mc(a):a;default:return a}}
function Sc(a){return Nc&&null!=a&&a instanceof Uint8Array?new Uint8Array(a):a}
;function Tc(a,b){this.h=a;this.i=b;this.map={};this.j=!0;if(0<this.h.length){for(a=0;a<this.h.length;a++){b=this.h[a];var c=b[0];this.map[c.toString()]=new Uc(c,b[1])}this.j=!0}}
m=Tc.prototype;m.isFrozen=function(){return!1};
m.toJSON=function(){var a=this.T();return Qc(a,Rc)};
m.T=function(){if(this.j){if(this.i){var a=this.map,b;for(b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var c=a[b].h;c&&c.T()}}}else{this.h.length=0;a=Vc(this);a.sort();for(b=0;b<a.length;b++){c=this.map[a[b]];var d=c.h;d&&d.T();this.h.push([c.key,c.value])}this.j=!0}return this.h};
m.clear=function(){this.map={};this.j=!1};
m.entries=function(){var a=[],b=Vc(this);b.sort();for(var c=0;c<b.length;c++){var d=this.map[b[c]];a.push([d.key,Wc(this,d)])}return new Xc(a)};
m.keys=function(){var a=[],b=Vc(this);b.sort();for(var c=0;c<b.length;c++)a.push(this.map[b[c]].key);return new Xc(a)};
m.values=function(){var a=[],b=Vc(this);b.sort();for(var c=0;c<b.length;c++)a.push(Wc(this,this.map[b[c]]));return new Xc(a)};
m.forEach=function(a,b){var c=Vc(this);c.sort();for(var d=0;d<c.length;d++){var e=this.map[c[d]];a.call(b,Wc(this,e),e.key,this)}};
m.set=function(a,b){var c=new Uc(a);this.i?(c.h=b,c.value=b.T()):c.value=b;this.map[a.toString()]=c;this.j=!1;return this};
function Wc(a,b){return a.i?(b.h||(b.h=new a.i(b.value),a.isFrozen()&&null(b.h)),b.h):b.value}
m.get=function(a){if(a=this.map[a.toString()])return Wc(this,a)};
m.has=function(a){return a.toString()in this.map};
function Vc(a){a=a.map;var b=[],c;for(c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.push(c);return b}
Tc.prototype[Symbol.iterator]=function(){return this.entries()};
function Uc(a,b){this.key=a;this.value=b;this.h=void 0}
function Xc(a){this.i=0;this.h=a}
Xc.prototype.next=function(){return this.i<this.h.length?{done:!1,value:this.h[this.i++]}:{done:!0,value:void 0}};
Xc.prototype[Symbol.iterator]=function(){return this};var Yc;function Zc(a,b,c){var d=Yc;Yc=null;a||(a=d);d=this.constructor.Vm;a||(a=d?[d]:[]);this.l=(d?0:-1)-(this.constructor.Um||0);this.h=null;this.i=a;a:{d=this.i.length;a=d-1;if(d&&(d=this.i[a],Oc(d))){this.u=a-this.l;this.j=d;break a}void 0!==b&&-1<b?(this.u=Math.max(b,a+1-this.l),this.j=null):this.u=Number.MAX_VALUE}if(c)for(b=0;b<c.length;b++)a=c[b],a<this.u?(a+=this.l,(d=this.i[a])?pc(d):this.i[a]=$c):(ad(this),(d=this.j[a])?pc(d):this.j[a]=$c)}
var $c=Object.freeze(pc([]));function ad(a){var b=a.u+a.l;a.i[b]||(a.j=a.i[b]={})}
function bd(a,b,c){return-1===b?null:(void 0===c?0:c)||b>=a.u?a.j?a.j[b]:void 0:a.i[b+a.l]}
function cd(a,b,c){a.h||(a.h={});if(b in a.h)return a.h[b];var d=bd(a,b);d||(d=pc([]),dd(a,b,d));c=new Tc(d,c);return a.h[b]=c}
function dd(a,b,c,d){(void 0===d?0:d)||b>=a.u?(ad(a),a.j[b]=c):a.i[b+a.l]=c}
function ed(a,b,c,d){if(-1===c)return null;a.h||(a.h={});a.h[c]||(d=bd(a,c,void 0===d?!1:d))&&(a.h[c]=new b(d));return a.h[c]}
function fd(a,b,c){a.h||(a.h={});var d=a.h[c];if(!d){var e=void 0===e?!1:e;d=bd(a,c,e);null==d&&(d=$c);d===$c&&(d=pc([]),dd(a,c,d,e));e=d;d=[];for(var f=0;f<e.length;f++)d[f]=new b(e[f]);a.h[c]=d}return d}
Zc.prototype.toJSON=function(){var a=this.T();return Qc(a,Rc)};
Zc.prototype.T=function(){if(this.h)for(var a in this.h){var b=this.h[a];if(Array.isArray(b))for(var c=0;c<b.length;c++)b[c]&&b[c].T();else b&&b.T()}return this.i};
Zc.prototype.toString=function(){return this.T().toString()};
Zc.prototype.clone=function(){var a=this.constructor,b=Qc(this.T(),Sc);Yc=b;a=new a(b);Yc=null;gd(a,this);return a};
function gd(a,b){b.m&&(a.m=b.m.slice());var c=b.h;if(c){b=b.j;var d={},e;for(e in c){var f=c[e];if(f){var g=!(!b||!b[e]),h=+e;if(Array.isArray(f)){if(f.length)for(g=fd(a,f[0].constructor,h),h=0;h<Math.min(g.length,f.length);h++)gd(g[h],f[h])}else f instanceof Tc?f.i&&(d.Ha=cd(a,h,f.i),f.forEach(function(k){return function(l,n){return gd(k.Ha.get(n),l)}}(d))):(g=ed(a,f.constructor,h,g))&&gd(g,f)}d={Ha:d.Ha}}}}
;var hd=window;wb("csi.gstatic.com");wb("googleads.g.doubleclick.net");wb("pagead2.googlesyndication.com");wb("partner.googleadservices.com");wb("pubads.g.doubleclick.net");wb("securepubads.g.doubleclick.net");wb("tpc.googlesyndication.com");/*

 SPDX-License-Identifier: Apache-2.0
*/
var id={};function jd(){}
function kd(a){this.h=a}
v(kd,jd);kd.prototype.toString=function(){return this.h};
var ld=new kd("about:invalid#zTSz",id);function md(a){this.isValid=a}
function nd(a){return new md(function(b){return b.substr(0,a.length+1).toLowerCase()===a+":"})}
var od=[nd("data"),nd("http"),nd("https"),nd("mailto"),nd("ftp"),new md(function(a){return/^[^:]*([/?#]|$)/.test(a)})];function pd(a){if(a instanceof jd)if(a instanceof kd)a=a.h;else throw Error("");else a=Ob(a);return a}
;function qd(a,b){a.src=Bb(b);var c;b=(a.ownerDocument&&a.ownerDocument.defaultView||window).document;var d=null===(c=b.querySelector)||void 0===c?void 0:c.call(b,"script[nonce]");(c=d?d.nonce||d.getAttribute("nonce")||"":"")&&a.setAttribute("nonce",c)}
;function rd(a,b){this.x=void 0!==a?a:0;this.y=void 0!==b?b:0}
m=rd.prototype;m.clone=function(){return new rd(this.x,this.y)};
m.equals=function(a){return a instanceof rd&&(this==a?!0:this&&a?this.x==a.x&&this.y==a.y:!1)};
m.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};
m.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};
m.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};
m.scale=function(a,b){this.x*=a;this.y*="number"===typeof b?b:a;return this};function sd(a,b){this.width=a;this.height=b}
m=sd.prototype;m.clone=function(){return new sd(this.width,this.height)};
m.aspectRatio=function(){return this.width/this.height};
m.isEmpty=function(){return!(this.width*this.height)};
m.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
m.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
m.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};
m.scale=function(a,b){this.width*=a;this.height*="number"===typeof b?b:a;return this};function td(a){var b=document;return"string"===typeof a?b.getElementById(a):a}
function ud(a,b){hb(b,function(c,d){c&&"object"==typeof c&&c.ca&&(c=c.ba());"style"==d?a.style.cssText=c:"class"==d?a.className=c:"for"==d?a.htmlFor=c:vd.hasOwnProperty(d)?a.setAttribute(vd[d],c):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,c):a[d]=c})}
var vd={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};function wd(a,b,c){var d=arguments,e=document,f=d[1],g=xd(e,String(d[0]));f&&("string"===typeof f?g.className=f:Array.isArray(f)?g.className=f.join(" "):ud(g,f));2<d.length&&yd(e,g,d);return g}
function yd(a,b,c){function d(h){h&&b.appendChild("string"===typeof h?a.createTextNode(h):h)}
for(var e=2;e<c.length;e++){var f=c[e];if(!La(f)||Na(f)&&0<f.nodeType)d(f);else{a:{if(f&&"number"==typeof f.length){if(Na(f)){var g="function"==typeof f.item||"string"==typeof f.item;break a}if("function"===typeof f){g="function"==typeof f.item;break a}}g=!1}E(g?fb(f):f,d)}}}
function xd(a,b){b=String(b);"application/xhtml+xml"===a.contentType&&(b=b.toLowerCase());return a.createElement(b)}
function zd(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return null}
;function Ad(a){var b=Bd;if(b)for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&a.call(void 0,b[c],c,b)}
function Cd(){var a=[];Ad(function(b){a.push(b)});
return a}
var Bd={oc:"allow-forms",pc:"allow-modals",qc:"allow-orientation-lock",sc:"allow-pointer-lock",tc:"allow-popups",uc:"allow-popups-to-escape-sandbox",wc:"allow-presentation",xc:"allow-same-origin",yc:"allow-scripts",zc:"allow-top-navigation",Ac:"allow-top-navigation-by-user-activation"},Dd=Za(function(){return Cd()});
function Ed(){var a=Fd(),b={};E(Dd(),function(c){a.sandbox&&a.sandbox.supports&&a.sandbox.supports(c)&&(b[c]=!0)});
return b}
function Fd(){var a=void 0===a?document:a;var b="IFRAME";"application/xhtml+xml"===(null==a?void 0:a.contentType)&&(b=b.toLowerCase());return a.createElement(b)}
;function Gd(a){"number"==typeof a&&(a=Math.round(a)+"px");return a}
;var Hd=(new Date).getTime();function Id(a){if(!a)return"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));c=a.substring(0,a.indexOf("://"));if(!c)throw Error("URI is missing protocol: "+a);if("http"!==c&&"https"!==c&&"chrome-extension"!==c&&"moz-extension"!==c&&"file"!==c&&"android-app"!==c&&"chrome-search"!==c&&"chrome-untrusted"!==c&&"chrome"!==
c&&"app"!==c&&"devtools"!==c)throw Error("Invalid URI scheme in origin: "+c);a="";var d=b.indexOf(":");if(-1!=d){var e=b.substring(d+1);b=b.substring(0,d);if("http"===c&&"80"!==e||"https"===c&&"443"!==e)a=":"+e}return c+"://"+b+a}
;function Jd(){function a(){e[0]=1732584193;e[1]=4023233417;e[2]=2562383102;e[3]=271733878;e[4]=3285377520;n=l=0}
function b(q){for(var u=g,p=0;64>p;p+=4)u[p/4]=q[p]<<24|q[p+1]<<16|q[p+2]<<8|q[p+3];for(p=16;80>p;p++)q=u[p-3]^u[p-8]^u[p-14]^u[p-16],u[p]=(q<<1|q>>>31)&4294967295;q=e[0];var y=e[1],C=e[2],F=e[3],O=e[4];for(p=0;80>p;p++){if(40>p)if(20>p){var R=F^y&(C^F);var Aa=1518500249}else R=y^C^F,Aa=1859775393;else 60>p?(R=y&C|F&(y|C),Aa=2400959708):(R=y^C^F,Aa=3395469782);R=((q<<5|q>>>27)&4294967295)+R+O+Aa+u[p]&4294967295;O=F;F=C;C=(y<<30|y>>>2)&4294967295;y=q;q=R}e[0]=e[0]+q&4294967295;e[1]=e[1]+y&4294967295;
e[2]=e[2]+C&4294967295;e[3]=e[3]+F&4294967295;e[4]=e[4]+O&4294967295}
function c(q,u){if("string"===typeof q){q=unescape(encodeURIComponent(q));for(var p=[],y=0,C=q.length;y<C;++y)p.push(q.charCodeAt(y));q=p}u||(u=q.length);p=0;if(0==l)for(;p+64<u;)b(q.slice(p,p+64)),p+=64,n+=64;for(;p<u;)if(f[l++]=q[p++],n++,64==l)for(l=0,b(f);p+64<u;)b(q.slice(p,p+64)),p+=64,n+=64}
function d(){var q=[],u=8*n;56>l?c(h,56-l):c(h,64-(l-56));for(var p=63;56<=p;p--)f[p]=u&255,u>>>=8;b(f);for(p=u=0;5>p;p++)for(var y=24;0<=y;y-=8)q[u++]=e[p]>>y&255;return q}
for(var e=[],f=[],g=[],h=[128],k=1;64>k;++k)h[k]=0;var l,n;a();return{reset:a,update:c,digest:d,xb:function(){for(var q=d(),u="",p=0;p<q.length;p++)u+="0123456789ABCDEF".charAt(Math.floor(q[p]/16))+"0123456789ABCDEF".charAt(q[p]%16);return u}}}
;function Kd(a,b,c){var d=String(z.location.href);return d&&a&&b?[b,Ld(Id(d),a,c||null)].join(" "):null}
function Ld(a,b,c){var d=[],e=[];if(1==(Array.isArray(c)?2:1))return e=[b,a],E(d,function(h){e.push(h)}),Md(e.join(" "));
var f=[],g=[];E(c,function(h){g.push(h.key);f.push(h.value)});
c=Math.floor((new Date).getTime()/1E3);e=0==f.length?[c,b,a]:[f.join(":"),c,b,a];E(d,function(h){e.push(h)});
a=Md(e.join(" "));a=[c,a];0==g.length||a.push(g.join(""));return a.join("_")}
function Md(a){var b=Jd();b.update(a);return b.xb().toLowerCase()}
;var Nd={};function Od(a){this.h=a||{cookie:""}}
m=Od.prototype;m.isEnabled=function(){if(!z.navigator.cookieEnabled)return!1;if(!this.isEmpty())return!0;this.set("TESTCOOKIESENABLED","1",{Ra:60});if("1"!==this.get("TESTCOOKIESENABLED"))return!1;this.remove("TESTCOOKIESENABLED");return!0};
m.set=function(a,b,c){var d=!1;if("object"===typeof c){var e=c.an;d=c.secure||!1;var f=c.domain||void 0;var g=c.path||void 0;var h=c.Ra}if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');void 0===h&&(h=-1);c=f?";domain="+f:"";g=g?";path="+g:"";d=d?";secure":"";h=0>h?"":0==h?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(Date.now()+1E3*h)).toUTCString();this.h.cookie=a+"="+b+c+g+h+d+(null!=e?";samesite="+
e:"")};
m.get=function(a,b){for(var c=a+"=",d=(this.h.cookie||"").split(";"),e=0,f;e<d.length;e++){f=Db(d[e]);if(0==f.lastIndexOf(c,0))return f.substr(c.length);if(f==a)return""}return b};
m.remove=function(a,b,c){var d=void 0!==this.get(a);this.set(a,"",{Ra:0,path:b,domain:c});return d};
m.isEmpty=function(){return!this.h.cookie};
m.clear=function(){for(var a=(this.h.cookie||"").split(";"),b=[],c=[],d,e,f=0;f<a.length;f++)e=Db(a[f]),d=e.indexOf("="),-1==d?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));for(a=b.length-1;0<=a;a--)this.remove(b[a])};
var Pd=new Od("undefined"==typeof document?null:document);function Qd(a){return!!Nd.FPA_SAMESITE_PHASE2_MOD||!(void 0===a||!a)}
function Rd(a){a=void 0===a?!1:a;var b=z.__SAPISID||z.__APISID||z.__3PSAPISID||z.__OVERRIDE_SID;Qd(a)&&(b=b||z.__1PSAPISID);if(b)return!0;var c=new Od(document);b=c.get("SAPISID")||c.get("APISID")||c.get("__Secure-3PAPISID")||c.get("SID");Qd(a)&&(b=b||c.get("__Secure-1PAPISID"));return!!b}
function Sd(a,b,c,d){(a=z[a])||(a=(new Od(document)).get(b));return a?Kd(a,c,d):null}
function Td(a){var b=void 0===b?!1:b;var c=Id(String(z.location.href)),d=[];if(Rd(b)){c=0==c.indexOf("https:")||0==c.indexOf("chrome-extension:")||0==c.indexOf("moz-extension:");var e=c?z.__SAPISID:z.__APISID;e||(e=new Od(document),e=e.get(c?"SAPISID":"APISID")||e.get("__Secure-3PAPISID"));(e=e?Kd(e,c?"SAPISIDHASH":"APISIDHASH",a):null)&&d.push(e);c&&Qd(b)&&((b=Sd("__1PSAPISID","__Secure-1PAPISID","SAPISID1PHASH",a))&&d.push(b),(a=Sd("__3PSAPISID","__Secure-3PAPISID","SAPISID3PHASH",a))&&d.push(a))}return 0==
d.length?null:d.join(" ")}
;function Ud(a){a&&"function"==typeof a.dispose&&a.dispose()}
;function Vd(a){for(var b=0,c=arguments.length;b<c;++b){var d=arguments[b];La(d)?Vd.apply(null,d):Ud(d)}}
;function I(){this.h=this.h;this.u=this.u}
I.prototype.h=!1;I.prototype.dispose=function(){this.h||(this.h=!0,this.F())};
function Wd(a,b){a.h?b():(a.u||(a.u=[]),a.u.push(b))}
I.prototype.F=function(){if(this.u)for(;this.u.length;)this.u.shift()()};function Xd(a,b){this.type=a;this.h=this.target=b;this.defaultPrevented=this.j=!1}
Xd.prototype.stopPropagation=function(){this.j=!0};
Xd.prototype.preventDefault=function(){this.defaultPrevented=!0};function Yd(a){var b=B("window.location.href");null==a&&(a='Unknown Error of type "null/undefined"');if("string"===typeof a)return{message:a,name:"Unknown error",lineNumber:"Not available",fileName:b,stack:"Not available"};var c=!1;try{var d=a.lineNumber||a.line||"Not available"}catch(g){d="Not available",c=!0}try{var e=a.fileName||a.filename||a.sourceURL||z.$googDebugFname||b}catch(g){e="Not available",c=!0}b=Zd(a);if(!(!c&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name)){c=a.message;if(null==
c){if(a.constructor&&a.constructor instanceof Function){if(a.constructor.name)c=a.constructor.name;else if(c=a.constructor,$d[c])c=$d[c];else{c=String(c);if(!$d[c]){var f=/function\s+([^\(]+)/m.exec(c);$d[c]=f?f[1]:"[Anonymous]"}c=$d[c]}c='Unknown Error of type "'+c+'"'}else c="Unknown Error of unknown type";"function"===typeof a.toString&&Object.prototype.toString!==a.toString&&(c+=": "+a.toString())}return{message:c,name:a.name||"UnknownError",lineNumber:d,fileName:e,stack:b||"Not available"}}a.stack=
b;return{message:a.message,name:a.name,lineNumber:a.lineNumber,fileName:a.fileName,stack:a.stack}}
function Zd(a,b){b||(b={});b[ae(a)]=!0;var c=a.stack||"";(a=a.vb)&&!b[ae(a)]&&(c+="\nCaused by: ",a.stack&&0==a.stack.indexOf(a.toString())||(c+="string"===typeof a?a:a.message+"\n"),c+=Zd(a,b));return c}
function ae(a){var b="";"function"===typeof a.toString&&(b=""+a);return b+a.stack}
var $d={};var be=function(){if(!z.addEventListener||!Object.defineProperty)return!1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0}});
try{z.addEventListener("test",Ia,b),z.removeEventListener("test",Ia,b)}catch(c){}return a}();function ce(a,b){Xd.call(this,a?a.type:"");this.relatedTarget=this.h=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=0;this.key="";this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.state=null;this.pointerId=0;this.pointerType="";this.i=null;a&&this.init(a,b)}
D(ce,Xd);var de={2:"touch",3:"pen",4:"mouse"};
ce.prototype.init=function(a,b){var c=this.type=a.type,d=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.h=b;if(b=a.relatedTarget){if(vc){a:{try{rc(b.nodeName);var e=!0;break a}catch(f){}e=!1}e||(b=null)}}else"mouseover"==c?b=a.fromElement:"mouseout"==c&&(b=a.toElement);this.relatedTarget=b;d?(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||
0):(this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.key=a.key||"";this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.pointerId=a.pointerId||0;this.pointerType="string"===typeof a.pointerType?a.pointerType:de[a.pointerType]||"";this.state=a.state;
this.i=a;a.defaultPrevented&&ce.S.preventDefault.call(this)};
ce.prototype.stopPropagation=function(){ce.S.stopPropagation.call(this);this.i.stopPropagation?this.i.stopPropagation():this.i.cancelBubble=!0};
ce.prototype.preventDefault=function(){ce.S.preventDefault.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var ee="closure_listenable_"+(1E6*Math.random()|0);var fe=0;function ge(a,b,c,d,e){this.listener=a;this.proxy=null;this.src=b;this.type=c;this.capture=!!d;this.Ba=e;this.key=++fe;this.ra=this.wa=!1}
function he(a){a.ra=!0;a.listener=null;a.proxy=null;a.src=null;a.Ba=null}
;function ie(a){this.src=a;this.listeners={};this.h=0}
ie.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.listeners[f];a||(a=this.listeners[f]=[],this.h++);var g=je(a,b,d,e);-1<g?(b=a[g],c||(b.wa=!1)):(b=new ge(b,this.src,f,!!d,e),b.wa=c,a.push(b));return b};
ie.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.listeners))return!1;var e=this.listeners[a];b=je(e,b,c,d);return-1<b?(he(e[b]),Array.prototype.splice.call(e,b,1),0==e.length&&(delete this.listeners[a],this.h--),!0):!1};
function ke(a,b){var c=b.type;c in a.listeners&&eb(a.listeners[c],b)&&(he(b),0==a.listeners[c].length&&(delete a.listeners[c],a.h--))}
function je(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.ra&&f.listener==b&&f.capture==!!c&&f.Ba==d)return e}return-1}
;var le="closure_lm_"+(1E6*Math.random()|0),me={},ne=0;function oe(a,b,c,d,e){if(d&&d.once)pe(a,b,c,d,e);else if(Array.isArray(b))for(var f=0;f<b.length;f++)oe(a,b[f],c,d,e);else c=qe(c),a&&a[ee]?a.U(b,c,Na(d)?!!d.capture:!!d,e):re(a,b,c,!1,d,e)}
function re(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=Na(e)?!!e.capture:!!e,h=se(a);h||(a[le]=h=new ie(a));c=h.add(b,c,d,g,f);if(!c.proxy){d=te();c.proxy=d;d.src=a;d.listener=c;if(a.addEventListener)be||(e=g),void 0===e&&(e=!1),a.addEventListener(b.toString(),d,e);else if(a.attachEvent)a.attachEvent(ue(b.toString()),d);else if(a.addListener&&a.removeListener)a.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");ne++}}
function te(){function a(c){return b.call(a.src,a.listener,c)}
var b=ve;return a}
function pe(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)pe(a,b[f],c,d,e);else c=qe(c),a&&a[ee]?a.i.add(String(b),c,!0,Na(d)?!!d.capture:!!d,e):re(a,b,c,!0,d,e)}
function we(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)we(a,b[f],c,d,e);else(d=Na(d)?!!d.capture:!!d,c=qe(c),a&&a[ee])?a.i.remove(String(b),c,d,e):a&&(a=se(a))&&(b=a.listeners[b.toString()],a=-1,b&&(a=je(b,c,d,e)),(c=-1<a?b[a]:null)&&xe(c))}
function xe(a){if("number"!==typeof a&&a&&!a.ra){var b=a.src;if(b&&b[ee])ke(b.i,a);else{var c=a.type,d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent?b.detachEvent(ue(c),d):b.addListener&&b.removeListener&&b.removeListener(d);ne--;(c=se(b))?(ke(c,a),0==c.h&&(c.src=null,b[le]=null)):he(a)}}}
function ue(a){return a in me?me[a]:me[a]="on"+a}
function ve(a,b){if(a.ra)a=!0;else{b=new ce(b,this);var c=a.listener,d=a.Ba||a.src;a.wa&&xe(a);a=c.call(d,b)}return a}
function se(a){a=a[le];return a instanceof ie?a:null}
var ye="__closure_events_fn_"+(1E9*Math.random()>>>0);function qe(a){if("function"===typeof a)return a;a[ye]||(a[ye]=function(b){return a.handleEvent(b)});
return a[ye]}
;function J(){I.call(this);this.i=new ie(this);this.R=this;this.D=null}
D(J,I);J.prototype[ee]=!0;J.prototype.addEventListener=function(a,b,c,d){oe(this,a,b,c,d)};
J.prototype.removeEventListener=function(a,b,c,d){we(this,a,b,c,d)};
function ze(a,b){var c=a.D;if(c){var d=[];for(var e=1;c;c=c.D)d.push(c),++e}a=a.R;c=b.type||b;"string"===typeof b?b=new Xd(b,a):b instanceof Xd?b.target=b.target||a:(e=b,b=new Xd(c,a),rb(b,e));e=!0;if(d)for(var f=d.length-1;!b.j&&0<=f;f--){var g=b.h=d[f];e=Ae(g,c,!0,b)&&e}b.j||(g=b.h=a,e=Ae(g,c,!0,b)&&e,b.j||(e=Ae(g,c,!1,b)&&e));if(d)for(f=0;!b.j&&f<d.length;f++)g=b.h=d[f],e=Ae(g,c,!1,b)&&e}
J.prototype.F=function(){J.S.F.call(this);if(this.i){var a=this.i,b=0,c;for(c in a.listeners){for(var d=a.listeners[c],e=0;e<d.length;e++)++b,he(d[e]);delete a.listeners[c];a.h--}}this.D=null};
J.prototype.U=function(a,b,c,d){return this.i.add(String(a),b,!1,c,d)};
function Ae(a,b,c,d){b=a.i.listeners[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.ra&&g.capture==c){var h=g.listener,k=g.Ba||g.src;g.wa&&ke(a.i,g);e=!1!==h.call(k,d)&&e}}return e&&!d.defaultPrevented}
;function Be(a){var b,c;J.call(this);var d=this;this.B=this.l=0;this.P=null!==a&&void 0!==a?a:{L:function(e,f){return setTimeout(e,f)},
aa:clearTimeout};this.j=null!==(c=null===(b=window.navigator)||void 0===b?void 0:b.onLine)&&void 0!==c?c:!0;this.m=function(){return x(function(e){return w(e,Ce(d),0)})};
window.addEventListener("offline",this.m);window.addEventListener("online",this.m);this.B||De(this)}
v(Be,J);Be.prototype.dispose=function(){window.removeEventListener("offline",this.m);window.removeEventListener("online",this.m);this.P.aa(this.B);delete Be.h};
Be.prototype.I=function(){return this.j};
function De(a){a.B=a.P.L(function(){var b;return x(function(c){if(1==c.h)return a.j?(null===(b=window.navigator)||void 0===b?0:b.onLine)?c.A(3):w(c,Ce(a),3):w(c,Ce(a),3);De(a);c.h=0})},3E4)}
function Ce(a,b){return a.o?a.o:a.o=new Promise(function(c){var d,e,f;return x(function(g){switch(g.h){case 1:return d=window.AbortController?new window.AbortController:void 0,e=null===d||void 0===d?void 0:d.signal,f=!1,ra(g,2,3),d&&(a.l=a.P.L(function(){d.abort()},b||2E4)),w(g,fetch("/generate_204",{method:"HEAD",
signal:e}),5);case 5:f=!0;case 3:ta(g);a.o=void 0;a.l&&(a.P.aa(a.l),a.l=0);f!==a.j&&(a.j=f,a.j?ze(a,"networkstatus-online"):ze(a,"networkstatus-offline"));c(f);ua(g);break;case 2:sa(g),f=!1,g.A(3)}})})}
;function Ee(){this.data_=[];this.h=-1}
Ee.prototype.set=function(a,b){b=void 0===b?!0:b;0<=a&&52>a&&0===a%1&&this.data_[a]!=b&&(this.data_[a]=b,this.h=-1)};
Ee.prototype.get=function(a){return!!this.data_[a]};
function Fe(a){-1==a.h&&(a.h=cb(a.data_,function(b,c,d){return c?b+Math.pow(2,d):b},0));
return a.h}
;function Ge(a,b){this.j=a;this.l=b;this.i=0;this.h=null}
Ge.prototype.get=function(){if(0<this.i){this.i--;var a=this.h;this.h=a.next;a.next=null}else a=this.j();return a};
function He(a,b){a.l(b);100>a.i&&(a.i++,b.next=a.h,a.h=b)}
;var Ie;
function Je(){var a=z.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!H("Presto")&&(a=function(){var e=xd(document,"IFRAME");e.style.display="none";document.documentElement.appendChild(e);var f=e.contentWindow;e=f.document;e.open();e.close();var g="callImmediate"+Math.random(),h="file:"==f.location.protocol?"*":f.location.protocol+"//"+f.location.host;e=Ta(function(k){if(("*"==h||k.origin==h)&&k.data==g)this.port1.onmessage()},this);
f.addEventListener("message",e,!1);this.port1={};this.port2={postMessage:function(){f.postMessage(g,h)}}});
if("undefined"!==typeof a&&!H("Trident")&&!H("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var e=c.bb;c.bb=null;e()}};
return function(e){d.next={bb:e};d=d.next;b.port2.postMessage(0)}}return function(e){z.setTimeout(e,0)}}
;function Ke(){this.i=this.h=null}
Ke.prototype.add=function(a,b){var c=Le.get();c.set(a,b);this.i?this.i.next=c:this.h=c;this.i=c};
Ke.prototype.remove=function(){var a=null;this.h&&(a=this.h,this.h=this.h.next,this.h||(this.i=null),a.next=null);return a};
var Le=new Ge(function(){return new Me},function(a){return a.reset()});
function Me(){this.next=this.scope=this.h=null}
Me.prototype.set=function(a,b){this.h=a;this.scope=b;this.next=null};
Me.prototype.reset=function(){this.next=this.scope=this.h=null};function Ne(a,b){Oe||Pe();Qe||(Oe(),Qe=!0);Re.add(a,b)}
var Oe;function Pe(){if(z.Promise&&z.Promise.resolve){var a=z.Promise.resolve(void 0);Oe=function(){a.then(Se)}}else Oe=function(){var b=Se;
"function"!==typeof z.setImmediate||z.Window&&z.Window.prototype&&!H("Edge")&&z.Window.prototype.setImmediate==z.setImmediate?(Ie||(Ie=Je()),Ie(b)):z.setImmediate(b)}}
var Qe=!1,Re=new Ke;function Se(){for(var a;a=Re.remove();){try{a.h.call(a.scope)}catch(b){mc(b)}He(Le,a)}Qe=!1}
;function Te(a,b){this.h=a[z.Symbol.iterator]();this.i=b;this.j=0}
Te.prototype[Symbol.iterator]=function(){return this};
Te.prototype.next=function(){var a=this.h.next();return{value:a.done?void 0:this.i.call(void 0,a.value,this.j++),done:a.done}};
function Ue(a,b){return new Te(a,b)}
;function Ve(){this.blockSize=-1}
;function We(){this.blockSize=-1;this.blockSize=64;this.h=[];this.u=[];this.m=[];this.j=[];this.j[0]=128;for(var a=1;a<this.blockSize;++a)this.j[a]=0;this.l=this.i=0;this.reset()}
D(We,Ve);We.prototype.reset=function(){this.h[0]=1732584193;this.h[1]=4023233417;this.h[2]=2562383102;this.h[3]=271733878;this.h[4]=3285377520;this.l=this.i=0};
function Xe(a,b,c){c||(c=0);var d=a.m;if("string"===typeof b)for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.h[0];c=a.h[1];var g=a.h[2],h=a.h[3],k=a.h[4];for(e=0;80>e;e++){if(40>e)if(20>e){f=h^c&(g^h);var l=1518500249}else f=c^g^h,l=1859775393;else 60>e?(f=c&g|h&(c|g),l=2400959708):
(f=c^g^h,l=3395469782);f=(b<<5|b>>>27)+f+k+l+d[e]&4294967295;k=h;h=g;g=(c<<30|c>>>2)&4294967295;c=b;b=f}a.h[0]=a.h[0]+b&4294967295;a.h[1]=a.h[1]+c&4294967295;a.h[2]=a.h[2]+g&4294967295;a.h[3]=a.h[3]+h&4294967295;a.h[4]=a.h[4]+k&4294967295}
We.prototype.update=function(a,b){if(null!=a){void 0===b&&(b=a.length);for(var c=b-this.blockSize,d=0,e=this.u,f=this.i;d<b;){if(0==f)for(;d<=c;)Xe(this,a,d),d+=this.blockSize;if("string"===typeof a)for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.blockSize){Xe(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.blockSize){Xe(this,e);f=0;break}}this.i=f;this.l+=b}};
We.prototype.digest=function(){var a=[],b=8*this.l;56>this.i?this.update(this.j,56-this.i):this.update(this.j,this.blockSize-(this.i-56));for(var c=this.blockSize-1;56<=c;c--)this.u[c]=b&255,b/=256;Xe(this,this.u);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.h[c]>>d&255,++b;return a};function Ye(a){return"string"==typeof a.className?a.className:a.getAttribute&&a.getAttribute("class")||""}
function Ze(a,b){"string"==typeof a.className?a.className=b:a.setAttribute&&a.setAttribute("class",b)}
function $e(a,b){a.classList?b=a.classList.contains(b):(a=a.classList?a.classList:Ye(a).match(/\S+/g)||[],b=0<=$a(a,b));return b}
function af(){var a=document.body;a.classList?a.classList.remove("inverted-hdpi"):$e(a,"inverted-hdpi")&&Ze(a,Array.prototype.filter.call(a.classList?a.classList:Ye(a).match(/\S+/g)||[],function(b){return"inverted-hdpi"!=b}).join(" "))}
;var bf="StopIteration"in z?z.StopIteration:{message:"StopIteration",stack:""};function cf(){}
cf.prototype.V=function(){throw bf;};
cf.prototype.next=function(){return df};
var df={done:!0,value:void 0};cf.prototype.O=function(){return this};function ef(a){if(a instanceof ff||a instanceof gf||a instanceof hf)return a;if("function"==typeof a.V)return new ff(function(){return jf(a)});
if("function"==typeof a[Symbol.iterator])return new ff(function(){return a[Symbol.iterator]()});
if("function"==typeof a.O)return new ff(function(){return jf(a.O())});
throw Error("Not an iterator or iterable.");}
function jf(a){if(!(a instanceof cf))return a;var b=!1;return{next:function(){for(var c;!b;)try{c=a.V();break}catch(d){if(d!==bf)throw d;b=!0}return{value:c,done:b}}}}
function ff(a){this.i=a}
ff.prototype.O=function(){return new gf(this.i())};
ff.prototype[Symbol.iterator]=function(){return new hf(this.i())};
ff.prototype.h=function(){return new hf(this.i())};
function gf(a){this.i=a}
v(gf,cf);gf.prototype.V=function(){var a=this.i.next();if(a.done)throw bf;return a.value};
gf.prototype[Symbol.iterator]=function(){return new hf(this.i)};
gf.prototype.h=function(){return new hf(this.i)};
function hf(a){ff.call(this,function(){return a});
this.j=a}
v(hf,ff);hf.prototype.next=function(){return this.j.next()};function kf(a,b){this.i={};this.h=[];this.ga=this.size=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a)if(a instanceof kf)for(c=lf(a),d=0;d<c.length;d++)this.set(c[d],a.get(c[d]));else for(d in a)this.set(d,a[d])}
function lf(a){mf(a);return a.h.concat()}
m=kf.prototype;m.has=function(a){return nf(this.i,a)};
m.equals=function(a,b){if(this===a)return!0;if(this.size!=a.size)return!1;b=b||of;mf(this);for(var c,d=0;c=this.h[d];d++)if(!b(this.get(c),a.get(c)))return!1;return!0};
function of(a,b){return a===b}
m.isEmpty=function(){return 0==this.size};
m.clear=function(){this.i={};this.ga=this.size=this.h.length=0};
m.remove=function(a){return this.delete(a)};
m.delete=function(a){return nf(this.i,a)?(delete this.i[a],--this.size,this.ga++,this.h.length>2*this.size&&mf(this),!0):!1};
function mf(a){if(a.size!=a.h.length){for(var b=0,c=0;b<a.h.length;){var d=a.h[b];nf(a.i,d)&&(a.h[c++]=d);b++}a.h.length=c}if(a.size!=a.h.length){var e={};for(c=b=0;b<a.h.length;)d=a.h[b],nf(e,d)||(a.h[c++]=d,e[d]=1),b++;a.h.length=c}}
m.get=function(a,b){return nf(this.i,a)?this.i[a]:b};
m.set=function(a,b){nf(this.i,a)||(this.size+=1,this.h.push(a),this.ga++);this.i[a]=b};
m.forEach=function(a,b){for(var c=lf(this),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};
m.clone=function(){return new kf(this)};
m.keys=function(){return ef(this.O(!0)).h()};
m.values=function(){return ef(this.O(!1)).h()};
m.entries=function(){var a=this;return Ue(this.keys(),function(b){return[b,a.get(b)]})};
m.O=function(a){mf(this);var b=0,c=this.ga,d=this,e=new cf;e.V=function(){if(c!=d.ga)throw Error("The map has changed since the iterator was created");if(b>=d.h.length)throw bf;var f=d.h[b++];return a?f:d.i[f]};
return e};
function nf(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
;function pf(a){qf();return Cb(a)}
var qf=Ia;function rf(a){var b=[];sf(new tf,a,b);return b.join("")}
function tf(){}
function sf(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(Array.isArray(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),sf(a,d[f],c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");e="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(f=b[d],"function"!=typeof f&&(c.push(e),uf(d,c),c.push(":"),sf(a,f,c),e=","));c.push("}");return}}switch(typeof b){case "string":uf(b,c);break;case "number":c.push(isFinite(b)&&
!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}}
var vf={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},wf=/\uffff/.test("\uffff")?/[\\"\x00-\x1f\x7f-\uffff]/g:/[\\"\x00-\x1f\x7f-\xff]/g;function uf(a,b){b.push('"',a.replace(wf,function(c){var d=vf[c];d||(d="\\u"+(c.charCodeAt(0)|65536).toString(16).substr(1),vf[c]=d);return d}),'"')}
;function xf(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}}
;function yf(a){this.h=0;this.o=void 0;this.l=this.i=this.j=null;this.u=this.m=!1;if(a!=Ia)try{var b=this;a.call(void 0,function(c){zf(b,2,c)},function(c){zf(b,3,c)})}catch(c){zf(this,3,c)}}
function Af(){this.next=this.context=this.onRejected=this.i=this.h=null;this.j=!1}
Af.prototype.reset=function(){this.context=this.onRejected=this.i=this.h=null;this.j=!1};
var Bf=new Ge(function(){return new Af},function(a){a.reset()});
function Cf(a,b,c){var d=Bf.get();d.i=a;d.onRejected=b;d.context=c;return d}
function Df(a){return new yf(function(b,c){c(a)})}
yf.prototype.then=function(a,b,c){return Ef(this,"function"===typeof a?a:null,"function"===typeof b?b:null,c)};
yf.prototype.$goog_Thenable=!0;function Ff(a,b){return Ef(a,null,b,void 0)}
yf.prototype.cancel=function(a){if(0==this.h){var b=new Gf(a);Ne(function(){Hf(this,b)},this)}};
function Hf(a,b){if(0==a.h)if(a.j){var c=a.j;if(c.i){for(var d=0,e=null,f=null,g=c.i;g&&(g.j||(d++,g.h==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.h&&1==d?Hf(c,b):(f?(d=f,d.next==c.l&&(c.l=d),d.next=d.next.next):If(c),Jf(c,e,3,b)))}a.j=null}else zf(a,3,b)}
function Kf(a,b){a.i||2!=a.h&&3!=a.h||Lf(a);a.l?a.l.next=b:a.i=b;a.l=b}
function Ef(a,b,c,d){var e=Cf(null,null,null);e.h=new yf(function(f,g){e.i=b?function(h){try{var k=b.call(d,h);f(k)}catch(l){g(l)}}:f;
e.onRejected=c?function(h){try{var k=c.call(d,h);void 0===k&&h instanceof Gf?g(h):f(k)}catch(l){g(l)}}:g});
e.h.j=a;Kf(a,e);return e.h}
yf.prototype.D=function(a){this.h=0;zf(this,2,a)};
yf.prototype.H=function(a){this.h=0;zf(this,3,a)};
function zf(a,b,c){if(0==a.h){a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.h=1;a:{var d=c,e=a.D,f=a.H;if(d instanceof yf){Kf(d,Cf(e||Ia,f||null,a));var g=!0}else if(xf(d))d.then(e,f,a),g=!0;else{if(Na(d))try{var h=d.then;if("function"===typeof h){Mf(d,h,e,f,a);g=!0;break a}}catch(k){f.call(a,k);g=!0;break a}g=!1}}g||(a.o=c,a.h=b,a.j=null,Lf(a),3!=b||c instanceof Gf||Nf(a,c))}}
function Mf(a,b,c,d,e){function f(k){h||(h=!0,d.call(e,k))}
function g(k){h||(h=!0,c.call(e,k))}
var h=!1;try{b.call(a,g,f)}catch(k){f(k)}}
function Lf(a){a.m||(a.m=!0,Ne(a.B,a))}
function If(a){var b=null;a.i&&(b=a.i,a.i=b.next,b.next=null);a.i||(a.l=null);return b}
yf.prototype.B=function(){for(var a;a=If(this);)Jf(this,a,this.h,this.o);this.m=!1};
function Jf(a,b,c,d){if(3==c&&b.onRejected&&!b.j)for(;a&&a.u;a=a.j)a.u=!1;if(b.h)b.h.j=null,Of(b,c,d);else try{b.j?b.i.call(b.context):Of(b,c,d)}catch(e){Pf.call(null,e)}He(Bf,b)}
function Of(a,b,c){2==b?a.i.call(a.context,c):a.onRejected&&a.onRejected.call(a.context,c)}
function Nf(a,b){a.u=!0;Ne(function(){a.u&&Pf.call(null,b)})}
var Pf=mc;function Gf(a){Xa.call(this,a)}
D(Gf,Xa);Gf.prototype.name="cancel";function K(a){I.call(this);this.o=1;this.l=[];this.m=0;this.i=[];this.j={};this.B=!!a}
D(K,I);m=K.prototype;m.subscribe=function(a,b,c){var d=this.j[a];d||(d=this.j[a]=[]);var e=this.o;this.i[e]=a;this.i[e+1]=b;this.i[e+2]=c;this.o=e+3;d.push(e);return e};
function Qf(a,b,c,d){if(b=a.j[b]){var e=a.i;(b=b.find(function(f){return e[f+1]==c&&e[f+2]==d}))&&a.oa(b)}}
m.oa=function(a){var b=this.i[a];if(b){var c=this.j[b];0!=this.m?(this.l.push(a),this.i[a+1]=Ia):(c&&eb(c,a),delete this.i[a],delete this.i[a+1],delete this.i[a+2])}return!!b};
m.ha=function(a,b){var c=this.j[a];if(c){for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];if(this.B)for(e=0;e<c.length;e++){var g=c[e];Rf(this.i[g+1],this.i[g+2],d)}else{this.m++;try{for(e=0,f=c.length;e<f&&!this.h;e++)g=c[e],this.i[g+1].apply(this.i[g+2],d)}finally{if(this.m--,0<this.l.length&&0==this.m)for(;c=this.l.pop();)this.oa(c)}}return 0!=e}return!1};
function Rf(a,b,c){Ne(function(){a.apply(b,c)})}
m.clear=function(a){if(a){var b=this.j[a];b&&(b.forEach(this.oa,this),delete this.j[a])}else this.i.length=0,this.j={}};
m.F=function(){K.S.F.call(this);this.clear();this.l.length=0};function Sf(a){this.h=a}
Sf.prototype.set=function(a,b){void 0===b?this.h.remove(a):this.h.set(a,rf(b))};
Sf.prototype.get=function(a){try{var b=this.h.get(a)}catch(c){return}if(null!==b)try{return JSON.parse(b)}catch(c){throw"Storage: Invalid value was encountered";}};
Sf.prototype.remove=function(a){this.h.remove(a)};function Tf(a){this.h=a}
D(Tf,Sf);function Uf(a){this.data=a}
function Vf(a){return void 0===a||a instanceof Uf?a:new Uf(a)}
Tf.prototype.set=function(a,b){Tf.S.set.call(this,a,Vf(b))};
Tf.prototype.i=function(a){a=Tf.S.get.call(this,a);if(void 0===a||a instanceof Object)return a;throw"Storage: Invalid value was encountered";};
Tf.prototype.get=function(a){if(a=this.i(a)){if(a=a.data,void 0===a)throw"Storage: Invalid value was encountered";}else a=void 0;return a};function Wf(a){this.h=a}
D(Wf,Tf);Wf.prototype.set=function(a,b,c){if(b=Vf(b)){if(c){if(c<Date.now()){Wf.prototype.remove.call(this,a);return}b.expiration=c}b.creation=Date.now()}Wf.S.set.call(this,a,b)};
Wf.prototype.i=function(a){var b=Wf.S.i.call(this,a);if(b){var c=b.creation,d=b.expiration;if(d&&d<Date.now()||c&&c>Date.now())Wf.prototype.remove.call(this,a);else return b}};function Xf(){}
;function Yf(){}
D(Yf,Xf);Yf.prototype[Symbol.iterator]=function(){return ef(this.O(!0)).h()};
Yf.prototype.clear=function(){var a=Array.from(this);a=t(a);for(var b=a.next();!b.done;b=a.next())this.remove(b.value)};function Zf(a){this.h=a}
D(Zf,Yf);m=Zf.prototype;m.isAvailable=function(){if(!this.h)return!1;try{return this.h.setItem("__sak","1"),this.h.removeItem("__sak"),!0}catch(a){return!1}};
m.set=function(a,b){try{this.h.setItem(a,b)}catch(c){if(0==this.h.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
m.get=function(a){a=this.h.getItem(a);if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
m.remove=function(a){this.h.removeItem(a)};
m.O=function(a){var b=0,c=this.h,d=new cf;d.V=function(){if(b>=c.length)throw bf;var e=c.key(b++);if(a)return e;e=c.getItem(e);if("string"!==typeof e)throw"Storage mechanism: Invalid value was encountered";return e};
return d};
m.clear=function(){this.h.clear()};
m.key=function(a){return this.h.key(a)};function $f(){var a=null;try{a=window.localStorage||null}catch(b){}this.h=a}
D($f,Zf);function ag(a,b){this.i=a;this.h=null;var c;if(c=tc)c=!(9<=Number(Gc));if(c){bg||(bg=new kf);this.h=bg.get(a);this.h||(b?this.h=document.getElementById(b):(this.h=document.createElement("userdata"),this.h.addBehavior("#default#userData"),document.body.appendChild(this.h)),bg.set(a,this.h));try{this.h.load(this.i)}catch(d){this.h=null}}}
D(ag,Yf);var cg={".":".2E","!":".21","~":".7E","*":".2A","'":".27","(":".28",")":".29","%":"."},bg=null;function dg(a){return"_"+encodeURIComponent(a).replace(/[.!~*'()%]/g,function(b){return cg[b]})}
m=ag.prototype;m.isAvailable=function(){return!!this.h};
m.set=function(a,b){this.h.setAttribute(dg(a),b);eg(this)};
m.get=function(a){a=this.h.getAttribute(dg(a));if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
m.remove=function(a){this.h.removeAttribute(dg(a));eg(this)};
m.O=function(a){var b=0,c=this.h.XMLDocument.documentElement.attributes,d=new cf;d.V=function(){if(b>=c.length)throw bf;var e=c[b++];if(a)return decodeURIComponent(e.nodeName.replace(/\./g,"%")).substr(1);e=e.nodeValue;if("string"!==typeof e)throw"Storage mechanism: Invalid value was encountered";return e};
return d};
m.clear=function(){for(var a=this.h.XMLDocument.documentElement,b=a.attributes.length;0<b;b--)a.removeAttribute(a.attributes[b-1].nodeName);eg(this)};
function eg(a){try{a.h.save(a.i)}catch(b){throw"Storage mechanism: Quota exceeded";}}
;function fg(a,b){this.i=a;this.h=b+"::"}
D(fg,Yf);fg.prototype.set=function(a,b){this.i.set(this.h+a,b)};
fg.prototype.get=function(a){return this.i.get(this.h+a)};
fg.prototype.remove=function(a){this.i.remove(this.h+a)};
fg.prototype.O=function(a){var b=this.i.O(!0),c=this,d=new cf;d.V=function(){for(var e=b.V();e.substr(0,c.h.length)!=c.h;)e=b.V();return a?e.substr(c.h.length):c.i.get(e)};
return d};function gg(a,b){1<b.length?a[b[0]]=b[1]:1===b.length&&Object.assign(a,b[0])}
;function hg(a){Zc.call(this,a)}
v(hg,Zc);var ig,jg,kg,lg=z.window,mg=(null===(ig=null===lg||void 0===lg?void 0:lg.yt)||void 0===ig?void 0:ig.config_)||(null===(jg=null===lg||void 0===lg?void 0:lg.ytcfg)||void 0===jg?void 0:jg.data_)||{},ng=(null===(kg=null===lg||void 0===lg?void 0:lg.ytcfg)||void 0===kg?void 0:kg.obfuscatedData_)||[];new hg(ng);A("yt.config_",mg,void 0);A("yt.configJspb_",ng,void 0);function L(a){for(var b=0;b<arguments.length;++b);gg(mg,arguments)}
function G(a,b){return a in mg?mg[a]:b}
;var og=[];function pg(a){og.forEach(function(b){return b(a)})}
function qg(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){rg(b)}}:a}
function rg(a,b,c,d){var e=B("yt.logging.errors.log");e?e(a,"ERROR",b,c,d):(e=G("ERRORS",[]),e.push([a,"ERROR",b,c,d]),L("ERRORS",e));pg(a)}
function sg(a,b,c,d){var e=B("yt.logging.errors.log");e?e(a,"WARNING",b,c,d):(e=G("ERRORS",[]),e.push([a,"WARNING",b,c,d]),L("ERRORS",e))}
;var tg=window.yt&&window.yt.msgs_||window.ytcfg&&window.ytcfg.msgs||{};A("yt.msgs_",tg,void 0);function ug(a){gg(tg,arguments)}
;function M(a){a=vg(a);return"string"===typeof a&&"false"===a?!1:!!a}
function wg(a,b){a=vg(a);return void 0===a&&void 0!==b?b:Number(a||0)}
function vg(a){var b=G("EXPERIMENTS_FORCED_FLAGS",{});return void 0!==b[a]?b[a]:G("EXPERIMENT_FLAGS",{})[a]}
;var xg={appSettingsCaptured:!0,foregroundHeartbeat:!0,foregroundHeartbeatScreenAssociated:!0,screenCreated:!0,visualElementAttached:!0,visualElementGestured:!0,visualElementHidden:!0,visualElementShown:!0,flowEvent:!0,visualElementStateChanged:!0,playbackAssociated:!0,youThere:!0,accountStateChangeSignedIn:!0,accountStateChangeSignedOut:!0},yg={latencyActionBaselined:!0,latencyActionInfo:!0,latencyActionTicked:!0,bedrockRepetitiveActionTimed:!0,adsClientStateChange:!0,streamzIncremented:!0,mdxDialAdditionalDataUpdateEvent:!0,
tvhtml5WatchKeyEvent:!0,tvhtml5VideoSeek:!0,tokenRefreshEvent:!0,adNotify:!0,adNotifyFilled:!0,tvhtml5LaunchUrlComponentChanged:!0,bedrockResourceConsumptionSnapshot:!0,deviceStartupMetrics:!0,mdxSignIn:!0,tvhtml5KeyboardLogging:!0,tvhtml5StartupSoundEvent:!0,tvhtml5LiveChatStatus:!0,tvhtml5DeviceStorageStatus:!0,tvhtml5LocalStorage:!0,directSignInEvent:!0,finalPayload:!0,tvhtml5SearchCompleted:!0,tvhtml5KeyboardPerformance:!0,adNotifyFailure:!0,latencyActionSpan:!0,tvhtml5AccountDialogOpened:!0,
tvhtml5ApiTest:!0};var zg=0,Ag=wc?"webkit":vc?"moz":tc?"ms":sc?"o":"";A("ytDomDomGetNextId",B("ytDomDomGetNextId")||function(){return++zg},void 0);var Bg={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,screenX:1,screenY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};
function Cg(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.ctrlKey=this.altKey=!1;this.rotation=this.clientY=this.clientX=0;this.scale=1;this.changedTouches=this.touches=null;try{if(a=a||window.event){this.event=a;for(var b in a)b in Bg||(this[b]=a[b]);this.scale=a.scale;this.rotation=a.rotation;var c=a.target||a.srcElement;c&&3==c.nodeType&&(c=c.parentNode);this.target=c;var d=a.relatedTarget;
if(d)try{d=d.nodeName?d:null}catch(e){d=null}else"mouseover"==this.type?d=a.fromElement:"mouseout"==this.type&&(d=a.toElement);this.relatedTarget=d;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.h=a.pageX;this.i=a.pageY}}catch(e){}}
function Dg(a){if(document.body&&document.documentElement){var b=document.body.scrollTop+document.documentElement.scrollTop;a.h=a.clientX+(document.body.scrollLeft+document.documentElement.scrollLeft);a.i=a.clientY+b}}
Cg.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
Cg.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
Cg.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};var jb=z.ytEventsEventsListeners||{};A("ytEventsEventsListeners",jb,void 0);var Eg=z.ytEventsEventsCounter||{count:0};A("ytEventsEventsCounter",Eg,void 0);
function Fg(a,b,c,d){d=void 0===d?{}:d;a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return ib(function(e){var f="boolean"===typeof e[4]&&e[4]==!!d,g=Na(e[4])&&Na(d)&&nb(e[4],d);return!!e.length&&e[0]==a&&e[1]==b&&e[2]==c&&(f||g)})}
var Gg=Za(function(){var a=!1;try{var b=Object.defineProperty({},"capture",{get:function(){a=!0}});
window.addEventListener("test",null,b)}catch(c){}return a});
function Hg(a,b,c,d){d=void 0===d?{}:d;if(!a||!a.addEventListener&&!a.attachEvent)return"";var e=Fg(a,b,c,d);if(e)return e;e=++Eg.count+"";var f=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document);var g=f?function(h){h=new Cg(h);if(!zd(h.relatedTarget,function(k){return k==a}))return h.currentTarget=a,h.type=b,c.call(a,h)}:function(h){h=new Cg(h);
h.currentTarget=a;return c.call(a,h)};
g=qg(g);a.addEventListener?("mouseenter"==b&&f?b="mouseover":"mouseleave"==b&&f?b="mouseout":"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),Gg()||"boolean"===typeof d?a.addEventListener(b,g,d):a.addEventListener(b,g,!!d.capture)):a.attachEvent("on"+b,g);jb[e]=[a,b,c,g,d];return e}
function Ig(a){a&&("string"==typeof a&&(a=[a]),E(a,function(b){if(b in jb){var c=jb[b],d=c[0],e=c[1],f=c[3];c=c[4];d.removeEventListener?Gg()||"boolean"===typeof c?d.removeEventListener(e,f,c):d.removeEventListener(e,f,!!c.capture):d.detachEvent&&d.detachEvent("on"+e,f);delete jb[b]}}))}
;var Jg=window.ytcsi&&window.ytcsi.now?window.ytcsi.now:window.performance&&window.performance.timing&&window.performance.now&&window.performance.timing.navigationStart?function(){return window.performance.timing.navigationStart+window.performance.now()}:function(){return(new Date).getTime()};function N(a,b){"function"===typeof a&&(a=qg(a));return window.setTimeout(a,b)}
function Kg(a){window.clearTimeout(a)}
;function Lg(a){this.D=a;this.i=null;this.m=0;this.B=null;this.o=0;this.j=[];for(a=0;4>a;a++)this.j.push(0);this.l=0;this.N=Hg(window,"mousemove",Ta(this.R,this));a=Ta(this.H,this);"function"===typeof a&&(a=qg(a));this.Y=window.setInterval(a,25)}
D(Lg,I);Lg.prototype.R=function(a){void 0===a.h&&Dg(a);var b=a.h;void 0===a.i&&Dg(a);this.i=new rd(b,a.i)};
Lg.prototype.H=function(){if(this.i){var a=Jg();if(0!=this.m){var b=this.B,c=this.i,d=b.x-c.x;b=b.y-c.y;d=Math.sqrt(d*d+b*b)/(a-this.m);this.j[this.l]=.5<Math.abs((d-this.o)/this.o)?1:0;for(c=b=0;4>c;c++)b+=this.j[c]||0;3<=b&&this.D();this.o=d}this.m=a;this.B=this.i;this.l=(this.l+1)%4}};
Lg.prototype.F=function(){window.clearInterval(this.Y);Ig(this.N)};function Mg(){}
function Ng(a,b){return Og(a,0,b)}
Mg.prototype.L=function(a,b){return Og(a,1,b)};function Pg(){Mg.apply(this,arguments)}
v(Pg,Mg);function Qg(){Pg.h||(Pg.h=new Pg);return Pg.h}
function Og(a,b,c){void 0!==c&&Number.isNaN(Number(c))&&(c=void 0);var d=B("yt.scheduler.instance.addJob");return d?d(a,b,c):void 0===c?(a(),NaN):N(a,c||0)}
Pg.prototype.aa=function(a){if(void 0===a||!Number.isNaN(Number(a))){var b=B("yt.scheduler.instance.cancelJob");b?b(a):Kg(a)}};
Pg.prototype.start=function(){var a=B("yt.scheduler.instance.start");a&&a()};
Pg.prototype.pause=function(){var a=B("yt.scheduler.instance.pause");a&&a()};var Rg=Qg();var Sg={};
function Tg(a){var b=void 0===a?{}:a;a=void 0===b.Ob?!1:b.Ob;b=void 0===b.zb?!0:b.zb;if(null==B("_lact",window)){var c=parseInt(G("LACT"),10);c=isFinite(c)?Date.now()-Math.max(c,0):-1;A("_lact",c,window);A("_fact",c,window);-1==c&&Ug();Hg(document,"keydown",Ug);Hg(document,"keyup",Ug);Hg(document,"mousedown",Ug);Hg(document,"mouseup",Ug);a?Hg(window,"touchmove",function(){Vg("touchmove",200)},{passive:!0}):(Hg(window,"resize",function(){Vg("resize",200)}),b&&Hg(window,"scroll",function(){Vg("scroll",200)}));
new Lg(function(){Vg("mouse",100)});
Hg(document,"touchstart",Ug,{passive:!0});Hg(document,"touchend",Ug,{passive:!0})}}
function Vg(a,b){Sg[a]||(Sg[a]=!0,Rg.L(function(){Ug();Sg[a]=!1},b))}
function Ug(){null==B("_lact",window)&&Tg();var a=Date.now();A("_lact",a,window);-1==B("_fact",window)&&A("_fact",a,window);(a=B("ytglobal.ytUtilActivityCallback_"))&&a()}
function Wg(){var a=B("_lact",window);return null==a?-1:Math.max(Date.now()-a,0)}
;function Xg(){var a=Yg;B("yt.ads.biscotti.getId_")||A("yt.ads.biscotti.getId_",a,void 0)}
function Zg(a){A("yt.ads.biscotti.lastId_",a,void 0)}
;var $g=/^[\w.]*$/,ah={q:!0,search_query:!0};function bh(a,b){b=a.split(b);for(var c={},d=0,e=b.length;d<e;d++){var f=b[d].split("=");if(1==f.length&&f[0]||2==f.length)try{var g=ch(f[0]||""),h=ch(f[1]||"");g in c?Array.isArray(c[g])?gb(c[g],h):c[g]=[c[g],h]:c[g]=h}catch(q){var k=q,l=f[0],n=String(bh);k.args=[{key:l,value:f[1],query:a,method:dh==n?"unchanged":n}];ah.hasOwnProperty(l)||sg(k)}}return c}
var dh=String(bh);function eh(a){var b=[];hb(a,function(c,d){var e=encodeURIComponent(String(d)),f;Array.isArray(c)?f=c:f=[c];E(f,function(g){""==g?b.push(e):b.push(e+"="+encodeURIComponent(String(g)))})});
return b.join("&")}
function fh(a){"?"==a.charAt(0)&&(a=a.substr(1));return bh(a,"&")}
function gh(){var a=window.location.href;return-1!=a.indexOf("?")?(a=(a||"").split("#")[0],a=a.split("?",2),fh(1<a.length?a[1]:a[0])):{}}
function hh(a,b,c){var d=a.split("#",2);a=d[0];d=1<d.length?"#"+d[1]:"";var e=a.split("?",2);a=e[0];e=fh(e[1]||"");for(var f in b)!c&&null!==e&&f in e||(e[f]=b[f]);return kc(a,e)+d}
function ih(a){if(!b)var b=window.location.href;var c=a.match(fc)[1]||null,d=hc(a);c&&d?(a=a.match(fc),b=b.match(fc),a=a[3]==b[3]&&a[1]==b[1]&&a[4]==b[4]):a=d?hc(b)==d&&(Number(b.match(fc)[4]||null)||null)==(Number(a.match(fc)[4]||null)||null):!0;return a}
function ch(a){return a&&a.match($g)?a:decodeURIComponent(a.replace(/\+/g," "))}
;function jh(a){var b=kh;a=void 0===a?B("yt.ads.biscotti.lastId_")||"":a;var c=Object,d=c.assign,e={};e.dt=Hd;e.flash="0";a:{try{var f=b.h.top.location.href}catch(Ma){f=2;break a}f=f?f===b.i.location.href?0:1:2}e=(e.frm=f,e);try{e.u_tz=-(new Date).getTimezoneOffset();var g=void 0===g?hd:g;try{var h=g.history.length}catch(Ma){h=0}e.u_his=h;var k;e.u_h=null==(k=hd.screen)?void 0:k.height;var l;e.u_w=null==(l=hd.screen)?void 0:l.width;var n;e.u_ah=null==(n=hd.screen)?void 0:n.availHeight;var q;e.u_aw=
null==(q=hd.screen)?void 0:q.availWidth;var u;e.u_cd=null==(u=hd.screen)?void 0:u.colorDepth}catch(Ma){}h=b.h;try{var p=h.screenX;var y=h.screenY}catch(Ma){}try{var C=h.outerWidth;var F=h.outerHeight}catch(Ma){}try{var O=h.innerWidth;var R=h.innerHeight}catch(Ma){}try{var Aa=h.screenLeft;var en=h.screenTop}catch(Ma){}try{O=h.innerWidth,R=h.innerHeight}catch(Ma){}try{var fn=h.screen.availWidth;var gn=h.screen.availTop}catch(Ma){}p=[Aa,en,p,y,fn,gn,C,F,O,R];y=b.h.top;try{var Hb=(y||window).document,
ya="CSS1Compat"==Hb.compatMode?Hb.documentElement:Hb.body;var Ba=(new sd(ya.clientWidth,ya.clientHeight)).round()}catch(Ma){Ba=new sd(-12245933,-12245933)}Hb=Ba;Ba={};ya=new Ee;z.SVGElement&&z.document.createElementNS&&ya.set(0);y=Ed();y["allow-top-navigation-by-user-activation"]&&ya.set(1);y["allow-popups-to-escape-sandbox"]&&ya.set(2);z.crypto&&z.crypto.subtle&&ya.set(3);z.TextDecoder&&z.TextEncoder&&ya.set(4);ya=Fe(ya);Ba.bc=ya;Ba.bih=Hb.height;Ba.biw=Hb.width;Ba.brdim=p.join();b=b.i;b=(Ba.vis=
{visible:1,hidden:2,prerender:3,preview:4,unloaded:5}[b.visibilityState||b.webkitVisibilityState||b.mozVisibilityState||""]||0,Ba.wgl=!!hd.WebGLRenderingContext,Ba);c=d.call(c,e,b);c.ca_type="image";a&&(c.bid=a);return c}
var kh=new function(){var a=window.document;this.h=window;this.i=a};
A("yt.ads_.signals_.getAdSignalsString",function(a){return eh(jh(a))},void 0);Date.now();var lh="XMLHttpRequest"in z?function(){return new XMLHttpRequest}:null;
function mh(){if(!lh)return null;var a=lh();return"open"in a?a:null}
function nh(a){switch(a&&"status"in a?a.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:return!0;default:return!1}}
;var oh={Authorization:"AUTHORIZATION","X-Goog-Visitor-Id":"SANDBOXED_VISITOR_ID","X-Youtube-Domain-Admin-State":"DOMAIN_ADMIN_STATE","X-Youtube-Chrome-Connected":"CHROME_CONNECTED_HEADER","X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-YouTube-Delegation-Context":"INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT","X-YouTube-Device":"DEVICE","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL","X-YouTube-Page-Label":"PAGE_BUILD_LABEL",
"X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM"},ph="app debugcss debugjs expflag force_ad_params force_ad_encrypted force_viral_ad_response_params forced_experiments innertube_snapshots innertube_goldens internalcountrycode internalipoverride absolute_experiments conditional_experiments sbb sr_bns_address".split(" ").concat(fa("client_dev_mss_url client_dev_regex_map client_dev_root_url expflag jsfeat jsmode client_rollout_override".split(" "))),qh=!1;
function rh(a,b){b=void 0===b?{}:b;var c=ih(a),d=M("web_ajax_ignore_global_headers_if_set"),e;for(e in oh){var f=G(oh[e]);!f||!c&&hc(a)||d&&void 0!==b[e]||(b[e]=f)}if(c||!hc(a))b["X-YouTube-Utc-Offset"]=String(-(new Date).getTimezoneOffset());if(c||!hc(a)){try{var g=(new Intl.DateTimeFormat).resolvedOptions().timeZone}catch(h){}g&&(b["X-YouTube-Time-Zone"]=g)}if(c||!hc(a))b["X-YouTube-Ad-Signals"]=eh(jh(void 0));return b}
function sh(a){var b=window.location.search,c=hc(a);M("debug_handle_relative_url_for_query_forward_killswitch")||c||!ih(a)||(c=document.location.hostname);var d=gc(a.match(fc)[5]||null);d=(c=c&&(c.endsWith("youtube.com")||c.endsWith("youtube-nocookie.com")))&&d&&d.startsWith("/api/");if(!c||d)return a;var e=fh(b),f={};E(ph,function(g){e[g]&&(f[g]=e[g])});
return hh(a,f||{},!1)}
function th(a,b){var c=b.format||"JSON";a=uh(a,b);var d=vh(a,b),e=!1,f=wh(a,function(k){if(!e){e=!0;h&&Kg(h);var l=nh(k),n=null,q=400<=k.status&&500>k.status,u=500<=k.status&&600>k.status;if(l||q||u)n=xh(a,c,k,b.convertToSafeHtml);if(l)a:if(k&&204==k.status)l=!0;else{switch(c){case "XML":l=0==parseInt(n&&n.return_code,10);break a;case "RAW":l=!0;break a}l=!!n}n=n||{};q=b.context||z;l?b.onSuccess&&b.onSuccess.call(q,k,n):b.onError&&b.onError.call(q,k,n);b.onFinish&&b.onFinish.call(q,k,n)}},b.method,
d,b.headers,b.responseType,b.withCredentials);
if(b.onTimeout&&0<b.timeout){var g=b.onTimeout;var h=N(function(){e||(e=!0,f.abort(),Kg(h),g.call(b.context||z,f))},b.timeout)}return f}
function uh(a,b){b.includeDomain&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var c=G("XSRF_FIELD_NAME",void 0);if(b=b.urlParams)b[c]&&delete b[c],a=hh(a,b||{},!0);return a}
function vh(a,b){var c=G("XSRF_FIELD_NAME",void 0),d=G("XSRF_TOKEN",void 0),e=b.postBody||"",f=b.postParams,g=G("XSRF_FIELD_NAME",void 0),h;b.headers&&(h=b.headers["Content-Type"]);b.excludeXsrf||hc(a)&&!b.withCredentials&&hc(a)!=document.location.hostname||"POST"!=b.method||h&&"application/x-www-form-urlencoded"!=h||b.postParams&&b.postParams[g]||(f||(f={}),f[c]=d);f&&"string"===typeof e&&(e=fh(e),rb(e,f),e=b.postBodyFormat&&"JSON"==b.postBodyFormat?JSON.stringify(e):jc(e));f=e||f&&!kb(f);!qh&&f&&
"POST"!=b.method&&(qh=!0,rg(Error("AJAX request with postData should use POST")));return e}
function xh(a,b,c,d){var e=null;switch(b){case "JSON":try{var f=c.responseText}catch(g){throw d=Error("Error reading responseText"),d.params=a,sg(d),g;}a=c.getResponseHeader("Content-Type")||"";f&&0<=a.indexOf("json")&&(")]}'\n"===f.substring(0,5)&&(f=f.substring(5)),e=JSON.parse(f));break;case "XML":if(a=(a=c.responseXML)?yh(a):null)e={},E(a.getElementsByTagName("*"),function(g){e[g.tagName]=zh(g)})}d&&Ah(e);
return e}
function Ah(a){if(Na(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);if(c){c=b;wb("HTML that is escaped and sanitized server-side and passed through yt.net.ajax");var d=Zb(a[b],null);a[c]=d}else Ah(a[b])}}
function yh(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
function zh(a){var b="";E(a.childNodes,function(c){b+=c.nodeValue});
return b}
function wh(a,b,c,d,e,f,g){function h(){4==(k&&"readyState"in k?k.readyState:0)&&b&&qg(b)(k)}
c=void 0===c?"GET":c;d=void 0===d?"":d;var k=mh();if(!k)return null;"onloadend"in k?k.addEventListener("loadend",h,!1):k.onreadystatechange=h;M("debug_forward_web_query_parameters")&&(a=sh(a));k.open(c,a,!0);f&&(k.responseType=f);g&&(k.withCredentials=!0);c="POST"==c&&(void 0===window.FormData||!(d instanceof FormData));if(e=rh(a,e))for(var l in e)k.setRequestHeader(l,e[l]),"content-type"==l.toLowerCase()&&(c=!1);c&&k.setRequestHeader("Content-Type","application/x-www-form-urlencoded");k.send(d);
return k}
;var Bh=Hc||Ic;function Ch(a){var b=Tb;return b?0<=b.toLowerCase().indexOf(a):!1}
;var Dh={},Eh=0;
function Fh(a,b,c,d,e){e=void 0===e?"":e;if(a)if(c&&!Ch("cobalt")){if(a){a instanceof Mb||(a="object"==typeof a&&a.ca?a.ba():String(a),Rb.test(a)?a=new Mb(a,Nb):(a=String(a),a=a.replace(/(%0A|%0D)/g,""),a=(b=a.match(Qb))&&Pb.test(b[1])?new Mb(a,Nb):null));b=Ob(a||Sb);if("about:invalid#zClosurez"===b||b.startsWith("data"))a="";else{if(b instanceof Yb)a=b;else{var f="object"==typeof b;a=null;f&&b.Pa&&(a=b.La());b=f&&b.ca?b.ba():String(b);Lb.test(b)&&(-1!=b.indexOf("&")&&(b=b.replace(Eb,"&amp;")),-1!=
b.indexOf("<")&&(b=b.replace(Fb,"&lt;")),-1!=b.indexOf(">")&&(b=b.replace(Gb,"&gt;")),-1!=b.indexOf('"')&&(b=b.replace(Ib,"&quot;")),-1!=b.indexOf("'")&&(b=b.replace(Jb,"&#39;")),-1!=b.indexOf("\x00")&&(b=b.replace(Kb,"&#0;")));a=Zb(b,a)}a instanceof Yb&&a.constructor===Yb?a=a.h:(Ka(a),a="type_error:SafeHtml");a=encodeURIComponent(String(rf(a.toString())))}/^[\s\xa0]*$/.test(a)||(a=wd("IFRAME",{src:'javascript:"<body><img src=\\""+'+a+'+"\\"></body>"',style:"display:none"}),(9==a.nodeType?a:a.ownerDocument||
a.document).body.appendChild(a))}}else if(e)wh(a,b,"POST",e,d);else if(G("USE_NET_AJAX_FOR_PING_TRANSPORT",!1)||d)wh(a,b,"GET","",d);else{b:{try{var g=new Ya({url:a});if(g.j&&g.i||g.l){var h=gc(a.match(fc)[5]||null),k;if(!(k=!h||!h.endsWith("/aclk"))){var l=a.search(lc);d:{for(c=0;0<=(c=a.indexOf("ri",c))&&c<l;){var n=a.charCodeAt(c-1);if(38==n||63==n){var q=a.charCodeAt(c+2);if(!q||61==q||38==q||35==q){var u=c;break d}}c+=3}u=-1}if(0>u)var p=null;else{var y=a.indexOf("&",u);if(0>y||y>l)y=l;u+=3;
p=decodeURIComponent(a.substr(u,y-u).replace(/\+/g," "))}k="1"!==p}f=!k;break b}}catch(C){}f=!1}f?Gh(a)?(b&&b(),f=!0):f=!1:f=!1;f||Hh(a,b)}}
function Ih(a){var b=void 0===b?"":b;Gh(a,b)||Fh(a,void 0,void 0,void 0,b)}
function Gh(a,b){try{if(window.navigator&&window.navigator.sendBeacon&&window.navigator.sendBeacon(a,void 0===b?"":b))return!0}catch(c){}return!1}
function Hh(a,b){var c=new Image,d=""+Eh++;Dh[d]=c;c.onload=c.onerror=function(){b&&Dh[d]&&b();delete Dh[d]};
c.src=a}
;var Jh=z.ytPubsubPubsubInstance||new K,Kh=z.ytPubsubPubsubSubscribedKeys||{},Lh=z.ytPubsubPubsubTopicToKeys||{},Mh=z.ytPubsubPubsubIsSynchronous||{};function Nh(a,b){var c=Oh();if(c&&b){var d=c.subscribe(a,function(){var e=arguments;var f=function(){Kh[d]&&b.apply&&"function"==typeof b.apply&&b.apply(window,e)};
try{Mh[a]?f():N(f,0)}catch(g){rg(g)}},void 0);
Kh[d]=!0;Lh[a]||(Lh[a]=[]);Lh[a].push(d);return d}return 0}
function Ph(a){var b=Oh();b&&("number"===typeof a?a=[a]:"string"===typeof a&&(a=[parseInt(a,10)]),E(a,function(c){b.unsubscribeByKey(c);delete Kh[c]}))}
function Qh(a,b){var c=Oh();c&&c.publish.apply(c,arguments)}
function Rh(a){var b=Oh();if(b)if(b.clear(a),a)Sh(a);else for(var c in Lh)Sh(c)}
function Oh(){return z.ytPubsubPubsubInstance}
function Sh(a){Lh[a]&&(a=Lh[a],E(a,function(b){Kh[b]&&delete Kh[b]}),a.length=0)}
K.prototype.subscribe=K.prototype.subscribe;K.prototype.unsubscribeByKey=K.prototype.oa;K.prototype.publish=K.prototype.ha;K.prototype.clear=K.prototype.clear;A("ytPubsubPubsubInstance",Jh,void 0);A("ytPubsubPubsubTopicToKeys",Lh,void 0);A("ytPubsubPubsubIsSynchronous",Mh,void 0);A("ytPubsubPubsubSubscribedKeys",Kh,void 0);var Th=window,P=Th.ytcsi&&Th.ytcsi.now?Th.ytcsi.now:Th.performance&&Th.performance.timing&&Th.performance.now&&Th.performance.timing.navigationStart?function(){return Th.performance.timing.navigationStart+Th.performance.now()}:function(){return(new Date).getTime()};var Uh=wg("initial_gel_batch_timeout",2E3),Vh=Math.pow(2,16)-1,Wh=void 0,Xh=0,Yh=0,Zh=0,$h=!0,ai=z.ytLoggingTransportGELQueue_||new Map;A("ytLoggingTransportGELQueue_",ai,void 0);var bi=z.ytLoggingTransportTokensToCttTargetIds_||{};A("ytLoggingTransportTokensToCttTargetIds_",bi,void 0);
function ci(a,b){if("log_event"===a.endpoint){var c="";a.za?c="visitorOnlyApprovedKey":a.cttAuthInfo&&(bi[a.cttAuthInfo.token]=di(a.cttAuthInfo),c=a.cttAuthInfo.token);var d=ai.get(c)||[];ai.set(c,d);d.push(a.payload);b&&(Wh=new b);a=wg("tvhtml5_logging_max_batch")||wg("web_logging_max_batch")||100;b=P();d.length>=a?ei({writeThenSend:!0},M("flush_only_full_queue")?c:void 0):10<=b-Zh&&(fi(),Zh=b)}}
function gi(a,b){if("log_event"===a.endpoint){var c="";a.za?c="visitorOnlyApprovedKey":a.cttAuthInfo&&(bi[a.cttAuthInfo.token]=di(a.cttAuthInfo),c=a.cttAuthInfo.token);var d=new Map;d.set(c,[a.payload]);b&&(Wh=new b);return new yf(function(e){Wh&&Wh.isReady()?hi(d,e,{bypassNetworkless:!0},!0):e()})}}
function ei(a,b){a=void 0===a?{}:a;new yf(function(c){Kg(Xh);Kg(Yh);Yh=0;if(Wh&&Wh.isReady())if(void 0!==b){var d=new Map,e=ai.get(b)||[];d.set(b,e);hi(d,c,a);ai.delete(b)}else hi(ai,c,a),ai.clear();else fi(),c()})}
function fi(){M("web_gel_timeout_cap")&&!Yh&&(Yh=N(function(){ei({writeThenSend:!0})},6E4));
Kg(Xh);var a=G("LOGGING_BATCH_TIMEOUT",wg("web_gel_debounce_ms",1E4));M("shorten_initial_gel_batch_timeout")&&$h&&(a=Uh);Xh=N(function(){ei({writeThenSend:!0})},a)}
function hi(a,b,c,d){var e=Wh;c=void 0===c?{}:c;var f=Math.round(P()),g=a.size;a=t(a);for(var h=a.next();!h.done;h=a.next()){var k=t(h.value);h=k.next().value;var l=k=k.next().value;k=pb({context:ii(e.config_||ji())});k.events=l;(l=bi[h])&&ki(k,h,l);delete bi[h];h="visitorOnlyApprovedKey"===h;li(k,f,h);M("always_send_and_write")&&(c.writeThenSend=!1);M("send_beacon_before_gel")&&window.navigator&&window.navigator.sendBeacon&&!c.writeThenSend&&Ih("/generate_204");mi(e,"log_event",k,{retry:!0,onSuccess:function(){g--;
g||b()},
onError:function(){g--;g||b()},
kb:c,za:h,Rm:!!d});$h=!1}}
function li(a,b,c){a.requestTimeMs=String(b);M("unsplit_gel_payloads_in_logs")&&(a.unsplitGelPayloadsInLogs=!0);!c&&(b=G("EVENT_ID",void 0))&&((c=G("BATCH_CLIENT_COUNTER",void 0)||0)||(c=Math.floor(Math.random()*Vh/2)),c++,c>Vh&&(c=1),L("BATCH_CLIENT_COUNTER",c),a.serializedClientEventId={serializedEventId:b,clientCounter:String(c)})}
function ki(a,b,c){if(c.videoId)var d="VIDEO";else if(c.playlistId)d="PLAYLIST";else return;a.credentialTransferTokenTargetId=c;a.context=a.context||{};a.context.user=a.context.user||{};a.context.user.credentialTransferTokens=[{token:b,scope:d}]}
function di(a){var b={};a.videoId?b.videoId=a.videoId:a.playlistId&&(b.playlistId=a.playlistId);return b}
;var ni=z.ytLoggingGelSequenceIdObj_||{};A("ytLoggingGelSequenceIdObj_",ni,void 0);
function oi(a,b,c,d){d=void 0===d?{}:d;if(M("lr_drop_other_and_business_payloads")){if(yg[a]||xg[a])return}else if(M("lr_drop_other_payloads")&&yg[a])return;var e={},f=Math.round(d.timestamp||P());e.eventTimeMs=f<Number.MAX_SAFE_INTEGER?f:0;e[a]=b;a=Wg();e.context={lastActivityMs:String(d.timestamp||!isFinite(a)?-1:a)};M("log_sequence_info_on_gel_web")&&d.fa&&(a=e.context,b=d.fa,ni[b]=b in ni?ni[b]+1:0,a.sequence={index:ni[b],groupKey:b},d.Ab&&delete ni[d.fa]);(d.bn?gi:ci)({endpoint:"log_event",payload:e,
cttAuthInfo:d.cttAuthInfo,za:d.za},c)}
;function pi(){if(!z.matchMedia)return"WEB_DISPLAY_MODE_UNKNOWN";try{return z.matchMedia("(display-mode: standalone)").matches?"WEB_DISPLAY_MODE_STANDALONE":z.matchMedia("(display-mode: minimal-ui)").matches?"WEB_DISPLAY_MODE_MINIMAL_UI":z.matchMedia("(display-mode: fullscreen)").matches?"WEB_DISPLAY_MODE_FULLSCREEN":z.matchMedia("(display-mode: browser)").matches?"WEB_DISPLAY_MODE_BROWSER":"WEB_DISPLAY_MODE_UNKNOWN"}catch(a){return"WEB_DISPLAY_MODE_UNKNOWN"}}
;function qi(a,b,c,d,e){Pd.set(""+a,b,{Ra:c,path:"/",domain:void 0===d?"youtube.com":d,secure:void 0===e?!1:e})}
;var ri=B("ytglobal.prefsUserPrefsPrefs_")||{};A("ytglobal.prefsUserPrefsPrefs_",ri,void 0);function si(){this.h=G("ALT_PREF_COOKIE_NAME","PREF");this.i=G("ALT_PREF_COOKIE_DOMAIN","youtube.com");var a=Pd.get(""+this.h,void 0);if(a){a=decodeURIComponent(a).split("&");for(var b=0;b<a.length;b++){var c=a[b].split("="),d=c[0];(c=c[1])&&(ri[d]=c.toString())}}}
si.prototype.get=function(a,b){ti(a);ui(a);a=void 0!==ri[a]?ri[a].toString():null;return null!=a?a:b?b:""};
si.prototype.set=function(a,b){ti(a);ui(a);if(null==b)throw Error("ExpectedNotNull");ri[a]=b.toString()};
si.prototype.remove=function(a){ti(a);ui(a);delete ri[a]};
si.prototype.clear=function(){for(var a in ri)delete ri[a]};
function ui(a){if(/^f([1-9][0-9]*)$/.test(a))throw Error("ExpectedRegexMatch: "+a);}
function ti(a){if(!/^\w+$/.test(a))throw Error("ExpectedRegexMismatch: "+a);}
function vi(a){a=void 0!==ri[a]?ri[a].toString():null;return null!=a&&/^[A-Fa-f0-9]+$/.test(a)?parseInt(a,16):null}
Ja(si);var wi={bluetooth:"CONN_DISCO",cellular:"CONN_CELLULAR_UNKNOWN",ethernet:"CONN_WIFI",none:"CONN_NONE",wifi:"CONN_WIFI",wimax:"CONN_CELLULAR_4G",other:"CONN_UNKNOWN",unknown:"CONN_UNKNOWN","slow-2g":"CONN_CELLULAR_2G","2g":"CONN_CELLULAR_2G","3g":"CONN_CELLULAR_3G","4g":"CONN_CELLULAR_4G"},xi={"slow-2g":"EFFECTIVE_CONNECTION_TYPE_SLOW_2G","2g":"EFFECTIVE_CONNECTION_TYPE_2G","3g":"EFFECTIVE_CONNECTION_TYPE_3G","4g":"EFFECTIVE_CONNECTION_TYPE_4G"};
function yi(){var a=z.navigator;return a?a.connection:void 0}
;function zi(){return"INNERTUBE_API_KEY"in mg&&"INNERTUBE_API_VERSION"in mg}
function ji(){return{innertubeApiKey:G("INNERTUBE_API_KEY",void 0),innertubeApiVersion:G("INNERTUBE_API_VERSION",void 0),Cb:G("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),Db:G("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),innertubeContextClientVersion:G("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0),Fb:G("INNERTUBE_CONTEXT_HL",void 0),Eb:G("INNERTUBE_CONTEXT_GL",void 0),Gb:G("INNERTUBE_HOST_OVERRIDE",void 0)||"",Ib:!!G("INNERTUBE_USE_THIRD_PARTY_AUTH",!1),Hb:!!G("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT",
!1),appInstallData:G("SERIALIZED_CLIENT_CONFIG_DATA",void 0)}}
function ii(a){var b={client:{hl:a.Fb,gl:a.Eb,clientName:a.Db,clientVersion:a.innertubeContextClientVersion,configInfo:a.Cb}};navigator.userAgent&&(b.client.userAgent=String(navigator.userAgent));var c=z.devicePixelRatio;c&&1!=c&&(b.client.screenDensityFloat=String(c));c=G("EXPERIMENTS_TOKEN","");""!==c&&(b.client.experimentsToken=c);c=[];var d=G("EXPERIMENTS_FORCED_FLAGS",{});for(e in d)c.push({key:e,value:String(d[e])});var e=G("EXPERIMENT_FLAGS",{});for(var f in e)f.startsWith("force_")&&void 0===
d[f]&&c.push({key:f,value:String(e[f])});0<c.length&&(b.request={internalExperimentFlags:c});f=b.client.clientName;if("WEB"===f||"MWEB"===f||1===f||2===f){var g;b.client.mainAppWebInfo=null!=(g=b.client.mainAppWebInfo)?g:{};b.client.mainAppWebInfo.webDisplayMode=pi()}else if(g=b.client.clientName,("WEB_REMIX"===g||76===g)&&!M("music_web_display_mode_killswitch")){var h;b.client.jb=null!=(h=b.client.jb)?h:{};b.client.jb.webDisplayMode=pi()}var k;if(M("web_log_memory_total_kbytes")&&(null==(k=z.navigator)?
0:k.deviceMemory)){var l;h=null==(l=z.navigator)?void 0:l.deviceMemory;b.client.memoryTotalKbytes=""+1E6*h}a.appInstallData&&(b.client.configInfo=b.client.configInfo||{},b.client.configInfo.appInstallData=a.appInstallData);G("DELEGATED_SESSION_ID")&&!M("pageid_as_header_web")&&(b.user={onBehalfOfUser:G("DELEGATED_SESSION_ID")});a:{if(l=yi()){a=wi[l.type||"unknown"]||"CONN_UNKNOWN";l=wi[l.effectiveType||"unknown"]||"CONN_UNKNOWN";"CONN_CELLULAR_UNKNOWN"===a&&"CONN_UNKNOWN"!==l&&(a=l);if("CONN_UNKNOWN"!==
a)break a;if("CONN_UNKNOWN"!==l){a=l;break a}}a=void 0}a&&(b.client.connectionType=a);M("web_log_effective_connection_type")&&(a=yi(),a=null!==a&&void 0!==a&&a.effectiveType?xi.hasOwnProperty(a.effectiveType)?xi[a.effectiveType]:"EFFECTIVE_CONNECTION_TYPE_UNKNOWN":void 0,a&&(b.client.effectiveConnectionType=a));a=Object;l=a.assign;h=b.client;k={};g=t(Object.entries(fh(G("DEVICE",""))));for(f=g.next();!f.done;f=g.next())e=t(f.value),f=e.next().value,e=e.next().value,"cbrand"===f?k.deviceMake=e:"cmodel"===
f?k.deviceModel=e:"cbr"===f?k.browserName=e:"cbrver"===f?k.browserVersion=e:"cos"===f?k.osName=e:"cosver"===f?k.osVersion=e:"cplatform"===f&&(k.platform=e);b.client=l.call(a,h,k);return b}
function Ai(a,b,c){c=void 0===c?{}:c;var d={"X-Goog-Visitor-Id":c.visitorData||G("VISITOR_DATA","")};if(b&&b.includes("www.youtube-nocookie.com"))return d;(b=c.Pm||G("AUTHORIZATION"))||(a?b="Bearer "+B("gapi.auth.getToken")().Om:b=Td([]));b&&(d.Authorization=b,d["X-Goog-AuthUser"]=G("SESSION_INDEX",0),M("pageid_as_header_web")&&(d["X-Goog-PageId"]=G("DELEGATED_SESSION_ID")));return d}
;function Bi(a){a=Object.assign({},a);delete a.Authorization;var b=Td();if(b){var c=new We;c.update(G("INNERTUBE_API_KEY",void 0));c.update(b);a.hash=Mc(c.digest(),3)}return a}
;function Ci(a){var b=new $f;(b=b.isAvailable()?a?new fg(b,a):b:null)||(a=new ag(a||"UserDataSharedStore"),b=a.isAvailable()?a:null);this.h=(a=b)?new Wf(a):null;this.i=document.domain||window.location.hostname}
Ci.prototype.set=function(a,b,c,d){c=c||31104E3;this.remove(a);if(this.h)try{this.h.set(a,b,Date.now()+1E3*c);return}catch(f){}var e="";if(d)try{e=escape(rf(b))}catch(f){return}else e=escape(b);qi(a,e,c,this.i)};
Ci.prototype.get=function(a,b){var c=void 0,d=!this.h;if(!d)try{c=this.h.get(a)}catch(e){d=!0}if(d&&(c=Pd.get(""+a,void 0))&&(c=unescape(c),b))try{c=JSON.parse(c)}catch(e){this.remove(a),c=void 0}return c};
Ci.prototype.remove=function(a){this.h&&this.h.remove(a);var b=this.i;Pd.remove(""+a,"/",void 0===b?"youtube.com":b)};var Di;function Ei(){Di||(Di=new Ci("yt.innertube"));return Di}
function Fi(a,b,c,d){if(d)return null;d=Ei().get("nextId",!0)||1;var e=Ei().get("requests",!0)||{};e[d]={method:a,request:b,authState:Bi(c),requestTime:Math.round(P())};Ei().set("nextId",d+1,86400,!0);Ei().set("requests",e,86400,!0);return d}
function Gi(a){var b=Ei().get("requests",!0)||{};delete b[a];Ei().set("requests",b,86400,!0)}
function Hi(a){var b=Ei().get("requests",!0);if(b){for(var c in b){var d=b[c];if(!(6E4>Math.round(P())-d.requestTime)){var e=d.authState,f=Bi(Ai(!1));nb(e,f)&&(e=d.request,"requestTimeMs"in e&&(e.requestTimeMs=Math.round(P())),mi(a,d.method,e,{}));delete b[c]}}Ei().set("requests",b,86400,!0)}}
;var Ii=function(){var a;return function(){a||(a=new Ci("ytidb"));return a}}();
function Ji(){var a;return null===(a=Ii())||void 0===a?void 0:a.get("LAST_RESULT_ENTRY_KEY",!0)}
;var Ki=[],Li=!1;function Mi(a){Li||(Ki.push({type:"ERROR",payload:a}),10<Ki.length&&Ki.shift())}
function Ni(a,b){Li||(Ki.push({type:"EVENT",eventType:a,payload:b}),10<Ki.length&&Ki.shift())}
;function Oi(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];d=Error.call(this,a);this.message=d.message;"stack"in d&&(this.stack=d.stack);this.args=[].concat(fa(c))}
v(Oi,Error);function Pi(){try{return Qi(),!0}catch(a){return!1}}
function Qi(){if(void 0!==G("DATASYNC_ID",void 0))return G("DATASYNC_ID",void 0);throw new Oi("Datasync ID not set","unknown");}
;function Ri(a){if(0<=a.indexOf(":"))throw Error("Database name cannot contain ':'");}
function Si(a){return a.substr(0,a.indexOf(":"))||a}
;var Ti={},Ui=(Ti.AUTH_INVALID="No user identifier specified.",Ti.EXPLICIT_ABORT="Transaction was explicitly aborted.",Ti.IDB_NOT_SUPPORTED="IndexedDB is not supported.",Ti.MISSING_INDEX="Index not created.",Ti.MISSING_OBJECT_STORE="Object store not created.",Ti.DB_DELETED_BY_MISSING_OBJECT_STORE="Database is deleted because an expected object store was not created.",Ti.UNKNOWN_ABORT="Transaction was aborted for unknown reasons.",Ti.QUOTA_EXCEEDED="The current transaction exceeded its quota limitations.",
Ti.QUOTA_MAYBE_EXCEEDED="The current transaction may have failed because of exceeding quota limitations.",Ti.EXECUTE_TRANSACTION_ON_CLOSED_DB="Can't start a transaction on a closed database",Ti.INCOMPATIBLE_DB_VERSION="The binary is incompatible with the database version",Ti),Vi={},Wi=(Vi.AUTH_INVALID="ERROR",Vi.EXECUTE_TRANSACTION_ON_CLOSED_DB="WARNING",Vi.EXPLICIT_ABORT="IGNORED",Vi.IDB_NOT_SUPPORTED="ERROR",Vi.MISSING_INDEX="WARNING",Vi.MISSING_OBJECT_STORE="ERROR",Vi.DB_DELETED_BY_MISSING_OBJECT_STORE=
"WARNING",Vi.QUOTA_EXCEEDED="WARNING",Vi.QUOTA_MAYBE_EXCEEDED="WARNING",Vi.UNKNOWN_ABORT="WARNING",Vi.INCOMPATIBLE_DB_VERSION="WARNING",Vi),Xi={},Yi=(Xi.AUTH_INVALID=!1,Xi.EXECUTE_TRANSACTION_ON_CLOSED_DB=!1,Xi.EXPLICIT_ABORT=!1,Xi.IDB_NOT_SUPPORTED=!1,Xi.MISSING_INDEX=!1,Xi.MISSING_OBJECT_STORE=!1,Xi.DB_DELETED_BY_MISSING_OBJECT_STORE=!1,Xi.QUOTA_EXCEEDED=!1,Xi.QUOTA_MAYBE_EXCEEDED=!0,Xi.UNKNOWN_ABORT=!0,Xi.INCOMPATIBLE_DB_VERSION=!1,Xi);
function Q(a,b,c,d,e){b=void 0===b?{}:b;c=void 0===c?Ui[a]:c;d=void 0===d?Wi[a]:d;e=void 0===e?Yi[a]:e;Oi.call(this,c,Object.assign({name:"YtIdbKnownError",isSw:void 0===self.document,isIframe:self!==self.top,type:a},b));this.type=a;this.message=c;this.level=d;this.h=e;Object.setPrototypeOf(this,Q.prototype)}
v(Q,Oi);function Zi(a){Q.call(this,"MISSING_OBJECT_STORE",{Kb:a},Ui.MISSING_OBJECT_STORE);Object.setPrototypeOf(this,Zi.prototype)}
v(Zi,Q);function $i(a,b){var c=Error.call(this);this.message=c.message;"stack"in c&&(this.stack=c.stack);this.index=a;this.objectStore=b;Object.setPrototypeOf(this,$i.prototype)}
v($i,Error);var aj=["The database connection is closing","Can't start a transaction on a closed database","A mutation operation was attempted on a database that did not allow mutations"];
function bj(a,b,c,d){b=Si(b);var e=a instanceof Error?a:Error("Unexpected error: "+a);if(e instanceof Q)return e;a={objectStoreNames:c,dbName:b,dbVersion:d};if("QuotaExceededError"===e.name)return new Q("QUOTA_EXCEEDED",a);if(Jc&&"UnknownError"===e.name)return new Q("QUOTA_MAYBE_EXCEEDED",a);if(e instanceof $i)return new Q("MISSING_INDEX",Object.assign(Object.assign({},a),{objectStore:e.objectStore,index:e.index}));if("InvalidStateError"===e.name&&aj.some(function(f){return e.message.includes(f)}))return new Q("EXECUTE_TRANSACTION_ON_CLOSED_DB",
a);
if("AbortError"===e.name)return new Q("UNKNOWN_ABORT",a,e.message);e.args=[Object.assign(Object.assign({},a),{name:"IdbError",Xm:e.name})];e.level="WARNING";return e}
function cj(a,b,c){var d=Ji();return new Q("IDB_NOT_SUPPORTED",{context:{caller:a,publicName:b,version:c,hasSucceededOnce:null===d||void 0===d?void 0:d.hasSucceededOnce}})}
;function dj(a){if(!a)throw Error();throw a;}
function ej(a){return a}
function fj(a){this.h=a}
function S(a){function b(e){if("PENDING"===d.state.status){d.state={status:"REJECTED",reason:e};e=t(d.onRejected);for(var f=e.next();!f.done;f=e.next())f=f.value,f()}}
function c(e){if("PENDING"===d.state.status){d.state={status:"FULFILLED",value:e};e=t(d.h);for(var f=e.next();!f.done;f=e.next())f=f.value,f()}}
var d=this;this.state={status:"PENDING"};this.h=[];this.onRejected=[];a=a.h;try{a(c,b)}catch(e){b(e)}}
S.all=function(a){return new S(new fj(function(b,c){var d=[],e=a.length;0===e&&b(d);for(var f={ja:0};f.ja<a.length;f={ja:f.ja},++f.ja)gj(S.resolve(a[f.ja]).then(function(g){return function(h){d[g.ja]=h;e--;0===e&&b(d)}}(f)),function(g){c(g)})}))};
S.resolve=function(a){return new S(new fj(function(b,c){a instanceof S?a.then(b,c):b(a)}))};
S.reject=function(a){return new S(new fj(function(b,c){c(a)}))};
S.prototype.then=function(a,b){var c=this,d=null!==a&&void 0!==a?a:ej,e=null!==b&&void 0!==b?b:dj;return new S(new fj(function(f,g){"PENDING"===c.state.status?(c.h.push(function(){hj(c,c,d,f,g)}),c.onRejected.push(function(){ij(c,c,e,f,g)})):"FULFILLED"===c.state.status?hj(c,c,d,f,g):"REJECTED"===c.state.status&&ij(c,c,e,f,g)}))};
function gj(a,b){a.then(void 0,b)}
function hj(a,b,c,d,e){try{if("FULFILLED"!==a.state.status)throw Error("calling handleResolve before the promise is fulfilled.");var f=c(a.state.value);f instanceof S?jj(a,b,f,d,e):d(f)}catch(g){e(g)}}
function ij(a,b,c,d,e){try{if("REJECTED"!==a.state.status)throw Error("calling handleReject before the promise is rejected.");var f=c(a.state.reason);f instanceof S?jj(a,b,f,d,e):d(f)}catch(g){e(g)}}
function jj(a,b,c,d,e){b===c?e(new TypeError("Circular promise chain detected.")):c.then(function(f){f instanceof S?jj(a,b,f,d,e):d(f)},function(f){e(f)})}
;function kj(a,b,c){function d(){c(a.error);f()}
function e(){b(a.result);f()}
function f(){try{a.removeEventListener("success",e),a.removeEventListener("error",d)}catch(g){}}
a.addEventListener("success",e);a.addEventListener("error",d)}
function lj(a){return new Promise(function(b,c){kj(a,b,c)})}
function T(a){return new S(new fj(function(b,c){kj(a,b,c)}))}
;function mj(a,b){return new S(new fj(function(c,d){function e(){var f=a?b(a):null;f?f.then(function(g){a=g;e()},d):c()}
e()}))}
;function nj(a,b){this.h=a;this.options=b;this.transactionCount=0;this.j=Math.round(P());this.i=!1}
m=nj.prototype;m.add=function(a,b,c){return oj(this,[a],{mode:"readwrite",M:!0},function(d){return d.objectStore(a).add(b,c)})};
m.clear=function(a){return oj(this,[a],{mode:"readwrite",M:!0},function(b){return b.objectStore(a).clear()})};
m.close=function(){var a;this.h.close();(null===(a=this.options)||void 0===a?0:a.closed)&&this.options.closed()};
m.count=function(a,b){return oj(this,[a],{mode:"readonly",M:!0},function(c){return c.objectStore(a).count(b)})};
function pj(a,b,c){a=a.h.createObjectStore(b,c);return new qj(a)}
m.delete=function(a,b){return oj(this,[a],{mode:"readwrite",M:!0},function(c){return c.objectStore(a).delete(b)})};
m.get=function(a,b){return oj(this,[a],{mode:"readonly",M:!0},function(c){return c.objectStore(a).get(b)})};
function rj(a,b){return oj(a,["LogsRequestsStore"],{mode:"readwrite",M:!0},function(c){c=c.objectStore("LogsRequestsStore");return T(c.h.put(b,void 0))})}
m.objectStoreNames=function(){return Array.from(this.h.objectStoreNames)};
function oj(a,b,c,d){var e,f,g,h,k,l,n,q,u,p,y,C;return x(function(F){switch(F.h){case 1:var O={mode:"readonly",M:!1,tag:"IDB_TRANSACTION_TAG_UNKNOWN"};"string"===typeof c?O.mode=c:Object.assign(O,c);e=O;a.transactionCount++;f=e.M?3:1;g=0;case 2:if(h){F.A(3);break}g++;k=Math.round(P());ra(F,4);l=a.h.transaction(b,e.mode);O=new sj(l);O=tj(O,d);return w(F,O,6);case 6:return n=F.i,q=Math.round(P()),uj(a,k,q,g,void 0,b.join(),e),F.return(n);case 4:u=sa(F);p=Math.round(P());y=bj(u,a.h.name,b.join(),a.h.version);
if((C=y instanceof Q&&!y.h)||g>=f)uj(a,k,p,g,y,b.join(),e),h=y;F.A(2);break;case 3:return F.return(Promise.reject(h))}})}
function uj(a,b,c,d,e,f,g){b=c-b;e?(e instanceof Q&&("QUOTA_EXCEEDED"===e.type||"QUOTA_MAYBE_EXCEEDED"===e.type)&&Ni("QUOTA_EXCEEDED",{dbName:Si(a.h.name),objectStoreNames:f,transactionCount:a.transactionCount,transactionMode:g.mode}),e instanceof Q&&"UNKNOWN_ABORT"===e.type&&(c-=a.j,0>c&&c>=Math.pow(2,31)&&(c=0),Ni("TRANSACTION_UNEXPECTEDLY_ABORTED",{objectStoreNames:f,transactionDuration:b,transactionCount:a.transactionCount,dbDuration:c}),a.i=!0),vj(a,!1,d,f,b,g.tag),Mi(e)):vj(a,!0,d,f,b,g.tag)}
function vj(a,b,c,d,e,f){Ni("TRANSACTION_ENDED",{objectStoreNames:d,connectionHasUnknownAbortedTransaction:a.i,duration:e,isSuccessful:b,tryCount:c,tag:void 0===f?"IDB_TRANSACTION_TAG_UNKNOWN":f})}
m.getName=function(){return this.h.name};
function qj(a){this.h=a}
m=qj.prototype;m.add=function(a,b){return T(this.h.add(a,b))};
m.autoIncrement=function(){return this.h.autoIncrement};
m.clear=function(){return T(this.h.clear()).then(function(){})};
m.count=function(a){return T(this.h.count(a))};
function wj(a,b){return xj(a,{query:b},function(c){return c.delete().then(function(){return c.continue()})}).then(function(){})}
m.delete=function(a){return a instanceof IDBKeyRange?wj(this,a):T(this.h.delete(a))};
m.get=function(a){return T(this.h.get(a))};
m.index=function(a){try{return new yj(this.h.index(a))}catch(b){if(b instanceof Error&&"NotFoundError"===b.name)throw new $i(a,this.h.name);throw b;}};
m.getName=function(){return this.h.name};
m.keyPath=function(){return this.h.keyPath};
function xj(a,b,c){a=a.h.openCursor(b.query,b.direction);return zj(a).then(function(d){return mj(d,c)})}
function sj(a){var b=this;this.h=a;this.j=new Map;this.i=!1;this.done=new Promise(function(c,d){b.h.addEventListener("complete",function(){c()});
b.h.addEventListener("error",function(e){e.currentTarget===e.target&&d(b.h.error)});
b.h.addEventListener("abort",function(){var e=b.h.error;if(e)d(e);else if(!b.i){e=Q;for(var f=b.h.objectStoreNames,g=[],h=0;h<f.length;h++){var k=f.item(h);if(null===k)throw Error("Invariant: item in DOMStringList is null");g.push(k)}e=new e("UNKNOWN_ABORT",{objectStoreNames:g.join(),dbName:b.h.db.name,mode:b.h.mode});d(e)}})})}
function tj(a,b){var c=new Promise(function(d,e){try{gj(b(a).then(function(f){d(f)}),e)}catch(f){e(f),a.abort()}});
return Promise.all([c,a.done]).then(function(d){return t(d).next().value})}
sj.prototype.abort=function(){this.h.abort();this.i=!0;throw new Q("EXPLICIT_ABORT");};
sj.prototype.objectStore=function(a){a=this.h.objectStore(a);var b=this.j.get(a);b||(b=new qj(a),this.j.set(a,b));return b};
function yj(a){this.h=a}
m=yj.prototype;m.count=function(a){return T(this.h.count(a))};
m.delete=function(a){return Aj(this,{query:a},function(b){return b.delete().then(function(){return b.continue()})})};
m.get=function(a){return T(this.h.get(a))};
m.getKey=function(a){return T(this.h.getKey(a))};
m.keyPath=function(){return this.h.keyPath};
m.unique=function(){return this.h.unique};
function Aj(a,b,c){a=a.h.openCursor(void 0===b.query?null:b.query,void 0===b.direction?"next":b.direction);return zj(a).then(function(d){return mj(d,c)})}
function Bj(a,b){this.request=a;this.cursor=b}
function zj(a){return T(a).then(function(b){return b?new Bj(a,b):null})}
m=Bj.prototype;m.advance=function(a){this.cursor.advance(a);return zj(this.request)};
m.continue=function(a){this.cursor.continue(a);return zj(this.request)};
m.delete=function(){return T(this.cursor.delete()).then(function(){})};
m.getKey=function(){return this.cursor.key};
m.getValue=function(){return this.cursor.value};
m.update=function(a){return T(this.cursor.update(a))};function Cj(a,b,c){return new Promise(function(d,e){function f(){u||(u=new nj(g.result,{closed:q}));return u}
var g=void 0!==b?self.indexedDB.open(a,b):self.indexedDB.open(a);var h=c.blocked,k=c.blocking,l=c.Zb,n=c.upgrade,q=c.closed,u;g.addEventListener("upgradeneeded",function(p){try{if(null===p.newVersion)throw Error("Invariant: newVersion on IDbVersionChangeEvent is null");if(null===g.transaction)throw Error("Invariant: transaction on IDbOpenDbRequest is null");p.dataLoss&&"none"!==p.dataLoss&&Ni("IDB_DATA_CORRUPTED",{reason:p.dataLossMessage||"unknown reason",dbName:Si(a)});var y=f(),C=new sj(g.transaction);
n&&n(y,function(F){return p.oldVersion<F&&p.newVersion>=F},C);
C.done.catch(function(F){e(F)})}catch(F){e(F)}});
g.addEventListener("success",function(){var p=g.result;k&&p.addEventListener("versionchange",function(){k(f())});
p.addEventListener("close",function(){Ni("IDB_UNEXPECTEDLY_CLOSED",{dbName:Si(a),dbVersion:p.version});l&&l()});
d(f())});
g.addEventListener("error",function(){e(g.error)});
h&&g.addEventListener("blocked",function(){h()})})}
function Dj(a,b,c){c=void 0===c?{}:c;return Cj(a,b,c)}
function Ej(a,b){b=void 0===b?{}:b;var c,d,e;return x(function(f){c=self.indexedDB.deleteDatabase(a);d=b;(e=d.blocked)&&c.addEventListener("blocked",function(){e()});
return w(f,lj(c),0)})}
;function Fj(a,b){this.name=a;this.options=b;this.l=!0;this.j=!1}
Fj.prototype.i=function(a,b,c){c=void 0===c?{}:c;return Dj(a,b,c)};
Fj.prototype.delete=function(a){a=void 0===a?{}:a;return Ej(this.name,a)};
function Gj(a,b){return new Q("INCOMPATIBLE_DB_VERSION",{dbName:a.name,oldVersion:a.options.version,newVersion:b})}
function Hj(a,b){if(!b)throw cj("openWithToken",Si(a.name));return a.open()}
Fj.prototype.open=function(){function a(){var f,g,h,k,l,n,q,u;return x(function(p){switch(p.h){case 1:return h=null!==(f=Error().stack)&&void 0!==f?f:"",ra(p,2),w(p,c.i(c.name,c.options.version,e),4);case 4:k=p.i;a:{var y=c.options;for(var C=t(Object.keys(y.Da)),F=C.next();!F.done;F=C.next()){F=F.value;var O=y.Da[F],R=void 0===O.Qb?Number.MAX_VALUE:O.Qb;if(k.h.version>=O.Ka&&!(k.h.version>=R)&&!k.h.objectStoreNames.contains(F)){y=F;break a}}y=void 0}l=y;if(void 0===l){p.A(5);break}if(c.j){p.A(6);
break}c.j=!0;return w(p,c.delete(),7);case 7:return Mi(new Q("DB_DELETED_BY_MISSING_OBJECT_STORE",{dbName:c.name,Kb:l})),p.return(a());case 6:throw new Zi(l);case 5:return p.return(k);case 2:n=sa(p);if(n instanceof DOMException?"VersionError"!==n.name:"DOMError"in self&&n instanceof DOMError?"VersionError"!==n.name:!(n instanceof Object&&"message"in n)||"An attempt was made to open a database using a lower version than the existing version."!==n.message){p.A(8);break}return w(p,c.i(c.name,void 0,
Object.assign(Object.assign({},e),{upgrade:void 0})),9);case 9:q=p.i;u=q.h.version;if(void 0!==c.options.version&&u>c.options.version+1)throw q.close(),c.l=!1,Gj(c,u);return p.return(q);case 8:throw b(),n instanceof Error&&!M("ytidb_async_stack_killswitch")&&(n.stack=n.stack+"\n"+h.substring(h.indexOf("\n")+1)),bj(n,c.name,"",null!==(g=c.options.version)&&void 0!==g?g:-1);}})}
function b(){c.h===d&&(c.h=void 0)}
var c=this;if(!this.l)throw Gj(this);if(this.h)return this.h;var d,e={blocking:function(f){f.close()},
closed:b,Zb:b,upgrade:this.options.upgrade};return this.h=d=a()};var Ij=new Fj("YtIdbMeta",{Da:{databases:{Ka:1}},upgrade:function(a,b){b(1)&&pj(a,"databases",{keyPath:"actualName"})}});
function Jj(a,b){var c;return x(function(d){if(1==d.h)return w(d,Hj(Ij,b),2);c=d.i;return d.return(oj(c,["databases"],{M:!0,mode:"readwrite"},function(e){var f=e.objectStore("databases");return f.get(a.actualName).then(function(g){if(g?a.actualName!==g.actualName||a.publicName!==g.publicName||a.userIdentifier!==g.userIdentifier:1)return T(f.h.put(a,void 0)).then(function(){})})}))})}
function Kj(a,b){var c;return x(function(d){if(1==d.h)return a?w(d,Hj(Ij,b),2):d.return();c=d.i;return d.return(c.delete("databases",a))})}
function Lj(a,b){var c,d;return x(function(e){return 1==e.h?(c=[],w(e,Hj(Ij,b),2)):3!=e.h?(d=e.i,w(e,oj(d,["databases"],{M:!0,mode:"readonly"},function(f){c.length=0;return xj(f.objectStore("databases"),{},function(g){a(g.getValue())&&c.push(g.getValue());return g.continue()})}),3)):e.return(c)})}
function Mj(a){return Lj(function(b){return"LogsDatabaseV2"===b.publicName&&void 0!==b.userIdentifier},a)}
;var Nj,Oj=new function(){}(new function(){});
function Pj(){var a,b,c;return x(function(d){switch(d.h){case 1:a=Ji();if(null===a||void 0===a?0:a.hasSucceededOnce)return d.return(!0);var e;if(e=Bh)e=/WebKit\/([0-9]+)/.exec(Tb),e=!!(e&&600<=parseInt(e[1],10));e&&(e=/WebKit\/([0-9]+)/.exec(Tb),e=!(e&&602<=parseInt(e[1],10)));if(e||uc)return d.return(!1);try{if(b=self,!(b.indexedDB&&b.IDBIndex&&b.IDBKeyRange&&b.IDBObjectStore))return d.return(!1)}catch(f){return d.return(!1)}if(!("IDBTransaction"in self&&"objectStoreNames"in IDBTransaction.prototype))return d.return(!1);
ra(d,2);c={actualName:"yt-idb-test-do-not-use",publicName:"yt-idb-test-do-not-use",userIdentifier:void 0};return w(d,Jj(c,Oj),4);case 4:return w(d,Kj("yt-idb-test-do-not-use",Oj),5);case 5:return d.return(!0);case 2:return sa(d),d.return(!1)}})}
function Qj(){if(void 0!==Nj)return Nj;Li=!0;return Nj=Pj().then(function(a){Li=!1;var b,c;null!==(b=Ii())&&void 0!==b&&b.h&&(b=Ji(),b={hasSucceededOnce:(null===b||void 0===b?void 0:b.hasSucceededOnce)||a},null===(c=Ii())||void 0===c?void 0:c.set("LAST_RESULT_ENTRY_KEY",b,2592E3,!0));return a})}
function Rj(){return B("ytglobal.idbToken_")||void 0}
function Sj(){var a=Rj();return a?Promise.resolve(a):Qj().then(function(b){(b=b?Oj:void 0)&&A("ytglobal.idbToken_",b,void 0);return b})}
;new function(){var a=this;this.promise=new Promise(function(b,c){a.resolve=b;a.reject=c})};function Tj(a){if(!Pi())throw a=new Q("AUTH_INVALID",{dbName:a}),Mi(a),a;var b=Qi();return{actualName:a+":"+b,publicName:a,userIdentifier:b}}
function Uj(a,b,c,d){var e,f,g,h,k,l;return x(function(n){switch(n.h){case 1:return f=null!==(e=Error().stack)&&void 0!==e?e:"",w(n,Sj(),2);case 2:g=n.i;if(!g)throw h=cj("openDbImpl",a,b),M("ytidb_async_stack_killswitch")||(h.stack=h.stack+"\n"+f.substring(f.indexOf("\n")+1)),Mi(h),h;Ri(a);k=c?{actualName:a,publicName:a,userIdentifier:void 0}:Tj(a);ra(n,3);return w(n,Jj(k,g),5);case 5:return w(n,Dj(k.actualName,b,d),6);case 6:return n.return(n.i);case 3:return l=sa(n),ra(n,7),w(n,Kj(k.actualName,
g),9);case 9:n.h=8;n.m=0;break;case 7:sa(n);case 8:throw l;}})}
function Vj(a,b,c){c=void 0===c?{}:c;return Uj(a,b,!1,c)}
function Wj(a,b,c){c=void 0===c?{}:c;return Uj(a,b,!0,c)}
function Xj(a,b){b=void 0===b?{}:b;var c,d;return x(function(e){if(1==e.h)return w(e,Sj(),2);if(3!=e.h){c=e.i;if(!c)return e.return();Ri(a);d=Tj(a);return w(e,Ej(d.actualName,b),3)}return w(e,Kj(d.actualName,c),0)})}
function Yj(a,b,c){a=a.map(function(d){return x(function(e){return 1==e.h?w(e,Ej(d.actualName,b),2):w(e,Kj(d.actualName,c),0)})});
return Promise.all(a).then(function(){})}
function Zj(){var a=void 0===a?{}:a;var b,c;return x(function(d){if(1==d.h)return w(d,Sj(),2);if(3!=d.h){b=d.i;if(!b)return d.return();Ri("LogsDatabaseV2");return w(d,Mj(b),3)}c=d.i;return w(d,Yj(c,a,b),0)})}
function ak(a,b){b=void 0===b?{}:b;var c;return x(function(d){if(1==d.h)return w(d,Sj(),2);if(3!=d.h){c=d.i;if(!c)return d.return();Ri(a);return w(d,Ej(a,b),3)}return w(d,Kj(a,c),0)})}
;function bk(a){var b,c,d,e,f,g,h,k;this.h=!1;this.potentialEsfErrorCounter=this.i=0;this.handleError=function(){};
this.na=function(){};
this.now=Date.now;this.qa=!1;this.rb=null!==(b=a.rb)&&void 0!==b?b:100;this.pb=null!==(c=a.pb)&&void 0!==c?c:1;this.nb=null!==(d=a.nb)&&void 0!==d?d:2592E6;this.lb=null!==(e=a.lb)&&void 0!==e?e:12E4;this.ob=null!==(f=a.ob)&&void 0!==f?f:5E3;this.C=null!==(g=a.C)&&void 0!==g?g:void 0;this.Aa=!!a.Aa;this.ya=null!==(h=a.ya)&&void 0!==h?h:.1;this.Fa=null!==(k=a.Fa)&&void 0!==k?k:10;a.handleError&&(this.handleError=a.handleError);a.na&&(this.na=a.na);a.qa&&(this.qa=a.qa);this.G=a.G;this.P=a.P;this.J=a.J;
this.K=a.K;this.W=a.W;this.Ua=a.Ua;this.Ta=a.Ta;this.C&&(!this.G||this.G("networkless_logging"))&&ck(this)}
function ck(a){x(function(b){if(!a.C||a.qa)return b.return();dk(a);a.K.I()&&a.sa();a.K.U(a.Ua,a.sa.bind(a));a.K.U(a.Ta,a.ab.bind(a));a.h=!0;return a.Aa&&Math.random()<=a.ya?w(b,a.J.wb(a.C),0):b.A(0)})}
m=bk.prototype;m.writeThenSend=function(a,b){var c=this;b=void 0===b?{}:b;if(this.C&&this.h){var d={url:a,options:b,timestamp:this.now(),status:"NEW",sendCount:0};this.J.set(d,this.C).then(function(e){d.id=e;c.K.I()&&ek(c,d)}).catch(function(e){ek(c,d);
fk(c,e)})}else this.W(a,b)};
m.sendThenWrite=function(a,b,c){var d=this;b=void 0===b?{}:b;if(this.C&&this.h){var e={url:a,options:b,timestamp:this.now(),status:"NEW",sendCount:0};this.G&&this.G("nwl_skip_retry")&&(e.skipRetry=c);if(this.K.I()){if(!e.skipRetry){var f=b.onError?b.onError:function(){};
b.onError=function(g,h){return x(function(k){if(1==k.h)return w(k,d.J.set(e,d.C).catch(function(l){fk(d,l)}),2);
f(g,h);k.h=0})}}this.W(a,b,e.skipRetry)}else this.J.set(e,this.C).catch(function(g){d.W(a,b,e.skipRetry);
fk(d,g)})}else this.W(a,b,this.G&&this.G("nwl_skip_retry")&&c)};
m.sendAndWrite=function(a,b){var c=this;b=void 0===b?{}:b;if(this.C&&this.h){var d={url:a,options:b,timestamp:this.now(),status:"NEW",sendCount:0},e=!1,f=b.onSuccess?b.onSuccess:function(){};
d.options.onSuccess=function(g,h){void 0!==d.id?c.J.ma(d.id,c.C):e=!0;c.K.ea&&c.G&&c.G("vss_network_hint")&&c.K.ea(!0);f(g,h)};
this.W(d.url,d.options);this.J.set(d,this.C).then(function(g){d.id=g;e&&c.J.ma(d.id,c.C)}).catch(function(g){fk(c,g)})}else this.W(a,b)};
m.sa=function(){var a=this;if(!this.C)throw cj("throttleSend");this.i||(this.i=this.P.L(function(){var b;return x(function(c){if(1==c.h)return w(c,a.J.hb("NEW",a.C),2);if(3!=c.h)return b=c.i,b?w(c,ek(a,b),3):(a.ab(),c.return());a.i&&(a.i=0,a.sa());c.h=0})},this.rb))};
m.ab=function(){this.P.aa(this.i);this.i=0};
function ek(a,b){var c,d;return x(function(e){switch(e.h){case 1:if(!a.C)throw c=cj("immediateSend"),c;if(void 0===b.id){e.A(2);break}return w(e,a.J.Jb(b.id,a.C),3);case 3:(d=e.i)?b=d:a.na(Error("The request cannot be found in the database."));case 2:if(gk(a,b,a.nb)){e.A(4);break}a.na(Error("Networkless Logging: Stored logs request expired age limit"));if(void 0===b.id){e.A(5);break}return w(e,a.J.ma(b.id,a.C),5);case 5:return e.return();case 4:b.skipRetry||(b=hk(a,b));if(!b){e.A(0);break}if(!b.skipRetry||
void 0===b.id){e.A(8);break}return w(e,a.J.ma(b.id,a.C),8);case 8:a.W(b.url,b.options,!!b.skipRetry),e.h=0}})}
function hk(a,b){if(!a.C)throw cj("updateRequestHandlers");var c=b.options.onError?b.options.onError:function(){};
b.options.onError=function(e,f){var g;return x(function(h){switch(h.h){case 1:g=ik(f);if(!(a.G&&a.G("nwl_consider_error_code")&&g||a.G&&!a.G("nwl_consider_error_code")&&a.potentialEsfErrorCounter<=a.Fa)){h.A(2);break}if(!a.K.X){h.A(3);break}return w(h,a.K.X(),3);case 3:if(a.K.I()){h.A(2);break}c(e,f);if(!a.G||!a.G("nwl_consider_error_code")||void 0===(null===b||void 0===b?void 0:b.id)){h.A(6);break}return w(h,a.J.Va(b.id,a.C,!1),6);case 6:return h.return();case 2:if(a.G&&a.G("nwl_consider_error_code")&&
!g&&a.potentialEsfErrorCounter>a.Fa)return h.return();a.potentialEsfErrorCounter++;if(void 0===(null===b||void 0===b?void 0:b.id)){h.A(8);break}return b.sendCount<a.pb?w(h,a.J.Va(b.id,a.C),12):w(h,a.J.ma(b.id,a.C),8);case 12:a.P.L(function(){a.K.I()&&a.sa()},a.ob);
case 8:c(e,f),h.h=0}})};
var d=b.options.onSuccess?b.options.onSuccess:function(){};
b.options.onSuccess=function(e,f){return x(function(g){if(1==g.h)return void 0===(null===b||void 0===b?void 0:b.id)?g.A(2):w(g,a.J.ma(b.id,a.C),2);a.K.ea&&a.G&&a.G("vss_network_hint")&&a.K.ea(!0);d(e,f);g.h=0})};
return b}
function gk(a,b,c){b=b.timestamp;return a.now()-b>=c?!1:!0}
function dk(a){if(!a.C)throw cj("retryQueuedRequests");a.J.hb("QUEUED",a.C).then(function(b){b&&!gk(a,b,a.lb)?a.P.L(function(){return x(function(c){if(1==c.h)return void 0===b.id?c.A(2):w(c,a.J.Va(b.id,a.C),2);dk(a);c.h=0})}):a.K.I()&&a.sa()})}
function fk(a,b){a.sb&&!a.K.I()?a.sb(b):a.handleError(b)}
function ik(a){var b;return(a=null===(b=null===a||void 0===a?void 0:a.error)||void 0===b?void 0:b.code)&&400<=a&&599>=a?!1:!0}
;function jk(a,b){this.version=a;this.args=b}
;function kk(a,b){this.topic=a;this.h=b}
kk.prototype.toString=function(){return this.topic};var lk=B("ytPubsub2Pubsub2Instance")||new K;K.prototype.subscribe=K.prototype.subscribe;K.prototype.unsubscribeByKey=K.prototype.oa;K.prototype.publish=K.prototype.ha;K.prototype.clear=K.prototype.clear;A("ytPubsub2Pubsub2Instance",lk,void 0);var mk=B("ytPubsub2Pubsub2SubscribedKeys")||{};A("ytPubsub2Pubsub2SubscribedKeys",mk,void 0);var nk=B("ytPubsub2Pubsub2TopicToKeys")||{};A("ytPubsub2Pubsub2TopicToKeys",nk,void 0);var ok=B("ytPubsub2Pubsub2IsAsync")||{};A("ytPubsub2Pubsub2IsAsync",ok,void 0);
A("ytPubsub2Pubsub2SkipSubKey",null,void 0);function pk(a,b){var c=qk();c&&c.publish.call(c,a.toString(),a,b)}
function rk(a){var b=sk,c=qk();if(!c)return 0;var d=c.subscribe(b.toString(),function(e,f){var g=B("ytPubsub2Pubsub2SkipSubKey");g&&g==d||(g=function(){if(mk[d])try{if(f&&b instanceof kk&&b!=e)try{var h=b.h,k=f;if(!k.args||!k.version)throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");try{if(!h.ga){var l=new h;h.ga=l.version}var n=h.ga}catch(q){}if(!n||k.version!=n)throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");try{f=Reflect.construct(h,
fb(k.args))}catch(q){throw q.message="yt.pubsub2.Data.deserialize(): "+q.message,q;}}catch(q){throw q.message="yt.pubsub2.pubsub2 cross-binary conversion error for "+b.toString()+": "+q.message,q;}a.call(window,f)}catch(q){rg(q)}},ok[b.toString()]?B("yt.scheduler.instance")?Rg.L(g):N(g,0):g())});
mk[d]=!0;nk[b.toString()]||(nk[b.toString()]=[]);nk[b.toString()].push(d);return d}
function tk(){var a=uk,b=rk(function(c){a.apply(void 0,arguments);vk(b)});
return b}
function vk(a){var b=qk();b&&("number"===typeof a&&(a=[a]),E(a,function(c){b.unsubscribeByKey(c);delete mk[c]}))}
function qk(){return B("ytPubsub2Pubsub2Instance")}
;function wk(a,b){Fj.call(this,a,b);this.options=b;Ri(a)}
v(wk,Fj);function xk(a,b){var c;return function(){c||(c=new wk(a,b));return c}}
wk.prototype.i=function(a,b,c){c=void 0===c?{}:c;return(this.options.Wa?Wj:Vj)(a,b,Object.assign({},c))};
wk.prototype.delete=function(a){a=void 0===a?{}:a;return(this.options.Wa?ak:Xj)(this.name,a)};
function yk(a,b){return xk(a,b)}
;var zk;
function Ak(){if(zk)return zk();var a={};zk=yk("LogsDatabaseV2",{Da:(a.LogsRequestsStore={Ka:2},a),Wa:!1,upgrade:function(b,c,d){c(2)&&pj(b,"LogsRequestsStore",{keyPath:"id",autoIncrement:!0});c(3);c(5)&&(d=d.objectStore("LogsRequestsStore"),d.h.indexNames.contains("newRequest")&&d.h.deleteIndex("newRequest"),d.h.createIndex("newRequestV2",["status","interface","timestamp"],{unique:!1}));c(7)&&b.h.objectStoreNames.contains("sapisid")&&b.h.deleteObjectStore("sapisid");c(9)&&b.h.objectStoreNames.contains("SWHealthLog")&&b.h.deleteObjectStore("SWHealthLog")},
version:9});return zk()}
;function Bk(a){return Hj(Ak(),a)}
function Ck(a,b){var c,d,e,f;return x(function(g){if(1==g.h)return c={startTime:P(),transactionType:"YT_IDB_TRANSACTION_TYPE_WRITE"},w(g,Bk(b),2);if(3!=g.h)return d=g.i,e=Object.assign(Object.assign({},a),{options:JSON.parse(JSON.stringify(a.options)),interface:G("INNERTUBE_CONTEXT_CLIENT_NAME",0)}),w(g,rj(d,e),3);f=g.i;c.ac=P();Dk(c);return g.return(f)})}
function Ek(a,b){var c,d,e,f,g,h,k;return x(function(l){if(1==l.h)return c={startTime:P(),transactionType:"YT_IDB_TRANSACTION_TYPE_READ"},w(l,Bk(b),2);if(3!=l.h)return d=l.i,e=G("INNERTUBE_CONTEXT_CLIENT_NAME",0),f=[a,e,0],g=[a,e,P()],h=IDBKeyRange.bound(f,g),k=void 0,w(l,oj(d,["LogsRequestsStore"],{mode:"readwrite",M:!0},function(n){return Aj(n.objectStore("LogsRequestsStore").index("newRequestV2"),{query:h,direction:"prev"},function(q){q.getValue()&&(k=q.getValue(),"NEW"===a&&(k.status="QUEUED",
q.update(k)))})}),3);
c.ac=P();Dk(c);return l.return(k)})}
function Fk(a,b){var c;return x(function(d){if(1==d.h)return w(d,Bk(b),2);c=d.i;return d.return(oj(c,["LogsRequestsStore"],{mode:"readwrite",M:!0},function(e){var f=e.objectStore("LogsRequestsStore");return f.get(a).then(function(g){if(g)return g.status="QUEUED",T(f.h.put(g,void 0)).then(function(){return g})})}))})}
function Gk(a,b,c){c=void 0===c?!0:c;var d;return x(function(e){if(1==e.h)return w(e,Bk(b),2);d=e.i;return e.return(oj(d,["LogsRequestsStore"],{mode:"readwrite",M:!0},function(f){var g=f.objectStore("LogsRequestsStore");return g.get(a).then(function(h){return h?(h.status="NEW",c&&(h.sendCount+=1),T(g.h.put(h,void 0)).then(function(){return h})):S.resolve(void 0)})}))})}
function Hk(a,b){var c;return x(function(d){if(1==d.h)return w(d,Bk(b),2);c=d.i;return d.return(c.delete("LogsRequestsStore",a))})}
function Ik(a){var b,c;return x(function(d){if(1==d.h)return w(d,Bk(a),2);b=d.i;c=P()-2592E6;return w(d,oj(b,["LogsRequestsStore"],{mode:"readwrite",M:!0},function(e){return xj(e.objectStore("LogsRequestsStore"),{},function(f){if(f.getValue().timestamp<=c)return f.delete().then(function(){return f.continue()})})}),0)})}
function Jk(){return x(function(a){return w(a,Zj(),0)})}
function Dk(a){M("nwl_csi_killswitch")||.01>=Math.random()&&pk("nwl_transaction_latency_payload",a)}
;var Kk={},Lk=yk("ServiceWorkerLogsDatabase",{Da:(Kk.SWHealthLog={Ka:1},Kk),Wa:!0,upgrade:function(a,b){b(1)&&pj(a,"SWHealthLog",{keyPath:"id",autoIncrement:!0}).h.createIndex("swHealthNewRequest",["interface","timestamp"],{unique:!1})},
version:1});function Mk(a){return Hj(Lk(),a)}
function Nk(a){var b,c;return x(function(d){if(1==d.h)return w(d,Mk(a),2);b=d.i;c=P()-2592E6;return w(d,oj(b,["SWHealthLog"],{mode:"readwrite",M:!0},function(e){return xj(e.objectStore("SWHealthLog"),{},function(f){if(f.getValue().timestamp<=c)return f.delete().then(function(){return f.continue()})})}),0)})}
function Ok(a){var b;return x(function(c){if(1==c.h)return w(c,Mk(a),2);b=c.i;return w(c,b.clear("SWHealthLog"),0)})}
;var Pk;function Qk(){Pk||(Pk=new Ci("yt.offline"));return Pk}
function Rk(a){if(M("offline_error_handling")){var b=Qk().get("errors",!0)||{};b[a.message]={name:a.name,stack:a.stack};a.level&&(b[a.message].level=a.level);Qk().set("errors",b,2592E3,!0)}}
function Sk(){if(M("offline_error_handling")){var a=Qk().get("errors",!0);if(a){for(var b in a)if(a[b]){var c=new Oi(b,"sent via offline_errors");c.name=a[b].name;c.stack=a[b].stack;c.level=a[b].level;rg(c)}Qk().set("errors",{},2592E3,!0)}}}
;var Tk=wg("network_polling_interval",3E4);function U(){J.call(this);this.H=0;this.N=this.m=!1;this.l=this.Oa();M("use_shared_nsm")?(Be.h||(Be.h=new Be(Rg)),this.j=Be.h):(Uk(this),Vk(this))}
v(U,J);function Wk(){if(!U.h){var a=B("yt.networkStatusManager.instance")||new U;A("yt.networkStatusManager.instance",a,void 0);U.h=a}return U.h}
m=U.prototype;m.I=function(){var a;return M("use_shared_nsm")&&this.j?null===(a=this.j)||void 0===a?void 0:a.I():this.l};
m.ea=function(a){var b;M("use_shared_nsm")&&this.j?null===(b=this.j)||void 0===b?void 0:b.j=a:a!==this.l&&(this.l=a)};
m.Lb=function(a){!M("use_shared_nsm")&&(this.m=!0,void 0===a?0:a)&&(this.H||Xk(this))};
m.Oa=function(){var a=window.navigator.onLine;return void 0===a?!0:a};
m.yb=function(){this.N=!0};
m.U=function(a,b){return M("use_shared_nsm")&&this.j?this.j.U(a,b):J.prototype.U.call(this,a,b)};
function Vk(a){window.addEventListener("online",function(){return x(function(b){if(1==b.h)return w(b,a.X(),2);a.N&&Sk();b.h=0})})}
function Uk(a){window.addEventListener("offline",function(){return x(function(b){return w(b,a.X(),0)})})}
function Xk(a){a.H=Ng(function(){return x(function(b){if(1==b.h)return a.l?a.Oa()||!a.m?b.A(3):w(b,a.X(),3):w(b,a.X(),3);Xk(a);b.h=0})},Tk)}
m.X=function(a){var b=this;return M("use_shared_nsm")&&this.j?Ce(this.j,a):this.o?this.o:this.o=new Promise(function(c){var d,e,f;return x(function(g){switch(g.h){case 1:return d=window.AbortController?new window.AbortController:void 0,e=null===d||void 0===d?void 0:d.signal,f=!1,ra(g,2,3),d&&(b.B=Rg.L(function(){d.abort()},a||2E4)),w(g,fetch("/generate_204",{method:"HEAD",
signal:e}),5);case 5:f=!0;case 3:ta(g);b.o=void 0;b.B&&Rg.aa(b.B);f!==b.l&&(b.l=f,b.l&&b.m?ze(b,"ytnetworkstatus-online"):b.m&&ze(b,"ytnetworkstatus-offline"));c(f);ua(g);break;case 2:sa(g),f=!1,g.A(3)}})})};
U.prototype.sendNetworkCheckRequest=U.prototype.X;U.prototype.listen=U.prototype.U;U.prototype.enableErrorFlushing=U.prototype.yb;U.prototype.getWindowStatus=U.prototype.Oa;U.prototype.monitorNetworkStatusChange=U.prototype.Lb;U.prototype.networkStatusHint=U.prototype.ea;U.prototype.isNetworkAvailable=U.prototype.I;U.getInstance=Wk;function Yk(a){a=void 0===a?{}:a;J.call(this);var b=this;this.l=this.H=0;this.m="ytnetworkstatus-offline";this.o="ytnetworkstatus-online";M("use_shared_nsm")&&(this.m="networkstatus-offline",this.o="networkstatus-online");this.j=Wk();var c=B("yt.networkStatusManager.instance.monitorNetworkStatusChange").bind(this.j);c&&c(a.fb);a.Ca&&!M("use_shared_nsm")&&(c=B("yt.networkStatusManager.instance.enableErrorFlushing").bind(this.j))&&c();if(c=B("yt.networkStatusManager.instance.listen").bind(this.j))a.Ga?
(this.Ga=a.Ga,c(this.o,function(){Zk(b,"publicytnetworkstatus-online");M("use_shared_nsm")&&a.Ca&&Sk()}),c(this.m,function(){Zk(b,"publicytnetworkstatus-offline")})):(c(this.o,function(){ze(b,"publicytnetworkstatus-online");
M("use_shared_nsm")&&a.Ca&&Sk()}),c(this.m,function(){ze(b,"publicytnetworkstatus-offline")}))}
v(Yk,J);Yk.prototype.I=function(){var a=B("yt.networkStatusManager.instance.isNetworkAvailable").bind(this.j);return a?a():!0};
Yk.prototype.ea=function(a){var b=B("yt.networkStatusManager.instance.networkStatusHint").bind(this.j);b&&b(a)};
Yk.prototype.X=function(a){var b=this,c;return x(function(d){return(c=B("yt.networkStatusManager.instance.sendNetworkCheckRequest").bind(b.j))?d.return(c(a)):d.return(!0)})};
function Zk(a,b){a.Ga?a.l?(Rg.aa(a.H),a.H=Rg.L(function(){a.B!==b&&(ze(a,b),a.B=b,a.l=P())},a.Ga-(P()-a.l))):(ze(a,b),a.B=b,a.l=P()):ze(a,b)}
;var $k=!1,al=0,bl=0,cl,dl=z.ytNetworklessLoggingInitializationOptions||{isNwlInitialized:$k,potentialEsfErrorCounter:bl};A("ytNetworklessLoggingInitializationOptions",dl,void 0);
function el(){var a;x(function(b){switch(b.h){case 1:return w(b,Sj(),2);case 2:a=b.i;if(!a||!Pi()&&!M("nwl_init_require_datasync_id_killswitch")){b.A(0);break}$k=!0;dl.isNwlInitialized=$k;return w(b,ak("LogsDatabaseV2"),4);case 4:if(!(.1>=Math.random())){b.A(5);break}return w(b,Ik(a),6);case 6:return w(b,Nk(a),5);case 5:fl();gl().I()&&hl();gl().U("publicytnetworkstatus-online",hl);gl().U("publicytnetworkstatus-offline",il);if(!M("networkless_immediately_drop_sw_health_store")){b.A(8);break}return w(b,
jl(),8);case 8:if(M("networkless_immediately_drop_all_requests"))return w(b,Jk(),0);b.A(0)}})}
function kl(a,b){function c(d){var e=gl().I();if(!ll()||!d||e&&M("vss_networkless_bypass_write"))ml(a,b);else{var f={url:a,options:b,timestamp:P(),status:"NEW",sendCount:0};Ck(f,d).then(function(g){f.id=g;gl().I()&&nl(f)}).catch(function(g){nl(f);
gl().I()?rg(g):Rk(g)})}}
b=void 0===b?{}:b;M("skip_is_supported_killswitch")?Sj().then(function(d){c(d)}):c(Rj())}
function ol(a,b){function c(d){if(ll()&&d){var e={url:a,options:b,timestamp:P(),status:"NEW",sendCount:0},f=!1,g=b.onSuccess?b.onSuccess:function(){};
e.options.onSuccess=function(h,k){void 0!==e.id?Hk(e.id,d):f=!0;M("vss_network_hint")&&gl().ea(!0);g(h,k)};
ml(e.url,e.options);Ck(e,d).then(function(h){e.id=h;f&&Hk(e.id,d)}).catch(function(h){gl().I()?rg(h):Rk(h)})}else ml(a,b)}
b=void 0===b?{}:b;M("skip_is_supported_killswitch")?Sj().then(function(d){c(d)}):c(Rj())}
function hl(){var a=Rj();if(!a)throw cj("throttleSend");al||(al=Rg.L(function(){var b;return x(function(c){if(1==c.h)return w(c,Ek("NEW",a),2);if(3!=c.h)return b=c.i,b?w(c,nl(b),3):(il(),c.return());al&&(al=0,hl());c.h=0})},100))}
function il(){Rg.aa(al);al=0}
function nl(a){var b,c,d;return x(function(e){switch(e.h){case 1:b=Rj();if(!b)throw c=cj("immediateSend"),c;if(void 0===a.id){e.A(2);break}return w(e,Fk(a.id,b),3);case 3:(d=e.i)?a=d:sg(Error("The request cannot be found in the database."));case 2:if(pl(a,2592E6)){e.A(4);break}sg(Error("Networkless Logging: Stored logs request expired age limit"));if(void 0===a.id){e.A(5);break}return w(e,Hk(a.id,b),5);case 5:return e.return();case 4:a.skipRetry||(a=ql(a));var f=a,g,h;if(null===(h=null===(g=null===
f||void 0===f?void 0:f.options)||void 0===g?void 0:g.postParams)||void 0===h?0:h.requestTimeMs)f.options.postParams.requestTimeMs=Math.round(P());a=f;if(!a){e.A(0);break}if(!a.skipRetry||void 0===a.id){e.A(8);break}return w(e,Hk(a.id,b),8);case 8:ml(a.url,a.options,!!a.skipRetry),e.h=0}})}
function ql(a){var b=Rj();if(!b)throw cj("updateRequestHandlers");var c=a.options.onError?a.options.onError:function(){};
a.options.onError=function(e,f){var g;return x(function(h){switch(h.h){case 1:g=ik(f);if(!(M("nwl_consider_error_code")&&g||!M("nwl_consider_error_code")&&rl()<=wg("potential_esf_error_limit",10))){h.A(2);break}return w(h,gl().X(),3);case 3:if(gl().I()){h.A(2);break}c(e,f);if(!M("nwl_consider_error_code")||void 0===(null===a||void 0===a?void 0:a.id)){h.A(5);break}return w(h,Gk(a.id,b,!1),5);case 5:return h.return();case 2:if(M("nwl_consider_error_code")&&!g&&rl()>wg("potential_esf_error_limit",10))return h.return();
B("ytNetworklessLoggingInitializationOptions")&&dl.potentialEsfErrorCounter++;bl++;if(void 0===(null===a||void 0===a?void 0:a.id)){h.A(7);break}return 1>a.sendCount?w(h,Gk(a.id,b),11):w(h,Hk(a.id,b),7);case 11:Rg.L(function(){gl().I()&&hl()},5E3);
case 7:c(e,f),h.h=0}})};
var d=a.options.onSuccess?a.options.onSuccess:function(){};
a.options.onSuccess=function(e,f){return x(function(g){if(1==g.h)return void 0===(null===a||void 0===a?void 0:a.id)?g.A(2):w(g,Hk(a.id,b),2);M("vss_network_hint")&&gl().ea(!0);d(e,f);g.h=0})};
return a}
function pl(a,b){a=a.timestamp;return P()-a>=b?!1:!0}
function fl(){var a=Rj();if(!a)throw cj("retryQueuedRequests");Ek("QUEUED",a).then(function(b){b&&!pl(b,12E4)?Rg.L(function(){return x(function(c){if(1==c.h)return void 0===b.id?c.A(2):w(c,Gk(b.id,a),2);fl();c.h=0})}):gl().I()&&hl()})}
function jl(){var a,b;return x(function(c){a=Rj();if(!a)throw b=cj("clearSWHealthLogsDb"),b;return c.return(Ok(a).catch(function(d){rg(d)}))})}
function gl(){cl||(cl=new Yk({Ca:!0,fb:!0}));return cl}
function ml(a,b,c){c&&0===Object.keys(b).length?Fh(a):th(a,b)}
function ll(){return B("ytNetworklessLoggingInitializationOptions")?dl.isNwlInitialized:$k}
function rl(){return B("ytNetworklessLoggingInitializationOptions")?dl.potentialEsfErrorCounter:bl}
;function sl(){bk.call(this,{J:{wb:Ik,ma:Hk,hb:Ek,Jb:Fk,Va:Gk,set:Ck},K:new Yk({Ca:!0,fb:!0}),handleError:rg,na:sg,W:tl,now:P,sb:Rk,P:Qg(),Ua:"publicytnetworkstatus-online",Ta:"publicytnetworkstatus-offline",Aa:!0,ya:.1,Fa:wg("potential_esf_error_limit",10),G:M,qa:!Pi()});this.Aa&&Math.random()<=this.ya&&this.C&&Nk(this.C);M("networkless_immediately_drop_sw_health_store")&&ul(this);M("networkless_immediately_drop_all_requests")&&Jk();ak("LogsDatabaseV2")}
v(sl,bk);function vl(){var a=B("yt.networklessRequestController.instance");a||(a=new sl,A("yt.networklessRequestController.instance",a,void 0),M("networkless_logging")&&Sj().then(function(b){a.C=b;ck(a)}));
return a}
sl.prototype.writeThenSend=function(a,b){b||(b={});Pi()||(this.h=!1);bk.prototype.writeThenSend.call(this,a,b)};
sl.prototype.sendThenWrite=function(a,b,c){b||(b={});Pi()||(this.h=!1);bk.prototype.sendThenWrite.call(this,a,b,c)};
sl.prototype.sendAndWrite=function(a,b){b||(b={});Pi()||(this.h=!1);bk.prototype.sendAndWrite.call(this,a,b)};
function ul(a){var b;x(function(c){if(!a.C)throw b=cj("clearSWHealthLogsDb"),b;return c.return(Ok(a.C).catch(function(d){a.handleError(d)}))})}
function tl(a,b,c){var d;if(null===(d=b.postParams)||void 0===d?0:d.requestTimeMs)b.postParams.requestTimeMs=Math.round(P());c&&0===Object.keys(b).length?Fh(a):th(a,b)}
;function wl(a){var b=this;this.config_=null;a?this.config_=a:zi()&&(this.config_=ji());Ng(function(){Hi(b)},5E3)}
wl.prototype.isReady=function(){!this.config_&&zi()&&(this.config_=ji());return!!this.config_};
function mi(a,b,c,d){function e(y){y=void 0===y?!1:y;var C;if(d.retry&&"www.youtube-nocookie.com"!=h&&(y||M("skip_ls_gel_retry")||(C=Fi(b,c,l,k)),C)){var F=g.onSuccess,O=g.onFetchSuccess;g.onSuccess=function(R,Aa){Gi(C);F(R,Aa)};
c.onFetchSuccess=function(R,Aa){Gi(C);O(R,Aa)}}try{y&&d.retry&&!d.kb.bypassNetworkless?(g.method="POST",d.kb.writeThenSend?M("use_new_nwl")?vl().writeThenSend(p,g):kl(p,g):M("use_new_nwl")?vl().sendAndWrite(p,g):ol(p,g)):(g.method="POST",g.postParams||(g.postParams={}),th(p,g))}catch(R){if("InvalidAccessError"==R.name)C&&(Gi(C),C=0),sg(Error("An extension is blocking network request."));
else throw R;}C&&Ng(function(){Hi(a)},5E3)}
!G("VISITOR_DATA")&&"visitor_id"!==b&&.01>Math.random()&&sg(new Oi("Missing VISITOR_DATA when sending innertube request.",b,c,d));if(!a.isReady()){var f=new Oi("innertube xhrclient not ready",b,c,d);rg(f);throw f;}var g={headers:{"Content-Type":"application/json"},method:"POST",postParams:c,postBodyFormat:"JSON",onTimeout:function(){d.onTimeout()},
onFetchTimeout:d.onTimeout,onSuccess:function(y,C){if(d.onSuccess)d.onSuccess(C)},
onFetchSuccess:function(y){if(d.onSuccess)d.onSuccess(y)},
onError:function(y,C){if(d.onError)d.onError(C)},
onFetchError:function(y){if(d.onError)d.onError(y)},
timeout:d.timeout,withCredentials:!0},h="";(f=a.config_.Gb)&&(h=f);var k=a.config_.Ib||!1,l=Ai(k,h,d);Object.assign(g.headers,l);(f=g.headers.Authorization)&&!h&&(g.headers["x-origin"]=window.location.origin);var n="/youtubei/"+a.config_.innertubeApiVersion+"/"+b,q={alt:"json"},u=a.config_.Hb&&f;M("omit_innertube_api_key_for_bearer_auth_header")&&(u=u&&f.startsWith("Bearer"));u||(q.key=a.config_.innertubeApiKey);var p=hh(""+h+n,q||{},!0);M("use_new_nwl")||ll()?Qj().then(function(y){e(y)}):e(!1)}
;function V(a,b,c){c=void 0===c?{}:c;var d=wl;G("ytLoggingEventsDefaultDisabled",!1)&&wl==wl&&(d=null);oi(a,b,d,c)}
;var xl=[{Sa:function(a){return"Cannot read property '"+a.key+"'"},
Ea:{Error:[{regexp:/(Permission denied) to access property "([^']+)"/,groups:["reason","key"]}],TypeError:[{regexp:/Cannot read property '([^']+)' of (null|undefined)/,groups:["key","value"]},{regexp:/\u65e0\u6cd5\u83b7\u53d6\u672a\u5b9a\u4e49\u6216 (null|undefined) \u5f15\u7528\u7684\u5c5e\u6027\u201c([^\u201d]+)\u201d/,groups:["value","key"]},{regexp:/\uc815\uc758\ub418\uc9c0 \uc54a\uc74c \ub610\ub294 (null|undefined) \ucc38\uc870\uc778 '([^']+)' \uc18d\uc131\uc744 \uac00\uc838\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4./,
groups:["value","key"]},{regexp:/No se puede obtener la propiedad '([^']+)' de referencia nula o sin definir/,groups:["key"]},{regexp:/Unable to get property '([^']+)' of (undefined or null) reference/,groups:["key","value"]},{regexp:/(null) is not an object \(evaluating '(?:([^.]+)\.)?([^']+)'\)/,groups:["value","base","key"]}]}},{Sa:function(a){return"Cannot call '"+a.key+"'"},
Ea:{TypeError:[{regexp:/(?:([^ ]+)?\.)?([^ ]+) is not a function/,groups:["base","key"]},{regexp:/([^ ]+) called on (null or undefined)/,groups:["key","value"]},{regexp:/Object (.*) has no method '([^ ]+)'/,groups:["base","key"]},{regexp:/Object doesn't support property or method '([^ ]+)'/,groups:["key"]},{regexp:/\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306f '([^']+)' \u30d7\u30ed\u30d1\u30c6\u30a3\u307e\u305f\u306f\u30e1\u30bd\u30c3\u30c9\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093/,
groups:["key"]},{regexp:/\uac1c\uccb4\uac00 '([^']+)' \uc18d\uc131\uc774\ub098 \uba54\uc11c\ub4dc\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4./,groups:["key"]}]}},{Sa:function(a){return a.key+" is not defined"},
Ea:{ReferenceError:[{regexp:/(.*) is not defined/,groups:["key"]},{regexp:/Can't find variable: (.*)/,groups:["key"]}]}}];var zl={da:[],Z:[{Za:yl,weight:500}]};function yl(a){if("JavaException"===a.name)return!0;a=a.stack;return a.includes("chrome://")||a.includes("chrome-extension://")||a.includes("moz-extension://")}
;function Al(){this.Z=[];this.da=[]}
var Bl;function Cl(){if(!Bl){var a=Bl=new Al;a.da.length=0;a.Z.length=0;zl.da&&a.da.push.apply(a.da,zl.da);zl.Z&&a.Z.push.apply(a.Z,zl.Z)}return Bl}
;var Dl=new K;function El(a){function b(){return a.charCodeAt(d++)}
var c=a.length,d=0;do{var e=Fl(b);if(Infinity===e)break;var f=e>>3;switch(e&7){case 0:e=Fl(b);if(2===f)return e;break;case 1:if(2===f)return;d+=8;break;case 2:e=Fl(b);if(2===f)return a.substr(d,e);d+=e;break;case 5:if(2===f)return;d+=4;break;default:return}}while(d<c)}
function Fl(a){var b=a(),c=b&127;if(128>b)return c;b=a();c|=(b&127)<<7;if(128>b)return c;b=a();c|=(b&127)<<14;if(128>b)return c;b=a();return 128>b?c|(b&127)<<21:Infinity}
;function Gl(a,b,c,d){if(a)if(Array.isArray(a)){var e=d;for(d=0;d<a.length&&!(a[d]&&(e+=Hl(d,a[d],b,c),500<e));d++);d=e}else if("object"===typeof a)for(e in a){if(a[e]){var f=a[e];var g=b;var h=c;g="string"!==typeof f||"clickTrackingParams"!==e&&"trackingParams"!==e?0:(f=El(atob(f.replace(/-/g,"+").replace(/_/g,"/"))))?Hl(e+".ve",f,g,h):0;d+=g;d+=Hl(e,a[e],b,c);if(500<d)break}}else c[b]=Il(a),d+=c[b].length;else c[b]=Il(a),d+=c[b].length;return d}
function Hl(a,b,c,d){c+="."+a;a=Il(b);d[c]=a;return c.length+a.length}
function Il(a){try{return("string"===typeof a?a:String(JSON.stringify(a))).substr(0,500)}catch(b){return"unable to serialize "+typeof a+" ("+b.message+")"}}
;var Jl=new Set,Kl=0,Ll=0,Ml=0,Nl=[],Ol=["PhantomJS","Googlebot","TO STOP THIS SECURITY SCAN go/scan"];function Pl(a){Ql(a,"WARNING")}
function Ql(a,b,c,d,e,f){f=void 0===f?{}:f;f.name=c||G("INNERTUBE_CONTEXT_CLIENT_NAME",1);f.version=d||G("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0);c=f||{};b=void 0===b?"ERROR":b;b=void 0===b?"ERROR":b;if(a&&(a.hasOwnProperty("level")&&a.level&&(b=a.level),M("console_log_js_exceptions")&&(d=[],d.push("Name: "+a.name),d.push("Message: "+a.message),a.hasOwnProperty("params")&&d.push("Error Params: "+JSON.stringify(a.params)),a.hasOwnProperty("args")&&d.push("Error args: "+JSON.stringify(a.args)),d.push("File name: "+
a.fileName),d.push("Stacktrace: "+a.stack),window.console.log(d.join("\n"),a)),!(5<=Kl))){var g=Yd(a);d=g.message||"Unknown Error";e=g.name||"UnknownError";var h=g.stack||a.i||"Not available";h.startsWith(e+": "+d)&&(f=h.split("\n"),f.shift(),h=f.join("\n"));f=g.lineNumber||"Not available";g=g.fileName||"Not available";var k=0;if(a.hasOwnProperty("args")&&a.args&&a.args.length)for(var l=0;l<a.args.length&&!(k=Gl(a.args[l],"params."+l,c,k),500<=k);l++);else if(a.hasOwnProperty("params")&&a.params){var n=
a.params;if("object"===typeof a.params)for(l in n){if(n[l]){var q="params."+l,u=Il(n[l]);c[q]=u;k+=q.length+u.length;if(500<k)break}}else c.params=Il(n)}if(Nl.length)for(l=0;l<Nl.length&&!(k=Gl(Nl[l],"params.context."+l,c,k),500<=k);l++);navigator.vendor&&!c.hasOwnProperty("vendor")&&(c["device.vendor"]=navigator.vendor);l={message:d,name:e,lineNumber:f,fileName:g,stack:h,params:c,sampleWeight:1};c=Number(a.columnNumber);isNaN(c)||(l.lineNumber=l.lineNumber+":"+c);if("IGNORED"===a.level)a=0;else a:{a=
Cl();c=t(a.da);for(d=c.next();!d.done;d=c.next())if(d=d.value,l.message&&l.message.match(d.Wm)){a=d.weight;break a}a=t(a.Z);for(c=a.next();!c.done;c=a.next())if(c=c.value,c.Za(l)){a=c.weight;break a}a=1}l.sampleWeight=a;a=t(xl);for(c=a.next();!c.done;c=a.next())if(c=c.value,c.Ea[l.name])for(e=t(c.Ea[l.name]),d=e.next();!d.done;d=e.next())if(f=d.value,d=l.message.match(f.regexp)){l.params["params.error.original"]=d[0];e=f.groups;f={};for(g=0;g<e.length;g++)f[e[g]]=d[g+1],l.params["params.error."+e[g]]=
d[g+1];l.message=c.Sa(f);break}l.params||(l.params={});a=Cl();l.params["params.errorServiceSignature"]="msg="+a.da.length+"&cb="+a.Z.length;l.params["params.serviceWorker"]="false";z.document&&z.document.querySelectorAll&&(l.params["params.fscripts"]=String(document.querySelectorAll("script:not([nonce])").length));wb("sample").constructor!==ub&&(l.params["params.fconst"]="true");window.yterr&&"function"===typeof window.yterr&&window.yterr(l);if(0!==l.sampleWeight&&!Jl.has(l.message)){"ERROR"===b?
(Dl.ha("handleError",l),M("record_app_crashed_web")&&0===Ml&&1===l.sampleWeight&&(Ml++,V("appCrashed",{appCrashType:"APP_CRASH_TYPE_BREAKPAD"})),Ll++):"WARNING"===b&&Dl.ha("handleWarning",l);if(M("kevlar_gel_error_routing")){a=b;b:{c=t(Ol);for(d=c.next();!d.done;d=c.next())if(Ch(d.value.toLowerCase())){c=!0;break b}c=!1}if(c)c=void 0;else{d={stackTrace:l.stack};l.fileName&&(d.filename=l.fileName);c=l.lineNumber&&l.lineNumber.split?l.lineNumber.split(":"):[];0!==c.length&&(1!==c.length||isNaN(Number(c[0]))?
2!==c.length||isNaN(Number(c[0]))||isNaN(Number(c[1]))||(d.lineNumber=Number(c[0]),d.columnNumber=Number(c[1])):d.lineNumber=Number(c[0]));c={level:"ERROR_LEVEL_UNKNOWN",message:l.message,errorClassName:l.name,sampleWeight:l.sampleWeight};"ERROR"===a?c.level="ERROR_LEVEL_ERROR":"WARNING"===a&&(c.level="ERROR_LEVEL_WARNNING");d={isObfuscated:!0,browserStackInfo:d};e={pageUrl:window.location.href,kvPairs:[]};G("FEXP_EXPERIMENTS")&&(e.experimentIds=G("FEXP_EXPERIMENTS"));f=G("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS",
void 0);g=mg.EXPERIMENT_FLAGS;if((!g||!g.web_disable_gel_stp_ecatcher_killswitch)&&f)for(h=t(Object.keys(f)),g=h.next();!g.done;g=h.next())g=g.value,e.kvPairs.push({key:g,value:String(f[g])});if(f=l.params)for(h=t(Object.keys(f)),g=h.next();!g.done;g=h.next())g=g.value,e.kvPairs.push({key:"client."+g,value:String(f[g])});f=G("SERVER_NAME",void 0);g=G("SERVER_VERSION",void 0);f&&g&&(e.kvPairs.push({key:"server.name",value:f}),e.kvPairs.push({key:"server.version",value:g}));c={errorMetadata:e,stackTrace:d,
logMessage:c}}c&&(V("clientError",c),("ERROR"===a||M("errors_flush_gel_always_killswitch"))&&ei())}if(!M("suppress_error_204_logging")){a=l.params||{};b={urlParams:{a:"logerror",t:"jserror",type:l.name,msg:l.message.substr(0,250),line:l.lineNumber,level:b,"client.name":a.name},postParams:{url:G("PAGE_NAME",window.location.href),file:l.fileName},method:"POST"};a.version&&(b["client.version"]=a.version);if(b.postParams){l.stack&&(b.postParams.stack=l.stack);c=t(Object.keys(a));for(d=c.next();!d.done;d=
c.next())d=d.value,b.postParams["client."+d]=a[d];if(a=G("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS",void 0))for(c=t(Object.keys(a)),d=c.next();!d.done;d=c.next())d=d.value,b.postParams[d]=a[d];a=G("SERVER_NAME",void 0);c=G("SERVER_VERSION",void 0);a&&c&&(b.postParams["server.name"]=a,b.postParams["server.version"]=c)}th(G("ECATCHER_REPORT_HOST","")+"/error_204",b)}try{Jl.add(l.message)}catch(p){}Kl++}}}
function Rl(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];a.args||(a.args=[]);a.args.push.apply(a.args,fa(c))}
;var Sl={Oc:3611,cc:27686,dc:85013,ec:23462,hc:42016,ic:62407,jc:26926,fc:43781,kc:51236,lc:79148,mc:50160,nc:77504,Bc:87907,Cc:18630,Dc:54445,Ec:80935,Fc:105675,Gc:37521,Hc:47786,Ic:98349,Jc:123695,Kc:6827,Lc:29434,Mc:7282,Nc:124448,Rc:32276,Qc:76278,Sc:93911,Tc:106531,Uc:27259,Vc:27262,Wc:27263,Yc:21759,Zc:27107,bd:62936,cd:49568,dd:38408,ed:80637,fd:68727,gd:68728,hd:80353,jd:80356,kd:74610,ld:45707,md:83962,nd:83970,od:46713,pd:89711,qd:74612,rd:93265,sd:74611,td:131380,vd:128979,wd:139311,xd:128978,
ud:131391,yd:105350,Ad:139312,Bd:134800,zd:131392,Dd:113533,Ed:93252,Fd:99357,Hd:94521,Id:114252,Jd:113532,Kd:94522,Gd:94583,Ld:88E3,Md:93253,Nd:93254,Od:94387,Pd:94388,Qd:93255,Rd:97424,Cd:72502,Sd:110111,Td:76019,Vd:117092,Wd:117093,Ud:89431,Xd:110466,Yd:77240,Zd:60508,ae:137401,be:137402,ce:137046,de:73393,ee:113534,ge:92098,he:131381,ie:84517,je:83759,ke:80357,le:86113,me:72598,ne:72733,oe:107349,pe:124275,qe:118203,re:133275,se:133274,te:133272,ue:133273,we:133276,ye:117431,xe:133797,ze:128572,
Ae:133405,Be:117429,Ce:117430,De:117432,Ee:120080,Fe:117259,Ge:121692,He:132972,Ie:133051,Je:133658,Ke:132971,Le:97615,Me:31402,Oe:133624,Pe:133623,Qe:133622,Ne:133621,Re:84774,Se:95117,Te:98930,Ue:98931,Ve:98932,We:43347,Xe:129889,Ye:45474,Ze:100352,af:84758,bf:98443,cf:117985,df:74613,ef:74614,ff:64502,gf:136032,hf:74615,jf:74616,kf:122224,lf:74617,mf:77820,nf:74618,pf:93278,qf:93274,rf:93275,sf:93276,tf:22110,uf:29433,vf:133798,wf:132295,yf:120541,Af:82047,Bf:113550,Cf:75836,Df:75837,Ef:42352,
Ff:84512,Gf:76065,Hf:75989,If:16623,Jf:32594,Kf:27240,Lf:32633,Mf:74858,Of:3945,Nf:16989,Pf:45520,Qf:25488,Rf:25492,Sf:25494,Tf:55760,Uf:14057,Vf:18451,Wf:57204,Xf:57203,Yf:17897,Zf:57205,ag:18198,cg:17898,dg:17909,eg:43980,fg:46220,gg:11721,hg:49954,ig:96369,jg:3854,kg:56251,lg:25624,mg:16906,ng:99999,og:68172,pg:27068,qg:47973,rg:72773,sg:26970,tg:26971,ug:96805,vg:17752,wg:73233,xg:109512,yg:22256,zg:14115,Ag:22696,Bg:89278,Cg:89277,Dg:109513,Eg:43278,Fg:43459,Gg:43464,Hg:89279,Ig:43717,Jg:55764,
Kg:22255,Lg:89281,Mg:40963,Ng:43277,Og:43442,Pg:91824,Qg:120137,Rg:96367,Sg:36850,Tg:72694,Ug:37414,Vg:36851,Xg:124863,Wg:121343,Yg:73491,Zg:54473,ah:43375,bh:46674,dh:139095,eh:32473,fh:72901,gh:72906,hh:50947,ih:50612,jh:50613,kh:50942,lh:84938,mh:84943,nh:84939,oh:84941,ph:84944,qh:84940,rh:84942,sh:35585,th:51926,uh:79983,vh:63238,wh:18921,xh:63241,yh:57893,zh:41182,Ah:135732,Bh:33424,Ch:22207,Dh:42993,Eh:36229,Fh:22206,Gh:22205,Hh:18993,Ih:19001,Jh:18990,Kh:18991,Lh:18997,Mh:18725,Nh:19003,Oh:36874,
Ph:44763,Qh:33427,Rh:67793,Sh:22182,Th:37091,Uh:34650,Vh:50617,Wh:47261,Xh:22287,Yh:25144,Zh:97917,ai:62397,bi:125598,ci:137935,di:36961,fi:108035,gi:27426,hi:27857,ii:27846,ji:27854,ki:69692,li:61411,mi:39299,ni:38696,oi:62520,ri:36382,si:108701,ti:50663,vi:36387,wi:14908,xi:37533,yi:105443,zi:61635,Ai:62274,Bi:133818,Ci:65702,Di:65703,Ei:65701,Fi:76256,Gi:37671,Hi:49953,Ji:36216,Ki:28237,Li:39553,Mi:29222,Ni:26107,Oi:38050,Pi:26108,Ri:120745,Qi:26109,Si:26110,Ti:66881,Ui:28236,Vi:14586,Wi:57929,
Xi:74723,Yi:44098,Zi:44099,cj:23528,dj:61699,aj:134104,bj:134103,ej:59149,fj:101951,gj:97346,hj:118051,ij:95102,jj:64882,kj:119505,lj:63595,mj:63349,nj:95101,oj:75240,pj:27039,qj:68823,rj:21537,sj:83464,tj:75707,uj:83113,vj:101952,wj:101953,yj:79610,zj:125755,Aj:24402,Bj:24400,Cj:32925,Dj:57173,Ej:122502,Fj:138480,Gj:64423,Hj:64424,Ij:33986,Jj:100828,Kj:129089,Lj:21409,Pj:135155,Qj:135156,Rj:135157,Sj:135158,Tj:135159,Uj:135160,Vj:135161,Wj:135162,Xj:135163,Yj:135164,Zj:135165,ak:135166,Mj:11070,
Nj:11074,Oj:17880,bk:14001,dk:30709,ek:30707,fk:30711,gk:30710,hk:30708,ck:26984,ik:63648,jk:63649,kk:51879,lk:111059,mk:5754,nk:20445,qk:130975,pk:130976,rk:110386,sk:113746,tk:66557,vk:17310,wk:28631,xk:21589,yk:68012,zk:60480,Ak:138664,Bk:31571,Ck:76980,Dk:41577,Ek:45469,Fk:38669,Gk:13768,Hk:13777,Ik:62985,Jk:4724,Kk:59369,Lk:43927,Mk:43928,Nk:12924,Ok:100355,Rk:56219,Sk:27669,Tk:10337,Qk:47896,Uk:122629,Vk:121258,Wk:107598,Xk:127991,Yk:96639,Zk:107536,al:130169,bl:96661,dl:96658,fl:116646,il:121122,
jl:96660,kl:127738,ll:127083,ml:104443,nl:96659,ol:106442,pl:134840,ql:63667,rl:63668,sl:63669,ul:130686,vl:78314,wl:55761,xl:127098,yl:134841,zl:96368,Al:67374,Bl:48992,Cl:49956,Dl:31961,El:26388,Fl:23811,Gl:5E4,Hl:126250,Il:96370,Jl:47355,Kl:47356,Ll:37935,Ml:45521,Nl:21760,Ol:83769,Pl:49977,Ql:49974,Rl:93497,Sl:93498,Tl:34325,Ul:115803,Vl:123707,Wl:100081,Xl:35309,Yl:68314,Zl:25602,am:100339,bm:59018,cm:18248,dm:50625,em:9729,fm:37168,gm:37169,hm:21667,im:16749,jm:18635,km:39305,lm:18046,mm:53969,
nm:8213,om:93926,pm:102852,qm:110099,rm:22678,sm:69076,tm:137575,vm:139224,wm:100856,xm:17736,ym:3832,zm:55759,Am:64031,Bm:93044,Cm:93045,Dm:34388,Em:17657,Fm:17655,Gm:39579,Hm:39578,Im:77448,Jm:8196,Km:11357,Lm:69877,Mm:8197,Nm:82039};function Tl(){var a=ob(Ul),b;return Ff(new yf(function(c,d){a.onSuccess=function(e){nh(e)?c(new Vl(e)):d(new Wl("Request failed, status="+(e&&"status"in e?e.status:-1),"net.badstatus",e))};
a.onError=function(e){d(new Wl("Unknown request error","net.unknown",e))};
a.onTimeout=function(e){d(new Wl("Request timed out","net.timeout",e))};
b=th("//googleads.g.doubleclick.net/pagead/id",a)}),function(c){c instanceof Gf&&b.abort();
return Df(c)})}
function Wl(a,b,c){Xa.call(this,a+", errorCode="+b);this.errorCode=b;this.xhr=c;this.name="PromiseAjaxError"}
v(Wl,Xa);function Vl(a){this.xhr=a}
;function Xl(){this.i=0;this.h=null}
Xl.prototype.then=function(a,b,c){return 1===this.i&&a?(a=a.call(c,this.h),xf(a)?a:Yl(a)):2===this.i&&b?(a=b.call(c,this.h),xf(a)?a:Zl(a)):this};
Xl.prototype.getValue=function(){return this.h};
Xl.prototype.$goog_Thenable=!0;function Zl(a){var b=new Xl;a=void 0===a?null:a;b.i=2;b.h=void 0===a?null:a;return b}
function Yl(a){var b=new Xl;a=void 0===a?null:a;b.i=1;b.h=void 0===a?null:a;return b}
;function $l(){if(Rd())return!0;var a=G("INNERTUBE_CLIENT_NAME");return!a||"WEB"!==a&&"MWEB"!==a||Bh&&Ch("applewebkit")&&!Ch("version")&&(!Ch("safari")||Ch("gsa/"))||xc&&Ch("version/")?!0:(a=Pd.get("CONSENT",void 0))?a.startsWith("YES+"):!0}
;function am(a){Xa.call(this,a.message||a.description||a.name);this.isMissing=a instanceof bm;this.isTimeout=a instanceof Wl&&"net.timeout"==a.errorCode;this.isCanceled=a instanceof Gf}
v(am,Xa);am.prototype.name="BiscottiError";function bm(){Xa.call(this,"Biscotti ID is missing from server")}
v(bm,Xa);bm.prototype.name="BiscottiMissingError";var Ul={format:"RAW",method:"GET",timeout:5E3,withCredentials:!0},cm=null;function Yg(){if(M("disable_biscotti_fetch_entirely_for_all_web_clients"))return Df(Error("Biscotti id fetching has been disabled entirely."));if(!$l())return Df(Error("User has not consented - not fetching biscotti id."));if("1"==mb())return Df(Error("Biscotti ID is not available in private embed mode"));cm||(cm=Ff(Tl().then(dm),function(a){return em(2,a)}));
return cm}
function dm(a){a=a.xhr.responseText;if(0!=a.lastIndexOf(")]}'",0))throw new bm;a=JSON.parse(a.substr(4));if(1<(a.type||1))throw new bm;a=a.id;Zg(a);cm=Yl(a);fm(18E5,2);return a}
function em(a,b){b=new am(b);Zg("");cm=Zl(b);0<a&&fm(12E4,a-1);throw b;}
function fm(a,b){N(function(){Ff(Tl().then(dm,function(c){return em(b,c)}),Ia)},a)}
function gm(){try{var a=B("yt.ads.biscotti.getId_");return a?a():Yg()}catch(b){return Df(b)}}
;function hm(a){if("1"!=mb()){a&&Xg();try{gm().then(function(){},function(){}),N(hm,18E5)}catch(b){rg(b)}}}
;var im=Date.now().toString();
function jm(){a:{if(window.crypto&&window.crypto.getRandomValues)try{var a=Array(16),b=new Uint8Array(16);window.crypto.getRandomValues(b);for(var c=0;c<a.length;c++)a[c]=b[c];var d=a;break a}catch(e){}d=Array(16);for(a=0;16>a;a++){b=Date.now();for(c=0;c<b%23;c++)d[a]=Math.random();d[a]=Math.floor(256*Math.random())}if(im)for(a=1,b=0;b<im.length;b++)d[a%16]=d[a%16]^d[(a-1)%16]/4^im.charCodeAt(b),a++}a=[];for(b=0;b<d.length;b++)a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(d[b]&63));
return a.join("")}
;var km,lm=z.ytLoggingDocDocumentNonce_;lm||(lm=jm(),Va("ytLoggingDocDocumentNonce_",lm));km=lm;var mm={xf:0,Pc:1,Xc:2,Ii:3,zf:4,um:5,xj:6,Pk:7,uk:8,0:"DEFAULT",1:"CHAT",2:"CONVERSATIONS",3:"MINIPLAYER",4:"DIALOG",5:"VOZ",6:"MUSIC_WATCH_TABS",7:"SHARE",8:"PUSH_NOTIFICATIONS"};function nm(a){this.h=a}
function om(a){return new nm({trackingParams:a})}
nm.prototype.getAsJson=function(){var a={};void 0!==this.h.trackingParams?a.trackingParams=this.h.trackingParams:(a.veType=this.h.veType,void 0!==this.h.veCounter&&(a.veCounter=this.h.veCounter),void 0!==this.h.elementIndex&&(a.elementIndex=this.h.elementIndex));void 0!==this.h.dataElement&&(a.dataElement=this.h.dataElement.getAsJson());void 0!==this.h.youtubeData&&(a.youtubeData=this.h.youtubeData);return a};
nm.prototype.toString=function(){return JSON.stringify(this.getAsJson())};
nm.prototype.isClientVe=function(){return!this.h.trackingParams&&!!this.h.veType};function pm(a){a=void 0===a?0:a;return 0==a?"client-screen-nonce":"client-screen-nonce."+a}
function qm(a){a=void 0===a?0:a;return 0==a?"ROOT_VE_TYPE":"ROOT_VE_TYPE."+a}
function rm(a){return G(qm(void 0===a?0:a),void 0)}
A("yt_logging_screen.getRootVeType",rm,void 0);function sm(a){return(a=rm(void 0===a?0:a))?new nm({veType:a,youtubeData:void 0}):null}
function tm(){var a=G("csn-to-ctt-auth-info");a||(a={},L("csn-to-ctt-auth-info",a));return a}
function um(a){a=void 0===a?0:a;var b=G(pm(a));if(!b&&!G("USE_CSN_FALLBACK",!0))return null;b||!M("use_undefined_csn_any_layer")&&0!=a||(b="UNDEFINED_CSN");return b?b:null}
A("yt_logging_screen.getCurrentCsn",um,void 0);function vm(a,b,c){var d=tm();(c=um(c))&&delete d[c];b&&(d[a]=b)}
function wm(a){return tm()[a]}
A("yt_logging_screen.getCttAuthInfo",wm,void 0);function xm(a,b,c,d){c=void 0===c?0:c;if(a!==G(pm(c))||b!==G(qm(c)))vm(a,d,c),L(pm(c),a),L(qm(c),b),b=function(){setTimeout(function(){a&&oi("foregroundHeartbeatScreenAssociated",{clientDocumentNonce:km,clientScreenNonce:a},wl)},0)},"requestAnimationFrame"in window?window.requestAnimationFrame(b):b()}
A("yt_logging_screen.setCurrentScreen",xm,void 0);function ym(a){jk.call(this,1,arguments);this.csn=a}
v(ym,jk);var sk=new kk("screen-created",ym),zm=[],Bm=Am,Cm=0;function Dm(a,b,c,d){var e=d.filter(function(f){f.csn!==b?(f.csn=b,f=!0):f=!1;return f});
c={csn:b,parentVe:c.getAsJson(),childVes:bb(e,function(f){return f.getAsJson()})};
d=t(d);for(e=d.next();!e.done;e=d.next())e=e.value.getAsJson(),(kb(e)||!e.trackingParams&&!e.veType)&&Pl(Error("Child VE logged with no data"));d={cttAuthInfo:wm(b),fa:b};"UNDEFINED_CSN"==b?Em("visualElementAttached",c,d):a?oi("visualElementAttached",c,a,d):V("visualElementAttached",c,d)}
function Am(){for(var a=Math.random()+"",b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);255<e&&(b[c++]=e&255,e>>=8);b[c++]=e}return Mc(b,3)}
function Em(a,b,c){zm.push({payloadName:a,payload:b,options:c});Cm||(Cm=tk())}
function uk(a){if(zm){for(var b=t(zm),c=b.next();!c.done;c=b.next())c=c.value,c.payload&&(c.payload.csn=a.csn,oi(c.payloadName,c.payload,null,c.options));zm.length=0}Cm=0}
;function Fm(){this.i=new Set;this.h=new Set;this.j=new Map}
Fm.prototype.clear=function(){this.i.clear();this.h.clear();this.j.clear()};
Ja(Fm);function Gm(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];if(!Hm(a)||c.some(function(e){return!Hm(e)}))throw Error("Only objects may be merged.");
c=t(c);for(d=c.next();!d.done;d=c.next())Im(a,d.value);return a}
function Im(a,b){for(var c in b)if(Hm(b[c])){if(c in a&&!Hm(a[c]))throw Error("Cannot merge an object into a non-object.");c in a||(a[c]={});Im(a[c],b[c])}else if(Jm(b[c])){if(c in a&&!Jm(a[c]))throw Error("Cannot merge an array into a non-array.");c in a||(a[c]=[]);Km(a[c],b[c])}else a[c]=b[c];return a}
function Km(a,b){b=t(b);for(var c=b.next();!c.done;c=b.next())c=c.value,Hm(c)?a.push(Im({},c)):Jm(c)?a.push(Km([],c)):a.push(c);return a}
function Hm(a){return"object"===typeof a&&!Array.isArray(a)}
function Jm(a){return"object"===typeof a&&Array.isArray(a)}
;function Lm(a,b){jk.call(this,1,arguments)}
v(Lm,jk);function Mm(a,b){jk.call(this,1,arguments)}
v(Mm,jk);var Nm=new kk("aft-recorded",Lm),Om=new kk("timing-sent",Mm);var Pm=window;function Qm(){this.timing={};this.clearResourceTimings=function(){};
this.webkitClearResourceTimings=function(){};
this.mozClearResourceTimings=function(){};
this.msClearResourceTimings=function(){};
this.oClearResourceTimings=function(){}}
var W=Pm.performance||Pm.mozPerformance||Pm.msPerformance||Pm.webkitPerformance||new Qm;var Rm=!1,Sm={'script[name="scheduler/scheduler"]':"sj",'script[name="player/base"]':"pj",'link[rel="stylesheet"][name="www-player"]':"pc",'link[rel="stylesheet"][name="player/www-player"]':"pc",'script[name="desktop_polymer/desktop_polymer"]':"dpj",'link[rel="import"][name="desktop_polymer"]':"dph",'script[name="mobile-c3"]':"mcj",'link[rel="stylesheet"][name="mobile-c3"]':"mcc",'script[name="player-plasma-ias-phone/base"]':"mcppj",'script[name="player-plasma-ias-tablet/base"]':"mcptj",'link[rel="stylesheet"][name="mobile-polymer-player-ias"]':"mcpc",
'link[rel="stylesheet"][name="mobile-polymer-player-svg-ias"]':"mcpsc",'script[name="mobile_blazer_core_mod"]':"mbcj",'link[rel="stylesheet"][name="mobile_blazer_css"]':"mbc",'script[name="mobile_blazer_logged_in_users_mod"]':"mbliuj",'script[name="mobile_blazer_logged_out_users_mod"]':"mblouj",'script[name="mobile_blazer_noncore_mod"]':"mbnj","#player_css":"mbpc",'script[name="mobile_blazer_desktopplayer_mod"]':"mbpj",'link[rel="stylesheet"][name="mobile_blazer_tablet_css"]':"mbtc",'script[name="mobile_blazer_watch_mod"]':"mbwj"};
Ta(W.clearResourceTimings||W.webkitClearResourceTimings||W.mozClearResourceTimings||W.msClearResourceTimings||W.oClearResourceTimings||Ia,W);function Tm(a){var b=Um(a);if(b.aft)return b.aft;a=G((a||"")+"TIMING_AFT_KEYS",["ol"]);for(var c=a.length,d=0;d<c;d++){var e=b[a[d]];if(e)return e}return NaN}
function Vm(){var a;if(M("csi_use_performance_navigation_timing")){var b,c,d,e=null===(d=null===(c=null===(b=null===(a=null===W||void 0===W?void 0:W.getEntriesByType)||void 0===a?void 0:a.call(W,"navigation"))||void 0===b?void 0:b[0])||void 0===c?void 0:c.toJSON)||void 0===d?void 0:d.call(c);e?(e.requestStart=Wm(e.requestStart),e.responseEnd=Wm(e.responseEnd),e.redirectStart=Wm(e.redirectStart),e.redirectEnd=Wm(e.redirectEnd),e.domainLookupEnd=Wm(e.domainLookupEnd),e.connectStart=Wm(e.connectStart),
e.connectEnd=Wm(e.connectEnd),e.responseStart=Wm(e.responseStart),e.secureConnectionStart=Wm(e.secureConnectionStart),e.domainLookupStart=Wm(e.domainLookupStart),e.isPerformanceNavigationTiming=!0,a=e):a=W.timing}else a=W.timing;return a}
function Xm(){return M("csi_use_time_origin")&&W.timeOrigin?Math.floor(W.timeOrigin):W.timing.navigationStart}
function Wm(a){return Math.round(Xm()+a)}
function Ym(a){var b;(b=B("ytcsi."+(a||"")+"data_"))||(b={tick:{},info:{}},Va("ytcsi."+(a||"")+"data_",b));return b}
function Zm(a){a=Ym(a);a.info||(a.info={});return a.info}
function Um(a){a=Ym(a);a.tick||(a.tick={});return a.tick}
function $m(a){var b=Ym(a).nonce;b||(b=jm(),Ym(a).nonce=b);return b}
function an(a){var b=Um(a||""),c=Tm(a);c&&!Rm&&(pk(Nm,new Lm(Math.round(c-b._start),a)),Rm=!0)}
;function bn(){if(W.getEntriesByType){var a=W.getEntriesByType("paint");if(a=db(a,function(b){return"first-paint"===b.name}))return Wm(a.startTime)}a=W.timing;
return a.Mb?Math.max(0,a.Mb):0}
;function cn(){var a=B("ytcsi.debug");a||(a=[],A("ytcsi.debug",a,void 0),A("ytcsi.reference",{},void 0));return a}
function dn(a){a=a||"";var b=B("ytcsi.reference");b||(cn(),b=B("ytcsi.reference"));if(b[a])return b[a];var c=cn(),d={timerName:a,info:{},tick:{},span:{}};c.push(d);return b[a]=d}
;var hn=z.ytLoggingLatencyUsageStats_||{};A("ytLoggingLatencyUsageStats_",hn,void 0);function jn(){this.h=0}
function kn(){jn.h||(jn.h=new jn);return jn.h}
jn.prototype.tick=function(a,b,c,d){ln(this,"tick_"+a+"_"+b)||V("latencyActionTicked",{tickName:a,clientActionNonce:b},{timestamp:c,cttAuthInfo:d})};
jn.prototype.info=function(a,b,c){var d=Object.keys(a).join("");ln(this,"info_"+d+"_"+b)||(a=Object.assign({},a),a.clientActionNonce=b,V("latencyActionInfo",a,{cttAuthInfo:c}))};
jn.prototype.span=function(a,b,c){var d=Object.keys(a).join("");ln(this,"span_"+d+"_"+b)||(a.clientActionNonce=b,V("latencyActionSpan",a,{cttAuthInfo:c}))};
function ln(a,b){hn[b]=hn[b]||{count:0};var c=hn[b];c.count++;c.time=P();a.h||(a.h=Ng(function(){var d=P(),e;for(e in hn)hn[e]&&6E4<d-hn[e].time&&delete hn[e];a&&(a.h=0)},5E3));
return 5<c.count?(6===c.count&&1>1E5*Math.random()&&(c=new Oi("CSI data exceeded logging limit with key",b.split("_")),0<=b.indexOf("plev")||Pl(c)),!0):!1}
;var X={},mn=(X.auto_search="LATENCY_ACTION_AUTO_SEARCH",X.ad_to_ad="LATENCY_ACTION_AD_TO_AD",X.ad_to_video="LATENCY_ACTION_AD_TO_VIDEO",X["analytics.explore"]="LATENCY_ACTION_CREATOR_ANALYTICS_EXPLORE",X.app_startup="LATENCY_ACTION_APP_STARTUP",X["artist.analytics"]="LATENCY_ACTION_CREATOR_ARTIST_ANALYTICS",X["artist.events"]="LATENCY_ACTION_CREATOR_ARTIST_CONCERTS",X["artist.presskit"]="LATENCY_ACTION_CREATOR_ARTIST_PROFILE",X.browse="LATENCY_ACTION_BROWSE",X.channels="LATENCY_ACTION_CHANNELS",X.creator_channel_dashboard=
"LATENCY_ACTION_CREATOR_CHANNEL_DASHBOARD",X["channel.analytics"]="LATENCY_ACTION_CREATOR_CHANNEL_ANALYTICS",X["channel.comments"]="LATENCY_ACTION_CREATOR_CHANNEL_COMMENTS",X["channel.content"]="LATENCY_ACTION_CREATOR_POST_LIST",X["channel.copyright"]="LATENCY_ACTION_CREATOR_CHANNEL_COPYRIGHT",X["channel.editing"]="LATENCY_ACTION_CREATOR_CHANNEL_EDITING",X["channel.monetization"]="LATENCY_ACTION_CREATOR_CHANNEL_MONETIZATION",X["channel.music"]="LATENCY_ACTION_CREATOR_CHANNEL_MUSIC",X["channel.playlists"]=
"LATENCY_ACTION_CREATOR_CHANNEL_PLAYLISTS",X["channel.translations"]="LATENCY_ACTION_CREATOR_CHANNEL_TRANSLATIONS",X["channel.videos"]="LATENCY_ACTION_CREATOR_CHANNEL_VIDEOS",X["channel.live_streaming"]="LATENCY_ACTION_CREATOR_LIVE_STREAMING",X.chips="LATENCY_ACTION_CHIPS",X["dialog.copyright_strikes"]="LATENCY_ACTION_CREATOR_DIALOG_COPYRIGHT_STRIKES",X["dialog.uploads"]="LATENCY_ACTION_CREATOR_DIALOG_UPLOADS",X.direct_playback="LATENCY_ACTION_DIRECT_PLAYBACK",X.embed="LATENCY_ACTION_EMBED",X.entity_key_serialization_perf=
"LATENCY_ACTION_ENTITY_KEY_SERIALIZATION_PERF",X.entity_key_deserialization_perf="LATENCY_ACTION_ENTITY_KEY_DESERIALIZATION_PERF",X.explore="LATENCY_ACTION_EXPLORE",X.home="LATENCY_ACTION_HOME",X.library="LATENCY_ACTION_LIBRARY",X.live="LATENCY_ACTION_LIVE",X.live_pagination="LATENCY_ACTION_LIVE_PAGINATION",X.onboarding="LATENCY_ACTION_ONBOARDING",X.parent_profile_settings="LATENCY_ACTION_KIDS_PARENT_PROFILE_SETTINGS",X.parent_tools_collection="LATENCY_ACTION_PARENT_TOOLS_COLLECTION",X.parent_tools_dashboard=
"LATENCY_ACTION_PARENT_TOOLS_DASHBOARD",X.player_att="LATENCY_ACTION_PLAYER_ATTESTATION",X["post.comments"]="LATENCY_ACTION_CREATOR_POST_COMMENTS",X["post.edit"]="LATENCY_ACTION_CREATOR_POST_EDIT",X.prebuffer="LATENCY_ACTION_PREBUFFER",X.prefetch="LATENCY_ACTION_PREFETCH",X.profile_settings="LATENCY_ACTION_KIDS_PROFILE_SETTINGS",X.profile_switcher="LATENCY_ACTION_LOGIN",X.reel_watch="LATENCY_ACTION_REEL_WATCH",X.results="LATENCY_ACTION_RESULTS",X.search_ui="LATENCY_ACTION_SEARCH_UI",X.search_suggest=
"LATENCY_ACTION_SUGGEST",X.search_zero_state="LATENCY_ACTION_SEARCH_ZERO_STATE",X.secret_code="LATENCY_ACTION_KIDS_SECRET_CODE",X.seek="LATENCY_ACTION_PLAYER_SEEK",X.settings="LATENCY_ACTION_SETTINGS",X.tenx="LATENCY_ACTION_TENX",X.video_to_ad="LATENCY_ACTION_VIDEO_TO_AD",X.watch="LATENCY_ACTION_WATCH",X.watch_it_again="LATENCY_ACTION_KIDS_WATCH_IT_AGAIN",X["watch,watch7"]="LATENCY_ACTION_WATCH",X["watch,watch7_html5"]="LATENCY_ACTION_WATCH",X["watch,watch7ad"]="LATENCY_ACTION_WATCH",X["watch,watch7ad_html5"]=
"LATENCY_ACTION_WATCH",X.wn_comments="LATENCY_ACTION_LOAD_COMMENTS",X.ww_rqs="LATENCY_ACTION_WHO_IS_WATCHING",X["video.analytics"]="LATENCY_ACTION_CREATOR_VIDEO_ANALYTICS",X["video.comments"]="LATENCY_ACTION_CREATOR_VIDEO_COMMENTS",X["video.edit"]="LATENCY_ACTION_CREATOR_VIDEO_EDIT",X["video.editor"]="LATENCY_ACTION_CREATOR_VIDEO_VIDEO_EDITOR",X["video.editor_async"]="LATENCY_ACTION_CREATOR_VIDEO_VIDEO_EDITOR_ASYNC",X["video.live_settings"]="LATENCY_ACTION_CREATOR_VIDEO_LIVE_SETTINGS",X["video.live_streaming"]=
"LATENCY_ACTION_CREATOR_VIDEO_LIVE_STREAMING",X["video.monetization"]="LATENCY_ACTION_CREATOR_VIDEO_MONETIZATION",X["video.translations"]="LATENCY_ACTION_CREATOR_VIDEO_TRANSLATIONS",X.voice_assistant="LATENCY_ACTION_VOICE_ASSISTANT",X.cast_load_by_entity_to_watch="LATENCY_ACTION_CAST_LOAD_BY_ENTITY_TO_WATCH",X.networkless_performance="LATENCY_ACTION_NETWORKLESS_PERFORMANCE",X),Y={},nn=(Y.ad_allowed="adTypesAllowed",Y.yt_abt="adBreakType",Y.ad_cpn="adClientPlaybackNonce",Y.ad_docid="adVideoId",Y.yt_ad_an=
"adNetworks",Y.ad_at="adType",Y.aida="appInstallDataAgeMs",Y.browse_id="browseId",Y.p="httpProtocol",Y.t="transportProtocol",Y.cs="commandSource",Y.cpn="clientPlaybackNonce",Y.ccs="creatorInfo.creatorCanaryState",Y.ctop="creatorInfo.topEntityType",Y.csn="clientScreenNonce",Y.docid="videoId",Y.GetHome_rid="requestIds",Y.GetSearch_rid="requestIds",Y.GetPlayer_rid="requestIds",Y.GetWatchNext_rid="requestIds",Y.GetBrowse_rid="requestIds",Y.GetLibrary_rid="requestIds",Y.is_continuation="isContinuation",
Y.is_nav="isNavigation",Y.b_p="kabukiInfo.browseParams",Y.is_prefetch="kabukiInfo.isPrefetch",Y.is_secondary_nav="kabukiInfo.isSecondaryNav",Y.nav_type="kabukiInfo.navigationType",Y.prev_browse_id="kabukiInfo.prevBrowseId",Y.query_source="kabukiInfo.querySource",Y.voz_type="kabukiInfo.vozType",Y.yt_lt="loadType",Y.mver="creatorInfo.measurementVersion",Y.yt_ad="isMonetized",Y.nr="webInfo.navigationReason",Y.nrsu="navigationRequestedSameUrl",Y.ncnp="webInfo.nonPreloadedNodeCount",Y.pnt="performanceNavigationTiming",
Y.prt="playbackRequiresTap",Y.plt="playerInfo.playbackType",Y.pis="playerInfo.playerInitializedState",Y.paused="playerInfo.isPausedOnLoad",Y.yt_pt="playerType",Y.fmt="playerInfo.itag",Y.yt_pl="watchInfo.isPlaylist",Y.yt_pre="playerInfo.preloadType",Y.yt_ad_pr="prerollAllowed",Y.pa="previousAction",Y.yt_red="isRedSubscriber",Y.rce="mwebInfo.responseContentEncoding",Y.rc="resourceInfo.resourceCache",Y.scrh="screenHeight",Y.scrw="screenWidth",Y.st="serverTimeMs",Y.ssdm="shellStartupDurationMs",Y.br_trs=
"tvInfo.bedrockTriggerState",Y.kebqat="kabukiInfo.earlyBrowseRequestInfo.abandonmentType",Y.kebqa="kabukiInfo.earlyBrowseRequestInfo.adopted",Y.label="tvInfo.label",Y.is_mdx="tvInfo.isMdx",Y.preloaded="tvInfo.isPreloaded",Y.aac_type="tvInfo.authAccessCredentialType",Y.upg_player_vis="playerInfo.visibilityState",Y.query="unpluggedInfo.query",Y.upg_chip_ids_string="unpluggedInfo.upgChipIdsString",Y.yt_vst="videoStreamType",Y.vph="viewportHeight",Y.vpw="viewportWidth",Y.yt_vis="isVisible",Y.rcl="mwebInfo.responseContentLength",
Y.GetSettings_rid="requestIds",Y.GetTrending_rid="requestIds",Y.GetMusicSearchSuggestions_rid="requestIds",Y.REQUEST_ID="requestIds",Y),on="isContinuation isNavigation kabukiInfo.earlyBrowseRequestInfo.adopted kabukiInfo.isPrefetch kabukiInfo.isSecondaryNav isMonetized navigationRequestedSameUrl performanceNavigationTiming playerInfo.isPausedOnLoad prerollAllowed isRedSubscriber tvInfo.isMdx tvInfo.isPreloaded isVisible watchInfo.isPlaylist playbackRequiresTap".split(" "),pn={},qn=(pn.ccs="CANARY_STATE_",
pn.mver="MEASUREMENT_VERSION_",pn.pis="PLAYER_INITIALIZED_STATE_",pn.yt_pt="LATENCY_PLAYER_",pn.pa="LATENCY_ACTION_",pn.ctop="TOP_ENTITY_TYPE_",pn.yt_vst="VIDEO_STREAM_TYPE_",pn),rn="all_vc ap aq c cbr cbrand cbrver cmodel cos cosver cplatform ctheme cver ei l_an l_mm plid srt yt_fss yt_li vpst vpni2 vpil2 icrc icrt pa GetAccountOverview_rid GetHistory_rid cmt d_vpct d_vpnfi d_vpni nsru pc pfa pfeh pftr pnc prerender psc rc start tcrt tcrc ssr vpr vps yt_abt yt_fn yt_fs yt_pft yt_pre yt_pt yt_pvis ytu_pvis yt_ref yt_sts tds".split(" ");
function sn(a){return!!G("FORCE_CSI_ON_GEL",!1)||M("csi_on_gel")||M("enable_csi_on_gel")||M("unplugged_tvhtml5_csi_on_gel")||!!Ym(a).useGel}
function tn(a,b,c){var d=un(c);d.gelTicks&&(d.gelTicks["tick_"+a]=!0);c||b||P();if(sn(c)){dn(c||"").tick[a]=b||P();d=$m(c);var e=Ym(c).cttAuthInfo;"_start"===a?(a=kn(),ln(a,"baseline_"+d)||V("latencyActionBaselined",{clientActionNonce:d},{timestamp:b,cttAuthInfo:e})):kn().tick(a,d,b,e);an(c);return!0}return!1}
function vn(a,b,c){c=un(c);if(c.gelInfos)c.gelInfos["info_"+a]=!0;else{var d={};c.gelInfos=(d["info_"+a]=!0,d)}if(a.match("_rid")){var e=a.split("_rid")[0];a="REQUEST_ID"}if(a in nn){c=nn[a];0<=$a(on,c)&&(b=!!b);a in qn&&"string"===typeof b&&(b=qn[a]+b.toUpperCase());a=b;b=c.split(".");for(var f=d={},g=0;g<b.length-1;g++){var h=b[g];f[h]={};f=f[h]}f[b[b.length-1]]="requestIds"===c?[{id:a,endpoint:e}]:a;return Gm({},d)}0<=$a(rn,a)||Pl(new Oi("Unknown label logged with GEL CSI",a))}
function un(a){a=Ym(a);if(a.gel){var b=a.gel;b.gelInfos||(b.gelInfos={});b.gelTicks||(b.gelTicks={})}else a.gel={gelTicks:{},gelInfos:{}};return a.gel}
function wn(a){a=un(a);a.gelInfos||(a.gelInfos={});return a.gelInfos}
;function xn(a,b,c){null!==b&&(Zm(c)[a]=b,sn(c)?(a=vn(a,b,c))&&sn(c)&&(b=dn(c||""),Gm(b.info,a),Gm(wn(c),a),b=$m(c),c=Ym(c).cttAuthInfo,kn().info(a,b,c)):dn(c||"").info[a]=b)}
function Z(a,b,c){var d=Um(c);if(!b&&"_"!==a[0]){var e=a;W.mark&&(0==e.lastIndexOf("mark_",0)||(e="mark_"+e),c&&(e+=" ("+c+")"),W.mark(e))}e=b||P();d[a]=e;tn(a,b,c)||c||(yn(),dn("").tick[a]=b||P());return d[a]}
function zn(){var a=$m(void 0);requestAnimationFrame(function(){setTimeout(function(){a===$m(void 0)&&Z("ol",void 0,void 0)},0)})}
function yn(){if(!B("yt.timing.pingSent_")){var a=G("TIMING_ACTION",void 0),b=Um();if(a=!!B("ytglobal.timingready_")&&a)a="_start"in Um(void 0);if(a&&Tm()){an();a=!0;var c=G("TIMING_WAIT",[]);if(c.length)for(var d=0,e=c.length;d<e;++d)if(!(c[d]in b)){a=!1;break}if(a&&!sn()){c=Um();d=Zm();e=c._start;var f=G("CSI_SERVICE_NAME","youtube");a={v:2,s:f,action:G("TIMING_ACTION",void 0)};b=d.srt;void 0!==c.srt&&delete d.srt;c.aft=Tm();var g=Um(void 0),h=g.pbr,k=g.vc;g=g.pbs;h&&k&&g&&h<k&&k<g&&Zm(void 0).yt_pvis&&
"youtube"===f&&(xn("yt_lt","hot_bg"),f=c.vc,h=c.pbs,delete c.aft,d.aft=Math.round(h-f));for(var l in d)"_"!==l.charAt(0)&&(a[l]=d[l]);c.ps=P();l={};f=[];for(var n in c)"_"!==n.charAt(0)&&(h=Math.round(c[n]-e),l[n]=h,f.push(n+"."+h));a.rt=f.join(",");n=!!d.ap;c="";for(var q in a)a.hasOwnProperty(q)&&(c+="&"+q+"="+a[q]);q="/csi_204?"+c.substring(1);window.navigator&&n?Ih(q):Fh(q);A("yt.timing.pingSent_",!0,void 0);pk(Om,new Mm(l.aft+(Number(b)||0)))}}}}
function An(){var a=document;if("visibilityState"in a)a=a.visibilityState;else{var b=Ag+"VisibilityState";a=b in a?a[b]:void 0}switch(a){case "hidden":return 0;case "visible":return 1;case "prerender":return 2;case "unloaded":return 3;default:return-1}}
function Bn(a,b){a=document.querySelector(a);if(!a)return!1;var c="",d=a.nodeName;"SCRIPT"===d?(c=a.src,c||(c=a.getAttribute("data-timing-href"))&&(c=window.location.protocol+c)):"LINK"===d&&(c=a.href);cc()&&a.setAttribute("nonce",cc());return c?(a=W.getEntriesByName(c))&&a[0]&&(a=a[0],c=Xm(),Z("rsf_"+b,c+Math.round(a.fetchStart)),Z("rse_"+b,c+Math.round(a.responseEnd)),void 0!==a.transferSize&&0===a.transferSize)?!0:!1:!1}
function Cn(){var a=window.location.protocol,b=W.getEntriesByType("resource");b=ab(b,function(c){return 0===c.name.indexOf(a+"//fonts.gstatic.com/s/")});
(b=cb(b,function(c,d){return d.duration>c.duration?d:c},{duration:0}))&&0<b.startTime&&0<b.responseEnd&&(Z("wffs",Wm(b.startTime)),Z("wffe",Wm(b.responseEnd)))}
var Dn=window;Dn.ytcsi&&(Dn.ytcsi.info=xn,Dn.ytcsi.tick=Z);function En(){this.u=[];this.o=[];this.h=[];this.l=[];this.m=[];this.i=new Set;this.B=new Map}
function Fn(a,b,c){c=void 0===c?0:c;b.then(function(d){var e,f;a.i.has(c)&&a.j&&a.j();var g=um(c),h=sm(c);g&&h&&((null===(e=null===d||void 0===d?void 0:d.response)||void 0===e?0:e.trackingParams)&&Dm(a.client,g,h,[om(d.response.trackingParams)]),(null===(f=null===d||void 0===d?void 0:d.playerResponse)||void 0===f?0:f.trackingParams)&&Dm(a.client,g,h,[om(d.playerResponse.trackingParams)]))})}
function Gn(a,b,c,d){d=void 0===d?0:d;if(a.i.has(d))a.u.push([b,c]);else{var e=um(d);c=c||sm(d);e&&c&&Dm(a.client,e,c,[b])}}
En.prototype.clickCommand=function(a,b,c){a=a.clickTrackingParams;c=void 0===c?0:c;if(a)if(c=um(void 0===c?0:c)){var d=this.client;var e="INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK";a={csn:c,ve:om(a).getAsJson(),gestureType:e};b&&(a.clientData=b);b={cttAuthInfo:wm(c),fa:c};"UNDEFINED_CSN"==c?Em("visualElementGestured",a,b):d?oi("visualElementGestured",a,d,b):V("visualElementGestured",a,b);b=!0}else b=!1;else b=!1;return b};
function Hn(a,b,c){c=void 0===c?{}:c;a.i.add(c.layer||0);a.j=function(){In(a,b,c);var f=sm(c.layer);if(f){for(var g=t(a.u),h=g.next();!h.done;h=g.next())h=h.value,Gn(a,h[0],h[1]||f,c.layer);f=t(a.o);for(g=f.next();!g.done;g=f.next()){var k=g.value;g=void 0;g=void 0===g?0:g;h=um(g);var l=k[0]||sm(g);h&&l&&(g=a.client,k=k[1],k={csn:h,ve:l.getAsJson(),clientData:k},l={cttAuthInfo:wm(h),fa:h},"UNDEFINED_CSN"==h?Em("visualElementStateChanged",k,l):g?oi("visualElementStateChanged",k,g,l):V("visualElementStateChanged",
k,l))}}};
um(c.layer)||a.j();if(c.eb)for(var d=t(c.eb),e=d.next();!e.done;e=d.next())Fn(a,e.value,c.layer);else Ql(Error("Delayed screen needs a data promise."))}
function In(a,b,c){c=void 0===c?{}:c;c.layer||(c.layer=0);var d=void 0!==c.Nb?c.Nb:c.layer;var e=um(d);d=sm(d);var f;d&&(void 0!==c.parentCsn?f={clientScreenNonce:c.parentCsn,visualElement:d}:e&&"UNDEFINED_CSN"!==e&&(f={clientScreenNonce:e,visualElement:d}));var g,h=G("EVENT_ID");"UNDEFINED_CSN"===e&&h&&(g={servletData:{serializedServletEventId:h}});try{var k=a.client;h=f;var l=c.cb,n=c.cttAuthInfo,q=c.Tm,u=Bm(),p={csn:u,pageVe:(new nm({veType:b,youtubeData:g})).getAsJson()};h&&h.visualElement?(p.implicitGesture=
{parentCsn:h.clientScreenNonce,gesturedVe:h.visualElement.getAsJson()},q&&(p.implicitGesture.gestureType=q)):h&&Pl(new Oi("newScreen() parent element does not have a VE - rootVe",b));l&&(p.cloneCsn=l);l={cttAuthInfo:n,fa:u};k?oi("screenCreated",p,k,l):V("screenCreated",p,l);pk(sk,new ym(u));var y=u}catch(C){Rl(C,{Zm:b,rootVe:d,parentVisualElement:void 0,Sm:e,Ym:f,cb:c.cb});Ql(C);return}xm(y,b,c.layer,c.cttAuthInfo);if((b=e&&"UNDEFINED_CSN"!==e&&d)&&!(b=M("screen_manager_skip_hide_killswitch"))){a:{b=
t(Object.values(mm));for(f=b.next();!f.done;f=b.next())if(um(f.value)==e){b=!0;break a}b=!1}b=!b}b&&(b=a.client,f=!0,k=(f=void 0===f?!1:f)?16:8,d={csn:e,ve:d.getAsJson(),eventType:k},f={cttAuthInfo:wm(e),fa:e,Ab:f},"UNDEFINED_CSN"==e?Em("visualElementHidden",d,f):b?oi("visualElementHidden",d,b,f):V("visualElementHidden",d,f));a.h[a.h.length-1]&&!a.h[a.h.length-1].csn&&(a.h[a.h.length-1].csn=y||"");xn("csn",y);Fm.getInstance().clear();d=sm(c.layer);e&&"UNDEFINED_CSN"!==e&&d&&(M("web_mark_root_visible")||
M("music_web_mark_root_visible"))&&(e=y,y={csn:e,ve:d.getAsJson(),eventType:1},b={cttAuthInfo:wm(e),fa:e},"UNDEFINED_CSN"==e?Em("visualElementShown",y,b):V("visualElementShown",y,b));a.i.delete(c.layer||0);a.j=void 0;e=t(a.B);for(y=e.next();!y.done;y=e.next())b=t(y.value),y=b.next().value,b=b.next().value,b.has(c.layer)&&d&&Gn(a,y,d,c.layer);for(c=0;c<a.l.length;c++){e=a.l[c];try{e()}catch(C){Ql(C)}}for(c=a.l.length=0;c<a.m.length;c++){e=a.m[c];try{e()}catch(C){Ql(C)}}}
;function Jn(a){a&&(a.dataset?a.dataset[Kn("loaded")]="true":a.setAttribute("data-loaded","true"))}
function Ln(a,b){return a?a.dataset?a.dataset[Kn(b)]:a.getAttribute("data-"+b):null}
var Mn={};function Kn(a){return Mn[a]||(Mn[a]=String(a).replace(/\-([a-z])/g,function(b,c){return c.toUpperCase()}))}
;var Nn=/\.vflset|-vfl[a-zA-Z0-9_+=-]+/,On=/-[a-zA-Z]{2,3}_[a-zA-Z]{2,3}(?=(\/|$))/;function Pn(a,b,c){c=void 0===c?null:c;if(window.spf&&spf.script){c="";if(a){var d=a.indexOf("jsbin/"),e=a.lastIndexOf(".js"),f=d+6;-1<d&&-1<e&&e>f&&(c=a.substring(f,e),c=c.replace(Nn,""),c=c.replace(On,""),c=c.replace("debug-",""),c=c.replace("tracing-",""))}spf.script.load(a,c,b)}else Qn(a,b,c)}
function Qn(a,b,c){c=void 0===c?null:c;var d=Rn(a),e=document.getElementById(d),f=e&&Ln(e,"loaded"),g=e&&!f;f?b&&b():(b&&(f=Nh(d,b),b=""+Oa(b),Sn[b]=f),g||(e=Tn(a,d,function(){Ln(e,"loaded")||(Jn(e),Qh(d),N(Ua(Rh,d),0))},c)))}
function Tn(a,b,c,d){d=void 0===d?null:d;var e=xd(document,"SCRIPT");e.id=b;e.onload=function(){c&&setTimeout(c,0)};
e.onreadystatechange=function(){switch(e.readyState){case "loaded":case "complete":e.onload()}};
d&&e.setAttribute("nonce",d);qd(e,pf(a));a=document.getElementsByTagName("head")[0]||document.body;a.insertBefore(e,a.firstChild);return e}
function Un(a){a=Rn(a);var b=document.getElementById(a);b&&(Rh(a),b.parentNode.removeChild(b))}
function Vn(a,b){a&&b&&(a=""+Oa(b),(a=Sn[a])&&Ph(a))}
function Rn(a){var b=document.createElement("a");$b(b,a);a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"js-"+ec(a)}
var Sn={};var Wn=[],Xn=!1;function Yn(){if(!M("disable_biscotti_fetch_for_ad_blocker_detection")&&!M("disable_biscotti_fetch_entirely_for_all_web_clients")&&$l()&&"1"!=mb()){var a=function(){Xn=!0;"google_ad_status"in window?L("DCLKSTAT",1):L("DCLKSTAT",2)};
try{Pn("//static.doubleclick.net/instream/ad_status.js",a)}catch(b){}Wn.push(Rg.L(function(){if(!(Xn||"google_ad_status"in window)){try{Vn("//static.doubleclick.net/instream/ad_status.js",a)}catch(b){}Xn=!0;L("DCLKSTAT",3)}},5E3))}}
function Zn(){var a=Number(G("DCLKSTAT",0));return isNaN(a)?0:a}
;function $n(){this.i=!1;this.h=null}
$n.prototype.initialize=function(a,b,c,d){d=void 0===d?!1:d;var e,f;if(a.program){var g=null!==(e=a.interpreterScript)&&void 0!==e?e:null,h=null!==(f=a.interpreterUrl)&&void 0!==f?f:null;if(a.interpreterSafeScript){g=a.interpreterSafeScript;wb("From proto message. b/166824318");g=g.privateDoNotAccessOrElseSafeScriptWrappedValue||"";var k=tb();g=k?k.createScript(g):g;g=(new yb(g)).toString()}a.interpreterSafeUrl&&(h=a.interpreterSafeUrl,wb("From proto message. b/166824318"),h=Cb(h.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue||
"").toString());ao(this,g,h,a.program,b,c,d)}else Pl(Error("Cannot initialize botguard without program"))};
function ao(a,b,c,d,e,f,g){g=void 0===g?!1:g;c?(a.i=!0,Pn(c,function(){a.i=!1;var h=0<=c.indexOf("/th/");(h?window.trayride:window.botguard)?bo(a,d,!!g,h,e):(Un(c),Pl(new Oi("Unable to load Botguard","from "+c)))},f)):b&&(f=xd(document,"SCRIPT"),f.textContent=b,f.nonce=cc(),document.head.appendChild(f),document.head.removeChild(f),((b=b.includes("trayride"))?window.trayride:window.botguard)?bo(a,d,!!g,b,e):Pl(Error("Unable to load Botguard from JS")))}
function bo(a,b,c,d,e){var f,g;if(d=d?null===(f=window.trayride)||void 0===f?void 0:f.ad:null===(g=window.botguard)||void 0===g?void 0:g.bg)if(c)try{co(a,new d(b,e?function(){return e(b)}:Ia))}catch(h){h instanceof Error&&Pl(h)}else{try{co(a,new d(b))}catch(h){h instanceof Error&&Pl(h)}e&&e(b)}else Pl(Error("Failed to finish initializing VM"))}
$n.prototype.invoke=function(a){a=void 0===a?{}:a;return this.h?this.h.hasOwnProperty("hot")?this.h.hot(void 0,void 0,a):this.h.invoke(void 0,void 0,a):null};
$n.prototype.dispose=function(){this.h=null};
function co(a,b){a.h=b}
;var eo=new $n;function fo(){return!!eo.h}
function go(a){a=void 0===a?{}:a;return eo.invoke(a)}
;var ho=window,io=/[A-Za-z]+\/[0-9.]+/g;function jo(a,b){if(a.replace(io,"")!==b.replace(io,""))return!1;a=a.match(io);b=b.match(io);if(a.length!==b.length)return!1;for(var c=0;c<a.length;c++){var d=a[c],e=b[c];if(!d.startsWith(e)&&!e.startsWith(d))return!1}return!0}
function ko(){var a=ho.uaChPolyfill.state;if(0===a.type)V("clientHintsPolyfillEvent",{clientHintsSupported:!1});else{var b=navigator.userAgent,c=void 0!==a.syntheticUa&&jo(a.syntheticUa,b),d={clientHintsSupported:!0,uaAccessedBeforePolyfill:a.didAccessUaBeforePolyfillAvailable,syntheticUaMatches:c};a.didAccessUaBeforePolyfillAvailable&&(d.uaAccessBeforePolyfillCount=a.uaAccessBeforePolyfillCount,a.firstAccessUaError&&(d.firstUaAccessStack=String(a.firstAccessUaError.stack).replace(/\n/g,""),Ql(a.firstAccessUaError)),
d.polyfillAvailabilityDelayMs=a.polyfillAvailabilityDelay);V("clientHintsPolyfillEvent",d);c||(b={syntheticUa:a.syntheticUa,ua:b},b.brand=a.data.brands.map(function(e){return'"'+e.brand+'"; v="'+e.version+'"'}),b.mobileness=a.data.mobile,a=a.data.values,a.architecture&&(b.platformArchitecture=a.architecture),a.model&&(b.model=a.model),a.platform&&(b.platformBrand=a.platform),a.platformVersion&&(b.platformVersion=a.platformVersion),a.uaFullVersion&&(b.fullVersion=a.uaFullVersion),V("clientHintsPolyfillDiagnostics",
b))}}
var lo=!1;function mo(){var a;1===(null===(a=ho.uaChPolyfill)||void 0===a?void 0:a.state.type)?lo||(ho.uaChPolyfill.onReady=mo,lo=!0):ho.uaChPolyfill&&ko()}
;function no(a,b,c){I.call(this);var d=this;c=c||G("POST_MESSAGE_ORIGIN",void 0)||window.document.location.protocol+"//"+window.document.location.hostname;this.j=b||null;this.D="*";this.l=c;this.sessionId=null;this.channel="widget";this.H=!!a;this.B=function(e){a:if(!("*"!=d.l&&e.origin!=d.l||d.j&&e.source!=d.j||"string"!==typeof e.data)){try{var f=JSON.parse(e.data)}catch(g){break a}if(!(null==f||d.H&&(d.sessionId&&d.sessionId!=f.id||d.channel&&d.channel!=f.channel))&&f)switch(f.event){case "listening":"null"!=
e.origin&&(d.l=d.D=e.origin);d.j=e.source;d.sessionId=f.id;d.i&&(d.i(),d.i=null);break;case "command":d.m&&(!d.o||0<=$a(d.o,f.func))&&d.m(f.func,f.args,e.origin)}}};
this.o=this.i=this.m=null;window.addEventListener("message",this.B)}
v(no,I);no.prototype.sendMessage=function(a,b){if(b=b||this.j){this.sessionId&&(a.id=this.sessionId);this.channel&&(a.channel=this.channel);try{var c=JSON.stringify(a);b.postMessage(c,this.D)}catch(d){sg(d)}}};
no.prototype.F=function(){window.removeEventListener("message",this.B);I.prototype.F.call(this)};function oo(){this.i=[];this.isReady=!1;this.j={};var a=this.h=new no(!!G("WIDGET_ID_ENFORCE")),b=this.Pb.bind(this);a.m=b;a.o=null;this.h.channel="widget";if(a=G("WIDGET_ID"))this.h.sessionId=a}
m=oo.prototype;m.Pb=function(a,b,c){"addEventListener"===a&&b?(a=b[0],this.j[a]||"onReady"===a||(this.addEventListener(a,po(this,a)),this.j[a]=!0)):this.Xa(a,b,c)};
m.Xa=function(){};
function po(a,b){return function(c){return a.sendMessage(b,c)}}
m.addEventListener=function(){};
m.Bb=function(){this.isReady=!0;this.sendMessage("initialDelivery",this.Na());this.sendMessage("onReady");E(this.i,this.qb,this);this.i=[]};
m.Na=function(){return null};
function qo(a,b){a.sendMessage("infoDelivery",b)}
m.qb=function(a){this.isReady?this.h.sendMessage(a):this.i.push(a)};
m.sendMessage=function(a,b){this.qb({event:a,info:void 0===b?null:b})};
m.dispose=function(){this.h=null};function ro(a){return(0===a.search("cue")||0===a.search("load"))&&"loadModule"!==a}
function so(a,b,c){if("string"===typeof a)return{videoId:a,startSeconds:b,suggestedQuality:c};b=["endSeconds","startSeconds","mediaContentUrl","suggestedQuality","videoId"];c={};for(var d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}
function to(a,b,c,d){if(Na(a)&&!Array.isArray(a)){b="playlist list listType index startSeconds suggestedQuality".split(" ");c={};for(d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}b={index:b,startSeconds:c,suggestedQuality:d};"string"===typeof a&&16===a.length?b.list="PL"+a:b.playlist=a;return b}
;function uo(a){oo.call(this);this.listeners=[];this.api=a;this.addEventListener("onReady",this.onReady.bind(this));this.addEventListener("onVideoProgress",this.Wb.bind(this));this.addEventListener("onVolumeChange",this.Xb.bind(this));this.addEventListener("onApiChange",this.Rb.bind(this));this.addEventListener("onPlaybackQualityChange",this.Tb.bind(this));this.addEventListener("onPlaybackRateChange",this.Ub.bind(this));this.addEventListener("onStateChange",this.Vb.bind(this));this.addEventListener("onWebglSettingsChanged",
this.Yb.bind(this))}
v(uo,oo);m=uo.prototype;
m.Xa=function(a,b,c){if(this.api.isExternalMethodAvailable(a,c)){b=b||[];if(0<b.length&&ro(a)){var d=b;if(Na(d[0])&&!Array.isArray(d[0]))var e=d[0];else switch(e={},a){case "loadVideoById":case "cueVideoById":e=so(d[0],void 0!==d[1]?Number(d[1]):void 0,d[2]);break;case "loadVideoByUrl":case "cueVideoByUrl":e=d[0];"string"===typeof e&&(e={mediaContentUrl:e,startSeconds:void 0!==d[1]?Number(d[1]):void 0,suggestedQuality:d[2]});b:{if((d=e.mediaContentUrl)&&(d=/\/([ve]|embed)\/([^#?]+)/.exec(d))&&d[2]){d=
d[2];break b}d=null}e.videoId=d;e=so(e);break;case "loadPlaylist":case "cuePlaylist":e=to(d[0],d[1],d[2],d[3])}b.length=1;b[0]=e}this.api.handleExternalCall(a,b,c);ro(a)&&qo(this,this.Na())}};
m.onReady=function(){var a=this.Bb.bind(this);this.h.i=a};
m.addEventListener=function(a,b){this.listeners.push({eventType:a,listener:b});this.api.addEventListener(a,b)};
m.Na=function(){if(!this.api)return null;var a=this.api.getApiInterface();eb(a,"getVideoData");for(var b={apiInterface:a},c=0,d=a.length;c<d;c++){var e=a[c];if(0===e.search("get")||0===e.search("is")){var f=0;0===e.search("get")?f=3:0===e.search("is")&&(f=2);f=e.charAt(f).toLowerCase()+e.substr(f+1);try{var g=this.api[e]();b[f]=g}catch(h){}}}b.videoData=this.api.getVideoData();b.currentTimeLastUpdated_=Date.now()/1E3;return b};
m.Vb=function(a){a={playerState:a,currentTime:this.api.getCurrentTime(),duration:this.api.getDuration(),videoData:this.api.getVideoData(),videoStartBytes:0,videoBytesTotal:this.api.getVideoBytesTotal(),videoLoadedFraction:this.api.getVideoLoadedFraction(),playbackQuality:this.api.getPlaybackQuality(),availableQualityLevels:this.api.getAvailableQualityLevels(),currentTimeLastUpdated_:Date.now()/1E3,playbackRate:this.api.getPlaybackRate(),mediaReferenceTime:this.api.getMediaReferenceTime()};this.api.getVideoUrl&&
(a.videoUrl=this.api.getVideoUrl());this.api.getVideoContentRect&&(a.videoContentRect=this.api.getVideoContentRect());this.api.getProgressState&&(a.progressState=this.api.getProgressState());this.api.getPlaylist&&(a.playlist=this.api.getPlaylist());this.api.getPlaylistIndex&&(a.playlistIndex=this.api.getPlaylistIndex());this.api.getStoryboardFormat&&(a.storyboardFormat=this.api.getStoryboardFormat());qo(this,a)};
m.Tb=function(a){qo(this,{playbackQuality:a})};
m.Ub=function(a){qo(this,{playbackRate:a})};
m.Rb=function(){for(var a=this.api.getOptions(),b={namespaces:a},c=0,d=a.length;c<d;c++){var e=a[c],f=this.api.getOptions(e);b[e]={options:f};for(var g=0,h=f.length;g<h;g++){var k=f[g],l=this.api.getOption(e,k);b[e][k]=l}}this.sendMessage("apiInfoDelivery",b)};
m.Xb=function(){qo(this,{muted:this.api.isMuted(),volume:this.api.getVolume()})};
m.Wb=function(a){a={currentTime:a,videoBytesLoaded:this.api.getVideoBytesLoaded(),videoLoadedFraction:this.api.getVideoLoadedFraction(),currentTimeLastUpdated_:Date.now()/1E3,playbackRate:this.api.getPlaybackRate(),mediaReferenceTime:this.api.getMediaReferenceTime()};this.api.getProgressState&&(a.progressState=this.api.getProgressState());qo(this,a)};
m.Yb=function(){var a={sphericalProperties:this.api.getSphericalProperties()};qo(this,a)};
m.dispose=function(){oo.prototype.dispose.call(this);for(var a=0;a<this.listeners.length;a++){var b=this.listeners[a];this.api.removeEventListener(b.eventType,b.listener)}this.listeners=[]};function vo(a){I.call(this);this.i={};this.started=!1;this.connection=a;this.connection.subscribe("command",this.mb,this)}
v(vo,I);m=vo.prototype;m.start=function(){this.started||this.h||(this.started=!0,this.connection.ia("RECEIVING"))};
m.ia=function(a,b){this.started&&!this.h&&this.connection.ia(a,b)};
m.mb=function(a,b,c){if(this.started&&!this.h){var d=b||{};switch(a){case "addEventListener":"string"===typeof d.event&&this.addListener(d.event);break;case "removeEventListener":"string"===typeof d.event&&this.removeListener(d.event);break;default:this.api.isReady()&&this.api.isExternalMethodAvailable(a,c||null)&&(b=wo(a,b||{}),c=this.api.handleExternalCall(a,b,c||null),(c=xo(a,c))&&this.ia(a,c))}}};
m.addListener=function(a){if(!(a in this.i)){var b=this.Sb.bind(this,a);this.i[a]=b;this.addEventListener(a,b)}};
m.Sb=function(a,b){this.started&&!this.h&&this.connection.ia(a,this.Ma(a,b))};
m.Ma=function(a,b){if(null!=b)return{value:b}};
m.removeListener=function(a){a in this.i&&(this.removeEventListener(a,this.i[a]),delete this.i[a])};
m.F=function(){var a=this.connection;a.h||Qf(a.i,"command",this.mb,this);this.connection=null;for(var b in this.i)this.i.hasOwnProperty(b)&&this.removeListener(b);I.prototype.F.call(this)};function yo(a,b){vo.call(this,b);this.api=a;this.start()}
v(yo,vo);yo.prototype.addEventListener=function(a,b){this.api.addEventListener(a,b)};
yo.prototype.removeEventListener=function(a,b){this.api.removeEventListener(a,b)};
function wo(a,b){switch(a){case "loadVideoById":return a=so(b),[a];case "cueVideoById":return a=so(b),[a];case "loadVideoByPlayerVars":return[b];case "cueVideoByPlayerVars":return[b];case "loadPlaylist":return a=to(b),[a];case "cuePlaylist":return a=to(b),[a];case "seekTo":return[b.seconds,b.allowSeekAhead];case "playVideoAt":return[b.index];case "setVolume":return[b.volume];case "setPlaybackQuality":return[b.suggestedQuality];case "setPlaybackRate":return[b.suggestedRate];case "setLoop":return[b.loopPlaylists];
case "setShuffle":return[b.shufflePlaylist];case "getOptions":return[b.module];case "getOption":return[b.module,b.option];case "setOption":return[b.module,b.option,b.value];case "handleGlobalKeyDown":return[b.keyCode,b.shiftKey,b.ctrlKey,b.altKey,b.metaKey,b.key,b.code]}return[]}
function xo(a,b){switch(a){case "isMuted":return{muted:b};case "getVolume":return{volume:b};case "getPlaybackRate":return{playbackRate:b};case "getAvailablePlaybackRates":return{availablePlaybackRates:b};case "getVideoLoadedFraction":return{videoLoadedFraction:b};case "getPlayerState":return{playerState:b};case "getCurrentTime":return{currentTime:b};case "getPlaybackQuality":return{playbackQuality:b};case "getAvailableQualityLevels":return{availableQualityLevels:b};case "getDuration":return{duration:b};
case "getVideoUrl":return{videoUrl:b};case "getVideoEmbedCode":return{videoEmbedCode:b};case "getPlaylist":return{playlist:b};case "getPlaylistIndex":return{playlistIndex:b};case "getOptions":return{options:b};case "getOption":return{option:b}}}
yo.prototype.Ma=function(a,b){switch(a){case "onReady":return;case "onStateChange":return{playerState:b};case "onPlaybackQualityChange":return{playbackQuality:b};case "onPlaybackRateChange":return{playbackRate:b};case "onError":return{errorCode:b}}return vo.prototype.Ma.call(this,a,b)};
yo.prototype.F=function(){vo.prototype.F.call(this);delete this.api};function zo(a){a=void 0===a?!1:a;I.call(this);this.i=new K(a);Wd(this,Ua(Ud,this.i))}
D(zo,I);zo.prototype.subscribe=function(a,b,c){return this.h?0:this.i.subscribe(a,b,c)};
zo.prototype.l=function(a,b){this.h||this.i.ha.apply(this.i,arguments)};function Ao(a,b,c){zo.call(this);this.j=a;this.destination=b;this.id=c}
v(Ao,zo);Ao.prototype.ia=function(a,b){this.h||this.j.ia(this.destination,this.id,a,b)};
Ao.prototype.F=function(){this.destination=this.j=null;zo.prototype.F.call(this)};function Bo(a,b,c){I.call(this);this.destination=a;this.origin=c;this.i=Hg(window,"message",this.j.bind(this));this.connection=new Ao(this,a,b);Wd(this,Ua(Ud,this.connection))}
v(Bo,I);Bo.prototype.ia=function(a,b,c,d){this.h||a!==this.destination||(a={id:b,command:c},d&&(a.data=d),this.destination.postMessage(rf(a),this.origin))};
Bo.prototype.j=function(a){var b;if(b=!this.h)if(b=a.origin===this.origin)a:{b=this.destination;do{b:{var c=a.source;do{if(c===b){c=!0;break b}if(c===c.parent)break;c=c.parent}while(null!=c);c=!1}if(c){b=!0;break a}b=b.opener}while(null!=b);b=!1}if(b&&(b=a.data,"string"===typeof b)){try{b=JSON.parse(b)}catch(d){return}b.command&&(c=this.connection,c.h||c.l("command",b.command,b.data,a.origin))}};
Bo.prototype.F=function(){Ig(this.i);this.destination=null;I.prototype.F.call(this)};function Co(a){a=a||{};var b={},c={};this.url=a.url||"";this.args=a.args||ob(b);this.assets=a.assets||{};this.attrs=a.attrs||ob(c);this.fallback=a.fallback||null;this.fallbackMessage=a.fallbackMessage||null;this.html5=!!a.html5;this.disable=a.disable||{};this.loaded=!!a.loaded;this.messages=a.messages||{}}
Co.prototype.clone=function(){var a=new Co,b;for(b in this)if(this.hasOwnProperty(b)){var c=this[b];"object"==Ka(c)?a[b]=ob(c):a[b]=c}return a};var Do=/cssbin\/(?:debug-)?([a-zA-Z0-9_-]+?)(?:-2x|-web|-rtl|-vfl|.css)/;function Eo(a){a=a||"";if(window.spf){var b=a.match(Do);spf.style.load(a,b?b[1]:"",void 0)}else Fo(a)}
function Fo(a){var b=Go(a),c=document.getElementById(b),d=c&&Ln(c,"loaded");d||c&&!d||(c=Ho(a,b,function(){Ln(c,"loaded")||(Jn(c),Qh(b),N(Ua(Rh,b),0))}))}
function Ho(a,b,c){var d=document.createElement("link");d.id=b;d.onload=function(){c&&setTimeout(c,0)};
a=pf(a);ac(d,a);(document.getElementsByTagName("head")[0]||document.body).appendChild(d);return d}
function Go(a){var b=xd(document,"A");wb("This URL is never added to the DOM");$b(b,new Mb(a,Nb));a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"css-"+ec(a)}
;function Io(){I.call(this);this.i=[]}
v(Io,I);Io.prototype.F=function(){for(;this.i.length;){var a=this.i.pop();a.target.removeEventListener(a.name,a.Za,void 0)}I.prototype.F.call(this)};function Jo(){Io.apply(this,arguments)}
v(Jo,Io);function Ko(a,b,c,d){I.call(this);var e=this;this.H=b;this.webPlayerContextConfig=d;this.Ia=!1;this.api={};this.la=this.o=null;this.N=new K;this.i={};this.Y=this.ta=this.elementId=this.Ja=this.config=null;this.R=!1;this.l=this.B=null;this.va={};this.tb=["onReady"];this.lastError=null;this.Ya=NaN;this.D={};this.ub=new Jo(this);this.ka=0;this.j=this.m=a;Wd(this,Ua(Ud,this.N));Lo(this);Mo(this);Wd(this,Ua(Ud,this.ub));c?this.ka=N(function(){e.loadNewVideoConfig(c)},0):d&&(No(this),Oo(this))}
v(Ko,I);m=Ko.prototype;m.getId=function(){return this.H};
m.loadNewVideoConfig=function(a){if(!this.h){this.ka&&(Kg(this.ka),this.ka=0);var b=a||{};b instanceof Co||(b=new Co(b));this.config=b;this.setConfig(a);Oo(this);this.isReady()&&Po(this)}};
function No(a){var b,c;a.webPlayerContextConfig?c=a.webPlayerContextConfig.rootElementId:c=a.config.attrs.id;a.elementId=c||a.elementId;"video-player"===a.elementId&&(a.elementId=a.H,a.webPlayerContextConfig?a.webPlayerContextConfig.rootElementId=a.H:a.config.attrs.id=a.H);(null===(b=a.j)||void 0===b?void 0:b.id)===a.elementId&&(a.elementId+="-player",a.webPlayerContextConfig?a.webPlayerContextConfig.rootElementId=a.elementId:a.config.attrs.id=a.elementId)}
m.setConfig=function(a){var b;this.Ja=a;this.config=Qo(a);No(this);this.ta||(this.ta=Ro(this,(null===(b=this.config.args)||void 0===b?void 0:b.jsapicallback)||"onYouTubePlayerReady"));this.config.args?this.config.args.jsapicallback=null:this.config.args={jsapicallback:null};var c;if(null===(c=this.config)||void 0===c?0:c.attrs)a=this.config.attrs,(c=a.width)&&this.j&&(this.j.style.width=Gd(Number(c)||c)),(a=a.height)&&this.j&&(this.j.style.height=Gd(Number(a)||a))};
function Po(a){var b;a.config&&!0!==a.config.loaded&&(a.config.loaded=!0,!a.config.args||"0"!==a.config.args.autoplay&&0!==a.config.args.autoplay&&!1!==a.config.args.autoplay?a.api.loadVideoByPlayerVars(null!==(b=a.config.args)&&void 0!==b?b:null):a.api.cueVideoByPlayerVars(a.config.args))}
function So(a){var b=!0,c=To(a);c&&a.config&&(a=Uo(a),b=Ln(c,"version")===a);return b&&!!B("yt.player.Application.create")}
function Oo(a){if(!a.h&&!a.R){var b=So(a);if(b&&"html5"===(To(a)?"html5":null))a.Y="html5",a.isReady()||Vo(a);else if(Wo(a),a.Y="html5",b&&a.l&&a.m)a.m.appendChild(a.l),Vo(a);else{a.config&&(a.config.loaded=!0);var c=!1;a.B=function(){c=!0;var d=Xo(a,"player_bootstrap_method")?B("yt.player.Application.createAlternate")||B("yt.player.Application.create"):B("yt.player.Application.create");var e=a.config?Qo(a.config):void 0;d&&d(a.m,e,a.webPlayerContextConfig);Vo(a)};
a.R=!0;b?a.B():(Pn(Uo(a),a.B),(b=Yo(a))&&Eo(b),Zo(a)&&!c&&A("yt.player.Application.create",null,void 0))}}}
function To(a){var b=td(a.elementId);!b&&a.j&&a.j.querySelector&&(b=a.j.querySelector("#"+a.elementId));return b}
function Vo(a){var b;if(!a.h){var c=To(a),d=!1;c&&c.getApiInterface&&c.getApiInterface()&&(d=!0);d?(a.R=!1,!Xo(a,"html5_remove_not_servable_check_killswitch")&&(null===c||void 0===c?0:c.isNotServable)&&a.config&&(null===c||void 0===c?0:c.isNotServable(null===(b=a.config.args)||void 0===b?void 0:b.video_id))||$o(a)):a.Ya=N(function(){Vo(a)},50)}}
function $o(a){Lo(a);a.Ia=!0;var b=To(a);if(b){a.o=ap(a,b,"addEventListener");a.la=ap(a,b,"removeEventListener");var c=b.getApiInterface();c=c.concat(b.getInternalApiInterface());for(var d=a.api,e=0;e<c.length;e++){var f=c[e];d[f]||(d[f]=ap(a,b,f))}}for(var g in a.i)a.i.hasOwnProperty(g)&&a.o&&a.o(g,a.i[g]);Po(a);a.ta&&a.ta(a.api);a.N.ha("onReady",a.api)}
function ap(a,b,c){var d=b[c];return function(e){for(var f=[],g=0;g<arguments.length;++g)f[g-0]=arguments[g];try{return a.lastError=null,d.apply(b,f)}catch(h){"sendAbandonmentPing"!==c&&(h.params=c,a.lastError=h,Pl(h))}}}
function Lo(a){a.Ia=!1;if(a.la)for(var b in a.i)a.i.hasOwnProperty(b)&&a.la(b,a.i[b]);for(var c in a.D)a.D.hasOwnProperty(c)&&Kg(Number(c));a.D={};a.o=null;a.la=null;b=a.api;for(var d in b)b.hasOwnProperty(d)&&(b[d]=null);b.addEventListener=function(e,f){a.addEventListener(e,f)};
b.removeEventListener=function(e,f){a.removeEventListener(e,f)};
b.destroy=function(){a.dispose()};
b.getLastError=function(){return a.getLastError()};
b.getPlayerType=function(){return a.getPlayerType()};
b.getCurrentVideoConfig=function(){return a.Ja};
b.loadNewVideoConfig=function(e){a.loadNewVideoConfig(e)};
b.isReady=function(){return a.isReady()}}
m.isReady=function(){return this.Ia};
function Mo(a){a.addEventListener("WATCH_LATER_VIDEO_ADDED",function(b){Qh("WATCH_LATER_VIDEO_ADDED",b)});
a.addEventListener("WATCH_LATER_VIDEO_REMOVED",function(b){Qh("WATCH_LATER_VIDEO_REMOVED",b)});
a.addEventListener("onAdAnnounce",function(b){Qh("a11y-announce",b)})}
m.addEventListener=function(a,b){var c=this,d=Ro(this,b);d&&(0<=$a(this.tb,a)||this.i[a]||(b=bp(this,a),this.o&&this.o(a,b)),this.N.subscribe(a,d),"onReady"===a&&this.isReady()&&N(function(){d(c.api)},0))};
m.removeEventListener=function(a,b){this.h||(b=Ro(this,b))&&Qf(this.N,a,b)};
function Ro(a,b){var c=b;if("string"===typeof b){if(a.va[b])return a.va[b];c=function(d){for(var e=[],f=0;f<arguments.length;++f)e[f-0]=arguments[f];if(f=B(b))try{f.apply(z,e)}catch(g){Ql(g)}};
a.va[b]=c}return c?c:null}
function bp(a,b){var c="ytPlayer"+b+a.H;a.i[b]=c;z[c]=function(d){var e=N(function(){if(!a.h){a.N.ha(b,d);var f=a.D,g=String(e);g in f&&delete f[g]}},0);
lb(a.D,String(e))};
return c}
m.getPlayerType=function(){return this.Y||(To(this)?"html5":null)};
m.getLastError=function(){return this.lastError};
function Wo(a){a.cancel();Lo(a);a.Y=null;a.config&&(a.config.loaded=!1);var b=To(a);b&&(So(a)||!Zo(a)?a.l=b:(b&&b.destroy&&b.destroy(),a.l=null));if(a.m)for(a=a.m;b=a.firstChild;)a.removeChild(b)}
m.cancel=function(){this.B&&Vn(Uo(this),this.B);Kg(this.Ya);this.R=!1};
m.F=function(){Wo(this);if(this.l&&this.config&&this.l.destroy)try{this.l.destroy()}catch(b){Ql(b)}this.va=null;for(var a in this.i)this.i.hasOwnProperty(a)&&(z[this.i[a]]=null);this.Ja=this.config=this.api=null;delete this.m;delete this.j;I.prototype.F.call(this)};
function Zo(a){var b,c;a=null===(c=null===(b=a.config)||void 0===b?void 0:b.args)||void 0===c?void 0:c.fflags;return!!a&&-1!==a.indexOf("player_destroy_old_version=true")}
function Uo(a){return a.webPlayerContextConfig?a.webPlayerContextConfig.jsUrl:(a=a.config.assets)?a.js:""}
function Yo(a){return a.webPlayerContextConfig?a.webPlayerContextConfig.cssUrl:(a=a.config.assets)?a.css:""}
function Xo(a,b){var c;if(a.webPlayerContextConfig)var d=a.webPlayerContextConfig.serializedExperimentFlags;else if(null===(c=a.config)||void 0===c?0:c.args)d=a.config.args.fflags;return"true"===bh(d||"","&")[b]}
function Qo(a){for(var b={},c=t(Object.keys(a)),d=c.next();!d.done;d=c.next()){d=d.value;var e=a[d];b[d]="object"===typeof e?ob(e):e}return b}
;var cp={},dp="player_uid_"+(1E9*Math.random()>>>0);function ep(a,b,c){var d="player";c=void 0===c?!0:c;d="string"===typeof d?td(d):d;var e=dp+"_"+Oa(d),f=cp[e];if(f&&c)return fp(a,b)?f.api.loadVideoByPlayerVars(a.args||null):f.loadNewVideoConfig(a),f.api;f=new Ko(d,e,a,b);cp[e]=f;Qh("player-added",f.api);Wd(f,function(){delete cp[f.getId()]});
return f.api}
function fp(a,b){return b&&b.serializedExperimentFlags?b.serializedExperimentFlags.includes("web_player_remove_playerproxy=true"):a&&a.args&&a.args.fflags?a.args.fflags.includes("web_player_remove_playerproxy=true"):!1}
;var gp=null,hp=null,ip=null;function jp(){var a=gp.getVideoData(1);a=a.title?a.title+" - YouTube":"YouTube";document.title!==a&&(document.title=a)}
;function kp(a,b,c){a="ST-"+ec(a).toString(36);b=b?jc(b):"";c=c||5;$l()&&qi(a,b,c)}
;function lp(a,b,c){b=void 0===b?{}:b;c=void 0===c?!1:c;var d=G("EVENT_ID");d&&(b.ei||(b.ei=d));if(b){d=a;var e=void 0===e?!0:e;var f=G("VALID_SESSION_TEMPDATA_DOMAINS",[]),g=hc(window.location.href);g&&f.push(g);g=hc(d);if(0<=$a(f,g)||!g&&0==d.lastIndexOf("/",0))if(M("autoescape_tempdata_url")&&(f=document.createElement("a"),$b(f,d),d=f.href),d){g=d.match(fc);d=g[5];f=g[6];g=g[7];var h="";d&&(h+=d);f&&(h+="?"+f);g&&(h+="#"+g);d=h;f=d.indexOf("#");if(d=0>f?d:d.substr(0,f))if(e&&!b.csn&&(b.itct||b.ved)&&
(b=Object.assign({csn:um()},b)),k){var k=parseInt(k,10);isFinite(k)&&0<k&&kp(d,b,k)}else kp(d,b)}}if(c)return!1;if((window.ytspf||{}).enabled)spf.navigate(a);else{var l=void 0===l?{}:l;var n=void 0===n?"":n;var q=void 0===q?window:q;c=q.location;a=kc(a,l)+n;var u=void 0===u?od:u;a:{u=void 0===u?od:u;for(l=0;l<u.length;++l)if(n=u[l],n instanceof md&&n.isValid(a)){u=new kd(a,id);break a}u=void 0}c.href=pd(u||ld)}return!0}
;A("yt.setConfig",L,void 0);A("yt.config.set",L,void 0);A("yt.setMsg",ug,void 0);A("yt.msgs.set",ug,void 0);A("yt.logging.errors.log",Ql,void 0);
A("writeEmbed",function(){var a=G("PLAYER_CONFIG",void 0);if(!a){var b=G("PLAYER_VARS",void 0);b&&(a={args:b})}hm(!0);"gvn"===a.args.ps&&(document.body.style.backgroundColor="transparent");a.attrs||(a.attrs={width:"100%",height:"100%",id:"video-player"});var c=document.referrer;b=G("POST_MESSAGE_ORIGIN");window!==window.top&&c&&c!==document.URL&&(a.args.loaderUrl=c);M("embeds_js_api_set_1p_cookie")&&(c=gh(),c.embedsTokenValue&&(a.args.embedsTokenValue=c.embedsTokenValue));L("FORCE_CSI_ON_GEL",!0);
c=["ol"];dn("").info.actionType="embed";c&&L("TIMING_AFT_KEYS",c);L("TIMING_ACTION","embed");c=G("TIMING_INFO",{});for(var d in c)c.hasOwnProperty(d)&&xn(d,c[d]);xn("is_nav",1);(d=um())&&xn("csn",d);(d=G("PREVIOUS_ACTION",void 0))&&!sn()&&xn("pa",d);d=Zm();c=G("CLIENT_PROTOCOL");var e=G("CLIENT_TRANSPORT");c&&xn("p",c);e&&xn("t",e);xn("yt_vis",An());xn("yt_lt","cold");c=Vm();if(e=Xm())Z("srt",c.responseStart),1!==d.prerender&&(xn("yt_sts","n",void 0),Z("_start",e,void 0));d=bn();0<d&&Z("fpt",d);d=
Vm();d.isPerformanceNavigationTiming&&xn("pnt",1,void 0);Z("nreqs",d.requestStart,void 0);Z("nress",d.responseStart,void 0);Z("nrese",d.responseEnd,void 0);0<d.redirectEnd-d.redirectStart&&(Z("nrs",d.redirectStart,void 0),Z("nre",d.redirectEnd,void 0));0<d.domainLookupEnd-d.domainLookupStart&&(Z("ndnss",d.domainLookupStart,void 0),Z("ndnse",d.domainLookupEnd,void 0));0<d.connectEnd-d.connectStart&&(Z("ntcps",d.connectStart,void 0),Z("ntcpe",d.connectEnd,void 0));d.secureConnectionStart>=Xm()&&0<d.connectEnd-
d.secureConnectionStart&&(Z("nstcps",d.secureConnectionStart,void 0),Z("ntcpe",d.connectEnd,void 0));W&&W.getEntriesByType&&Cn();d=[];if(document.querySelector&&W&&W.getEntriesByName)for(var f in Sm)Sm.hasOwnProperty(f)&&(c=Sm[f],Bn(f,c)&&d.push(c));for(f=0;f<d.length;f++)xn("rc",d[f]);if(sn(void 0)){f={actionType:mn[G("TIMING_ACTION",void 0)]||"LATENCY_ACTION_UNKNOWN",previousAction:mn[G("PREVIOUS_ACTION",void 0)]||"LATENCY_ACTION_UNKNOWN"};if(d=um())f.clientScreenNonce=d;d=$m(void 0);c=Ym(void 0).cttAuthInfo;
kn().info(f,d,c)}f=Zm();c=Um();if("cold"===f.yt_lt&&(d=un(),e=d.gelTicks?d.gelTicks:d.gelTicks={},d=d.gelInfos?d.gelInfos:d.gelInfos={},sn())){for(var g in c)"tick_"+g in e||tn(g,c[g]);g=wn();c=$m();e=Ym().cttAuthInfo;var h={},k=!1,l;for(l in f)if(!("info_"+l in d)){var n=vn(l,f[l]);n&&(Gm(g,n),Gm(h,n),k=!0)}k&&kn().info(h,c,e)}A("ytglobal.timingready_",!0,void 0);yn();(l=G("WEB_PLAYER_CONTEXT_CONFIGS",void 0))&&"WEB_PLAYER_CONTEXT_CONFIG_ID_EMBEDDED_PLAYER"in l?(l=l.WEB_PLAYER_CONTEXT_CONFIG_ID_EMBEDDED_PLAYER,
l.serializedForcedExperimentIds||(g=gh(),g.forced_experiments&&(l.serializedForcedExperimentIds=g.forced_experiments)),gp=ep(a,l,!1)):gp=ep(a);gp.addEventListener("onVideoDataChange",jp);a=G("POST_MESSAGE_ID","player");G("ENABLE_JS_API")?ip=new uo(gp):G("ENABLE_POST_API")&&"string"===typeof a&&"string"===typeof b&&(hp=new Bo(window.parent,a,b),ip=new yo(gp,hp.connection));Yn();M("networkless_logging_web_embedded")&&(M("embeds_web_enable_new_nwl")?vl():el());M("embeds_enable_ua_ch_polyfill")&&mo()},
void 0);
var mp=qg(function(){zn();var a=si.getInstance(),b=!!((vi("f"+(Math.floor(119/31)+1))||0)&67108864),c=1<window.devicePixelRatio;if(document.body&&$e(document.body,"exp-invert-logo"))if(c&&!$e(document.body,"inverted-hdpi")){var d=document.body;if(d.classList)d.classList.add("inverted-hdpi");else if(!$e(d,"inverted-hdpi")){var e=Ye(d);Ze(d,e+(0<e.length?" inverted-hdpi":"inverted-hdpi"))}}else!c&&$e(document.body,"inverted-hdpi")&&af();if(b!=c){b="f"+(Math.floor(119/31)+1);d=vi(b)||0;d=c?d|67108864:
d&-67108865;0==d?delete ri[b]:(c=d.toString(16),ri[b]=c.toString());c=!0;M("web_secure_pref_cookie_killswitch")&&(c=!1);b=a.h;d=[];for(var f in ri)d.push(f+"="+encodeURIComponent(String(ri[f])));qi(b,d.join("&"),63072E3,a.i,c)}En.h||(En.h=new En);a=En.h;f=16623;var g=void 0===g?{}:g;Object.values(Sl).includes(f)||(Pl(new Oi("createClientScreen() called with a non-page VE",f)),f=83769);g.isHistoryNavigation||a.h.push({rootVe:f,key:g.key||""});a.u=[];a.o=[];g.eb?Hn(a,f,g):In(a,f,g)}),np=qg(function(){gp&&
gp.sendAbandonmentPing&&gp.sendAbandonmentPing();
G("PL_ATT")&&eo.dispose();for(var a=0,b=Wn.length;a<b;a++)Rg.aa(Wn[a]);Wn.length=0;Un("//static.doubleclick.net/instream/ad_status.js");Xn=!1;L("DCLKSTAT",0);(0,Vd)(ip,hp);gp&&(gp.removeEventListener("onVideoDataChange",jp),gp.destroy())});
window.addEventListener?(window.addEventListener("load",mp),window.addEventListener("unload",np)):window.attachEvent&&(window.attachEvent("onload",mp),window.attachEvent("onunload",np));Va("yt.abuse.player.botguardInitialized",B("yt.abuse.player.botguardInitialized")||fo);Va("yt.abuse.player.invokeBotguard",B("yt.abuse.player.invokeBotguard")||go);Va("yt.abuse.dclkstatus.checkDclkStatus",B("yt.abuse.dclkstatus.checkDclkStatus")||Zn);
Va("yt.player.exports.navigate",B("yt.player.exports.navigate")||lp);Va("yt.util.activity.init",B("yt.util.activity.init")||Tg);Va("yt.util.activity.getTimeSinceActive",B("yt.util.activity.getTimeSinceActive")||Wg);Va("yt.util.activity.setTimestamp",B("yt.util.activity.setTimestamp")||Ug);}).call(this);
