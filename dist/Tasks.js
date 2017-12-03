'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Common = require('./Common').default;
var fs = require('fs');

var STATUS = {
  START: 's',
  ERROR: 'e',
  END: 'o'
};

var STATUS_SEPARATOR = {
  BEFORE: '[',
  AFTER: ']'
};

var TaskStatus = function () {
  _createClass(TaskStatus, [{
    key: 'status',
    get: function get() {
      return this._status;
    }
  }, {
    key: 'length',
    get: function get() {
      return this.toString().length;
    }
  }, {
    key: 'isEnd',
    get: function get() {
      return this._status === STATUS.END;
    }
  }, {
    key: 'isError',
    get: function get() {
      return this._status === STATUS.ERROR;
    }
  }]);

  function TaskStatus() {
    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : STATUS.START;

    _classCallCheck(this, TaskStatus);

    if (status === undefined || status === null) status = STATUS.START;
    this._status = status;
  }

  _createClass(TaskStatus, [{
    key: 'toString',
    value: function toString() {
      return STATUS_SEPARATOR.BEFORE + this._status + STATUS_SEPARATOR.AFTER;
    }
  }, {
    key: 'end',
    value: function end() {
      this._status = STATUS.END;
    }
  }, {
    key: 'error',
    value: function error() {
      this._status = STATUS.ERROR;
    }
  }, {
    key: 'update',
    value: function update(status) {
      this._status = status;
    }
  }]);

  return TaskStatus;
}();

var Task = function () {
  _createClass(Task, [{
    key: 'status',
    get: function get() {
      return this._status;
    }
  }, {
    key: 'text',
    get: function get() {
      return this._text;
    }
  }], [{
    key: 'createByString',
    value: function createByString(str) {
      var statusStr = Common.betweenStr(str, STATUS_SEPARATOR.BEFORE, STATUS_SEPARATOR.AFTER, {
        isHead: true,
        default: null
      });

      var status = new TaskStatus(statusStr);
      var text = str.substr(statusStr ? status.length : 0).trim();
      return new Task(text, status);
    }
  }]);

  function Task(text, status) {
    _classCallCheck(this, Task);

    if ((typeof status === 'undefined' ? 'undefined' : _typeof(status)) === 'object') {
      this._status = status;
    } else {
      this._status = new TaskStatus(status);
    }
    this._text = text;
  }

  _createClass(Task, [{
    key: 'toString',
    value: function toString() {
      return this._status.toString() + this._text;
    }
  }]);

  return Task;
}();

var Tasks = function () {
  _createClass(Tasks, [{
    key: 'tasks',
    get: function get() {
      return this._tasks;
    }
  }]);

  function Tasks(file) {
    _classCallCheck(this, Tasks);

    this._file = file;
    this._tasks = [];
    if (this._file && fs.existsSync(this._file)) {
      this._tasks = this.parse();
    }
  }

  _createClass(Tasks, [{
    key: 'parse',
    value: function parse() {
      var tasks = [];
      if (fs.existsSync(this._file)) {
        var data = fs.readFileSync(this._file);
        tasks = this.parseText(data.toString());
      }
      return tasks;
    }
  }, {
    key: 'parseText',
    value: function parseText(text) {
      var lines = text.split('\n');

      var tasks = [];
      for (var i in lines) {
        if (!lines[i]) continue;
        tasks.push(Task.createByString(lines[i]));
      }
      return tasks;
    }
  }, {
    key: 'addTask',
    value: function addTask(task) {
      this._tasks.push(task);
    }
  }, {
    key: 'addTaskByText',
    value: function addTaskByText(text) {
      var tasks = this.parseText(text);
      for (var i in tasks) {
        this.addTask(tasks[i]);
      }
    }
  }, {
    key: 'indexOfExists',
    value: function indexOfExists() {
      for (var i in this._tasks) {
        var task = this._tasks[i];
        if (!task.status.isEnd && !task.status.isError) {
          return i;
        }
      }
      return -1;
    }
  }, {
    key: 'getTask',
    value: function getTask(i) {
      return this._tasks[i];
    }
  }, {
    key: 'write',
    value: function write() {
      fs.writeFileSync(this._file, this.toText);
    }
  }, {
    key: 'toString',
    get: function get() {
      var str = '';
      for (var i in this._tasks) {
        str += this._tasks[i].toString() + '\n';
      }
      return str;
    }
  }]);

  return Tasks;
}();

exports['TaskStatus'] = TaskStatus;
exports['Task'] = Task;
exports['Tasks'] = Tasks;