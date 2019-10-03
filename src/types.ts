/* eslint-disable no-unused-vars */
export type Codelog = {
  id: number
  date: Date
  title: string
  tasks: string
  blockers?: string
  todayILearned?: string
}

export type ApiType = {
  codelogs: Codelog[]
}

export type CodelogState = {
  codelogs: Codelog[]
}

export const ADD_NEW_CODELOG = 'ADD_NEW_CODELOG'
export const ALL_CODELOGS = 'ALL_CODELOGS'
export const DELETE_ALL_CODELOGS = 'DELETE_ALL_CODELOGS'
export const DELETE_CODELOG = 'DELETE_CODELOG'
export const EDIT_CODELOG = 'EDIT_CODELOG'
export const GET_CODELOG_BY_ID = 'GET_CODELOG_BY_ID'

interface AddNewCodelogAction {
  type: typeof ADD_NEW_CODELOG
  payload: Codelog
}

interface AllAction {
  type: typeof ALL_CODELOGS
  payload: null
}

interface DeleteAllCodelogsAction {
  type: typeof DELETE_ALL_CODELOGS
  payload: null
}

interface DeleteCodelogAction {
  type: typeof DELETE_CODELOG
  payload: number
}

interface EditCodelogAction {
  type: typeof EDIT_CODELOG
  payload: Codelog
}

interface GetCodelogByIdAction {
  type: typeof GET_CODELOG_BY_ID
  payload: number
}

export type CodelogActionTypes =
  | AddNewCodelogAction
  | AllAction
  | EditCodelogAction
  | DeleteAllCodelogsAction
  | DeleteCodelogAction
  | GetCodelogByIdAction
