(function() {
  if ('require' in window) {
    require("discourse/lib/theme-settings-store").registerSettings(2, {"svg_icons":"fab-youtube|fab-linkedin-in|fab-facebook-f","theme_uploads":{"typoninesans-regular":"https://aws1.discourse-cdn.com/arduino/original/3X/3/d/3d65f8b624b550a1377c11e84e79db86f410ed4e.woff","typsansmono-regular":"https://aws1.discourse-cdn.com/arduino/original/3X/b/8/b8362c60f30f0363c8f965ef94c0bb6f60651e61.woff","svg-device-manager":"https://aws1.discourse-cdn.com/arduino/original/3X/d/2/d26759ae4d0564fb0f223d801c5b1ded6ddb5283.svg","svg-iot-cloud":"https://aws1.discourse-cdn.com/arduino/original/3X/6/d/6deba2a42824fdb721f3f5868e42988277718e3a.svg","svg-web-editor":"https://aws1.discourse-cdn.com/arduino/original/3X/6/c/6ccb07efdc83c96cfa45eccf0323305461658ed0.svg","svg-close":"https://aws1.discourse-cdn.com/arduino/original/3X/e/c/ec18a2369593199dd4fb999f8af357993b79789b.svg","icons-sprite":"https://aws1.discourse-cdn.com/arduino/original/3X/5/2/5216ddd8fb2265b117cde44bca7cba571a9313bc.svg"}});
  }
})();
(function() {
  if ('Ember' in window) {
    Ember.TEMPLATES["javascripts/arduino/connectors/above-footer/footer"] = Ember.HTMLBars.template({"id":null,"block":"{\"symbols\":[],\"statements\":[[4,\"if\",[[24,[\"showFooter\"]]],null,{\"statements\":[[0,\"  \"],[1,[28,\"arduino-footer\",null,[[\"showFooter\",\"model\"],[[24,[\"showFooter\"]],[28,\"hash\",null,[[\"model\"],[[24,[\"model\"]]]]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}","meta":{}});
  }
})();

if ('define' in window) {
define("discourse/theme-2/components/arduino-footer", ["exports", "@ember/component", "discourse-common/utils/decorators", "discourse/lib/plugin-api", "@ember/service", "discourse/models/topic", "discourse/lib/url"], function (_exports, _component, _decorators, _pluginApi, _service, _topic, _url) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(2);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.2.".concat(key);
  };

  var _default = _component.default.extend({
    router: (0, _service.inject)(),
    currentRouteName: null,
    _jumpType: function _jumpType() {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }

      if (this.router.currentRouteName === "topic.fromParamsNear" || this.router.currentRouteName === "topic.fromParams") {
        this.set("jumpType", "topic");
      } else {
        this.set("jumpType", "other");
      }
    },
    actions: {
      jumpTop: function jumpTop() {
        if (this.jumpType === "topic") {
          var url = window.location.pathname.split("/");
          var topURL = url[0] + "/" + url[1] + "/" + url[2] + "/" + url[3];

          _url.default.routeTo(topURL);
        } else {
          $("html, body").animate({
            scrollTop: 0
          }, "fast");
        }
      }
    },
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);

      this.appEvents.on("page:changed", this, "_jumpType");
    }
  });

  _exports.default = _default;
});
}

if ('define' in window) {
define("discourse/theme-2/initializers/arduino-icon-replace", ["exports", "discourse/lib/plugin-api"], function (_exports, _pluginApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(2);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.2.".concat(key);
  };

  var _default = {
    name: "arduino-icon-replace",
    initialize: function initialize() {
      (0, _pluginApi.withPluginApi)("0.8", function (api) {
        api.replaceIcon("bars", "arduino-bars");
        api.replaceIcon("search", "arduino-search");
        api.replaceIcon("fab-github", "arduino-github");
      });
    }
  };
  _exports.default = _default;
});
}

