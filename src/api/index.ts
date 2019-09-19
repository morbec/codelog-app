import Codelog from '../types/codelog'

/**
 * Clear the localStorage
 */
export const clear = () => {
  localStorage.clear()
}

/**
 * Save the codelogs array in the localStorage
 * @param codelogs - Array containing the codelogs
 */
const saveCodelog = (codelogs: Codelog[]) => {
  // clear()
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

/**
 * Get a codelog by its id
 * @param id Codelog's id
 * @returns Codelog | Error - If a codelog is found or Error in case the database is empty or the id does not exist
 */
export const getCodelogById = (id: number): Codelog | Error => {
  const codelogs = getAllCodelogs()

  if (!codelogs) throw Error('Database is empty')

  const codelogIndex = codelogs.findIndex((codelog) => codelog.id === id)
  if (codelogIndex === -1) {
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
 * @returns codelog | Error - The edited codelog or Error if the id was not found or the localStorage is empty
 */
export const editCodelog = (id: number, codelog: Codelog): Error | Codelog => {
  const codelogs = getAllCodelogs()

  if (!codelogs) return Error('Database is empty')

  const codelogIndex = codelogs.findIndex((codelog) => codelog.id === id)
  if (codelogIndex === -1) return Error('Id not found')

  const { title, date, tasks, blockers, todayILearned } = codelog
  const updatedCodelog: Codelog = { id, date, title, tasks, blockers, todayILearned }
  codelogs[codelogIndex] = updatedCodelog
  saveCodelog([...codelogs])
  return updatedCodelog
}

/**
 * Delete a codelog
 * @param id Codelog's id
 * @returns Codelog | Error - The deleted Codelog or Error if the id was not found or if the localStorage is empty
 */
export const deleteCodelog = (id: number): Error | Codelog => {
  const codelogs = getAllCodelogs()

  if (!codelogs) return Error('Database is empty')

  const codelogIndex = codelogs.findIndex((codelog) => codelog.id === id)
  if (codelogIndex === -1) return Error('id not found')

  const deletedCodelog = codelogs.splice(codelogIndex, 1)
  saveCodelog([...codelogs])
  return deletedCodelog[0]
}
