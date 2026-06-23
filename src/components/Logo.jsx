import React from 'react'
import logoImg from '../assets/pika.png'

function Logo({width = '100px'}) {
  return (
    <img src={logoImg} alt="Logo" width={width} className="rounded-full scale-110 drop-shadow-2xl" />
  )
}

export default Logo