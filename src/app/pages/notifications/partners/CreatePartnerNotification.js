import {KTIcon} from '../../../../_metronic/helpers'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'
import clsx from 'clsx'
import Select from 'react-select'
import {Link, useNavigate} from 'react-router-dom'
import {
  createPartnerNotification,
  getActivities,
  getActivityCategories,
  getCities,
  getCountries,
  getStates,
} from '../_requests'

function CreatePartnerNotification() {
  const navigate = useNavigate()
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
  const DefOptions = [{value: -1, label: 'all'}]
  const loadOptions = [{value: '', label: 'loading ...'}]
  const [isCountriesLoading, setIsCountriesLoading] = useState(false)
  const [isStatesLoading, setIsStatesLoading] = useState(false)
  const [isCitiesLoading, setIsCitiesLoading] = useState(false)
  const [isCountriesDisabled, setIsCountriesDisabled] = useState(false)
  const [isStatesDisabled, setIsStatesDisabled] = useState(false)
  const [isCitiesDisabled, setIsCitiesDisabled] = useState(false)
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
  const initialValues = {
    title: '',
    body: '',
    timing: 'now',
    sending_date: '',
    partner_status: 'approved',
    country_iso: '-1',
    state_id: '-1',
    city_id: '-1',
    activity_category_id: '-1',
    activities: '',
  }
  // on change
  const onCategoriesChange = (choice) => {
    setIsActivitiesLoading(true)
    setIsActivitiesDisabled(true)
    setCategoryChoice(choice)
    setActivityChoice(DefOptions[0])
    formik.setFieldValue('activity_category_id', choice.value)
    if (choice.value) {
      getActivities(choice.value)
        .then((res) => {
          setActivitiesOptions(
            res.data.data.map((el) => ({
              value: el.id,
              label: el.name,
              disabled: false,
            }))
          )
          setIsActivitiesLoading(false)
          setIsActivitiesDisabled(false)
        })
        .catch((err) => {
          setIsActivitiesLoading(false)
          setIsActivitiesDisabled(false)
        })
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
      setActivitiesOptions(
        activitiesOptions.map((el) => ({
          value: el.value,
          label: el.label,
          disabled: true,
        }))
      )
      setActivityChoice(DefOptions[0])
      formik.setFieldValue('activities', DefOptions[0])
    } else {
      setActivitiesOptions(
        activitiesOptions.map((el) => ({
          value: el.value,
          label: el.label,
          disabled: false,
        }))
      )
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
      getStates({country_iso: choice.value})
        .then((res) => {
          if (res.data.data.length > 0) {
            setStatesOptions(
              res.data.data.map((el) => ({
                value: el.id,
                label: el.name,
              }))
            )
          }
          setIsStatesLoading(false)
          setIsStatesDisabled(false)
        })
        .catch((err) => {
          setIsStatesLoading(false)
          setIsStatesDisabled(false)
        })
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
      getCities({state_id: choice.value})
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
  // useeffect
  useEffect(() => {
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
    // activity categories
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
    //sending_date
    const dateTimeFormat = dateTimeFormatHandler()
    formik.setFieldValue('sending_date', dateTimeFormat)
    // activities
    setActivityChoice(DefOptions[0])
    formik.setFieldValue('activities', DefOptions)
  }, [])

  // formik
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, {resetForm, setFieldValue}) => {
      setLoading(true)
      try {
        await createPartnerNotification(values).then((res) => {
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
                isOptionDisabled={(option) => option.disabled}
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
                <span className='indicator-label'>create</span>
                <span className='indicator-progress'>
                  create ...
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

export default CreatePartnerNotification
