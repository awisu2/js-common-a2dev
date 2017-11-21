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
})
