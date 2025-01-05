import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { Modal } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'
import { updateTranslation } from '../_requests'

function EditTranslationPartnerModal(props) {
  const location = useLocation()
  const itemDetails = location.state
  const { show, onHide, onComplete, translateItemDetails, modelName } = props
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')
  const [initialValues, setInitialValues] = useState({
    company_name: translateItemDetails.translations[0].translation,
    bio: translateItemDetails.translations[1].translation,
  })
  const onHideHandler = () => {
    formik.resetForm()
    onHide(false)
  }
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, { setStatus, resetForm, setFieldValue }) => {
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
            updateTranslation(vals, modelName, itemDetails.id).then((res) => {
              resetForm()
              setAlertType('success')
              // setStatus(res.data.message)
              setAlertMessage(res.data.message)
              setLoading(false)
              onComplete(true)
            })
          } catch (error) {
            setAlertType('danger')
            // setStatus(error.response.data.message)
            setAlertMessage(error.response.data.message)
            setLoading(false)
          }
        }
        if (tr.column_name === 'bio') {
          vals.column_name = tr.column_name
          vals.translation = values.bio
          try {
            updateTranslation(vals, modelName, itemDetails.id).then((res) => {
              resetForm()
              setAlertType('success')
              // setStatus(res.data.message)
              setAlertMessage(res.data.message)
              setLoading(false)
              onComplete(true)
            })
          } catch (error) {
            setAlertType('danger')
            // setStatus(error.response.data.message)
            setAlertMessage(error.response.data.message)
            setLoading(false)
          }
        }
      })
      // navigate(`../translations/${itemDetails.id}`, { state: { ...itemDetails } })
    },
  })
  return (
    <Modal show={show} onHide={onHideHandler} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>edit translates {itemDetails.name} ({translateItemDetails.name})</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
            {alertMessage && (
              <div className={`mb-lg-15 alert alert-${alertType}`}>
                <div className='alert-text font-weight-bold'>{alertMessage}</div>
              </div>
            )}
            {/* name */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>company_name:</label>
              <div className='col-sm-9'>
                <input
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('company_name')}
                  className={clsx('form-control form-control-solid', {
                    'is-invalid': formik.touched.company_name && formik.errors.company_name,
                  })}
                  placeholder='enter translate'
                />
                {formik.touched.company_name && formik.errors.company_name && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.company_name}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Bio */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>bio:</label>
              <div className='col-sm-9'>
                <textarea
                  placeholder='enter bio'
                  rows='5'
                  className={clsx('form-control form-control-solid', {
                    'is-invalid': formik.touched.bio && formik.errors.bio,
                  })}
                  {...formik.getFieldProps('bio')}
                ></textarea>
                {formik.touched.bio && formik.errors.bio && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.bio}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* form button */}
            <div className='d-flex justify-content-between'>
              <button type='button' className='btn btn-light mt-5 mb-5' onClick={onHideHandler}>
                cancel
              </button>
              <button
                type='submit'
                className='btn btn-primary mt-5 mb-5'
                data-kt-indicator={loading && 'on'}
              >
                <span className='indicator-label'>update</span>
                <span className='indicator-progress'>
                  update ...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              </button>
            </div>
            {/* end form button */}
          </form>
        }
      </Modal.Body>
    </Modal>
  )
}

export default EditTranslationPartnerModal
