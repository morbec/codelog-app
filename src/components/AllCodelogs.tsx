import { Container } from '@material-ui/core/'
import React, { useReducer, useState } from 'react'
import * as api from '../api'
import { Codelog, Codelogs } from '../types'
import AddButton from './AddButton'
import CodelogItem from './CodelogItem'
import Navbar from './Navbar'
import PaginationActions, { ROWS_PER_PAGE } from './PaginationActions'

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
      return { codelogs: [action.payload, ...state.codelogs] }
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
  const [page, setPage] = useState(0)

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

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => {
    setPage(newPage)
  }

  return (
    <div>
      <Container>
        <Navbar />
        {state.codelogs
          .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
          .map((codelog) => (
            <CodelogItem
              key={codelog.id}
              codelog={codelog}
              handleDeleteClick={handleDeleteClick}
              handleEditClick={handleEditClick}
            />
          ))}
      </Container>
      <Container style={{ paddingTop: 7.5 }}>
        <PaginationActions
          page={page}
          count={state.codelogs.length}
          onChangePage={handleChangePage}
        />
      </Container>
      <AddButton handleClick={handleAddClick} />
    </div>
  )
}

export default AllCodelogs
