import React from 'react'
import './index.styl'
import logo from '../field.svg'

const Header = () => {
  return (
    <header className='header'>
      <div className='header-container'>
        <div className="header-left">
          <img src={logo} alt='logo' className='logo' />
          <a href='/home' className='header-link'>
            <h5>The Footy Page</h5>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
