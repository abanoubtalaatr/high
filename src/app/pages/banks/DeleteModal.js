import React, {useEffect, useRef, useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {deleteBank} from './_requests'

function DeleteModal(props) {
  const {show, onHide, itemId} = props
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [alertType, setAlertType] = useState('')
  const [alertMessage, setAlertMessage] = useState('success')

  const confirmHandler = () => {
    setConfirmDelete(true)
  }
  useEffect(() => {
    if (show) {
      setShowModal(true)
    }
  }, [show])
  useEffect(() => {
    if (confirmDelete) {
      const deleteBankHandler = async () => {
        try {
          const res = await deleteBank(itemId);
          if (res.data.success) {
            setAlertType('success');
            setAlertMessage(res.data.message);
            setShowModal(false);
            window.location.reload();
          } else {
            setAlertType('danger');
            setAlertMessage(res.data.message); // Use `res.data.message` for server responses.
          }
        } catch (err) {
          // Handle 422 and other errors
          if (err.response && err.response.status === 422) {
            setAlertType('danger');
            setAlertMessage(err.response.data.message); // Message from server
          } else {
            setAlertType('danger');
            setAlertMessage('An unexpected error occurred.'); // Fallback for unexpected errors
          }
        } finally {
          setConfirmDelete(false); // Reset `confirmDelete` after handling
        }
      };
  
      deleteBankHandler();
    }
  }, [confirmDelete, itemId]);
  
  return (
    <Modal show={showModal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>delete item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alertType && (
          <div className={`mb-lg-15 alert alert-${alertType}`}>
            <div className='alert-text font-weight-bold'>{alertMessage}</div>
          </div>
        )}
        Please confirm that you want to delete this item
        <br />
        {/* <span className='text-danger'>You Can Not Delete Any type That Is Linked To Any unit</span> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Cancel
        </Button>
        <Button variant='primary' onClick={confirmHandler}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal
