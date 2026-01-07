import React from 'react'
import './NotFound.styl'

const NotFound = () => {
  return (
    <div className='not-found'>
      <h3>Oops! Page Not Found </h3>
      <p> Consider going back to <a href='/home'> home </a> </p>
    </div>
  )
}

export default NotFound
