import React, {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import {updatePartnerProfile} from '../../_requests'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import clsx from 'clsx'

function EditProfileModal(props) {
  const {show, onHide, onComplete, userDetails} = props
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [image, setImage] = useState('')
  const [imageBg, setImageBg] = useState(userDetails.photo)
  const [updateImageStatus, setUpdateImageStatus] = useState(false)

  const changeImage = (event) => {
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
  const initialData = {
    photo: userDetails.photo,
    bio: userDetails.bio,
    company_name: userDetails.company_name,
  }
  useEffect(() => {
    imageHandler()
  }, [show])
  const formik = useFormik({
    initialValues: initialData,
    enableReinitialize: true,
    onSubmit: async (values, {setStatus, resetForm, setFieldValue}) => {
      setLoading(true)
      const formData = new FormData()
      updateImageStatus && formData.append('photo', image)
      formData.append('bio', values.bio)
      formData.append('company_name', values.company_name)
      try {
        await updatePartnerProfile(formData, userDetails.id).then((res) => {
          setAlertType('success')
          resetForm()
          setStatus('')
          setLoading(false)
          onComplete(userDetails.id)
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
        <Modal.Title>edit partner profile </Modal.Title>
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
                  className='image-input-wrapper w-125px h-125px'
                  style={{
                    backgroundImage: `url('${imageBg}')`,
                  }}
                ></div>
                <label
                  className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
                  data-kt-image-input-action='change'
                  data-bs-toggle='tooltip'
                  data-bs-dismiss='click'
                  title='Change image'
                >
                  <i className='ki-duotone ki-pencil fs-6'>
                    <span className='path1'></span>
                    <span className='path2'></span>
                  </i>
                  <input
                    type='file'
                    name='photo'
                    accept='.png, .jpg, .jpeg'
                    onChange={changeImage}
                  />
                  <input type='hidden' name='image_remove' />
                </label>
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
                {...formik.getFieldProps('company_name')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.company_name && formik.errors.company_name,
                })}
                placeholder='enter company name'
              />
              {formik.touched.company_name && formik.errors.company_name && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.company_name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Bio */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>bio:</label>
            <div className='col-sm-9'>
              <textarea
                placeholder='enter bio'
                rows='5'
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.bio && formik.errors.bio,
                })}
                {...formik.getFieldProps('bio')}
              ></textarea>
              {formik.touched.bio && formik.errors.bio && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.bio}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
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
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default EditProfileModal
