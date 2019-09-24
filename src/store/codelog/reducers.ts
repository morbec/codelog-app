/* eslint-disable no-unused-vars */
// import * as api from '../../api'
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
    case ADD_NEW_CODELOG:
      return Object.assign({}, state, {
        codelogs: [...state.codelogs, action.payload]
      })
    case ALL_CODELOGS:
      return Object.assign({}, state, {
        codelogs: [...state.codelogs]
      })
    case DELETE_ALL_CODELOGS:
      return Object.assign({}, state, {
        codelogs: []
      })
    case DELETE_CODELOG:
      return Object.assign({}, state, {
        codelogs: [...state.codelogs.filter((codelog) => codelog.id !== action.payload)]
      })
    case EDIT_CODELOG:
      return Object.assign({}, state, {
        codelogs: [
          ...state.codelogs.map((clog) =>
            clog.id === action.payload.id ? Object.assign({}, action.payload) : clog
          )
        ]
      })
    case GET_CODELOG_BY_ID:
      return Object.assign({}, state, {
        codelogs: state.codelogs.find((clog) => clog.id === action.payload)
      })
    default:
      return state
  }
}
