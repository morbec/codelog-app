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

const codelogReducer = (state: Codelogs, action: ActionTypes) => {
  switch (action.type) {
    case ALL_CODELOGS:
      return Object.assign({}, state, { codelogs: [...state.codelogs] })
    case ADD_NEW_CODELOG: {
      const newCodelog = api.addNewCodelog(action.payload)
      return { codelogs: [...state.codelogs, newCodelog] }
    }
    case DELETE_CODELOG:
      api.deleteCodelog(action.payload)
      return Object.assign({}, state, {
        codelogs: [...state.codelogs.filter((codelog) => codelog.id !== action.payload)]
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
    dispatch({ type: ADD_NEW_CODELOG, payload: codelog })
  }

  const handleDeleteClick = (id: number) => {
    dispatch({ payload: id, type: DELETE_CODELOG })
  }

  return (
    <div>
      <Container>
        <Navbar />
        {state.codelogs.map((codelog) => (
          <CodelogItem key={codelog.id} codelog={codelog} handleDeleteClick={handleDeleteClick} />
        ))}
      </Container>
      <AddButton handleClick={handleAddClick} />
    </div>
  )
}

export default AllCodelogs
