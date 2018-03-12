import assert from 'assert'
const Common = require('./Common.js').default

export default class MochaTester {
  // all of testValues
  static get testValues () {
    let arr = {}
    let f = function () {}
    let fAllow = () => {}

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
        value: 0o02,
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
        value: {a: 1, b: 2},
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
    }
  }

  static existsKeyAssert (key, data) {
    let isExists = key in data
    assert.ok(isExists, `exists '${key}' in data. ` + JSON.stringify(data))
    return isExists
  }

  static isErrorWithDone (done, err) {
    if (err) {
      this.error(err)
      return true
    }
    return false
  }
}
