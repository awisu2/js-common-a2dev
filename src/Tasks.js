const Common = require('./Common').default
const fs = require('fs')

const STATUS = {
  START: 's',
  ERROR: 'e',
  END: 'o'
}

const STATUS_SEPARATOR = {
  BEFORE: '[',
  AFTER: ']'
}

class TaskStatus {
  get status () { return this._status }
  get length () { return this.toString().length }
  get isEnd () { return this._status === STATUS.END }
  get isError () { return this._status === STATUS.ERROR }

  constructor (status = STATUS.START) {
    if (status === undefined || status === null) status = STATUS.START
    this._status = status
  }

  toString () {
    return STATUS_SEPARATOR.BEFORE + this._status + STATUS_SEPARATOR.AFTER
  }

  end () {
    this._status = STATUS.END
  }

  error () {
    this._status = STATUS.ERROR
  }

  update (status) {
    this._status = status
  }
}

class Task {
  get status () { return this._status }
  get text () { return this._text }

  static createByString (str) {
    let statusStr = Common.betweenStr(str, STATUS_SEPARATOR.BEFORE, STATUS_SEPARATOR.AFTER, {
      isHead: true,
      default: null
    })

    let status = new TaskStatus(statusStr)
    let text = str.substr(statusStr ? status.length : 0).trim()
    return new Task(text, status)
  }

  constructor (text, status) {
    if (typeof status === 'object') {
      this._status = status
    } else {
      this._status = new TaskStatus(status)
    }
    this._text = text
  }

  toString () {
    return this._status.toString() + this._text
  }
}

class Tasks {
  get tasks () {
    return this._tasks
  }

  constructor (file) {
    this._file = file
    this._tasks = []
    if (this._file && fs.existsSync(this._file)) {
      this._tasks = this.parse()
    }
  }

  parse () {
    let tasks = []
    if (fs.existsSync(this._file)) {
      let data = fs.readFileSync(this._file)
      tasks = this.parseText(data.toString())
    }
    return tasks
  }

  parseText (text) {
    let lines = text.split('\n')

    let tasks = []
    for (let i in lines) {
      if (!lines[i]) continue
      tasks.push(Task.createByString(lines[i]))
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

  addTask (task) {
    this._tasks.push(task)
  }

  addTaskByText (text) {
    let tasks = this.parseText(text)
    for (let i in tasks) {
      this.addTask(tasks[i])
    }
  }

  indexOfExists () {
    for (let i in this._tasks) {
      let task = this._tasks[i]
      if (!task.status.isEnd && !task.status.isError) {
        return i
      }
    }
    return -1
  }

  getTask (i) {
    return this._tasks[i]
  }

  write () {
    fs.writeFileSync(this._file, this.toText)
  }
}

exports['TaskStatus'] = TaskStatus
exports['Task'] = Task
exports['Tasks'] = Tasks
