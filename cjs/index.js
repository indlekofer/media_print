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
exports.default = exports.GET_PRINT = exports.unset = exports.setup = exports.config = void 0;

var _media = require("@indlekofer/media");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var GET_PRINT = '@indlekofer/media_print/GET_PRINT';
exports.GET_PRINT = GET_PRINT;

var config = function config() {
  var print = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  (0, _media.handleChange)(GET_PRINT, print);
};

exports.config = config;

var __configTrue = function __configTrue() {
  return config(true);
};

var __mql = function __mql(mql) {
  return config(mql.matches);
};

var setup = function setup() {
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
    if (window.matchMedia) {
      window.matchMedia('print').addListener(__mql);
    } else {
      window.addEventListener('beforeprint', __configTrue);
      window.addEventListener('afterprint', config);
    }
  }
};

exports.setup = setup;

var unset = function unset() {
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
    if (window.matchMedia) {
      window.matchMedia('print').removeListener(__mql);
    } else {
      window.removeEventListener('beforeprint', __configTrue);
      window.removeEventListener('afterprint', config);
    }
  }
};

exports.unset = unset;
setup();
config();
var _default = GET_PRINT;
exports.default = _default;