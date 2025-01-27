// import CreateEmployeeModal from './CreateEmployeeModal'

import {KTIcon} from '../../../../_metronic/helpers'
import {useIntl} from 'react-intl'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'
import clsx from 'clsx'
import Select from 'react-select'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {
  getUsersDetailsNotification,
  getAgeGroups,
  updateUserNotification,
  getCities,
  getCountries,
  getGpsCities,
  getGpsCountries,
  getGpsStates,
  getLanguages,
  getStates,
} from '../_requests'

function EditUserNotification() {
  const intl = useIntl()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  // form validation
  const formSchema = Yup.object().shape({
    title: Yup.string()
      .required('this field is required')
      .min(3, 'Minimum 3 symbols')
      .max(200, 'Maximum 50 symbols'),
    body: Yup.string()
      .required('this field is required')
      .min(3, 'Minimum 3 symbols')
      .max(200, 'Maximum 50 symbols'),
  })
  const DefOptions = [{value: 'all', label: 'all'}]
  const loadOptions = [{value: '', label: 'loading ...'}]
  const [isCountriesLoading, setIsCountriesLoading] = useState(false)
  const [isCountriesDisabled, setIsCountriesDisabled] = useState(false)
  const [isGpsCountriesLoading, setIsGpsCountriesLoading] = useState(false)
  const [isGpsCountriesDisabled, setIsGpsCountriesDisabled] = useState(false)
  const [isGpsStatesLoading, setIsGpsStatesLoading] = useState(false)
  const [isGpsCitiesLoading, setIsGpsCitiesLoading] = useState(false)
  const [isGpsStatesDisabled, setIsGpsStatesDisabled] = useState(false)
  const [isGpsCitiesDisabled, setIsGpsCitiesDisabled] = useState(false)
  const [countriesOptions, setCountriesOptions] = useState([])
  const [gpsCountriesOptions, setGpsCountriesOptions] = useState([])
  const [gpsStatesOptions, setGpsStatesOptions] = useState([])
  const [gpsCitiesOptions, setGpsCitiesOptions] = useState([])
  const [countryChoice, setCountryChoice] = useState(DefOptions[0])
  const [gpsCountryChoice, setGpsCountryChoice] = useState(DefOptions[0])
  const [gpsStateChoice, setGpsStateChoice] = useState(DefOptions[0])
  const [gpsCityChoice, setGpsCityChoice] = useState(DefOptions[0])
  const [timingChoice, setTimingChoice] = useState('now')
  const [sendingDate, setSendingDate] = useState(new Date())
  const [genderChoice, setGenderChoice] = useState(DefOptions[0])
  const [activityStatusChoice, setActivityStatusChoice] = useState(DefOptions[0])
  const [ageChoice, setAgeChoice] = useState(DefOptions[0])
  const [langsChoice, setLangsChoice] = useState(DefOptions[0])
  const [userTypeChoice, setUserTypeChoice] = useState('registered')
  const [locationTypeChoice, setLocationTypeChoice] = useState('phone_country')
  const [phoneCountryDisabled, setPhoneCountryDisabled] = useState(false)
  const [isAgeGroupsLoading, setIsAgeGroupsLoading] = useState(false)
  const [isAgeGroupsDisabled, setIsAgeGroupsDisabled] = useState(false)
  const [ageGroupsDisabled, setAgeGroupsDisabled] = useState(false)
  const [ageGroupsOptions, setAgeGroupsOptions] = useState([])
  const [isLanguagesLoading, setIsLanguagesLoading] = useState(false)
  const [isLanguagesDisabled, setIsLanguagesDisabled] = useState(false)
  const [languagesOptions, setLanguagesOptions] = useState([])
  const [ageGroupChoice, setAgeGroupChoice] = useState(ageGroupsOptions[0])
  const [profileSettingsDisabled, setProfileSettingsDisabled] = useState(true)
  const [alertMessage, setAlertMessage] = useState('')

  const {itemId} = useParams()
  const genderOptions = [
    {value: 'all', label: 'all'},
    {
      value: 'male',
      label: 'male',
    },
    {
      value: 'female',
      label: 'female',
    },
    {
      value: 'undetermined',
      label: 'undetermined',
    },
  ]
  const activityStatusOptions = [
    {value: 'all', label: 'all'},
    {
      value: 'active',
      label: 'active',
    },
    {
      value: 'very_active',
      label: 'very active',
    },
    {
      value: 'inactive',
      label: 'inactive',
    },
  ]
  const ageOptions = [
    {value: 'all', label: 'all'},
    {
      value: 'age_group',
      label: 'specific age group',
    },
    {
      value: 'undetermined',
      label: 'undetermined date of barth',
    },
  ]
  const initialValues = {
    title: 'title',
    body: 'body',
    timing: 'now', // now,scheduled
    sending_date: '',
    user_type: 'registered', // all, registered, guest
    activity_status: 'all', // all, very_active, active, inactive
    location_type: 'phone_country', // phone_country, gps_location_location
    country_iso: '-1',
    state: 'all', // default: all
    city: 'all', // default: all
    gender: 'all', // all, male, female, undetermined
    age: 'all', // all, age_group, undetermined
    // age_group_id: '', // required if age = age_group
    app_lang: 'ar',
  }
  // format datetime
  const dateTimeFormatHandler = (date) => {
    const dateTime = date ? new Date(date) : new Date()
    const dateTimeFormat = dateTime.toLocaleString('sv-SE') // 2021-09-03 17:56:58
    return dateTimeFormat
  }
  // on change Timing
  const onChangeSendingDate = (date) => {
    setSendingDate(date)
    const dateTimeFormat = dateTimeFormatHandler(date)
    formik.setFieldValue('sending_date', dateTimeFormat)
  }
  // on change Timing
  const onChangeTiming = (e) => {
    setTimingChoice(e.target.value)
    if (e.target.value === 'now') {
      setSendingDate(new Date())
      const dateTimeFormat = dateTimeFormatHandler()
      formik.setFieldValue('sending_date', dateTimeFormat)
    }
    formik.setFieldValue('timing', e.target.value)
  }
  // on change user type settings
  const onChangeUserType = (e) => {
    setUserTypeChoice(e.target.value)
    if (e.target.value === 'guest' || e.target.value === 'all') {
      setLocationTypeChoice('gps_location')
    }
    e.target.value === 'guest' || e.target.value === 'all'
      ? setPhoneCountryDisabled(true)
      : setPhoneCountryDisabled(false)
    e.target.value === 'registered'
      ? setProfileSettingsDisabled(true)
      : setProfileSettingsDisabled(false)
    formik.setFieldValue('usertype', e.target.value)
  }
  // on change location settings
  const onChangeLocationType = (e) => {
    setLocationTypeChoice(e.target.value)
    formik.setFieldValue('locationtype', e.target.value)
    e.target.value === 'phone_country'
      ? setProfileSettingsDisabled(true)
      : setProfileSettingsDisabled(false)
  }
  const countriesOptionsHandler = () => {
    const newCountriesOptions = [...DefOptions, ...countriesOptions]
    setCountriesOptions(newCountriesOptions)
  }
  const gpsCountriesOptionsHandler = () => {
    const newGpsCountriesOptions = [...DefOptions, ...gpsCountriesOptions]
    setGpsCountriesOptions(newGpsCountriesOptions)
  }
  // on change location settings
  const onChangeCountry = (choice) => {
    setCountryChoice(choice)
    formik.setFieldValue('country_iso', choice.value)
  }
  // on change country
  const onChangeGpsCountry = (choice) => {
    setIsGpsStatesLoading(true)
    setIsGpsStatesDisabled(true)
    setGpsCountryChoice(choice)
    setGpsStateChoice(DefOptions[0])
    setGpsCityChoice(DefOptions[0])
    setGpsStatesOptions([])
    setGpsCitiesOptions([])
    formik.setFieldValue('country', choice.value)
    formik.setFieldValue('state', DefOptions[0].value)
    formik.setFieldValue('city', DefOptions[0].value)
    if (choice.value) {
      getGpsStates(choice.value)
        .then((res) => {
          if (res.data.data.length > 0) {
            setGpsStatesOptions(
              res.data.data.map((el) => ({
                value: el,
                label: el,
              }))
            )
          }
          setIsGpsStatesLoading(false)
          setIsGpsStatesDisabled(false)
        })
        .catch((err) => {
          setIsGpsStatesLoading(false)
          setIsGpsStatesDisabled(false)
        })
    } else {
      setIsGpsStatesLoading(false)
      setIsGpsStatesDisabled(false)
    }
  }
  // on change state
  const onChangeGpsState = (choice) => {
    setIsGpsCitiesLoading(true)
    setIsGpsCitiesDisabled(true)
    setGpsStateChoice(choice)
    setGpsCityChoice(DefOptions[0])
    setGpsCitiesOptions([])
    formik.setFieldValue('state', choice.value)
    formik.setFieldValue('city', DefOptions[0].value)
    if (choice.value) {
      getGpsCities(gpsCountryChoice.value, choice.value)
        .then((res) => {
          if (res.data.data.length > 0) {
            setGpsCitiesOptions(
              res.data.data.map((el) => ({
                value: el.name,
                label: el.name,
              }))
            )
          }
          setIsGpsCitiesLoading(false)
          setIsGpsCitiesDisabled(false)
        })
        .catch((err) => {
          setIsGpsCitiesLoading(false)
          setIsGpsCitiesDisabled(false)
        })
    } else {
      setIsGpsCitiesLoading(false)
      setIsGpsCitiesDisabled(false)
    }
  }
  // on change city
  const onChangeCity = (choice) => {
    setGpsCityChoice(choice)
    formik.setFieldValue('city', choice.value)
  }
  // on Age Change
  const onAgeChange = (choice) => {
    setAgeChoice(choice)
    choice.value === 'age_group' ? setAgeGroupsDisabled(true) : setAgeGroupsDisabled(false)
    formik.setFieldValue('age', choice.value)
  }
  // on Age Change
  const onAgeGroupChange = (choice) => {
    setAgeGroupChoice(choice)
    formik.setFieldValue('age_group_id', choice.value)
  }
  // on Gender Change
  const onGenderChange = (choice) => {
    setGenderChoice(choice)
    formik.setFieldValue('gender', choice.value)
  }
  // on Gender Change
  const onActivityStatusChange = (choice) => {
    setActivityStatusChoice(choice)
    formik.setFieldValue('activity_status', choice.value)
  }
  useEffect(() => {
    setIsGpsCountriesLoading(true)
    setIsGpsCountriesDisabled(true)
    setIsCountriesLoading(true)
    setIsCountriesDisabled(true)
    setIsAgeGroupsLoading(true)
    setIsAgeGroupsDisabled(true)
    setIsLanguagesLoading(true)
    setIsLanguagesDisabled(true)
    getCountries()
      .then((res) => {
        setCountriesOptions(
          res.data.data.map((el) => ({
            value: el.iso,
            label: el.name,
          }))
        )
        setIsCountriesLoading(false)
        setIsCountriesDisabled(false)
      })
      .catch((err) => {
        countriesOptionsHandler()
      })
    getGpsCountries()
      .then((res) => {
        setGpsCountriesOptions(
          res.data.data.map((el) => ({
            value: el,
            label: el,
          }))
        )
        setIsGpsCountriesLoading(false)
        setIsGpsCountriesDisabled(false)
      })
      .catch((err) => {
        countriesOptionsHandler()
      })
    //age group
    getAgeGroups()
      .then((res) => {
        setAgeGroupsOptions(
          res.data.data.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        )
        setIsAgeGroupsLoading(false)
        setIsAgeGroupsDisabled(false)
      })
      .catch((err) => {
        setIsAgeGroupsLoading(false)
        setIsAgeGroupsDisabled(false)
      })
    //age Languages
    getLanguages()
      .then((res) => {
        setLanguagesOptions(
          res.data.data.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        )
        setIsLanguagesLoading(false)
        setIsLanguagesDisabled(false)
      })
      .catch((err) => {
        setIsLanguagesLoading(false)
        setIsLanguagesDisabled(false)
      })
   getUsersDetailsNotification(itemId).then((res) => {
  formik.setValues({
    title: res.data.data.title,
    body: res.data.data.body,
    timing: res.data.data.timing,
    user_type: res.data.data.user_type,
    activity_status: res.data.data.activity_status == 'All' ? 'all' : res.data.data.activity_status,
    app_lang: res.data.data?.app_lang,
    location_type: res.data.data.location_type,
    age: res.data.data.age,
    gender: res.data.data.gender,
    country_iso : res.data.data?.country_iso?.iso,
  });
  setTimingChoice(res.data.data.timing);
  setUserTypeChoice(res.data.data.user_type);
  setActivityStatusChoice({
    label: res.data.data.activity_status,
    value: res.data.data.activity_status,
  });
  setGpsCountryChoice({
    value: res.data.data?.country_iso?.iso,
    label: res.data.data?.country_iso?.name,
  });
  setLocationTypeChoice(res.data.data.location_type);
  setGenderChoice({
    label: res.data.data.gender,
    value: res.data.data.gender,
  })
  setAgeGroupChoice({
    label : res.data.data.age,
    value : res.data.data.age,
  })
  setLangsChoice({
    label : res.data.data.app_lang,
    value : res.data.data.app_lang,
  })
  console.log(res.data.data, 'res')
});

  }, [])

  useEffect(() => {
    countriesOptionsHandler()
  }, [isCountriesLoading])
  useEffect(() => {
    gpsCountriesOptionsHandler()
  }, [isGpsCountriesLoading])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, {resetForm, setFieldValue}) => {
      setLoading(true)
      try {
        await updateUserNotification(itemId,values).then((res) => {
          resetForm()
          setAlertType('success')
          setAlertMessage(res.data.message)
          setLoading(false)
          navigate('/notifications/users')
        })
      } catch (error) {
        setAlertType('danger')
        setAlertMessage(error.response.data.message)
        setLoading(false)
      }
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='card'>
        <div className='card-body py-3 pt-5'>
          {alertMessage && (
            <div className={`mb-lg-15 alert alert-${alertType}`}>
              <div className='alert-text font-weight-bold'>{alertMessage}</div>
            </div>
          )}
          {/* title */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>title:</label>
            <div className='col-sm-9'>
              <input
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('title')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.title && formik.errors.title,
                })}
                placeholder='enter notification title'
              />
              {formik.touched.title && formik.errors.title && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.title}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* message */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>message:</label>
            <div className='col-sm-9'>
              <textarea
                placeholder='enter notification message here ...'
                {...formik.getFieldProps('body')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.body && formik.errors.body,
                })}
              ></textarea>
              {formik.touched.body && formik.errors.body && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.body}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* timing */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>timing:</label>
            <div className='col-sm-9'>
              <div className='d-flex'>
                <div className='form-check form-check-custom form-check-solid me-10'>
                  <input
                    className='form-check-input'
                    name='timing'
                    type='radio'
                    value='now'
                    id='now'
                    checked={timingChoice === 'now'}
                    onChange={onChangeTiming}
                  />
                  <label className='form-check-label' htmlFor='now'>
                    now
                  </label>
                </div>
                <div className='form-check form-check-custom form-check-solid me-10'>
                  <input
                    className='form-check-input'
                    name='timing'
                    type='radio'
                    value='scheduled'
                    id='scheduled'
                    checked={timingChoice === 'scheduled'}
                    onChange={onChangeTiming}
                  />
                  <label className='form-check-label' htmlFor='scheduled'>
                    scheduled
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* scheduled date */}
          {timingChoice !== 'now' && (
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>scheduled date:</label>
              <div className='col-sm-9'>
                <DatePicker
                  autocomplete='off'
                  name='sending_date'
                  className='form-control form-control-solid mb-3'
                  // showIcon
                  todayButton='today'
                  icon='fa fa-calendar'
                  showTimeSelect
                  timeIntervals={15}
                  selected={sendingDate}
                  placeholderText='yyyy-mm-dd hh:mm aa'
                  dateFormat='yyyy-MM-dd hh:mm aa'
                  onChange={onChangeSendingDate}
                />
                {formik.touched.scheduled && formik.errors.scheduled && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.scheduled}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <h5 className='card-title align-items-start flex-column mb-5'>
            <span className='mb-3 fw-bolder'>users type settings</span>
          </h5>
          {/* users type */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>type:</label>
            <div className='col-sm-9'>
              <div className='d-flex'>
                <div className='form-check form-check-custom form-check-solid me-10'>
                  <input
                    className='form-check-input'
                    name='user_type'
                    type='radio'
                    value='registered'
                    id='registered'
                    checked={userTypeChoice === 'registered'}
                    onChange={onChangeUserType}
                  />
                  <label className='form-check-label' htmlFor='registered'>
                    registered
                  </label>
                </div>
                <div className='form-check form-check-custom form-check-solid me-10'>
                  <input
                    className='form-check-input'
                    name='user_type'
                    type='radio'
                    value='guest'
                    id='guest'
                    checked={userTypeChoice === 'guest'}
                    onChange={onChangeUserType}
                  />
                  <label className='form-check-label' htmlFor='guest'>
                    guest
                  </label>
                </div>
                <div className='form-check form-check-custom form-check-solid me-10'>
                  <input
                    className='form-check-input'
                    name='user_type'
                    type='radio'
                    value='all'
                    id='all'
                    checked={userTypeChoice === 'all'}
                    onChange={onChangeUserType}
                  />
                  <label className='form-check-label' htmlFor='all'>
                    all
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* activity status */}
          {userTypeChoice === 'registered' && (
            <div className='row mb-5'>
              <label className='col-md-3 form-label fw-bold'>activity status:</label>
              <div className='col-md-4'>
                <Select
                  isSearchable={true}
                  className='react-select-container'
                  classNamePrefix='react-select'
                  placeholder='select activity status'
                  name='activity_status'
                  defaultValue={activityStatusChoice}
                  value={activityStatusChoice}
                  options={activityStatusOptions}
                  onChange={onActivityStatusChange}
                />
              </div>
            </div>
          )}
          <h5 className='card-title align-items-start flex-column mb-5'>
            <span className='mb-3 fw-bolder'>location settings</span>
          </h5>
          {/* location type */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>type:</label>
            <div className='col-sm-9'>
              <div className='d-flex'>
                <div className='form-check form-check-custom form-check-solid me-10'>
                  <input
                    className='form-check-input'
                    name='location_type'
                    type='radio'
                    value='phone_country'
                    id='phone_country'
                    checked={locationTypeChoice === 'phone_country'}
                    onChange={onChangeLocationType}
                    disabled={phoneCountryDisabled}
                  />
                  <label className='form-check-label' htmlFor='phone_country'>
                    phone country
                  </label>
                </div>
                <div className='form-check form-check-custom form-check-solid me-10'>
                  <input
                    className='form-check-input'
                    name='location_type'
                    type='radio'
                    value='gps_location'
                    id='gps_location'
                    checked={locationTypeChoice === 'gps_location'}
                    onChange={onChangeLocationType}
                  />
                  <label className='form-check-label' htmlFor='gps_location'>
                    GPS location
                  </label>
                </div>
              </div>
            </div>
          </div>

          {locationTypeChoice === 'gps_location' ? (
            <>
              {/* country */}
              <div className='row mb-5'>
                <label className='col-md-3 form-label fw-bold'>country:</label>
                <div className='col-md-4'>
                  <Select
                    isLoading={isGpsCountriesLoading}
                    isDisabled={isGpsCountriesDisabled}
                    isSearchable={true}
                    className='react-select-container'
                    classNamePrefix='react-select'
                    placeholder='select country'
                    name='country'
                    defaultValue={!isGpsCountriesDisabled ? gpsCountryChoice : loadOptions[0]}
                    value={!isCountriesDisabled ? gpsCountryChoice : loadOptions[0]}
                    options={gpsCountriesOptions}
                    onChange={onChangeGpsCountry}
                  />
                </div>
              </div>
              {/* states */}
              <div className='row mb-5'>
                <label className='col-md-3 form-label fw-bold'>states:</label>
                <div className='col-md-4'>
                  <Select
                    isLoading={isGpsStatesLoading}
                    isDisabled={isGpsStatesDisabled}
                    isSearchable={true}
                    className='react-select-container'
                    classNamePrefix='react-select'
                    placeholder='Select state'
                    name='state'
                    defaultValue={!isGpsStatesDisabled ? gpsStateChoice : loadOptions[0]}
                    value={!isGpsStatesDisabled ? gpsStateChoice : loadOptions[0]}
                    options={[...DefOptions, ...gpsStatesOptions]}
                    onChange={onChangeGpsState}
                  />
                </div>
              </div>
              {/* cities */}
              <div className='row mb-5'>
                <label className='col-md-3 form-label fw-bold'>cities:</label>
                <div className='col-md-4'>
                  <Select
                    isLoading={isGpsCitiesLoading}
                    isDisabled={isGpsCitiesDisabled}
                    isSearchable={true}
                    className='react-select-container'
                    classNamePrefix='react-select'
                    placeholder='Select city'
                    name='city'
                    defaultValue={!isGpsCitiesDisabled ? gpsCityChoice : loadOptions[0]}
                    value={!isGpsCitiesDisabled ? gpsCityChoice : loadOptions[0]}
                    options={[...DefOptions, ...gpsCitiesOptions]}
                    onChange={onChangeCity}
                  />
                </div>
              </div>
              {/* cities */}
              <div className='row mb-5'>
                <label className='col-md-3 form-label fw-bold'></label>
                <div className='col-md-9'>
                  <div className='form-check form-check-custom form-check-solid'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value=''
                      id='flexCheckDefault'
                    />
                    <label className='form-check-label' htmlFor='flexCheckDefault'>
                      include all users with undetermined gps_location location.
                    </label>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className='row mb-5'>
              <label className='col-md-3 form-label fw-bold'>country:</label>
              <div className='col-md-4'>
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
            </div>
          )}
          {profileSettingsDisabled && (
            <>
              <h5 className='card-title align-items-start flex-column mb-5'>
                <span className='mb-3 fw-bolder'>profile settings</span>
              </h5>
              {/* gender */}
              <div className='row mb-5'>
                <label className='col-md-3 form-label fw-bold'>gender:</label>
                <div className='col-md-4'>
                  <Select
                    isSearchable={true}
                    className='react-select-container'
                    classNamePrefix='react-select'
                    placeholder='select gender'
                    name='gender'
                    defaultValue={genderChoice}
                    value={genderChoice}
                    options={genderOptions}
                    onChange={onGenderChange}
                  />
                </div>
              </div>
              {/* age */}
              <div className='row mb-5'>
                <label className='col-md-3 form-label fw-bold'>age:</label>
                <div className='col-md-4'>
                  <Select
                    isSearchable={true}
                    className='react-select-container'
                    classNamePrefix='react-select'
                    placeholder='select gender'
                    name='age'
                    defaultValue={ageChoice}
                    value={ageChoice}
                    options={ageOptions}
                    onChange={onAgeChange}
                  />
                </div>
              </div>
              {/* age group */}
              {ageGroupsDisabled && (
                <div className='row mb-5'>
                  <label className='col-md-3 form-label fw-bold'></label>
                  <div className='col-md-4'>
                    <Select
                      isLoading={isAgeGroupsLoading}
                      isDisabled={isAgeGroupsDisabled}
                      isSearchable={true}
                      className='react-select-container'
                      classNamePrefix='react-select'
                      placeholder='select age group'
                      name='age_group_id'
                      defaultValue={ageGroupChoice}
                      value={ageGroupChoice}
                      options={ageGroupsOptions}
                      onChange={onAgeGroupChange}
                    />
                  </div>
                </div>
              )}
            </>
          )}
          <h5 className='card-title align-items-start flex-column mb-5'>
            <span className='mb-3 fw-bolder'>app language settings</span>
          </h5>
          {/* languages */}
          <div className='row mb-5'>
            <label className='col-md-3 form-label fw-bold'>language:</label>
            <div className='col-md-4'>
              <Select
                isLoading={isLanguagesLoading}
                isDisabled={isLanguagesDisabled}
                isSearchable={true}
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='select gender'
                name='app_lang'
                options={languagesOptions}
                defaultValue={!isLanguagesDisabled ? langsChoice : loadOptions[0]}
                value={!isLanguagesDisabled ? langsChoice : loadOptions[0]}
                onChange={(choice) => setLangsChoice(choice)}
              />
            </div>
          </div>
          {/* card-footer */}
          <div className='card-footer ps-0 pe-0'>
            <div className='d-flex justify-content-between'>
              <Link to='/notifications/users' className='btn btn-light'>
                <KTIcon iconName='arrow-left' className='fs-6 text-muted me-1' />
                cancel
              </Link>
              <button type='submit' className='btn btn-primary' data-kt-indicator={loading && 'on'}>
                <span className='indicator-label'>update</span>
                <span className='indicator-progress'>
                  update ...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              </button>
            </div>
          </div>
          {/* end card-footer */}
        </div>
      </div>
    </form>
  )
}

export default EditUserNotification
