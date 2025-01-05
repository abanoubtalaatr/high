import React, {useEffect, useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {Modal} from 'react-bootstrap'
import Select from 'react-select'
import { createTranslation } from '../../pages/setup-files/_requests'

function CreateTranslationModal(props) {
  const {show, onHide, onComplete} = props

  const numberRegExp = /^[0-9]+$/
  // form validation
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required('this field is required')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    code: Yup.string()
      .required('this field is required')
      .min(2, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    description: Yup.string()
      .required('this field is required')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    order: Yup.string()
      .required('this field is required')
      .min(1, 'Minimum 3 symbols')
      .max(10, 'Maximum 50 symbols')
      .matches(numberRegExp, 'number is not valid'),
  })
  const statusOptions = [
    {value: '1', label: 'active'},
    {value: '0', label: 'inactive'},
  ]

  const [statusChoice, setStatusChoice] = useState([])
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')
  const [image, setImage] = useState('')
  const [imageBg, setImageBg] = useState('')
  const [updateImageStatus, setUpdateImageStatus] = useState(false)
  const [initialValues, setInitialValues] = useState({
    name: '',
    image: '',
    description: '',
    code: '',
    order: '',
    active: '',
  })
  const onChangeImage = (event) => {
    const file = event.target.files[0]
    setImage(file)
    setImageBg(URL.createObjectURL(file))
    setUpdateImageStatus(true)
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
  // handle onChange event of the dropdown

  const statusHandleChange = (choice) => {
    setStatusChoice(choice)
    formik.setFieldValue('active', choice.value)
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
      imageHandler()
    }
  }, [show])

  useEffect(() => {
    statusDefaultValue()
  }, [])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, {resetForm}) => {
      setLoading(true)
      const formData = new FormData()
      // formData.append('_method', 'put')
      formData.append('name', values.name)
      // updateImageStatus && formData.append('image', image)
      // formData.append('description', values.description)
      // formData.append('order', values.order)
      formData.append('code', values.code)
      // formData.append('active', values.active)
      try {
        await createTranslation(formData).then((res) => {
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
        <Modal.Title>create language</Modal.Title>
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
            {/* description */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>description:</label>
              <div className='col-sm-9'>
                <input
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('description')}
                  className={clsx('form-control form-control-solid', {
                    'is-invalid': formik.touched.description && formik.errors.description,
                  })}
                  placeholder='enter description'
                />
                {formik.touched.description && formik.errors.description && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.description}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* code */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>code:</label>
              <div className='col-sm-9'>
                <input
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('code')}
                  className={clsx('form-control form-control-solid', {
                    'is-invalid': formik.touched.code && formik.errors.code,
                  })}
                  placeholder='enter code'
                />
                {formik.touched.code && formik.errors.code && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.code}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* order */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>order:</label>
              <div className='col-sm-9'>
                <input
                  type='number'
                  autoComplete='off'
                  {...formik.getFieldProps('order')}
                  className={clsx('form-control form-control-solid', {
                    'is-invalid': formik.touched.order && formik.errors.order,
                  })}
                  placeholder='enter order'
                />
                {formik.touched.order && formik.errors.order && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.order}</span>
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

export default CreateTranslationModal
