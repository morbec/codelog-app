import { Codelog } from '../../src/store/codelog/types'
import * as api from '../api'

test('when the app runs for the first time, api returns an empty array', () => {
  const codelogs = api.getAllCodelogs()
  expect(codelogs.length).toBe(0)
})

describe('CRUD', () => {
  const codelogs: Codelog[] = [
    {
      id: 0,
      date: new Date(),
      title: 'here comes the title',
      tasks: 'Write the API, document it, write tests',
      blockers: "Don't know how to document TypeScript project"
    },
    {
      id: 1,
      date: new Date(),
      title: 'Other title',
      tasks: 'Write more tests...'
    }
  ]

  test('get codelog by id should throw an Error when the localStorage is empty', () => {
    // localStorage.clear()
    // const log = api.getCodelogById(11)
    expect(() => api.getCodelogById(111)).toThrow('id not found')
  })

  beforeAll(() => {
    localStorage.clear()
    api.addNewCodelog(codelogs[1])
  })

  test('add new codelog', () => {
    api.addNewCodelog(codelogs[0])
    const logs = api.getAllCodelogs()
    expect(logs.length).toBe(2)
  })

  test('get codelog by id', () => {
    const allCodelogs = api.getAllCodelogs()
    expect(allCodelogs.length).toBe(2)

    const log = api.getCodelogById(allCodelogs[0].id)
    expect(JSON.stringify(log)).toBe(JSON.stringify(codelogs[1]))
  })

  test('get codelog by id throw return error in case of non-existent id', () => {
    expect(() => api.getCodelogById(111)).toThrow('id not found')
  })

  test('edit codelog should succeed', () => {
    const codelog: Codelog = api.getAllCodelogs()[0]
    codelog.title = 'This is new title'
    codelog.blockers = 'Tests sucks (sometimes)'
    codelog.todayILearned = 'Tests helps to fix functions after changing it'
    const editedCodelog = api.editCodelog(codelog)
    expect(JSON.stringify(codelog)).toBe(JSON.stringify(editedCodelog))
  })

  test('edit codelog with wrong id shold throw an Error', () => {
    const codelog: Codelog = {
      id: -1111,
      date: codelogs[0].date,
      title: 'Yet other title',
      tasks: 'keep rocking the tests',
      blockers: ''
    }
    expect(() => api.editCodelog(codelog)).toThrow('id not found')
  })

  test('delete codelog', () => {
    const allCodelogs = api.getAllCodelogs()
    expect(allCodelogs.length).toBe(2)
    api.deleteCodelog(allCodelogs[0].id)
    expect(api.getAllCodelogs().length).toBe(1)
  })

  test('delete codelog with wrong id should throw an Error', () => {
    expect(() => api.deleteCodelog(111)).toThrow('id not found')
  })

  test('delete codelog with empty storage should throw an Error', () => {
    localStorage.clear()
    expect(api.getAllCodelogs().length).toBe(0)
    expect(() => api.deleteCodelog(13)).toThrow('Database is empty')
  })
})
