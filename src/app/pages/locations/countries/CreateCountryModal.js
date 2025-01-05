import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import Select from 'react-select'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {Button, Modal} from 'react-bootstrap'
import {createCountry, getCurrencies, getTimezones} from '../_requests'
import CountrySearchMap from '../../../components/google-map/CountrySearchMap'

function CreateCountryModal(props) {
  const {show, onHide, onComplete} = props
  const numberRegExp = /^[0-9]+$/
  // form validation
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required('this field is required')
      .min(2, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    phone_code: Yup.string()
      .required('this field is required')
      .min(2, 'Minimum 3 symbols')
      .max(5, 'Maximum 50 symbols')
      .matches(numberRegExp, 'number is not valid'),
  })
  const mapCenter = {
    lat: 0,
    lng: 0,
  }
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')
  const [currenciesOptions, setCurrenciesOptions] = useState([])
  const [timezoneOptions, setTimezoneOptions] = useState([])

  const [googleMapDetails, setGoogleMapDetails] = useState(false)
  const statusOptions = [
    {value: '0', label: 'inactive'},
    {value: '1', label: 'active'},
  ]
  const initialValues = {
    name: '',
    phone_code: '',
    currency_id: '',
    timezone: '',
    active: statusOptions[0].value,
    iso: '',
    latitude: '',
    longitude: '',
    place_id: '',
  }
  const onHideHandler = () => {
    setAlertMessage('')
    formik.resetForm()
    onHide(false)
  }
  const currenciesOptionsHandler = (res) => {
    setCurrenciesOptions(
      res.map((el) => ({
        value: el.id,
        label: el.name,
      }))
    )
  }
  const timezoneOptionsHandler = (res) => {
    setTimezoneOptions(
      res.map((el) => ({
        value: el,
        label: el,
      }))
    )
  }
  const currenciesHandleChange = (e) => {
    formik.setFieldValue('currency_id', e.value)
  }
  const timezoneHandleChange = (e) => {
    console.log(e.value)
    formik.setFieldValue('timezone', e.value)
  }
  const mapResult = (result) => {
    console.log(result)
    if (result) {
      setGoogleMapDetails(true)
      formik.setFieldValue('iso', result.short_name)
      formik.setFieldValue('place_id', result.place_id)
      formik.setFieldValue('latitude', result.location.lat())
      formik.setFieldValue('longitude', result.location.lng())
    } else {
      setAlertMessage('please select map')
    }
  }
  useEffect(() => {
    if (show) {
      // Currencies
      getCurrencies()
        .then((res) => {
          currenciesOptionsHandler(res.data.data)
        })
        .catch((err) => {
          currenciesOptionsHandler([])
        })
      // Timezones
      getTimezones()
        .then((res) => {
          timezoneOptionsHandler(res.data.data)
        })
        .catch((err) => {
          timezoneOptionsHandler([])
        })
    }
  }, [show])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, {setStatus, resetForm, setFieldValue}) => {
      if (googleMapDetails) {
        setLoading(true)
        try {
          await createCountry(values).then((res) => {
            setAlertType('success')
            resetForm()
            setStatus(res.data.message)
            setShowModal(false)
            onComplete(true)
            setAlertMessage('')
          })
        } catch (error) {
          setAlertType('danger')
          setStatus(error.response.data.message)
          setAlertMessage(error.response.data.message)
          setLoading(false)
        }
      } else {
        setAlertType('danger')
        setAlertMessage('Please Select the location on the Map')
      }
    },
  })

  return (
    <Modal show={show} onHide={onHideHandler} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>create new country</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} autoComplete='off'>
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
                {...formik.getFieldProps('name')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.name && formik.errors.name,
                })}
                placeholder='enter country name'
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
          {/* country code */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>phone code:</label>
            <div className='col-sm-9'>
              <input
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('phone_code')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.phone_code && formik.errors.phone_code,
                })}
                placeholder='enter phone code'
              />
              {formik.touched.phone_code && formik.errors.phone_code && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.phone_code}</span>
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
                defaultValue={statusOptions[0]}
                options={statusOptions}
                name='active'
                onChange={(selectedOption) => {
                  formik.setFieldValue('active', selectedOption.value)
                }}
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
          {/* currency */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>currency:</label>
            <div className='col-sm-9'>
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                options={currenciesOptions}
                name='currency_id'
                onChange={currenciesHandleChange}
              />
              {formik.touched.currency_id && formik.errors.currency_id && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.currency_id}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* time zone */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>time zone:</label>
            <div className='col-sm-9'>
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                options={timezoneOptions}
                name='timezone'
                onChange={timezoneHandleChange}
              />
              {formik.touched.timezone && formik.errors.timezone && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.timezone}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* google map */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>map:</label>
            <div className='col-sm-9'>
              <div className='w-100 h-300px'>
                <CountrySearchMap center={mapCenter} marker={false} mapResult={mapResult} />
              </div>
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

export default CreateCountryModal
