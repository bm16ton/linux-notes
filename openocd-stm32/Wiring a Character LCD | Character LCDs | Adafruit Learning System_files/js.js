
// Copyright 2012 Google Inc. All rights reserved.
(function(w,g){w[g]=w[g]||{};w[g].e=function(s){return eval(s);};})(window,'google_tag_manager');(function(){

var data = {
"resource": {
  "version":"51",
  
  "macros":[{
      "function":"__e"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"customerId"
    },{
      "function":"__u",
      "vtp_stripWww":true,
      "vtp_component":"HOST",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__remm",
      "vtp_setDefaultValue":true,
      "vtp_input":["macro",2],
      "vtp_fullMatch":false,
      "vtp_replaceAfterMatch":false,
      "vtp_defaultValue":"UA-7723544-1",
      "vtp_ignoreCase":true,
      "vtp_map":["list",["map","key","(.vm)$","value","UA-7723544-7"]]
    },{
      "function":"__gas",
      "vtp_cookieDomain":"auto",
      "vtp_useEcommerceDataLayer":true,
      "vtp_doubleClick":false,
      "vtp_setTrackerName":false,
      "vtp_useDebugVersion":false,
      "vtp_fieldsToSet":["list",["map","fieldName","userId","value",["macro",1]]],
      "vtp_useHashAutoLink":false,
      "vtp_decorateFormsAutoLink":false,
      "vtp_enableLinkId":false,
      "vtp_enableEcommerce":true,
      "vtp_trackingId":["macro",3],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_ecommerceIsEnabled":true
    },{
      "function":"__j",
      "vtp_name":"navigator.doNotTrack"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"searchQuery"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=window.performance.timing;a=a.loadEventStart-a.navigationStart;return Math.round(a\/100)\/10})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"object\"!=typeof window.performance.timing?!0:!1})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return window.location.pathname+window.location.search})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.purchase.actionField.id"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.purchase.actionField.revenue"
    },{
      "function":"__u",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"remarketingParams"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"totalValue"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"AlsPageTitle"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"numItems"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"searchRefinements"
    },{
      "function":"__f",
      "vtp_component":"URL"
    },{
      "function":"__u",
      "vtp_component":"QUERY",
      "vtp_queryKey":"main_page",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.add.products"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.purchase"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.detail.products"
    },{
      "function":"__e"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"remarketingIds"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"google_tag_params.ecomm_totalvalue"
    },{
      "function":"__aev",
      "vtp_setDefaultValue":false,
      "vtp_stripWww":true,
      "vtp_varType":"URL",
      "vtp_component":"HOST"
    },{
      "function":"__u",
      "vtp_component":"URL",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__u",
      "vtp_component":"HOST",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__u",
      "vtp_component":"PATH",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__f",
      "vtp_component":"URL"
    },{
      "function":"__e"
    },{
      "function":"__v",
      "vtp_name":"gtm.element",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.elementClasses",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.elementTarget",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.elementUrl",
      "vtp_dataLayerVersion":1
    }],
  "tags":[{
      "function":"__html",
      "priority":10,
      "once_per_load":true,
      "vtp_html":"\n\u003Cscript type=\"text\/gtmscript\"\u003E!function(b,e,f,g,a,c,d){b.fbq||(a=b.fbq=function(){a.callMethod?a.callMethod.apply(a,arguments):a.queue.push(arguments)},b._fbq||(b._fbq=a),a.push=a,a.loaded=!0,a.version=\"2.0\",a.queue=[],c=e.createElement(f),c.async=!0,c.src=g,d=e.getElementsByTagName(f)[0],d.parentNode.insertBefore(c,d))}(window,document,\"script\",\"https:\/\/connect.facebook.net\/en_US\/fbevents.js\");fbq(\"init\",\"1720153058307192\");fbq(\"track\",\"PageView\");\u003C\/script\u003E\n\u003Cnoscript\u003E\u003Cimg height=\"1\" width=\"1\" style=\"display:none\" src=\"https:\/\/www.facebook.com\/tr?id=1720153058307192\u0026amp;ev=PageView\u0026amp;noscript=1\"\u003E\u003C\/noscript\u003E\n\n\n",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":27
    },{
      "function":"__ua",
      "priority":2,
      "once_per_load":true,
      "vtp_overrideGaSettings":false,
      "vtp_trackType":"TRACK_PAGEVIEW",
      "vtp_gaSettings":["macro",4],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "tag_id":30
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Ecommerce",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",4],
      "vtp_eventAction":"Add Impression",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":23
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Ecommerce",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",4],
      "vtp_eventAction":"Add to Cart",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":25
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":true,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Ecommerce",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",4],
      "vtp_eventAction":"Checkout",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":26
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Ecommerce",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",4],
      "vtp_eventAction":"Purchase",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":29
    },{
      "function":"__ua",
      "once_per_load":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Ecommerce",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",4],
      "vtp_eventAction":"View Product",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":32
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_overrideGaSettings":true,
      "vtp_fieldsToSet":["list",["map","fieldName","page","value",["template","\/?q=",["macro",6]]]],
      "vtp_trackType":"TRACK_PAGEVIEW",
      "vtp_gaSettings":["macro",4],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "tag_id":33
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":true,
      "vtp_useDebugVersion":false,
      "vtp_eventCategory":"Page Load Time",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",4],
      "vtp_eventAction":["macro",9],
      "vtp_eventLabel":["macro",7],
      "vtp_overrideGaSettings":true,
      "vtp_doubleClick":false,
      "vtp_setTrackerName":false,
      "vtp_eventValue":["macro",7],
      "vtp_fieldsToSet":["list",["map","fieldName","cookieDomain","value","auto"]],
      "vtp_enableLinkId":false,
      "vtp_enableEcommerce":false,
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":34
    },{
      "function":"__awct",
      "once_per_load":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",10],
      "vtp_conversionValue":["macro",11],
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"1014834932",
      "vtp_currencyCode":"USD",
      "vtp_conversionLabel":"UcwmCPnWmmMQ9M304wM",
      "vtp_url":["macro",12],
      "vtp_enableProductReportingCheckbox":true,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "vtp_enableRdpCheckbox":false,
      "tag_id":36
    },{
      "function":"__sp",
      "once_per_event":true,
      "vtp_dataLayerVariable":["macro",13],
      "vtp_conversionId":"1014834932",
      "vtp_customParamsFormat":"DATA_LAYER",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",12],
      "vtp_enableRdpCheckbox":false,
      "tag_id":37
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventValue":["macro",14],
      "vtp_eventCategory":"Learn - Add All to Cart",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",4],
      "vtp_eventAction":["macro",15],
      "vtp_eventLabel":["macro",16],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":38
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Search Refinement",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",4],
      "vtp_eventAction":["macro",6],
      "vtp_eventLabel":["macro",17],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":40
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Search Pagination",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",4],
      "vtp_eventAction":["macro",6],
      "vtp_eventLabel":["macro",17],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":41
    },{
      "function":"__gclidw",
      "once_per_event":true,
      "vtp_enableCookieOverrides":false,
      "vtp_enableCrossDomainFeature":true,
      "vtp_enableCookieUpdateFeature":false,
      "tag_id":44
    },{
      "function":"__lcl",
      "vtp_waitForTags":true,
      "vtp_checkValidation":true,
      "vtp_waitForTagsTimeout":"250",
      "vtp_uniqueTriggerId":"7009469_55",
      "tag_id":45
    },{
      "function":"__lcl",
      "vtp_waitForTags":false,
      "vtp_checkValidation":false,
      "vtp_waitForTagsTimeout":"2000",
      "vtp_uniqueTriggerId":"7009469_56",
      "tag_id":46
    },{
      "function":"__html",
      "once_per_load":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Evar adaboxSubscription=function(){fbq(\"track\",\"CompleteRegistration\",{content_name:\"Adabox\"})};\"undefined\"!=typeof fbq\u0026\u0026fbq?adaboxSubscription():fbPixelEventQueue.push(adaboxSubscription);\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":22
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Evar addToCart=function(){var a=",["escape",["macro",20],8,16],"[0];fbq(\"track\",\"AddToCart\",{currency:\"USD\",content_ids:[a.id],content_type:\"product\",value:a.value})};\"undefined\"!=typeof fbq\u0026\u0026fbq?addToCart():fbPixelEventQueue.push(addToCart);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":24
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Evar fbPurchase=function(){for(var a=",["escape",["macro",21],8,16],",c=[],b=0;b\u003Ca.products.length;b++)c.push(a.products[b].id);fbq(\"track\",\"Purchase\",{content_ids:c,content_type:\"product\",value:a.actionField.revenue,currency:\"USD\"})};\"undefined\"!=typeof fbq\u0026\u0026fbq?fbPurchase():fbPixelEventQueue.push(fbPurchase);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":28
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Evar fbViewProduct=function(){var a=",["escape",["macro",22],8,16],"[0];fbq(\"track\",\"ViewContent\",{content_ids:[a.id],content_type:\"product\"})};\"undefined\"!=typeof fbq\u0026\u0026fbq?fbViewProduct():fbPixelEventQueue.push(fbViewProduct);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":31
    }],
  "predicates":[{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"addImpression"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"addToCart"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"checkout"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"purchase"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"gtm.js"
    },{
      "function":"_eq",
      "arg0":["macro",5],
      "arg1":"1"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"viewProduct"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"search"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"gtm.load"
    },{
      "function":"_lt",
      "arg0":["macro",7],
      "arg1":"0"
    },{
      "function":"_re",
      "arg0":["macro",0],
      "arg1":".*"
    },{
      "function":"_gt",
      "arg0":["macro",7],
      "arg1":"120"
    },{
      "function":"_eq",
      "arg0":["macro",8],
      "arg1":"true"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"adafruit.vm"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"remarketingReady"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"AlsAddAllToCart"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"searchRefinement"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"searchPagination"
    },{
      "function":"_cn",
      "arg0":["macro",18],
      "arg1":"adabox_checkout"
    },{
      "function":"_eq",
      "arg0":["macro",19],
      "arg1":"checkout_success"
    }],
  "rules":[
    [["if",0],["add",2]],
    [["if",1],["add",3,18]],
    [["if",2],["add",4]],
    [["if",3],["add",5,19,9]],
    [["if",4],["add",1,0,14,16]],
    [["if",6],["add",6,20]],
    [["if",7],["add",7]],
    [["if",8],["add",8]],
    [["if",14],["add",10]],
    [["if",15],["add",11]],
    [["if",16],["add",12]],
    [["if",17],["add",13]],
    [["if",4],["unless",5],["add",15]],
    [["if",4,18],["add",17]],
    [["if",4,5],["block",1,9,10,0]],
    [["if",9,10],["block",8]],
    [["if",10,11],["block",8]],
    [["if",10,12],["block",8]],
    [["if",4,13],["block",9]],
    [["if",4],["unless",19],["block",17]]]
},
"runtime":[]




};
/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var aa,ba=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}},da=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:ba(a)}},ea="function"==typeof Object.create?Object.create:function(a){var b=function(){};b.prototype=a;return new b},fa;
if("function"==typeof Object.setPrototypeOf)fa=Object.setPrototypeOf;else{var ha;a:{var ka={a:!0},la={};try{la.__proto__=ka;ha=la.a;break a}catch(a){}ha=!1}fa=ha?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}
var na=fa,pa=function(a,b){a.prototype=ea(b.prototype);a.prototype.constructor=a;if(na)na(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.di=b.prototype},qa=this||self,ta=function(a){if(a&&a!=qa)return ra(a.document);null===sa&&(sa=ra(qa.document));return sa},ua=/^[\w+/_-]+[=]{0,2}$/,sa=null,ra=function(a){var b=a.querySelector&&a.querySelector("script[nonce]");if(b){var c=b.nonce||b.getAttribute("nonce");
if(c&&ua.test(c))return c}return""},va=function(a){var b=typeof a;return"object"!=b?b:a?Array.isArray(a)?"array":b:"null"},xa=function(a,b){function c(){}c.prototype=b.prototype;a.di=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.yi=function(d,e,f){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return b.prototype[e].apply(d,h)}},ya=function(a){return a};var za=function(){},Aa=function(a){return"function"==typeof a},g=function(a){return"string"==typeof a},Ca=function(a){return"number"==typeof a&&!isNaN(a)},Da=function(a){return"[object Array]"==Object.prototype.toString.call(Object(a))},Ea=function(a,b){if(Array.prototype.indexOf){var c=a.indexOf(b);return"number"==typeof c?c:-1}for(var d=0;d<a.length;d++)if(a[d]===b)return d;return-1},Fa=function(a,b){if(a&&Da(a))for(var c=0;c<a.length;c++)if(a[c]&&b(a[c]))return a[c]},Ga=function(a,b){if(!Ca(a)||
!Ca(b)||a>b)a=0,b=2147483647;return Math.floor(Math.random()*(b-a+1)+a)},Ja=function(a,b){for(var c=new Ia,d=0;d<a.length;d++)c.set(a[d],!0);for(var e=0;e<b.length;e++)if(c.get(b[e]))return!0;return!1},Ka=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])},La=function(a){return!!a&&("[object Arguments]"==Object.prototype.toString.call(a)||Object.prototype.hasOwnProperty.call(a,"callee"))},Na=function(a){return Math.round(Number(a))||0},Sa=function(a){return"false"==
String(a).toLowerCase()?!1:!!a},Ta=function(a){var b=[];if(Da(a))for(var c=0;c<a.length;c++)b.push(String(a[c]));return b},Ua=function(a){return a?a.replace(/^\s+|\s+$/g,""):""},Va=function(){return(new Date).getTime()},Ia=function(){this.prefix="gtm.";this.values={}};Ia.prototype.set=function(a,b){this.values[this.prefix+a]=b};Ia.prototype.get=function(a){return this.values[this.prefix+a]};
var Xa=function(a,b,c){return a&&a.hasOwnProperty(b)?a[b]:c},Ya=function(a){var b=!1;return function(){if(!b)try{a()}catch(c){}b=!0}},bb=function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])},cb=function(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1},db=function(a,b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]),c.push.apply(c,b[a[d]]||[]);return c},eb=function(a,b){for(var c={},d=c,e=a.split("."),f=0;f<e.length-1;f++)d=d[e[f]]={};d[e[e.length-1]]=b;return c},fb=function(a){var b=
[];Ka(a,function(c,d){10>c.length&&d&&b.push(c)});return b.join(",")};/*
 jQuery v1.9.1 (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license. */
