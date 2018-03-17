const assert = require('assert')
const Tester = require('../dist/MochaTester').default

describe('MochaTester', () => {
  it('testValues', () => {
    let values = Tester.testValues
    assert.ok(values, 'no testValues. values:' + JSON.stringify(values))
  })

  it('testValuesType', () => {
    let values = Tester.testValues
    for (let i in values) {
      assert.equal(typeof values[i].value, values[i].type, i + ' is not typeof ' + values[i].type)
    }
  })
})
