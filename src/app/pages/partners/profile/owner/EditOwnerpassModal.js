import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import {useFormik} from 'formik'
import {updatePassword} from '../../_requests'
import * as Yup from 'yup'
import { Modal } from 'react-bootstrap'
import clsx from 'clsx'

function EditOwnerpassModal(props) {
  const {userId} = useParams()
  const {show, onHide, onComplete} = props
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Minimum 8 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Password is required'),
    password_confirmation: Yup.string()
      .min(8, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Password confirmation is required')
      .oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
  })

  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [initialValues, setinitialValues] = useState({
    password: '',
    password_confirmation: '',
  })
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, {setStatus, resetForm}) => {
      setLoading(true)
      const formData = new FormData()
      formData.append('password', values.password)
      formData.append('password_confirmation', values.password_confirmation)
      try {
        await updatePassword(formData, userId).then((res) => {
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
        <Modal.Title>reset password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          {formik.status && (
            <div className={`mb-lg-15 alert alert-${alertType}`}>
              <div className='alert-text font-weight-bold'>{formik.status}</div>
            </div>
          )}
          {/* password */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>new password:</label>
            <div className='col-sm-9'>
              <input
                type='password'
                autoComplete='off'
                {...formik.getFieldProps('password')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.password && formik.errors.password,
                })}
                placeholder='enter password'
              />
              {formik.touched.password && formik.errors.password && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.password}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* name */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>confirm password:</label>
            <div className='col-sm-9'>
              <input
                type='password'
                autoComplete='off'
                {...formik.getFieldProps('password_confirmation')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid':
                    formik.touched.password_confirmation && formik.errors.password_confirmation,
                })}
                placeholder='enter confirm password'
              />
              {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.password_confirmation}</span>
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

export default EditOwnerpassModal
