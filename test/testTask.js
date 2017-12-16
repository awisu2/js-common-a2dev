const assert = require('assert')
const {Tasks, Task, TaskStatus} = require('../dist/Tasks')
const fs = require('fs-extra')

const TEXT = '[o]a\n[o]b\nc\nd\ne'
const TEST_FILE = './sample.txt'

describe('Task', () => {
  it('addTask', () => {
    let tasks = new Tasks(new Task('zzz'))

    assert.equal(tasks.tasks[0].status.toString(), '[s]')
    assert.equal(tasks.tasks[0].text, 'zzz')
    assert.equal(tasks.tasks.length, 1)
  })

  it('parseText', () => {
    let tasks = Tasks.parseText(TEXT)
    assert.deepEqual(tasks, [
      new Task('a', new TaskStatus('o')),
      new Task('b', new TaskStatus('o')),
      new Task('c', new TaskStatus('s')),
      new Task('d', new TaskStatus('s')),
      new Task('e', new TaskStatus('s'))])
  })

  it('addTaskByText', () => {
    let tasks = new Tasks()
    tasks.addByText(TEXT)

    assert.deepEqual(tasks.tasks, [
      new Task('a', new TaskStatus('o')),
      new Task('b', new TaskStatus('o')),
      new Task('c', new TaskStatus('s')),
      new Task('d', new TaskStatus('s')),
      new Task('e', new TaskStatus('s'))])

    let i = tasks.indexOfExists()
    assert.equal(i, 2)

    let task = tasks.get(i)
    assert.deepEqual(task, new Task('c', new TaskStatus('s')))
  })

  it('updateStatus', () => {
    let tasks = new Tasks()
    tasks.addByText(TEXT)

    tasks.tasks[0].status.update('123')
    assert.deepEqual(tasks.get(0), new Task('a', new TaskStatus('123')))

    tasks.tasks[4].status.update('zz')
    assert.deepEqual(tasks.get(0), new Task('a', new TaskStatus('123')))
    assert.deepEqual(tasks.get(4), new Task('e', new TaskStatus('zz')))

    let i = tasks.indexOfExists()
    assert.equal(i, 0)
  })

  it('toString', () => {
    let tasks = new Tasks()
    tasks.addByText(TEXT)
    assert.equal(tasks.toString, '[o]a\n[o]b\n[s]c\n[s]d\n[s]e\n')
  })

  it('write', () => {
    fs.removeSync(TEST_FILE)

    let tasks = new Tasks(null, {file: TEST_FILE})
    tasks.addByText(TEXT)
    tasks.write()

    tasks = new Tasks(null, {file: TEST_FILE})
    assert.deepEqual(tasks.tasks, [
      new Task('a', new TaskStatus('o')),
      new Task('b', new TaskStatus('o')),
      new Task('c', new TaskStatus('s')),
      new Task('d', new TaskStatus('s')),
      new Task('e', new TaskStatus('s'))])

    // dowble write check
    tasks = new Tasks(null, {file: TEST_FILE})
    tasks.write()

    tasks = new Tasks(null, {file: TEST_FILE})
    assert.deepEqual(tasks.tasks, [
      new Task('a', new TaskStatus('o')),
      new Task('b', new TaskStatus('o')),
      new Task('c', new TaskStatus('s')),
      new Task('d', new TaskStatus('s')),
      new Task('e', new TaskStatus('s'))])

    // dowble write check
    tasks = new Tasks(null, {file: TEST_FILE})
    tasks.write()
  })

  it('clear', () => {
    let tasks = new Tasks()
    tasks.addByText(TEXT)
    assert.ok(tasks.tasks.length > 0)

    tasks.clear()
    assert.ok(tasks.tasks.length === 0)
  })

  it('deletefile', () => {
    fs.removeSync(TEST_FILE)
  })
})
