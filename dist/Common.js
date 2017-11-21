'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Common = function () {
  function Common() {
    _classCallCheck(this, Common);
  }

  _createClass(Common, null, [{
    key: 'existsArg',
    value: function existsArg(v) {
      return v === undefined;
    }
  }, {
    key: 'canNumber',
    value: function canNumber(v) {
      switch (typeof v === 'undefined' ? 'undefined' : _typeof(v)) {
        case 'number':
          return true;
        case 'string':
          return v === parseFloat(v).toString() && isFinite(v);
        default:
          return false;
      }
    }
  }, {
    key: 'hasDataObject',
    value: function hasDataObject(v) {
      if (!v) return false;
      return (typeof v === 'undefined' ? 'undefined' : _typeof(v)) !== 'object' || Object.keys(v).length !== 0;
    }

    // Object

  }, {
    key: 'valueObject',
    value: function valueObject(object, key, def) {
      if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') return def;
      if (object && key in object) return object[key];
      return def;
    }
  }, {
    key: 'copyObject',
    value: function copyObject(object) {
      return Object.assign({}, object);
    }

    // ==================================================
    // node
    // ==================================================

  }, {
    key: 'getArgumentNode',
    value: function getArgumentNode() {
      return process.argv[0];
    }
  }, {
    key: 'getArgumentCurrent',
    value: function getArgumentCurrent() {
      return process.argv[1];
    }
  }, {
    key: 'getArgumentValue',
    value: function getArgumentValue(index) {
      if (index !== 0 && !index) return process.argv.slice(2);
      return this.valueObject(process.argv, 2 + index, undefined);
    }
  }, {
    key: 'addNodePathEnv',
    value: function addNodePathEnv(path) {
      if ('NODE_PATH' in process.env && process.env) {
        process.env.NODE_PATH = process.env.NODE_PATH + ';' + path;
      } else {
        process.env.NODE_PATH = path;
      }
      require('module')._initPaths();
    }
  }]);

  return Common;
}();

exports.default = Common;