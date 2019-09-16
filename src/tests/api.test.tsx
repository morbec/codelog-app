import * as api from '../api'
import Codelog from '../types/codelog'

const codelogs: Codelog[] = [
  {
    id: 1,
    date: new Date(),
    title: 'here comes the title',
    tasks: 'Write the API, document it, write tests',
    blockers: "Don't know how to document TypeScript project"
  },
  {
    id: 2,
    date: new Date(),
    title: 'Other title',
    tasks: 'Write more tests...'
  }
]

test('when the app runs for the first time, api returns an empty array', () => {
  const codelogs = api.getAllCodelogs()
  expect(codelogs.length).toBe(0)
})

describe('CRUD', () => {
  test('add new codelog', () => {
    api.addNewCodelog(codelogs[0])
    const logs = api.getAllCodelogs()
    expect(logs.length).toBe(1)
  })

  test('the only item in the localStorage shoudl be equal to codelogs[0]', () => {
    const logs = api.getAllCodelogs()
    expect(JSON.stringify(logs[0])).toBe(JSON.stringify(codelogs[0]))
  })

  test('get codelog by id', () => {
    const log = api.getCodelogById(1)
    expect(JSON.stringify(log)).toBe(JSON.stringify(codelogs[0]))
  })

  test('get codelog by id should return error in case of non-existent id', () => {
    const log = api.getCodelogById(11)
    expect(log).toBeInstanceOf(Error)
  })

  test('edit codelog should succeed', () => {
    const codelog: Codelog = {
      id: 1,
      date: codelogs[0].date,
      title: 'Yet other title',
      tasks: 'keep rocking the tests',
      blockers: ''
    }
    const editedCodelog = api.editCodelog(1, codelog)
    expect(JSON.stringify(codelog)).toBe(JSON.stringify(editedCodelog))
  })

  test('edit codelog with wrong id whould return an Error', () => {
    const codelog: Codelog = {
      id: 1,
      date: codelogs[0].date,
      title: 'Yet other title',
      tasks: 'keep rocking the tests',
      blockers: ''
    }
    const editedCodelog = api.editCodelog(11, codelog)
    expect(editedCodelog).toBeInstanceOf(Error)
  })

  test('get codelog by id should return an Error when the localStorage is empty', () => {
    localStorage.clear()
    const log = api.getCodelogById(11)
    expect(log).toBeInstanceOf(Error)
  })

  test('delete codelog', () => {
    api.addNewCodelog(codelogs[0])
    api.addNewCodelog(codelogs[1])
    const deletedCodelog = api.deleteCodelog(1)
    expect(JSON.stringify(deletedCodelog)).toBe(JSON.stringify(codelogs[0]))
  })

  test('after deleting one item, should have one item', () => {
    const logs = api.getAllCodelogs()
    expect(logs.length).toBe(1)
  })

  test('delete codelog with wrong id should return an Error', () => {
    const deletedCodelog = api.deleteCodelog(13)
    expect(deletedCodelog).toBeInstanceOf(Error)
  })

  test('delete codelog with empty storage shoudl return an Error', () => {
    localStorage.clear()
    const deletedCodelog = api.deleteCodelog(13)
    expect(deletedCodelog).toBeInstanceOf(Error)
  })
})
