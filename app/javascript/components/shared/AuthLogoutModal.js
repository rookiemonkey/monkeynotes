import React, { useCallback } from 'react'
import Modal from 'react-modal'
import simplifiedFetch from '../utilities/simplifiedFetch';

Modal.setAppElement(document.querySelector('[data-react-class="App"]'));

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
}

const AuthLogoutModal = ({ isOpen, closeModal, loggedOut }) => {

  const handleOnLogout = useCallback(async e => {
    const response = await simplifiedFetch('/logout', 'DELETE')
    if (response.message != "Successfully logged out!") return null

    closeModal()
    loggedOut()
  }, [])

  return (
    <Modal isOpen={isOpen} style={modalStyle}>
      <div>
        Logut
        <span uk-icon="close" style={{ float: 'right' }} onClick={closeModal}>
        </span>
      </div>

      <br />

      <p className="uk-width-1-1 uk-margin-bottom" style={{ paddingLeft: 0 }}>
        Are you sure you want to logout?
      </p>

      <div className="uk-width-1-1" style={{ paddingLeft: 0 }}>
        <button type="button" className="uk-button uk-button-default" onClick={closeModal}>
          <span uk-icon="close" style={{ marginRight: '5px' }}></span>
          Cancel
        </button>

        <button type="submit" className="uk-button uk-button-default uk-button-primary" onClick={handleOnLogout}>
          <span uk-icon="sign-out" style={{ marginRight: '5px' }}></span>
          Logout
        </button>
      </div>
    </Modal>
  )
}

export default AuthLogoutModal