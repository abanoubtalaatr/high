import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import Select from 'react-select'
import { useFormik } from 'formik'
import { Button, Modal } from 'react-bootstrap'
import { createDocument } from './_requests'
import { useParams } from 'react-router-dom'

function CreateModal(props) {
  const { show, onHide, onComplete, location } = props
  const { codeId } = useParams()
  // form validation
  const formSchema = Yup.object().shape({
    doc_name: Yup.string()
      .required('this field is required')
      .min(2, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
  })
  const requiredOptions = [
    { value: '1', label: 'required' },
    { value: '0', label: 'not required' },
  ]
  const [loading, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('success')
  const initialValues = {
    doc_name: '',
    required: requiredOptions[0].value,
  }
  const onHideHandler = () => {
    setAlertMessage('')
    formik.resetForm()
    onHide(false)
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, { setStatus, resetForm }) => {
      setLoading(true)
      try {
        await createDocument(values.doc_name, values.required, codeId, location).then((res) => {
          setAlertType('success')
          resetForm()
          // setStatus(res.data.message)
          setAlertMessage('')
          onComplete(true)
          setLoading(false)
        })
      } catch (error) {
        setAlertType('danger')
        // setStatus(error.response.data.message)
        setAlertMessage(error.response.data.message)
        setLoading(false)
      }
    },
  })
  return (
    <Modal show={show} onHide={onHideHandler} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>create new document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          {alertMessage && (
            <div className={`mb-lg-15 alert alert-${alertType}`}>
              <div className='alert-text font-weight-bold'>{alertMessage}</div>
            </div>
          )}
          {/* name */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>name:</label>
            <div className='col-sm-9'>
              <input
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('doc_name')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.doc_name && formik.errors.doc_name,
                })}
                placeholder='Enter document name'
              />
              {formik.touched.doc_name && formik.errors.doc_name && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.doc_name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* status */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>required:</label>
            <div className='col-sm-9'>
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                defaultValue={requiredOptions[0]}
                value={requiredOptions[0]}
                options={requiredOptions}
                name='required'
                onChange={(selectedOption) => {
                  formik.setFieldValue('required', selectedOption.value)
                }}
              />
              {formik.touched.required && formik.errors.required && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.required}</span>
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
              <span className='indicator-label'>create</span>
              <span className='indicator-progress'>
                create ...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            </button>
          </div>
          {/* end form button */}
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateModal
