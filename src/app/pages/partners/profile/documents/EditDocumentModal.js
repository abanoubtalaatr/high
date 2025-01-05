import React, {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {Modal} from 'react-bootstrap'
import {updateDocument} from '../../_requests'
import {useParams} from 'react-router-dom'

function EditDocumentModal(props) {
  const {show, onHide, onComplete, itemDetails} = props
  const {userId} = useParams()
  // form validation
  const formSchema = Yup.object().shape({
    file_name: Yup.string().min(2, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols'),
    file: Yup.string(),
  })
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [file, setFile] = useState('')

  const changeImage = (event) => {
    const file = event.target.files[0]
    setFile(file)
  }
  const initialValues = {
    file_name: itemDetails.file_name,
    file: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: async (values, {setStatus, resetForm}) => {
      setLoading(true)
      const formData = new FormData()
      formData.append('_method', 'put')
      formData.append('file_name', values.file_name)
      formData.append('file', file)
      try {
        await updateDocument(formData, userId, itemDetails.id).then((res) => {
          setAlertType('success')
          setFile('')
          resetForm()
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
        <Modal.Title>edit document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          {formik.status && (
            <div className={`mb-lg-15 alert alert-${alertType}`}>
              <div className='alert-text font-weight-bold'>{formik.status}</div>
            </div>
          )}
          {/* name */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>file name:</label>
            <div className='col-sm-9'>
              <input
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('file_name')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.file_name && formik.errors.file_name,
                })}
                placeholder='enter file name'
              />
              {formik.touched.file_name && formik.errors.file_name && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.file_name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* file */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>attachment:</label>
            <div className='col-sm-9'>
              <div className='input-group'>
                <input
                  type='file'
                  name='file'
                  id='file'
                  accept='.png, .jpg, .jpeg, .pdf'
                  onChange={changeImage}
                  className='form-control form-control-solid'
                />
              </div>
              {formik.touched.file && formik.errors.file && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.file}</span>
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

export default EditDocumentModal
