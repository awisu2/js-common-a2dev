const assert = require('assert')
const Log = require('../index.js')
const File = require('file-a2dev')
const fs = require('fs-extra')
const path = require('path')

const TEST_DIR = '.testDirectory'
const FILES = {
  [TEST_DIR]: {
    log: null
  }
}

const makeTestFiles = () => {
  removeTestDir(FILES)
  File.makeFiles(FILES)
}

const removeTestDir = () => {
  let target = '.' + path.sep + TEST_DIR
  if (fs.existsSync(target)) fs.removeSync(target)
}

describe('Log', () => {
  it('append', () => {
    makeTestFiles()

    let file = TEST_DIR + path.sep + 'log.txt'
    {
      let log = new Log(file)
      log.append('abc 1')
      log.append('abc 2')
      log.append('abc 3')

      let data = fs.readFileSync(file).toString()
      assert.ok(data.indexOf('abc 2') > 0)
    }

    // second use
    {
      let log = new Log(file)
      log.append('abc 4')

      let data = fs.readFileSync(file).toString()
      assert.ok(data.indexOf('abc 2') > 0)
      assert.ok(data.indexOf('abc 4') > 0)
    }

    removeTestDir()
  })
})
