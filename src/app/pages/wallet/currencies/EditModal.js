import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {Button, Modal} from 'react-bootstrap'
import {getCurrency, updateCurrency} from '../_requests'

function EditModal(props) {
  const {show, onHide, itemId} = props
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
    
    active: Yup.string().required('this field is required'),
  })

  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiRespone, setApiRespone] = useState(false)
  const [countryState, setCountryState] = useState(true)
  const [countryErrorMessage, setCountryErrorMessage] = useState('')
  const [alertType, setAlertType] = useState('success')
  const [initialData, setInitialData] = useState({
    currency_name: '',
    currency_code: '',
    currency_API: '',
    active: '',
  })
  useEffect(() => {
    try {
      getCurrency(itemId).then((res) => {
        const newData = res.data.data
        console.log(newData)
        setInitialData({
          currency_name: newData.name,
          currency_code: newData.code,
          currency_API: newData.api,
          active: newData.active,
        })
        setApiRespone(true)
      })
    } catch (err) {
      setCountryState(true)
      setApiRespone(true)
      setCountryErrorMessage(err.response.data.message)
    }
  }, [])

  const initialValues = initialData
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, {setStatus, resetForm, setFieldValue}) => {
      setLoading(true)
      try {
        await updateCurrency(values.currency_name, values.currency_code, values.active, itemId).then(
          (res) => {
            setAlertType('success')
            resetForm()
            setStatus(res.data.message)
            setShowModal(false)
            window.location.reload()
          }
        )
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
        <Modal.Title>edit currency </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!apiRespone ? (
          'loading ...'
        ) : !countryState ? (
          <div className={`alert alert-danger d-flex align-items-center p-5 mb-0`}>
            <div className='d-flex flex-column'>{countryErrorMessage}</div>
          </div>
        ) : initialData.length === 0 ? (
          <h3>loading ...</h3>
        ) : (
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
                <span className='indicator-label'>update</span>
                <span className='indicator-progress'>
                  update ...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              </button>
            </div>
            {/* end form button */}
          </form>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default EditModal