if ('define' in window) {
define("discourse/theme-2/initializers/cookie-consent", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(2);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.2.".concat(key);
  };

  var _default = {
    name: "init-cookie-consent",
    initialize: function initialize() {
      function initCookieConsent(coppa) {
        var lang = "en";
        var trackingEn = coppa ? "" : ", and to show you personalised advertisement";
        var trackingIt = coppa ? "" : ", e per mostrare contenuti pubblicitari personalizzati";
        var content = "<div id=\"iubenda-cs-title\">We use cookies &#127850;</div><div>Our websites use cookies (also from third parties) for functional and analytical purposes".concat(trackingEn, ". You can adjust this in <a class=\"iubenda-cs-customize-btn\">Cookie Settings</a> or learn more by reading our %{cookie_policy_link}.</div>");

        if (navigator.language === "it-IT") {
          lang = "it";
          content = "<div id=\"iubenda-cs-title\">Usiamo i cookies &#127850;</div><div>I nostri siti usano cookie (anche di terze parti) per fini funzionali e di analisi".concat(trackingIt, ". Puoi regolare queste impostazioni nelle <a class=\"iubenda-cs-customize-btn\">Impostazioni di tracciamento</a> o saperne di pi&ugrave; leggendo la %{cookie_policy_link}.</div>");
        }

        window._iub = window._iub || [];
        window._iub.csConfiguration = {
          askConsentAtCookiePolicyUpdate: true,
          ccpaAcknowledgeOnDisplay: false,
          ccpaApplies: false,
          ccpaNoticeDisplay: false,
          consentOnContinuedBrowsing: false,
          cookiePolicyId: 11225532,
          countryDetection: true,
          enableCcpa: false,
          floatingPreferencesButtonDisplay: false,
          startOnDomReady: true,
          lang: lang,
          // localConsentDomain: 'arduino.cc',
          perPurposeConsent: true,
          purposes: coppa ? "1, 4" : "1, 4, 5",
          siteId: 2023027,
          whitelabel: true,
          cookiePolicyUrl: "https://www.arduino.cc/" + lang + "/cookie-policy",
          banner: {
            applyStyles: false,
            content: content,
            rejectButtonDisplay: true,
            rejectButtonCaption: lang === "en" ? "ONLY REQUIRED" : "SOLO NECESSARI",
            position: "float-bottom-left",
            acceptButtonDisplay: true,
            acceptButtonCaption: lang === "en" ? "ACCEPT ALL" : "ACCETTA TUTTI",
            backgroundOverlay: false,
            brandBackgroundColor: "black"
          },
          callback: {
            // push events to google tag manager to enable the firing of specific tags according to the preference given by the user
            onPreferenceFirstExpressed: function onPreferenceFirstExpressed(preference) {
              var dataLayer = window.dataLayer || [];
              dataLayer.push({
                // eslint-disable-next-line camelcase
                iubenda_ccpa_opted_out: window._iub.cs.api.isCcpaOptedOut()
              });

              if (preference) {
                if (preference.consent === true) {
                  dataLayer.push({
                    event: "iubenda_consent_given"
                  });
                } else if (preference.consent === false) {
                  dataLayer.push({
                    event: "iubenda_consent_rejected"
                  });
                } else if (preference.purposes) {
                  for (var purposeId in preference.purposes) {
                    if (preference.purposes[purposeId]) {
                      dataLayer.push({
                        event: "iubenda_consent_given_purpose_" + purposeId
                      });
                    }
                  }
                }
              } else {
                dataLayer.push({
                  event: "iubenda_preference_not_needed"
                });
              }
            }
          }
        };
        return loadJS("//cdn.arduino.cc/header-footer/iubenda-7477c61df49044b49eabbd94edfbd933.js", {
          async: true
        });
      }

      initCookieConsent();

      function loadJS(url, _ref) {
        var _ref$async = _ref.async,
            async = _ref$async === void 0 ? false : _ref$async;
        return new Promise(function (resolve, reject) {
          // Create a new script element
          var script = window.document.createElement("script");
          script.src = url;
          script.onload = resolve;
          script.async = async; // Inject the script into the DOM

          var ref = window.document.getElementsByTagName("script")[0];
          ref.parentNode.insertBefore(script, ref);
          setTimeout(reject, 2000);
        });
      }
    }
  };
  _exports.default = _default;
});
}

