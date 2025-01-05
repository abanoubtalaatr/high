import React, {useState} from 'react'
import {useRef} from 'react'
import {KTIcon, KTSVG} from '../../../../../_metronic/helpers'
import Select from 'react-select'
import AlertDismissible from '../../../../../_metronic/helpers/components/AlertDismissible'

function EditSettingsModal() {
  const TimeOptions = [
    {value: 'H', label: 'H'},
    {value: 'M', label: 'M'},
  ]
  const [TimeChoice, setTimeChoice] = useState('')
  const [updateStatus, setupdateStatus] = useState(false)

  const updateBtn = useRef(null)
  const onClick = () => {
    // Disable indicator after 3 seconds
    updateBtn.current?.setAttribute('data-kt-indicator', 'on')
    setTimeout(() => {
      // Activate indicator
      updateBtn.current?.removeAttribute('data-kt-indicator')
      setupdateStatus(true)
    }, 3000)
    setupdateStatus(false)
  }
  return (
    <div
      className='modal fade'
      tabIndex={-1}
      id='edit_settings_modal'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
    >
      <div className='modal-dialog modal-dialog-centered modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>edit partner settings</h5>
            <div
              className='btn btn-icon btn-sm btn-active-light-primary ms-2'
              data-bs-dismiss='modal'
              aria-label='Close'
            >
              <KTSVG
                path='/media/icons/duotune/arrows/arr061.svg'
                className='svg-icon svg-icon-2x'
              />
            </div>
          </div>
          <div className='modal-body'>
            {/* alert */}
            {updateStatus && (
              <AlertDismissible heading='Modified successfully' state='success' icon='check' />
            )}
            {/* end alert */}
            <form>
              {/* form-switch */}
              <div className='row mb-5'>
                <label className='col-sm-6 form-label fw-bold'>Online Payment:</label>
                <div className='col-sm-6'>
                  <div className='form-check form-switch'>
                    <input className='form-check-input' type='checkbox' value='' /> off
                  </div>
                </div>
              </div>
              {/* form-switch */}
              <div className='row mb-5'>
                <label className='col-sm-6 form-label fw-bold'>Max Number Of Units:</label>
                <div className='col-sm-6'>
                  <input
                    type='number'
                    className='form-control form-control-solid'
                    placeholder='30'
                  />
                </div>
              </div>
              {/* form-switch */}
              <div className='row mb-5'>
                <label className='col-sm-6 form-label fw-bold'>Units In Other Location:</label>
                <div className='col-sm-6'>
                  <div className='form-check form-switch'>
                    <input className='form-check-input' type='checkbox' value='' />
                    off
                  </div>
                </div>
              </div>
              {/* form-switch */}
              <div className='row mb-5'>
                <label className='col-sm-6 form-label fw-bold'>Membership Management:</label>
                <div className='col-sm-6'>
                  <div className='form-check form-switch'>
                    <input className='form-check-input' type='checkbox' value='' />
                    off
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
              cancel
            </button>
            <button ref={updateBtn} onClick={onClick} type='button' className='btn btn-primary'>
              <span className='indicator-label'>update</span>
              <span className='indicator-progress'>
                update ...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditSettingsModal
