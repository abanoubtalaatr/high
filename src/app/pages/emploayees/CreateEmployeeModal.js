import React, {useEffect, useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {createEmployee, getCountries, getJobs} from './_requests'
import {Modal} from 'react-bootstrap'
import Select from 'react-select'

function CreateEmployeeModal(props) {
  const {show, onHide, onComplete} = props

  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
  // form validation
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required('this field is required')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    email: Yup.string()
      .email('Wrong email format')
      .required('this field is required')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    phone: Yup.string()
      .required('this field is required')
      .matches(phoneRegExp, 'phone number is not valid'),
  })
  const statusOptions = [
    {value: '1', label: 'active'},
    {value: '0', label: 'inactive'},
  ]
  const loadOptions = [{value: '', label: 'loading ...'}]
  const [isCountriesLoading, setIsCountriesLoading] = useState(false)
  const [isCountriesDisabled, setIsCountriesDisabled] = useState(false)
  const [isPhoneCodeLoading, setIsPhoneCodeLoading] = useState(false)
  const [isPhoneCodeDisabled, setIsPhoneCodeDisabled] = useState(false)
  const [isJobsLoading, setIsJobsLoading] = useState(false)
  const [isJobsDisabled, setIsJobsDisabled] = useState(false)
  const [phoneCodeOptions, setPhoneCodeOptions] = useState([])
  const [phoneCodeChoice, setPhoneCodeChoice] = useState([])
  const [countriesOptions, setCountriesOptions] = useState([])
  const [countryChoice, setCountryChoice] = useState([])
  const [jobsOptions, setJobsOptions] = useState([])
  const [jobChoice, setJobChoice] = useState([])
  const [statusChoice, setStatusChoice] = useState([])
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')
  const [image, setImage] = useState('')
  const [imageBg, setImageBg] = useState(toAbsoluteUrl('/media/avatars/blank.png'))
  const [updateImageStatus, setUpdateImageStatus] = useState(false)
  const [initialValues, setInitialValues] = useState({
    name: '',
    image: '',
    email: '',
    phone: '',
    phone_code: '',
    country_iso: '',
    job_id: '',
    active: '',
  })
  const onChangeImage = (event) => {
    const file = event.target.files[0]
    setImage(file)
    setImageBg(URL.createObjectURL(file))
    setUpdateImageStatus(true)
  }
  const removePhotoHandler = () => {
    setImage('')
    setImageBg(toAbsoluteUrl('/media/avatars/blank.png'))
  }
  const phoneCodeOptionsHandler = (res) => {
    setPhoneCodeOptions(
      res.map((el) => ({
        value: el.phone_code,
        label: el.phone_code,
      }))
    )
  }
  const countriesIsoOptionsHandler = (res) => {
    setCountriesOptions(
      res.map((el) => ({
        value: el.iso,
        label: el.name,
      }))
    )
  }
  const jobsOptionsHandler = (res) => {
    setJobsOptions(
      res.map((el) => ({
        value: el.id,
        label: el.name,
      }))
    )
  }
  // handle onChange event of the dropdown
  const phoneCodeHandleChange = (choice) => {
    setPhoneCodeChoice(choice)
    formik.setFieldValue('phone_code', choice.value)
  }
  const countriesHandleChange = (choice) => {
    setCountryChoice(choice)
    formik.setFieldValue('country_iso', choice.value)
  }
  const jobsHandleChange = (choice) => {
    setJobChoice(choice)
    formik.setFieldValue('job_id', choice.value)
  }
  const statusHandleChange = (choice) => {
    setStatusChoice(choice)
    formik.setFieldValue('active', choice.value)
  }
  const phoneCodeDefaultValue = () => {
    const value = phoneCodeOptions.filter((option) => option.value == initialValues.phone_code)
    const defaultValue = value.length === 0 ? phoneCodeOptions[0] : value
    setPhoneCodeChoice(defaultValue)
    defaultValue && formik.setFieldValue('phone_code', defaultValue.value)
  }
  const countriesDefaultValue = () => {
    const value = countriesOptions.filter((option) => option.value == initialValues.country_iso)
    const defaultValue = value.length === 0 ? countriesOptions[0] : value
    setCountryChoice(defaultValue)
    defaultValue && formik.setFieldValue('country_iso', defaultValue.value)
  }
  const jobsDefaultValue = () => {
    const value = jobsOptions.filter((option) => option.value == initialValues.job_id)
    const defaultValue = value.length === 0 ? jobsOptions[0] : value
    setJobChoice(defaultValue)
    defaultValue && formik.setFieldValue('job_id', defaultValue.value)
  }
  const statusDefaultValue = () => {
    const value = statusOptions.filter((option) => option.value == initialValues.active)
    const defaultValue = value.length === 0 ? statusOptions[0] : value
    setStatusChoice(defaultValue)
    defaultValue && formik.setFieldValue('active', defaultValue.value)
  }
  const onHideHandler = () => {
    removePhotoHandler()
    formik.resetForm()
    onHide(false)
  }
  useEffect(() => {
    if (show) {
      setIsCountriesLoading(true)
      setIsCountriesDisabled(true)
      setIsPhoneCodeLoading(true)
      setIsPhoneCodeDisabled(true)
      setIsJobsLoading(true)
      setIsJobsDisabled(true)
      getCountries()
        .then((res) => {
          phoneCodeOptionsHandler(res.data.data)
          countriesIsoOptionsHandler(res.data.data)
          setIsCountriesLoading(false)
          setIsCountriesDisabled(false)
          setIsPhoneCodeLoading(false)
          setIsPhoneCodeDisabled(false)
        })
        .catch((err) => {
          phoneCodeOptionsHandler([])
          countriesIsoOptionsHandler([])
          setIsCountriesLoading(false)
          setIsCountriesDisabled(false)
          setIsPhoneCodeLoading(false)
          setIsPhoneCodeDisabled(false)
        })
      getJobs()
        .then((res) => {
          jobsOptionsHandler(res.data.data)
          setIsJobsLoading(false)
          setIsJobsDisabled(false)
        })
        .catch((err) => {
          jobsOptionsHandler([])
          setIsJobsLoading(false)
          setIsJobsDisabled(false)
        })
    }
  }, [show])
  useEffect(() => {
    phoneCodeDefaultValue()
  }, [phoneCodeOptions])
  useEffect(() => {
    countriesDefaultValue()
  }, [countriesOptions])
  useEffect(() => {
    jobsDefaultValue()
  }, [jobsOptions])
  useEffect(() => {
    statusDefaultValue()
  }, [])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, {setStatus, resetForm, setFieldValue}) => {
      setLoading(true)
      const formData = new FormData()
      // formData.append('_method', 'put')
      formData.append('name', values.name)
      updateImageStatus && formData.append('image', image)
      formData.append('email', values.email)
      formData.append('phone', values.phone)
      formData.append('phone_code', values.phone_code)
      formData.append('country_iso', values.country_iso)
      formData.append('active', values.active)
      formData.append('job_id', values.job_id)
      try {
        await createEmployee(formData).then((res) => {
          resetForm()
          removePhotoHandler()
          setAlertType('success')
          // setStatus(res.data.message)
          setAlertMessage('')
          setLoading(false)
          setUpdateImageStatus(false)
          onComplete(true)
        })
      } catch (error) {
        setAlertType('danger')
        // setStatus(error.response.data.message)
        setAlertMessage(error.response.data.message)
        setLoading(false)
      }
    },
  })
  return (
    <Modal show={show} onHide={onHideHandler} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>create employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
            {alertMessage && (
              <div className={`mb-lg-15 alert alert-${alertType}`}>
                <div className='alert-text font-weight-bold'>{alertMessage}</div>
              </div>
            )}
            {/* avatar */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>image:</label>
              <div className='col-sm-9'>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div
                    className='image-input-wrapper w-125px h-125px"'
                    style={{
                      backgroundImage: `url('${imageBg}')`,
                    }}
                  ></div>
                  {image && (
                    <span
                      className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
                      data-kt-image-input-action='remove'
                      data-bs-toggle='tooltip'
                      data-bs-dismiss='click'
                      title='Remove photo'
                      onClick={removePhotoHandler}
                    >
                      <KTIcon iconName='trash' className='fs-6' />
                    </span>
                  )}
                  <div className='image-input-tools'>
                    <label
                      className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
                      data-kt-image-input-action='change'
                      data-bs-toggle='tooltip'
                      data-bs-dismiss='click'
                      title='Change photo'
                    >
                      <KTIcon iconName='pencil' className='fs-6' />
                      <input
                        type='file'
                        name='image'
                        accept='.png, .jpg, .jpeg'
                        onChange={onChangeImage}
                      />
                      <input type='hidden' />
                    </label>
                  </div>
                </div>
              </div>
            </div>
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
                  placeholder='enter name'
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
            {/* email */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>email:</label>
              <div className='col-sm-9'>
                <input
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('email')}
                  className={clsx('form-control form-control-solid', {
                    'is-invalid': formik.touched.email && formik.errors.email,
                  })}
                  placeholder='enter email'
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.email}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* phone */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>phone:</label>
              <div className='col-sm-9'>
                <div className='input-group mb-3'>
                  <span className='input-group-text p-0 border-0'>
                    <Select
                      className='react-select-container'
                      classNamePrefix='react-select'
                      isLoading={isPhoneCodeLoading}
                      isDisabled={isPhoneCodeDisabled}
                      name='phone_code'
                      defaultValue={phoneCodeChoice}
                      value={!isPhoneCodeDisabled ? phoneCodeChoice : loadOptions[0]}
                      onChange={phoneCodeHandleChange}
                      options={phoneCodeOptions}
                    />
                  </span>
                  {formik.touched.phone_code && formik.errors.phone_code && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.phone_code}</span>
                      </div>
                    </div>
                  )}
                  <input
                    type='text'
                    autoComplete='off'
                    {...formik.getFieldProps('phone')}
                    className={clsx('form-control form-control-solid', {
                      'is-invalid': formik.touched.phone && formik.errors.phone,
                    })}
                    placeholder='enter phone'
                  />
                </div>
                {formik.touched.phone && formik.errors.phone && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.phone}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* jobs */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>job:</label>
              <div className='col-sm-9'>
                <Select
                  className='react-select-container'
                  classNamePrefix='react-select'
                  name='job_id'
                  isLoading={isJobsLoading}
                  isDisabled={isJobsDisabled}
                  isSearchable={true}
                  defaultValue={jobChoice}
                  value={!isJobsDisabled ? jobChoice : loadOptions[0]}
                  onChange={jobsHandleChange}
                  options={jobsOptions}
                />
              </div>
              {formik.touched.job_id && formik.errors.job_id && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.job_id}</span>
                  </div>
                </div>
              )}
            </div>
            {/* country */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>country:</label>
              <div className='col-sm-9'>
                <Select
                  className='react-select-container'
                  classNamePrefix='react-select'
                  name='country_iso'
                  isLoading={isCountriesLoading}
                  isDisabled={isCountriesDisabled}
                  isSearchable={true}
                  onChange={countriesHandleChange}
                  options={countriesOptions}
                  defaultValue={countryChoice}
                  value={!isCountriesDisabled ? countryChoice : loadOptions[0]}
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
        }
      </Modal.Body>
    </Modal>
  )
}

export default CreateEmployeeModal
