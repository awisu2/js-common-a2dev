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

  it('update', () => {
    let tasks = new Tasks()
    tasks.addByText(TEXT)

    let task = tasks.get(3)
    task.status.end()
    tasks.get(0).status.error()
    tasks.get(1).status.update('ZZ')

    assert.deepEqual(tasks.tasks, [
      new Task('a', new TaskStatus('e')),
      new Task('b', new TaskStatus('ZZ')),
      new Task('c', new TaskStatus('s')),
      new Task('d', new TaskStatus('o')),
      new Task('e', new TaskStatus('s'))])

    assert.equal(tasks.indexOfSearch('d', {isExists: false}), 3)
    assert.equal(tasks.indexOfSearch('d'), -1)
  })

  it('reload', () => {
    fs.removeSync(TEST_FILE)

    let tasks = new Tasks([
      new Task('z1'),
      new Task('z2')
    ], {file: TEST_FILE})
    tasks.write()

    assert.deepEqual(tasks.tasks, [
      new Task('z1', new TaskStatus('s')),
      new Task('z2', new TaskStatus('s'))], 'error constractor behavior')

    tasks = new Tasks(null, {file: TEST_FILE})
    tasks.concat([
      new Task('z3'),
      new Task('z4'),
      new Task('z5')])

    assert.ok(tasks.tasks.length, 5, 'no same length after concat')

    assert.deepEqual(tasks.tasks, [
      new Task('z1', new TaskStatus('s')),
      new Task('z2', new TaskStatus('s')),
      new Task('z3', new TaskStatus('s')),
      new Task('z4', new TaskStatus('s')),
      new Task('z5', new TaskStatus('s'))], 'error concat behavior')

    tasks.reload()
    assert.deepEqual(tasks.tasks, [
      new Task('z1'),
      new Task('z2')])

    fs.removeSync(TEST_FILE)
  })

  it('write', () => {
    fs.removeSync(TEST_FILE)

    let tasks = new Tasks(null, {file: TEST_FILE})
    tasks.addByText(TEXT)

    // update status
    let task = tasks.get(3)
    task.status.end()
    tasks.get(0).status.error()
    tasks.get(1).status.update('ZZ')

    tasks.write()

    tasks = new Tasks(null, {file: TEST_FILE})
    assert.deepEqual(tasks.tasks, [
      new Task('a', new TaskStatus('e')),
      new Task('b', new TaskStatus('ZZ')),
      new Task('c', new TaskStatus('s')),
      new Task('d', new TaskStatus('o')),
      new Task('e', new TaskStatus('s'))])

    // dowble write check
    tasks = new Tasks(null, {file: TEST_FILE})
    tasks.write()

    tasks = new Tasks(null, {file: TEST_FILE})
    assert.deepEqual(tasks.tasks, [
      new Task('a', new TaskStatus('e')),
      new Task('b', new TaskStatus('ZZ')),
      new Task('c', new TaskStatus('s')),
      new Task('d', new TaskStatus('o')),
      new Task('e', new TaskStatus('s'))])

    // dowble write check
    tasks = new Tasks(null, {file: TEST_FILE})
    tasks.write()

    fs.removeSync(TEST_FILE)
  })

  it('clear', () => {
    let tasks = new Tasks()
    tasks.addByText(TEXT)
    assert.ok(tasks.tasks.length > 0)

    tasks.clear()
    assert.ok(tasks.tasks.length === 0)
  })
})
