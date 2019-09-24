/* eslint-disable no-unused-vars */
import {
  ADD_NEW_CODELOG,
  ALL_CODELOGS,
  Codelog,
  CodelogActionTypes,
  DELETE_ALL_CODELOGS,
  DELETE_CODELOG,
  EDIT_CODELOG,
  GET_CODELOG_BY_ID
} from './types'

export const addNewCodelog = (newCodelog: Codelog): CodelogActionTypes => {
  return {
    type: ADD_NEW_CODELOG,
    payload: newCodelog
  }
}

export const allCodelogs = (): CodelogActionTypes => {
  return {
    type: ALL_CODELOGS,
    payload: null
  }
}

export const deleteAllCodelogs = (): CodelogActionTypes => {
  return {
    type: DELETE_ALL_CODELOGS,
    payload: null
  }
}

export const deleteCodelog = (id: number): CodelogActionTypes => {
  return {
    type: DELETE_CODELOG,
    payload: id
  }
}

export const editCodelog = (codelog: Codelog): CodelogActionTypes => {
  return {
    type: EDIT_CODELOG,
    payload: codelog
  }
}

export const getCodelogById = (id: number): CodelogActionTypes => {
  return {
    type: GET_CODELOG_BY_ID,
    payload: id
  }
}
