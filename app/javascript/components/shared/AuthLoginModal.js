import React, { useCallback, useState, useContext } from 'react'
import Modal from 'react-modal'
import simplifiedFetch from '../utilities/simplifiedFetch';
import { ToastContext } from '../context/ToastContext';
import { ModalContext } from '../context/ModalContext';

Modal.setAppElement(document.querySelector('[data-react-class="App"]'));

const AuthLoginModal = ({ isOpen, closeModal, loggedIn }) => {
  const notify = useContext(ToastContext)
  const modalStyle = useContext(ModalContext)
  const [formState, setFormState] = useState({email: '', password: ''})

  const resetForm = useCallback(() => {
    setFormState({ email: '', password: '' })
  }, [])

  const handleOnChange = useCallback(e => {
    setFormState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }, [])

  const handleOnLogin = useCallback(async e => {
    e.preventDefault()
    const response = await simplifiedFetch('/login', 'POST', formState)
    if (response.message != "Successfully logged in!") return null

    resetForm()
    loggedIn()
    closeModal()
    notify(response.message)
  }, [formState])

  return(
    <Modal isOpen={isOpen} style={modalStyle}>
      <div>
        Login
        <span uk-icon="close" style={{ float: 'right' }} onClick={closeModal}>
        </span>
      </div>

      <br />

      <form className="uk-grid uk-grid-small uk-flex-column" style={{ marginLeft: 0 }} onSubmit={handleOnLogin}>
        <div className="uk-width-1-1 uk-margin-bottom" style={{ paddingLeft: 0 }}>
          <input type="text"
            className="uk-input uk-form-controls"
            name="email"
            value={formState.email}
            style={{ paddingLeft: '10px' }}
            onChange={handleOnChange}
            placeholder="Email"
            required
            autoComplete="off"
          />
        </div>

        <div className="uk-width-1-1 uk-margin-bottom" style={{ paddingLeft: 0 }}>
          <input type="password"
            className="uk-input uk-form-controls"
            name="password"
            value={formState.password}
            style={{ paddingLeft: '10px' }}
            onChange={handleOnChange}
            placeholder="Password"
            required
            autoComplete="off"
          />
        </div>

        <div className="uk-width-1-1" style={{ paddingLeft: 0 }}>
          <button type="button" className="uk-button uk-button-default" onClick={closeModal}>
            <span uk-icon="close" style={{ marginRight: '5px' }}></span>
            Cancel
          </button>

          <button type="submit" className="uk-button uk-button-default uk-button-primary">
            <span uk-icon="sign-in" style={{ marginRight: '5px' }}></span>
            Login
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AuthLoginModal