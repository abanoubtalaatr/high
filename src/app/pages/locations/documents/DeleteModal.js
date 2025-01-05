import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { deleteDocument } from './_requests'
import { useParams } from 'react-router-dom'

function DeleteModal(props) {
  const { show, onHide, onComplete, itemId, location } = props
  const { codeId } = useParams()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [alertType, setAlertType] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const confirmHandler = () => {
    setConfirmDelete(true)
  }

  useEffect(() => {
    if (confirmDelete) {
      setLoading(true)
      try {
        deleteDocument(codeId, location, itemId).then((res) => {
          setAlertType('success')
          setAlertMessage('')
          setConfirmDelete(false)
          onComplete(false)
          setLoading(false)
        })
      } catch (err) {
        setLoading(false)
        setAlertType('danger')
        setAlertMessage(err.response.data.message)
      }
    }
  }, [confirmDelete])
  return (
    <Modal show={show} onHide={onHide} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>delete item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alertMessage && (
          <div className={`mb-lg-15 alert alert-${alertType}`}>
            <div className='alert-text font-weight-bold'>{alertMessage}</div>
          </div>
        )}
        Please confirm that you want to delete this document
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
