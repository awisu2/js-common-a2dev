'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Common = require('./Common').default;
var fs = require('fs');

var STATUS = {
  START: '-',
  END: 'o'
};

var Tasks = function () {
  _createClass(Tasks, [{
    key: 'status',
    get: function get() {
      return this._status;
    }
  }, {
    key: 'list',
    get: function get() {
      return this._list;
    }
  }]);

  function Tasks(file) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Tasks);

    options = Common.fillObject(options, {
      prefix: '[',
      suffix: ']',
      status: {
        start: STATUS.START,
        end: STATUS.END
      }
    });
    this._file = file;
    this._prefix = options.prefix;
    this._suffix = options.suffix;
    this._status = options.status;
    this._list = [];
  }

  _createClass(Tasks, [{
    key: 'parse',
    value: function parse() {
      var list = [];
      if (fs.existsSync(this._file)) {
        var data = fs.readFileSync(this._file);
        list = this.parseText(data.toString());
      }
      this._list = list;
      return this._list;
    }
  }, {
    key: 'parseTexts',
    value: function parseTexts(text) {
      var lines = text.split('\n');

      var tasks = [];
      for (var i in lines) {
        var line = lines[i];
        if (!line) continue;

        var task = this.parseLine(line);
        if (task) tasks.push(task);
      }

      return tasks;
    }
  }, {
    key: 'parseLine',
    value: function parseLine(line) {
      var status = Common.betweenStr(line, this._prefix, this._suffix, {
        isHead: true, default: this.status.start
      });

      var statusStr = this._prefix + status + this._suffix;
      var i = line.indexOf(statusStr) === 0 ? statusStr.length : 0;
      return this.createTask(status, line.substr(i));
    }
  }, {
    key: 'createTask',
    value: function createTask() {
      var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.status.start;
      var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      return {
        status: status,
        text: text
      };
    }
  }, {
    key: 'addTask',
    value: function addTask(task) {
      this._list.push(task);
    }
  }, {
    key: 'addTaskByText',
    value: function addTaskByText(text) {
      var tasks = this.parseTexts(text);
      for (var i in tasks) {
        this.addTask(tasks[i]);
      }
    }
  }, {
    key: 'updateStatus',
    value: function updateStatus(i, status) {
      this._list[i].status = status;
    }
  }, {
    key: 'indexOfExists',
    value: function indexOfExists() {
      var index = -1;
      for (var i in this._list) {
        if (this._list[i].status !== this.status.end) {
          index = i;
          break;
        }
      }
      return index;
    }
  }, {
    key: 'getTask',
    value: function getTask(index) {
      return this._list[index];
    }
  }, {
    key: 'toText',
    get: function get() {
      var text = '';
      for (var i in this._list) {
        var task = this._list[i];
        text += this._prefix + task.status + this._suffix + task.text + '\n';
      }
      return text;
    }
  }]);

  return Tasks;
}();

exports.default = Tasks;