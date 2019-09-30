import React, { CSSProperties, ReactNode } from 'react'

const Title = ({ children }: { children: ReactNode }) => {
  const style: CSSProperties = {
    backgroundColor: '#ffab91',
    color: '#212121',
    fontSize: '3.5em',
    marginTop: 0,
    padding: '30px 0px',
    textAlign: 'center'
  }

  return (
    <h1 className="col s9" style={style}>
      {children}
    </h1>
  )
}

export default Title
