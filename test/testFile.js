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
      e: 'foo',
      '._g': null,
      'h._123': null,
      '.DS_Store': null
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

  it('isSystemfile', () => {
    assert.ok(File.isSystemfile('._123'))
    assert.ok(File.isSystemfile('.DS_Store'))
    assert.ok(!File.isSystemfile('__.DS_Store'))
    assert.ok(!File.isSystemfile('__._345'))
  })

  it('makeFilesCheckFiles', () => {
    removeTestDir(FILES)

    File.makeFiles(FILES)

    let errors = File.checkFiles(FILES)
    assert.equal(errors, null, 'check misssing' + errors)

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
        '.testDirectory/b/h._123',
        '.testDirectory/f'
      ],
      directories: [
        '.testDirectory/a',
        '.testDirectory/b',
        '.testDirectory/b/c',
        '.testDirectory/b/d'
      ]
    }, 'not correct get')

    // with systemfile
    reads = File.deepReaddirSync(TEST_DIR, {ignoreSystemFile: false})
    assert.deepEqual(reads, {
      files: [
        '.testDirectory/b/.DS_Store',
        '.testDirectory/b/._g',
        '.testDirectory/b/e',
        '.testDirectory/b/h._123',
        '.testDirectory/f'
      ],
      directories: [
        '.testDirectory/a',
        '.testDirectory/b',
        '.testDirectory/b/c',
        '.testDirectory/b/d'
      ]
    }, 'not correct get with ignoreSystemFile')
    removeTestDir(FILES)
  })
})
