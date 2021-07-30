import React, { useCallback, useRef, useState, useContext } from 'react'
import Modal from 'react-modal'
import parseForm from '../../utilities/parseForm';
import simplifiedFetch from '../../utilities/simplifiedFetch';
import { ToastContext } from '../../context/ToastContext';
import { ModalContext } from '../../context/ModalContext';

Modal.setAppElement(document.querySelector('[data-react-class="App"]'));

const NotebookItemModalUpdate = ({ isOpen, closeModal, slug, subject, updateNotebook }) => {
  const modalStyle = useContext(ModalContext)
  const notify = useContext(ToastContext)
  const [notebookSubject, setNotebookSubject] = useState(subject)
  const input = useRef(null)

  const handleOnChange = useCallback(() => setNotebookSubject(input.current.value), [])

  const handleOnClose = useCallback(() => { setNotebookSubject(subject); closeModal() }, [])

  const handleOnUpdate = useCallback(async e => {
    e.preventDefault()
    const formData = parseForm(new FormData(e.target))
    const response = await simplifiedFetch(`/notebook/${slug}`, 'PUT', formData)
    notify(response.message)
    updateNotebook({ slug: response.data.slug, subject: response.data.subject })
    closeModal()
  })

  return (
    <Modal isOpen={isOpen} style={modalStyle}>
      <div>
        Editing Notebook - {subject}
        <span uk-icon="close" style={{ float: 'right' }} onClick={handleOnClose}>
        </span>
      </div>

      <br />

      <form className="uk-grid uk-grid-small uk-flex-column" style={{ marginLeft: 0 }} onSubmit={handleOnUpdate}>
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
          <button type="button" className="uk-button uk-button-default" onClick={handleOnClose}>
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