import React from 'react'
import ReactDOM from 'react-dom'
import { addNewCodelog, deleteAll } from './api'
import App from './App'
import * as serviceWorker from './serviceWorker'
import Codelog from './types/codelog'

// TODO: Delete this!
const seed = () => {
  const codelogs: Codelog[] = [
    {
      id: 666,
      date: new Date(),
      title: 'foo',
      tasks: 'make foo bar'
    },
    {
      id: 555,
      date: new Date(),
      title: 'foobar',
      tasks: 'unmake foo bar'
    },
    {
      id: 444,
      date: new Date(),
      title: 'title cames here',
      tasks: 'do or do not'
    }
  ]

  deleteAll()
  codelogs.forEach((codelog) => {
    addNewCodelog(codelog)
  })
  console.log(`length ==> ${codelogs.length}`)
}

seed()

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
