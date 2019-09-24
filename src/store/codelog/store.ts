import { createStore } from 'redux'
import { codelogReducer } from './reducers'

const store = createStore(codelogReducer)

export default store
