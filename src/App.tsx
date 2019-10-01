import Container from '@material-ui/core/Container'
import React from 'react'
import AllCodelogs from './components/AllCodelogs'
import Navbar from './components/Navbar'

const App: React.FC = () => {
  return (
    <>
      <Container>
        <Navbar />
        <AllCodelogs />
      </Container>
    </>
  )
}

export default App
