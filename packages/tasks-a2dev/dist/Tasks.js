'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Common = require('common-a2dev');
var fs = require('fs');

var TaskStatusConfig = function () {
  _createClass(TaskStatusConfig, [{
    key: 'separator',
    get: function get() {
      return this._separator;
    }
  }, {
    key: 'status',
    get: function get() {
      return this._status;
    }
  }]);

  function TaskStatusConfig() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, TaskStatusConfig);

    options = Common.fillObject(options, {
      separator: {
        before: '[',
        after: ']'
      },
      status: {
        start: 's',
        error: 'e',
        end: 'o'
      }
    });
    this._separator = options.separator;
    this._status = options.status;
  }

  return TaskStatusConfig;
}();

var TaskStatus = function () {
  _createClass(TaskStatus, [{
    key: 'config',
    get: function get() {
      return this._coonfig;
    },
    set: function set(v) {
      this._coonfig = v;
    }
  }, {
    key: 'status',
    get: function get() {
      return this._status;
    }
  }, {
    key: 'isStart',
    get: function get() {
      return this._status === this._config.status.start;
    }
  }, {
    key: 'isEnd',
    get: function get() {
      return this._status === this._config.status.end;
    }
  }, {
    key: 'isError',
    get: function get() {
      return this._status === this._config.status.error;
    }
  }, {
    key: 'isFinish',
    get: function get() {
      return this.isEnd || this.isError;
    }
  }, {
    key: 'length',
    get: function get() {
      return this.toString().length;
    }
  }]);

  function TaskStatus(status) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TaskStatus);

    this._config = options.config || new TaskStatusConfig();
    this._status = status === undefined || status === null ? this._config.status.start : status;
  }

  _createClass(TaskStatus, [{
    key: 'toString',
    value: function toString() {
      return this._config.separator.before + this._status + this._config.separator.after;
    }
  }, {
    key: 'start',
    value: function start() {
      this._status = this._config.status.start;
    }
  }, {
    key: 'end',
    value: function end() {
      this._status = this._config.status.end;
    }
  }, {
    key: 'error',
    value: function error() {
      this._status = this._config.status.error;
    }
  }, {
    key: 'update',
    value: function update(status) {
      this._status = status;
    }
  }]);

  return TaskStatus;
}();

var TaskConfig = function () {
  _createClass(TaskConfig, [{
    key: 'statusConfig',
    get: function get() {
      return this._statusConfig;
    }
  }]);

  function TaskConfig() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, TaskConfig);

    this._statusConfig = options.statusConfig || new TaskStatusConfig();
  }

  return TaskConfig;
}();

var Task = function () {
  _createClass(Task, [{
    key: 'config',
    get: function get() {
      return this._coonfig;
    },
    set: function set(v) {
      this._coonfig = v;
    }
  }, {
    key: 'status',
    get: function get() {
      return this._status;
    }
  }, {
    key: 'text',
    get: function get() {
      return this._text;
    }
  }]);

  function Task(text) {
    var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Task);

    this._config = options.config || new TasksConfig();
    this._status = status || new TaskStatus(status, {
      options: this._config.statusConfig
    });
    this._text = text;
  }

  _createClass(Task, [{
    key: 'toString',
    value: function toString() {
      return this._status.toString() + this._text;
    }
  }], [{
    key: 'createByString',
    value: function createByString(str, config) {
      if (!config) config = new TaskConfig();

      // get status
      var info = Task.statusInfoByStr(str, config);
      var status = new TaskStatus(info.status, {
        options: config.statusConfig
      });

      // text
      var text = str.substr(info.length).trim();
      // console.log(str, info, '|' + status.status + '|', text)
      return new Task(text, status);
    }
  }, {
    key: 'statusInfoByStr',
    value: function statusInfoByStr(str, config) {
      // analyse status
      var match = Common.betweenStr(str, config.statusConfig.separator.before, config.statusConfig.separator.after, {
        isHead: true,
        isDetail: true
      });

      if (!match) {
        return {
          status: null,
          length: 0
        };
      }
      return {
        status: match[1],
        length: match[0].length
      };
    }
  }]);

  return Task;
}();

