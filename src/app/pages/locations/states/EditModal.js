import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import Select from 'react-select'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {Modal} from 'react-bootstrap'
import {getGeneralCountries, updateState} from '../_requests'
import StateSearchMap from '../../../components/google-map/StateSearchMap'

function EditModal(props) {
  const {show, onHide, onComplete, itemDetails} = props
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required('this field is required')
      .min(2, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    country: Yup.string().required('this field is required'),
  })
  const statusOptions = [
    {value: '0', label: 'inactive'},
    {value: '1', label: 'active'},
  ]

  const [mapCenter, setMapCenter] = useState({
    lat: Number(itemDetails.latitude) || 0,
    lng: Number(itemDetails.longitude) || 0,
  })
  const [showModal, setShowModal] = useState(false)
  const loadOptions = [{value: '', label: 'loading ...'}]
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')
  const [isCountriesLoading, setIsCountriesLoading] = useState(false)
  const [isCountriesDisabled, setIsCountriesDisabled] = useState(false)
  const [countriesOptions, setCountriesOptions] = useState([])
  const [countryChoice, setCountryChoice] = useState([])
  const [countryIso, setCountryIso] = useState(itemDetails.country ? itemDetails.country.iso : '')
  const [statusChoice, setStatusChoice] = useState([])
  const [loadMap, setLoadMap] = useState(false)
  const [googleMapDetails, setGoogleMapDetails] = useState(false)
  const [initialValues, setInitialValues] = useState({
    name: itemDetails.name || '',
    country: itemDetails.country ? itemDetails.country.iso : '',
    active: itemDetails.active || '0',
    latitude: itemDetails.latitude || '',
    longitude: itemDetails.longitude || '',
    place_id: itemDetails.place_id || '',
  })
  const onHideHandler = () => {
    setAlertMessage('')
    setCountryChoice([])
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
  const countriesOptionsHandler = (res) => {
    setCountriesOptions(
      res.map((el) => ({
        value: el.iso,
        label: el.name,
      }))
    )
  }
  const countryDefaultValue = () => {
    const value = countriesOptions.filter((option) => option.value == initialValues.country)
    const defaultValue = value.length === 0 ? countriesOptions[0] : value
    setCountryChoice(defaultValue)
  }
  const statusDefaultValue = () => {
    const value = statusOptions.filter((option) => option.value == initialValues.active)
    const defaultValue = value.length === 0 ? statusOptions[0] : value
    setStatusChoice(defaultValue)
  }

  const statusHandleChange = (choice) => {
    setStatusChoice(choice)
    formik.setFieldValue('active', choice.value)
  }
  const countriesHandleChange = (choice) => {
    setLoadMap(false)
    setGoogleMapDetails(false)
    setCountryChoice(choice)
    setCountryIso(choice.value)
    setMapCenter({...mapCenter, lat: 0, lng: 0})
    formik.setFieldValue('country', choice.value)
  }
  const mapResult = (result) => {
    if (result && result.place_id) {
      setGoogleMapDetails(true)
      formik.setFieldValue('place_id', result.place_id)
      formik.setFieldValue('latitude', result.location.lat())
      formik.setFieldValue('longitude', result.location.lng())
    } else {
      setAlertMessage('please select map')
    }
  }

  useEffect(() => {
    setLoadMap(true)
  }, [countryIso])

  useEffect(() => {
    if (show) {
      setIsCountriesLoading(true)
      setIsCountriesDisabled(true)
      locationHandler()
      statusDefaultValue()
      getGeneralCountries()
        .then((res) => {
          countriesOptionsHandler(res.data.data)
          setIsCountriesLoading(false)
          setIsCountriesDisabled(false)
        })
        .catch((err) => {
          countriesOptionsHandler([])
          setIsCountriesLoading(false)
          setIsCountriesDisabled(false)
        })
    }
  }, [show])
  useEffect(() => {
    countryDefaultValue()
  }, [countriesOptions])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, {setStatus, resetForm}) => {
      if (googleMapDetails) {
        setLoading(true)
        try {
          await updateState(values, itemDetails.id).then((res) => {
            setAlertType('success')
            resetForm()
            setStatus(res.data.message)
            setAlertMessage(res.data.message)
            setShowModal(false)
            onComplete(true)
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
        <Modal.Title>edit state </Modal.Title>
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
          {/* Countries */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>Country:</label>
            <div className='col-sm-9'>
              <Select
                isLoading={isCountriesLoading}
                isDisabled={isCountriesDisabled}
                isSearchable={true}
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='select country'
                name='country'
                defaultValue={countryChoice}
                value={!isCountriesLoading ? countryChoice : loadOptions[0]}
                options={countriesOptions}
                onChange={countriesHandleChange}
              />
              {formik.touched.country && formik.errors.country && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.country}</span>
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
                onChange={statusHandleChange}
                name='active'
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
          {/* map */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>map:</label>
            <div className='col-sm-9'>
              <div className='w-100 h-300px'>
                {loadMap && (
                  <StateSearchMap
                    center={mapCenter}
                    marker={false}
                    mapResult={mapResult}
                    countryIso={countryIso}
                  />
                )}
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

export default EditModal
