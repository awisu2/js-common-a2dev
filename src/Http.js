import HTTP from 'http'
import HTTPS from 'https'
import URL from 'url'
import Common from './Common'
import request from 'request'
import fs from 'fs'

export default class Http {
  static request (url, data = null, options = {}) {
    options = Common.fillObject(options, {
      method: 'GET',
      isRedirect: true
    })

    return new Promise((resolve, reject) => {
      let urlParse = URL.parse(url)
      let isHttps = urlParse.protocol === 'https:'

      // send data
      let path = urlParse.path
      let sendData = ''
      if (options.method === 'GET') {
        path = this.createPathForGet(path, data)
      } else {
        sendData = data ? JSON.stringify(data) : ''
      }

      // options
      let headers = options.headers || {}
      headers['Content-Type'] = headers['Content-Type'] || 'application/json'
      headers['Content-Length'] = sendData.length

      let _options = {
        host: urlParse.hostname,
        port: options.port || (isHttps ? 443 : 80),
        path: path,
        method: options.method,
        headers: headers
      }

      // request
      let http = urlParse.protocol === 'https:' ? HTTPS : HTTP
      const request = http.request(_options, (res) => {
        let body = ''
        res.on('data', chunk => {
          body += chunk
        })
        let isRedirect = false
        switch (res.statusCode) {
          case 301: // Moved Permanently
          case 302: // Found
          case 303: // See Other
          case 307: // Temporary Redirect
          case 308: // Permanent Redirect
            if (options.isRedirect === true && url !== res.headers.location) {
              isRedirect = true
              this.request(res.headers.location, data, options)
                .then(data => resolve(data))
                .catch(err => reject(err))
            } else {
              resolve(this.httpRequestResponse(res, body))
            }
            break
          default:
            if (!res.headers || res.headers['content-length'] <= 0) {
              resolve(this.httpRequestResponse(res, body))
            }
        }
        if (!isRedirect) {
          res.on('end', () => {
            resolve(this.httpRequestResponse(res, body))
          })
        }
      })
      request.on('error', err => reject(err))
      if (sendData) request.write(sendData)
      request.end()
    })
  }

  static createPathForGet (path, data) {
    if (data && Object.keys(data).length > 0) {
      let queries = []
      for (let key in data) {
        queries.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      }
      path += (path.indexOf('?') === -1 ? '?' : '&') + queries.join('&')
    }
    return path
  }

  static httpRequestResponse (response, body, options = {}) {
    return {
      statusCode: response.statusCode,
      headers: response.headers,
      body: body
    }
  }

  static downloadFile (url, filename, options = {}) {
    return new Promise((resolve, reject) => {
      request(url, options)
        .pipe(fs.createWriteStream(filename))
        .on('close', () => {
          resolve()
        })
        .on('error', (err) => {
          reject(err)
        })
    })
  }
}
