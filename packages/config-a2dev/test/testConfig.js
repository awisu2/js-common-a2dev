const assert = require('assert')
const Config = require('../index.js')

const myConfig = {
  default: {
    a: 1,
    b: {
      b1: 2,
      b2: 3
    }
  },
  dev: {
    a: 11, // over write
    b: {
      b1: Config.getEnv('b1', 12), // get from environment
      // b2: 3, // not set
      b3: 14// add
    },
    c: 13
  }
}

describe('Config', () => {
  it('create', () => {
    let config = Config.create(myConfig)
    assert.deepEqual(config, { a: 1, b: { b1: 2, b2: 3 } }, 'create')
  })

  it('createOnDev', () => {
    let config = Config.create(myConfig, {stage: 'dev'})
    assert.deepEqual(config, { a: 11, b: { b1: 12, b2: 3, b3: 14 }, c: 13 }, 'create')
  })
})
