import Codelog from '../types/codelog'

/**
 * Save the codelogs array in the localStorage
 * @param codelogs - Array containing the codelogs
 */
const saveCodelog = (codelogs: Codelog[]) => {
  localStorage.clear()
  localStorage.setItem('codelogs', JSON.stringify(codelogs))
}

/**
 * Get the list (array) of codelogs stored in the localStorage
 * @returns [Codelog] | []
 */
export const getAllCodelogs = (): [Codelog] | [] => {
  const localData = localStorage.getItem('codelogs')
  return localData ? JSON.parse(localData) : []
}

//TODO: implement this function
export const getCodelogById = (id: number): Codelog | Error => {
  const codelogs = getAllCodelogs()

  if (!codelogs) throw Error('Database is empty')

  const codelogIndex = codelogs.findIndex((codelog) => codelog.id == id)
  if (codelogIndex == -1) {
    return Error('id not found')
  }

  return codelogs[codelogIndex]
}

/**
 * Add a new codelog to the array of codelogs and store the array in the localStorage
 * @param codelog - A new codelog to be added to the array of codelogs
 */
export const addNewCodelog = (codelog: Codelog): void => {
  const codelogs = getAllCodelogs()
  saveCodelog([...codelogs, codelog])
}

/**
 * Edit a codelog
 * @param id - The id of the codelog to be edited
 * @param codelog - a codelog object containing the new data
 * @returns codelog | Error - The edited codelog or Error in case the id was not found
 */
export const editCodelog = (id: number, codelog: Codelog): Error | Codelog => {
  const codelogs = getAllCodelogs()

  if (!codelogs) return Error('Database is empty')

  const codelogIndex = codelogs.findIndex((codelog) => codelog.id == id)
  if (codelogIndex == -1) return Error('Id not found')

  const { title, date, tasks, blockers, todayILearned } = codelog
  const updatedCodelog: Codelog = { id, date, title, tasks, blockers, todayILearned }
  codelogs[codelogIndex] = updatedCodelog
  saveCodelog([...codelogs])
  return updatedCodelog
}

export const deleteCodelog = (id: number): Error | Codelog => {
  const codelogs = getAllCodelogs()

  if (!codelogs) return Error('Database is empty')

  const codelogIndex = codelogs.findIndex((codelog) => codelog.id == id)
  if (codelogIndex == -1) return Error('id not found')

  const deletedCodelog = codelogs.splice(codelogIndex, 1)
  saveCodelog([...codelogs])
  return deletedCodelog[0]
}
