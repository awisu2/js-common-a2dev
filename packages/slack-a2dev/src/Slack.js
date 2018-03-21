let http = require('http-a2dev')

export default class Slack {
  get webhookURL () { return this._webhookURL }

  constructor (options = {}) {
    this._webhookURL = options.webhookURL || ''
  }

  post (text, options = {}) {
    return http.post(this._webhookURL, {'text': text})
  }
}
