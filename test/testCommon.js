const assert = require('assert')
const Common = require('../dist/Common.js').default
const Tester = require('../dist/MochaTester').default

describe('Common', () => {
  it('copyObject', () => {
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

  it('canNumber', () => {
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
        d: 'abc',
        e: 4
      },
      i: null
    }
    let sample = {
      a: 5,
      c: {
        d: null,
        f: 7
      },
      g: {
        h: 8
      },
      i: null
    }

    let objFill = Common.fillObject(obj, sample)
    assert.notDeepEqual(objFill, obj, 'obj changed')
    assert.deepEqual(objFill, {
      a: 1,
      b: 2,
      c: {
        d: 'abc',
        e: 4,
        f: 7
      },
      g: {
        h: 8
      },
      i: null
    }, 'missing fill')
  })

  it('fillObjectWithPrue', function () {
    let obj = {
      a: 1,
      b: 'abc',
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

  it('pruneObject', () => {
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
        d: 'abc',
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

  it('matchUrl', () => {
    let str = 'abdgshttps://a.com dgjka;dgjaggdsjg;djg;dsajgk;ajg;d¥nhttp:\\/\\/\\123.a.sam"sjag;ldjsghsgjkapewojrw97895034u6;l'

    let matches = Common.matchUrl(str)
    assert.equal(matches[0], 'https://a.com')
    assert.equal(matches[1], 'http:\\/\\/\\123.a.sam')

    matches = Common.matchUrl(str, {isDeleteEscape: true})
    assert.equal(matches[0], 'https://a.com')
    assert.equal(matches[1], 'http://123.a.sam')
  })

  it('getMatches', () => {
    let values = [
      'ab12cd345efg',
      'abcd678efg',
      '90abcdefg12',
      'abcdefg'
    ]

    let matches = Common.getMatches(values, new RegExp('[0-9]+'))
    assert.deepEqual(matches, [
      '12',
      '678',
      '90'
    ])

    matches = Common.getMatches(values, new RegExp('[0-9]+', 'g'))
    assert.deepEqual(matches, [
      '12',
      '345',
      '678',
      '90',
      '12'
    ])
  })

  it('getMaxLengthStr', () => {
    let strings = [
      'abc',
      'defghij',
      'klmnopq',
      'rstu',
      'vwxyz',
      ''
    ]

    let length = Common.getMaxLengthStr(strings)
    assert.equal(length, 7)
  })

  it('fillStr', () => {
    let str = 'abc'
    assert.equal(Common.fillStr(str, 10), '0000000abc')
    assert.equal(Common.fillStr(str, 10, '1234'), '1234123abc')
  })
})
