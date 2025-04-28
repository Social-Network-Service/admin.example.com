import React from 'react'
import './logo.scss'

const Logo = () => {
  return (
    <div className={'logoContainer'}>
      <img className={'img'} src={'/images/ant.svg'} alt='logo'/>
      <span className={`name`}>A</span>
      <span className={`name black`}>nt </span>
      <span className={`name`}>D</span>
      <span className={`name black`}>esign</span>
    </div>
  )
}

export default Logo
