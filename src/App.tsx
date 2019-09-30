import React from 'react'
import AllCodelogs from './components/AllCodelogs'
import Title from './components/Title'

const App: React.FC = () => {
  return (
    <div className="container">
      <Title>Codelogs</Title>
      <AllCodelogs />
    </div>
  )
}

export default App
