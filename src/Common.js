export default class Common {
  static existsArg (v) {
    return v === undefined
  }

  static canNumber (v) {
    switch (typeof v) {
      case 'number':
        return true
      case 'string':
        return v === parseFloat(v).toString() && isFinite(v)
      default:
        return false
    }
  }

  static hasDataObject (v) {
    if (!v) return false
    return typeof (v) !== 'object' || Object.keys(v).length !== 0
  }

  // Object
  static valueObject (object, key, def) {
    if (typeof object !== 'object') return def
    if (object && key in object) return object[key]
    return def
  }

  static copyObject (object) {
    return Object.assign({}, object)
  }

  static matchUrl (str, options = {}) {
    // urlを一覧で取得(javscript用にエスケープ文字も追加している)
    const httpRegexp = new RegExp('https?:[\\\\/]+[\\w/:%#\\$&\\?\\(\\)~\\.=\\+\\-\\\\]+', 'g')
    let found = str.match(httpRegexp)

    if (options.isDeleteEscape) {
      const escapeRegexp = new RegExp('\\\\', 'g')
      for (let i in found) {
        found[i] = found[i].replace(escapeRegexp, '')
      }
    }
    return found
  }

  static fillObject (obj, sample, options = {}) {
    let _obj = obj ? this.copyObject(obj) : {}
    for (let key in sample) {
      if (_obj[key] === undefined) {
        _obj[key] = sample[key]
      } else {
        if (typeof obj[key] === 'object' && obj[key] !== null && typeof sample[key] === 'object') {
          _obj[key] = this.fillObject(_obj[key], sample[key], options)
        }
      }
    }

    if (options.isPrune === true) {
      _obj = this.pruneObject(_obj, sample, options)
    }

    return _obj
  }

  static pruneObject (obj, sample, options = {}) {
    let _obj = obj ? this.copyObject(obj) : {}

    for (let key in _obj) {
      if (sample[key] === undefined) {
        delete _obj[key]
      } else {
        if (typeof _obj[key] === 'object' && _obj[key] !== null && typeof sample === 'object') {
          _obj[key] = this.pruneObject(_obj[key], sample[key], options)
        }
      }
    }
    return _obj
  }

  static randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // ==================================================
  // node
  // ==================================================
  static getArgumentNode () {
    return process.argv[0]
  }

  static getArgumentCurrent () {
    return process.argv[1]
  }

  static getArgumentValue (index) {
    if (index !== 0 && !index) return process.argv.slice(2)
    return this.valueObject(process.argv, 2 + index, undefined)
  }

  static addNodePathEnv (path) {
    if ('NODE_PATH' in process.env && process.env) {
      process.env.NODE_PATH = process.env.NODE_PATH + ';' + path
    } else {
      process.env.NODE_PATH = path
    }
    require('module')._initPaths()
  }

  static getMatches (values, pattern) {
    let hits = []
    for (let i in values) {
      let matches = values[i].match(pattern)
      if (matches !== null) {
        matches.forEach(match => hits.push(match))
      }
    }
    return hits || null
  }

  static getMaxLengthStr (strings) {
    let maxLength = 0
    for (let i in strings) {
      let length = strings[i].length
      if (length > maxLength) maxLength = length
    }
    return maxLength
  }

  static fillStr (str, length, fill = '0') {
    let fillLength = fill.length
    if (fillLength === 0) {
      return str
    }
    let strLength = str.length
    if (strLength > length) {
      return str.substr(-length)
    }

    let prefix = fill.repeat(Math.ceil(length / fillLength))
      .substr(0, length - strLength)
    return prefix + str
  }
}
