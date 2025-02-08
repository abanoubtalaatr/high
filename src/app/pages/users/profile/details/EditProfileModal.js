import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useParams} from 'react-router-dom'
import {useFormik} from 'formik'
import {Modal} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {getCountries, updateUserInfo} from '../../_requests'
import clsx from 'clsx'
import Select from 'react-select'
import {KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'

function EditProfileModal(props) {
  const {userId} = useParams()
  const {show, onHide, onComplete, userDetails} = props

  // form validation
  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required('this field is required')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    phone: Yup.string()
      .required('this field is required')
      .matches(phoneRegExp, 'phone number is not valid'),
  })
  const loadOptions = [{value: '', label: 'loading ...'}]
  const [phoneCodeOptions, setPhoneCodeOptions] = useState([])
  const [countriesOptions, setCountriesOptions] = useState([])
  const [phoneCodeChoice, setPhoneCodeChoice] = useState([])
  var newdate = userDetails.date_of_birth
    ? userDetails.date_of_birth.split('/').reverse().join('/')
    : new Date()
  const [startDate, setStartDate] = useState(new Date(newdate))
  const [image, setImage] = useState('')
  const [imageBg, setImageBg] = useState(userDetails.photo)
  const [updateImageStatus, setUpdateImageStatus] = useState(false)
  const [genderOptions, setGenderOptions] = useState([
    {
      value: 'male',
      label: 'male',
    },
    {
      value: 'female',
      label: 'female',
    },
  ])
  const [genderChoice, setGenderChoice] = useState([])
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [initialValues, setinitialValues] = useState({
    name: userDetails.name || '',
    username: userDetails.high_five_user_name || '',
    email: userDetails.email || '',
    phone: userDetails.phone || '',
    phone_code: userDetails.phone_code || '0',
    gender: userDetails.gender,
    image: userDetails.photo || '',
    date_of_birth: userDetails.date_of_birth || new Date(),
  })
  const onChangeImage = (event) => {
    const file = event.target.files[0]
    setImage(file)
    setImageBg(URL.createObjectURL(file))
    setUpdateImageStatus(true)
    const formData = new FormData()
    updateImageStatus && formData.append('image', file)
    formik.setFieldValue('image', formData.append('image', file))
  }

  const imageHandler = () => {
    if (imageBg) {
      setImageBg(imageBg)
    } else {
      setImageBg(toAbsoluteUrl('/media/avatars/blank.png'))
    }
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
  const phoneCodeDefaultValue = () => {
    const value = phoneCodeOptions.filter((option) => option.value == initialValues.phone_code)
    const defaultValue = value.length === 0 ? phoneCodeOptions[0] : value[0]
    setPhoneCodeChoice(defaultValue)
    defaultValue && formik.setFieldValue('phone_code', defaultValue.value)
  }
  const genderDefaultValue = () => {
    const value = genderOptions.filter((option) => option.value == initialValues.gender)
    const defaultValue = value.length === 0 ? genderOptions[0] : value
    setGenderChoice(defaultValue)
  }

  const onChangeGender = (choice) => {
    setGenderChoice(choice)
    formik.setFieldValue('gender', choice.value)
  }
  const onChangePhoneCodeHandle = (choice) => {
    setPhoneCodeChoice(choice)
    formik.setFieldValue('phone_code', choice.value)
  }
  useEffect(() => {
    genderDefaultValue()
    imageHandler()
    // Countries
    getCountries()
      .then((res) => {
        const datas = res.data.data
        phoneCodeOptionsHandler(datas)
        countriesIsoOptionsHandler(datas)
      })
      .catch((err) => {
        phoneCodeOptionsHandler([])
        countriesIsoOptionsHandler([])
      })
  }, [])
  useEffect(() => {
    phoneCodeDefaultValue()
  }, [phoneCodeOptions])

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, {setStatus, setFieldValue}) => {
      setLoading(true)
      try {
        await updateUserInfo(values, userId).then((res) => {
          console.log(res,'res')
          setAlertType('success')
          setLoading(false)
          onComplete()
        })
      } catch (error) {
        setAlertType('danger')
        setStatus(error.response.data?.message)
        console.log(error.response.data?.message)
        setLoading(false)
        
      }
    },
  })
  return (
    <Modal show={show} onHide={onHide} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>update user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          {formik.status && (
            <div className={`mb-lg-15 alert alert-${alertType}`}>
              <div className='alert-text font-weight-bold'>{formik.status}</div>
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
          
          {/* username */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>username:</label>
            <div className='col-sm-9'>
              <input
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('username')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.username && formik.errors.username,
                })}
                placeholder='enter username'
              />
              {formik.touched.username && formik.errors.username && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.username}</span>
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
                    name='phone_code'
                    defaultValue={phoneCodeChoice}
                    value={phoneCodeChoice}
                    onChange={onChangePhoneCodeHandle}
                    options={phoneCodeOptions}
                    className='react-select-container'
                    classNamePrefix='react-select'
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
          {/* gender */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>gender:</label>
            <div className='col-sm-9'>
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='select gender'
                name='gender'
                defaultValue={genderChoice}
                value={genderChoice}
                options={genderOptions}
                onChange={onChangeGender}
              />
            </div>
            {formik.touched.gender && formik.errors.gender && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.gender}</span>
                </div>
              </div>
            )}
          </div>
          {/* birth date */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>birth date:</label>
            <div className='col-sm-9'>
              <DatePicker
                autoComplete='off'
                name='date_of_birth'
                className='form-control form-control-solid mb-3'
                showIcon
                icon='fa fa-calendar'
                selected={startDate}
                placeholderText='select birth date'
                dateFormat='dd/MM/yyyy'
                onChange={(date) => setStartDate(date)}
              />
              {formik.touched.date_of_birth && formik.errors.date_of_birth && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.date_of_birth}</span>
                  </div>
                </div>
              )}
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

export default EditProfileModal
