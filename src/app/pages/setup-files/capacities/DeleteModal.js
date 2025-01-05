import React, {useEffect, useRef, useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {deleteCapacity} from '../_requests'

function DeleteModal(props) {
  const {show, onHide, onComplete, itemId} = props
  const [loading, setLoading] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [alertType, setAlertType] = useState('')
  const [alertMessage, setAlertMessage] = useState('success')

  const confirmHandler = () => {
    setConfirmDelete(true)
  }
  useEffect(() => {
    if (confirmDelete) {
      setLoading(true)
      try {
        deleteCapacity(itemId).then((res) => {
          setAlertType('success')
          setAlertMessage('')
          setConfirmDelete(false)
          setLoading(false)
          onComplete(false)
        })
      } catch (err) {
        setAlertType('danger')
        setAlertMessage(err.response.data.message)
        setLoading(false)
      }
    }
  }, [confirmDelete])
  return (
    <Modal show={show} onHide={onHide} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>delete item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alertType && (
          <div className={`mb-lg-15 alert alert-${alertType}`}>
            <div className='alert-text font-weight-bold'>{alertMessage}</div>
          </div>
        )}
        Please confirm that you want to delete this capacity
        <br />
        <span className='text-danger'>
          You Can Not Delete Any capacity That Is Linked To Any unit
        </span>
      </Modal.Body>
      <Modal.Footer>
        <button type='button' className='btn btn-light mt-5 mb-5' onClick={onHide}>
          cancel
        </button>
        <button
          type='submit'
          className='btn btn-primary mt-5 mb-5'
          onClick={confirmHandler}
          data-kt-indicator={loading && 'on'}
        >
          <span className='indicator-label'>Confirm</span>
          <span className='indicator-progress'>
            Confirm ...
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </span>
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal
