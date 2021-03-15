import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="uk-navbar-container uk-margin uk-navbar-transparent" uk-navbar="true">

      <div className="uk-navbar-center">
        <a className="uk-navbar-item uk-logo" href="#">
          Monkeynotes
        </a>
      </div>

      <div className="uk-navbar-right">
        <Link to="/add/page">Add Page</Link>
      </div>

    </nav>
  )
}

export default Nav