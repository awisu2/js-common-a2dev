'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
          canNumber: false
        },
        undefinedArg: {
          value: arr.undefined,
          canNumber: false
        },
        null: {
          value: null,
          canNumber: false
        },
        booleanTrue: {
          value: true,
          canNumber: false
        },
        booleanFalse: {
          value: false,
          canNumber: false
        },
        numberZero: {
          value: 0,
          canNumber: true
        },
        numberOne: {
          value: 1,
          canNumber: true
        },
        numberMinus: {
          value: -1,
          canNumber: true
        },
        numberFloat: {
          value: 3.14,
          canNumber: true
        },
        numberInfinity: {
          value: Infinity,
          canNumber: true
        },
        numberNan: {
          value: NaN,
          canNumber: true
        },
        numberOct: {
          value: 2,
          canNumber: true
        },
        numberHex: {
          value: 0x03,
          canNumber: true
        },
        numberBigger: {
          value: Number.MAX_VALUE,
          canNumber: true
        },
        numberSmallest: {
          value: Number.MIN_VALUE,
          canNumber: true
        },
        numberPositiveInfinity: {
          value: Number.POSITIVE_INFINITY,
          canNumber: true
        },
        numberNegativeInfinity: {
          value: Number.NEGATIVE_INFINITY,
          canNumber: true
        },
        stringEmpty: {
          value: '',
          canNumber: false
        },
        stringA: {
          value: 'a',
          canNumber: false
        },
        stringALarge: {
          value: 'A',
          canNumber: false
        },
        stringOne: {
          value: '1',
          canNumber: true
        },
        stringZero: {
          value: '0',
          canNumber: true
        },
        stringMix: {
          value: '100a',
          canNumber: false
        },
        symbolValue: {
          value: Symbol('foo'),
          canNumber: false
        },
        symbolIterator: {
          value: Symbol.iterator,
          canNumber: false
        },
        object: {
          value: {},
          canNumber: false
        },
        objectValue: {
          value: { a: 1, b: 2 },
          canNumber: false
        },
        array: {
          value: [],
          canNumber: false
        },
        arrayValue: {
          value: [1, 2, 3],
          canNumber: false
        },
        function: {
          value: f,
          canNumber: false
        },
        functionAllow: {
          value: fAllow,
          canNumber: false
        }
      };
    }
  }]);

  return MochaTester;
}();

exports.default = MochaTester;