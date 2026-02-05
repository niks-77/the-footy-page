import React from 'react'
import './index.styl'
import logo from '../../public/field.svg'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
      <div className='header-container'>
        <div className="header-left">
          <img src={logo} alt='logo' className='logo' />
          <Link to='/home' className='header-link'>
            <h5>The Footy Page</h5>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
