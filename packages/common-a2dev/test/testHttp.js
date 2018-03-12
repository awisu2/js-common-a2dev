const Http = require('../dist/Http.js').default

const URL = 'http://www.google.co.jp/'

describe('Http', () => {
  it('request', done => {
    Http.request(URL)
      .then(data => {
        done()
      })
      .catch(err => done(err))
  })
})