var gb=/\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,hb=function(a){if(null==a)return String(a);var b=gb.exec(Object.prototype.toString.call(Object(a)));return b?b[1].toLowerCase():"object"},ib=function(a,b){return Object.prototype.hasOwnProperty.call(Object(a),b)},kb=function(a){if(!a||"object"!=hb(a)||a.nodeType||a==a.window)return!1;try{if(a.constructor&&!ib(a,"constructor")&&!ib(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}for(var b in a);return void 0===
b||ib(a,b)},m=function(a,b){var c=b||("array"==hb(a)?[]:{}),d;for(d in a)if(ib(a,d)){var e=a[d];"array"==hb(e)?("array"!=hb(c[d])&&(c[d]=[]),c[d]=m(e,c[d])):kb(e)?(kb(c[d])||(c[d]={}),c[d]=m(e,c[d])):c[d]=e}return c};var lb=function(a){if(void 0===a||Da(a)||kb(a))return!0;switch(typeof a){case "boolean":case "number":case "string":case "function":return!0}return!1};
var mb=[],nb={"\x00":"&#0;",'"':"&quot;","&":"&amp;","'":"&#39;","<":"&lt;",">":"&gt;","\t":"&#9;","\n":"&#10;","\x0B":"&#11;","\f":"&#12;","\r":"&#13;"," ":"&#32;","-":"&#45;","/":"&#47;","=":"&#61;","`":"&#96;","\u0085":"&#133;","\u00a0":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"},ob=function(a){return nb[a]},pb=/[\x00\x22\x26\x27\x3c\x3e]/g;var tb=/[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g,ub={"\x00":"\\x00","\b":"\\x08","\t":"\\t","\n":"\\n","\x0B":"\\x0b",
"\f":"\\f","\r":"\\r",'"':"\\x22","&":"\\x26","'":"\\x27","/":"\\/","<":"\\x3c","=":"\\x3d",">":"\\x3e","\\":"\\\\","\u0085":"\\x85","\u2028":"\\u2028","\u2029":"\\u2029",$:"\\x24","(":"\\x28",")":"\\x29","*":"\\x2a","+":"\\x2b",",":"\\x2c","-":"\\x2d",".":"\\x2e",":":"\\x3a","?":"\\x3f","[":"\\x5b","]":"\\x5d","^":"\\x5e","{":"\\x7b","|":"\\x7c","}":"\\x7d"},vb=function(a){return ub[a]};
mb[8]=function(a){if(null==a)return" null ";switch(typeof a){case "boolean":case "number":return" "+a+" ";default:return"'"+String(String(a)).replace(tb,vb)+"'"}};var Fb=/[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,Gb={"\x00":"%00","\u0001":"%01","\u0002":"%02","\u0003":"%03","\u0004":"%04","\u0005":"%05","\u0006":"%06","\u0007":"%07","\b":"%08","\t":"%09","\n":"%0A","\x0B":"%0B","\f":"%0C","\r":"%0D","\u000e":"%0E","\u000f":"%0F","\u0010":"%10",
"\u0011":"%11","\u0012":"%12","\u0013":"%13","\u0014":"%14","\u0015":"%15","\u0016":"%16","\u0017":"%17","\u0018":"%18","\u0019":"%19","\u001a":"%1A","\u001b":"%1B","\u001c":"%1C","\u001d":"%1D","\u001e":"%1E","\u001f":"%1F"," ":"%20",'"':"%22","'":"%27","(":"%28",")":"%29","<":"%3C",">":"%3E","\\":"%5C","{":"%7B","}":"%7D","\u007f":"%7F","\u0085":"%C2%85","\u00a0":"%C2%A0","\u2028":"%E2%80%A8","\u2029":"%E2%80%A9","\uff01":"%EF%BC%81","\uff03":"%EF%BC%83","\uff04":"%EF%BC%84","\uff06":"%EF%BC%86",
"\uff07":"%EF%BC%87","\uff08":"%EF%BC%88","\uff09":"%EF%BC%89","\uff0a":"%EF%BC%8A","\uff0b":"%EF%BC%8B","\uff0c":"%EF%BC%8C","\uff0f":"%EF%BC%8F","\uff1a":"%EF%BC%9A","\uff1b":"%EF%BC%9B","\uff1d":"%EF%BC%9D","\uff1f":"%EF%BC%9F","\uff20":"%EF%BC%A0","\uff3b":"%EF%BC%BB","\uff3d":"%EF%BC%BD"},Hb=function(a){return Gb[a]};mb[16]=function(a){return a};var Jb;
var Kb=[],Lb=[],Mb=[],Nb=[],Ob=[],Pb={},Sb,Tb,Ub,Vb=function(a,b){var c=a["function"];if(!c)throw Error("Error: No function name given for function call.");var d=Pb[c],e={},f;for(f in a)a.hasOwnProperty(f)&&0===f.indexOf("vtp_")&&(d&&b&&b.Ze&&b.Ze(a[f]),e[void 0!==d?f:f.substr(4)]=a[f]);return void 0!==d?d(e):Jb(c,e,b)},Xb=function(a,b,c){c=c||[];var d={},e;for(e in a)a.hasOwnProperty(e)&&(d[e]=Wb(a[e],b,c));return d},Wb=function(a,b,c){if(Da(a)){var d;switch(a[0]){case "function_id":return a[1];
case "list":d=[];for(var e=1;e<a.length;e++)d.push(Wb(a[e],b,c));return d;case "macro":var f=a[1];if(c[f])return;var h=Kb[f];if(!h||b.xd(h))return;c[f]=!0;try{var k=Xb(h,b,c);k.vtp_gtmEventId=b.id;d=Vb(k,b);Ub&&(d=Ub.$g(d,k))}catch(y){b.pf&&b.pf(y,Number(f)),d=!1}c[f]=!1;return d;case "map":d={};for(var l=1;l<a.length;l+=2)d[Wb(a[l],b,c)]=Wb(a[l+1],b,c);return d;case "template":d=[];for(var q=!1,r=1;r<a.length;r++){var n=Wb(a[r],b,c);Tb&&(q=q||n===Tb.fc);d.push(n)}return Tb&&q?Tb.dh(d):d.join("");
case "escape":d=Wb(a[1],b,c);if(Tb&&Da(a[1])&&"macro"===a[1][0]&&Tb.zh(a))return Tb.Qh(d);d=String(d);for(var t=2;t<a.length;t++)mb[a[t]]&&(d=mb[a[t]](d));return d;case "tag":var p=a[1];if(!Nb[p])throw Error("Unable to resolve tag reference "+p+".");return d={df:a[2],index:p};case "zb":var u={arg0:a[2],arg1:a[3],ignore_case:a[5]};u["function"]=a[1];var v=Zb(u,b,c),w=!!a[4];return w||2!==v?w!==(1===v):null;default:throw Error("Attempting to expand unknown Value type: "+a[0]+".");}}return a},Zb=function(a,
b,c){try{return Sb(Xb(a,b,c))}catch(d){JSON.stringify(a)}return 2};var $b=function(){var a=function(b){return{toString:function(){return b}}};return{Gf:a("consent"),Wd:a("convert_case_to"),Xd:a("convert_false_to"),Yd:a("convert_null_to"),Zd:a("convert_true_to"),$d:a("convert_undefined_to"),mi:a("debug_mode_metadata"),Na:a("function"),ug:a("instance_name"),vg:a("live_only"),wg:a("malware_disabled"),xg:a("metadata"),ri:a("original_activity_id"),si:a("original_vendor_template_id"),zg:a("once_per_event"),Pe:a("once_per_load"),Te:a("setup_tags"),Ue:a("tag_id"),Ve:a("teardown_tags")}}();var ac=null,dc=function(a){function b(n){for(var t=0;t<n.length;t++)d[n[t]]=!0}var c=[],d=[];ac=bc(a);for(var e=0;e<Lb.length;e++){var f=Lb[e],h=cc(f);if(h){for(var k=f.add||[],l=0;l<k.length;l++)c[k[l]]=!0;b(f.block||[])}else null===h&&b(f.block||[])}for(var q=[],r=0;r<Nb.length;r++)c[r]&&!d[r]&&(q[r]=!0);return q},cc=function(a){for(var b=a["if"]||[],c=0;c<b.length;c++){var d=ac(b[c]);if(0===d)return!1;if(2===d)return null}for(var e=a.unless||[],f=0;f<e.length;f++){var h=ac(e[f]);if(2===h)return null;
if(1===h)return!1}return!0},bc=function(a){var b=[];return function(c){void 0===b[c]&&(b[c]=Zb(Mb[c],a));return b[c]}};var ec={$g:function(a,b){b[$b.Wd]&&"string"===typeof a&&(a=1==b[$b.Wd]?a.toLowerCase():a.toUpperCase());b.hasOwnProperty($b.Yd)&&null===a&&(a=b[$b.Yd]);b.hasOwnProperty($b.$d)&&void 0===a&&(a=b[$b.$d]);b.hasOwnProperty($b.Zd)&&!0===a&&(a=b[$b.Zd]);b.hasOwnProperty($b.Xd)&&!1===a&&(a=b[$b.Xd]);return a}};/*
 Copyright (c) 2014 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE. Portions derived from simplehtmlparser, which is licensed under the Apache License, Version 2.0 */
var C={yb:"_ee",ld:"_syn",wi:"_uei",ed:"_eu",ui:"_pci",Tc:"event_callback",Zb:"event_timeout",fa:"gtag.config",Ja:"gtag.get",ma:"purchase",Xa:"refund",Ia:"begin_checkout",Va:"add_to_cart",Wa:"remove_from_cart",Qf:"view_cart",de:"add_to_wishlist",ya:"view_item",ce:"view_promotion",be:"select_promotion",Oc:"select_item",Wb:"view_item_list",ae:"add_payment_info",Pf:"add_shipping_info",Ba:"value_key",Aa:"value_callback",ia:"allow_ad_personalization_signals",ad:"restricted_data_processing",ob:"allow_google_signals",
ja:"cookie_expires",rb:"cookie_update",vb:"session_duration",oa:"user_properties",Ma:"transport_url",O:"ads_data_redaction",B:"ad_storage",I:"analytics_storage",Hf:"region",If:"wait_for_update"};
C.Pc="page_view",C.ee="user_engagement",C.Kf="app_remove",C.Lf="app_store_refund",C.Mf="app_store_subscription_cancel",C.Nf="app_store_subscription_convert",C.Of="app_store_subscription_renew",C.Rf="first_open",C.Sf="first_visit",C.Tf="in_app_purchase",C.Uf="session_start",C.Vf="allow_custom_scripts",C.Wf="allow_display_features",C.Qc="allow_enhanced_conversions",C.we="enhanced_conversions",C.Ya="client_id",C.X="cookie_domain",C.Yb="cookie_name",C.Ka="cookie_path",C.na="cookie_flags",C.za="currency",
C.pe="custom_map",C.Xc="groups",C.Za="language",C.ne="country",C.ni="non_interaction",C.tb="page_location",C.Ca="page_referrer",C.$c="page_title",C.ub="send_page_view",C.La="send_to",C.bd="session_engaged",C.bc="session_id",C.cd="session_number",C.og="tracking_id",C.ka="linker",C.Da="url_passthrough",C.$a="accept_incoming",C.H="domains",C.cb="url_position",C.ab="decorate_forms",C.Be="phone_conversion_number",C.ze="phone_conversion_callback",C.Ae="phone_conversion_css_class",C.Ce="phone_conversion_options",
C.jg="phone_conversion_ids",C.ig="phone_conversion_country_code",C.fe="aw_remarketing",C.he="aw_remarketing_only",C.Xb="gclid",C.Ea="value",C.kg="quantity",C.$f="affiliation",C.ve="tax",C.ue="shipping",C.Sc="list_name",C.te="checkout_step",C.se="checkout_option",C.ag="coupon",C.bg="promotions",C.wb="transaction_id",C.xb="user_id",C.lg="retoken",C.qb="conversion_linker",C.pb="conversion_cookie_prefix",C.Z="cookie_prefix",C.W="items",C.me="aw_merchant_id",C.je="aw_feed_country",C.ke="aw_feed_language",
C.ie="discount",C.qe="disable_merchant_reported_purchases",C.ye="new_customer",C.oe="customer_lifetime_value",C.Zf="dc_natural_search",C.Yf="dc_custom_params",C.pg="trip_type",C.hg="passengers",C.fg="method",C.ng="search_term",C.Xf="content_type",C.gg="optimize_id",C.cg="experiments",C.sb="google_signals",C.Wc="google_tld",C.cc="update",C.Vc="firebase_id",C.$b="ga_restrict_domain",C.Uc="event_settings",C.Rc="dynamic_event_settings",C.mg="screen_name",C.eg="_x_19",C.dg="_x_20",C.Zc="internal_traffic_results",
C.De="traffic_type",C.ac="referral_exclusion_definition",C.Yc="ignore_referrer",C.dd="delivery_postal_code",C.xe="estimated_delivery_date",C.qg=[C.ia,C.Qc,C.ob,C.W,C.ad,C.X,C.ja,C.na,C.Yb,C.Ka,C.Z,C.rb,C.pe,C.Rc,C.Tc,C.Uc,C.Zb,C.$b,C.sb,C.Wc,C.Xc,C.Zc,C.ka,C.ac,C.La,C.ub,C.vb,C.Ma,C.cc,C.oa,C.dd,C.ed],C.Ee=[C.tb,C.Ca,C.$c,C.Za,C.mg,C.xb,C.Vc],C.sg=[C.Kf,C.Lf,C.Mf,C.Nf,C.Of,C.Rf,C.Sf,C.Tf,C.Uf,C.ee],C.Vd=[C.ia,C.Qc,C.fe,C.he,C.ie,C.je,C.ke,C.W,C.me,C.pb,C.qb,C.X,C.ja,C.na,C.Z,C.za,C.oe,C.qe,C.we,C.xe,
C.Vc,C.Za,C.ye,C.tb,C.Ca,C.ze,C.Ae,C.Be,C.Ce,C.ad,C.ub,C.La,C.dd,C.wb,C.Ma,C.cc,C.Da,C.xb,C.Ea];C.Ge=[C.ma,C.Xa,C.Ia,C.Va,C.Wa,C.Qf,C.de,C.ya,C.ce,C.be,C.Wb,C.Oc,C.ae,C.Pf];C.Fe=[C.ia,C.ob,C.rb];C.He=[C.ja,C.Zb,C.vb];var Fc={},Gc=function(a,b){Fc[a]=Fc[a]||[];Fc[a][b]=!0},Hc=function(a){for(var b=[],c=Fc[a]||[],d=0;d<c.length;d++)c[d]&&(b[Math.floor(d/6)]^=1<<d%6);for(var e=0;e<b.length;e++)b[e]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(b[e]||0);return b.join("")};var E=function(a){Gc("GTM",a)};function Ic(a){if(Error.captureStackTrace)Error.captureStackTrace(this,Ic);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}xa(Ic,Error);Ic.prototype.name="CustomError";var Jc=function(a,b){for(var c=a.split("%s"),d="",e=c.length-1,f=0;f<e;f++)d+=c[f]+(f<b.length?b[f]:"%s");Ic.call(this,d+c[e])};xa(Jc,Ic);Jc.prototype.name="AssertionError";var Nc=function(a,b){throw new Jc("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};var Oc=function(a,b){var c=function(){};c.prototype=a.prototype;var d=new c;a.apply(d,Array.prototype.slice.call(arguments,1));return d},Pc=function(a){var b=a;return function(){if(b){var c=b;b=null;c()}}};var Qc,Rc=function(){if(void 0===Qc){var a=null,b=qa.trustedTypes;if(b&&b.createPolicy){try{a=b.createPolicy("goog#html",{createHTML:ya,createScript:ya,createScriptURL:ya})}catch(c){qa.console&&qa.console.error(c.message)}Qc=a}else Qc=a}return Qc};var Tc=function(a,b){this.m=b===Sc?a:""};Tc.prototype.toString=function(){return this.m+""};var Sc={};var Uc=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;var Vc;a:{var Wc=qa.navigator;if(Wc){var Xc=Wc.userAgent;if(Xc){Vc=Xc;break a}}Vc=""}var Yc=function(a){return-1!=Vc.indexOf(a)};var $c=function(a,b,c){this.m=c===Zc?a:""};$c.prototype.toString=function(){return this.m.toString()};var ad=function(a){if(a instanceof $c&&a.constructor===$c)return a.m;Nc("expected object of type SafeHtml, got '"+a+"' of type "+va(a));return"type_error:SafeHtml"},Zc={},bd=new $c(qa.trustedTypes&&qa.trustedTypes.emptyHTML||"",0,Zc);var cd={MATH:!0,SCRIPT:!0,STYLE:!0,SVG:!0,TEMPLATE:!0},dd=function(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}(function(){if("undefined"===typeof document)return!1;var a=document.createElement("div"),b=document.createElement("div");b.appendChild(document.createElement("div"));a.appendChild(b);if(!a.firstChild)return!1;var c=a.firstChild.firstChild;a.innerHTML=ad(bd);return!c.parentElement}),fd=function(a,b){if(a.tagName&&cd[a.tagName.toUpperCase()])throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of "+
a.tagName+".");if(dd())for(;a.lastChild;)a.removeChild(a.lastChild);a.innerHTML=ad(b)};var gd=function(a){var b=Rc(),c=b?b.createHTML(a):a;return new $c(c,null,Zc)};var G=window,H=document,hd=navigator,id=H.currentScript&&H.currentScript.src,jd=function(a,b){var c=G[a];G[a]=void 0===c?b:c;return G[a]},kd=function(a,b){b&&(a.addEventListener?a.onload=b:a.onreadystatechange=function(){a.readyState in{loaded:1,complete:1}&&(a.onreadystatechange=null,b())})},ld=function(a,b,c){var d=H.createElement("script");d.type="text/javascript";d.async=!0;var e,f=Rc(),h=f?f.createScriptURL(a):a;e=new Tc(h,Sc);var k;a:{try{var l=d&&d.ownerDocument,q=l&&(l.defaultView||l.parentWindow);
q=q||qa;if(q.Element&&q.Location){k=q;break a}}catch(w){}k=null}if(k&&"undefined"!=typeof k.HTMLScriptElement&&(!d||!(d instanceof k.HTMLScriptElement)&&(d instanceof k.Location||d instanceof k.Element))){var r;var n=typeof d;if("object"==n&&null!=d||"function"==n)try{r=d.constructor.displayName||d.constructor.name||Object.prototype.toString.call(d)}catch(w){r="<object could not be stringified>"}else r=void 0===d?"undefined":null===d?"null":typeof d;Nc("Argument is not a %s (or a non-Element, non-Location mock); got: %s",
"HTMLScriptElement",r)}var t;e instanceof Tc&&e.constructor===Tc?t=e.m:(Nc("expected object of type TrustedResourceUrl, got '"+e+"' of type "+va(e)),t="type_error:TrustedResourceUrl");d.src=t;var p=ta(d.ownerDocument&&d.ownerDocument.defaultView);p&&d.setAttribute("nonce",p);kd(d,b);c&&(d.onerror=c);var u=ta();u&&d.setAttribute("nonce",u);var v=H.getElementsByTagName("script")[0]||H.body||H.head;v.parentNode.insertBefore(d,v);return d},md=function(){if(id){var a=id.toLowerCase();if(0===a.indexOf("https://"))return 2;
if(0===a.indexOf("http://"))return 3}return 1},nd=function(a,b){var c=H.createElement("iframe");c.height="0";c.width="0";c.style.display="none";c.style.visibility="hidden";var d=H.body&&H.body.lastChild||H.body||H.head;d.parentNode.insertBefore(c,d);kd(c,b);void 0!==a&&(c.src=a);return c},od=function(a,b,c){var d=new Image(1,1);d.onload=function(){d.onload=null;b&&b()};d.onerror=function(){d.onerror=null;c&&c()};d.src=a;return d},pd=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):
a.attachEvent&&a.attachEvent("on"+b,c)},qd=function(a,b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent("on"+b,c)},I=function(a){G.setTimeout(a,0)},rd=function(a,b){return a&&b&&a.attributes&&a.attributes[b]?a.attributes[b].value:null},sd=function(a){var b=a.innerText||a.textContent||"";b&&" "!=b&&(b=b.replace(/^[\s\xa0]+|[\s\xa0]+$/g,""));b&&(b=b.replace(/(\xa0+|\s{2,}|\n|\r\t)/g," "));return b},td=function(a){var b=H.createElement("div");fd(b,gd("A<div>"+a+"</div>"));
b=b.lastChild;for(var c=[];b.firstChild;)c.push(b.removeChild(b.firstChild));return c},ud=function(a,b,c){c=c||100;for(var d={},e=0;e<b.length;e++)d[b[e]]=!0;for(var f=a,h=0;f&&h<=c;h++){if(d[String(f.tagName).toLowerCase()])return f;f=f.parentElement}return null},vd=function(a){hd.sendBeacon&&hd.sendBeacon(a)||od(a)},wd=function(a,b){var c=a[b];c&&"string"===typeof c.animVal&&(c=c.animVal);return c};var xd={},yd=function(){return void 0==xd.gtag_cs_api?!1:xd.gtag_cs_api};var zd=[];function Ad(){var a=jd("google_tag_data",{});a.ics||(a.ics={entries:{},set:Bd,update:Cd,addListener:Dd,notifyListeners:Ed,active:!1});return a.ics}
function Bd(a,b,c,d,e,f){var h=Ad();h.active=!0;if(void 0!=b){var k=h.entries,l=k[a]||{},q=l.region,r=c&&g(c)?c.toUpperCase():void 0;d=d.toUpperCase();e=e.toUpperCase();if(r===e||(r===d?q!==e:!r&&!q)){var n=!!(f&&0<f&&void 0===l.update),t={region:r,initial:"granted"===b,update:l.update,quiet:n};k[a]=t;n&&G.setTimeout(function(){k[a]===t&&t.quiet&&(t.quiet=!1,Fd(a),Ed(),Gc("TAGGING",2))},f)}}}
function Cd(a,b){var c=Ad();c.active=!0;if(void 0!=b){var d=Gd(a),e=c.entries,f=e[a]=e[a]||{};f.update="granted"===b;var h=Gd(a);f.quiet?(f.quiet=!1,Fd(a)):h!==d&&Fd(a)}}function Dd(a,b){zd.push({af:a,mh:b})}function Fd(a){for(var b=0;b<zd.length;++b){var c=zd[b];Da(c.af)&&-1!==c.af.indexOf(a)&&(c.tf=!0)}}function Ed(a){for(var b=0;b<zd.length;++b){var c=zd[b];if(c.tf){c.tf=!1;try{c.mh({$e:a})}catch(d){}}}}
var Gd=function(a){var b=Ad().entries[a]||{};return void 0!==b.update?b.update:void 0!==b.initial?b.initial:void 0},Hd=function(a){return!(Ad().entries[a]||{}).quiet},Id=function(){return yd()?Ad().active:!1},Jd=function(a,b){Ad().addListener(a,b)},Kd=function(a,b){function c(){for(var e=0;e<b.length;e++)if(!Hd(b[e]))return!0;return!1}if(c()){var d=!1;Jd(b,function(e){d||c()||(d=!0,a(e))})}else a({})},Ld=function(a,b){if(!1===Gd(b)){var c=!1;Jd([b],function(d){!c&&Gd(b)&&(a(d),c=!0)})}};var Md=[C.B,C.I],Nd=function(a){var b=a[C.Hf];b&&E(40);var c=a[C.If];c&&E(41);for(var d=Da(b)?b:[b],e=0;e<d.length;++e)for(var f=0;f<Md.length;f++){var h=Md[f],k=a[Md[f]],l=d[e];Ad().set(h,k,l,"US","US-ME",c)}},Od=function(a,b){for(var c=0;c<Md.length;c++){var d=Md[c],e=a[Md[c]];Ad().update(d,e)}Ad().notifyListeners(b)},Pd=function(a){var b=Gd(a);return void 0!=b?b:!0},Qd=function(){for(var a=[],b=0;b<Md.length;b++){var c=Gd(Md[b]);a[b]=!0===c?"1":!1===c?"0":"-"}return"G1"+
a.join("")},Rd=function(a,b){Kd(a,b)};var Td=function(a){return Sd?H.querySelectorAll(a):null},Ud=function(a,b){if(!Sd)return null;if(Element.prototype.closest)try{return a.closest(b)}catch(e){return null}var c=Element.prototype.matches||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector,d=a;if(!H.documentElement.contains(d))return null;do{try{if(c.call(d,b))return d}catch(e){break}d=d.parentElement||d.parentNode}while(null!==d&&1===d.nodeType);
return null},Vd=!1;if(H.querySelectorAll)try{var Wd=H.querySelectorAll(":root");Wd&&1==Wd.length&&Wd[0]==H.documentElement&&(Vd=!0)}catch(a){}var Sd=Vd;var $d=function(a){if(H.hidden)return!0;var b=a.getBoundingClientRect();if(b.top==b.bottom||b.left==b.right||!G.getComputedStyle)return!0;var c=G.getComputedStyle(a,null);if("hidden"===c.visibility)return!0;for(var d=a,e=c;d;){if("none"===e.display)return!0;var f=e.opacity,h=e.filter;if(h){var k=h.indexOf("opacity(");0<=k&&(h=h.substring(k+8,h.indexOf(")",k)),"%"==h.charAt(h.length-1)&&(h=h.substring(0,h.length-1)),f=Math.min(h,f))}if(void 0!==f&&0>=f)return!0;(d=d.parentElement)&&(e=G.getComputedStyle(d,
null))}return!1};var ie=/:[0-9]+$/,je=function(a,b,c){for(var d=a.split("&"),e=0;e<d.length;e++){var f=d[e].split("=");if(decodeURIComponent(f[0]).replace(/\+/g," ")===b){var h=f.slice(1).join("=");return c?h:decodeURIComponent(h).replace(/\+/g," ")}}},me=function(a,b,c,d,e){b&&(b=String(b).toLowerCase());if("protocol"===b||"port"===b)a.protocol=ke(a.protocol)||ke(G.location.protocol);"port"===b?a.port=String(Number(a.hostname?a.port:G.location.port)||("http"==a.protocol?80:"https"==a.protocol?443:"")):"host"===b&&
(a.hostname=(a.hostname||G.location.hostname).replace(ie,"").toLowerCase());return le(a,b,c,d,e)},le=function(a,b,c,d,e){var f,h=ke(a.protocol);b&&(b=String(b).toLowerCase());switch(b){case "url_no_fragment":f=ne(a);break;case "protocol":f=h;break;case "host":f=a.hostname.replace(ie,"").toLowerCase();if(c){var k=/^www\d*\./.exec(f);k&&k[0]&&(f=f.substr(k[0].length))}break;case "port":f=String(Number(a.port)||("http"==h?80:"https"==h?443:""));break;case "path":a.pathname||a.hostname||Gc("TAGGING",
1);f="/"==a.pathname.substr(0,1)?a.pathname:"/"+a.pathname;var l=f.split("/");0<=Ea(d||[],l[l.length-1])&&(l[l.length-1]="");f=l.join("/");break;case "query":f=a.search.replace("?","");e&&(f=je(f,e,void 0));break;case "extension":var q=a.pathname.split(".");f=1<q.length?q[q.length-1]:"";f=f.split("/")[0];break;case "fragment":f=a.hash.replace("#","");break;default:f=a&&a.href}return f},ke=function(a){return a?a.replace(":","").toLowerCase():""},ne=function(a){var b="";if(a&&a.href){var c=a.href.indexOf("#");
b=0>c?a.href:a.href.substr(0,c)}return b},oe=function(a){var b=H.createElement("a");a&&(b.href=a);var c=b.pathname;"/"!==c[0]&&(a||Gc("TAGGING",1),c="/"+c);var d=b.hostname.replace(ie,"");return{href:b.href,protocol:b.protocol,host:b.host,hostname:d,pathname:c,search:b.search,hash:b.hash,port:b.port}},pe=function(a){function b(q){var r=q.split("=")[0];return 0>d.indexOf(r)?q:r+"=0"}function c(q){return q.split("&").map(b).filter(function(r){return void 0!=r}).join("&")}var d="gclid dclid gclaw gcldc gclgp gclha gclgf _gl".split(" "),
e=oe(a),f=a.split(/[?#]/)[0],h=e.search,k=e.hash;"?"===h[0]&&(h=h.substring(1));"#"===k[0]&&(k=k.substring(1));h=c(h);k=c(k);""!==h&&(h="?"+h);""!==k&&(k="#"+k);var l=""+f+h+k;"/"===l[l.length-1]&&(l=l.substring(0,l.length-1));return l};var qe=new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i),re=new RegExp(/support|noreply/i),se=["SCRIPT","IMG","SVG","PATH","BR"],te=["BR"];function ue(a){var b;if(a===H.body)b="body";else{var c;if(a.id)c="#"+a.id;else{var d;if(a.parentElement){var e;a:{var f=a.parentElement;if(f){for(var h=0;h<f.childElementCount;h++)if(f.children[h]===a){e=h+1;break a}e=-1}else e=1}d=ue(a.parentElement)+">:nth-child("+e+")"}else d="";c=d}b=c}return b}
var xe=function(){var a=!0;var b=a,c;var d=[],e=H.body;if(e){for(var f=e.querySelectorAll("*"),h=0;h<f.length&&1E4>h;h++){var k=f[h];if(!(0<=se.indexOf(k.tagName.toUpperCase()))){for(var l=!1,q=0;q<k.childElementCount&&1E4>q;q++)if(!(0<=te.indexOf(k.children[q].tagName.toUpperCase()))){l=!0;break}l||d.push(k)}}c={elements:d,status:1E4<f.length?"2":"1"}}else c=
{elements:d,status:"4"};for(var r=c,n=r.elements,t=[],p=0;p<n.length;p++){var u=n[p],v=u.textContent;u.value&&(v=u.value);if(v){var w=v.match(qe);if(w){var y=w[0],x;if(G.location){var z=le(G.location,"host",!0);x=0<=y.toLowerCase().indexOf(z)}else x=!1;x||t.push({element:u,Mc:y})}}}var A;for(var B=[],D=10<t.length?"3":r.status,F=0;F<t.length&&
10>F;F++){var K=t[F].element,P=t[F].Mc,T=!1;B.push({Mc:P,querySelector:ue(K),tagName:K.tagName,isVisible:!$d(K),type:1,zc:!!T})}return{elements:B,status:D}};var Le={},L=null,Me=Math.random();Le.D="GTM-PRPXBQ6";Le.kc="1d0";Le.oi="";Le.Jf="";var Ne={__cl:!0,__ecl:!0,__ehl:!0,__evl:!0,__fal:!0,__fil:!0,__fsl:!0,__hl:!0,__jel:!0,__lcl:!0,__sdl:!0,__tl:!0,__ytl:!0},Oe={__paused:!0,__tg:!0},Pe;for(Pe in Ne)Ne.hasOwnProperty(Pe)&&(Oe[Pe]=!0);var Qe="www.googletagmanager.com/gtm.js";Qe="www.googletagmanager.com/gtag/js";
var Re=Qe,Se=Sa(""),Te=null,Ue=null,Ve="//www.googletagmanager.com/a?id="+Le.D+"&cv=51",We={},Xe={},Ye=function(){var a=L.sequence||1;L.sequence=a+1;return a};var Ze={},$e=new Ia,af={},bf={},ef={name:"dataLayer",set:function(a,b){m(eb(a,b),af);cf()},get:function(a){return df(a,2)},reset:function(){$e=new Ia;af={};cf()}},df=function(a,b){return 2!=b?$e.get(a):ff(a)},ff=function(a){var b,c=a.split(".");b=b||[];for(var d=af,e=0;e<c.length;e++){if(null===d)return!1;if(void 0===d)break;d=d[c[e]];if(-1!==Ea(b,d))return}return d},gf=function(a,b){bf.hasOwnProperty(a)||($e.set(a,b),m(eb(a,b),af),cf())},cf=function(a){Ka(bf,function(b,c){$e.set(b,c);m(eb(b,
void 0),af);m(eb(b,c),af);a&&delete bf[b]})},hf=function(a,b,c){Ze[a]=Ze[a]||{};var d=1!==c?ff(b):$e.get(b);"array"===hb(d)||"object"===hb(d)?Ze[a][b]=m(d):Ze[a][b]=d},jf=function(a,b){if(Ze[a])return Ze[a][b]},kf=function(a,b){Ze[a]&&delete Ze[a][b]};var pf={},qf=function(a,b){if(G._gtmexpgrp&&G._gtmexpgrp.hasOwnProperty(a))return G._gtmexpgrp[a];void 0===pf[a]&&(pf[a]=Math.floor(Math.random()*b));return pf[a]};var rf=function(a){var b=1,c,d,e;if(a)for(b=0,d=a.length-1;0<=d;d--)e=a.charCodeAt(d),b=(b<<6&268435455)+e+(e<<14),c=b&266338304,b=0!=c?b^c>>21:b;return b};function sf(a,b,c){for(var d=[],e=b.split(";"),f=0;f<e.length;f++){var h=e[f].split("="),k=h[0].replace(/^\s*|\s*$/g,"");if(k&&k==a){var l=h.slice(1).join("=").replace(/^\s*|\s*$/g,"");l&&c&&(l=decodeURIComponent(l));d.push(l)}}return d};var uf=function(a,b,c,d){return tf(d)?sf(a,String(b||document.cookie),c):[]},xf=function(a,b,c,d,e){if(tf(e)){var f=vf(a,d,e);if(1===f.length)return f[0].id;if(0!==f.length){f=wf(f,function(h){return h.uc},b);if(1===f.length)return f[0].id;f=wf(f,function(h){return h.Mb},c);return f[0]?f[0].id:void 0}}};function yf(a,b,c,d){var e=document.cookie;document.cookie=a;var f=document.cookie;return e!=f||void 0!=c&&0<=uf(b,f,!1,d).indexOf(c)}
var Cf=function(a,b,c){function d(p,u,v){if(null==v)return delete h[u],p;h[u]=v;return p+"; "+u+"="+v}function e(p,u){if(null==u)return delete h[u],p;h[u]=!0;return p+"; "+u}if(!tf(c.va))return 2;var f;void 0==b?f=a+"=deleted; expires="+(new Date(0)).toUTCString():(c.encode&&(b=encodeURIComponent(b)),b=zf(b),f=a+"="+b);var h={};f=d(f,"path",c.path);var k;c.expires instanceof Date?k=c.expires.toUTCString():null!=c.expires&&(k=""+c.expires);f=d(f,"expires",k);f=d(f,"max-age",c.Gi);f=d(f,"samesite",
c.Ki);c.Li&&(f=e(f,"secure"));var l=c.domain;if("auto"===l){for(var q=Af(),r=0;r<q.length;++r){var n="none"!==q[r]?q[r]:void 0,t=d(f,"domain",n);t=e(t,c.flags);if(!Bf(n,c.path)&&yf(t,a,b,c.va))return 0}return 1}l&&"none"!==l&&(f=d(f,"domain",l));f=e(f,c.flags);return Bf(l,c.path)?1:yf(f,a,b,c.va)?0:1},Df=function(a,b,c){null==c.path&&(c.path="/");c.domain||(c.domain="auto");return Cf(a,b,c)};
function wf(a,b,c){for(var d=[],e=[],f,h=0;h<a.length;h++){var k=a[h],l=b(k);l===c?d.push(k):void 0===f||l<f?(e=[k],f=l):l===f&&e.push(k)}return 0<d.length?d:e}function vf(a,b,c){for(var d=[],e=uf(a,void 0,void 0,c),f=0;f<e.length;f++){var h=e[f].split("."),k=h.shift();if(!b||-1!==b.indexOf(k)){var l=h.shift();l&&(l=l.split("-"),d.push({id:h.join("."),uc:1*l[0]||1,Mb:1*l[1]||1}))}}return d}
var zf=function(a){a&&1200<a.length&&(a=a.substring(0,1200));return a},Ef=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,Ff=/(^|\.)doubleclick\.net$/i,Bf=function(a,b){return Ff.test(document.location.hostname)||"/"===b&&Ef.test(a)},Af=function(){var a=[],b=document.location.hostname.split(".");if(4===b.length){var c=b[b.length-1];if(parseInt(c,10).toString()===c)return["none"]}for(var d=b.length-2;0<=d;d--)a.push(b.slice(d).join("."));var e=document.location.hostname;Ff.test(e)||Ef.test(e)||a.push("none");
return a},tf=function(a){if(!yd()||!a||!Id())return!0;if(!Hd(a))return!1;var b=Gd(a);return null==b?!0:!!b};var Gf=function(){for(var a=hd.userAgent+(H.cookie||"")+(H.referrer||""),b=a.length,c=G.history.length;0<c;)a+=c--^b++;return[Math.round(2147483647*Math.random())^rf(a)&2147483647,Math.round(Va()/1E3)].join(".")},Jf=function(a,b,c,d,e){var f=Hf(b);return xf(a,f,If(c),d,e)},Kf=function(a,b,c,d){var e=""+Hf(c),f=If(d);1<f&&(e+="-"+f);return[b,e,a].join(".")},Hf=function(a){if(!a)return 1;a=0===a.indexOf(".")?a.substr(1):a;return a.split(".").length},If=function(a){if(!a||"/"===a)return 1;"/"!==a[0]&&
(a="/"+a);"/"!==a[a.length-1]&&(a+="/");return a.split("/").length-1};function Lf(a,b,c){var d,e=a.Lb;null==e&&(e=7776E3);0!==e&&(d=new Date((b||Va())+1E3*e));return{path:a.path,domain:a.domain,flags:a.flags,encode:!!c,expires:d}};var Mf=["1"],Nf={},Qf=function(a){var b=Of(a.prefix),c=Nf[b];c&&Pf(b,c,a)},Sf=function(a){var b=Of(a.prefix);if(!Nf[b]&&!Rf(b,a.path,a.domain)){var c=Gf();Pf(b,c,a);var d=jd("google_tag_data",{});d._gcl_au?Gc("GTM",57):d._gcl_au=c;Rf(b,a.path,a.domain)}};function Pf(a,b,c){var d=Kf(b,"1",c.domain,c.path),e=Lf(c);e.va="ad_storage";Df(a,d,e)}function Rf(a,b,c){var d=Jf(a,b,c,Mf,"ad_storage");d&&(Nf[a]=d);return d}function Of(a){return(a||"_gcl")+"_au"};function Tf(){for(var a=Uf,b={},c=0;c<a.length;++c)b[a[c]]=c;return b}function Vf(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZ";a+=a.toLowerCase()+"0123456789-_";return a+"."}var Uf,Wf;
function Xf(a){function b(l){for(;d<a.length;){var q=a.charAt(d++),r=Wf[q];if(null!=r)return r;if(!/^[\s\xa0]*$/.test(q))throw Error("Unknown base64 encoding at char: "+q);}return l}Uf=Uf||Vf();Wf=Wf||Tf();for(var c="",d=0;;){var e=b(-1),f=b(0),h=b(64),k=b(64);if(64===k&&-1===e)return c;c+=String.fromCharCode(e<<2|f>>4);64!=h&&(c+=String.fromCharCode(f<<4&240|h>>2),64!=k&&(c+=String.fromCharCode(h<<6&192|k)))}};var Yf;var bg=function(){var a=Zf,b=$f,c=ag(),d=function(h){a(h.target||h.srcElement||{})},e=function(h){b(h.target||h.srcElement||{})};if(!c.init){pd(H,"mousedown",d);pd(H,"keyup",d);pd(H,"submit",e);var f=HTMLFormElement.prototype.submit;HTMLFormElement.prototype.submit=function(){b(this);f.call(this)};c.init=!0}},cg=function(a,b,c,d,e){var f={callback:a,domains:b,fragment:2===c,placement:c,forms:d,sameHost:e};ag().decorators.push(f)},dg=function(a,b,c){for(var d=ag().decorators,e={},f=0;f<d.length;++f){var h=
d[f],k;if(k=!c||h.forms)a:{var l=h.domains,q=a,r=!!h.sameHost;if(l&&(r||q!==H.location.hostname))for(var n=0;n<l.length;n++)if(l[n]instanceof RegExp){if(l[n].test(q)){k=!0;break a}}else if(0<=q.indexOf(l[n])||r&&0<=l[n].indexOf(q)){k=!0;break a}k=!1}if(k){var t=h.placement;void 0==t&&(t=h.fragment?2:1);t===b&&bb(e,h.callback())}}return e},ag=function(){var a=jd("google_tag_data",{}),b=a.gl;b&&b.decorators||(b={decorators:[]},a.gl=b);return b};var eg=/(.*?)\*(.*?)\*(.*)/,fg=/^https?:\/\/([^\/]*?)\.?cdn\.ampproject\.org\/?(.*)/,gg=/^(?:www\.|m\.|amp\.)+/,hg=/([^?#]+)(\?[^#]*)?(#.*)?/;function ig(a){return new RegExp("(.*?)(^|&)"+a+"=([^&]*)&?(.*)")}
var kg=function(a){var b=[],c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];if(void 0!==d&&d===d&&null!==d&&"[object Object]"!==d.toString()){b.push(c);var e=b,f=e.push,h,k=String(d);Uf=Uf||Vf();Wf=Wf||Tf();for(var l=[],q=0;q<k.length;q+=3){var r=q+1<k.length,n=q+2<k.length,t=k.charCodeAt(q),p=r?k.charCodeAt(q+1):0,u=n?k.charCodeAt(q+2):0,v=t>>2,w=(t&3)<<4|p>>4,y=(p&15)<<2|u>>6,x=u&63;n||(x=64,r||(y=64));l.push(Uf[v],Uf[w],Uf[y],Uf[x])}h=l.join("");f.call(e,h)}}var z=b.join("*");return["1",jg(z),
z].join("*")},jg=function(a,b){var c=[window.navigator.userAgent,(new Date).getTimezoneOffset(),window.navigator.userLanguage||window.navigator.language,Math.floor((new Date).getTime()/60/1E3)-(void 0===b?0:b),a].join("*"),d;if(!(d=Yf)){for(var e=Array(256),f=0;256>f;f++){for(var h=f,k=0;8>k;k++)h=h&1?h>>>1^3988292384:h>>>1;e[f]=h}d=e}Yf=d;for(var l=4294967295,q=0;q<c.length;q++)l=l>>>8^Yf[(l^c.charCodeAt(q))&255];return((l^-1)>>>0).toString(36)},mg=function(){return function(a){var b=oe(G.location.href),
c=b.search.replace("?",""),d=je(c,"_gl",!0)||"";a.query=lg(d)||{};var e=me(b,"fragment").match(ig("_gl"));a.fragment=lg(e&&e[3]||"")||{}}},ng=function(a){var b=mg(),c=ag();c.data||(c.data={query:{},fragment:{}},b(c.data));var d={},e=c.data;e&&(bb(d,e.query),a&&bb(d,e.fragment));return d},lg=function(a){var b;b=void 0===b?3:b;try{if(a){var c;a:{for(var d=a,e=0;3>e;++e){var f=eg.exec(d);if(f){c=f;break a}d=decodeURIComponent(d)}c=void 0}var h=c;if(h&&"1"===h[1]){var k=h[3],l;a:{for(var q=h[2],r=0;r<
b;++r)if(q===jg(k,r)){l=!0;break a}l=!1}if(l){for(var n={},t=k?k.split("*"):[],p=0;p<t.length;p+=2)n[t[p]]=Xf(t[p+1]);return n}}}}catch(u){}};function og(a,b,c,d){function e(r){var n=r,t=ig(a).exec(n),p=n;if(t){var u=t[2],v=t[4];p=t[1];v&&(p=p+u+v)}r=p;var w=r.charAt(r.length-1);r&&"&"!==w&&(r+="&");return r+q}d=void 0===d?!1:d;var f=hg.exec(c);if(!f)return"";var h=f[1],k=f[2]||"",l=f[3]||"",q=a+"="+b;d?l="#"+e(l.substring(1)):k="?"+e(k.substring(1));return""+h+k+l}
function pg(a,b){var c="FORM"===(a.tagName||"").toUpperCase(),d=dg(b,1,c),e=dg(b,2,c),f=dg(b,3,c);if(cb(d)){var h=kg(d);c?qg("_gl",h,a):rg("_gl",h,a,!1)}if(!c&&cb(e)){var k=kg(e);rg("_gl",k,a,!0)}for(var l in f)if(f.hasOwnProperty(l))a:{var q=l,r=f[l],n=a;if(n.tagName){if("a"===n.tagName.toLowerCase()){rg(q,r,n,void 0);break a}if("form"===n.tagName.toLowerCase()){qg(q,r,n);break a}}"string"==typeof n&&og(q,r,n,void 0)}}
function rg(a,b,c,d){if(c.href){var e=og(a,b,c.href,void 0===d?!1:d);Uc.test(e)&&(c.href=e)}}
function qg(a,b,c){if(c&&c.action){var d=(c.method||"").toLowerCase();if("get"===d){for(var e=c.childNodes||[],f=!1,h=0;h<e.length;h++){var k=e[h];if(k.name===a){k.setAttribute("value",b);f=!0;break}}if(!f){var l=H.createElement("input");l.setAttribute("type","hidden");l.setAttribute("name",a);l.setAttribute("value",b);c.appendChild(l)}}else if("post"===d){var q=og(a,b,c.action);Uc.test(q)&&(c.action=q)}}}
var Zf=function(a){try{var b;a:{for(var c=a,d=100;c&&0<d;){if(c.href&&c.nodeName.match(/^a(?:rea)?$/i)){b=c;break a}c=c.parentNode;d--}b=null}var e=b;if(e){var f=e.protocol;"http:"!==f&&"https:"!==f||pg(e,e.hostname)}}catch(h){}},$f=function(a){try{if(a.action){var b=me(oe(a.action),"host");pg(a,b)}}catch(c){}},sg=function(a,b,c,d){bg();cg(a,b,"fragment"===c?2:1,!!d,!1)},tg=function(a,b){bg();cg(a,[le(G.location,"host",!0)],b,!0,!0)},ug=function(){var a=H.location.hostname,b=fg.exec(H.referrer);if(!b)return!1;
var c=b[2],d=b[1],e="";if(c){var f=c.split("/"),h=f[1];e="s"===h?decodeURIComponent(f[2]):decodeURIComponent(h)}else if(d){if(0===d.indexOf("xn--"))return!1;e=d.replace(/-/g,".").replace(/\.\./g,"-")}var k=a.replace(gg,""),l=e.replace(gg,""),q;if(!(q=k===l)){var r="."+l;q=k.substring(k.length-r.length,k.length)===r}return q},vg=function(a,b){return!1===a?!1:a||b||ug()};var wg=/^\w+$/,xg=/^[\w-]+$/,yg=/^~?[\w-]+$/,zg={aw:"_aw",dc:"_dc",gf:"_gf",ha:"_ha",gp:"_gp"},Ag=function(){if(!yd()||!Id())return!0;var a=Gd("ad_storage");return null==a?!0:!!a},Bg=function(a,b){Hd("ad_storage")?Ag()?a():Ld(a,"ad_storage"):b?Gc("TAGGING",3):Kd(function(){Bg(a,!0)},["ad_storage"])},Eg=function(a){var b=[];if(!H.cookie)return b;var c=uf(a,H.cookie,void 0,"ad_storage");if(!c||0==c.length)return b;for(var d=0;d<c.length;d++){var e=Cg(c[d]);e&&-1===Ea(b,e)&&b.push(e)}return Dg(b)};
function Fg(a){return a&&"string"==typeof a&&a.match(wg)?a:"_gcl"}
var Hg=function(){var a=oe(G.location.href),b=me(a,"query",!1,void 0,"gclid"),c=me(a,"query",!1,void 0,"gclsrc"),d=me(a,"query",!1,void 0,"dclid");if(!b||!c){var e=a.hash.replace("#","");b=b||je(e,"gclid",void 0);c=c||je(e,"gclsrc",void 0)}return Gg(b,c,d)},Gg=function(a,b,c){var d={},e=function(f,h){d[h]||(d[h]=[]);d[h].push(f)};d.gclid=a;d.gclsrc=b;d.dclid=c;if(void 0!==a&&a.match(xg))switch(b){case void 0:e(a,"aw");break;case "aw.ds":e(a,"aw");e(a,"dc");break;case "ds":e(a,"dc");break;case "3p.ds":e(a,
"dc");break;case "gf":e(a,"gf");break;case "ha":e(a,"ha");break;case "gp":e(a,"gp")}c&&e(c,"dc");return d},Ig=function(a,b){switch(a){case void 0:case "aw":return"aw"===b;case "aw.ds":return"aw"===b||"dc"===b;case "ds":case "3p.ds":return"dc"===b;case "gf":return"gf"===b;case "ha":return"ha"===b;case "gp":return"gp"===b}return!1},Kg=function(a){var b=Hg();Bg(function(){Jg(b,a)})};
function Jg(a,b,c){function d(l,q){var r=Lg(l,e);r&&Df(r,q,f)}b=b||{};var e=Fg(b.prefix);c=c||Va();var f=Lf(b,c,!0);f.va="ad_storage";var h=Math.round(c/1E3),k=function(l){return["GCL",h,l].join(".")};a.aw&&(!0===b.Pi?d("aw",k("~"+a.aw[0])):d("aw",k(a.aw[0])));a.dc&&d("dc",k(a.dc[0]));a.gf&&d("gf",k(a.gf[0]));a.ha&&d("ha",k(a.ha[0]));a.gp&&d("gp",k(a.gp[0]))}
var Ng=function(a,b){var c=ng(!0);Bg(function(){for(var d=Fg(b.prefix),e=0;e<a.length;++e){var f=a[e];if(void 0!==zg[f]){var h=Lg(f,d),k=c[h];if(k){var l=Math.min(Mg(k),Va()),q;b:{for(var r=l,n=uf(h,H.cookie,void 0,"ad_storage"),t=0;t<n.length;++t)if(Mg(n[t])>r){q=!0;break b}q=!1}if(!q){var p=Lf(b,l,!0);p.va="ad_storage";Df(h,k,p)}}}}Jg(Gg(c.gclid,c.gclsrc),b)})},Lg=function(a,b){var c=zg[a];if(void 0!==c)return b+c},Mg=function(a){var b=a.split(".");return 3!==b.length||"GCL"!==b[0]?0:1E3*(Number(b[1])||
0)};function Cg(a){var b=a.split(".");if(3==b.length&&"GCL"==b[0]&&b[1])return b[2]}
var Og=function(a,b,c,d,e){if(Da(b)){var f=Fg(e),h=function(){for(var k={},l=0;l<a.length;++l){var q=Lg(a[l],f);if(q){var r=uf(q,H.cookie,void 0,"ad_storage");r.length&&(k[q]=r.sort()[r.length-1])}}return k};Bg(function(){sg(h,b,c,d)})}},Dg=function(a){return a.filter(function(b){return yg.test(b)})},Pg=function(a,b){for(var c=Fg(b.prefix),d={},e=0;e<a.length;e++)zg[a[e]]&&(d[a[e]]=zg[a[e]]);Bg(function(){Ka(d,function(f,h){var k=uf(c+h,H.cookie,void 0,"ad_storage");if(k.length){var l=k[0],q=Mg(l),
r={};r[f]=[Cg(l)];Jg(r,b,q)}})})};function Qg(a,b){for(var c=0;c<b.length;++c)if(a[b[c]])return!0;return!1}
var Rg=function(){function a(e,f,h){h&&(e[f]=h)}var b=["aw","dc"];if(Id()){var c=Hg();if(Qg(c,b)){var d={};a(d,"gclid",c.gclid);a(d,"dclid",c.dclid);a(d,"gclsrc",c.gclsrc);tg(function(){return d},3);tg(function(){var e={};return e._up="1",e},1)}}},Sg=function(){var a;if(Ag()){for(var b=[],c=H.cookie.split(";"),d=/^\s*_gac_(UA-\d+-\d+)=\s*(.+?)\s*$/,e=0;e<c.length;e++){var f=c[e].match(d);f&&b.push({Qd:f[1],value:f[2]})}var h={};if(b&&b.length)for(var k=0;k<b.length;k++){var l=b[k].value.split(".");
"1"==l[0]&&3==l.length&&l[1]&&(h[b[k].Qd]||(h[b[k].Qd]=[]),h[b[k].Qd].push({timestamp:l[1],wc:l[2]}))}a=h}else a={};return a};var Tg=/^\d+\.fls\.doubleclick\.net$/,Ug=!1;function Vg(a,b){Hd(C.B)?Pd(C.B)?a():Ld(a,C.B):b?E(42):Rd(function(){Vg(a,!0)},[C.B])}function Wg(a){var b=oe(G.location.href),c=me(b,"host",!1);if(c&&c.match(Tg)){var d=me(b,"path").split(a+"=");if(1<d.length)return d[1].split(";")[0].split("?")[0]}}
function Xg(a,b,c){if("aw"==a||"dc"==a){var d=Wg("gcl"+a);if(d)return d.split(".")}var e=Fg(b);if("_gcl"==e){c=void 0===c?!0:c;var f=!Pd(C.B)&&c,h;h=Hg()[a]||[];if(0<h.length)return f?["0"]:h}var k=Lg(a,e);return k?Eg(k):[]}
var Yg=function(a){var b=Wg("gac");if(b)return!Pd(C.B)&&a?"0":decodeURIComponent(b);var c=Sg(),d=[];Ka(c,function(e,f){for(var h=[],k=0;k<f.length;k++)h.push(f[k].wc);h=Dg(h);h.length&&d.push(e+":"+h.join(","))});return d.join(";")},$g=function(a,b){if(Ug)Zg(a,b,"dc");else{var c=Hg().dc||[];Vg(function(){Sf(b);var d=Nf[Of(b.prefix)],e=!1;if(d&&0<c.length){var f=L.joined_au=L.joined_au||{},h=b.prefix||"_gcl";if(!f[h])for(var k=0;k<c.length;k++){var l="https://adservice.google.com/ddm/regclk";l=l+"?gclid="+c[k]+"&auiddc="+
d;vd(l);e=f[h]=!0}}null==a&&(a=e);a&&d&&Qf(b)})}},Zg=function(a,b,c){var d=Hg(),e=[],f=d.gclid,h=d.dclid,k=d.gclsrc||"aw";!f||"aw.ds"!==k&&"aw"!==k&&"ds"!==k||c&&!Ig(k,c)||e.push({wc:f,kf:k});!h||c&&"dc"!==c||e.push({wc:h,kf:"ds"});Vg(function(){Sf(b);var l=Nf[Of(b.prefix)],q=!1;if(l&&0<e.length)for(var r=L.joined_auid=L.joined_auid||{},n=0;n<e.length;n++){var t=e[n],p=t.wc,u=t.kf,v=(b.prefix||"_gcl")+"."+u+"."+p;if(!r[v]){var w="https://adservice.google.com/pagead/regclk";w=w+"?gclid="+p+"&auid="+l+"&gclsrc="+u;vd(w);
q=r[v]=!0}}null==a&&(a=q);a&&l&&Qf(b)})};var ah=/[A-Z]+/,bh=/\s/,ch=function(a){if(g(a)&&(a=Ua(a),!bh.test(a))){var b=a.indexOf("-");if(!(0>b)){var c=a.substring(0,b);if(ah.test(c)){for(var d=a.substring(b+1).split("/"),e=0;e<d.length;e++)if(!d[e])return;return{id:a,prefix:c,containerId:c+"-"+d[0],F:d}}}}},eh=function(a){for(var b={},c=0;c<a.length;++c){var d=ch(a[c]);d&&(b[d.id]=d)}dh(b);var e=[];Ka(b,function(f,h){e.push(h)});return e};
function dh(a){var b=[],c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];"AW"===d.prefix&&d.F[1]&&b.push(d.containerId)}for(var e=0;e<b.length;++e)delete a[b[e]]};var fh=function(){var a=!1;return a};var hh=function(a,b,c,d){return(2===gh()||d||"http:"!=G.location.protocol?a:b)+c},gh=function(){var a=md(),b;if(1===a)a:{var c=Re;c=c.toLowerCase();for(var d="https://"+c,e="http://"+c,f=1,h=H.getElementsByTagName("script"),k=0;k<h.length&&100>k;k++){var l=h[k].src;if(l){l=l.toLowerCase();if(0===l.indexOf(e)){b=3;break a}1===f&&0===l.indexOf(d)&&(f=2)}}b=f}else b=a;return b};
var jh=function(a,b,c){if(G[a.functionName])return b.Cd&&I(b.Cd),G[a.functionName];var d=ih();G[a.functionName]=d;if(a.nc)for(var e=0;e<a.nc.length;e++)G[a.nc[e]]=G[a.nc[e]]||ih();a.yc&&void 0===G[a.yc]&&(G[a.yc]=c);ld(hh("https://","http://",a.Nd),b.Cd,b.Lh);return d},ih=function(){var a=function(){a.q=a.q||[];a.q.push(arguments)};return a},kh={functionName:"_googWcmImpl",yc:"_googWcmAk",Nd:"www.gstatic.com/wcm/loader.js"},lh={functionName:"_gaPhoneImpl",yc:"ga_wpid",Nd:"www.gstatic.com/gaphone/loader.js"},
mh={Ff:"",Bg:"5"},nh={functionName:"_googCallTrackingImpl",nc:[lh.functionName,kh.functionName],Nd:"www.gstatic.com/call-tracking/call-tracking_"+(mh.Ff||mh.Bg)+".js"},oh={},ph=function(a,b,c,d){E(22);if(c){d=d||{};var e=jh(kh,d,a),f={ak:a,cl:b};void 0===d.ra&&(f.autoreplace=c);e(2,d.ra,f,c,0,new Date,d.options)}},qh=function(a,b,c,d){E(21);if(b&&c){d=d||{};for(var e={countryNameCode:c,destinationNumber:b,retrievalTime:new Date},f=0;f<a.length;f++){var h=a[f];
oh[h.id]||(h&&"AW"===h.prefix&&!e.adData&&2<=h.F.length?(e.adData={ak:h.F[0],cl:h.F[1]},oh[h.id]=!0):h&&"UA"===h.prefix&&!e.gaData&&(e.gaData={gaWpid:h.containerId},oh[h.id]=!0))}(e.gaData||e.adData)&&jh(nh,d)(d.ra,e,d.options)}},rh=function(){var a=!1;return a},sh=function(a,b){if(a)if(fh()){}else{if(g(a)){var c=
ch(a);if(!c)return;a=c}var d=void 0,e=!1,f=b.getWithConfig(C.jg);if(f&&Da(f)){d=[];for(var h=0;h<f.length;h++){var k=ch(f[h]);k&&(d.push(k),(a.id===k.id||a.id===a.containerId&&a.containerId===k.containerId)&&(e=!0))}}if(!d||e){var l=b.getWithConfig(C.Be),q;if(l){Da(l)?q=l:q=[l];var r=b.getWithConfig(C.ze),n=b.getWithConfig(C.Ae),t=b.getWithConfig(C.Ce),p=b.getWithConfig(C.ig),u=r||n,v=1;"UA"!==a.prefix||d||(v=5);for(var w=0;w<q.length;w++)if(w<v)if(d)qh(d,q[w],p,{ra:u,options:t});else if("AW"===a.prefix&&
a.F[1])rh()?qh([a],q[w],p||"US",{ra:u,options:t}):ph(a.F[0],a.F[1],q[w],{ra:u,options:t});else if("UA"===a.prefix)if(rh())qh([a],q[w],p||"US",{ra:u});else{var y=a.containerId,x=q[w],z={ra:u};E(23);if(x){z=z||{};var A=jh(lh,z,y),B={};void 0!==z.ra?B.receiver=z.ra:B.replace=x;B.ga_wpid=y;B.destination=x;A(2,new Date,B)}}}}}};
var vh=function(a){return Pd(C.B)?a:a.replace(/&url=([^&#]+)/,function(b,c){var d=pe(decodeURIComponent(c));return"&url="+encodeURIComponent(d)})},wh=function(){var a;if(!(a=Se)){var b;if(!0===G._gtmdgs)b=!0;else{var c=hd&&hd.userAgent||"";b=0>c.indexOf("Safari")||/Chrome|Coast|Opera|Edg|Silk|Android/.test(c)||11>((/Version\/([\d]+)/.exec(c)||[])[1]||"")?!1:!0}a=!b}if(a)return-1;var d=Na("1");return qf(1,100)<d?qf(2,2):-1},xh=function(a){var b;
if(!a||!a.length)return;for(var c=[],d=0;d<a.length;++d){var e=a[d];e&&e.estimated_delivery_date?c.push(""+e.estimated_delivery_date):c.push("")}b=c.join(",");return b};var yh=new RegExp(/^(.*\.)?(google|youtube|blogger|withgoogle)(\.com?)?(\.[a-z]{2})?\.?$/),zh={cl:["ecl"],customPixels:["nonGooglePixels"],ecl:["cl"],ehl:["hl"],hl:["ehl"],html:["customScripts","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],customScripts:["html","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],nonGooglePixels:[],nonGoogleScripts:["nonGooglePixels"],nonGoogleIframes:["nonGooglePixels"]},Ah={cl:["ecl"],customPixels:["customScripts","html"],
ecl:["cl"],ehl:["hl"],hl:["ehl"],html:["customScripts"],customScripts:["html"],nonGooglePixels:["customPixels","customScripts","html","nonGoogleScripts","nonGoogleIframes"],nonGoogleScripts:["customScripts","html"],nonGoogleIframes:["customScripts","html","nonGoogleScripts"]},Bh="google customPixels customScripts html nonGooglePixels nonGoogleScripts nonGoogleIframes".split(" ");
var Dh=function(a){var b;df("gtm.allowlist")&&E(52);b=df("gtm.allowlist");b||(b=df("gtm.whitelist"));b&&E(9);b="google gtagfl lcl zone oid op".split(" ");
var c=b&&db(Ta(b),zh),d;df("gtm.blocklist")&&E(51);d=df("gtm.blocklist");d||(d=df("gtm.blacklist"));d||(d=df("tagTypeBlacklist"))&&E(3);d?E(8):d=[];Ch()&&(d=Ta(d),d.push("nonGooglePixels","nonGoogleScripts","sandboxedScripts"));0<=Ea(Ta(d),"google")&&E(2);var e=
d&&db(Ta(d),Ah),f={};return function(h){var k=h&&h[$b.Na];if(!k||"string"!=typeof k)return!0;k=k.replace(/^_*/,"");if(void 0!==f[k])return f[k];var l=Xe[k]||[],q=a(k,l);if(b){var r;if(r=q)a:{if(0>Ea(c,k))if(l&&0<l.length)for(var n=0;n<l.length;n++){if(0>Ea(c,l[n])){E(11);r=!1;break a}}else{r=!1;break a}r=!0}q=r}var t=!1;if(d){var p=0<=Ea(e,k);if(p)t=p;else{var u=Ja(e,l||[]);u&&E(10);t=u}}var v=!q||t;v||!(0<=Ea(l,"sandboxedScripts"))||c&&-1!==Ea(c,"sandboxedScripts")||(v=Ja(e,Bh));return f[k]=v}},
Ch=function(){return yh.test(G.location&&G.location.hostname)};var Eh={active:!0,isAllowed:function(){return!0}},Fh=function(a){var b=L.zones;return b?b.checkState(Le.D,a):Eh},Gh=function(a){var b=L.zones;!b&&a&&(b=L.zones=a());return b};var Lh=function(){},Mh=function(){};var Nh=!1,Oh=0,Ph=[];function Qh(a){if(!Nh){var b=H.createEventObject,c="complete"==H.readyState,d="interactive"==H.readyState;if(!a||"readystatechange"!=a.type||c||!b&&d){Nh=!0;for(var e=0;e<Ph.length;e++)I(Ph[e])}Ph.push=function(){for(var f=0;f<arguments.length;f++)I(arguments[f]);return 0}}}function Rh(){if(!Nh&&140>Oh){Oh++;try{H.documentElement.doScroll("left"),Qh()}catch(a){G.setTimeout(Rh,50)}}}var Sh=function(a){Nh?a():Ph.push(a)};var Th={},Uh={},Vh=function(a,b,c,d){if(!Uh[a]||Oe[b]||"__zone"===b)return-1;var e={};kb(d)&&(e=m(d,e));e.id=c;e.status="timeout";return Uh[a].tags.push(e)-1},Wh=function(a,b,c,d){if(Uh[a]){var e=Uh[a].tags[b];e&&(e.status=c,e.executionTime=d)}};function Xh(a){for(var b=Th[a]||[],c=0;c<b.length;c++)b[c]();Th[a]={push:function(d){d(Le.D,Uh[a])}}}
var $h=function(a,b,c){Uh[a]={tags:[]};Aa(b)&&Yh(a,b);c&&G.setTimeout(function(){return Xh(a)},Number(c));return Zh(a)},Yh=function(a,b){Th[a]=Th[a]||[];Th[a].push(Ya(function(){return I(function(){b(Le.D,Uh[a])})}))};function Zh(a){var b=0,c=0,d=!1;return{add:function(){c++;return Ya(function(){b++;d&&b>=c&&Xh(a)})},Ng:function(){d=!0;b>=c&&Xh(a)}}};var ai=function(){function a(d){return!Ca(d)||0>d?0:d}if(!L._li&&G.performance&&G.performance.timing){var b=G.performance.timing.navigationStart,c=Ca(ef.get("gtm.start"))?ef.get("gtm.start"):0;L._li={cst:a(c-b),cbt:a(Ue-b)}}};var ei={},fi=function(){return G.GoogleAnalyticsObject&&G[G.GoogleAnalyticsObject]},gi=!1;
var hi=function(a){G.GoogleAnalyticsObject||(G.GoogleAnalyticsObject=a||"ga");var b=G.GoogleAnalyticsObject;if(G[b])G.hasOwnProperty(b)||E(12);else{var c=function(){c.q=c.q||[];c.q.push(arguments)};c.l=Number(new Date);G[b]=c}ai();return G[b]},ii=function(a,b,c,d){b=String(b).replace(/\s+/g,"").split(",");var e=fi();e(a+"require","linker");e(a+"linker:autoLink",b,c,d)},ji=function(a){};
var li=function(a){},ki=function(){return G.GoogleAnalyticsObject||"ga"},mi=function(a,b){return function(){var c=fi(),d=c&&c.getByName&&c.getByName(a);if(d){var e=d.get("sendHitTask");d.set("sendHitTask",function(f){var h=f.get("hitPayload"),k=f.get("hitCallback"),l=0>h.indexOf("&tid="+b);l&&(f.set("hitPayload",h.replace(/&tid=UA-[0-9]+-[0-9]+/,"&tid="+
b),!0),f.set("hitCallback",void 0,!0));e(f);l&&(f.set("hitPayload",h,!0),f.set("hitCallback",k,!0),f.set("_x_19",void 0,!0),e(f))})}}};
var ri=function(){return"&tc="+Nb.filter(function(a){return a}).length},ui=function(){2022<=si().length&&ti()},wi=function(){vi||(vi=G.setTimeout(ti,500))},ti=function(){vi&&(G.clearTimeout(vi),vi=void 0);void 0===xi||yi[xi]&&!zi&&!Ai||(Bi[xi]||Ci.Ah()||0>=Di--?(E(1),Bi[xi]=!0):(Ci.Wh(),od(si()),yi[xi]=!0,Ei=Fi=Gi=Ai=zi=""))},si=function(){var a=xi;if(void 0===a)return"";var b=Hc("GTM"),c=Hc("TAGGING");return[Hi,yi[a]?"":"&es=1",Ii[a],b?"&u="+b:"",c?"&ut="+c:"",ri(),zi,Ai,Gi?Gi:"",Fi,Ei,"&z=0"].join("")},
Ji=function(){return[Ve,"&v=3&t=t","&pid="+Ga(),"&rv="+Le.kc].join("")},Ki="0.005000">Math.random(),Hi=Ji(),Li=function(){Hi=Ji()},yi={},zi="",Ai="",Ei="",Fi="",Gi="",xi=void 0,Ii={},Bi={},vi=void 0,Ci=function(a,b){var c=0,d=0;return{Ah:function(){if(c<a)return!1;Va()-d>=b&&(c=0);return c>=a},Wh:function(){Va()-d>=b&&(c=0);c++;d=Va()}}}(2,1E3),Di=1E3,Mi=function(a,b,c){if(Ki&&!Bi[a]&&b){a!==xi&&(ti(),xi=a);var d,e=String(b[$b.Na]||"").replace(/_/g,"");0===e.indexOf("cvt")&&(e="cvt");
d=e;var f=c+d;zi=zi?zi+"."+f:"&tr="+f;var h=b["function"];if(!h)throw Error("Error: No function name given for function call.");var k=(Pb[h]?"1":"2")+d;Ei=Ei?Ei+"."+k:"&ti="+k;wi();ui()}},Ni=function(a,b,c){if(Ki&&!Bi[a]){a!==xi&&(ti(),xi=a);var d=c+b;Ai=Ai?Ai+"."+d:"&epr="+d;wi();ui()}},Oi=function(a,b,c){};
function Pi(a,b,c,d){var e=Nb[a],f=Qi(a,b,c,d);if(!f)return null;var h=Wb(e[$b.Te],c,[]);if(h&&h.length){var k=h[0];f=Pi(k.index,{K:f,J:1===k.df?b.terminate:f,terminate:b.terminate},c,d)}return f}
function Qi(a,b,c,d){function e(){if(f[$b.wg])k();else{var w=Xb(f,c,[]);var z=Vh(c.id,String(f[$b.Na]),Number(f[$b.Ue]),w[$b.xg]),A=!1;w.vtp_gtmOnSuccess=function(){if(!A){A=!0;var F=Va()-D;Mi(c.id,Nb[a],"5");Wh(c.id,z,"success",
F);h()}};w.vtp_gtmOnFailure=function(){if(!A){A=!0;var F=Va()-D;Mi(c.id,Nb[a],"6");Wh(c.id,z,"failure",F);k()}};w.vtp_gtmTagId=f.tag_id;w.vtp_gtmEventId=c.id;Mi(c.id,f,"1");var B=function(){var F=Va()-D;Mi(c.id,f,"7");Wh(c.id,z,"exception",F);A||(A=!0,k())};var D=Va();try{Vb(w,c)}catch(F){B(F)}}}var f=Nb[a],h=b.K,k=b.J,l=b.terminate;if(c.xd(f))return null;var q=Wb(f[$b.Ve],c,[]);if(q&&q.length){var r=q[0],n=Pi(r.index,{K:h,J:k,terminate:l},c,d);if(!n)return null;h=n;k=2===r.df?l:n}if(f[$b.Pe]||f[$b.zg]){var t=f[$b.Pe]?Ob:c.ei,p=h,u=k;if(!t[a]){e=Ya(e);
var v=Ri(a,t,e);h=v.K;k=v.J}return function(){t[a](p,u)}}return e}function Ri(a,b,c){var d=[],e=[];b[a]=Si(d,e,c);return{K:function(){b[a]=Ti;for(var f=0;f<d.length;f++)d[f]()},J:function(){b[a]=Ui;for(var f=0;f<e.length;f++)e[f]()}}}function Si(a,b,c){return function(d,e){a.push(d);b.push(e);c()}}function Ti(a){a()}function Ui(a,b){b()};var Xi=function(a,b,c){for(var d=[],e=0;e<Nb.length;e++)if(a[e]){var f=Nb[e];var h=c.add();try{var k=Pi(e,{K:h,J:h,terminate:h},b,e);if(k){var l=d,q=l.push,r=e,n=f["function"];if(!n)throw"Error: No function name given for function call.";var t=Pb[n];q.call(l,{Bf:r,uf:t?t.priorityOverride||0:0,kh:k})}else Vi(e,b),h()}catch(u){h()}}c.Ng();d.sort(Wi);for(var p=0;p<d.length;p++)d[p].kh();return 0<d.length};
function Wi(a,b){var c,d=b.uf,e=a.uf;c=d>e?1:d<e?-1:0;var f;if(0!==c)f=c;else{var h=a.Bf,k=b.Bf;f=h>k?1:h<k?-1:0}return f}function Vi(a,b){if(!Ki)return;var c=function(d){var e=b.xd(Nb[d])?"3":"4",f=Wb(Nb[d][$b.Te],b,[]);f&&f.length&&c(f[0].index);Mi(b.id,Nb[d],e);var h=Wb(Nb[d][$b.Ve],b,[]);h&&h.length&&c(h[0].index)};c(a);}
var Yi=!1,cj=function(a){var b=a["gtm.uniqueEventId"],c=a.event;if("gtm.js"===c){if(Yi)return!1;Yi=!0}var d=Fh(b),e=!1;if(!d.active){if("gtm.js"!==c)return!1;e=!0;d=Fh(Number.MAX_SAFE_INTEGER)}Ki&&!Bi[b]&&xi!==b&&(ti(),xi=b,Ei=zi="",Ii[b]="&e="+(0===c.indexOf("gtm.")?encodeURIComponent(c):"*")+"&eid="+b,wi());var f={id:b,name:c,xd:Dh(d.isAllowed),ei:[],pf:function(){E(6)},Ze:Zi(b)},h=$h(b,a.eventCallback,a.eventTimeout);$i(b);
var k=dc(f);e&&(k=aj(k));var l=Xi(k,f,h);"gtm.js"!==c&&"gtm.sync"!==c||li(Le.D);switch(c){case "gtm.init":E(19),l&&E(20)}return bj(k,l)};function Zi(a){return function(b){Ki&&(lb(b)||Oi(a,"input",b))}}
function $i(a){hf(a,"event",1);hf(a,"ecommerce",1);hf(a,"gtm");hf(a,"eventModel");}function aj(a){for(var b=[],c=0;c<a.length;c++)a[c]&&Ne[String(Nb[c][$b.Na])]&&(b[c]=!0);return b}function bj(a,b){if(!b)return b;for(var c=0;c<a.length;c++)if(a[c]&&Nb[c]&&!Oe[String(Nb[c][$b.Na])])return!0;return!1}function dj(a,b){if(a){var c=""+a;0!==c.indexOf("http://")&&0!==c.indexOf("https://")&&(c="https://"+c);"/"===c[c.length-1]&&(c=c.substring(0,c.length-1));return oe(""+c+b).href}}function ej(a,b){return fj()?dj(a,b):void 0}function fj(){var a=!1;return a};var gj=function(){this.eventModel={};this.targetConfig={};this.containerConfig={};this.m={};this.globalConfig={};this.K=function(){};this.J=function(){};this.setContainerTypeLoaded=function(){};this.getContainerTypeLoaded=function(){};this.eventId=void 0},hj=function(a){var b=new gj;b.eventModel=a;return b},ij=function(a,b){a.targetConfig=b;return a},jj=function(a,b){a.containerConfig=b;return a},kj=function(a,b){a.m=b;return a},lj=function(a,b){a.globalConfig=b;return a},mj=function(a,b){a.K=b;return a},
nj=function(a,b){a.setContainerTypeLoaded=b;return a},oj=function(a,b){a.getContainerTypeLoaded=b;return a},pj=function(a,b){a.J=b;return a};gj.prototype.getWithConfig=function(a){if(void 0!==this.eventModel[a])return this.eventModel[a];if(void 0!==this.targetConfig[a])return this.targetConfig[a];if(void 0!==this.containerConfig[a])return this.containerConfig[a];if(void 0!==this.m[a])return this.m[a];if(void 0!==this.globalConfig[a])return this.globalConfig[a]};
var qj=function(a){function b(e){Ka(e,function(f){c[f]=null})}var c={};b(a.eventModel);b(a.targetConfig);b(a.containerConfig);b(a.globalConfig);var d=[];Ka(c,function(e){d.push(e)});return d};var rj;if(3===Le.kc.length)rj="g";else{var sj="G";sj="g";rj=sj}
var tj={"":"n",UA:"u",AW:"a",DC:"d",G:"e",GF:"f",HA:"h",GTM:rj,OPT:"o"},uj=function(a){var b=Le.D.split("-"),c=b[0].toUpperCase(),d=tj[c]||"i",e=a&&"GTM"===c?b[1]:"OPT"===c?b[1]:"",f;if(3===Le.kc.length){var h="w";h=fh()?"s":"o";f="2"+h}else f="";return f+d+Le.kc+e};var vj=function(a,b){a.addEventListener&&a.addEventListener.call(a,"message",b,!1)};var wj=function(){return Yc("iPhone")&&!Yc("iPod")&&!Yc("iPad")};Yc("Opera");Yc("Trident")||Yc("MSIE");Yc("Edge");!Yc("Gecko")||-1!=Vc.toLowerCase().indexOf("webkit")&&!Yc("Edge")||Yc("Trident")||Yc("MSIE")||Yc("Edge");-1!=Vc.toLowerCase().indexOf("webkit")&&!Yc("Edge")&&Yc("Mobile");Yc("Macintosh");Yc("Windows");Yc("Linux")||Yc("CrOS");var xj=qa.navigator||null;xj&&(xj.appVersion||"").indexOf("X11");Yc("Android");wj();Yc("iPad");Yc("iPod");wj()||Yc("iPad")||Yc("iPod");Vc.toLowerCase().indexOf("kaios");var yj=function(a,b){for(var c=a,d=0;50>d;++d){var e;try{e=!(!c.frames||!c.frames[b])}catch(k){e=!1}if(e)return c;var f;a:{try{var h=c.parent;if(h&&h!=c){f=h;break a}}catch(k){}f=null}if(!(c=f))break}return null};var zj=function(){};var Aj=function(a){void 0!==a.addtlConsent&&"string"!==typeof a.addtlConsent&&(a.addtlConsent=void 0);void 0!==a.gdprApplies&&"boolean"!==typeof a.gdprApplies&&(a.gdprApplies=void 0);return void 0!==a.tcString&&"string"!==typeof a.tcString||void 0!==a.listenerId&&"number"!==typeof a.listenerId?2:a.cmpStatus&&"error"!==a.cmpStatus?0:3},Bj=function(a,b){this.o=a;this.m=null;this.M={};this.wa=0;this.la=void 0===b?500:b;this.C=null};pa(Bj,zj);
var Dj=function(a){return"function"===typeof a.o.__tcfapi||null!=Cj(a)};
Bj.prototype.addEventListener=function(a){var b={},c=Pc(function(){return a(b)}),d=0;-1!==this.la&&(d=setTimeout(function(){b.tcString="tcunavailable";b.internalErrorState=1;c()},this.la));var e=function(f,h){clearTimeout(d);f?(b=f,b.internalErrorState=Aj(b),h&&0===b.internalErrorState||(b.tcString="tcunavailable",h||(b.internalErrorState=3))):(b.tcString="tcunavailable",b.internalErrorState=3);a(b)};try{Ej(this,"addEventListener",e)}catch(f){b.tcString="tcunavailable",b.internalErrorState=3,d&&(clearTimeout(d),
d=0),c()}};Bj.prototype.removeEventListener=function(a){a&&a.listenerId&&Ej(this,"removeEventListener",null,a.listenerId)};
var Gj=function(a,b,c){var d;d=void 0===d?"755":d;var e;a:{if(a.publisher&&a.publisher.restrictions){var f=a.publisher.restrictions[b];if(void 0!==f){e=f[void 0===d?"755":d];break a}}e=void 0}var h=e;if(0===h)return!1;var k=c;2===c?(k=0,2===h&&(k=1)):3===c&&(k=1,1===h&&(k=0));var l;if(0===k)if(a.purpose&&a.vendor){var q=Fj(a.vendor.consents,void 0===d?"755":d);l=q&&"1"===b&&a.purposeOneTreatment&&"DE"===a.publisherCC?!0:q&&Fj(a.purpose.consents,b)}else l=!0;else l=1===k?a.purpose&&a.vendor?Fj(a.purpose.legitimateInterests,
b)&&Fj(a.vendor.legitimateInterests,void 0===d?"755":d):!0:!0;return l},Fj=function(a,b){return!(!a||!a[b])},Ej=function(a,b,c,d){c||(c=function(){});if("function"===typeof a.o.__tcfapi){var e=a.o.__tcfapi;e(b,2,c,d)}else if(Cj(a)){Hj(a);var f=++a.wa;a.M[f]=c;if(a.m){var h={};a.m.postMessage((h.__tcfapiCall={command:b,version:2,callId:f,parameter:d},h),"*")}}else c({},!1)},Cj=function(a){if(a.m)return a.m;a.m=yj(a.o,"__tcfapiLocator");return a.m},Hj=function(a){a.C||(a.C=function(b){try{var c;c=("string"===
typeof b.data?JSON.parse(b.data):b.data).__tcfapiReturn;a.M[c.callId](c.returnValue,c.success)}catch(d){}},vj(a.o,a.C))};var Ij={1:0,3:0,4:0,7:3,9:3,10:3};function Jj(a,b){if(""===a)return b;var c=Number(a);return isNaN(c)?b:c}var Kj=Jj("",550),Lj=Jj("",500);function Mj(){var a=L.tcf||{};return L.tcf=a}
var Nj=function(a,b){this.C=a;this.m=b;this.o=Va();},Oj=function(a){},Pj=function(a){},Vj=function(){var a=Mj(),b=new Bj(G,3E3),c=new Nj(b,a);if((Qj()?!0===G.gtag_enable_tcf_support:!1!==G.gtag_enable_tcf_support)&&!a.active&&("function"===typeof G.__tcfapi||Dj(b))){a.active=!0;a.Nb={};Rj();var d=setTimeout(function(){Sj(a);Tj(a);d=null},Lj);try{b.addEventListener(function(e){d&&(clearTimeout(d),d=null);if(0!==e.internalErrorState)Sj(a),Tj(a),Oj(c);else{var f;if(!1===e.gdprApplies)f=Uj(),b.removeEventListener(e);
else if("tcloaded"===e.eventStatus||"useractioncomplete"===e.eventStatus||"cmpuishown"===e.eventStatus){var h={},k;for(k in Ij)if(Ij.hasOwnProperty(k))if("1"===k){var l=e,q=!0;q=void 0===q?!1:q;var r;var n=l;!1===n.gdprApplies?r=!0:(void 0===n.internalErrorState&&(n.internalErrorState=Aj(n)),r="error"===n.cmpStatus||0!==n.internalErrorState||"loaded"===n.cmpStatus&&("tcloaded"===n.eventStatus||"useractioncomplete"===n.eventStatus)?!0:!1);h["1"]=r?!1===l.gdprApplies||"tcunavailable"===l.tcString||
void 0===l.gdprApplies&&!q||"string"!==typeof l.tcString||!l.tcString.length?!0:Gj(l,"1",0):!1}else h[k]=Gj(e,k,Ij[k]);f=h}f&&(a.tcString=e.tcString||"tcempty",a.Nb=f,Tj(a),Oj(c))}}),Pj(c)}catch(e){d&&(clearTimeout(d),d=null),Sj(a),Tj(a)}}};function Sj(a){a.type="e";a.tcString="tcunavailable";a.Nb=Uj()}function Rj(){var a={};Nd((a.ad_storage="denied",a.wait_for_update=Kj,a))}
var Qj=function(){var a=!1;a=!0;return a};function Uj(){var a={},b;for(b in Ij)Ij.hasOwnProperty(b)&&(a[b]=!0);return a}function Tj(a){var b={};Od((b.ad_storage=a.Nb["1"]?"granted":"denied",b))}
var Wj=function(){var a=Mj();if(a.active&&void 0!==a.loadTime)return Number(a.loadTime)},Xj=function(){var a=Mj();return a.active?a.tcString||"":""},Yj=function(a){if(!Ij.hasOwnProperty(String(a)))return!0;var b=Mj();return b.active&&b.Nb?!!b.Nb[String(a)]:!0};var Zj=!1;function ak(a){var b=String(G.location).split(/[?#]/)[0],c=Le.Jf||G._CONSENT_MODE_SALT;return a?c?String(rf(b+a+c)):"0":""}
function bk(a,b,c,d,e){function f(t){var p;L.reported_gclid||(L.reported_gclid={});p=L.reported_gclid;var u;u=Zj&&e&&(!Id()||Pd(C.B))?k+"."+(d.prefix||"_gcl")+(t?"gcu":"gcs"):k+(t?"gcu":"gcs");if(!p[u]){p[u]=!0;var v=[],w=function(B,D){D&&v.push(B+"="+encodeURIComponent(D))},y="https://www.google.com";if(Id()){var x=Pd(C.B);w("gcs",Qd());t&&w("gcu","1");L.dedupe_gclid||(L.dedupe_gclid=""+Gf());w("rnd",L.dedupe_gclid);
if((!k||l&&"aw.ds"!==l)&&Pd(C.B)){var z=Eg("_gcl_aw");w("gclaw",z.join("."))}w("url",String(G.location).split(/[?#]/)[0]);w("dclid",ck(b,q));!x&&b&&(y="https://pagead2.googlesyndication.com")}w("gdpr_consent",Xj());"1"===ng(!1)._up&&w("gtm_up","1");w("gclid",ck(b,k));w("gclsrc",l);w("gtm",uj(!c));Zj&&e&&Pd(C.B)&&(Sf(d||{}),w("auid",Nf[Of(d.prefix)]||""));var A=y+"/pagead/landing?"+v.join("&");vd(A)}}d=void 0===d?{}:
d;e=void 0===e?!0:e;var h=Hg(),k=h.gclid||"",l=h.gclsrc,q=h.dclid||"",r=!a&&(!k||l&&"aw.ds"!==l?!1:!0),n=Id();if(r||n)n?Rd(function(){f();Pd(C.B)||Ld(function(t){return f(!0,t.$e)},C.B)},[C.B]):f()}function ck(a,b){var c=a&&!Pd(C.B);return b&&c?"0":b}
var dk=function(a){var b=ej(a,"/pagead/conversion_async.js");if(b)return b;var c=-1!==navigator.userAgent.toLowerCase().indexOf("firefox"),d=hh("https://","http://","www.googleadservices.com");if(c||1===wh())d="https://www.google.com";return d+"/pagead/conversion_async.js"},ek=!1,fk=[],gk=["aw","dc"],hk=function(a){var b=G.google_trackConversion,c=a.gtm_onFailure;"function"==typeof b?b(a)||c():c()},ik=function(){for(;0<fk.length;)hk(fk.shift())},jk=function(a,b){var c=!1;var d=ek;c&&(d=b.getContainerTypeLoaded("AW"));if(!d){ek=!0;ai();var e=function(){c&&b.setContainerTypeLoaded("AW",!0);ik();fk={push:hk}};fh()?e():ld(a,e,function(){ik();ek=!1;c&&b.setContainerTypeLoaded("AW",!1)})}},kk=function(a){if(a){for(var b=[],c=0;c<a.length;++c){var d=a[c];d&&b.push({item_id:d.id,quantity:d.quantity,value:d.price,start_date:d.start_date,end_date:d.end_date})}return b}},lk=function(a,b,c,d){function e(){wa("gdpr_consent",Xj());}function f(){var Q=[];return Q}function h(Q){var oa=!0,Ba=[];if(Q){Ba=f();}t&&(W("delopc",p(C.dd)),W("oedeld",p(C.xe)),W("delc",
p(C.ne)),W("shf",p(C.ue)),W("iedeld",xh(p(C.W))));oa&&fk.push(M)}function k(){return function(Q){u&&(Q=vh(Q));return Q}}var l=ch(a),q=b==C.fa,r=l.F[0],n=l.F[1],t=void 0!==n,p=function(Q){return d.getWithConfig(Q)},u=void 0!=p(C.O)&&!1!==p(C.O),v=!1!==p(C.qb),w=p(C.pb)||p(C.Z),y=p(C.X),x=p(C.ja),z=p(C.na),A=p(C.Ma),B=dk(A);jk(B,d);var D={prefix:w,domain:y,Lb:x,flags:z};if(q){var F=p(C.ka)||{};if(v){var K=p(C.rb),P=void 0===K?!0:!!K;vg(F[C.$a],!!F[C.H])&&
Ng(gk,D);Kg(D);Pg(["aw","dc"],D);}p(C.Da)&&Rg();F[C.H]&&Og(gk,F[C.H],F[C.cb],!!F[C.ab],w);sh(l,d);bk(!1,u,a,v?D:void 0,v)}if(b===C.Ja){var T=p(C.Ba),V=p(C.Aa),ia=p(T);if(T===C.Xb&&void 0===ia){var O=Xg("aw",D.prefix,u);0===O.length?V(void 0):1===O.length?V(O[0]):V(O)}else V(ia)}else{var J=!1===p(C.fe)||!1===p(C.ub);if(!q||!t&&!J)if(!0===p(C.he)&&(t=!1),!1!==p(C.ia)||t){var M={google_conversion_id:r,
google_remarketing_only:!t,onload_callback:d.K,gtm_onFailure:d.J,google_conversion_format:"3",google_conversion_color:"ffffff",google_conversion_domain:"",google_conversion_label:n,google_conversion_language:p(C.Za),google_conversion_value:p(C.Ea),google_conversion_currency:p(C.za),google_conversion_order_id:p(C.wb),google_user_id:p(C.xb),google_conversion_page_url:p(C.tb),google_conversion_referrer_url:p(C.Ca),google_gtm:uj()};M.google_gtm_experiments=
{capi:!0};t&&(M.google_transport_url=dj(A,"/"));M.google_restricted_data_processing=p(C.ad);fh()&&(M.opt_image_generator=function(){return new Image},M.google_enable_display_cookie_match=!1);!1===p(C.ia)&&(M.google_allow_ad_personalization_signals=!1);M.google_read_gcl_cookie_opt_out=!v;v&&w&&(M.google_gcl_cookie_prefix=w);var X=function(){var Q={event:b},oa=d.eventModel;if(!oa)return null;m(oa,Q);for(var Ba=0;Ba<C.Vd.length;++Ba)delete Q[C.Vd[Ba]];
return Q}();X&&(M.google_custom_params=X);!t&&p(C.W)&&(M.google_gtag_event_data={items:p(C.W)});if(t&&b==C.ma){M.google_conversion_merchant_id=p(C.me);M.google_basket_feed_country=p(C.je);M.google_basket_feed_language=p(C.ke);M.google_basket_discount=p(C.ie);M.google_basket_transaction_type=b;M.google_disable_merchant_reported_conversions=!0===p(C.qe);fh()&&(M.google_disable_merchant_reported_conversions=!0);var ca=kk(p(C.W));ca&&(M.google_conversion_items=ca)}var W=function(Q,oa){void 0!=oa&&""!==
oa&&(M.google_additional_conversion_params=M.google_additional_conversion_params||{},M.google_additional_conversion_params[Q]=oa)},wa=function(Q,oa){void 0!=oa&&""!==oa&&(M.google_additional_params=M.google_additional_params||{},M.google_additional_params[Q]=oa)};"1"===ng(!1)._up&&W("gtm_up","1");t&&(W("vdnc",p(C.ye)),W("vdltv",p(C.oe)));e();var ja=wh();0===ja?wa("dg","c"):1===ja&&wa("dg","e");M.google_gtm_url_processor=k();(function(){Id()?Rd(function(){e();var Q=Pd(C.B);if(t)W("gcs",Qd()),Q||A||
!u||(M.google_transport_url="https://pagead2.googlesyndication.com/"),h(Q);else if(Q){h(Q);return}Q||Ld(function(oa){var Ba=oa.$e;M=m(M);M.google_gtm_url_processor=k(Ba);!A&&M.google_transport_url&&delete M.google_transport_url;e();t&&(W("gcs",Qd()),W("gcu","1"));h(!0)},C.B)},[C.B]):h(!0)})()}}};
var mk=function(a){return!(void 0===a||null===a||0===(a+"").length)},nk=function(a,b){var c;if(2===b.ca)return a("ord",Ga(1E11,1E13)),!0;if(3===b.ca)return a("ord","1"),a("num",Ga(1E11,1E13)),!0;if(4===b.ca)return mk(b.sessionId)&&a("ord",b.sessionId),!0;if(5===b.ca)c="1";else if(6===b.ca)c=b.Ld;else return!1;mk(c)&&a("qty",c);mk(b.qc)&&a("cost",b.qc);mk(b.transactionId)&&a("ord",b.transactionId);return!0},pk=function(a,b,c){function d(x,z,A){r.hasOwnProperty(x)||(z=String(z),q.push(";"+x+"="+(A?
z:ok(z))))}var e=a.qd,f=a.Od,h=a.protocol;h+=f?"//"+e+".fls.doubleclick.net/activityi":"//ad.doubleclick.net/activity";var k=";",l=!Pd(C.B)&&a.Ob;l&&(h="https://ade.googlesyndication.com/ddm/activity",k="/",f=!1);var q=[k,"src="+ok(e),";type="+ok(a.td),";cat="+ok(a.Db)],r=a.fh||{};Ka(r,function(x,z){q.push(";"+ok(x)+"="+ok(z+""))});if(nk(d,a)){mk(a.Kc)&&d("u",a.Kc);mk(a.Jc)&&d("tran",a.Jc);d("gtm",uj());Id()&&(d("gcs",Qd()),c&&d("gcu","1"));(function(x,z){z&&
d(x,z)})("gdpr_consent",Xj());"1"===ng(!1)._up&&d("gtm_up","1");!1===a.Kg&&d("npa","1");if(a.pd){var n=void 0===a.Ob?!0:!!a.Ob,t=Xg("dc",a.fb,n);t&&t.length&&d("gcldc",t.join("."));var p=Xg("aw",a.fb,n);p&&p.length&&d("gclaw",p.join("."));var u=Yg(n);u&&d("gac",u);Sf({prefix:a.fb,Lb:a.bh,domain:a.ah,flags:a.Ai});var v=Nf[Of(a.fb)];v&&d("auiddc",v)}mk(a.Gd)&&d("prd",a.Gd,!0);Ka(a.Sd,function(x,z){d(x,z)});q.push(b||"");if(mk(a.Ac)){var w=a.Ac||"";l&&(w=pe(w));
d("~oref",w)}var y=h+q.join("")+"?";f?nd(y,a.K):od(y,a.K,a.J)}else I(a.J)},ok=encodeURIComponent,qk=function(a,b){Id()?Rd(function(){pk(a,b);Pd(C.B)||Ld(function(){pk(a,b,!0)},C.B)},[C.B]):pk(a,b)};
var rk=function(a,b,c,d){function e(){var f={config:a,gtm:uj()};c&&(Sf(d),f.auiddc=Nf[Of(d.prefix)]);b&&(f.loadInsecure=b);void 0===G.__dc_ns_processor&&(G.__dc_ns_processor=[]);G.__dc_ns_processor.push(f);ld((b?"http":"https")+"://www.googletagmanager.com/dclk/ns/v1.js")}Pd(C.B)?e():Ld(e,C.B)},sk=function(a){var b=/^u([1-9]\d?|100)$/,c=a.getWithConfig(C.pe)||{},d=qj(a),e={},f={};if(kb(c))for(var h in c)if(c.hasOwnProperty(h)&&b.test(h)){var k=c[h];g(k)&&(e[h]=k)}for(var l=0;l<d.length;l++){var q=
d[l];b.test(q)&&(e[q]=q)}for(var r in e)e.hasOwnProperty(r)&&(f[r]=a.getWithConfig(e[r]));return f},tk=function(a){function b(l,q,r){void 0!==r&&0!==(r+"").length&&d.push(l+q+":"+c(r+""))}var c=encodeURIComponent,d=[],e=a(C.W)||[];if(Da(e))for(var f=0;f<e.length;f++){var h=e[f],k=f+1;b("i",k,h.id);b("p",k,h.price);b("q",k,h.quantity);b("c",k,a(C.ne));b("l",k,a(C.Za))}return d.join("|")},uk=function(a){var b=/^DC-(\d+)(\/([\w-]+)\/([\w-]+)\+(\w+))?$/.exec(a);if(b){var c={standard:2,unique:3,per_session:4,
transactions:5,items_sold:6,"":1}[(b[5]||"").toLowerCase()];if(c)return{containerId:"DC-"+b[1],U:b[3]?a:"",Eg:b[1],Dg:b[3]||"",Db:b[4]||"",ca:c}}},xk=function(a,b,c,d){var e=uk(a);if(e){var f=function(J){return d.getWithConfig(J)},h=!1!==f(C.qb),k=f(C.pb)||f(C.Z),l=f(C.X),q=f(C.ja),r=f(C.na),n=f(C.Zf),t=void 0!=f(C.O)&&!1!==f(C.O),p=3===gh();if(b===C.Ja){var u=f(C.Ba),v=f(C.Aa),w=f(u);if(u===C.Xb&&void 0===w){var y=Xg("dc",k,t);0===y.length?v(void 0):1===y.length?v(y[0]):v(y)}else v(w)}else if(b===
C.fa){var x={prefix:k,domain:l,Lb:q,flags:r},z=f(C.ka)||{},A=f(C.rb),B=void 0===A?!0:!!A;h&&(vg(z[C.$a],!!z[C.H])&&Ng(vk,x),Kg(x),Pg(vk,x),wk?Zg(B,x):$g(B,x));z[C.H]&&Og(vk,z[C.H],z[C.cb],!!z[C.ab],k);f(C.Da)&&Rg();if(n&&n.exclusion_parameters&&n.engines)if(fh()){}else rk(n,p,h,x);bk(!0,t,a,h?x:void 0,h);I(d.K)}else{var D={},F=f(C.Yf);if(kb(F))for(var K in F)if(F.hasOwnProperty(K)){var P=F[K];void 0!==P&&null!==P&&
(D[K]=P)}var T="";if(5===e.ca||6===e.ca)T=tk(f);var V=sk(d),ia=!0===f(C.Vf);if(fh()&&ia){ia=!1}var O={Db:e.Db,pd:h,ah:l,bh:q,fb:k,qc:f(C.Ea),ca:e.ca,fh:D,qd:e.Eg,td:e.Dg,J:d.J,K:d.K,Ac:ne(oe(G.location.href)),Gd:T,protocol:p?"http:":"https:",Ld:f(C.kg),Od:ia,sessionId:f(C.bc),Jc:void 0,transactionId:f(C.wb),Kc:void 0,Sd:V,Kg:!1!==f(C.ia),eventId:d.eventId,Ob:t};qk(O)}}else I(d.J)},vk=["aw","dc"],wk=!1;
var zk=function(a){function b(){var d=c,e=yk(JSON.stringify(a[d])),f="https://www.google.com/travel/flights/click/conversion/"+yk(a.conversion_id)+"/?"+d+"="+e;if(a.conversionLinkerEnabled){var h=Xg("gf",a.cookiePrefix,void 0);if(h&&h.length)for(var k=0;k<h.length;k++)f+="&gclgf="+yk(h[k])}od(f,a.onSuccess,a.onFailure)}var c;if(a.hasOwnProperty("conversion_data"))c="conversion_data";else if(a.hasOwnProperty("price"))c="price";else return;Pd(C.B)?b():Ld(b,C.B)},yk=function(a){return null===a||void 0===
a||0===String(a).length?"":encodeURIComponent(String(a))};
var Ak=/.*\.google\.com(:\d+)?\/(?:booking|travel)\/flights.*/,Ck=function(a,b,c,d){var e=function(D){return d.getWithConfig(D)},f=ch(a).F[0],h=!1!==e(C.qb),k=e(C.pb)||e(C.Z),l=e(C.X),q=e(C.ja),r=e(C.na);if(b===C.Ja){var n=e(C.Ba),t=e(C.Aa),p=e(n);if(n===C.Xb&&void 0===p){var u=void 0!=e(C.O)&&!1!==e(C.O),v=Xg("gf",k,u);0===v.length?t(void 0):1===v.length?t(v[0]):t(v)}else t(p)}else if(b===C.fa){if(h){var w={prefix:k,domain:l,flags:r,Lb:q};Kg(w);Pg(["aw","dc"],w)}I(d.K)}else{var y={conversion_id:f,
onFailure:d.J,onSuccess:d.K,conversionLinkerEnabled:h,cookiePrefix:k},x=Ak.test(G.location.href);if(b===C.ya){var z={partner_id:f,is_direct_booking:x,total_price:e(C.Ea),currency:e(C.za)};y.price=z;zk(y);return}if(b!==C.ma)I(d.J);else{var A={partner_id:f,trip_type:e(C.pg),total_price:e(C.Ea),currency:e(C.za),is_direct_booking:x,flight_segment:Bk(e(C.W))},B=e(C.hg);B&&"object"===typeof B&&
(A.passengers_total=Na(B.total),A.passengers_adult=Na(B.adult),A.passengers_child=Na(B.child),A.passengers_infant_in_seat=Na(B.infant_in_seat),A.passengers_infant_in_lap=Na(B.infant_in_lap));y.conversion_data=A;zk(y)}}},Bk=function(a){if(a){for(var b=[],c=0,d=0;d<a.length;++d){var e=a[d];!e||void 0!==e.category&&""!==e.category&&"FlightSegment"!==e.category||(b[c]={cabin:e.travel_class,fare_product:e.fare_product,booking_code:e.booking_code,flight_number:e.flight_number,origin:e.origin,destination:e.destination,
departure_date:e.start_date},c++)}return b}};
var Hk=function(a,b,c,d){function e(){Xj()&&(A+="&gdpr_consent="+encodeURIComponent(Xj()));if(k){var F=b===C.ya?Xg("aw",l,void 0):Xg("ha",l,void 0);A+=F.map(function(K){return"&gclha="+encodeURIComponent(K)}).join("")}od(A,d.K,d.J)}var f=ch(a),h=function(F){return d.getWithConfig(F)},k=!1!==h(C.qb),l=h(C.pb)||h(C.Z),q=h(C.X),r=h(C.ja),n=h(C.na);if(b===C.Ja){var t=h(C.Ba),p=h(C.Aa),u=h(t);if(t===C.Xb&&void 0===u){var v=
void 0!=h(C.O)&&!1!==h(C.O),w=Xg("ha",l,v);0===w.length?p(void 0):1===w.length?p(w[0]):p(w)}else p(u)}else if(b===C.fa){var y=h(C.ka)||{};if(k){var x={prefix:l,domain:q,flags:n,Lb:r};vg(y[C.$a],!!y[C.H])&&Ng(Dk,x);Kg(x);Pg(["aw","dc"],x)}y[C.H]&&Og(Dk,y[C.H],y[C.cb],!!y[C.ab],l);I(d.K)}else{var z=f.F[0];if(/^\d+$/.test(z)){var A="https://www.googletraveladservices.com/travel/clk/pagead/conversion/"+encodeURIComponent(z)+"/";if(b===C.ma){var B=Ek(h(C.wb),h(C.Ea),h(C.za),h(C.W));B=encodeURIComponent(Fk(B));
A+="?data="+B}else if(b===C.ya){var D=Gk(z,h(C.Ea),h(C.ve),h(C.za),h(C.W));D=encodeURIComponent(Fk(D));A+="?label=FH&guid=ON&script=0&ord="+Ga(0,4294967295)+("&price="+D)}else{I(d.J);return}Pd(C.B)?e():Ld(e,C.B)}else I(d.J)}},Ek=function(a,b,c,d){var e={};Ik(a)&&(e.hct_booking_xref=a);g(c)&&(e.hct_currency_code=c);Ik(b)&&(e.hct_total_price=b,e.hct_base_price=b);if(!Da(d)||0===d.length)return e;var f=d[0];if(!kb(f))return e;Ik(f[Jk.hd])&&(e.hct_partner_hotel_id=f[Jk.hd]);g(f[Jk.kd])&&(e.hct_checkin_date=
f[Jk.kd]);g(f[Jk.Nc])&&(e.hct_checkout_date=f[Jk.Nc]);return e},Gk=function(a,b,c,d,e){function f(r){void 0===r&&(r=0);if(Ik(r))return l+r}function h(r,n,t){t(n)&&(k[r]=n)}var k={};k.partner_id=a;var l="USD";g(d)&&(l=k.currency=d);Ik(b)&&(k.base_price_value_string=f(b),k.display_price_value_string=f(b));Ik(c)&&(k.tax_price_value_string=f(c));g("LANDING_PAGE")&&(k.page_type="LANDING_PAGE");if(!Da(e)||0==e.length)return k;var q=e[0];if(!kb(q))return k;Ik(q[Jk.Qe])&&(k.total_price_value_string=f(q[Jk.Qe]));
h("partner_hotel_id",q[Jk.hd],Ik);h("check_in_date",q[Jk.kd],g);h("check_out_date",q[Jk.Nc],g);h("adults",q[Jk.yg],Kk);h(Jk.Se,q[Jk.Se],g);h(Jk.Re,q[Jk.Re],g);return k},Fk=function(a){var b=[];Ka(a,function(c,d){b.push(c+"="+d)});return b.join(";")},Ik=function(a){return g(a)||Kk(a)},Kk=function(a){return"number"===typeof a},Jk={hd:"id",Qe:"price",kd:"start_date",Nc:"end_date",yg:"occupancy",Se:"room_id",Re:"rate_rule_id"},Dk=["ha"];var Mk=function(){var a=!0;Yj(7)&&Yj(9)&&Yj(10)||(a=!1);var b=!0;b=!1;b&&!Lk()&&(a=!1);return a},Lk=function(){var a=!0;Yj(3)&&Yj(4)||(a=!1);return a};
var Qk=function(a,b){var c=b.getWithConfig(C.Ba),d=b.getWithConfig(C.Aa),e=b.getWithConfig(c);if(void 0===e){var f=void 0;Nk.hasOwnProperty(c)?f=Nk[c]:Ok.hasOwnProperty(c)&&(f=Ok[c]);1===f&&(f=Pk(c));g(f)?fi()(function(){var h=fi().getByName(a).get(f);d(h)}):d(void 0)}else d(e)},Tk=function(a,b,c){if(Id()){var d=function(){var e=fi(),f=Rk(a,b,"",c);Sk(b,f.Fa)&&(e(function(){e.remove(b)}),e("create",a,f.Fa))};Ld(d,C.I);Ld(d,C.B)}},$k=function(a,b,c){var d="https://www.google-analytics.com/analytics.js",
e=hi();if(Aa(e)){var f="gtag_"+a.split("-").join("_"),h=function(x){var z=[].slice.call(arguments,0);z[0]=f+"."+z[0];e.apply(window,z)},k=function(){var x=function(D,F){for(var K=0;F&&K<F.length;K++)h(D,F[K])},z=Uk(b,c);if(z){var A=z.action;if("impressions"===A)x("ec:addImpression",z.uh);else if("promo_click"===A||"promo_view"===A){var B=z.Id;x("ec:addPromo",z.Id);B&&0<B.length&&"promo_click"===A&&h("ec:setAction",A)}else x("ec:addProduct",z.ib),h("ec:setAction",A,z.Cb)}},l=function(){if(fh()){}else{var x=c.getWithConfig(C.gg);x&&(h("require",x,{dataLayer:"dataLayer"}),h("require","render"))}},q=Rk(a,f,b,c),r=function(x,z,A){A&&(z=""+z);q.Ga[x]=z};Sk(f,q.Fa)&&(e(function(){fi()&&fi().remove(f)}),Vk[f]=!1);e("create",a,q.Fa);if(q.Fa._x_19){var n=ej(q.Fa._x_19,"/analytics.js");n&&(d=n);q.Fa._x_20&&!Vk[f]&&(Vk[f]=!0,e(mi(f,q.Fa._x_20)))}(function(){var x=c.getWithConfig("custom_map");e(function(){if(kb(x)){var z=q.Ga,A=fi().getByName(f),B;for(B in x)if(x.hasOwnProperty(B)&&
/^(dimension|metric)\d+$/.test(B)&&void 0!=x[B]){var D=A.get(Pk(x[B]));Wk(z,B,D)}}})})();(function(x){if(x){var z={};if(kb(x))for(var A in Xk)Xk.hasOwnProperty(A)&&Yk(Xk[A],A,x[A],z);h("require","linkid",z)}})(q.linkAttribution);var t=q[C.ka];if(t&&t[C.H]){var p=t[C.cb];ii(f+".",t[C.H],void 0===p?!!t.use_anchor:"fragment"===p,!!t[C.ab])}b===C.Pc?(l(),h("send","pageview",q.Ga)):b===C.fa?(l(),sh(a,c),c.getWithConfig(C.Da)&&(Rg(),ji(f+".")),0!=q.sendPageView&&h("send","pageview",q.Ga),Tk(a,f,c)):b===
C.Ja?Qk(f,c):"screen_view"===b?h("send","screenview",q.Ga):"timing_complete"===b?(r("timingCategory",q.eventCategory,!0),r("timingVar",q.name,!0),r("timingValue",Na(q.value)),void 0!==q.eventLabel&&r("timingLabel",q.eventLabel,!0),h("send","timing",q.Ga)):"exception"===b?h("send","exception",q.Ga):"optimize.callback"!==b&&(0<=Ea([C.Wb,"select_content",C.ya,C.Va,C.Wa,C.Ia,"set_checkout_option",C.ma,C.Xa,"view_promotion","checkout_progress"],b)&&(h("require","ec","ec.js"),k()),r("eventCategory",q.eventCategory,
!0),r("eventAction",q.eventAction||b,!0),void 0!==q.eventLabel&&r("eventLabel",q.eventLabel,!0),void 0!==q.value&&r("eventValue",Na(q.value)),h("send","event",q.Ga));var u=!1;var v=Zk;u&&(v=c.getContainerTypeLoaded("UA"));if(!v){Zk=!0;ai();var w=function(){u&&c.setContainerTypeLoaded("UA",!1);c.J()},y=function(){u&&c.setContainerTypeLoaded("UA",!0);
fi().loaded||w()};fh()?I(y):ld(d,y,w)}}else I(c.J)},al=function(a,b,c,d){Rd(function(){$k(a,b,d)},[C.I,C.B])},bl=function(a){return Pd(a)},Zk,Vk={},Nk={client_id:1,client_storage:"storage",cookie_name:1,cookie_domain:1,cookie_expires:1,cookie_path:1,cookie_update:1,cookie_flags:1,sample_rate:1,site_speed_sample_rate:1,use_amp_client_id:1,store_gac:1,conversion_linker:"storeGac"},Ok={anonymize_ip:1,app_id:1,app_installer_id:1,app_name:1,app_version:1,campaign:{name:"campaignName",source:"campaignSource",
medium:"campaignMedium",term:"campaignKeyword",content:"campaignContent",id:"campaignId"},currency:"currencyCode",description:"exDescription",fatal:"exFatal",language:1,non_interaction:1,page_hostname:"hostname",page_referrer:"referrer",page_path:"page",page_location:"location",page_title:"title",screen_name:1,transport_type:"transport",user_id:1},cl={content_id:1,event_category:1,event_action:1,event_label:1,link_attribution:1,linker:1,method:1,name:1,send_page_view:1,value:1},Xk={cookie_name:1,
cookie_expires:"duration",levels:1},dl={anonymize_ip:1,fatal:1,non_interaction:1,use_amp_client_id:1,send_page_view:1,store_gac:1,conversion_linker:1},Yk=function(a,b,c,d){if(void 0!==c)if(dl[b]&&(c=Sa(c)),"anonymize_ip"!==b||c||(c=void 0),1===a)d[Pk(b)]=c;else if(g(a))d[a]=c;else for(var e in a)a.hasOwnProperty(e)&&void 0!==c[e]&&(d[a[e]]=c[e])},Pk=function(a){return a&&g(a)?a.replace(/(_[a-z])/g,function(b){return b[1].toUpperCase()}):a},el=function(a){var b="general";0<=Ea([C.ae,C.Va,C.de,C.Ia,
"checkout_progress",C.ma,C.Xa,C.Wa,"set_checkout_option"],a)?b="ecommerce":0<=Ea("generate_lead login search select_content share sign_up view_item view_item_list view_promotion view_search_results".split(" "),a)?b="engagement":"exception"===a&&(b="error");return b},Wk=function(a,b,c){a.hasOwnProperty(b)||(a[b]=c)},fl=function(a){if(Da(a)){for(var b=[],c=0;c<a.length;c++){var d=a[c];if(void 0!=d){var e=d.id,f=d.variant;void 0!=e&&void 0!=f&&b.push(String(e)+"."+String(f))}}return 0<b.length?b.join("!"):
void 0}},Rk=function(a,b,c,d){function e(F,K){void 0!==K&&(k[F]=K)}var f=function(F){return d.getWithConfig(F)},h={},k={},l={},q=fl(f(C.cg));q&&Wk(k,"exp",q);Id()&&(l._cs=bl);var r=f("custom_map");if(kb(r))for(var n in r)if(r.hasOwnProperty(n)&&/^(dimension|metric)\d+$/.test(n)&&void 0!=r[n]){var t=f(String(r[n]));void 0!==t&&Wk(k,n,t)}for(var p=qj(d),u=0;u<p.length;++u){var v=p[u],w=f(v);if(cl.hasOwnProperty(v))Yk(cl[v],v,w,h);else if(Ok.hasOwnProperty(v))Yk(Ok[v],v,w,k);else if(Nk.hasOwnProperty(v))Yk(Nk[v],
v,w,l);else if(/^(dimension|metric|content_group)\d+$/.test(v))Yk(1,v,w,k);else if("developer_id"===v){var y=fb(w);y&&(k["&did"]=y)}else v===C.Z&&0>Ea(p,C.Yb)&&(l.cookieName=w+"_ga")}Wk(l,"cookieDomain","auto");Wk(k,"forceSSL",!0);Wk(h,"eventCategory",el(c));0<=Ea(["view_item","view_item_list","view_promotion","view_search_results"],c)&&Wk(k,"nonInteraction",!0);"login"===c||"sign_up"===c||"share"===c?Wk(h,"eventLabel",f(C.fg)):"search"===c||"view_search_results"===c?Wk(h,"eventLabel",f(C.ng)):"select_content"===
c&&Wk(h,"eventLabel",f(C.Xf));var x=h[C.ka]||{},z=x[C.$a];z||0!=z&&x[C.H]?l.allowLinker=!0:!1===z&&Wk(l,"useAmpClientId",!1);f(C.Da)&&(l._useUp=!0);!1!==f(C.Wf)&&!1!==f(C.ob)&&Mk()||(k.allowAdFeatures=!1);if(!1===f(C.ia)||!Lk()){var A="allowAdFeatures";A="allowAdPersonalizationSignals";k[A]=!1}l.name=b;k["&gtm"]=uj(!0);k.hitCallback=d.K;Id()&&(k["&gcs"]=Qd(),Pd(C.I)||(l.storage="none"),Pd(C.B)||(k.allowAdFeatures=!1,l.storeGac=!1));var B=f(C.Ma)||f(C.eg)||df("gtag.remote_config."+a+".url",2),D=f(C.dg)||df("gtag.remote_config."+a+".dualId",2);if(B&&null!=id){l._x_19=B;}D&&(l._x_20=D);h.Ga=k;h.Fa=l;return h},Uk=function(a,b){function c(v){function w(x,
z){for(var A=0;A<z.length;A++){var B=z[A];if(v[B]){y[x]=v[B];break}}}var y=m(v);
w("listPosition",["list_position"]);w("creative",["creative_name"]);w("list",["list_name"]);w("position",["list_position","creative_slot"]);return y}function d(v){for(var w=[],y=0;v&&y<v.length;y++)v[y]&&w.push(c(v[y]));return w.length?w:void 0}function e(v){return{id:f(C.wb),affiliation:f(C.$f),revenue:f(C.Ea),tax:f(C.ve),shipping:f(C.ue),coupon:f(C.ag),list:f(C.Sc)||v}}for(var f=function(v){return b.getWithConfig(v)},h=f(C.W),k,l=0;h&&l<h.length&&!(k=h[l][C.Sc]);l++);var q=f("custom_map");if(kb(q))for(var r=
0;h&&r<h.length;++r){var n=h[r],t;for(t in q)q.hasOwnProperty(t)&&/^(dimension|metric)\d+$/.test(t)&&void 0!=q[t]&&Wk(n,t,n[q[t]])}var p=null,u=f(C.bg);a===C.ma||a===C.Xa?p={action:a,Cb:e(),ib:d(h)}:a===C.Va?p={action:"add",ib:d(h)}:a===C.Wa?p={action:"remove",ib:d(h)}:a===C.ya?p={action:"detail",Cb:e(k),ib:d(h)}:a===C.Wb?p={action:"impressions",uh:d(h)}:"view_promotion"===a?p={action:"promo_view",Id:d(u)}:"select_content"===a&&u&&0<u.length?p={action:"promo_click",Id:d(u)}:"select_content"===a?p=
{action:"click",Cb:{list:f(C.Sc)||k},ib:d(h)}:a===C.Ia||"checkout_progress"===a?p={action:"checkout",ib:d(h),Cb:{step:a===C.Ia?1:f(C.te),option:f(C.se)}}:"set_checkout_option"===a&&(p={action:"checkout_option",Cb:{step:f(C.te),option:f(C.se)}});p&&(p.Bi=f(C.za));return p},gl={},Sk=function(a,b){var c=gl[a];gl[a]=m(b);if(!c)return!1;for(var d in b)if(b.hasOwnProperty(d)&&b[d]!==c[d])return!0;for(var e in c)if(c.hasOwnProperty(e)&&c[e]!==b[e])return!0;return!1};var hl=!1;function il(){var a=L;return a.gcq=a.gcq||new jl}
var kl=function(a,b,c){il().register(a,b,c)},ll=function(a,b,c,d){il().push("event",[b,a],c,d)},ml=function(a,b){il().push("config",[a],b)},nl=function(a,b,c,d){il().push("get",[a,b],c,d)},ol={},pl=function(){this.status=1;this.containerConfig={};this.targetConfig={};this.o={};this.C=null;this.m=!1},ql=function(a,b,c,d,e){this.type=a;this.C=b;this.U=c||"";this.m=d;this.o=e},jl=function(){this.M={};this.o={};this.m=[];this.C={AW:!1,UA:!1}},rl=function(a,b){var c=ch(b);return a.M[c.containerId]=a.M[c.containerId]||
new pl},sl=function(a,b,c){if(b){var d=ch(b);if(d&&1===rl(a,b).status){rl(a,b).status=2;var e={};Ki&&(e.timeoutId=G.setTimeout(function(){E(38);wi()},3E3));a.push("require",[e],d.containerId);ol[d.containerId]=Va();if(fh()){}else{var h=
"/gtag/js?id="+encodeURIComponent(d.containerId)+"&l=dataLayer&cx=c",k=("http:"!=G.location.protocol?"https:":"http:")+("//www.googletagmanager.com"+h),l=ej(c,h)||k;ld(l)}}}},tl=function(a,b,c,d){if(d.U){var e=rl(a,d.U),f=e.C;if(f){var h=m(c),k=m(e.targetConfig[d.U]),l=m(e.containerConfig),q=m(e.o),r=m(a.o),n=df("gtm.uniqueEventId"),t=ch(d.U).prefix,p=oj(nj(pj(mj(lj(kj(jj(ij(hj(h),k),l),q),r),function(){Ni(n,t,"2");}),function(){
Ni(n,t,"3");}),function(u,v){a.C[u]=v}),function(u){return a.C[u]});try{Ni(n,t,"1");f(d.U,b,d.C,p)}catch(u){Ni(n,t,"4");}}}};aa=jl.prototype;
aa.register=function(a,b,c){var d=rl(this,a);if(3!==d.status){d.C=b;d.status=3;if(c){d.o=c}var e=ch(a),f=ol[e.containerId];if(void 0!==f){var h=L[e.containerId].bootstrap,k=e.prefix.toUpperCase();L[e.containerId]._spx&&(k=k.toLowerCase());var l=df("gtm.uniqueEventId"),q=k,r=Va()-h;if(Ki&&!Bi[l]){l!==xi&&(ti(),xi=l);var n=q+"."+Math.floor(h-f)+"."+Math.floor(r);Fi=
Fi?Fi+","+n:"&cl="+n}delete ol[e.containerId]}this.flush()}};aa.push=function(a,b,c,d){var e=Math.floor(Va()/1E3);sl(this,c,b[0][C.Ma]||this.o[C.Ma]);hl&&c&&rl(this,c).m&&(d=!1);this.m.push(new ql(a,e,c,b,d));d||this.flush()};aa.insert=function(a,b,c){var d=Math.floor(Va()/1E3);0<this.m.length?this.m.splice(1,0,new ql(a,d,c,b,!1)):this.m.push(new ql(a,d,c,b,!1))};
aa.flush=function(a){for(var b=this,c=[],d=!1;this.m.length;){var e=this.m[0];if(e.o)hl?!e.U||rl(this,e.U).m?(e.o=!1,this.m.push(e)):c.push(e):(e.o=!1,this.m.push(e));else switch(e.type){case "require":if(3!==rl(this,e.U).status&&!a){hl&&this.m.push.apply(this.m,c);return}Ki&&G.clearTimeout(e.m[0].timeoutId);break;case "set":Ka(e.m[0],function(t,p){m(eb(t,p),b.o)});break;case "config":var f=e.m[0],h=!!f[C.cc];delete f[C.cc];var k=rl(this,e.U),l=ch(e.U),q=l.containerId===l.id;h||(q?k.containerConfig=
{}:k.targetConfig[e.U]={});k.m&&h||tl(this,C.fa,f,e);k.m=!0;delete f[C.yb];q?m(f,k.containerConfig):m(f,k.targetConfig[e.U]);hl&&(d=!0);break;case "event":tl(this,e.m[1],e.m[0],e);break;case "get":var r={},n=(r[C.Ba]=e.m[0],r[C.Aa]=e.m[1],r);tl(this,C.Ja,n,e)}this.m.shift()}hl&&(this.m.push.apply(this.m,c),d&&this.flush())};aa.getRemoteConfig=function(a){return rl(this,a).o};var ul=function(a,b,c){function d(f,h){var k=f[h];return k}var e={event:b,"gtm.element":a,"gtm.elementClasses":d(a,"className"),"gtm.elementId":a["for"]||rd(a,"id")||"","gtm.elementTarget":a.formTarget||d(a,"target")||""};c&&(e["gtm.triggers"]=c.join(","));e["gtm.elementUrl"]=(a.attributes&&a.attributes.formaction?a.formAction:"")||a.action||d(a,"href")||a.src||a.code||a.codebase||
"";return e},vl=function(a){L.hasOwnProperty("autoEventsSettings")||(L.autoEventsSettings={});var b=L.autoEventsSettings;b.hasOwnProperty(a)||(b[a]={});return b[a]},wl=function(a,b,c){vl(a)[b]=c},xl=function(a,b,c,d){var e=vl(a),f=Xa(e,b,d);e[b]=c(f)},yl=function(a,b,c){var d=vl(a);return Xa(d,b,c)};var zl=!1,Al=[];function Bl(){if(!zl){zl=!0;for(var a=0;a<Al.length;a++)I(Al[a])}}var Cl=function(a){zl?I(a):Al.push(a)};var Dl="HA GF G UA AW DC".split(" "),El=!1,Fl={},Gl=!1;function Hl(a,b){var c={event:a};b&&(c.eventModel=m(b),b[C.Tc]&&(c.eventCallback=b[C.Tc]),b[C.Zb]&&(c.eventTimeout=b[C.Zb]));return c}function Il(){El=El||!L.gtagRegistered,L.gtagRegistered=!0,El&&(L.addTargetToGroup=function(a){Jl(a,"default")});return El}
var Kl=function(a){Ka(Fl,function(b,c){var d=Ea(c,a);0<=d&&c.splice(d,1)})},Jl=function(a,b){b=b.toString().split(",");for(var c=0;c<b.length;c++)Fl[b[c]]=Fl[b[c]]||[],Fl[b[c]].push(a)};
var Ll={config:function(a){var b;if(2>a.length||!g(a[1]))return;var c={};if(2<a.length){if(void 0!=a[2]&&!kb(a[2])||3<a.length)return;c=a[2]}var d=ch(a[1]);if(!d)return;Kl(d.id);Jl(d.id,c[C.Xc]||"default");delete c[C.Xc];Gl||E(43);Ye();if(Il()&&-1!==Ea(Dl,d.prefix)){"G"===d.prefix&&(c[C.yb]=!0);ml(c,d.id);return}gf("gtag.targets."+d.id,void 0);gf("gtag.targets."+d.id,m(c));var e={};e[C.La]=d.id;b=Hl(C.fa,e);return b},consent:function(a){function b(){Il()&&
m(a[2],{subcommand:a[1]})}if(3===a.length){E(39);var c=Ye(),d=a[1];"default"===d?(b(),Nd(a[2])):"update"===d&&(b(),Od(a[2],c))}},event:function(a){var b=a[1];if(!(2>a.length)&&g(b)){var c;if(2<a.length){if(!kb(a[2])&&void 0!=a[2]||3<a.length)return;c=a[2]}var d=Hl(b,c);var e;var f=c&&c[C.La];void 0===f&&(f=df(C.La,2),void 0===f&&(f="default"));if(g(f)||Da(f)){for(var h=f.toString().replace(/\s+/g,"").split(","),k=[],l=0;l<h.length;l++)0<=h[l].indexOf("-")?k.push(h[l]):
k=k.concat(Fl[h[l]]||[]);e=eh(k)}else e=void 0;var q=e;if(!q)return;var r=Il();Ye();for(var n=[],t=0;r&&t<q.length;t++){var p=q[t];if(-1!==Ea(Dl,p.prefix)){var u=m(c);"G"===p.prefix&&(u[C.yb]=!0);ll(b,u,p.id)}n.push(p.id)}d.eventModel=d.eventModel||{};0<q.length?d.eventModel[C.La]=n.join():delete d.eventModel[C.La];Gl||E(43);return d}},get:function(a){E(53);if(4!==a.length||!g(a[1])||!g(a[2])||!Aa(a[3]))return;var b=ch(a[1]),c=String(a[2]),
d=a[3];if(!b)return;Gl||E(43);if(!Il()||-1===Ea(Dl,b.prefix))return;Ye();var e={};Lh(m((e[C.Ba]=c,e[C.Aa]=d,e)));nl(c,function(f){I(function(){return d(f)})},b.id);},js:function(a){if(2==a.length&&a[1].getTime)return Gl=!0,Il(),{event:"gtm.js","gtm.start":a[1].getTime()}},policy:function(){},set:function(a){var b;2==a.length&&kb(a[1])?b=m(a[1]):3==a.length&&g(a[1])&&(b={},kb(a[2])||Da(a[2])?b[a[1]]=m(a[2]):b[a[1]]=a[2]);if(b){if(Ye(),Il()){m(b);
var c=m(b);il().push("set",[c])}b._clear=!0;return b}}},Ml={policy:!0};var Nl=function(a,b){var c=a.hide;if(c&&void 0!==c[b]&&c.end){c[b]=!1;var d=!0,e;for(e in c)if(c.hasOwnProperty(e)&&!0===c[e]){d=!1;break}d&&(c.end(),c.end=null)}},Pl=function(a){var b=Ol(),c=b&&b.hide;c&&c.end&&(c[a]=!0)};var hm=function(a){if(gm(a))return a;this.m=a};hm.prototype.rh=function(){return this.m};var gm=function(a){return!a||"object"!==hb(a)||kb(a)?!1:"getUntrustedUpdateValue"in a};hm.prototype.getUntrustedUpdateValue=hm.prototype.rh;var im=[];var lm=!1,mm=function(a){return G["dataLayer"].push(a)},nm=function(a){var b=L["dataLayer"],c=b?b.subscribers:1,d=0;return function(){++d===c&&a()}};
function om(a){var b=a._clear;Ka(a,function(d,e){"_clear"!==d&&(b&&gf(d,void 0),gf(d,e))});Te||(Te=a["gtm.start"]);var c=a["gtm.uniqueEventId"];if(!a.event)return!1;c||(c=Ye(),a["gtm.uniqueEventId"]=c,gf("gtm.uniqueEventId",c));return cj(a)}function pm(){var a=im[0];if(null==a||"object"!==typeof a)return!1;if(a.event)return!0;if(La(a)){var b=a[0];if("config"===b||"event"===b||"js"===b)return!0}return!1}
function qm(){for(var a=!1;!lm&&0<im.length;){
lm=!0;delete af.eventModel;cf();var d=im.shift();if(null!=d){var e=gm(d);if(e){var f=d;d=gm(f)?f.getUntrustedUpdateValue():void 0;for(var h=["gtm.allowlist","gtm.blocklist","gtm.whitelist","gtm.blacklist","tagTypeBlacklist"],k=0;k<h.length;k++){var l=h[k],q=df(l,1);if(Da(q)||kb(q))q=m(q);bf[l]=q}}try{if(Aa(d))try{d.call(ef)}catch(y){}else if(Da(d)){var r=d;if(g(r[0])){var n=r[0].split("."),t=n.pop(),p=r.slice(1),u=df(n.join("."),2);if(void 0!==u&&null!==u)try{u[t].apply(u,p)}catch(y){}}}else{if(La(d)){a:{var v=
d;if(v.length&&g(v[0])){var w=Ll[v[0]];if(w&&(!e||!Ml[v[0]])){d=w(v);break a}}d=void 0}if(!d){lm=!1;continue}}a=om(d)||a}}finally{e&&cf(!0)}}lm=!1}return!a}function rm(){var a=qm();try{Nl(G["dataLayer"],Le.D)}catch(b){}return a}
var tm=function(){var a=jd("dataLayer",[]),b=jd("google_tag_manager",{});b=b["dataLayer"]=b["dataLayer"]||{};Sh(function(){b.gtmDom||(b.gtmDom=!0,a.push({event:"gtm.dom"}))});Cl(function(){b.gtmLoad||(b.gtmLoad=!0,a.push({event:"gtm.load"}))});b.subscribers=(b.subscribers||0)+1;var c=a.push;a.push=function(){var e;if(0<L.SANDBOXED_JS_SEMAPHORE){e=[];for(var f=0;f<arguments.length;f++)e[f]=new hm(arguments[f])}else e=[].slice.call(arguments,0);var h=c.apply(a,e);im.push.apply(im,e);if(300<
this.length)for(E(4);300<this.length;)this.shift();var k="boolean"!==typeof h||h;return qm()&&k};var d=a.slice(0);im.push.apply(im,d);sm()&&I(rm)},sm=function(){var a=!0;return a};var um={};um.fc=new String("undefined");
var vm=function(a){this.m=function(b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]===um.fc?b:a[d]);return c.join("")}};vm.prototype.toString=function(){return this.m("undefined")};vm.prototype.valueOf=vm.prototype.toString;um.Cg=vm;um.jd={};um.dh=function(a){return new vm(a)};var wm={};um.Xh=function(a,b){var c=Ye();wm[c]=[a,b];return c};um.bf=function(a){var b=a?0:1;return function(c){var d=wm[c];if(d&&"function"===typeof d[b])d[b]();wm[c]=void 0}};um.zh=function(a){for(var b=!1,c=!1,d=2;d<a.length;d++)b=
b||8===a[d],c=c||16===a[d];return b&&c};um.Qh=function(a){if(a===um.fc)return a;var b=Ye();um.jd[b]=a;return'google_tag_manager["'+Le.D+'"].macro('+b+")"};um.Jh=function(a,b,c){a instanceof um.Cg&&(a=a.m(um.Xh(b,c)),b=za);return{vd:a,K:b}};var xm=["input","select","textarea"],ym=["button","hidden","image","reset","submit"],zm=function(a){var b=a.tagName.toLowerCase();return!Fa(xm,function(c){return c===b})||"input"===b&&Fa(ym,function(c){return c===a.type.toLowerCase()})?!1:!0},Am=function(a){return a.form?a.form.tagName?a.form:H.getElementById(a.form):ud(a,["form"],100)},Bm=function(a,b,c){if(!a.elements)return 0;for(var d=b.getAttribute(c),e=0,f=1;e<a.elements.length;e++){var h=a.elements[e];if(zm(h)){if(h.getAttribute(c)===d)return f;
f++}}return 0};var Cm=!!G.MutationObserver,Dm=void 0,Em=function(a){if(!Dm){var b=function(){var c=H.body;if(c)if(Cm)(new MutationObserver(function(){for(var e=0;e<Dm.length;e++)I(Dm[e])})).observe(c,{childList:!0,subtree:!0});else{var d=!1;pd(c,"DOMNodeInserted",function(){d||(d=!0,I(function(){d=!1;for(var e=0;e<Dm.length;e++)I(Dm[e])}))})}};Dm=[];H.body?b():I(b)}Dm.push(a)};var Qm=G.clearTimeout,Rm=G.setTimeout,N=function(a,b,c){if(fh()){b&&I(b)}else return ld(a,b,c)},Sm=function(){return new Date},Tm=function(){return G.location.href},Um=function(a){return me(oe(a),"fragment")},Vm=function(a){return ne(oe(a))},Wm=function(a,b){return df(a,b||2)},Xm=function(a,b,c){var d;b?(a.eventCallback=b,c&&(a.eventTimeout=c),d=mm(a)):d=mm(a);return d},Ym=function(a,b){G[a]=b},U=function(a,b,c){b&&
(void 0===G[a]||c&&!G[a])&&(G[a]=b);return G[a]},Zm=function(a,b,c){return uf(a,b,void 0===c?!0:!!c)},$m=function(a,b,c){return 0===Df(a,b,c)},an=function(a,b){if(fh()){b&&I(b)}else nd(a,b)},bn=function(a){return!!yl(a,"init",!1)},cn=function(a){wl(a,"init",!0)},dn=function(a,b){var c=(void 0===b?0:b)?"www.googletagmanager.com/gtag/js":Re;c+="?id="+encodeURIComponent(a)+"&l=dataLayer";N(hh("https://","http://",c))},en=function(a,
b){var c=a[b];return c},fn=function(a,b,c){Ki&&(lb(a)||Oi(c,b,a))};
var gn=um.Jh;function En(a,b){a=String(a);b=String(b);var c=a.length-b.length;return 0<=c&&a.indexOf(b,c)==c}var Fn=new Ia;function Gn(a,b){function c(h){var k=oe(h),l=me(k,"protocol"),q=me(k,"host",!0),r=me(k,"port"),n=me(k,"path").toLowerCase().replace(/\/$/,"");if(void 0===l||"http"==l&&"80"==r||"https"==l&&"443"==r)l="web",r="default";return[l,q,r,n]}for(var d=c(String(a)),e=c(String(b)),f=0;f<d.length;f++)if(d[f]!==e[f])return!1;return!0}
function Hn(a){return In(a)?1:0}
function In(a){var b=a.arg0,c=a.arg1;if(a.any_of&&Da(c)){for(var d=0;d<c.length;d++){var e=m(a,{});m({arg1:c[d],any_of:void 0},e);if(Hn(e))return!0}return!1}switch(a["function"]){case "_cn":return 0<=String(b).indexOf(String(c));case "_css":var f;a:{if(b){var h=["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"];try{for(var k=0;k<h.length;k++)if(b[h[k]]){f=b[h[k]](c);break a}}catch(p){}}f=!1}return f;case "_ew":return En(b,c);case "_eq":return String(b)==
String(c);case "_ge":return Number(b)>=Number(c);case "_gt":return Number(b)>Number(c);case "_lc":var l;l=String(b).split(",");return 0<=Ea(l,String(c));case "_le":return Number(b)<=Number(c);case "_lt":return Number(b)<Number(c);case "_re":var q;var r=a.ignore_case?"i":void 0;try{var n=String(c)+r,t=Fn.get(n);t||(t=new RegExp(c,r),Fn.set(n,t));q=t.test(b)}catch(p){q=!1}return q;case "_sw":return 0==String(b).indexOf(String(c));case "_um":return Gn(b,c)}return!1};var Jn=encodeURI,Y=encodeURIComponent,Kn=od;var Ln=function(a,b){if(!a)return!1;var c=me(oe(a),"host");if(!c)return!1;for(var d=0;b&&d<b.length;d++){var e=b[d]&&b[d].toLowerCase();if(e){var f=c.length-e.length;0<f&&"."!=e.charAt(0)&&(f--,e="."+e);if(0<=f&&c.indexOf(e,f)==f)return!0}}return!1};
var Mn=function(a,b,c){for(var d={},e=!1,f=0;a&&f<a.length;f++)a[f]&&a[f].hasOwnProperty(b)&&a[f].hasOwnProperty(c)&&(d[a[f][b]]=a[f][c],e=!0);return e?d:null};var zo=null,Ao=[],Bo=0,Co=null;function Do(a){if(!G.MutationObserver)return!1;try{return zo||(zo=new MutationObserver(Eo),zo.observe(H.documentElement,{subtree:!0,childList:!0,attributes:!0,characterData:!0}),Bo=Va()),Ao.push(a),!0}catch(b){return!1}}function Eo(){var a=Va()-Bo;0<=a?(Co&&(G.clearTimeout(Co),Co=null),Fo()):Co||(Co=G.setTimeout(function(){Fo();Co=null},0-a))}
function Fo(){Bo=Va();var a=Ao;Ao=[];for(var b=da(a),c=b.next();!c.done;c=b.next()){var d=c.value;d()}zo&&(zo.takeRecords(),Ao.length||(zo&&(zo.disconnect(),zo=null),Co&&(G.clearTimeout(Co),Co=null)))};function rp(){return G.gaGlobal=G.gaGlobal||{}}var sp=function(){var a=rp();a.hid=a.hid||Ga();return a.hid},tp=function(a,b){var c=rp();if(void 0==c.vid||b&&!c.from_cookie)c.vid=a,c.from_cookie=b};var aq=window,bq=document,cq=function(a){var b=aq._gaUserPrefs;if(b&&b.ioo&&b.ioo()||a&&!0===aq["ga-disable-"+a])return!0;try{var c=aq.external;if(c&&c._gaUserPrefs&&"oo"==c._gaUserPrefs)return!0}catch(f){}for(var d=sf("AMP_TOKEN",String(bq.cookie),!0),e=0;e<d.length;e++)if("$OPT_OUT"==d[e])return!0;return bq.getElementById("__gaOptOutExtension")?!0:!1};var dq={};function fq(a){delete a.eventModel[C.yb];hq(a.eventModel)}
var hq=function(a){Ka(a,function(c){"_"===c.charAt(0)&&delete a[c]});var b=a[C.oa]||{};Ka(b,function(c){"_"===c.charAt(0)&&delete b[c]})};var kq=function(a,b,c){ll(b,c,a)},lq=function(a,b,c){ll(b,c,a,!0)},sq=function(a,b){};
function mq(a,b){}var Z={g:{}};

Z.g.jsm=["customScripts"],function(){(function(a){Z.__jsm=a;Z.__jsm.h="jsm";Z.__jsm.i=!0;Z.__jsm.priorityOverride=0})(function(a){if(void 0!==a.vtp_javascript){var b=a.vtp_javascript;try{var c=U("google_tag_manager");var d=c&&c.e&&c.e(b);fn(d,"jsm",a.vtp_gtmEventId);return d}catch(e){}}})}();

Z.g.sp=["google"],function(){(function(a){Z.__sp=a;Z.__sp.h="sp";Z.__sp.i=!0;Z.__sp.priorityOverride=0})(function(a){var b=-1==navigator.userAgent.toLowerCase().indexOf("firefox")?"//www.googleadservices.com/pagead/conversion_async.js":"https://www.google.com/pagead/conversion_async.js",c=a.vtp_gtmOnFailure,d=function(){var f=U("google_trackConversion");if(Aa(f)){var h={};"DATA_LAYER"==a.vtp_customParamsFormat?h=a.vtp_dataLayerVariable:"USER_SPECIFIED"==a.vtp_customParamsFormat&&(h=Mn(a.vtp_customParams,
"key","value"));var k={google_conversion_id:a.vtp_conversionId,google_conversion_label:a.vtp_conversionLabel,google_custom_params:h,google_remarketing_only:!0,onload_callback:a.vtp_gtmOnSuccess,google_gtm:uj()};a.vtp_enableDynamicRemarketing&&(a.vtp_eventName&&(h.event=a.vtp_eventName),a.vtp_eventValue&&(k.google_conversion_value=a.vtp_eventValue),a.vtp_eventItems&&(k.google_gtag_event_data={items:a.vtp_eventItems}));a.vtp_rdp&&(k.google_restricted_data_processing=!0);a.vtp_userId&&(k.google_user_id=
a.vtp_userId);var l=Xj();(k.google_additional_params=k.google_additional_params||{}).gdpr_consent=l;f(k)||c()}else c()},e=function(){N(b,d,c)};Id()?Rd(function(){Pd(C.B)?e():Ld(e,C.B)},[C.B]):(ai(),e())})}();Z.g.gtagha=["google"],function(){(function(a){Z.__gtagha=a;Z.__gtagha.h="gtagha";Z.__gtagha.i=!0;Z.__gtagha.priorityOverride=0})(function(a){I(a.vtp_gtmOnSuccess)})}();

Z.g.e=["google"],function(){(function(a){Z.__e=a;Z.__e.h="e";Z.__e.i=!0;Z.__e.priorityOverride=0})(function(a){return String(jf(a.vtp_gtmEventId,"event"))})}();
Z.g.f=["google"],function(){(function(a){Z.__f=a;Z.__f.h="f";Z.__f.i=!0;Z.__f.priorityOverride=0})(function(a){var b=Wm("gtm.referrer",1)||H.referrer;return b?a.vtp_component&&"URL"!=a.vtp_component?me(oe(String(b)),a.vtp_component,a.vtp_stripWww,a.vtp_defaultPages,a.vtp_queryKey):Vm(String(b)):String(b)})}();
Z.g.j=["google"],function(){(function(a){Z.__j=a;Z.__j.h="j";Z.__j.i=!0;Z.__j.priorityOverride=0})(function(a){for(var b=String(a.vtp_name).split("."),c=U(b.shift()),d=0;d<b.length;d++)c=c&&c[b[d]];fn(c,"j",a.vtp_gtmEventId);return c})}();

Z.g.u=["google"],function(){var a=function(b){return{toString:function(){return b}}};(function(b){Z.__u=b;Z.__u.h="u";Z.__u.i=!0;Z.__u.priorityOverride=0})(function(b){var c;c=(c=b.vtp_customUrlSource?b.vtp_customUrlSource:Wm("gtm.url",1))||Tm();var d=b[a("vtp_component")];if(!d||"URL"==d)return Vm(String(c));var e=oe(String(c)),f;if("QUERY"===d)a:{var h=b[a("vtp_multiQueryKeys").toString()],k=b[a("vtp_queryKey").toString()]||"",l=b[a("vtp_ignoreEmptyQueryParam").toString()],q;h?Da(k)?q=k:q=String(k).replace(/\s+/g,
"").split(","):q=[String(k)];for(var r=0;r<q.length;r++){var n=me(e,"QUERY",void 0,void 0,q[r]);if(void 0!=n&&(!l||""!==n)){f=n;break a}}f=void 0}else f=me(e,d,"HOST"==d?b[a("vtp_stripWww")]:void 0,"PATH"==d?b[a("vtp_defaultPages")]:void 0,void 0);return f})}();
Z.g.v=["google"],function(){(function(a){Z.__v=a;Z.__v.h="v";Z.__v.i=!0;Z.__v.priorityOverride=0})(function(a){var b=a.vtp_name;if(!b||!b.replace)return!1;var c=Wm(b.replace(/\\\./g,"."),a.vtp_dataLayerVersion||1),d=void 0!==c?c:a.vtp_defaultValue;fn(d,"v",a.vtp_gtmEventId);return d})}();
Z.g.ua=["google"],function(){function a(n){return Pd(n)}function b(n,t){if(Id()&&!e[n]){var p=function(){var u=fi(),v="gtm"+Ye(),w=q(t),y={name:v};l(w,y,!0);u("create",n,y);u(function(){u.remove(v)})};Ld(p,C.I);Ld(p,C.B);e[n]=!0}}var c,d={},e={},f={name:!0,clientId:!0,sampleRate:!0,siteSpeedSampleRate:!0,alwaysSendReferrer:!0,allowAnchor:!0,allowLinker:!0,cookieName:!0,cookieDomain:!0,cookieExpires:!0,cookiePath:!0,cookieUpdate:!0,cookieFlags:!0,legacyCookieDomain:!0,legacyHistoryImport:!0,storage:!0,
useAmpClientId:!0,storeGac:!0,_cd2l:!0,_useUp:!0,_cs:!0},h={allowAnchor:!0,allowLinker:!0,alwaysSendReferrer:!0,anonymizeIp:!0,cookieUpdate:!0,exFatal:!0,forceSSL:!0,javaEnabled:!0,legacyHistoryImport:!0,nonInteraction:!0,useAmpClientId:!0,useBeacon:!0,storeGac:!0,allowAdFeatures:!0,allowAdPersonalizationSignals:!0,_cd2l:!0},k={urlPassthrough:!0},l=function(n,t,p){var u=0;if(n)for(var v in n)if(!k[v]&&n.hasOwnProperty(v)&&(p&&f[v]||!p&&void 0===f[v])){var w=h[v]?Sa(n[v]):n[v];"anonymizeIp"!=v||w||
(w=void 0);t[v]=w;u++}return u},q=function(n){var t={};n.vtp_gaSettings&&m(Mn(n.vtp_gaSettings.vtp_fieldsToSet,"fieldName","value"),t);m(Mn(n.vtp_fieldsToSet,"fieldName","value"),t);Pd(C.I)||(t.storage="none");Pd(C.B)||(t.allowAdFeatures=!1,t.storeGac=!1);Mk()||(t.allowAdFeatures=!1);Lk()||(t.allowAdPersonalizationSignals=!1);n.vtp_transportUrl&&(t._x_19=n.vtp_transportUrl);
return t},r=function(n){function t(ma,R){void 0!==R&&F("set",ma,R)}var p={},u={},v={},w={};if(n.vtp_gaSettings){var y=n.vtp_gaSettings;m(Mn(y.vtp_contentGroup,"index","group"),u);m(Mn(y.vtp_dimension,"index","dimension"),v);m(Mn(y.vtp_metric,"index","metric"),w);var x=m(y);x.vtp_fieldsToSet=void 0;x.vtp_contentGroup=void 0;x.vtp_dimension=
void 0;x.vtp_metric=void 0;n=m(n,x)}m(Mn(n.vtp_contentGroup,"index","group"),u);m(Mn(n.vtp_dimension,"index","dimension"),v);m(Mn(n.vtp_metric,"index","metric"),w);var z=q(n),A=hi(n.vtp_functionName);if(Aa(A)){var B="",D="";n.vtp_setTrackerName&&"string"==typeof n.vtp_trackerName?""!==n.vtp_trackerName&&(D=n.vtp_trackerName,B=D+"."):(D="gtm"+Ye(),B=D+".");var F=function(ma){var R=[].slice.call(arguments,0);R[0]=B+R[0];A.apply(window,R)},K=function(ma,R){return void 0===R?R:ma(R)},P=function(ma,R){if(R)for(var Oa in R)R.hasOwnProperty(Oa)&&
F("set",ma+Oa,R[Oa])},T=function(){var ma={transaction_id:"id",affiliation:"affiliation",value:"revenue",tax:"tax",shipping:"shipping",coupon:"coupon",item_list_name:"list"},R={},Oa=(R[C.Oc]="click",R[C.ya]="detail",R[C.Va]="add",R[C.Wa]="remove",R[C.Ia]="checkout",R[C.ma]="purchase",R[C.Xa]="refund",R),Yb={item_id:"id",item_name:"name",item_list_name:"list",item_brand:"brand",item_category:"category",item_variant:"variant",index:"position",
promotion_id:"id",promotion_name:"name",creative_name:"creative",creative_slot:"position"},lc=function(Ra,Ha){for(var ab in Ra)ma.hasOwnProperty(ab)&&(Ra[Ha]=Ra[Ha]||{},Ra[Ha].actionField=Ra[Ha].actionField||{},Ra[Ha].actionField[ma[ab]]=Ra[ab])},Za=function(Ra){for(var Ha=[],ab={},jb=0;jb<Ra.length;ab={mb:ab.mb},jb++)ab.mb={},Ka(Ra[jb],function(Eb){return function(oc,Mc){Yb.hasOwnProperty(oc)?Eb.mb[Yb[oc]]=Mc:Eb.mb[oc]=Mc}}(ab)),Ha.push(ab.mb);return Ha},$a=function(Ra,Ha,ab){if(!kb(Ha))return!1;
for(var jb=Xa(Object(Ha),ab,[]),Eb=0;jb&&Eb<jb.length;Eb++)F(Ra,jb[Eb]);return!!jb&&0<jb.length},S;if(n.vtp_useEcommerceDataLayer){var Pa=!1;n.vtp_useGA4SchemaForEcommerce&&(S=jf(n.vtp_gtmEventId,"eventModel"),Pa=!!S);Pa||(S=Wm("ecommerce",1))}else n.vtp_ecommerceMacroData&&(S=n.vtp_ecommerceMacroData.ecommerce,!S&&n.vtp_useGA4SchemaForEcommerce&&
(S=n.vtp_ecommerceMacroData));if(!kb(S))return;S=Object(S);if(n.vtp_useGA4SchemaForEcommerce){S=m(S);S.currencyCode=S.currencyCode||S.currency;var Qa=String(jf(n.vtp_gtmEventId,"event"));if("view_item_list"===Qa&&!S.impressions&&S.items)S.impressions=Za(S.items);else if("view_promotion"===Qa&&!S.promoView&&S.items)S.promoView={},S.promoView.promotions=Za(S.items);else if("select_promotion"===Qa&&!S.promoClick)S.items&&(S.promoClick={},S.promoClick.promotions=Za(S.items)),lc(S,"promoClick");else if(Oa.hasOwnProperty(Qa)){var Kc=
Oa[Qa];S[Kc]||(S.items&&(S[Kc]={},S[Kc].products=Za(S.items)),lc(S,Kc))}}var Xd=Xa(z,"currencyCode",S.currencyCode);void 0!==Xd&&F("set","&cu",Xd);$a("ec:addImpression",S,"impressions");if($a("ec:addPromo",S[S.promoClick?"promoClick":"promoView"],"promotions")&&S.promoClick){F("ec:setAction","promo_click",S.promoClick.actionField);return}for(var mc="detail checkout checkout_option click add remove purchase refund".split(" "),Yd="refund purchase remove checkout checkout_option add click detail".split(" "),
nc=0;nc<mc.length;nc++){var ed=S[mc[nc]];if(ed){$a("ec:addProduct",ed,"products");F("ec:setAction",mc[nc],ed.actionField);if(Ki)for(var Lc=0;Lc<Yd.length;Lc++){var Zd=S[Yd[Lc]];if(Zd){Zd!==ed&&E(13);break}}break}}},V={name:D};l(z,V,!0);var ia=n.vtp_trackingId||p.trackingId;A("create",ia,V);F("set","&gtm",uj(!0));
Id()&&(F("set","&gcs",Qd()),b(ia,n));z._x_19&&(null==id&&delete z._x_19,z._x_20&&!d[D]&&(d[D]=!0,A(mi(D,String(z._x_20)))));n.vtp_enableRecaptcha&&F("require","recaptcha","recaptcha.js");(function(ma,R){void 0!==n[R]&&F("set",ma,n[R])})("nonInteraction","vtp_nonInteraction");P("contentGroup",u);P("dimension",v);P("metric",w);var O={};l(z,O,!1)&&F("set",O);var J;
n.vtp_enableLinkId&&F("require","linkid","linkid.js");F("set","hitCallback",function(){var ma=z&&z.hitCallback;Aa(ma)&&ma();n.vtp_gtmOnSuccess()});if("TRACK_EVENT"==n.vtp_trackType){n.vtp_enableEcommerce&&(F("require","ec","ec.js"),T());var M={hitType:"event",eventCategory:String(n.vtp_eventCategory||p.category),eventAction:String(n.vtp_eventAction||p.action),eventLabel:K(String,n.vtp_eventLabel||p.label),eventValue:K(Na,n.vtp_eventValue||
p.value)};l(J,M,!1);F("send",M);}else if("TRACK_SOCIAL"==n.vtp_trackType){}else if("TRACK_TRANSACTION"==n.vtp_trackType){}else if("TRACK_TIMING"==
n.vtp_trackType){}else if("DECORATE_LINK"==n.vtp_trackType){}else if("DECORATE_FORM"==n.vtp_trackType){}else if("TRACK_DATA"==n.vtp_trackType){}else{n.vtp_enableEcommerce&&(F("require","ec","ec.js"),T());if(n.vtp_doubleClick||"DISPLAY_FEATURES"==n.vtp_advertisingFeaturesType){var zb=
"_dc_gtm_"+String(n.vtp_trackingId).replace(/[^A-Za-z0-9-]/g,"");F("require","displayfeatures",void 0,{cookieName:zb})}if("DISPLAY_FEATURES_WITH_REMARKETING_LISTS"==n.vtp_advertisingFeaturesType){var Qb="_dc_gtm_"+String(n.vtp_trackingId).replace(/[^A-Za-z0-9-]/g,"");F("require","adfeatures",{cookieName:Qb})}J?F("send","pageview",J):F("send","pageview");Sa(z.urlPassthrough)&&ji(B)}if(!c){var Wa=n.vtp_useDebugVersion?"u/analytics_debug.js":"analytics.js";n.vtp_useInternalVersion&&!n.vtp_useDebugVersion&&(Wa="internal/"+Wa);c=!0;var Ma=ej(z._x_19,"/analytics.js"),Rb=hh("https:","http:","//www.google-analytics.com/"+Wa,z&&!!z.forceSSL);N("analytics.js"===Wa&&Ma?Ma:Rb,function(){var ma=fi();ma&&ma.loaded||n.vtp_gtmOnFailure();},
n.vtp_gtmOnFailure)}}else I(n.vtp_gtmOnFailure)};(function(n){Z.__ua=n;Z.__ua.h="ua";Z.__ua.i=!0;Z.__ua.priorityOverride=0})(function(n){Rd(function(){r(n)},[C.I,C.B])})}();






Z.g.gclidw=["google"],function(){var a=["aw","dc","gf","ha","gp"],b=!1;(function(c){Z.__gclidw=c;Z.__gclidw.h="gclidw";Z.__gclidw.i=!0;Z.__gclidw.priorityOverride=100})(function(c){I(c.vtp_gtmOnSuccess);var d,e,f,h;c.vtp_enableCookieOverrides&&(f=c.vtp_cookiePrefix,d=c.vtp_path,e=c.vtp_domain,c.vtp_enableCookieFlagsFeature&&(h=c.vtp_cookieFlags));var k=null;c.vtp_enableCookieUpdateFeature&&(k=
!0,void 0!==c.vtp_cookieUpdate&&(k=!!c.vtp_cookieUpdate));var l={prefix:f,path:d,domain:e,flags:h};c.vtp_enableCrossDomainFeature&&(c.vtp_enableCrossDomain&&!1===c.vtp_acceptIncoming||(c.vtp_enableCrossDomain||ug())&&Ng(a,l));Kg(l);Pg(["aw","dc"],l);b?Zg(k,l):$g(k,l);var q=f;if(c.vtp_enableCrossDomainFeature&&c.vtp_enableCrossDomain&&c.vtp_linkerDomains){var r=c.vtp_linkerDomains.toString().replace(/\s+/g,"").split(",");Og(a,r,c.vtp_urlPosition,!!c.vtp_formDecoration,q)}var n=Wm(C.O);bk(!1,void 0!=
n&&!1!==n,void 0,l,!0);c.vtp_enableUrlPassthroughFeature&&c.vtp_enableUrlPassthrough&&Rg()});}();


Z.g.aev=["google"],function(){function a(p,u){var v=jf(p,"gtm");if(v)return v[u]}function b(p,u,v,w){w||(w="element");var y=p+"."+u,x;if(r.hasOwnProperty(y))x=r[y];else{var z=a(p,w);if(z&&(x=v(z),r[y]=x,n.push(y),35<n.length)){var A=n.shift();delete r[A]}}return x}function c(p,u,v){var w=a(p,t[u]);return void 0!==w?w:v}function d(p,u){if(!p)return!1;var v=e(Tm());Da(u)||(u=String(u||"").replace(/\s+/g,"").split(","));for(var w=[v],y=0;y<u.length;y++){var x=u[y];if(x.hasOwnProperty("is_regex"))if(x.is_regex)try{x=
new RegExp(x.domain)}catch(A){continue}else x=x.domain;if(x instanceof RegExp){if(x.test(p))return!1}else{var z=x;if(0!=z.length){if(0<=e(p).indexOf(z))return!1;w.push(e(z))}}}return!Ln(p,w)}function e(p){q.test(p)||(p="http://"+p);return me(oe(p),"HOST",!0)}function f(p,u,v){switch(p){case "SUBMIT_TEXT":return b(u,"FORM."+p,h,"formSubmitElement")||v;case "LENGTH":var w=b(u,"FORM."+p,k);return void 0===w?v:w;case "INTERACTED_FIELD_ID":return l(u,"id",v);case "INTERACTED_FIELD_NAME":return l(u,"name",
v);case "INTERACTED_FIELD_TYPE":return l(u,"type",v);case "INTERACTED_FIELD_POSITION":var y=a(u,"interactedFormFieldPosition");return void 0===y?v:y;case "INTERACT_SEQUENCE_NUMBER":var x=a(u,"interactSequenceNumber");return void 0===x?v:x;default:return v}}function h(p){switch(p.tagName.toLowerCase()){case "input":return rd(p,"value");case "button":return sd(p);default:return null}}function k(p){if("form"===p.tagName.toLowerCase()&&p.elements){for(var u=0,v=0;v<p.elements.length;v++)zm(p.elements[v])&&
u++;return u}}function l(p,u,v){var w=a(p,"interactedFormField");return w&&rd(w,u)||v}var q=/^https?:\/\//i,r={},n=[],t={ATTRIBUTE:"elementAttribute",CLASSES:"elementClasses",ELEMENT:"element",ID:"elementId",HISTORY_CHANGE_SOURCE:"historyChangeSource",HISTORY_NEW_STATE:"newHistoryState",HISTORY_NEW_URL_FRAGMENT:"newUrlFragment",HISTORY_OLD_STATE:"oldHistoryState",HISTORY_OLD_URL_FRAGMENT:"oldUrlFragment",TARGET:"elementTarget"};(function(p){Z.__aev=p;Z.__aev.h="aev";Z.__aev.i=!0;Z.__aev.priorityOverride=
0})(function(p){var u=p.vtp_gtmEventId,v=p.vtp_defaultValue,w=p.vtp_varType;switch(w){case "TAG_NAME":var y=a(u,"element");return y&&y.tagName||v;case "TEXT":return b(u,w,sd)||v;case "URL":var x;a:{var z=String(a(u,"elementUrl")||v||""),A=oe(z),B=String(p.vtp_component||"URL");switch(B){case "URL":x=z;break a;case "IS_OUTBOUND":x=d(z,p.vtp_affiliatedDomains);break a;default:x=me(A,B,p.vtp_stripWww,p.vtp_defaultPages,p.vtp_queryKey)}}return x;case "ATTRIBUTE":var D;if(void 0===p.vtp_attribute)D=c(u,
w,v);else{var F=p.vtp_attribute,K=a(u,"element");D=K&&rd(K,F)||v||""}return D;case "MD":var P=p.vtp_mdValue,T=b(u,"MD",Lm);return P&&T?Om(T,P)||v:T||v;case "FORM":return f(String(p.vtp_component||"SUBMIT_TEXT"),u,v);default:var V=c(u,w,v);fn(V,"aev",p.vtp_gtmEventId);return V}})}();Z.g.gas=["google"],function(){(function(a){Z.__gas=a;Z.__gas.h="gas";Z.__gas.i=!0;Z.__gas.priorityOverride=0})(function(a){var b=m(a),c=b;c[$b.Na]=null;c[$b.ug]=null;var d=b=c;d.vtp_fieldsToSet=d.vtp_fieldsToSet||[];var e=d.vtp_cookieDomain;void 0!==e&&(d.vtp_fieldsToSet.push({fieldName:"cookieDomain",value:e}),delete d.vtp_cookieDomain);return b})}();
Z.g.awct=["google"],function(){var a=!1,b=[],c=function(h){var k=U("google_trackConversion"),l=h.gtm_onFailure;"function"==typeof k?k(h)||l():l()},d=function(){for(;0<b.length;)c(b.shift())},e=function(){return function(){d();a=!1}},f=function(){return function(){d();b={push:c};}};(function(h){Z.__awct=h;Z.__awct.h="awct";Z.__awct.i=!0;Z.__awct.priorityOverride=
0})(function(h){function k(y,x,z){return"DATA_LAYER"===y?Wm(z):h[x]}function l(){u("gdpr_consent",Xj());}function q(){var y=[];return y}function r(y){var x=!0,z=[];if(y){z=q();}x&&b.push(n)}ai();var n={google_basket_transaction_type:"purchase",google_conversion_domain:"",google_conversion_id:h.vtp_conversionId,
google_conversion_label:h.vtp_conversionLabel,google_conversion_value:h.vtp_conversionValue||0,google_remarketing_only:!1,onload_callback:h.vtp_gtmOnSuccess,gtm_onFailure:h.vtp_gtmOnFailure,google_gtm:uj()};n.google_gtm_experiments={capi:!0};h.vtp_rdp&&(n.google_restricted_data_processing=!0);void 0!=Wm(C.O)&&!1!==Wm(C.O)&&(n.google_gtm_url_processor=function(y){return y=vh(y)});var t=function(y){return function(x,
z,A){var B=k(y,z,A);B&&(n[x]=B)}},p=t("JSON");p("google_conversion_currency","vtp_currencyCode");p("google_conversion_order_id","vtp_orderId");h.vtp_enableProductReporting&&(p=t(h.vtp_productReportingDataSource),p("google_conversion_merchant_id","vtp_awMerchantId","aw_merchant_id"),p("google_basket_feed_country","vtp_awFeedCountry","aw_feed_country"),p("google_basket_feed_language","vtp_awFeedLanguage","aw_feed_language"),p("google_basket_discount","vtp_discount","discount"),p("google_conversion_items",
"vtp_items","items"),n.google_conversion_items&&n.google_conversion_items.map&&(n.google_conversion_items=n.google_conversion_items.map(function(y){return{value:y.price,quantity:y.quantity,item_id:y.id}})));var u=function(y,x){void 0!==x&&((n.google_additional_conversion_params=n.google_additional_conversion_params||{})[y]=x)},v=function(y){return function(x,z,A,B){var D=k(y,z,A);B(D)&&u(x,D)}};(function(){if(!h.vtp_enableShippingData)return;u("delopc",
h.vtp_deliveryPostalCode);u("oedeld",h.vtp_estimatedDeliveryDate);u("delc",h.vtp_deliveryCountry);u("shf",h.vtp_shippingFee);if(h.vtp_enableProductReporting){var y=k(h.vtp_productReportingDataSource,"vtp_items","items");u("iedeld",xh(y))}})();h.vtp_transportUrl&&(n.google_transport_url=h.vtp_transportUrl);var w=ej(h.vtp_transportUrl,"/pagead/conversion_async.js");w||(w=-1==navigator.userAgent.toLowerCase().indexOf("firefox")?"//www.googleadservices.com/pagead/conversion_async.js":
"https://www.google.com/pagead/conversion_async.js");h.vtp_enableNewCustomerReporting&&(p=v(h.vtp_newCustomerReportingDataSource),p("vdnc","vtp_awNewCustomer","new_customer",function(y){return void 0!=y&&""!==y}),p("vdltv","vtp_awCustomerLTV","customer_lifetime_value",function(y){return void 0!=y&&""!==y}));!h.hasOwnProperty("vtp_enableConversionLinker")||h.vtp_enableConversionLinker?(h.vtp_conversionCookiePrefix&&(n.google_gcl_cookie_prefix=h.vtp_conversionCookiePrefix),n.google_read_gcl_cookie_opt_out=
!1):n.google_read_gcl_cookie_opt_out=!0;"1"===ng(!1)._up&&u("gtm_up","1");l();(function(){Id()?Rd(function(){l();var y=Pd(C.B),x=!y&&void 0!=Wm(C.O)&&!1!==Wm(C.O);!h.vtp_transportUrl&&x&&(n.google_transport_url="https://pagead2.googlesyndication.com/");u("gcs",Qd());r(y);y||Ld(function(){l();n=m(n);!h.vtp_transportUrl&&n.google_transport_url&&delete n.google_transport_url;u("gcs",Qd());u("gcu","1");r(!0)},C.B)},[C.B]):r(!0)})();a||(a=!0,N(w,f(),e(w)))})}();
Z.g.gtagaw=["google"],function(){(function(a){Z.__gtagaw=a;Z.__gtagaw.h="gtagaw";Z.__gtagaw.i=!0;Z.__gtagaw.priorityOverride=0})(function(a){var b="AW-"+String(a.vtp_conversionId);ll(String(a.vtp_eventName),a.vtp_eventData||{},a.vtp_conversionLabel?b+"/"+String(a.vtp_conversionLabel):b);I(a.vtp_gtmOnSuccess)})}();
Z.g.remm=["google"],function(){(function(a){Z.__remm=a;Z.__remm.h="remm";Z.__remm.i=!0;Z.__remm.priorityOverride=0})(function(a){for(var b=a.vtp_input,c=a.vtp_map||[],d=a.vtp_fullMatch,e=a.vtp_ignoreCase?"gi":"g",f=a.vtp_defaultValue,h=0;h<c.length;h++){var k=c[h].key||"";d&&(k="^"+k+"$");var l=new RegExp(k,e);if(l.test(b)){var q=c[h].value;a.vtp_replaceAfterMatch&&(q=String(b).replace(l,q));f=q;break}}fn(f,"remm",a.vtp_gtmEventId);return f})}();


Z.g.get=["google"],function(){(function(a){Z.__get=a;Z.__get.h="get";Z.__get.i=!0;Z.__get.priorityOverride=0})(function(a){var b=a.vtp_settings;(a.vtp_deferrable?lq:kq)(String(b.streamId),String(a.vtp_eventName),b.eventParameters||{});a.vtp_gtmOnSuccess()})}();


Z.g.gtagfl=[],function(){(function(a){Z.__gtagfl=a;Z.__gtagfl.h="gtagfl";Z.__gtagfl.i=!0;Z.__gtagfl.priorityOverride=0})(function(a){I(a.vtp_gtmOnSuccess)})}();
Z.g.html=["customScripts"],function(){function a(d,e,f,h){return function(){try{if(0<e.length){var k=e.shift(),l=a(d,e,f,h);if("SCRIPT"==String(k.nodeName).toUpperCase()&&"text/gtmscript"==k.type){var q=H.createElement("script");q.async=!1;q.type="text/javascript";q.id=k.id;q.text=k.text||k.textContent||k.innerHTML||"";k.charset&&(q.charset=k.charset);var r=k.getAttribute("data-gtmsrc");r&&(q.src=r,kd(q,l));d.insertBefore(q,null);r||l()}else if(k.innerHTML&&0<=k.innerHTML.toLowerCase().indexOf("<script")){for(var n=
[];k.firstChild;)n.push(k.removeChild(k.firstChild));d.insertBefore(k,null);a(k,n,l,h)()}else d.insertBefore(k,null),l()}else f()}catch(t){I(h)}}}var c=function(d){if(H.body){var e=d.vtp_gtmOnFailure,f=gn(d.vtp_html,d.vtp_gtmOnSuccess,
e),h=f.vd,k=f.K;if(d.vtp_useIframe){}else d.vtp_supportDocumentWrite?b(h,k,e):a(H.body,td(h),k,e)()}else Rm(function(){c(d)},200)};Z.__html=c;Z.__html.h="html";Z.__html.i=
!0;Z.__html.priorityOverride=0}();

Z.g.gtaggf=["google"],function(){(function(a){Z.__gtaggf=a;Z.__gtaggf.h="gtaggf";Z.__gtaggf.i=!0;Z.__gtaggf.priorityOverride=0})(function(a){I(a.vtp_gtmOnSuccess)})}();



Z.g.gtagua=["google"],function(){(function(a){Z.__gtagua=a;Z.__gtagua.h="gtagua";Z.__gtagua.i=!0;Z.__gtagua.priorityOverride=0})(function(a){I(a.vtp_gtmOnSuccess)})}();
Z.g.lcl=[],function(){function a(){var c=U("document"),d=0,e=function(f){var h=f.target;if(h&&3!==f.which&&!(f.yh||f.timeStamp&&f.timeStamp===d)){d=f.timeStamp;h=ud(h,["a","area"],100);if(!h)return f.returnValue;var k=f.defaultPrevented||!1===f.returnValue,l=yl("lcl",k?"nv.mwt":"mwt",0),q;q=k?yl("lcl","nv.ids",[]):yl("lcl","ids",[]);if(q.length){var r=ul(h,"gtm.linkClick",q);if(b(f,h,c)&&!k&&l&&h.href){var n=String(en(h,"rel")||""),t=!!Fa(n.split(" "),function(v){return"noreferrer"===v.toLowerCase()});
t&&E(36);var p=U((en(h,"target")||"_self").substring(1)),u=!0;if(Xm(r,nm(function(){var v;if(v=u&&p){var w;a:if(t){var y;try{var x=void 0;x={bubbles:!0};y=new MouseEvent(f.type,x)}catch(z){if(!c.createEvent){w=!1;break a}y=c.createEvent("MouseEvents");y.initEvent(f.type,!0,!0)}y.yh=!0;f.target.dispatchEvent(y);w=!0}else w=!1;v=!w}v&&(p.location.href=en(h,"href"))}),l))u=!1;else return f.preventDefault&&
f.preventDefault(),f.returnValue=!1}else Xm(r,function(){},l||2E3);return!0}}};pd(c,"click",e,!1);pd(c,"auxclick",e,!1)}function b(c,d,e){if(2===c.which||c.ctrlKey||c.shiftKey||c.altKey||c.metaKey)return!1;var f=en(d,"href"),h=f.indexOf("#"),k=en(d,"target");if(k&&"_self"!==k&&"_parent"!==k&&"_top"!==k||0===h)return!1;if(0<h){var l=Vm(f),q=Vm(e.location);return l!==q}return!0}(function(c){Z.__lcl=c;Z.__lcl.h="lcl";Z.__lcl.i=!0;Z.__lcl.priorityOverride=0})(function(c){var d=void 0===c.vtp_waitForTags?
!0:c.vtp_waitForTags,e=void 0===c.vtp_checkValidation?!0:c.vtp_checkValidation,f=Number(c.vtp_waitForTagsTimeout);if(!f||0>=f)f=2E3;var h=c.vtp_uniqueTriggerId||"0";if(d){var k=function(q){return Math.max(f,q)};xl("lcl","mwt",k,0);e||xl("lcl","nv.mwt",k,0)}var l=function(q){q.push(h);return q};xl("lcl","ids",l,[]);e||xl("lcl","nv.ids",l,[]);bn("lcl")||(a(),cn("lcl"));I(c.vtp_gtmOnSuccess)})}();


var tq={};tq.macro=function(a){if(um.jd.hasOwnProperty(a))return um.jd[a]},tq.onHtmlSuccess=um.bf(!0),tq.onHtmlFailure=um.bf(!1);tq.dataLayer=ef;tq.callback=function(a){We.hasOwnProperty(a)&&Aa(We[a])&&We[a]();delete We[a]};tq.bootstrap=0;tq._spx=!1;function uq(){L[Le.D]=tq;bb(Xe,Z.g);Tb=Tb||um;Ub=ec}
function vq(){xd.gtag_cs_api=!0;L=G.google_tag_manager=G.google_tag_manager||{};Vj();if(L[Le.D]){var a=L.zones;a&&a.unregisterChild(Le.D);}else{for(var b=data.resource||{},c=b.macros||[],d=0;d<c.length;d++)Kb.push(c[d]);
for(var e=b.tags||[],f=0;f<e.length;f++)Nb.push(e[f]);for(var h=b.predicates||[],k=0;k<h.length;k++)Mb.push(h[k]);for(var l=b.rules||[],q=0;q<l.length;q++){for(var r=l[q],n={},t=0;t<r.length;t++)n[r[t][0]]=Array.prototype.slice.call(r[t],1);Lb.push(n)}Pb=Z;Sb=Hn;uq();tm();Nh=!1;Oh=0;if("interactive"==H.readyState&&!H.createEventObject||"complete"==H.readyState)Qh();else{pd(H,"DOMContentLoaded",Qh);pd(H,"readystatechange",Qh);if(H.createEventObject&&H.documentElement.doScroll){var p=!0;try{p=!G.frameElement}catch(x){}p&&
Rh()}pd(G,"load",Qh)}zl=!1;"complete"===H.readyState?Bl():pd(G,"load",Bl);a:{if(!Ki)break a;G.setInterval(Li,864E5);}Ue=(new Date).getTime();tq.bootstrap=Ue;}}
(function(a){var f=function(){var q=G["google.tagmanager.debugui2.queue"];q||(q=[],G["google.tagmanager.debugui2.queue"]=q,ld("https://www.googletagmanager.com/debug/bootstrap"));return q},h="x"===me(G.location,"query",!1,void 0,"gtm_debug");if(!h&&H.referrer){var k=oe(H.referrer);h="tagassistant.google.com"===le(k,"host")}if(!h){var l=uf("__TAG_ASSISTANT");h=l.length&&l[0].length}G.__TAG_ASSISTANT_API&&(h=!0);h&&id?f().push({messageType:"CONTAINER_STARTING",
data:{scriptSource:id,resume:function(){a()}}}):a()})(vq);

})()
