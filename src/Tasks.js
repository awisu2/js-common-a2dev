const Common = require('./Common').default
const fs = require('fs')

const STATUS = {
  START: '-',
  END: 'o'
}

export default class Tasks {
  get status () { return this._status }

  get list () {
    return this._list
  }

  constructor (file, options = {}) {
    options = Common.fillObject(options, {
      prefix: '[',
      suffix: ']',
      status: {
        start: STATUS.START,
        end: STATUS.END
      }
    })
    this._file = file
    this._prefix = options.prefix
    this._suffix = options.suffix
    this._status = options.status
    this._list = []
  }

  parse () {
    let list = []
    if (fs.existsSync(this._file)) {
      let data = fs.readFileSync(this._file)
      list = this.parseText(data.toString())
    }
    this._list = list
    return this._list
  }

  parseTexts (text) {
    let lines = text.split('\n')

    let tasks = []
    for (let i in lines) {
      let line = lines[i]
      if (!line) continue

      let task = this.parseLine(line)
      if (task) tasks.push(task)
    }

    return tasks
  }

  get toText () {
    let text = ''
    for (let i in this._list) {
      let task = this._list[i]
      text += this._prefix + task.status +
       this._suffix + task.text + '\n'
    }
    return text
  }

  parseLine (line) {
    let status = Common.betweenStr(line, this._prefix, this._suffix, {
      isHead: true, default: this.status.start
    })

    let statusStr = this._prefix + status + this._suffix
    let i = line.indexOf(statusStr) === 0 ? statusStr.length : 0
    return this.createTask(status, line.substr(i))
  }

  createTask (status = this.status.start, text = '') {
    return {
      status: status,
      text: text
    }
  }

  addTask (task) {
    this._list.push(task)
  }

  addTaskByText (text) {
    let tasks = this.parseTexts(text)
    for (let i in tasks) {
      this.addTask(tasks[i])
    }
  }

  updateStatus (i, status) {
    this._list[i].status = status
  }

  indexOfExists () {
    let index = -1
    for (let i in this._list) {
      if (this._list[i].status !== this.status.end) {
        index = i
        break
      }
    }
    return index
  }

  getTask (index) {
    return this._list[index]
  }
}
