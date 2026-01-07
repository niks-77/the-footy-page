import React from 'react'
import './Header.styl'
import logo from '../field.svg'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
        <img src={logo} alt='logo' className='logo' />
        <a href= '/home' className='header-link'>
        <h4>The Footy Page</h4>
        </a>

        <a href='/home' className='home-button'> Home </a>
        <a href='https://www.linkedin.com/in/nikstav' className='home-button'>Contact</a>
    </header>
  )
}

export default Header
