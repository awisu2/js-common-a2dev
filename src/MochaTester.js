import assert from 'assert'

export default class MochaTester {
  // all of testValues
  static get testValues () {
    let arr = {}
    let f = function () {}
    let fAllow = () => {}

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
        value: 0o02,
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
        value: {a: 1, b: 2},
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
    }
  }

  static existsKeyAssert (key, data) {
    let isExists = key in data
    assert.ok(isExists, `exists '${key}' in data. ` + JSON.stringify(data))
    return isExists
  }

  static isErrorWithDone (err, done) {
    if (err) {
      done(err)
      return true
    }
    return false
  }
}
