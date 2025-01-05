import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {createNoteComment} from '../_requests'
import {useState} from 'react'

function AddNoteComment(props) {
  const {currentUser, replyTo, entityId, noteType, onComplete} = props
  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }
  // form validation

  const formSchema = Yup.object().shape({
    comment: Yup.string().required('this field is required'),
  })
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')

  const initialValues = {
    comment: '',
    type: noteType,
    entity_id: entityId,
    reply_to: replyTo,
  }
  const alertMessageHiddenTimeOut = () => {
    setTimeout(() => {
      setAlertMessage('')
    }, 3000)
  }
  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: async (values, {setStatus, resetForm}) => {
      setLoading(true)
      try {
        await createNoteComment(values).then((res) => {
          setAlertType('success')
          setAlertMessage(res.data.message)
          resetForm()
          setLoading(false)
          onComplete(true)
          alertMessageHiddenTimeOut()
        })
      } catch (error) {
        setAlertType('danger')
        setStatus(error.message)
        setAlertMessage(error.message)
        setLoading(false)
      }
    },
  })

  return (
    <>
      <div className='d-flex mt-5  w-100'>
        <div className='symbol symbol-45px me-5'>
          <img
            className='me-3'
            src={currentUser?.data.image || toAbsoluteUrl('/media/avatars/blank.png')}
            alt={currentUser?.data.name}
            onError={imageErrorHandler}
          />
        </div>
        <span className='text-muted fw-semibold d-block fs-7 w-100'>
          <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
            <div className='input-group'>
              <textarea
                {...formik.getFieldProps('comment')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.comment && formik.errors.comment,
                })}
                rows='1'
              ></textarea>
              <button
                type='submit'
                className='btn btn-light-primary'
                data-kt-indicator={loading && 'on'}
              >
                <span className='indicator-label'>
                  <KTIcon iconName='send' className='fs-6 me-1' />
                  send
                </span>
                <span className='indicator-progress'>
                  sending ...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              </button>
            </div>
            <div>
              {formik.touched.comment && formik.errors.comment && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.comment}</span>
                  </div>
                </div>
              )}
              {alertMessage != '' && (
                <div className={`my-3 alert alert-${alertType}`}>
                  <div className='alert-text font-weight-bold'>{alertMessage}</div>
                </div>
              )}
            </div>
          </form>
        </span>
      </div>
    </>
  )
}
export default AddNoteComment
