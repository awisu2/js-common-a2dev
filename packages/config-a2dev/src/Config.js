import common from 'common-a2dev'

const STAGE = {
  DEFAULT: 'default'
}

export default class Config {
  static get STAGE () { return STAGE }

  static get isEnv () {
    if ('_isEnv' in this) return this._isEnv
    this._isEnv = process && Config.isExistsObject(process.env)
    return this._isEnv
  }

  // This function get value of Environment, if it can.
  static getEnv (key, def = null) {
    if (!Config.isEnv) return def
    return process.env[key]
  }

  static isExistsObject (v) {
    return typeof v === 'object' && v !== null
  }

  static create (config, options = {}) {
    let _config = {}

    // if not have setting return empty
    if (!Config.isExistsObject(config)) return _config

    // get default
    if (Config.isExistsObject(config[STAGE.DEFAULT])) _config = config[STAGE.DEFAULT]

    // options.stageに一致するconfigが存在するかチェック
    if (!options.stage || !Config.isExistsObject(config[options.stage])) return _config

    // over write specific configulation
    _config = common.fillObject(_config, config[options.stage])
    return _config
  }

}
