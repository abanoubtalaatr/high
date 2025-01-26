import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import Select from 'react-select'
import {
  getCities,
  getCountries,
  getPartnerMainUnits,
  getPartnerPartUnits,
  getPartnerUnits,
  getStates,
  updateLocation,
} from '../../_requests'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import {useParams} from 'react-router-dom'
import clsx from 'clsx'
import AddressSearchMap from '../../../../components/google-map/AddressSearchMap'

function EditLocationModal(props) {
  const {unitId} = useParams()
  const {show, onHide, onComplete, locationDetails, partnerId} = props
  const mapCenter = {
    lat: Number(locationDetails.latitude) || 0,
    lng: Number(locationDetails.longitude) || 0,
  }
  const formSchema = Yup.object().shape({
    city_id: Yup.string().required('this field is required'),
    state_id: Yup.string().required('this field is required'),
  })
  const [loading, setLoading] = useState(false)
  const loadOptions = [{value: '', label: 'loading ...'}]
  const DefOptions = [{value: '', label: 'select'}]
  const [mainSectionDisplay, setMainSectionDisplay] = useState('none')
  const [partSectionDisplay, setPartSectionDisplay] = useState('none')
  const [isPartnerUnitsLoading, setIsPartnerUnitsLoading] = useState(false)
  const [isPartnerUnitsDisabled, setIsPartnerUnitsDisabled] = useState(false)
  const [partnerUnitsOptions, setPartnerUnitsOptions] = useState([])
  const [partnerUnitChoice, setPartnerUnitChoice] = useState([])
  const [isConflictedWithLoading, setIsConflictedWithLoading] = useState(false)
  const [isConflictedWithDisabled, setIsConflictedWithDisabled] = useState(false)
  const [conflictedWithOptions, setConflictedWithOptions] = useState([])
  const [conflictedWithChoice, setConflictedWithChoice] = useState([])
  const [isCitiesLoading, setIsCitiesLoading] = useState(false)
  const [isCitiesDisabled, setIsCitiesDisabled] = useState(false)
  const [isStatesLoading, setIsStatesLoading] = useState(false)
  const [isStatesDisabled, setIsStatesDisabled] = useState(false)
  const [stateChoice, setStateChoice] = useState([])
  const [statesOptions, setStatesOptions] = useState([])
  const [citiesOptions, setCitiesOptions] = useState([])
  const [cities, setCities] = useState([])
  const [cityChoice, setCityChoice] = useState([])
  const [alertText, setAlertText] = useState('')
  const [googleMapDetails, setGoogleMapDetails] = useState(false)
  const [loadMap, setLoadMap] = useState(false)
  const [loadMapMessage, setLoadMapMessage] = useState('please select state and city')
  const [typesOptions, setTypesOptions] = useState([
    {value: 'main', label: 'main'},
    {value: 'part', label: 'part'},
  ])
  const [typeChoice, setTypeChoice] = useState([])
  const [alertType, setAlertType] = useState('success')
  const [initialValues, setinitialValues] = useState({
    state_id: locationDetails.state.id,
    city_id: locationDetails.city.id,
    address: locationDetails.address,
    place_id: '',
    main_field_id: locationDetails.part_from ? locationDetails.part_from.id : '',
    conflicted_with: locationDetails.conflicted_with || [],
    latitude: locationDetails.latitude || '',
    longitude: locationDetails.longitude || '',
    type: locationDetails.type,
  })
  const [countryIso, setCountryIso] = useState(
    locationDetails.country ? locationDetails.country.iso : ''
  )
  useEffect(() => {}, [loadMap,countryIso])
  const [cityPlaceId, setCityPlaceId] = useState(
    locationDetails.city ? locationDetails.city.place_id : ''
  )
  const mapResult = (result) => {
    if (result && result.place_id) {
      setGoogleMapDetails(true)
      setAlertText('')
      formik.setFieldValue('place_id', result.place_id)
      formik.setFieldValue('latitude', result.location.lat())
      formik.setFieldValue('longitude', result.location.lng())
    } else {
      // setGoogleMapDetails(false)
      // setAlertText('The selected address is not within the city')
    }
  }
  const locationHandler = () => {
    if (
      initialValues.latitude == '' ||
      initialValues.longitude == '' ||
      initialValues.place_id == ''
    ) {
      setGoogleMapDetails(false)
    } else {
      setGoogleMapDetails(true)
    }
  }
  const getPartnerPartUnitsHandler = (mainId) => {
    setIsConflictedWithLoading(true)
    setIsConflictedWithDisabled(true)
    getPartnerPartUnits({main_id: mainId})
      .then((res) => {
        setConflictedWithOptions(
          res.data.data.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        )
        setIsConflictedWithLoading(false)
        setIsConflictedWithDisabled(false)
      })
      .catch((err) => {
        setConflictedWithOptions([])
        setIsConflictedWithLoading(false)
        setIsConflictedWithDisabled(false)
      })
  }
  useEffect(() => {
    locationHandler()
    typesDefaultValue()
    setIsPartnerUnitsLoading(true)
    setIsPartnerUnitsDisabled(true)
    getStates({country_iso: locationDetails.country.iso})
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
    getCities({state_id: locationDetails.state.id})
      .then((res) => {
        setCitiesOptions(
          res.data.data.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        )
        setCities(res.data.data)
      })
      .catch((err) => {
        setCitiesOptions([])
      })
    getPartnerMainUnits({partner_id: partnerId})
      .then((res) => {
        setPartnerUnitsOptions(
          res.data.data.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        )
        setIsPartnerUnitsLoading(false)
        setIsPartnerUnitsDisabled(false)
      })
      .catch((err) => {
        setPartnerUnitsOptions([])
        setIsPartnerUnitsLoading(false)
        setIsPartnerUnitsDisabled(false)
      })
    getPartnerPartUnitsHandler(initialValues.main_field_id)
  }, [])
  useEffect(() => {
    partnerUnitsDefaultValue()
  }, [partnerUnitsOptions])
  useEffect(() => {
    conflictedWithDefaultValue()
  }, [conflictedWithOptions])
  useEffect(() => {
    statesDefaultValue()
  }, [statesOptions])
  useEffect(() => {
    citiesDefaultValue()
  }, [citiesOptions])

  // on change
  const newLocation = (markers) => {
    formik.setFieldValue('latitude', markers[0].lat)
    formik.setFieldValue('longitude', markers[0].lng)
  }
  const onChangePartnerUnit = (choice) => {
    setPartnerUnitChoice(choice)
    formik.setFieldValue('main_field_id', choice.value)
    getPartnerPartUnitsHandler(choice.value)
  }
  const onChangeConflictedWith = (choice) => {
    let selected = Array.isArray(choice) ? choice.map((x) => x.value) : []
    setConflictedWithChoice(choice)
    formik.setFieldValue('conflicted_with', selected)
  }
  const onChangeState = (choice) => {
    // setCityPlaceId('')
    setIsCitiesLoading(true)
    setIsCitiesDisabled(true)
    setStateChoice(choice)
    setCityChoice(DefOptions[0])
    setCitiesOptions(DefOptions)
    formik.setFieldValue('state_id', choice.value)
    if (choice.value) {
      setLoadMap(false)
      getCities({state_id: choice.value})
        .then((res) => {
          if (res.data.data.length > 0) {
            setCitiesOptions(
              res.data.data.map((el) => ({
                value: el.id,
                label: el.name,
              }))
            )
            setCities(res.data.data)
          } else {
            setCitiesOptions(DefOptions)
            setCityChoice(DefOptions[0])
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
  const onChangeType = (choice) => {
    setTypeChoice(choice)
    formik.setFieldValue('type', choice.value)
    if (choice.value === 'main') {
      formik.setFieldValue('main_field_id', null)
      setMainSectionDisplay('block')
      setPartSectionDisplay('none')
    } else {
      setGoogleMapDetails(true)
      setPartSectionDisplay('block')
      setMainSectionDisplay('none')
    }
  }
  const onChangeCity = (choice) => {
    setCityChoice(choice)
    cityPlaceIdHandler(choice.value)
    formik.setFieldValue('city_id', choice.value)
  }
  const cityPlaceIdHandler = (cityChoiceId) => {
    const cityChoice = cities.filter((option) => option.id == cityChoiceId)
    if (cityChoice.length > 0) {
      setCityPlaceId(cityChoice[0].place_id)
      if (cityChoice[0].place_id) {
        setGoogleMapDetails(false)
        setLoadMap(true)
      } else {
        setLoadMap(false)
        setGoogleMapDetails(false)
        setLoadMapMessage(`this city does not have an place id.`)
      }
    } else {
      setLoadMap(false)
      setGoogleMapDetails(false)
      setLoadMapMessage(`please select a city.`)
      setLoadMap(false)
    }
  }
  const partnerUnitsDefaultValue = () => {
    const value = partnerUnitsOptions.filter(
      (option) => option.value == initialValues.main_field_id
    )
    const defaultValue = value.length === 0 ? DefOptions[0] : value[0]
    setPartnerUnitChoice(defaultValue)
  }
  const conflictedWithDefaultValue = () => {
    const values = []
    if (initialValues.conflicted_with.length > 0) {
      for (let i = 0; i < initialValues.conflicted_with.length; i++) {
        let conflictedId = initialValues.conflicted_with[i].id
        const v = conflictedWithOptions.filter((option) => option.value == conflictedId)
        for (let a = 0; a < v.length; a++) {
          values.push(v[a])
        }
      }
    }
    let selected = Array.isArray(values) ? values.map((x) => x.value) : []
    formik.setFieldValue('conflicted_with', selected)
    setConflictedWithChoice(values)
  }

  const statesDefaultValue = () => {
    const value = statesOptions.filter((option) => option.value == initialValues.state_id)
    const defaultValue = value.length === 0 ? statesOptions[0] : value[0]
    setStateChoice(defaultValue)
  }
  const citiesDefaultValue = () => {
    const value = citiesOptions.filter((option) => option.value == initialValues.city_id)
    const defaultValue = value.length === 0 ? citiesOptions[0] : value[0]
    defaultValue && defaultValue.value
      ? cityPlaceIdHandler(defaultValue.value)
      : cityPlaceIdHandler('')
    setCityChoice(defaultValue)
  }
  const typesDefaultValue = () => {
    const value = typesOptions.filter((option) => option.value == initialValues.type)
    const defaultValue = value.length === 0 ? typesOptions[0] : value
    if (initialValues.type === 'main') {
      formik.setFieldValue('main_field_id', null)
      setMainSectionDisplay('block')
      setPartSectionDisplay('none')
    } else {
      setGoogleMapDetails(true)
      setPartSectionDisplay('block')
      setMainSectionDisplay('none')
    }
    setTypeChoice(defaultValue)
  }
  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    enableReinitialize: true,
    onSubmit: async (values, {setStatus, resetForm, setFieldValue}) => {
      console.log(values)
      const formData = new FormData()
      
      formData.append('state_id', 1)
      formData.append('city_id', 1)
      formData.append('address', 'address from postman')
      formData.append('main_field_id', values.main_field_id)
      formData.append('place_id', values.place_id)
      formData.append('type', values.type)
      formData.append('longitude', values.longitude)
      formData.append('longitude', values.longitude)
      values.conflicted_with.forEach((c) => formData.append('conflicted_fields[]', c))
      if (values.type === 'part') {
        try {
          await updateLocation(values, unitId).then((res) => {
            setAlertType('success')
            resetForm()
            setStatus(res.data.message)
            setAlertText(res.data.message)
            setLoading(false)
            onComplete(true)
          })
        } catch (error) {
          setAlertType('danger')
          setStatus(error.response.data.message)
          setAlertText(error.response.data.message)
          setLoading(false)
        }
      } else {
        
        // if (googleMapDetails) {
          try {
            await updateLocation(values, unitId).then((res) => {
              setAlertType('success')
              resetForm()
              setStatus(res.data.message)
              setAlertText(res.data.message)
              setLoading(false)
              onComplete(true)
            })
          } catch (error) {
            setAlertType('danger')
            setStatus(error.response.data.message)
            setAlertText(error.response.data.message)
            setLoading(false)
          }
        // } else {
        //   // setAlertText('The selected address is not within the city')
        // }
      }
      setLoading(true)
      // try {
      //   await updateLocation(values, unitId).then((res) => {
      //     setAlertType('success')
      //     resetForm()
      //     setStatus(res.data.message)
      //     setAlertText(res.data.message)
      //     setLoading(false)
      //     onComplete(true)
      //   })
      // } catch (error) {
      //   setAlertType('danger')
      //   setStatus(error.response.data.message)
      //   setAlertText(error.response.data.message)
      //   setLoading(false)
      // }
    },
  })
  return (
    <Modal show={show} onHide={onHide} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>update location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {alertText && (
            <div className={`mb-lg-15 alert alert-danger`}>
              <div className='alert-text font-weight-bold'>{alertText}</div>
            </div>
          )}

          {/* type */}
        <div className='fs-6 text-gray-700 mb-10'>
        
  إذا كانت المدينة علي سبيل المثال الرياض وقمت بتغيير الموقع إلى مدينة أخرى، فلن يتم تحديث الإحداثيات.

        </div>

          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>type:</label>
            <div className='col-sm-9'>
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='select type'
                name='type'
                defaultValue={typeChoice}
                value={typeChoice}
                options={typesOptions}
                onChange={onChangeType}
              />
            </div>
            {formik.touched.type && formik.errors.type && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.type}</span>
                </div>
              </div>
            )}
          </div>
          {/* part section */}
          <div style={{display: partSectionDisplay}}>
            {/* Part From */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>Part From:</label>
              <div className='col-sm-9'>
                <Select
                  isLoading={isPartnerUnitsLoading}
                  isDisabled={isPartnerUnitsDisabled}
                  isSearchable={true}
                  className='react-select-container'
                  classNamePrefix='react-select'
                  name='main_field_id'
                  defaultValue={partnerUnitChoice}
                  value={!isPartnerUnitsDisabled ? partnerUnitChoice : loadOptions[0]}
                  options={partnerUnitsOptions}
                  onChange={onChangePartnerUnit}
                />
              </div>
              {formik.touched.main_field_id && formik.errors.main_field_id && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.main_field_id}</span>
                  </div>
                </div>
              )}
            </div>
            {/* conflicted with */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>conflicted with:</label>
              <div className='col-sm-9'>
                <Select
                  isLoading={isConflictedWithLoading}
                  isDisabled={isConflictedWithDisabled}
                  isSearchable={true}
                  isMulti={true}
                  className='react-select-container'
                  classNamePrefix='react-select'
                  name='conflicted_with'
                  placeholder={isConflictedWithDisabled ? 'loading ...' : 'select'}
                  defaultValue={conflictedWithChoice}
                  value={conflictedWithChoice}
                  options={conflictedWithOptions}
                  onChange={onChangeConflictedWith}
                />
              </div>
              {formik.touched.conflicted_with && formik.errors.conflicted_with && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.conflicted_with}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* main section */}
          <div style={{display: mainSectionDisplay}}>
            {/* country */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>country:</label>
              <div className='col-sm-9'>{locationDetails.country.name}</div>
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
            {/* address */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>address:</label>
              <div className='col-sm-9'>
                <input
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('address')}
                  className={clsx('form-control form-control-solid', {
                    'is-invalid': formik.touched.address && formik.errors.address,
                  })}
                  placeholder='your address'
                />
                {formik.touched.address && formik.errors.address && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.address}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* google map */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>map:</label>
              <div className='col-12'>
                <div className='w-100 h-300px'>
                  
                    <AddressSearchMap
                      center={mapCenter}
                      mapResult={mapResult}
                      countryIso={countryIso}
                      cityPlaceId={cityPlaceId}
                      
                    />
                 
                </div>
                {formik.touched.address && formik.errors.address && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.address}</span>
                    </div>
                  </div>
                )}
              </div>
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

export default EditLocationModal
