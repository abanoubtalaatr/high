import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import {getCities, getCountries, getPartnerUnits, getStates, updateLocation} from '../../_requests'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import {useParams} from 'react-router-dom'
import clsx from 'clsx'

function EditLocationModal(props) {
  const {unitId} = useParams()
  const {show, onHide, onComplete, locationDetails, partnerId} = props

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
  const [cityChoice, setCityChoice] = useState([])
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
    main_field_id: locationDetails.part_from || 0,
    conflicted_with: [],
    latitude: locationDetails.latitude,
    longitude: locationDetails.longitude,
    type: locationDetails.type,
  })
  useEffect(() => {
    typesDefaultValue()
    getPartnerUnits(partnerId)
      .then((res) => {
        setPartnerUnitsOptions(
          res.data.data.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        )
        console.log('res.data.data',res.data.data);
        setConflictedWithOptions(
          res.data.data.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        )
      })
      .catch((err) => {
        setPartnerUnitsOptions([])
        setConflictedWithOptions([])
      })
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
      })
      .catch((err) => {
        setCitiesOptions([])
      })
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
  const onChangePartnerUnit = (choice) => {
    setPartnerUnitChoice(choice)
    formik.setFieldValue('main_field_id', choice.value)
  }
  const onChangeConflictedWith = (choice) => {
    setConflictedWithChoice(choice)
    formik.setFieldValue('conflicted_with', choice.value)
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
  const onChangeType = (choice) => {
    setTypeChoice(choice)
    formik.setFieldValue('type', choice.value)
    if (choice.value === 'main') {
      setMainSectionDisplay('block')
      setPartSectionDisplay('none')
    } else {
      setPartSectionDisplay('block')
      setMainSectionDisplay('none')
    }
  }
  const onChangeCity = (choice) => {
    setCityChoice(choice)
    formik.setFieldValue('city_id', choice.value)
  }
  const partnerUnitsDefaultValue = () => {
    const value = partnerUnitsOptions.filter(
      (option) => option.value == initialValues.main_field_id
    )
    const defaultValue = value.length === 0 ? DefOptions[0] : value
    setPartnerUnitChoice(defaultValue)
  }
  // const conflictedWithDefaultValue = () => {
  //   const value = conflictedWithOptions.filter(
  //     (option) => option.value == initialValues.conflicted_with
  //   )
  //   const defaultValue = value.length === 0 ? DefOptions[0] : value
  //   setConflictedWithChoice(defaultValue)
  // }
  const conflictedWithDefaultValue = () => {
    const values = []
    console.log('conflictedWithOptions',conflictedWithOptions)
    if (locationDetails.conflicted_with.length > 0) {
      for (let i = 0; i < locationDetails.conflicted_with.length; i++) {
        const v = conflictedWithOptions.filter(
          
          (option) => option.value == console.log('option.value',option.value)
        )
        for (let i = 0; i < v.length; i++) {
          values.push(v[i])
        }
      }
    }
    setinitialValues({...initialValues, conflicted_with: values})
    setConflictedWithChoice(values)
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
  const typesDefaultValue = () => {
    const value = typesOptions.filter((option) => option.value == initialValues.type)
    const defaultValue = value.length === 0 ? typesOptions[0] : value

    if (initialValues.type === 'main') {
      setMainSectionDisplay('block')
      setPartSectionDisplay('none')
    } else {
      setPartSectionDisplay('block')
      setMainSectionDisplay('none')
    }
    setTypeChoice(defaultValue)
  }
  console.log('initialValues', initialValues)
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, {setStatus, resetForm}) => {
      setLoading(true)
      try {
        await updateLocation(values, unitId).then((res) => {
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

          {/* type */}
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
                  placeholder='select main unit'
                  name='main_field_id'
                  defaultValue={!isPartnerUnitsDisabled ? partnerUnitChoice : loadOptions[0]}
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
                  className='react-select-container'
                  classNamePrefix='react-select'
                  placeholder='select main unit'
                  name='conflicted_with'
                  defaultValue={!isConflictedWithDisabled ? conflictedWithChoice : loadOptions[0]}
                  value={!isConflictedWithDisabled ? conflictedWithChoice : loadOptions[0]}
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
