'use strict'
;(function () {
  function checkURL (urlStr) {
    return window.location.href.indexOf(urlStr) > -1
  }
  var jsFile = null
  switch (true) {
    case checkURL('localhost'):
      jsFile =
        'https://cdn.cookielaw.org/consent/4a264109-5787-4ce9-9888-0f7581ba57a7.js'
      console.log('0 localhost - run default optanon script')
      break
    case checkURL('uat.nxp.com.cn'):
      jsFile =
        'https://optanon.blob.core.windows.net/consent/af8b207e-938e-4d30-8457-62c65ff10794-test.js'
      console.log('1 should run optanon script on uat.nxp.com.cn')
      break
    case checkURL('nxp.com.cn'):
      jsFile =
        'https://cdn.cookielaw.org/consent/af8b207e-938e-4d30-8457-62c65ff10794.js'
      // console.log('2 should run optanon script on nxp.com.cn');
      break
    case checkURL('nxp.flexnetoperations.com'):
      jsFile =
        'https://cdn.cookielaw.org/consent/5d1a3711-4501-461d-96e3-ee1d8cd46ad4.js'
      console.log('3 should run optanon script on nxp.flexnetoperations.com')
      break
    case checkURL('nxpuat.flexnetoperations.com'):
      jsFile =
        'https://optanon.blob.core.windows.net/consent/5d1a3711-4501-461d-96e3-ee1d8cd46ad4-test.js'
      console.log('4 should run optanon script on nxpuat.flexnetoperations.com')
      break
    case checkURL('//uat.nxp.com') && !checkURL('//uat.nxp.com.cn'):
      jsFile =
        // 'https://optanon.blob.core.windows.net/consent/4a264109-5787-4ce9-9888-0f7581ba57a7-test.js'
        'https://uat.nxp.com/shared/oneTrust/nxp.com/oneTrust/onetrustConsent.js'
      // console.log('5 should run optanon script on uat.nxp.com');
      break
    case checkURL('nxp.com') && !checkURL('nxp.com.cn'):
      jsFile =
        // 'https://cdn.cookielaw.org/consent/4a264109-5787-4ce9-9888-0f7581ba57a7.js'
        'https://www.nxp.com/shared/oneTrust/nxp.com/oneTrust/onetrustConsent.js'
      // console.log('5 should run optanon script on www.nxp.com');
      break
    default:
      jsFile =
        // 'https://cdn.cookielaw.org/consent/4a264109-5787-4ce9-9888-0f7581ba57a7.js'
        'https://www.nxp.com/shared/oneTrust/nxp.com/oneTrust/onetrustConsent.js'
    // console.log('6 using default onetrust script');
  }

  var otScript = document.createElement('script')
  otScript.setAttribute('async', 'false')
  otScript.setAttribute('src', jsFile)
  var head = document.head
  head.insertBefore(otScript, head.firstChild)
  // console.log('run optanon script', jsFile)
})()
