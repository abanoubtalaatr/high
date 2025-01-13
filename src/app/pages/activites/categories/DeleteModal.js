import React, {useEffect, useRef, useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import { deleteType } from '../../setup-files/_requests'
import { deleteCategory } from '../_requests'


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
      try {
        deleteCategory(itemId).then((res) => {
          setAlertType('success')
          setAlertMessage(res.data.message)
          setConfirmDelete(true)
          setShowModal(true)
          console.log('here ')
        })
      } catch (err) {
        setAlertType('danger')
        setAlertMessage(err.response.data.message)
      }
    }
  }, [confirmDelete])
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
        <br/>
        <span className='text-danger'>You Can Not Delete Any type That Is Linked To Any unit</span>
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
