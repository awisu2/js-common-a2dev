import fs from 'fs'
import path from 'path'
import Common from './Common'

const SYSTEMFILE = [
  '._',
  '.DS_Store'
]

export default class File {
  static get SYSTEMFILE () { return SYSTEMFILE }

  static setSeparator (target) {
    if (target.slice(-1) !== path.sep) target += path.sep
    return target
  }

  // 再帰的にファイル読み込み
  static deepReaddirSync (base, options = {}) {
    options = Common.fillObject(options, {
      maxDeep: 5,
      ignoreSystemFile: true,
      isRelative: false,
      _deep: 0,
      _relative: ''
    })
    let {maxDeep, ignoreSystemFile, isRelative, _deep, _relative} = options

    let reads = {
      files: [],
      directories: []
    }

    // check max deep
    if (_deep > maxDeep) return reads

    // add file separator
    let target = this.setSeparator(base) + _relative

    // read files
    let files = fs.readdirSync(target)
    for (let i in files) {
      let targetFull = this.setSeparator(target) + files[i]
      let setPath = ''
      if (isRelative) {
        if (_relative) setPath = this.setSeparator(_relative)
        setPath += files[i]
      } else {
        setPath = targetFull
      }

      let stat = fs.statSync(targetFull)
      if (stat.isFile()) {
        if (!ignoreSystemFile || !this.isSystemfile(files[i])) {
          reads.files.push(setPath)
        }
      } else if (stat.isDirectory()) {
        reads.directories.push(setPath)

        // create next read option
        let _options = Common.copyObject(options)
        if (_options._relative) _options._relative = this.setSeparator(_options._relative)
        _options._relative += files[i]
        _options._deep++
        let _reads = this.deepReaddirSync(base, _options)

        reads.files = reads.files.concat(_reads.files)
        reads.directories = reads.directories.concat(_reads.directories)
      }
    }
    return reads
  }

  static makeFiles (filse, current = '.') {
    current = this.setSeparator(current)

    for (let i in filse) {
      let target = current + i

      // create
      let data = filse[i]
      if (typeof data === 'object' && data !== null) {
        fs.mkdirSync(target)
        if (Object.keys(data).length > 0) {
          this.makeFiles(data, target)
        }
      } else {
        fs.writeFileSync(target, data || '')
      }
    }
  }

  static checkFiles (files, current = '.') {
    current = this.setSeparator(current)

    let errors = []
    for (let i in files) {
      let file = current + i
      if (fs.existsSync(file)) {
        let stat = fs.statSync(file)
        if (typeof files[i] === 'object' && files[i] !== null) {
          if (stat.isDirectory()) {
            let _errors = this.checkFiles(files[i], file)
            if (_errors) errors = errors.concat(_errors)
          } else {
            errors.push('not directory ' + file)
          }
        } else {
          if (stat.isFile()) {
            // no check if null
            if (files[i] !== null) {
              let data = fs.readFileSync(file).toString()
              if (data !== files[i]) {
                errors.push('different data in ' + file)
              }
            }
          } else {
            errors.push('not file ' + file)
          }
        }
      } else {
        errors.push('no exists ' + file)
      }
    }
    return errors.length > 0 ? errors : null
  }

  static renameSyncBySearch (file, pattern, replace) {
    let change = null
    let dir = path.dirname(file)
    let name = path.basename(file)
    let newName = name.replace(pattern, replace)
    if (name !== newName) {
      let newPath = dir + path.sep + newName
      fs.renameSync(file, newPath)
      change = {
        old: file,
        new: newPath
      }
    }
    return change
  }

  static fillNumbersByMaxlengthUnderDirectory (directory = '.') {
    // get file names
    let {files} = File.deepReaddirSync(directory)

    // get maxLength by number
    let hits = Common.getMatches(files, new RegExp('[1-9][0-9]+', 'g'))
    let maxLength = Common.getMaxLengthStr(hits)

    // get maxLength
    const numberRegexp = new RegExp('[0-9]+', 'g')
    let changes = []
    for (let i in files) {
      if (files[i].indexOf('._') === -1 && files[i].indexOf('.DS_Store') === -1) {
        let change = File.renameSyncBySearch(files[i], numberRegexp, (match) => {
          return Common.fillStr(match, maxLength)
        })
        if (change) changes.push(change)
      }
    }

    // logs
    return changes.length === 0 ? null : changes
  }

  static isSystemfile (filename) {
    let isSystemfile = false
    for (let i in SYSTEMFILE) {
      if (filename.indexOf(SYSTEMFILE[i]) === 0) {
        isSystemfile = true
        break
      }
    }
    return isSystemfile
  }

  static canWrite (file) {
    if (fs.existsSync(file)) {
      return fs.statSync(file).isFile()
    }

    let dirname = path.dirname(file)
    if (fs.existsSync(dirname) && fs.statSync(dirname).isDirectory()) {
      return true
    }

    return false
  }
}
