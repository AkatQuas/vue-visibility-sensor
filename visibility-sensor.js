(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-visibility-sensor"] = factory();
	else
		root["vue-visibility-sensor"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/index.vue?vue&type=script&lang=js&

/**
 * @param {{ top: Number, left: Number, bottom: Number, right: Number, width: Number, height: Number }} rect
 * @returns {{ top: Number, left: Number, bottom: Number, right: Number, width: Number, height: Number }}
 * */

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function normalizeRect(rect) {
  if (rect.width === undefined) {
    rect.width = rect.right - rect.left;
  }

  if (rect.height === undefined) {
    rect.height = rect.bottom - rect.top;
  }

  return rect;
}
/**
 * @param {{ top: Number, left: Number, bottom: Number, right: Number }} rect
 * @returns {{ top: Number, left: Number, bottom: Number, right: Number }}
 * */


function roundRectDown(rect) {
  return {
    top: Math.floor(rect.top),
    left: Math.floor(rect.left),
    bottom: Math.floor(rect.bottom),
    right: Math.floor(rect.right)
  };
}

/* harmony default export */ var lib_vue_loader_options_srcvue_type_script_lang_js_ = ({
  name: 'VisibilitySensor',
  props: {
    active: {
      type: Boolean,
      "default": true
    },
    partialVisibility: {
      type: [Boolean, String],
      "default": false,
      validator: function validator(v) {
        if (typeof v === 'boolean') {
          return true;
        } else {
          return ['top', 'right', 'bottom', 'left'].indexOf(v) > -1;
        }
      }
    },
    minTopValue: {
      type: Number,
      "default": 0
    },
    scrollCheck: {
      type: Boolean,
      "default": false
    },
    scrollDelay: {
      type: Number,
      "default": 250
    },
    scrollThrottle: {
      type: Number,
      "default": -1
    },
    resizeCheck: {
      type: Boolean,
      "default": false
    },
    resizeDelay: {
      type: Number,
      "default": 250
    },
    resizeThrottle: {
      type: Number,
      "default": -1
    },
    intervalCheck: {
      type: Boolean,
      "default": true
    },
    intervalDelay: {
      type: Number,
      "default": 100
    },
    delayedCall: {
      type: Boolean,
      "default": false
    },
    offset: {
      type: Object,
      "default": {} // should be
      // {
      //   top: Number,
      //   left: Number,
      //   right: Number,
      //   bottom: Number,
      // }

    },
    containment: {
      "default": null
    }
  },
  data: function data() {
    return {
      isVisible: null,
      visibilityRect: {}
    };
  },
  mounted: function mounted() {
    if (this.active) {
      this.startWatching();
    }
  },
  updated: function updated() {},
  beforeDestroy: function beforeDestroy() {
    this.stopWatching();
  },
  methods: {
    getContainer: function getContainer() {
      return this.containment || window;
    },
    addEventListener: function addEventListener(target, event, delay, throttle) {
      var _this = this;

      if (!this.debounceCheck) {
        this.debounceCheck = {};
      }

      var timeout;
      var fn;

      var later = function later() {
        timeout = null;

        _this.check();
      };

      if (throttle > -1) {
        fn = function fn() {
          if (!timeout) {
            timeout = setTimeout(later, throttle || 0);
          }
        };
      } else {
        fn = function fn() {
          clearTimeout(timeout);
          timeout = setTimeout(later, delay || 0);
        };
      }

      var info = {
        target: target,
        fn: fn,
        getLastTimeout: function getLastTimeout() {
          return timeout;
        }
      };
      target.addEventListener(event, info.fn);
      this.debounceCheck[event] = info;
    },
    startWatching: function startWatching() {
      var _this2 = this;

      if (this.debounceCheck || this.interval) {
        return;
      }

      if (this.intervalCheck) {
        this.interval = setInterval(function () {
          return _this2.check();
        }, this.intervalDelay);
      }

      if (this.scrollCheck) {
        this.addEventListener(this.getContainer(), 'scroll', this.scrollDelay, this.scrollThrottle);
      }

      if (this.resizeCheck) {
        this.addEventListener(window, 'resize', this.resizeDelay, this.resizeThrottle);
      }

      !this.delayedCall && this.check();
    },
    stopWatching: function stopWatching() {
      if (this.debounceCheck) {
        // clean up event listeners and their debounce callers
        for (var debounceEvent in this.debounceCheck) {
          if (this.debounceCheck.hasOwnProperty(debounceEvent)) {
            var debounceInfo = this.debounceCheck[debounceEvent];
            clearTimeout(debounceInfo.getLastTimeout());
            debounceInfo.target.removeEventListener(debounceEvent, debounceInfo.fn);
            this.debounceCheck[debounceEvent] = null;
          }
        }
      }

      this.debounceCheck = null;

      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    check: function check() {
      var el = this.$el;
      var rect;
      var containmentRect;

      if (!el) {
        return;
      }

      rect = normalizeRect(roundRectDown(el.getBoundingClientRect()));

      if (this.containment) {
        var containmentDOMRect = this.containment.getBoundingClientRect();
        containmentRect = {
          top: containmentDOMRect.top,
          left: containmentDOMRect.left,
          bottom: containmentDOMRect.bottom,
          right: containmentDOMRect.right
        };
      } else {
        containmentRect = {
          top: 0,
          left: 0,
          bottom: window.innerHeight || document.documentElement.clientHeight,
          right: window.innerWidth || document.documentElement.clientWidth
        };
      }

      var offset = this.offset || {};

      if (_typeof(offset) === 'object') {
        containmentRect.top += offset.top || 0;
        containmentRect.left += offset.left || 0;
        containmentRect.bottom -= offset.bottom || 0;
        containmentRect.right -= offset.right || 0;
      }

      var visibilityRect = {
        top: rect.top >= containmentRect.top,
        left: rect.left >= containmentRect.left,
        bottom: rect.bottom <= containmentRect.bottom,
        right: rect.right <= containmentRect.right
      };
      var hasSize = rect.height > 0 && rect.width > 0;
      var isVisible = hasSize && visibilityRect.top && visibilityRect.left && visibilityRect.bottom && visibilityRect.right; // check for partial visibility

      if (hasSize && this.partialVisibility) {
        var partialVisible = rect.top <= containmentRect.bottom && rect.bottom >= containmentRect.top && rect.left <= containmentRect.right && rect.right >= containmentRect.left; // account for partial visibility on a single edge

        if (typeof this.partialVisibility === 'string') {
          partialVisible = visibilityRect[this.partialVisibility];
        } // if we have minimum top visibility set by props, lets check, if it meets the passed value
        // so if for instance element is at least 200px in viewport, then show it.


        isVisible = this.minTopValue ? partialVisible && rect.top <= containmentRect.bottom - this.minTopValue : partialVisible;
      }

      if (this.isVisible !== isVisible) {
        this.isVisible = isVisible;
        this.visibilityRect = visibilityRect;
      }

      this.$emit('change', isVisible);
    }
  },
  template: '<slot><span></span></slot>'
});
// CONCATENATED MODULE: ./src/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var srcvue_type_script_lang_js_ = (lib_vue_loader_options_srcvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/index.vue
var render, staticRenderFns




/* normalize component */

var component = normalizeComponent(
  srcvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/index.vue"
/* harmony default export */ var src = __webpack_exports__["default"] = (component.exports);

/***/ })
/******/ ]);
});