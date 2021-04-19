/**
 * @dk/vanilla - Digikey vanilla components
 *
 * @version v0.2.19
 * @bundled 3/10/2021
 */
var dk = (function (exports) {
    'use strict';

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var check = function (it) {
      return it && it.Math == Math && it;
    };

    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global_1 =
      /* global globalThis -- safe */
      check(typeof globalThis == 'object' && globalThis) ||
      check(typeof window == 'object' && window) ||
      check(typeof self == 'object' && self) ||
      check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
      // eslint-disable-next-line no-new-func -- fallback
      (function () { return this; })() || Function('return this')();

    var fails = function (exec) {
      try {
        return !!exec();
      } catch (error) {
        return true;
      }
    };

    // Detect IE8's incomplete defineProperty implementation
    var descriptors = !fails(function () {
      return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
    });

    var isObject = function (it) {
      return typeof it === 'object' ? it !== null : typeof it === 'function';
    };

    var document$1 = global_1.document;
    // typeof document.createElement is 'object' in old IE
    var EXISTS = isObject(document$1) && isObject(document$1.createElement);

    var documentCreateElement = function (it) {
      return EXISTS ? document$1.createElement(it) : {};
    };

    // Thank's IE8 for his funny defineProperty
    var ie8DomDefine = !descriptors && !fails(function () {
      return Object.defineProperty(documentCreateElement('div'), 'a', {
        get: function () { return 7; }
      }).a != 7;
    });

    var anObject = function (it) {
      if (!isObject(it)) {
        throw TypeError(String(it) + ' is not an object');
      } return it;
    };

    // `ToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-toprimitive
    // instead of the ES6 spec version, we didn't implement @@toPrimitive case
    // and the second argument - flag - preferred type is a string
    var toPrimitive = function (input, PREFERRED_STRING) {
      if (!isObject(input)) return input;
      var fn, val;
      if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
      if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
      if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
      throw TypeError("Can't convert object to primitive value");
    };

    var nativeDefineProperty = Object.defineProperty;

    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPrimitive(P, true);
      anObject(Attributes);
      if (ie8DomDefine) try {
        return nativeDefineProperty(O, P, Attributes);
      } catch (error) { /* empty */ }
      if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };

    var objectDefineProperty = {
    	f: f
    };

    var createPropertyDescriptor = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };

    var createNonEnumerableProperty = descriptors ? function (object, key, value) {
      return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
    } : function (object, key, value) {
      object[key] = value;
      return object;
    };

    var setGlobal = function (key, value) {
      try {
        createNonEnumerableProperty(global_1, key, value);
      } catch (error) {
        global_1[key] = value;
      } return value;
    };

    var SHARED = '__core-js_shared__';
    var store = global_1[SHARED] || setGlobal(SHARED, {});

    var sharedStore = store;

    var shared = createCommonjsModule(function (module) {
    (module.exports = function (key, value) {
      return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: '3.9.1',
      mode:  'global',
      copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
    });
    });

    var hasOwnProperty = {}.hasOwnProperty;

    var has = function (it, key) {
      return hasOwnProperty.call(it, key);
    };

    var id = 0;
    var postfix = Math.random();

    var uid = function (key) {
      return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
    };

    var toString = {}.toString;

    var classofRaw = function (it) {
      return toString.call(it).slice(8, -1);
    };

    var engineIsNode = classofRaw(global_1.process) == 'process';

    var path = global_1;

    var aFunction = function (variable) {
      return typeof variable == 'function' ? variable : undefined;
    };

    var getBuiltIn = function (namespace, method) {
      return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
        : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
    };

    var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

    var process = global_1.process;
    var versions = process && process.versions;
    var v8 = versions && versions.v8;
    var match, version;

    if (v8) {
      match = v8.split('.');
      version = match[0] + match[1];
    } else if (engineUserAgent) {
      match = engineUserAgent.match(/Edge\/(\d+)/);
      if (!match || match[1] >= 74) {
        match = engineUserAgent.match(/Chrome\/(\d+)/);
        if (match) version = match[1];
      }
    }

    var engineV8Version = version && +version;

    var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
      /* global Symbol -- required for testing */
      return !Symbol.sham &&
        // Chrome 38 Symbol has incorrect toString conversion
        // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
        (engineIsNode ? engineV8Version === 38 : engineV8Version > 37 && engineV8Version < 41);
    });

    var useSymbolAsUid = nativeSymbol
      /* global Symbol -- safe */
      && !Symbol.sham
      && typeof Symbol.iterator == 'symbol';

    var WellKnownSymbolsStore = shared('wks');
    var Symbol$1 = global_1.Symbol;
    var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

    var wellKnownSymbol = function (name) {
      if (!has(WellKnownSymbolsStore, name) || !(nativeSymbol || typeof WellKnownSymbolsStore[name] == 'string')) {
        if (nativeSymbol && has(Symbol$1, name)) {
          WellKnownSymbolsStore[name] = Symbol$1[name];
        } else {
          WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
        }
      } return WellKnownSymbolsStore[name];
    };

    var TO_STRING_TAG = wellKnownSymbol('toStringTag');
    var test = {};

    test[TO_STRING_TAG] = 'z';

    var toStringTagSupport = String(test) === '[object z]';

    var functionToString = Function.toString;

    // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
    if (typeof sharedStore.inspectSource != 'function') {
      sharedStore.inspectSource = function (it) {
        return functionToString.call(it);
      };
    }

    var inspectSource = sharedStore.inspectSource;

    var WeakMap$1 = global_1.WeakMap;

    var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));

    var keys = shared('keys');

    var sharedKey = function (key) {
      return keys[key] || (keys[key] = uid(key));
    };

    var hiddenKeys = {};

    var WeakMap$2 = global_1.WeakMap;
    var set, get, has$1;

    var enforce = function (it) {
      return has$1(it) ? get(it) : set(it, {});
    };

    var getterFor = function (TYPE) {
      return function (it) {
        var state;
        if (!isObject(it) || (state = get(it)).type !== TYPE) {
          throw TypeError('Incompatible receiver, ' + TYPE + ' required');
        } return state;
      };
    };

    if (nativeWeakMap) {
      var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$2());
      var wmget = store$1.get;
      var wmhas = store$1.has;
      var wmset = store$1.set;
      set = function (it, metadata) {
        metadata.facade = it;
        wmset.call(store$1, it, metadata);
        return metadata;
      };
      get = function (it) {
        return wmget.call(store$1, it) || {};
      };
      has$1 = function (it) {
        return wmhas.call(store$1, it);
      };
    } else {
      var STATE = sharedKey('state');
      hiddenKeys[STATE] = true;
      set = function (it, metadata) {
        metadata.facade = it;
        createNonEnumerableProperty(it, STATE, metadata);
        return metadata;
      };
      get = function (it) {
        return has(it, STATE) ? it[STATE] : {};
      };
      has$1 = function (it) {
        return has(it, STATE);
      };
    }

    var internalState = {
      set: set,
      get: get,
      has: has$1,
      enforce: enforce,
      getterFor: getterFor
    };

    var redefine = createCommonjsModule(function (module) {
    var getInternalState = internalState.get;
    var enforceInternalState = internalState.enforce;
    var TEMPLATE = String(String).split('String');

    (module.exports = function (O, key, value, options) {
      var unsafe = options ? !!options.unsafe : false;
      var simple = options ? !!options.enumerable : false;
      var noTargetGet = options ? !!options.noTargetGet : false;
      var state;
      if (typeof value == 'function') {
        if (typeof key == 'string' && !has(value, 'name')) {
          createNonEnumerableProperty(value, 'name', key);
        }
        state = enforceInternalState(value);
        if (!state.source) {
          state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
        }
      }
      if (O === global_1) {
        if (simple) O[key] = value;
        else setGlobal(key, value);
        return;
      } else if (!unsafe) {
        delete O[key];
      } else if (!noTargetGet && O[key]) {
        simple = true;
      }
      if (simple) O[key] = value;
      else createNonEnumerableProperty(O, key, value);
    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, 'toString', function toString() {
      return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
    });
    });

    var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
    // ES3 wrong here
    var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

    // fallback for IE11 Script Access Denied error
    var tryGet = function (it, key) {
      try {
        return it[key];
      } catch (error) { /* empty */ }
    };

    // getting tag from ES6+ `Object.prototype.toString`
    var classof = toStringTagSupport ? classofRaw : function (it) {
      var O, tag, result;
      return it === undefined ? 'Undefined' : it === null ? 'Null'
        // @@toStringTag case
        : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
        // builtinTag case
        : CORRECT_ARGUMENTS ? classofRaw(O)
        // ES3 arguments fallback
        : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
    };

    // `Object.prototype.toString` method implementation
    // https://tc39.es/ecma262/#sec-object.prototype.tostring
    var objectToString = toStringTagSupport ? {}.toString : function toString() {
      return '[object ' + classof(this) + ']';
    };

    // `Object.prototype.toString` method
    // https://tc39.es/ecma262/#sec-object.prototype.tostring
    if (!toStringTagSupport) {
      redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
    }

    // `RegExp.prototype.flags` getter implementation
    // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
    var regexpFlags = function () {
      var that = anObject(this);
      var result = '';
      if (that.global) result += 'g';
      if (that.ignoreCase) result += 'i';
      if (that.multiline) result += 'm';
      if (that.dotAll) result += 's';
      if (that.unicode) result += 'u';
      if (that.sticky) result += 'y';
      return result;
    };

    var TO_STRING = 'toString';
    var RegExpPrototype = RegExp.prototype;
    var nativeToString = RegExpPrototype[TO_STRING];

    var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
    // FF44- RegExp#toString has a wrong name
    var INCORRECT_NAME = nativeToString.name != TO_STRING;

    // `RegExp.prototype.toString` method
    // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
    if (NOT_GENERIC || INCORRECT_NAME) {
      redefine(RegExp.prototype, TO_STRING, function toString() {
        var R = anObject(this);
        var p = String(R.source);
        var rf = R.flags;
        var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
        return '/' + p + '/' + f;
      }, { unsafe: true });
    }

    var DatePrototype = Date.prototype;
    var INVALID_DATE = 'Invalid Date';
    var TO_STRING$1 = 'toString';
    var nativeDateToString = DatePrototype[TO_STRING$1];
    var getTime = DatePrototype.getTime;

    // `Date.prototype.toString` method
    // https://tc39.es/ecma262/#sec-date.prototype.tostring
    if (new Date(NaN) + '' != INVALID_DATE) {
      redefine(DatePrototype, TO_STRING$1, function toString() {
        var value = getTime.call(this);
        // eslint-disable-next-line no-self-compare -- NaN check
        return value === value ? nativeDateToString.call(this) : INVALID_DATE;
      });
    }

    var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

    // Nashorn ~ JDK8 bug
    var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

    // `Object.prototype.propertyIsEnumerable` method implementation
    // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
    var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor(this, V);
      return !!descriptor && descriptor.enumerable;
    } : nativePropertyIsEnumerable;

    var objectPropertyIsEnumerable = {
    	f: f$1
    };

    var split = ''.split;

    // fallback for non-array-like ES3 and non-enumerable old V8 strings
    var indexedObject = fails(function () {
      // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
      // eslint-disable-next-line no-prototype-builtins -- safe
      return !Object('z').propertyIsEnumerable(0);
    }) ? function (it) {
      return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
    } : Object;

    // `RequireObjectCoercible` abstract operation
    // https://tc39.es/ecma262/#sec-requireobjectcoercible
    var requireObjectCoercible = function (it) {
      if (it == undefined) throw TypeError("Can't call method on " + it);
      return it;
    };

    // toObject with fallback for non-array-like ES3 strings



    var toIndexedObject = function (it) {
      return indexedObject(requireObjectCoercible(it));
    };

    var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
    var f$2 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject(O);
      P = toPrimitive(P, true);
      if (ie8DomDefine) try {
        return nativeGetOwnPropertyDescriptor(O, P);
      } catch (error) { /* empty */ }
      if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
    };

    var objectGetOwnPropertyDescriptor = {
    	f: f$2
    };

    var ceil = Math.ceil;
    var floor = Math.floor;

    // `ToInteger` abstract operation
    // https://tc39.es/ecma262/#sec-tointeger
    var toInteger = function (argument) {
      return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
    };

    var min = Math.min;

    // `ToLength` abstract operation
    // https://tc39.es/ecma262/#sec-tolength
    var toLength = function (argument) {
      return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
    };

    var max = Math.max;
    var min$1 = Math.min;

    // Helper for a popular repeating case of the spec:
    // Let integer be ? ToInteger(index).
    // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
    var toAbsoluteIndex = function (index, length) {
      var integer = toInteger(index);
      return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
    };

    // `Array.prototype.{ indexOf, includes }` methods implementation
    var createMethod = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIndexedObject($this);
        var length = toLength(O.length);
        var index = toAbsoluteIndex(fromIndex, length);
        var value;
        // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare -- NaN check
        if (IS_INCLUDES && el != el) while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare -- NaN check
          if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
        } else for (;length > index; index++) {
          if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
        } return !IS_INCLUDES && -1;
      };
    };

    var arrayIncludes = {
      // `Array.prototype.includes` method
      // https://tc39.es/ecma262/#sec-array.prototype.includes
      includes: createMethod(true),
      // `Array.prototype.indexOf` method
      // https://tc39.es/ecma262/#sec-array.prototype.indexof
      indexOf: createMethod(false)
    };

    var indexOf = arrayIncludes.indexOf;


    var objectKeysInternal = function (object, names) {
      var O = toIndexedObject(object);
      var i = 0;
      var result = [];
      var key;
      for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
      // Don't enum bug & hidden keys
      while (names.length > i) if (has(O, key = names[i++])) {
        ~indexOf(result, key) || result.push(key);
      }
      return result;
    };

    // IE8- don't enum bug keys
    var enumBugKeys = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ];

    var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return objectKeysInternal(O, hiddenKeys$1);
    };

    var objectGetOwnPropertyNames = {
    	f: f$3
    };

    var f$4 = Object.getOwnPropertySymbols;

    var objectGetOwnPropertySymbols = {
    	f: f$4
    };

    // all object keys, includes non-enumerable and symbols
    var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
      var keys = objectGetOwnPropertyNames.f(anObject(it));
      var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
      return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
    };

    var copyConstructorProperties = function (target, source) {
      var keys = ownKeys(source);
      var defineProperty = objectDefineProperty.f;
      var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    };

    var replacement = /#|\.prototype\./;

    var isForced = function (feature, detection) {
      var value = data[normalize(feature)];
      return value == POLYFILL ? true
        : value == NATIVE ? false
        : typeof detection == 'function' ? fails(detection)
        : !!detection;
    };

    var normalize = isForced.normalize = function (string) {
      return String(string).replace(replacement, '.').toLowerCase();
    };

    var data = isForced.data = {};
    var NATIVE = isForced.NATIVE = 'N';
    var POLYFILL = isForced.POLYFILL = 'P';

    var isForced_1 = isForced;

    var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






    /*
      options.target      - name of the target object
      options.global      - target is the global object
      options.stat        - export as static methods of target
      options.proto       - export as prototype methods of target
      options.real        - real prototype method for the `pure` version
      options.forced      - export even if the native feature is available
      options.bind        - bind methods to the target, required for the `pure` version
      options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
      options.unsafe      - use the simple assignment of property instead of delete + defineProperty
      options.sham        - add a flag to not completely full polyfills
      options.enumerable  - export as enumerable property
      options.noTargetGet - prevent calling a getter on target
    */
    var _export = function (options, source) {
      var TARGET = options.target;
      var GLOBAL = options.global;
      var STATIC = options.stat;
      var FORCED, target, key, targetProperty, sourceProperty, descriptor;
      if (GLOBAL) {
        target = global_1;
      } else if (STATIC) {
        target = global_1[TARGET] || setGlobal(TARGET, {});
      } else {
        target = (global_1[TARGET] || {}).prototype;
      }
      if (target) for (key in source) {
        sourceProperty = source[key];
        if (options.noTargetGet) {
          descriptor = getOwnPropertyDescriptor$1(target, key);
          targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
          if (typeof sourceProperty === typeof targetProperty) continue;
          copyConstructorProperties(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || (targetProperty && targetProperty.sham)) {
          createNonEnumerableProperty(sourceProperty, 'sham', true);
        }
        // extend global
        redefine(target, key, sourceProperty, options);
      }
    };

    // `IsArray` abstract operation
    // https://tc39.es/ecma262/#sec-isarray
    var isArray = Array.isArray || function isArray(arg) {
      return classofRaw(arg) == 'Array';
    };

    // `ToObject` abstract operation
    // https://tc39.es/ecma262/#sec-toobject
    var toObject = function (argument) {
      return Object(requireObjectCoercible(argument));
    };

    // `Object.keys` method
    // https://tc39.es/ecma262/#sec-object.keys
    var objectKeys = Object.keys || function keys(O) {
      return objectKeysInternal(O, enumBugKeys);
    };

    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
      anObject(O);
      var keys = objectKeys(Properties);
      var length = keys.length;
      var index = 0;
      var key;
      while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
      return O;
    };

    var html = getBuiltIn('document', 'documentElement');

    var GT = '>';
    var LT = '<';
    var PROTOTYPE = 'prototype';
    var SCRIPT = 'script';
    var IE_PROTO = sharedKey('IE_PROTO');

    var EmptyConstructor = function () { /* empty */ };

    var scriptTag = function (content) {
      return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
    };

    // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
    var NullProtoObjectViaActiveX = function (activeXDocument) {
      activeXDocument.write(scriptTag(''));
      activeXDocument.close();
      var temp = activeXDocument.parentWindow.Object;
      activeXDocument = null; // avoid memory leak
      return temp;
    };

    // Create object with fake `null` prototype: use iframe Object with cleared prototype
    var NullProtoObjectViaIFrame = function () {
      // Thrash, waste and sodomy: IE GC bug
      var iframe = documentCreateElement('iframe');
      var JS = 'java' + SCRIPT + ':';
      var iframeDocument;
      iframe.style.display = 'none';
      html.appendChild(iframe);
      // https://github.com/zloirock/core-js/issues/475
      iframe.src = String(JS);
      iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(scriptTag('document.F=Object'));
      iframeDocument.close();
      return iframeDocument.F;
    };

    // Check for document.domain and active x support
    // No need to use active x approach when document.domain is not set
    // see https://github.com/es-shims/es5-shim/issues/150
    // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
    // avoid IE GC bug
    var activeXDocument;
    var NullProtoObject = function () {
      try {
        /* global ActiveXObject -- old IE */
        activeXDocument = document.domain && new ActiveXObject('htmlfile');
      } catch (error) { /* ignore */ }
      NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
      var length = enumBugKeys.length;
      while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
      return NullProtoObject();
    };

    hiddenKeys[IE_PROTO] = true;

    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    var objectCreate = Object.create || function create(O, Properties) {
      var result;
      if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO] = O;
      } else result = NullProtoObject();
      return Properties === undefined ? result : objectDefineProperties(result, Properties);
    };

    var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

    var toString$1 = {}.toString;

    var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
      ? Object.getOwnPropertyNames(window) : [];

    var getWindowNames = function (it) {
      try {
        return nativeGetOwnPropertyNames(it);
      } catch (error) {
        return windowNames.slice();
      }
    };

    // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
    var f$5 = function getOwnPropertyNames(it) {
      return windowNames && toString$1.call(it) == '[object Window]'
        ? getWindowNames(it)
        : nativeGetOwnPropertyNames(toIndexedObject(it));
    };

    var objectGetOwnPropertyNamesExternal = {
    	f: f$5
    };

    var f$6 = wellKnownSymbol;

    var wellKnownSymbolWrapped = {
    	f: f$6
    };

    var defineProperty = objectDefineProperty.f;

    var defineWellKnownSymbol = function (NAME) {
      var Symbol = path.Symbol || (path.Symbol = {});
      if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
        value: wellKnownSymbolWrapped.f(NAME)
      });
    };

    var defineProperty$1 = objectDefineProperty.f;



    var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

    var setToStringTag = function (it, TAG, STATIC) {
      if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
        defineProperty$1(it, TO_STRING_TAG$2, { configurable: true, value: TAG });
      }
    };

    var aFunction$1 = function (it) {
      if (typeof it != 'function') {
        throw TypeError(String(it) + ' is not a function');
      } return it;
    };

    // optional / simple context binding
    var functionBindContext = function (fn, that, length) {
      aFunction$1(fn);
      if (that === undefined) return fn;
      switch (length) {
        case 0: return function () {
          return fn.call(that);
        };
        case 1: return function (a) {
          return fn.call(that, a);
        };
        case 2: return function (a, b) {
          return fn.call(that, a, b);
        };
        case 3: return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
      }
      return function (/* ...args */) {
        return fn.apply(that, arguments);
      };
    };

    var SPECIES = wellKnownSymbol('species');

    // `ArraySpeciesCreate` abstract operation
    // https://tc39.es/ecma262/#sec-arrayspeciescreate
    var arraySpeciesCreate = function (originalArray, length) {
      var C;
      if (isArray(originalArray)) {
        C = originalArray.constructor;
        // cross-realm fallback
        if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
        else if (isObject(C)) {
          C = C[SPECIES];
          if (C === null) C = undefined;
        }
      } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
    };

    var push = [].push;

    // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
    var createMethod$1 = function (TYPE) {
      var IS_MAP = TYPE == 1;
      var IS_FILTER = TYPE == 2;
      var IS_SOME = TYPE == 3;
      var IS_EVERY = TYPE == 4;
      var IS_FIND_INDEX = TYPE == 6;
      var IS_FILTER_OUT = TYPE == 7;
      var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
      return function ($this, callbackfn, that, specificCreate) {
        var O = toObject($this);
        var self = indexedObject(O);
        var boundFunction = functionBindContext(callbackfn, that, 3);
        var length = toLength(self.length);
        var index = 0;
        var create = specificCreate || arraySpeciesCreate;
        var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
        var value, result;
        for (;length > index; index++) if (NO_HOLES || index in self) {
          value = self[index];
          result = boundFunction(value, index, O);
          if (TYPE) {
            if (IS_MAP) target[index] = result; // map
            else if (result) switch (TYPE) {
              case 3: return true;              // some
              case 5: return value;             // find
              case 6: return index;             // findIndex
              case 2: push.call(target, value); // filter
            } else switch (TYPE) {
              case 4: return false;             // every
              case 7: push.call(target, value); // filterOut
            }
          }
        }
        return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
      };
    };

    var arrayIteration = {
      // `Array.prototype.forEach` method
      // https://tc39.es/ecma262/#sec-array.prototype.foreach
      forEach: createMethod$1(0),
      // `Array.prototype.map` method
      // https://tc39.es/ecma262/#sec-array.prototype.map
      map: createMethod$1(1),
      // `Array.prototype.filter` method
      // https://tc39.es/ecma262/#sec-array.prototype.filter
      filter: createMethod$1(2),
      // `Array.prototype.some` method
      // https://tc39.es/ecma262/#sec-array.prototype.some
      some: createMethod$1(3),
      // `Array.prototype.every` method
      // https://tc39.es/ecma262/#sec-array.prototype.every
      every: createMethod$1(4),
      // `Array.prototype.find` method
      // https://tc39.es/ecma262/#sec-array.prototype.find
      find: createMethod$1(5),
      // `Array.prototype.findIndex` method
      // https://tc39.es/ecma262/#sec-array.prototype.findIndex
      findIndex: createMethod$1(6),
      // `Array.prototype.filterOut` method
      // https://github.com/tc39/proposal-array-filtering
      filterOut: createMethod$1(7)
    };

    var $forEach = arrayIteration.forEach;

    var HIDDEN = sharedKey('hidden');
    var SYMBOL = 'Symbol';
    var PROTOTYPE$1 = 'prototype';
    var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
    var setInternalState = internalState.set;
    var getInternalState = internalState.getterFor(SYMBOL);
    var ObjectPrototype = Object[PROTOTYPE$1];
    var $Symbol = global_1.Symbol;
    var $stringify = getBuiltIn('JSON', 'stringify');
    var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
    var nativeDefineProperty$1 = objectDefineProperty.f;
    var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
    var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
    var AllSymbols = shared('symbols');
    var ObjectPrototypeSymbols = shared('op-symbols');
    var StringToSymbolRegistry = shared('string-to-symbol-registry');
    var SymbolToStringRegistry = shared('symbol-to-string-registry');
    var WellKnownSymbolsStore$1 = shared('wks');
    var QObject = global_1.QObject;
    // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
    var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

    // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
    var setSymbolDescriptor = descriptors && fails(function () {
      return objectCreate(nativeDefineProperty$1({}, 'a', {
        get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
      })).a != 7;
    }) ? function (O, P, Attributes) {
      var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
      if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
      nativeDefineProperty$1(O, P, Attributes);
      if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
        nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
      }
    } : nativeDefineProperty$1;

    var wrap = function (tag, description) {
      var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
      setInternalState(symbol, {
        type: SYMBOL,
        tag: tag,
        description: description
      });
      if (!descriptors) symbol.description = description;
      return symbol;
    };

    var isSymbol = useSymbolAsUid ? function (it) {
      return typeof it == 'symbol';
    } : function (it) {
      return Object(it) instanceof $Symbol;
    };

    var $defineProperty = function defineProperty(O, P, Attributes) {
      if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
      anObject(O);
      var key = toPrimitive(P, true);
      anObject(Attributes);
      if (has(AllSymbols, key)) {
        if (!Attributes.enumerable) {
          if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
          O[HIDDEN][key] = true;
        } else {
          if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
          Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
        } return setSymbolDescriptor(O, key, Attributes);
      } return nativeDefineProperty$1(O, key, Attributes);
    };

    var $defineProperties = function defineProperties(O, Properties) {
      anObject(O);
      var properties = toIndexedObject(Properties);
      var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
      $forEach(keys, function (key) {
        if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
      });
      return O;
    };

    var $create = function create(O, Properties) {
      return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
    };

    var $propertyIsEnumerable = function propertyIsEnumerable(V) {
      var P = toPrimitive(V, true);
      var enumerable = nativePropertyIsEnumerable$1.call(this, P);
      if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
      return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
    };

    var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
      var it = toIndexedObject(O);
      var key = toPrimitive(P, true);
      if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
      var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
      if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
        descriptor.enumerable = true;
      }
      return descriptor;
    };

    var $getOwnPropertyNames = function getOwnPropertyNames(O) {
      var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
      var result = [];
      $forEach(names, function (key) {
        if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
      });
      return result;
    };

    var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
      var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
      var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
      var result = [];
      $forEach(names, function (key) {
        if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
          result.push(AllSymbols[key]);
        }
      });
      return result;
    };

    // `Symbol` constructor
    // https://tc39.es/ecma262/#sec-symbol-constructor
    if (!nativeSymbol) {
      $Symbol = function Symbol() {
        if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
        var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
        var tag = uid(description);
        var setter = function (value) {
          if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
          if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
          setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
        };
        if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
        return wrap(tag, description);
      };

      redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
        return getInternalState(this).tag;
      });

      redefine($Symbol, 'withoutSetter', function (description) {
        return wrap(uid(description), description);
      });

      objectPropertyIsEnumerable.f = $propertyIsEnumerable;
      objectDefineProperty.f = $defineProperty;
      objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
      objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
      objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

      wellKnownSymbolWrapped.f = function (name) {
        return wrap(wellKnownSymbol(name), name);
      };

      if (descriptors) {
        // https://github.com/tc39/proposal-Symbol-description
        nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
          configurable: true,
          get: function description() {
            return getInternalState(this).description;
          }
        });
        {
          redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
        }
      }
    }

    _export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
      Symbol: $Symbol
    });

    $forEach(objectKeys(WellKnownSymbolsStore$1), function (name) {
      defineWellKnownSymbol(name);
    });

    _export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
      // `Symbol.for` method
      // https://tc39.es/ecma262/#sec-symbol.for
      'for': function (key) {
        var string = String(key);
        if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
        var symbol = $Symbol(string);
        StringToSymbolRegistry[string] = symbol;
        SymbolToStringRegistry[symbol] = string;
        return symbol;
      },
      // `Symbol.keyFor` method
      // https://tc39.es/ecma262/#sec-symbol.keyfor
      keyFor: function keyFor(sym) {
        if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
        if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
      },
      useSetter: function () { USE_SETTER = true; },
      useSimple: function () { USE_SETTER = false; }
    });

    _export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
      // `Object.create` method
      // https://tc39.es/ecma262/#sec-object.create
      create: $create,
      // `Object.defineProperty` method
      // https://tc39.es/ecma262/#sec-object.defineproperty
      defineProperty: $defineProperty,
      // `Object.defineProperties` method
      // https://tc39.es/ecma262/#sec-object.defineproperties
      defineProperties: $defineProperties,
      // `Object.getOwnPropertyDescriptor` method
      // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
      getOwnPropertyDescriptor: $getOwnPropertyDescriptor
    });

    _export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
      // `Object.getOwnPropertyNames` method
      // https://tc39.es/ecma262/#sec-object.getownpropertynames
      getOwnPropertyNames: $getOwnPropertyNames,
      // `Object.getOwnPropertySymbols` method
      // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
      getOwnPropertySymbols: $getOwnPropertySymbols
    });

    // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
    // https://bugs.chromium.org/p/v8/issues/detail?id=3443
    _export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
      getOwnPropertySymbols: function getOwnPropertySymbols(it) {
        return objectGetOwnPropertySymbols.f(toObject(it));
      }
    });

    // `JSON.stringify` method behavior with symbols
    // https://tc39.es/ecma262/#sec-json.stringify
    if ($stringify) {
      var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
        var symbol = $Symbol();
        // MS Edge converts symbol values to JSON as {}
        return $stringify([symbol]) != '[null]'
          // WebKit converts symbol values to JSON as null
          || $stringify({ a: symbol }) != '{}'
          // V8 throws on boxed symbols
          || $stringify(Object(symbol)) != '{}';
      });

      _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
        // eslint-disable-next-line no-unused-vars -- required for `.length`
        stringify: function stringify(it, replacer, space) {
          var args = [it];
          var index = 1;
          var $replacer;
          while (arguments.length > index) args.push(arguments[index++]);
          $replacer = replacer;
          if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
          if (!isArray(replacer)) replacer = function (key, value) {
            if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
            if (!isSymbol(value)) return value;
          };
          args[1] = replacer;
          return $stringify.apply(null, args);
        }
      });
    }

    // `Symbol.prototype[@@toPrimitive]` method
    // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
    if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
      createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
    }
    // `Symbol.prototype[@@toStringTag]` property
    // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
    setToStringTag($Symbol, SYMBOL);

    hiddenKeys[HIDDEN] = true;

    var defineProperty$2 = objectDefineProperty.f;


    var NativeSymbol = global_1.Symbol;

    if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
      // Safari 12 bug
      NativeSymbol().description !== undefined
    )) {
      var EmptyStringDescriptionStore = {};
      // wrap Symbol constructor for correct work with undefined description
      var SymbolWrapper = function Symbol() {
        var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
        var result = this instanceof SymbolWrapper
          ? new NativeSymbol(description)
          // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
          : description === undefined ? NativeSymbol() : NativeSymbol(description);
        if (description === '') EmptyStringDescriptionStore[result] = true;
        return result;
      };
      copyConstructorProperties(SymbolWrapper, NativeSymbol);
      var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
      symbolPrototype.constructor = SymbolWrapper;

      var symbolToString = symbolPrototype.toString;
      var native = String(NativeSymbol('test')) == 'Symbol(test)';
      var regexp = /^Symbol\((.*)\)[^)]+$/;
      defineProperty$2(symbolPrototype, 'description', {
        configurable: true,
        get: function description() {
          var symbol = isObject(this) ? this.valueOf() : this;
          var string = symbolToString.call(symbol);
          if (has(EmptyStringDescriptionStore, symbol)) return '';
          var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
          return desc === '' ? undefined : desc;
        }
      });

      _export({ global: true, forced: true }, {
        Symbol: SymbolWrapper
      });
    }

    // `Symbol.iterator` well-known symbol
    // https://tc39.es/ecma262/#sec-symbol.iterator
    defineWellKnownSymbol('iterator');

    // `String.prototype.{ codePointAt, at }` methods implementation
    var createMethod$2 = function (CONVERT_TO_STRING) {
      return function ($this, pos) {
        var S = String(requireObjectCoercible($this));
        var position = toInteger(pos);
        var size = S.length;
        var first, second;
        if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
        first = S.charCodeAt(position);
        return first < 0xD800 || first > 0xDBFF || position + 1 === size
          || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
            ? CONVERT_TO_STRING ? S.charAt(position) : first
            : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
      };
    };

    var stringMultibyte = {
      // `String.prototype.codePointAt` method
      // https://tc39.es/ecma262/#sec-string.prototype.codepointat
      codeAt: createMethod$2(false),
      // `String.prototype.at` method
      // https://github.com/mathiasbynens/String.prototype.at
      charAt: createMethod$2(true)
    };

    var correctPrototypeGetter = !fails(function () {
      function F() { /* empty */ }
      F.prototype.constructor = null;
      return Object.getPrototypeOf(new F()) !== F.prototype;
    });

    var IE_PROTO$1 = sharedKey('IE_PROTO');
    var ObjectPrototype$1 = Object.prototype;

    // `Object.getPrototypeOf` method
    // https://tc39.es/ecma262/#sec-object.getprototypeof
    var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
      O = toObject(O);
      if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
      if (typeof O.constructor == 'function' && O instanceof O.constructor) {
        return O.constructor.prototype;
      } return O instanceof Object ? ObjectPrototype$1 : null;
    };

    var ITERATOR = wellKnownSymbol('iterator');
    var BUGGY_SAFARI_ITERATORS = false;

    var returnThis = function () { return this; };

    // `%IteratorPrototype%` object
    // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
    var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

    if ([].keys) {
      arrayIterator = [].keys();
      // Safari 8 has buggy iterators w/o `next`
      if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
      else {
        PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
        if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
      }
    }

    var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
      var test = {};
      // FF44- legacy iterators case
      return IteratorPrototype[ITERATOR].call(test) !== test;
    });

    if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

    // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
    if ( !has(IteratorPrototype, ITERATOR)) {
      createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
    }

    var iteratorsCore = {
      IteratorPrototype: IteratorPrototype,
      BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
    };

    var iterators = {};

    var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





    var returnThis$1 = function () { return this; };

    var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
      var TO_STRING_TAG = NAME + ' Iterator';
      IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
      setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
      iterators[TO_STRING_TAG] = returnThis$1;
      return IteratorConstructor;
    };

    var aPossiblePrototype = function (it) {
      if (!isObject(it) && it !== null) {
        throw TypeError("Can't set " + String(it) + ' as a prototype');
      } return it;
    };

    /* eslint-disable no-proto -- safe */



    // `Object.setPrototypeOf` method
    // https://tc39.es/ecma262/#sec-object.setprototypeof
    // Works with __proto__ only. Old v8 can't work with null proto objects.
    var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
      var CORRECT_SETTER = false;
      var test = {};
      var setter;
      try {
        setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
        setter.call(test, []);
        CORRECT_SETTER = test instanceof Array;
      } catch (error) { /* empty */ }
      return function setPrototypeOf(O, proto) {
        anObject(O);
        aPossiblePrototype(proto);
        if (CORRECT_SETTER) setter.call(O, proto);
        else O.__proto__ = proto;
        return O;
      };
    }() : undefined);

    var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
    var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
    var ITERATOR$1 = wellKnownSymbol('iterator');
    var KEYS = 'keys';
    var VALUES = 'values';
    var ENTRIES = 'entries';

    var returnThis$2 = function () { return this; };

    var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
      createIteratorConstructor(IteratorConstructor, NAME, next);

      var getIterationMethod = function (KIND) {
        if (KIND === DEFAULT && defaultIterator) return defaultIterator;
        if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
        switch (KIND) {
          case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
          case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
          case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
        } return function () { return new IteratorConstructor(this); };
      };

      var TO_STRING_TAG = NAME + ' Iterator';
      var INCORRECT_VALUES_NAME = false;
      var IterablePrototype = Iterable.prototype;
      var nativeIterator = IterablePrototype[ITERATOR$1]
        || IterablePrototype['@@iterator']
        || DEFAULT && IterablePrototype[DEFAULT];
      var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
      var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
      var CurrentIteratorPrototype, methods, KEY;

      // fix native
      if (anyNativeIterator) {
        CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
        if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
          if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
            if (objectSetPrototypeOf) {
              objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
            } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
              createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
            }
          }
          // Set @@toStringTag to native iterators
          setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
        }
      }

      // fix Array#{values, @@iterator}.name in V8 / FF
      if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return nativeIterator.call(this); };
      }

      // define iterator
      if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
        createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
      }
      iterators[NAME] = defaultIterator;

      // export additional methods
      if (DEFAULT) {
        methods = {
          values: getIterationMethod(VALUES),
          keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
          entries: getIterationMethod(ENTRIES)
        };
        if (FORCED) for (KEY in methods) {
          if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
            redefine(IterablePrototype, KEY, methods[KEY]);
          }
        } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
      }

      return methods;
    };

    var charAt = stringMultibyte.charAt;



    var STRING_ITERATOR = 'String Iterator';
    var setInternalState$1 = internalState.set;
    var getInternalState$1 = internalState.getterFor(STRING_ITERATOR);

    // `String.prototype[@@iterator]` method
    // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
    defineIterator(String, 'String', function (iterated) {
      setInternalState$1(this, {
        type: STRING_ITERATOR,
        string: String(iterated),
        index: 0
      });
    // `%StringIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
    }, function next() {
      var state = getInternalState$1(this);
      var string = state.string;
      var index = state.index;
      var point;
      if (index >= string.length) return { value: undefined, done: true };
      point = charAt(string, index);
      state.index += point.length;
      return { value: point, done: false };
    });

    var UNSCOPABLES = wellKnownSymbol('unscopables');
    var ArrayPrototype = Array.prototype;

    // Array.prototype[@@unscopables]
    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    if (ArrayPrototype[UNSCOPABLES] == undefined) {
      objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
        configurable: true,
        value: objectCreate(null)
      });
    }

    // add a key to Array.prototype[@@unscopables]
    var addToUnscopables = function (key) {
      ArrayPrototype[UNSCOPABLES][key] = true;
    };

    var ARRAY_ITERATOR = 'Array Iterator';
    var setInternalState$2 = internalState.set;
    var getInternalState$2 = internalState.getterFor(ARRAY_ITERATOR);

    // `Array.prototype.entries` method
    // https://tc39.es/ecma262/#sec-array.prototype.entries
    // `Array.prototype.keys` method
    // https://tc39.es/ecma262/#sec-array.prototype.keys
    // `Array.prototype.values` method
    // https://tc39.es/ecma262/#sec-array.prototype.values
    // `Array.prototype[@@iterator]` method
    // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
    // `CreateArrayIterator` internal method
    // https://tc39.es/ecma262/#sec-createarrayiterator
    var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
      setInternalState$2(this, {
        type: ARRAY_ITERATOR,
        target: toIndexedObject(iterated), // target
        index: 0,                          // next index
        kind: kind                         // kind
      });
    // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
    }, function () {
      var state = getInternalState$2(this);
      var target = state.target;
      var kind = state.kind;
      var index = state.index++;
      if (!target || index >= target.length) {
        state.target = undefined;
        return { value: undefined, done: true };
      }
      if (kind == 'keys') return { value: index, done: false };
      if (kind == 'values') return { value: target[index], done: false };
      return { value: [index, target[index]], done: false };
    }, 'values');

    // argumentsList[@@iterator] is %ArrayProto_values%
    // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
    // https://tc39.es/ecma262/#sec-createmappedargumentsobject
    iterators.Arguments = iterators.Array;

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables('keys');
    addToUnscopables('values');
    addToUnscopables('entries');

    // iterable DOM collections
    // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
    var domIterables = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0
    };

    var ITERATOR$2 = wellKnownSymbol('iterator');
    var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
    var ArrayValues = es_array_iterator.values;

    for (var COLLECTION_NAME in domIterables) {
      var Collection = global_1[COLLECTION_NAME];
      var CollectionPrototype = Collection && Collection.prototype;
      if (CollectionPrototype) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
          createNonEnumerableProperty(CollectionPrototype, ITERATOR$2, ArrayValues);
        } catch (error) {
          CollectionPrototype[ITERATOR$2] = ArrayValues;
        }
        if (!CollectionPrototype[TO_STRING_TAG$3]) {
          createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
        }
        if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
          // some Chrome versions have non-configurable methods on DOMTokenList
          if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
            createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
          } catch (error) {
            CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
          }
        }
      }
    }

    var _typeof_1 = createCommonjsModule(function (module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";

      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        module.exports = _typeof = function _typeof(obj) {
          return typeof obj;
        };

        module.exports["default"] = module.exports, module.exports.__esModule = true;
      } else {
        module.exports = _typeof = function _typeof(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        module.exports["default"] = module.exports, module.exports.__esModule = true;
      }

      return _typeof(obj);
    }

    module.exports = _typeof;
    module.exports["default"] = module.exports, module.exports.__esModule = true;
    });

    var _typeof = unwrapExports(_typeof_1);

    var freeGlobal = (typeof commonjsGlobal === "undefined" ? "undefined" : _typeof_1(commonjsGlobal)) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
    var _freeGlobal = freeGlobal;

    var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof_1(self)) == 'object' && self && self.Object === Object && self;
    var root = _freeGlobal || freeSelf || Function('return this')();
    var _root = root;

    var _Symbol = _root.Symbol;
    var _Symbol_1 = _Symbol;

    var objectProto = Object.prototype;
    var hasOwnProperty$1 = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = _Symbol_1 ? _Symbol_1.toStringTag : undefined;

    function getRawTag(value) {
      var isOwn = hasOwnProperty$1.call(value, symToStringTag),
          tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString.call(value);

      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }

      return result;
    }

    var _getRawTag = getRawTag;

    var objectProto$1 = Object.prototype;
    var nativeObjectToString$1 = objectProto$1.toString;

    function objectToString$1(value) {
      return nativeObjectToString$1.call(value);
    }

    var _objectToString = objectToString$1;

    var nullTag = '[object Null]',
        undefinedTag = '[object Undefined]';
    var symToStringTag$1 = _Symbol_1 ? _Symbol_1.toStringTag : undefined;

    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }

      return symToStringTag$1 && symToStringTag$1 in Object(value) ? _getRawTag(value) : _objectToString(value);
    }

    var _baseGetTag = baseGetTag;

    var FAILS_ON_PRIMITIVES = fails(function () { objectGetPrototypeOf(1); });

    // `Object.getPrototypeOf` method
    // https://tc39.es/ecma262/#sec-object.getprototypeof
    _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !correctPrototypeGetter }, {
      getPrototypeOf: function getPrototypeOf(it) {
        return objectGetPrototypeOf(toObject(it));
      }
    });

    function overArg(func, transform) {
      return function (arg) {
        return func(transform(arg));
      };
    }

    var _overArg = overArg;

    var getPrototype = _overArg(Object.getPrototypeOf, Object);
    var _getPrototype = getPrototype;

    function isObjectLike(value) {
      return value != null && _typeof_1(value) == 'object';
    }

    var isObjectLike_1 = isObjectLike;

    var objectTag = '[object Object]';
    var funcProto = Function.prototype,
        objectProto$2 = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
    var objectCtorString = funcToString.call(Object);

    function isPlainObject(value) {
      if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag) {
        return false;
      }

      var proto = _getPrototype(value);

      if (proto === null) {
        return true;
      }

      var Ctor = hasOwnProperty$2.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
    }

    var isPlainObject_1 = isPlainObject;

    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    _export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
      defineProperty: objectDefineProperty.f
    });

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _typeof$1(obj) {
      "@babel/helpers - typeof";

      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof$1 = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof$1 = function _typeof(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof$1(obj);
    }

    // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
    // so we use an intermediate function.
    function RE(s, f) {
      return RegExp(s, f);
    }

    var UNSUPPORTED_Y = fails(function () {
      // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
      var re = RE('a', 'y');
      re.lastIndex = 2;
      return re.exec('abcd') != null;
    });

    var BROKEN_CARET = fails(function () {
      // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
      var re = RE('^r', 'gy');
      re.lastIndex = 2;
      return re.exec('str') != null;
    });

    var regexpStickyHelpers = {
    	UNSUPPORTED_Y: UNSUPPORTED_Y,
    	BROKEN_CARET: BROKEN_CARET
    };

    var nativeExec = RegExp.prototype.exec;
    // This always refers to the native implementation, because the
    // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
    // which loads this file before patching the method.
    var nativeReplace = String.prototype.replace;

    var patchedExec = nativeExec;

    var UPDATES_LAST_INDEX_WRONG = (function () {
      var re1 = /a/;
      var re2 = /b*/g;
      nativeExec.call(re1, 'a');
      nativeExec.call(re2, 'a');
      return re1.lastIndex !== 0 || re2.lastIndex !== 0;
    })();

    var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

    // nonparticipating capturing group, copied from es5-shim's String#split patch.
    // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
    var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

    var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

    if (PATCH) {
      patchedExec = function exec(str) {
        var re = this;
        var lastIndex, reCopy, match, i;
        var sticky = UNSUPPORTED_Y$1 && re.sticky;
        var flags = regexpFlags.call(re);
        var source = re.source;
        var charsAdded = 0;
        var strCopy = str;

        if (sticky) {
          flags = flags.replace('y', '');
          if (flags.indexOf('g') === -1) {
            flags += 'g';
          }

          strCopy = String(str).slice(re.lastIndex);
          // Support anchored sticky behavior.
          if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
            source = '(?: ' + source + ')';
            strCopy = ' ' + strCopy;
            charsAdded++;
          }
          // ^(? + rx + ) is needed, in combination with some str slicing, to
          // simulate the 'y' flag.
          reCopy = new RegExp('^(?:' + source + ')', flags);
        }

        if (NPCG_INCLUDED) {
          reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
        }
        if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

        match = nativeExec.call(sticky ? reCopy : re, strCopy);

        if (sticky) {
          if (match) {
            match.input = match.input.slice(charsAdded);
            match[0] = match[0].slice(charsAdded);
            match.index = re.lastIndex;
            re.lastIndex += match[0].length;
          } else re.lastIndex = 0;
        } else if (UPDATES_LAST_INDEX_WRONG && match) {
          re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
        }
        if (NPCG_INCLUDED && match && match.length > 1) {
          // Fix browsers whose `exec` methods don't consistently return `undefined`
          // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
          nativeReplace.call(match[0], reCopy, function () {
            for (i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undefined) match[i] = undefined;
            }
          });
        }

        return match;
      };
    }

    var regexpExec = patchedExec;

    // `RegExp.prototype.exec` method
    // https://tc39.es/ecma262/#sec-regexp.prototype.exec
    _export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
      exec: regexpExec
    });

    // TODO: Remove from `core-js@4` since it's moved to entry points







    var SPECIES$1 = wellKnownSymbol('species');

    var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
      // #replace needs built-in support for named groups.
      // #match works fine because it just return the exec results, even if it has
      // a "grops" property.
      var re = /./;
      re.exec = function () {
        var result = [];
        result.groups = { a: '7' };
        return result;
      };
      return ''.replace(re, '$<a>') !== '7';
    });

    // IE <= 11 replaces $0 with the whole match, as if it was $&
    // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
    var REPLACE_KEEPS_$0 = (function () {
      return 'a'.replace(/./, '$0') === '$0';
    })();

    var REPLACE = wellKnownSymbol('replace');
    // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
    var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
      if (/./[REPLACE]) {
        return /./[REPLACE]('a', '$0') === '';
      }
      return false;
    })();

    // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
    // Weex JS has frozen built-in prototypes, so use try / catch wrapper
    var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
      // eslint-disable-next-line regexp/no-empty-group -- required for testing
      var re = /(?:)/;
      var originalExec = re.exec;
      re.exec = function () { return originalExec.apply(this, arguments); };
      var result = 'ab'.split(re);
      return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
    });

    var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
      var SYMBOL = wellKnownSymbol(KEY);

      var DELEGATES_TO_SYMBOL = !fails(function () {
        // String methods call symbol-named RegEp methods
        var O = {};
        O[SYMBOL] = function () { return 7; };
        return ''[KEY](O) != 7;
      });

      var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
        // Symbol-named RegExp methods call .exec
        var execCalled = false;
        var re = /a/;

        if (KEY === 'split') {
          // We can't use real regex here since it causes deoptimization
          // and serious performance degradation in V8
          // https://github.com/zloirock/core-js/issues/306
          re = {};
          // RegExp[@@split] doesn't call the regex's exec method, but first creates
          // a new one. We need to return the patched regex when creating the new one.
          re.constructor = {};
          re.constructor[SPECIES$1] = function () { return re; };
          re.flags = '';
          re[SYMBOL] = /./[SYMBOL];
        }

        re.exec = function () { execCalled = true; return null; };

        re[SYMBOL]('');
        return !execCalled;
      });

      if (
        !DELEGATES_TO_SYMBOL ||
        !DELEGATES_TO_EXEC ||
        (KEY === 'replace' && !(
          REPLACE_SUPPORTS_NAMED_GROUPS &&
          REPLACE_KEEPS_$0 &&
          !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
        )) ||
        (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
      ) {
        var nativeRegExpMethod = /./[SYMBOL];
        var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
          if (regexp.exec === regexpExec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              // The native String method already delegates to @@method (this
              // polyfilled function), leasing to infinite recursion.
              // We avoid it by directly calling the native @@method method.
              return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
            }
            return { done: true, value: nativeMethod.call(str, regexp, arg2) };
          }
          return { done: false };
        }, {
          REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
          REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
        });
        var stringMethod = methods[0];
        var regexMethod = methods[1];

        redefine(String.prototype, KEY, stringMethod);
        redefine(RegExp.prototype, SYMBOL, length == 2
          // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
          // 21.2.5.11 RegExp.prototype[@@split](string, limit)
          ? function (string, arg) { return regexMethod.call(string, this, arg); }
          // 21.2.5.6 RegExp.prototype[@@match](string)
          // 21.2.5.9 RegExp.prototype[@@search](string)
          : function (string) { return regexMethod.call(string, this); }
        );
      }

      if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
    };

    var charAt$1 = stringMultibyte.charAt;

    // `AdvanceStringIndex` abstract operation
    // https://tc39.es/ecma262/#sec-advancestringindex
    var advanceStringIndex = function (S, index, unicode) {
      return index + (unicode ? charAt$1(S, index).length : 1);
    };

    var floor$1 = Math.floor;
    var replace = ''.replace;
    var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
    var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

    // https://tc39.es/ecma262/#sec-getsubstitution
    var getSubstitution = function (matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
      if (namedCaptures !== undefined) {
        namedCaptures = toObject(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
      }
      return replace.call(replacement, symbols, function (match, ch) {
        var capture;
        switch (ch.charAt(0)) {
          case '$': return '$';
          case '&': return matched;
          case '`': return str.slice(0, position);
          case "'": return str.slice(tailPos);
          case '<':
            capture = namedCaptures[ch.slice(1, -1)];
            break;
          default: // \d\d?
            var n = +ch;
            if (n === 0) return match;
            if (n > m) {
              var f = floor$1(n / 10);
              if (f === 0) return match;
              if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
              return match;
            }
            capture = captures[n - 1];
        }
        return capture === undefined ? '' : capture;
      });
    };

    // `RegExpExec` abstract operation
    // https://tc39.es/ecma262/#sec-regexpexec
    var regexpExecAbstract = function (R, S) {
      var exec = R.exec;
      if (typeof exec === 'function') {
        var result = exec.call(R, S);
        if (typeof result !== 'object') {
          throw TypeError('RegExp exec method returned something other than an Object or null');
        }
        return result;
      }

      if (classofRaw(R) !== 'RegExp') {
        throw TypeError('RegExp#exec called on incompatible receiver');
      }

      return regexpExec.call(R, S);
    };

    var max$1 = Math.max;
    var min$2 = Math.min;

    var maybeToString = function (it) {
      return it === undefined ? it : String(it);
    };

    // @@replace logic
    fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
      var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
      var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
      var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

      return [
        // `String.prototype.replace` method
        // https://tc39.es/ecma262/#sec-string.prototype.replace
        function replace(searchValue, replaceValue) {
          var O = requireObjectCoercible(this);
          var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
          return replacer !== undefined
            ? replacer.call(searchValue, O, replaceValue)
            : nativeReplace.call(String(O), searchValue, replaceValue);
        },
        // `RegExp.prototype[@@replace]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
        function (regexp, replaceValue) {
          if (
            (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
            (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
          ) {
            var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
            if (res.done) return res.value;
          }

          var rx = anObject(regexp);
          var S = String(this);

          var functionalReplace = typeof replaceValue === 'function';
          if (!functionalReplace) replaceValue = String(replaceValue);

          var global = rx.global;
          if (global) {
            var fullUnicode = rx.unicode;
            rx.lastIndex = 0;
          }
          var results = [];
          while (true) {
            var result = regexpExecAbstract(rx, S);
            if (result === null) break;

            results.push(result);
            if (!global) break;

            var matchStr = String(result[0]);
            if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          }

          var accumulatedResult = '';
          var nextSourcePosition = 0;
          for (var i = 0; i < results.length; i++) {
            result = results[i];

            var matched = String(result[0]);
            var position = max$1(min$2(toInteger(result.index), S.length), 0);
            var captures = [];
            // NOTE: This is equivalent to
            //   captures = result.slice(1).map(maybeToString)
            // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
            // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
            // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
            for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
            var namedCaptures = result.groups;
            if (functionalReplace) {
              var replacerArgs = [matched].concat(captures, position, S);
              if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
              var replacement = String(replaceValue.apply(undefined, replacerArgs));
            } else {
              replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
            }
            if (position >= nextSourcePosition) {
              accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
              nextSourcePosition = position + matched.length;
            }
          }
          return accumulatedResult + S.slice(nextSourcePosition);
        }
      ];
    });

    // makes subclassing work correct for wrapped built-ins
    var inheritIfRequired = function ($this, dummy, Wrapper) {
      var NewTarget, NewTargetPrototype;
      if (
        // it can work only with native `setPrototypeOf`
        objectSetPrototypeOf &&
        // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
        typeof (NewTarget = dummy.constructor) == 'function' &&
        NewTarget !== Wrapper &&
        isObject(NewTargetPrototype = NewTarget.prototype) &&
        NewTargetPrototype !== Wrapper.prototype
      ) objectSetPrototypeOf($this, NewTargetPrototype);
      return $this;
    };

    var MATCH = wellKnownSymbol('match');

    // `IsRegExp` abstract operation
    // https://tc39.es/ecma262/#sec-isregexp
    var isRegexp = function (it) {
      var isRegExp;
      return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
    };

    var SPECIES$2 = wellKnownSymbol('species');

    var setSpecies = function (CONSTRUCTOR_NAME) {
      var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
      var defineProperty = objectDefineProperty.f;

      if (descriptors && Constructor && !Constructor[SPECIES$2]) {
        defineProperty(Constructor, SPECIES$2, {
          configurable: true,
          get: function () { return this; }
        });
      }
    };

    var defineProperty$3 = objectDefineProperty.f;
    var getOwnPropertyNames = objectGetOwnPropertyNames.f;





    var setInternalState$3 = internalState.set;



    var MATCH$1 = wellKnownSymbol('match');
    var NativeRegExp = global_1.RegExp;
    var RegExpPrototype$1 = NativeRegExp.prototype;
    var re1 = /a/g;
    var re2 = /a/g;

    // "new" should create a new object, old webkit bug
    var CORRECT_NEW = new NativeRegExp(re1) !== re1;

    var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y;

    var FORCED = descriptors && isForced_1('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y$2 || fails(function () {
      re2[MATCH$1] = false;
      // RegExp constructor can alter flags and IsRegExp works correct with @@match
      return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
    })));

    // `RegExp` constructor
    // https://tc39.es/ecma262/#sec-regexp-constructor
    if (FORCED) {
      var RegExpWrapper = function RegExp(pattern, flags) {
        var thisIsRegExp = this instanceof RegExpWrapper;
        var patternIsRegExp = isRegexp(pattern);
        var flagsAreUndefined = flags === undefined;
        var sticky;

        if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
          return pattern;
        }

        if (CORRECT_NEW) {
          if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
        } else if (pattern instanceof RegExpWrapper) {
          if (flagsAreUndefined) flags = regexpFlags.call(pattern);
          pattern = pattern.source;
        }

        if (UNSUPPORTED_Y$2) {
          sticky = !!flags && flags.indexOf('y') > -1;
          if (sticky) flags = flags.replace(/y/g, '');
        }

        var result = inheritIfRequired(
          CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
          thisIsRegExp ? this : RegExpPrototype$1,
          RegExpWrapper
        );

        if (UNSUPPORTED_Y$2 && sticky) setInternalState$3(result, { sticky: sticky });

        return result;
      };
      var proxy = function (key) {
        key in RegExpWrapper || defineProperty$3(RegExpWrapper, key, {
          configurable: true,
          get: function () { return NativeRegExp[key]; },
          set: function (it) { NativeRegExp[key] = it; }
        });
      };
      var keys$1 = getOwnPropertyNames(NativeRegExp);
      var index = 0;
      while (keys$1.length > index) proxy(keys$1[index++]);
      RegExpPrototype$1.constructor = RegExpWrapper;
      RegExpWrapper.prototype = RegExpPrototype$1;
      redefine(global_1, 'RegExp', RegExpWrapper);
    }

    // https://tc39.es/ecma262/#sec-get-regexp-@@species
    setSpecies('RegExp');

    var SPECIES$3 = wellKnownSymbol('species');

    var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
      // We can't use this feature detection in V8 since it causes
      // deoptimization and serious performance degradation
      // https://github.com/zloirock/core-js/issues/677
      return engineV8Version >= 51 || !fails(function () {
        var array = [];
        var constructor = array.constructor = {};
        constructor[SPECIES$3] = function () {
          return { foo: 1 };
        };
        return array[METHOD_NAME](Boolean).foo !== 1;
      });
    };

    var $map = arrayIteration.map;


    var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    // with adding support of @@species
    _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
      map: function map(callbackfn /* , thisArg */) {
        return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var iteratorClose = function (iterator) {
      var returnMethod = iterator['return'];
      if (returnMethod !== undefined) {
        return anObject(returnMethod.call(iterator)).value;
      }
    };

    // call something on iterator step with safe closing on error
    var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
      try {
        return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
      // 7.4.6 IteratorClose(iterator, completion)
      } catch (error) {
        iteratorClose(iterator);
        throw error;
      }
    };

    var ITERATOR$3 = wellKnownSymbol('iterator');
    var ArrayPrototype$1 = Array.prototype;

    // check on default Array iterator
    var isArrayIteratorMethod = function (it) {
      return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$3] === it);
    };

    var createProperty = function (object, key, value) {
      var propertyKey = toPrimitive(key);
      if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
      else object[propertyKey] = value;
    };

    var ITERATOR$4 = wellKnownSymbol('iterator');

    var getIteratorMethod = function (it) {
      if (it != undefined) return it[ITERATOR$4]
        || it['@@iterator']
        || iterators[classof(it)];
    };

    // `Array.from` method implementation
    // https://tc39.es/ecma262/#sec-array.from
    var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
      var O = toObject(arrayLike);
      var C = typeof this == 'function' ? this : Array;
      var argumentsLength = arguments.length;
      var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
      var mapping = mapfn !== undefined;
      var iteratorMethod = getIteratorMethod(O);
      var index = 0;
      var length, result, step, iterator, next, value;
      if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
      // if the target is not iterable or it's an array with the default iterator - use a simple case
      if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
        iterator = iteratorMethod.call(O);
        next = iterator.next;
        result = new C();
        for (;!(step = next.call(iterator)).done; index++) {
          value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
          createProperty(result, index, value);
        }
      } else {
        length = toLength(O.length);
        result = new C(length);
        for (;length > index; index++) {
          value = mapping ? mapfn(O[index], index) : O[index];
          createProperty(result, index, value);
        }
      }
      result.length = index;
      return result;
    };

    var ITERATOR$5 = wellKnownSymbol('iterator');
    var SAFE_CLOSING = false;

    try {
      var called = 0;
      var iteratorWithReturn = {
        next: function () {
          return { done: !!called++ };
        },
        'return': function () {
          SAFE_CLOSING = true;
        }
      };
      iteratorWithReturn[ITERATOR$5] = function () {
        return this;
      };
      // eslint-disable-next-line no-throw-literal -- required for testing
      Array.from(iteratorWithReturn, function () { throw 2; });
    } catch (error) { /* empty */ }

    var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
      if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
      var ITERATION_SUPPORT = false;
      try {
        var object = {};
        object[ITERATOR$5] = function () {
          return {
            next: function () {
              return { done: ITERATION_SUPPORT = true };
            }
          };
        };
        exec(object);
      } catch (error) { /* empty */ }
      return ITERATION_SUPPORT;
    };

    var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
      Array.from(iterable);
    });

    // `Array.from` method
    // https://tc39.es/ecma262/#sec-array.from
    _export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
      from: arrayFrom
    });

    var nativeAssign = Object.assign;
    var defineProperty$4 = Object.defineProperty;

    // `Object.assign` method
    // https://tc39.es/ecma262/#sec-object.assign
    var objectAssign = !nativeAssign || fails(function () {
      // should have correct order of operations (Edge bug)
      if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$4({}, 'a', {
        enumerable: true,
        get: function () {
          defineProperty$4(this, 'b', {
            value: 3,
            enumerable: false
          });
        }
      }), { b: 2 })).b !== 1) return true;
      // should work with symbols and should have deterministic property order (V8 bug)
      var A = {};
      var B = {};
      /* global Symbol -- required for testing */
      var symbol = Symbol();
      var alphabet = 'abcdefghijklmnopqrst';
      A[symbol] = 7;
      alphabet.split('').forEach(function (chr) { B[chr] = chr; });
      return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
    }) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
      var T = toObject(target);
      var argumentsLength = arguments.length;
      var index = 1;
      var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
      var propertyIsEnumerable = objectPropertyIsEnumerable.f;
      while (argumentsLength > index) {
        var S = indexedObject(arguments[index++]);
        var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
        var length = keys.length;
        var j = 0;
        var key;
        while (length > j) {
          key = keys[j++];
          if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
        }
      } return T;
    } : nativeAssign;

    // `Object.assign` method
    // https://tc39.es/ecma262/#sec-object.assign
    _export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
      assign: objectAssign
    });

    var SPECIES$4 = wellKnownSymbol('species');

    // `SpeciesConstructor` abstract operation
    // https://tc39.es/ecma262/#sec-speciesconstructor
    var speciesConstructor = function (O, defaultConstructor) {
      var C = anObject(O).constructor;
      var S;
      return C === undefined || (S = anObject(C)[SPECIES$4]) == undefined ? defaultConstructor : aFunction$1(S);
    };

    var arrayPush = [].push;
    var min$3 = Math.min;
    var MAX_UINT32 = 0xFFFFFFFF;

    // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
    var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

    // @@split logic
    fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
      var internalSplit;
      if (
        'abbc'.split(/(b)*/)[1] == 'c' ||
        // eslint-disable-next-line regexp/no-empty-group -- required for testing
        'test'.split(/(?:)/, -1).length != 4 ||
        'ab'.split(/(?:ab)*/).length != 2 ||
        '.'.split(/(.?)(.?)/).length != 4 ||
        // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
        '.'.split(/()()/).length > 1 ||
        ''.split(/.?/).length
      ) {
        // based on es5-shim implementation, need to rework it
        internalSplit = function (separator, limit) {
          var string = String(requireObjectCoercible(this));
          var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
          if (lim === 0) return [];
          if (separator === undefined) return [string];
          // If `separator` is not a regex, use native split
          if (!isRegexp(separator)) {
            return nativeSplit.call(string, separator, lim);
          }
          var output = [];
          var flags = (separator.ignoreCase ? 'i' : '') +
                      (separator.multiline ? 'm' : '') +
                      (separator.unicode ? 'u' : '') +
                      (separator.sticky ? 'y' : '');
          var lastLastIndex = 0;
          // Make `global` and avoid `lastIndex` issues by working with a copy
          var separatorCopy = new RegExp(separator.source, flags + 'g');
          var match, lastIndex, lastLength;
          while (match = regexpExec.call(separatorCopy, string)) {
            lastIndex = separatorCopy.lastIndex;
            if (lastIndex > lastLastIndex) {
              output.push(string.slice(lastLastIndex, match.index));
              if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
              lastLength = match[0].length;
              lastLastIndex = lastIndex;
              if (output.length >= lim) break;
            }
            if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
          }
          if (lastLastIndex === string.length) {
            if (lastLength || !separatorCopy.test('')) output.push('');
          } else output.push(string.slice(lastLastIndex));
          return output.length > lim ? output.slice(0, lim) : output;
        };
      // Chakra, V8
      } else if ('0'.split(undefined, 0).length) {
        internalSplit = function (separator, limit) {
          return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
        };
      } else internalSplit = nativeSplit;

      return [
        // `String.prototype.split` method
        // https://tc39.es/ecma262/#sec-string.prototype.split
        function split(separator, limit) {
          var O = requireObjectCoercible(this);
          var splitter = separator == undefined ? undefined : separator[SPLIT];
          return splitter !== undefined
            ? splitter.call(separator, O, limit)
            : internalSplit.call(String(O), separator, limit);
        },
        // `RegExp.prototype[@@split]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
        //
        // NOTE: This cannot be properly polyfilled in engines that don't support
        // the 'y' flag.
        function (regexp, limit) {
          var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
          if (res.done) return res.value;

          var rx = anObject(regexp);
          var S = String(this);
          var C = speciesConstructor(rx, RegExp);

          var unicodeMatching = rx.unicode;
          var flags = (rx.ignoreCase ? 'i' : '') +
                      (rx.multiline ? 'm' : '') +
                      (rx.unicode ? 'u' : '') +
                      (SUPPORTS_Y ? 'y' : 'g');

          // ^(? + rx + ) is needed, in combination with some S slicing, to
          // simulate the 'y' flag.
          var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
          var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
          if (lim === 0) return [];
          if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
          var p = 0;
          var q = 0;
          var A = [];
          while (q < S.length) {
            splitter.lastIndex = SUPPORTS_Y ? q : 0;
            var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
            var e;
            if (
              z === null ||
              (e = min$3(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
            ) {
              q = advanceStringIndex(S, q, unicodeMatching);
            } else {
              A.push(S.slice(p, q));
              if (A.length === lim) return A;
              for (var i = 1; i <= z.length - 1; i++) {
                A.push(z[i]);
                if (A.length === lim) return A;
              }
              q = p = e;
            }
          }
          A.push(S.slice(p));
          return A;
        }
      ];
    }, !SUPPORTS_Y);

    // a string of all valid unicode whitespaces
    var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
      '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

    var whitespace = '[' + whitespaces + ']';
    var ltrim = RegExp('^' + whitespace + whitespace + '*');
    var rtrim = RegExp(whitespace + whitespace + '*$');

    // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
    var createMethod$3 = function (TYPE) {
      return function ($this) {
        var string = String(requireObjectCoercible($this));
        if (TYPE & 1) string = string.replace(ltrim, '');
        if (TYPE & 2) string = string.replace(rtrim, '');
        return string;
      };
    };

    var stringTrim = {
      // `String.prototype.{ trimLeft, trimStart }` methods
      // https://tc39.es/ecma262/#sec-string.prototype.trimstart
      start: createMethod$3(1),
      // `String.prototype.{ trimRight, trimEnd }` methods
      // https://tc39.es/ecma262/#sec-string.prototype.trimend
      end: createMethod$3(2),
      // `String.prototype.trim` method
      // https://tc39.es/ecma262/#sec-string.prototype.trim
      trim: createMethod$3(3)
    };

    var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
    var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
    var defineProperty$5 = objectDefineProperty.f;
    var trim = stringTrim.trim;

    var NUMBER = 'Number';
    var NativeNumber = global_1[NUMBER];
    var NumberPrototype = NativeNumber.prototype;

    // Opera ~12 has broken Object#toString
    var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER;

    // `ToNumber` abstract operation
    // https://tc39.es/ecma262/#sec-tonumber
    var toNumber = function (argument) {
      var it = toPrimitive(argument, false);
      var first, third, radix, maxCode, digits, length, index, code;
      if (typeof it == 'string' && it.length > 2) {
        it = trim(it);
        first = it.charCodeAt(0);
        if (first === 43 || first === 45) {
          third = it.charCodeAt(2);
          if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
        } else if (first === 48) {
          switch (it.charCodeAt(1)) {
            case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
            case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
            default: return +it;
          }
          digits = it.slice(2);
          length = digits.length;
          for (index = 0; index < length; index++) {
            code = digits.charCodeAt(index);
            // parseInt parses a string to a first unavailable symbol
            // but ToNumber should return NaN if a string contains unavailable symbols
            if (code < 48 || code > maxCode) return NaN;
          } return parseInt(digits, radix);
        }
      } return +it;
    };

    // `Number` constructor
    // https://tc39.es/ecma262/#sec-number-constructor
    if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
      var NumberWrapper = function Number(value) {
        var it = arguments.length < 1 ? 0 : value;
        var dummy = this;
        return dummy instanceof NumberWrapper
          // check on 1..constructor(foo) case
          && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classofRaw(dummy) != NUMBER)
            ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
      };
      for (var keys$2 = descriptors ? getOwnPropertyNames$1(NativeNumber) : (
        // ES3:
        'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
        // ES2015 (in case, if modules with ES2015 Number statics required before):
        'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
        'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,' +
        // ESNext
        'fromString,range'
      ).split(','), j = 0, key; keys$2.length > j; j++) {
        if (has(NativeNumber, key = keys$2[j]) && !has(NumberWrapper, key)) {
          defineProperty$5(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
        }
      }
      NumberWrapper.prototype = NumberPrototype;
      NumberPrototype.constructor = NumberWrapper;
      redefine(global_1, NUMBER, NumberWrapper);
    }

    var FAILS_ON_PRIMITIVES$1 = fails(function () { objectKeys(1); });

    // `Object.keys` method
    // https://tc39.es/ecma262/#sec-object.keys
    _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
      keys: function keys(it) {
        return objectKeys(toObject(it));
      }
    });

    var $filter = arrayIteration.filter;


    var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('filter');

    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    // with adding support of @@species
    _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
      filter: function filter(callbackfn /* , thisArg */) {
        return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;


    var FAILS_ON_PRIMITIVES$2 = fails(function () { nativeGetOwnPropertyDescriptor$2(1); });
    var FORCED$1 = !descriptors || FAILS_ON_PRIMITIVES$2;

    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
    _export({ target: 'Object', stat: true, forced: FORCED$1, sham: !descriptors }, {
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
        return nativeGetOwnPropertyDescriptor$2(toIndexedObject(it), key);
      }
    });

    var arrayMethodIsStrict = function (METHOD_NAME, argument) {
      var method = [][METHOD_NAME];
      return !!method && fails(function () {
        // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
        method.call(null, argument || function () { throw 1; }, 1);
      });
    };

    var $forEach$1 = arrayIteration.forEach;


    var STRICT_METHOD = arrayMethodIsStrict('forEach');

    // `Array.prototype.forEach` method implementation
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
      return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    } : [].forEach;

    for (var COLLECTION_NAME$1 in domIterables) {
      var Collection$1 = global_1[COLLECTION_NAME$1];
      var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype$1 && CollectionPrototype$1.forEach !== arrayForEach) try {
        createNonEnumerableProperty(CollectionPrototype$1, 'forEach', arrayForEach);
      } catch (error) {
        CollectionPrototype$1.forEach = arrayForEach;
      }
    }

    // `Object.getOwnPropertyDescriptors` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
    _export({ target: 'Object', stat: true, sham: !descriptors }, {
      getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
        var O = toIndexedObject(object);
        var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
        var keys = ownKeys(O);
        var result = {};
        var index = 0;
        var key, descriptor;
        while (keys.length > index) {
          descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
          if (descriptor !== undefined) createProperty(result, key, descriptor);
        }
        return result;
      }
    });

    function debounce(func, delay) {
      var debounceTimer;
      return function () {
        var context = this;
        var args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () {
          return func.apply(context, args);
        }, delay);
      };
    }

    function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
    function getParameterByName(name, url) {
      if (!url) {
        url = window.location.href;
      }

      if (!name) return;
      name = name.replace(/[[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    function selectorHelper(_ref, callback) {
      var selector = _ref.selector,
          defaultSelector = _ref.defaultSelector;

      if (selector instanceof Element) {
        return callback(selector);
      } else if (selector instanceof NodeList) {
        return Array.from(selector).map(function (element) {
          return callback(element);
        });
      } else {
        var modifiedSelector = isPlainObject_1(selector) ? defaultSelector : selector || defaultSelector;
        var listOfDropdowns = Array.from(document.querySelectorAll(modifiedSelector));
        return listOfDropdowns.length === 1 ? callback(listOfDropdowns[0]) : listOfDropdowns.map(function (dropdown) {
          return callback(dropdown);
        });
      }
    }
    function flattenObject(ob, prefix) {
      var toReturn = {};
      prefix = prefix ? prefix + "." : "";

      for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if (_typeof$1(ob[i]) === "object" && ob[i] !== null) {
          Object.assign(toReturn, flattenObject(ob[i], prefix + i));
        } else {
          toReturn[prefix + i] = ob[i];
        }
      }

      return toReturn;
    }
    function unflattenObject(ob) {
      var result = {};

      var _loop = function _loop(i) {
        if (ob.hasOwnProperty(i)) {
          var keys = i.split(".");
          keys.reduce(function (r, e, j) {
            return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? keys.length - 1 === j ? ob[i] : {} : []);
          }, result);
        }
      };

      for (var i in ob) {
        _loop(i);
      }

      return result;
    }
    function deepSpread() {
      for (var _len = arguments.length, objs = new Array(_len), _key = 0; _key < _len; _key++) {
        objs[_key] = arguments[_key];
      }

      var flatenedObjs = objs.map(function (object) {
        return flattenObject(object);
      });
      var mergedFlatObjs = flatenedObjs.reduce(function (prev, cur) {
        return _objectSpread(_objectSpread({}, prev), cur);
      }, {});
      return unflattenObject(mergedFlatObjs);
    }

    var slice = [].slice;
    var factories = {};

    var construct = function (C, argsLength, args) {
      if (!(argsLength in factories)) {
        for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
        // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only
        factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
      } return factories[argsLength](C, args);
    };

    // `Function.prototype.bind` method implementation
    // https://tc39.es/ecma262/#sec-function.prototype.bind
    var functionBind = Function.bind || function bind(that /* , ...args */) {
      var fn = aFunction$1(this);
      var partArgs = slice.call(arguments, 1);
      var boundFunction = function bound(/* args... */) {
        var args = partArgs.concat(slice.call(arguments));
        return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
      };
      if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
      return boundFunction;
    };

    var nativeConstruct = getBuiltIn('Reflect', 'construct');

    // `Reflect.construct` method
    // https://tc39.es/ecma262/#sec-reflect.construct
    // MS Edge supports only 2 arguments and argumentsList argument is optional
    // FF Nightly sets third argument as `new.target`, but does not create `this` from it
    var NEW_TARGET_BUG = fails(function () {
      function F() { /* empty */ }
      return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
    });
    var ARGS_BUG = !fails(function () {
      nativeConstruct(function () { /* empty */ });
    });
    var FORCED$2 = NEW_TARGET_BUG || ARGS_BUG;

    _export({ target: 'Reflect', stat: true, forced: FORCED$2, sham: FORCED$2 }, {
      construct: function construct(Target, args /* , newTarget */) {
        aFunction$1(Target);
        anObject(args);
        var newTarget = arguments.length < 3 ? Target : aFunction$1(arguments[2]);
        if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
        if (Target == newTarget) {
          // w/o altered newTarget, optimization for 0-4 arguments
          switch (args.length) {
            case 0: return new Target();
            case 1: return new Target(args[0]);
            case 2: return new Target(args[0], args[1]);
            case 3: return new Target(args[0], args[1], args[2]);
            case 4: return new Target(args[0], args[1], args[2], args[3]);
          }
          // w/o altered newTarget, lot of arguments case
          var $args = [null];
          $args.push.apply($args, args);
          return new (functionBind.apply(Target, $args))();
        }
        // with altered newTarget, not support built-in constructors
        var proto = newTarget.prototype;
        var instance = objectCreate(isObject(proto) ? proto : Object.prototype);
        var result = Function.apply.call(Target, instance, args);
        return isObject(result) ? result : instance;
      }
    });

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    _export({ target: 'Object', stat: true, sham: !descriptors }, {
      create: objectCreate
    });

    // `Object.setPrototypeOf` method
    // https://tc39.es/ecma262/#sec-object.setprototypeof
    _export({ target: 'Object', stat: true }, {
      setPrototypeOf: objectSetPrototypeOf
    });

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }

      return _assertThisInitialized(self);
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf(o);
    }

    var $find = arrayIteration.find;


    var FIND = 'find';
    var SKIPS_HOLES = true;

    // Shouldn't skip holes
    if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    _export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
      find: function find(callbackfn /* , that = undefined */) {
        return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables(FIND);

    var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
    var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
    var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/679
    var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
      var array = [];
      array[IS_CONCAT_SPREADABLE] = false;
      return array.concat()[0] !== array;
    });

    var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

    var isConcatSpreadable = function (O) {
      if (!isObject(O)) return false;
      var spreadable = O[IS_CONCAT_SPREADABLE];
      return spreadable !== undefined ? !!spreadable : isArray(O);
    };

    var FORCED$3 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

    // `Array.prototype.concat` method
    // https://tc39.es/ecma262/#sec-array.prototype.concat
    // with adding support of @@isConcatSpreadable and @@species
    _export({ target: 'Array', proto: true, forced: FORCED$3 }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      concat: function concat(arg) {
        var O = toObject(this);
        var A = arraySpeciesCreate(O, 0);
        var n = 0;
        var i, k, length, len, E;
        for (i = -1, length = arguments.length; i < length; i++) {
          E = i === -1 ? O : arguments[i];
          if (isConcatSpreadable(E)) {
            len = toLength(E.length);
            if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
            for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
          } else {
            if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
            createProperty(A, n++, E);
          }
        }
        A.length = n;
        return A;
      }
    });

    var $indexOf = arrayIncludes.indexOf;


    var nativeIndexOf = [].indexOf;

    var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
    var STRICT_METHOD$1 = arrayMethodIsStrict('indexOf');

    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    _export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$1 }, {
      indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
        return NEGATIVE_ZERO
          // convert -0 to +0
          ? nativeIndexOf.apply(this, arguments) || 0
          : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var nativePromiseConstructor = global_1.Promise;

    var redefineAll = function (target, src, options) {
      for (var key in src) redefine(target, key, src[key], options);
      return target;
    };

    var anInstance = function (it, Constructor, name) {
      if (!(it instanceof Constructor)) {
        throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
      } return it;
    };

    var Result = function (stopped, result) {
      this.stopped = stopped;
      this.result = result;
    };

    var iterate = function (iterable, unboundFunction, options) {
      var that = options && options.that;
      var AS_ENTRIES = !!(options && options.AS_ENTRIES);
      var IS_ITERATOR = !!(options && options.IS_ITERATOR);
      var INTERRUPTED = !!(options && options.INTERRUPTED);
      var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
      var iterator, iterFn, index, length, result, next, step;

      var stop = function (condition) {
        if (iterator) iteratorClose(iterator);
        return new Result(true, condition);
      };

      var callFn = function (value) {
        if (AS_ENTRIES) {
          anObject(value);
          return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
        } return INTERRUPTED ? fn(value, stop) : fn(value);
      };

      if (IS_ITERATOR) {
        iterator = iterable;
      } else {
        iterFn = getIteratorMethod(iterable);
        if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
        // optimisation for array iterators
        if (isArrayIteratorMethod(iterFn)) {
          for (index = 0, length = toLength(iterable.length); length > index; index++) {
            result = callFn(iterable[index]);
            if (result && result instanceof Result) return result;
          } return new Result(false);
        }
        iterator = iterFn.call(iterable);
      }

      next = iterator.next;
      while (!(step = next.call(iterator)).done) {
        try {
          result = callFn(step.value);
        } catch (error) {
          iteratorClose(iterator);
          throw error;
        }
        if (typeof result == 'object' && result && result instanceof Result) return result;
      } return new Result(false);
    };

    var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

    var location = global_1.location;
    var set$1 = global_1.setImmediate;
    var clear = global_1.clearImmediate;
    var process$1 = global_1.process;
    var MessageChannel = global_1.MessageChannel;
    var Dispatch = global_1.Dispatch;
    var counter = 0;
    var queue = {};
    var ONREADYSTATECHANGE = 'onreadystatechange';
    var defer, channel, port;

    var run = function (id) {
      // eslint-disable-next-line no-prototype-builtins -- safe
      if (queue.hasOwnProperty(id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    };

    var runner = function (id) {
      return function () {
        run(id);
      };
    };

    var listener = function (event) {
      run(event.data);
    };

    var post = function (id) {
      // old engines have not location.origin
      global_1.postMessage(id + '', location.protocol + '//' + location.host);
    };

    // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
    if (!set$1 || !clear) {
      set$1 = function setImmediate(fn) {
        var args = [];
        var i = 1;
        while (arguments.length > i) args.push(arguments[i++]);
        queue[++counter] = function () {
          // eslint-disable-next-line no-new-func -- spec requirement
          (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
        };
        defer(counter);
        return counter;
      };
      clear = function clearImmediate(id) {
        delete queue[id];
      };
      // Node.js 0.8-
      if (engineIsNode) {
        defer = function (id) {
          process$1.nextTick(runner(id));
        };
      // Sphere (JS game engine) Dispatch API
      } else if (Dispatch && Dispatch.now) {
        defer = function (id) {
          Dispatch.now(runner(id));
        };
      // Browsers with MessageChannel, includes WebWorkers
      // except iOS - https://github.com/zloirock/core-js/issues/624
      } else if (MessageChannel && !engineIsIos) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = listener;
        defer = functionBindContext(port.postMessage, port, 1);
      // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
      } else if (
        global_1.addEventListener &&
        typeof postMessage == 'function' &&
        !global_1.importScripts &&
        location && location.protocol !== 'file:' &&
        !fails(post)
      ) {
        defer = post;
        global_1.addEventListener('message', listener, false);
      // IE8-
      } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
        defer = function (id) {
          html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
            html.removeChild(this);
            run(id);
          };
        };
      // Rest old browsers
      } else {
        defer = function (id) {
          setTimeout(runner(id), 0);
        };
      }
    }

    var task = {
      set: set$1,
      clear: clear
    };

    var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(engineUserAgent);

    var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
    var macrotask = task.set;




    var MutationObserver$1 = global_1.MutationObserver || global_1.WebKitMutationObserver;
    var document$2 = global_1.document;
    var process$2 = global_1.process;
    var Promise$1 = global_1.Promise;
    // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
    var queueMicrotaskDescriptor = getOwnPropertyDescriptor$3(global_1, 'queueMicrotask');
    var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

    var flush, head, last, notify, toggle, node, promise, then;

    // modern engines have queueMicrotask method
    if (!queueMicrotask) {
      flush = function () {
        var parent, fn;
        if (engineIsNode && (parent = process$2.domain)) parent.exit();
        while (head) {
          fn = head.fn;
          head = head.next;
          try {
            fn();
          } catch (error) {
            if (head) notify();
            else last = undefined;
            throw error;
          }
        } last = undefined;
        if (parent) parent.enter();
      };

      // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
      // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
      if (!engineIsIos && !engineIsNode && !engineIsWebosWebkit && MutationObserver$1 && document$2) {
        toggle = true;
        node = document$2.createTextNode('');
        new MutationObserver$1(flush).observe(node, { characterData: true });
        notify = function () {
          node.data = toggle = !toggle;
        };
      // environments with maybe non-completely correct, but existent Promise
      } else if (Promise$1 && Promise$1.resolve) {
        // Promise.resolve without an argument throws an error in LG WebOS 2
        promise = Promise$1.resolve(undefined);
        then = promise.then;
        notify = function () {
          then.call(promise, flush);
        };
      // Node.js without promises
      } else if (engineIsNode) {
        notify = function () {
          process$2.nextTick(flush);
        };
      // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessag
      // - onreadystatechange
      // - setTimeout
      } else {
        notify = function () {
          // strange IE + webpack dev server bug - use .call(global)
          macrotask.call(global_1, flush);
        };
      }
    }

    var microtask = queueMicrotask || function (fn) {
      var task = { fn: fn, next: undefined };
      if (last) last.next = task;
      if (!head) {
        head = task;
        notify();
      } last = task;
    };

    var PromiseCapability = function (C) {
      var resolve, reject;
      this.promise = new C(function ($$resolve, $$reject) {
        if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
        resolve = $$resolve;
        reject = $$reject;
      });
      this.resolve = aFunction$1(resolve);
      this.reject = aFunction$1(reject);
    };

    // 25.4.1.5 NewPromiseCapability(C)
    var f$7 = function (C) {
      return new PromiseCapability(C);
    };

    var newPromiseCapability = {
    	f: f$7
    };

    var promiseResolve = function (C, x) {
      anObject(C);
      if (isObject(x) && x.constructor === C) return x;
      var promiseCapability = newPromiseCapability.f(C);
      var resolve = promiseCapability.resolve;
      resolve(x);
      return promiseCapability.promise;
    };

    var hostReportErrors = function (a, b) {
      var console = global_1.console;
      if (console && console.error) {
        arguments.length === 1 ? console.error(a) : console.error(a, b);
      }
    };

    var perform = function (exec) {
      try {
        return { error: false, value: exec() };
      } catch (error) {
        return { error: true, value: error };
      }
    };

    var task$1 = task.set;











    var SPECIES$5 = wellKnownSymbol('species');
    var PROMISE = 'Promise';
    var getInternalState$3 = internalState.get;
    var setInternalState$4 = internalState.set;
    var getInternalPromiseState = internalState.getterFor(PROMISE);
    var PromiseConstructor = nativePromiseConstructor;
    var TypeError$1 = global_1.TypeError;
    var document$3 = global_1.document;
    var process$3 = global_1.process;
    var $fetch = getBuiltIn('fetch');
    var newPromiseCapability$1 = newPromiseCapability.f;
    var newGenericPromiseCapability = newPromiseCapability$1;
    var DISPATCH_EVENT = !!(document$3 && document$3.createEvent && global_1.dispatchEvent);
    var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
    var UNHANDLED_REJECTION = 'unhandledrejection';
    var REJECTION_HANDLED = 'rejectionhandled';
    var PENDING = 0;
    var FULFILLED = 1;
    var REJECTED = 2;
    var HANDLED = 1;
    var UNHANDLED = 2;
    var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

    var FORCED$4 = isForced_1(PROMISE, function () {
      var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
      if (!GLOBAL_CORE_JS_PROMISE) {
        // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
        // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
        // We can't detect it synchronously, so just check versions
        if (engineV8Version === 66) return true;
        // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
        if (!engineIsNode && !NATIVE_REJECTION_EVENT) return true;
      }
      // We can't use @@species feature detection in V8 since it causes
      // deoptimization and performance degradation
      // https://github.com/zloirock/core-js/issues/679
      if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
      // Detect correctness of subclassing with @@species support
      var promise = PromiseConstructor.resolve(1);
      var FakePromise = function (exec) {
        exec(function () { /* empty */ }, function () { /* empty */ });
      };
      var constructor = promise.constructor = {};
      constructor[SPECIES$5] = FakePromise;
      return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
    });

    var INCORRECT_ITERATION$1 = FORCED$4 || !checkCorrectnessOfIteration(function (iterable) {
      PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
    });

    // helpers
    var isThenable = function (it) {
      var then;
      return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
    };

    var notify$1 = function (state, isReject) {
      if (state.notified) return;
      state.notified = true;
      var chain = state.reactions;
      microtask(function () {
        var value = state.value;
        var ok = state.state == FULFILLED;
        var index = 0;
        // variable length - can't use forEach
        while (chain.length > index) {
          var reaction = chain[index++];
          var handler = ok ? reaction.ok : reaction.fail;
          var resolve = reaction.resolve;
          var reject = reaction.reject;
          var domain = reaction.domain;
          var result, then, exited;
          try {
            if (handler) {
              if (!ok) {
                if (state.rejection === UNHANDLED) onHandleUnhandled(state);
                state.rejection = HANDLED;
              }
              if (handler === true) result = value;
              else {
                if (domain) domain.enter();
                result = handler(value); // can throw
                if (domain) {
                  domain.exit();
                  exited = true;
                }
              }
              if (result === reaction.promise) {
                reject(TypeError$1('Promise-chain cycle'));
              } else if (then = isThenable(result)) {
                then.call(result, resolve, reject);
              } else resolve(result);
            } else reject(value);
          } catch (error) {
            if (domain && !exited) domain.exit();
            reject(error);
          }
        }
        state.reactions = [];
        state.notified = false;
        if (isReject && !state.rejection) onUnhandled(state);
      });
    };

    var dispatchEvent = function (name, promise, reason) {
      var event, handler;
      if (DISPATCH_EVENT) {
        event = document$3.createEvent('Event');
        event.promise = promise;
        event.reason = reason;
        event.initEvent(name, false, true);
        global_1.dispatchEvent(event);
      } else event = { promise: promise, reason: reason };
      if (!NATIVE_REJECTION_EVENT && (handler = global_1['on' + name])) handler(event);
      else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
    };

    var onUnhandled = function (state) {
      task$1.call(global_1, function () {
        var promise = state.facade;
        var value = state.value;
        var IS_UNHANDLED = isUnhandled(state);
        var result;
        if (IS_UNHANDLED) {
          result = perform(function () {
            if (engineIsNode) {
              process$3.emit('unhandledRejection', value, promise);
            } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
          });
          // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
          state.rejection = engineIsNode || isUnhandled(state) ? UNHANDLED : HANDLED;
          if (result.error) throw result.value;
        }
      });
    };

    var isUnhandled = function (state) {
      return state.rejection !== HANDLED && !state.parent;
    };

    var onHandleUnhandled = function (state) {
      task$1.call(global_1, function () {
        var promise = state.facade;
        if (engineIsNode) {
          process$3.emit('rejectionHandled', promise);
        } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
      });
    };

    var bind = function (fn, state, unwrap) {
      return function (value) {
        fn(state, value, unwrap);
      };
    };

    var internalReject = function (state, value, unwrap) {
      if (state.done) return;
      state.done = true;
      if (unwrap) state = unwrap;
      state.value = value;
      state.state = REJECTED;
      notify$1(state, true);
    };

    var internalResolve = function (state, value, unwrap) {
      if (state.done) return;
      state.done = true;
      if (unwrap) state = unwrap;
      try {
        if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
        var then = isThenable(value);
        if (then) {
          microtask(function () {
            var wrapper = { done: false };
            try {
              then.call(value,
                bind(internalResolve, wrapper, state),
                bind(internalReject, wrapper, state)
              );
            } catch (error) {
              internalReject(wrapper, error, state);
            }
          });
        } else {
          state.value = value;
          state.state = FULFILLED;
          notify$1(state, false);
        }
      } catch (error) {
        internalReject({ done: false }, error, state);
      }
    };

    // constructor polyfill
    if (FORCED$4) {
      // 25.4.3.1 Promise(executor)
      PromiseConstructor = function Promise(executor) {
        anInstance(this, PromiseConstructor, PROMISE);
        aFunction$1(executor);
        Internal.call(this);
        var state = getInternalState$3(this);
        try {
          executor(bind(internalResolve, state), bind(internalReject, state));
        } catch (error) {
          internalReject(state, error);
        }
      };
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      Internal = function Promise(executor) {
        setInternalState$4(this, {
          type: PROMISE,
          done: false,
          notified: false,
          parent: false,
          reactions: [],
          rejection: false,
          state: PENDING,
          value: undefined
        });
      };
      Internal.prototype = redefineAll(PromiseConstructor.prototype, {
        // `Promise.prototype.then` method
        // https://tc39.es/ecma262/#sec-promise.prototype.then
        then: function then(onFulfilled, onRejected) {
          var state = getInternalPromiseState(this);
          var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
          reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
          reaction.fail = typeof onRejected == 'function' && onRejected;
          reaction.domain = engineIsNode ? process$3.domain : undefined;
          state.parent = true;
          state.reactions.push(reaction);
          if (state.state != PENDING) notify$1(state, false);
          return reaction.promise;
        },
        // `Promise.prototype.catch` method
        // https://tc39.es/ecma262/#sec-promise.prototype.catch
        'catch': function (onRejected) {
          return this.then(undefined, onRejected);
        }
      });
      OwnPromiseCapability = function () {
        var promise = new Internal();
        var state = getInternalState$3(promise);
        this.promise = promise;
        this.resolve = bind(internalResolve, state);
        this.reject = bind(internalReject, state);
      };
      newPromiseCapability.f = newPromiseCapability$1 = function (C) {
        return C === PromiseConstructor || C === PromiseWrapper
          ? new OwnPromiseCapability(C)
          : newGenericPromiseCapability(C);
      };

      if ( typeof nativePromiseConstructor == 'function') {
        nativeThen = nativePromiseConstructor.prototype.then;

        // wrap native Promise#then for native async functions
        redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
          var that = this;
          return new PromiseConstructor(function (resolve, reject) {
            nativeThen.call(that, resolve, reject);
          }).then(onFulfilled, onRejected);
        // https://github.com/zloirock/core-js/issues/640
        }, { unsafe: true });

        // wrap fetch result
        if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
          // eslint-disable-next-line no-unused-vars -- required for `.length`
          fetch: function fetch(input /* , init */) {
            return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
          }
        });
      }
    }

    _export({ global: true, wrap: true, forced: FORCED$4 }, {
      Promise: PromiseConstructor
    });

    setToStringTag(PromiseConstructor, PROMISE, false);
    setSpecies(PROMISE);

    PromiseWrapper = getBuiltIn(PROMISE);

    // statics
    _export({ target: PROMISE, stat: true, forced: FORCED$4 }, {
      // `Promise.reject` method
      // https://tc39.es/ecma262/#sec-promise.reject
      reject: function reject(r) {
        var capability = newPromiseCapability$1(this);
        capability.reject.call(undefined, r);
        return capability.promise;
      }
    });

    _export({ target: PROMISE, stat: true, forced:  FORCED$4 }, {
      // `Promise.resolve` method
      // https://tc39.es/ecma262/#sec-promise.resolve
      resolve: function resolve(x) {
        return promiseResolve( this, x);
      }
    });

    _export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION$1 }, {
      // `Promise.all` method
      // https://tc39.es/ecma262/#sec-promise.all
      all: function all(iterable) {
        var C = this;
        var capability = newPromiseCapability$1(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform(function () {
          var $promiseResolve = aFunction$1(C.resolve);
          var values = [];
          var counter = 0;
          var remaining = 1;
          iterate(iterable, function (promise) {
            var index = counter++;
            var alreadyCalled = false;
            values.push(undefined);
            remaining++;
            $promiseResolve.call(C, promise).then(function (value) {
              if (alreadyCalled) return;
              alreadyCalled = true;
              values[index] = value;
              --remaining || resolve(values);
            }, reject);
          });
          --remaining || resolve(values);
        });
        if (result.error) reject(result.value);
        return capability.promise;
      },
      // `Promise.race` method
      // https://tc39.es/ecma262/#sec-promise.race
      race: function race(iterable) {
        var C = this;
        var capability = newPromiseCapability$1(C);
        var reject = capability.reject;
        var result = perform(function () {
          var $promiseResolve = aFunction$1(C.resolve);
          iterate(iterable, function (promise) {
            $promiseResolve.call(C, promise).then(capability.resolve, reject);
          });
        });
        if (result.error) reject(result.value);
        return capability.promise;
      }
    });

    var slice$1 = [].slice;
    var MSIE = /MSIE .\./.test(engineUserAgent); // <- dirty ie9- check

    var wrap$1 = function (scheduler) {
      return function (handler, timeout /* , ...arguments */) {
        var boundArgs = arguments.length > 2;
        var args = boundArgs ? slice$1.call(arguments, 2) : undefined;
        return scheduler(boundArgs ? function () {
          // eslint-disable-next-line no-new-func -- spec requirement
          (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
        } : handler, timeout);
      };
    };

    // ie9- setTimeout & setInterval additional parameters fix
    // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
    _export({ global: true, bind: true, forced: MSIE }, {
      // `setTimeout` method
      // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
      setTimeout: wrap$1(global_1.setTimeout),
      // `setInterval` method
      // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
      setInterval: wrap$1(global_1.setInterval)
    });

    var trim$1 = stringTrim.trim;


    var $parseFloat = global_1.parseFloat;
    var FORCED$5 = 1 / $parseFloat(whitespaces + '-0') !== -Infinity;

    // `parseFloat` method
    // https://tc39.es/ecma262/#sec-parsefloat-string
    var numberParseFloat = FORCED$5 ? function parseFloat(string) {
      var trimmedString = trim$1(String(string));
      var result = $parseFloat(trimmedString);
      return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
    } : $parseFloat;

    // `parseFloat` method
    // https://tc39.es/ecma262/#sec-parsefloat-string
    _export({ global: true, forced: parseFloat != numberParseFloat }, {
      parseFloat: numberParseFloat
    });

    var trim$2 = stringTrim.trim;


    var $parseInt = global_1.parseInt;
    var hex = /^[+-]?0[Xx]/;
    var FORCED$6 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;

    // `parseInt` method
    // https://tc39.es/ecma262/#sec-parseint-string-radix
    var numberParseInt = FORCED$6 ? function parseInt(string, radix) {
      var S = trim$2(String(string));
      return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
    } : $parseInt;

    // `parseInt` method
    // https://tc39.es/ecma262/#sec-parseint-string-radix
    _export({ global: true, forced: parseInt != numberParseInt }, {
      parseInt: numberParseInt
    });

    var test$1 = [];
    var nativeSort = test$1.sort;

    // IE8-
    var FAILS_ON_UNDEFINED = fails(function () {
      test$1.sort(undefined);
    });
    // V8 bug
    var FAILS_ON_NULL = fails(function () {
      test$1.sort(null);
    });
    // Old WebKit
    var STRICT_METHOD$2 = arrayMethodIsStrict('sort');

    var FORCED$7 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$2;

    // `Array.prototype.sort` method
    // https://tc39.es/ecma262/#sec-array.prototype.sort
    _export({ target: 'Array', proto: true, forced: FORCED$7 }, {
      sort: function sort(comparefn) {
        return comparefn === undefined
          ? nativeSort.call(toObject(this))
          : nativeSort.call(toObject(this), aFunction$1(comparefn));
      }
    });

    var $findIndex = arrayIteration.findIndex;


    var FIND_INDEX = 'findIndex';
    var SKIPS_HOLES$1 = true;

    // Shouldn't skip holes
    if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES$1 = false; });

    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findindex
    _export({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 }, {
      findIndex: function findIndex(callbackfn /* , that = undefined */) {
        return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables(FIND_INDEX);

    var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('slice');

    var SPECIES$6 = wellKnownSymbol('species');
    var nativeSlice = [].slice;
    var max$2 = Math.max;

    // `Array.prototype.slice` method
    // https://tc39.es/ecma262/#sec-array.prototype.slice
    // fallback for not array-like ES3 strings and DOM objects
    _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
      slice: function slice(start, end) {
        var O = toIndexedObject(this);
        var length = toLength(O.length);
        var k = toAbsoluteIndex(start, length);
        var fin = toAbsoluteIndex(end === undefined ? length : end, length);
        // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
        var Constructor, result, n;
        if (isArray(O)) {
          Constructor = O.constructor;
          // cross-realm fallback
          if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
            Constructor = undefined;
          } else if (isObject(Constructor)) {
            Constructor = Constructor[SPECIES$6];
            if (Constructor === null) Constructor = undefined;
          }
          if (Constructor === Array || Constructor === undefined) {
            return nativeSlice.call(O, k, fin);
          }
        }
        result = new (Constructor === undefined ? Array : Constructor)(max$2(fin - k, 0));
        for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
        result.length = n;
        return result;
      }
    });

    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    _export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
      forEach: arrayForEach
    });

    var $some = arrayIteration.some;


    var STRICT_METHOD$3 = arrayMethodIsStrict('some');

    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    _export({ target: 'Array', proto: true, forced: !STRICT_METHOD$3 }, {
      some: function some(callbackfn /* , thisArg */) {
        return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var defineProperty$6 = objectDefineProperty.f;

    var FunctionPrototype = Function.prototype;
    var FunctionPrototypeToString = FunctionPrototype.toString;
    var nameRE = /^\s*function ([^ (]*)/;
    var NAME = 'name';

    // Function instances `.name` property
    // https://tc39.es/ecma262/#sec-function-instances-name
    if (descriptors && !(NAME in FunctionPrototype)) {
      defineProperty$6(FunctionPrototype, NAME, {
        configurable: true,
        get: function () {
          try {
            return FunctionPrototypeToString.call(this).match(nameRE)[1];
          } catch (error) {
            return '';
          }
        }
      });
    }

    var nativeReverse = [].reverse;
    var test$2 = [1, 2];

    // `Array.prototype.reverse` method
    // https://tc39.es/ecma262/#sec-array.prototype.reverse
    // fix for Safari 12.0 bug
    // https://bugs.webkit.org/show_bug.cgi?id=188794
    _export({ target: 'Array', proto: true, forced: String(test$2) === String(test$2.reverse()) }, {
      reverse: function reverse() {
        // eslint-disable-next-line no-self-assign -- dirty hack
        if (isArray(this)) this.length = this.length;
        return nativeReverse.call(this);
      }
    });

    // @@match logic
    fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
      return [
        // `String.prototype.match` method
        // https://tc39.es/ecma262/#sec-string.prototype.match
        function match(regexp) {
          var O = requireObjectCoercible(this);
          var matcher = regexp == undefined ? undefined : regexp[MATCH];
          return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
        },
        // `RegExp.prototype[@@match]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
        function (regexp) {
          var res = maybeCallNative(nativeMatch, regexp, this);
          if (res.done) return res.value;

          var rx = anObject(regexp);
          var S = String(this);

          if (!rx.global) return regexpExecAbstract(rx, S);

          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
          var A = [];
          var n = 0;
          var result;
          while ((result = regexpExecAbstract(rx, S)) !== null) {
            var matchStr = String(result[0]);
            A[n] = matchStr;
            if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
            n++;
          }
          return n === 0 ? null : A;
        }
      ];
    });

    var non = '\u200B\u0085\u180E';

    // check that a method works with the correct list
    // of whitespaces and has a correct name
    var stringTrimForced = function (METHOD_NAME) {
      return fails(function () {
        return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
      });
    };

    var $trim = stringTrim.trim;


    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    _export({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
      trim: function trim() {
        return $trim(this);
      }
    });

    // `SameValue` abstract operation
    // https://tc39.es/ecma262/#sec-samevalue
    var sameValue = Object.is || function is(x, y) {
      // eslint-disable-next-line no-self-compare -- NaN check
      return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
    };

    // @@search logic
    fixRegexpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
      return [
        // `String.prototype.search` method
        // https://tc39.es/ecma262/#sec-string.prototype.search
        function search(regexp) {
          var O = requireObjectCoercible(this);
          var searcher = regexp == undefined ? undefined : regexp[SEARCH];
          return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
        },
        // `RegExp.prototype[@@search]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
        function (regexp) {
          var res = maybeCallNative(nativeSearch, regexp, this);
          if (res.done) return res.value;

          var rx = anObject(regexp);
          var S = String(this);

          var previousLastIndex = rx.lastIndex;
          if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
          var result = regexpExecAbstract(rx, S);
          if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
          return result === null ? -1 : result.index;
        }
      ];
    });

    // `Array.prototype.{ reduce, reduceRight }` methods implementation
    var createMethod$4 = function (IS_RIGHT) {
      return function (that, callbackfn, argumentsLength, memo) {
        aFunction$1(callbackfn);
        var O = toObject(that);
        var self = indexedObject(O);
        var length = toLength(O.length);
        var index = IS_RIGHT ? length - 1 : 0;
        var i = IS_RIGHT ? -1 : 1;
        if (argumentsLength < 2) while (true) {
          if (index in self) {
            memo = self[index];
            index += i;
            break;
          }
          index += i;
          if (IS_RIGHT ? index < 0 : length <= index) {
            throw TypeError('Reduce of empty array with no initial value');
          }
        }
        for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
          memo = callbackfn(memo, self[index], index, O);
        }
        return memo;
      };
    };

    var arrayReduce = {
      // `Array.prototype.reduce` method
      // https://tc39.es/ecma262/#sec-array.prototype.reduce
      left: createMethod$4(false),
      // `Array.prototype.reduceRight` method
      // https://tc39.es/ecma262/#sec-array.prototype.reduceright
      right: createMethod$4(true)
    };

    var $reduce = arrayReduce.left;




    var STRICT_METHOD$4 = arrayMethodIsStrict('reduce');
    // Chrome 80-82 has a critical bug
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
    var CHROME_BUG = !engineIsNode && engineV8Version > 79 && engineV8Version < 83;

    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    _export({ target: 'Array', proto: true, forced: !STRICT_METHOD$4 || CHROME_BUG }, {
      reduce: function reduce(callbackfn /* , initialValue */) {
        return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    // `Function.prototype.bind` method
    // https://tc39.es/ecma262/#sec-function.prototype.bind
    _export({ target: 'Function', proto: true }, {
      bind: functionBind
    });

    /**!
     * @fileOverview Kickass library to create and place poppers near their reference elements.
     * @version 1.16.1
     * @license
     * Copyright (c) 2016 Federico Zivolo and contributors
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

    var timeoutDuration = function () {
      var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];

      for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
        if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
          return 1;
        }
      }

      return 0;
    }();

    function microtaskDebounce(fn) {
      var called = false;
      return function () {
        if (called) {
          return;
        }

        called = true;
        window.Promise.resolve().then(function () {
          called = false;
          fn();
        });
      };
    }

    function taskDebounce(fn) {
      var scheduled = false;
      return function () {
        if (!scheduled) {
          scheduled = true;
          setTimeout(function () {
            scheduled = false;
            fn();
          }, timeoutDuration);
        }
      };
    }

    var supportsMicroTasks = isBrowser && window.Promise;
    var debounce$1 = supportsMicroTasks ? microtaskDebounce : taskDebounce;

    function isFunction(functionToCheck) {
      var getType = {};
      return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }

    function getStyleComputedProperty(element, property) {
      if (element.nodeType !== 1) {
        return [];
      }

      var window = element.ownerDocument.defaultView;
      var css = window.getComputedStyle(element, null);
      return property ? css[property] : css;
    }

    function getParentNode(element) {
      if (element.nodeName === 'HTML') {
        return element;
      }

      return element.parentNode || element.host;
    }

    function getScrollParent(element) {
      if (!element) {
        return document.body;
      }

      switch (element.nodeName) {
        case 'HTML':
        case 'BODY':
          return element.ownerDocument.body;

        case '#document':
          return element.body;
      }

      var _getStyleComputedProp = getStyleComputedProperty(element),
          overflow = _getStyleComputedProp.overflow,
          overflowX = _getStyleComputedProp.overflowX,
          overflowY = _getStyleComputedProp.overflowY;

      if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
        return element;
      }

      return getScrollParent(getParentNode(element));
    }

    function getReferenceNode(reference) {
      return reference && reference.referenceNode ? reference.referenceNode : reference;
    }

    var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
    var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

    function isIE(version) {
      if (version === 11) {
        return isIE11;
      }

      if (version === 10) {
        return isIE10;
      }

      return isIE11 || isIE10;
    }

    function getOffsetParent(element) {
      if (!element) {
        return document.documentElement;
      }

      var noOffsetParent = isIE(10) ? document.body : null;
      var offsetParent = element.offsetParent || null;

      while (offsetParent === noOffsetParent && element.nextElementSibling) {
        offsetParent = (element = element.nextElementSibling).offsetParent;
      }

      var nodeName = offsetParent && offsetParent.nodeName;

      if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
        return element ? element.ownerDocument.documentElement : document.documentElement;
      }

      if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
        return getOffsetParent(offsetParent);
      }

      return offsetParent;
    }

    function isOffsetContainer(element) {
      var nodeName = element.nodeName;

      if (nodeName === 'BODY') {
        return false;
      }

      return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
    }

    function getRoot(node) {
      if (node.parentNode !== null) {
        return getRoot(node.parentNode);
      }

      return node;
    }

    function findCommonOffsetParent(element1, element2) {
      if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
        return document.documentElement;
      }

      var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
      var start = order ? element1 : element2;
      var end = order ? element2 : element1;
      var range = document.createRange();
      range.setStart(start, 0);
      range.setEnd(end, 0);
      var commonAncestorContainer = range.commonAncestorContainer;

      if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
        if (isOffsetContainer(commonAncestorContainer)) {
          return commonAncestorContainer;
        }

        return getOffsetParent(commonAncestorContainer);
      }

      var element1root = getRoot(element1);

      if (element1root.host) {
        return findCommonOffsetParent(element1root.host, element2);
      } else {
        return findCommonOffsetParent(element1, getRoot(element2).host);
      }
    }

    function getScroll(element) {
      var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
      var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
      var nodeName = element.nodeName;

      if (nodeName === 'BODY' || nodeName === 'HTML') {
        var html = element.ownerDocument.documentElement;
        var scrollingElement = element.ownerDocument.scrollingElement || html;
        return scrollingElement[upperSide];
      }

      return element[upperSide];
    }

    function includeScroll(rect, element) {
      var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      var modifier = subtract ? -1 : 1;
      rect.top += scrollTop * modifier;
      rect.bottom += scrollTop * modifier;
      rect.left += scrollLeft * modifier;
      rect.right += scrollLeft * modifier;
      return rect;
    }

    function getBordersSize(styles, axis) {
      var sideA = axis === 'x' ? 'Left' : 'Top';
      var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
      return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
    }

    function getSize(axis, body, html, computedStyle) {
      return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
    }

    function getWindowSizes(document) {
      var body = document.body;
      var html = document.documentElement;
      var computedStyle = isIE(10) && getComputedStyle(html);
      return {
        height: getSize('Height', body, html, computedStyle),
        width: getSize('Width', body, html, computedStyle)
      };
    }

    var classCallCheck = function classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    var defineProperty$7 = function defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    };

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    function getClientRect(offsets) {
      return _extends({}, offsets, {
        right: offsets.left + offsets.width,
        bottom: offsets.top + offsets.height
      });
    }

    function getBoundingClientRect(element) {
      var rect = {};

      try {
        if (isIE(10)) {
          rect = element.getBoundingClientRect();
          var scrollTop = getScroll(element, 'top');
          var scrollLeft = getScroll(element, 'left');
          rect.top += scrollTop;
          rect.left += scrollLeft;
          rect.bottom += scrollTop;
          rect.right += scrollLeft;
        } else {
          rect = element.getBoundingClientRect();
        }
      } catch (e) {}

      var result = {
        left: rect.left,
        top: rect.top,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
      };
      var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
      var width = sizes.width || element.clientWidth || result.width;
      var height = sizes.height || element.clientHeight || result.height;
      var horizScrollbar = element.offsetWidth - width;
      var vertScrollbar = element.offsetHeight - height;

      if (horizScrollbar || vertScrollbar) {
        var styles = getStyleComputedProperty(element);
        horizScrollbar -= getBordersSize(styles, 'x');
        vertScrollbar -= getBordersSize(styles, 'y');
        result.width -= horizScrollbar;
        result.height -= vertScrollbar;
      }

      return getClientRect(result);
    }

    function getOffsetRectRelativeToArbitraryNode(children, parent) {
      var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var isIE10 = isIE(10);
      var isHTML = parent.nodeName === 'HTML';
      var childrenRect = getBoundingClientRect(children);
      var parentRect = getBoundingClientRect(parent);
      var scrollParent = getScrollParent(children);
      var styles = getStyleComputedProperty(parent);
      var borderTopWidth = parseFloat(styles.borderTopWidth);
      var borderLeftWidth = parseFloat(styles.borderLeftWidth);

      if (fixedPosition && isHTML) {
        parentRect.top = Math.max(parentRect.top, 0);
        parentRect.left = Math.max(parentRect.left, 0);
      }

      var offsets = getClientRect({
        top: childrenRect.top - parentRect.top - borderTopWidth,
        left: childrenRect.left - parentRect.left - borderLeftWidth,
        width: childrenRect.width,
        height: childrenRect.height
      });
      offsets.marginTop = 0;
      offsets.marginLeft = 0;

      if (!isIE10 && isHTML) {
        var marginTop = parseFloat(styles.marginTop);
        var marginLeft = parseFloat(styles.marginLeft);
        offsets.top -= borderTopWidth - marginTop;
        offsets.bottom -= borderTopWidth - marginTop;
        offsets.left -= borderLeftWidth - marginLeft;
        offsets.right -= borderLeftWidth - marginLeft;
        offsets.marginTop = marginTop;
        offsets.marginLeft = marginLeft;
      }

      if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
        offsets = includeScroll(offsets, parent);
      }

      return offsets;
    }

    function getViewportOffsetRectRelativeToArtbitraryNode(element) {
      var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var html = element.ownerDocument.documentElement;
      var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
      var width = Math.max(html.clientWidth, window.innerWidth || 0);
      var height = Math.max(html.clientHeight, window.innerHeight || 0);
      var scrollTop = !excludeScroll ? getScroll(html) : 0;
      var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;
      var offset = {
        top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
        left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
        width: width,
        height: height
      };
      return getClientRect(offset);
    }

    function isFixed(element) {
      var nodeName = element.nodeName;

      if (nodeName === 'BODY' || nodeName === 'HTML') {
        return false;
      }

      if (getStyleComputedProperty(element, 'position') === 'fixed') {
        return true;
      }

      var parentNode = getParentNode(element);

      if (!parentNode) {
        return false;
      }

      return isFixed(parentNode);
    }

    function getFixedPositionOffsetParent(element) {
      if (!element || !element.parentElement || isIE()) {
        return document.documentElement;
      }

      var el = element.parentElement;

      while (el && getStyleComputedProperty(el, 'transform') === 'none') {
        el = el.parentElement;
      }

      return el || document.documentElement;
    }

    function getBoundaries(popper, reference, padding, boundariesElement) {
      var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var boundaries = {
        top: 0,
        left: 0
      };
      var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

      if (boundariesElement === 'viewport') {
        boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
      } else {
        var boundariesNode = void 0;

        if (boundariesElement === 'scrollParent') {
          boundariesNode = getScrollParent(getParentNode(reference));

          if (boundariesNode.nodeName === 'BODY') {
            boundariesNode = popper.ownerDocument.documentElement;
          }
        } else if (boundariesElement === 'window') {
          boundariesNode = popper.ownerDocument.documentElement;
        } else {
          boundariesNode = boundariesElement;
        }

        var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

        if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
          var _getWindowSizes = getWindowSizes(popper.ownerDocument),
              height = _getWindowSizes.height,
              width = _getWindowSizes.width;

          boundaries.top += offsets.top - offsets.marginTop;
          boundaries.bottom = height + offsets.top;
          boundaries.left += offsets.left - offsets.marginLeft;
          boundaries.right = width + offsets.left;
        } else {
          boundaries = offsets;
        }
      }

      padding = padding || 0;
      var isPaddingNumber = typeof padding === 'number';
      boundaries.left += isPaddingNumber ? padding : padding.left || 0;
      boundaries.top += isPaddingNumber ? padding : padding.top || 0;
      boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
      boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;
      return boundaries;
    }

    function getArea(_ref) {
      var width = _ref.width,
          height = _ref.height;
      return width * height;
    }

    function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
      var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

      if (placement.indexOf('auto') === -1) {
        return placement;
      }

      var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
      var rects = {
        top: {
          width: boundaries.width,
          height: refRect.top - boundaries.top
        },
        right: {
          width: boundaries.right - refRect.right,
          height: boundaries.height
        },
        bottom: {
          width: boundaries.width,
          height: boundaries.bottom - refRect.bottom
        },
        left: {
          width: refRect.left - boundaries.left,
          height: boundaries.height
        }
      };
      var sortedAreas = Object.keys(rects).map(function (key) {
        return _extends({
          key: key
        }, rects[key], {
          area: getArea(rects[key])
        });
      }).sort(function (a, b) {
        return b.area - a.area;
      });
      var filteredAreas = sortedAreas.filter(function (_ref2) {
        var width = _ref2.width,
            height = _ref2.height;
        return width >= popper.clientWidth && height >= popper.clientHeight;
      });
      var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
      var variation = placement.split('-')[1];
      return computedPlacement + (variation ? '-' + variation : '');
    }

    function getReferenceOffsets(state, popper, reference) {
      var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
      return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
    }

    function getOuterSizes(element) {
      var window = element.ownerDocument.defaultView;
      var styles = window.getComputedStyle(element);
      var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
      var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
      var result = {
        width: element.offsetWidth + y,
        height: element.offsetHeight + x
      };
      return result;
    }

    function getOppositePlacement(placement) {
      var hash = {
        left: 'right',
        right: 'left',
        bottom: 'top',
        top: 'bottom'
      };
      return placement.replace(/left|right|bottom|top/g, function (matched) {
        return hash[matched];
      });
    }

    function getPopperOffsets(popper, referenceOffsets, placement) {
      placement = placement.split('-')[0];
      var popperRect = getOuterSizes(popper);
      var popperOffsets = {
        width: popperRect.width,
        height: popperRect.height
      };
      var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
      var mainSide = isHoriz ? 'top' : 'left';
      var secondarySide = isHoriz ? 'left' : 'top';
      var measurement = isHoriz ? 'height' : 'width';
      var secondaryMeasurement = !isHoriz ? 'height' : 'width';
      popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;

      if (placement === secondarySide) {
        popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
      } else {
        popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
      }

      return popperOffsets;
    }

    function find(arr, check) {
      if (Array.prototype.find) {
        return arr.find(check);
      }

      return arr.filter(check)[0];
    }

    function findIndex(arr, prop, value) {
      if (Array.prototype.findIndex) {
        return arr.findIndex(function (cur) {
          return cur[prop] === value;
        });
      }

      var match = find(arr, function (obj) {
        return obj[prop] === value;
      });
      return arr.indexOf(match);
    }

    function runModifiers(modifiers, data, ends) {
      var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
      modifiersToRun.forEach(function (modifier) {
        if (modifier['function']) ;

        var fn = modifier['function'] || modifier.fn;

        if (modifier.enabled && isFunction(fn)) {
          data.offsets.popper = getClientRect(data.offsets.popper);
          data.offsets.reference = getClientRect(data.offsets.reference);
          data = fn(data, modifier);
        }
      });
      return data;
    }

    function update() {
      if (this.state.isDestroyed) {
        return;
      }

      var data = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: false,
        offsets: {}
      };
      data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);
      data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);
      data.originalPlacement = data.placement;
      data.positionFixed = this.options.positionFixed;
      data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
      data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';
      data = runModifiers(this.modifiers, data);

      if (!this.state.isCreated) {
        this.state.isCreated = true;
        this.options.onCreate(data);
      } else {
        this.options.onUpdate(data);
      }
    }

    function isModifierEnabled(modifiers, modifierName) {
      return modifiers.some(function (_ref) {
        var name = _ref.name,
            enabled = _ref.enabled;
        return enabled && name === modifierName;
      });
    }

    function getSupportedPropertyName(property) {
      var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
      var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

      for (var i = 0; i < prefixes.length; i++) {
        var prefix = prefixes[i];
        var toCheck = prefix ? '' + prefix + upperProp : property;

        if (typeof document.body.style[toCheck] !== 'undefined') {
          return toCheck;
        }
      }

      return null;
    }

    function destroy() {
      this.state.isDestroyed = true;

      if (isModifierEnabled(this.modifiers, 'applyStyle')) {
        this.popper.removeAttribute('x-placement');
        this.popper.style.position = '';
        this.popper.style.top = '';
        this.popper.style.left = '';
        this.popper.style.right = '';
        this.popper.style.bottom = '';
        this.popper.style.willChange = '';
        this.popper.style[getSupportedPropertyName('transform')] = '';
      }

      this.disableEventListeners();

      if (this.options.removeOnDestroy) {
        this.popper.parentNode.removeChild(this.popper);
      }

      return this;
    }

    function getWindow(element) {
      var ownerDocument = element.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView : window;
    }

    function attachToScrollParents(scrollParent, event, callback, scrollParents) {
      var isBody = scrollParent.nodeName === 'BODY';
      var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
      target.addEventListener(event, callback, {
        passive: true
      });

      if (!isBody) {
        attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
      }

      scrollParents.push(target);
    }

    function setupEventListeners(reference, options, state, updateBound) {
      state.updateBound = updateBound;
      getWindow(reference).addEventListener('resize', state.updateBound, {
        passive: true
      });
      var scrollElement = getScrollParent(reference);
      attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
      state.scrollElement = scrollElement;
      state.eventsEnabled = true;
      return state;
    }

    function enableEventListeners() {
      if (!this.state.eventsEnabled) {
        this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
      }
    }

    function removeEventListeners(reference, state) {
      getWindow(reference).removeEventListener('resize', state.updateBound);
      state.scrollParents.forEach(function (target) {
        target.removeEventListener('scroll', state.updateBound);
      });
      state.updateBound = null;
      state.scrollParents = [];
      state.scrollElement = null;
      state.eventsEnabled = false;
      return state;
    }

    function disableEventListeners() {
      if (this.state.eventsEnabled) {
        cancelAnimationFrame(this.scheduleUpdate);
        this.state = removeEventListeners(this.reference, this.state);
      }
    }

    function isNumeric(n) {
      return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
    }

    function setStyles(element, styles) {
      Object.keys(styles).forEach(function (prop) {
        var unit = '';

        if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
          unit = 'px';
        }

        element.style[prop] = styles[prop] + unit;
      });
    }

    function setAttributes(element, attributes) {
      Object.keys(attributes).forEach(function (prop) {
        var value = attributes[prop];

        if (value !== false) {
          element.setAttribute(prop, attributes[prop]);
        } else {
          element.removeAttribute(prop);
        }
      });
    }

    function applyStyle(data) {
      setStyles(data.instance.popper, data.styles);
      setAttributes(data.instance.popper, data.attributes);

      if (data.arrowElement && Object.keys(data.arrowStyles).length) {
        setStyles(data.arrowElement, data.arrowStyles);
      }

      return data;
    }

    function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
      var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);
      var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
      popper.setAttribute('x-placement', placement);
      setStyles(popper, {
        position: options.positionFixed ? 'fixed' : 'absolute'
      });
      return options;
    }

    function getRoundedOffsets(data, shouldRound) {
      var _data$offsets = data.offsets,
          popper = _data$offsets.popper,
          reference = _data$offsets.reference;
      var round = Math.round,
          floor = Math.floor;

      var noRound = function noRound(v) {
        return v;
      };

      var referenceWidth = round(reference.width);
      var popperWidth = round(popper.width);
      var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
      var isVariation = data.placement.indexOf('-') !== -1;
      var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
      var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;
      var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
      var verticalToInteger = !shouldRound ? noRound : round;
      return {
        left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
        top: verticalToInteger(popper.top),
        bottom: verticalToInteger(popper.bottom),
        right: horizontalToInteger(popper.right)
      };
    }

    var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

    function computeStyle(data, options) {
      var x = options.x,
          y = options.y;
      var popper = data.offsets.popper;
      var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
        return modifier.name === 'applyStyle';
      }).gpuAcceleration;

      var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
      var offsetParent = getOffsetParent(data.instance.popper);
      var offsetParentRect = getBoundingClientRect(offsetParent);
      var styles = {
        position: popper.position
      };
      var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);
      var sideA = x === 'bottom' ? 'top' : 'bottom';
      var sideB = y === 'right' ? 'left' : 'right';
      var prefixedProperty = getSupportedPropertyName('transform');
      var left = void 0,
          top = void 0;

      if (sideA === 'bottom') {
        if (offsetParent.nodeName === 'HTML') {
          top = -offsetParent.clientHeight + offsets.bottom;
        } else {
          top = -offsetParentRect.height + offsets.bottom;
        }
      } else {
        top = offsets.top;
      }

      if (sideB === 'right') {
        if (offsetParent.nodeName === 'HTML') {
          left = -offsetParent.clientWidth + offsets.right;
        } else {
          left = -offsetParentRect.width + offsets.right;
        }
      } else {
        left = offsets.left;
      }

      if (gpuAcceleration && prefixedProperty) {
        styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
        styles[sideA] = 0;
        styles[sideB] = 0;
        styles.willChange = 'transform';
      } else {
        var invertTop = sideA === 'bottom' ? -1 : 1;
        var invertLeft = sideB === 'right' ? -1 : 1;
        styles[sideA] = top * invertTop;
        styles[sideB] = left * invertLeft;
        styles.willChange = sideA + ', ' + sideB;
      }

      var attributes = {
        'x-placement': data.placement
      };
      data.attributes = _extends({}, attributes, data.attributes);
      data.styles = _extends({}, styles, data.styles);
      data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);
      return data;
    }

    function isModifierRequired(modifiers, requestingName, requestedName) {
      var requesting = find(modifiers, function (_ref) {
        var name = _ref.name;
        return name === requestingName;
      });
      var isRequired = !!requesting && modifiers.some(function (modifier) {
        return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
      });

      return isRequired;
    }

    function arrow(data, options) {
      var _data$offsets$arrow;

      if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
        return data;
      }

      var arrowElement = options.element;

      if (typeof arrowElement === 'string') {
        arrowElement = data.instance.popper.querySelector(arrowElement);

        if (!arrowElement) {
          return data;
        }
      } else {
        if (!data.instance.popper.contains(arrowElement)) {
          return data;
        }
      }

      var placement = data.placement.split('-')[0];
      var _data$offsets = data.offsets,
          popper = _data$offsets.popper,
          reference = _data$offsets.reference;
      var isVertical = ['left', 'right'].indexOf(placement) !== -1;
      var len = isVertical ? 'height' : 'width';
      var sideCapitalized = isVertical ? 'Top' : 'Left';
      var side = sideCapitalized.toLowerCase();
      var altSide = isVertical ? 'left' : 'top';
      var opSide = isVertical ? 'bottom' : 'right';
      var arrowElementSize = getOuterSizes(arrowElement)[len];

      if (reference[opSide] - arrowElementSize < popper[side]) {
        data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
      }

      if (reference[side] + arrowElementSize > popper[opSide]) {
        data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
      }

      data.offsets.popper = getClientRect(data.offsets.popper);
      var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;
      var css = getStyleComputedProperty(data.instance.popper);
      var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
      var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
      var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;
      sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
      data.arrowElement = arrowElement;
      data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty$7(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty$7(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);
      return data;
    }

    function getOppositeVariation(variation) {
      if (variation === 'end') {
        return 'start';
      } else if (variation === 'start') {
        return 'end';
      }

      return variation;
    }

    var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];
    var validPlacements = placements.slice(3);

    function clockwise(placement) {
      var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var index = validPlacements.indexOf(placement);
      var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
      return counter ? arr.reverse() : arr;
    }

    var BEHAVIORS = {
      FLIP: 'flip',
      CLOCKWISE: 'clockwise',
      COUNTERCLOCKWISE: 'counterclockwise'
    };

    function flip(data, options) {
      if (isModifierEnabled(data.instance.modifiers, 'inner')) {
        return data;
      }

      if (data.flipped && data.placement === data.originalPlacement) {
        return data;
      }

      var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
      var placement = data.placement.split('-')[0];
      var placementOpposite = getOppositePlacement(placement);
      var variation = data.placement.split('-')[1] || '';
      var flipOrder = [];

      switch (options.behavior) {
        case BEHAVIORS.FLIP:
          flipOrder = [placement, placementOpposite];
          break;

        case BEHAVIORS.CLOCKWISE:
          flipOrder = clockwise(placement);
          break;

        case BEHAVIORS.COUNTERCLOCKWISE:
          flipOrder = clockwise(placement, true);
          break;

        default:
          flipOrder = options.behavior;
      }

      flipOrder.forEach(function (step, index) {
        if (placement !== step || flipOrder.length === index + 1) {
          return data;
        }

        placement = data.placement.split('-')[0];
        placementOpposite = getOppositePlacement(placement);
        var popperOffsets = data.offsets.popper;
        var refOffsets = data.offsets.reference;
        var floor = Math.floor;
        var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
        var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
        var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
        var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
        var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
        var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;
        var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
        var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);
        var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);
        var flippedVariation = flippedVariationByRef || flippedVariationByContent;

        if (overlapsRef || overflowsBoundaries || flippedVariation) {
          data.flipped = true;

          if (overlapsRef || overflowsBoundaries) {
            placement = flipOrder[index + 1];
          }

          if (flippedVariation) {
            variation = getOppositeVariation(variation);
          }

          data.placement = placement + (variation ? '-' + variation : '');
          data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
          data = runModifiers(data.instance.modifiers, data, 'flip');
        }
      });
      return data;
    }

    function keepTogether(data) {
      var _data$offsets = data.offsets,
          popper = _data$offsets.popper,
          reference = _data$offsets.reference;
      var placement = data.placement.split('-')[0];
      var floor = Math.floor;
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
      var side = isVertical ? 'right' : 'bottom';
      var opSide = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';

      if (popper[side] < floor(reference[opSide])) {
        data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
      }

      if (popper[opSide] > floor(reference[side])) {
        data.offsets.popper[opSide] = floor(reference[side]);
      }

      return data;
    }

    function toValue(str, measurement, popperOffsets, referenceOffsets) {
      var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
      var value = +split[1];
      var unit = split[2];

      if (!value) {
        return str;
      }

      if (unit.indexOf('%') === 0) {
        var element = void 0;

        switch (unit) {
          case '%p':
            element = popperOffsets;
            break;

          case '%':
          case '%r':
          default:
            element = referenceOffsets;
        }

        var rect = getClientRect(element);
        return rect[measurement] / 100 * value;
      } else if (unit === 'vh' || unit === 'vw') {
        var size = void 0;

        if (unit === 'vh') {
          size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        } else {
          size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        }

        return size / 100 * value;
      } else {
        return value;
      }
    }

    function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
      var offsets = [0, 0];
      var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;
      var fragments = offset.split(/(\+|\-)/).map(function (frag) {
        return frag.trim();
      });
      var divider = fragments.indexOf(find(fragments, function (frag) {
        return frag.search(/,|\s/) !== -1;
      }));

      if (fragments[divider] && fragments[divider].indexOf(',') === -1) ;

      var splitRegex = /\s*,\s*|\s+/;
      var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];
      ops = ops.map(function (op, index) {
        var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
        var mergeWithPrevious = false;
        return op.reduce(function (a, b) {
          if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
            a[a.length - 1] = b;
            mergeWithPrevious = true;
            return a;
          } else if (mergeWithPrevious) {
            a[a.length - 1] += b;
            mergeWithPrevious = false;
            return a;
          } else {
            return a.concat(b);
          }
        }, []).map(function (str) {
          return toValue(str, measurement, popperOffsets, referenceOffsets);
        });
      });
      ops.forEach(function (op, index) {
        op.forEach(function (frag, index2) {
          if (isNumeric(frag)) {
            offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
          }
        });
      });
      return offsets;
    }

    function offset(data, _ref) {
      var offset = _ref.offset;
      var placement = data.placement,
          _data$offsets = data.offsets,
          popper = _data$offsets.popper,
          reference = _data$offsets.reference;
      var basePlacement = placement.split('-')[0];
      var offsets = void 0;

      if (isNumeric(+offset)) {
        offsets = [+offset, 0];
      } else {
        offsets = parseOffset(offset, popper, reference, basePlacement);
      }

      if (basePlacement === 'left') {
        popper.top += offsets[0];
        popper.left -= offsets[1];
      } else if (basePlacement === 'right') {
        popper.top += offsets[0];
        popper.left += offsets[1];
      } else if (basePlacement === 'top') {
        popper.left += offsets[0];
        popper.top -= offsets[1];
      } else if (basePlacement === 'bottom') {
        popper.left += offsets[0];
        popper.top += offsets[1];
      }

      data.popper = popper;
      return data;
    }

    function preventOverflow(data, options) {
      var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

      if (data.instance.reference === boundariesElement) {
        boundariesElement = getOffsetParent(boundariesElement);
      }

      var transformProp = getSupportedPropertyName('transform');
      var popperStyles = data.instance.popper.style;
      var top = popperStyles.top,
          left = popperStyles.left,
          transform = popperStyles[transformProp];
      popperStyles.top = '';
      popperStyles.left = '';
      popperStyles[transformProp] = '';
      var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);
      popperStyles.top = top;
      popperStyles.left = left;
      popperStyles[transformProp] = transform;
      options.boundaries = boundaries;
      var order = options.priority;
      var popper = data.offsets.popper;
      var check = {
        primary: function primary(placement) {
          var value = popper[placement];

          if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
            value = Math.max(popper[placement], boundaries[placement]);
          }

          return defineProperty$7({}, placement, value);
        },
        secondary: function secondary(placement) {
          var mainSide = placement === 'right' ? 'left' : 'top';
          var value = popper[mainSide];

          if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
            value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
          }

          return defineProperty$7({}, mainSide, value);
        }
      };
      order.forEach(function (placement) {
        var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
        popper = _extends({}, popper, check[side](placement));
      });
      data.offsets.popper = popper;
      return data;
    }

    function shift(data) {
      var placement = data.placement;
      var basePlacement = placement.split('-')[0];
      var shiftvariation = placement.split('-')[1];

      if (shiftvariation) {
        var _data$offsets = data.offsets,
            reference = _data$offsets.reference,
            popper = _data$offsets.popper;
        var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
        var side = isVertical ? 'left' : 'top';
        var measurement = isVertical ? 'width' : 'height';
        var shiftOffsets = {
          start: defineProperty$7({}, side, reference[side]),
          end: defineProperty$7({}, side, reference[side] + reference[measurement] - popper[measurement])
        };
        data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
      }

      return data;
    }

    function hide(data) {
      if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
        return data;
      }

      var refRect = data.offsets.reference;
      var bound = find(data.instance.modifiers, function (modifier) {
        return modifier.name === 'preventOverflow';
      }).boundaries;

      if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
        if (data.hide === true) {
          return data;
        }

        data.hide = true;
        data.attributes['x-out-of-boundaries'] = '';
      } else {
        if (data.hide === false) {
          return data;
        }

        data.hide = false;
        data.attributes['x-out-of-boundaries'] = false;
      }

      return data;
    }

    function inner(data) {
      var placement = data.placement;
      var basePlacement = placement.split('-')[0];
      var _data$offsets = data.offsets,
          popper = _data$offsets.popper,
          reference = _data$offsets.reference;
      var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
      var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
      popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
      data.placement = getOppositePlacement(placement);
      data.offsets.popper = getClientRect(popper);
      return data;
    }

    var modifiers = {
      shift: {
        order: 100,
        enabled: true,
        fn: shift
      },
      offset: {
        order: 200,
        enabled: true,
        fn: offset,
        offset: 0
      },
      preventOverflow: {
        order: 300,
        enabled: true,
        fn: preventOverflow,
        priority: ['left', 'right', 'top', 'bottom'],
        padding: 5,
        boundariesElement: 'scrollParent'
      },
      keepTogether: {
        order: 400,
        enabled: true,
        fn: keepTogether
      },
      arrow: {
        order: 500,
        enabled: true,
        fn: arrow,
        element: '[x-arrow]'
      },
      flip: {
        order: 600,
        enabled: true,
        fn: flip,
        behavior: 'flip',
        padding: 5,
        boundariesElement: 'viewport',
        flipVariations: false,
        flipVariationsByContent: false
      },
      inner: {
        order: 700,
        enabled: false,
        fn: inner
      },
      hide: {
        order: 800,
        enabled: true,
        fn: hide
      },
      computeStyle: {
        order: 850,
        enabled: true,
        fn: computeStyle,
        gpuAcceleration: true,
        x: 'bottom',
        y: 'right'
      },
      applyStyle: {
        order: 900,
        enabled: true,
        fn: applyStyle,
        onLoad: applyStyleOnLoad,
        gpuAcceleration: undefined
      }
    };
    var Defaults = {
      placement: 'bottom',
      positionFixed: false,
      eventsEnabled: true,
      removeOnDestroy: false,
      onCreate: function onCreate() {},
      onUpdate: function onUpdate() {},
      modifiers: modifiers
    };

    var Popper = function () {
      function Popper(reference, popper) {
        var _this = this;

        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        classCallCheck(this, Popper);

        this.scheduleUpdate = function () {
          return requestAnimationFrame(_this.update);
        };

        this.update = debounce$1(this.update.bind(this));
        this.options = _extends({}, Popper.Defaults, options);
        this.state = {
          isDestroyed: false,
          isCreated: false,
          scrollParents: []
        };
        this.reference = reference && reference.jquery ? reference[0] : reference;
        this.popper = popper && popper.jquery ? popper[0] : popper;
        this.options.modifiers = {};
        Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
          _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
        });
        this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
          return _extends({
            name: name
          }, _this.options.modifiers[name]);
        }).sort(function (a, b) {
          return a.order - b.order;
        });
        this.modifiers.forEach(function (modifierOptions) {
          if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
            modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
          }
        });
        this.update();
        var eventsEnabled = this.options.eventsEnabled;

        if (eventsEnabled) {
          this.enableEventListeners();
        }

        this.state.eventsEnabled = eventsEnabled;
      }

      createClass(Popper, [{
        key: 'update',
        value: function update$$1() {
          return update.call(this);
        }
      }, {
        key: 'destroy',
        value: function destroy$$1() {
          return destroy.call(this);
        }
      }, {
        key: 'enableEventListeners',
        value: function enableEventListeners$$1() {
          return enableEventListeners.call(this);
        }
      }, {
        key: 'disableEventListeners',
        value: function disableEventListeners$$1() {
          return disableEventListeners.call(this);
        }
      }]);
      return Popper;
    }();

    Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
    Popper.placements = placements;
    Popper.Defaults = Defaults;

    // `Symbol.asyncIterator` well-known symbol
    // https://tc39.es/ecma262/#sec-symbol.asynciterator
    defineWellKnownSymbol('asyncIterator');

    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    function __extends(d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function isFunction$1(x) {
      return typeof x === 'function';
    }

    var _enable_super_gross_mode_that_will_cause_bad_things = false;
    var config = {
      Promise: undefined,

      set useDeprecatedSynchronousErrorHandling(value) {

        _enable_super_gross_mode_that_will_cause_bad_things = value;
      },

      get useDeprecatedSynchronousErrorHandling() {
        return _enable_super_gross_mode_that_will_cause_bad_things;
      }

    };

    function hostReportError(err) {
      setTimeout(function () {
        throw err;
      }, 0);
    }

    var empty = {
      closed: true,
      next: function next(value) {},
      error: function error(err) {
        if (config.useDeprecatedSynchronousErrorHandling) {
          throw err;
        } else {
          hostReportError(err);
        }
      },
      complete: function complete() {}
    };

    var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('splice');

    var max$3 = Math.max;
    var min$4 = Math.min;
    var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
    var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

    // `Array.prototype.splice` method
    // https://tc39.es/ecma262/#sec-array.prototype.splice
    // with adding support of @@species
    _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
      splice: function splice(start, deleteCount /* , ...items */) {
        var O = toObject(this);
        var len = toLength(O.length);
        var actualStart = toAbsoluteIndex(start, len);
        var argumentsLength = arguments.length;
        var insertCount, actualDeleteCount, A, k, from, to;
        if (argumentsLength === 0) {
          insertCount = actualDeleteCount = 0;
        } else if (argumentsLength === 1) {
          insertCount = 0;
          actualDeleteCount = len - actualStart;
        } else {
          insertCount = argumentsLength - 2;
          actualDeleteCount = min$4(max$3(toInteger(deleteCount), 0), len - actualStart);
        }
        if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
          throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
        }
        A = arraySpeciesCreate(O, actualDeleteCount);
        for (k = 0; k < actualDeleteCount; k++) {
          from = actualStart + k;
          if (from in O) createProperty(A, k, O[from]);
        }
        A.length = actualDeleteCount;
        if (insertCount < actualDeleteCount) {
          for (k = actualStart; k < len - actualDeleteCount; k++) {
            from = k + actualDeleteCount;
            to = k + insertCount;
            if (from in O) O[to] = O[from];
            else delete O[to];
          }
          for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
        } else if (insertCount > actualDeleteCount) {
          for (k = len - actualDeleteCount; k > actualStart; k--) {
            from = k + actualDeleteCount - 1;
            to = k + insertCount - 1;
            if (from in O) O[to] = O[from];
            else delete O[to];
          }
        }
        for (k = 0; k < insertCount; k++) {
          O[k + actualStart] = arguments[k + 2];
        }
        O.length = len - actualDeleteCount + insertCount;
        return A;
      }
    });

    // `Array.isArray` method
    // https://tc39.es/ecma262/#sec-array.isarray
    _export({ target: 'Array', stat: true }, {
      isArray: isArray
    });

    var isArray$1 = function () {
      return Array.isArray || function (x) {
        return x && typeof x.length === 'number';
      };
    }();

    function isObject$1(x) {
      return x !== null && _typeof$1(x) === 'object';
    }

    var nativeJoin = [].join;

    var ES3_STRINGS = indexedObject != Object;
    var STRICT_METHOD$5 = arrayMethodIsStrict('join', ',');

    // `Array.prototype.join` method
    // https://tc39.es/ecma262/#sec-array.prototype.join
    _export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$5 }, {
      join: function join(separator) {
        return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
      }
    });

    var UnsubscriptionErrorImpl = function () {
      function UnsubscriptionErrorImpl(errors) {
        Error.call(this);
        this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) {
          return i + 1 + ") " + err.toString();
        }).join('\n  ') : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
        return this;
      }

      UnsubscriptionErrorImpl.prototype = Object.create(Error.prototype);
      return UnsubscriptionErrorImpl;
    }();

    var UnsubscriptionError = UnsubscriptionErrorImpl;

    var Subscription = function () {
      function Subscription(unsubscribe) {
        this.closed = false;
        this._parentOrParents = null;
        this._subscriptions = null;

        if (unsubscribe) {
          this._ctorUnsubscribe = true;
          this._unsubscribe = unsubscribe;
        }
      }

      Subscription.prototype.unsubscribe = function () {
        var errors;

        if (this.closed) {
          return;
        }

        var _a = this,
            _parentOrParents = _a._parentOrParents,
            _ctorUnsubscribe = _a._ctorUnsubscribe,
            _unsubscribe = _a._unsubscribe,
            _subscriptions = _a._subscriptions;

        this.closed = true;
        this._parentOrParents = null;
        this._subscriptions = null;

        if (_parentOrParents instanceof Subscription) {
          _parentOrParents.remove(this);
        } else if (_parentOrParents !== null) {
          for (var index = 0; index < _parentOrParents.length; ++index) {
            var parent_1 = _parentOrParents[index];
            parent_1.remove(this);
          }
        }

        if (isFunction$1(_unsubscribe)) {
          if (_ctorUnsubscribe) {
            this._unsubscribe = undefined;
          }

          try {
            _unsubscribe.call(this);
          } catch (e) {
            errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
          }
        }

        if (isArray$1(_subscriptions)) {
          var index = -1;
          var len = _subscriptions.length;

          while (++index < len) {
            var sub = _subscriptions[index];

            if (isObject$1(sub)) {
              try {
                sub.unsubscribe();
              } catch (e) {
                errors = errors || [];

                if (e instanceof UnsubscriptionError) {
                  errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
                } else {
                  errors.push(e);
                }
              }
            }
          }
        }

        if (errors) {
          throw new UnsubscriptionError(errors);
        }
      };

      Subscription.prototype.add = function (teardown) {
        var subscription = teardown;

        if (!teardown) {
          return Subscription.EMPTY;
        }

        switch (_typeof$1(teardown)) {
          case 'function':
            subscription = new Subscription(teardown);

          case 'object':
            if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
              return subscription;
            } else if (this.closed) {
              subscription.unsubscribe();
              return subscription;
            } else if (!(subscription instanceof Subscription)) {
              var tmp = subscription;
              subscription = new Subscription();
              subscription._subscriptions = [tmp];
            }

            break;

          default:
            {
              throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
            }
        }

        var _parentOrParents = subscription._parentOrParents;

        if (_parentOrParents === null) {
          subscription._parentOrParents = this;
        } else if (_parentOrParents instanceof Subscription) {
          if (_parentOrParents === this) {
            return subscription;
          }

          subscription._parentOrParents = [_parentOrParents, this];
        } else if (_parentOrParents.indexOf(this) === -1) {
          _parentOrParents.push(this);
        } else {
          return subscription;
        }

        var subscriptions = this._subscriptions;

        if (subscriptions === null) {
          this._subscriptions = [subscription];
        } else {
          subscriptions.push(subscription);
        }

        return subscription;
      };

      Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;

        if (subscriptions) {
          var subscriptionIndex = subscriptions.indexOf(subscription);

          if (subscriptionIndex !== -1) {
            subscriptions.splice(subscriptionIndex, 1);
          }
        }
      };

      Subscription.EMPTY = function (empty) {
        empty.closed = true;
        return empty;
      }(new Subscription());

      return Subscription;
    }();

    function flattenUnsubscriptionErrors(errors) {
      return errors.reduce(function (errs, err) {
        return errs.concat(err instanceof UnsubscriptionError ? err.errors : err);
      }, []);
    }

    var rxSubscriber = function () {
      return typeof Symbol === 'function' ? Symbol('rxSubscriber') : '@@rxSubscriber_' + Math.random();
    }();

    var Subscriber = function (_super) {
      __extends(Subscriber, _super);

      function Subscriber(destinationOrNext, error, complete) {
        var _this = _super.call(this) || this;

        _this.syncErrorValue = null;
        _this.syncErrorThrown = false;
        _this.syncErrorThrowable = false;
        _this.isStopped = false;

        switch (arguments.length) {
          case 0:
            _this.destination = empty;
            break;

          case 1:
            if (!destinationOrNext) {
              _this.destination = empty;
              break;
            }

            if (_typeof$1(destinationOrNext) === 'object') {
              if (destinationOrNext instanceof Subscriber) {
                _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                _this.destination = destinationOrNext;
                destinationOrNext.add(_this);
              } else {
                _this.syncErrorThrowable = true;
                _this.destination = new SafeSubscriber(_this, destinationOrNext);
              }

              break;
            }

          default:
            _this.syncErrorThrowable = true;
            _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
            break;
        }

        return _this;
      }

      Subscriber.prototype[rxSubscriber] = function () {
        return this;
      };

      Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
      };

      Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
          this._next(value);
        }
      };

      Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
          this.isStopped = true;

          this._error(err);
        }
      };

      Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
          this.isStopped = true;

          this._complete();
        }
      };

      Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
          return;
        }

        this.isStopped = true;

        _super.prototype.unsubscribe.call(this);
      };

      Subscriber.prototype._next = function (value) {
        this.destination.next(value);
      };

      Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
      };

      Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
      };

      Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _parentOrParents = this._parentOrParents;
        this._parentOrParents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parentOrParents = _parentOrParents;
        return this;
      };

      return Subscriber;
    }(Subscription);

    var SafeSubscriber = function (_super) {
      __extends(SafeSubscriber, _super);

      function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        var _this = _super.call(this) || this;

        _this._parentSubscriber = _parentSubscriber;
        var next;
        var context = _this;

        if (isFunction$1(observerOrNext)) {
          next = observerOrNext;
        } else if (observerOrNext) {
          next = observerOrNext.next;
          error = observerOrNext.error;
          complete = observerOrNext.complete;

          if (observerOrNext !== empty) {
            context = Object.create(observerOrNext);

            if (isFunction$1(context.unsubscribe)) {
              _this.add(context.unsubscribe.bind(context));
            }

            context.unsubscribe = _this.unsubscribe.bind(_this);
          }
        }

        _this._context = context;
        _this._next = next;
        _this._error = error;
        _this._complete = complete;
        return _this;
      }

      SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
          var _parentSubscriber = this._parentSubscriber;

          if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
            this.__tryOrUnsub(this._next, value);
          } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
            this.unsubscribe();
          }
        }
      };

      SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
          var _parentSubscriber = this._parentSubscriber;
          var useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;

          if (this._error) {
            if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
              this.__tryOrUnsub(this._error, err);

              this.unsubscribe();
            } else {
              this.__tryOrSetError(_parentSubscriber, this._error, err);

              this.unsubscribe();
            }
          } else if (!_parentSubscriber.syncErrorThrowable) {
            this.unsubscribe();

            if (useDeprecatedSynchronousErrorHandling) {
              throw err;
            }

            hostReportError(err);
          } else {
            if (useDeprecatedSynchronousErrorHandling) {
              _parentSubscriber.syncErrorValue = err;
              _parentSubscriber.syncErrorThrown = true;
            } else {
              hostReportError(err);
            }

            this.unsubscribe();
          }
        }
      };

      SafeSubscriber.prototype.complete = function () {
        var _this = this;

        if (!this.isStopped) {
          var _parentSubscriber = this._parentSubscriber;

          if (this._complete) {
            var wrappedComplete = function wrappedComplete() {
              return _this._complete.call(_this._context);
            };

            if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
              this.__tryOrUnsub(wrappedComplete);

              this.unsubscribe();
            } else {
              this.__tryOrSetError(_parentSubscriber, wrappedComplete);

              this.unsubscribe();
            }
          } else {
            this.unsubscribe();
          }
        }
      };

      SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
          fn.call(this._context, value);
        } catch (err) {
          this.unsubscribe();

          if (config.useDeprecatedSynchronousErrorHandling) {
            throw err;
          } else {
            hostReportError(err);
          }
        }
      };

      SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        if (!config.useDeprecatedSynchronousErrorHandling) {
          throw new Error('bad call');
        }

        try {
          fn.call(this._context, value);
        } catch (err) {
          if (config.useDeprecatedSynchronousErrorHandling) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
          } else {
            hostReportError(err);
            return true;
          }
        }

        return false;
      };

      SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;

        _parentSubscriber.unsubscribe();
      };

      return SafeSubscriber;
    }(Subscriber);

    function canReportError(observer) {
      while (observer) {
        var _a = observer,
            closed_1 = _a.closed,
            destination = _a.destination,
            isStopped = _a.isStopped;

        if (closed_1 || isStopped) {
          return false;
        } else if (destination && destination instanceof Subscriber) {
          observer = destination;
        } else {
          observer = null;
        }
      }

      return true;
    }

    function toSubscriber(nextOrObserver, error, complete) {
      if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber) {
          return nextOrObserver;
        }

        if (nextOrObserver[rxSubscriber]) {
          return nextOrObserver[rxSubscriber]();
        }
      }

      if (!nextOrObserver && !error && !complete) {
        return new Subscriber(empty);
      }

      return new Subscriber(nextOrObserver, error, complete);
    }

    var observable = function () {
      return typeof Symbol === 'function' && Symbol.observable || '@@observable';
    }();

    function identity(x) {
      return x;
    }

    function pipeFromArray(fns) {
      if (fns.length === 0) {
        return identity;
      }

      if (fns.length === 1) {
        return fns[0];
      }

      return function piped(input) {
        return fns.reduce(function (prev, fn) {
          return fn(prev);
        }, input);
      };
    }

    var Observable = function () {
      function Observable(subscribe) {
        this._isScalar = false;

        if (subscribe) {
          this._subscribe = subscribe;
        }
      }

      Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
      };

      Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber(observerOrNext, error, complete);

        if (operator) {
          sink.add(operator.call(sink, this.source));
        } else {
          sink.add(this.source || config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
        }

        if (config.useDeprecatedSynchronousErrorHandling) {
          if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;

            if (sink.syncErrorThrown) {
              throw sink.syncErrorValue;
            }
          }
        }

        return sink;
      };

      Observable.prototype._trySubscribe = function (sink) {
        try {
          return this._subscribe(sink);
        } catch (err) {
          if (config.useDeprecatedSynchronousErrorHandling) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
          }

          if (canReportError(sink)) {
            sink.error(err);
          }
        }
      };

      Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;

        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
          var subscription;
          subscription = _this.subscribe(function (value) {
            try {
              next(value);
            } catch (err) {
              reject(err);

              if (subscription) {
                subscription.unsubscribe();
              }
            }
          }, reject, resolve);
        });
      };

      Observable.prototype._subscribe = function (subscriber) {
        var source = this.source;
        return source && source.subscribe(subscriber);
      };

      Observable.prototype[observable] = function () {
        return this;
      };

      Observable.prototype.pipe = function () {
        var operations = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          operations[_i] = arguments[_i];
        }

        if (operations.length === 0) {
          return this;
        }

        return pipeFromArray(operations)(this);
      };

      Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;

        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
          var value;

          _this.subscribe(function (x) {
            return value = x;
          }, function (err) {
            return reject(err);
          }, function () {
            return resolve(value);
          });
        });
      };

      Observable.create = function (subscribe) {
        return new Observable(subscribe);
      };

      return Observable;
    }();

    function getPromiseCtor(promiseCtor) {
      if (!promiseCtor) {
        promiseCtor =  Promise;
      }

      if (!promiseCtor) {
        throw new Error('no Promise impl found');
      }

      return promiseCtor;
    }

    var ObjectUnsubscribedErrorImpl = function () {
      function ObjectUnsubscribedErrorImpl() {
        Error.call(this);
        this.message = 'object unsubscribed';
        this.name = 'ObjectUnsubscribedError';
        return this;
      }

      ObjectUnsubscribedErrorImpl.prototype = Object.create(Error.prototype);
      return ObjectUnsubscribedErrorImpl;
    }();

    var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;

    var SubjectSubscription = function (_super) {
      __extends(SubjectSubscription, _super);

      function SubjectSubscription(subject, subscriber) {
        var _this = _super.call(this) || this;

        _this.subject = subject;
        _this.subscriber = subscriber;
        _this.closed = false;
        return _this;
      }

      SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
          return;
        }

        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;

        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
          return;
        }

        var subscriberIndex = observers.indexOf(this.subscriber);

        if (subscriberIndex !== -1) {
          observers.splice(subscriberIndex, 1);
        }
      };

      return SubjectSubscription;
    }(Subscription);

    var SubjectSubscriber = function (_super) {
      __extends(SubjectSubscriber, _super);

      function SubjectSubscriber(destination) {
        var _this = _super.call(this, destination) || this;

        _this.destination = destination;
        return _this;
      }

      return SubjectSubscriber;
    }(Subscriber);

    var Subject = function (_super) {
      __extends(Subject, _super);

      function Subject() {
        var _this = _super.call(this) || this;

        _this.observers = [];
        _this.closed = false;
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
      }

      Subject.prototype[rxSubscriber] = function () {
        return new SubjectSubscriber(this);
      };

      Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
      };

      Subject.prototype.next = function (value) {
        if (this.closed) {
          throw new ObjectUnsubscribedError();
        }

        if (!this.isStopped) {
          var observers = this.observers;
          var len = observers.length;
          var copy = observers.slice();

          for (var i = 0; i < len; i++) {
            copy[i].next(value);
          }
        }
      };

      Subject.prototype.error = function (err) {
        if (this.closed) {
          throw new ObjectUnsubscribedError();
        }

        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();

        for (var i = 0; i < len; i++) {
          copy[i].error(err);
        }

        this.observers.length = 0;
      };

      Subject.prototype.complete = function () {
        if (this.closed) {
          throw new ObjectUnsubscribedError();
        }

        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();

        for (var i = 0; i < len; i++) {
          copy[i].complete();
        }

        this.observers.length = 0;
      };

      Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
      };

      Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
          throw new ObjectUnsubscribedError();
        } else {
          return _super.prototype._trySubscribe.call(this, subscriber);
        }
      };

      Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
          throw new ObjectUnsubscribedError();
        } else if (this.hasError) {
          subscriber.error(this.thrownError);
          return Subscription.EMPTY;
        } else if (this.isStopped) {
          subscriber.complete();
          return Subscription.EMPTY;
        } else {
          this.observers.push(subscriber);
          return new SubjectSubscription(this, subscriber);
        }
      };

      Subject.prototype.asObservable = function () {
        var observable = new Observable();
        observable.source = this;
        return observable;
      };

      Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
      };

      return Subject;
    }(Observable);

    var AnonymousSubject = function (_super) {
      __extends(AnonymousSubject, _super);

      function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;

        _this.destination = destination;
        _this.source = source;
        return _this;
      }

      AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;

        if (destination && destination.next) {
          destination.next(value);
        }
      };

      AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;

        if (destination && destination.error) {
          this.destination.error(err);
        }
      };

      AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;

        if (destination && destination.complete) {
          this.destination.complete();
        }
      };

      AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;

        if (source) {
          return this.source.subscribe(subscriber);
        } else {
          return Subscription.EMPTY;
        }
      };

      return AnonymousSubject;
    }(Subject);

    function refCount() {
      return function refCountOperatorFunction(source) {
        return source.lift(new RefCountOperator(source));
      };
    }

    var RefCountOperator = function () {
      function RefCountOperator(connectable) {
        this.connectable = connectable;
      }

      RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);

        if (!refCounter.closed) {
          refCounter.connection = connectable.connect();
        }

        return subscription;
      };

      return RefCountOperator;
    }();

    var RefCountSubscriber = function (_super) {
      __extends(RefCountSubscriber, _super);

      function RefCountSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;

        _this.connectable = connectable;
        return _this;
      }

      RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;

        if (!connectable) {
          this.connection = null;
          return;
        }

        this.connectable = null;
        var refCount = connectable._refCount;

        if (refCount <= 0) {
          this.connection = null;
          return;
        }

        connectable._refCount = refCount - 1;

        if (refCount > 1) {
          this.connection = null;
          return;
        }

        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;

        if (sharedConnection && (!connection || sharedConnection === connection)) {
          sharedConnection.unsubscribe();
        }
      };

      return RefCountSubscriber;
    }(Subscriber);

    var ConnectableObservable = function (_super) {
      __extends(ConnectableObservable, _super);

      function ConnectableObservable(source, subjectFactory) {
        var _this = _super.call(this) || this;

        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._refCount = 0;
        _this._isComplete = false;
        return _this;
      }

      ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
      };

      ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;

        if (!subject || subject.isStopped) {
          this._subject = this.subjectFactory();
        }

        return this._subject;
      };

      ConnectableObservable.prototype.connect = function () {
        var connection = this._connection;

        if (!connection) {
          this._isComplete = false;
          connection = this._connection = new Subscription();
          connection.add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this)));

          if (connection.closed) {
            this._connection = null;
            connection = Subscription.EMPTY;
          }
        }

        return connection;
      };

      ConnectableObservable.prototype.refCount = function () {
        return refCount()(this);
      };

      return ConnectableObservable;
    }(Observable);
    var connectableObservableDescriptor = function () {
      var connectableProto = ConnectableObservable.prototype;
      return {
        operator: {
          value: null
        },
        _refCount: {
          value: 0,
          writable: true
        },
        _subject: {
          value: null,
          writable: true
        },
        _connection: {
          value: null,
          writable: true
        },
        _subscribe: {
          value: connectableProto._subscribe
        },
        _isComplete: {
          value: connectableProto._isComplete,
          writable: true
        },
        getSubject: {
          value: connectableProto.getSubject
        },
        connect: {
          value: connectableProto.connect
        },
        refCount: {
          value: connectableProto.refCount
        }
      };
    }();

    var ConnectableSubscriber = function (_super) {
      __extends(ConnectableSubscriber, _super);

      function ConnectableSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;

        _this.connectable = connectable;
        return _this;
      }

      ConnectableSubscriber.prototype._error = function (err) {
        this._unsubscribe();

        _super.prototype._error.call(this, err);
      };

      ConnectableSubscriber.prototype._complete = function () {
        this.connectable._isComplete = true;

        this._unsubscribe();

        _super.prototype._complete.call(this);
      };

      ConnectableSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;

        if (connectable) {
          this.connectable = null;
          var connection = connectable._connection;
          connectable._refCount = 0;
          connectable._subject = null;
          connectable._connection = null;

          if (connection) {
            connection.unsubscribe();
          }
        }
      };

      return ConnectableSubscriber;
    }(SubjectSubscriber);

    var RefCountSubscriber$1 = function (_super) {
      __extends(RefCountSubscriber, _super);

      function RefCountSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;

        _this.connectable = connectable;
        return _this;
      }

      RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;

        if (!connectable) {
          this.connection = null;
          return;
        }

        this.connectable = null;
        var refCount = connectable._refCount;

        if (refCount <= 0) {
          this.connection = null;
          return;
        }

        connectable._refCount = refCount - 1;

        if (refCount > 1) {
          this.connection = null;
          return;
        }

        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;

        if (sharedConnection && (!connection || sharedConnection === connection)) {
          sharedConnection.unsubscribe();
        }
      };

      return RefCountSubscriber;
    }(Subscriber);

    var freezing = !fails(function () {
      return Object.isExtensible(Object.preventExtensions({}));
    });

    var internalMetadata = createCommonjsModule(function (module) {
    var defineProperty = objectDefineProperty.f;



    var METADATA = uid('meta');
    var id = 0;

    var isExtensible = Object.isExtensible || function () {
      return true;
    };

    var setMetadata = function (it) {
      defineProperty(it, METADATA, { value: {
        objectID: 'O' + ++id, // object ID
        weakData: {}          // weak collections IDs
      } });
    };

    var fastKey = function (it, create) {
      // return a primitive with prefix
      if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
      if (!has(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return 'F';
        // not necessary to add metadata
        if (!create) return 'E';
        // add missing metadata
        setMetadata(it);
      // return object ID
      } return it[METADATA].objectID;
    };

    var getWeakData = function (it, create) {
      if (!has(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return true;
        // not necessary to add metadata
        if (!create) return false;
        // add missing metadata
        setMetadata(it);
      // return the store of weak collections IDs
      } return it[METADATA].weakData;
    };

    // add metadata on freeze-family methods calling
    var onFreeze = function (it) {
      if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
      return it;
    };

    var meta = module.exports = {
      REQUIRED: false,
      fastKey: fastKey,
      getWeakData: getWeakData,
      onFreeze: onFreeze
    };

    hiddenKeys[METADATA] = true;
    });
    var internalMetadata_1 = internalMetadata.REQUIRED;
    var internalMetadata_2 = internalMetadata.fastKey;
    var internalMetadata_3 = internalMetadata.getWeakData;
    var internalMetadata_4 = internalMetadata.onFreeze;

    var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
      var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
      var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
      var ADDER = IS_MAP ? 'set' : 'add';
      var NativeConstructor = global_1[CONSTRUCTOR_NAME];
      var NativePrototype = NativeConstructor && NativeConstructor.prototype;
      var Constructor = NativeConstructor;
      var exported = {};

      var fixMethod = function (KEY) {
        var nativeMethod = NativePrototype[KEY];
        redefine(NativePrototype, KEY,
          KEY == 'add' ? function add(value) {
            nativeMethod.call(this, value === 0 ? 0 : value);
            return this;
          } : KEY == 'delete' ? function (key) {
            return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
          } : KEY == 'get' ? function get(key) {
            return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
          } : KEY == 'has' ? function has(key) {
            return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
          } : function set(key, value) {
            nativeMethod.call(this, key === 0 ? 0 : key, value);
            return this;
          }
        );
      };

      var REPLACE = isForced_1(
        CONSTRUCTOR_NAME,
        typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
          new NativeConstructor().entries().next();
        }))
      );

      if (REPLACE) {
        // create collection constructor
        Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
        internalMetadata.REQUIRED = true;
      } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
        var instance = new Constructor();
        // early implementations not supports chaining
        var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
        // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
        var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
        // most early implementations doesn't supports iterables, most modern - not close it correctly
        // eslint-disable-next-line no-new -- required for testing
        var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
        // for early implementations -0 and +0 not the same
        var BUGGY_ZERO = !IS_WEAK && fails(function () {
          // V8 ~ Chromium 42- fails only with 5+ elements
          var $instance = new NativeConstructor();
          var index = 5;
          while (index--) $instance[ADDER](index, index);
          return !$instance.has(-0);
        });

        if (!ACCEPT_ITERABLES) {
          Constructor = wrapper(function (dummy, iterable) {
            anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
            var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
            if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
            return that;
          });
          Constructor.prototype = NativePrototype;
          NativePrototype.constructor = Constructor;
        }

        if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
          fixMethod('delete');
          fixMethod('has');
          IS_MAP && fixMethod('get');
        }

        if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

        // weak collections should not contains .clear method
        if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
      }

      exported[CONSTRUCTOR_NAME] = Constructor;
      _export({ global: true, forced: Constructor != NativeConstructor }, exported);

      setToStringTag(Constructor, CONSTRUCTOR_NAME);

      if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

      return Constructor;
    };

    var defineProperty$8 = objectDefineProperty.f;








    var fastKey = internalMetadata.fastKey;


    var setInternalState$5 = internalState.set;
    var internalStateGetterFor = internalState.getterFor;

    var collectionStrong = {
      getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
        var C = wrapper(function (that, iterable) {
          anInstance(that, C, CONSTRUCTOR_NAME);
          setInternalState$5(that, {
            type: CONSTRUCTOR_NAME,
            index: objectCreate(null),
            first: undefined,
            last: undefined,
            size: 0
          });
          if (!descriptors) that.size = 0;
          if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
        });

        var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

        var define = function (that, key, value) {
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          var previous, index;
          // change existing entry
          if (entry) {
            entry.value = value;
          // create new entry
          } else {
            state.last = entry = {
              index: index = fastKey(key, true),
              key: key,
              value: value,
              previous: previous = state.last,
              next: undefined,
              removed: false
            };
            if (!state.first) state.first = entry;
            if (previous) previous.next = entry;
            if (descriptors) state.size++;
            else that.size++;
            // add to index
            if (index !== 'F') state.index[index] = entry;
          } return that;
        };

        var getEntry = function (that, key) {
          var state = getInternalState(that);
          // fast case
          var index = fastKey(key);
          var entry;
          if (index !== 'F') return state.index[index];
          // frozen object case
          for (entry = state.first; entry; entry = entry.next) {
            if (entry.key == key) return entry;
          }
        };

        redefineAll(C.prototype, {
          // 23.1.3.1 Map.prototype.clear()
          // 23.2.3.2 Set.prototype.clear()
          clear: function clear() {
            var that = this;
            var state = getInternalState(that);
            var data = state.index;
            var entry = state.first;
            while (entry) {
              entry.removed = true;
              if (entry.previous) entry.previous = entry.previous.next = undefined;
              delete data[entry.index];
              entry = entry.next;
            }
            state.first = state.last = undefined;
            if (descriptors) state.size = 0;
            else that.size = 0;
          },
          // 23.1.3.3 Map.prototype.delete(key)
          // 23.2.3.4 Set.prototype.delete(value)
          'delete': function (key) {
            var that = this;
            var state = getInternalState(that);
            var entry = getEntry(that, key);
            if (entry) {
              var next = entry.next;
              var prev = entry.previous;
              delete state.index[entry.index];
              entry.removed = true;
              if (prev) prev.next = next;
              if (next) next.previous = prev;
              if (state.first == entry) state.first = next;
              if (state.last == entry) state.last = prev;
              if (descriptors) state.size--;
              else that.size--;
            } return !!entry;
          },
          // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
          // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
          forEach: function forEach(callbackfn /* , that = undefined */) {
            var state = getInternalState(this);
            var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
            var entry;
            while (entry = entry ? entry.next : state.first) {
              boundFunction(entry.value, entry.key, this);
              // revert to the last existing entry
              while (entry && entry.removed) entry = entry.previous;
            }
          },
          // 23.1.3.7 Map.prototype.has(key)
          // 23.2.3.7 Set.prototype.has(value)
          has: function has(key) {
            return !!getEntry(this, key);
          }
        });

        redefineAll(C.prototype, IS_MAP ? {
          // 23.1.3.6 Map.prototype.get(key)
          get: function get(key) {
            var entry = getEntry(this, key);
            return entry && entry.value;
          },
          // 23.1.3.9 Map.prototype.set(key, value)
          set: function set(key, value) {
            return define(this, key === 0 ? 0 : key, value);
          }
        } : {
          // 23.2.3.1 Set.prototype.add(value)
          add: function add(value) {
            return define(this, value = value === 0 ? 0 : value, value);
          }
        });
        if (descriptors) defineProperty$8(C.prototype, 'size', {
          get: function () {
            return getInternalState(this).size;
          }
        });
        return C;
      },
      setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
        var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
        var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
        var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
        // add .keys, .values, .entries, [@@iterator]
        // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
        defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
          setInternalState$5(this, {
            type: ITERATOR_NAME,
            target: iterated,
            state: getInternalCollectionState(iterated),
            kind: kind,
            last: undefined
          });
        }, function () {
          var state = getInternalIteratorState(this);
          var kind = state.kind;
          var entry = state.last;
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
          // get next entry
          if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
            // or finish the iteration
            state.target = undefined;
            return { value: undefined, done: true };
          }
          // return step by kind
          if (kind == 'keys') return { value: entry.key, done: false };
          if (kind == 'values') return { value: entry.value, done: false };
          return { value: [entry.key, entry.value], done: false };
        }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

        // add [@@species], 23.1.2.2, 23.2.2.2
        setSpecies(CONSTRUCTOR_NAME);
      }
    };

    // `Map` constructor
    // https://tc39.es/ecma262/#sec-map-objects
    var es_map = collection('Map', function (init) {
      return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
    }, collectionStrong);

    var GroupBySubscriber = function (_super) {
      __extends(GroupBySubscriber, _super);

      function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
        var _this = _super.call(this, destination) || this;

        _this.keySelector = keySelector;
        _this.elementSelector = elementSelector;
        _this.durationSelector = durationSelector;
        _this.subjectSelector = subjectSelector;
        _this.groups = null;
        _this.attemptedToUnsubscribe = false;
        _this.count = 0;
        return _this;
      }

      GroupBySubscriber.prototype._next = function (value) {
        var key;

        try {
          key = this.keySelector(value);
        } catch (err) {
          this.error(err);
          return;
        }

        this._group(value, key);
      };

      GroupBySubscriber.prototype._group = function (value, key) {
        var groups = this.groups;

        if (!groups) {
          groups = this.groups = new Map();
        }

        var group = groups.get(key);
        var element;

        if (this.elementSelector) {
          try {
            element = this.elementSelector(value);
          } catch (err) {
            this.error(err);
          }
        } else {
          element = value;
        }

        if (!group) {
          group = this.subjectSelector ? this.subjectSelector() : new Subject();
          groups.set(key, group);
          var groupedObservable = new GroupedObservable(key, group, this);
          this.destination.next(groupedObservable);

          if (this.durationSelector) {
            var duration = void 0;

            try {
              duration = this.durationSelector(new GroupedObservable(key, group));
            } catch (err) {
              this.error(err);
              return;
            }

            this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
          }
        }

        if (!group.closed) {
          group.next(element);
        }
      };

      GroupBySubscriber.prototype._error = function (err) {
        var groups = this.groups;

        if (groups) {
          groups.forEach(function (group, key) {
            group.error(err);
          });
          groups.clear();
        }

        this.destination.error(err);
      };

      GroupBySubscriber.prototype._complete = function () {
        var groups = this.groups;

        if (groups) {
          groups.forEach(function (group, key) {
            group.complete();
          });
          groups.clear();
        }

        this.destination.complete();
      };

      GroupBySubscriber.prototype.removeGroup = function (key) {
        this.groups["delete"](key);
      };

      GroupBySubscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
          this.attemptedToUnsubscribe = true;

          if (this.count === 0) {
            _super.prototype.unsubscribe.call(this);
          }
        }
      };

      return GroupBySubscriber;
    }(Subscriber);

    var GroupDurationSubscriber = function (_super) {
      __extends(GroupDurationSubscriber, _super);

      function GroupDurationSubscriber(key, group, parent) {
        var _this = _super.call(this, group) || this;

        _this.key = key;
        _this.group = group;
        _this.parent = parent;
        return _this;
      }

      GroupDurationSubscriber.prototype._next = function (value) {
        this.complete();
      };

      GroupDurationSubscriber.prototype._unsubscribe = function () {
        var _a = this,
            parent = _a.parent,
            key = _a.key;

        this.key = this.parent = null;

        if (parent) {
          parent.removeGroup(key);
        }
      };

      return GroupDurationSubscriber;
    }(Subscriber);

    var GroupedObservable = function (_super) {
      __extends(GroupedObservable, _super);

      function GroupedObservable(key, groupSubject, refCountSubscription) {
        var _this = _super.call(this) || this;

        _this.key = key;
        _this.groupSubject = groupSubject;
        _this.refCountSubscription = refCountSubscription;
        return _this;
      }

      GroupedObservable.prototype._subscribe = function (subscriber) {
        var subscription = new Subscription();

        var _a = this,
            refCountSubscription = _a.refCountSubscription,
            groupSubject = _a.groupSubject;

        if (refCountSubscription && !refCountSubscription.closed) {
          subscription.add(new InnerRefCountSubscription(refCountSubscription));
        }

        subscription.add(groupSubject.subscribe(subscriber));
        return subscription;
      };

      return GroupedObservable;
    }(Observable);

    var InnerRefCountSubscription = function (_super) {
      __extends(InnerRefCountSubscription, _super);

      function InnerRefCountSubscription(parent) {
        var _this = _super.call(this) || this;

        _this.parent = parent;
        parent.count++;
        return _this;
      }

      InnerRefCountSubscription.prototype.unsubscribe = function () {
        var parent = this.parent;

        if (!parent.closed && !this.closed) {
          _super.prototype.unsubscribe.call(this);

          parent.count -= 1;

          if (parent.count === 0 && parent.attemptedToUnsubscribe) {
            parent.unsubscribe();
          }
        }
      };

      return InnerRefCountSubscription;
    }(Subscription);

    var BehaviorSubject = function (_super) {
      __extends(BehaviorSubject, _super);

      function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;

        _this._value = _value;
        return _this;
      }

      Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function get() {
          return this.getValue();
        },
        enumerable: true,
        configurable: true
      });

      BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);

        if (subscription && !subscription.closed) {
          subscriber.next(this._value);
        }

        return subscription;
      };

      BehaviorSubject.prototype.getValue = function () {
        if (this.hasError) {
          throw this.thrownError;
        } else if (this.closed) {
          throw new ObjectUnsubscribedError();
        } else {
          return this._value;
        }
      };

      BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, this._value = value);
      };

      return BehaviorSubject;
    }(Subject);

    var Action = function (_super) {
      __extends(Action, _super);

      function Action(scheduler, work) {
        return _super.call(this) || this;
      }

      Action.prototype.schedule = function (state, delay) {

        return this;
      };

      return Action;
    }(Subscription);

    var AsyncAction = function (_super) {
      __extends(AsyncAction, _super);

      function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;

        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
      }

      AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
          delay = 0;
        }

        if (this.closed) {
          return this;
        }

        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;

        if (id != null) {
          this.id = this.recycleAsyncId(scheduler, id, delay);
        }

        this.pending = true;
        this.delay = delay;
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
      };

      AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }

        return setInterval(scheduler.flush.bind(scheduler, this), delay);
      };

      AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }

        if (delay !== null && this.delay === delay && this.pending === false) {
          return id;
        }

        clearInterval(id);
        return undefined;
      };

      AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
          return new Error('executing a cancelled action');
        }

        this.pending = false;

        var error = this._execute(state, delay);

        if (error) {
          return error;
        } else if (this.pending === false && this.id != null) {
          this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
      };

      AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;

        try {
          this.work(state);
        } catch (e) {
          errored = true;
          errorValue = !!e && e || new Error(e);
        }

        if (errored) {
          this.unsubscribe();
          return errorValue;
        }
      };

      AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;

        if (index !== -1) {
          actions.splice(index, 1);
        }

        if (id != null) {
          this.id = this.recycleAsyncId(scheduler, id, null);
        }

        this.delay = null;
      };

      return AsyncAction;
    }(Action);

    var QueueAction = function (_super) {
      __extends(QueueAction, _super);

      function QueueAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;

        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
      }

      QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
          delay = 0;
        }

        if (delay > 0) {
          return _super.prototype.schedule.call(this, state, delay);
        }

        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
      };

      QueueAction.prototype.execute = function (state, delay) {
        return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
      };

      QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }

        if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
          return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }

        return scheduler.flush(this);
      };

      return QueueAction;
    }(AsyncAction);

    // `Date.now` method
    // https://tc39.es/ecma262/#sec-date.now
    _export({ target: 'Date', stat: true }, {
      now: function now() {
        return new Date().getTime();
      }
    });

    var Scheduler = function () {
      function Scheduler(SchedulerAction, now) {
        if (now === void 0) {
          now = Scheduler.now;
        }

        this.SchedulerAction = SchedulerAction;
        this.now = now;
      }

      Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) {
          delay = 0;
        }

        return new this.SchedulerAction(this, work).schedule(state, delay);
      };

      Scheduler.now = function () {
        return Date.now();
      };

      return Scheduler;
    }();

    var AsyncScheduler = function (_super) {
      __extends(AsyncScheduler, _super);

      function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) {
          now = Scheduler.now;
        }

        var _this = _super.call(this, SchedulerAction, function () {
          if (AsyncScheduler.delegate && AsyncScheduler.delegate !== _this) {
            return AsyncScheduler.delegate.now();
          } else {
            return now();
          }
        }) || this;

        _this.actions = [];
        _this.active = false;
        _this.scheduled = undefined;
        return _this;
      }

      AsyncScheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) {
          delay = 0;
        }

        if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
          return AsyncScheduler.delegate.schedule(work, delay, state);
        } else {
          return _super.prototype.schedule.call(this, work, delay, state);
        }
      };

      AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;

        if (this.active) {
          actions.push(action);
          return;
        }

        var error;
        this.active = true;

        do {
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        } while (action = actions.shift());

        this.active = false;

        if (error) {
          while (action = actions.shift()) {
            action.unsubscribe();
          }

          throw error;
        }
      };

      return AsyncScheduler;
    }(Scheduler);

    var QueueScheduler = function (_super) {
      __extends(QueueScheduler, _super);

      function QueueScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      return QueueScheduler;
    }(AsyncScheduler);

    var queueScheduler = new QueueScheduler(QueueAction);
    var queue$1 = queueScheduler;

    var EMPTY = new Observable(function (subscriber) {
      return subscriber.complete();
    });
    function empty$1(scheduler) {
      return scheduler ? emptyScheduled(scheduler) : EMPTY;
    }

    function emptyScheduled(scheduler) {
      return new Observable(function (subscriber) {
        return scheduler.schedule(function () {
          return subscriber.complete();
        });
      });
    }

    function isScheduler(value) {
      return value && typeof value.schedule === 'function';
    }

    var subscribeToArray = function subscribeToArray(array) {
      return function (subscriber) {
        for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
          subscriber.next(array[i]);
        }

        subscriber.complete();
      };
    };

    function scheduleArray(input, scheduler) {
      return new Observable(function (subscriber) {
        var sub = new Subscription();
        var i = 0;
        sub.add(scheduler.schedule(function () {
          if (i === input.length) {
            subscriber.complete();
            return;
          }

          subscriber.next(input[i++]);

          if (!subscriber.closed) {
            sub.add(this.schedule());
          }
        }));
        return sub;
      });
    }

    function fromArray(input, scheduler) {
      if (!scheduler) {
        return new Observable(subscribeToArray(input));
      } else {
        return scheduleArray(input, scheduler);
      }
    }

    function of() {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var scheduler = args[args.length - 1];

      if (isScheduler(scheduler)) {
        args.pop();
        return scheduleArray(args, scheduler);
      } else {
        return fromArray(args);
      }
    }

    function throwError(error, scheduler) {
      if (!scheduler) {
        return new Observable(function (subscriber) {
          return subscriber.error(error);
        });
      } else {
        return new Observable(function (subscriber) {
          return scheduler.schedule(dispatch, 0, {
            error: error,
            subscriber: subscriber
          });
        });
      }
    }

    function dispatch(_a) {
      var error = _a.error,
          subscriber = _a.subscriber;
      subscriber.error(error);
    }

    var NotificationKind;

    (function (NotificationKind) {
      NotificationKind["NEXT"] = "N";
      NotificationKind["ERROR"] = "E";
      NotificationKind["COMPLETE"] = "C";
    })(NotificationKind || (NotificationKind = {}));

    var Notification = function () {
      function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
      }

      Notification.prototype.observe = function (observer) {
        switch (this.kind) {
          case 'N':
            return observer.next && observer.next(this.value);

          case 'E':
            return observer.error && observer.error(this.error);

          case 'C':
            return observer.complete && observer.complete();
        }
      };

      Notification.prototype["do"] = function (next, error, complete) {
        var kind = this.kind;

        switch (kind) {
          case 'N':
            return next && next(this.value);

          case 'E':
            return error && error(this.error);

          case 'C':
            return complete && complete();
        }
      };

      Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
          return this.observe(nextOrObserver);
        } else {
          return this["do"](nextOrObserver, error, complete);
        }
      };

      Notification.prototype.toObservable = function () {
        var kind = this.kind;

        switch (kind) {
          case 'N':
            return of(this.value);

          case 'E':
            return throwError(this.error);

          case 'C':
            return empty$1();
        }

        throw new Error('unexpected notification kind value');
      };

      Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
          return new Notification('N', value);
        }

        return Notification.undefinedValueNotification;
      };

      Notification.createError = function (err) {
        return new Notification('E', undefined, err);
      };

      Notification.createComplete = function () {
        return Notification.completeNotification;
      };

      Notification.completeNotification = new Notification('C');
      Notification.undefinedValueNotification = new Notification('N', undefined);
      return Notification;
    }();

    var ObserveOnSubscriber = function (_super) {
      __extends(ObserveOnSubscriber, _super);

      function ObserveOnSubscriber(destination, scheduler, delay) {
        if (delay === void 0) {
          delay = 0;
        }

        var _this = _super.call(this, destination) || this;

        _this.scheduler = scheduler;
        _this.delay = delay;
        return _this;
      }

      ObserveOnSubscriber.dispatch = function (arg) {
        var notification = arg.notification,
            destination = arg.destination;
        notification.observe(destination);
        this.unsubscribe();
      };

      ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
        var destination = this.destination;
        destination.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
      };

      ObserveOnSubscriber.prototype._next = function (value) {
        this.scheduleMessage(Notification.createNext(value));
      };

      ObserveOnSubscriber.prototype._error = function (err) {
        this.scheduleMessage(Notification.createError(err));
        this.unsubscribe();
      };

      ObserveOnSubscriber.prototype._complete = function () {
        this.scheduleMessage(Notification.createComplete());
        this.unsubscribe();
      };

      return ObserveOnSubscriber;
    }(Subscriber);

    var ObserveOnMessage = function () {
      function ObserveOnMessage(notification, destination) {
        this.notification = notification;
        this.destination = destination;
      }

      return ObserveOnMessage;
    }();

    var ReplaySubject = function (_super) {
      __extends(ReplaySubject, _super);

      function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) {
          bufferSize = Number.POSITIVE_INFINITY;
        }

        if (windowTime === void 0) {
          windowTime = Number.POSITIVE_INFINITY;
        }

        var _this = _super.call(this) || this;

        _this.scheduler = scheduler;
        _this._events = [];
        _this._infiniteTimeWindow = false;
        _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        _this._windowTime = windowTime < 1 ? 1 : windowTime;

        if (windowTime === Number.POSITIVE_INFINITY) {
          _this._infiniteTimeWindow = true;
          _this.next = _this.nextInfiniteTimeWindow;
        } else {
          _this.next = _this.nextTimeWindow;
        }

        return _this;
      }

      ReplaySubject.prototype.nextInfiniteTimeWindow = function (value) {
        if (!this.isStopped) {
          var _events = this._events;

          _events.push(value);

          if (_events.length > this._bufferSize) {
            _events.shift();
          }
        }

        _super.prototype.next.call(this, value);
      };

      ReplaySubject.prototype.nextTimeWindow = function (value) {
        if (!this.isStopped) {
          this._events.push(new ReplayEvent(this._getNow(), value));

          this._trimBufferThenGetEvents();
        }

        _super.prototype.next.call(this, value);
      };

      ReplaySubject.prototype._subscribe = function (subscriber) {
        var _infiniteTimeWindow = this._infiniteTimeWindow;

        var _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();

        var scheduler = this.scheduler;
        var len = _events.length;
        var subscription;

        if (this.closed) {
          throw new ObjectUnsubscribedError();
        } else if (this.isStopped || this.hasError) {
          subscription = Subscription.EMPTY;
        } else {
          this.observers.push(subscriber);
          subscription = new SubjectSubscription(this, subscriber);
        }

        if (scheduler) {
          subscriber.add(subscriber = new ObserveOnSubscriber(subscriber, scheduler));
        }

        if (_infiniteTimeWindow) {
          for (var i = 0; i < len && !subscriber.closed; i++) {
            subscriber.next(_events[i]);
          }
        } else {
          for (var i = 0; i < len && !subscriber.closed; i++) {
            subscriber.next(_events[i].value);
          }
        }

        if (this.hasError) {
          subscriber.error(this.thrownError);
        } else if (this.isStopped) {
          subscriber.complete();
        }

        return subscription;
      };

      ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || queue$1).now();
      };

      ReplaySubject.prototype._trimBufferThenGetEvents = function () {
        var now = this._getNow();

        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;

        while (spliceCount < eventsCount) {
          if (now - _events[spliceCount].time < _windowTime) {
            break;
          }

          spliceCount++;
        }

        if (eventsCount > _bufferSize) {
          spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }

        if (spliceCount > 0) {
          _events.splice(0, spliceCount);
        }

        return _events;
      };

      return ReplaySubject;
    }(Subject);

    var ReplayEvent = function () {
      function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
      }

      return ReplayEvent;
    }();

    var AsyncSubject = function (_super) {
      __extends(AsyncSubject, _super);

      function AsyncSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.value = null;
        _this.hasNext = false;
        _this.hasCompleted = false;
        return _this;
      }

      AsyncSubject.prototype._subscribe = function (subscriber) {
        if (this.hasError) {
          subscriber.error(this.thrownError);
          return Subscription.EMPTY;
        } else if (this.hasCompleted && this.hasNext) {
          subscriber.next(this.value);
          subscriber.complete();
          return Subscription.EMPTY;
        }

        return _super.prototype._subscribe.call(this, subscriber);
      };

      AsyncSubject.prototype.next = function (value) {
        if (!this.hasCompleted) {
          this.value = value;
          this.hasNext = true;
        }
      };

      AsyncSubject.prototype.error = function (error) {
        if (!this.hasCompleted) {
          _super.prototype.error.call(this, error);
        }
      };

      AsyncSubject.prototype.complete = function () {
        this.hasCompleted = true;

        if (this.hasNext) {
          _super.prototype.next.call(this, this.value);
        }

        _super.prototype.complete.call(this);
      };

      return AsyncSubject;
    }(Subject);

    var nextHandle = 1;

    var RESOLVED = function () {
      return Promise.resolve();
    }();

    var activeHandles = {};

    function findAndClearHandle(handle) {
      if (handle in activeHandles) {
        delete activeHandles[handle];
        return true;
      }

      return false;
    }

    var Immediate = {
      setImmediate: function setImmediate(cb) {
        var handle = nextHandle++;
        activeHandles[handle] = true;
        RESOLVED.then(function () {
          return findAndClearHandle(handle) && cb();
        });
        return handle;
      },
      clearImmediate: function clearImmediate(handle) {
        findAndClearHandle(handle);
      }
    };

    var AsapAction = function (_super) {
      __extends(AsapAction, _super);

      function AsapAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;

        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
      }

      AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }

        if (delay !== null && delay > 0) {
          return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }

        scheduler.actions.push(this);
        return scheduler.scheduled || (scheduler.scheduled = Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
      };

      AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }

        if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
          return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }

        if (scheduler.actions.length === 0) {
          Immediate.clearImmediate(id);
          scheduler.scheduled = undefined;
        }

        return undefined;
      };

      return AsapAction;
    }(AsyncAction);

    var AsapScheduler = function (_super) {
      __extends(AsapScheduler, _super);

      function AsapScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      AsapScheduler.prototype.flush = function (action) {
        this.active = true;
        this.scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();

        do {
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        } while (++index < count && (action = actions.shift()));

        this.active = false;

        if (error) {
          while (++index < count && (action = actions.shift())) {
            action.unsubscribe();
          }

          throw error;
        }
      };

      return AsapScheduler;
    }(AsyncScheduler);

    var asapScheduler = new AsapScheduler(AsapAction);
    var asap = asapScheduler;

    var asyncScheduler = new AsyncScheduler(AsyncAction);
    var async = asyncScheduler;

    var AnimationFrameAction = function (_super) {
      __extends(AnimationFrameAction, _super);

      function AnimationFrameAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;

        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
      }

      AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }

        if (delay !== null && delay > 0) {
          return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }

        scheduler.actions.push(this);
        return scheduler.scheduled || (scheduler.scheduled = requestAnimationFrame(function () {
          return scheduler.flush(null);
        }));
      };

      AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }

        if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
          return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }

        if (scheduler.actions.length === 0) {
          cancelAnimationFrame(id);
          scheduler.scheduled = undefined;
        }

        return undefined;
      };

      return AnimationFrameAction;
    }(AsyncAction);

    var AnimationFrameScheduler = function (_super) {
      __extends(AnimationFrameScheduler, _super);

      function AnimationFrameScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      AnimationFrameScheduler.prototype.flush = function (action) {
        this.active = true;
        this.scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();

        do {
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        } while (++index < count && (action = actions.shift()));

        this.active = false;

        if (error) {
          while (++index < count && (action = actions.shift())) {
            action.unsubscribe();
          }

          throw error;
        }
      };

      return AnimationFrameScheduler;
    }(AsyncScheduler);

    var animationFrameScheduler = new AnimationFrameScheduler(AnimationFrameAction);

    var VirtualTimeScheduler = function (_super) {
      __extends(VirtualTimeScheduler, _super);

      function VirtualTimeScheduler(SchedulerAction, maxFrames) {
        if (SchedulerAction === void 0) {
          SchedulerAction = VirtualAction;
        }

        if (maxFrames === void 0) {
          maxFrames = Number.POSITIVE_INFINITY;
        }

        var _this = _super.call(this, SchedulerAction, function () {
          return _this.frame;
        }) || this;

        _this.maxFrames = maxFrames;
        _this.frame = 0;
        _this.index = -1;
        return _this;
      }

      VirtualTimeScheduler.prototype.flush = function () {
        var _a = this,
            actions = _a.actions,
            maxFrames = _a.maxFrames;

        var error, action;

        while ((action = actions[0]) && action.delay <= maxFrames) {
          actions.shift();
          this.frame = action.delay;

          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        }

        if (error) {
          while (action = actions.shift()) {
            action.unsubscribe();
          }

          throw error;
        }
      };

      VirtualTimeScheduler.frameTimeFactor = 10;
      return VirtualTimeScheduler;
    }(AsyncScheduler);

    var VirtualAction = function (_super) {
      __extends(VirtualAction, _super);

      function VirtualAction(scheduler, work, index) {
        if (index === void 0) {
          index = scheduler.index += 1;
        }

        var _this = _super.call(this, scheduler, work) || this;

        _this.scheduler = scheduler;
        _this.work = work;
        _this.index = index;
        _this.active = true;
        _this.index = scheduler.index = index;
        return _this;
      }

      VirtualAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
          delay = 0;
        }

        if (!this.id) {
          return _super.prototype.schedule.call(this, state, delay);
        }

        this.active = false;
        var action = new VirtualAction(this.scheduler, this.work);
        this.add(action);
        return action.schedule(state, delay);
      };

      VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }

        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction.sortActions);
        return true;
      };

      VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {

        return undefined;
      };

      VirtualAction.prototype._execute = function (state, delay) {
        if (this.active === true) {
          return _super.prototype._execute.call(this, state, delay);
        }
      };

      VirtualAction.sortActions = function (a, b) {
        if (a.delay === b.delay) {
          if (a.index === b.index) {
            return 0;
          } else if (a.index > b.index) {
            return 1;
          } else {
            return -1;
          }
        } else if (a.delay > b.delay) {
          return 1;
        } else {
          return -1;
        }
      };

      return VirtualAction;
    }(AsyncAction);

    function noop() {}

    var ArgumentOutOfRangeErrorImpl = function () {
      function ArgumentOutOfRangeErrorImpl() {
        Error.call(this);
        this.message = 'argument out of range';
        this.name = 'ArgumentOutOfRangeError';
        return this;
      }

      ArgumentOutOfRangeErrorImpl.prototype = Object.create(Error.prototype);
      return ArgumentOutOfRangeErrorImpl;
    }();

    var ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;

    var EmptyErrorImpl = function () {
      function EmptyErrorImpl() {
        Error.call(this);
        this.message = 'no elements in sequence';
        this.name = 'EmptyError';
        return this;
      }

      EmptyErrorImpl.prototype = Object.create(Error.prototype);
      return EmptyErrorImpl;
    }();

    var EmptyError = EmptyErrorImpl;

    function map(project, thisArg) {
      return function mapOperation(source) {
        if (typeof project !== 'function') {
          throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
        }

        return source.lift(new MapOperator(project, thisArg));
      };
    }

    var MapOperator = function () {
      function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
      }

      MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
      };

      return MapOperator;
    }();

    var MapSubscriber = function (_super) {
      __extends(MapSubscriber, _super);

      function MapSubscriber(destination, project, thisArg) {
        var _this = _super.call(this, destination) || this;

        _this.project = project;
        _this.count = 0;
        _this.thisArg = thisArg || _this;
        return _this;
      }

      MapSubscriber.prototype._next = function (value) {
        var result;

        try {
          result = this.project.call(this.thisArg, value, this.count++);
        } catch (err) {
          this.destination.error(err);
          return;
        }

        this.destination.next(result);
      };

      return MapSubscriber;
    }(Subscriber);

    var OuterSubscriber = function (_super) {
      __extends(OuterSubscriber, _super);

      function OuterSubscriber() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
      };

      OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
      };

      OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
      };

      return OuterSubscriber;
    }(Subscriber);

    var InnerSubscriber = function (_super) {
      __extends(InnerSubscriber, _super);

      function InnerSubscriber(parent, outerValue, outerIndex) {
        var _this = _super.call(this) || this;

        _this.parent = parent;
        _this.outerValue = outerValue;
        _this.outerIndex = outerIndex;
        _this.index = 0;
        return _this;
      }

      InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
      };

      InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
      };

      InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
      };

      return InnerSubscriber;
    }(Subscriber);

    var subscribeToPromise = function subscribeToPromise(promise) {
      return function (subscriber) {
        promise.then(function (value) {
          if (!subscriber.closed) {
            subscriber.next(value);
            subscriber.complete();
          }
        }, function (err) {
          return subscriber.error(err);
        }).then(null, hostReportError);
        return subscriber;
      };
    };

    function getSymbolIterator() {
      if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
      }

      return Symbol.iterator;
    }
    var iterator = getSymbolIterator();

    var subscribeToIterable = function subscribeToIterable(iterable) {
      return function (subscriber) {
        var iterator$1 = iterable[iterator]();

        do {
          var item = void 0;

          try {
            item = iterator$1.next();
          } catch (err) {
            subscriber.error(err);
            return subscriber;
          }

          if (item.done) {
            subscriber.complete();
            break;
          }

          subscriber.next(item.value);

          if (subscriber.closed) {
            break;
          }
        } while (true);

        if (typeof iterator$1["return"] === 'function') {
          subscriber.add(function () {
            if (iterator$1["return"]) {
              iterator$1["return"]();
            }
          });
        }

        return subscriber;
      };
    };

    var subscribeToObservable = function subscribeToObservable(obj) {
      return function (subscriber) {
        var obs = obj[observable]();

        if (typeof obs.subscribe !== 'function') {
          throw new TypeError('Provided object does not correctly implement Symbol.observable');
        } else {
          return obs.subscribe(subscriber);
        }
      };
    };

    var isArrayLike = function isArrayLike(x) {
      return x && typeof x.length === 'number' && typeof x !== 'function';
    };

    function isPromise(value) {
      return !!value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
    }

    var subscribeTo = function subscribeTo(result) {
      if (!!result && typeof result[observable] === 'function') {
        return subscribeToObservable(result);
      } else if (isArrayLike(result)) {
        return subscribeToArray(result);
      } else if (isPromise(result)) {
        return subscribeToPromise(result);
      } else if (!!result && typeof result[iterator] === 'function') {
        return subscribeToIterable(result);
      } else {
        var value = isObject$1(result) ? 'an invalid object' : "'" + result + "'";
        var msg = "You provided " + value + " where a stream was expected." + ' You can provide an Observable, Promise, Array, or Iterable.';
        throw new TypeError(msg);
      }
    };

    function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, innerSubscriber) {
      if (innerSubscriber === void 0) {
        innerSubscriber = new InnerSubscriber(outerSubscriber, outerValue, outerIndex);
      }

      if (innerSubscriber.closed) {
        return undefined;
      }

      if (result instanceof Observable) {
        return result.subscribe(innerSubscriber);
      }

      return subscribeTo(result)(innerSubscriber);
    }

    var NONE = {};

    var CombineLatestSubscriber = function (_super) {
      __extends(CombineLatestSubscriber, _super);

      function CombineLatestSubscriber(destination, resultSelector) {
        var _this = _super.call(this, destination) || this;

        _this.resultSelector = resultSelector;
        _this.active = 0;
        _this.values = [];
        _this.observables = [];
        return _this;
      }

      CombineLatestSubscriber.prototype._next = function (observable) {
        this.values.push(NONE);
        this.observables.push(observable);
      };

      CombineLatestSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;

        if (len === 0) {
          this.destination.complete();
        } else {
          this.active = len;
          this.toRespond = len;

          for (var i = 0; i < len; i++) {
            var observable = observables[i];
            this.add(subscribeToResult(this, observable, undefined, i));
          }
        }
      };

      CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
        if ((this.active -= 1) === 0) {
          this.destination.complete();
        }
      };

      CombineLatestSubscriber.prototype.notifyNext = function (_outerValue, innerValue, outerIndex) {
        var values = this.values;
        var oldVal = values[outerIndex];
        var toRespond = !this.toRespond ? 0 : oldVal === NONE ? --this.toRespond : this.toRespond;
        values[outerIndex] = innerValue;

        if (toRespond === 0) {
          if (this.resultSelector) {
            this._tryResultSelector(values);
          } else {
            this.destination.next(values.slice());
          }
        }
      };

      CombineLatestSubscriber.prototype._tryResultSelector = function (values) {
        var result;

        try {
          result = this.resultSelector.apply(this, values);
        } catch (err) {
          this.destination.error(err);
          return;
        }

        this.destination.next(result);
      };

      return CombineLatestSubscriber;
    }(OuterSubscriber);

    var SimpleInnerSubscriber = function (_super) {
      __extends(SimpleInnerSubscriber, _super);

      function SimpleInnerSubscriber(parent) {
        var _this = _super.call(this) || this;

        _this.parent = parent;
        return _this;
      }

      SimpleInnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(value);
      };

      SimpleInnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error);
        this.unsubscribe();
      };

      SimpleInnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete();
        this.unsubscribe();
      };

      return SimpleInnerSubscriber;
    }(Subscriber);

    var ComplexInnerSubscriber = function (_super) {
      __extends(ComplexInnerSubscriber, _super);

      function ComplexInnerSubscriber(parent, outerValue, outerIndex) {
        var _this = _super.call(this) || this;

        _this.parent = parent;
        _this.outerValue = outerValue;
        _this.outerIndex = outerIndex;
        return _this;
      }

      ComplexInnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this);
      };

      ComplexInnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error);
        this.unsubscribe();
      };

      ComplexInnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
      };

      return ComplexInnerSubscriber;
    }(Subscriber);

    var SimpleOuterSubscriber = function (_super) {
      __extends(SimpleOuterSubscriber, _super);

      function SimpleOuterSubscriber() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      SimpleOuterSubscriber.prototype.notifyNext = function (innerValue) {
        this.destination.next(innerValue);
      };

      SimpleOuterSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
      };

      SimpleOuterSubscriber.prototype.notifyComplete = function () {
        this.destination.complete();
      };

      return SimpleOuterSubscriber;
    }(Subscriber);

    var ComplexOuterSubscriber = function (_super) {
      __extends(ComplexOuterSubscriber, _super);

      function ComplexOuterSubscriber() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      ComplexOuterSubscriber.prototype.notifyNext = function (_outerValue, innerValue, _outerIndex, _innerSub) {
        this.destination.next(innerValue);
      };

      ComplexOuterSubscriber.prototype.notifyError = function (error) {
        this.destination.error(error);
      };

      ComplexOuterSubscriber.prototype.notifyComplete = function (_innerSub) {
        this.destination.complete();
      };

      return ComplexOuterSubscriber;
    }(Subscriber);
    function innerSubscribe(result, innerSubscriber) {
      if (innerSubscriber.closed) {
        return undefined;
      }

      if (result instanceof Observable) {
        return result.subscribe(innerSubscriber);
      }

      return subscribeTo(result)(innerSubscriber);
    }

    var MergeMapSubscriber = function (_super) {
      __extends(MergeMapSubscriber, _super);

      function MergeMapSubscriber(destination, project, concurrent) {
        if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
        }

        var _this = _super.call(this, destination) || this;

        _this.project = project;
        _this.concurrent = concurrent;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        _this.index = 0;
        return _this;
      }

      MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
          this._tryNext(value);
        } else {
          this.buffer.push(value);
        }
      };

      MergeMapSubscriber.prototype._tryNext = function (value) {
        var result;
        var index = this.index++;

        try {
          result = this.project(value, index);
        } catch (err) {
          this.destination.error(err);
          return;
        }

        this.active++;

        this._innerSub(result);
      };

      MergeMapSubscriber.prototype._innerSub = function (ish) {
        var innerSubscriber = new SimpleInnerSubscriber(this);
        var destination = this.destination;
        destination.add(innerSubscriber);
        var innerSubscription = innerSubscribe(ish, innerSubscriber);

        if (innerSubscription !== innerSubscriber) {
          destination.add(innerSubscription);
        }
      };

      MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;

        if (this.active === 0 && this.buffer.length === 0) {
          this.destination.complete();
        }

        this.unsubscribe();
      };

      MergeMapSubscriber.prototype.notifyNext = function (innerValue) {
        this.destination.next(innerValue);
      };

      MergeMapSubscriber.prototype.notifyComplete = function () {
        var buffer = this.buffer;
        this.active--;

        if (buffer.length > 0) {
          this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
          this.destination.complete();
        }
      };

      return MergeMapSubscriber;
    }(SimpleOuterSubscriber);

    function fromEvent(target, eventName, options, resultSelector) {
      if (isFunction$1(options)) {
        resultSelector = options;
        options = undefined;
      }

      if (resultSelector) {
        return fromEvent(target, eventName, options).pipe(map(function (args) {
          return isArray$1(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
        }));
      }

      return new Observable(function (subscriber) {
        function handler(e) {
          if (arguments.length > 1) {
            subscriber.next(Array.prototype.slice.call(arguments));
          } else {
            subscriber.next(e);
          }
        }

        setupSubscription(target, eventName, handler, subscriber, options);
      });
    }

    function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
      var unsubscribe;

      if (isEventTarget(sourceObj)) {
        var source_1 = sourceObj;
        sourceObj.addEventListener(eventName, handler, options);

        unsubscribe = function unsubscribe() {
          return source_1.removeEventListener(eventName, handler, options);
        };
      } else if (isJQueryStyleEventEmitter(sourceObj)) {
        var source_2 = sourceObj;
        sourceObj.on(eventName, handler);

        unsubscribe = function unsubscribe() {
          return source_2.off(eventName, handler);
        };
      } else if (isNodeStyleEventEmitter(sourceObj)) {
        var source_3 = sourceObj;
        sourceObj.addListener(eventName, handler);

        unsubscribe = function unsubscribe() {
          return source_3.removeListener(eventName, handler);
        };
      } else if (sourceObj && sourceObj.length) {
        for (var i = 0, len = sourceObj.length; i < len; i++) {
          setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
        }
      } else {
        throw new TypeError('Invalid event target');
      }

      subscriber.add(unsubscribe);
    }

    function isNodeStyleEventEmitter(sourceObj) {
      return sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
    }

    function isJQueryStyleEventEmitter(sourceObj) {
      return sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
    }

    function isEventTarget(sourceObj) {
      return sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
    }

    function isNumeric$1(val) {
      return !isArray$1(val) && val - parseFloat(val) + 1 >= 0;
    }

    function filter(predicate, thisArg) {
      return function filterOperatorFunction(source) {
        return source.lift(new FilterOperator(predicate, thisArg));
      };
    }

    var FilterOperator = function () {
      function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
      }

      FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
      };

      return FilterOperator;
    }();

    var FilterSubscriber = function (_super) {
      __extends(FilterSubscriber, _super);

      function FilterSubscriber(destination, predicate, thisArg) {
        var _this = _super.call(this, destination) || this;

        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.count = 0;
        return _this;
      }

      FilterSubscriber.prototype._next = function (value) {
        var result;

        try {
          result = this.predicate.call(this.thisArg, value, this.count++);
        } catch (err) {
          this.destination.error(err);
          return;
        }

        if (result) {
          this.destination.next(value);
        }
      };

      return FilterSubscriber;
    }(Subscriber);

    var RaceSubscriber = function (_super) {
      __extends(RaceSubscriber, _super);

      function RaceSubscriber(destination) {
        var _this = _super.call(this, destination) || this;

        _this.hasFirst = false;
        _this.observables = [];
        _this.subscriptions = [];
        return _this;
      }

      RaceSubscriber.prototype._next = function (observable) {
        this.observables.push(observable);
      };

      RaceSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;

        if (len === 0) {
          this.destination.complete();
        } else {
          for (var i = 0; i < len && !this.hasFirst; i++) {
            var observable = observables[i];
            var subscription = subscribeToResult(this, observable, undefined, i);

            if (this.subscriptions) {
              this.subscriptions.push(subscription);
            }

            this.add(subscription);
          }

          this.observables = null;
        }
      };

      RaceSubscriber.prototype.notifyNext = function (_outerValue, innerValue, outerIndex) {
        if (!this.hasFirst) {
          this.hasFirst = true;

          for (var i = 0; i < this.subscriptions.length; i++) {
            if (i !== outerIndex) {
              var subscription = this.subscriptions[i];
              subscription.unsubscribe();
              this.remove(subscription);
            }
          }

          this.subscriptions = null;
        }

        this.destination.next(innerValue);
      };

      return RaceSubscriber;
    }(OuterSubscriber);

    var ZipSubscriber = function (_super) {
      __extends(ZipSubscriber, _super);

      function ZipSubscriber(destination, resultSelector, values) {

        var _this = _super.call(this, destination) || this;

        _this.resultSelector = resultSelector;
        _this.iterators = [];
        _this.active = 0;
        _this.resultSelector = typeof resultSelector === 'function' ? resultSelector : undefined;
        return _this;
      }

      ZipSubscriber.prototype._next = function (value) {
        var iterators = this.iterators;

        if (isArray$1(value)) {
          iterators.push(new StaticArrayIterator(value));
        } else if (typeof value[iterator] === 'function') {
          iterators.push(new StaticIterator(value[iterator]()));
        } else {
          iterators.push(new ZipBufferIterator(this.destination, this, value));
        }
      };

      ZipSubscriber.prototype._complete = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        this.unsubscribe();

        if (len === 0) {
          this.destination.complete();
          return;
        }

        this.active = len;

        for (var i = 0; i < len; i++) {
          var iterator = iterators[i];

          if (iterator.stillUnsubscribed) {
            var destination = this.destination;
            destination.add(iterator.subscribe());
          } else {
            this.active--;
          }
        }
      };

      ZipSubscriber.prototype.notifyInactive = function () {
        this.active--;

        if (this.active === 0) {
          this.destination.complete();
        }
      };

      ZipSubscriber.prototype.checkIterators = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        var destination = this.destination;

        for (var i = 0; i < len; i++) {
          var iterator = iterators[i];

          if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
            return;
          }
        }

        var shouldComplete = false;
        var args = [];

        for (var i = 0; i < len; i++) {
          var iterator = iterators[i];
          var result = iterator.next();

          if (iterator.hasCompleted()) {
            shouldComplete = true;
          }

          if (result.done) {
            destination.complete();
            return;
          }

          args.push(result.value);
        }

        if (this.resultSelector) {
          this._tryresultSelector(args);
        } else {
          destination.next(args);
        }

        if (shouldComplete) {
          destination.complete();
        }
      };

      ZipSubscriber.prototype._tryresultSelector = function (args) {
        var result;

        try {
          result = this.resultSelector.apply(this, args);
        } catch (err) {
          this.destination.error(err);
          return;
        }

        this.destination.next(result);
      };

      return ZipSubscriber;
    }(Subscriber);

    var StaticIterator = function () {
      function StaticIterator(iterator) {
        this.iterator = iterator;
        this.nextResult = iterator.next();
      }

      StaticIterator.prototype.hasValue = function () {
        return true;
      };

      StaticIterator.prototype.next = function () {
        var result = this.nextResult;
        this.nextResult = this.iterator.next();
        return result;
      };

      StaticIterator.prototype.hasCompleted = function () {
        var nextResult = this.nextResult;
        return Boolean(nextResult && nextResult.done);
      };

      return StaticIterator;
    }();

    var StaticArrayIterator = function () {
      function StaticArrayIterator(array) {
        this.array = array;
        this.index = 0;
        this.length = 0;
        this.length = array.length;
      }

      StaticArrayIterator.prototype[iterator] = function () {
        return this;
      };

      StaticArrayIterator.prototype.next = function (value) {
        var i = this.index++;
        var array = this.array;
        return i < this.length ? {
          value: array[i],
          done: false
        } : {
          value: null,
          done: true
        };
      };

      StaticArrayIterator.prototype.hasValue = function () {
        return this.array.length > this.index;
      };

      StaticArrayIterator.prototype.hasCompleted = function () {
        return this.array.length === this.index;
      };

      return StaticArrayIterator;
    }();

    var ZipBufferIterator = function (_super) {
      __extends(ZipBufferIterator, _super);

      function ZipBufferIterator(destination, parent, observable) {
        var _this = _super.call(this, destination) || this;

        _this.parent = parent;
        _this.observable = observable;
        _this.stillUnsubscribed = true;
        _this.buffer = [];
        _this.isComplete = false;
        return _this;
      }

      ZipBufferIterator.prototype[iterator] = function () {
        return this;
      };

      ZipBufferIterator.prototype.next = function () {
        var buffer = this.buffer;

        if (buffer.length === 0 && this.isComplete) {
          return {
            value: null,
            done: true
          };
        } else {
          return {
            value: buffer.shift(),
            done: false
          };
        }
      };

      ZipBufferIterator.prototype.hasValue = function () {
        return this.buffer.length > 0;
      };

      ZipBufferIterator.prototype.hasCompleted = function () {
        return this.buffer.length === 0 && this.isComplete;
      };

      ZipBufferIterator.prototype.notifyComplete = function () {
        if (this.buffer.length > 0) {
          this.isComplete = true;
          this.parent.notifyInactive();
        } else {
          this.destination.complete();
        }
      };

      ZipBufferIterator.prototype.notifyNext = function (innerValue) {
        this.buffer.push(innerValue);
        this.parent.checkIterators();
      };

      ZipBufferIterator.prototype.subscribe = function () {
        return innerSubscribe(this.observable, new SimpleInnerSubscriber(this));
      };

      return ZipBufferIterator;
    }(SimpleOuterSubscriber);

    var mutationObserver$ = function mutationObserver$(target, config) {
      return new Observable(function (observer) {
        var mutation = new MutationObserver(function (mutations, instance) {
          observer.next(mutations);
        });
        mutation.observe(target, config);

        var unsubscribe = function unsubscribe() {
          mutation.disconnect();
        };

        return unsubscribe;
      });
    };

    var AuditSubscriber = function (_super) {
      __extends(AuditSubscriber, _super);

      function AuditSubscriber(destination, durationSelector) {
        var _this = _super.call(this, destination) || this;

        _this.durationSelector = durationSelector;
        _this.hasValue = false;
        return _this;
      }

      AuditSubscriber.prototype._next = function (value) {
        this.value = value;
        this.hasValue = true;

        if (!this.throttled) {
          var duration = void 0;

          try {
            var durationSelector = this.durationSelector;
            duration = durationSelector(value);
          } catch (err) {
            return this.destination.error(err);
          }

          var innerSubscription = innerSubscribe(duration, new SimpleInnerSubscriber(this));

          if (!innerSubscription || innerSubscription.closed) {
            this.clearThrottle();
          } else {
            this.add(this.throttled = innerSubscription);
          }
        }
      };

      AuditSubscriber.prototype.clearThrottle = function () {
        var _a = this,
            value = _a.value,
            hasValue = _a.hasValue,
            throttled = _a.throttled;

        if (throttled) {
          this.remove(throttled);
          this.throttled = undefined;
          throttled.unsubscribe();
        }

        if (hasValue) {
          this.value = undefined;
          this.hasValue = false;
          this.destination.next(value);
        }
      };

      AuditSubscriber.prototype.notifyNext = function () {
        this.clearThrottle();
      };

      AuditSubscriber.prototype.notifyComplete = function () {
        this.clearThrottle();
      };

      return AuditSubscriber;
    }(SimpleOuterSubscriber);

    var BufferSubscriber = function (_super) {
      __extends(BufferSubscriber, _super);

      function BufferSubscriber(destination, closingNotifier) {
        var _this = _super.call(this, destination) || this;

        _this.buffer = [];

        _this.add(innerSubscribe(closingNotifier, new SimpleInnerSubscriber(_this)));

        return _this;
      }

      BufferSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
      };

      BufferSubscriber.prototype.notifyNext = function () {
        var buffer = this.buffer;
        this.buffer = [];
        this.destination.next(buffer);
      };

      return BufferSubscriber;
    }(SimpleOuterSubscriber);

    var BufferCountSubscriber = function (_super) {
      __extends(BufferCountSubscriber, _super);

      function BufferCountSubscriber(destination, bufferSize) {
        var _this = _super.call(this, destination) || this;

        _this.bufferSize = bufferSize;
        _this.buffer = [];
        return _this;
      }

      BufferCountSubscriber.prototype._next = function (value) {
        var buffer = this.buffer;
        buffer.push(value);

        if (buffer.length == this.bufferSize) {
          this.destination.next(buffer);
          this.buffer = [];
        }
      };

      BufferCountSubscriber.prototype._complete = function () {
        var buffer = this.buffer;

        if (buffer.length > 0) {
          this.destination.next(buffer);
        }

        _super.prototype._complete.call(this);
      };

      return BufferCountSubscriber;
    }(Subscriber);

    var BufferSkipCountSubscriber = function (_super) {
      __extends(BufferSkipCountSubscriber, _super);

      function BufferSkipCountSubscriber(destination, bufferSize, startBufferEvery) {
        var _this = _super.call(this, destination) || this;

        _this.bufferSize = bufferSize;
        _this.startBufferEvery = startBufferEvery;
        _this.buffers = [];
        _this.count = 0;
        return _this;
      }

      BufferSkipCountSubscriber.prototype._next = function (value) {
        var _a = this,
            bufferSize = _a.bufferSize,
            startBufferEvery = _a.startBufferEvery,
            buffers = _a.buffers,
            count = _a.count;

        this.count++;

        if (count % startBufferEvery === 0) {
          buffers.push([]);
        }

        for (var i = buffers.length; i--;) {
          var buffer = buffers[i];
          buffer.push(value);

          if (buffer.length === bufferSize) {
            buffers.splice(i, 1);
            this.destination.next(buffer);
          }
        }
      };

      BufferSkipCountSubscriber.prototype._complete = function () {
        var _a = this,
            buffers = _a.buffers,
            destination = _a.destination;

        while (buffers.length > 0) {
          var buffer = buffers.shift();

          if (buffer.length > 0) {
            destination.next(buffer);
          }
        }

        _super.prototype._complete.call(this);
      };

      return BufferSkipCountSubscriber;
    }(Subscriber);

    var Context = function () {
      function Context() {
        this.buffer = [];
      }

      return Context;
    }();

    var BufferTimeSubscriber = function (_super) {
      __extends(BufferTimeSubscriber, _super);

      function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
        var _this = _super.call(this, destination) || this;

        _this.bufferTimeSpan = bufferTimeSpan;
        _this.bufferCreationInterval = bufferCreationInterval;
        _this.maxBufferSize = maxBufferSize;
        _this.scheduler = scheduler;
        _this.contexts = [];

        var context = _this.openContext();

        _this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;

        if (_this.timespanOnly) {
          var timeSpanOnlyState = {
            subscriber: _this,
            context: context,
            bufferTimeSpan: bufferTimeSpan
          };

          _this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        } else {
          var closeState = {
            subscriber: _this,
            context: context
          };
          var creationState = {
            bufferTimeSpan: bufferTimeSpan,
            bufferCreationInterval: bufferCreationInterval,
            subscriber: _this,
            scheduler: scheduler
          };

          _this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));

          _this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
        }

        return _this;
      }

      BufferTimeSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        var len = contexts.length;
        var filledBufferContext;

        for (var i = 0; i < len; i++) {
          var context_1 = contexts[i];
          var buffer = context_1.buffer;
          buffer.push(value);

          if (buffer.length == this.maxBufferSize) {
            filledBufferContext = context_1;
          }
        }

        if (filledBufferContext) {
          this.onBufferFull(filledBufferContext);
        }
      };

      BufferTimeSubscriber.prototype._error = function (err) {
        this.contexts.length = 0;

        _super.prototype._error.call(this, err);
      };

      BufferTimeSubscriber.prototype._complete = function () {
        var _a = this,
            contexts = _a.contexts,
            destination = _a.destination;

        while (contexts.length > 0) {
          var context_2 = contexts.shift();
          destination.next(context_2.buffer);
        }

        _super.prototype._complete.call(this);
      };

      BufferTimeSubscriber.prototype._unsubscribe = function () {
        this.contexts = null;
      };

      BufferTimeSubscriber.prototype.onBufferFull = function (context) {
        this.closeContext(context);
        var closeAction = context.closeAction;
        closeAction.unsubscribe();
        this.remove(closeAction);

        if (!this.closed && this.timespanOnly) {
          context = this.openContext();
          var bufferTimeSpan = this.bufferTimeSpan;
          var timeSpanOnlyState = {
            subscriber: this,
            context: context,
            bufferTimeSpan: bufferTimeSpan
          };
          this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        }
      };

      BufferTimeSubscriber.prototype.openContext = function () {
        var context = new Context();
        this.contexts.push(context);
        return context;
      };

      BufferTimeSubscriber.prototype.closeContext = function (context) {
        this.destination.next(context.buffer);
        var contexts = this.contexts;
        var spliceIndex = contexts ? contexts.indexOf(context) : -1;

        if (spliceIndex >= 0) {
          contexts.splice(contexts.indexOf(context), 1);
        }
      };

      return BufferTimeSubscriber;
    }(Subscriber);

    function dispatchBufferTimeSpanOnly(state) {
      var subscriber = state.subscriber;
      var prevContext = state.context;

      if (prevContext) {
        subscriber.closeContext(prevContext);
      }

      if (!subscriber.closed) {
        state.context = subscriber.openContext();
        state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
      }
    }

    function dispatchBufferCreation(state) {
      var bufferCreationInterval = state.bufferCreationInterval,
          bufferTimeSpan = state.bufferTimeSpan,
          subscriber = state.subscriber,
          scheduler = state.scheduler;
      var context = subscriber.openContext();
      var action = this;

      if (!subscriber.closed) {
        subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, {
          subscriber: subscriber,
          context: context
        }));
        action.schedule(state, bufferCreationInterval);
      }
    }

    function dispatchBufferClose(arg) {
      var subscriber = arg.subscriber,
          context = arg.context;
      subscriber.closeContext(context);
    }

    var BufferToggleSubscriber = function (_super) {
      __extends(BufferToggleSubscriber, _super);

      function BufferToggleSubscriber(destination, openings, closingSelector) {
        var _this = _super.call(this, destination) || this;

        _this.closingSelector = closingSelector;
        _this.contexts = [];

        _this.add(subscribeToResult(_this, openings));

        return _this;
      }

      BufferToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        var len = contexts.length;

        for (var i = 0; i < len; i++) {
          contexts[i].buffer.push(value);
        }
      };

      BufferToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;

        while (contexts.length > 0) {
          var context_1 = contexts.shift();
          context_1.subscription.unsubscribe();
          context_1.buffer = null;
          context_1.subscription = null;
        }

        this.contexts = null;

        _super.prototype._error.call(this, err);
      };

      BufferToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;

        while (contexts.length > 0) {
          var context_2 = contexts.shift();
          this.destination.next(context_2.buffer);
          context_2.subscription.unsubscribe();
          context_2.buffer = null;
          context_2.subscription = null;
        }

        this.contexts = null;

        _super.prototype._complete.call(this);
      };

      BufferToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue) {
        outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
      };

      BufferToggleSubscriber.prototype.notifyComplete = function (innerSub) {
        this.closeBuffer(innerSub.context);
      };

      BufferToggleSubscriber.prototype.openBuffer = function (value) {
        try {
          var closingSelector = this.closingSelector;
          var closingNotifier = closingSelector.call(this, value);

          if (closingNotifier) {
            this.trySubscribe(closingNotifier);
          }
        } catch (err) {
          this._error(err);
        }
      };

      BufferToggleSubscriber.prototype.closeBuffer = function (context) {
        var contexts = this.contexts;

        if (contexts && context) {
          var buffer = context.buffer,
              subscription = context.subscription;
          this.destination.next(buffer);
          contexts.splice(contexts.indexOf(context), 1);
          this.remove(subscription);
          subscription.unsubscribe();
        }
      };

      BufferToggleSubscriber.prototype.trySubscribe = function (closingNotifier) {
        var contexts = this.contexts;
        var buffer = [];
        var subscription = new Subscription();
        var context = {
          buffer: buffer,
          subscription: subscription
        };
        contexts.push(context);
        var innerSubscription = subscribeToResult(this, closingNotifier, context);

        if (!innerSubscription || innerSubscription.closed) {
          this.closeBuffer(context);
        } else {
          innerSubscription.context = context;
          this.add(innerSubscription);
          subscription.add(innerSubscription);
        }
      };

      return BufferToggleSubscriber;
    }(OuterSubscriber);

    var BufferWhenSubscriber = function (_super) {
      __extends(BufferWhenSubscriber, _super);

      function BufferWhenSubscriber(destination, closingSelector) {
        var _this = _super.call(this, destination) || this;

        _this.closingSelector = closingSelector;
        _this.subscribing = false;

        _this.openBuffer();

        return _this;
      }

      BufferWhenSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
      };

      BufferWhenSubscriber.prototype._complete = function () {
        var buffer = this.buffer;

        if (buffer) {
          this.destination.next(buffer);
        }

        _super.prototype._complete.call(this);
      };

      BufferWhenSubscriber.prototype._unsubscribe = function () {
        this.buffer = undefined;
        this.subscribing = false;
      };

      BufferWhenSubscriber.prototype.notifyNext = function () {
        this.openBuffer();
      };

      BufferWhenSubscriber.prototype.notifyComplete = function () {
        if (this.subscribing) {
          this.complete();
        } else {
          this.openBuffer();
        }
      };

      BufferWhenSubscriber.prototype.openBuffer = function () {
        var closingSubscription = this.closingSubscription;

        if (closingSubscription) {
          this.remove(closingSubscription);
          closingSubscription.unsubscribe();
        }

        var buffer = this.buffer;

        if (this.buffer) {
          this.destination.next(buffer);
        }

        this.buffer = [];
        var closingNotifier;

        try {
          var closingSelector = this.closingSelector;
          closingNotifier = closingSelector();
        } catch (err) {
          return this.error(err);
        }

        closingSubscription = new Subscription();
        this.closingSubscription = closingSubscription;
        this.add(closingSubscription);
        this.subscribing = true;
        closingSubscription.add(innerSubscribe(closingNotifier, new SimpleInnerSubscriber(this)));
        this.subscribing = false;
      };

      return BufferWhenSubscriber;
    }(SimpleOuterSubscriber);

    var CatchSubscriber = function (_super) {
      __extends(CatchSubscriber, _super);

      function CatchSubscriber(destination, selector, caught) {
        var _this = _super.call(this, destination) || this;

        _this.selector = selector;
        _this.caught = caught;
        return _this;
      }

      CatchSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
          var result = void 0;

          try {
            result = this.selector(err, this.caught);
          } catch (err2) {
            _super.prototype.error.call(this, err2);

            return;
          }

          this._unsubscribeAndRecycle();

          var innerSubscriber = new SimpleInnerSubscriber(this);
          this.add(innerSubscriber);
          var innerSubscription = innerSubscribe(result, innerSubscriber);

          if (innerSubscription !== innerSubscriber) {
            this.add(innerSubscription);
          }
        }
      };

      return CatchSubscriber;
    }(SimpleOuterSubscriber);

    var CountSubscriber = function (_super) {
      __extends(CountSubscriber, _super);

      function CountSubscriber(destination, predicate, source) {
        var _this = _super.call(this, destination) || this;

        _this.predicate = predicate;
        _this.source = source;
        _this.count = 0;
        _this.index = 0;
        return _this;
      }

      CountSubscriber.prototype._next = function (value) {
        if (this.predicate) {
          this._tryPredicate(value);
        } else {
          this.count++;
        }
      };

      CountSubscriber.prototype._tryPredicate = function (value) {
        var result;

        try {
          result = this.predicate(value, this.index++, this.source);
        } catch (err) {
          this.destination.error(err);
          return;
        }

        if (result) {
          this.count++;
        }
      };

      CountSubscriber.prototype._complete = function () {
        this.destination.next(this.count);
        this.destination.complete();
      };

      return CountSubscriber;
    }(Subscriber);

    var DebounceSubscriber = function (_super) {
      __extends(DebounceSubscriber, _super);

      function DebounceSubscriber(destination, durationSelector) {
        var _this = _super.call(this, destination) || this;

        _this.durationSelector = durationSelector;
        _this.hasValue = false;
        return _this;
      }

      DebounceSubscriber.prototype._next = function (value) {
        try {
          var result = this.durationSelector.call(this, value);

          if (result) {
            this._tryNext(value, result);
          }
        } catch (err) {
          this.destination.error(err);
        }
      };

      DebounceSubscriber.prototype._complete = function () {
        this.emitValue();
        this.destination.complete();
      };

      DebounceSubscriber.prototype._tryNext = function (value, duration) {
        var subscription = this.durationSubscription;
        this.value = value;
        this.hasValue = true;

        if (subscription) {
          subscription.unsubscribe();
          this.remove(subscription);
        }

        subscription = innerSubscribe(duration, new SimpleInnerSubscriber(this));

        if (subscription && !subscription.closed) {
          this.add(this.durationSubscription = subscription);
        }
      };

      DebounceSubscriber.prototype.notifyNext = function () {
        this.emitValue();
      };

      DebounceSubscriber.prototype.notifyComplete = function () {
        this.emitValue();
      };

      DebounceSubscriber.prototype.emitValue = function () {
        if (this.hasValue) {
          var value = this.value;
          var subscription = this.durationSubscription;

          if (subscription) {
            this.durationSubscription = undefined;
            subscription.unsubscribe();
            this.remove(subscription);
          }

          this.value = undefined;
          this.hasValue = false;

          _super.prototype._next.call(this, value);
        }
      };

      return DebounceSubscriber;
    }(SimpleOuterSubscriber);

    function debounceTime(dueTime, scheduler) {
      if (scheduler === void 0) {
        scheduler = async;
      }

      return function (source) {
        return source.lift(new DebounceTimeOperator(dueTime, scheduler));
      };
    }

    var DebounceTimeOperator = function () {
      function DebounceTimeOperator(dueTime, scheduler) {
        this.dueTime = dueTime;
        this.scheduler = scheduler;
      }

      DebounceTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
      };

      return DebounceTimeOperator;
    }();

    var DebounceTimeSubscriber = function (_super) {
      __extends(DebounceTimeSubscriber, _super);

      function DebounceTimeSubscriber(destination, dueTime, scheduler) {
        var _this = _super.call(this, destination) || this;

        _this.dueTime = dueTime;
        _this.scheduler = scheduler;
        _this.debouncedSubscription = null;
        _this.lastValue = null;
        _this.hasValue = false;
        return _this;
      }

      DebounceTimeSubscriber.prototype._next = function (value) {
        this.clearDebounce();
        this.lastValue = value;
        this.hasValue = true;
        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
      };

      DebounceTimeSubscriber.prototype._complete = function () {
        this.debouncedNext();
        this.destination.complete();
      };

      DebounceTimeSubscriber.prototype.debouncedNext = function () {
        this.clearDebounce();

        if (this.hasValue) {
          var lastValue = this.lastValue;
          this.lastValue = null;
          this.hasValue = false;
          this.destination.next(lastValue);
        }
      };

      DebounceTimeSubscriber.prototype.clearDebounce = function () {
        var debouncedSubscription = this.debouncedSubscription;

        if (debouncedSubscription !== null) {
          this.remove(debouncedSubscription);
          debouncedSubscription.unsubscribe();
          this.debouncedSubscription = null;
        }
      };

      return DebounceTimeSubscriber;
    }(Subscriber);

    function dispatchNext(subscriber) {
      subscriber.debouncedNext();
    }

    var DefaultIfEmptySubscriber = function (_super) {
      __extends(DefaultIfEmptySubscriber, _super);

      function DefaultIfEmptySubscriber(destination, defaultValue) {
        var _this = _super.call(this, destination) || this;

        _this.defaultValue = defaultValue;
        _this.isEmpty = true;
        return _this;
      }

      DefaultIfEmptySubscriber.prototype._next = function (value) {
        this.isEmpty = false;
        this.destination.next(value);
      };

      DefaultIfEmptySubscriber.prototype._complete = function () {
        if (this.isEmpty) {
          this.destination.next(this.defaultValue);
        }

        this.destination.complete();
      };

      return DefaultIfEmptySubscriber;
    }(Subscriber);

    var DelaySubscriber = function (_super) {
      __extends(DelaySubscriber, _super);

      function DelaySubscriber(destination, delay, scheduler) {
        var _this = _super.call(this, destination) || this;

        _this.delay = delay;
        _this.scheduler = scheduler;
        _this.queue = [];
        _this.active = false;
        _this.errored = false;
        return _this;
      }

      DelaySubscriber.dispatch = function (state) {
        var source = state.source;
        var queue = source.queue;
        var scheduler = state.scheduler;
        var destination = state.destination;

        while (queue.length > 0 && queue[0].time - scheduler.now() <= 0) {
          queue.shift().notification.observe(destination);
        }

        if (queue.length > 0) {
          var delay_1 = Math.max(0, queue[0].time - scheduler.now());
          this.schedule(state, delay_1);
        } else {
          this.unsubscribe();
          source.active = false;
        }
      };

      DelaySubscriber.prototype._schedule = function (scheduler) {
        this.active = true;
        var destination = this.destination;
        destination.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
          source: this,
          destination: this.destination,
          scheduler: scheduler
        }));
      };

      DelaySubscriber.prototype.scheduleNotification = function (notification) {
        if (this.errored === true) {
          return;
        }

        var scheduler = this.scheduler;
        var message = new DelayMessage(scheduler.now() + this.delay, notification);
        this.queue.push(message);

        if (this.active === false) {
          this._schedule(scheduler);
        }
      };

      DelaySubscriber.prototype._next = function (value) {
        this.scheduleNotification(Notification.createNext(value));
      };

      DelaySubscriber.prototype._error = function (err) {
        this.errored = true;
        this.queue = [];
        this.destination.error(err);
        this.unsubscribe();
      };

      DelaySubscriber.prototype._complete = function () {
        this.scheduleNotification(Notification.createComplete());
        this.unsubscribe();
      };

      return DelaySubscriber;
    }(Subscriber);

    var DelayMessage = function () {
      function DelayMessage(time, notification) {
        this.time = time;
        this.notification = notification;
      }

      return DelayMessage;
    }();

    var DelayWhenSubscriber = function (_super) {
      __extends(DelayWhenSubscriber, _super);

      function DelayWhenSubscriber(destination, delayDurationSelector) {
        var _this = _super.call(this, destination) || this;

        _this.delayDurationSelector = delayDurationSelector;
        _this.completed = false;
        _this.delayNotifierSubscriptions = [];
        _this.index = 0;
        return _this;
      }

      DelayWhenSubscriber.prototype.notifyNext = function (outerValue, _innerValue, _outerIndex, _innerIndex, innerSub) {
        this.destination.next(outerValue);
        this.removeSubscription(innerSub);
        this.tryComplete();
      };

      DelayWhenSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
      };

      DelayWhenSubscriber.prototype.notifyComplete = function (innerSub) {
        var value = this.removeSubscription(innerSub);

        if (value) {
          this.destination.next(value);
        }

        this.tryComplete();
      };

      DelayWhenSubscriber.prototype._next = function (value) {
        var index = this.index++;

        try {
          var delayNotifier = this.delayDurationSelector(value, index);

          if (delayNotifier) {
            this.tryDelay(delayNotifier, value);
          }
        } catch (err) {
          this.destination.error(err);
        }
      };

      DelayWhenSubscriber.prototype._complete = function () {
        this.completed = true;
        this.tryComplete();
        this.unsubscribe();
      };

      DelayWhenSubscriber.prototype.removeSubscription = function (subscription) {
        subscription.unsubscribe();
        var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);

        if (subscriptionIdx !== -1) {
          this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
        }

        return subscription.outerValue;
      };

      DelayWhenSubscriber.prototype.tryDelay = function (delayNotifier, value) {
        var notifierSubscription = subscribeToResult(this, delayNotifier, value);

        if (notifierSubscription && !notifierSubscription.closed) {
          var destination = this.destination;
          destination.add(notifierSubscription);
          this.delayNotifierSubscriptions.push(notifierSubscription);
        }
      };

      DelayWhenSubscriber.prototype.tryComplete = function () {
        if (this.completed && this.delayNotifierSubscriptions.length === 0) {
          this.destination.complete();
        }
      };

      return DelayWhenSubscriber;
    }(OuterSubscriber);

    var SubscriptionDelayObservable = function (_super) {
      __extends(SubscriptionDelayObservable, _super);

      function SubscriptionDelayObservable(source, subscriptionDelay) {
        var _this = _super.call(this) || this;

        _this.source = source;
        _this.subscriptionDelay = subscriptionDelay;
        return _this;
      }

      SubscriptionDelayObservable.prototype._subscribe = function (subscriber) {
        this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
      };

      return SubscriptionDelayObservable;
    }(Observable);

    var SubscriptionDelaySubscriber = function (_super) {
      __extends(SubscriptionDelaySubscriber, _super);

      function SubscriptionDelaySubscriber(parent, source) {
        var _this = _super.call(this) || this;

        _this.parent = parent;
        _this.source = source;
        _this.sourceSubscribed = false;
        return _this;
      }

      SubscriptionDelaySubscriber.prototype._next = function (unused) {
        this.subscribeToSource();
      };

      SubscriptionDelaySubscriber.prototype._error = function (err) {
        this.unsubscribe();
        this.parent.error(err);
      };

      SubscriptionDelaySubscriber.prototype._complete = function () {
        this.unsubscribe();
        this.subscribeToSource();
      };

      SubscriptionDelaySubscriber.prototype.subscribeToSource = function () {
        if (!this.sourceSubscribed) {
          this.sourceSubscribed = true;
          this.unsubscribe();
          this.source.subscribe(this.parent);
        }
      };

      return SubscriptionDelaySubscriber;
    }(Subscriber);

    var DeMaterializeSubscriber = function (_super) {
      __extends(DeMaterializeSubscriber, _super);

      function DeMaterializeSubscriber(destination) {
        return _super.call(this, destination) || this;
      }

      DeMaterializeSubscriber.prototype._next = function (value) {
        value.observe(this.destination);
      };

      return DeMaterializeSubscriber;
    }(Subscriber);

    // `Set` constructor
    // https://tc39.es/ecma262/#sec-set-objects
    var es_set = collection('Set', function (init) {
      return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
    }, collectionStrong);

    var DistinctSubscriber = function (_super) {
      __extends(DistinctSubscriber, _super);

      function DistinctSubscriber(destination, keySelector, flushes) {
        var _this = _super.call(this, destination) || this;

        _this.keySelector = keySelector;
        _this.values = new Set();

        if (flushes) {
          _this.add(innerSubscribe(flushes, new SimpleInnerSubscriber(_this)));
        }

        return _this;
      }

      DistinctSubscriber.prototype.notifyNext = function () {
        this.values.clear();
      };

      DistinctSubscriber.prototype.notifyError = function (error) {
        this._error(error);
      };

      DistinctSubscriber.prototype._next = function (value) {
        if (this.keySelector) {
          this._useKeySelector(value);
        } else {
          this._finalizeNext(value, value);
        }
      };

      DistinctSubscriber.prototype._useKeySelector = function (value) {
        var key;
        var destination = this.destination;

        try {
          key = this.keySelector(value);
        } catch (err) {
          destination.error(err);
          return;
        }

        this._finalizeNext(key, value);
      };

      DistinctSubscriber.prototype._finalizeNext = function (key, value) {
        var values = this.values;

        if (!values.has(key)) {
          values.add(key);
          this.destination.next(value);
        }
      };

      return DistinctSubscriber;
    }(SimpleOuterSubscriber);

    function distinctUntilChanged(compare, keySelector) {
      return function (source) {
        return source.lift(new DistinctUntilChangedOperator(compare, keySelector));
      };
    }

    var DistinctUntilChangedOperator = function () {
      function DistinctUntilChangedOperator(compare, keySelector) {
        this.compare = compare;
        this.keySelector = keySelector;
      }

      DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
      };

      return DistinctUntilChangedOperator;
    }();

    var DistinctUntilChangedSubscriber = function (_super) {
      __extends(DistinctUntilChangedSubscriber, _super);

      function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
        var _this = _super.call(this, destination) || this;

        _this.keySelector = keySelector;
        _this.hasKey = false;

        if (typeof compare === 'function') {
          _this.compare = compare;
        }

        return _this;
      }

      DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
        return x === y;
      };

      DistinctUntilChangedSubscriber.prototype._next = function (value) {
        var key;

        try {
          var keySelector = this.keySelector;
          key = keySelector ? keySelector(value) : value;
        } catch (err) {
          return this.destination.error(err);
        }

        var result = false;

        if (this.hasKey) {
          try {
            var compare = this.compare;
            result = compare(this.key, key);
          } catch (err) {
            return this.destination.error(err);
          }
        } else {
          this.hasKey = true;
        }

        if (!result) {
          this.key = key;
          this.destination.next(value);
        }
      };

      return DistinctUntilChangedSubscriber;
    }(Subscriber);

    var ThrowIfEmptySubscriber = function (_super) {
      __extends(ThrowIfEmptySubscriber, _super);

      function ThrowIfEmptySubscriber(destination, errorFactory) {
        var _this = _super.call(this, destination) || this;

        _this.errorFactory = errorFactory;
        _this.hasValue = false;
        return _this;
      }

      ThrowIfEmptySubscriber.prototype._next = function (value) {
        this.hasValue = true;
        this.destination.next(value);
      };

      ThrowIfEmptySubscriber.prototype._complete = function () {
        if (!this.hasValue) {
          var err = void 0;

          try {
            err = this.errorFactory();
          } catch (e) {
            err = e;
          }

          this.destination.error(err);
        } else {
          return this.destination.complete();
        }
      };

      return ThrowIfEmptySubscriber;
    }(Subscriber);

    function take(count) {
      return function (source) {
        if (count === 0) {
          return empty$1();
        } else {
          return source.lift(new TakeOperator(count));
        }
      };
    }

    var TakeOperator = function () {
      function TakeOperator(total) {
        this.total = total;

        if (this.total < 0) {
          throw new ArgumentOutOfRangeError();
        }
      }

      TakeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TakeSubscriber(subscriber, this.total));
      };

      return TakeOperator;
    }();

    var TakeSubscriber = function (_super) {
      __extends(TakeSubscriber, _super);

      function TakeSubscriber(destination, total) {
        var _this = _super.call(this, destination) || this;

        _this.total = total;
        _this.count = 0;
        return _this;
      }

      TakeSubscriber.prototype._next = function (value) {
        var total = this.total;
        var count = ++this.count;

        if (count <= total) {
          this.destination.next(value);

          if (count === total) {
            this.destination.complete();
            this.unsubscribe();
          }
        }
      };

      return TakeSubscriber;
    }(Subscriber);

    var EverySubscriber = function (_super) {
      __extends(EverySubscriber, _super);

      function EverySubscriber(destination, predicate, thisArg, source) {
        var _this = _super.call(this, destination) || this;

        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.source = source;
        _this.index = 0;
        _this.thisArg = thisArg || _this;
        return _this;
      }

      EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
        this.destination.next(everyValueMatch);
        this.destination.complete();
      };

      EverySubscriber.prototype._next = function (value) {
        var result = false;

        try {
          result = this.predicate.call(this.thisArg, value, this.index++, this.source);
        } catch (err) {
          this.destination.error(err);
          return;
        }

        if (!result) {
          this.notifyComplete(false);
        }
      };

      EverySubscriber.prototype._complete = function () {
        this.notifyComplete(true);
      };

      return EverySubscriber;
    }(Subscriber);

    var SwitchFirstSubscriber = function (_super) {
      __extends(SwitchFirstSubscriber, _super);

      function SwitchFirstSubscriber(destination) {
        var _this = _super.call(this, destination) || this;

        _this.hasCompleted = false;
        _this.hasSubscription = false;
        return _this;
      }

      SwitchFirstSubscriber.prototype._next = function (value) {
        if (!this.hasSubscription) {
          this.hasSubscription = true;
          this.add(innerSubscribe(value, new SimpleInnerSubscriber(this)));
        }
      };

      SwitchFirstSubscriber.prototype._complete = function () {
        this.hasCompleted = true;

        if (!this.hasSubscription) {
          this.destination.complete();
        }
      };

      SwitchFirstSubscriber.prototype.notifyComplete = function () {
        this.hasSubscription = false;

        if (this.hasCompleted) {
          this.destination.complete();
        }
      };

      return SwitchFirstSubscriber;
    }(SimpleOuterSubscriber);

    var ExhaustMapSubscriber = function (_super) {
      __extends(ExhaustMapSubscriber, _super);

      function ExhaustMapSubscriber(destination, project) {
        var _this = _super.call(this, destination) || this;

        _this.project = project;
        _this.hasSubscription = false;
        _this.hasCompleted = false;
        _this.index = 0;
        return _this;
      }

      ExhaustMapSubscriber.prototype._next = function (value) {
        if (!this.hasSubscription) {
          this.tryNext(value);
        }
      };

      ExhaustMapSubscriber.prototype.tryNext = function (value) {
        var result;
        var index = this.index++;

        try {
          result = this.project(value, index);
        } catch (err) {
          this.destination.error(err);
          return;
        }

        this.hasSubscription = true;

        this._innerSub(result);
      };

      ExhaustMapSubscriber.prototype._innerSub = function (result) {
        var innerSubscriber = new SimpleInnerSubscriber(this);
        var destination = this.destination;
        destination.add(innerSubscriber);
        var innerSubscription = innerSubscribe(result, innerSubscriber);

        if (innerSubscription !== innerSubscriber) {
          destination.add(innerSubscription);
        }
      };

      ExhaustMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;

        if (!this.hasSubscription) {
          this.destination.complete();
        }

        this.unsubscribe();
      };

      ExhaustMapSubscriber.prototype.notifyNext = function (innerValue) {
        this.destination.next(innerValue);
      };

      ExhaustMapSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
      };

      ExhaustMapSubscriber.prototype.notifyComplete = function () {
        this.hasSubscription = false;

        if (this.hasCompleted) {
          this.destination.complete();
        }
      };

      return ExhaustMapSubscriber;
    }(SimpleOuterSubscriber);

    var ExpandSubscriber = function (_super) {
      __extends(ExpandSubscriber, _super);

      function ExpandSubscriber(destination, project, concurrent, scheduler) {
        var _this = _super.call(this, destination) || this;

        _this.project = project;
        _this.concurrent = concurrent;
        _this.scheduler = scheduler;
        _this.index = 0;
        _this.active = 0;
        _this.hasCompleted = false;

        if (concurrent < Number.POSITIVE_INFINITY) {
          _this.buffer = [];
        }

        return _this;
      }

      ExpandSubscriber.dispatch = function (arg) {
        var subscriber = arg.subscriber,
            result = arg.result,
            value = arg.value,
            index = arg.index;
        subscriber.subscribeToProjection(result, value, index);
      };

      ExpandSubscriber.prototype._next = function (value) {
        var destination = this.destination;

        if (destination.closed) {
          this._complete();

          return;
        }

        var index = this.index++;

        if (this.active < this.concurrent) {
          destination.next(value);

          try {
            var project = this.project;
            var result = project(value, index);

            if (!this.scheduler) {
              this.subscribeToProjection(result, value, index);
            } else {
              var state = {
                subscriber: this,
                result: result,
                value: value,
                index: index
              };
              var destination_1 = this.destination;
              destination_1.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
            }
          } catch (e) {
            destination.error(e);
          }
        } else {
          this.buffer.push(value);
        }
      };

      ExpandSubscriber.prototype.subscribeToProjection = function (result, value, index) {
        this.active++;
        var destination = this.destination;
        destination.add(innerSubscribe(result, new SimpleInnerSubscriber(this)));
      };

      ExpandSubscriber.prototype._complete = function () {
        this.hasCompleted = true;

        if (this.hasCompleted && this.active === 0) {
          this.destination.complete();
        }

        this.unsubscribe();
      };

      ExpandSubscriber.prototype.notifyNext = function (innerValue) {
        this._next(innerValue);
      };

      ExpandSubscriber.prototype.notifyComplete = function () {
        var buffer = this.buffer;
        this.active--;

        if (buffer && buffer.length > 0) {
          this._next(buffer.shift());
        }

        if (this.hasCompleted && this.active === 0) {
          this.destination.complete();
        }
      };

      return ExpandSubscriber;
    }(SimpleOuterSubscriber);

    var FinallySubscriber = function (_super) {
      __extends(FinallySubscriber, _super);

      function FinallySubscriber(destination, callback) {
        var _this = _super.call(this, destination) || this;

        _this.add(new Subscription(callback));

        return _this;
      }

      return FinallySubscriber;
    }(Subscriber);

    var FindValueSubscriber = function (_super) {
      __extends(FindValueSubscriber, _super);

      function FindValueSubscriber(destination, predicate, source, yieldIndex, thisArg) {
        var _this = _super.call(this, destination) || this;

        _this.predicate = predicate;
        _this.source = source;
        _this.yieldIndex = yieldIndex;
        _this.thisArg = thisArg;
        _this.index = 0;
        return _this;
      }

      FindValueSubscriber.prototype.notifyComplete = function (value) {
        var destination = this.destination;
        destination.next(value);
        destination.complete();
        this.unsubscribe();
      };

      FindValueSubscriber.prototype._next = function (value) {
        var _a = this,
            predicate = _a.predicate,
            thisArg = _a.thisArg;

        var index = this.index++;

        try {
          var result = predicate.call(thisArg || this, value, index, this.source);

          if (result) {
            this.notifyComplete(this.yieldIndex ? index : value);
          }
        } catch (err) {
          this.destination.error(err);
        }
      };

      FindValueSubscriber.prototype._complete = function () {
        this.notifyComplete(this.yieldIndex ? -1 : undefined);
      };

      return FindValueSubscriber;
    }(Subscriber);

    var IgnoreElementsSubscriber = function (_super) {
      __extends(IgnoreElementsSubscriber, _super);

      function IgnoreElementsSubscriber() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      IgnoreElementsSubscriber.prototype._next = function (unused) {};

      return IgnoreElementsSubscriber;
    }(Subscriber);

    var IsEmptySubscriber = function (_super) {
      __extends(IsEmptySubscriber, _super);

      function IsEmptySubscriber(destination) {
        return _super.call(this, destination) || this;
      }

      IsEmptySubscriber.prototype.notifyComplete = function (isEmpty) {
        var destination = this.destination;
        destination.next(isEmpty);
        destination.complete();
      };

      IsEmptySubscriber.prototype._next = function (value) {
        this.notifyComplete(false);
      };

      IsEmptySubscriber.prototype._complete = function () {
        this.notifyComplete(true);
      };

      return IsEmptySubscriber;
    }(Subscriber);

    var TakeLastSubscriber = function (_super) {
      __extends(TakeLastSubscriber, _super);

      function TakeLastSubscriber(destination, total) {
        var _this = _super.call(this, destination) || this;

        _this.total = total;
        _this.ring = new Array();
        _this.count = 0;
        return _this;
      }

      TakeLastSubscriber.prototype._next = function (value) {
        var ring = this.ring;
        var total = this.total;
        var count = this.count++;

        if (ring.length < total) {
          ring.push(value);
        } else {
          var index = count % total;
          ring[index] = value;
        }
      };

      TakeLastSubscriber.prototype._complete = function () {
        var destination = this.destination;
        var count = this.count;

        if (count > 0) {
          var total = this.count >= this.total ? this.total : this.count;
          var ring = this.ring;

          for (var i = 0; i < total; i++) {
            var idx = count++ % total;
            destination.next(ring[idx]);
          }
        }

        destination.complete();
      };

      return TakeLastSubscriber;
    }(Subscriber);

    var MapToSubscriber = function (_super) {
      __extends(MapToSubscriber, _super);

      function MapToSubscriber(destination, value) {
        var _this = _super.call(this, destination) || this;

        _this.value = value;
        return _this;
      }

      MapToSubscriber.prototype._next = function (x) {
        this.destination.next(this.value);
      };

      return MapToSubscriber;
    }(Subscriber);

    var MaterializeSubscriber = function (_super) {
      __extends(MaterializeSubscriber, _super);

      function MaterializeSubscriber(destination) {
        return _super.call(this, destination) || this;
      }

      MaterializeSubscriber.prototype._next = function (value) {
        this.destination.next(Notification.createNext(value));
      };

      MaterializeSubscriber.prototype._error = function (err) {
        var destination = this.destination;
        destination.next(Notification.createError(err));
        destination.complete();
      };

      MaterializeSubscriber.prototype._complete = function () {
        var destination = this.destination;
        destination.next(Notification.createComplete());
        destination.complete();
      };

      return MaterializeSubscriber;
    }(Subscriber);

    var ScanSubscriber = function (_super) {
      __extends(ScanSubscriber, _super);

      function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
        var _this = _super.call(this, destination) || this;

        _this.accumulator = accumulator;
        _this._seed = _seed;
        _this.hasSeed = hasSeed;
        _this.index = 0;
        return _this;
      }

      Object.defineProperty(ScanSubscriber.prototype, "seed", {
        get: function get() {
          return this._seed;
        },
        set: function set(value) {
          this.hasSeed = true;
          this._seed = value;
        },
        enumerable: true,
        configurable: true
      });

      ScanSubscriber.prototype._next = function (value) {
        if (!this.hasSeed) {
          this.seed = value;
          this.destination.next(value);
        } else {
          return this._tryNext(value);
        }
      };

      ScanSubscriber.prototype._tryNext = function (value) {
        var index = this.index++;
        var result;

        try {
          result = this.accumulator(this.seed, value, index);
        } catch (err) {
          this.destination.error(err);
        }

        this.seed = result;
        this.destination.next(result);
      };

      return ScanSubscriber;
    }(Subscriber);

    var MergeScanSubscriber = function (_super) {
      __extends(MergeScanSubscriber, _super);

      function MergeScanSubscriber(destination, accumulator, acc, concurrent) {
        var _this = _super.call(this, destination) || this;

        _this.accumulator = accumulator;
        _this.acc = acc;
        _this.concurrent = concurrent;
        _this.hasValue = false;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        _this.index = 0;
        return _this;
      }

      MergeScanSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
          var index = this.index++;
          var destination = this.destination;
          var ish = void 0;

          try {
            var accumulator = this.accumulator;
            ish = accumulator(this.acc, value, index);
          } catch (e) {
            return destination.error(e);
          }

          this.active++;

          this._innerSub(ish);
        } else {
          this.buffer.push(value);
        }
      };

      MergeScanSubscriber.prototype._innerSub = function (ish) {
        var innerSubscriber = new SimpleInnerSubscriber(this);
        var destination = this.destination;
        destination.add(innerSubscriber);
        var innerSubscription = innerSubscribe(ish, innerSubscriber);

        if (innerSubscription !== innerSubscriber) {
          destination.add(innerSubscription);
        }
      };

      MergeScanSubscriber.prototype._complete = function () {
        this.hasCompleted = true;

        if (this.active === 0 && this.buffer.length === 0) {
          if (this.hasValue === false) {
            this.destination.next(this.acc);
          }

          this.destination.complete();
        }

        this.unsubscribe();
      };

      MergeScanSubscriber.prototype.notifyNext = function (innerValue) {
        var destination = this.destination;
        this.acc = innerValue;
        this.hasValue = true;
        destination.next(innerValue);
      };

      MergeScanSubscriber.prototype.notifyComplete = function () {
        var buffer = this.buffer;
        this.active--;

        if (buffer.length > 0) {
          this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
          if (this.hasValue === false) {
            this.destination.next(this.acc);
          }

          this.destination.complete();
        }
      };

      return MergeScanSubscriber;
    }(SimpleOuterSubscriber);

    var OnErrorResumeNextSubscriber = function (_super) {
      __extends(OnErrorResumeNextSubscriber, _super);

      function OnErrorResumeNextSubscriber(destination, nextSources) {
        var _this = _super.call(this, destination) || this;

        _this.destination = destination;
        _this.nextSources = nextSources;
        return _this;
      }

      OnErrorResumeNextSubscriber.prototype.notifyError = function () {
        this.subscribeToNextSource();
      };

      OnErrorResumeNextSubscriber.prototype.notifyComplete = function () {
        this.subscribeToNextSource();
      };

      OnErrorResumeNextSubscriber.prototype._error = function (err) {
        this.subscribeToNextSource();
        this.unsubscribe();
      };

      OnErrorResumeNextSubscriber.prototype._complete = function () {
        this.subscribeToNextSource();
        this.unsubscribe();
      };

      OnErrorResumeNextSubscriber.prototype.subscribeToNextSource = function () {
        var next = this.nextSources.shift();

        if (!!next) {
          var innerSubscriber = new SimpleInnerSubscriber(this);
          var destination = this.destination;
          destination.add(innerSubscriber);
          var innerSubscription = innerSubscribe(next, innerSubscriber);

          if (innerSubscription !== innerSubscriber) {
            destination.add(innerSubscription);
          }
        } else {
          this.destination.complete();
        }
      };

      return OnErrorResumeNextSubscriber;
    }(SimpleOuterSubscriber);

    var PairwiseSubscriber = function (_super) {
      __extends(PairwiseSubscriber, _super);

      function PairwiseSubscriber(destination) {
        var _this = _super.call(this, destination) || this;

        _this.hasPrev = false;
        return _this;
      }

      PairwiseSubscriber.prototype._next = function (value) {
        var pair;

        if (this.hasPrev) {
          pair = [this.prev, value];
        } else {
          this.hasPrev = true;
        }

        this.prev = value;

        if (pair) {
          this.destination.next(pair);
        }
      };

      return PairwiseSubscriber;
    }(Subscriber);

    function pluck() {
      var properties = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i] = arguments[_i];
      }

      var length = properties.length;

      if (length === 0) {
        throw new Error('list of properties cannot be empty.');
      }

      return function (source) {
        return map(plucker(properties, length))(source);
      };
    }

    function plucker(props, length) {
      var mapper = function mapper(x) {
        var currentProp = x;

        for (var i = 0; i < length; i++) {
          var p = currentProp != null ? currentProp[props[i]] : undefined;

          if (p !== void 0) {
            currentProp = p;
          } else {
            return undefined;
          }
        }

        return currentProp;
      };

      return mapper;
    }

    var RepeatSubscriber = function (_super) {
      __extends(RepeatSubscriber, _super);

      function RepeatSubscriber(destination, count, source) {
        var _this = _super.call(this, destination) || this;

        _this.count = count;
        _this.source = source;
        return _this;
      }

      RepeatSubscriber.prototype.complete = function () {
        if (!this.isStopped) {
          var _a = this,
              source = _a.source,
              count = _a.count;

          if (count === 0) {
            return _super.prototype.complete.call(this);
          } else if (count > -1) {
            this.count = count - 1;
          }

          source.subscribe(this._unsubscribeAndRecycle());
        }
      };

      return RepeatSubscriber;
    }(Subscriber);

    var RepeatWhenSubscriber = function (_super) {
      __extends(RepeatWhenSubscriber, _super);

      function RepeatWhenSubscriber(destination, notifier, source) {
        var _this = _super.call(this, destination) || this;

        _this.notifier = notifier;
        _this.source = source;
        _this.sourceIsBeingSubscribedTo = true;
        return _this;
      }

      RepeatWhenSubscriber.prototype.notifyNext = function () {
        this.sourceIsBeingSubscribedTo = true;
        this.source.subscribe(this);
      };

      RepeatWhenSubscriber.prototype.notifyComplete = function () {
        if (this.sourceIsBeingSubscribedTo === false) {
          return _super.prototype.complete.call(this);
        }
      };

      RepeatWhenSubscriber.prototype.complete = function () {
        this.sourceIsBeingSubscribedTo = false;

        if (!this.isStopped) {
          if (!this.retries) {
            this.subscribeToRetries();
          }

          if (!this.retriesSubscription || this.retriesSubscription.closed) {
            return _super.prototype.complete.call(this);
          }

          this._unsubscribeAndRecycle();

          this.notifications.next(undefined);
        }
      };

      RepeatWhenSubscriber.prototype._unsubscribe = function () {
        var _a = this,
            notifications = _a.notifications,
            retriesSubscription = _a.retriesSubscription;

        if (notifications) {
          notifications.unsubscribe();
          this.notifications = undefined;
        }

        if (retriesSubscription) {
          retriesSubscription.unsubscribe();
          this.retriesSubscription = undefined;
        }

        this.retries = undefined;
      };

      RepeatWhenSubscriber.prototype._unsubscribeAndRecycle = function () {
        var _unsubscribe = this._unsubscribe;
        this._unsubscribe = null;

        _super.prototype._unsubscribeAndRecycle.call(this);

        this._unsubscribe = _unsubscribe;
        return this;
      };

      RepeatWhenSubscriber.prototype.subscribeToRetries = function () {
        this.notifications = new Subject();
        var retries;

        try {
          var notifier = this.notifier;
          retries = notifier(this.notifications);
        } catch (e) {
          return _super.prototype.complete.call(this);
        }

        this.retries = retries;
        this.retriesSubscription = innerSubscribe(retries, new SimpleInnerSubscriber(this));
      };

      return RepeatWhenSubscriber;
    }(SimpleOuterSubscriber);

    var RetrySubscriber = function (_super) {
      __extends(RetrySubscriber, _super);

      function RetrySubscriber(destination, count, source) {
        var _this = _super.call(this, destination) || this;

        _this.count = count;
        _this.source = source;
        return _this;
      }

      RetrySubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
          var _a = this,
              source = _a.source,
              count = _a.count;

          if (count === 0) {
            return _super.prototype.error.call(this, err);
          } else if (count > -1) {
            this.count = count - 1;
          }

          source.subscribe(this._unsubscribeAndRecycle());
        }
      };

      return RetrySubscriber;
    }(Subscriber);

    var RetryWhenSubscriber = function (_super) {
      __extends(RetryWhenSubscriber, _super);

      function RetryWhenSubscriber(destination, notifier, source) {
        var _this = _super.call(this, destination) || this;

        _this.notifier = notifier;
        _this.source = source;
        return _this;
      }

      RetryWhenSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
          var errors = this.errors;
          var retries = this.retries;
          var retriesSubscription = this.retriesSubscription;

          if (!retries) {
            errors = new Subject();

            try {
              var notifier = this.notifier;
              retries = notifier(errors);
            } catch (e) {
              return _super.prototype.error.call(this, e);
            }

            retriesSubscription = innerSubscribe(retries, new SimpleInnerSubscriber(this));
          } else {
            this.errors = undefined;
            this.retriesSubscription = undefined;
          }

          this._unsubscribeAndRecycle();

          this.errors = errors;
          this.retries = retries;
          this.retriesSubscription = retriesSubscription;
          errors.next(err);
        }
      };

      RetryWhenSubscriber.prototype._unsubscribe = function () {
        var _a = this,
            errors = _a.errors,
            retriesSubscription = _a.retriesSubscription;

        if (errors) {
          errors.unsubscribe();
          this.errors = undefined;
        }

        if (retriesSubscription) {
          retriesSubscription.unsubscribe();
          this.retriesSubscription = undefined;
        }

        this.retries = undefined;
      };

      RetryWhenSubscriber.prototype.notifyNext = function () {
        var _unsubscribe = this._unsubscribe;
        this._unsubscribe = null;

        this._unsubscribeAndRecycle();

        this._unsubscribe = _unsubscribe;
        this.source.subscribe(this);
      };

      return RetryWhenSubscriber;
    }(SimpleOuterSubscriber);

    function sample(notifier) {
      return function (source) {
        return source.lift(new SampleOperator(notifier));
      };
    }

    var SampleOperator = function () {
      function SampleOperator(notifier) {
        this.notifier = notifier;
      }

      SampleOperator.prototype.call = function (subscriber, source) {
        var sampleSubscriber = new SampleSubscriber(subscriber);
        var subscription = source.subscribe(sampleSubscriber);
        subscription.add(innerSubscribe(this.notifier, new SimpleInnerSubscriber(sampleSubscriber)));
        return subscription;
      };

      return SampleOperator;
    }();

    var SampleSubscriber = function (_super) {
      __extends(SampleSubscriber, _super);

      function SampleSubscriber() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.hasValue = false;
        return _this;
      }

      SampleSubscriber.prototype._next = function (value) {
        this.value = value;
        this.hasValue = true;
      };

      SampleSubscriber.prototype.notifyNext = function () {
        this.emitValue();
      };

      SampleSubscriber.prototype.notifyComplete = function () {
        this.emitValue();
      };

      SampleSubscriber.prototype.emitValue = function () {
        if (this.hasValue) {
          this.hasValue = false;
          this.destination.next(this.value);
        }
      };

      return SampleSubscriber;
    }(SimpleOuterSubscriber);

    var SampleTimeSubscriber = function (_super) {
      __extends(SampleTimeSubscriber, _super);

      function SampleTimeSubscriber(destination, period, scheduler) {
        var _this = _super.call(this, destination) || this;

        _this.period = period;
        _this.scheduler = scheduler;
        _this.hasValue = false;

        _this.add(scheduler.schedule(dispatchNotification, period, {
          subscriber: _this,
          period: period
        }));

        return _this;
      }

      SampleTimeSubscriber.prototype._next = function (value) {
        this.lastValue = value;
        this.hasValue = true;
      };

      SampleTimeSubscriber.prototype.notifyNext = function () {
        if (this.hasValue) {
          this.hasValue = false;
          this.destination.next(this.lastValue);
        }
      };

      return SampleTimeSubscriber;
    }(Subscriber);

    function dispatchNotification(state) {
      var subscriber = state.subscriber,
          period = state.period;
      subscriber.notifyNext();
      this.schedule(state, period);
    }

    var SequenceEqualSubscriber = function (_super) {
      __extends(SequenceEqualSubscriber, _super);

      function SequenceEqualSubscriber(destination, compareTo, comparator) {
        var _this = _super.call(this, destination) || this;

        _this.compareTo = compareTo;
        _this.comparator = comparator;
        _this._a = [];
        _this._b = [];
        _this._oneComplete = false;

        _this.destination.add(compareTo.subscribe(new SequenceEqualCompareToSubscriber(destination, _this)));

        return _this;
      }

      SequenceEqualSubscriber.prototype._next = function (value) {
        if (this._oneComplete && this._b.length === 0) {
          this.emit(false);
        } else {
          this._a.push(value);

          this.checkValues();
        }
      };

      SequenceEqualSubscriber.prototype._complete = function () {
        if (this._oneComplete) {
          this.emit(this._a.length === 0 && this._b.length === 0);
        } else {
          this._oneComplete = true;
        }

        this.unsubscribe();
      };

      SequenceEqualSubscriber.prototype.checkValues = function () {
        var _c = this,
            _a = _c._a,
            _b = _c._b,
            comparator = _c.comparator;

        while (_a.length > 0 && _b.length > 0) {
          var a = _a.shift();

          var b = _b.shift();

          var areEqual = false;

          try {
            areEqual = comparator ? comparator(a, b) : a === b;
          } catch (e) {
            this.destination.error(e);
          }

          if (!areEqual) {
            this.emit(false);
          }
        }
      };

      SequenceEqualSubscriber.prototype.emit = function (value) {
        var destination = this.destination;
        destination.next(value);
        destination.complete();
      };

      SequenceEqualSubscriber.prototype.nextB = function (value) {
        if (this._oneComplete && this._a.length === 0) {
          this.emit(false);
        } else {
          this._b.push(value);

          this.checkValues();
        }
      };

      SequenceEqualSubscriber.prototype.completeB = function () {
        if (this._oneComplete) {
          this.emit(this._a.length === 0 && this._b.length === 0);
        } else {
          this._oneComplete = true;
        }
      };

      return SequenceEqualSubscriber;
    }(Subscriber);

    var SequenceEqualCompareToSubscriber = function (_super) {
      __extends(SequenceEqualCompareToSubscriber, _super);

      function SequenceEqualCompareToSubscriber(destination, parent) {
        var _this = _super.call(this, destination) || this;

        _this.parent = parent;
        return _this;
      }

      SequenceEqualCompareToSubscriber.prototype._next = function (value) {
        this.parent.nextB(value);
      };

      SequenceEqualCompareToSubscriber.prototype._error = function (err) {
        this.parent.error(err);
        this.unsubscribe();
      };

      SequenceEqualCompareToSubscriber.prototype._complete = function () {
        this.parent.completeB();
        this.unsubscribe();
      };

      return SequenceEqualCompareToSubscriber;
    }(Subscriber);

    var SingleSubscriber = function (_super) {
      __extends(SingleSubscriber, _super);

      function SingleSubscriber(destination, predicate, source) {
        var _this = _super.call(this, destination) || this;

        _this.predicate = predicate;
        _this.source = source;
        _this.seenValue = false;
        _this.index = 0;
        return _this;
      }

      SingleSubscriber.prototype.applySingleValue = function (value) {
        if (this.seenValue) {
          this.destination.error('Sequence contains more than one element');
        } else {
          this.seenValue = true;
          this.singleValue = value;
        }
      };

      SingleSubscriber.prototype._next = function (value) {
        var index = this.index++;

        if (this.predicate) {
          this.tryNext(value, index);
        } else {
          this.applySingleValue(value);
        }
      };

      SingleSubscriber.prototype.tryNext = function (value, index) {
        try {
          if (this.predicate(value, index, this.source)) {
            this.applySingleValue(value);
          }
        } catch (err) {
          this.destination.error(err);
        }
      };

      SingleSubscriber.prototype._complete = function () {
        var destination = this.destination;

        if (this.index > 0) {
          destination.next(this.seenValue ? this.singleValue : undefined);
          destination.complete();
        } else {
          destination.error(new EmptyError());
        }
      };

      return SingleSubscriber;
    }(Subscriber);

    function skip(count) {
      return function (source) {
        return source.lift(new SkipOperator(count));
      };
    }

    var SkipOperator = function () {
      function SkipOperator(total) {
        this.total = total;
      }

      SkipOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new SkipSubscriber(subscriber, this.total));
      };

      return SkipOperator;
    }();

    var SkipSubscriber = function (_super) {
      __extends(SkipSubscriber, _super);

      function SkipSubscriber(destination, total) {
        var _this = _super.call(this, destination) || this;

        _this.total = total;
        _this.count = 0;
        return _this;
      }

      SkipSubscriber.prototype._next = function (x) {
        if (++this.count > this.total) {
          this.destination.next(x);
        }
      };

      return SkipSubscriber;
    }(Subscriber);

    var SkipLastSubscriber = function (_super) {
      __extends(SkipLastSubscriber, _super);

      function SkipLastSubscriber(destination, _skipCount) {
        var _this = _super.call(this, destination) || this;

        _this._skipCount = _skipCount;
        _this._count = 0;
        _this._ring = new Array(_skipCount);
        return _this;
      }

      SkipLastSubscriber.prototype._next = function (value) {
        var skipCount = this._skipCount;
        var count = this._count++;

        if (count < skipCount) {
          this._ring[count] = value;
        } else {
          var currentIndex = count % skipCount;
          var ring = this._ring;
          var oldValue = ring[currentIndex];
          ring[currentIndex] = value;
          this.destination.next(oldValue);
        }
      };

      return SkipLastSubscriber;
    }(Subscriber);

    var SkipUntilSubscriber = function (_super) {
      __extends(SkipUntilSubscriber, _super);

      function SkipUntilSubscriber(destination, notifier) {
        var _this = _super.call(this, destination) || this;

        _this.hasValue = false;
        var innerSubscriber = new SimpleInnerSubscriber(_this);

        _this.add(innerSubscriber);

        _this.innerSubscription = innerSubscriber;
        var innerSubscription = innerSubscribe(notifier, innerSubscriber);

        if (innerSubscription !== innerSubscriber) {
          _this.add(innerSubscription);

          _this.innerSubscription = innerSubscription;
        }

        return _this;
      }

      SkipUntilSubscriber.prototype._next = function (value) {
        if (this.hasValue) {
          _super.prototype._next.call(this, value);
        }
      };

      SkipUntilSubscriber.prototype.notifyNext = function () {
        this.hasValue = true;

        if (this.innerSubscription) {
          this.innerSubscription.unsubscribe();
        }
      };

      SkipUntilSubscriber.prototype.notifyComplete = function () {};

      return SkipUntilSubscriber;
    }(SimpleOuterSubscriber);

    var SkipWhileSubscriber = function (_super) {
      __extends(SkipWhileSubscriber, _super);

      function SkipWhileSubscriber(destination, predicate) {
        var _this = _super.call(this, destination) || this;

        _this.predicate = predicate;
        _this.skipping = true;
        _this.index = 0;
        return _this;
      }

      SkipWhileSubscriber.prototype._next = function (value) {
        var destination = this.destination;

        if (this.skipping) {
          this.tryCallPredicate(value);
        }

        if (!this.skipping) {
          destination.next(value);
        }
      };

      SkipWhileSubscriber.prototype.tryCallPredicate = function (value) {
        try {
          var result = this.predicate(value, this.index++);
          this.skipping = Boolean(result);
        } catch (err) {
          this.destination.error(err);
        }
      };

      return SkipWhileSubscriber;
    }(Subscriber);

    var SubscribeOnObservable = function (_super) {
      __extends(SubscribeOnObservable, _super);

      function SubscribeOnObservable(source, delayTime, scheduler) {
        if (delayTime === void 0) {
          delayTime = 0;
        }

        if (scheduler === void 0) {
          scheduler = asap;
        }

        var _this = _super.call(this) || this;

        _this.source = source;
        _this.delayTime = delayTime;
        _this.scheduler = scheduler;

        if (!isNumeric$1(delayTime) || delayTime < 0) {
          _this.delayTime = 0;
        }

        if (!scheduler || typeof scheduler.schedule !== 'function') {
          _this.scheduler = asap;
        }

        return _this;
      }

      SubscribeOnObservable.create = function (source, delay, scheduler) {
        if (delay === void 0) {
          delay = 0;
        }

        if (scheduler === void 0) {
          scheduler = asap;
        }

        return new SubscribeOnObservable(source, delay, scheduler);
      };

      SubscribeOnObservable.dispatch = function (arg) {
        var source = arg.source,
            subscriber = arg.subscriber;
        return this.add(source.subscribe(subscriber));
      };

      SubscribeOnObservable.prototype._subscribe = function (subscriber) {
        var delay = this.delayTime;
        var source = this.source;
        var scheduler = this.scheduler;
        return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
          source: source,
          subscriber: subscriber
        });
      };

      return SubscribeOnObservable;
    }(Observable);

    var SwitchMapSubscriber = function (_super) {
      __extends(SwitchMapSubscriber, _super);

      function SwitchMapSubscriber(destination, project) {
        var _this = _super.call(this, destination) || this;

        _this.project = project;
        _this.index = 0;
        return _this;
      }

      SwitchMapSubscriber.prototype._next = function (value) {
        var result;
        var index = this.index++;

        try {
          result = this.project(value, index);
        } catch (error) {
          this.destination.error(error);
          return;
        }

        this._innerSub(result);
      };

      SwitchMapSubscriber.prototype._innerSub = function (result) {
        var innerSubscription = this.innerSubscription;

        if (innerSubscription) {
          innerSubscription.unsubscribe();
        }

        var innerSubscriber = new SimpleInnerSubscriber(this);
        var destination = this.destination;
        destination.add(innerSubscriber);
        this.innerSubscription = innerSubscribe(result, innerSubscriber);

        if (this.innerSubscription !== innerSubscriber) {
          destination.add(this.innerSubscription);
        }
      };

      SwitchMapSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;

        if (!innerSubscription || innerSubscription.closed) {
          _super.prototype._complete.call(this);
        }

        this.unsubscribe();
      };

      SwitchMapSubscriber.prototype._unsubscribe = function () {
        this.innerSubscription = undefined;
      };

      SwitchMapSubscriber.prototype.notifyComplete = function () {
        this.innerSubscription = undefined;

        if (this.isStopped) {
          _super.prototype._complete.call(this);
        }
      };

      SwitchMapSubscriber.prototype.notifyNext = function (innerValue) {
        this.destination.next(innerValue);
      };

      return SwitchMapSubscriber;
    }(SimpleOuterSubscriber);

    var TakeUntilSubscriber = function (_super) {
      __extends(TakeUntilSubscriber, _super);

      function TakeUntilSubscriber(destination) {
        var _this = _super.call(this, destination) || this;

        _this.seenValue = false;
        return _this;
      }

      TakeUntilSubscriber.prototype.notifyNext = function () {
        this.seenValue = true;
        this.complete();
      };

      TakeUntilSubscriber.prototype.notifyComplete = function () {};

      return TakeUntilSubscriber;
    }(SimpleOuterSubscriber);

    var TakeWhileSubscriber = function (_super) {
      __extends(TakeWhileSubscriber, _super);

      function TakeWhileSubscriber(destination, predicate, inclusive) {
        var _this = _super.call(this, destination) || this;

        _this.predicate = predicate;
        _this.inclusive = inclusive;
        _this.index = 0;
        return _this;
      }

      TakeWhileSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        var result;

        try {
          result = this.predicate(value, this.index++);
        } catch (err) {
          destination.error(err);
          return;
        }

        this.nextOrComplete(value, result);
      };

      TakeWhileSubscriber.prototype.nextOrComplete = function (value, predicateResult) {
        var destination = this.destination;

        if (Boolean(predicateResult)) {
          destination.next(value);
        } else {
          if (this.inclusive) {
            destination.next(value);
          }

          destination.complete();
        }
      };

      return TakeWhileSubscriber;
    }(Subscriber);

    var TapSubscriber = function (_super) {
      __extends(TapSubscriber, _super);

      function TapSubscriber(destination, observerOrNext, error, complete) {
        var _this = _super.call(this, destination) || this;

        _this._tapNext = noop;
        _this._tapError = noop;
        _this._tapComplete = noop;
        _this._tapError = error || noop;
        _this._tapComplete = complete || noop;

        if (isFunction$1(observerOrNext)) {
          _this._context = _this;
          _this._tapNext = observerOrNext;
        } else if (observerOrNext) {
          _this._context = observerOrNext;
          _this._tapNext = observerOrNext.next || noop;
          _this._tapError = observerOrNext.error || noop;
          _this._tapComplete = observerOrNext.complete || noop;
        }

        return _this;
      }

      TapSubscriber.prototype._next = function (value) {
        try {
          this._tapNext.call(this._context, value);
        } catch (err) {
          this.destination.error(err);
          return;
        }

        this.destination.next(value);
      };

      TapSubscriber.prototype._error = function (err) {
        try {
          this._tapError.call(this._context, err);
        } catch (err) {
          this.destination.error(err);
          return;
        }

        this.destination.error(err);
      };

      TapSubscriber.prototype._complete = function () {
        try {
          this._tapComplete.call(this._context);
        } catch (err) {
          this.destination.error(err);
          return;
        }

        return this.destination.complete();
      };

      return TapSubscriber;
    }(Subscriber);

    var defaultThrottleConfig = {
      leading: true,
      trailing: false
    };

    var ThrottleSubscriber = function (_super) {
      __extends(ThrottleSubscriber, _super);

      function ThrottleSubscriber(destination, durationSelector, _leading, _trailing) {
        var _this = _super.call(this, destination) || this;

        _this.destination = destination;
        _this.durationSelector = durationSelector;
        _this._leading = _leading;
        _this._trailing = _trailing;
        _this._hasValue = false;
        return _this;
      }

      ThrottleSubscriber.prototype._next = function (value) {
        this._hasValue = true;
        this._sendValue = value;

        if (!this._throttled) {
          if (this._leading) {
            this.send();
          } else {
            this.throttle(value);
          }
        }
      };

      ThrottleSubscriber.prototype.send = function () {
        var _a = this,
            _hasValue = _a._hasValue,
            _sendValue = _a._sendValue;

        if (_hasValue) {
          this.destination.next(_sendValue);
          this.throttle(_sendValue);
        }

        this._hasValue = false;
        this._sendValue = undefined;
      };

      ThrottleSubscriber.prototype.throttle = function (value) {
        var duration = this.tryDurationSelector(value);

        if (!!duration) {
          this.add(this._throttled = innerSubscribe(duration, new SimpleInnerSubscriber(this)));
        }
      };

      ThrottleSubscriber.prototype.tryDurationSelector = function (value) {
        try {
          return this.durationSelector(value);
        } catch (err) {
          this.destination.error(err);
          return null;
        }
      };

      ThrottleSubscriber.prototype.throttlingDone = function () {
        var _a = this,
            _throttled = _a._throttled,
            _trailing = _a._trailing;

        if (_throttled) {
          _throttled.unsubscribe();
        }

        this._throttled = undefined;

        if (_trailing) {
          this.send();
        }
      };

      ThrottleSubscriber.prototype.notifyNext = function () {
        this.throttlingDone();
      };

      ThrottleSubscriber.prototype.notifyComplete = function () {
        this.throttlingDone();
      };

      return ThrottleSubscriber;
    }(SimpleOuterSubscriber);

    function throttleTime(duration, scheduler, config) {
      if (scheduler === void 0) {
        scheduler = async;
      }

      if (config === void 0) {
        config = defaultThrottleConfig;
      }

      return function (source) {
        return source.lift(new ThrottleTimeOperator(duration, scheduler, config.leading, config.trailing));
      };
    }

    var ThrottleTimeOperator = function () {
      function ThrottleTimeOperator(duration, scheduler, leading, trailing) {
        this.duration = duration;
        this.scheduler = scheduler;
        this.leading = leading;
        this.trailing = trailing;
      }

      ThrottleTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler, this.leading, this.trailing));
      };

      return ThrottleTimeOperator;
    }();

    var ThrottleTimeSubscriber = function (_super) {
      __extends(ThrottleTimeSubscriber, _super);

      function ThrottleTimeSubscriber(destination, duration, scheduler, leading, trailing) {
        var _this = _super.call(this, destination) || this;

        _this.duration = duration;
        _this.scheduler = scheduler;
        _this.leading = leading;
        _this.trailing = trailing;
        _this._hasTrailingValue = false;
        _this._trailingValue = null;
        return _this;
      }

      ThrottleTimeSubscriber.prototype._next = function (value) {
        if (this.throttled) {
          if (this.trailing) {
            this._trailingValue = value;
            this._hasTrailingValue = true;
          }
        } else {
          this.add(this.throttled = this.scheduler.schedule(dispatchNext$1, this.duration, {
            subscriber: this
          }));

          if (this.leading) {
            this.destination.next(value);
          } else if (this.trailing) {
            this._trailingValue = value;
            this._hasTrailingValue = true;
          }
        }
      };

      ThrottleTimeSubscriber.prototype._complete = function () {
        if (this._hasTrailingValue) {
          this.destination.next(this._trailingValue);
          this.destination.complete();
        } else {
          this.destination.complete();
        }
      };

      ThrottleTimeSubscriber.prototype.clearThrottle = function () {
        var throttled = this.throttled;

        if (throttled) {
          if (this.trailing && this._hasTrailingValue) {
            this.destination.next(this._trailingValue);
            this._trailingValue = null;
            this._hasTrailingValue = false;
          }

          throttled.unsubscribe();
          this.remove(throttled);
          this.throttled = null;
        }
      };

      return ThrottleTimeSubscriber;
    }(Subscriber);

    function dispatchNext$1(arg) {
      var subscriber = arg.subscriber;
      subscriber.clearThrottle();
    }

    var TimeoutWithSubscriber = function (_super) {
      __extends(TimeoutWithSubscriber, _super);

      function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
        var _this = _super.call(this, destination) || this;

        _this.absoluteTimeout = absoluteTimeout;
        _this.waitFor = waitFor;
        _this.withObservable = withObservable;
        _this.scheduler = scheduler;

        _this.scheduleTimeout();

        return _this;
      }

      TimeoutWithSubscriber.dispatchTimeout = function (subscriber) {
        var withObservable = subscriber.withObservable;

        subscriber._unsubscribeAndRecycle();

        subscriber.add(innerSubscribe(withObservable, new SimpleInnerSubscriber(subscriber)));
      };

      TimeoutWithSubscriber.prototype.scheduleTimeout = function () {
        var action = this.action;

        if (action) {
          this.action = action.schedule(this, this.waitFor);
        } else {
          this.add(this.action = this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, this));
        }
      };

      TimeoutWithSubscriber.prototype._next = function (value) {
        if (!this.absoluteTimeout) {
          this.scheduleTimeout();
        }

        _super.prototype._next.call(this, value);
      };

      TimeoutWithSubscriber.prototype._unsubscribe = function () {
        this.action = undefined;
        this.scheduler = null;
        this.withObservable = null;
      };

      return TimeoutWithSubscriber;
    }(SimpleOuterSubscriber);

    var WindowSubscriber = function (_super) {
      __extends(WindowSubscriber, _super);

      function WindowSubscriber(destination) {
        var _this = _super.call(this, destination) || this;

        _this.window = new Subject();
        destination.next(_this.window);
        return _this;
      }

      WindowSubscriber.prototype.notifyNext = function () {
        this.openWindow();
      };

      WindowSubscriber.prototype.notifyError = function (error) {
        this._error(error);
      };

      WindowSubscriber.prototype.notifyComplete = function () {
        this._complete();
      };

      WindowSubscriber.prototype._next = function (value) {
        this.window.next(value);
      };

      WindowSubscriber.prototype._error = function (err) {
        this.window.error(err);
        this.destination.error(err);
      };

      WindowSubscriber.prototype._complete = function () {
        this.window.complete();
        this.destination.complete();
      };

      WindowSubscriber.prototype._unsubscribe = function () {
        this.window = null;
      };

      WindowSubscriber.prototype.openWindow = function () {
        var prevWindow = this.window;

        if (prevWindow) {
          prevWindow.complete();
        }

        var destination = this.destination;
        var newWindow = this.window = new Subject();
        destination.next(newWindow);
      };

      return WindowSubscriber;
    }(SimpleOuterSubscriber);

    var WindowCountSubscriber = function (_super) {
      __extends(WindowCountSubscriber, _super);

      function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
        var _this = _super.call(this, destination) || this;

        _this.destination = destination;
        _this.windowSize = windowSize;
        _this.startWindowEvery = startWindowEvery;
        _this.windows = [new Subject()];
        _this.count = 0;
        destination.next(_this.windows[0]);
        return _this;
      }

      WindowCountSubscriber.prototype._next = function (value) {
        var startWindowEvery = this.startWindowEvery > 0 ? this.startWindowEvery : this.windowSize;
        var destination = this.destination;
        var windowSize = this.windowSize;
        var windows = this.windows;
        var len = windows.length;

        for (var i = 0; i < len && !this.closed; i++) {
          windows[i].next(value);
        }

        var c = this.count - windowSize + 1;

        if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
          windows.shift().complete();
        }

        if (++this.count % startWindowEvery === 0 && !this.closed) {
          var window_1 = new Subject();
          windows.push(window_1);
          destination.next(window_1);
        }
      };

      WindowCountSubscriber.prototype._error = function (err) {
        var windows = this.windows;

        if (windows) {
          while (windows.length > 0 && !this.closed) {
            windows.shift().error(err);
          }
        }

        this.destination.error(err);
      };

      WindowCountSubscriber.prototype._complete = function () {
        var windows = this.windows;

        if (windows) {
          while (windows.length > 0 && !this.closed) {
            windows.shift().complete();
          }
        }

        this.destination.complete();
      };

      WindowCountSubscriber.prototype._unsubscribe = function () {
        this.count = 0;
        this.windows = null;
      };

      return WindowCountSubscriber;
    }(Subscriber);

    var CountedSubject = function (_super) {
      __extends(CountedSubject, _super);

      function CountedSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this._numberOfNextedValues = 0;
        return _this;
      }

      CountedSubject.prototype.next = function (value) {
        this._numberOfNextedValues++;

        _super.prototype.next.call(this, value);
      };

      Object.defineProperty(CountedSubject.prototype, "numberOfNextedValues", {
        get: function get() {
          return this._numberOfNextedValues;
        },
        enumerable: true,
        configurable: true
      });
      return CountedSubject;
    }(Subject);

    var WindowTimeSubscriber = function (_super) {
      __extends(WindowTimeSubscriber, _super);

      function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
        var _this = _super.call(this, destination) || this;

        _this.destination = destination;
        _this.windowTimeSpan = windowTimeSpan;
        _this.windowCreationInterval = windowCreationInterval;
        _this.maxWindowSize = maxWindowSize;
        _this.scheduler = scheduler;
        _this.windows = [];

        var window = _this.openWindow();

        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
          var closeState = {
            subscriber: _this,
            window: window,
            context: null
          };
          var creationState = {
            windowTimeSpan: windowTimeSpan,
            windowCreationInterval: windowCreationInterval,
            subscriber: _this,
            scheduler: scheduler
          };

          _this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));

          _this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
        } else {
          var timeSpanOnlyState = {
            subscriber: _this,
            window: window,
            windowTimeSpan: windowTimeSpan
          };

          _this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
        }

        return _this;
      }

      WindowTimeSubscriber.prototype._next = function (value) {
        var windows = this.windows;
        var len = windows.length;

        for (var i = 0; i < len; i++) {
          var window_1 = windows[i];

          if (!window_1.closed) {
            window_1.next(value);

            if (window_1.numberOfNextedValues >= this.maxWindowSize) {
              this.closeWindow(window_1);
            }
          }
        }
      };

      WindowTimeSubscriber.prototype._error = function (err) {
        var windows = this.windows;

        while (windows.length > 0) {
          windows.shift().error(err);
        }

        this.destination.error(err);
      };

      WindowTimeSubscriber.prototype._complete = function () {
        var windows = this.windows;

        while (windows.length > 0) {
          var window_2 = windows.shift();

          if (!window_2.closed) {
            window_2.complete();
          }
        }

        this.destination.complete();
      };

      WindowTimeSubscriber.prototype.openWindow = function () {
        var window = new CountedSubject();
        this.windows.push(window);
        var destination = this.destination;
        destination.next(window);
        return window;
      };

      WindowTimeSubscriber.prototype.closeWindow = function (window) {
        window.complete();
        var windows = this.windows;
        windows.splice(windows.indexOf(window), 1);
      };

      return WindowTimeSubscriber;
    }(Subscriber);

    function dispatchWindowTimeSpanOnly(state) {
      var subscriber = state.subscriber,
          windowTimeSpan = state.windowTimeSpan,
          window = state.window;

      if (window) {
        subscriber.closeWindow(window);
      }

      state.window = subscriber.openWindow();
      this.schedule(state, windowTimeSpan);
    }

    function dispatchWindowCreation(state) {
      var windowTimeSpan = state.windowTimeSpan,
          subscriber = state.subscriber,
          scheduler = state.scheduler,
          windowCreationInterval = state.windowCreationInterval;
      var window = subscriber.openWindow();
      var action = this;
      var context = {
        action: action,
        subscription: null
      };
      var timeSpanState = {
        subscriber: subscriber,
        window: window,
        context: context
      };
      context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
      action.add(context.subscription);
      action.schedule(state, windowCreationInterval);
    }

    function dispatchWindowClose(state) {
      var subscriber = state.subscriber,
          window = state.window,
          context = state.context;

      if (context && context.action && context.subscription) {
        context.action.remove(context.subscription);
      }

      subscriber.closeWindow(window);
    }

    var WindowToggleSubscriber = function (_super) {
      __extends(WindowToggleSubscriber, _super);

      function WindowToggleSubscriber(destination, openings, closingSelector) {
        var _this = _super.call(this, destination) || this;

        _this.openings = openings;
        _this.closingSelector = closingSelector;
        _this.contexts = [];

        _this.add(_this.openSubscription = subscribeToResult(_this, openings, openings));

        return _this;
      }

      WindowToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;

        if (contexts) {
          var len = contexts.length;

          for (var i = 0; i < len; i++) {
            contexts[i].window.next(value);
          }
        }
      };

      WindowToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        this.contexts = null;

        if (contexts) {
          var len = contexts.length;
          var index = -1;

          while (++index < len) {
            var context_1 = contexts[index];
            context_1.window.error(err);
            context_1.subscription.unsubscribe();
          }
        }

        _super.prototype._error.call(this, err);
      };

      WindowToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        this.contexts = null;

        if (contexts) {
          var len = contexts.length;
          var index = -1;

          while (++index < len) {
            var context_2 = contexts[index];
            context_2.window.complete();
            context_2.subscription.unsubscribe();
          }
        }

        _super.prototype._complete.call(this);
      };

      WindowToggleSubscriber.prototype._unsubscribe = function () {
        var contexts = this.contexts;
        this.contexts = null;

        if (contexts) {
          var len = contexts.length;
          var index = -1;

          while (++index < len) {
            var context_3 = contexts[index];
            context_3.window.unsubscribe();
            context_3.subscription.unsubscribe();
          }
        }
      };

      WindowToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (outerValue === this.openings) {
          var closingNotifier = void 0;

          try {
            var closingSelector = this.closingSelector;
            closingNotifier = closingSelector(innerValue);
          } catch (e) {
            return this.error(e);
          }

          var window_1 = new Subject();
          var subscription = new Subscription();
          var context_4 = {
            window: window_1,
            subscription: subscription
          };
          this.contexts.push(context_4);
          var innerSubscription = subscribeToResult(this, closingNotifier, context_4);

          if (innerSubscription.closed) {
            this.closeWindow(this.contexts.length - 1);
          } else {
            innerSubscription.context = context_4;
            subscription.add(innerSubscription);
          }

          this.destination.next(window_1);
        } else {
          this.closeWindow(this.contexts.indexOf(outerValue));
        }
      };

      WindowToggleSubscriber.prototype.notifyError = function (err) {
        this.error(err);
      };

      WindowToggleSubscriber.prototype.notifyComplete = function (inner) {
        if (inner !== this.openSubscription) {
          this.closeWindow(this.contexts.indexOf(inner.context));
        }
      };

      WindowToggleSubscriber.prototype.closeWindow = function (index) {
        if (index === -1) {
          return;
        }

        var contexts = this.contexts;
        var context = contexts[index];
        var window = context.window,
            subscription = context.subscription;
        contexts.splice(index, 1);
        window.complete();
        subscription.unsubscribe();
      };

      return WindowToggleSubscriber;
    }(OuterSubscriber);

    var WindowSubscriber$1 = function (_super) {
      __extends(WindowSubscriber, _super);

      function WindowSubscriber(destination, closingSelector) {
        var _this = _super.call(this, destination) || this;

        _this.destination = destination;
        _this.closingSelector = closingSelector;

        _this.openWindow();

        return _this;
      }

      WindowSubscriber.prototype.notifyNext = function (_outerValue, _innerValue, _outerIndex, _innerIndex, innerSub) {
        this.openWindow(innerSub);
      };

      WindowSubscriber.prototype.notifyError = function (error) {
        this._error(error);
      };

      WindowSubscriber.prototype.notifyComplete = function (innerSub) {
        this.openWindow(innerSub);
      };

      WindowSubscriber.prototype._next = function (value) {
        this.window.next(value);
      };

      WindowSubscriber.prototype._error = function (err) {
        this.window.error(err);
        this.destination.error(err);
        this.unsubscribeClosingNotification();
      };

      WindowSubscriber.prototype._complete = function () {
        this.window.complete();
        this.destination.complete();
        this.unsubscribeClosingNotification();
      };

      WindowSubscriber.prototype.unsubscribeClosingNotification = function () {
        if (this.closingNotification) {
          this.closingNotification.unsubscribe();
        }
      };

      WindowSubscriber.prototype.openWindow = function (innerSub) {
        if (innerSub === void 0) {
          innerSub = null;
        }

        if (innerSub) {
          this.remove(innerSub);
          innerSub.unsubscribe();
        }

        var prevWindow = this.window;

        if (prevWindow) {
          prevWindow.complete();
        }

        var window = this.window = new Subject();
        this.destination.next(window);
        var closingNotifier;

        try {
          var closingSelector = this.closingSelector;
          closingNotifier = closingSelector();
        } catch (e) {
          this.destination.error(e);
          this.window.error(e);
          return;
        }

        this.add(this.closingNotification = subscribeToResult(this, closingNotifier));
      };

      return WindowSubscriber;
    }(OuterSubscriber);

    var WithLatestFromSubscriber = function (_super) {
      __extends(WithLatestFromSubscriber, _super);

      function WithLatestFromSubscriber(destination, observables, project) {
        var _this = _super.call(this, destination) || this;

        _this.observables = observables;
        _this.project = project;
        _this.toRespond = [];
        var len = observables.length;
        _this.values = new Array(len);

        for (var i = 0; i < len; i++) {
          _this.toRespond.push(i);
        }

        for (var i = 0; i < len; i++) {
          var observable = observables[i];

          _this.add(subscribeToResult(_this, observable, undefined, i));
        }

        return _this;
      }

      WithLatestFromSubscriber.prototype.notifyNext = function (_outerValue, innerValue, outerIndex) {
        this.values[outerIndex] = innerValue;
        var toRespond = this.toRespond;

        if (toRespond.length > 0) {
          var found = toRespond.indexOf(outerIndex);

          if (found !== -1) {
            toRespond.splice(found, 1);
          }
        }
      };

      WithLatestFromSubscriber.prototype.notifyComplete = function () {};

      WithLatestFromSubscriber.prototype._next = function (value) {
        if (this.toRespond.length === 0) {
          var args = [value].concat(this.values);

          if (this.project) {
            this._tryProject(args);
          } else {
            this.destination.next(args);
          }
        }
      };

      WithLatestFromSubscriber.prototype._tryProject = function (args) {
        var result;

        try {
          result = this.project.apply(this, args);
        } catch (err) {
          this.destination.error(err);
          return;
        }

        this.destination.next(result);
      };

      return WithLatestFromSubscriber;
    }(OuterSubscriber);

    var tabOverflow = function () {
      function tabOverflow(passedOptions) {
        _classCallCheck(this, tabOverflow);

        this.options = {
          overflowSelector: ".dk-tab-overflow__overflow",
          more: {
            selector: ".dk-tab-overflow",
            verticalAlign: "top",
            tag: "li",
            text: "More"
          },
          activeSelector: ".active",
          wrapOverflowTab: true
        };
        this.options = deepSpread(this.options, passedOptions);
      }

      _createClass(tabOverflow, [{
        key: "initOverflow",
        value: function initOverflow() {
          if (!this.tabContainer) {
            throw new Error("No \"this.tabContainer\" set");
          }

          this.tabContainer.insertAdjacentHTML("beforeend", this.overflowHTML);
          this.overflow = this.tabContainer.querySelector(this.options.overflowSelector);
          this.more = this.tabContainer.querySelector(this.options.more.selector);
          this.more.setAttribute("data-vertical-align", this.options.more.verticalAlign.toString());
          this.popperInstance = new Popper(this.more, this.overflow, {
            placement: document.querySelector("body").classList.contains("rtl") ? "bottom-start" : "bottom-start",
            modifiers: {
              flip: {
                enabled: false
              },
              preventOverflow: {
                boundariesElement: "viewport",
                padding: 20
              }
            }
          });

          this._updateTabs();

          this._moveLinks();

          this._initObservers();

          return this;
        }
      }, {
        key: "checkMoreForActive",
        value: function checkMoreForActive() {
          var hasCurrentPage = this.overflow.querySelector(this.options.activeSelector) ? true : false;
          this.more.setAttribute("data-has-active", hasCurrentPage);
        }
      }, {
        key: "publicMethods",
        get: function get() {
          var _this = this;

          return {
            update: function update() {
              _this._updateTabs();

              _this._moveLinks();
            }
          };
        }
      }, {
        key: "_moveLinks",
        value: function _moveLinks() {
          this.popperInstance.update();

          if (this.tooWide) {
            this._linksToOverflow();
          } else if (this.hasRoom) {
            this._linksToTabContainer();
          }
        }
      }, {
        key: "_updateTabs",
        value: function _updateTabs() {
          this.links = this.tabContainer.querySelectorAll(this.options.tabSelector + ":not([data-in-overflow]):not(.dk-tab-overflow)");
          this.last = this.links && this.links[this.links.length - 1];
          this.more.style.display = this.overflow.hasChildNodes() ? this.options.more.verticalAlign === "center" ? "flex" : "block" : "none";
          this.checkMoreForActive();

          this._updateOverflow();
        }
      }, {
        key: "_updateOverflow",
        value: function _updateOverflow() {
          this.overflow.first = this.overflow.firstChild;

          if (this.overflow.first) {
            this.overflow.first.width = this.overflow.first.getBoundingClientRect().width || 0;
          }

          this.overflow.style.removeProperty("width");
          this.overflow.style.width = Math.round(this.overflow.getBoundingClientRect().width) + 15 + "px";
          this.popperInstance.update();
        }
      }, {
        key: "_initObservers",
        value: function _initObservers() {
          var _this2 = this;

          mutationObserver$(this.overflow, {
            childList: true
          }).pipe(filter(function (mutations) {
            return mutations.find(function (_ref) {
              var type = _ref.type;
              return type === "childList";
            });
          })).subscribe(function () {
            _this2._updateOverflow();

            _this2._updateTabs();
          });
          var resize$ = fromEvent(window, "resize");
          resize$.pipe(throttleTime(500)).subscribe(this._moveLinks.bind(this));
          resize$.pipe(debounceTime(10)).subscribe(this._moveLinks.bind(this));
        }
      }, {
        key: "_linksToOverflow",
        value: function _linksToOverflow() {
          var _this3 = this;

          var whileCounter = 0;

          while (this.linksWidth > this.containerWidth && whileCounter < 150) {
            whileCounter++;
            this.last.setAttribute("data-in-overflow", "");

            if (this.options.wrapOverflowTab) {
              (function () {
                var isVisable = window.getComputedStyle(_this3.last).getPropertyValue("display") !== "none";
                var li = document.createElement("li");

                if (_this3.last.getAttribute("aria-current") === "page") {
                  li.setAttribute("aria-current", "page");
                }

                if (!isVisable) {
                  li.classList.add("hidden");
                }

                li.addEventListener("click", function () {
                  li.querySelector("a").click();
                });
                li.prepend(_this3.last);

                _this3.overflow.prepend(li);
              })();
            } else {
              this.overflow.prepend(this.last);
            }

            this._updateTabs();
          }
        }
      }, {
        key: "_linksToTabContainer",
        value: function _linksToTabContainer() {
          var whileCounter = 0;

          while (this.hasRoom && whileCounter < 100) {
            whileCounter++;
            this.overflow.first.removeAttribute("data-in-overflow");

            if (this.options.wrapOverflowTab) {
              this.overflow.first.querySelectorAll("[data-in-overflow]").forEach(function (tab) {
                return tab.removeAttribute("data-in-overflow");
              });
              this.more.insertAdjacentElement("beforebegin", this.overflow.first.firstChild);
              this.overflow.first.remove();
            } else {
              this.more.insertAdjacentElement("beforebegin", this.overflow.first);
            }

            this._updateTabs();
          }
        }
      }, {
        key: "overflowHTML",
        get: function get() {
          return "<".concat(this.options.more.tag, " class=\"dk-tab-overflow\">\n      ").concat(this.options.more.text, "\n      <ul class=\"dk-tab-overflow__overflow\"></ul>\n    </").concat(this.options.more.tag, ">");
        }
      }, {
        key: "containerWidth",
        get: function get() {
          return this.tabContainer.getBoundingClientRect().width;
        }
      }, {
        key: "marginOffset",
        get: function get() {
          if (this.links.length === 0) return 0;
          return parseInt(window.getComputedStyle(this.links[0]).getPropertyValue(this.marginLeftOrRight));
        }
      }, {
        key: "tooWide",
        get: function get() {
          return this.linksWidth > this.containerWidth;
        }
      }, {
        key: "hasRoom",
        get: function get() {
          var moreWidth = this.overflow.childElementCount === 1 ? -Math.abs(this.more.getBoundingClientRect().width + this.marginOffset) : 0;
          return this.overflow.first && this.linksWidth + moreWidth + this.overflow.first.width <= this.containerWidth;
        }
      }, {
        key: "marginLeftOrRight",
        get: function get() {
          return document.body.classList.contains("rtl") ? "margin-left" : "margin-right";
        }
      }, {
        key: "linksWidth",
        get: function get() {
          var _this4 = this;

          var moreWidth = this.overflow.childElementCount >= 1 ? this.more.getBoundingClientRect().width : 0;
          var linksWidth = Math.round(Array.from(this.links).map(function (node) {
            var style = node.currentStyle || window.getComputedStyle(node);
            return node.getBoundingClientRect().width + parseInt(style.getPropertyValue(_this4.marginLeftOrRight));
          }).reduce(function (a, b) {
            return a + b;
          }, 0));
          return linksWidth + moreWidth;
        }
      }]);

      return tabOverflow;
    }();

    function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

    function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

    var dkTabbedMenu = function (_tabOverflow) {
      _inherits(dkTabbedMenu, _tabOverflow);

      var _super = _createSuper(dkTabbedMenu);

      function dkTabbedMenu(tabWrapper, passedOptions) {
        var _this;

        _classCallCheck(this, dkTabbedMenu);

        var defaultOptions = {
          tabSelector: ".dk-tab-item",
          wrapOverflowTab: false,
          more: {
            text: tabWrapper.getAttribute("data-overflow-text") || "More"
          }
        };
        _this = _super.call(this, deepSpread(defaultOptions, passedOptions));
        _this.tabWrapper = tabWrapper;
        if (_this.tabWrapper.hasAttribute("react-tab") || _this.tabWrapper.hasAttribute("dk-tab--init")) return _possibleConstructorReturn(_this);

        _this.tabWrapper.setAttribute("dk-tab--init", "");

        _this.tabContainer = _this.tabWrapper.querySelector(".dk-tab-list");

        _this.init();

        _this.tabOverflow = _this.initOverflow();
        _this.tabWrapper.dkTabbedMenu = _this.publicMethods;
        return _this;
      }

      _createClass(dkTabbedMenu, [{
        key: "init",
        value: function init() {
          this.setInitalActiveTab();
          this.addEventListeners();
        }
      }, {
        key: "setInitalActiveTab",
        value: function setInitalActiveTab() {
          var _getParameterByName;

          var paramTab = (_getParameterByName = getParameterByName(this.tabWrapper.getAttribute("data-tab-menu-id"))) === null || _getParameterByName === void 0 ? void 0 : _getParameterByName.replace(/["']/g, "");
          var activeCheck = Array.from(this.tabWrapper.querySelectorAll("li")).filter(function (item) {
            return item.classList.contains("active");
          })[0];

          if (activeCheck && paramTab) {
            this.tabWrapper.querySelectorAll(".active").forEach(function (item) {
              return item.classList.remove("active");
            });
          }

          if (activeCheck && !paramTab) return;
          var item = this.tabWrapper.querySelector(".dk-tab-item".concat(paramTab ? "[data-tab-item=\"".concat(paramTab.replace(/"/g, ""), "\"]") : ""));
          var content = this.tabWrapper.querySelector(".dk-tab-content".concat(paramTab ? "[data-tab-item=\"".concat(paramTab, "\"]") : ""));

          if (paramTab && (!item || !this.tabWrapper)) ;

          item && item.classList.add("active");
          content && content.classList.add("active");
        }
      }, {
        key: "addEventListeners",
        value: function addEventListeners() {
          var self = this;
          this.tabWrapper.querySelectorAll(".dk-tab-item").forEach(function (tab) {
            tab.setAttribute("tabindex", "0");
            tab.addEventListener("click", function () {
              self.changeTab(this);
            });
            tab.addEventListener("keypress", function (e) {
              var code = e.keyCode;
              e.preventDefault();

              switch (code) {
                case 32:
                  self.changeTab(this);
                  break;

                case 13:
                  self.changeTab(this);
                  break;
              }
            });
          });
        }
      }, {
        key: "changeTab",
        value: function changeTab(clickedTab) {
          var tabId = clickedTab.dataset.tabItem;
          var tabContent = this.tabWrapper.querySelector(".dk-tab-content[data-tab-item=\"".concat(tabId, "\"]"));
          var carousel = tabContent.querySelector("[class*='dk-carousel");
          if (clickedTab.classList.contains("active")) return;

          if (carousel && !tabContent.hasAttribute("swiper-updated")) {
            setTimeout(function () {
              carousel.swiper.update();
            }, 0);
            tabContent.setAttribute("swiper-updated", "");
          }

          this.tabWrapper.querySelectorAll("li.active").forEach(function (tab) {
            tab.classList.remove("active");
          });
          this.tabWrapper.querySelectorAll(".dk-tab-content").forEach(function (tab) {
            tab.classList.remove("active");
          });
          clickedTab.classList.add("active");
          tabContent.classList.add("active");
          this.tabOverflow.checkMoreForActive();
        }
      }]);

      return dkTabbedMenu;
    }(tabOverflow);

    function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

    var dkTabbedSidebar = function () {
      function dkTabbedSidebar(tabWrapper, passedOptions) {
        _classCallCheck(this, dkTabbedSidebar);

        this.tabWrapper = void 0;
        this.tabBtnIds = [];
        this.settings = void 0;
        this.openID$ = void 0;
        this.previousId = void 0;
        var defaultOptions = {
          btnClass: "dk-tab__item",
          tabListClass: "dk-tab__list",
          panelClass: "dk-tab__panel"
        };
        this.settings = _objectSpread$1(_objectSpread$1({}, defaultOptions), passedOptions);
        this.tabWrapper = tabWrapper;
        if (this.tabWrapper.hasAttribute("react-tab") || this.tabWrapper.hasAttribute("dk-tab--init")) return;
        this.tabWrapper.setAttribute("dk-tab--init", "");
        this.init();
      }

      _createClass(dkTabbedSidebar, [{
        key: "init",
        value: function init() {
          var _getParameterByName$r,
              _getParameterByName,
              _getParameterByName2,
              _this = this;

          this.tabBtnIds = Array.from(this.tabWrapper.querySelectorAll(".".concat(this.settings.btnClass))).map(function (b) {
            return b.id;
          });
          var paramTab = (_getParameterByName$r = (_getParameterByName = getParameterByName(this.tabWrapper.getAttribute("aria-label"))) === null || _getParameterByName === void 0 ? void 0 : _getParameterByName.replace(/["']/g, "")) !== null && _getParameterByName$r !== void 0 ? _getParameterByName$r : (_getParameterByName2 = getParameterByName(this.tabWrapper.id)) === null || _getParameterByName2 === void 0 ? void 0 : _getParameterByName2.replace(/["']/g, "");
          var activeTab = this.tabWrapper.querySelector("[aria-selected=\"true\"]");
          this.openID$ = new BehaviorSubject(paramTab || (activeTab === null || activeTab === void 0 ? void 0 : activeTab.id) || this.tabBtnIds[0]);
          this.tabWrapper.querySelectorAll(".".concat(this.settings.panelClass)).forEach(function (panel) {
            return panel.setAttribute("tabindex", "0");
          });
          this.tabWrapper.querySelectorAll(".".concat(this.settings.btnClass)).forEach(function (btn) {
            return btn.setAttribute("tabindex", "-1");
          });
          this.addEventListeners();
          this.addMatchMedia();
          this.openID$.subscribe(function (id) {
            _this.activeTab.open();
          });
        }
      }, {
        key: "addEventListeners",
        value: function addEventListeners() {
          var _this2 = this;

          fromEvent(this.tabWrapper, "click").pipe(filter(function (e) {
            var target = e.target;
            return target.classList.contains(_this2.settings.btnClass) && !_this2.isTabBtnActive(target);
          })).subscribe(function (e) {
            var btn = e.target;

            _this2.openID$.next(btn.id);
          });
          fromEvent(this.tabWrapper, "keydown").pipe(filter(function (e) {
            var target = e.target;
            return target.classList.contains(_this2.settings.btnClass);
          })).subscribe(function (e) {
            var key = e.key;

            switch (key) {
              case "ArrowDown":
              case "ArrowRight":
              case "Down":
              case "Right":
                _this2.focusTab.next();

                break;

              case "ArrowUp":
              case "ArrowLeft":
              case "Up":
              case "Left":
                _this2.focusTab.previous();

                break;
            }
          });
        }
      }, {
        key: "addMatchMedia",
        value: function addMatchMedia() {
          var _this3 = this;

          var mq = window.matchMedia("(min-width: 768px)");

          var moveToaccordion = function moveToaccordion(mq) {
            var tabList = _this3.tabWrapper.querySelector("[role=\"tablist\"]");

            if (mq.matches) {
              if (tabList.childElementCount > 0) return;

              _this3.tabWrapper.querySelectorAll(".".concat(_this3.settings.btnClass)).forEach(function (btn) {
                tabList.insertAdjacentElement("beforeend", btn);
              });
            } else {
              _this3.tabWrapper.querySelectorAll(".".concat(_this3.settings.btnClass)).forEach(function (btn) {
                var panel = _this3.tabWrapper.querySelector("#".concat(btn.getAttribute("aria-controls")));

                panel.insertAdjacentElement("beforebegin", btn);
              });
            }
          };

          mq.addListener(moveToaccordion);
          moveToaccordion(mq);
        }
      }, {
        key: "closeEverything",
        value: function closeEverything() {
          this.tabWrapper.querySelectorAll("[data-selected=\"true\"]").forEach(function (t) {
            t.setAttribute("data-selected", "false");
          });
          this.tabWrapper.querySelectorAll("[aria-selected=\"true\"]").forEach(function (b) {
            b.setAttribute("aria-selected", "false");
            b.setAttribute("tabindex", "-1");
          });
        }
      }, {
        key: "isTabBtnActive",
        value: function isTabBtnActive(tabBtn) {
          var ariaSelected = tabBtn.getAttribute("aria-selected");
          return ariaSelected === "true" ? true : false;
        }
      }, {
        key: "focusTab",
        get: function get() {
          var _this4 = this;

          var lastIndex = this.tabBtnIds.length - 1;
          return {
            next: function next() {
              var newIndex = _this4.activeTab.index >= lastIndex ? 0 : _this4.activeTab.index + 1;

              _this4.openID$.next(_this4.tabBtnIds[newIndex]);
            },
            previous: function previous() {
              var newIndex = _this4.activeTab.index === 0 ? lastIndex : _this4.activeTab.index - 1;

              _this4.openID$.next(_this4.tabBtnIds[newIndex]);
            }
          };
        }
      }, {
        key: "activeTab",
        get: function get() {
          var self = this;
          return {
            get btn() {
              return self.tabWrapper.querySelector("#".concat(self.openID$.getValue()));
            },

            get panel() {
              return self.tabWrapper.querySelector("#".concat(this.btn.getAttribute("aria-controls")));
            },

            get index() {
              var _this5 = this;

              return self.tabBtnIds.findIndex(function (b) {
                return b === _this5.btn.id;
              });
            },

            toggleOpen: function toggleOpen() {
              self.closeEverything();
            },
            focusBtn: function focusBtn() {
              this.btn.focus();
            },
            open: function open() {
              self.closeEverything();
              this.btn.setAttribute("aria-selected", "true");
              this.btn.removeAttribute("tabindex");
              this.panel.setAttribute("data-selected", "true");
              this.focusBtn();
            }
          };
        }
      }, {
        key: "isMobile",
        get: function get() {
          return window.innerWidth <= 768;
        }
      }]);

      return dkTabbedSidebar;
    }();

    function tabbedMenu(selector, passedSettings) {
      var settings = isPlainObject_1(selector) ? selector : passedSettings;
      return selectorHelper({
        selector: selector,
        defaultSelector: ".dk-tabbed-menu"
      }, function (tab) {
        return new dkTabbedMenu(tab, settings).publicMethods;
      });
    }
    function tabbedSidebar(selector, passedSettings) {
      var settings = isPlainObject_1(selector) ? selector : passedSettings;
      return selectorHelper({
        selector: selector,
        defaultSelector: ".dk-tabbed-sidebar"
      }, function (tab) {
        return new dkTabbedSidebar(tab, settings).publicMethods;
      });
    }

    var onFreeze = internalMetadata.onFreeze;

    var nativeFreeze = Object.freeze;
    var FAILS_ON_PRIMITIVES$3 = fails(function () { nativeFreeze(1); });

    // `Object.freeze` method
    // https://tc39.es/ecma262/#sec-object.freeze
    _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$3, sham: !freezing }, {
      freeze: function freeze(it) {
        return nativeFreeze && isObject(it) ? nativeFreeze(onFreeze(it)) : it;
      }
    });

    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    _export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
      defineProperties: objectDefineProperties
    });

    function _taggedTemplateLiteral(strings, raw) {
      if (!raw) {
        raw = strings.slice(0);
      }

      return Object.freeze(Object.defineProperties(strings, {
        raw: {
          value: Object.freeze(raw)
        }
      }));
    }

    var getWeakData = internalMetadata.getWeakData;








    var setInternalState$6 = internalState.set;
    var internalStateGetterFor$1 = internalState.getterFor;
    var find$1 = arrayIteration.find;
    var findIndex$1 = arrayIteration.findIndex;
    var id$1 = 0;

    // fallback for uncaught frozen keys
    var uncaughtFrozenStore = function (store) {
      return store.frozen || (store.frozen = new UncaughtFrozenStore());
    };

    var UncaughtFrozenStore = function () {
      this.entries = [];
    };

    var findUncaughtFrozen = function (store, key) {
      return find$1(store.entries, function (it) {
        return it[0] === key;
      });
    };

    UncaughtFrozenStore.prototype = {
      get: function (key) {
        var entry = findUncaughtFrozen(this, key);
        if (entry) return entry[1];
      },
      has: function (key) {
        return !!findUncaughtFrozen(this, key);
      },
      set: function (key, value) {
        var entry = findUncaughtFrozen(this, key);
        if (entry) entry[1] = value;
        else this.entries.push([key, value]);
      },
      'delete': function (key) {
        var index = findIndex$1(this.entries, function (it) {
          return it[0] === key;
        });
        if (~index) this.entries.splice(index, 1);
        return !!~index;
      }
    };

    var collectionWeak = {
      getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
        var C = wrapper(function (that, iterable) {
          anInstance(that, C, CONSTRUCTOR_NAME);
          setInternalState$6(that, {
            type: CONSTRUCTOR_NAME,
            id: id$1++,
            frozen: undefined
          });
          if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
        });

        var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

        var define = function (that, key, value) {
          var state = getInternalState(that);
          var data = getWeakData(anObject(key), true);
          if (data === true) uncaughtFrozenStore(state).set(key, value);
          else data[state.id] = value;
          return that;
        };

        redefineAll(C.prototype, {
          // 23.3.3.2 WeakMap.prototype.delete(key)
          // 23.4.3.3 WeakSet.prototype.delete(value)
          'delete': function (key) {
            var state = getInternalState(this);
            if (!isObject(key)) return false;
            var data = getWeakData(key);
            if (data === true) return uncaughtFrozenStore(state)['delete'](key);
            return data && has(data, state.id) && delete data[state.id];
          },
          // 23.3.3.4 WeakMap.prototype.has(key)
          // 23.4.3.4 WeakSet.prototype.has(value)
          has: function has$1(key) {
            var state = getInternalState(this);
            if (!isObject(key)) return false;
            var data = getWeakData(key);
            if (data === true) return uncaughtFrozenStore(state).has(key);
            return data && has(data, state.id);
          }
        });

        redefineAll(C.prototype, IS_MAP ? {
          // 23.3.3.3 WeakMap.prototype.get(key)
          get: function get(key) {
            var state = getInternalState(this);
            if (isObject(key)) {
              var data = getWeakData(key);
              if (data === true) return uncaughtFrozenStore(state).get(key);
              return data ? data[state.id] : undefined;
            }
          },
          // 23.3.3.5 WeakMap.prototype.set(key, value)
          set: function set(key, value) {
            return define(this, key, value);
          }
        } : {
          // 23.4.3.1 WeakSet.prototype.add(value)
          add: function add(value) {
            return define(this, value, true);
          }
        });

        return C;
      }
    };

    var es_weakMap = createCommonjsModule(function (module) {






    var enforceIternalState = internalState.enforce;


    var IS_IE11 = !global_1.ActiveXObject && 'ActiveXObject' in global_1;
    var isExtensible = Object.isExtensible;
    var InternalWeakMap;

    var wrapper = function (init) {
      return function WeakMap() {
        return init(this, arguments.length ? arguments[0] : undefined);
      };
    };

    // `WeakMap` constructor
    // https://tc39.es/ecma262/#sec-weakmap-constructor
    var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak);

    // IE11 WeakMap frozen keys fix
    // We can't use feature detection because it crash some old IE builds
    // https://github.com/zloirock/core-js/issues/485
    if (nativeWeakMap && IS_IE11) {
      InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
      internalMetadata.REQUIRED = true;
      var WeakMapPrototype = $WeakMap.prototype;
      var nativeDelete = WeakMapPrototype['delete'];
      var nativeHas = WeakMapPrototype.has;
      var nativeGet = WeakMapPrototype.get;
      var nativeSet = WeakMapPrototype.set;
      redefineAll(WeakMapPrototype, {
        'delete': function (key) {
          if (isObject(key) && !isExtensible(key)) {
            var state = enforceIternalState(this);
            if (!state.frozen) state.frozen = new InternalWeakMap();
            return nativeDelete.call(this, key) || state.frozen['delete'](key);
          } return nativeDelete.call(this, key);
        },
        has: function has(key) {
          if (isObject(key) && !isExtensible(key)) {
            var state = enforceIternalState(this);
            if (!state.frozen) state.frozen = new InternalWeakMap();
            return nativeHas.call(this, key) || state.frozen.has(key);
          } return nativeHas.call(this, key);
        },
        get: function get(key) {
          if (isObject(key) && !isExtensible(key)) {
            var state = enforceIternalState(this);
            if (!state.frozen) state.frozen = new InternalWeakMap();
            return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
          } return nativeGet.call(this, key);
        },
        set: function set(key, value) {
          if (isObject(key) && !isExtensible(key)) {
            var state = enforceIternalState(this);
            if (!state.frozen) state.frozen = new InternalWeakMap();
            nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
          } else nativeSet.call(this, key, value);
          return this;
        }
      });
    }
    });

    var umap = (function (_) {
      return {
        get: function get(key) {
          return _.get(key);
        },
        set: function set(key, value) {
          return _.set(key, value), value;
        }
      };
    });

    var attr = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/;
    var empty$2 = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
    var node$1 = /<[a-z][^>]+$/i;
    var notNode = />[^<>]*$/;
    var selfClosing = /<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/ig;
    var trimEnd = /\s+$/;

    var isNode = function isNode(template, i) {
      return 0 < i-- && (node$1.test(template[i]) || !notNode.test(template[i]) && isNode(template, i));
    };

    var regular = function regular(original, name, extra) {
      return empty$2.test(name) ? original : "<".concat(name).concat(extra.replace(trimEnd, ''), "></").concat(name, ">");
    };

    var instrument = (function (template, prefix, svg) {
      var text = [];
      var length = template.length;

      var _loop = function _loop(i) {
        var chunk = template[i - 1];
        text.push(attr.test(chunk) && isNode(template, i) ? chunk.replace(attr, function (_, $1, $2) {
          return "".concat(prefix).concat(i - 1, "=").concat($2 || '"').concat($1).concat($2 ? '' : '"');
        }) : "".concat(chunk, "<!--").concat(prefix).concat(i - 1, "-->"));
      };

      for (var i = 1; i < length; i++) {
        _loop(i);
      }

      text.push(template[length - 1]);
      var output = text.join('').trim();
      return svg ? output : output.replace(selfClosing, regular);
    });

    var isArray$2 = Array.isArray;
    var _ref = [],
        indexOf$1 = _ref.indexOf,
        slice$2 = _ref.slice;

    var ELEMENT_NODE = 1;
    var nodeType = 111;

    var remove = function remove(_ref) {
      var firstChild = _ref.firstChild,
          lastChild = _ref.lastChild;
      var range = document.createRange();
      range.setStartAfter(firstChild);
      range.setEndAfter(lastChild);
      range.deleteContents();
      return firstChild;
    };

    var diffable = function diffable(node, operation) {
      return node.nodeType === nodeType ? 1 / operation < 0 ? operation ? remove(node) : node.lastChild : operation ? node.valueOf() : node.firstChild : node;
    };
    var persistent = function persistent(fragment) {
      var childNodes = fragment.childNodes;
      var length = childNodes.length;
      if (length < 2) return length ? childNodes[0] : fragment;
      var nodes = slice$2.call(childNodes, 0);
      var firstChild = nodes[0];
      var lastChild = nodes[length - 1];
      return {
        ELEMENT_NODE: ELEMENT_NODE,
        nodeType: nodeType,
        firstChild: firstChild,
        lastChild: lastChild,
        valueOf: function valueOf() {
          if (childNodes.length !== length) {
            var i = 0;

            while (i < length) {
              fragment.appendChild(nodes[i++]);
            }
          }

          return fragment;
        }
      };
    };

    var $reduceRight = arrayReduce.right;




    var STRICT_METHOD$6 = arrayMethodIsStrict('reduceRight');
    // Chrome 80-82 has a critical bug
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
    var CHROME_BUG$1 = !engineIsNode && engineV8Version > 79 && engineV8Version < 83;

    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    _export({ target: 'Array', proto: true, forced: !STRICT_METHOD$6 || CHROME_BUG$1 }, {
      reduceRight: function reduceRight(callbackfn /* , initialValue */) {
        return $reduceRight(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var udomdiff = (function (parentNode, a, b, get, before) {
      var bLength = b.length;
      var aEnd = a.length;
      var bEnd = bLength;
      var aStart = 0;
      var bStart = 0;
      var map = null;

      while (aStart < aEnd || bStart < bEnd) {
        if (aEnd === aStart) {
          var node = bEnd < bLength ? bStart ? get(b[bStart - 1], -0).nextSibling : get(b[bEnd - bStart], 0) : before;

          while (bStart < bEnd) {
            parentNode.insertBefore(get(b[bStart++], 1), node);
          }
        } else if (bEnd === bStart) {
            while (aStart < aEnd) {
              if (!map || !map.has(a[aStart])) parentNode.removeChild(get(a[aStart], -1));
              aStart++;
            }
          } else if (a[aStart] === b[bStart]) {
              aStart++;
              bStart++;
            } else if (a[aEnd - 1] === b[bEnd - 1]) {
                aEnd--;
                bEnd--;
              } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
                  var _node = get(a[--aEnd], -1).nextSibling;
                  parentNode.insertBefore(get(b[bStart++], 1), get(a[aStart++], -1).nextSibling);
                  parentNode.insertBefore(get(b[--bEnd], 1), _node);
                  a[aEnd] = b[bEnd];
                } else {
                    if (!map) {
                      map = new Map();
                      var i = bStart;

                      while (i < bEnd) {
                        map.set(b[i], i++);
                      }
                    }

                    if (map.has(a[aStart])) {
                      var index = map.get(a[aStart]);

                      if (bStart < index && index < bEnd) {
                        var _i = aStart;
                        var sequence = 1;

                        while (++_i < aEnd && _i < bEnd && map.get(a[_i]) === index + sequence) {
                          sequence++;
                        }

                        if (sequence > index - bStart) {
                          var _node2 = get(a[aStart], 0);

                          while (bStart < index) {
                            parentNode.insertBefore(get(b[bStart++], 1), _node2);
                          }
                        } else {
                            parentNode.replaceChild(get(b[bStart++], 1), get(a[aStart++], -1));
                          }
                      } else aStart++;
                    } else parentNode.removeChild(get(a[aStart++], -1));
                  }
      }

      return b;
    });

    var aria = function aria(node) {
      return function (values) {
        for (var key in values) {
          var name = key === 'role' ? key : "aria-".concat(key);
          var value = values[key];
          if (value == null) node.removeAttribute(name);else node.setAttribute(name, value);
        }
      };
    };
    var attribute = function attribute(node, name) {
      var oldValue,
          orphan = true;
      var attributeNode = document.createAttributeNS(null, name);
      return function (newValue) {
        if (oldValue !== newValue) {
          oldValue = newValue;

          if (oldValue == null) {
            if (!orphan) {
              node.removeAttributeNode(attributeNode);
              orphan = true;
            }
          } else {
            attributeNode.value = newValue;

            if (orphan) {
              node.setAttributeNodeNS(attributeNode);
              orphan = false;
            }
          }
        }
      };
    };
    var data$1 = function data(_ref) {
      var dataset = _ref.dataset;
      return function (values) {
        for (var key in values) {
          var value = values[key];
          if (value == null) delete dataset[key];else dataset[key] = value;
        }
      };
    };
    var event = function event(node, name) {
      var oldValue,
          type = name.slice(2);
      if (!(name in node) && name.toLowerCase() in node) type = type.toLowerCase();
      return function (newValue) {
        var info = isArray$2(newValue) ? newValue : [newValue, false];

        if (oldValue !== info[0]) {
          if (oldValue) node.removeEventListener(type, oldValue, info[1]);
          if (oldValue = info[0]) node.addEventListener(type, oldValue, info[1]);
        }
      };
    };
    var ref = function ref(node) {
      return function (value) {
        if (typeof value === 'function') value(node);else value.current = node;
      };
    };
    var setter = function setter(node, key) {
      return function (value) {
        node[key] = value;
      };
    };
    var text = function text(node) {
      var oldValue;
      return function (newValue) {
        if (oldValue != newValue) {
          oldValue = newValue;
          node.textContent = newValue == null ? '' : newValue;
        }
      };
    };

    var createContent = function (document) {

      var FRAGMENT = 'fragment';
      var TEMPLATE = 'template';
      var HAS_CONTENT = ('content' in create(TEMPLATE));
      var createHTML = HAS_CONTENT ? function (html) {
        var template = create(TEMPLATE);
        template.innerHTML = html;
        return template.content;
      } : function (html) {
        var content = create(FRAGMENT);
        var template = create(TEMPLATE);
        var childNodes = null;

        if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)) {
          var selector = RegExp.$1;
          template.innerHTML = '<table>' + html + '</table>';
          childNodes = template.querySelectorAll(selector);
        } else {
          template.innerHTML = html;
          childNodes = template.childNodes;
        }

        append(content, childNodes);
        return content;
      };
      return function createContent(markup, type) {
        return (type === 'svg' ? createSVG : createHTML)(markup);
      };

      function append(root, childNodes) {
        var length = childNodes.length;

        while (length--) {
          root.appendChild(childNodes[0]);
        }
      }

      function create(element) {
        return element === FRAGMENT ? document.createDocumentFragment() : document.createElementNS('http://www.w3.org/1999/xhtml', element);
      }

      function createSVG(svg) {
        var content = create(FRAGMENT);
        var template = create('div');
        template.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + svg + '</svg>';
        append(content, template.firstChild.childNodes);
        return content;
      }
    }(document);

    var reducePath = function reducePath(_ref, i) {
      var childNodes = _ref.childNodes;
      return childNodes[i];
    };
    var createPath = function createPath(node) {
      var path = [];
      var _node = node,
          parentNode = _node.parentNode;

      while (parentNode) {
        path.push(indexOf$1.call(parentNode.childNodes, node));
        node = parentNode;
        parentNode = node.parentNode;
      }

      return path;
    };
    var _document = document,
        createTreeWalker = _document.createTreeWalker,
        importNode = _document.importNode;
    var IE = importNode.length != 1;
    var createFragment = IE ? function (text, type) {
      return importNode.call(document, createContent(text, type), true);
    } : createContent;
    var createWalker = IE ? function (fragment) {
      return createTreeWalker.call(document, fragment, 1 | 128, null, false);
    } : function (fragment) {
      return createTreeWalker.call(document, fragment, 1 | 128);
    };

    var diff = function diff(comment, oldNodes, newNodes) {
      return udomdiff(comment.parentNode, oldNodes, newNodes, diffable, comment);
    };

    var handleAnything = function handleAnything(comment) {
      var oldValue,
          text,
          nodes = [];

      var anyContent = function anyContent(newValue) {
        switch (_typeof$1(newValue)) {
          case 'string':
          case 'number':
          case 'boolean':
            if (oldValue !== newValue) {
              oldValue = newValue;
              if (text) text.textContent = newValue;else text = document.createTextNode(newValue);
              nodes = diff(comment, nodes, [text]);
            }

            break;

          case 'object':
          case 'undefined':
            if (newValue == null) {
              if (oldValue != newValue) {
                oldValue = newValue;
                nodes = diff(comment, nodes, []);
              }

              break;
            }

            if (isArray$2(newValue)) {
              oldValue = newValue;
              if (newValue.length === 0) nodes = diff(comment, nodes, []);else if (_typeof$1(newValue[0]) === 'object') nodes = diff(comment, nodes, newValue);else anyContent(String(newValue));
              break;
            }

            if ('ELEMENT_NODE' in newValue && oldValue !== newValue) {
              oldValue = newValue;
              nodes = diff(comment, nodes, newValue.nodeType === 11 ? slice$2.call(newValue.childNodes) : [newValue]);
            }

        }
      };

      return anyContent;
    };

    var handleAttribute = function handleAttribute(node, name) {
      if (name === 'ref') return ref(node);
      if (name === 'aria') return aria(node);
      if (name === '.dataset' || name === 'data' && !(name in node)) return data$1(node);
      if (name.slice(0, 1) === '.') return setter(node, name.slice(1));
      if (name.slice(0, 2) === 'on') return event(node, name);
      return attribute(node, name);
    };

    function handlers(options) {
      var type = options.type,
          path = options.path;
      var node = path.reduceRight(reducePath, this);
      return type === 'node' ? handleAnything(node) : type === 'attr' ? handleAttribute(node, options.name) : text(node);
    }

    var prefix = 'isµ';
    var cache = umap(new WeakMap());
    var createCache = function createCache() {
      return {
        stack: [],
        entry: null,
        wire: null
      };
    };

    var createEntry = function createEntry(type, template) {
      var _mapUpdates = mapUpdates(type, template),
          content = _mapUpdates.content,
          updates = _mapUpdates.updates;

      return {
        type: type,
        template: template,
        content: content,
        updates: updates,
        wire: null
      };
    };

    var mapTemplate = function mapTemplate(type, template) {
      var text = instrument(template, prefix, type === 'svg');
      var content = createFragment(text, type);
      var tw = createWalker(content);
      var nodes = [];
      var length = template.length - 1;
      var i = 0;
      var search = "".concat(prefix).concat(i);

      while (i < length) {
        var node = tw.nextNode();
        if (!node) throw "bad template: ".concat(text);

        if (node.nodeType === 8) {
          if (node.textContent === search) {
            nodes.push({
              type: 'node',
              path: createPath(node)
            });
            search = "".concat(prefix).concat(++i);
          }
        } else {
          while (node.hasAttribute(search)) {
            nodes.push({
              type: 'attr',
              path: createPath(node),
              name: node.getAttribute(search)
            });
            node.removeAttribute(search);
            search = "".concat(prefix).concat(++i);
          }

          if (/^(?:style|textarea)$/i.test(node.tagName) && node.textContent.trim() === "<!--".concat(search, "-->")) {
            nodes.push({
              type: 'text',
              path: createPath(node)
            });
            search = "".concat(prefix).concat(++i);
          }
        }
      }

      return {
        content: content,
        nodes: nodes
      };
    };

    var mapUpdates = function mapUpdates(type, template) {
      var _ref = cache.get(template) || cache.set(template, mapTemplate(type, template)),
          content = _ref.content,
          nodes = _ref.nodes;

      var fragment = importNode.call(document, content, true);
      var updates = nodes.map(handlers, fragment);
      return {
        content: fragment,
        updates: updates
      };
    };

    var unroll = function unroll(info, _ref2) {
      var type = _ref2.type,
          template = _ref2.template,
          values = _ref2.values;
      var length = values.length;
      unrollValues(info, values, length);
      var entry = info.entry;
      if (!entry || entry.template !== template || entry.type !== type) info.entry = entry = createEntry(type, template);
      var _entry = entry,
          content = _entry.content,
          updates = _entry.updates,
          wire = _entry.wire;

      for (var i = 0; i < length; i++) {
        updates[i](values[i]);
      }

      return wire || (entry.wire = persistent(content));
    };

    var unrollValues = function unrollValues(_ref3, values, length) {
      var stack = _ref3.stack;

      for (var i = 0; i < length; i++) {
        var hole = values[i];
        if (hole instanceof Hole) values[i] = unroll(stack[i] || (stack[i] = createCache()), hole);else if (isArray$2(hole)) unrollValues(stack[i] || (stack[i] = createCache()), hole, hole.length);else stack[i] = null;
      }

      if (length < stack.length) stack.splice(length);
    };

    function Hole(type, template, values) {
      this.type = type;
      this.template = template;
      this.values = values;
    }

    var create = Object.create,
        defineProperties = Object.defineProperties;
    var cache$1 = umap(new WeakMap());

    var tag = function tag(type) {
      var keyed = umap(new WeakMap());

      var fixed = function fixed(cache) {
        return function (template) {
          for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            values[_key - 1] = arguments[_key];
          }

          return unroll(cache, {
            type: type,
            template: template,
            values: values
          });
        };
      };

      return defineProperties(function (template) {
        for (var _len2 = arguments.length, values = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          values[_key2 - 1] = arguments[_key2];
        }

        return new Hole(type, template, values);
      }, {
        "for": {
          value: function value(ref, id) {
            var memo = keyed.get(ref) || keyed.set(ref, create(null));
            return memo[id] || (memo[id] = fixed(createCache()));
          }
        },
        node: {
          value: function value(template) {
            for (var _len3 = arguments.length, values = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
              values[_key3 - 1] = arguments[_key3];
            }

            return unroll(createCache(), {
              type: type,
              template: template,
              values: values
            }).valueOf();
          }
        }
      });
    };

    var html$1 = tag('html');
    var svg = tag('svg');
    var render = function render(where, what) {
      var hole = typeof what === 'function' ? what() : what;
      var info = cache$1.get(where) || cache$1.set(where, createCache());
      var wire = hole instanceof Hole ? unroll(info, hole) : hole;

      if (wire !== info.wire) {
        info.wire = wire;
        where.textContent = '';
        where.appendChild(wire.valueOf());
      }

      return where;
    };

    // `Object.is` method
    // https://tc39.es/ecma262/#sec-object.is
    _export({ target: 'Object', stat: true }, {
      is: sameValue
    });

    var vanilla = createCommonjsModule(function (module, exports) {





















    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    function create(createState) {
      var state;
      var listeners = new Set();

      var setState = function setState(partial, replace) {
        var nextState = typeof partial === 'function' ? partial(state) : partial;

        if (nextState !== state) {
          var previousState = state;
          state = replace ? nextState : Object.assign({}, state, nextState);
          listeners.forEach(function (listener) {
            return listener(state, previousState);
          });
        }
      };

      var getState = function getState() {
        return state;
      };

      var subscribeWithSelector = function subscribeWithSelector(listener, selector, equalityFn) {
        if (selector === void 0) {
          selector = getState;
        }

        if (equalityFn === void 0) {
          equalityFn = Object.is;
        }

        var currentSlice = selector(state);

        function listenerToAdd() {
          var nextSlice = selector(state);

          if (!equalityFn(currentSlice, nextSlice)) {
            var previousSlice = currentSlice;
            listener(currentSlice = nextSlice, previousSlice);
          }
        }

        listeners.add(listenerToAdd);
        return function () {
          return listeners["delete"](listenerToAdd);
        };
      };

      var subscribe = function subscribe(listener, selector, equalityFn) {
        if (selector || equalityFn) {
          return subscribeWithSelector(listener, selector, equalityFn);
        }

        listeners.add(listener);
        return function () {
          return listeners["delete"](listener);
        };
      };

      var destroy = function destroy() {
        return listeners.clear();
      };

      var api = {
        setState: setState,
        getState: getState,
        subscribe: subscribe,
        destroy: destroy
      };
      state = createState(setState, getState, api);
      return api;
    }

    exports["default"] = create;
    });

    var create$1 = unwrapExports(vanilla);

    function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
    function createDropdownStore(initialState) {
      var store = create$1(function () {
        return _objectSpread$2({
          isOpen: false,
          noFocusChange: false,
          options: [],
          filterPlaceholder: "Type to search...dude"
        }, initialState);
      });
      return store;
    }

    var _templateObject;

    function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
    var dropdownID = 0;

    var AbstractCustomSelect = function () {
      function AbstractCustomSelect(dropdown, settings) {
        _classCallCheck(this, AbstractCustomSelect);

        this.selectRef = void 0;
        this.store = void 0;
        this.selectOnChange$ = void 0;
        this.options = void 0;
        this.settings = void 0;
        this.placeholderText = void 0;
        this.container = void 0;
        this.optionsContainer = void 0;
        this.preSelected = [];
        this.hasError = false;
        this.clicked = void 0;
        this.settings = _objectSpread$3(_objectSpread$3({
          id: dropdownID,
          containerClass: "dk-dropdown__container",
          optionsContainerClass: "dk-dropdown__options",
          inlineWidth: true,
          filter: dropdown.hasAttribute("data-filter"),
          debug: false
        }, settings), {}, {
          filterPlaceholder: dropdown.getAttribute("data-filter-placeholder") || (settings === null || settings === void 0 ? void 0 : settings.filterPlaceholder) || "Type to search..."
        });
        dropdownID++;
        this.selectRef = dropdown;

        if (this.selectRef.hasAttribute("data-placeholder")) {
          this.placeholderText = this.selectRef.getAttribute("data-placeholder");
          this.selectRef.insertAdjacentElement("afterbegin", this.placehlderMarkup);
        }

        this.selectRef.setAttribute("dk-dropdown--init", "");
        this.selectRef.setAttribute("tabindex", "-1");
        this.selectRef.setAttribute("data-dropdown-id", this.settings.id.toString());

        if (this.settings.debug) {
          this.selectRef.setAttribute("data-debug", "true");
        }

        this.store = createDropdownStore(_objectSpread$3({
          options: this.parsedOptions,
          filterPlaceholder: this.settings.filterPlaceholder
        }, this.selectRef.hasAttribute("data-placeholder") && {
          placeholder: this.selectRef.getAttribute("data-placeholder")
        }));
        this.initBaseClass();
      }

      _createClass(AbstractCustomSelect, [{
        key: "state",
        get: function get() {
          return this.store.getState();
        }
      }, {
        key: "setState",
        value: function setState(newState) {
          this.store.setState(newState);
        }
      }, {
        key: "initBaseClass",
        value: function initBaseClass() {
          this.sharedEvents();
          this.initContainers();
          this.addMutationObserver();
          this.selectOnChange$ = fromEvent(this.selectRef, "change").pipe(filter(function (e) {
            var _e$detail;

            return !((_e$detail = e.detail) !== null && _e$detail !== void 0 && _e$detail.customChange);
          }));
        }
      }, {
        key: "initContainers",
        value: function initContainers() {
          this.createDropdownContainer();
          this.selectRef.insertAdjacentElement("afterend", this.container);
          this.createOptionsContainer();
          this.container.insertAdjacentElement("beforebegin", this.selectRef);
          this.handleDisabeled();
        }
      }, {
        key: "createDropdownContainer",
        value: function createDropdownContainer() {
          this.container = document.createElement("div");
          this.updateContainerClassNames();
          this.container.tabIndex = 0;
          this.container.setAttribute("data-dropdown-id", this.settings.id.toString());

          if (this.settings.inlineWidth) {
            this.setInlineWidth();
          }
        }
      }, {
        key: "createOptionsContainer",
        value: function createOptionsContainer() {
          this.optionsContainer = document.createElement("div");
          this.optionsContainer.setAttribute("tabindex", "0");
          this.optionsContainer.setAttribute("data-dropdown-open", "false");
          this.optionsContainer.setAttribute("data-dropdown-id", this.settings.id.toString());
          this.optionsContainer.classList.add(this.settings.optionsContainerClass);
        }
      }, {
        key: "setInlineWidth",
        value: function setInlineWidth(width) {
          var widthArg = width && typeof width === "number" ? width + "px" : width === null || width === void 0 ? void 0 : width.toString();
          var newWidth = width ? widthArg : this.selectWidth;
          this.container.style.width = newWidth;

          if (width) {
            return "Dropdown ID ".concat(this.settings.id, ": Width set to ").concat(newWidth);
          }
        }
      }, {
        key: "addMutationObserver",
        value: function addMutationObserver() {
          var _this = this;

          var childChanged = debounce(function () {
            _this.setState({
              options: _this.parsedOptions
            });

            _this._render();

            if (_this.settings.inlineWidth) {
              _this.setInlineWidth();
            }
          }, 0);
          var config = {
            attributes: true,
            childList: true,
            subtree: true
          };
          var observer = new MutationObserver(function (mutationsList) {
            return mutationsList.forEach(function (mutation) {
              var type = mutation.type;

              if (type === "childList") {
                childChanged();
              } else if (type === "attributes") {
                _this.handleAttributeMutation(mutation);
              }
            });
          });
          observer.observe(this.selectRef, config);
        }
      }, {
        key: "sharedEvents",
        value: function sharedEvents() {
          if (typeof window.mouseDown == "undefined") {
            window.mouseDown = false;

            document.body.onmousedown = function () {
              window.mouseDown = true;
            };

            document.body.onmouseup = function () {
              window.mouseDown = false;
            };
          }
        }
      }, {
        key: "handleAttributeMutation",
        value: function handleAttributeMutation(mutation) {
          var attributeName = mutation.attributeName;

          switch (attributeName) {
            case "disabled":
              return this.handleDisabeled();

            case "class":
              return this.updateContainerClassNames();

            default:
              return;
          }
        }
      }, {
        key: "updateContainerClassNames",
        value: function updateContainerClassNames() {
          var selectClassNames = Array.from(this.selectRef.classList).filter(function (className) {
            return className !== "dk-dropdown";
          }).join(" ");
          this.container.className = this.settings.containerClass + " " + selectClassNames;
        }
      }, {
        key: "parseOptionElm",
        value: function parseOptionElm(option, index) {
          var label = option.innerText,
              value = option.value,
              hidden = option.hidden,
              selected = option.selected;
          return {
            label: label,
            value: value,
            hidden: hidden,
            index: index,
            selected: selected
          };
        }
      }, {
        key: "handleDisabeled",
        value: function handleDisabeled() {
          if (this.selectRef.hasAttribute("disabled")) {
            this.container.classList.add("dk-dropdown__container--disabled");
          } else {
            this.container.classList.remove("dk-dropdown__container--disabled");
          }
        }
      }, {
        key: "fireChangeEvent",
        value: function fireChangeEvent() {
          var event = new CustomEvent("change", {
            detail: {
              customChange: true
            }
          });
          this.selectRef.dispatchEvent(event);
        }
      }, {
        key: "clearSelected",
        value: function clearSelected() {
          this.optionRefs.filter(function (o) {
            return o.selected;
          }).forEach(function (option) {
            return option.selected = false;
          });
          this.setState({
            options: this.parsedOptions
          });
        }
      }, {
        key: "placehlderMarkup",
        get: function get() {
          return html$1.node(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n\n      <option value=\"\" disabled selected hidden>", "</option>\n    "])), this.placeholderText);
        }
      }, {
        key: "selectWidth",
        get: function get() {
          return this.selectRef.getBoundingClientRect().width + "px";
        }
      }, {
        key: "parsedOptions",
        get: function get() {
          var _this2 = this;

          return this.optionRefs.map(function (option, index) {
            return _this2.parseOptionElm(option, index);
          });
        }
      }, {
        key: "optionRefs",
        get: function get() {
          return Array.from(this.selectRef.getElementsByTagName("option"));
        }
      }, {
        key: "selectedOptions",
        get: function get() {
          return this.state.options.filter(function (option) {
            return option.selected;
          });
        }
      }, {
        key: "noneSelected",
        get: function get() {
          return this.selectedOptions.length === 0;
        }
      }]);

      return AbstractCustomSelect;
    }();

    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;

      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }

      return target;
    }

    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;

      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }

      return target;
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }

    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }

    var notARegexp = function (it) {
      if (isRegexp(it)) {
        throw TypeError("The method doesn't accept regular expressions");
      } return it;
    };

    var MATCH$2 = wellKnownSymbol('match');

    var correctIsRegexpLogic = function (METHOD_NAME) {
      var regexp = /./;
      try {
        '/./'[METHOD_NAME](regexp);
      } catch (error1) {
        try {
          regexp[MATCH$2] = false;
          return '/./'[METHOD_NAME](regexp);
        } catch (error2) { /* empty */ }
      } return false;
    };

    var getOwnPropertyDescriptor$4 = objectGetOwnPropertyDescriptor.f;






    var nativeStartsWith = ''.startsWith;
    var min$5 = Math.min;

    var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic('startsWith');
    // https://github.com/zloirock/core-js/pull/702
    var MDN_POLYFILL_BUG =  !CORRECT_IS_REGEXP_LOGIC && !!function () {
      var descriptor = getOwnPropertyDescriptor$4(String.prototype, 'startsWith');
      return descriptor && !descriptor.writable;
    }();

    // `String.prototype.startsWith` method
    // https://tc39.es/ecma262/#sec-string.prototype.startswith
    _export({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
      startsWith: function startsWith(searchString /* , position = 0 */) {
        var that = String(requireObjectCoercible(this));
        notARegexp(searchString);
        var index = toLength(min$5(arguments.length > 1 ? arguments[1] : undefined, that.length));
        var search = String(searchString);
        return nativeStartsWith
          ? nativeStartsWith.call(that, search, index)
          : that.slice(index, index + search.length) === search;
      }
    });

    var getOwnPropertyDescriptor$5 = objectGetOwnPropertyDescriptor.f;






    var nativeEndsWith = ''.endsWith;
    var min$6 = Math.min;

    var CORRECT_IS_REGEXP_LOGIC$1 = correctIsRegexpLogic('endsWith');
    // https://github.com/zloirock/core-js/pull/702
    var MDN_POLYFILL_BUG$1 =  !CORRECT_IS_REGEXP_LOGIC$1 && !!function () {
      var descriptor = getOwnPropertyDescriptor$5(String.prototype, 'endsWith');
      return descriptor && !descriptor.writable;
    }();

    // `String.prototype.endsWith` method
    // https://tc39.es/ecma262/#sec-string.prototype.endswith
    _export({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG$1 && !CORRECT_IS_REGEXP_LOGIC$1 }, {
      endsWith: function endsWith(searchString /* , endPosition = @length */) {
        var that = String(requireObjectCoercible(this));
        notARegexp(searchString);
        var endPosition = arguments.length > 1 ? arguments[1] : undefined;
        var len = toLength(that.length);
        var end = endPosition === undefined ? len : min$6(toLength(endPosition), len);
        var search = String(searchString);
        return nativeEndsWith
          ? nativeEndsWith.call(that, search, end)
          : that.slice(end - search.length, end) === search;
      }
    });

    // `Number.EPSILON` constant
    // https://tc39.es/ecma262/#sec-number.epsilon
    _export({ target: 'Number', stat: true }, {
      EPSILON: Math.pow(2, -52)
    });

    function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

    function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

    function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
    var INFINITY = 1 / 0;

    var isArray$3 = function isArray(value) {
      return !Array.isArray ? Object.prototype.toString.call(value) === '[object Array]' : Array.isArray(value);
    };

    var baseToString = function baseToString(value) {
      if (typeof value == 'string') {
        return value;
      }

      var result = value + '';
      return result == '0' && 1 / value == -INFINITY ? '-0' : result;
    };

    var toString$2 = function toString(value) {
      return value == null ? '' : baseToString(value);
    };

    var isString = function isString(value) {
      return typeof value === 'string';
    };

    var isNumber = function isNumber(value) {
      return typeof value === 'number';
    };

    var isDefined = function isDefined(value) {
      return value !== undefined && value !== null;
    };

    var isBlank = function isBlank(value) {
      return !value.trim().length;
    };

    function get$1(obj, path) {
      var list = [];
      var arr = false;

      var _get = function _get(obj, path) {
        if (!path) {
          list.push(obj);
        } else {
          var dotIndex = path.indexOf('.');
          var key = path;
          var remaining = null;

          if (dotIndex !== -1) {
            key = path.slice(0, dotIndex);
            remaining = path.slice(dotIndex + 1);
          }

          var value = obj[key];

          if (isDefined(value)) {
            if (!remaining && (isString(value) || isNumber(value))) {
              list.push(toString$2(value));
            } else if (isArray$3(value)) {
              arr = true;

              for (var i = 0, len = value.length; i < len; i += 1) {
                _get(value[i], remaining);
              }
            } else if (remaining) {
              _get(value, remaining);
            }
          }
        }
      };

      _get(obj, path);

      if (arr) {
        return list;
      }

      return list[0];
    }

    var MatchOptions = {
      includeMatches: false,
      findAllMatches: false,
      minMatchCharLength: 1
    };
    var BasicOptions = {
      isCaseSensitive: false,
      includeScore: false,
      keys: [],
      shouldSort: true,
      sortFn: function sortFn(a, b) {
        return a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1;
      }
    };
    var FuzzyOptions = {
      location: 0,
      threshold: 0.6,
      distance: 100
    };
    var AdvancedOptions = {
      useExtendedSearch: false,
      getFn: get$1
    };

    var Config = _objectSpread$4(_objectSpread$4(_objectSpread$4(_objectSpread$4({}, BasicOptions), MatchOptions), FuzzyOptions), AdvancedOptions);

    function computeScore(pattern) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$errors = _ref.errors,
          errors = _ref$errors === void 0 ? 0 : _ref$errors,
          _ref$currentLocation = _ref.currentLocation,
          currentLocation = _ref$currentLocation === void 0 ? 0 : _ref$currentLocation,
          _ref$expectedLocation = _ref.expectedLocation,
          expectedLocation = _ref$expectedLocation === void 0 ? 0 : _ref$expectedLocation,
          _ref$distance = _ref.distance,
          distance = _ref$distance === void 0 ? Config.distance : _ref$distance;

      var accuracy = errors / pattern.length;
      var proximity = Math.abs(expectedLocation - currentLocation);

      if (!distance) {
        return proximity ? 1.0 : accuracy;
      }

      return accuracy + proximity / distance;
    }

    function convertMaskToIndices() {
      var matchmask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var minMatchCharLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Config.minMatchCharLength;
      var matchedIndices = [];
      var start = -1;
      var end = -1;
      var i = 0;

      for (var len = matchmask.length; i < len; i += 1) {
        var match = matchmask[i];

        if (match && start === -1) {
          start = i;
        } else if (!match && start !== -1) {
          end = i - 1;

          if (end - start + 1 >= minMatchCharLength) {
            matchedIndices.push([start, end]);
          }

          start = -1;
        }
      }

      if (matchmask[i - 1] && i - start >= minMatchCharLength) {
        matchedIndices.push([start, i - 1]);
      }

      return matchedIndices;
    }

    var MAX_BITS = 32;

    function search(text, pattern, patternAlphabet) {
      var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
          _ref2$location = _ref2.location,
          location = _ref2$location === void 0 ? Config.location : _ref2$location,
          _ref2$distance = _ref2.distance,
          distance = _ref2$distance === void 0 ? Config.distance : _ref2$distance,
          _ref2$threshold = _ref2.threshold,
          threshold = _ref2$threshold === void 0 ? Config.threshold : _ref2$threshold,
          _ref2$findAllMatches = _ref2.findAllMatches,
          findAllMatches = _ref2$findAllMatches === void 0 ? Config.findAllMatches : _ref2$findAllMatches,
          _ref2$minMatchCharLen = _ref2.minMatchCharLength,
          minMatchCharLength = _ref2$minMatchCharLen === void 0 ? Config.minMatchCharLength : _ref2$minMatchCharLen,
          _ref2$includeMatches = _ref2.includeMatches,
          includeMatches = _ref2$includeMatches === void 0 ? Config.includeMatches : _ref2$includeMatches;

      if (pattern.length > MAX_BITS) {
        throw new Error("Pattern length exceeds max of ".concat(MAX_BITS, "."));
      }

      var patternLen = pattern.length;
      var textLen = text.length;
      var expectedLocation = Math.max(0, Math.min(location, textLen));
      var currentThreshold = threshold;
      var bestLocation = expectedLocation;
      var matchMask = [];

      if (includeMatches) {
        for (var i = 0; i < textLen; i += 1) {
          matchMask[i] = 0;
        }
      }

      var index;

      while ((index = text.indexOf(pattern, bestLocation)) > -1) {
        var score = computeScore(pattern, {
          currentLocation: index,
          expectedLocation: expectedLocation,
          distance: distance
        });
        currentThreshold = Math.min(score, currentThreshold);
        bestLocation = index + patternLen;

        if (includeMatches) {
          var _i = 0;

          while (_i < patternLen) {
            matchMask[index + _i] = 1;
            _i += 1;
          }
        }
      }

      bestLocation = -1;
      var lastBitArr = [];
      var finalScore = 1;
      var binMax = patternLen + textLen;
      var mask = 1 << (patternLen <= MAX_BITS - 1 ? patternLen - 1 : MAX_BITS - 2);

      for (var _i2 = 0; _i2 < patternLen; _i2 += 1) {
        var binMin = 0;
        var binMid = binMax;

        while (binMin < binMid) {
          var _score2 = computeScore(pattern, {
            errors: _i2,
            currentLocation: expectedLocation + binMid,
            expectedLocation: expectedLocation,
            distance: distance
          });

          if (_score2 <= currentThreshold) {
            binMin = binMid;
          } else {
            binMax = binMid;
          }

          binMid = Math.floor((binMax - binMin) / 2 + binMin);
        }

        binMax = binMid;
        var start = Math.max(1, expectedLocation - binMid + 1);
        var finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;
        var bitArr = Array(finish + 2);
        bitArr[finish + 1] = (1 << _i2) - 1;

        for (var j = finish; j >= start; j -= 1) {
          var currentLocation = j - 1;
          var charMatch = patternAlphabet[text.charAt(currentLocation)];

          if (charMatch && includeMatches) {
            matchMask[currentLocation] = 1;
          }

          bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;

          if (_i2 !== 0) {
            bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
          }

          if (bitArr[j] & mask) {
            finalScore = computeScore(pattern, {
              errors: _i2,
              currentLocation: currentLocation,
              expectedLocation: expectedLocation,
              distance: distance
            });

            if (finalScore <= currentThreshold) {
              currentThreshold = finalScore;
              bestLocation = currentLocation;

              if (bestLocation <= expectedLocation) {
                break;
              }

              start = Math.max(1, 2 * expectedLocation - bestLocation);
            }
          }
        }

        var _score = computeScore(pattern, {
          errors: _i2 + 1,
          currentLocation: expectedLocation,
          expectedLocation: expectedLocation,
          distance: distance
        });

        if (_score > currentThreshold) {
          break;
        }

        lastBitArr = bitArr;
      }

      var result = {
        isMatch: bestLocation >= 0,
        score: !finalScore ? 0.001 : finalScore
      };

      if (includeMatches) {
        result.matchedIndices = convertMaskToIndices(matchMask, minMatchCharLength);
      }

      return result;
    }

    function createPatternAlphabet(pattern) {
      var mask = {};
      var len = pattern.length;

      for (var i = 0; i < len; i += 1) {
        mask[pattern.charAt(i)] = 0;
      }

      for (var _i3 = 0; _i3 < len; _i3 += 1) {
        mask[pattern.charAt(_i3)] |= 1 << len - _i3 - 1;
      }

      return mask;
    }

    var BitapSearch = function () {
      function BitapSearch(pattern) {
        var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref3$location = _ref3.location,
            location = _ref3$location === void 0 ? Config.location : _ref3$location,
            _ref3$threshold = _ref3.threshold,
            threshold = _ref3$threshold === void 0 ? Config.threshold : _ref3$threshold,
            _ref3$distance = _ref3.distance,
            distance = _ref3$distance === void 0 ? Config.distance : _ref3$distance,
            _ref3$includeMatches = _ref3.includeMatches,
            includeMatches = _ref3$includeMatches === void 0 ? Config.includeMatches : _ref3$includeMatches,
            _ref3$findAllMatches = _ref3.findAllMatches,
            findAllMatches = _ref3$findAllMatches === void 0 ? Config.findAllMatches : _ref3$findAllMatches,
            _ref3$minMatchCharLen = _ref3.minMatchCharLength,
            minMatchCharLength = _ref3$minMatchCharLen === void 0 ? Config.minMatchCharLength : _ref3$minMatchCharLen,
            _ref3$isCaseSensitive = _ref3.isCaseSensitive,
            isCaseSensitive = _ref3$isCaseSensitive === void 0 ? Config.isCaseSensitive : _ref3$isCaseSensitive;

        _classCallCheck(this, BitapSearch);

        this.options = {
          location: location,
          threshold: threshold,
          distance: distance,
          includeMatches: includeMatches,
          findAllMatches: findAllMatches,
          minMatchCharLength: minMatchCharLength,
          isCaseSensitive: isCaseSensitive
        };
        this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
        this.chunks = [];
        var index = 0;

        while (index < this.pattern.length) {
          var _pattern = this.pattern.substring(index, index + MAX_BITS);

          this.chunks.push({
            pattern: _pattern,
            alphabet: createPatternAlphabet(_pattern)
          });
          index += MAX_BITS;
        }
      }

      _createClass(BitapSearch, [{
        key: "searchIn",
        value: function searchIn(value) {
          var text = value.$;
          return this.searchInString(text);
        }
      }, {
        key: "searchInString",
        value: function searchInString(text) {
          var _this$options = this.options,
              isCaseSensitive = _this$options.isCaseSensitive,
              includeMatches = _this$options.includeMatches;

          if (!isCaseSensitive) {
            text = text.toLowerCase();
          }

          if (this.pattern === text) {
            var _result = {
              isMatch: true,
              score: 0
            };

            if (includeMatches) {
              _result.matchedIndices = [[0, text.length - 1]];
            }

            return _result;
          }

          var _this$options2 = this.options,
              location = _this$options2.location,
              distance = _this$options2.distance,
              threshold = _this$options2.threshold,
              findAllMatches = _this$options2.findAllMatches,
              minMatchCharLength = _this$options2.minMatchCharLength;
          var allMatchedIndices = [];
          var totalScore = 0;
          var hasMatches = false;

          for (var i = 0, len = this.chunks.length; i < len; i += 1) {
            var _this$chunks$i = this.chunks[i],
                pattern = _this$chunks$i.pattern,
                alphabet = _this$chunks$i.alphabet;

            var _result2 = search(text, pattern, alphabet, {
              location: location + MAX_BITS * i,
              distance: distance,
              threshold: threshold,
              findAllMatches: findAllMatches,
              minMatchCharLength: minMatchCharLength,
              includeMatches: includeMatches
            });

            var isMatch = _result2.isMatch,
                score = _result2.score,
                matchedIndices = _result2.matchedIndices;

            if (isMatch) {
              hasMatches = true;
            }

            totalScore += score;

            if (isMatch && matchedIndices) {
              allMatchedIndices = [].concat(_toConsumableArray(allMatchedIndices), _toConsumableArray(matchedIndices));
            }
          }

          var result = {
            isMatch: hasMatches,
            score: hasMatches ? totalScore / this.chunks.length : 1
          };

          if (hasMatches && includeMatches) {
            result.matchedIndices = allMatchedIndices;
          }

          return result;
        }
      }]);

      return BitapSearch;
    }();

    var BaseMatch = function () {
      function BaseMatch(pattern) {
        _classCallCheck(this, BaseMatch);

        this.pattern = pattern;
      }

      _createClass(BaseMatch, [{
        key: "search",
        value: function search() {}
      }], [{
        key: "isMultiMatch",
        value: function isMultiMatch(pattern) {
          return getMatch(pattern, this.multiRegex);
        }
      }, {
        key: "isSingleMatch",
        value: function isSingleMatch(pattern) {
          return getMatch(pattern, this.singleRegex);
        }
      }]);

      return BaseMatch;
    }();

    function getMatch(pattern, exp) {
      var matches = pattern.match(exp);
      return matches ? matches[1] : null;
    }

    var ExactMatch = function (_BaseMatch) {
      _inherits(ExactMatch, _BaseMatch);

      var _super = _createSuper$1(ExactMatch);

      function ExactMatch(pattern) {
        _classCallCheck(this, ExactMatch);

        return _super.call(this, pattern);
      }

      _createClass(ExactMatch, [{
        key: "search",
        value: function search(text) {
          var location = 0;
          var index;
          var matchedIndices = [];
          var patternLen = this.pattern.length;

          while ((index = text.indexOf(this.pattern, location)) > -1) {
            location = index + patternLen;
            matchedIndices.push([index, location - 1]);
          }

          var isMatch = !!matchedIndices.length;
          return {
            isMatch: isMatch,
            score: isMatch ? 1 : 0,
            matchedIndices: matchedIndices
          };
        }
      }], [{
        key: "type",
        get: function get() {
          return 'exact';
        }
      }, {
        key: "multiRegex",
        get: function get() {
          return /^'"(.*)"$/;
        }
      }, {
        key: "singleRegex",
        get: function get() {
          return /^'(.*)$/;
        }
      }]);

      return ExactMatch;
    }(BaseMatch);

    var InverseExactMatch = function (_BaseMatch2) {
      _inherits(InverseExactMatch, _BaseMatch2);

      var _super2 = _createSuper$1(InverseExactMatch);

      function InverseExactMatch(pattern) {
        _classCallCheck(this, InverseExactMatch);

        return _super2.call(this, pattern);
      }

      _createClass(InverseExactMatch, [{
        key: "search",
        value: function search(text) {
          var index = text.indexOf(this.pattern);
          var isMatch = index === -1;
          return {
            isMatch: isMatch,
            score: isMatch ? 0 : 1,
            matchedIndices: [0, text.length - 1]
          };
        }
      }], [{
        key: "type",
        get: function get() {
          return 'inverse-exact';
        }
      }, {
        key: "multiRegex",
        get: function get() {
          return /^!"(.*)"$/;
        }
      }, {
        key: "singleRegex",
        get: function get() {
          return /^!(.*)$/;
        }
      }]);

      return InverseExactMatch;
    }(BaseMatch);

    var PrefixExactMatch = function (_BaseMatch3) {
      _inherits(PrefixExactMatch, _BaseMatch3);

      var _super3 = _createSuper$1(PrefixExactMatch);

      function PrefixExactMatch(pattern) {
        _classCallCheck(this, PrefixExactMatch);

        return _super3.call(this, pattern);
      }

      _createClass(PrefixExactMatch, [{
        key: "search",
        value: function search(text) {
          var isMatch = text.startsWith(this.pattern);
          return {
            isMatch: isMatch,
            score: isMatch ? 0 : 1,
            matchedIndices: [0, this.pattern.length - 1]
          };
        }
      }], [{
        key: "type",
        get: function get() {
          return 'prefix-exact';
        }
      }, {
        key: "multiRegex",
        get: function get() {
          return /^\^"(.*)"$/;
        }
      }, {
        key: "singleRegex",
        get: function get() {
          return /^\^(.*)$/;
        }
      }]);

      return PrefixExactMatch;
    }(BaseMatch);

    var InversePrefixExactMatch = function (_BaseMatch4) {
      _inherits(InversePrefixExactMatch, _BaseMatch4);

      var _super4 = _createSuper$1(InversePrefixExactMatch);

      function InversePrefixExactMatch(pattern) {
        _classCallCheck(this, InversePrefixExactMatch);

        return _super4.call(this, pattern);
      }

      _createClass(InversePrefixExactMatch, [{
        key: "search",
        value: function search(text) {
          var isMatch = !text.startsWith(this.pattern);
          return {
            isMatch: isMatch,
            score: isMatch ? 0 : 1,
            matchedIndices: [0, text.length - 1]
          };
        }
      }], [{
        key: "type",
        get: function get() {
          return 'inverse-prefix-exact';
        }
      }, {
        key: "multiRegex",
        get: function get() {
          return /^!\^"(.*)"$/;
        }
      }, {
        key: "singleRegex",
        get: function get() {
          return /^!\^(.*)$/;
        }
      }]);

      return InversePrefixExactMatch;
    }(BaseMatch);

    var SuffixExactMatch = function (_BaseMatch5) {
      _inherits(SuffixExactMatch, _BaseMatch5);

      var _super5 = _createSuper$1(SuffixExactMatch);

      function SuffixExactMatch(pattern) {
        _classCallCheck(this, SuffixExactMatch);

        return _super5.call(this, pattern);
      }

      _createClass(SuffixExactMatch, [{
        key: "search",
        value: function search(text) {
          var isMatch = text.endsWith(this.pattern);
          return {
            isMatch: isMatch,
            score: isMatch ? 0 : 1,
            matchedIndices: [text.length - this.pattern.length, text.length - 1]
          };
        }
      }], [{
        key: "type",
        get: function get() {
          return 'suffix-exact';
        }
      }, {
        key: "multiRegex",
        get: function get() {
          return /^"(.*)"\$$/;
        }
      }, {
        key: "singleRegex",
        get: function get() {
          return /^(.*)\$$/;
        }
      }]);

      return SuffixExactMatch;
    }(BaseMatch);

    var InverseSuffixExactMatch = function (_BaseMatch6) {
      _inherits(InverseSuffixExactMatch, _BaseMatch6);

      var _super6 = _createSuper$1(InverseSuffixExactMatch);

      function InverseSuffixExactMatch(pattern) {
        _classCallCheck(this, InverseSuffixExactMatch);

        return _super6.call(this, pattern);
      }

      _createClass(InverseSuffixExactMatch, [{
        key: "search",
        value: function search(text) {
          var isMatch = !text.endsWith(this.pattern);
          return {
            isMatch: isMatch,
            score: isMatch ? 0 : 1,
            matchedIndices: [0, text.length - 1]
          };
        }
      }], [{
        key: "type",
        get: function get() {
          return 'inverse-suffix-exact';
        }
      }, {
        key: "multiRegex",
        get: function get() {
          return /^!"(.*)"\$$/;
        }
      }, {
        key: "singleRegex",
        get: function get() {
          return /^!(.*)\$$/;
        }
      }]);

      return InverseSuffixExactMatch;
    }(BaseMatch);

    var FuzzyMatch = function (_BaseMatch7) {
      _inherits(FuzzyMatch, _BaseMatch7);

      var _super7 = _createSuper$1(FuzzyMatch);

      function FuzzyMatch(pattern) {
        var _this;

        var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref4$location = _ref4.location,
            location = _ref4$location === void 0 ? Config.location : _ref4$location,
            _ref4$threshold = _ref4.threshold,
            threshold = _ref4$threshold === void 0 ? Config.threshold : _ref4$threshold,
            _ref4$distance = _ref4.distance,
            distance = _ref4$distance === void 0 ? Config.distance : _ref4$distance,
            _ref4$includeMatches = _ref4.includeMatches,
            includeMatches = _ref4$includeMatches === void 0 ? Config.includeMatches : _ref4$includeMatches,
            _ref4$findAllMatches = _ref4.findAllMatches,
            findAllMatches = _ref4$findAllMatches === void 0 ? Config.findAllMatches : _ref4$findAllMatches,
            _ref4$minMatchCharLen = _ref4.minMatchCharLength,
            minMatchCharLength = _ref4$minMatchCharLen === void 0 ? Config.minMatchCharLength : _ref4$minMatchCharLen,
            _ref4$isCaseSensitive = _ref4.isCaseSensitive,
            isCaseSensitive = _ref4$isCaseSensitive === void 0 ? Config.isCaseSensitive : _ref4$isCaseSensitive;

        _classCallCheck(this, FuzzyMatch);

        _this = _super7.call(this, pattern);
        _this._bitapSearch = new BitapSearch(pattern, {
          location: location,
          threshold: threshold,
          distance: distance,
          includeMatches: includeMatches,
          findAllMatches: findAllMatches,
          minMatchCharLength: minMatchCharLength,
          isCaseSensitive: isCaseSensitive
        });
        return _this;
      }

      _createClass(FuzzyMatch, [{
        key: "search",
        value: function search(text) {
          return this._bitapSearch.searchInString(text);
        }
      }], [{
        key: "type",
        get: function get() {
          return 'fuzzy';
        }
      }, {
        key: "multiRegex",
        get: function get() {
          return /^"(.*)"$/;
        }
      }, {
        key: "singleRegex",
        get: function get() {
          return /^(.*)$/;
        }
      }]);

      return FuzzyMatch;
    }(BaseMatch);

    var searchers = [ExactMatch, PrefixExactMatch, InversePrefixExactMatch, InverseSuffixExactMatch, SuffixExactMatch, InverseExactMatch, FuzzyMatch];
    var searchersLen = searchers.length;
    var SPACE_RE = / +(?=([^\"]*\"[^\"]*\")*[^\"]*$)/;
    var OR_TOKEN = '|';

    function parseQuery(pattern) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return pattern.split(OR_TOKEN).map(function (item) {
        var query = item.trim().split(SPACE_RE).filter(function (item) {
          return item && !!item.trim();
        });
        var results = [];

        for (var i = 0, len = query.length; i < len; i += 1) {
          var queryItem = query[i];
          var found = false;
          var idx = -1;

          while (!found && ++idx < searchersLen) {
            var searcher = searchers[idx];
            var token = searcher.isMultiMatch(queryItem);

            if (token) {
              results.push(new searcher(token, options));
              found = true;
            }
          }

          if (found) {
            continue;
          }

          idx = -1;

          while (++idx < searchersLen) {
            var _searcher = searchers[idx];

            var _token = _searcher.isSingleMatch(queryItem);

            if (_token) {
              results.push(new _searcher(_token, options));
              break;
            }
          }
        }

        return results;
      });
    }

    var MultiMatchSet = new Set([FuzzyMatch.type, ExactMatch.type]);

    var ExtendedSearch = function () {
      function ExtendedSearch(pattern) {
        var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref5$isCaseSensitive = _ref5.isCaseSensitive,
            isCaseSensitive = _ref5$isCaseSensitive === void 0 ? Config.isCaseSensitive : _ref5$isCaseSensitive,
            _ref5$includeMatches = _ref5.includeMatches,
            includeMatches = _ref5$includeMatches === void 0 ? Config.includeMatches : _ref5$includeMatches,
            _ref5$minMatchCharLen = _ref5.minMatchCharLength,
            minMatchCharLength = _ref5$minMatchCharLen === void 0 ? Config.minMatchCharLength : _ref5$minMatchCharLen,
            _ref5$findAllMatches = _ref5.findAllMatches,
            findAllMatches = _ref5$findAllMatches === void 0 ? Config.findAllMatches : _ref5$findAllMatches,
            _ref5$location = _ref5.location,
            location = _ref5$location === void 0 ? Config.location : _ref5$location,
            _ref5$threshold = _ref5.threshold,
            threshold = _ref5$threshold === void 0 ? Config.threshold : _ref5$threshold,
            _ref5$distance = _ref5.distance,
            distance = _ref5$distance === void 0 ? Config.distance : _ref5$distance;

        _classCallCheck(this, ExtendedSearch);

        this.query = null;
        this.options = {
          isCaseSensitive: isCaseSensitive,
          includeMatches: includeMatches,
          minMatchCharLength: minMatchCharLength,
          findAllMatches: findAllMatches,
          location: location,
          threshold: threshold,
          distance: distance
        };
        this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
        this.query = parseQuery(this.pattern, this.options);
      }

      _createClass(ExtendedSearch, [{
        key: "searchIn",
        value: function searchIn(value) {
          var query = this.query;

          if (!query) {
            return {
              isMatch: false,
              score: 1
            };
          }

          var text = value.$;
          var _this$options3 = this.options,
              includeMatches = _this$options3.includeMatches,
              isCaseSensitive = _this$options3.isCaseSensitive;
          text = isCaseSensitive ? text : text.toLowerCase();
          var numMatches = 0;
          var indices = [];
          var totalScore = 0;

          for (var i = 0, qLen = query.length; i < qLen; i += 1) {
            var _searchers = query[i];
            indices.length = 0;
            numMatches = 0;

            for (var j = 0, pLen = _searchers.length; j < pLen; j += 1) {
              var searcher = _searchers[j];

              var _searcher$search = searcher.search(text),
                  isMatch = _searcher$search.isMatch,
                  matchedIndices = _searcher$search.matchedIndices,
                  score = _searcher$search.score;

              if (isMatch) {
                numMatches += 1;
                totalScore += score;

                if (includeMatches) {
                  var type = searcher.constructor.type;

                  if (MultiMatchSet.has(type)) {
                    indices = [].concat(_toConsumableArray(indices), _toConsumableArray(matchedIndices));
                  } else {
                    indices.push(matchedIndices);
                  }
                }
              } else {
                totalScore = 0;
                numMatches = 0;
                indices.length = 0;
                break;
              }
            }

            if (numMatches) {
              var result = {
                isMatch: true,
                score: totalScore / numMatches
              };

              if (includeMatches) {
                result.matchedIndices = indices;
              }

              return result;
            }
          }

          return {
            isMatch: false,
            score: 1
          };
        }
      }], [{
        key: "condition",
        value: function condition(_, options) {
          return options.useExtendedSearch;
        }
      }]);

      return ExtendedSearch;
    }();

    var SPACE = /[^ ]+/g;

    function createIndex(keys, list) {
      var _ref6 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref6$getFn = _ref6.getFn,
          getFn = _ref6$getFn === void 0 ? Config.getFn : _ref6$getFn;

      var indexedList = [];

      if (isString(list[0])) {
        for (var i = 0, len = list.length; i < len; i += 1) {
          var value = list[i];

          if (isDefined(value) && !isBlank(value)) {
            var record = {
              $: value,
              idx: i,
              t: value.match(SPACE).length
            };
            indexedList.push(record);
          }
        }
      } else {
        var keysLen = keys.length;

        for (var _i4 = 0, _len = list.length; _i4 < _len; _i4 += 1) {
          var item = list[_i4];
          var _record = {
            idx: _i4,
            $: {}
          };

          for (var j = 0; j < keysLen; j += 1) {
            var key = keys[j];

            var _value = getFn(item, key);

            if (!isDefined(_value)) {
              continue;
            }

            if (isArray$3(_value)) {
              var subRecords = [];
              var stack = [{
                arrayIndex: -1,
                value: _value
              }];

              while (stack.length) {
                var _stack$pop = stack.pop(),
                    arrayIndex = _stack$pop.arrayIndex,
                    _value2 = _stack$pop.value;

                if (!isDefined(_value2)) {
                  continue;
                }

                if (isString(_value2) && !isBlank(_value2)) {
                  var subRecord = {
                    $: _value2,
                    idx: arrayIndex,
                    t: _value2.match(SPACE).length
                  };
                  subRecords.push(subRecord);
                } else if (isArray$3(_value2)) {
                  for (var k = 0, arrLen = _value2.length; k < arrLen; k += 1) {
                    stack.push({
                      arrayIndex: k,
                      value: _value2[k]
                    });
                  }
                }
              }

              _record.$[key] = subRecords;
            } else if (!isBlank(_value)) {
              var _subRecord = {
                $: _value,
                t: _value.match(SPACE).length
              };
              _record.$[key] = _subRecord;
            }
          }

          indexedList.push(_record);
        }
      }

      return indexedList;
    }

    var KeyStore = function () {
      function KeyStore(keys) {
        _classCallCheck(this, KeyStore);

        this._keys = {};
        this._keyNames = [];
        this._length = keys.length;

        if (keys.length && isString(keys[0])) {
          for (var i = 0; i < this._length; i += 1) {
            var key = keys[i];
            this._keys[key] = {
              weight: 1
            };

            this._keyNames.push(key);
          }
        } else {
          var totalWeight = 0;

          for (var _i5 = 0; _i5 < this._length; _i5 += 1) {
            var _key = keys[_i5];

            if (!Object.prototype.hasOwnProperty.call(_key, 'name')) {
              throw new Error('Missing "name" property in key object');
            }

            var keyName = _key.name;

            this._keyNames.push(keyName);

            if (!Object.prototype.hasOwnProperty.call(_key, 'weight')) {
              throw new Error('Missing "weight" property in key object');
            }

            var weight = _key.weight;

            if (weight <= 0 || weight >= 1) {
              throw new Error('"weight" property in key must be in the range of (0, 1)');
            }

            this._keys[keyName] = {
              weight: weight
            };
            totalWeight += weight;
          }

          for (var _i6 = 0; _i6 < this._length; _i6 += 1) {
            var _keyName = this._keyNames[_i6];
            var keyWeight = this._keys[_keyName].weight;
            this._keys[_keyName].weight = keyWeight / totalWeight;
          }
        }
      }

      _createClass(KeyStore, [{
        key: "get",
        value: function get(key, name) {
          return this._keys[key] ? this._keys[key][name] : -1;
        }
      }, {
        key: "keys",
        value: function keys() {
          return this._keyNames;
        }
      }, {
        key: "count",
        value: function count() {
          return this._length;
        }
      }, {
        key: "toJSON",
        value: function toJSON() {
          return JSON.stringify(this._keys);
        }
      }]);

      return KeyStore;
    }();

    function transformMatches(result, data) {
      var matches = result.matches;
      data.matches = [];

      if (!isDefined(matches)) {
        return;
      }

      for (var i = 0, len = matches.length; i < len; i += 1) {
        var match = matches[i];

        if (!isDefined(match.indices) || match.indices.length === 0) {
          continue;
        }

        var obj = {
          indices: match.indices,
          value: match.value
        };

        if (match.key) {
          obj.key = match.key;
        }

        if (match.idx > -1) {
          obj.refIndex = match.idx;
        }

        data.matches.push(obj);
      }
    }

    function transformScore(result, data) {
      data.score = result.score;
    }

    var registeredSearchers = [];

    function register() {
      registeredSearchers.push.apply(registeredSearchers, arguments);
    }

    var Fuse = function () {
      function Fuse(list) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        _classCallCheck(this, Fuse);

        this.options = _objectSpread$4(_objectSpread$4({}, Config), options);

        this._processKeys(this.options.keys);

        this.setCollection(list, index);
      }

      _createClass(Fuse, [{
        key: "setCollection",
        value: function setCollection(list) {
          var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          this.list = list;
          this.listIsStringArray = isString(list[0]);

          if (index) {
            this.setIndex(index);
          } else {
            this.setIndex(this._createIndex());
          }
        }
      }, {
        key: "setIndex",
        value: function setIndex(listIndex) {
          this._indexedList = listIndex;
        }
      }, {
        key: "_processKeys",
        value: function _processKeys(keys) {
          this._keyStore = new KeyStore(keys);
        }
      }, {
        key: "_createIndex",
        value: function _createIndex() {
          return createIndex(this._keyStore.keys(), this.list, {
            getFn: this.options.getFn
          });
        }
      }, {
        key: "search",
        value: function search(pattern) {
          var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
            limit: false
          };
          pattern = pattern.trim();

          if (!pattern.length) {
            return [];
          }

          var shouldSort = this.options.shouldSort;
          var searcher = null;

          for (var i = 0, len = registeredSearchers.length; i < len; i += 1) {
            var searcherClass = registeredSearchers[i];

            if (searcherClass.condition(pattern, this.options)) {
              searcher = new searcherClass(pattern, this.options);
              break;
            }
          }

          if (!searcher) {
            searcher = new BitapSearch(pattern, this.options);
          }

          var results = this._searchUsing(searcher);

          this._computeScore(results);

          if (shouldSort) {
            this._sort(results);
          }

          if (opts.limit && isNumber(opts.limit)) {
            results = results.slice(0, opts.limit);
          }

          return this._format(results);
        }
      }, {
        key: "_searchUsing",
        value: function _searchUsing(searcher) {
          var list = this._indexedList;
          var results = [];
          var includeMatches = this.options.includeMatches;

          if (this.listIsStringArray) {
            for (var i = 0, len = list.length; i < len; i += 1) {
              var value = list[i];
              var text = value.$,
                  idx = value.idx,
                  t = value.t;

              if (!isDefined(text)) {
                continue;
              }

              var searchResult = searcher.searchIn(value);
              var isMatch = searchResult.isMatch,
                  score = searchResult.score;

              if (!isMatch) {
                continue;
              }

              var match = {
                score: score,
                value: text,
                t: t
              };

              if (includeMatches) {
                match.indices = searchResult.matchedIndices;
              }

              results.push({
                item: text,
                idx: idx,
                matches: [match]
              });
            }
          } else {
            var keyNames = this._keyStore.keys();

            var keysLen = this._keyStore.count();

            for (var _i7 = 0, _len2 = list.length; _i7 < _len2; _i7 += 1) {
              var _list$_i = list[_i7],
                  item = _list$_i.$,
                  _idx = _list$_i.idx;

              if (!isDefined(item)) {
                continue;
              }

              var matches = [];

              for (var j = 0; j < keysLen; j += 1) {
                var key = keyNames[j];
                var _value3 = item[key];

                if (!isDefined(_value3)) {
                  continue;
                }

                if (isArray$3(_value3)) {
                  for (var k = 0, _len3 = _value3.length; k < _len3; k += 1) {
                    var arrItem = _value3[k];
                    var _text = arrItem.$,
                        _idx2 = arrItem.idx,
                        _t = arrItem.t;

                    if (!isDefined(_text)) {
                      continue;
                    }

                    var _searchResult = searcher.searchIn(arrItem);

                    var _isMatch = _searchResult.isMatch,
                        _score3 = _searchResult.score;

                    if (!_isMatch) {
                      continue;
                    }

                    var _match = {
                      score: _score3,
                      key: key,
                      value: _text,
                      idx: _idx2,
                      t: _t
                    };

                    if (includeMatches) {
                      _match.indices = _searchResult.matchedIndices;
                    }

                    matches.push(_match);
                  }
                } else {
                  var _text2 = _value3.$,
                      _t2 = _value3.t;

                  var _searchResult2 = searcher.searchIn(_value3);

                  var _isMatch2 = _searchResult2.isMatch,
                      _score4 = _searchResult2.score;

                  if (!_isMatch2) {
                    continue;
                  }

                  var _match2 = {
                    score: _score4,
                    key: key,
                    value: _text2,
                    t: _t2
                  };

                  if (includeMatches) {
                    _match2.indices = _searchResult2.matchedIndices;
                  }

                  matches.push(_match2);
                }
              }

              if (matches.length) {
                results.push({
                  idx: _idx,
                  item: item,
                  matches: matches
                });
              }
            }
          }

          return results;
        }
      }, {
        key: "_computeScore",
        value: function _computeScore(results) {
          var resultsLen = results.length;

          for (var i = 0; i < resultsLen; i += 1) {
            var result = results[i];
            var matches = result.matches;
            var numMatches = matches.length;
            var totalScore = 1;

            for (var j = 0; j < numMatches; j += 1) {
              var match = matches[j];
              var key = match.key,
                  t = match.t;

              var keyWeight = this._keyStore.get(key, 'weight');

              var weight = keyWeight > -1 ? keyWeight : 1;
              var score = match.score === 0 && keyWeight > -1 ? Number.EPSILON : match.score;
              var norm = 1 / Math.sqrt(t);
              totalScore *= Math.pow(score, weight * norm);
            }

            result.score = totalScore;
          }
        }
      }, {
        key: "_sort",
        value: function _sort(results) {
          results.sort(this.options.sortFn);
        }
      }, {
        key: "_format",
        value: function _format(results) {
          var finalOutput = [];
          var _this$options4 = this.options,
              includeMatches = _this$options4.includeMatches,
              includeScore = _this$options4.includeScore;
          var transformers = [];
          if (includeMatches) transformers.push(transformMatches);
          if (includeScore) transformers.push(transformScore);

          for (var i = 0, len = results.length; i < len; i += 1) {
            var result = results[i];
            var idx = result.idx;
            var data = {
              item: this.list[idx],
              refIndex: idx
            };

            if (transformers.length) {
              for (var j = 0, _len4 = transformers.length; j < _len4; j += 1) {
                transformers[j](result, data);
              }
            }

            finalOutput.push(data);
          }

          return finalOutput;
        }
      }]);

      return Fuse;
    }();

    register(ExtendedSearch);
    Fuse.version = '5.2.3';
    Fuse.createIndex = createIndex;
    Fuse.config = Config;

    function keyEventHandler(event, options) {
      var key = processKeyCode(event);
      return {
        on: function on(eventKeys) {
          if (eventKeys[key]) {
            if (options !== null && options !== void 0 && options.preventDefault) event.preventDefault();
            if (options !== null && options !== void 0 && options.stopPropagation) event.stopPropagation();
            if (options !== null && options !== void 0 && options.onlyCurrentTarget && event.target !== event.currentTarget) return;
            eventKeys[key](event);
          } else if (eventKeys["Default"]) {
            if (options !== null && options !== void 0 && options.preventDefault) event.preventDefault();
            if (options !== null && options !== void 0 && options.stopPropagation) event.stopPropagation();
            if (options !== null && options !== void 0 && options.onlyCurrentTarget && event.target !== event.currentTarget) return;
            eventKeys["Default"](event);
          }
        }
      };
    }

    function processKeyCode(event) {
      var isShift = event.shiftKey;
      var initKey = event.key;

      switch (event.keyCode) {
        case 32:
          initKey = "Space";
          break;
      }

      var key = isShift ? "Shift" + initKey : initKey;
      return key;
    }

    var _templateObject$1, _templateObject2, _templateObject3;

    function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

    var singleOptions = function () {
      function singleOptions(_ref) {
        var _this = this;

        var target = _ref.target,
            store = _ref.store,
            selectRef = _ref.selectRef,
            enableFilter = _ref.enableFilter;

        _classCallCheck(this, singleOptions);

        this.isTabable$ = void 0;
        this.container = void 0;
        this.target = void 0;
        this.selectRef = void 0;
        this.dropdownStore = void 0;
        this.enableFilter = void 0;
        this.optionsStore = void 0;
        this.fuse = void 0;
        this.target = target;
        this.dropdownStore = store;
        this.optionsStore = create$1(function () {
          return {
            filteredOptions: _this.dropdownStore.getState().options
          };
        });
        this.selectRef = selectRef;
        this.enableFilter = enableFilter;

        this._addTheEventListeners();
      }

      _createClass(singleOptions, [{
        key: "destroy",
        value: function destroy() {
          this.container.remove();
        }
      }, {
        key: "optionsToRender",
        get: function get() {
          return this.optionsStore.getState().filteredOptions;
        }
      }, {
        key: "_addTheEventListeners",
        value: function _addTheEventListeners() {
          var _this2 = this;

          this._initFuse(this.optionsToRender);

          this.render();
          fromEvent(this.target, "mousedown").pipe(sample(fromEvent(this.target, "click")), filter(function (e) {
            return e.target.tagName !== "INPUT";
          }), pluck("target"), map(function (target) {
            var _ref2 = target,
                _ref2$dataset = _ref2.dataset,
                index = _ref2$dataset.index,
                label = _ref2$dataset.label,
                value = _ref2$dataset.value;
            return {
              label: label,
              value: value,
              index: index
            };
          })).subscribe(function (selected) {
            _this2.dropdownStore.setState({
              selected: selected
            });
          });
          this.dropdownStore.subscribe(function (options) {
            _this2._initFuse(options);

            _this2.optionsStore.setState({
              filteredOptions: options
            });

            _this2.render();
          }, function (state) {
            return state.options;
          });
          this.dropdownStore.subscribe(function (isOpen) {
            if (isOpen) {
              _this2.focusSelected();
            }
          }, function (state) {
            return state.isOpen;
          });
          this.optionsStore.subscribe(function () {
            _this2.render();
          });
        }
      }, {
        key: "_initFuse",
        value: function _initFuse(options) {
          this.fuse = new Fuse(options, {
            keys: ["label", "value"]
          });
        }
      }, {
        key: "handleChange",
        value: function handleChange(opt) {
          this.dropdownStore.setState({
            selected: opt
          });
        }
      }, {
        key: "closeDropdown",
        value: function closeDropdown() {
          var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
            changeFocus: true
          },
              changeFocus = _ref3.changeFocus;

          this.dropdownStore.setState({
            isOpen: false
          });
        }
      }, {
        key: "focusSelected",
        value: function focusSelected() {
          var selectedOption = this.target.querySelector('li[data-selected="true"]') || this.target.querySelector("li");
          selectedOption.focus();
          this.container.querySelector("ul").scrollTop = selectedOption.offsetTop - 40;
        }
      }, {
        key: "_setFilteredOptions",
        value: function _setFilteredOptions(newOptions) {
          this.optionsStore.setState({
            filteredOptions: newOptions
          });
        }
      }, {
        key: "_moveFocusUp",
        value: function _moveFocusUp(optionKey) {
          var onFirstOption = optionKey === 0;
          var prevKey = optionKey - 1;
          var prevOption = this.target.querySelector("li[data-key=\"".concat(prevKey, "\"]"));

          if (onFirstOption && !this.enableFilter) {
            this.closeDropdown();
          } else if (onFirstOption) {
            this.filter.focus();
          } else {
            prevOption === null || prevOption === void 0 ? void 0 : prevOption.focus();
          }
        }
      }, {
        key: "_moveFocusDown",
        value: function _moveFocusDown(optionKey) {
          var onLastOption = optionKey === this.container.querySelector("ul").childElementCount;
          var nextKey = optionKey + 1;
          var nextOption = this.target.querySelector("li[data-key=\"".concat(nextKey, "\"]"));
          if (onLastOption) return;
          nextOption === null || nextOption === void 0 ? void 0 : nextOption.focus();
        }
      }, {
        key: "handleOptionKeyEvents",
        value: function handleOptionKeyEvents(_ref4) {
          var _this3 = this;

          var event = _ref4.event,
              key = _ref4.key,
              option = _ref4.option;

          if (event.key === "Tab" && !event.shiftKey) {
            this.closeDropdown({
              changeFocus: false
            });
          }

          keyEventHandler(event, {
            preventDefault: true
          }).on({
            ArrowDown: function ArrowDown() {
              _this3._moveFocusDown(key);
            },
            ArrowUp: function ArrowUp() {
              _this3._moveFocusUp(key);
            },
            ShiftTab: function ShiftTab() {
              if (_this3.enableFilter) {
                _this3.filter.focus();
              } else {
                _this3.closeDropdown();
              }
            },
            Space: function Space() {
              _this3.handleChange(option);
            },
            Enter: function Enter() {
              _this3.handleChange(option);
            },
            Escape: function Escape() {
              _this3.closeDropdown();
            },
            Backspace: function Backspace(e) {
              e.stopPropagation();
              var curValue = _this3.filter.input.value;
              _this3.filter.input.value = curValue.substring(0, curValue.length - 1);

              _this3.filter.input.focus();
            },
            Default: function Default(e) {
              if (e.key.length > 1) return;
              e.stopPropagation();
              _this3.filter.input.value = _this3.filter.input.value + e.key;

              _this3.filter.focus();
            }
          });
        }
      }, {
        key: "render",
        value: function render$1() {
          var _this4 = this;

          this.container = render(this.target, html$1(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral(["\n                ", "\n                <ul>\n                    ", "\n                </ul>\n            "])), this.enableFilter ? this.renderInput() : null, this.optionsToRender.filter(function (option) {
            return !option.hidden;
          }).map(function (option, index) {
            var hidden = option.hidden,
                restOptions = _objectWithoutProperties(option, ["hidden"]);

            var key = _this4.dropdownStore.getState().placeholder ? index + 1 : index;
            return html$1.for(option)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n              <li\n                tabindex=\"-1\"\n                onKeyDown=", "\n                class=", "\n                data=", "\n              >\n                ", "\n              </li>\n            "])), function (event) {
              return _this4.handleOptionKeyEvents({
                event: event,
                key: key,
                option: option
              });
            }, "single-option".concat(option.hidden ? " hidden" : ""), _objectSpread$5(_objectSpread$5(_objectSpread$5({}, restOptions), option.hidden && {
              hidden: true
            }), {}, {
              key: key,
              selected: _this4.selectRef.selectedIndex === option.index
            }), option.label);
          })));
        }
      }, {
        key: "isOpen",
        get: function get() {
          return this.dropdownStore.getState().isOpen;
        }
      }, {
        key: "renderInput",
        value: function renderInput() {
          var _this5 = this;

          return html$1(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n            <input\n                class=\"dk-dropdown__filter-input\"\n                tabindex=", "\n                oninput=", "\n                onKeyDown=", "\n                placeholder=", "\n            />\n        "])), this.isOpen ? "0" : "-1", function (e) {
            var query = e.target.value;

            _this5._setFilteredOptions(query.length == 0 ? _this5.dropdownStore.getState().options : _this5.fuse.search(query).map(function (result) {
              return result.item;
            }));
          }, function (e) {
            if (e.code === "ArrowDown") {
              var _this5$container$quer;

              e.preventDefault();
              var hasQuery = _this5.filter.input.value.length > 0;
              (_this5$container$quer = _this5.container.querySelector(hasQuery ? "li" : 'li[data-selected="true"')) === null || _this5$container$quer === void 0 ? void 0 : _this5$container$quer.focus();
              return;
            } else if (e.code === "ArrowUp" || e.code === "Escape" || e.code === "Tab" && e.shiftKey) {
              _this5.closeDropdown();
            } else if (e.code === "Tab") {
              e.preventDefault();

              _this5.focusSelected();
            }

            if (!_this5.optionsToRender[0] || e.code !== "Enter") return;

            _this5.handleChange(_this5.optionsToRender[0]);
          }, this.dropdownStore.getState().filterPlaceholder);
        }
      }, {
        key: "filter",
        get: function get() {
          var input = this.container.querySelector("input");
          var self = this;
          return {
            input: input,
            focus: function focus() {
              this.input.focus();
            },
            clear: function clear() {
              if (this.input && this.input.value.length > 0) {
                self._setFilteredOptions(self.dropdownStore.getState().options);

                this.input.value = "";
              }
            }
          };
        }
      }]);

      return singleOptions;
    }();

    var _templateObject$2;

    function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

    function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

    var Dropdown = function (_AbstractCustomSelect) {
      _inherits(Dropdown, _AbstractCustomSelect);

      var _super = _createSuper$2(Dropdown);

      function Dropdown(dropdown, settings) {
        var _this;

        _classCallCheck(this, Dropdown);

        _this = _super.call(this, dropdown, settings);
        _this.selected = void 0;
        _this.lastFocusedElm = void 0;
        _this.popperInstance = void 0;
        _this.options = void 0;
        _this.defaultPlaceholder = "Make Selection...";

        if (_this.optionRefs.length >= 13) {
          _this.settings.filter = true;
        }

        if (_this.hasError) return _possibleConstructorReturn(_this);

        _this._init();

        return _this;
      }

      _createClass(Dropdown, [{
        key: "_init",
        value: function _init() {
          var _this2 = this;

          this._initOptions();

          this._renderSelected();

          this._addEventListeners();

          this._startSync();

          this._attachPublicMethods();

          this.popperInstance = new Popper(this.container, this.optionsContainer, {
            modifiers: {
              flip: {
                enabled: false
              }
            }
          });
          var icon = document.createElement("div");
          icon.classList.add("dk-dropdown__icon");
          this.container.appendChild(icon);
          this.store.subscribe(function () {
            return _this2.updateOptionsWidth();
          }, function (state) {
            return state.options;
          });
        }
      }, {
        key: "_initOptions",
        value: function _initOptions() {
          var _this3 = this;

          this.options = new singleOptions({
            target: this.optionsContainer,
            store: this.store,
            selectRef: this.selectRef,
            enableFilter: this.settings.filter
          });
          this.store.subscribe(function (newVal) {
            var selected = newVal;
            var index = selected.index;

            _this3._renderSelected(selected);

            _this3.selectRef.selectedIndex = typeof index === "string" ? parseInt(index) : index;

            _this3.options.render();

            _this3.fireChangeEvent();

            if (_this3.store.getState().isOpen) {
              _this3.toggleOpen();
            }
          }, function (state) {
            return state.selected;
          });

          if (window.inStorybook) {
            document.querySelector("#root").insertAdjacentElement("beforeend", this.optionsContainer);
          } else {
            document.body.appendChild(this.optionsContainer);
          }
        }
      }, {
        key: "_attachPublicMethods",
        value: function _attachPublicMethods() {
          this.selectRef.dkDropdown = this.publicMethods;
        }
      }, {
        key: "hide",
        value: function hide() {
          this.setState({
            isOpen: false
          });
        }
      }, {
        key: "show",
        value: function show() {
          this.setState({
            isOpen: true
          });
        }
      }, {
        key: "toggleOpen",
        value: function toggleOpen() {
          if (this.isOpen) {
            this.hide();
          } else {
            this.show();
          }
        }
      }, {
        key: "updateOptionsWidth",
        value: function updateOptionsWidth() {
          var _this$popperInstance;

          this.optionsContainer.offsetHeight;
          var conWidth = this.container.getBoundingClientRect().width;
          var optionsWidth = this.optionsContainer.getBoundingClientRect().width;

          if (conWidth !== optionsWidth) {
            this.optionsContainer.style.width = Math.round(conWidth) - 1 + "px";
          }

          this.optionsContainer.offsetHeight;
          (_this$popperInstance = this.popperInstance) === null || _this$popperInstance === void 0 ? void 0 : _this$popperInstance.update();
        }
      }, {
        key: "publicMethods",
        get: function get() {
          var _this4 = this;

          var self = this;
          return {
            setInlineWidth: function setInlineWidth(value) {
              return self.setInlineWidth(value);
            },
            destroy: function destroy() {
              _this4.store.destroy();

              _this4.selectOnChange$.complete();

              delete _this4.selectRef["dkDropdown"];

              _this4.options.destroy();

              _this4.container.remove();
            },
            reset: function reset() {
              _this4.publicMethods.destroy();

              _this4.initBaseClass();

              _this4._init();
            }
          };
        }
      }, {
        key: "isOpen",
        get: function get() {
          return this.store.getState().isOpen;
        }
      }, {
        key: "eventHandlers",
        get: function get() {
          var _this5 = this;

          return {
            docMouseDown: function docMouseDown(e) {
              var target = e.target;
              if (!_this5.isOpen) return;

              if (!(_this5.container.contains(target) || _this5.optionsContainer.contains(target))) {
                _this5._setState({
                  isOpen: false,
                  noFocusChange: true
                });

                _this5._setState({
                  noFocusChange: false
                });
              }
            },
            container: {
              keydown: function keydown(e) {
                keyEventHandler(e, {
                  preventDefault: true
                }).on({
                  Space: function Space() {
                    _this5.toggleOpen();
                  },
                  Enter: function Enter() {
                    _this5.toggleOpen();
                  },
                  ArrowDown: function ArrowDown() {
                    _this5.toggleOpen();
                  },
                  ArrowUp: function ArrowUp() {
                    _this5.toggleOpen();
                  }
                });
              },
              click: function click(e) {
                e.preventDefault();

                _this5.toggleOpen();
              }
            }
          };
        }
      }, {
        key: "_addEventListeners",
        value: function _addEventListeners() {
          this._subscribeToOpenState();

          this.container.addEventListener("keydown", this.eventHandlers.container.keydown);
          this.container.addEventListener("click", this.eventHandlers.container.click);
          document.addEventListener("click", this.eventHandlers.docMouseDown);
        }
      }, {
        key: "_subscribeToOpenState",
        value: function _subscribeToOpenState() {
          var _this6 = this;

          this.store.subscribe(function () {
            var _this6$store$getState = _this6.store.getState(),
                isOpen = _this6$store$getState.isOpen,
                noFocusChange = _this6$store$getState.noFocusChange;

            if (isOpen) {
              _this6.updateOptionsWidth();
            } else {
              _this6.container.focus();
            }

            _this6.optionsContainer.setAttribute("data-dropdown-open", isOpen.toString());

            _this6.container.setAttribute("data-dropdown-open", isOpen.toString());

            if (_this6.settings.filter && isOpen && noFocusChange) ; else if (_this6.settings.filter && !isOpen) {
              _this6.options.filter.clear();
            }
          }, function (state) {
            return state.isOpen;
          });
        }
      }, {
        key: "_render",
        value: function _render() {
          this._renderSelected();
        }
      }, {
        key: "_renderSelected",
        value: function _renderSelected(selectedOption) {
          var _ref = selectedOption || this.store.getState().options[this.selectRef.selectedIndex],
              value = _ref.value,
              label = _ref.label,
              index = _ref.index;

          this.selected = render(this.container, html$1(_templateObject$2 || (_templateObject$2 = _taggedTemplateLiteral(["\n                <button\n                    tabindex=\"-1\"\n                    class=\"dk-dropdown__selected\"\n                    data=", "\n                >\n                    <span title=", ">", "</span>\n                </button>\n            "])), {
            index: index,
            value: value
          }, label, label));
        }
      }, {
        key: "_setState",
        value: function _setState(toUpdate) {
          this.store.setState(toUpdate);
        }
      }, {
        key: "_startSync",
        value: function _startSync() {
          var _this7 = this;

          this.selectOnChange$.pipe(map(function (e) {
            var selectElm = e.target;

            var option = _this7.parseOptionElm(selectElm.options[selectElm.selectedIndex], selectElm.selectedIndex);

            return option;
          })).subscribe(function (selectedOption) {
            _this7.setState({
              selected: selectedOption
            });
          });
        }
      }]);

      return Dropdown;
    }(AbstractCustomSelect);

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function _iterableToArrayLimit(arr, i) {
      if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }

    var nativeIsFrozen = Object.isFrozen;
    var FAILS_ON_PRIMITIVES$4 = fails(function () { nativeIsFrozen(1); });

    // `Object.isFrozen` method
    // https://tc39.es/ecma262/#sec-object.isfrozen
    _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$4 }, {
      isFrozen: function isFrozen(it) {
        return isObject(it) ? nativeIsFrozen ? nativeIsFrozen(it) : false : true;
      }
    });

    // `Reflect.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-reflect.getownpropertydescriptor
    _export({ target: 'Reflect', stat: true, sham: !descriptors }, {
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
        return objectGetOwnPropertyDescriptor.f(anObject(target), propertyKey);
      }
    });

    // `Reflect.ownKeys` method
    // https://tc39.es/ecma262/#sec-reflect.ownkeys
    _export({ target: 'Reflect', stat: true }, {
      ownKeys: ownKeys
    });

    var nativeGetOwnPropertyNames$2 = objectGetOwnPropertyNamesExternal.f;

    var FAILS_ON_PRIMITIVES$5 = fails(function () { return !Object.getOwnPropertyNames(1); });

    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$5 }, {
      getOwnPropertyNames: nativeGetOwnPropertyNames$2
    });

    function n(n) {
      for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; e < t; e++) {
        r[e - 1] = arguments[e];
      }

      throw Error("[Immer] minified error nr: " + n + (r.length ? " " + r.join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
    }

    function t(n) {
      return !!n && !!n[G];
    }

    function r(n) {
      return !!n && (function (n) {
        if (!n || "object" != _typeof$1(n)) return !1;
        var t = Object.getPrototypeOf(n);
        return !t || t === Object.prototype;
      }(n) || Array.isArray(n) || !!n[B] || !!n.constructor[B] || c(n) || s(n));
    }

    function i(n, t, r) {
      void 0 === r && (r = !1), 0 === o(n) ? (r ? Object.keys : Q)(n).forEach(function (r) {
        return t(r, n[r], n);
      }) : n.forEach(function (r, e) {
        return t(e, r, n);
      });
    }

    function o(n) {
      var t = n[G];
      return t ? t.i > 3 ? t.i - 4 : t.i : Array.isArray(n) ? 1 : c(n) ? 2 : s(n) ? 3 : 0;
    }

    function u(n, t) {
      return 2 === o(n) ? n.has(t) : Object.prototype.hasOwnProperty.call(n, t);
    }

    function a(n, t) {
      return 2 === o(n) ? n.get(t) : n[t];
    }

    function f$8(n, t) {
      return n === t ? 0 !== n || 1 / n == 1 / t : n != n && t != t;
    }

    function c(n) {
      return U && n instanceof Map;
    }

    function s(n) {
      return W && n instanceof Set;
    }

    function v(n) {
      return n.o || n.t;
    }

    function p(t, r) {
      if (void 0 === r && (r = !1), Array.isArray(t)) return t.slice();
      var e = Object.create(Object.getPrototypeOf(t));
      return i(t, function (i) {
        if (i !== G) {
          var o = Object.getOwnPropertyDescriptor(t, i),
              u = o.value;
          o.get && (r || n(1), u = o.get.call(t)), o.enumerable ? e[i] = u : Object.defineProperty(e, i, {
            value: u,
            writable: !0,
            configurable: !0
          });
        }
      }), e;
    }

    function d(n, e) {
      t(n) || h(n) || !r(n) || (o(n) > 1 && (n.set = n.add = n.clear = n["delete"] = l), Object.freeze(n), e && i(n, function (n, t) {
        return d(t, !0);
      }, !0));
    }

    function l() {
      n(2);
    }

    function h(n) {
      return null == n || "object" != _typeof$1(n) || Object.isFrozen(n);
    }

    function y(t) {
      var r = V[t];
      return r || n( 19, t), r;
    }

    function m() {
      return K;
    }

    function _(n, t) {
      t && (y("Patches"), n.u = [], n.s = [], n.v = t);
    }

    function j$1(n) {
      O(n), n.p.forEach(w), n.p = null;
    }

    function O(n) {
      n === K && (K = n.l);
    }

    function g(n) {
      return K = {
        p: [],
        l: K,
        h: n,
        m: !0,
        _: 0
      };
    }

    function w(n) {
      var t = n[G];
      0 === t.i || 1 === t.i ? t.j() : t.O = !0;
    }

    function S(t, e) {
      e._ = e.p.length;
      var i = e.p[0],
          o = void 0 !== t && t !== i;
      return e.h.g || y("ES5").S(e, t, o), o ? (i[G].P && (j$1(e), n(4)), r(t) && (t = P(e, t), e.l || A(e, t)), e.u && y("Patches").M(i[G], t, e.u, e.s)) : t = P(e, i, []), j$1(e), e.u && e.v(e.u, e.s), t !== q ? t : void 0;
    }

    function P(n, t, r) {
      if (h(t)) return t;
      var e = t[G];
      if (!e) return i(t, function (i, o) {
        return M(n, e, t, i, o, r);
      }, !0), t;
      if (e.A !== n) return t;
      if (!e.P) return A(n, e.t, !0), e.t;

      if (!e.I) {
        e.I = !0, e.A._--;
        var o = 4 === e.i || 5 === e.i ? e.o = p(e.k, !0) : e.o;
        i(o, function (t, i) {
          return M(n, e, o, t, i, r);
        }), A(n, o, !1), r && n.u && y("Patches").R(e, r, n.u, n.s);
      }

      return e.o;
    }

    function M(e, i, c, s, v, p) {
      if (t(v)) {
        var d = P(e, v, p && i && 3 !== i.i && !u(i.D, s) ? p.concat(s) : void 0);
        if (h = s, y = d, 2 === (b = o(l = c)) ? l.set(h, y) : 3 === b ? (l["delete"](h), l.add(y)) : l[h] = y, !t(d)) return;
        e.m = !1;
      }

      var l, h, y, b;

      if ((!i || !f$8(v, a(i.t, s))) && r(v)) {
        if (!e.h.N && e._ < 1) return;
        P(e, v), i && i.A.l || A(e, v);
      }
    }

    function A(n, t, r) {
      void 0 === r && (r = !1), n.h.N && n.m && d(t, r);
    }

    function x(n, t) {
      var r = n[G],
          e = Reflect.getOwnPropertyDescriptor(r ? v(r) : n, t);
      return e && e.value;
    }

    function z(n) {
      if (!n.P) {
        if (n.P = !0, 0 === n.i || 1 === n.i) {
          var t = n.o = p(n.t);
          i(n.p, function (n, r) {
            t[n] = r;
          }), n.p = void 0;
        }

        n.l && z(n.l);
      }
    }

    function I(n) {
      n.o || (n.o = p(n.t));
    }

    function E(n, t, r) {
      var e = c(t) ? y("MapSet").T(t, r) : s(t) ? y("MapSet").F(t, r) : n.g ? function (n, t) {
        var r = Array.isArray(n),
            e = {
          i: r ? 1 : 0,
          A: t ? t.A : m(),
          P: !1,
          I: !1,
          D: {},
          l: t,
          t: n,
          k: null,
          p: {},
          o: null,
          j: null,
          C: !1
        },
            i = e,
            o = Y;
        r && (i = [e], o = Z);
        var u = Proxy.revocable(i, o),
            a = u.revoke,
            f = u.proxy;
        return e.k = f, e.j = a, f;
      }(t, r) : y("ES5").J(t, r);
      return (r ? r.A : m()).p.push(e), e;
    }

    var J,
        K,
        $ = "undefined" != typeof Symbol && "symbol" == _typeof$1(Symbol("x")),
        U = "undefined" != typeof Map,
        W = "undefined" != typeof Set,
        X = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect,
        q = $ ? Symbol("immer-nothing") : ((J = {})["immer-nothing"] = !0, J),
        B = $ ? Symbol("immer-draftable") : "__$immer_draftable",
        G = $ ? Symbol("immer-state") : "__$immer_state",
        Q = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function (n) {
      return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n));
    } : Object.getOwnPropertyNames,
        V = {},
        Y = {
      get: function get(n, t) {
        if (t === G) return n;
        var e = n.p;
        if (!n.P && u(e, t)) return e[t];
        var i = v(n)[t];
        if (n.I || !r(i)) return i;

        if (n.P) {
          if (i !== x(n.t, t)) return i;
          e = n.o;
        }

        return e[t] = E(n.A.h, i, n);
      },
      has: function has(n, t) {
        return t in v(n);
      },
      ownKeys: function ownKeys(n) {
        return Reflect.ownKeys(v(n));
      },
      set: function set(n, t, r) {
        if (!n.P) {
          var e = x(n.t, t);
          if (r ? f$8(e, r) || r === n.p[t] : f$8(e, r) && t in n.t) return !0;
          I(n), z(n);
        }

        return n.D[t] = !0, n.o[t] = r, !0;
      },
      deleteProperty: function deleteProperty(n, t) {
        return void 0 !== x(n.t, t) || t in n.t ? (n.D[t] = !1, I(n), z(n)) : n.D[t] && delete n.D[t], n.o && delete n.o[t], !0;
      },
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(n, t) {
        var r = v(n),
            e = Reflect.getOwnPropertyDescriptor(r, t);
        return e && (e.writable = !0, e.configurable = 1 !== n.i || "length" !== t), e;
      },
      defineProperty: function defineProperty() {
        n(11);
      },
      getPrototypeOf: function getPrototypeOf(n) {
        return Object.getPrototypeOf(n.t);
      },
      setPrototypeOf: function setPrototypeOf() {
        n(12);
      }
    },
        Z = {};

    i(Y, function (n, t) {
      Z[n] = function () {
        return arguments[0] = arguments[0][0], t.apply(this, arguments);
      };
    }), Z.deleteProperty = function (t, r) {
      return Y.deleteProperty.call(this, t[0], r);
    }, Z.set = function (t, r, e) {
      return Y.set.call(this, t[0], r, e, t[0]);
    };

    var nn = function () {
      function e(n) {
        this.g = X, this.N = "production" !== "production", "boolean" == typeof (null == n ? void 0 : n.useProxies) && this.setUseProxies(n.useProxies), "boolean" == typeof (null == n ? void 0 : n.autoFreeze) && this.setAutoFreeze(n.autoFreeze), this.produce = this.produce.bind(this), this.produceWithPatches = this.produceWithPatches.bind(this);
      }

      var i = e.prototype;
      return i.produce = function (t, e, i) {
        if ("function" == typeof t && "function" != typeof e) {
          var o = e;
          e = t;
          var u = this;
          return function (n) {
            var t = this;
            void 0 === n && (n = o);

            for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) {
              i[a - 1] = arguments[a];
            }

            return u.produce(n, function (n) {
              var r;
              return (r = e).call.apply(r, [t, n].concat(i));
            });
          };
        }

        var a;

        if ("function" != typeof e && n(6), void 0 !== i && "function" != typeof i && n(7), r(t)) {
          var f = g(this),
              c = E(this, t, void 0),
              s = !0;

          try {
            a = e(c), s = !1;
          } finally {
            s ? j$1(f) : O(f);
          }

          return "undefined" != typeof Promise && a instanceof Promise ? a.then(function (n) {
            return _(f, i), S(n, f);
          }, function (n) {
            throw j$1(f), n;
          }) : (_(f, i), S(a, f));
        }

        if ((a = e(t)) !== q) return void 0 === a && (a = t), this.N && d(a, !0), a;
      }, i.produceWithPatches = function (n, t) {
        var r,
            e,
            i = this;
        return "function" == typeof n ? function (t) {
          for (var r = arguments.length, e = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) {
            e[o - 1] = arguments[o];
          }

          return i.produceWithPatches(t, function (t) {
            return n.apply(void 0, [t].concat(e));
          });
        } : [this.produce(n, t, function (n, t) {
          r = n, e = t;
        }), r, e];
      }, i.createDraft = function (t) {
        r(t) || n(8);
        var e = g(this),
            i = E(this, t, void 0);
        return i[G].C = !0, O(e), i;
      }, i.finishDraft = function (t, r) {
        var e = t && t[G];
        var i = e.A;
        return _(i, r), S(void 0, i);
      }, i.setAutoFreeze = function (n) {
        this.N = n;
      }, i.setUseProxies = function (t) {
        X || n(20), this.g = t;
      }, i.applyPatches = function (n, r) {
        var e;

        for (e = r.length - 1; e >= 0; e--) {
          var i = r[e];

          if (0 === i.path.length && "replace" === i.op) {
            n = i.value;
            break;
          }
        }

        var o = y("Patches").U;
        return t(n) ? o(n, r) : this.produce(n, function (n) {
          return o(n, r.slice(e + 1));
        });
      }, e;
    }(),
        tn = new nn(),
        rn = tn.produce,
        en = tn.produceWithPatches.bind(tn),
        on = tn.setAutoFreeze.bind(tn),
        un = tn.setUseProxies.bind(tn),
        an = tn.applyPatches.bind(tn),
        fn = tn.createDraft.bind(tn),
        cn = tn.finishDraft.bind(tn);

    var _templateObject$3, _templateObject2$1;

    function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$7(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

    var multiOptions = function () {
      function multiOptions(parent) {
        var _this = this;

        _classCallCheck(this, multiOptions);

        this.optionsContainer = void 0;
        this.parent = void 0;
        this.mouseMoving = false;
        this.settings = void 0;
        this.lastChecked = void 0;
        this.onChange$ = void 0;
        this.firstClicked = {};
        this.updatedBoxes = [];
        var defaultSettings = {
          drag: true,
          shift: true
        };
        this.parent = parent;
        this.settings = _objectSpread$6(_objectSpread$6({}, this.parent.settings), defaultSettings);
        this.optionsContainer = this.parent.optionsContainer;
        this.parent.optionsContainer.classList.add("dk-dropdown__options--multi");
        this.optionsContainer.setAttribute("tabindex", "0");
        this.init();
        this.parent.store.subscribe(function (val) {
          return _this.render(val);
        }, function (state) {
          return state.options;
        });
        this.render();
      }

      _createClass(multiOptions, [{
        key: "render",
        value: function render$1(options) {
          var _this2 = this;

          render(this.optionsContainer, html$1(_templateObject$3 || (_templateObject$3 = _taggedTemplateLiteral(["\n        <ul>\n          ", "\n        </ul>\n      "])), this.state.map(function (option) {
            var label = option.label,
                value = option.value,
                selected = option.selected,
                key = option.index;

            var id = _this2.parent.settings.id.toString();

            return html$1.for(option)(_templateObject2$1 || (_templateObject2$1 = _taggedTemplateLiteral(["\n              <li class=\"multi-option\">\n                <input\n                  id=", "\n                  type=\"checkbox\"\n                  data-value=\"", "\"\n                  data-index=\"", "\"\n                  data-label=\"", "\"\n                  class=\"dk-checkbox\"\n                  .checked=", "\n                />\n                <label class=\"dk-checkbox-label\" for=", " data-index=\"", "\"\n                  >", "</label\n                >\n              </li>\n            "])), "index".concat(key, "_ddID").concat(id), value, key, label, selected, "index".concat(key, "_ddID").concat(id), key, label);
          })));
        }
      }, {
        key: "state",
        get: function get() {
          return this.parent.store.getState().options;
        }
      }, {
        key: "updateOptions",
        value: function updateOptions(options) {
          var toUpdate = Array.isArray(options) ? options : [options];
          this.onChange$.next(toUpdate);
          this.parent.setState({
            options: rn(this.state, function (draft) {
              toUpdate.forEach(function (option) {
                draft[option.index] = option;
              });
            })
          });
        }
      }, {
        key: "init",
        value: function init() {
          this.addEventListeners();
        }
      }, {
        key: "addEventListeners",
        value: function addEventListeners() {
          var _this3 = this;

          this.onChange$ = new Subject();
          this.optionsContainer.addEventListener("mousedown", function (e) {
            var target = e.target;
            if (!target.closest("li")) return;
            var input = target.closest("li").querySelector("input") || target;
            _this3.firstClicked.el = input;
            _this3.firstClicked.index = parseInt(input.dataset.index);
            _this3.firstClicked.checked = input.checked;
            _this3.firstClicked.checked = !_this3.firstClicked.checked;
          });
          this.optionsContainer.addEventListener("click", function (e) {
            var clicked = e.target;
            var shiftDown = e.shiftKey;

            if (clicked.matches("input")) {
              if (_this3.settings.shift && shiftDown) {
                _this3.handleShiftSelect(clicked);
              } else {
                e.preventDefault();
                var _clicked$dataset = clicked.dataset,
                    index = _clicked$dataset.index,
                    label = _clicked$dataset.label,
                    value = _clicked$dataset.value;

                _this3.updateOptions({
                  index: index,
                  label: label,
                  value: value,
                  selected: clicked.checked
                });
              }

              _this3.lastChecked = clicked;
            }
          });
          this.optionsContainer.addEventListener("mouseover", function (e) {
            var target = e.target;
            if (!window.mouseDown || !_this3.settings.drag) return;

            _this3.handleDragSelect(target.closest("li"));
          });
          this.optionsContainer.addEventListener("mouseup", function (e) {
            _this3.resolveUpdatedBoxes();

            _this3.mouseMoving = false;
          });
          this.optionsContainer.addEventListener("mouseleave", function (e) {
            _this3.resolveUpdatedBoxes(e.target, true);
          });
        }
      }, {
        key: "handleDragSelect",
        value: function handleDragSelect(li) {
          var checkbox = li.querySelector("input");
          var isChecked = this.firstClicked.checked;

          if (!this.mouseMoving) {
            this.mouseMoving = true;
            this.firstClicked.checked = isChecked;
            this.firstClicked.el.checked = isChecked;
            this.updatedBoxes.push(this.firstClicked.el);
          }

          this.lastChecked = checkbox;
          checkbox.checked = isChecked;
          this.updatedBoxes.push(checkbox);
        }
      }, {
        key: "handleShiftSelect",
        value: function handleShiftSelect(clicked) {
          var _this4 = this;

          if (!this.lastChecked) return;
          var clickedIndex = parseInt(clicked.dataset.index);
          var lastIndex = parseInt(this.lastChecked.dataset.index);

          var _sort = [clickedIndex, lastIndex].sort(),
              _sort2 = _slicedToArray(_sort, 2),
              lowIndex = _sort2[0],
              highIndex = _sort2[1];

          var optionsToUpdate = _toConsumableArray(Array.from(this.state).slice(lowIndex, highIndex + 1)).map(function (option) {
            return _objectSpread$6(_objectSpread$6({}, option), {}, {
              selected: _this4.state[lastIndex].selected
            });
          });

          this.updateOptions(optionsToUpdate);
        }
      }, {
        key: "resolveUpdatedBoxes",
        value: function resolveUpdatedBoxes(clicked) {
          var mouseLeave = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          this.mouseMoving = false;

          if (this.updatedBoxes.length > 0) {
            var optionsToUpdate = this.updatedBoxes.map(function (box) {
              var _box$dataset = box.dataset,
                  index = _box$dataset.index,
                  value = _box$dataset.value,
                  label = _box$dataset.label;
              return {
                index: index,
                value: value,
                label: label,
                selected: box.checked
              };
            });
            this.updateOptions(optionsToUpdate);
          }

          if (this.updatedBoxes.length == 0 && mouseLeave) return;
          window.mouseDown = false;
          this.updatedBoxes = [];
        }
      }]);

      return multiOptions;
    }();

    function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$8(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

    function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

    function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

    var MultiSelect = function (_AbstractCustomSelect) {
      _inherits(MultiSelect, _AbstractCustomSelect);

      var _super = _createSuper$3(MultiSelect);

      function MultiSelect(dropdown, settings) {
        var _this;

        _classCallCheck(this, MultiSelect);

        _this = _super.call(this, dropdown, _objectSpread$7({
          optionsContainerTag: "div",
          containerClass: "dk-dropdown__container--multi",
          optionsContainerClass: "dk-dropdown__options--multi",
          showClear: 4
        }, settings));
        _this.canCollapse = false;
        _this.isMultiple = true;
        _this.mouseMoving = false;
        _this.lastChecked = void 0;
        _this.updatedBoxes = [];
        _this.clearContainer = void 0;
        _this.clearButton = void 0;
        _this.options = void 0;
        _this.firstClicked = void 0;
        _this.firstClickedIndex = void 0;
        _this.firstClickedState = void 0;
        _this.canCollapse = dropdown.hasAttribute("data-collapse");

        _this.init();

        _this.startSync();

        return _this;
      }

      _createClass(MultiSelect, [{
        key: "init",
        value: function init() {
          this._initOptions();

          this.container.appendChild(this.optionsContainer);
          this.createClearButton();
        }
      }, {
        key: "_initOptions",
        value: function _initOptions() {
          this.options = new multiOptions(this);
        }
      }, {
        key: "_render",
        value: function _render() {}
      }, {
        key: "_renderSelected",
        value: function _renderSelected() {}
      }, {
        key: "createDropdownContainers",
        value: function createDropdownContainers() {
          var _this$container$class;

          var containerClass = "dk-dropdown__container--multi";
          this.container = document.createElement("div");

          (_this$container$class = this.container.classList).add.apply(_this$container$class, [containerClass].concat(_toConsumableArray(this.selectRef.className.split(" "))));

          this.container.setAttribute("data-dropdown-id", this.settings.id.toString());
          this.selectRef.insertAdjacentElement("afterend", this.container);
          this.optionsContainer = document.createElement("div");
          this.optionsContainer.setAttribute("data-dropdown-open", "true");
          this.optionsContainer.classList.add("dk-dropdown__options--multi");
          this.container.appendChild(this.optionsContainer);
          this.container.appendChild(this.selectRef);
        }
      }, {
        key: "createClearButton",
        value: function createClearButton() {
          var _this2 = this;

          if (this.settings.showClear === false) return;
          var buttonClass = "dk-dropdown__btn";
          var containerClass = "dk-dropdown__clear";
          var insertLocation = "afterend";
          var buttonType = "button";
          this.clearContainer = document.createElement("div");
          this.container.insertAdjacentElement(insertLocation, this.clearContainer);
          this.clearContainer.classList.add(containerClass);
          this.clearContainer.setAttribute("data-dropdown-id", this.settings.id.toString());
          this.clearButton = document.createElement(buttonType);
          this.clearButton.innerText = "Clear";
          this.clearButton.classList.add(buttonClass);
          this.clearContainer.appendChild(this.clearButton);
          this.settings.showClear === true ? this.showClearButton() : "";
          this.clearButton.addEventListener("click", function (e) {
            e.preventDefault();

            _this2.clearSelected();

            _this2.showClearButton(false);
          });
        }
      }, {
        key: "showClearButton",
        value: function showClearButton() {
          var showButton = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          if (this.settings.showClear === false) return;
          this.settings.showClear === true ? showButton = true : "";
          showButton ? this.clearContainer.setAttribute("data-show", "true") : this.clearContainer.removeAttribute("data-show");
        }
      }, {
        key: "shouldShowClearButton",
        get: function get() {
          var optionsSelected = Array.from(this.selectRef.querySelectorAll("option")).filter(function (option) {
            return option.selected;
          }).length;
          return optionsSelected >= this.settings.showClear;
        }
      }, {
        key: "clearButtonCheck",
        value: function clearButtonCheck() {
          var _this3 = this;

          setTimeout(function () {
            _this3.showClearButton(_this3.shouldShowClearButton);
          }, 0);
        }
      }, {
        key: "startSync",
        value: function startSync() {
          var _this4 = this;

          this.options.onChange$.subscribe(function (changedOptions) {
            changedOptions.forEach(function (option) {
              _this4.optionRefs[option.index].selected = option.selected;
            });

            _this4.clearButtonCheck();
          });
          this.selectOnChange$.subscribe(function (event) {
            var curState = _this4.store.getState().options;

            var toBeSelected = Array.from(event.target.selectedOptions).map(function (option) {
              return curState.findIndex(function (item) {
                return item.value === option.value;
              });
            });

            _this4.store.setState({
              options: rn(curState, function (options) {
                options.filter(function (o) {
                  return o.selected;
                }).forEach(function (o) {
                  return o.selected = false;
                });
                toBeSelected.forEach(function (index) {
                  return options[index].selected = true;
                });
              })
            });
          });
        }
      }]);

      return MultiSelect;
    }(AbstractCustomSelect);

    var defaultSelector = "select.dk-dropdown:not([dk-dropdown--init])";
    function initDropdowns() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSelector;
      var passedSettings = arguments.length > 1 ? arguments[1] : undefined;
      return selectorHelper({
        selector: selector,
        defaultSelector: defaultSelector
      }, function (dropdown) {
        return createDropdown(dropdown);
      });

      function createDropdown(element) {
        if (element.tagName !== "SELECT") return null;
        if (element.hasAttribute("dk-dropdown--init")) return;
        var settings = isPlainObject_1(selector) ? selector : passedSettings;
        var isMultiple = element.hasAttribute("multiple");
        var shouldCollapse = element.hasAttribute("data-collapse");

        if (!isMultiple) {
          return new Dropdown(element, settings).publicMethods;
        } else {
          return new MultiSelect(element, settings);
        }
      }
    }

    function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$9(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

    function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

    function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

    var vanillaNav = function (_tabOverflow) {
      _inherits(vanillaNav, _tabOverflow);

      var _super = _createSuper$4(vanillaNav);

      function vanillaNav(navElement, passedOptions) {
        var _this;

        _classCallCheck(this, vanillaNav);

        var defaults = {
          tabSelector: "a.dk-nav__link",
          more: {
            tag: "div",
            text: navElement.getAttribute("data-overflow-text") || "More"
          },
          activeSelector: "a[aria-current='page']"
        };
        _this = _super.call(this, _objectSpread$8(_objectSpread$8({}, defaults), passedOptions));
        _this.navElement = navElement;
        _this.nav = _this.navElement;
        _this.tabContainer = _this.nav;

        _this.initOverflow();

        _this.nav.dkNav = _this.publicMethods;
        return _this;
      }

      return vanillaNav;
    }(tabOverflow);

    function dkNav() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "nav.dk-nav";
      var passedSettings = arguments.length > 1 ? arguments[1] : undefined;
      var settings = isPlainObject_1(selector) ? selector : passedSettings;
      return selectorHelper({
        selector: selector,
        defaultSelector: "nav.dk-nav"
      }, function (nav) {
        return new vanillaNav(nav, settings);
      });
    }

    var _templateObject$4;
    function mask() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return {
        id: id,
        classSelector: ".dk-site__mask",

        get maskSelector() {
          return this.id ? "#".concat(this.id) : this.classSelector;
        },

        toggle: function toggle() {
          this.get().classList.contains("visible") ? this.hide() : this.show();
        },
        show: function show() {
          this.get().classList.add("visible");
          if (!options.onShow) return;
          options.onShow();
        },
        hide: function hide() {
          this.get().classList.remove("visible");
          if (!options.onHide) return;
          options.onHide();
        },
        get: function get() {
          var mask = document.querySelector(this.maskSelector);
          return mask ? mask : this.create();
        },
        create: function create() {
          var _this = this;

          document.querySelector(window.inStorybook ? "#root" : "body").insertAdjacentElement("beforeend", this.maskMarkup);
          var maskRef = document.querySelector(this.maskSelector);
          maskRef.addEventListener("click", function () {
            _this.hide();
          });
          return maskRef;
        },
        destory: function destory() {
          this.get().remove();
        },

        get maskMarkup() {
          return html$1.node(_templateObject$4 || (_templateObject$4 = _taggedTemplateLiteral(["\n      <div id=\"", "\" class=\"", "\" tabindex=\"-1\"></div>\n    "])), this.id, this.classSelector.replace(".", ""));
        }

      };
    }

    var siteMask = mask();
    function uniqueSiteMask(id, options) {
      return mask(id, options);
    }

    function modalActions(modalElm) {
      var showClass = "visible";
      var modal = typeof modalElm === "string" ? document.querySelector(modalElm) : modalElm;
      var isWC = modal.tagName === "DK-MODAL";

      var actions = {
        hide: function hide() {
          if (isWC) {
            modal.hide();
          } else {
            modal.classList.remove(showClass);
            modal.style.removeProperty("top");
            modalMask.hide();
          }
        },
        show: function show() {
          if (isWC) {
            modal.show();
          } else {
            modal.classList.add(showClass);
            modalMask.show();
          }
        },
        toggle: function toggle() {
          if (isWC) {
            if (modal.isOpen) {
              modal.hide();
            } else {
              modal.show();
            }
          } else {
            modal.classList.contains(showClass) ? this.hide() : this.show();
          }
        },

        get isVisable() {
          if (isWC) {
            return modal.open;
          } else {
            return modal.classList.contains(showClass);
          }
        }

      };
      var modalMask = uniqueSiteMask("auto-modal-mask", {
        onHide: function onHide() {
          if (!actions.isVisable) return;
          actions.hide();
        }
      });
      return actions;
    }

    function autoModal() {
      var modalTriggers = document.querySelectorAll("[data-modal-target]:not([data-auto-modal])");
      modalTriggers.forEach(setupAutoModalTrigger);
      document.querySelectorAll("[data-modal-dismiss]:not([data-auto-modal]").forEach(initDismissBtn);
      document.querySelectorAll(".dk-modal__close:not([data-auto-modal])").forEach(initDismissBtn);
    }

    function initDismissBtn(btn) {
      btn.setAttribute("data-auto-modal", "true");
      var parentModal = [btn.closest("[class*='dk-modal--']"), btn.closest(".dk-modal")].filter(function (parent) {
        return parent;
      });
      parentModal.forEach(function (modal) {
        btn.addEventListener("click", function () {
          modalActions(modal).hide();
        });
      });
    }

    function setupAutoModalTrigger(trigger) {
      var targetString = trigger.getAttribute("data-modal-target");
      if (!targetString || targetString === "true") return;
      var modalTarget = document.querySelector(targetString);
      if ((modalTarget === null || modalTarget === void 0 ? void 0 : modalTarget.tagName) === "DK-MODAL") return;
      trigger.addEventListener("click", function () {
        if (!modalTarget) {
          return;
        }

        var action = trigger.getAttribute("data-modal-action") || "show";
        modalActions(modalTarget)[action]();
        document.querySelector(window.inStorybook ? "#root" : "body").insertAdjacentElement("beforeend", modalTarget);
      });
      if (modalTarget) trigger.setAttribute("data-auto-modal", "true");
    }

    function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$a(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
    var EventBus = function () {
      function EventBus() {
        _classCallCheck(this, EventBus);

        this.bus = void 0;
        this._targets = void 0;
        this.events$ = void 0;

        for (var _len = arguments.length, targets = new Array(_len), _key = 0; _key < _len; _key++) {
          targets[_key] = arguments[_key];
        }

        this._targets = targets;
        this.bus = document.createElement("eventbus");
        this.events$ = new Subject();
      }

      _createClass(EventBus, [{
        key: "addEventListener",
        value: function addEventListener(event, callback) {
          this.allTargets.forEach(function (target) {
            return target.addEventListener(event, callback);
          });
        }
      }, {
        key: "removeEventListener",
        value: function removeEventListener(event, callback) {
          this.allTargets.forEach(function (target) {
            return target.removeEventListener(event, callback);
          });
        }
      }, {
        key: "emit",
        value: function emit(event, detail) {
          this.events$.next(_objectSpread$9({
            event: event
          }, detail && detail));
          this.allTargets.forEach(function (target) {
            return target.dispatchEvent(new CustomEvent(event, {
              detail: detail
            }));
          });
        }
      }, {
        key: "on$",
        value: function on$(event) {
          return this.events$.pipe(filter(function (e) {
            return e.event == event;
          }));
        }
      }, {
        key: "allTargets",
        get: function get() {
          return [this.bus].concat(_toConsumableArray(this._targets));
        }
      }]);

      return EventBus;
    }();
    var GlobalBus = new EventBus();

    var Collapse = function () {
      function Collapse(element, passedSettings) {
        var _this = this;

        _classCallCheck(this, Collapse);

        this.isOpen$ = void 0;
        this.EventBus = void 0;
        this._trigger = void 0;
        this._element = null;
        this._isTransitioning = false;
        this._triggerArray = [];
        this._events = {
          toggle: "toggle.dk.collapse",
          show: "show.dk.collapse",
          shown: "shown.dk.collapse",
          hide: "hide.dk.collapse",
          hidden: "hidden.dk.collapse"
        };
        this._classNames = {
          collapse: "dk-collapse",
          collapsing: "dk-collapsing",
          show: "dk-show"
        };

        var _ref = passedSettings !== null && passedSettings !== void 0 ? passedSettings : {},
            initialState = _ref.initialState;

        this._element = element;

        if (this._element.hasAttribute("data-collapse-init")) {
          return;
        } else {
          this._element.setAttribute("data-collapse-init", "");
        }

        this.EventBus = new EventBus(this._element);
        this._trigger = passedSettings === null || passedSettings === void 0 ? void 0 : passedSettings.trigger;
        this.isOpen$ = new BehaviorSubject(initialState ? initialState : this._element.classList.contains(this._classNames.show));
        this._triggerArray = Array.from(document.querySelectorAll("[data-collapse-target=\"#".concat(this._element.id, "\"]")));

        if (!this._trigger) {
          this._triggerArray.forEach(function (trigger) {
            return _this._setupTrigger(trigger);
          });
        } else {
          this._setupTrigger(this._trigger, true);
        }

        if (initialState) {
          this._quickExpand();
        }

        this.isOpen$.pipe(distinctUntilChanged(), skip(1)).subscribe(function (isOpen) {
          if (isOpen) {
            _this._expandPanel();
          } else {
            _this._collapsePanel();
          }
        });
        this._element.dkCollapse = this.publicMethods;
      }

      _createClass(Collapse, [{
        key: "publicMethods",
        get: function get() {
          var _this2 = this;

          return {
            toggle: function toggle() {
              return _this2.toggle();
            },
            show: function show() {
              return _this2.show();
            },
            hide: function hide() {
              return _this2.hide();
            },
            destroy: function destroy() {
              return _this2.destroy();
            }
          };
        }
      }, {
        key: "toggle",
        value: function toggle() {
          this.EventBus.emit(this._events.toggle);

          this._setIsOpen(!this.isOpen);
        }
      }, {
        key: "show",
        value: function show() {
          this._setIsOpen(true);
        }
      }, {
        key: "hide",
        value: function hide() {
          this._setIsOpen(false);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this.isOpen$.complete();
        }
      }, {
        key: "isOpen",
        get: function get() {
          return this.isOpen$.getValue();
        }
      }, {
        key: "_setIsOpen",
        value: function _setIsOpen(nextIsOpen) {
          if (this._isTransitioning) return;
          this.isOpen$.next(nextIsOpen);
        }
      }, {
        key: "setIsTransitioning",
        value: function setIsTransitioning(isTransitioning) {
          this._isTransitioning = isTransitioning;

          if (isTransitioning) {
            this._element.classList.add(this._classNames.collapsing);
          } else {
            this._element.classList.remove(this._classNames.collapsing);
          }
        }
      }, {
        key: "_collapsePanel",
        value: function _collapsePanel() {
          var _this3 = this;

          var _this$_classNames = this._classNames,
              collapse = _this$_classNames.collapse,
              show = _this$_classNames.show;
          this.EventBus.emit(this._events.hide);
          this._element.style.height = "".concat(this._element.getBoundingClientRect().height, "px");

          this._triggerReflow();

          this.setIsTransitioning(true);

          this._element.classList.remove(collapse);

          this._element.classList.remove(show);

          this._element.style.height = "0px";

          var isComplete = function isComplete() {
            _this3.setIsTransitioning(false);

            _this3._element.style.height = "";

            _this3._element.classList.add(collapse);

            _this3._element.setAttribute("data-collapsed", "true");

            _this3.EventBus.emit(_this3._events.hidden);
          };

          fromEvent(this._element, "transitionend").pipe(take(1)).subscribe(isComplete);
        }
      }, {
        key: "_expandPanel",
        value: function _expandPanel() {
          var _this4 = this;

          var _this$_classNames2 = this._classNames,
              collapse = _this$_classNames2.collapse,
              show = _this$_classNames2.show;
          this.EventBus.emit(this._events.show);

          this._element.classList.remove(collapse);

          var trueHeight = this._element.scrollHeight;
          this.setIsTransitioning(true);
          this._element.style.height = "0px";

          this._triggerReflow();

          this._element.style.height = "".concat(trueHeight, "px");

          var isComplete = function isComplete() {
            _this4.setIsTransitioning(false);

            _this4._element.classList.add(collapse);

            _this4._element.classList.add(show);

            _this4._element.style.removeProperty("height");

            _this4._element.setAttribute("data-collapsed", "false");

            _this4.EventBus.emit(_this4._events.shown);
          };

          fromEvent(this._element, "transitionend").pipe(take(1)).subscribe(isComplete);
        }
      }, {
        key: "_quickExpand",
        value: function _quickExpand() {
          this._element.classList.add("dk-show");
        }
      }, {
        key: "_triggerReflow",
        value: function _triggerReflow() {
          this._element.offsetHeight;
        }
      }, {
        key: "_setupTrigger",
        value: function _setupTrigger(trigger) {
          var _this5 = this;

          var attachEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          if (trigger.tagName !== "BUTTON" && trigger.tagName !== "A") {
            trigger.setAttribute("role", "button");
            trigger.setAttribute("tabindex", "0");
          }

          this.isOpen$.subscribe(function (isOpen) {
            trigger.setAttribute("aria-expanded", isOpen.toString());
          });

          if (attachEvents) {
            fromEvent(trigger, "click").subscribe(function (e) {
              _this5.toggle();
            });
          }
        }
      }]);

      return Collapse;
    }();

    var dkAccordion = function () {
      function dkAccordion(elm, passedSettings) {
        var _this = this;

        _classCallCheck(this, dkAccordion);

        this._parent = void 0;
        this._panels = void 0;
        this._collapseInstances = void 0;
        this._settings = {
          allowMultiple: false,
          selectors: {
            panel: ".dk-accordion__panel",
            content: ".dk-accordion__content",
            trigger: ".dk-accordion__trigger",
            collapse: ".dk-collapse"
          }
        };
        this._parent = elm;
        if (this._parent.hasAttribute("data-accordion-init")) return;

        this._parent.setAttribute("data-accordion-init", "");

        if (this._parent.hasAttribute("data-allow-toggle")) {
          this._settings.allowMultiple = false;
        } else if (this._parent.hasAttribute("data-allow-multiple")) {
          this._settings.allowMultiple = true;
        }

        this._panels = Array.from(this._parent.querySelectorAll(this._settings.selectors.panel));
        this._collapseInstances = this._panels.map(function (panel, i) {
          return _this._processPanel(panel, i);
        });
      }

      _createClass(dkAccordion, [{
        key: "_processPanel",
        value: function _processPanel(panel, index) {
          var _this2 = this;

          var collapse = panel.querySelector(this._settings.selectors.collapse);
          var trigger = panel.querySelector(this._settings.selectors.trigger);
          var collapseInstance = new Collapse(collapse, {
            trigger: trigger,
            initialState: trigger.getAttribute("aria-expanded") === "true" ? true : false
          });

          if (!this._settings.allowMultiple) {
            collapse.addEventListener("show.dk.collapse", function () {
              _this2._collapseInstances.filter(function (i) {
                return i !== collapseInstance;
              }).forEach(function (i) {
                return i.hide();
              });
            });
          }

          return collapseInstance;
        }
      }]);

      return dkAccordion;
    }();

    function autoCollapse() {
      var collapseInstances = {};

      function addCollapseInstace(key, newInstance) {
        collapseInstances = rn(collapseInstances, function (draft) {
          draft[key] = newInstance;
        });
      }

      var triggers = [].slice.call(document.querySelectorAll("[data-collapse-target]:not([collapse-init])"));
      triggers.forEach(function (trigger) {
        var target = trigger.getAttribute("data-collapse-target");
        var panel = document.querySelector(target);

        if (!panel) {
          return void 0;
        }

        if (!collapseInstances[target]) {
          addCollapseInstace(target, panel ? new Collapse(panel) : null);
        }

        trigger.addEventListener("click", function (e) {
          var action = trigger.dataset.collapseAction;

          if (action && (action === "show" || action === "toggle" || action == "hide")) {
            collapseInstances[target][action]();
          } else {
            collapseInstances[target].toggle();
          }
        });
        trigger.setAttribute("collapse-init", "");
      });
    }
    function autoAccordion() {
      var accordions = [].slice.call(document.querySelectorAll(".dk-accordion"));
      accordions.forEach(function (acr) {
        return new dkAccordion(acr);
      });
    }
    function collapse(arg) {
      return selectorHelper({
        selector: arg,
        defaultSelector: false
      }, function (panel) {
        if (panel.hasAttribute("data-collapse-init")) {
          return panel.dkCollapse;
        } else {
          return new Collapse(panel).publicMethods;
        }
      });
    }

    var _internal = {
      auto: {
        autoModal: autoModal,
        autoAccordion: autoAccordion,
        autoCollapse: autoCollapse
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("DOMContentLoaded", function () {
        if (document.documentElement.dir.length === 0) {
          document.documentElement.dir = document.querySelector("body").classList.contains("rtl") ? "rtl" : "ltr";
        }

        for (var fnKey in _internal.auto) {
          _internal.auto[fnKey]();
        }
      });
    }

    exports._internal = _internal;
    exports.collapse = collapse;
    exports.dropdowns = initDropdowns;
    exports.modal = modalActions;
    exports.nav = dkNav;
    exports.siteMask = siteMask;
    exports.tabbedMenu = tabbedMenu;
    exports.tabbedSidebar = tabbedSidebar;
    exports.uniqueSiteMask = uniqueSiteMask;

    return exports;

}({}));
