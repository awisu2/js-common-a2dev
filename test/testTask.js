const assert = require('assert')
const {Tasks, Task} = require('../dist/Tasks')
const TEXT = '[o]a\n[o]b\nc\nd\ne'
const TEST_FILE = './sample.txt'

describe('Task', () => {
  it('addTask', () => {
    let tasks = new Tasks()

    tasks.addTask(new Task('zzz'))

    assert.equal(tasks.tasks[0].status.toString(), '[s]')
    assert.equal(tasks.tasks[0].text, 'zzz')
    assert.equal(tasks.tasks.length, 1)
  })

  it('parseText', () => {
    let tasks = new Tasks()
    let _tasks = tasks.parseText(TEXT)
    assert.deepEqual(_tasks, [
      new Task('a', 'o'),
      new Task('b', 'o'),
      new Task('c', 's'),
      new Task('d', 's'),
      new Task('e', 's')])
  })

  it('addTaskByText', () => {
    let tasks = new Tasks()
    tasks.addTaskByText(TEXT)

    assert.deepEqual(tasks.tasks, [
      new Task('a', 'o'),
      new Task('b', 'o'),
      new Task('c', 's'),
      new Task('d', 's'),
      new Task('e', 's')])

    let i = tasks.indexOfExists()
    assert.equal(i, 2)

    let task = tasks.getTask(i)
    assert.deepEqual(task, new Task('c', 's'))
  })

  it('updateStatus', () => {
    let tasks = new Tasks()
    tasks.addTaskByText(TEXT)

    tasks.tasks[0].status.update('123')
    assert.deepEqual(tasks.getTask(0), new Task('a', '123'))

    tasks.tasks[4].status.update('zz')
    assert.deepEqual(tasks.getTask(0), new Task('a', '123'))
    assert.deepEqual(tasks.getTask(4), new Task('e', 'zz'))

    let i = tasks.indexOfExists()
    assert.equal(i, 0)
  })

  it('toString', () => {
    let tasks = new Tasks()
    tasks.addTaskByText(TEXT)
    assert.equal(tasks.toString, '[o]a\n[o]b\n[s]c\n[s]d\n[s]e\n')
  })

  it('write', () => {
    let tasks = new Tasks(TEST_FILE)
    tasks.addTaskByText(TEXT)
    tasks.write()
  })
})
