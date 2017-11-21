const assert = require('assert')
const Common = require('../dist/Common.js').default
const Tester = require('../dist/MochaTester').default

describe('Common', function () {
  it('copyObject', function () {
    let data = {
      a: 1,
      b: 2
    }
    let data2 = data
    data2.c = 3
    assert.deepEqual(data, data2, 'update copy object')

    let copy = Common.copyObject()
    copy.d = 4
    assert.notDeepEqual(data, copy, 'update copy object')
  })

  it('canNumber', function () {
    let testValues = Tester.testValues
    for (let key in testValues) {
      let testValue = testValues[key]
      assert.equal(Common.canNumber(testValue.value), testValue.canNumber,
        `canNumber ` + JSON.stringify(testValue.value) + ` is ${testValue.canNumber}`)
    }
  })

  it('fillObject', function () {
    let obj = {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: 4
      }
    }
    let sample = {
      a: 5,
      c: {
        d: 6,
        f: 7
      },
      g: {
        h: 8
      }
    }

    let objFill = Common.fillObject(obj, sample)
    assert.notDeepEqual(objFill, obj, 'obj changed')
    assert.deepEqual(objFill, {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: 4,
        f: 7
      },
      g: {
        h: 8
      }
    }, 'missing fill')
  })

  it('fillObjectWithPrue', function () {
    let obj = {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: 4
      }
    }
    let sample = {
      a: 5,
      c: {
        d: 6,
        f: 7
      },
      g: {
        h: 8
      }
    }

    let objFill = Common.fillObject(obj, sample, {isPrune: true})
    assert.notDeepEqual(objFill, obj, 'obj changed')
    assert.deepEqual(objFill, {
      a: 1,
      c: {
        d: 3,
        f: 7
      },
      g: {
        h: 8
      }
    }, 'missing fill')
  })

  it('pruneObject', function () {
    let obj = {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: 4
      }
    }
    let sample = {
      a: 5,
      c: {
        d: 6,
        f: 7
      },
      g: {
        h: 8
      }
    }

    let objPrune = Common.pruneObject(obj, sample)
    assert.notDeepEqual(objPrune, obj, 'obj changed')
    assert.deepEqual(objPrune, {
      a: 1,
      c: {
        d: 3
      }
    }, 'missing fill')
  })
})
