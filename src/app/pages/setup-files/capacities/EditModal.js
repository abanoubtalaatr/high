import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import Select from 'react-select'
import { useFormik } from 'formik'
import { Button, Modal } from 'react-bootstrap'
import { getCapacity, updateCapacity } from '../_requests'
import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers'

function EditModal(props) {
  const { show, onHide, onComplete, itemDetails } = props
  const numberRegExp = /^[0-9]+$/
  // form validation
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required('this field is required')
      .min(2, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    order: Yup.string()
      .required('this field is required')
      .min(1, 'Minimum 3 symbols')
      .max(10, 'Maximum 50 symbols')
      .matches(numberRegExp, 'number is not valid'),
    active: Yup.string().required('this field is required'),
  })

  const statusOptions = [
    { value: '1', label: 'active' },
    { value: '0', label: 'inactive' },
  ]
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')
  const [statusChoice, setStatusChoice] = useState([])
  const [image, setImage] = useState('')
  const [imageBg, setImageBg] = useState(itemDetails.image || toAbsoluteUrl('/media/avatars/blank.png'))
  const [updateImageStatus, setUpdateImageStatus] = useState(false)
  const [initialValues, setInitialValues] = useState({ ...itemDetails })

  const statusDefaultValue = () => {
    const value = statusOptions.filter((option) => option.value == initialValues.active)
    const defaultValue = value.length === 0 ? statusOptions[0] : value
    setStatusChoice(defaultValue)
  }
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
  const statusHandleChange = (choice) => {
    setStatusChoice(choice)
    formik.setFieldValue('active', choice.value)
  }
  const onHideHandler = () => {
    removePhotoHandler()
    formik.resetForm()
    onHide(false)
    setLoading(false)
  }

  useEffect(() => {
    statusDefaultValue()
  }, [initialValues])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, { setStatus, resetForm }) => {
      setLoading(true)
      const formData = new FormData()
      formData.append('_method', 'put')
      formData.append('name', values.name)
      updateImageStatus && formData.append('image', image)
      formData.append('order', values.order)
      formData.append('active', values.active)
      try {
        await updateCapacity(formData, itemDetails.id).then((res) => {
          setAlertType('success')
          resetForm()
          setStatus(res.data.message)
          setLoading(false)
          setUpdateImageStatus(false)
          onComplete(true)
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
        <Modal.Title>create new capacity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          {alertMessage && (
            <div className={`mb-lg-15 alert alert-${alertType}`}>
              <div className='alert-text font-weight-bold'>{alertMessage}</div>
            </div>
          )}
          {/* image */}
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
                placeholder='enter capacity name'
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
