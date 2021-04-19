"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "REDUCER", {
  enumerable: true,
  get: function get() {
    return _media.REDUCER;
  }
});
exports["default"] = exports.unset = exports.setup = exports.init = exports.config = exports.GET_PRINT = void 0;

var _media = require("@indlekofer/media");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var GET_PRINT = '@indlekofer/media_print/GET_PRINT';
exports.GET_PRINT = GET_PRINT;
var __isInitialSetup = true;

var config = function config() {
  var print = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  (0, _media.handleChange)(GET_PRINT, print);
};

exports.config = config;

var _handleChange = function _handleChange(e) {
  if (typeof e == 'undefined' || typeof e.matches == 'undefined') {
    config(null);
  } else if (e.matches) {
    config(true);
  } else {
    config(false);
  }
};

var init = function init() {
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object' && window.matchMedia) {
    var mediaQuery = window.matchMedia('print');

    _handleChange(mediaQuery);
  } else {
    config(null);
  }
};

exports.init = init;

var setup = function setup() {
  if (!__isInitialSetup) unset();

  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object') {
    if (window.matchMedia) {
      var mediaQuery = window.matchMedia('print');

      if (typeof mediaQuery.addEventListener == 'function') {
        mediaQuery.addEventListener('change', _handleChange);
      } else if (typeof mediaQuery.addListener == 'function') {
        mediaQuery.addListener(_handleChange);
      }

      _handleChange(mediaQuery);
    } else if (typeof window.addEventListener == 'function') {
      window.addEventListener('beforeprint', config.bind(null, true));
      window.addEventListener('afterprint', config.bind(null, false));
      config(null);
    } else {
      config(null);
    }
  } else {
    config(null);
  }

  __isInitialSetup = false;
};

exports.setup = setup;

var unset = function unset() {
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
    if (window.matchMedia) {
      var mediaQuery = window.matchMedia('print');

      if (typeof mediaQuery.removeEventListener == 'function') {
        mediaQuery.removeEventListener('change', _handleChange);
      } else if (typeof mediaQuery.removeListener == 'function') {
        mediaQuery.removeListener(_handleChange);
      }
    } else if (typeof window.addEventListener == 'function') {
      window.removeEventListener('beforeprint', config);
      window.removeEventListener('afterprint', config);
    }
  }

  __isInitialSetup = true;
};

exports.unset = unset;
setup();
var _default = GET_PRINT;
exports["default"] = _default;