import React, { CSSProperties } from 'react'

const Navbar = () => {
  const style: CSSProperties = {
    marginLeft: '30px'
  }
  return (
    <nav>
      <div className="nav-wrapper">
        <span style={style} className="brand-logo center">
          Codelogs
        </span>
      </div>
    </nav>
  )
}

export default Navbar
