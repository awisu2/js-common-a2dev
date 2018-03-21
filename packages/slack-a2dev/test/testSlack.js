const assert = require('assert')
const Slack = require('../index.js')

const WEBHOOKURL = ''

describe('Slack', () => {
  it('post', done => {
    if (!WEBHOOKURL) {
      done()
      return
    }

    let slack = new Slack({webhookURL: WEBHOOKURL})
    slack.post("test Slack post")
      .then(data => {
        done()
      })
      .catch(err => done(err))
  })
})
