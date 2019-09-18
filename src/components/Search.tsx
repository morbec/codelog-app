import React, { useEffect, useState } from 'react'

// TODO: Check the type of tarkegKey
const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false)

  // TODO: Check the type of key
  const downHandler = ({ key }: { key: string }) => {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  // TODO: Check type of key
  const upHandler = ({ key }: { key: string }) => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [])

  return keyPressed
}

const Search = () => {
  const [keywords, setKeywords] = useState('')
  let pressedEnter = useKeyPress('Enter')

  useEffect(() => {
    if (pressedEnter && keywords != '') {
      console.log('search for keywords', keywords)
      // TODO: API search comes here
    }
  }, [[pressedEnter]])

  return (
    <div className="search">
      <input type="search" name="search" onChange={(event) => setKeywords(event.target.value)} />
    </div>
  )
}

export default Search
