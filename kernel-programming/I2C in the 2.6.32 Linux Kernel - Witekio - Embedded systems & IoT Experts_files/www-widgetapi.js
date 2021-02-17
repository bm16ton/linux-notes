(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var r;function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}
var ba="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
function ca(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}
var da=ca(this);function t(a,b){if(b)a:{for(var c=da,d=a.split("."),e=0;e<d.length-1;e++){var f=d[e];if(!(f in c))break a;c=c[f]}d=d[d.length-1];e=c[d];f=b(e);f!=e&&null!=f&&ba(c,d,{configurable:!0,writable:!0,value:f})}}
t("Symbol",function(a){function b(e){if(this instanceof b)throw new TypeError("Symbol is not a constructor");return new c("jscomp_symbol_"+(e||"")+"_"+d++,e)}
function c(e,f){this.h=e;ba(this,"description",{configurable:!0,writable:!0,value:f})}
if(a)return a;c.prototype.toString=function(){return this.h};
var d=0;return b});
t("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=da[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&ba(d.prototype,a,{configurable:!0,writable:!0,value:function(){return fa(aa(this))}})}return a});
function fa(a){a={next:a};a[Symbol.iterator]=function(){return this};
return a}
function u(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}
var ha="function"==typeof Object.create?Object.create:function(a){function b(){}
b.prototype=a;return new b},ia;
if("function"==typeof Object.setPrototypeOf)ia=Object.setPrototypeOf;else{var ja;a:{var ka={a:!0},la={};try{la.__proto__=ka;ja=la.a;break a}catch(a){}ja=!1}ia=ja?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var ma=ia;
function x(a,b){a.prototype=ha(b.prototype);a.prototype.constructor=a;if(ma)ma(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.A=b.prototype}
function na(){this.o=!1;this.i=null;this.m=void 0;this.h=1;this.u=this.l=0;this.j=null}
function oa(a){if(a.o)throw new TypeError("Generator is already running");a.o=!0}
na.prototype.s=function(a){this.m=a};
function pa(a,b){a.j={U:b,na:!0};a.h=a.l||a.u}
na.prototype["return"]=function(a){this.j={"return":a};this.h=this.u};
function z(a,b,c){a.h=c;return{value:b}}
function qa(a){a.l=0;var b=a.j.U;a.j=null;return b}
function ra(a){this.h=new na;this.i=a}
function sa(a,b){oa(a.h);var c=a.h.i;if(c)return ta(a,"return"in c?c["return"]:function(d){return{value:d,done:!0}},b,a.h["return"]);
a.h["return"](b);return ua(a)}
function ta(a,b,c,d){try{var e=b.call(a.h.i,c);if(!(e instanceof Object))throw new TypeError("Iterator result "+e+" is not an object");if(!e.done)return a.h.o=!1,e;var f=e.value}catch(g){return a.h.i=null,pa(a.h,g),ua(a)}a.h.i=null;d.call(a.h,f);return ua(a)}
function ua(a){for(;a.h.h;)try{var b=a.i(a.h);if(b)return a.h.o=!1,{value:b.value,done:!1}}catch(c){a.h.m=void 0,pa(a.h,c)}a.h.o=!1;if(a.h.j){b=a.h.j;a.h.j=null;if(b.na)throw b.U;return{value:b["return"],done:!0}}return{value:void 0,done:!0}}
function va(a){this.next=function(b){oa(a.h);a.h.i?b=ta(a,a.h.i.next,b,a.h.s):(a.h.s(b),b=ua(a));return b};
this["throw"]=function(b){oa(a.h);a.h.i?b=ta(a,a.h.i["throw"],b,a.h.s):(pa(a.h,b),b=ua(a));return b};
this["return"]=function(b){return sa(a,b)};
this[Symbol.iterator]=function(){return this}}
function wa(a,b){var c=new va(new ra(b));ma&&a.prototype&&ma(c,a.prototype);return c}
t("Reflect.setPrototypeOf",function(a){return a?a:ma?function(b,c){try{return ma(b,c),!0}catch(d){return!1}}:null});
t("Object.setPrototypeOf",function(a){return a||ma});
function A(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
var xa="function"==typeof Object.assign?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)A(d,e)&&(a[e]=d[e])}return a};
t("Object.assign",function(a){return a||xa});
t("Promise",function(a){function b(g){this.h=0;this.j=void 0;this.i=[];this.s=!1;var h=this.l();try{g(h.resolve,h.reject)}catch(k){h.reject(k)}}
function c(){this.h=null}
function d(g){return g instanceof b?g:new b(function(h){h(g)})}
if(a)return a;c.prototype.i=function(g){if(null==this.h){this.h=[];var h=this;this.j(function(){h.m()})}this.h.push(g)};
var e=da.setTimeout;c.prototype.j=function(g){e(g,0)};
c.prototype.m=function(){for(;this.h&&this.h.length;){var g=this.h;this.h=[];for(var h=0;h<g.length;++h){var k=g[h];g[h]=null;try{k()}catch(l){this.l(l)}}}this.h=null};
c.prototype.l=function(g){this.j(function(){throw g;})};
b.prototype.l=function(){function g(l){return function(m){k||(k=!0,l.call(h,m))}}
var h=this,k=!1;return{resolve:g(this.ba),reject:g(this.m)}};
b.prototype.ba=function(g){if(g===this)this.m(new TypeError("A Promise cannot resolve to itself"));else if(g instanceof b)this.da(g);else{a:switch(typeof g){case "object":var h=null!=g;break a;case "function":h=!0;break a;default:h=!1}h?this.aa(g):this.o(g)}};
b.prototype.aa=function(g){var h=void 0;try{h=g.then}catch(k){this.m(k);return}"function"==typeof h?this.ea(h,g):this.o(g)};
b.prototype.m=function(g){this.u(2,g)};
b.prototype.o=function(g){this.u(1,g)};
b.prototype.u=function(g,h){if(0!=this.h)throw Error("Cannot settle("+g+", "+h+"): Promise already settled in state"+this.h);this.h=g;this.j=h;2===this.h&&this.ca();this.D()};
b.prototype.ca=function(){var g=this;e(function(){if(g.G()){var h=da.console;"undefined"!==typeof h&&h.error(g.j)}},1)};
b.prototype.G=function(){if(this.s)return!1;var g=da.CustomEvent,h=da.Event,k=da.dispatchEvent;if("undefined"===typeof k)return!0;"function"===typeof g?g=new g("unhandledrejection",{cancelable:!0}):"function"===typeof h?g=new h("unhandledrejection",{cancelable:!0}):(g=da.document.createEvent("CustomEvent"),g.initCustomEvent("unhandledrejection",!1,!0,g));g.promise=this;g.reason=this.j;return k(g)};
b.prototype.D=function(){if(null!=this.i){for(var g=0;g<this.i.length;++g)f.i(this.i[g]);this.i=null}};
var f=new c;b.prototype.da=function(g){var h=this.l();g.M(h.resolve,h.reject)};
b.prototype.ea=function(g,h){var k=this.l();try{g.call(h,k.resolve,k.reject)}catch(l){k.reject(l)}};
b.prototype.then=function(g,h){function k(p,q){return"function"==typeof p?function(v){try{l(p(v))}catch(w){m(w)}}:q}
var l,m,n=new b(function(p,q){l=p;m=q});
this.M(k(g,l),k(h,m));return n};
b.prototype["catch"]=function(g){return this.then(void 0,g)};
b.prototype.M=function(g,h){function k(){switch(l.h){case 1:g(l.j);break;case 2:h(l.j);break;default:throw Error("Unexpected state: "+l.h);}}
var l=this;null==this.i?f.i(k):this.i.push(k);this.s=!0};
b.resolve=d;b.reject=function(g){return new b(function(h,k){k(g)})};
b.race=function(g){return new b(function(h,k){for(var l=u(g),m=l.next();!m.done;m=l.next())d(m.value).M(h,k)})};
b.all=function(g){var h=u(g),k=h.next();return k.done?d([]):new b(function(l,m){function n(v){return function(w){p[v]=w;q--;0==q&&l(p)}}
var p=[],q=0;do p.push(void 0),q++,d(k.value).M(n(p.length-1),m),k=h.next();while(!k.done)})};
return b});
function ya(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""}
t("String.prototype.endsWith",function(a){return a?a:function(b,c){var d=ya(this,b,"endsWith");b+="";void 0===c&&(c=d.length);for(var e=Math.max(0,Math.min(c|0,d.length)),f=b.length;0<f&&0<e;)if(d[--e]!=b[--f])return!1;return 0>=f}});
t("String.prototype.startsWith",function(a){return a?a:function(b,c){var d=ya(this,b,"startsWith");b+="";for(var e=d.length,f=b.length,g=Math.max(0,Math.min(c|0,d.length)),h=0;h<f&&g<e;)if(d[g++]!=b[h++])return!1;return h>=f}});
t("Object.is",function(a){return a?a:function(b,c){return b===c?0!==b||1/b===1/c:b!==b&&c!==c}});
t("Array.prototype.includes",function(a){return a?a:function(b,c){var d=this;d instanceof String&&(d=String(d));var e=d.length,f=c||0;for(0>f&&(f=Math.max(f+e,0));f<e;f++){var g=d[f];if(g===b||Object.is(g,b))return!0}return!1}});
t("String.prototype.includes",function(a){return a?a:function(b,c){return-1!==ya(this,b,"includes").indexOf(b,c||0)}});
t("Object.entries",function(a){return a?a:function(b){var c=[],d;for(d in b)A(b,d)&&c.push([d,b[d]]);return c}});
function za(a,b){a instanceof String&&(a+="");var c=0,d=!1,e={next:function(){if(!d&&c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d=!0;return{done:!0,value:void 0}}};
e[Symbol.iterator]=function(){return e};
return e}
t("Array.prototype.entries",function(a){return a?a:function(){return za(this,function(b,c){return[b,c]})}});
t("Array.prototype.keys",function(a){return a?a:function(){return za(this,function(b){return b})}});
t("Array.prototype.values",function(a){return a?a:function(){return za(this,function(b,c){return c})}});
t("WeakMap",function(a){function b(k){this.h=(h+=Math.random()+1).toString();if(k){k=u(k);for(var l;!(l=k.next()).done;)l=l.value,this.set(l[0],l[1])}}
function c(){}
function d(k){var l=typeof k;return"object"===l&&null!==k||"function"===l}
function e(k){if(!A(k,g)){var l=new c;ba(k,g,{value:l})}}
function f(k){var l=Object[k];l&&(Object[k]=function(m){if(m instanceof c)return m;Object.isExtensible(m)&&e(m);return l(m)})}
if(function(){if(!a||!Object.seal)return!1;try{var k=Object.seal({}),l=Object.seal({}),m=new a([[k,2],[l,3]]);if(2!=m.get(k)||3!=m.get(l))return!1;m["delete"](k);m.set(l,4);return!m.has(k)&&4==m.get(l)}catch(n){return!1}}())return a;
var g="$jscomp_hidden_"+Math.random();f("freeze");f("preventExtensions");f("seal");var h=0;b.prototype.set=function(k,l){if(!d(k))throw Error("Invalid WeakMap key");e(k);if(!A(k,g))throw Error("WeakMap key fail: "+k);k[g][this.h]=l;return this};
b.prototype.get=function(k){return d(k)&&A(k,g)?k[g][this.h]:void 0};
b.prototype.has=function(k){return d(k)&&A(k,g)&&A(k[g],this.h)};
b.prototype["delete"]=function(k){return d(k)&&A(k,g)&&A(k[g],this.h)?delete k[g][this.h]:!1};
return b});
t("Number.isNaN",function(a){return a?a:function(b){return"number"===typeof b&&isNaN(b)}});
t("Map",function(a){function b(){var h={};return h.previous=h.next=h.head=h}
function c(h,k){var l=h.h;return fa(function(){if(l){for(;l.head!=h.h;)l=l.previous;for(;l.next!=l.head;)return l=l.next,{done:!1,value:k(l)};l=null}return{done:!0,value:void 0}})}
function d(h,k){var l=k&&typeof k;"object"==l||"function"==l?f.has(k)?l=f.get(k):(l=""+ ++g,f.set(k,l)):l="p_"+k;var m=h.i[l];if(m&&A(h.i,l))for(var n=0;n<m.length;n++){var p=m[n];if(k!==k&&p.key!==p.key||k===p.key)return{id:l,list:m,index:n,v:p}}return{id:l,list:m,index:-1,v:void 0}}
function e(h){this.i={};this.h=b();this.size=0;if(h){h=u(h);for(var k;!(k=h.next()).done;)k=k.value,this.set(k[0],k[1])}}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var h=Object.seal({x:4}),k=new a(u([[h,"s"]]));if("s"!=k.get(h)||1!=k.size||k.get({x:4})||k.set({x:4},"t")!=k||2!=k.size)return!1;var l=k.entries(),m=l.next();if(m.done||m.value[0]!=h||"s"!=m.value[1])return!1;m=l.next();return m.done||4!=m.value[0].x||"t"!=m.value[1]||!l.next().done?!1:!0}catch(n){return!1}}())return a;
var f=new WeakMap;e.prototype.set=function(h,k){h=0===h?0:h;var l=d(this,h);l.list||(l.list=this.i[l.id]=[]);l.v?l.v.value=k:(l.v={next:this.h,previous:this.h.previous,head:this.h,key:h,value:k},l.list.push(l.v),this.h.previous.next=l.v,this.h.previous=l.v,this.size++);return this};
e.prototype["delete"]=function(h){h=d(this,h);return h.v&&h.list?(h.list.splice(h.index,1),h.list.length||delete this.i[h.id],h.v.previous.next=h.v.next,h.v.next.previous=h.v.previous,h.v.head=null,this.size--,!0):!1};
e.prototype.clear=function(){this.i={};this.h=this.h.previous=b();this.size=0};
e.prototype.has=function(h){return!!d(this,h).v};
e.prototype.get=function(h){return(h=d(this,h).v)&&h.value};
e.prototype.entries=function(){return c(this,function(h){return[h.key,h.value]})};
e.prototype.keys=function(){return c(this,function(h){return h.key})};
e.prototype.values=function(){return c(this,function(h){return h.value})};
e.prototype.forEach=function(h,k){for(var l=this.entries(),m;!(m=l.next()).done;)m=m.value,h.call(k,m[1],m[0],this)};
e.prototype[Symbol.iterator]=e.prototype.entries;var g=0;return e});
t("Set",function(a){function b(c){this.h=new Map;if(c){c=u(c);for(var d;!(d=c.next()).done;)this.add(d.value)}this.size=this.h.size}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var c=Object.seal({x:4}),d=new a(u([c]));if(!d.has(c)||1!=d.size||d.add(c)!=d||1!=d.size||d.add({x:4})!=d||2!=d.size)return!1;var e=d.entries(),f=e.next();if(f.done||f.value[0]!=c||f.value[1]!=c)return!1;f=e.next();return f.done||f.value[0]==c||4!=f.value[0].x||f.value[1]!=f.value[0]?!1:e.next().done}catch(g){return!1}}())return a;
b.prototype.add=function(c){c=0===c?0:c;this.h.set(c,c);this.size=this.h.size;return this};
b.prototype["delete"]=function(c){c=this.h["delete"](c);this.size=this.h.size;return c};
b.prototype.clear=function(){this.h.clear();this.size=0};
b.prototype.has=function(c){return this.h.has(c)};
b.prototype.entries=function(){return this.h.entries()};
b.prototype.values=function(){return this.h.values()};
b.prototype.keys=b.prototype.values;b.prototype[Symbol.iterator]=b.prototype.values;b.prototype.forEach=function(c,d){var e=this;this.h.forEach(function(f){return c.call(d,f,f,e)})};
return b});
var B=this||self;function C(a,b){for(var c=a.split("."),d=b||B,e=0;e<c.length;e++)if(d=d[c[e]],null==d)return null;return d}
function Aa(){}
function Ba(a){var b=typeof a;b="object"!=b?b:a?Array.isArray(a)?"array":b:"null";return"array"==b||"object"==b&&"number"==typeof a.length}
function D(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
function Ca(a){return Object.prototype.hasOwnProperty.call(a,Da)&&a[Da]||(a[Da]=++Ea)}
var Da="closure_uid_"+(1E9*Math.random()>>>0),Ea=0;function Fa(a,b,c){return a.call.apply(a.bind,arguments)}
function Ga(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}}
function Ha(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?Ha=Fa:Ha=Ga;return Ha.apply(null,arguments)}
function E(a,b){var c=a.split("."),d=B;c[0]in d||"undefined"==typeof d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d[e]&&d[e]!==Object.prototype[e]?d=d[e]:d=d[e]={}:d[e]=b}
function F(a,b){function c(){}
c.prototype=b.prototype;a.A=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Ga=function(d,e,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[e].apply(d,g)}}
function Ia(a){return a}
;function Ja(a,b){var c=void 0;return new (c||(c=Promise))(function(d,e){function f(k){try{h(b.next(k))}catch(l){e(l)}}
function g(k){try{h(b["throw"](k))}catch(l){e(l)}}
function h(k){k.done?d(k.value):(new c(function(l){l(k.value)})).then(f,g)}
h((b=b.apply(a,void 0)).next())})}
;function Ka(a){if(Error.captureStackTrace)Error.captureStackTrace(this,Ka);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}
F(Ka,Error);Ka.prototype.name="CustomError";var La=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if("string"===typeof a)return"string"!==typeof b||1!=b.length?-1:a.indexOf(b,0);
for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},G=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e="string"===typeof a?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ma=Array.prototype.reduce?function(a,b,c){return Array.prototype.reduce.call(a,b,c)}:function(a,b,c){var d=c;
G(a,function(e,f){d=b.call(void 0,d,e,f,a)});
return d};
function Na(a,b){a:{var c=a.length;for(var d="string"===typeof a?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){c=e;break a}c=-1}return 0>c?null:"string"===typeof a?a.charAt(c):a[c]}
function Oa(a,b){var c=La(a,b),d;(d=0<=c)&&Array.prototype.splice.call(a,c,1);return d}
function Pa(a){return Array.prototype.concat.apply([],arguments)}
function Qa(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}
function Ra(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(Ba(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}}
;function Sa(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}
;function Ta(a,b){for(var c in a)b.call(void 0,a[c],c,a)}
function Ua(a){var b=Va,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
function Wa(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(var d in b)if(!(d in a))return!1;return!0}
function Xa(a){if(!a||"object"!==typeof a)return a;if("function"===typeof a.clone)return a.clone();var b=Array.isArray(a)?[]:"function"!==typeof ArrayBuffer||"function"!==typeof ArrayBuffer.isView||!ArrayBuffer.isView(a)||a instanceof DataView?{}:new a.constructor(a.length),c;for(c in a)b[c]=Xa(a[c]);return b}
var Ya="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Za(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<Ya.length;f++)c=Ya[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;var $a;var ab=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]},bb=/&/g,cb=/</g,db=/>/g,eb=/"/g,fb=/'/g,gb=/\x00/g,hb=/[\x00&<>"']/;
function ib(a,b){return a<b?-1:a>b?1:0}
;var H;a:{var kb=B.navigator;if(kb){var lb=kb.userAgent;if(lb){H=lb;break a}}H=""}function I(a){return-1!=H.indexOf(a)}
;function mb(a){this.h=nb===nb?a:""}
mb.prototype.toString=function(){return this.h.toString()};
var nb={};function ob(){return I("iPhone")&&!I("iPod")&&!I("iPad")}
;function pb(a){pb[" "](a);return a}
pb[" "]=Aa;var qb=I("Opera"),rb=I("Trident")||I("MSIE"),sb=I("Edge"),tb=I("Gecko")&&!(-1!=H.toLowerCase().indexOf("webkit")&&!I("Edge"))&&!(I("Trident")||I("MSIE"))&&!I("Edge"),ub=-1!=H.toLowerCase().indexOf("webkit")&&!I("Edge");function vb(){var a=B.document;return a?a.documentMode:void 0}
var wb;a:{var xb="",yb=function(){var a=H;if(tb)return/rv:([^\);]+)(\)|;)/.exec(a);if(sb)return/Edge\/([\d\.]+)/.exec(a);if(rb)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(ub)return/WebKit\/(\S+)/.exec(a);if(qb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
yb&&(xb=yb?yb[1]:"");if(rb){var zb=vb();if(null!=zb&&zb>parseFloat(xb)){wb=String(zb);break a}}wb=xb}var Ab=wb,Bb={},Cb;if(B.document&&rb){var Db=vb();Cb=Db?Db:parseInt(Ab,10)||void 0}else Cb=void 0;var Eb=Cb;var Fb=I("Firefox")||I("FxiOS"),Gb=ob()||I("iPod"),Hb=I("iPad"),Ib=I("Safari")&&!((I("Chrome")||I("CriOS"))&&!I("Edge")||I("Coast")||I("Opera")||I("Edge")||I("Edg/")||I("OPR")||I("Firefox")||I("FxiOS")||I("Silk")||I("Android"))&&!(ob()||I("iPad")||I("iPod"));var Jb={},Kb=null;var J=window;function Lb(a,b){this.width=a;this.height=b}
r=Lb.prototype;r.clone=function(){return new Lb(this.width,this.height)};
r.aspectRatio=function(){return this.width/this.height};
r.isEmpty=function(){return!(this.width*this.height)};
r.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
r.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
r.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function Mb(){var a=document;var b="IFRAME";"application/xhtml+xml"===a.contentType&&(b=b.toLowerCase());return a.createElement(b)}
function Nb(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return null}
;var Ob=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function Pb(a){return a?decodeURI(a):a}
function K(a){return Pb(a.match(Ob)[3]||null)}
function Qb(a){var b=a.match(Ob);a=b[1];var c=b[2],d=b[3];b=b[4];var e="";a&&(e+=a+":");d&&(e+="//",c&&(e+=c+"@"),e+=d,b&&(e+=":"+b));return e}
function Rb(a,b,c){if(Array.isArray(b))for(var d=0;d<b.length;d++)Rb(a,String(b[d]),c);else null!=b&&c.push(a+(""===b?"":"="+encodeURIComponent(String(b))))}
function Sb(a){var b=[],c;for(c in a)Rb(c,a[c],b);return b.join("&")}
var Tb=/#|$/;function Ub(a){var b=Vb;if(b)for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&a.call(void 0,b[c],c,b)}
function Wb(){var a=[];Ub(function(b){a.push(b)});
return a}
var Vb={ta:"allow-forms",ua:"allow-modals",va:"allow-orientation-lock",wa:"allow-pointer-lock",xa:"allow-popups",ya:"allow-popups-to-escape-sandbox",za:"allow-presentation",Aa:"allow-same-origin",Ba:"allow-scripts",Ca:"allow-top-navigation",Da:"allow-top-navigation-by-user-activation"},Xb=Sa(function(){return Wb()});
function Yb(){var a=Mb(),b={};G(Xb(),function(c){a.sandbox&&a.sandbox.supports&&a.sandbox.supports(c)&&(b[c]=!0)});
return b}
;function Zb(){this.j=this.j;this.m=this.m}
Zb.prototype.j=!1;Zb.prototype.dispose=function(){this.j||(this.j=!0,this.J())};
Zb.prototype.J=function(){if(this.m)for(;this.m.length;)this.m.shift()()};var $b={};function ac(a){if(a!==$b)throw Error("Bad secret");}
;function bc(){var a="undefined"!==typeof window?window.trustedTypes:void 0;return null!==a&&void 0!==a?a:null}
;var cc;function dc(){}
function ec(a,b){ac(b);this.h=a}
x(ec,dc);ec.prototype.toString=function(){return this.h.toString()};
var fc=null===(cc=bc())||void 0===cc?void 0:cc.emptyHTML;new ec(null!==fc&&void 0!==fc?fc:"",$b);var gc;function hc(){}
function ic(a,b){ac(b);this.h=a}
x(ic,hc);ic.prototype.toString=function(){return this.h.toString()};
var jc=null===(gc=bc())||void 0===gc?void 0:gc.emptyScript;new ic(null!==jc&&void 0!==jc?jc:"",$b);function kc(){}
function lc(a,b){ac(b);this.h=a}
x(lc,kc);lc.prototype.toString=function(){return this.h};new lc("about:blank",$b);new lc("about:invalid#zTSz",$b);function mc(a){var b=C("window.location.href");null==a&&(a='Unknown Error of type "null/undefined"');if("string"===typeof a)return{message:a,name:"Unknown error",lineNumber:"Not available",fileName:b,stack:"Not available"};var c=!1;try{var d=a.lineNumber||a.line||"Not available"}catch(g){d="Not available",c=!0}try{var e=a.fileName||a.filename||a.sourceURL||B.$googDebugFname||b}catch(g){e="Not available",c=!0}b=nc(a);if(!(!c&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name)){c=a.message;if(null==
c){if(a.constructor&&a.constructor instanceof Function){if(a.constructor.name)c=a.constructor.name;else if(c=a.constructor,oc[c])c=oc[c];else{c=String(c);if(!oc[c]){var f=/function\s+([^\(]+)/m.exec(c);oc[c]=f?f[1]:"[Anonymous]"}c=oc[c]}c='Unknown Error of type "'+c+'"'}else c="Unknown Error of unknown type";"function"===typeof a.toString&&Object.prototype.toString!==a.toString&&(c+=": "+a.toString())}return{message:c,name:a.name||"UnknownError",lineNumber:d,fileName:e,stack:b||"Not available"}}a.stack=
b;return a}
function nc(a,b){b||(b={});b[pc(a)]=!0;var c=a.stack||"",d=a.Ia;d&&!b[pc(d)]&&(c+="\nCaused by: ",d.stack&&0==d.stack.indexOf(d.toString())||(c+="string"===typeof d?d:d.message+"\n"),c+=nc(d,b));return c}
function pc(a){var b="";"function"===typeof a.toString&&(b=""+a);return b+a.stack}
var oc={};function qc(a){this.h=a||{cookie:""}}
r=qc.prototype;r.isEnabled=function(){return navigator.cookieEnabled};
r.set=function(a,b,c){var d=!1;if("object"===typeof c){var e=c.Oa;d=c.secure||!1;var f=c.domain||void 0;var g=c.path||void 0;var h=c.V}if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');void 0===h&&(h=-1);this.h.cookie=a+"="+b+(f?";domain="+f:"")+(g?";path="+g:"")+(0>h?"":0==h?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(Date.now()+1E3*h)).toUTCString())+(d?";secure":"")+(null!=e?";samesite="+e:"")};
r.get=function(a,b){for(var c=a+"=",d=(this.h.cookie||"").split(";"),e=0,f;e<d.length;e++){f=ab(d[e]);if(0==f.lastIndexOf(c,0))return f.substr(c.length);if(f==a)return""}return b};
r.remove=function(a,b,c){var d=void 0!==this.get(a);this.set(a,"",{V:0,path:b,domain:c});return d};
r.isEmpty=function(){return!this.h.cookie};
r.clear=function(){for(var a=(this.h.cookie||"").split(";"),b=[],c=[],d,e,f=0;f<a.length;f++)e=ab(a[f]),d=e.indexOf("="),-1==d?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));for(a=b.length-1;0<=a;a--)this.remove(b[a])};
var rc=new qc("undefined"==typeof document?null:document);var sc=(new Date).getTime();function tc(a){if(!a)return"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));c=a.substring(0,a.indexOf("://"));if(!c)throw Error("URI is missing protocol: "+a);if("http"!==c&&"https"!==c&&"chrome-extension"!==c&&"moz-extension"!==c&&"file"!==c&&"android-app"!==c&&"chrome-search"!==c&&"chrome-untrusted"!==c&&"chrome"!==
c&&"app"!==c&&"devtools"!==c)throw Error("Invalid URI scheme in origin: "+c);a="";var d=b.indexOf(":");if(-1!=d){var e=b.substring(d+1);b=b.substring(0,d);if("http"===c&&"80"!==e||"https"===c&&"443"!==e)a=":"+e}return c+"://"+b+a}
;function uc(){function a(){e[0]=1732584193;e[1]=4023233417;e[2]=2562383102;e[3]=271733878;e[4]=3285377520;m=l=0}
function b(n){for(var p=g,q=0;64>q;q+=4)p[q/4]=n[q]<<24|n[q+1]<<16|n[q+2]<<8|n[q+3];for(q=16;80>q;q++)n=p[q-3]^p[q-8]^p[q-14]^p[q-16],p[q]=(n<<1|n>>>31)&4294967295;n=e[0];var v=e[1],w=e[2],y=e[3],N=e[4];for(q=0;80>q;q++){if(40>q)if(20>q){var ea=y^v&(w^y);var jb=1518500249}else ea=v^w^y,jb=1859775393;else 60>q?(ea=v&w|y&(v|w),jb=2400959708):(ea=v^w^y,jb=3395469782);ea=((n<<5|n>>>27)&4294967295)+ea+N+jb+p[q]&4294967295;N=y;y=w;w=(v<<30|v>>>2)&4294967295;v=n;n=ea}e[0]=e[0]+n&4294967295;e[1]=e[1]+v&4294967295;
e[2]=e[2]+w&4294967295;e[3]=e[3]+y&4294967295;e[4]=e[4]+N&4294967295}
function c(n,p){if("string"===typeof n){n=unescape(encodeURIComponent(n));for(var q=[],v=0,w=n.length;v<w;++v)q.push(n.charCodeAt(v));n=q}p||(p=n.length);q=0;if(0==l)for(;q+64<p;)b(n.slice(q,q+64)),q+=64,m+=64;for(;q<p;)if(f[l++]=n[q++],m++,64==l)for(l=0,b(f);q+64<p;)b(n.slice(q,q+64)),q+=64,m+=64}
function d(){var n=[],p=8*m;56>l?c(h,56-l):c(h,64-(l-56));for(var q=63;56<=q;q--)f[q]=p&255,p>>>=8;b(f);for(q=p=0;5>q;q++)for(var v=24;0<=v;v-=8)n[p++]=e[q]>>v&255;return n}
for(var e=[],f=[],g=[],h=[128],k=1;64>k;++k)h[k]=0;var l,m;a();return{reset:a,update:c,digest:d,fa:function(){for(var n=d(),p="",q=0;q<n.length;q++)p+="0123456789ABCDEF".charAt(Math.floor(n[q]/16))+"0123456789ABCDEF".charAt(n[q]%16);return p}}}
;function vc(a,b,c){var d=[],e=[];if(1==(Array.isArray(c)?2:1))return e=[b,a],G(d,function(h){e.push(h)}),wc(e.join(" "));
var f=[],g=[];G(c,function(h){g.push(h.key);f.push(h.value)});
c=Math.floor((new Date).getTime()/1E3);e=0==f.length?[c,b,a]:[f.join(":"),c,b,a];G(d,function(h){e.push(h)});
a=wc(e.join(" "));a=[c,a];0==g.length||a.push(g.join(""));return a.join("_")}
function wc(a){var b=uc();b.update(a);return b.fa().toLowerCase()}
;function xc(a){var b=tc(String(B.location.href)),c;(c=B.__SAPISID||B.__APISID||B.__OVERRIDE_SID)?c=!0:(c=new qc(document),c=c.get("SAPISID")||c.get("APISID")||c.get("__Secure-3PAPISID")||c.get("SID"),c=!!c);if(c&&(c=(b=0==b.indexOf("https:")||0==b.indexOf("chrome-extension:")||0==b.indexOf("moz-extension:"))?B.__SAPISID:B.__APISID,c||(c=new qc(document),c=c.get(b?"SAPISID":"APISID")||c.get("__Secure-3PAPISID")),c)){b=b?"SAPISIDHASH":"APISIDHASH";var d=String(B.location.href);return d&&c&&b?[b,vc(tc(d),
c,a||null)].join(" "):null}return null}
;function yc(){this.i=[];this.h=-1}
yc.prototype.set=function(a,b){b=void 0===b?!0:b;0<=a&&52>a&&0===a%1&&this.i[a]!=b&&(this.i[a]=b,this.h=-1)};
yc.prototype.get=function(a){return!!this.i[a]};
function zc(a){-1==a.h&&(a.h=Ma(a.i,function(b,c,d){return c?b+Math.pow(2,d):b},0));
return a.h}
;function Ac(a,b){this.j=a;this.l=b;this.i=0;this.h=null}
Ac.prototype.get=function(){if(0<this.i){this.i--;var a=this.h;this.h=a.next;a.next=null}else a=this.j();return a};
function Bc(a,b){a.l(b);100>a.i&&(a.i++,b.next=a.h,a.h=b)}
;var Cc;function Dc(){var a=B.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!I("Presto")&&(a=function(){var e=Mb();e.style.display="none";document.documentElement.appendChild(e);var f=e.contentWindow;e=f.document;e.open();e.close();var g="callImmediate"+Math.random(),h="file:"==f.location.protocol?"*":f.location.protocol+"//"+f.location.host;e=Ha(function(k){if(("*"==h||k.origin==h)&&k.data==g)this.port1.onmessage()},this);
f.addEventListener("message",e,!1);this.port1={};this.port2={postMessage:function(){f.postMessage(g,h)}}});
if("undefined"!==typeof a&&!I("Trident")&&!I("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var e=c.S;c.S=null;e()}};
return function(e){d.next={S:e};d=d.next;b.port2.postMessage(0)}}return function(e){B.setTimeout(e,0)}}
;function Ec(a){B.setTimeout(function(){throw a;},0)}
;function Fc(){this.i=this.h=null}
Fc.prototype.add=function(a,b){var c=Gc.get();c.set(a,b);this.i?this.i.next=c:this.h=c;this.i=c};
Fc.prototype.remove=function(){var a=null;this.h&&(a=this.h,this.h=this.h.next,this.h||(this.i=null),a.next=null);return a};
var Gc=new Ac(function(){return new Hc},function(a){return a.reset()});
function Hc(){this.next=this.scope=this.h=null}
Hc.prototype.set=function(a,b){this.h=a;this.scope=b;this.next=null};
Hc.prototype.reset=function(){this.next=this.scope=this.h=null};function Ic(a,b){Jc||Kc();Lc||(Jc(),Lc=!0);Mc.add(a,b)}
var Jc;function Kc(){if(B.Promise&&B.Promise.resolve){var a=B.Promise.resolve(void 0);Jc=function(){a.then(Nc)}}else Jc=function(){var b=Nc;
"function"!==typeof B.setImmediate||B.Window&&B.Window.prototype&&!I("Edge")&&B.Window.prototype.setImmediate==B.setImmediate?(Cc||(Cc=Dc()),Cc(b)):B.setImmediate(b)}}
var Lc=!1,Mc=new Fc;function Nc(){for(var a;a=Mc.remove();){try{a.h.call(a.scope)}catch(b){Ec(b)}Bc(Gc,a)}Lc=!1}
;function Oc(){this.i=-1}
;function Pc(){this.i=64;this.h=[];this.o=[];this.s=[];this.l=[];this.l[0]=128;for(var a=1;a<this.i;++a)this.l[a]=0;this.m=this.j=0;this.reset()}
F(Pc,Oc);Pc.prototype.reset=function(){this.h[0]=1732584193;this.h[1]=4023233417;this.h[2]=2562383102;this.h[3]=271733878;this.h[4]=3285377520;this.m=this.j=0};
function Qc(a,b,c){c||(c=0);var d=a.s;if("string"===typeof b)for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.h[0];c=a.h[1];var g=a.h[2],h=a.h[3],k=a.h[4];for(e=0;80>e;e++){if(40>e)if(20>e){f=h^c&(g^h);var l=1518500249}else f=c^g^h,l=1859775393;else 60>e?(f=c&g|h&(c|g),l=2400959708):
(f=c^g^h,l=3395469782);f=(b<<5|b>>>27)+f+k+l+d[e]&4294967295;k=h;h=g;g=(c<<30|c>>>2)&4294967295;c=b;b=f}a.h[0]=a.h[0]+b&4294967295;a.h[1]=a.h[1]+c&4294967295;a.h[2]=a.h[2]+g&4294967295;a.h[3]=a.h[3]+h&4294967295;a.h[4]=a.h[4]+k&4294967295}
Pc.prototype.update=function(a,b){if(null!=a){void 0===b&&(b=a.length);for(var c=b-this.i,d=0,e=this.o,f=this.j;d<b;){if(0==f)for(;d<=c;)Qc(this,a,d),d+=this.i;if("string"===typeof a)for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.i){Qc(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.i){Qc(this,e);f=0;break}}this.j=f;this.m+=b}};
Pc.prototype.digest=function(){var a=[],b=8*this.m;56>this.j?this.update(this.l,56-this.j):this.update(this.l,this.i-(this.j-56));for(var c=this.i-1;56<=c;c--)this.o[c]=b&255,b/=256;Qc(this,this.o);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.h[c]>>d&255,++b;return a};var Rc="StopIteration"in B?B.StopIteration:{message:"StopIteration",stack:""};function Sc(){}
Sc.prototype.next=function(){throw Rc;};
Sc.prototype.B=function(){return this};
function Tc(a){if(a instanceof Sc)return a;if("function"==typeof a.B)return a.B(!1);if(Ba(a)){var b=0,c=new Sc;c.next=function(){for(;;){if(b>=a.length)throw Rc;if(b in a)return a[b++];b++}};
return c}throw Error("Not implemented");}
function Uc(a,b){if(Ba(a))try{G(a,b,void 0)}catch(c){if(c!==Rc)throw c;}else{a=Tc(a);try{for(;;)b.call(void 0,a.next(),void 0,a)}catch(c){if(c!==Rc)throw c;}}}
function Vc(a){if(Ba(a))return Qa(a);a=Tc(a);var b=[];Uc(a,function(c){b.push(c)});
return b}
;function Wc(a,b){this.j={};this.h=[];this.l=this.i=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a)if(a instanceof Wc)for(c=Xc(a),d=0;d<c.length;d++)this.set(c[d],a.get(c[d]));else for(d in a)this.set(d,a[d])}
function Xc(a){Yc(a);return a.h.concat()}
r=Wc.prototype;r.equals=function(a,b){if(this===a)return!0;if(this.i!=a.i)return!1;var c=b||Zc;Yc(this);for(var d,e=0;d=this.h[e];e++)if(!c(this.get(d),a.get(d)))return!1;return!0};
function Zc(a,b){return a===b}
r.isEmpty=function(){return 0==this.i};
r.clear=function(){this.j={};this.l=this.i=this.h.length=0};
r.remove=function(a){return Object.prototype.hasOwnProperty.call(this.j,a)?(delete this.j[a],this.i--,this.l++,this.h.length>2*this.i&&Yc(this),!0):!1};
function Yc(a){if(a.i!=a.h.length){for(var b=0,c=0;b<a.h.length;){var d=a.h[b];Object.prototype.hasOwnProperty.call(a.j,d)&&(a.h[c++]=d);b++}a.h.length=c}if(a.i!=a.h.length){var e={};for(c=b=0;b<a.h.length;)d=a.h[b],Object.prototype.hasOwnProperty.call(e,d)||(a.h[c++]=d,e[d]=1),b++;a.h.length=c}}
r.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.j,a)?this.j[a]:b};
r.set=function(a,b){Object.prototype.hasOwnProperty.call(this.j,a)||(this.i++,this.h.push(a),this.l++);this.j[a]=b};
r.forEach=function(a,b){for(var c=Xc(this),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};
r.clone=function(){return new Wc(this)};
r.B=function(a){Yc(this);var b=0,c=this.l,d=this,e=new Sc;e.next=function(){if(c!=d.l)throw Error("The map has changed since the iterator was created");if(b>=d.h.length)throw Rc;var f=d.h[b++];return a?f:d.j[f]};
return e};var $c=!rb||9<=Number(Eb),ad;
if(ad=rb){var bd;if(Object.prototype.hasOwnProperty.call(Bb,"9"))bd=Bb["9"];else{for(var cd=0,dd=ab(String(Ab)).split("."),ed=ab("9").split("."),fd=Math.max(dd.length,ed.length),gd=0;0==cd&&gd<fd;gd++){var hd=dd[gd]||"",id=ed[gd]||"";do{var jd=/(\d*)(\D*)(.*)/.exec(hd)||["","","",""],kd=/(\d*)(\D*)(.*)/.exec(id)||["","","",""];if(0==jd[0].length&&0==kd[0].length)break;cd=ib(0==jd[1].length?0:parseInt(jd[1],10),0==kd[1].length?0:parseInt(kd[1],10))||ib(0==jd[2].length,0==kd[2].length)||ib(jd[2],kd[2]);
hd=jd[3];id=kd[3]}while(0==cd)}bd=Bb["9"]=0<=cd}ad=!bd}var ld=ad,md=function(){if(!B.addEventListener||!Object.defineProperty)return!1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0}});
try{B.addEventListener("test",Aa,b),B.removeEventListener("test",Aa,b)}catch(c){}return a}();function nd(a,b){this.type=a;this.h=this.target=b;this.defaultPrevented=this.i=!1}
nd.prototype.stopPropagation=function(){this.i=!0};
nd.prototype.preventDefault=function(){this.defaultPrevented=!0};function od(a,b){nd.call(this,a?a.type:"");this.relatedTarget=this.h=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=0;this.key="";this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.state=null;this.pointerId=0;this.pointerType="";this.j=null;a&&this.init(a,b)}
F(od,nd);var pd={2:"touch",3:"pen",4:"mouse"};
od.prototype.init=function(a,b){var c=this.type=a.type,d=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.h=b;var e=a.relatedTarget;if(e){if(tb){a:{try{pb(e.nodeName);var f=!0;break a}catch(g){}f=!1}f||(e=null)}}else"mouseover"==c?e=a.fromElement:"mouseout"==c&&(e=a.toElement);this.relatedTarget=e;d?(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||
0):(this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.key=a.key||"";this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.pointerId=a.pointerId||0;this.pointerType="string"===typeof a.pointerType?a.pointerType:pd[a.pointerType]||"";this.state=a.state;
this.j=a;a.defaultPrevented&&this.preventDefault()};
od.prototype.stopPropagation=function(){od.A.stopPropagation.call(this);this.j.stopPropagation?this.j.stopPropagation():this.j.cancelBubble=!0};
od.prototype.preventDefault=function(){od.A.preventDefault.call(this);var a=this.j;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,ld)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var qd="closure_listenable_"+(1E6*Math.random()|0);var rd=0;function sd(a,b,c,d,e){this.listener=a;this.h=null;this.src=b;this.type=c;this.capture=!!d;this.N=e;this.key=++rd;this.I=this.L=!1}
function td(a){a.I=!0;a.listener=null;a.h=null;a.src=null;a.N=null}
;function ud(a){this.src=a;this.listeners={};this.h=0}
ud.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.listeners[f];a||(a=this.listeners[f]=[],this.h++);var g=vd(a,b,d,e);-1<g?(b=a[g],c||(b.L=!1)):(b=new sd(b,this.src,f,!!d,e),b.L=c,a.push(b));return b};
ud.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.listeners))return!1;var e=this.listeners[a];b=vd(e,b,c,d);return-1<b?(td(e[b]),Array.prototype.splice.call(e,b,1),0==e.length&&(delete this.listeners[a],this.h--),!0):!1};
function wd(a,b){var c=b.type;c in a.listeners&&Oa(a.listeners[c],b)&&(td(b),0==a.listeners[c].length&&(delete a.listeners[c],a.h--))}
function vd(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.I&&f.listener==b&&f.capture==!!c&&f.N==d)return e}return-1}
;var xd="closure_lm_"+(1E6*Math.random()|0),yd={},zd=0;function Ad(a,b,c,d,e){if(d&&d.once)Bd(a,b,c,d,e);else if(Array.isArray(b))for(var f=0;f<b.length;f++)Ad(a,b[f],c,d,e);else c=Cd(c),a&&a[qd]?Dd(a,b,c,D(d)?!!d.capture:!!d,e):Ed(a,b,c,!1,d,e)}
function Ed(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=D(e)?!!e.capture:!!e,h=Fd(a);h||(a[xd]=h=new ud(a));c=h.add(b,c,d,g,f);if(!c.h){d=Gd();c.h=d;d.src=a;d.listener=c;if(a.addEventListener)md||(e=g),void 0===e&&(e=!1),a.addEventListener(b.toString(),d,e);else if(a.attachEvent)a.attachEvent(Hd(b.toString()),d);else if(a.addListener&&a.removeListener)a.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");zd++}}
function Gd(){var a=Id,b=$c?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);
if(!c)return c};
return b}
function Bd(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)Bd(a,b[f],c,d,e);else c=Cd(c),a&&a[qd]?a.h.add(String(b),c,!0,D(d)?!!d.capture:!!d,e):Ed(a,b,c,!0,d,e)}
function Jd(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)Jd(a,b[f],c,d,e);else(d=D(d)?!!d.capture:!!d,c=Cd(c),a&&a[qd])?a.h.remove(String(b),c,d,e):a&&(a=Fd(a))&&(b=a.listeners[b.toString()],a=-1,b&&(a=vd(b,c,d,e)),(c=-1<a?b[a]:null)&&Kd(c))}
function Kd(a){if("number"!==typeof a&&a&&!a.I){var b=a.src;if(b&&b[qd])wd(b.h,a);else{var c=a.type,d=a.h;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent?b.detachEvent(Hd(c),d):b.addListener&&b.removeListener&&b.removeListener(d);zd--;(c=Fd(b))?(wd(c,a),0==c.h&&(c.src=null,b[xd]=null)):td(a)}}}
function Hd(a){return a in yd?yd[a]:yd[a]="on"+a}
function Ld(a,b,c,d){var e=!0;if(a=Fd(a))if(b=a.listeners[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.capture==c&&!f.I&&(f=Md(f,d),e=e&&!1!==f)}return e}
function Md(a,b){var c=a.listener,d=a.N||a.src;a.L&&Kd(a);return c.call(d,b)}
function Id(a,b){if(a.I)return!0;if(!$c){var c=b||C("window.event"),d=new od(c,this),e=!0;if(!(0>c.keyCode||void 0!=c.returnValue)){a:{var f=!1;if(0==c.keyCode)try{c.keyCode=-1;break a}catch(k){f=!0}if(f||void 0==c.returnValue)c.returnValue=!0}c=[];for(f=d.h;f;f=f.parentNode)c.push(f);f=a.type;for(var g=c.length-1;!d.i&&0<=g;g--){d.h=c[g];var h=Ld(c[g],f,!0,d);e=e&&h}for(g=0;!d.i&&g<c.length;g++)d.h=c[g],h=Ld(c[g],f,!1,d),e=e&&h}return e}return Md(a,new od(b,this))}
function Fd(a){a=a[xd];return a instanceof ud?a:null}
var Nd="__closure_events_fn_"+(1E9*Math.random()>>>0);function Cd(a){if("function"===typeof a)return a;a[Nd]||(a[Nd]=function(b){return a.handleEvent(b)});
return a[Nd]}
;function L(){Zb.call(this);this.h=new ud(this);this.D=this;this.o=null}
F(L,Zb);L.prototype[qd]=!0;L.prototype.addEventListener=function(a,b,c,d){Ad(this,a,b,c,d)};
L.prototype.removeEventListener=function(a,b,c,d){Jd(this,a,b,c,d)};
function Od(a,b){var c=a.o;if(c){var d=[];for(var e=1;c;c=c.o)d.push(c),++e}c=a.D;e=b;var f=e.type||e;if("string"===typeof e)e=new nd(e,c);else if(e instanceof nd)e.target=e.target||c;else{var g=e;e=new nd(f,c);Za(e,g)}g=!0;if(d)for(var h=d.length-1;!e.i&&0<=h;h--){var k=e.h=d[h];g=Pd(k,f,!0,e)&&g}e.i||(k=e.h=c,g=Pd(k,f,!0,e)&&g,e.i||(g=Pd(k,f,!1,e)&&g));if(d)for(h=0;!e.i&&h<d.length;h++)k=e.h=d[h],g=Pd(k,f,!1,e)&&g}
L.prototype.J=function(){L.A.J.call(this);if(this.h){var a=this.h,b=0,c;for(c in a.listeners){for(var d=a.listeners[c],e=0;e<d.length;e++)++b,td(d[e]);delete a.listeners[c];a.h--}}this.o=null};
function Dd(a,b,c,d,e){a.h.add(String(b),c,!1,d,e)}
function Pd(a,b,c,d){b=a.h.listeners[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.I&&g.capture==c){var h=g.listener,k=g.N||g.src;g.L&&wd(a.h,g);e=!1!==h.call(k,d)&&e}}return e&&!d.defaultPrevented}
;var Qd=B.JSON.stringify;function M(a){this.h=0;this.s=void 0;this.l=this.i=this.j=null;this.m=this.o=!1;if(a!=Aa)try{var b=this;a.call(void 0,function(c){Rd(b,2,c)},function(c){Rd(b,3,c)})}catch(c){Rd(this,3,c)}}
function Sd(){this.next=this.context=this.onRejected=this.i=this.h=null;this.j=!1}
Sd.prototype.reset=function(){this.context=this.onRejected=this.i=this.h=null;this.j=!1};
var Td=new Ac(function(){return new Sd},function(a){a.reset()});
function Ud(a,b,c){var d=Td.get();d.i=a;d.onRejected=b;d.context=c;return d}
M.prototype.then=function(a,b,c){return Vd(this,"function"===typeof a?a:null,"function"===typeof b?b:null,c)};
M.prototype.$goog_Thenable=!0;M.prototype.cancel=function(a){if(0==this.h){var b=new Wd(a);Ic(function(){Xd(this,b)},this)}};
function Xd(a,b){if(0==a.h)if(a.j){var c=a.j;if(c.i){for(var d=0,e=null,f=null,g=c.i;g&&(g.j||(d++,g.h==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.h&&1==d?Xd(c,b):(f?(d=f,d.next==c.l&&(c.l=d),d.next=d.next.next):Yd(c),Zd(c,e,3,b)))}a.j=null}else Rd(a,3,b)}
function $d(a,b){a.i||2!=a.h&&3!=a.h||ae(a);a.l?a.l.next=b:a.i=b;a.l=b}
function Vd(a,b,c,d){var e=Ud(null,null,null);e.h=new M(function(f,g){e.i=b?function(h){try{var k=b.call(d,h);f(k)}catch(l){g(l)}}:f;
e.onRejected=c?function(h){try{var k=c.call(d,h);void 0===k&&h instanceof Wd?g(h):f(k)}catch(l){g(l)}}:g});
e.h.j=a;$d(a,e);return e.h}
M.prototype.D=function(a){this.h=0;Rd(this,2,a)};
M.prototype.G=function(a){this.h=0;Rd(this,3,a)};
function Rd(a,b,c){if(0==a.h){a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.h=1;a:{var d=c,e=a.D,f=a.G;if(d instanceof M){$d(d,Ud(e||Aa,f||null,a));var g=!0}else{if(d)try{var h=!!d.$goog_Thenable}catch(l){h=!1}else h=!1;if(h)d.then(e,f,a),g=!0;else{if(D(d))try{var k=d.then;if("function"===typeof k){be(d,k,e,f,a);g=!0;break a}}catch(l){f.call(a,l);g=!0;break a}g=!1}}}g||(a.s=c,a.h=b,a.j=null,ae(a),3!=b||c instanceof Wd||ce(a,c))}}
function be(a,b,c,d,e){function f(k){h||(h=!0,d.call(e,k))}
function g(k){h||(h=!0,c.call(e,k))}
var h=!1;try{b.call(a,g,f)}catch(k){f(k)}}
function ae(a){a.o||(a.o=!0,Ic(a.u,a))}
function Yd(a){var b=null;a.i&&(b=a.i,a.i=b.next,b.next=null);a.i||(a.l=null);return b}
M.prototype.u=function(){for(var a;a=Yd(this);)Zd(this,a,this.h,this.s);this.o=!1};
function Zd(a,b,c,d){if(3==c&&b.onRejected&&!b.j)for(;a&&a.m;a=a.j)a.m=!1;if(b.h)b.h.j=null,de(b,c,d);else try{b.j?b.i.call(b.context):de(b,c,d)}catch(e){ee.call(null,e)}Bc(Td,b)}
function de(a,b,c){2==b?a.i.call(a.context,c):a.onRejected&&a.onRejected.call(a.context,c)}
function ce(a,b){a.m=!0;Ic(function(){a.m&&ee.call(null,b)})}
var ee=Ec;function Wd(a){Ka.call(this,a)}
F(Wd,Ka);Wd.prototype.name="cancel";function O(a){Zb.call(this);this.s=1;this.l=[];this.o=0;this.h=[];this.i={};this.u=!!a}
F(O,Zb);r=O.prototype;r.subscribe=function(a,b,c){var d=this.i[a];d||(d=this.i[a]=[]);var e=this.s;this.h[e]=a;this.h[e+1]=b;this.h[e+2]=c;this.s=e+3;d.push(e);return e};
function fe(a,b,c){var d=ge;if(a=d.i[a]){var e=d.h;(a=Na(a,function(f){return e[f+1]==b&&e[f+2]==c}))&&d.K(a)}}
r.K=function(a){var b=this.h[a];if(b){var c=this.i[b];0!=this.o?(this.l.push(a),this.h[a+1]=Aa):(c&&Oa(c,a),delete this.h[a],delete this.h[a+1],delete this.h[a+2])}return!!b};
r.H=function(a,b){var c=this.i[a];if(c){for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];if(this.u)for(e=0;e<c.length;e++){var g=c[e];he(this.h[g+1],this.h[g+2],d)}else{this.o++;try{for(e=0,f=c.length;e<f;e++)g=c[e],this.h[g+1].apply(this.h[g+2],d)}finally{if(this.o--,0<this.l.length&&0==this.o)for(;c=this.l.pop();)this.K(c)}}return 0!=e}return!1};
function he(a,b,c){Ic(function(){a.apply(b,c)})}
r.clear=function(a){if(a){var b=this.i[a];b&&(G(b,this.K,this),delete this.i[a])}else this.h.length=0,this.i={}};
r.J=function(){O.A.J.call(this);this.clear();this.l.length=0};function ie(a){this.h=a}
ie.prototype.set=function(a,b){void 0===b?this.h.remove(a):this.h.set(a,Qd(b))};
ie.prototype.get=function(a){try{var b=this.h.get(a)}catch(c){return}if(null!==b)try{return JSON.parse(b)}catch(c){throw"Storage: Invalid value was encountered";}};
ie.prototype.remove=function(a){this.h.remove(a)};function je(a){this.h=a}
F(je,ie);function ke(a){this.data=a}
function le(a){return void 0===a||a instanceof ke?a:new ke(a)}
je.prototype.set=function(a,b){je.A.set.call(this,a,le(b))};
je.prototype.i=function(a){a=je.A.get.call(this,a);if(void 0===a||a instanceof Object)return a;throw"Storage: Invalid value was encountered";};
je.prototype.get=function(a){if(a=this.i(a)){if(a=a.data,void 0===a)throw"Storage: Invalid value was encountered";}else a=void 0;return a};function me(a){this.h=a}
F(me,je);me.prototype.set=function(a,b,c){if(b=le(b)){if(c){if(c<Date.now()){me.prototype.remove.call(this,a);return}b.expiration=c}b.creation=Date.now()}me.A.set.call(this,a,b)};
me.prototype.i=function(a){var b=me.A.i.call(this,a);if(b){var c=b.creation,d=b.expiration;if(d&&d<Date.now()||c&&c>Date.now())me.prototype.remove.call(this,a);else return b}};function ne(){}
;function oe(){}
F(oe,ne);oe.prototype.clear=function(){var a=Vc(this.B(!0)),b=this;G(a,function(c){b.remove(c)})};function pe(a){this.h=a}
F(pe,oe);r=pe.prototype;r.isAvailable=function(){if(!this.h)return!1;try{return this.h.setItem("__sak","1"),this.h.removeItem("__sak"),!0}catch(a){return!1}};
r.set=function(a,b){try{this.h.setItem(a,b)}catch(c){if(0==this.h.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
r.get=function(a){a=this.h.getItem(a);if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
r.remove=function(a){this.h.removeItem(a)};
r.B=function(a){var b=0,c=this.h,d=new Sc;d.next=function(){if(b>=c.length)throw Rc;var e=c.key(b++);if(a)return e;e=c.getItem(e);if("string"!==typeof e)throw"Storage mechanism: Invalid value was encountered";return e};
return d};
r.clear=function(){this.h.clear()};
r.key=function(a){return this.h.key(a)};function qe(){var a=null;try{a=window.localStorage||null}catch(b){}this.h=a}
F(qe,pe);function re(a,b){this.i=a;this.h=null;if(rb&&!(9<=Number(Eb))){se||(se=new Wc);this.h=se.get(a);this.h||(b?this.h=document.getElementById(b):(this.h=document.createElement("userdata"),this.h.addBehavior("#default#userData"),document.body.appendChild(this.h)),se.set(a,this.h));try{this.h.load(this.i)}catch(c){this.h=null}}}
F(re,oe);var te={".":".2E","!":".21","~":".7E","*":".2A","'":".27","(":".28",")":".29","%":"."},se=null;function ue(a){return"_"+encodeURIComponent(a).replace(/[.!~*'()%]/g,function(b){return te[b]})}
r=re.prototype;r.isAvailable=function(){return!!this.h};
r.set=function(a,b){this.h.setAttribute(ue(a),b);ve(this)};
r.get=function(a){a=this.h.getAttribute(ue(a));if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
r.remove=function(a){this.h.removeAttribute(ue(a));ve(this)};
r.B=function(a){var b=0,c=this.h.XMLDocument.documentElement.attributes,d=new Sc;d.next=function(){if(b>=c.length)throw Rc;var e=c[b++];if(a)return decodeURIComponent(e.nodeName.replace(/\./g,"%")).substr(1);e=e.nodeValue;if("string"!==typeof e)throw"Storage mechanism: Invalid value was encountered";return e};
return d};
r.clear=function(){for(var a=this.h.XMLDocument.documentElement,b=a.attributes.length;0<b;b--)a.removeAttribute(a.attributes[b-1].nodeName);ve(this)};
function ve(a){try{a.h.save(a.i)}catch(b){throw"Storage mechanism: Quota exceeded";}}
;function we(a,b){this.i=a;this.h=b+"::"}
F(we,oe);we.prototype.set=function(a,b){this.i.set(this.h+a,b)};
we.prototype.get=function(a){return this.i.get(this.h+a)};
we.prototype.remove=function(a){this.i.remove(this.h+a)};
we.prototype.B=function(a){var b=this.i.B(!0),c=this,d=new Sc;d.next=function(){for(var e=b.next();e.substr(0,c.h.length)!=c.h;)e=b.next();return a?e.substr(c.h.length):c.i.get(e)};
return d};var xe=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};E("yt.config_",xe);function ye(a){var b=arguments;1<b.length?xe[b[0]]=b[1]:1===b.length&&Object.assign(xe,b[0])}
function P(a,b){return a in xe?xe[a]:b}
;var ze=[];function Ae(a){ze.forEach(function(b){return b(a)})}
function Be(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){Ce(b),Ae(b)}}:a}
function Ce(a){var b=C("yt.logging.errors.log");b?b(a,"ERROR",void 0,void 0,void 0):(b=P("ERRORS",[]),b.push([a,"ERROR",void 0,void 0,void 0]),ye("ERRORS",b))}
function De(a){var b=C("yt.logging.errors.log");b?b(a,"WARNING",void 0,void 0,void 0):(b=P("ERRORS",[]),b.push([a,"WARNING",void 0,void 0,void 0]),ye("ERRORS",b))}
;var Ee=0;E("ytDomDomGetNextId",C("ytDomDomGetNextId")||function(){return++Ee});var Fe={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,screenX:1,screenY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};
function Ge(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.ctrlKey=this.altKey=!1;this.clientY=this.clientX=0;this.changedTouches=this.touches=null;try{if(a=a||window.event){this.event=a;for(var b in a)b in Fe||(this[b]=a[b]);var c=a.target||a.srcElement;c&&3==c.nodeType&&(c=c.parentNode);this.target=c;var d=a.relatedTarget;if(d)try{d=d.nodeName?d:null}catch(e){d=null}else"mouseover"==
this.type?d=a.fromElement:"mouseout"==this.type&&(d=a.toElement);this.relatedTarget=d;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey}}catch(e){}}
Ge.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
Ge.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
Ge.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};var Va=B.ytEventsEventsListeners||{};E("ytEventsEventsListeners",Va);var He=B.ytEventsEventsCounter||{count:0};E("ytEventsEventsCounter",He);
function Ie(a,b,c,d){d=void 0===d?{}:d;a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return Ua(function(e){var f="boolean"===typeof e[4]&&e[4]==!!d,g=D(e[4])&&D(d)&&Wa(e[4],d);return!!e.length&&e[0]==a&&e[1]==b&&e[2]==c&&(f||g)})}
function Je(a){a&&("string"==typeof a&&(a=[a]),G(a,function(b){if(b in Va){var c=Va[b],d=c[0],e=c[1],f=c[3];c=c[4];d.removeEventListener?Ke()||"boolean"===typeof c?d.removeEventListener(e,f,c):d.removeEventListener(e,f,!!c.capture):d.detachEvent&&d.detachEvent("on"+e,f);delete Va[b]}}))}
var Ke=Sa(function(){var a=!1;try{var b=Object.defineProperty({},"capture",{get:function(){a=!0}});
window.addEventListener("test",null,b)}catch(c){}return a});
function Le(a,b,c){var d=void 0===d?{}:d;if(a&&(a.addEventListener||a.attachEvent)){var e=Ie(a,b,c,d);if(!e){e=++He.count+"";var f=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document);var g=f?function(h){h=new Ge(h);if(!Nb(h.relatedTarget,function(k){return k==a}))return h.currentTarget=a,h.type=b,c.call(a,h)}:function(h){h=new Ge(h);
h.currentTarget=a;return c.call(a,h)};
g=Be(g);a.addEventListener?("mouseenter"==b&&f?b="mouseover":"mouseleave"==b&&f?b="mouseout":"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),Ke()||"boolean"===typeof d?a.addEventListener(b,g,d):a.addEventListener(b,g,!!d.capture)):a.attachEvent("on"+b,g);Va[e]=[a,b,c,g,d]}}}
;function Me(a,b){"function"===typeof a&&(a=Be(a));return window.setTimeout(a,b)}
function Ne(a){"function"===typeof a&&(a=Be(a));return window.setInterval(a,250)}
;var Oe=/^[\w.]*$/,Pe={q:!0,search_query:!0};function Qe(a,b){for(var c=a.split(b),d={},e=0,f=c.length;e<f;e++){var g=c[e].split("=");if(1==g.length&&g[0]||2==g.length)try{var h=Re(g[0]||""),k=Re(g[1]||"");h in d?Array.isArray(d[h])?Ra(d[h],k):d[h]=[d[h],k]:d[h]=k}catch(p){var l=p,m=g[0],n=String(Qe);l.args=[{key:m,value:g[1],query:a,method:Se==n?"unchanged":n}];Pe.hasOwnProperty(m)||("ReferenceError"===l.name?De(l):Ce(l))}}return d}
var Se=String(Qe);function Te(a){var b=[];Ta(a,function(c,d){var e=encodeURIComponent(String(d)),f;Array.isArray(c)?f=c:f=[c];G(f,function(g){""==g?b.push(e):b.push(e+"="+encodeURIComponent(String(g)))})});
return b.join("&")}
function Ue(a){"?"==a.charAt(0)&&(a=a.substr(1));return Qe(a,"&")}
function Ve(a,b,c){var d=a.split("#",2);a=d[0];d=1<d.length?"#"+d[1]:"";var e=a.split("?",2);a=e[0];e=Ue(e[1]||"");for(var f in b)!c&&null!==e&&f in e||(e[f]=b[f]);b=a;a=Sb(e);a?(c=b.indexOf("#"),0>c&&(c=b.length),f=b.indexOf("?"),0>f||f>c?(f=c,e=""):e=b.substring(f+1,c),b=[b.substr(0,f),e,b.substr(c)],c=b[1],b[1]=a?c?c+"&"+a:a:c,a=b[0]+(b[1]?"?"+b[1]:"")+b[2]):a=b;return a+d}
function Re(a){return a&&a.match(Oe)?a:decodeURIComponent(a.replace(/\+/g," "))}
;var We={};function Xe(a){return We[a]||(We[a]=String(a).replace(/\-([a-z])/g,function(b,c){return c.toUpperCase()}))}
;var Ye={},Ze=[],ge=new O,$e={};function af(){for(var a=u(Ze),b=a.next();!b.done;b=a.next())b=b.value,b()}
function bf(a,b){var c;"yt:"==a.tagName.toLowerCase().substr(0,3)?c=a.getAttribute(b):c=a?a.dataset?a.dataset[Xe(b)]:a.getAttribute("data-"+b):null;return c}
function cf(a,b){ge.H.apply(ge,arguments)}
;function df(a){this.i=a||{};this.j=this.h=!1;a=document.getElementById("www-widgetapi-script");if(this.h=!!("https:"==document.location.protocol||a&&0==a.src.indexOf("https:"))){a=[this.i,window.YTConfig||{}];for(var b=0;b<a.length;b++)a[b].host&&(a[b].host=a[b].host.replace("http://","https://"))}}
function Q(a,b){for(var c=[a.i,window.YTConfig||{}],d=0;d<c.length;d++){var e=c[d][b];if(void 0!=e)return e}return null}
function ef(a,b,c){ff||(ff={},Le(window,"message",Ha(a.l,a)));ff[c]=b}
df.prototype.l=function(a){if(a.origin==Q(this,"host")||a.origin==Q(this,"host").replace(/^http:/,"https:")){try{var b=JSON.parse(a.data)}catch(c){return}this.j=!0;this.h||0!=a.origin.indexOf("https:")||(this.h=!0);if(a=ff[b.id])a.u=!0,a.u&&(G(a.s,a.R,a),a.s.length=0),a.Y(b)}};
var ff=null;function R(a){a=gf(a);return"string"===typeof a&&"false"===a?!1:!!a}
function hf(a,b){var c=gf(a);return void 0===c&&void 0!==b?b:Number(c||0)}
function gf(a){var b=P("EXPERIMENTS_FORCED_FLAGS",{});return void 0!==b[a]?b[a]:P("EXPERIMENT_FLAGS",{})[a]}
;function jf(){}
function kf(a,b){return lf(a,1,b)}
;function mf(){jf.apply(this,arguments)}
x(mf,jf);function lf(a,b,c){void 0!==c&&Number.isNaN(Number(c))&&(c=void 0);var d=C("yt.scheduler.instance.addJob");return d?d(a,b,c):void 0===c?(a(),NaN):Me(a,c||0)}
function nf(a){if(void 0===a||!Number.isNaN(Number(a))){var b=C("yt.scheduler.instance.cancelJob");b?b(a):window.clearTimeout(a)}}
mf.prototype.start=function(){var a=C("yt.scheduler.instance.start");a&&a()};
mf.h=void 0;mf.i=function(){mf.h||(mf.h=new mf)};
mf.i();var of=B.ytPubsubPubsubInstance||new O,pf=B.ytPubsubPubsubSubscribedKeys||{},qf=B.ytPubsubPubsubTopicToKeys||{},rf=B.ytPubsubPubsubIsSynchronous||{};O.prototype.subscribe=O.prototype.subscribe;O.prototype.unsubscribeByKey=O.prototype.K;O.prototype.publish=O.prototype.H;O.prototype.clear=O.prototype.clear;E("ytPubsubPubsubInstance",of);E("ytPubsubPubsubTopicToKeys",qf);E("ytPubsubPubsubIsSynchronous",rf);E("ytPubsubPubsubSubscribedKeys",pf);var S=window,T=S.ytcsi&&S.ytcsi.now?S.ytcsi.now:S.performance&&S.performance.timing&&S.performance.now&&S.performance.timing.navigationStart?function(){return S.performance.timing.navigationStart+S.performance.now()}:function(){return(new Date).getTime()};var sf=hf("initial_gel_batch_timeout",1E3),tf=Math.pow(2,16)-1,uf=null,vf=0,wf=void 0,xf=0,yf=0,zf=0,Af=!0,Bf=B.ytLoggingTransportGELQueue_||new Map;E("ytLoggingTransportGELQueue_",Bf);var Cf=B.ytLoggingTransportTokensToCttTargetIds_||{};E("ytLoggingTransportTokensToCttTargetIds_",Cf);function Df(a){a=void 0===a?!1:a;return new M(function(b){window.clearTimeout(xf);window.clearTimeout(yf);yf=0;wf&&wf.isReady()?(Ef(b,a),Bf.clear()):(Ff(),b())})}
function Ff(){R("web_gel_timeout_cap")&&!yf&&(yf=Me(Df,6E4));window.clearTimeout(xf);var a=P("LOGGING_BATCH_TIMEOUT",hf("web_gel_debounce_ms",1E4));R("shorten_initial_gel_batch_timeout")&&Af&&(a=sf);xf=Me(Df,a)}
function Ef(a,b){var c=wf;b=void 0===b?!1:b;for(var d=Math.round(T()),e=Bf.size,f=u(Bf),g=f.next();!g.done;g=f.next()){var h=u(g.value);g=h.next().value;var k=h.next().value;h=Xa({context:Gf(c.h||Hf())});h.events=k;(k=Cf[g])&&If(h,g,k);delete Cf[g];Jf(h,d);Kf(c,"log_event",h,{retry:!0,onSuccess:function(){e--;e||a();vf=Math.round(T()-d)},
onError:function(){e--;e||a()},
sa:b});Af=!1}}
function Jf(a,b){a.requestTimeMs=String(b);R("unsplit_gel_payloads_in_logs")&&(a.unsplitGelPayloadsInLogs=!0);var c=P("EVENT_ID",void 0);if(c){var d=P("BATCH_CLIENT_COUNTER",void 0)||0;!d&&R("web_client_counter_random_seed")&&(d=Math.floor(Math.random()*tf/2));d++;d>tf&&(d=1);ye("BATCH_CLIENT_COUNTER",d);c={serializedEventId:c,clientCounter:String(d)};a.serializedClientEventId=c;uf&&vf&&R("log_gel_rtt_web")&&(a.previousBatchInfo={serializedClientEventId:uf,roundtripMs:String(vf)});uf=c;vf=0}}
function If(a,b,c){if(c.videoId)var d="VIDEO";else if(c.playlistId)d="PLAYLIST";else return;a.credentialTransferTokenTargetId=c;a.context=a.context||{};a.context.user=a.context.user||{};a.context.user.credentialTransferTokens=[{token:b,scope:d}]}
;var Lf=B.ytLoggingGelSequenceIdObj_||{};E("ytLoggingGelSequenceIdObj_",Lf);function Mf(a){var b=Nf;a=void 0===a?C("yt.ads.biscotti.lastId_")||"":a;var c=Object,d=c.assign,e={};e.dt=sc;e.flash="0";a:{try{var f=b.h.top.location.href}catch(N){f=2;break a}f=f?f===b.i.location.href?0:1:2}e=(e.frm=f,e);e.u_tz=-(new Date).getTimezoneOffset();var g=void 0===g?J:g;try{var h=g.history.length}catch(N){h=0}e.u_his=h;e.u_java=!!J.navigator&&"unknown"!==typeof J.navigator.javaEnabled&&!!J.navigator.javaEnabled&&J.navigator.javaEnabled();J.screen&&(e.u_h=J.screen.height,e.u_w=J.screen.width,
e.u_ah=J.screen.availHeight,e.u_aw=J.screen.availWidth,e.u_cd=J.screen.colorDepth);J.navigator&&J.navigator.plugins&&(e.u_nplug=J.navigator.plugins.length);J.navigator&&J.navigator.mimeTypes&&(e.u_nmime=J.navigator.mimeTypes.length);h=b.h;try{var k=h.screenX;var l=h.screenY}catch(N){}try{var m=h.outerWidth;var n=h.outerHeight}catch(N){}try{var p=h.innerWidth;var q=h.innerHeight}catch(N){}k=[h.screenLeft,h.screenTop,k,l,h.screen?h.screen.availWidth:void 0,h.screen?h.screen.availTop:void 0,m,n,p,q];
l=b.h.top;try{var v=(l||window).document,w="CSS1Compat"==v.compatMode?v.documentElement:v.body;var y=(new Lb(w.clientWidth,w.clientHeight)).round()}catch(N){y=new Lb(-12245933,-12245933)}v=y;y={};w=new yc;B.SVGElement&&B.document.createElementNS&&w.set(0);l=Yb();l["allow-top-navigation-by-user-activation"]&&w.set(1);l["allow-popups-to-escape-sandbox"]&&w.set(2);B.crypto&&B.crypto.subtle&&w.set(3);B.TextDecoder&&B.TextEncoder&&w.set(4);w=zc(w);y.bc=w;y.bih=v.height;y.biw=v.width;y.brdim=k.join();b=
b.i;b=(y.vis={visible:1,hidden:2,prerender:3,preview:4,unloaded:5}[b.visibilityState||b.webkitVisibilityState||b.mozVisibilityState||""]||0,y.wgl=!!J.WebGLRenderingContext,y);c=d.call(c,e,b);c.ca_type="image";a&&(c.bid=a);return c}
var Nf=new function(){var a=window.document;this.h=window;this.i=a};
E("yt.ads_.signals_.getAdSignalsString",function(a){return Te(Mf(a))});var Of="XMLHttpRequest"in B?function(){return new XMLHttpRequest}:null;
function Pf(){if(!Of)return null;var a=Of();return"open"in a?a:null}
;var Qf={Authorization:"AUTHORIZATION","X-Goog-Visitor-Id":"SANDBOXED_VISITOR_ID","X-Youtube-Chrome-Connected":"CHROME_CONNECTED_HEADER","X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-YouTube-Delegation-Context":"INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT","X-YouTube-Device":"DEVICE","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL","X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM"},
Rf="app debugcss debugjs expflag force_ad_params force_viral_ad_response_params forced_experiments innertube_snapshots innertube_goldens internalcountrycode internalipoverride absolute_experiments conditional_experiments sbb sr_bns_address client_dev_root_url".split(" "),Sf=!1;
function Tf(a,b){b=void 0===b?{}:b;if(!c)var c=window.location.href;var d=a.match(Ob)[1]||null,e=K(a);d&&e?(d=c,c=a.match(Ob),d=d.match(Ob),c=c[3]==d[3]&&c[1]==d[1]&&c[4]==d[4]):c=e?K(c)==e&&(Number(c.match(Ob)[4]||null)||null)==(Number(a.match(Ob)[4]||null)||null):!0;d=R("web_ajax_ignore_global_headers_if_set");for(var f in Qf)e=P(Qf[f]),!e||!c&&K(a)||d&&void 0!==b[f]||(b[f]=e);if(c||!K(a))b["X-YouTube-Utc-Offset"]=String(-(new Date).getTimezoneOffset());(c||!K(a))&&(f="undefined"!=typeof Intl?(new Intl.DateTimeFormat).resolvedOptions().timeZone:
null)&&(b["X-YouTube-Time-Zone"]=f);if(c||!K(a))b["X-YouTube-Ad-Signals"]=Te(Mf(void 0));return b}
function Uf(a){var b=window.location.search,c=K(a),d=Pb(a.match(Ob)[5]||null);d=(c=c&&(c.endsWith("youtube.com")||c.endsWith("youtube-nocookie.com")))&&d&&d.startsWith("/api/");if(!c||d)return a;var e=Ue(b),f={};G(Rf,function(g){e[g]&&(f[g]=e[g])});
return Ve(a,f||{},!1)}
function Vf(a,b){if(window.fetch&&"XML"!=b.format){var c={method:b.method||"GET",credentials:"same-origin"};b.headers&&(c.headers=b.headers);a=Wf(a,b);var d=Xf(a,b);d&&(c.body=d);b.withCredentials&&(c.credentials="include");var e=!1,f;fetch(a,c).then(function(g){if(!e){e=!0;f&&window.clearTimeout(f);var h=g.ok,k=function(l){l=l||{};var m=b.context||B;h?b.onSuccess&&b.onSuccess.call(m,l,g):b.onError&&b.onError.call(m,l,g);b.onFinish&&b.onFinish.call(m,l,g)};
"JSON"==(b.format||"JSON")&&(h||400<=g.status&&500>g.status)?g.json().then(k,function(){k(null)}):k(null)}});
b.onFetchTimeout&&0<b.timeout&&(f=Me(function(){e||(e=!0,window.clearTimeout(f),b.onFetchTimeout.call(b.context||B))},b.timeout))}else Yf(a,b)}
function Yf(a,b){var c=b.format||"JSON";a=Wf(a,b);var d=Xf(a,b),e=!1,f=Zf(a,function(k){if(!e){e=!0;h&&window.clearTimeout(h);a:switch(k&&"status"in k?k.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:var l=!0;break a;default:l=!1}var m=null,n=400<=k.status&&500>k.status,p=500<=k.status&&600>k.status;if(l||n||p)m=$f(a,c,k,b.convertToSafeHtml);if(l)a:if(k&&204==k.status)l=!0;else{switch(c){case "XML":l=0==parseInt(m&&m.return_code,10);break a;case "RAW":l=!0;break a}l=
!!m}m=m||{};n=b.context||B;l?b.onSuccess&&b.onSuccess.call(n,k,m):b.onError&&b.onError.call(n,k,m);b.onFinish&&b.onFinish.call(n,k,m)}},b.method,d,b.headers,b.responseType,b.withCredentials);
if(b.onTimeout&&0<b.timeout){var g=b.onTimeout;var h=Me(function(){e||(e=!0,f.abort(),window.clearTimeout(h),g.call(b.context||B,f))},b.timeout)}}
function Wf(a,b){b.includeDomain&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var c=P("XSRF_FIELD_NAME",void 0),d=b.urlParams;d&&(d[c]&&delete d[c],a=Ve(a,d||{},!0));return a}
function Xf(a,b){var c=P("XSRF_FIELD_NAME",void 0),d=P("XSRF_TOKEN",void 0),e=b.postBody||"",f=b.postParams,g=P("XSRF_FIELD_NAME",void 0),h;b.headers&&(h=b.headers["Content-Type"]);b.excludeXsrf||K(a)&&!b.withCredentials&&K(a)!=document.location.hostname||"POST"!=b.method||h&&"application/x-www-form-urlencoded"!=h||b.postParams&&b.postParams[g]||(f||(f={}),f[c]=d);f&&"string"===typeof e&&(e=Ue(e),Za(e,f),e=b.postBodyFormat&&"JSON"==b.postBodyFormat?JSON.stringify(e):Sb(e));if(!(c=e)&&(c=f)){a:{for(var k in f){f=
!1;break a}f=!0}c=!f}!Sf&&c&&"POST"!=b.method&&(Sf=!0,Ce(Error("AJAX request with postData should use POST")));return e}
function $f(a,b,c,d){var e=null;switch(b){case "JSON":try{var f=c.responseText}catch(g){throw d=Error("Error reading responseText"),d.params=a,De(d),g;}a=c.getResponseHeader("Content-Type")||"";f&&0<=a.indexOf("json")&&(")]}'\n"===f.substring(0,5)&&(f=f.substring(5)),e=JSON.parse(f));break;case "XML":if(a=(a=c.responseXML)?ag(a):null)e={},G(a.getElementsByTagName("*"),function(g){e[g.tagName]=bg(g)})}d&&cg(e);
return e}
function cg(a){if(D(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);if(c){c=b;var d=a[b];if(void 0===$a){var e=null;var f=B.trustedTypes;if(f&&f.createPolicy){try{e=f.createPolicy("goog#html",{createHTML:Ia,createScript:Ia,createScriptURL:Ia})}catch(g){B.console&&B.console.error(g.message)}$a=e}else $a=e}d=(e=$a)?e.createHTML(d):d;a[c]=new mb(d)}else cg(a[b])}}
function ag(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
function bg(a){var b="";G(a.childNodes,function(c){b+=c.nodeValue});
return b}
function Zf(a,b,c,d,e,f,g){function h(){4==(k&&"readyState"in k?k.readyState:0)&&b&&Be(b)(k)}
c=void 0===c?"GET":c;d=void 0===d?"":d;var k=Pf();if(!k)return null;"onloadend"in k?k.addEventListener("loadend",h,!1):k.onreadystatechange=h;R("debug_forward_web_query_parameters")&&(a=Uf(a));k.open(c,a,!0);f&&(k.responseType=f);g&&(k.withCredentials=!0);c="POST"==c&&(void 0===window.FormData||!(d instanceof FormData));if(e=Tf(a,e))for(var l in e)k.setRequestHeader(l,e[l]),"content-type"==l.toLowerCase()&&(c=!1);c&&k.setRequestHeader("Content-Type","application/x-www-form-urlencoded");k.send(d);
return k}
;function dg(){return"INNERTUBE_API_KEY"in xe&&"INNERTUBE_API_VERSION"in xe}
function Hf(){return{innertubeApiKey:P("INNERTUBE_API_KEY",void 0),innertubeApiVersion:P("INNERTUBE_API_VERSION",void 0),ga:P("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),ha:P("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),innertubeContextClientVersion:P("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0),ja:P("INNERTUBE_CONTEXT_HL",void 0),ia:P("INNERTUBE_CONTEXT_GL",void 0),ka:P("INNERTUBE_HOST_OVERRIDE",void 0)||"",ma:!!P("INNERTUBE_USE_THIRD_PARTY_AUTH",!1),la:!!P("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT",
!1),appInstallData:P("SERIALIZED_CLIENT_CONFIG_DATA",void 0)}}
function Gf(a){var b={client:{hl:a.ja,gl:a.ia,clientName:a.ha,clientVersion:a.innertubeContextClientVersion,configInfo:a.ga}},c=window.devicePixelRatio;c&&1!=c&&(b.client.screenDensityFloat=String(c));c=P("EXPERIMENTS_TOKEN","");""!==c&&(b.client.experimentsToken=c);c=[];var d=P("EXPERIMENTS_FORCED_FLAGS",{});for(e in d)c.push({key:e,value:String(d[e])});var e=P("EXPERIMENT_FLAGS",{});for(var f in e)f.startsWith("force_")&&void 0===d[f]&&c.push({key:f,value:String(e[f])});0<c.length&&(b.request={internalExperimentFlags:c});
a.appInstallData&&R("web_log_app_install_experiments")&&(b.client.configInfo=b.client.configInfo||{},b.client.configInfo.appInstallData=a.appInstallData);P("DELEGATED_SESSION_ID")&&!R("pageid_as_header_web")&&(b.user={onBehalfOfUser:P("DELEGATED_SESSION_ID")});a=Object;f=a.assign;e=b.client;c={};d=u(Object.entries(Ue(P("DEVICE",""))));for(var g=d.next();!g.done;g=d.next()){var h=u(g.value);g=h.next().value;h=h.next().value;"cbrand"===g?c.deviceMake=h:"cmodel"===g?c.deviceModel=h:"cbr"===g?c.browserName=
h:"cbrver"===g?c.browserVersion=h:"cos"===g?c.osName=h:"cosver"===g?c.osVersion=h:"cplatform"===g&&(c.platform=h)}b.client=f.call(a,e,c);return b}
function eg(a,b,c){c=void 0===c?{}:c;var d={"X-Goog-Visitor-Id":c.visitorData||P("VISITOR_DATA","")};if(b&&b.includes("www.youtube-nocookie.com"))return d;(b=c.Fa||P("AUTHORIZATION"))||(a?b="Bearer "+C("gapi.auth.getToken")().Ea:b=xc([]));b&&(d.Authorization=b,d["X-Goog-AuthUser"]=P("SESSION_INDEX",0),R("pageid_as_header_web")&&(d["X-Goog-PageId"]=P("DELEGATED_SESSION_ID")));return d}
;function fg(a){a=Object.assign({},a);delete a.Authorization;var b=xc();if(b){var c=new Pc;c.update(P("INNERTUBE_API_KEY",void 0));c.update(b);b=c.digest();c=3;Ba(b);void 0===c&&(c=0);if(!Kb){Kb={};for(var d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),e=["+/=","+/","-_=","-_.","-_"],f=0;5>f;f++){var g=d.concat(e[f].split(""));Jb[f]=g;for(var h=0;h<g.length;h++){var k=g[h];void 0===Kb[k]&&(Kb[k]=h)}}}c=Jb[c];d=[];for(e=0;e<b.length;e+=3){var l=b[e],m=(f=e+1<b.length)?
b[e+1]:0;k=(g=e+2<b.length)?b[e+2]:0;h=l>>2;l=(l&3)<<4|m>>4;m=(m&15)<<2|k>>6;k&=63;g||(k=64,f||(m=64));d.push(c[h],c[l],c[m]||"",c[k]||"")}a.hash=d.join("")}return a}
;function gg(a){var b=new qe;(b=b.isAvailable()?a?new we(b,a):b:null)||(a=new re(a||"UserDataSharedStore"),b=a.isAvailable()?a:null);this.h=(a=b)?new me(a):null;this.i=document.domain||window.location.hostname}
gg.prototype.set=function(a,b,c,d){c=c||31104E3;this.remove(a);if(this.h)try{this.h.set(a,b,Date.now()+1E3*c);return}catch(f){}var e="";if(d)try{e=escape(Qd(b))}catch(f){return}else e=escape(b);b=this.i;rc.set(""+a,e,{V:c,path:"/",domain:void 0===b?"youtube.com":b,secure:!1})};
gg.prototype.get=function(a,b){var c=void 0,d=!this.h;if(!d)try{c=this.h.get(a)}catch(e){d=!0}if(d&&(c=rc.get(""+a,void 0))&&(c=unescape(c),b))try{c=JSON.parse(c)}catch(e){this.remove(a),c=void 0}return c};
gg.prototype.remove=function(a){this.h&&this.h.remove(a);var b=this.i;rc.remove(""+a,"/",void 0===b?"youtube.com":b)};var hg;function ig(){hg||(hg=new gg("yt.innertube"));return hg}
function jg(a,b,c,d){if(d)return null;d=ig().get("nextId",!0)||1;var e=ig().get("requests",!0)||{};e[d]={method:a,request:b,authState:fg(c),requestTime:Math.round(T())};ig().set("nextId",d+1,86400,!0);ig().set("requests",e,86400,!0);return d}
function kg(a){var b=ig().get("requests",!0)||{};delete b[a];ig().set("requests",b,86400,!0)}
function lg(a){var b=ig().get("requests",!0);if(b){for(var c in b){var d=b[c];if(!(6E4>Math.round(T())-d.requestTime)){var e=d.authState,f=fg(eg(!1));Wa(e,f)&&(e=d.request,"requestTimeMs"in e&&(e.requestTimeMs=Math.round(T())),Kf(a,d.method,e,{}));delete b[c]}}ig().set("requests",b,86400,!0)}}
;var mg=C("ytPubsub2Pubsub2Instance")||new O;O.prototype.subscribe=O.prototype.subscribe;O.prototype.unsubscribeByKey=O.prototype.K;O.prototype.publish=O.prototype.H;O.prototype.clear=O.prototype.clear;E("ytPubsub2Pubsub2Instance",mg);E("ytPubsub2Pubsub2SubscribedKeys",C("ytPubsub2Pubsub2SubscribedKeys")||{});E("ytPubsub2Pubsub2TopicToKeys",C("ytPubsub2Pubsub2TopicToKeys")||{});E("ytPubsub2Pubsub2IsAsync",C("ytPubsub2Pubsub2IsAsync")||{});E("ytPubsub2Pubsub2SkipSubKey",null);var ng=Gb||Hb;var og=[],pg=!1;function qg(a,b){pg||(og.push({type:"EVENT",eventType:a,payload:b}),10<og.length&&og.shift())}
;function U(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];d=Error.call(this,a);this.message=d.message;"stack"in d&&(this.stack=d.stack);d=[];var e=d.concat;if(!(c instanceof Array)){c=u(c);for(var f,g=[];!(f=c.next()).done;)g.push(f.value);c=g}this.args=e.call(d,c)}
x(U,Error);var rg={},sg=(rg.AUTH_INVALID="No user identifier specified.",rg.EXPLICIT_ABORT="Transaction was explicitly aborted.",rg.IDB_NOT_SUPPORTED="IndexedDB is not supported.",rg.MISSING_OBJECT_STORE="Object store not created.",rg.UNKNOWN_ABORT="Transaction was aborted for unknown reasons.",rg.QUOTA_EXCEEDED="The current transaction exceeded its quota limitations.",rg.QUOTA_MAYBE_EXCEEDED="The current transaction may have failed because of exceeding quota limitations.",rg);
function V(a,b,c){b=void 0===b?{}:b;c=void 0===c?sg[a]:c;U.call(this,c,Object.assign({name:"YtIdbKnownError",isSw:void 0===self.document,isIframe:self!==self.top,type:a},b));this.type=a;this.message=c;Object.setPrototypeOf(this,V.prototype);pg||(og.push({type:"ERROR",payload:this}),10<og.length&&og.shift())}
x(V,U);function tg(a){V.call(this,"MISSING_OBJECT_STORE",{Ma:a},sg.MISSING_OBJECT_STORE);Object.setPrototypeOf(this,tg.prototype)}
x(tg,V);function ug(a){if(!a)throw Error();throw a;}
function vg(a){return a}
function W(a){var b=this;this.i=a;this.state={status:"PENDING"};this.h=[];this.onRejected=[];this.i(function(c){if("PENDING"===b.state.status){b.state={status:"FULFILLED",value:c};c=u(b.h);for(var d=c.next();!d.done;d=c.next())d=d.value,d()}},function(c){if("PENDING"===b.state.status){b.state={status:"REJECTED",
reason:c};c=u(b.onRejected);for(var d=c.next();!d.done;d=c.next())d=d.value,d()}})}
W.all=function(a){return new W(function(b,c){var d=[],e=a.length;0===e&&b(d);for(var f={F:0};f.F<a.length;f={F:f.F},++f.F)wg(W.resolve(a[f.F]).then(function(g){return function(h){d[g.F]=h;e--;0===e&&b(d)}}(f)),function(g){c(g)})})};
W.resolve=function(a){return new W(function(b,c){a instanceof W?a.then(b,c):b(a)})};
W.reject=function(a){return new W(function(b,c){c(a)})};
W.prototype.then=function(a,b){var c=this,d=null!==a&&void 0!==a?a:vg,e=null!==b&&void 0!==b?b:ug;return new W(function(f,g){"PENDING"===c.state.status?(c.h.push(function(){xg(c,c,d,f,g)}),c.onRejected.push(function(){yg(c,c,e,f,g)})):"FULFILLED"===c.state.status?xg(c,c,d,f,g):"REJECTED"===c.state.status&&yg(c,c,e,f,g)})};
function wg(a,b){a.then(void 0,b)}
function xg(a,b,c,d,e){try{if("FULFILLED"!==a.state.status)throw Error("calling handleResolve before the promise is fulfilled.");var f=c(a.state.value);f instanceof W?zg(a,b,f,d,e):d(f)}catch(g){e(g)}}
function yg(a,b,c,d,e){try{if("REJECTED"!==a.state.status)throw Error("calling handleReject before the promise is rejected.");var f=c(a.state.reason);f instanceof W?zg(a,b,f,d,e):d(f)}catch(g){e(g)}}
function zg(a,b,c,d,e){b===c?e(new TypeError("Circular promise chain detected.")):c.then(function(f){f instanceof W?zg(a,b,f,d,e):d(f)},function(f){e(f)})}
;function Ag(a,b,c){function d(){c(a.error);f()}
function e(){b(a.result);f()}
function f(){try{a.removeEventListener("success",e),a.removeEventListener("error",d)}catch(g){}}
a.addEventListener("success",e);a.addEventListener("error",d)}
function Bg(a){return new Promise(function(b,c){Ag(a,b,c)})}
function X(a){return new W(function(b,c){Ag(a,b,c)})}
;function Cg(a,b){return new W(function(c,d){function e(){var f=a?b(a):null;f?f.then(function(g){a=g;e()},d):c()}
e()})}
;function Dg(a,b){this.h=a;this.options=b;this.transactionCount=0;this.j=Math.round(T());this.i=!1}
r=Dg.prototype;r.add=function(a,b,c){return Eg(this,[a],"readwrite",function(d){return Fg(d,a).add(b,c)})};
r.clear=function(a){return Eg(this,[a],"readwrite",function(b){return Fg(b,a).clear()})};
r.close=function(){var a;this.h.close();(null===(a=this.options)||void 0===a?0:a.closed)&&this.options.closed()};
r.count=function(a,b){return Eg(this,[a],"readonly",function(c){return Fg(c,a).count(b)})};
r["delete"]=function(a,b){return Eg(this,[a],"readwrite",function(c){return Fg(c,a)["delete"](b)})};
r.get=function(a,b){return Eg(this,[a],"readwrite",function(c){return Fg(c,a).get(b)})};
function Eg(a,b,c,d){c=void 0===c?"readonly":c;a.transactionCount++;var e=a.h.transaction(b,c);d=Gg(e,d)["catch"](function(f){var g=a.h.name,h=b.join();f instanceof V||f instanceof U||("QuotaExceededError"===f.name?f=new V("QUOTA_EXCEEDED",{objectStoreNames:h,dbName:g}):Ib&&"UnknownError"===f.name?f=new V("QUOTA_MAYBE_EXCEEDED",{objectStoreNames:h,dbName:g}):(Object.setPrototypeOf(f,U.prototype),f.args=[{name:"IdbError",Na:f.name,dbName:g,objectStoreNames:h}]));throw f;});
Hg(a,d,b.join(),c);return d}
function Hg(a,b,c,d){Ja(a,function f(){var g,h,k=this,l,m,n;return wa(f,function(p){if(1==p.h)return g=Math.round(T()),p.l=2,z(p,b,4);2!=p.h?(h=Math.round(T()),Ig(k,!0,c,h-g),p.h=0,p.l=0):(l=qa(p),m=Math.round(T()),n=m-g,l instanceof V&&("QUOTA_EXCEEDED"===l.type||"QUOTA_MAYBE_EXCEEDED"===l.type)&&qg("QUOTA_EXCEEDED",{dbName:k.h.name,objectStoreNames:c,transactionCount:k.transactionCount,transactionMode:d}),l instanceof V&&"UNKNOWN_ABORT"===l.type&&(qg("TRANSACTION_UNEXPECTEDLY_ABORTED",{objectStoreNames:c,
transactionDuration:n,transactionCount:k.transactionCount,dbDuration:m-k.j}),k.i=!0),Ig(k,!1,c,n),p.h=0)})})}
function Ig(a,b,c,d){qg("TRANSACTION_ENDED",{objectStoreNames:c,connectionHasUnknownAbortedTransaction:a.i,duration:d,isSuccessful:b})}
function Jg(a){this.h=a}
r=Jg.prototype;r.add=function(a,b){return X(this.h.add(a,b))};
r.clear=function(){return X(this.h.clear()).then(function(){})};
r.count=function(a){return X(this.h.count(a))};
function Kg(a,b){return Lg(a,{query:b},function(c){return c["delete"]().then(function(){return c["continue"]()})}).then(function(){})}
r["delete"]=function(a){return a instanceof IDBKeyRange?Kg(this,a):X(this.h["delete"](a))};
r.get=function(a){return X(this.h.get(a))};
r.index=function(a){return new Mg(this.h.index(a))};
r.getName=function(){return this.h.name};
function Lg(a,b,c){a=a.h.openCursor(b.query,b.direction);return Ng(a).then(function(d){return Cg(d,c)})}
function Og(a){var b=this;this.h=a;this.i=new Map;this.aborted=!1;this.done=new Promise(function(c,d){b.h.addEventListener("complete",function(){c()});
b.h.addEventListener("error",function(e){e.currentTarget===e.target&&d(b.h.error)});
b.h.addEventListener("abort",function(){var e=b.h.error;if(e)d(e);else if(!b.aborted){e=V;for(var f=b.h.objectStoreNames,g=[],h=0;h<f.length;h++){var k=f.item(h);if(null===k)throw Error("Invariant: item in DOMStringList is null");g.push(k)}e=new e("UNKNOWN_ABORT",{objectStoreNames:g.join(),dbName:b.h.db.name,mode:b.h.mode});d(e)}})})}
function Gg(a,b){var c=new Og(a);return Pg(c,b)}
function Pg(a,b){var c=new Promise(function(d,e){wg(b(a).then(function(f){a.commit();d(f)}),e)});
return Promise.all([c,a.done]).then(function(d){return u(d).next().value})}
Og.prototype.abort=function(){this.h.abort();this.aborted=!0;throw new V("EXPLICIT_ABORT");};
Og.prototype.commit=function(){var a=this.h;a.commit&&!this.aborted&&a.commit()};
function Fg(a,b){var c=a.h.objectStore(b),d=a.i.get(c);d||(d=new Jg(c),a.i.set(c,d));return d}
function Mg(a){this.h=a}
Mg.prototype.count=function(a){return X(this.h.count(a))};
Mg.prototype["delete"]=function(a){return Qg(this,{query:a},function(b){return b["delete"]().then(function(){return b["continue"]()})})};
Mg.prototype.get=function(a){return X(this.h.get(a))};
Mg.prototype.getKey=function(a){return X(this.h.getKey(a))};
function Qg(a,b,c){a=a.h.openCursor(void 0===b.query?null:b.query,void 0===b.direction?"next":b.direction);return Ng(a).then(function(d){return Cg(d,c)})}
function Rg(a,b){this.request=a;this.cursor=b}
function Ng(a){return X(a).then(function(b){return null===b?null:new Rg(a,b)})}
r=Rg.prototype;r.advance=function(a){this.cursor.advance(a);return Ng(this.request)};
r["continue"]=function(a){this.cursor["continue"](a);return Ng(this.request)};
r["delete"]=function(){return X(this.cursor["delete"]()).then(function(){})};
r.getKey=function(){return this.cursor.key};
r.update=function(a){return X(this.cursor.update(a))};function Sg(a,b,c){return Ja(this,function e(){var f,g,h,k,l,m,n,p,q,v;return wa(e,function(w){if(1==w.h)return f=self.indexedDB.open(a,b),g=c,h=g.blocked,k=g.blocking,l=g.ra,m=g.upgrade,n=g.closed,q=function(){p||(p=new Dg(f.result,{closed:n}));return p},f.addEventListener("upgradeneeded",function(y){if(null===y.newVersion)throw Error("Invariant: newVersion on IDbVersionChangeEvent is null");
if(null===f.transaction)throw Error("Invariant: transaction on IDbOpenDbRequest is null");y.dataLoss&&"none"!==y.dataLoss&&qg("IDB_DATA_CORRUPTED",{reason:y.dataLossMessage||"unknown reason",dbName:a});var N=q(),ea=new Og(f.transaction);m&&m(N,y.oldVersion,y.newVersion,ea)}),h&&f.addEventListener("blocked",function(){h()}),z(w,Bg(f),2);
v=w.m;k&&v.addEventListener("versionchange",function(){k(q())});
v.addEventListener("close",function(){qg("IDB_UNEXPECTEDLY_CLOSED",{dbName:a,dbVersion:v.version});l&&l()});
return w["return"](q())})})}
function Tg(a,b){b=void 0===b?{}:b;return Ja(this,function d(){var e,f,g;return wa(d,function(h){e=self.indexedDB.deleteDatabase(a);f=b;(g=f.blocked)&&e.addEventListener("blocked",function(){g()});
return z(h,Bg(e),0)})})}
;function Ug(a){this.name="YtIdbMeta";this.options=a;this.i=!1}
function Vg(a,b,c){c=void 0===c?{}:c;c=void 0===c?{}:c;return Sg(a,b,c)}
Ug.prototype["delete"]=function(a){a=void 0===a?{}:a;return Tg(this.name,a)};
function Wg(){var a=Xg;if(!a.h){var b=function(){a.h===e&&(a.h=void 0)},c={blocking:function(f){f.close()},
closed:b,ra:b,upgrade:a.options.upgrade},d=function(){return Ja(a,function g(){var h=this,k,l,m;return wa(g,function(n){switch(n.h){case 1:return n.l=2,z(n,Vg(h.name,h.options.version,c),4);case 4:k=n.m;if(!Fb){n.h=5;break}a:{var p=u(Object.keys(h.options.qa));for(var q=p.next();!q.done;q=p.next())if(q=q.value,!k.h.objectStoreNames.contains(q)){p=q;break a}p=void 0}l=p;if(void 0===l){n.h=5;break}if(!Fb||h.i){n.h=7;break}h.i=!0;return z(n,h["delete"](),8);case 8:return n["return"](d());case 7:throw new tg(l);
case 5:return n["return"](k);case 2:m=qa(n);if(m instanceof DOMException?"VersionError"===m.name:"DOMError"in self&&m instanceof DOMError?"VersionError"===m.name:m instanceof Object&&"message"in m&&"An attempt was made to open a database using a lower version than the existing version."===m.message)return n["return"](Vg(h.name,void 0,Object.assign(Object.assign({},c),{upgrade:void 0})));b();throw m;}})})};
var e=d();a.h=e}return a.h}
;var Xg=new Ug({qa:{databases:!0},upgrade:function(a,b){1>b&&a.h.createObjectStore("databases",{keyPath:"actualName"})}});
function Yg(a){return Ja(this,function c(){var d;return wa(c,function(e){if(1==e.h)return z(e,Wg(),2);d=e.m;return e["return"](Eg(d,["databases"],"readwrite",function(f){var g=Fg(f,"databases");return g.get(a.actualName).then(function(h){if(h?a.actualName!==h.actualName||a.publicName!==h.publicName||a.userIdentifier!==h.userIdentifier||a.signedIn!==h.signedIn||a.clearDataOnAuthChange!==h.clearDataOnAuthChange:1)return X(g.h.put(a,void 0)).then(function(){})})}))})})}
function Zg(){return Ja(this,function b(){var c;return wa(b,function(d){if(1==d.h)return z(d,Wg(),2);c=d.m;return d["return"](c["delete"]("databases","yt-idb-test-do-not-use"))})})}
;var $g;
function ah(){return Ja(this,function b(){var c,d;return wa(b,function(e){switch(e.h){case 1:var f;if(f=ng)f=/WebKit\/([0-9]+)/.exec(H),f=!!(f&&600<=parseInt(f[1],10));f&&(f=/WebKit\/([0-9]+)/.exec(H),f=!(f&&602<=parseInt(f[1],10)));if(f&&!R("ytidb_allow_on_ios_safari_v8_and_v9")||sb)return e["return"](!1);try{if(c=self,!(c.indexedDB&&c.IDBIndex&&c.IDBKeyRange&&c.IDBObjectStore))return e["return"](!1)}catch(g){return e["return"](!1)}if(!("IDBTransaction"in self&&"objectStoreNames"in IDBTransaction.prototype))return e["return"](!1);e.l=
2;d={actualName:"yt-idb-test-do-not-use",publicName:"yt-idb-test-do-not-use",userIdentifier:void 0,signedIn:!1};return z(e,Yg(d),4);case 4:return z(e,Zg(),5);case 5:return e["return"](!0);case 2:return qa(e),e["return"](!1)}})})}
function bh(){if(void 0!==$g)return $g;pg=!0;return $g=ah().then(function(a){pg=!1;return a})}
;var ch;function dh(){ch||(ch=new gg("yt.offline"));return ch}
;function eh(){L.call(this);this.s=this.u=this.i=!1;this.l=fh();gh(this);hh(this)}
x(eh,L);function fh(){var a=window.navigator.onLine;return void 0===a?!0:a}
function hh(a){window.addEventListener("online",function(){a.l=!0;a.i&&Od(a,"ytnetworkstatus-online");ih(a);if(a.s&&R("offline_error_handling")){var b=dh().get("errors",!0);if(b){for(var c in b)if(b[c]){var d=new U(c,"sent via offline_errors");d.name=b[c].name;d.stack=b[c].stack;Ce(d)}dh().set("errors",{},2592E3,!0)}}})}
function gh(a){window.addEventListener("offline",function(){a.l=!1;a.i&&Od(a,"ytnetworkstatus-offline");ih(a)})}
function ih(a){a.u&&(De(new U("NetworkStatusManager state did not match poll",T()-0)),a.u=!1)}
;function jh(a){a=void 0===a?{}:a;L.call(this);var b=this;this.l=this.u=0;eh.h||(eh.h=new eh);this.i=eh.h;this.i.i=!0;a.oa&&(this.i.s=!0);a.O?(this.O=a.O,Dd(this.i,"ytnetworkstatus-online",function(){kh(b,"publicytnetworkstatus-online")}),Dd(this.i,"ytnetworkstatus-offline",function(){kh(b,"publicytnetworkstatus-offline")})):(Dd(this.i,"ytnetworkstatus-online",function(){Od(b,"publicytnetworkstatus-online")}),Dd(this.i,"ytnetworkstatus-offline",function(){Od(b,"publicytnetworkstatus-offline")}))}
x(jh,L);function kh(a,b){a.O?a.l?(nf(a.u),a.u=kf(function(){a.s!==b&&(Od(a,b),a.s=b,a.l=T())},a.O-(T()-a.l))):(Od(a,b),a.s=b,a.l=T()):Od(a,b)}
;var lh;function mh(a,b){b=void 0===b?{}:b;bh().then(function(){lh||(lh=new jh({oa:!0}));lh.i.l!==fh()&&De(new U("NetworkStatusManager isOnline does not match window status"));Yf(a,b)})}
function nh(a,b){b=void 0===b?{}:b;bh().then(function(){Yf(a,b)})}
;function oh(a){var b=this;this.h=null;a?this.h=a:dg()&&(this.h=Hf());lf(function(){lg(b)},0,5E3)}
oh.prototype.isReady=function(){!this.h&&dg()&&(this.h=Hf());return!!this.h};
function Kf(a,b,c,d){!P("VISITOR_DATA")&&"visitor_id"!==b&&.01>Math.random()&&De(new U("Missing VISITOR_DATA when sending innertube request.",b,c,d));if(!a.isReady()){var e=new U("innertube xhrclient not ready",b,c,d);Ce(e);throw e;}var f={headers:{"Content-Type":"application/json"},method:"POST",postParams:c,postBodyFormat:"JSON",onTimeout:function(){d.onTimeout()},
onFetchTimeout:d.onTimeout,onSuccess:function(n,p){if(d.onSuccess)d.onSuccess(p)},
onFetchSuccess:function(n){if(d.onSuccess)d.onSuccess(n)},
onError:function(n,p){if(d.onError)d.onError(p)},
onFetchError:function(n){if(d.onError)d.onError(n)},
timeout:d.timeout,withCredentials:!0},g="";(e=a.h.ka)&&(g=e);var h=a.h.ma||!1,k=eg(h,g,d);Object.assign(f.headers,k);f.headers.Authorization&&!g&&(f.headers["x-origin"]=window.location.origin);e="/youtubei/"+a.h.innertubeApiVersion+"/"+b;var l={alt:"json"};a.h.la&&f.headers.Authorization||(l.key=a.h.innertubeApiKey);var m=Ve(""+g+e,l||{},!0);bh().then(function(n){if(d.retry&&R("retry_web_logging_batches")&&"www.youtube-nocookie.com"!=g){if(R("networkless_gel")&&!n||!R("networkless_gel"))var p=jg(b,
c,k,h);if(p){var q=f.onSuccess,v=f.onFetchSuccess;f.onSuccess=function(w,y){kg(p);q(w,y)};
c.onFetchSuccess=function(w,y){kg(p);v(w,y)}}}try{R("use_fetch_for_op_xhr")?Vf(m,f):R("networkless_gel")&&d.retry?(f.method="POST",!d.sa&&R("nwl_send_fast_on_unload")?nh(m,f):mh(m,f)):(f.method="POST",f.postParams||(f.postParams={}),Yf(m,f))}catch(w){if("InvalidAccessError"==w.name)p&&(kg(p),p=0),De(Error("An extension is blocking network request."));
else throw w;}p&&lf(function(){lg(a)},0,5E3)})}
;function ph(a,b){var c=void 0===c?{}:c;var d=oh;P("ytLoggingEventsDefaultDisabled",!1)&&oh==oh&&(d=null);var e=c;e=void 0===e?{}:e;c={};c.eventTimeMs=Math.round(e.timestamp||T());c[a]=b;var f=C("_lact",window);f=null==f?-1:Math.max(Date.now()-f,0);c.context={lastActivityMs:String(e.timestamp||!isFinite(f)?-1:f)};if(R("log_sequence_info_on_gel_web")&&e.Z){f=c.context;var g=e.Z;Lf[g]=g in Lf?Lf[g]+1:0;f.sequence={index:Lf[g],groupKey:g};e.Ka&&delete Lf[e.Z]}e=e.Ja;f="";e&&(f={},e.videoId?f.videoId=
e.videoId:e.playlistId&&(f.playlistId=e.playlistId),Cf[e.token]=f,f=e.token);e=Bf.get(f)||[];Bf.set(f,e);e.push(c);d&&(wf=new d);d=hf("web_logging_max_batch")||100;c=T();e.length>=d?Df(!0):10<=c-zf&&(Ff(),zf=c)}
;var qh=[{W:function(a){return"Cannot read property '"+a.key+"'"},
P:{TypeError:[{regexp:/Cannot read property '([^']+)' of (null|undefined)/,groups:["key","value"]},{regexp:/\u65e0\u6cd5\u83b7\u53d6\u672a\u5b9a\u4e49\u6216 (null|undefined) \u5f15\u7528\u7684\u5c5e\u6027\u201c([^\u201d]+)\u201d/,groups:["value","key"]},{regexp:/\uc815\uc758\ub418\uc9c0 \uc54a\uc74c \ub610\ub294 (null|undefined) \ucc38\uc870\uc778 '([^']+)' \uc18d\uc131\uc744 \uac00\uc838\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4./,groups:["value","key"]},{regexp:/No se puede obtener la propiedad '([^']+)' de referencia nula o sin definir/,
groups:["key"]},{regexp:/Unable to get property '([^']+)' of (undefined or null) reference/,groups:["key","value"]}],Error:[{regexp:/(Permission denied) to access property "([^']+)"/,groups:["reason","key"]}]}},{W:function(a){return"Cannot call '"+a.key+"'"},
P:{TypeError:[{regexp:/(?:([^ ]+)?\.)?([^ ]+) is not a function/,groups:["base","key"]},{regexp:/([^ ]+) called on (null or undefined)/,groups:["key","value"]},{regexp:/Object (.*) has no method '([^ ]+)'/,groups:["base","key"]},{regexp:/Object doesn't support property or method '([^ ]+)'/,groups:["key"]},{regexp:/\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306f '([^']+)' \u30d7\u30ed\u30d1\u30c6\u30a3\u307e\u305f\u306f\u30e1\u30bd\u30c3\u30c9\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093/,
groups:["key"]},{regexp:/\uac1c\uccb4\uac00 '([^']+)' \uc18d\uc131\uc774\ub098 \uba54\uc11c\ub4dc\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4./,groups:["key"]}]}}];
function rh(a){for(var b=u(qh),c=b.next();!c.done;c=b.next())if(c=c.value,c.P[a.name])for(var d=u(c.P[a.name]),e=d.next();!e.done;e=d.next()){var f=e.value;if(e=a.message.match(f.regexp)){a.params["params.error.original"]=e[0];d=f.groups;f={};for(var g=0;g<d.length;g++)f[d[g]]=e[g+1],a.params["params.error."+d[g]]=e[g+1];a.message=c.W(f);break}}return a}
;function sh(){this.h=[];this.i=[]}
var th;function uh(){th||(th=new sh);return th}
function vh(a){return"msg="+a.i.length+"&cb="+a.h.length}
;var wh=new O;function xh(a){function b(){return a.charCodeAt(d++)}
var c=a.length,d=0;do{var e=yh(b);if(Infinity===e)break;var f=e>>3;switch(e&7){case 0:e=yh(b);if(2===f)return e;break;case 1:if(2===f)return;d+=8;break;case 2:e=yh(b);if(2===f)return a.substr(d,e);d+=e;break;case 5:if(2===f)return;d+=4;break;default:return}}while(d<c)}
function yh(a){var b=a(),c=b&127;if(128>b)return c;b=a();c|=(b&127)<<7;if(128>b)return c;b=a();c|=(b&127)<<14;if(128>b)return c;b=a();return 128>b?c|(b&127)<<21:Infinity}
;function zh(a,b,c,d){c+="."+a;a=Ah(b);d[c]=a;return c.length+a.length}
function Ah(a){return("string"===typeof a?a:String(JSON.stringify(a))).substr(0,500)}
function Bh(a,b){var c=mc(a),d=c.message||"Unknown Error",e=c.name||"UnknownError",f=c.stack||a.h||"Not available";if(f.startsWith(e+": "+d)){var g=f.split("\n");g.shift();f=g.join("\n")}g=c.lineNumber||"Not available";c=c.fileName||"Not available";if(a.hasOwnProperty("args")&&a.args&&a.args.length)for(var h=0,k=0;k<a.args.length;k++){var l=a.args[k],m="params."+k;h+=m.length;if(l)if(Array.isArray(l)){var n=b,p=h;for(h=0;h<l.length&&!(l[h]&&(p+=zh(h,l[h],m,n),500<p));h++);h=p}else if("object"===typeof l)for(n in n=
void 0,p=b,l){if(l[n]){var q=n;var v=l[n],w=p;q="string"!==typeof v||"clickTrackingParams"!==q&&"trackingParams"!==q?0:(v=xh(atob(v.replace(/-/g,"+").replace(/_/g,"/"))))?zh(q+".ve",v,m,w):0;h+=q;h+=zh(n,l[n],m,p);if(500<h)break}}else b[m]=Ah(l),h+=b[m].length;else b[m]=Ah(l),h+=b[m].length;if(500<=h)break}else if(a.hasOwnProperty("params")&&a.params)if(l=a.params,"object"===typeof a.params)for(k in m=0,l){if(l[k]&&(n="params."+k,p=Ah(l[k]),b[n]=p,m+=n.length+p.length,500<m))break}else b.params=Ah(l);
navigator.vendor&&!b.hasOwnProperty("vendor")&&(b["device.vendor"]=navigator.vendor);d={message:d,name:e,lineNumber:g,fileName:c,stack:f,params:b,sampleWeight:1};e=Number(a.columnNumber);isNaN(e)||(d.lineNumber=d.lineNumber+":"+e);if(void 0!==a.sampleWeight)e=a.sampleWeight;else a:{e=uh();g=u(e.i);for(c=g.next();!c.done;c=g.next())if(c=c.value,d.message&&d.message.match(c.La)){e=c.weight;break a}e=u(e.h);for(g=e.next();!g.done;g=e.next())if(g=g.value,g.Ha(d)){e=g.weight;break a}e=1}d.sampleWeight=
e;return d}
;var Ch=new Set,Dh=0,Eh=0,Fh=0,Gh=["PhantomJS","Googlebot","TO STOP THIS SECURITY SCAN go/scan"];function Y(a,b,c){this.o=this.h=this.i=null;this.m=Ca(this);this.j=0;this.u=!1;this.s=[];this.l=null;this.D=c;this.G={};c=document;if(a="string"===typeof a?c.getElementById(a):a)if(c="iframe"==a.tagName.toLowerCase(),b.host||(b.host=c?Qb(a.src):"https://www.youtube.com"),this.i=new df(b),c||(b=Hh(this,a),this.o=a,(c=a.parentNode)&&c.replaceChild(b,a),a=b),this.h=a,this.h.id||(this.h.id="widget"+Ca(this.h)),Ye[this.h.id]=this,window.postMessage){this.l=new O;Ih(this);b=Q(this.i,"events");for(var d in b)b.hasOwnProperty(d)&&
this.addEventListener(d,b[d]);for(var e in $e)Jh(this,e)}}
r=Y.prototype;r.setSize=function(a,b){this.h.width=a;this.h.height=b;return this};
r.pa=function(){return this.h};
r.Y=function(a){Kh(this,a.event,a)};
r.addEventListener=function(a,b){var c=b;"string"==typeof b&&(c=function(){window[b].apply(window,arguments)});
if(!c)return this;this.l.subscribe(a,c);Lh(this,a);return this};
function Jh(a,b){var c=b.split(".");if(2==c.length){var d=c[1];a.D==c[0]&&Lh(a,d)}}
r.destroy=function(){this.h.id&&(Ye[this.h.id]=null);var a=this.l;a&&"function"==typeof a.dispose&&a.dispose();if(this.o){a=this.h;var b=a.parentNode;b&&b.replaceChild(this.o,a)}else(a=this.h)&&a.parentNode&&a.parentNode.removeChild(a);ff&&(ff[this.m]=null);this.i=null;a=this.h;for(var c in Va)Va[c][0]==a&&Je(c);this.o=this.h=null};
r.T=function(){return{}};
function Mh(a,b,c){c=c||[];c=Array.prototype.slice.call(c);b={event:"command",func:b,args:c};a.u?a.R(b):a.s.push(b)}
function Kh(a,b,c){a.l.j||(c={target:a,data:c},a.l.H(b,c),cf(a.D+"."+b,c))}
function Hh(a,b){for(var c=document.createElement("iframe"),d=b.attributes,e=0,f=d.length;e<f;e++){var g=d[e].value;null!=g&&""!=g&&"null"!=g&&c.setAttribute(d[e].name,g)}c.setAttribute("frameBorder",0);c.setAttribute("allowfullscreen",1);c.setAttribute("allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");c.setAttribute("title","YouTube "+Q(a.i,"title"));(d=Q(a.i,"width"))&&c.setAttribute("width",d);(d=Q(a.i,"height"))&&c.setAttribute("height",d);var h=
a.T();h.enablejsapi=window.postMessage?1:0;window.location.host&&(h.origin=window.location.protocol+"//"+window.location.host);h.widgetid=a.m;window.location.href&&G(["debugjs","debugcss"],function(k){var l=window.location.href;var m=l.search(Tb);b:{var n=0;for(var p=k.length;0<=(n=l.indexOf(k,n))&&n<m;){var q=l.charCodeAt(n-1);if(38==q||63==q)if(q=l.charCodeAt(n+p),!q||61==q||38==q||35==q)break b;n+=p+1}n=-1}if(0>n)l=null;else{p=l.indexOf("&",n);if(0>p||p>m)p=m;n+=k.length+1;l=decodeURIComponent(l.substr(n,
p-n).replace(/\+/g," "))}null!==l&&(h[k]=l)});
c.src=Q(a.i,"host")+("/embed/"+Q(a.i,"videoId"))+"?"+Sb(h);return c}
r.X=function(){this.h&&this.h.contentWindow?this.R({event:"listening"}):window.clearInterval(this.j)};
function Ih(a){ef(a.i,a,a.m);a.j=Ne(Ha(a.X,a));Le(a.h,"load",Ha(function(){window.clearInterval(this.j);this.j=Ne(Ha(this.X,this))},a))}
function Lh(a,b){a.G[b]||(a.G[b]=!0,Mh(a,"addEventListener",[b]))}
r.R=function(a){a.id=this.m;a.channel="widget";a=Qd(a);var b=this.i;var c=Qb(this.h.src||"");b=0==c.indexOf("https:")?[c]:b.h?[c.replace("http:","https:")]:b.j?[c]:[c,c.replace("http:","https:")];if(this.h.contentWindow)for(c=0;c<b.length;c++)try{this.h.contentWindow.postMessage(a,b[c])}catch(n){if(n.name&&"SyntaxError"==n.name){if(!(n.message&&0<n.message.indexOf("target origin ''"))){var d=void 0,e=n;d=void 0===d?{}:d;d.name=P("INNERTUBE_CONTEXT_CLIENT_NAME",1);d.version=P("INNERTUBE_CONTEXT_CLIENT_VERSION",
void 0);var f=d||{};d="WARNING";d=void 0===d?"ERROR":d;if(e){if(R("console_log_js_exceptions")){var g=e,h=[];h.push("Name: "+g.name);h.push("Message: "+g.message);g.hasOwnProperty("params")&&h.push("Error Params: "+JSON.stringify(g.params));h.push("File name: "+g.fileName);h.push("Stacktrace: "+g.stack);window.console.log(h.join("\n"),g)}if(!(5<=Dh||(R("kevlar_js_fixes")?(e=rh(Bh(e,f)),e.params||(e.params={}),f=uh(),e.params["params.errorServiceSignature"]=vh(f),e.params["params.serviceWorker"]="false",
e.params["params.fscripts"]=String(document.querySelectorAll("script:not([nonce])").length)):e=rh(Bh(e,f)),window.yterr&&"function"===typeof window.yterr&&window.yterr(e),f=0===e.sampleWeight,Ch.has(e.message)||f))){"ERROR"===d?(wh.H("handleError",e),R("record_app_crashed_web")&&0===Fh&&1===e.sampleWeight&&(Fh++,ph("appCrashed",{appCrashType:"APP_CRASH_TYPE_BREAKPAD"})),Eh++):"WARNING"===d&&wh.H("handleWarning",e);if(R("kevlar_gel_error_routing")){h=d;g=e;a:{f=u(Gh);for(var k=f.next();!k.done;k=f.next()){var l=
H;if(l&&0<=l.toLowerCase().indexOf(k.value.toLowerCase())){f=!0;break a}}f=!1}if(!f){k={stackTrace:g.stack};g.fileName&&(k.filename=g.fileName);f=g.lineNumber&&g.lineNumber.split?g.lineNumber.split(":"):[];0!==f.length&&(1!==f.length||isNaN(Number(f[0]))?2!==f.length||isNaN(Number(f[0]))||isNaN(Number(f[1]))||(k.lineNumber=Number(f[0]),k.columnNumber=Number(f[1])):k.lineNumber=Number(f[0]));f={level:"ERROR_LEVEL_UNKNOWN",message:g.message,errorClassName:g.name,sampleWeight:g.sampleWeight};"ERROR"===
h?f.level="ERROR_LEVEL_ERROR":"WARNING"===h&&(f.level="ERROR_LEVEL_WARNNING");h={isObfuscated:!0,browserStackInfo:k};k={pageUrl:window.location.href};P("FEXP_EXPERIMENTS")&&(k.experimentIds=P("FEXP_EXPERIMENTS"));k.kvPairs=R("kevlar_js_fixes")?[]:[{key:"client.params.errorServiceSignature",value:vh(uh())},{key:"client.params.serviceWorker",value:"false"}];if(g=g.params){l=u(Object.keys(g));for(var m=l.next();!m.done;m=l.next())m=m.value,k.kvPairs.push({key:"client."+m,value:String(g[m])})}g=P("SERVER_NAME",
void 0);l=P("SERVER_VERSION",void 0);g&&l&&(k.kvPairs.push({key:"server.name",value:g}),k.kvPairs.push({key:"server.version",value:l}));ph("clientError",{errorMetadata:k,stackTrace:h,logMessage:f});Df()}}if(!R("suppress_error_204_logging")){g=e;f=g.params||{};d={urlParams:{a:"logerror",t:"jserror",type:g.name,msg:g.message.substr(0,250),line:g.lineNumber,level:d,"client.name":f.name},postParams:{url:P("PAGE_NAME",window.location.href),file:g.fileName},method:"POST"};f.version&&(d["client.version"]=
f.version);if(d.postParams){g.stack&&(d.postParams.stack=g.stack);g=u(Object.keys(f));for(h=g.next();!h.done;h=g.next())h=h.value,d.postParams["client."+h]=f[h];if(f=P("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS",void 0))for(g=u(Object.keys(f)),h=g.next();!h.done;h=g.next())h=h.value,d.postParams[h]=f[h];f=P("SERVER_NAME",void 0);g=P("SERVER_VERSION",void 0);f&&g&&(d.postParams["server.name"]=f,d.postParams["server.version"]=g)}Yf(P("ECATCHER_REPORT_HOST","")+"/error_204",d)}Ch.add(e.message);Dh++}}}}else throw n;
}else console&&console.warn&&console.warn("The YouTube player is not attached to the DOM. API calls should be made after the onReady event. See more: https://developers.google.com/youtube/iframe_api_reference#Events")};function Nh(a){return(0===a.search("cue")||0===a.search("load"))&&"loadModule"!==a}
function Oh(a){return 0===a.search("get")||0===a.search("is")}
;function Z(a,b){if(!a)throw Error("YouTube player element ID required.");var c={title:"video player",videoId:"",width:640,height:360};if(b)for(var d in b)c[d]=b[d];Y.call(this,a,c,"player");this.C={};this.playerInfo={}}
x(Z,Y);r=Z.prototype;r.T=function(){var a=Q(this.i,"playerVars");if(a){var b={},c;for(c in a)b[c]=a[c];a=b}else a={};window!=window.top&&document.referrer&&(a.widget_referrer=document.referrer.substring(0,256));if(c=Q(this.i,"embedConfig")){if(D(c))try{c=JSON.stringify(c)}catch(d){console.error("Invalid embed config JSON",d)}a.embed_config=c}return a};
r.Y=function(a){var b=a.event;a=a.info;switch(b){case "apiInfoDelivery":if(D(a))for(var c in a)this.C[c]=a[c];break;case "infoDelivery":Ph(this,a);break;case "initialDelivery":window.clearInterval(this.j);this.playerInfo={};this.C={};Qh(this,a.apiInterface);Ph(this,a);break;default:Kh(this,b,a)}};
function Ph(a,b){if(D(b))for(var c in b)a.playerInfo[c]=b[c]}
function Qh(a,b){G(b,function(c){this[c]||("getCurrentTime"==c?this[c]=function(){var d=this.playerInfo.currentTime;if(1==this.playerInfo.playerState){var e=(Date.now()/1E3-this.playerInfo.currentTimeLastUpdated_)*this.playerInfo.playbackRate;0<e&&(d+=Math.min(e,1))}return d}:Nh(c)?this[c]=function(){this.playerInfo={};
this.C={};Mh(this,c,arguments);return this}:Oh(c)?this[c]=function(){var d=0;
0===c.search("get")?d=3:0===c.search("is")&&(d=2);return this.playerInfo[c.charAt(d).toLowerCase()+c.substr(d+1)]}:this[c]=function(){Mh(this,c,arguments);
return this})},a)}
r.getVideoEmbedCode=function(){var a=parseInt(Q(this.i,"width"),10),b=parseInt(Q(this.i,"height"),10),c=Q(this.i,"host")+("/embed/"+Q(this.i,"videoId"));hb.test(c)&&(-1!=c.indexOf("&")&&(c=c.replace(bb,"&amp;")),-1!=c.indexOf("<")&&(c=c.replace(cb,"&lt;")),-1!=c.indexOf(">")&&(c=c.replace(db,"&gt;")),-1!=c.indexOf('"')&&(c=c.replace(eb,"&quot;")),-1!=c.indexOf("'")&&(c=c.replace(fb,"&#39;")),-1!=c.indexOf("\x00")&&(c=c.replace(gb,"&#0;")));return'<iframe width="'+a+'" height="'+b+'" src="'+c+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'};
r.getOptions=function(a){return this.C.namespaces?a?this.C[a].options||[]:this.C.namespaces||[]:[]};
r.getOption=function(a,b){if(this.C.namespaces&&a&&b)return this.C[a][b]};
function Rh(a){if("iframe"!=a.tagName.toLowerCase()){var b=bf(a,"videoid");b&&(b={videoId:b,width:bf(a,"width"),height:bf(a,"height")},new Z(a,b))}}
;E("YT.PlayerState.UNSTARTED",-1);E("YT.PlayerState.ENDED",0);E("YT.PlayerState.PLAYING",1);E("YT.PlayerState.PAUSED",2);E("YT.PlayerState.BUFFERING",3);E("YT.PlayerState.CUED",5);E("YT.get",function(a){return Ye[a]});
E("YT.scan",af);E("YT.subscribe",function(a,b,c){ge.subscribe(a,b,c);$e[a]=!0;for(var d in Ye)Jh(Ye[d],a)});
E("YT.unsubscribe",function(a,b,c){fe(a,b,c)});
E("YT.Player",Z);Y.prototype.destroy=Y.prototype.destroy;Y.prototype.setSize=Y.prototype.setSize;Y.prototype.getIframe=Y.prototype.pa;Y.prototype.addEventListener=Y.prototype.addEventListener;Z.prototype.getVideoEmbedCode=Z.prototype.getVideoEmbedCode;Z.prototype.getOptions=Z.prototype.getOptions;Z.prototype.getOption=Z.prototype.getOption;
Ze.push(function(a){var b=a;b||(b=document);a=Qa(b.getElementsByTagName("yt:player"));var c=b||document;if(c.querySelectorAll&&c.querySelector)b=c.querySelectorAll(".yt-player");else{var d;c=document;b=b||c;if(b.querySelectorAll&&b.querySelector)b=b.querySelectorAll(".yt-player");else if(b.getElementsByClassName){var e=b.getElementsByClassName("yt-player");b=e}else{e=b.getElementsByTagName("*");var f={};for(c=d=0;b=e[c];c++){var g=b.className,h;if(h="function"==typeof g.split)h=0<=La(g.split(/\s+/),
"yt-player");h&&(f[d++]=b)}f.length=d;b=f}}b=Qa(b);G(Pa(a,b),Rh)});
"undefined"!=typeof YTConfig&&YTConfig.parsetags&&"onload"!=YTConfig.parsetags||af();var Sh=B.onYTReady;Sh&&Sh();var Th=B.onYouTubeIframeAPIReady;Th&&Th();var Uh=B.onYouTubePlayerAPIReady;Uh&&Uh();}).call(this);
