import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {Button, Modal} from 'react-bootstrap'
import {createCurrency} from '../_requests'

function CreateModal(props) {
  const {show, onHide} = props
  const urlPregExp =
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
  // form validation
  const formSchema = Yup.object().shape({
    currency_name: Yup.string()
      .required('this field is required')
      .min(2, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    currency_code: Yup.string()
      .required('this field is required')
      .min(2, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    currency_API: Yup.string()
      .required('this field is required')
      .matches(urlPregExp, 'URL is not valid'),
    active: Yup.string().required('this field is required'),
  })

  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')

  const initialValues = {
    currency_name: '',
    currency_code: '',
    currency_API: '',
    active: '',
  }
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, {setStatus, resetForm, setFieldValue}) => {
      setLoading(true)
      try {
        await createCurrency(values.currency_name, values.currency_code, values.active).then((res) => {
          setAlertType('success')
          resetForm()
          setStatus(res.data.message)
          setShowModal(false)
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
        <Modal.Title>create currency</Modal.Title>
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
                {...formik.getFieldProps('currency_name')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.currency_name && formik.errors.currency_name,
                })}
                placeholder='enter currency name'
              />
              {formik.touched.currency_name && formik.errors.currency_name && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.currency_name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* currency code */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>code:</label>
            <div className='col-sm-9'>
              <input
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('currency_code')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.currency_code && formik.errors.currency_code,
                })}
                placeholder='enter currency code'
              />
              {formik.touched.currency_code && formik.errors.currency_code && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.currency_code}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* currency API */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>API:</label>
            <div className='col-sm-9'>
              <input
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('currency_API')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.currency_API && formik.errors.currency_API,
                })}
                placeholder='enter API'
              />
              {formik.touched.currency_API && formik.errors.currency_API && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.currency_API}</span>
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
