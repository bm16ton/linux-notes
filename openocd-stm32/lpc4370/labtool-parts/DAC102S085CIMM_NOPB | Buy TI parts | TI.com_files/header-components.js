/* v2.15.5 */

'use strict';
(function () {
  var currentScript = document.currentScript;

  // Safari 10 support type="module" but still download and executes the nomodule script
  if (!currentScript || !currentScript.hasAttribute('nomodule') || !('onbeforeload' in currentScript)) {

  /* polyfills excluded */

  // Figure out currentScript (for IE11, since it does not support currentScript)
  var regex = /\/header-components(\.esm)?\.js($|\?|#)/;
  var scriptElm = currentScript || Array.from(document.querySelectorAll('script')).find(function(s) {
    return regex.test(s.src) || s.getAttribute('data-stencil-namespace') === "header-components";
  });

  var resourcesUrl = scriptElm ? scriptElm.getAttribute('data-resources-url') || scriptElm.src : '';
  var start = function() {
    var url = new URL('./p-6933988f.system.js', resourcesUrl);
    System.import(url.href);
  };

  if (window.__cssshim) {
    window.__cssshim.i().then(start);
  } else {
    start();
  }

  // Note: using .call(window) here because the self-executing function needs
  // to be scoped to the window object for the ES6Promise polyfill to work
  }
}).call(window);
