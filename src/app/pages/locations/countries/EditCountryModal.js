import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import Select from 'react-select'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { Button, Modal } from 'react-bootstrap'
import { getCurrencies, getTimezones, updateCountry } from '../_requests'
import CountrySearchMap from '../../../components/google-map/CountrySearchMap'

function EditCountryModal(props) {
  const { show, onHide, onComplete, itemDetails } = props
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
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')

  const loadOptions = [{ value: '', label: 'loading ...' }]
  const [alertMessage, setAlertMessage] = useState('')
  const [isCurrenciesLoading, setIsCurrenciesLoading] = useState(false)
  const [isCurrenciesDisabled, setIsCurrenciesDisabled] = useState(false)
  const [isTimezoneLoading, setIsTimezoneLoading] = useState(false)
  const [isTimezoneDisabled, setIsTimezoneDisabled] = useState(false)
  const [currenciesOptions, setCurrenciesOptions] = useState([])
  const [currencyChoice, setCurrencyChoice] = useState([])
  const [timezoneOptions, setTimezoneOptions] = useState([])
  const [timezoneChoice, setTimezoneChoice] = useState([])
  const [statusChoice, setStatusChoice] = useState([])
  const [googleMapDetails, setGoogleMapDetails] = useState(false)
  const statusOptions = [
    { value: '0', label: 'inactive' },
    { value: '1', label: 'active' },
  ]
  const [initialValues, setInitialValues] = useState({
    name: itemDetails.name || '',
    phone_code: itemDetails.phone_code || '',
    currency_id: itemDetails.currency ? itemDetails.currency.id : '',
    timezone: itemDetails.timezone || '',
    active: itemDetails.active || '0',
    iso: itemDetails.iso || '',
    latitude: itemDetails.latitude || '',
    longitude: itemDetails.longitude || '',
    place_id: itemDetails.place_id || '',
  })
  const onHideHandler = () => {
    setAlertMessage('')
    formik.resetForm()
    onHide(false)
  }
  const locationHandler = () => {
    if (initialValues.latitude == '' || initialValues.longitude == '') {
      setGoogleMapDetails(false)
    } else {
      setGoogleMapDetails(true)
    }
  }
  const currenciesDefaultValue = () => {
    const value = currenciesOptions.filter((option) => option.value == initialValues.currency_id)
    const defaultValue = value.length === 0 ? currenciesOptions[0] : value
    formik.setFieldValue('currency_id', initialValues.currency_id)
    setCurrencyChoice(defaultValue)
  }
  const timezoneDefaultValue = () => {
    const value = timezoneOptions.filter((option) => option.value == initialValues.timezone)
    const defaultValue = value.length === 0 ? timezoneOptions[0] : value
    formik.setFieldValue('timezone', initialValues.timezone)
    setTimezoneChoice(defaultValue)
  }
  const statusDefaultValue = () => {
    const value = statusOptions.filter((option) => option.value == initialValues.active)
    const defaultValue = value.length === 0 ? statusOptions[0] : value
    setStatusChoice(defaultValue)
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
  const onChangeStatus = (choice) => {
    setStatusChoice(choice)
    formik.setFieldValue('active', choice.value)
  }
  const onChangeCurrency = (choice) => {
    setCurrencyChoice(choice)
    formik.setFieldValue('currency_id', choice.value)
  }
  const onChangeTimezone = (choice) => {
    setTimezoneChoice(choice)
    formik.setFieldValue('timezone', choice.value)
  }
  const mapCenter = {
    lat: Number(itemDetails.latitude) || 0,
    lng: Number(itemDetails.longitude) || 0,
  }
  const mapResult = (result) => {
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
      locationHandler()
      statusDefaultValue()
      setIsTimezoneLoading(true)
      setIsTimezoneDisabled(true)
      setIsCurrenciesLoading(true)
      setIsCurrenciesDisabled(true)
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
          setIsTimezoneLoading(false)
          setIsTimezoneDisabled(false)
          setIsCurrenciesLoading(false)
          setIsCurrenciesDisabled(false)
        })
        .catch((err) => {
          timezoneOptionsHandler([])
          setIsTimezoneLoading(false)
          setIsTimezoneDisabled(false)
          setIsCurrenciesLoading(false)
          setIsCurrenciesDisabled(false)
        })
    }
  }, [show])
  useEffect(() => {
    currenciesDefaultValue()
  }, [currenciesOptions])
  useEffect(() => {
    timezoneDefaultValue()
  }, [timezoneOptions])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, { setStatus, resetForm }) => {
      if (googleMapDetails) {
        setLoading(true)
        try {
          await updateCountry(values, itemDetails.iso).then((res) => {
            setAlertType('success')
            resetForm()
            // setStatus(res.data.message)
            setAlertMessage('')
            setShowModal(false)
            onComplete(true)
            setLoading(false)
          })
        } catch (error) {
          setAlertType('danger')
          // setStatus(error.response.data.message)
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
        <Modal.Title>edit country </Modal.Title>
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
                placeholder='employee name'
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
                defaultValue={statusChoice}
                value={statusChoice}
                options={statusOptions}
                name='active'
                onChange={onChangeStatus}
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
                isDisabled={isCurrenciesDisabled}
                defaultValue={!isCurrenciesDisabled ? currencyChoice : loadOptions[0]}
                value={!isCurrenciesDisabled ? currencyChoice : loadOptions[0]}
                options={currenciesOptions}
                name='currency_id'
                onChange={onChangeCurrency}
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
                isDisabled={isTimezoneDisabled}
                defaultValue={!isTimezoneDisabled ? timezoneChoice : loadOptions[0]}
                value={!isTimezoneDisabled ? timezoneChoice : loadOptions[0]}
                options={timezoneOptions}
                name='timezone'
                onChange={onChangeTimezone}
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
                <CountrySearchMap center={mapCenter} marker={true} mapResult={mapResult} />
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

export default EditCountryModal
