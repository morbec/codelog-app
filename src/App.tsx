import React from 'react'
import AllCodelogs from './components/AllCodelogs'
import Navbar from './components/Navbar'

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <AllCodelogs />
      </div>
    </>
  )
}

export default App
