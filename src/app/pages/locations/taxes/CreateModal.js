import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import Select from 'react-select'
import { useFormik } from 'formik'
import { Button, Modal } from 'react-bootstrap'
import { createTax } from './_requests'
import { useParams } from 'react-router-dom'

function CreateModal(props) {
  const { show, onHide, onComplete, location } = props
  const { codeId } = useParams()
  const numberRegExp = /^[0-9]+$/
  // form validation
  const formSchema = Yup.object().shape({
    tax_name: Yup.string()
      .required('this field is required')

      .max(50, 'Maximum 50 symbols'),
    tax: Yup.string()
      .required('this field is required')
      .max(5, 'Maximum 50 symbols')
      .matches(numberRegExp, 'number is not valid'),
  })

  const [loading, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('success')
  const statusOptions = [
    { value: '0', label: 'inactive' },
    { value: '1', label: 'active' },
  ]
  const [statusChoice, setStatusChoice] = useState(statusOptions[0])
  const initialValues = {
    tax_name: '',
    tax: '',
    active: statusOptions[0].value,
  }
  const onHideHandler = () => {
    setAlertMessage('')
    formik.resetForm()
    onHide(false)
  }

  const statusHandleChange = (choice) => {
    setStatusChoice(choice)
    formik.setFieldValue('active', choice.value)
  }
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, { setStatus, resetForm }) => {
      setLoading(true)
      try {
        await createTax(values.tax_name, values.tax, values.active, codeId, location).then(
          (res) => {
            setAlertType('success')
            resetForm()
            // setStatus(res.data.message)
            setAlertMessage('')
            onComplete(true)
            setLoading(false)
          }
        )
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
        <Modal.Title>create new tax</Modal.Title>
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
                {...formik.getFieldProps('tax_name')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.tax_name && formik.errors.tax_name,
                })}
                placeholder='enter tax name'
              />
              {formik.touched.tax_name && formik.errors.tax_name && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.tax_name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* tax */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>tax:</label>
            <div className='col-sm-9'>
              <input
                type='number'
                autoComplete='off'
                {...formik.getFieldProps('tax')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.tax && formik.errors.tax,
                })}
                placeholder='enter tax percentage'
              />
              {formik.touched.tax && formik.errors.tax && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.tax}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* status */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>status:</label>
            <div className='col-sm-9'>
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                options={statusOptions}
                defaultValue={statusChoice}
                value={statusChoice}
                name='active'
                onChange={statusHandleChange}
              />
              {formik.touched.active && formik.errors.active && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.active}</span>
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
