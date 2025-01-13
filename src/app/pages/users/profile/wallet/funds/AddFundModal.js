import React, {useState} from 'react'
import * as Yup from 'yup'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import {addWalletFunds} from '../../../_requests'
import {useParams} from 'react-router-dom'
import clsx from 'clsx'

function AddFundModal(props) {
  const {show, onHide, onComplete} = props
  const {userId} = useParams()
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  // form validation
  const formSchema = Yup.object().shape({
    amount: Yup.string().required('this field is required'),
  })
  const initialData = {
    amount: '0',
    reason: '',
  }
  // const initialValues = initialData
  const formik = useFormik({
    initialValues: initialData,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, {setStatus, resetForm, setFieldValue}) => {
      setLoading(true)
      try {
        console.log(values)
        await addWalletFunds(values.amount, values.refund_reason, userId).then((res) => {
          setAlertType('success')
          resetForm()
          setStatus(res.data.message)
          setLoading(false)
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
        <Modal.Title>add fund to user wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {formik.status && (
            <div className={`mb-lg-15 alert alert-${alertType}`}>
              <div className='alert-text font-weight-bold'>{formik.status}</div>
            </div>
          )}
          {/* amount */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>amount:</label>
            <div className='col-sm-9'>
              <input
                type='number'
                min='1'
                autoComplete='off'
                {...formik.getFieldProps('amount')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.amount && formik.errors.amount,
                })}
                placeholder='enter amount'
              />
              {formik.touched.amount && formik.errors.amount && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.amount}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>reason:</label>
            <div className='col-sm-9'>
              <textarea
                autoComplete='off'
                {...formik.getFieldProps('refund_reason')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.refund_reason && formik.errors.refund_reason,
                })}
                placeholder='enter reason'
              ></textarea>
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
              <span className='indicator-label'>submit</span>
              <span className='indicator-progress'>
                submit ...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default AddFundModal
