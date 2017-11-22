'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var File = function () {
  function File() {
    _classCallCheck(this, File);
  }

  _createClass(File, null, [{
    key: 'setSeparator',
    value: function setSeparator(target) {
      if (target.slice(-1) !== _path2.default.sep) target += _path2.default.sep;
      return target;
    }

    // 再帰的にファイル読み込み

  }, {
    key: 'deepReaddirSync',
    value: function deepReaddirSync(target) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      options = _Common2.default.fillObject(options, {
        maxDeep: 5,
        deep: 0
      });

      var reads = {
        files: [],
        directories: []

        // check max deep
      };if (options.deep >= options.maxDeep) {
        return reads;
      }

      // add file separator
      target = this.setSeparator(target);

      // read files
      var files = _fs2.default.readdirSync(target);
      for (var i in files) {
        var targetFull = target + files[i];
        var stat = _fs2.default.statSync(targetFull);
        if (stat.isFile()) {
          reads.files.push(targetFull);
        } else if (stat.isDirectory()) {
          reads.directories.push(targetFull);
          ++options.deep;
          var _reads = this.deepReaddirSync(targetFull, options);
          --options.deep;
          reads.files = reads.files.concat(_reads.files);
          reads.directories = reads.directories.concat(_reads.directories);
        }
      }
      return reads;
    }
  }, {
    key: 'makeFiles',
    value: function makeFiles(filse) {
      var current = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';

      current = this.setSeparator(current);

      for (var i in filse) {
        var target = current + i;

        // create
        var data = filse[i];
        if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
          _fs2.default.mkdirSync(target);
          if (Object.keys(data).length > 0) {
            this.makeFiles(data, target);
          }
        } else {
          _fs2.default.writeFileSync(target, data);
        }
      }
    }
  }, {
    key: 'checkFiles',
    value: function checkFiles(files) {
      var current = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';

      current = this.setSeparator(current);

      var errors = [];
      for (var i in files) {
        var file = current + i;
        if (_fs2.default.existsSync(file)) {
          var stat = _fs2.default.statSync(file);
          if (_typeof(files[i]) === 'object') {
            if (stat.isDirectory()) {
              var _errors = this.checkFiles(files[i], file);
              if (_errors) errors = errors.concat(_errors);
            } else {
              errors.push('not directory ' + file);
            }
          } else {
            if (stat.isFile()) {
              // no check if null
              if (files[i] !== null) {
                var data = _fs2.default.readFileSync(file).toString();
                if (data !== files[i]) {
                  errors.push('different data in ' + file);
                }
              }
            } else {
              errors.push('not file ' + file);
            }
          }
        } else {
          errors.push('no exists ' + file);
        }
      }
      return errors.length > 0 ? errors : null;
    }
  }, {
    key: 'renameSyncBySearch',
    value: function renameSyncBySearch(file, pattern, replace) {
      var change = null;
      var dir = _path2.default.dirname(file);
      var name = _path2.default.basename(file);
      var newName = name.replace(pattern, replace);
      if (name !== newName) {
        var newPath = dir + _path2.default.sep + newName;
        _fs2.default.renameSync(file, newPath);
        change = {
          old: file,
          new: newPath
        };
      }
      return change;
    }
  }, {
    key: 'fillNumbersByMaxlengthUnderDirectory',
    value: function fillNumbersByMaxlengthUnderDirectory() {
      var directory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.';

      // get file names
      var _File$deepReaddirSync = File.deepReaddirSync(directory),
          files = _File$deepReaddirSync.files;

      // get maxLength by number


      var hits = _Common2.default.getMatches(files, new RegExp('[1-9][0-9]+', 'g'));
      var maxLength = _Common2.default.getMaxLengthStr(hits);

      // get maxLength
      var numberRegexp = new RegExp('[0-9]+', 'g');
      var changes = [];
      for (var i in files) {
        if (files[i].indexOf('._') === -1 && files[i].indexOf('.DS_Store') === -1) {
          var change = File.renameSyncBySearch(files[i], numberRegexp, function (match) {
            return _Common2.default.fillStr(match, maxLength);
          });
          if (change) changes.push(change);
        }
      }

      // logs
      return changes.length === 0 ? null : changes;
    }
  }]);

  return File;
}();

exports.default = File;