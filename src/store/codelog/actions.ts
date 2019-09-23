/* eslint-disable no-unused-vars */
// import { deleteAll, deleteCodelog, getAllCodelogs } from '../../api'
// addNewCodelog, deleteCodelog, deleteAll, editCodelog, getAllCodelogs, getCodelogById
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

// initialState
// const initialState = { codelogs: [...getAllCodelogs()] }

export const addNewCodelog = (newCodelog: Codelog): CodelogActionTypes => {
  return {
    type: ADD_NEW_CODELOG,
    payload: newCodelog
  }
}

export const all = (): CodelogActionTypes => {
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

//#region CodelogReducer
/* 
const CodelogReducer = (state: StateType, action: CodelogActionTypes) => {
  switch (action.type) {
    case ALL_CODELOGS:
      return { codelogs: [...getAllCodelogs()] }
    case DELETE_ALL:
      deleteAll()
      return { codelogs: [] }
    case DELETE_CODELOG: {
      const id = action.payload
      deleteCodelog(id)
      return { codelogs: [...getAllCodelogs()] }
    }
    default:
      return state
  }
}

export default CodelogReducer
*/
//#endregion
