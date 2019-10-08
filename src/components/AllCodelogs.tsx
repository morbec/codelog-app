import { Container } from '@material-ui/core/'
import React, { useReducer } from 'react'
import * as api from '../api'
import { Codelog, Codelogs } from '../types'
import AddButton from './AddButton'
import CodelogItem from './CodelogItem'
import Navbar from './Navbar'

//#region reducer stuff
const ALL_CODELOGS = 'ALL_CODELOGS'
const ADD_NEW_CODELOG = 'ADD_NEW_CODELOG'
const DELETE_ALL_CODELOGS = 'DELETE_ALL_CODELOGS'
const DELETE_CODELOG = 'DELETE_CODELOG'
const EDIT_CODELOG = 'EDIT_CODELOG'

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

type EditCodelogType = {
  type: typeof EDIT_CODELOG
  payload: Codelog
}

type ActionTypes =
  | AllCodelogType
  | AddNewCodelogType
  | DeleteAllCodelogsType
  | DeleteCodelogType
  | EditCodelogType

const codelogReducer = (state: Codelogs, action: ActionTypes) => {
  switch (action.type) {
    case ALL_CODELOGS:
      return Object.assign({}, state, { codelogs: [...state.codelogs] })
    case ADD_NEW_CODELOG:
      return { codelogs: [...state.codelogs, action.payload] }
    case DELETE_CODELOG:
      return Object.assign({}, state, {
        codelogs: [...state.codelogs.filter((codelog) => codelog.id !== action.payload)]
      })
    case EDIT_CODELOG:
      return Object.assign({}, state, {
        codelogs: [
          ...state.codelogs.map((clog) => (clog.id === action.payload.id ? action.payload : clog))
        ]
      })
    default:
      return state
  }
}
//#endregion

const initialState: Codelogs = { codelogs: [] }

const AllCodelogs = (): JSX.Element => {
  const [state, dispatch] = useReducer(codelogReducer, initialState, () => api.getAllCodelogs())

  const handleAddClick = (codelog: Codelog) => {
    const newCodelog = api.addNewCodelog(codelog)
    dispatch({ type: ADD_NEW_CODELOG, payload: newCodelog })
  }

  const handleDeleteClick = (id: number) => {
    api.deleteCodelog(id)
    dispatch({ payload: id, type: DELETE_CODELOG })
  }

  const handleEditClick = (codelog: Codelog) => {
    const editedCodelog = api.editCodelog(codelog)
    dispatch({ payload: editedCodelog, type: EDIT_CODELOG })
  }

  return (
    <div>
      <Container>
        <Navbar />
        {state.codelogs.map((codelog) => (
          // need to pass the handleEditClick too
          <CodelogItem
            key={codelog.id}
            codelog={codelog}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
          />
        ))}
      </Container>
      <AddButton handleClick={handleAddClick} />
    </div>
  )
}

export default AllCodelogs
