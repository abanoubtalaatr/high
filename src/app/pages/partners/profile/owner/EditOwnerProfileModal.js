import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useParams} from 'react-router-dom'
import {useFormik} from 'formik'
import {Modal} from 'react-bootstrap'
import {updateOwnerInfo} from '../../_requests'
import clsx from 'clsx'
import CountryDropdown from './CountryDropdown'; // Import the new component

function EditOwnerProfileModal(props) {
  const {userId} = useParams()
  const {show, onHide, onComplete, name, email, phone, country} = props
  console.log(country, 'country selected')
  const [selectedCountry, setSelectedCountry] = useState('');
  // Add this handler for the country selection
  const handleCountryChange = (countryCode) => {
    
    setSelectedCountry(countryCode);
    
  };
  useEffect(() => {
    setSelectedCountry(country);
  }, [country])

  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
  // form validation
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required('this field is required')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    email: Yup.string()
      .email('Wrong email format')
      .required('this field is required')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    phone: Yup.string()
      .required('this field is required')
      .matches(phoneRegExp, 'phone number is not valid'),
  })

  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [initialValues, setinitialValues] = useState({
    name: name,
    email: email,
    phone: phone,
    
  })

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, {setStatus, resetForm}) => {
      setLoading(true)
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('phone', values.phone)
      formData.append('country', selectedCountry);
      try {
        await updateOwnerInfo(formData, userId).then((res) => {
          resetForm()
          setAlertType('success')
          setLoading(false)
          onComplete()
        })
      } catch (error) {
        setAlertType('danger')
        setStatus(error.response.data.message)
        setLoading(false)
      }
    },
  })
  return (
    <Modal show={show} onHide={onHide} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>update owner info</Modal.Title>
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
                placeholder='enter name'
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
          {/* email */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>email:</label>
            <div className='col-sm-9'>
              <input
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('email')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.email && formik.errors.email,
                })}
                placeholder='enter email'
              />
              {formik.touched.email && formik.errors.email && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.email}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* phone */}
          <div className="row mb-5">
            <label className="col-sm-3 form-label fw-bold">Country:</label>
            <div className="col-sm-9">
              <CountryDropdown onSelect={handleCountryChange} selectedCountry={selectedCountry}/>
            </div>
          </div>
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>phone:</label>
            <div className='col-sm-9'>
              <div className='input-group mb-3'>
                <input
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('phone')}
                  className={clsx('form-control form-control-solid', {
                    'is-invalid': formik.touched.phone && formik.errors.phone,
                  })}
                  placeholder='enter phone'
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.phone}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* form button */}
          <div className='d-flex justify-content-between'>
            <button type='button' className='btn btn-light mt-5 mb-5' onClick={onHide}>
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
      </Modal.Body>
    </Modal>
  )
}

export default EditOwnerProfileModal
