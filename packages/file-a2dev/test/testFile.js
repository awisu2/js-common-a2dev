const assert = require('assert')
const File = require('../index.js')
const fs = require('fs-extra')
const path = require('path')
const sep = path.sep

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
        '.testDirectory' + sep + 'b' + sep + 'e',
        '.testDirectory' + sep + 'b' + sep + 'h._123',
        '.testDirectory' + sep + 'f'
      ],
      directories: [
        '.testDirectory' + sep + 'a',
        '.testDirectory' + sep + 'b',
        '.testDirectory' + sep + 'b' + sep + 'c',
        '.testDirectory' + sep + 'b' + sep + 'd'
      ]
    }, 'not correct get')

    // with systemfile
    reads = File.deepReaddirSync(TEST_DIR, {ignoreSystemFile: false})
    assert.deepEqual(reads, {
      files: [
        '.testDirectory' + sep + 'b' + sep + '.DS_Store',
        '.testDirectory' + sep + 'b' + sep + '._g',
        '.testDirectory' + sep + 'b' + sep + 'e',
        '.testDirectory' + sep + 'b' + sep + 'h._123',
        '.testDirectory' + sep + 'f'
      ],
      directories: [
        '.testDirectory' + sep + 'a',
        '.testDirectory' + sep + 'b',
        '.testDirectory' + sep + 'b' + sep + 'c',
        '.testDirectory' + sep + 'b' + sep + 'd'
      ]
    }, 'not correct get with ignoreSystemFile')

    // relative
    reads = File.deepReaddirSync(TEST_DIR, {isRelative: true})
    assert.deepEqual(reads, {
      files: [
        'b' + sep + 'e',
        'b' + sep + 'h._123',
        'f'
      ],
      directories: [
        'a',
        'b',
        'b' + sep + 'c',
        'b' + sep + 'd'
      ]
    }, 'not correct get with isReative')

    // with systemfile
    reads = File.deepReaddirSync(TEST_DIR, {maxDeep: 0})
    assert.deepEqual(reads, {
      files: [
        '.testDirectory' + sep + 'f'
      ],
      directories: [
        '.testDirectory' + sep + 'a',
        '.testDirectory' + sep + 'b'
      ]
    }, 'not correct get with isReative')

    removeTestDir(FILES)
  })

  it('canWrite', () => {
    makeTestFiles(FILES)

    assert.ok(!File.canWrite(TEST_DIR), 'directory can not write')
    assert.ok(!File.canWrite(TEST_DIR + '/a'), 'directory can not write')

    assert.ok(File.canWrite(TEST_DIR + '/f'), 'file can write')
    assert.ok(File.canWrite(TEST_DIR + '/b/._g'), 'file can write')

    assert.ok(File.canWrite(TEST_DIR + '/a/zzzzz'), 'can write')
    assert.ok(!File.canWrite(TEST_DIR + '/a/zz/zzzzz'), 'can not write no directory')

    removeTestDir(FILES)
  })
})
