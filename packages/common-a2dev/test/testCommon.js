const assert = require('assert')
const Common = require('../index.js')
const Tester = require('mochatester-a2dev')

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

    assert.equal(Common.fillStr('1', 2), '01')
    assert.equal(Common.fillStr(1, 2), '01')
  })

  it('randomInt', () => {
    const min = 33
    const max = 1932
    let isOk = true
    let isMin = false
    let isMax = false
    for (let i = 0; i < 100000; i++) {
      let rand = Common.randomInt(min, max)
      if (rand < min && rand > max) {
        isOk = false
        break
      }
      if (rand === max) isMin = true
      if (rand === max) isMax = true
    }
    assert.ok(isOk, 'out of range')
    assert.ok(isMin, 'no get min')
    assert.ok(isMax, 'no get max')
  })

  it('typeString', () => {
    let values = Tester.testValues
    for (let i in values) {
      assert.equal(
        Common.typeString(values[i].value),
        values[i].typeString,
        'not equal ' + i
      )
    }
  })

  it('isObject', () => {
    let values = Tester.testValues
    for (let i in values) {
      assert.equal(
        Common.isObject(values[i].value),
        values[i].typeString === Common.TYPE_STRING.OBJECT,
        'check missing ' + i
      )
    }
  })

  it('isArray', () => {
    let values = Tester.testValues
    for (let i in values) {
      assert.equal(
        Common.isArray(values[i].value),
        values[i].typeString === Common.TYPE_STRING.ARRAY,
        'check missing ' + i
      )
    }
  })

  it('isObjectArray', () => {
    let values = Tester.testValues
    for (let i in values) {
      assert.equal(
        Common.isObjectArray(values[i].value),
        Common.isObject(values[i].value) || Common.isArray(values[i].value),
        'check missing ' + i
      )
    }
  })

  it('betweenStr', () => {
    let str = 'zzzabc123defabc345def'
    assert.equal(Common.betweenStr(str, 'abc', 'def'), '123', 'check missing ' + str)
    assert.equal(Common.betweenStr(str, 'abc', 'def', {
      default: 'yyy',
      isHead: true
    }), 'yyy', 'error isHead default')
    assert.equal(Common.betweenStr(str, 'zzz', '123', {
      isHead: true
    }), 'abc', 'no get isHead')

    {
      let ans = ['zzzabc123', 'abc']
      ans.index = 0
      ans.input = str
      assert.deepEqual(Common.betweenStr(str, 'zzz', '123', {
        isHead: true,
        isDetail: true
      }), ans, 'no get isHead')
    }
    assert.deepEqual(Common.betweenStr(str, 'ert', 'gdd', {
      isHead: true,
      isDetail: true
    }), null, 'no get isHead')
  })

  it('DateFormat', () => {
    let d = new Date('2012-01-02T03:04:05')
    assert.equal(d.format('YYYY'), '2012')
    assert.equal(d.format('YY'), '2012')
    assert.equal(d.format('MM'), '01')
    assert.equal(d.format('M'), '1')
    assert.equal(d.format('DD'), '02')
    assert.equal(d.format('D'), '2')
    assert.equal(d.format('HH'), '03')
    assert.equal(d.format('H'), '3')
    assert.equal(d.format('mm'), '04')
    assert.equal(d.format('m'), '4')
    assert.equal(d.format('SS'), '05')
    assert.equal(d.format('S'), '5')
    assert.equal(d.format('YYYY-MM-DD HH:mm:SS'), '2012-01-02 03:04:05')
  })

  it('escapeRegStr', () => {
    assert.equal(Common.escapeRegStr('[abc] ggs()da'), '\\[abc\\] ggs\\(\\)da')
  })

  it('replaceDisallowStringFileName', () => {
    {
      let r = Common.replaceDisallowStringFileName('<abc\\def:ghi*jkl?mno"pqr|stu>')
      assert.equal(r, 'abcdefghijklmnopqrstu')
    }
    {
      let r = Common.replaceDisallowStringFileName('<abc\\def:ghi*jkl?mno"pqr|stu>', '_')
      assert.equal(r, '_abc_def_ghi_jkl_mno_pqr_stu_')
    }
  })
})
