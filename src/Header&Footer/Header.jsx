import React from 'react'
import './Header.styl'
import logo from '../football.svg'

const Header = () => {
  return (
    <header className='header'>
        <img src={logo} alt='logo' className='logo' />
        <h2>The Footy Page</h2>
    </header>
  )
}

export default Header
