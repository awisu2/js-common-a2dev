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
  }, {
    key: 'matchUrl',
    value: function matchUrl(str) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // urlを一覧で取得(javscript用にエスケープ文字も追加している)
      var httpRegexp = new RegExp('https?://[\\w/:%#\\$&\\?\\(\\)~\\.=\\+\\-\\\\]+', 'g');
      var found = str.match(httpRegexp);

      if (options.isDeleteEscape) {
        var escapeRegexp = new RegExp('\\\\', 'g');
        for (var i in found) {
          found[i] = found[i].replace(escapeRegexp, '');
        }
      }
      return found;
    }
  }, {
    key: 'fillObject',
    value: function fillObject(obj, sample) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _obj = obj ? this.copyObject(obj) : {};
      for (var key in sample) {
        if (_obj[key] === undefined) {
          _obj[key] = sample[key];
        } else {
          if (_typeof(sample[key]) === 'object') {
            _obj[key] = this.fillObject(_obj[key], sample[key], options);
          }
        }
      }

      if (options.isPrune === true) {
        _obj = this.pruneObject(_obj, sample, options);
      }

      return _obj;
    }
  }, {
    key: 'pruneObject',
    value: function pruneObject(obj, sample) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _obj = obj ? this.copyObject(obj) : {};

      for (var key in _obj) {
        if (sample[key] === undefined) {
          delete _obj[key];
        } else {
          if (_typeof(_obj[key]) === 'object' && (typeof sample === 'undefined' ? 'undefined' : _typeof(sample)) === 'object') {
            _obj[key] = this.pruneObject(_obj[key], sample[key], options);
          }
        }
      }
      return _obj;
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