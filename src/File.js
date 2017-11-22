import fs from 'fs'
import path from 'path'
import Common from './Common'

export default class File {
  static setSeparator (target) {
    if (target.slice(-1) !== path.sep) target += path.sep
    return target
  }

  // 再帰的にファイル読み込み
  static deepReaddirSync (target, options = {}) {
    options = Common.fillObject(options, {
      maxDeep: 5,
      deep: 0
    })

    let reads = {
      files: [],
      directories: []
    }

    // check max deep
    if (options.deep >= options.maxDeep) {
      return reads
    }

    // add file separator
    target = this.setSeparator(target)

    // read files
    let files = fs.readdirSync(target)
    for (let i in files) {
      let targetFull = target + files[i]
      let stat = fs.statSync(targetFull)
      if (stat.isFile()) {
        reads.files.push(targetFull)
      } else if (stat.isDirectory()) {
        reads.directories.push(targetFull)
        ++options.deep
        let _reads = this.deepReaddirSync(targetFull, options)
        --options.deep
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
      if (typeof data === 'object') {
        fs.mkdirSync(target)
        if (Object.keys(data).length > 0) {
          this.makeFiles(data, target)
        }
      } else {
        fs.writeFileSync(target, data)
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
        if (typeof files[i] === 'object') {
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
    let oldPath = file
    let newPath = oldPath.replace(pattern, replace)
    if (oldPath !== newPath) {
      fs.renameSync(oldPath, newPath)
      change = {
        old: oldPath,
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
      let change = File.renameSyncBySearch(files[i], numberRegexp, (match) => {
        return Common.fillStr(match, maxLength)
      })
      if (change) changes.push(change)
    }

    // logs
    return changes.length === 0 ? null : changes
  }
}
