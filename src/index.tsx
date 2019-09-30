import React from 'react'
import ReactDOM from 'react-dom'
import * as api from './api/index'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { Codelog } from './store/codelog/types'

let tests: Codelog[] = [
  {
    id: 0,
    date: new Date(),
    title: 'just a test',
    tasks: 'dha dha dha ...'
  },
  {
    id: 1,
    date: new Date(),
    title: 'just another test',
    tasks: 'dha dha dha ...'
  },
  {
    id: 1,
    date: new Date(),
    title: 'last test',
    tasks: 'dha dha dha ...',
    blockers: 'React Hooks :('
  }
]

api.deleteAll()
tests.forEach((log) => api.addNewCodelog(log))

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
