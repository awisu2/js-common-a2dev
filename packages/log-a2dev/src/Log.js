import fs from 'fs'
import File from 'file-a2dev'

export default class Log {
  get canWrite () { return this._canWrite }

  constructor (file, options = {}) {
    this._file = file
    this._dateFormat = ('dateFormat' in options) ? options.dateFormat : 'YYYY-MM-DD HH:MM:SS'
    this._canWrite = File.canWrite(this._file)
  }

  append (log, d = null) {
    if (!this.canWrite) return

    let time = ''
    if (this._dateFormat) {
      d = d || new Date()
      time = d.format(this._dateFormat)
      if (time) time += ' '
    }
    fs.appendFileSync(this._file, time + log + '\n')
  }
}
