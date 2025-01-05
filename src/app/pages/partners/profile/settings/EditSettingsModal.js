import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { Button, Modal } from 'react-bootstrap'
import { updatePartnerSettings } from '../../_requests'
import { useParams } from 'react-router-dom'

function EditSettingsModal(props) {
  const { userId } = useParams()
  const { show, onHide, settingsDetails, onComplete } = props
  const numberRegExp = /^[0-9]+$/
  // form validation
  const formSchema = Yup.object().shape({
    max_units_count: Yup.string()
      .required('this field is required')
      .min(1, 'Minimum 3 symbols')
      .max(10, 'Maximum 50 symbols')
      .matches(numberRegExp, 'number is not valid'),
  })
  const [alertText, setAlertText] = useState('')
  const [loading, setLoading] = useState(0)
  const [smemberShipManagementChecked, setMemberShipManagementChecked] = useState(0)
  const [onlineBookingPaymentChecked, setOnlineBookingPaymentChecked] = useState(0)
  const [onlinePublicEventPaymentChecked, setOnlinePublicEventPaymentChecked] = useState(0)
  const [taxChecked, setTaxChecked] = useState(0)
  const [unitsOtherLocationChecked, setUnitsOtherLocationChecked] = useState(0)
  const initialValues = {
    allow_booking_online_payment: settingsDetails.allow_booking_online_payment || 0,
    allow_public_event_online_payment: settingsDetails.allow_public_event_online_payment || 0,
    allow_tax: settingsDetails.allow_tax || 0,
    allow_membership_management: settingsDetails.allow_membership_management || 0,
    allow_units_in_other_location: settingsDetails.allow_units_in_other_location || 0,
    max_units_count: settingsDetails.max_units_count || 0,
  }
  useEffect(() => {
    setAlertText('')
    setMemberShipManagementChecked(settingsDetails.allow_membership_management != 1 ? 0 : 1)
    setOnlineBookingPaymentChecked(settingsDetails.allow_booking_online_payment != 1 ? 0 : 1)
    setOnlinePublicEventPaymentChecked(settingsDetails.allow_public_event_online_payment != 1 ? 0 : 1)
    setTaxChecked(settingsDetails.allow_tax != 1 ? 0 : 1)
    setUnitsOtherLocationChecked(settingsDetails.allow_units_in_other_location != 1 ? 0 : 1)
  }, [show, settingsDetails])

  const formik = useFormik({
    initialValues,
    enableReinitialize: 1,
    validationSchema: formSchema,
    onSubmit: async (values, { setStatus, resetForm }) => {
      setLoading(1)
      try {
        await updatePartnerSettings(values, userId).then((res) => {
          resetForm()
          setLoading(0)
          onComplete(1)
          setAlertText('')
        })
      } catch (error) {
        setStatus(error.response.data.message)
        setAlertText(error.response.data.message)
        setLoading(0)
      }
    },
  })
  const onlineBookingPaymentChange = (e) => {
    formik.setFieldValue('allow_booking_online_payment', e.target.checked)
    setOnlineBookingPaymentChecked(!onlineBookingPaymentChecked)
  }
  const onlinePublicEventPaymentChange = (e) => {
    formik.setFieldValue('allow_public_event_online_payment', e.target.checked)
    setOnlinePublicEventPaymentChecked(!onlinePublicEventPaymentChecked)
  }
  const taxChangeHandler = (e) => {
    formik.setFieldValue('allow_tax', e.target.checked)
    setTaxChecked(!taxChecked)
  }
  const unitsOtherLocationChange = (e) => {
    formik.setFieldValue('allow_units_in_other_location', e.target.checked)
    setUnitsOtherLocationChecked(!unitsOtherLocationChecked)
  }
  const memberShipManagementChange = (e) => {
    formik.setFieldValue('allow_membership_management', e.target.checked)
    setMemberShipManagementChecked(!smemberShipManagementChecked)
  }
  return (
    <Modal show={show} onHide={onHide} backdrop='static' keyboard={0}>
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
          {/* allow_booking_online_payment */}
          <div className='row mb-5'>
            <label className='col-sm-6 form-label fw-bold'>online booking payment:</label>
            <div className='col-sm-6'>
              <div className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={onlineBookingPaymentChecked}
                  onChange={onlineBookingPaymentChange}
                />
                <label className='form-check-label' htmlFor=''></label>
              </div>
              {formik.touched.allow_booking_online_payment && formik.errors.allow_booking_online_payment && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.allow_booking_online_payment}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* online public event payment */}
          <div className='row mb-5'>
            <label className='col-sm-6 form-label fw-bold'>online public event payment:</label>
            <div className='col-sm-6'>
              <div className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={onlinePublicEventPaymentChecked}
                  onChange={onlinePublicEventPaymentChange}
                />
                <label className='form-check-label' htmlFor=''></label>
              </div>
              {formik.touched.allow_public_event_online_payment && formik.errors.allow_public_event_online_payment && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.allow_public_event_online_payment}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* tax */}
          <div className='row mb-5'>
            <label className='col-sm-6 form-label fw-bold'>tax:</label>
            <div className='col-sm-6'>
              <div className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={taxChecked}
                  onChange={taxChangeHandler}
                />
                <label className='form-check-label' htmlFor=''></label>
              </div>
              {formik.touched.allow_public_event_online_payment && formik.errors.allow_public_event_online_payment && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.allow_public_event_online_payment}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* max_units_count */}
          <div className='row mb-5'>
            <label className='col-sm-6 form-label fw-bold'>Max Number Of Units:</label>
            <div className='col-sm-6'>
              <input
                type='number'
                min='1'
                autoComplete='off'
                placeholder='1'
                {...formik.getFieldProps('max_units_count')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.max_units_count && formik.errors.max_units_count,
                })}
              />
              {formik.touched.max_units_count && formik.errors.max_units_count && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.max_units_count}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* allow_units_in_other_location */}
          <div className='row mb-5'>
            <label className='col-sm-6 form-label fw-bold'>Units In Other Location:</label>
            <div className='col-sm-6'>
              <div className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={unitsOtherLocationChecked}
                  onChange={unitsOtherLocationChange}
                />
                <label className='form-check-label' htmlFor=''></label>
              </div>
              {formik.touched.allow_units_in_other_location &&
                formik.errors.allow_units_in_other_location && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.allow_units_in_other_location}</span>
                    </div>
                  </div>
                )}
            </div>
          </div>
          {/* Membership Management */}
          <div className='row mb-5'>
            <label className='col-sm-6 form-label fw-bold'>Membership Management:</label>
            <div className='col-sm-6'>
              <div className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={smemberShipManagementChecked}
                  onChange={memberShipManagementChange}
                />
                <label className='form-check-label' htmlFor=''></label>
              </div>
              {formik.touched.allow_membership_management &&
                formik.errors.allow_membership_management && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.allow_membership_management}</span>
                    </div>
                  </div>
                )}
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
