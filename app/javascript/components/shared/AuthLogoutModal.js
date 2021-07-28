import React, { useCallback, useContext } from 'react'
import Modal from 'react-modal'
import simplifiedFetch from '../utilities/simplifiedFetch';
import { ToastContext } from '../context/ToastContext';
import { ModalContext } from '../context/ModalContext';

Modal.setAppElement(document.querySelector('[data-react-class="App"]'));

const AuthLogoutModal = ({ isOpen, closeModal, loggedOut }) => {
  const notify = useContext(ToastContext)
  const modalStyle = useContext(ModalContext)

  const handleOnLogout = useCallback(async e => {
    const response = await simplifiedFetch('/logout', 'DELETE')
    if (response.message != "Successfully logged out!") return null

    closeModal()
    loggedOut()
    notify(response.message)
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