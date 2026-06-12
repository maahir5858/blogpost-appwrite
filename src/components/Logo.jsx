import React from 'react'
import logoImg from '../assets/react.svg'

function Logo({width = '100px'}) {
  return (
    <img src={logoImg} alt="Logo" width={width} />
  )
}

export default Logo