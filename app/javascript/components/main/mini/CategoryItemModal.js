import React, { useCallback, useRef, useState } from 'react'
import Modal from 'react-modal'
import parseForm from '../../utilities/parseForm'

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

const CategoryItemModal = ({ isOpen, closeModal, category }) => {
  const input = useRef(null)
  const [categoryName, setCategoryName] = useState(category.subject)

  const handleOnChange = useCallback(() => setCategoryName(input.current.value), [])

  const handleOnClose = useCallback(() => {
    setCategoryName(category.subject)
    closeModal()
  }, [])

  const handleOnUpdate = useCallback(async e => {
    e.preventDefault()
    const raw = new FormData(e.target)
    const data = parseForm(raw)
    const token = document.querySelector('meta[name="csrf-token"]').content

    await fetch(`/categories/${category.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "X-CSRF-Token": token, },
      body: JSON.stringify(data)
    })

    closeModal()
  }, [])

  const handleOnDelete = useCallback(async () => {
    const token = document.querySelector('meta[name="csrf-token"]').content

    await fetch(`/categories/${category.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', "X-CSRF-Token": token, }
    })

    closeModal()
  })

  return (
    <Modal isOpen={isOpen} style={modalStyle}>
      <div>
        Editing {category.subject}
        <span uk-icon="close" style={{ marginRight: '5px', float: 'right' }} onClick={handleOnClose}></span>
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