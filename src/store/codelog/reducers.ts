/* eslint-disable no-unused-vars */
import * as api from '../../api'
import {
  ADD_NEW_CODELOG,
  ALL_CODELOGS,
  CodelogActionTypes,
  CodelogState,
  DELETE_ALL_CODELOGS,
  DELETE_CODELOG,
  EDIT_CODELOG,
  GET_CODELOG_BY_ID
} from './types'

const initialState: CodelogState = {
  codelogs: []
}

export const codelogReducer = (state = initialState, action: CodelogActionTypes): CodelogState => {
  switch (action.type) {
    case ADD_NEW_CODELOG: {
      const newCodelog = api.addNewCodelog(action.payload)
      return {
        codelogs: [...state.codelogs, newCodelog]
      }
    }
    case ALL_CODELOGS:
      return {
        codelogs: [...api.getAllCodelogs()]
      }
    case DELETE_ALL_CODELOGS: {
      api.deleteAll()
      return { codelogs: [] }
    }
    case DELETE_CODELOG: {
      return { codelogs: [...api.deleteCodelog(action.payload)] }
    }
    case EDIT_CODELOG: {
      return { codelogs: [...state.codelogs, api.editCodelog(action.payload)] }
    }
    case GET_CODELOG_BY_ID:
      return {
        codelogs: [api.getCodelogById(action.payload)]
      }
    default:
      return state
  }
}
