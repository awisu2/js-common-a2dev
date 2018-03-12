'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Common = require('./Common.js').default;

var MochaTester = function () {
  function MochaTester() {
    _classCallCheck(this, MochaTester);
  }

  _createClass(MochaTester, null, [{
    key: 'existsKeyAssert',
    value: function existsKeyAssert(key, data) {
      var isExists = key in data;
      _assert2.default.ok(isExists, 'exists \'' + key + '\' in data. ' + JSON.stringify(data));
      return isExists;
    }
  }, {
    key: 'isErrorWithDone',
    value: function isErrorWithDone(done, err) {
      if (err) {
        this.error(err);
        return true;
      }
      return false;
    }
  }, {
    key: 'testValues',

    // all of testValues
    get: function get() {
      var arr = {};
      var f = function f() {};
      var fAllow = function fAllow() {};

      return {
        undefined: {
          value: undefined,
          type: 'undefined',
          typeString: Common.TYPE_STRING.UNDEFINED,
          canNumber: false
        },
        undefinedArg: {
          value: arr.undefined,
          type: 'undefined',
          typeString: Common.TYPE_STRING.UNDEFINED,
          canNumber: false
        },
        null: {
          value: null,
          type: 'object',
          typeString: Common.TYPE_STRING.NULL,
          canNumber: false
        },
        booleanTrue: {
          value: true,
          type: 'boolean',
          typeString: Common.TYPE_STRING.BOOLEAN,
          canNumber: false
        },
        booleanFalse: {
          value: false,
          type: 'boolean',
          typeString: Common.TYPE_STRING.BOOLEAN,
          canNumber: false
        },
        numberZero: {
          value: 0,
          type: 'number',
          typeString: Common.TYPE_STRING.NUMBER,
          canNumber: true
        },
        numberOne: {
          value: 1,
          type: 'number',
          typeString: Common.TYPE_STRING.NUMBER,
          canNumber: true
        },
        numberMinus: {
          value: -1,
          type: 'number',
          typeString: Common.TYPE_STRING.NUMBER,
          canNumber: true
        },
        numberFloat: {
          value: 3.14,
          type: 'number',
          typeString: Common.TYPE_STRING.NUMBER,
          canNumber: true
        },
        numberInfinity: {
          value: Infinity,
          type: 'number',
          typeString: Common.TYPE_STRING.NUMBER,
          canNumber: true
        },
        numberNan: {
          value: NaN,
          type: 'number',
          typeString: Common.TYPE_STRING.NUMBER,
          canNumber: true
        },
        numberOct: {
          value: 2,
          type: 'number',
          typeString: Common.TYPE_STRING.NUMBER,
          canNumber: true
        },
        numberHex: {
          value: 0x03,
          type: 'number',
          typeString: Common.TYPE_STRING.NUMBER,
          canNumber: true
        },
        numberBigger: {
          value: Number.MAX_VALUE,
          type: 'number',
          typeString: Common.TYPE_STRING.NUMBER,
          canNumber: true
        },
        numberSmallest: {
          value: Number.MIN_VALUE,
          type: 'number',
          typeString: Common.TYPE_STRING.NUMBER,
          canNumber: true
        },
        numberPositiveInfinity: {
          value: Number.POSITIVE_INFINITY,
          type: 'number',
          typeString: Common.TYPE_STRING.NUMBER,
          canNumber: true
        },
        numberNegativeInfinity: {
          value: Number.NEGATIVE_INFINITY,
          type: 'number',
          typeString: Common.TYPE_STRING.NUMBER,
          canNumber: true
        },
        stringEmpty: {
          value: '',
          type: 'string',
          typeString: Common.TYPE_STRING.STRING,
          canNumber: false
        },
        stringA: {
          value: 'a',
          type: 'string',
          typeString: Common.TYPE_STRING.STRING,
          canNumber: false
        },
        stringALarge: {
          value: 'A',
          type: 'string',
          typeString: Common.TYPE_STRING.STRING,
          canNumber: false
        },
        stringOne: {
          value: '1',
          type: 'string',
          typeString: Common.TYPE_STRING.STRING,
          canNumber: true
        },
        stringZero: {
          value: '0',
          type: 'string',
          typeString: Common.TYPE_STRING.STRING,
          canNumber: true
        },
        stringMix: {
          value: '100a',
          type: 'string',
          typeString: Common.TYPE_STRING.STRING,
          canNumber: false
        },
        symbolValue: {
          value: Symbol('foo'),
          type: 'symbol',
          typeString: Common.TYPE_STRING.SYMBOL,
          canNumber: false
        },
        symbolIterator: {
          value: Symbol.iterator,
          type: 'symbol',
          typeString: Common.TYPE_STRING.SYMBOL,
          canNumber: false
        },
        object: {
          value: {},
          type: 'object',
          typeString: Common.TYPE_STRING.OBJECT,
          canNumber: false
        },
        objectValue: {
          value: { a: 1, b: 2 },
          type: 'object',
          typeString: Common.TYPE_STRING.OBJECT,
          canNumber: false
        },
        array: {
          value: [],
          type: 'object',
          typeString: Common.TYPE_STRING.ARRAY,
          canNumber: false
        },
        arrayValue: {
          value: [1, 2, 3],
          type: 'object',
          typeString: Common.TYPE_STRING.ARRAY,
          canNumber: false
        },
        function: {
          value: f,
          type: 'function',
          typeString: Common.TYPE_STRING.FUNCTION,
          canNumber: false
        },
        functionAllow: {
          value: fAllow,
          type: 'function',
          typeString: Common.TYPE_STRING.FUNCTION,
          canNumber: false
        }
      };
    }
  }]);

  return MochaTester;
}();

exports.default = MochaTester;