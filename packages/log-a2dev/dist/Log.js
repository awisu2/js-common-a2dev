'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fileA2dev = require('file-a2dev');

var _fileA2dev2 = _interopRequireDefault(_fileA2dev);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Log = function () {
  _createClass(Log, [{
    key: 'canWrite',
    get: function get() {
      return this._canWrite;
    }
  }]);

  function Log(file) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Log);

    this._file = file;
    this._dateFormat = 'dateFormat' in options ? options.dateFormat : 'YYYY-MM-DD HH:MM:SS';
    this._canWrite = _fileA2dev2.default.canWrite(this._file);
  }

  _createClass(Log, [{
    key: 'append',
    value: function append(log) {
      var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!this.canWrite) return;

      var time = '';
      if (this._dateFormat) {
        d = d || new Date();
        time = d.format(this._dateFormat);
        if (time) time += ' ';
      }
      _fs2.default.appendFileSync(this._file, time + log + '\n');
    }
  }]);

  return Log;
}();

exports.default = Log;