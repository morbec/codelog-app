import React from 'react'
import { Codelog } from '../store/codelog/types'

const CodelogItem = ({ codelog }: { codelog: Codelog }) => {
  return (
    <div>
      <h1>{codelog.title}</h1>
      <h2>{codelog.date}</h2>
      <h3>{codelog.tasks}</h3>
    </div>
  )
}

export default CodelogItem
