import React, {useState} from 'react'
import * as Yup from 'yup'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import clsx from 'clsx'
import {resetPassword} from './_requests'

function EditpassModal(props) {
  const {show, onHide, onComplete, userId} = props
  const [alertType, setAlertType] = useState('success')
  const [loading, setLoading] = useState(false)

  const resetPassSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Minimum 8 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Password is required'),
    confirmpassword: Yup.string()
      .min(8, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Password confirmation is required')
      .oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
  })
  const initialValues = {
    password: '',
    confirmpassword: '',
  }
  const formik = useFormik({
    initialValues,
    validationSchema: resetPassSchema,
    onSubmit: async (values, {setStatus, resetForm}) => {
      setLoading(true)
      try {
        await resetPassword(values.password, values.confirmpassword, userId).then((res) => {
          resetForm()
          setAlertType('success')
          setLoading(false)
          onComplete(false)
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
        <form onSubmit={formik.handleSubmit} noValidate>
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
                placeholder='enter new password'
                autoComplete='off'
                {...formik.getFieldProps('password')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.password && formik.errors.password,
                })}
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
          {/* re-password */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>confirm new password:</label>
            <div className='col-sm-9'>
              <input
                type='password'
                placeholder='enter confirm new password'
                autoComplete='off'
                {...formik.getFieldProps('confirmpassword')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.confirmpassword && formik.errors.confirmpassword,
                })}
              />
              {formik.touched.confirmpassword && formik.errors.confirmpassword && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.confirmpassword}</span>
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

export default EditpassModal
