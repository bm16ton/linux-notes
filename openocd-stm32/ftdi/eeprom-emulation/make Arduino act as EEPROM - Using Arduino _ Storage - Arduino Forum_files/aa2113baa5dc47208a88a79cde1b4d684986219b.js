(function() {
  if ('require' in window) {
    require("discourse/lib/theme-settings-store").registerSettings(2, {"svg_icons":"fab-youtube|fab-linkedin-in|fab-facebook-f","theme_uploads":{"typoninesans-regular":"https://aws1.discourse-cdn.com/arduino/original/3X/3/d/3d65f8b624b550a1377c11e84e79db86f410ed4e.woff","typsansmono-regular":"https://aws1.discourse-cdn.com/arduino/original/3X/b/8/b8362c60f30f0363c8f965ef94c0bb6f60651e61.woff","svg-device-manager":"https://aws1.discourse-cdn.com/arduino/original/3X/d/2/d26759ae4d0564fb0f223d801c5b1ded6ddb5283.svg","svg-iot-cloud":"https://aws1.discourse-cdn.com/arduino/original/3X/6/d/6deba2a42824fdb721f3f5868e42988277718e3a.svg","svg-web-editor":"https://aws1.discourse-cdn.com/arduino/original/3X/6/c/6ccb07efdc83c96cfa45eccf0323305461658ed0.svg","svg-close":"https://aws1.discourse-cdn.com/arduino/original/3X/e/c/ec18a2369593199dd4fb999f8af357993b79789b.svg","icons-sprite":"https://aws1.discourse-cdn.com/arduino/original/3X/5/2/5216ddd8fb2265b117cde44bca7cba571a9313bc.svg"}});
  }
})();
if ('define' in window) {
define("discourse/theme-2/initializers/theme-field-16-common-html-script-1", ["exports", "discourse/lib/plugin-api"], function (_exports, _pluginApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(2);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.2.".concat(key);
  };

  var _default = {
    name: "theme-field-16-common-html-script-1",
    after: "inject-objects",
    initialize: function initialize() {
      (0, _pluginApi.withPluginApi)("0.8.13", function (api) {
        api.modifyClass('component:site-header', {
          toggleVisibility: function toggleVisibility(topicToggled) {
            var headerWidth = this.$('.d-header .contents').width();
            var logoWidth = this.$('.d-header .title a').width();
            var $searchHeader = $('<div class="search-header"/>').hide().appendTo(".d-header .title");
            var searchWidth = parseInt($searchHeader.css("width"));
            $searchHeader.remove();
            var appController = api.container.lookup('controller:application');
            var currentState = appController.get('showHeaderSearch');
            var hideHeaderSearch = this.get('hideHeaderSearch');
            var showHeaderSearch = !hideHeaderSearch;
            appController.set('showHeaderSearch', showHeaderSearch);

            if (topicToggled || showHeaderSearch !== currentState || currentState === undefined) {
              this.queueRerender();
              Ember.run.scheduleOnce('afterRender', function () {
                var $header = $('.d-header');
                $header.toggleClass('header-search-enabled', !$('.panel > .search-menu').length && showHeaderSearch);
              });
            }
          },
          initSizeWatcher: function () {
            var _this = this;

            Ember.run.scheduleOnce('afterRender', function () {
              _this.toggleVisibility();
            });
          }.on('didInsertElement'),
          destroySizeWatcher: function () {
            $(window).off('resize', Ember.run.bind(this, this.toggleVisibility));
          }.on('willDestroyElement')
        });
        var searchMenuWidget = api.container.factoryFor('widget:search-menu');
        var corePanelContents = searchMenuWidget.class.prototype['panelContents'];
        api.reopenWidget('header', {
          togglePageSearch: function togglePageSearch() {
            var state = this.state;
            state.contextEnabled = false;
            var currentPath = this.register.lookup("service:router").get("_router.currentPath");
            var blocklist = [/^discovery\.categories/];
            var allowlist = [/^topic\./];

            var check = function check(regex) {
              return !!currentPath.match(regex);
            };

            var showSearch = allowlist.any(check) && !blocklist.any(check); // If we're viewing a topic, only intercept search if there are cloaked posts

            if (showSearch && currentPath.match(/^topic\./)) {
              var controller = this.register.lookup("controller:topic");
              var total = controller.get("model.postStream.stream.length") || 0;
              var chunkSize = controller.get("model.chunk_size") || 0;
              showSearch = false;
            }

            if (state.searchVisible) {
              this.toggleSearchMenu();
              return showSearch;
            }

            if (showSearch) {
              state.contextEnabled = true;
              this.toggleSearchMenu();
              return false;
            }

            return true;
          }
        }), api.reopenWidget('search-menu', {
          buildKey: function buildKey(attrs) {
            var type = attrs.formFactor || 'menu';
            return "search-".concat(type);
          },
          defaultState: function defaultState(attrs) {
            return {
              formFactor: attrs.formFactor || 'menu',
              showHeaderResults: false
            };
          },
          buildClasses: function buildClasses() {
            var formFactor = this.state.formFactor;
            var showHeaderResults = this.state.showHeaderResults;
            var classes = ["search-".concat(formFactor)];

            if (formFactor === 'header' && showHeaderResults) {
              classes.push('show-header-results');
            }

            var service = this.register.lookup("search-service:main");
            var ctx = service.get("searchContext");

            if (ctx) {
              classes.push('has-context');
            }

            return classes;
          },
          html: function html() {
            return this.panelContents();
          },
          clickOutside: function clickOutside() {
            if (!this.vnode.hooks['widget-mouse-down-outside']) {
              return this.mouseDownOutside();
            }
          },
          mouseDownOutside: function mouseDownOutside() {
            var formFactor = this.state.formFactor;

            if (formFactor === 'menu') {
              return this.sendWidgetAction('toggleSearchMenu');
            } else {
              this.state.showHeaderResults = false;
              this.scheduleRerender();
            }
          },
          click: function click() {
            var formFactor = this.state.formFactor;

            if (formFactor === 'header') {
              this.showResults();
            }
          },
          showResults: function showResults() {
            this.state.showHeaderResults = true;
            this.scheduleRerender();
          },
          linkClickedEvent: function linkClickedEvent() {
            var formFactor = this.state.formFactor;

            if (formFactor === 'header') {
              $('#search-term').val('');
              $('.search-placeholder').css('visibility', 'visible');
              this.state.showHeaderResults = false;
              this.scheduleRerender();
            }
          },
          panelContents: function panelContents() {
            var _contents;

            var formFactor = this.state.formFactor;
            var showHeaderResults = this.state.showHeaderResults == null || this.state.showHeaderResults === true;
            var contents = [];

            if (formFactor === 'header') {
              contents.push(this.attach('button', {
                icon: 'search',
                className: 'search-icon',
                action: 'showResults'
              }));
            }

            contents = (_contents = contents).concat.apply(_contents, _toConsumableArray(corePanelContents.call(this)));
            var results = contents.find(function (w) {
              return w.name == 'search-menu-results';
            });

            if (results && results.attrs.results) {
              $('.search-menu.search-header').addClass('has-results');
            } else {
              $('.search-menu.search-header').removeClass('has-results');
            }

            if (formFactor === 'menu' || showHeaderResults) {
              return contents;
            } else {
              return contents.filter(function (widget) {
                return widget.name != 'search-menu-results' && widget.name != 'search-context';
              });
            }
          },
          keyDown: function keyDown(e) {
            if (e.which === 27
            /* escape */
            ) {
                e.preventDefault();
                return false;
              }
          }
        });
        api.decorateWidget('arduino-search-wrapper:before', function (helper) {
          var header = helper.widget.parentWidget,
              appController = helper.register.lookup('controller:application'),
              showHeaderSearch = appController.get('showHeaderSearch'),
              searchMenuVisible = header.state.searchVisible;

          if (!searchMenuVisible && showHeaderSearch) {
            $('.d-header').addClass('header-search-enabled');
            return helper.attach('search-menu', {
              contextEnabled: header.state.contextEnabled,
              formFactor: 'header'
            });
          } else {
            $('.d-header').removeClass('header-search-enabled');
          }
        });

        var wantsNewWindow = require('discourse/lib/intercept-click').wantsNewWindow;

        var DiscourseURL = require('discourse/lib/url').default;

        api.reopenWidget('home-logo', {
          click: function click(e) {
            if (wantsNewWindow(e)) return false;
            e.preventDefault();

            if (e.target.id === 'site-logo' || e.target.id === 'site-text-logo') {
              DiscourseURL.routeTo(this.href());
            }

            return false;
          }
        });
      });
    }
  };
  _exports.default = _default;
});
}
if ('define' in window) {
define("discourse/theme-2/initializers/theme-field-16-common-html-script-2", ["exports", "discourse/lib/plugin-api"], function (_exports, _pluginApi) {
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
    name: "theme-field-16-common-html-script-2",
    after: "inject-objects",
    initialize: function initialize() {
      (0, _pluginApi.withPluginApi)("0.8", function (api) {
        api.modifyClass("component:d-navigation", {
          didInsertElement: function didInsertElement() {
            document.body.classList.add("filter-mode-".concat(this.filterType));
          },
          willDestroyElement: function willDestroyElement() {
            document.body.classList.remove("filter-mode-".concat(this.filterType));
          }
        });
      });
    }
  };
  _exports.default = _default;
});
}
if ('define' in window) {
define("discourse/theme-2/initializers/theme-field-16-common-html-script-3", ["exports", "discourse/lib/plugin-api"], function (_exports, _pluginApi) {
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
    name: "theme-field-16-common-html-script-3",
    after: "inject-objects",
    initialize: function initialize() {
      (0, _pluginApi.withPluginApi)("0.8.13", function (api) {
        var h = require('virtual-dom').h;

        api.reopenWidget('quick-access-profile', {
          _getDefaultItems: function _getDefaultItems() {
            var defaultItems = [{
              icon: "user",
              href: "https://id.arduino.cc/",
              content: "Arduino profile",
              className: "arduino-profile"
            }, {
              icon: "user",
              href: "".concat(this.attrs.path, "/summary"),
              content: "Forum profile",
              className: "summary"
            }, {
              icon: "stream",
              href: "".concat(this.attrs.path, "/activity"),
              content: I18n.t("user.activity_stream"),
              className: "activity"
            }];

            if (this.currentUser.can_invite_to_forum) {
              defaultItems.push({
                icon: "user-plus",
                href: "".concat(this.attrs.path, "/invited"),
                content: I18n.t("user.invited.title"),
                className: "invites"
              });
            }

            defaultItems.push({
              icon: "pencil-alt",
              href: "".concat(this.attrs.path, "/activity/drafts"),
              content: I18n.t("user_action_groups.15"),
              className: "drafts"
            }, {
              icon: "cog",
              href: "".concat(this.attrs.path, "/preferences"),
              content: I18n.t("user.preferences"),
              className: "preferences"
            });
            defaultItems.push({
              widget: "do-not-disturb"
            });
            return defaultItems;
          }
        });
      });
    }
  };
  _exports.default = _default;
});
}
