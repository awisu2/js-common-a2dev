# tasks-a2dev

this class controll tasks in one file or not.

- tasks created by multi task
- task is one line.
- taskStatus is task's status

# usage

```js
const TASKS_PATH = "/path/to/tasksfile.txt"

// create tasks and end task 2
var {Tasks, Task, TaskStatus, TaskStatusConfig} = require("tasks-a2dev")
var tasks = new Tasks(null, {file: TASKS_PATH})
tasks.add(new Task("this is my task1"))
tasks.add(new Task("this is my task2"))
tasks.get(1).status.end() // get by index

// write to file
tasks.write()

// load from file
var tasks2 = tasks.load(null, {file: TASKS_PATH})
tasks2.load()

// get string by Tasks
tasks2.toString // '[s]this is my task1\n[o]this is my task2\n'
```

# classes

- Tasks
- Task
- TaskStatus
- TasksConfig
- TaskConfig
- TaskStatusConfig

# Tasks methods

## load (options = {})

```js
tasks.load()
```

## reload ()

reload task datas from setting files.

```js
tasks.reload()
```

## parseByFile (file)

```js
tasks.parseByFile()
```

## parseText (text, config = null) Tasks

get Tasks instance from tasks text.

```js
Tasks.parseText()
```

## toString ()

get text. it's convert from tasks.

```js
Tasks.toStriing
```

## add (task)

add task

```js
tasks.add(task)
```

## concat (tasks)

add tasks to tasks.

```js
var tasks1 = new Tasks(null)
tasks.add(new Task("this is my task1"))
tasks.add(new Task("this is my task2"))

var tasks2 = new Tasks(null, {file: TASKS_PATH})
tasks2.concat(tasks1)
```

## addByText (text)

add tasks from text

```js
tasks.addByText("[s]this is my task new")
```

## indexOfExists () boolean

get first task it's not end

```js
tasks.indexOfExists()
```

## get (i) Task

get Task By index

```js
tasks.get(0)
```

## clear ()

clear tasks

```js
tasks.clear()
```

## write ()

write tasks to file.

```js
tasks.write()
```

**NOTE**: save path setting is Tasks config.file

## indexOfSearch (pattern, options = {}) Task

get index of task it's search task's text by pattern.

```js
tasks.indexOfSearch("task2")
```

# Task methods

## createByString (str, config) Task

create task by string.

```js
Task.createByString("[s]task1")
```

## statusInfoByStr (str, config) Task

```js
Task.statusInfoByStr("[e]task1")
```

# TaskStatus methods

## toString ()

get string from status

```js
task.status.toString()
```

## start ()

change status to start

```js
task.status.start()
```

## end ()

change status to end

```js
task.status.end()
```

## error ()

change status to error

```js
task.status.end()
```

## update (status)

change status to update

```js
task.status.update("myStatus")
```

**NOTE**: status can change any value.





























