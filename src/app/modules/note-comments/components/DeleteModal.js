import React, {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {deleteComment, deleteNoteComment} from '../_requests'
import {useParams} from 'react-router-dom'

function DeleteModal(props) {
  const {show, onHide, noteId, mainNote, onComplete} = props
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
        deleteNoteComment(noteId).then((res) => {
          setAlertType('success')
          // setAlertMessage(res.data.message)
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
        <Modal.Title>delete note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alertType && (
          <div className={`mb-lg-15 alert alert-${alertType}`}>
            <div className='alert-text font-weight-bold'>{alertMessage}</div>
          </div>
        )}
        {mainNote ? (
          <div className='d-flex flex-column'>
            <span className=''>are you sure you want to delete this note post?</span>

            <span className='text-danger'>
              please note that deleting this note post will delete all related comments!
            </span>
          </div>
        ) : (
          <span className=''>are you sure that you to delete this comment?</span>
        )}
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
