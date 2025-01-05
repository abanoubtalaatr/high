import React, { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import Select from 'react-select'
import { useFormik } from 'formik'
import { Modal } from 'react-bootstrap'
import { createService } from '../_requests'
import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers'

function CreateModal(props) {
  const { show, onHide, onComplete } = props
  const numberRegExp = /^[0-9]+$/

  // Form validation
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required('this field is required')
      .min(2, 'Minimum 2 symbols')
      .max(50, 'Maximum 50 symbols'),
    order: Yup.string()
      .required('this field is required')
      .matches(numberRegExp, 'Number is not valid'),
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
  const [imageBg, setImageBg] = useState(toAbsoluteUrl('/media/avatars/blank.png'))
  const [updateImageStatus, setUpdateImageStatus] = useState(false)

  const initialValues = {
    name: '',
    image: '',
    order: '',
    active: '',
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

  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: async (values, { setStatus, resetForm }) => {
      setLoading(true)
      const formData = new FormData()
      formData.append('name', values.name)
      updateImageStatus && formData.append('image', image)
      formData.append('order', values.order)
      formData.append('active', values.active)

      try {
        await createService(formData).then((res) => {
          setAlertType('success')
          setAlertMessage('Service created successfully')
          setLoading(false)
          onComplete(true)
          resetForm()  // Reset form fields
          removePhotoHandler()  // Reset image fields
          setAlertMessage('')  // Reset alert message

        })
      } catch (error) {
        setAlertType('danger')
        setAlertMessage(error.response.data.message)
        setLoading(false)
      }
    },
  })

  return (
    <Modal show={show} onHide={onHide} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          {alertMessage && (
            <div className={`mb-lg-15 alert alert-${alertType}`}>
              <div className='alert-text font-weight-bold'>{alertMessage}</div>
            </div>
          )}
          {/* Image */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>Image:</label>
            <div className='col-sm-9'>
              <div className='image-input image-input-outline' data-kt-image-input='true'>
                <div
                  className='image-input-wrapper w-125px h-125px'
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
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Name */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>Name:</label>
            <div className='col-sm-9'>
              <input
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('name')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.name && formik.errors.name,
                })}
                placeholder='Enter type name'
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
          {/* Order */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>Order:</label>
            <div className='col-sm-9'>
              <input
                type='number'
                autoComplete='off'
                {...formik.getFieldProps('order')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.order && formik.errors.order,
                })}
                placeholder='Enter type order'
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
          {/* Status */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>Status:</label>
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
          {/* Form button */}
          <div className='d-flex justify-content-between'>
            <button type='button' className='btn btn-light mt-5 mb-5' onClick={onHideHandler}>
              Cancel
            </button>
            <button
              type='submit'
              className='btn btn-primary mt-5 mb-5'
              data-kt-indicator={loading && 'on'}
            >
              <span className='indicator-label'>Create</span>
              <span className='indicator-progress'>
                Creating ...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateModal
