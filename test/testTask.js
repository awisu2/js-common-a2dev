const assert = require('assert')
const Tasks = require('../dist/Tasks').default
const TEXT = '[o]a\n[o]b\nc\nd\ne'
const TEST_FILE = './sample.txt'

describe('Task', () => {
  it('addTask', () => {
    let tasks = new Tasks()
    tasks.addTask(tasks.createTask('foo', 'zzz'))
    assert.deepEqual(tasks.list, [
      { status: 'foo', text: 'zzz' }
    ])
  })

  it('parseText', () => {
    let tasks = new Tasks()
    let _tasks = tasks.parseText(TEXT)
    assert.deepEqual(_tasks, [
      { status: 'o', text: 'a' },
      { status: 'o', text: 'b' },
      { status: '-', text: 'c' },
      { status: '-', text: 'd' },
      { status: '-', text: 'e' } ])
  })

  it('addTaskByText', () => {
    let tasks = new Tasks()
    tasks.addTaskByText(TEXT)

    assert.deepEqual(tasks.list, [
      { status: 'o', text: 'a' },
      { status: 'o', text: 'b' },
      { status: '-', text: 'c' },
      { status: '-', text: 'd' },
      { status: '-', text: 'e' } ])

    let i = tasks.indexOfExists()
    assert.equal(i, 2)

    let task = tasks.getTask(i)
    assert.deepEqual(task, { status: '-', text: 'c' })
  })

  it('updateStatus', () => {
    let tasks = new Tasks()
    tasks.addTaskByText(TEXT)

    tasks.updateStatus(0, '123')
    assert.deepEqual(tasks.getTask(0), { status: '123', text: 'a' })

    tasks.updateStatus(4, 'zz')
    assert.deepEqual(tasks.getTask(0), { status: '123', text: 'a' })
    assert.deepEqual(tasks.getTask(4), { status: 'zz', text: 'e' })

    let i = tasks.indexOfExists()
    assert.equal(i, 0)
  })

  it('toText', () => {
    let tasks = new Tasks()
    tasks.addTaskByText(TEXT)
    assert.equal(tasks.toText, '[o]a\n[o]b\n[-]c\n[-]d\n[-]e\n')
  })

  it('write', () => {
    let tasks = new Tasks(TEST_FILE)
    tasks.addTaskByText(TEXT)
    tasks.write()
  })
})
