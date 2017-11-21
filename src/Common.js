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
}
