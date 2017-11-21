'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Http = function () {
  function Http() {
    _classCallCheck(this, Http);
  }

  _createClass(Http, null, [{
    key: 'request',
    value: function request(url) {
      var _this = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      options = _Common2.default.fillObject(options, {
        method: 'GET',
        isRedirect: true
      });

      return new Promise(function (resolve, reject) {
        var urlParse = _url2.default.parse(url);
        var isHttps = urlParse.protocol === 'https:';

        // send data
        var path = urlParse.path;
        var sendData = '';
        if (options.method === 'GET') {
          path = _this.createPathForGet(path, data);
        } else {
          sendData = data ? JSON.stringify(data) : '';
        }

        // options
        var headers = options.headers || {};
        headers['Content-Type'] = headers['Content-Type'] || 'application/json';
        headers['Content-Length'] = sendData.length;

        var _options = {
          host: urlParse.hostname,
          port: options.port || (isHttps ? 443 : 80),
          path: path,
          method: options.method,
          headers: headers

          // request
        };var http = urlParse.protocol === 'https:' ? _https2.default : _http2.default;
        var request = http.request(_options, function (res) {
          var body = '';
          res.on('data', function (chunk) {
            body += chunk;
          });
          var isRedirect = false;
          switch (res.statusCode) {
            case 301: // Moved Permanently
            case 302: // Found
            case 303: // See Other
            case 307: // Temporary Redirect
            case 308:
              // Permanent Redirect
              if (options.isRedirect === true && url !== res.headers.location) {
                isRedirect = true;
                _this.request(res.headers.location, data, options).then(function (data) {
                  return resolve(data);
                }).catch(function (err) {
                  return reject(err);
                });
              } else {
                resolve(_this.httpRequestResponse(res, body));
              }
              break;
            default:
              if (!res.headers || res.headers['content-length'] <= 0) {
                resolve(_this.httpRequestResponse(res, body));
              }
          }
          if (!isRedirect) {
            res.on('end', function () {
              resolve(_this.httpRequestResponse(res, body));
            });
          }
        });
        request.on('error', function (err) {
          return reject(err);
        });
        if (sendData) request.write(sendData);
        request.end();
      });
    }
  }, {
    key: 'createPathForGet',
    value: function createPathForGet(path, data) {
      if (data && Object.keys(data).length > 0) {
        var queries = [];
        for (var key in data) {
          queries.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        path += (path.indexOf('?') === -1 ? '?' : '&') + queries.join('&');
      }
      return path;
    }
  }, {
    key: 'httpRequestResponse',
    value: function httpRequestResponse(response, body) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return {
        statusCode: response.statusCode,
        headers: response.headers,
        body: body
      };
    }
  }]);

  return Http;
}();

exports.default = Http;