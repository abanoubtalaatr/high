import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import {getCities, getCountries, getStates, updateLocation} from '../../_requests'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import {useParams} from 'react-router-dom'

function EditLocationModal(props) {
  const {userId} = useParams()
  const {show, onHide, onComplete, country_iso, state_id, city_id} = props
  const [loading, setLoading] = useState(false)
  const loadOptions = [{value: '', label: 'loading ...'}]
  const DefOptions = [{value: '', label: 'select'}]
  const [isCountriesLoading, setIsCountriesLoading] = useState(false)
  const [isCitiesLoading, setIsCitiesLoading] = useState(false)
  const [isCountriesDisabled, setIsCountriesDisabled] = useState(false)
  const [isCitiesDisabled, setIsCitiesDisabled] = useState(false)
  const [isStatesLoading, setIsStatesLoading] = useState(false)
  const [isStatesDisabled, setIsStatesDisabled] = useState(false)
  const [countriesOptions, setCountriesOptions] = useState([])
  const [countryChoice, setCountryChoice] = useState([])
  const [stateChoice, setStateChoice] = useState([])
  const [statesOptions, setStatesOptions] = useState([])
  const [citiesOptions, setCitiesOptions] = useState([])
  const [cityChoice, setCityChoice] = useState([])
  const [citiesStatus, setCitiesStatus] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [initialValues, setinitialValues] = useState({
    country_iso: country_iso,
    state_id: state_id,
    city_id: city_id,
  })
  useEffect(() => {
    getCountries()
      .then((res) => {
        setCountriesOptions(
          res.data.data.map((el) => ({
            value: el.iso,
            label: el.name,
          }))
        )
      })
      .catch((err) => {
        setCountriesOptions([])
      })
    getStates({country_iso: country_iso})
      .then((res) => {
        setStatesOptions(
          res.data.data.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        )
      })
      .catch((err) => {
        setStatesOptions([])
      })
    getCities({state_id: state_id})
      .then((res) => {
        setCitiesOptions(
          res.data.data.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        )
      })
      .catch((err) => {
        setCitiesOptions([])
      })
  }, [])
  useEffect(() => {
    countriesDefaultValue()
  }, [countriesOptions])
  useEffect(() => {
    statesDefaultValue()
  }, [statesOptions])
  useEffect(() => {
    citiesDefaultValue()
  }, [citiesOptions])
  // on change
  const onChangeCountry = (choice) => {
    setIsStatesLoading(true)
    setIsStatesDisabled(true)
    setCountryChoice(choice)
    setStateChoice(DefOptions[0])
    setCityChoice(DefOptions[0])
    setStatesOptions(DefOptions)
    setCitiesOptions(DefOptions)
    formik.setFieldValue('country_iso', choice.value)
    if (choice.value) {
      getStates({country_iso: choice.value})
        .then((res) => {
          if (res.data.data.length > 0) {
            setStatesOptions(
              res.data.data.map((el) => ({
                value: el.id,
                label: el.name,
              }))
            )
          } else {
            setCitiesOptions(DefOptions)
            setCityChoice(DefOptions[0])
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
    } else {
      setStatesOptions(DefOptions)
      setIsStatesLoading(false)
      setIsStatesDisabled(false)
    }
  }
  const onChangeState = (choice) => {
    setIsCitiesLoading(true)
    setIsCitiesDisabled(true)
    setStateChoice(choice)
    setCityChoice(DefOptions[0])
    setCitiesOptions(DefOptions)
    formik.setFieldValue('state_id', choice.value)
    if (choice.value) {
      getCities({state_id: choice.value})
        .then((res) => {
          if (res.data.data.length > 0) {
            setCitiesOptions(
              res.data.data.map((el) => ({
                value: el.id,
                label: el.name,
              }))
            )
          } else {
            setStatesOptions(DefOptions)
            setStateChoice(DefOptions[0])
          }
          setIsCitiesLoading(false)
          setIsCitiesDisabled(false)
        })
        .catch((err) => {
          setIsCitiesLoading(false)
          setIsCitiesDisabled(false)
        })
    } else {
      setCitiesOptions(DefOptions)
      setIsCitiesLoading(false)
      setIsCitiesDisabled(false)
    }
  }
  const onChangeCity = (choice) => {
    setCityChoice(choice)
    formik.setFieldValue('city_id', choice.value)
  }
  const countriesDefaultValue = () => {
    const value = countriesOptions.filter((option) => option.value == initialValues.country_iso)
    const defaultValue = value.length === 0 ? countriesOptions[0] : value
    setCountryChoice(defaultValue)
  }

  const statesDefaultValue = () => {
    const value = statesOptions.filter((option) => option.value == initialValues.state_id)
    const defaultValue = value.length === 0 ? DefOptions[0] : value
    setStateChoice(defaultValue)
  }
  const citiesDefaultValue = () => {
    const value = citiesOptions.filter((option) => option.value == initialValues.city_id)
    const defaultValue = value.length === 0 ? DefOptions[0] : value
    setCityChoice(defaultValue)
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, {setStatus, resetForm}) => {
      setLoading(true)
      const formData = new FormData()
      formData.append('country_iso', values.country_iso)
      formData.append('state_id', values.state_id)
      formData.append('city_id', values.city_id)
      try {
        await updateLocation(formData, userId).then((res) => {
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
        <Modal.Title>update location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {formik.status && (
            <div className={`mb-lg-15 alert alert-${alertType}`}>
              <div className='alert-text font-weight-bold'>{formik.status}</div>
            </div>
          )}
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
                name='country_iso'
                defaultValue={!isCountriesDisabled ? countryChoice : loadOptions[0]}
                value={!isCountriesDisabled ? countryChoice : loadOptions[0]}
                options={countriesOptions}
                onChange={onChangeCountry}
              />
            </div>
            {formik.touched.country_iso && formik.errors.country_iso && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.country_iso}</span>
                </div>
              </div>
            )}
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
            </div>
            {formik.touched.state_id && formik.errors.state_id && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.state_id}</span>
                </div>
              </div>
            )}
          </div>
          {/* cities */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>city:</label>
            <div className='col-sm-9'>
              <Select
                isLoading={isCitiesLoading}
                isDisabled={isCitiesDisabled}
                isSearchable={true}
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='Select city'
                name='city_id'
                defaultValue={!isCitiesDisabled ? cityChoice : loadOptions[0]}
                value={!isCitiesDisabled ? cityChoice : loadOptions[0]}
                options={citiesOptions}
                onChange={onChangeCity}
              />
            </div>
            {formik.touched.city_id && formik.errors.city_id && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.city_id}</span>
                </div>
              </div>
            )}
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

export default EditLocationModal
