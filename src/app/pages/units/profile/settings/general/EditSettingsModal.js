import {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {Button, Modal} from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import {updateUnitSettings} from '../../../_requests'

function EditSettingsModal(props) {
  const {unitId} = useParams()
  const {show, onHide, settingsDetails, onComplete} = props
  const numberRegExp = /^[0-9]+$/
  // form validation
  const formSchema = Yup.object().shape({
    min_session_length_in_minutes: Yup.string()
      .required('this field is required')
      .matches(numberRegExp, 'number is not valid'),
    max_session_length_in_minutes: Yup.string()
      .required('this field is required')
      .matches(numberRegExp, 'number is not valid'),
  })
  const [alertText, setAlertText] = useState('')
  const [loading, setLoading] = useState(false)
  const [allowHighfiveUserBookingChecked, setAllowHighfiveUserBookingChecked] = useState(false)
  const [allowHighfiveUserPublicEventsChecked, setAllowHighfiveUserPublicEventsChecked] =
    useState(false)
  const [allowMixGenderPublicEventChecked, setAllowMixGenderPublicEventChecked] = useState(false)
  const initialValues = {
    allow_highfive_user_booking: allowHighfiveUserBookingChecked,
    allow_highfive_user_public_events: allowHighfiveUserPublicEventsChecked,
    allow_mix_gender_public_event: allowMixGenderPublicEventChecked,
    min_session_length_in_minutes: settingsDetails.min_session_length_in_minutes || 0,
    max_session_length_in_minutes: settingsDetails.max_session_length_in_minutes || 0,
  }
  useEffect(() => {
    setAlertText('')
    setAllowHighfiveUserBookingChecked(
      settingsDetails.allow_highfive_user_booking != 1 ? false : true
    )
    setAllowHighfiveUserPublicEventsChecked(
      settingsDetails.allow_highfive_user_public_events != 1 ? false : true
    )
    setAllowMixGenderPublicEventChecked(
      settingsDetails.allow_mix_gender_public_event != 1 ? false : true
    )
  }, [show, settingsDetails])
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, {setStatus, resetForm}) => {
      setLoading(true)
      try {
        await updateUnitSettings(values, unitId).then((res) => {
          resetForm()
          setLoading(false)
          onComplete(true)
          setAlertText('')
        })
      } catch (error) {
        setStatus(error.response.data.message)
        setAlertText(error.response.data.message)
        setLoading(false)
      }
    },
  })
  const allowHighfiveUserPublicEventsChange = (e) => {
    formik.setFieldValue('allow_highfive_user_public_events', e.target.checked)
    setAllowHighfiveUserPublicEventsChecked(!allowHighfiveUserPublicEventsChecked)
  }
  const allowMixGenderPublicEventChange = (e) => {
    formik.setFieldValue('allow_mix_gender_public_event', e.target.checked)
    setAllowMixGenderPublicEventChecked(!allowMixGenderPublicEventChecked)
  }
  const allowHighfiveUserBookingChange = (e) => {
    formik.setFieldValue('allow_highfive_user_booking', e.target.checked)
    setAllowHighfiveUserBookingChecked(!allowHighfiveUserBookingChecked)
  }
  return (
    <Modal show={show} onHide={onHide} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>update settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} autoComplete=''>
          {alertText && (
            <div className={`mb-lg-15 alert alert-danger`}>
              <div className='alert-text font-weight-bold'>{alertText}</div>
            </div>
          )}
          {/* highfive users bookings */}
          <div className='row mb-5'>
            <label className='col-sm-6 form-label fw-bold'>highfive users bookings:</label>
            <div className='col-sm-6'>
              <div className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={allowHighfiveUserBookingChecked}
                  onChange={allowHighfiveUserBookingChange}
                />
                <label className='form-check-label' htmlFor='flexCheckboxLg'></label>
              </div>
              {formik.touched.allow_highfive_user_booking &&
                formik.errors.allow_highfive_user_booking && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.allow_highfive_user_booking}</span>
                    </div>
                  </div>
                )}
            </div>
          </div>
          {/* highfive users public events */}
          <div className='row mb-5'>
            <label className='col-sm-6 form-label fw-bold'>highfive users public events:</label>
            <div className='col-sm-6'>
              <div className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={allowHighfiveUserPublicEventsChecked}
                  onChange={allowHighfiveUserPublicEventsChange}
                />
                <label className='form-check-label' htmlFor='flexCheckboxLg'></label>
              </div>
              {formik.touched.allow_highfive_user_public_events &&
                formik.errors.allow_highfive_user_public_events && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.allow_highfive_user_public_events}</span>
                    </div>
                  </div>
                )}
            </div>
          </div>
          {/* Membership Management */}
          <div className='row mb-5'>
            <label className='col-sm-6 form-label fw-bold'>mixed gender public event:</label>
            <div className='col-sm-6'>
              <div className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={allowMixGenderPublicEventChecked}
                  onChange={allowMixGenderPublicEventChange}
                />
                <label className='form-check-label' htmlFor='flexCheckboxLg'></label>
              </div>
              {formik.touched.allow_mix_gender_public_event &&
                formik.errors.allow_mix_gender_public_event && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.allow_mix_gender_public_event}</span>
                    </div>
                  </div>
                )}
            </div>
          </div>
          {/* min/max session length */}
          <div className='row mb-5'>
            <label className='col-sm-6 form-label fw-bold'>min/max session length:</label>
            <div className='col-sm-6'>
              <div className='row'>
                <div className='col-sm-6'>
                  <input
                    type='number'
                    min='1'
                    autoComplete='off'
                    {...formik.getFieldProps('min_session_length_in_minutes')}
                    className={clsx('form-control form-control-solid', {
                      'is-invalid':
                        formik.touched.min_session_length_in_minutes &&
                        formik.errors.min_session_length_in_minutes,
                    })}
                    placeholder='min'
                  />
                  {formik.touched.min_session_length_in_minutes &&
                    formik.errors.min_session_length_in_minutes && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.min_session_length_in_minutes}</span>
                        </div>
                      </div>
                    )}
                </div>
                <div className='col-sm-6'>
                  <input
                    type='number'
                    min='1'
                    autoComplete='off'
                    {...formik.getFieldProps('max_session_length_in_minutes')}
                    className={clsx('form-control form-control-solid', {
                      'is-invalid':
                        formik.touched.max_session_length_in_minutes &&
                        formik.errors.max_session_length_in_minutes,
                    })}
                    placeholder='max'
                  />
                  {formik.touched.max_session_length_in_minutes &&
                    formik.errors.max_session_length_in_minutes && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.max_session_length_in_minutes}</span>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* form button */}
          <div className='d-flex justify-content-between'>
            <Button variant='btn btn-light mt-5 mb-5' onClick={onHide}>
              cancel
            </Button>
            <Button
              type='submit'
              className='btn btn-primary mt-5 mb-5'
              data-kt-indicator={loading && 'on'}
            >
              <span className='indicator-label'>update</span>
              <span className='indicator-progress'>
                update ...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            </Button>
          </div>
          {/* end form button */}
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default EditSettingsModal
