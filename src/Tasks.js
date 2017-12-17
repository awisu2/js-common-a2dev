const Common = require('./Common').default
const fs = require('fs')

class TaskStatusConfig {
  get separator () { return this._separator }
  get status () { return this._status }

  constructor (options = {}) {
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
    })
    this._separator = options.separator
    this._status = options.status
  }
}

class TaskStatus {
  get config () { return this._coonfig }
  set config (v) { this._coonfig = v }

  get status () { return this._status }
  get isStart () { return this._status === this._config.status.start }
  get isEnd () { return this._status === this._config.status.end }
  get isError () { return this._status === this._config.status.error }
  get isFinish () { return this.isEnd || this.isError }

  get length () { return this.toString().length }

  constructor (status, options = {}) {
    this._config = options.config || new TaskStatusConfig()
    this._status = (status === undefined || status === null)
      ? this._config.status.start : status
  }

  toString () {
    return this._config.separator.before +
      this._status +
      this._config.separator.after
  }

  start () {
    this._status = this._config.status.start
  }

  end () {
    this._status = this._config.status.end
  }

  error () {
    this._status = this._config.status.error
  }

  update (status) {
    this._status = status
  }
}

class TaskConfig {
  get statusConfig () { return this._statusConfig }

  constructor (options = {}) {
    this._statusConfig = options.statusConfig || new TaskStatusConfig()
  }
}

class Task {
  get config () { return this._coonfig }
  set config (v) { this._coonfig = v }

  get status () { return this._status }
  get text () { return this._text }

  constructor (text, status = null, options = {}) {
    this._config = options.config || new TasksConfig()
    this._status = status || new TaskStatus(status, {
      options: this._config.statusConfig
    })
    this._text = text
  }

  static createByString (str, config) {
    if (!config) config = new TaskConfig()

    // get status
    let info = Task.statusInfoByStr(str, config)
    let status = new TaskStatus(info.status, {
      options: config.statusConfig
    })

    // text
    let text = str.substr(info.length).trim()
    // console.log(str, info, '|' + status.status + '|', text)
    return new Task(text, status)
  }

  static statusInfoByStr (str, config) {
    // analyse status
    let match = Common.betweenStr(str,
      config.statusConfig.separator.before,
      config.statusConfig.separator.after, {
        isHead: true,
        isDetail: true
      })

    if (!match) {
      return {
        status: null,
        length: 0
      }
    }
    return {
      status: match[1],
      length: match[0].length
    }
  }

  toString () {
    return this._status.toString() + this._text
  }
}

class TasksConfig {
  get taskConfig () { return this._taskConfig }

  constructor (options = {}) {
    this._taskConfig = options.taskConfig || new TaskConfig()
  }
}

class Tasks {
  get config () { return this._coonfig }
  set config (v) { this._coonfig = v }

  get tasks () { return this._tasks }
  get file () { return this._file }

  constructor (tasks, options = {}) {
    this._config = options.config || new TasksConfig()

    // tasks
    this._tasks = tasks
      ? (Common.isArray(tasks) ? tasks : [tasks])
      : []

    // add tasks from file
    this._file = options.file || null
    this.load()
  }

  load (options = {}) {
    options = Common.fillObject(options, {
      isPush: true
    })

    if (!this._file) return

    let tasks = this.parseByFile(this._file)
    if (options.isPush) {
      for (let i in tasks) {
        this._tasks.push(tasks[i])
      }
    } else {
      this._tasks = tasks
    }
  }

  reload () {
    this._tasks = []
    this.load({isPush: false})
  }

  parseByFile (file) {
    if (!fs.existsSync(this._file)) return []

    let data = fs.readFileSync(this._file)
    return Tasks.parseText(data.toString())
  }

  static parseText (text, config = null) {
    let taskConfig = config ? config.taskConfig : new TaskConfig()

    let lines = text.split('\n')
    let tasks = []
    for (let i in lines) {
      if (!lines[i].trim()) continue
      tasks.push(Task.createByString(lines[i], taskConfig))
    }
    return tasks
  }

  get toString () {
    let str = ''
    for (let i in this._tasks) {
      str += this._tasks[i].toString() + '\n'
    }
    return str
  }

  add (task) {
    this._tasks.push(task)
  }

  concat (tasks) {
    this._tasks = this._tasks.concat(tasks)
  }

  addByText (text) {
    let tasks = Tasks.parseText(text)
    for (let i in tasks) {
      this.add(tasks[i])
    }
  }

  indexOfExists () {
    for (let i in this._tasks) {
      let task = this._tasks[i]
      if (!task.status.isFinish) return i
    }
    return -1
  }

  get (i) {
    return this._tasks[i]
  }

  clear () {
    this._tasks = []
  }

  write () {
    fs.writeFileSync(this._file, this.toString)
  }

  indexOfSearch (pattern, options = {}) {
    options = Common.fillObject(options, {
      isExists: true
    })

    for (let i in this._tasks) {
      let task = this._tasks[i]
      if (task.text.indexOf(pattern) === -1) continue

      if (!options.isExists) return i
      if (!task.status.isFinish) return i
    }
    return -1
  }
}

exports['TaskStatus'] = TaskStatus
exports['Task'] = Task
exports['Tasks'] = Tasks

exports['TaskStatusConfig'] = TaskStatusConfig
exports['TaskConfig'] = TaskConfig
exports['TasksConfig'] = TasksConfig
