import React, { useCallback, useContext } from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import simplifiedFetch from '../../utilities/simplifiedFetch';
import { ToastContext } from '../../context/ToastContext';
import { ModalContext } from '../../context/ModalContext';

Modal.setAppElement(document.querySelector('[data-react-class="App"]'));

const NotebookItemModalDelete = ({ isOpen, closeModal, slug }) => {
  const modalStyle = useContext(ModalContext)
  const toastOptions = useContext(ToastContext)

  const handleOnDelete = useCallback(async () => {
    const response = await simplifiedFetch(`/notebook/${slug}`, 'DELETE')
    closeModal()
    toast(response.message, toastOptions)
  })

  return (
    <Modal isOpen={isOpen} style={modalStyle}>
      <div>
        <span uk-icon="close" style={{ float: 'right' }} onClick={closeModal}>
        </span>
      </div>

      <p className="uk-width-1-1 uk-margin-bottom" style={{ paddingLeft: 0 }}>
        Are you sure you want to delete this notebook? <br/>
        <i>Deleting this notebook will render all of its pages deleted as well.</i>
      </p>

      <div className="uk-width-1-1" style={{ paddingLeft: 0 }}>
        <button type="button" className="uk-button uk-button-default" onClick={closeModal}>
          <span uk-icon="close" style={{ marginRight: '5px' }}></span>
          Cancel
        </button>

        <button type="button" className="uk-button uk-button-default uk-button-delete" onClick={handleOnDelete}>
          <span uk-icon="trash" style={{ marginRight: '5px' }}></span>
          Delete
        </button>
      </div>
    </Modal>
  )
}

export default NotebookItemModalDelete