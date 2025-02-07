import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import Select from 'react-select'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {Button, Modal} from 'react-bootstrap'
import {getCountries, getStates, updateCity} from '../_requests'
import CitiesSearchMap from '../../../components/google-map/CitiesSearchMap'

function EditModal(props) {
  const {show, onHide, onComplete, itemDetails} = props
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required('this field is required')
      .min(2, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    country: Yup.string().required('this field is required'),
    active: Yup.string().required('this field is required'),
  })
  const statusOptions = [
    {value: '0', label: 'inactive'},
    {value: '1', label: 'active'},
  ]
  const mapCenter = {
    lat: Number(itemDetails.latitude) || 0,
    lng: Number(itemDetails.longitude) || 0,
  }
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')
  const loadOptions = [{value: '', label: 'loading ...'}]
  const DefOptions = [{value: '', label: 'select'}]
  const [isCountriesLoading, setIsCountriesLoading] = useState(false)
  const [isCountriesDisabled, setIsCountriesDisabled] = useState(false)
  const [isStatesLoading, setIsStatesLoading] = useState(false)
  const [isStatesDisabled, setIsStatesDisabled] = useState(false)
  const [countriesOptions, setCountriesOptions] = useState([])
  const [countryChoice, setCountryChoice] = useState([])
  const [stateChoice, setStateChoice] = useState([])
  const [statesOptions, setStatesOptions] = useState([])
  const [states, setStates] = useState([])
  const [statusChoice, setStatusChoice] = useState([])

  const [loadMap, setLoadMap] = useState(false)
  const [loadMapMessage, setLoadMapMessage] = useState('please select country and state')
  const [googleMapDetails, setGoogleMapDetails] = useState(false)
  const [initialValues, setInitialValues] = useState({
    name: itemDetails.name || '',
    country: itemDetails.country ? itemDetails.country.iso : '',
    state_id: itemDetails.state ? itemDetails.state.id : '',
    active: itemDetails.active || '0',
    latitude: itemDetails.latitude || '',
    longitude: itemDetails.longitude || '',
    place_id: itemDetails.place_id || '',
  })
  const [countryIso, setCountryIso] = useState(initialValues.country)
  const [statePlaceId, setStatePlaceId] = useState(
    itemDetails.state ? itemDetails.state.place_id : ''
  )
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
  const stateDefaultValue = () => {
    const value = statesOptions.filter((option) => option.value == initialValues.state_id)
    const defaultValue = value.length === 0 ? statesOptions[0] : value
    setStateChoice(defaultValue)
  }
  const statePlaceIdHandler = (stateChoiceId) => {
    const stateChoice = states.filter((option) => option.id == stateChoiceId)
    if (stateChoice.length > 0) {
      setStatePlaceId(stateChoice[0].place_id)
      if (stateChoice[0].place_id) {
        setGoogleMapDetails(false)
        setLoadMap(true)
      } else {
        setLoadMap(false)
        setGoogleMapDetails(false)
        setLoadMapMessage(`this state does not have an place id.`)
      }
    } else {
      setLoadMap(false)
    }
  }
  const statusDefaultValue = () => {
    const value = statusOptions.filter((option) => option.value == initialValues.active)
    const defaultValue = value.length === 0 ? statusOptions[0] : value
    setStatusChoice(defaultValue)
  }

  const mapResult = (result) => {
    if (result && result.place_id) {
      setAlertMessage('')
      setGoogleMapDetails(true)
      formik.setFieldValue('place_id', result.place_id)
      formik.setFieldValue('latitude', result.location.lat())
      formik.setFieldValue('longitude', result.location.lng())
    } else {
      setGoogleMapDetails(false)
      setAlertType('danger')
      setAlertMessage('The selected area is not within the governorate boundaries')
    }
  }

  // on change
  const onChangeCountry = (choice) => {
    setIsStatesLoading(true)
    setIsStatesDisabled(true)
    setCountryChoice(choice)
    setCountryIso(choice.value)
    setStateChoice(DefOptions[0])
    setStatesOptions(DefOptions)
    formik.setFieldValue('country', choice.value)
    if (choice.value) {
      getStatesHandler(choice.value)
    } else {
      setStatesOptions(DefOptions)
      setIsStatesLoading(false)
      setIsStatesDisabled(false)
    }
  }

  const onChangeState = (choice) => {
    setStateChoice(choice)
    statePlaceIdHandler(choice.value)
    formik.setFieldValue('state_id', choice.value)
  }
  const statusHandleChange = (choice) => {
    setStatusChoice(choice)
    formik.setFieldValue('active', choice.value)
  }
  const getStatesHandler = (countryIso) => {
    setLoadMap(false)
    getStates({country_iso: countryIso})
      .then((res) => {
        if (res.data.data.length > 0) {
          setStatesOptions(
            res.data.data.map((el) => ({
              value: el.id,
              label: el.name,
            }))
          )
          setStates(res.data.data)
          setLoadMap(true)
        } else {
          setStatesOptions(DefOptions)
          setStateChoice(DefOptions[0])
        }
        setIsStatesLoading(false)
        setIsStatesDisabled(false)
      })
      .catch((err) => {
        setStatesOptions(DefOptions)
        setStateChoice(DefOptions[0])
        setIsStatesLoading(false)
        setIsStatesDisabled(false)
      })
  }
  useEffect(() => {
    if (show) {
      locationHandler()
      statusDefaultValue()
      getStatesHandler(initialValues.country)
      getCountries()
        .then((res) => {
          countriesOptionsHandler(res.data.data)
        })
        .catch((err) => {
          countriesOptionsHandler([])
        })
    }
  }, [show])

  useEffect(() => {
    countryDefaultValue()
  }, [countriesOptions])
  useEffect(() => {
    stateDefaultValue()
  }, [statesOptions])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, {setStatus, resetForm, setFieldValue}) => {
      if (googleMapDetails) {
        setLoading(true)
        try {
          await updateCity(values, itemDetails.id).then((res) => {
            setAlertType('success')
            resetForm()
            setStatus(res.data.message)
            setAlertMessage(res.data.message)
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
        setAlertMessage('The selected area is not within the governorate boundaries')
      }
    },
  })
  return (
    <Modal show={show} onHide={onHideHandler} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>edit city </Modal.Title>
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
          {/* country */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>country:</label>
            <div className='col-sm-9'>
              <Select
                isLoading={isCountriesLoading}
                isDisabled={isCountriesDisabled}
                isSearchable={true}
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='select country'
                name='country'
                defaultValue={!isCountriesDisabled ? countryChoice : loadOptions[0]}
                value={!isCountriesDisabled ? countryChoice : loadOptions[0]}
                options={countriesOptions}
                onChange={onChangeCountry}
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
          {/* states */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>state:</label>
            <div className='col-sm-9'>
              <Select
                isLoading={isStatesLoading}
                isDisabled={isStatesDisabled}
                isSearchable={true}
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='Select state'
                name='state_id'
                defaultValue={!isStatesDisabled ? stateChoice : loadOptions[0]}
                value={!isStatesDisabled ? stateChoice : loadOptions[0]}
                options={statesOptions}
                onChange={onChangeState}
              />
              {formik.touched.state_id && formik.errors.state_id && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.state_id}</span>
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
                {loadMap ? (
                  <CitiesSearchMap
                    center={mapCenter}
                    mapResult={mapResult}
                    countryIso={countryIso}
                    statePlaceId={statePlaceId}
                  />
                ) : (
                  loadMapMessage
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
