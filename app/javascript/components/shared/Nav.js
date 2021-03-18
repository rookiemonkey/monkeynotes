import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

const Nav = () => {
  const history = useHistory()
  const location = useLocation()

  return (
    <nav className="uk-navbar-container uk-margin uk-navbar-transparent" uk-navbar="true">

      {
        location.pathname != '/' && (
          <div className="uk-navbar-left">
            <button className="uk-navbar-item uk-button nav-buttons" onClick={() => history.goBack()}>
              <span uk-icon="chevron-left" style={{ marginRight: '2px' }}></span> Back
            </button>
          </div>
        )
      }

      <div className="uk-navbar-center">
        <Link className="uk-navbar-item uk-logo nav-logo" to="/">
          monkeynotes
        </Link>
      </div>

      <div className="uk-navbar-right">
        <Link className="uk-navbar-item uk-button nav-buttons" to="/add/page">
          <span uk-icon="plus-circle" style={{ marginRight: '5px' }}></span> New Page
        </Link>
      </div>

    </nav>
  )
}

export default Nav