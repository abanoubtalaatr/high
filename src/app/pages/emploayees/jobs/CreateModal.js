import React, {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {Modal} from 'react-bootstrap'
import {createjob} from '../_requests'
import Select from 'react-select'

function CreateModal(props) {
  const {show, onHide, onComplete} = props
  const statusOptions = [
    {value: '1', label: 'active'},
    {value: '0', label: 'inactive'},
  ]
  // form validation
  const formSchema = Yup.object().shape({
    job_name: Yup.string()
      .required('this field is required')
      .min(2, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    job_desc: Yup.string().min(3, 'Minimum 3 symbols').max(150, 'Maximum 50 symbols'),
  })
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')

  const initialValues = {
    job_name: '',
    job_desc: '',
    active: statusOptions[0].value,
  }
  const onHideHandler = () => {
    formik.resetForm()
    onHide(false)
  }
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, {setStatus, resetForm}) => {
      setLoading(true)
      try {
        await createjob(values.job_name, values.job_desc, values.active).then((res) => {
          setAlertType('success')
          resetForm()
          setStatus('')
          setAlertMessage('')
          setLoading(false)
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
        <Modal.Title>create new job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          {alertMessage && (
            <div className={`mb-lg-15 alert alert-${alertType}`}>
              <div className='alert-text font-weight-bold'>{alertMessage}</div>
            </div>
          )}
          {/* name */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>
              name: <span className='text-danger'>*</span>
            </label>
            <div className='col-sm-9'>
              <input
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('job_name')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.job_name && formik.errors.job_name,
                })}
                placeholder='enter job name'
              />
              {formik.touched.job_name && formik.errors.job_name && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.job_name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* job Desc */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>description:</label>
            <div className='col-sm-9'>
              <textarea
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('job_desc')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.job_desc && formik.errors.job_desc,
                })}
                placeholder='enter job description'
              ></textarea>
              {formik.touched.job_desc && formik.errors.job_desc && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.job_desc}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* status */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>
              status: <span className='text-danger'>*</span>
            </label>
            <div className='col-sm-9'>
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                isSearchable={false}
                defaultValue={statusOptions[0]}
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
      </Modal.Body>
    </Modal>
  )
}

export default CreateModal
