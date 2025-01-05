import {useState} from 'react'
import Select from 'react-select'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import {updateWalletFunds} from '../../../_requests'
import {useParams} from 'react-router-dom'
import clsx from 'clsx'

function EditFundModal(props) {
  const {show, onHide, itemId, refundReason, onComplete} = props
  const {userId} = useParams()
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [statusOptions, setStatusOptions] = useState([
    {value: 'completed', label: 'completed'},
    {value: 'rejected', label: 'rejected'},
  ])
  const initialData = {
    status: statusOptions[0].value,
    action_reason: refundReason,
  }
  // const initialValues = initialData
  const formik = useFormik({
    initialValues: initialData,
    enableReinitialize: true,
    onSubmit: async (values, {setStatus, resetForm, setFieldValue}) => {
      setLoading(true)
      try {
        await updateWalletFunds(values.status, values.action_reason, userId, itemId).then((res) => {
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
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>status:</label>
            <div className='col-sm-9'>
              <Select
                defaultValue={statusOptions[0]}
                options={statusOptions}
                onChange={(selectedOption) => {
                  formik.setFieldValue('status', selectedOption.value)
                }}
                name='status'
              />
            </div>
          </div>
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>reason:</label>
            <div className='col-sm-9'>
              <textarea
                autoComplete='off'
                {...formik.getFieldProps('action_reason')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.action_reason && formik.errors.action_reason,
                })}
                placeholder='enter action reason'
              ></textarea>
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

export default EditFundModal