if ('define' in window) {
define("discourse/theme-2/initializers/initialize-header", ["exports", "discourse/lib/plugin-api", "virtual-dom", "discourse-common/lib/icon-library"], function (_exports, _pluginApi, _virtualDom, _iconLibrary) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(2);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.2.".concat(key);
  };

  var _default = {
    name: "arduino-hf",
    initialize: function initialize() {
      (0, _pluginApi.withPluginApi)("0.8", function (api) {
        api.decorateWidget("header-contents:before", function (helper) {
          return helper.attach("arduino-nav");
        });
        api.decorateWidget("header-buttons:before", function (helper) {
          var showExtraInfo = helper.attrs.topic;

          if (!showExtraInfo) {
            document.querySelector("body").classList.remove("show-extra-info");
            return helper.attach("arduino-discourse-nav");
          } else {
            document.querySelector("body").classList.add("show-extra-info");
          }
        });
        api.createWidget("arduino-discourse-nav", {
          tagName: "div.arduino-discourse-nav",
          buildKey: function buildKey() {
            return "arduino-discourse-nav";
          },
          lookupCount: function lookupCount(type) {
            var tts = this.register.lookup("topic-tracking-state:main");
            return tts ? tts.lookupCount(type) : 0;
          },
          html: function html() {
            var navItems = [];
            var currentUser = api.getCurrentUser();
            navItems.push((0, _virtualDom.h)("li.filter-categories", (0, _virtualDom.h)("a", {
              href: "/categories"
            }, "Categories")));
            navItems.push((0, _virtualDom.h)("li.filter-latest", (0, _virtualDom.h)("a", {
              href: "/latest"
            }, "Latest")));

            if (currentUser) {
              var newItems;
              var unreadItems;

              if (this.lookupCount("new") > 0) {
                newItems = this.lookupCount("new");
                navItems.push((0, _virtualDom.h)("li.filter-new", (0, _virtualDom.h)("a", {
                  href: "/new"
                }, "New (" + newItems + ")")));
              }

              if (this.lookupCount("unread") > 0) {
                unreadItems = this.lookupCount("unread");
                navItems.push((0, _virtualDom.h)("li.filter-unread", (0, _virtualDom.h)("a", {
                  href: "/unread"
                }, "Unread (" + unreadItems + ")")));
              }
            }

            navItems.push((0, _virtualDom.h)("li.filter-about", (0, _virtualDom.h)("a", {
              href: "/about"
            }, "About")));
            navItems.push((0, _virtualDom.h)("li.filter-faq", (0, _virtualDom.h)("a", {
              href: "/faq"
            }, "FAQ")));
            return (0, _virtualDom.h)("ul", [navItems]);
          }
        });
        api.createWidget("arduino-nav", {
          tagName: "div.arduino-nav-top",
          buildKey: function buildKey() {
            return "arduino-nav";
          },
          html: function html(attrs, state) {
            return (0, _virtualDom.h)("div.wrap", [this.attach("arduino-header-links"), this.attach("arduino-search-wrapper"), this.attach("arduino-grid-button"), this.attach("arduino-login-button"), (0, _virtualDom.h)("div.arduino-user-placeholder")]);
          }
        });
        api.createWidget("arduino-header-links", {
          tagName: "div.arduino-header-links",
          buildKey: function buildKey() {
            return "arduino-header-links";
          },
          html: function html() {
            return (0, _virtualDom.h)("ul", [(0, _virtualDom.h)("li", (0, _virtualDom.h)("a", {
              href: "https://arduino.cc"
            }, [(0, _virtualDom.h)("span", "Arduino"), (0, _virtualDom.h)("span", ".cc")])), (0, _virtualDom.h)("li", [(0, _virtualDom.h)("a", {
              href: "https://arduino.cc/pro"
            }, [(0, _virtualDom.h)("span", "Pro"), (0, _virtualDom.h)("span", "fessional")])]), (0, _virtualDom.h)("li", [(0, _virtualDom.h)("a", {
              href: "https://arduino.cc/education"
            }, [(0, _virtualDom.h)("span", "Edu"), (0, _virtualDom.h)("span", "cation")])]), (0, _virtualDom.h)("li", [(0, _virtualDom.h)("a", {
              href: "https://store.arduino.cc"
            }, "Store")])]);
          }
        });
        api.createWidget("arduino-grid-button", {
          tagName: "div.arduino-grid-button",
          buildKey: function buildKey() {
            return "arduino-grid-button";
          },
          template: function template(attrs, state) {
            var __h1 = __widget_helpers.iconNode;
            var _r = [];

            _r.push("\n        ");

            var _a0 = [];

            _a0.push(__h1("app-list"));

            _r.push(virtualDom.h('a', _a0));

            _r.push("\n        ");

            var _a1 = [];

            _a1.push("\n        ");

            var _a2 = [];

            _a2.push("\n          ");

            var _a3 = [];
            var _a4 = [];
            var _a5 = [];

            _a5.push("\n            ");

            var _a6 = [];

            _a6.push("\n            ");

            _a5.push(virtualDom.h('div', {
              "className": "app-application__icon",
              "attributes": {}
            }, _a6));

            _a5.push("\n            ");

            var _a7 = [];

            _a7.push("IoT Cloud");

            _a5.push(virtualDom.h('div', {
              "className": "app-application__name",
              "attributes": {}
            }, _a7));

            _a5.push("\n          ");

            _a4.push(virtualDom.h('a', {
              "className": "app-application",
              "attributes": {
                "id": "iot-cloud",
                "href": "https://create.arduino.cc/iot",
                "target": "blank",
                "rel": "noopener noreferrer"
              }
            }, _a5));

            _a3.push(virtualDom.h('div', {
              "className": "app-applications__item",
              "attributes": {}
            }, _a4));

            var _a8 = [];
            var _a9 = [];

            _a9.push("\n            ");

            var _a10 = [];

            _a10.push("\n             \n            ");

            _a9.push(virtualDom.h('div', {
              "className": "app-application__icon",
              "attributes": {}
            }, _a10));

            _a9.push("\n            ");

            var _a11 = [];

            _a11.push("Web Editor");

            _a9.push(virtualDom.h('div', {
              "className": "app-application__name",
              "attributes": {}
            }, _a11));

            _a9.push("\n          ");

            _a8.push(virtualDom.h('a', {
              "className": "app-application",
              "attributes": {
                "id": "web-editor",
                "href": "https://create.arduino.cc/editor",
                "target": "blank",
                "rel": "noopener noreferrer"
              }
            }, _a9));

            _a3.push(virtualDom.h('div', {
              "className": "app-applications__item",
              "attributes": {}
            }, _a8));

            var _a12 = [];
            var _a13 = [];

            _a13.push("\n            ");

            var _a14 = [];

            _a14.push("\n             \n            ");

            _a13.push(virtualDom.h('div', {
              "className": "app-application__icon",
              "attributes": {}
            }, _a14));

            _a13.push("\n            ");

            var _a15 = [];

            _a15.push("Manager for Linux");

            _a13.push(virtualDom.h('div', {
              "className": "app-application__name",
              "attributes": {}
            }, _a15));

            _a13.push("\n          ");

            _a12.push(virtualDom.h('a', {
              "className": "app-application",
              "attributes": {
                "id": "device-manager",
                "href": "https://create.arduino.cc/devices",
                "target": "blank",
                "rel": "noopener noreferrer"
              }
            }, _a13));

            _a3.push(virtualDom.h('div', {
              "className": "app-applications__item",
              "attributes": {}
            }, _a12));

            _a2.push(virtualDom.h('div', {
              "attributes": {
                "id": "app-apps-container-box"
              }
            }, _a3));

            _a2.push("\n        ");

            _a1.push(virtualDom.h('div', {
              "className": "popup-container__box",
              "attributes": {}
            }, _a2));

            _a1.push("\n      ");

            _r.push(virtualDom.h('div', {
              "className": "popup-container",
              "attributes": {}
            }, _a1));

            _r.push("\n      ");

            return _r;
          },
          defaultState: function defaultState() {
            return {
              expanded: false
            };
          },
          click: function click() {
            this.state.expanded = !this.state.expanded;
            document.querySelector(".arduino-grid-button").classList.toggle("active");
          },
          clickOutside: function clickOutside() {
            this.state.expanded = false;
            document.querySelector(".arduino-grid-button").classList.remove("active");
          }
        });
        api.createWidget("arduino-login-button", {
          tagName: "div.arduino-login-button",
          buildKey: function buildKey() {
            return "arduino-login-button";
          },
          html: function html(attrs, state) {
            var currentUser = api.getCurrentUser();

            if (currentUser) {
              return;
            }

            var buttons = [];
            buttons.push(this.attach("button", {
              label: "log_in",
              className: "btn-primary btn-small login-button",
              action: "showLogin",
              icon: "user"
            }));
            return buttons;
          }
        });
        api.createWidget("arduino-search-wrapper", {
          tagName: "div.arduino-search-wrapper",
          buildKey: function buildKey() {
            return "arduino-search-wrapper";
          }
        });
      });
    }
  };
  _exports.default = _default;
});
}

