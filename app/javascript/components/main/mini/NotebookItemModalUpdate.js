import React, { useCallback, useRef, useState } from 'react'
import Modal from 'react-modal'
import parseForm from '../../utilities/parseForm';
import simplifiedFetch from '../../utilities/simplifiedFetch';

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

const NotebookItemModalUpdate = ({ isOpen, closeModal, slug, subject }) => {
  const [notebookSubject, setNotebookSubject] = useState(subject)
  const input = useRef(null)

  const handleOnChange = useCallback(() => setNotebookSubject(input.current.value), [])

  const handleOnUpdate = useCallback(async e => {
    e.preventDefault()
    const formData = parseForm(new FormData(e.target))
    await simplifiedFetch(`/notebook/${slug}`, 'PUT', formData)
    closeModal()
  })

  return (
    <Modal isOpen={isOpen} style={modalStyle}>
      <div>
        Editing Notebook - {subject}
        <span uk-icon="close" style={{ float: 'right' }} onClick={closeModal}>
        </span>
      </div>

      <br />

      <form className="uk-grid uk-grid-small" style={{ marginLeft: 0 }} onSubmit={handleOnUpdate}>
        <div className="uk-width-1-1 uk-margin-bottom" style={{ paddingLeft: 0 }}>
          <input type="text"
            className="uk-input uk-form-controls"
            name="subject"
            value={notebookSubject}
            onChange={handleOnChange}
            ref={input}
            required
            autoComplete="off"
          />
        </div>

        <div className="uk-width-1-1" style={{ paddingLeft: 0 }}>
          <button type="button" className="uk-button uk-button-default" onClick={closeModal}>
            <span uk-icon="close" style={{ marginRight: '5px' }}></span>
            Cancel
          </button>

          <button type="submit" className="uk-button uk-button-primary">
            <span uk-icon="check" style={{ marginRight: '5px' }}></span>
            Update
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default NotebookItemModalUpdate