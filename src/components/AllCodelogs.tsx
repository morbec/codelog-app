import React, { useReducer } from 'react'
import * as api from '../api'
import { ApiType, Codelog, CodelogState } from '../store/codelog/types'
import CodelogItem from './CodelogItem'

//#region reducer stuff
const ALL_CODELOGS = 'ALL_CODELOGS'
const ADD_NEW_CODELOG = 'ADD_NEW_CODELOG'
const DELETE_ALL_CODELOGS = 'DELETE_ALL_CODELOGS'
const DELETE_CODELOG = 'DELETE_CODELOG'

type AllCodelogType = {
  type: typeof ALL_CODELOGS
}

type AddNewCodelogType = {
  type: typeof ADD_NEW_CODELOG
  payload: Codelog
}

type DeleteAllCodelogsType = {
  type: typeof DELETE_ALL_CODELOGS
}

type DeleteCodelogType = {
  type: typeof DELETE_CODELOG
  payload: number
}

type ActionTypes = AllCodelogType | AddNewCodelogType | DeleteAllCodelogsType | DeleteCodelogType

const codelogReducer = (state: CodelogState, action: ActionTypes) => {
  switch (action.type) {
    case ALL_CODELOGS:
      return Object.assign({}, state, { codelogs: [...state.codelogs] })
    case ADD_NEW_CODELOG:
      return Object.assign({}, state, {
        codelogs: [...state.codelogs, action.payload]
      })
    case DELETE_CODELOG:
      return Object.assign({}, state, {
        codelogs: [...state.codelogs.filter((codelog) => codelog.id !== action.payload)]
      })
    default:
      return state
  }
}
//#endregion

const initialState: ApiType = { codelogs: [] }

const AllCodelogs = (): JSX.Element => {
  // eslint-disable-next-line
  const [state, dispatch] = useReducer(codelogReducer, initialState, () => api.getAllCodelogs())

  return (
    <div>
      {state.codelogs.map((codelog) => (
        <CodelogItem key={codelog.id} codelog={codelog} />
      ))}
    </div>
  )
}

export default AllCodelogs
