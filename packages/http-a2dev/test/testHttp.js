const assert = require('assert')
const Http = require('../index.js')

const URL = 'http://www.google.co.jp/'

describe('Http', () => {
  it('request', done => {
    Http.request(URL)
      .then(data => {
        done()
      })
      .catch(err => done(err))
  })

  it('METHOD', done => {
    let METHOD = Http.METHOD

    let checkMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
    for (let i in checkMethods) {
      assert.ok(checkMethods[i] in METHOD, 'HTTP.METHOD not have ' + checkMethods[i])
    }
    done()
  })

  it('get', done => {
    Http.get(URL)
      .then(data => {
        done()
      })
      .catch(err => done(err))
  })
})
