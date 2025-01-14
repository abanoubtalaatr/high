import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {Button, Modal} from 'react-bootstrap'
import {createBank} from './_requests'

function CreateModal(props) {
  const {show, onHide} = props
  
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required('this field is required')
      .min(2, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    order: Yup.string()
      .required('this field is required')
      ,
    active: Yup.string().required('this field is required'),
  })

  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')

  const initialValues = {
    name: '',
    order: '',
    
    active: '',
  }
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, {setStatus, resetForm, setFieldValue}) => {
      setLoading(true)
      try {
        await createBank(values.name, values.order, values.active).then((res) => {
          setAlertType('success')
          resetForm()
          setStatus(res.data.message)
          setShowModal(false)
          window.location.reload()
        })
      } catch (error) {
        setAlertType('danger')
        setStatus(error.response.data.message)
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    if (show) {
      setShowModal(true)
    }
  }, [show])

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>create Bank</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          {formik.status && (
            <div className={`mb-lg-15 alert alert-${alertType}`}>
              <div className='alert-text font-weight-bold'>{formik.status}</div>
            </div>
          )}
          {/* name */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>name:</label>
            <div className='col-sm-9'>
              <input
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('name')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.name && formik.errors.name,
                })}
                placeholder='Enter bank name'
              />
              {formik.touched.name && formik.errors.name && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* order */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>order:</label>
            <div className='col-sm-9'>
              <input
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('order')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.order && formik.errors.order,
                })}
                placeholder='Enter bank order'
              />
              {formik.touched.order && formik.errors.order && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.order}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* status */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>status:</label>
            <div className='col-sm-9'>
              <select
                {...formik.getFieldProps('active')}
                className='form-control form-control-solid'
              >
                <option value=''>select status</option>
                <option value='1'>active</option>
                <option value='0'>inactive</option>
              </select>
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
            <Button variant='btn btn-light mt-5 mb-5' onClick={onHide}>
              cancel
            </Button>
            <button type='submit' className='btn btn-primary mt-5 mb-5'>
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