(function() {
  if ('Ember' in window) {
    Ember.TEMPLATES["javascripts/components/arduino-footer"] = Ember.HTMLBars.template({"id":null,"block":"{\"symbols\":[],\"statements\":[[0,\"\\n\"],[7,\"footer\",true],[10,\"class\",\"arduino-footer\"],[8],[0,\"\\n\\n  \"],[7,\"section\",true],[10,\"class\",\"arduino-footer-top\"],[8],[0,\"\\n    \"],[7,\"svg\",true],[10,\"width\",\"102\"],[10,\"height\",\"14\"],[10,\"fill\",\"none\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[10,\"data-inject-url\",\"https://cdn.arduino.cc/header-footer/prod/assets/footerLogo-arduino.svg\"],[8],[0,\"\\n      \"],[7,\"path\",true],[10,\"d\",\"M0 13.812L4.162.19h3.784l4.351 13.622H8.703l-.757-2.649H4.162l-.757 2.649H0zM6.054 3.595L4.73 8.515h2.648l-1.324-4.92zM14.378.19h5.486c3.784 0 5.108 1.891 5.108 4.54 0 1.892-.756 3.216-2.27 3.973l2.649 4.919h-3.973l-1.892-4.163h-1.703v4.352h-3.405V.189zm7.19 4.54c0-1.135-.38-1.892-2.082-1.892h-1.703v3.784h1.703c1.324.189 2.081-.379 2.081-1.892zM27.811.19h4.352c5.108 0 6.81 2.459 6.81 6.62 0 3.217-.945 6.812-6.81 6.812h-4.54V.189h.188zm3.406 2.648v7.946h1.324c2.838 0 3.027-1.703 3.027-3.973 0-2.649-.19-3.973-3.216-3.973h-1.135zM48.81.19h3.217V9.08C52.027 13.054 49 14 46.541 14c-2.27 0-5.298-.757-5.298-4.919V.19h3.406v8.324c0 2.27.756 2.838 2.08 2.838 1.514 0 2.082-.756 2.082-2.838V.19zM55.054 10.973h3.594V3.027h-3.405V.189h10.405v2.838h-3.594v7.946h3.594v2.838H55.243v-2.838h-.19zM71.325 13.622h-3.217V.189h3.784l4.352 8.135V.19h3.216v13.622h-3.406l-4.54-8.703-.19 8.514zM93.082 7c0 3.973-1.514 7-5.865 7-3.973 0-5.676-2.27-5.676-6.81 0-4.163 1.514-7.19 5.676-7.19 3.973 0 5.865 1.703 5.865 7zm-3.595 0c0-3.405-.19-4.162-2.27-4.162-1.703-.19-2.081.946-2.081 4.351 0 2.649.189 4.162 2.08 4.162 2.082-.189 2.271-1.324 2.271-4.351zM95.352 3.027C95.352 1.324 96.676 0 98.189 0c1.703 0 3.027 1.324 3.027 3.027s-1.324 3.027-3.027 3.027c-1.513-.19-2.837-1.513-2.837-3.027zm5.297 0c0-1.324-.946-2.46-2.46-2.46-1.324 0-2.27.947-2.27 2.46 0 1.514 1.135 2.46 2.27 2.46 1.514 0 2.46-.946 2.46-2.46zm-3.973-1.892h1.703c1.135 0 1.513.568 1.513 1.135 0 .379-.19.757-.567 1.135l.567 1.325h-1.135l-.378-1.135H98V4.73h-1.135V1.135h-.19zm1.513 1.703c.379 0 .568-.19.568-.568 0-.378-.19-.378-.568-.378h-.378v.946h.378z\"],[10,\"fill\",\"currentColor\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n   \"],[1,[28,\"d-button\",null,[[\"action\",\"translatedLabel\",\"icon\"],[\"jumpTop\",\"Back to top\",\"arduino-chevron-up\"]]],false],[0,\" \\n\\n  \"],[9],[0,\"\\n\\n  \"],[7,\"section\",true],[10,\"class\",\"arduino-footer-bottom\"],[8],[0,\"\\n\\n    \"],[7,\"ul\",true],[10,\"class\",\"arduino-footer-menu\"],[8],[0,\"\\n      \"],[7,\"li\",true],[8],[7,\"a\",true],[10,\"href\",\"https://support.arduino.cc/\"],[8],[0,\"Help Center\"],[9],[9],[0,\"\\n      \"],[7,\"li\",true],[8],[7,\"a\",true],[10,\"href\",\"https://www.arduino.cc/en/contact-us\"],[8],[0,\"Contact Us\"],[9],[9],[0,\"\\n      \"],[7,\"li\",true],[8],[7,\"a\",true],[10,\"href\",\"https://www.arduino.cc/en/Trademark/HomePage\"],[8],[0,\"Trademark & Copyright\"],[9],[9],[0,\"\\n      \"],[7,\"li\",true],[8],[7,\"a\",true],[10,\"href\",\"https://www.arduino.cc/en/trademark\"],[8],[0,\"Brand Guidelines\"],[9],[9],[0,\"\\n      \"],[7,\"li\",true],[8],[7,\"a\",true],[10,\"href\",\"https://store.arduino.cc/distributors\"],[8],[0,\"Distributors\"],[9],[9],[0,\"\\n      \"],[7,\"li\",true],[10,\"class\",\"hide-mobile\"],[8],[7,\"a\",true],[10,\"href\",\"https://careers.arduino.cc/\"],[8],[0,\"Careers\"],[9],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"div\",true],[10,\"class\",\"arduino-footer-social-menu\"],[8],[0,\"\\n      \"],[7,\"h4\",true],[8],[0,\"Follow us\"],[9],[0,\"\\n      \"],[7,\"ul\",true],[8],[0,\"\\n        \"],[7,\"li\",true],[8],[1,[28,\"d-button\",null,[[\"href\",\"icon\"],[\"https://www.facebook.com/official.arduino\",\"fab-facebook-f\"]]],false],[9],[0,\"\\n        \"],[7,\"li\",true],[8],[1,[28,\"d-button\",null,[[\"href\",\"icon\"],[\"https://www.instagram.com/arduino.cc/\",\"fab-instagram\"]]],false],[9],[0,\"\\n        \"],[7,\"li\",true],[8],[1,[28,\"d-button\",null,[[\"href\",\"icon\"],[\"https://twitter.com/arduino\",\"fab-twitter\"]]],false],[9],[0,\"\\n        \"],[7,\"li\",true],[8],[1,[28,\"d-button\",null,[[\"href\",\"icon\"],[\"https://github.com/arduino/\",\"fab-github\"]]],false],[9],[0,\"\\n        \"],[7,\"li\",true],[8],[1,[28,\"d-button\",null,[[\"href\",\"icon\"],[\"https://www.linkedin.com/company/arduino\",\"fab-linkedin-in\"]]],false],[9],[0,\"\\n        \"],[7,\"li\",true],[8],[1,[28,\"d-button\",null,[[\"href\",\"icon\"],[\"https://www.youtube.com/user/arduinoteam\",\"fab-youtube\"]]],false],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"div\",true],[10,\"class\",\"arduino-footer-copy\"],[8],[0,\"\\n      © 2020 Arduino\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"ul\",true],[10,\"class\",\"arduino-footer-legal\"],[8],[0,\"\\n      \"],[7,\"li\",true],[10,\"class\",\"hide-desktop\"],[8],[7,\"a\",true],[10,\"href\",\"https://careers.arduino.cc/\"],[8],[0,\"Careers\"],[9],[9],[0,\"\\n      \"],[7,\"li\",true],[8],[7,\"a\",true],[10,\"href\",\"https://www.arduino.cc/en/Main/TermsOfService\"],[8],[0,\"Terms of Service\"],[9],[9],[0,\"\\n      \"],[7,\"li\",true],[8],[7,\"a\",true],[10,\"href\",\"https://www.arduino.cc/en/Main/PrivacyPolicy\"],[8],[0,\"Privacy Policy\"],[9],[9],[0,\"\\n      \"],[7,\"li\",true],[8],[7,\"a\",true],[10,\"href\",\"https://www.arduino.cc/en/Main/Security\"],[8],[0,\"Security\"],[9],[9],[0,\"\\n      \"],[7,\"li\",true],[8],[7,\"a\",true],[10,\"class\",\"iubenda-cs-preferences-link\"],[8],[0,\"Cookie Settings\"],[9],[9],[0,\"\\n    \"],[9],[0,\"\\n    \\n  \"],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\\n\"]],\"hasEval\":false}","meta":{}});
  }
})();

