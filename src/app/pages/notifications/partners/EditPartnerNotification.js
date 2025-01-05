// import CreateEmployeeModal from './CreateEmployeeModal'

import {KTIcon} from '../../../../_metronic/helpers'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'
import clsx from 'clsx'
import Select from 'react-select'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {
  createPartnerNotification,
  getActivities,
  getActivityCategories,
  getCities,
  getCountries,
  getPartnerNotification,
  getStates,
  updatePartnerNotification,
} from '../_requests'

function EditPartnerNotification() {
  const navigate = useNavigate()
  const {itemId} = useParams()
  console.log(itemId, 'item id ')
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')
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
  const [loadMap, setLoadMap] = useState(false)
  const [isCountriesLoading, setIsCountriesLoading] = useState(false)
  const [isStatesLoading, setIsStatesLoading] = useState(false)
  const [isCitiesLoading, setIsCitiesLoading] = useState(false)
  const [isCountriesDisabled, setIsCountriesDisabled] = useState(false)
  const [isStatesDisabled, setIsStatesDisabled] = useState(false)
  const [isCitiesDisabled, setIsCitiesDisabled] = useState(false)
  const DefOptions = [{value: -1, label: 'all', disabled: false}]
  const loadOptions = [{value: '', label: 'loading ...'}]
  const [countriesOptions, setCountriesOptions] = useState([])
  const [statesOptions, setStatesOptions] = useState([])
  const [citiesOptions, setCitiesOptions] = useState([])
  const [countryChoice, setCountryChoice] = useState(DefOptions[0])
  const [stateChoice, setStateChoice] = useState(DefOptions[0])
  const [cityChoice, setCityChoice] = useState(DefOptions[0])
  const [timingChoice, setTimingChoice] = useState('now')
  const [statusChoice, setStatusChoice] = useState('approved')
  const [sendingDate, setSendingDate] = useState(new Date())
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false)
  const [isCategoriesDisabled, setIsCategoriesDisabled] = useState(false)
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(false)
  const [isActivitiesDisabled, setIsActivitiesDisabled] = useState(false)
  const [categoriesOptions, setCategoriesOptions] = useState([])
  const [categoryChoice, setCategoryChoice] = useState(DefOptions[0])
  const [activitiesOptions, setActivitiesOptions] = useState([])
  const [activityChoice, setActivityChoice] = useState([])
  const [activitiesAllValue, setActivitiesAllValue] = useState(true)
  const [activitiesOptionsDisabled, setActivitiesOptionsDisabled] = useState(false)
  const [initialValues, setInitialValues] = useState({
    title: '',
    body: '',
    timing: 'now',
    sending_date: '',
    partner_status: 'approved',
    country_iso: '-1',
    state_id: '-1',
    city_id: '-1',
    activity_category_id: '-1',
    activities: [],
  })
  const countriesDefaultValue = () => {
    const value = countriesOptions.filter((option) => option.value == initialValues.country_iso)
    const defaultValue = value.length === 0 ? countriesOptions[0] : value
    setCountryChoice(defaultValue)
    // defaultValue?.value && formik.setFieldValue('country_iso', defaultValue.value)
  }
  const statesDefaultValue = () => {
    const value = statesOptions.filter((option) => option.value == initialValues.state_id)
    const defaultValue = value.length === 0 ? DefOptions[0] : value
    setStateChoice(defaultValue)
    // formik.setFieldValue('state_id', defaultValue.value)
  }
  const citiesDefaultValue = () => {
    const value = citiesOptions.filter((option) => option.value == initialValues.city_id)
    const defaultValue = value.length === 0 ? DefOptions[0] : value
    setCityChoice(defaultValue)
    // formik.setFieldValue('city_id', defaultValue.value)
  }
  const activityCategoryDefaultValue = () => {
    const value = categoriesOptions.filter(
      (option) => option.value == initialValues.activity_category_id
    )
    const defaultValue = value.length === 0 ? DefOptions[0] : value
    setCategoryChoice(defaultValue)
    // formik.setFieldValue('activity_category_id', defaultValue.value)
  }
  const activitiesDefaultValue = () => {
    const activities_defaultValue = []
    if (initialValues.activities[0] === -1) {
      activities_defaultValue.push(DefOptions[0])
      setActivitiesAllValue(true)
      setActivityChoice(DefOptions[0])
      formik.setFieldValue('activities', DefOptions[0])
    } else {
      if (initialValues.activities.length > 0) {
        for (let s = 0; s < initialValues.activities.length; s++) {
          const sv = activitiesOptions.filter(
            (option) => option.value == initialValues.activities[s].id
          )

          for (let ac = 0; ac < sv.length; ac++) {
            activities_defaultValue.push(sv[ac])
          }
        }
      }
      setActivitiesAllValue('true')
      setActivityChoice(activities_defaultValue)
      formik.setFieldValue('activities', activities_defaultValue)
    }
  }
  // on change
  const onCategoriesChange = (choice) => {
    setIsActivitiesLoading(true)
    setIsActivitiesDisabled(true)
    setCategoryChoice(choice)
    setActivityChoice(DefOptions[0])
    formik.setFieldValue('activity_category_id', choice.value)
    if (choice.value) {
      getActivitiesHandler(choice.value)
    } else {
      setActivitiesOptions(DefOptions)
      setIsActivitiesLoading(false)
      setIsActivitiesDisabled(false)
    }
  }
  // on change activities
  const onActivitiesChange = (choice) => {
    const value = choice.filter((option) => option.value === DefOptions[0].value)
    if (value.length > 0) {
      setActivitiesAllValue(true)
      setActivityChoice(DefOptions[0])
      formik.setFieldValue('activities', DefOptions[0])
    } else {
      setActivitiesAllValue('true')
      setActivityChoice(choice)
      formik.setFieldValue('activities', choice)
    }
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
  // on change Status settings
  const onChangeStatus = (e) => {
    setStatusChoice(e.target.value)
    formik.setFieldValue('partner_status', e.target.value)
  }
  // on change country
  const onChangeCountry = (choice) => {
    setIsStatesLoading(true)
    setIsStatesDisabled(true)
    setCountryChoice(choice)
    setStateChoice(DefOptions[0])
    setCityChoice(DefOptions[0])
    setStatesOptions([])
    setCitiesOptions([])
    formik.setFieldValue('country_iso', choice.value)
    formik.setFieldValue('state_id', DefOptions[0].value)
    formik.setFieldValue('city_id', DefOptions[0].value)
    if (choice.value) {
      getStatesHandler({country_iso: choice.value})
    } else {
      setIsStatesLoading(false)
      setIsStatesDisabled(false)
    }
  }
  // on change state
  const onChangeState = (choice) => {
    setIsCitiesLoading(true)
    setIsCitiesDisabled(true)
    setStateChoice(choice)
    setCityChoice(DefOptions[0])
    setCitiesOptions([])
    formik.setFieldValue('state_id', choice.value)
    formik.setFieldValue('city_id', DefOptions[0].value)
    if (choice.value) {
      getCitiesHandler({state_id: choice.value})
    } else {
      setIsCitiesLoading(false)
      setIsCitiesDisabled(false)
    }
  }
  // on change city
  const onChangeCity = (choice) => {
    setCityChoice(choice)
    formik.setFieldValue('city_id', choice.value)
  }
  // get query
  const getCountriesHandler = () => {
    setIsCountriesLoading(true)
    setIsCountriesDisabled(true)
    setCountryChoice(DefOptions[0])
    setStateChoice(DefOptions[0])
    setCityChoice(DefOptions[0])
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
        setCountriesOptions([])
      })
  }
  const getCitiesHandler = (stateId) => {
    setLoadMap(false)
    getCities({state_id: stateId})
      .then((res) => {
        if (res.data.data.length > 0) {
          setCitiesOptions(
            res.data.data.map((el) => ({
              value: el.id,
              label: el.name,
            }))
          )
        }
        setIsCitiesLoading(false)
        setIsCitiesDisabled(false)
      })
      .catch((err) => {
        setIsCitiesLoading(false)
        setIsCitiesDisabled(false)
      })
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
          // setStates(res.data.data)
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
  const getActivityCategoriesHandler = () => {
    setIsCategoriesLoading(true)
    setIsCategoriesDisabled(true)
    setCategoryChoice(DefOptions[0])
    getActivityCategories()
      .then((res) => {
        setCategoriesOptions(
          res.data.data.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        )
        setIsCategoriesLoading(false)
        setIsCategoriesDisabled(false)
      })
      .catch((err) => {
        setCountriesOptions([])
        setIsCategoriesLoading(false)
        setIsCategoriesDisabled(false)
      })
  }
  const getActivitiesHandler = (catId) => {
    getActivities(catId)
      .then((res) => {
        setActivitiesOptions(
          res.data.data.map((el) => ({
            value: el.id,
            label: el.name,
            disabled: true,
          }))
        )
        setIsActivitiesLoading(false)
        setIsActivitiesDisabled(false)
      })
      .catch((err) => {
        setIsActivitiesLoading(false)
        setIsActivitiesDisabled(false)
      })
  }
  // useeffect
  useEffect(() => {
    setLoadMap(false)
    getPartnerNotification(itemId)
      .then((res) => {
        const newData = res.data.data
        console.log(newData);
        setInitialValues({
          title: newData.title,
          body: newData.body,
          timing: newData.timing,
          sending_date: newData.sending_date,
          partner_status: newData.partner_status,
          activities: newData.activities,
          activity_category_id: newData.activity_category_id.id,
          country_iso: newData.country_iso,
          state_id: newData.state_id,
          city_id: newData.city_id,
        })
        getCountriesHandler()
        getStatesHandler(newData.country_iso)
        getCitiesHandler(newData.state_id)
        getActivityCategoriesHandler()
        getActivitiesHandler(newData.activity_category_id.id)
        setTimingChoice(newData.timing)
        setStatusChoice(newData.partner_status)
        const dateTime = new Date(newData.sending_date)
        setSendingDate(dateTime)
      })
      .catch((err) => {
        navigate('/notifications/partners', {
          state: {
            alertType: 'danger',
            alertMessage: 'this item not found',
          },
        })
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
  useEffect(() => {
    activityCategoryDefaultValue()
  }, [categoriesOptions])
  useEffect(() => {
    activitiesDefaultValue()
  }, [activitiesOptions])

  // formik
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, {resetForm, setFieldValue}) => {
      setLoading(true)
      try {
        await updatePartnerNotification(values, itemId).then((res) => {
          resetForm()
          setAlertType('success')
          setAlertMessage(res.data.message)
          setLoading(false)
          navigate('/notifications/partners')
        })
      } catch (error) {
        setAlertType('danger')
        setAlertMessage(error.response.data.message)
        setLoading(false)
      }
    },
  })
  console.log('initialValues',initialValues);
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
                placeholder='enter notification title'
                {...formik.getFieldProps('title')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.title && formik.errors.title,
                })}
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
            <span className='mb-3 fw-bolder'>status settings</span>
          </h5>
          {/* status */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>status:</label>
            <div className='col-sm-9'>
              <div className='d-flex'>
                <div className='form-check form-check-custom form-check-solid me-10'>
                  <input
                    className='form-check-input'
                    name='partner_status'
                    type='radio'
                    value='approved'
                    id='approved'
                    checked={statusChoice === 'approved'}
                    onChange={onChangeStatus}
                  />
                  <label className='form-check-label' htmlFor='approved'>
                    approved
                  </label>
                </div>
                <div className='form-check form-check-custom form-check-solid me-10'>
                  <input
                    className='form-check-input'
                    name='partner_status'
                    type='radio'
                    value='not_approved'
                    id='not-approved'
                    checked={statusChoice === 'not_approved'}
                    onChange={onChangeStatus}
                  />
                  <label className='form-check-label' htmlFor='not-approved'>
                    not approved
                  </label>
                </div>
                <div className='form-check form-check-custom form-check-solid me-10'>
                  <input
                    className='form-check-input'
                    name='partner_status'
                    type='radio'
                    value='all'
                    id='all'
                    checked={statusChoice === 'all'}
                    onChange={onChangeStatus}
                  />
                  <label className='form-check-label' htmlFor='all'>
                    all
                  </label>
                </div>
              </div>
              {formik.touched.content && formik.errors.content && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.content}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <h5 className='card-title align-items-start flex-column mb-5'>
            <span className='mb-3 fw-bolder'>main location settings</span>
          </h5>
          {/* country */}
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
                name='country'
                defaultValue={!isCountriesDisabled ? countryChoice : loadOptions[0]}
                value={!isCountriesDisabled ? countryChoice : loadOptions[0]}
                options={[...DefOptions, ...countriesOptions]}
                onChange={onChangeCountry}
              />
            </div>
          </div>
          {/* states */}
          <div className='row mb-5'>
            <label className='col-md-3 form-label fw-bold'>states:</label>
            <div className='col-md-4'>
              <Select
                isLoading={isStatesLoading}
                isDisabled={isStatesDisabled}
                isSearchable={true}
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='Select state'
                name='state'
                defaultValue={!isStatesDisabled ? stateChoice : loadOptions[0]}
                value={!isStatesDisabled ? stateChoice : loadOptions[0]}
                options={[...DefOptions, ...statesOptions]}
                onChange={onChangeState}
              />
            </div>
          </div>
          {/* cities */}
          <div className='row mb-5'>
            <label className='col-md-3 form-label fw-bold'>cities:</label>
            <div className='col-md-4'>
              <Select
                isLoading={isCitiesLoading}
                isDisabled={isCitiesDisabled}
                isSearchable={true}
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='Select city'
                name='city'
                defaultValue={!isCitiesDisabled ? cityChoice : loadOptions[0]}
                value={!isCitiesDisabled ? cityChoice : loadOptions[0]}
                options={[...DefOptions, ...citiesOptions]}
                onChange={onChangeCity}
              />
            </div>
          </div>
          <h5 className='card-title align-items-start flex-column mb-5'>
            <span className='mb-3 fw-bolder'>activities settings</span>
          </h5>
          {/* categories */}
          <div className='row mb-5'>
            <label className='col-md-3 form-label fw-bold'>categories:</label>
            <div className='col-md-4'>
              <Select
                isLoading={isCategoriesLoading}
                isDisabled={isCategoriesDisabled}
                isSearchable={true}
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='select category'
                name='activity_category_id'
                defaultValue={!isCategoriesDisabled ? categoryChoice : loadOptions[0]}
                value={!isCategoriesDisabled ? categoryChoice : loadOptions[0]}
                options={[...DefOptions, ...categoriesOptions]}
                onChange={onCategoriesChange}
              />
            </div>
          </div>
          {/* activity */}
          <div className='row mb-5'>
            <label className='col-md-3 form-label fw-bold'>activity:</label>
            <div className='col-md-4'>
              <Select
                isLoading={isActivitiesLoading}
                isDisabled={isActivitiesDisabled}
                isMulti
                closeMenuOnSelect={false}
                isSearchable={true}
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='select activities'
                name='activities'
                defaultValue={activityChoice}
                value={activityChoice}
                options={[...DefOptions, ...activitiesOptions]}
                onChange={onActivitiesChange}
                isOptionDisabled={(option) => option.disabled === activitiesAllValue}
              />
            </div>
          </div>
          {/* card-footer */}
          <div className='card-footer ps-0 pe-0'>
            <div className='d-flex justify-content-between'>
              <Link to='/notifications/partners' className='btn btn-light'>
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

export default EditPartnerNotification
