const assert = require('assert')
const File = require('../dist/File.js').default
// const Tester = require('../dist/MochaTester').default
const fs = require('fs-extra')
const path = require('path')

const TEST_DIR = '.testDirectory'
const FILES = {
  [TEST_DIR]: {
    a: {},
    b: {
      c: {},
      d: {},
      e: 'foo'
    },
    f: 'bar'
  }
}
const FILES_DIFFERENT = {
  [TEST_DIR]: {
    a: {},
    b: {
      c: {},
      d: {},
      e: 'boo',
      h: {}
    },
    f: 'bar',
    g: {}
  }
}

const makeTestFiles = (files) => {
  removeTestDir(files)
  File.makeFiles(files)
}

const removeTestDir = () => {
  let target = '.' + path.sep + TEST_DIR
  if (fs.existsSync(target)) fs.removeSync(target)
}

describe('File', () => {
  it('setSeparator', () => {
    let target = File.setSeparator(TEST_DIR)
    assert.equal(target, TEST_DIR + path.sep)

    target = File.setSeparator(TEST_DIR)
    assert.equal(target, TEST_DIR + path.sep)
  })

  it('makeFilesCheckFiles', () => {
    removeTestDir(FILES)

    File.makeFiles(FILES)

    let errors = File.checkFiles(FILES)
    assert.equal(errors, null, 'error')

    errors = File.checkFiles(FILES_DIFFERENT)
    assert.notEqual(errors, null, 'has errors')
    assert.equal(errors.length, 3, 'different error number')
  })

  it('deepReaddirSync', () => {
    makeTestFiles(FILES)
    let reads = File.deepReaddirSync(TEST_DIR)
    assert.deepEqual(reads, {
      files: [
        '.testDirectory/b/e',
        '.testDirectory/f'
      ],
      directories: [
        '.testDirectory/a',
        '.testDirectory/b',
        '.testDirectory/b/c',
        '.testDirectory/b/d'
      ]
    }, 'not correct get')
    removeTestDir(FILES)
  })
})
