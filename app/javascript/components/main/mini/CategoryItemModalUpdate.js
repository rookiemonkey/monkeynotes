import React, { useCallback, useContext, useRef, useState } from 'react'
import Modal from 'react-modal'
import simplifiedFetch from '../../utilities/simplifiedFetch';
import parseForm from '../../utilities/parseForm';
import { ToastContext } from '../../context/ToastContext';
import { ModalContext } from '../../context/ModalContext';

Modal.setAppElement(document.querySelector('[data-react-class="App"]'));

const CategoryItemModalUpdate = ({ isOpen, closeModal, category, updateCategory }) => {
  const modalStyle = useContext(ModalContext)
  const notify = useContext(ToastContext)
  const [categoryName, setCategoryName] = useState(category.subject)
  const input = useRef('')

  const handleOnChange = useCallback(() => setCategoryName(input.current.value), [])

  const handleOnClose = useCallback(() => { setCategoryName(category.subject); closeModal() }, [])

  const handleOnUpdate = useCallback(async e => {
    e.preventDefault()
    const formData = parseForm(new FormData(e.target))
    const response = await simplifiedFetch(`/categories/${category.id}`, 'POST', formData)
    updateCategory(response.data.subject)
    notify(response.message)
    closeModal()
  }, [])

  return (
    <Modal isOpen={isOpen} style={modalStyle}>
      <div>
        Editing Category - {category.subject}
        <span uk-icon="close" style={{ float: 'right' }} onClick={handleOnClose}></span>
      </div>

      <br />

      <form className="uk-grid uk-grid-small uk-flex-column" style={{ marginLeft: 0 }} onSubmit={handleOnUpdate}>

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

export default CategoryItemModalUpdate