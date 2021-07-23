import React, { useCallback, useContext, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import AuthLoginModal from './AuthLoginModal'
import AuthLogoutModal from './AuthLogoutModal'
import { AuthContext } from '../context/AuthContext'

const Nav = () => {
  const { isLoggedIn, loggedIn, loggedOut } = useContext(AuthContext)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const history = useHistory()
  const location = useLocation()

  const handleGoBack = useCallback(() => history.goBack(), [])
  const openLoginModal = useCallback(() => setIsLoginModalOpen(true), [])
  const closeLoginModal = useCallback(() => setIsLoginModalOpen(false), [])
  const openLogoutModal = useCallback(() => setIsLogoutModalOpen(true), [])
  const closeLogoutModal = useCallback(() => setIsLogoutModalOpen(false), [])

  return (
    <nav className="uk-navbar-container uk-margin uk-navbar-transparent" uk-navbar="true">

      <AuthLoginModal isOpen={isLoginModalOpen} closeModal={closeLoginModal} loggedIn={loggedIn} />

      <AuthLogoutModal isOpen={isLogoutModalOpen} closeModal={closeLogoutModal} loggedOut={loggedOut} />

      {
        location.pathname != '/' && (
          <div className="uk-navbar-left">
            <button className="uk-navbar-item uk-button nav-buttons" onClick={handleGoBack}>
              <span uk-icon="chevron-left" style={{ marginRight: '2px' }}></span> Back
            </button>
          </div>
        )
      }

      <div className="uk-navbar-center">
        <Link className="uk-navbar-item uk-logo nav-logo" to="/">
          MONKEYNOTES
        </Link>
      </div>

      <div className="uk-navbar-right">
        {
          isLoggedIn
            ? (<Link className="uk-navbar-item uk-button nav-buttons" to="/add/page">
              <span uk-icon="plus-circle" style={{ marginRight: '5px' }}></span> New Page
            </Link>)
            : null
        }
        {
          isLoggedIn
            ? (<button className="uk-navbar-item uk-button nav-buttons" onClick={openLogoutModal}>
              <span uk-icon="sign-out" style={{ marginRight: '5px' }}></span> Logout
            </button>)
            : (<button className="uk-navbar-item uk-button nav-buttons" onClick={openLoginModal}>
              <span uk-icon="sign-in" style={{ marginRight: '5px' }}></span> Login
            </button>)
        }
      </div>

    </nav>
  )
}

export default Nav