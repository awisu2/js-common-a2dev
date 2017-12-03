module.exports = {
  Common: require('./dist/Common.js').default,
  Http: require('./dist/Http.js').default,
  File: require('./dist/File.js').default,
  MochaTester: require('./dist/MochaTester.js').default,
  Log: require('./dist/Log.js').default
}

let {Tasks, Task, TaskStatus} = require('./dist/Tasks.js')
module.exports['Tasks'] = Tasks
module.exports['Task'] = Task
module.exports['TaskStatus'] = TaskStatus
