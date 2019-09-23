/* eslint-disable no-unused-vars */
import { Codelog } from '../store/codelog/types'

// private
const saveCodelog = (codelogs: Codelog[]) => {
  // deleteAll()
  localStorage.setItem('codelogs', JSON.stringify(codelogs))
}

const generateId = (): number => {
  return parseInt(
    Math.random()
      .toString()
      .split('.')[1]
  )
}

// public

export const deleteAll = () => {
  localStorage.clear()
}

export const getAllCodelogs = (): Codelog[] | [] => {
  const localData = localStorage.getItem('codelogs')
  return localData ? JSON.parse(localData) : []
}

export const getCodelogById = (id: number): Codelog => {
  const codelogs = getAllCodelogs()

  if (!codelogs) throw new Error('Database is empty')

  const codelogIndex = codelogs.findIndex((codelog) => codelog.id === id)
  if (codelogIndex === -1) {
    throw new Error('id not found')
  }

  return codelogs[codelogIndex]
}

export const addNewCodelog = (codelog: Codelog): Codelog => {
  const codelogs = getAllCodelogs()
  codelog.id = generateId()
  saveCodelog([...codelogs, codelog])
  return codelog
}

export const editCodelog = (codelog: Codelog): Codelog => {
  const codelogs = getAllCodelogs()

  if (!codelogs) throw new Error('Database is empty')

  const codelogIndex = codelogs.findIndex((clog) => clog.id === codelog.id)
  if (codelogIndex === -1) throw new Error('id not found')

  codelogs[codelogIndex] = codelog
  saveCodelog([...codelogs])
  return codelogs[codelogIndex]
}

export const deleteCodelog = (id: number) => {
  const codelogs = getAllCodelogs()

  if (codelogs.length === 0) throw new Error('Database is empty')

  const codelogIndex = codelogs.findIndex((codelog) => codelog.id === id)
  if (codelogIndex === -1) throw new Error('id not found')

  const deletedCodelog = codelogs.splice(codelogIndex, 1)
  saveCodelog([...codelogs])
  return [...codelogs]
}
