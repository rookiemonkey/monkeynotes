import React, { useCallback, useRef, useState, useContext } from 'react'
import Modal from 'react-modal'
import parseForm from '../../utilities/parseForm'
import simplifiedFetch from '../../utilities/simplifiedFetch';
import { ToastContext } from '../../context/ToastContext';
import { ModalContext } from '../../context/ModalContext';

Modal.setAppElement(document.querySelector('[data-react-class="App"]'));

const CategoryItemModal = ({ isOpen, closeModal, category, updateCategory, removeCategory }) => {
  const modalStyle = useContext(ModalContext)
  const notify = useContext(ToastContext)
  const input = useRef(null)
  const [categoryName, setCategoryName] = useState(category.subject)

  const handleOnChange = useCallback(() => setCategoryName(input.current.value), [])

  const handleOnClose = useCallback(() => { setCategoryName(category.subject); closeModal() }, [])

  const handleOnUpdate = useCallback(async e => {
    e.preventDefault()
    const formData = parseForm(new FormData(e.target))
    const response = await simplifiedFetch(`/categories/${category.id}`, 'POST', formData)
    updateCategory(response.data.subject)
    toast(response.message, toastOptions)
    closeModal()
  }, [])

  const handleOnDelete = useCallback(async () => {
    const response = await simplifiedFetch(`/categories/${category.id}`, 'DELETE')
    removeCategory(category.subject)
    notify(response.message)
    closeModal()
  })

  return (
    <Modal isOpen={isOpen} style={modalStyle}>
      <div>
        Editing Category - {category.subject}
        <span uk-icon="close" style={{ float: 'right' }} onClick={handleOnClose}></span>
      </div>

      <br />

      <form className="uk-grid uk-grid-small" style={{ marginLeft: 0 }} onSubmit={handleOnUpdate}>

        <div className="uk-width-1-1 uk-margin-bottom" style={{ paddingLeft: 0 }}>
          <input type="text"
            className="uk-input uk-form-controls"
            name="subject"
            value={categoryName}
            ref={input}
            style={{ paddingLeft: '10px' }}
            onChange={handleOnChange}
            required
            autoComplete="off"
          />
        </div>

        <div className="uk-width-1-1" style={{ paddingLeft: 0 }}>
          <button type="submit" className="uk-button uk-button-default">
            <span uk-icon="check" style={{ marginRight: '5px' }}></span>
            Update
          </button>

          <button type="button" className="uk-button uk-button-default uk-button-delete" onClick={handleOnDelete}>
            <span uk-icon="trash" style={{ marginRight: '5px' }}></span>
            Delete
          </button>
        </div>
        
      </form>
    </Modal>
  )
}

export default CategoryItemModal;