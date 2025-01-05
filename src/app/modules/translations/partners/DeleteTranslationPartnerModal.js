import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { deleteTranslation } from '../_requests'
import { useLocation } from 'react-router-dom'

function DeleteTranslationPartnerModal(props) {
  const location = useLocation()
  const itemDetails = location.state
  const { show, onHide, onComplete, translateItemDetails, modelName } = props
  const [loading, setLoading] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [alertType, setAlertType] = useState('')
  const [alertMessage, setAlertMessage] = useState('success')
  const values = {
    company_name: translateItemDetails.translations[0].translation,
    bio: translateItemDetails.translations[1].translation,
  }

  const confirmHandler = () => {
    setConfirmDelete(true)
  }
  useEffect(() => {
    if (confirmDelete) {
      setLoading(true)
      const vals = {
        lang: translateItemDetails.lang,
        column_name: '',
        translation: '',
      }
      translateItemDetails.translations.map((tr) => {
        if (tr.column_name === 'company_name') {
          vals.column_name = tr.column_name
          vals.translation = values.company_name
          try {
            deleteTranslation(vals, modelName, itemDetails.id).then((res) => {
              setAlertType('success')
              setAlertMessage('')
              setConfirmDelete(false)
              setLoading(false)
              onComplete(false)
            })
          } catch (error) {
            setAlertType('danger')
            setAlertMessage(error.response.data.message)
            setLoading(false)
          }
        }
        if (tr.column_name === 'bio') {
          vals.column_name = tr.column_name
          vals.translation = values.bio
          try {
            deleteTranslation(vals, modelName, itemDetails.id).then((res) => {
              setAlertType('success')
              setAlertMessage('')
              setConfirmDelete(false)
              setLoading(false)
              onComplete(false)
            })
          } catch (error) {
            setAlertType('danger')
            setAlertMessage(error.response.data.message)
            setLoading(false)
          }
        }
      })
      // try {
      //   deleteTranslation(values, modelName, itemDetails.id).then((res) => {
      //     setAlertType('success')
      //     setAlertMessage('')
      //     setConfirmDelete(false)
      //     setLoading(false)
      //     onComplete(false)
      //   })
      // } catch (err) {
      //   setAlertType('danger')
      //   setAlertMessage(err.response.data.message)
      //   setLoading(false)
      // }
    }
  }, [confirmDelete])
  return (
    <Modal show={show} onHide={onHide} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>delete translated item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alertType && (
          <div className={`mb-lg-15 alert alert-${alertType}`}>
            <div className='alert-text font-weight-bold'>{alertMessage}</div>
          </div>
        )}
        Please confirm that you want to delete this translated item
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

export default DeleteTranslationPartnerModal
