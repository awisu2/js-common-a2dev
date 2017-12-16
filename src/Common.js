export default class Common {
  static get TYPE_STRING () {
    return {
      UNDEFINED: '[object Undefined]',
      NULL: '[object Null]',
      BOOLEAN: '[object Boolean]',
      NUMBER: '[object Number]',
      STRING: '[object String]',
      SYMBOL: '[object Symbol]',
      OBJECT: '[object Object]',
      ARRAY: '[object Array]',
      FUNCTION: '[object Function]'
    }
  }

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
        if (this.isObjectArray(_obj[key])) {
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
        if (this.isObjectArray(_obj[key])) {
          _obj[key] = this.pruneObject(_obj[key], sample[key], options)
        }
      }
    }
    return _obj
  }

  static randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  static typeString (v) {
    return Object.prototype.toString.call(v)
  }

  static isObject (v) {
    return this.typeString(v) === this.TYPE_STRING.OBJECT
  }

  static isArray (v) {
    return this.typeString(v) === this.TYPE_STRING.ARRAY
  }

  static isObjectArray (v) {
    return typeof v === 'object' && v !== null
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
    if (typeof str !== 'string') str = str.toString()

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

  static betweenStr (str, prefix, suffix, options = {}) {
    options = Common.fillObject(options, {
      default: '',
      isHead: false,
      isDetail: false
    })
    let regStr = this.escapeRegStr(prefix) + '(.*?)' + this.escapeRegStr(suffix)
    if (options.isHead) regStr = '^' + regStr
    let reg = new RegExp(regStr)
    let match = str.match(reg)

    // when not match
    if (!match) return options.isDetail ? null : options.default

    // return
    return options.isDetail ? match : match[1]
  }

  // escapeRegStr
  // strs: \ * + . ? { } ( ) [ ] ^ $ - | /
  static escapeRegStr (str) {
    let reg = new RegExp('([\\\\*\\+\\.\\?\\{\\}\\(\\)\\[\\]\\^\\$\\-\\|\\/])', 'g')
    return str.replace(reg, '\\$&')
  }
}

Date.prototype.format = function (format) {
  if (!format) return ''

  let year = this.getFullYear()
  let month = this.getMonth() + 1
  let day = this.getDate()
  let hour = this.getHours()
  let minutes = this.getMinutes()
  let second = this.getSeconds()

  let yearF = year
  let monthF = Common.fillStr(month, 2)
  let dayF = Common.fillStr(day, 2)
  let hourF = Common.fillStr(hour, 2)
  let minutesF = Common.fillStr(minutes, 2)
  let secondF = Common.fillStr(second, 2)

  return format.replace(/YYYY/g, yearF)
    .replace(/MM/g, monthF)
    .replace(/DD/g, dayF)
    .replace(/HH/g, hourF)
    .replace(/mm/g, minutesF)
    .replace(/SS/g, secondF)
    .replace(/YY/g, year)
    .replace(/M/g, month)
    .replace(/D/g, day)
    .replace(/H/g, hour)
    .replace(/m/g, minutes)
    .replace(/S/g, second)
}
