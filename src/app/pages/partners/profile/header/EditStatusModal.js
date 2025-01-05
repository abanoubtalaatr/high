import React, {useState} from 'react'
import Select from 'react-select'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import {updatePartnerStatus} from '../../_requests'

function EditStatusModal(props) {
  const {show, onHide, userStatus, userId, onComplete} = props

  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [statusOptions, setStatusOptions] = useState([
    {value: '1', label: 'active'},
    {value: '0', label: 'inactive'},
  ])
  const statusDefaultValue = () => {
    const value = statusOptions.filter((option) => option.value == userStatus)
    const defaultValue = value.length === 0 ? statusOptions[0] : value
    return defaultValue
  }
  const initialData = {
    active: userStatus,
  }
  // const initialValues = initialData
  const formik = useFormik({
    initialValues: initialData,
    enableReinitialize: true,
    onSubmit: async (values, {setStatus, resetForm, setFieldValue}) => {
      setLoading(true)
      try {
        await updatePartnerStatus(values.active, userId).then((res) => {
          setAlertType('success')
          resetForm()
          setStatus(res.data.message)
          setLoading(false)
          onComplete(values.active)
        })
      } catch (error) {
        setAlertType('danger')
        setStatus(error.response.data.message)
        setLoading(false)
      }
    },
  })
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>update status</Modal.Title>
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
                defaultValue={statusDefaultValue}
                options={statusOptions}
                onChange={(selectedOption) => {
                  formik.setFieldValue('active', selectedOption.value)
                }}
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

export default EditStatusModal
