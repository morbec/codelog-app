import { Codelog, Codelogs } from '../types'

// private
const saveCodelog = (codelogs: Codelog[]) => {
  // deleteAll()
  const data: Codelogs = { codelogs }
  localStorage.setItem('codelogs', JSON.stringify(data))
}

// public
export const generateId = (): number => {
  return parseInt(
    Math.random()
      .toString()
      .split('.')[1]
  )
}

export const addNewCodelog = (codelog: Codelog): Codelog => {
  const codelogs = getAllCodelogs().codelogs
  saveCodelog([codelog, ...codelogs])
  return codelog
}

export const deleteAll = () => {
  localStorage.clear()
}

export const deleteCodelog = (id: number) => {
  const codelogs = getAllCodelogs().codelogs

  if (!codelogs) throw new Error('Database is empty')

  const codelogIndex = codelogs.findIndex((codelog) => codelog.id === id)
  if (codelogIndex === -1) throw new Error('id not found')

  codelogs.splice(codelogIndex, 1)
  saveCodelog([...codelogs])
  return [...codelogs]
}

export const editCodelog = (codelog: Codelog): Codelog => {
  const codelogs = getAllCodelogs().codelogs

  if (!codelogs) throw new Error('Database is empty')

  const codelogIndex = codelogs.findIndex((clog) => clog.id === codelog.id)
  if (codelogIndex === -1) throw new Error('id not found')

  codelogs[codelogIndex] = codelog
  saveCodelog([...codelogs])
  return codelogs[codelogIndex]
}

export const getAllCodelogs = (): Codelogs => {
  const localData = localStorage.getItem('codelogs')
  return localData ? JSON.parse(localData) : { codelogs: [] }
}

export const getCodelogById = (id: number): Codelog => {
  const codelogs = getAllCodelogs().codelogs

  if (!codelogs) throw new Error('Database is empty')

  const codelogIndex = codelogs.findIndex((codelog) => codelog.id === id)
  if (codelogIndex === -1) {
    throw new Error('id not found')
  }

  return codelogs[codelogIndex]
}