var TasksConfig = function () {
  _createClass(TasksConfig, [{
    key: 'taskConfig',
    get: function get() {
      return this._taskConfig;
    }
  }]);

  function TasksConfig() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, TasksConfig);

    this._taskConfig = options.taskConfig || new TaskConfig();
  }

  return TasksConfig;
}();

var Tasks = function () {
  _createClass(Tasks, [{
    key: 'config',
    get: function get() {
      return this._coonfig;
    },
    set: function set(v) {
      this._coonfig = v;
    }
  }, {
    key: 'tasks',
    get: function get() {
      return this._tasks;
    }
  }, {
    key: 'file',
    get: function get() {
      return this._file;
    }
  }]);

  function Tasks(tasks) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Tasks);

    this._config = options.config || new TasksConfig();

    // tasks
    this._tasks = tasks ? Common.isArray(tasks) ? tasks : [tasks] : [];

    // add tasks from file
    this._file = options.file || null;
    this.load();
  }

  _createClass(Tasks, [{
    key: 'load',
    value: function load() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      options = Common.fillObject(options, {
        isPush: true
      });

      if (!this._file) return;

      var tasks = this.parseByFile(this._file);
      if (options.isPush) {
        for (var i in tasks) {
          this._tasks.push(tasks[i]);
        }
      } else {
        this._tasks = tasks;
      }
    }
  }, {
    key: 'reload',
    value: function reload() {
      this._tasks = [];
      this.load({ isPush: false });
    }
  }, {
    key: 'parseByFile',
    value: function parseByFile(file) {
      if (!fs.existsSync(this._file)) return [];

      var data = fs.readFileSync(this._file);
      return Tasks.parseText(data.toString());
    }
  }, {
    key: 'add',
    value: function add(task) {
      this._tasks.push(task);
    }
  }, {
    key: 'concat',
    value: function concat(tasks) {
      this._tasks = this._tasks.concat(tasks);
    }
  }, {
    key: 'addByText',
    value: function addByText(text) {
      var tasks = Tasks.parseText(text);
      for (var i in tasks) {
        this.add(tasks[i]);
      }
    }
  }, {
    key: 'indexOfExists',
    value: function indexOfExists() {
      for (var i in this._tasks) {
        var task = this._tasks[i];
        if (!task.status.isFinish) return i;
      }
      return -1;
    }
  }, {
    key: 'get',
    value: function get(i) {
      return this._tasks[i];
    }
  }, {
    key: 'clear',
    value: function clear() {
      this._tasks = [];
    }
  }, {
    key: 'write',
    value: function write() {
      fs.writeFileSync(this._file, this.toString);
    }
  }, {
    key: 'indexOfSearch',
    value: function indexOfSearch(pattern) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      options = Common.fillObject(options, {
        isExists: true
      });

      for (var i in this._tasks) {
        var task = this._tasks[i];
        if (task.text.indexOf(pattern) === -1) continue;

        if (!options.isExists) return i;
        if (!task.status.isFinish) return i;
      }
      return -1;
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
  }], [{
    key: 'parseText',
    value: function parseText(text) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var taskConfig = config ? config.taskConfig : new TaskConfig();

      var lines = text.split('\n');
      var tasks = [];
      for (var i in lines) {
        if (!lines[i].trim()) continue;
        tasks.push(Task.createByString(lines[i], taskConfig));
      }
      return tasks;
    }
  }]);

  return Tasks;
}();

exports['TaskStatus'] = TaskStatus;
exports['Task'] = Task;
exports['Tasks'] = Tasks;

exports['TaskStatusConfig'] = TaskStatusConfig;
exports['TaskConfig'] = TaskConfig;
exports['TasksConfig'] = TasksConfig;