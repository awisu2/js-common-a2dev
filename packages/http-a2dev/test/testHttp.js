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
})
