import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../../../_metronic/helpers'
import EditSettingsModal from '../EditSettingsModal'
import SettingsNav from '../SettingsNav'
import {useLocation} from 'react-router-dom'

function GeneralSettings() {
  const intl = useIntl()
  return (
    <div className='card mb-10'>
      {/* begin::Header */}
      <div className='card-header pt-5'>
        <h5 className='card-title align-items-start flex-column'>
          <span className='fw-bolder mb-3'> {intl.formatMessage({id: 'GENERAL_SETTINGS'})}</span>
        </h5>
        <div className='card-toolbar gap-3 mb-5'>
          <button
            type='button'
            className='btn btn-light btn-sm btn-flex fw-bold'
            data-bs-toggle='modal'
            data-bs-target='#edit_settings_modal'
          >
            <KTIcon iconName='pencil' className='fs-6 text-muted me-1' />
            edit
          </button>
        </div>
        {/* modal */}
        <EditSettingsModal />
        {/* end modal */}
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        <div className='row'>
          {/* navbar */}
          <div className='col-lg-2'>
            <SettingsNav />
          </div>
          <div className='col-lg-10'>
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table table-row-dashed gs-0 gy-4'>
                {/* begin::Table head */}
                <thead></thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  <tr>
                    <td className='w-lg-500px'>Online Payment</td>
                    <td className='text-gray-700 fw-bolder'>off</td>
                    <td className='text-gray-500'>
                      <span className='d-flex align-items-center'>
                        <KTIcon iconName='information' className='fs-3 me-2' />
                        <span>
                          Allow To Select Online Payment Option For Bookings And Public Events
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className='w-lg-500px'>Max Number Of Units</td>
                    <td className='text-gray-700 fw-bolder'>22</td>
                    <td className='text-gray-500'>
                      <span className='d-flex align-items-center'>
                        <KTIcon iconName='information' className='fs-3 me-2' />
                        <span>Set The Maximum Number Of Units To Be Created For This Company </span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className='w-lg-500px'>Units In Other Location</td>
                    <td className='text-gray-700 fw-bolder'>off</td>
                    <td className='text-gray-500'>
                      <span className='d-flex align-items-center'>
                        <KTIcon iconName='information' className='fs-3 me-2' />
                        <span>Allow To Create Untis In Other States/Cities </span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className='w-lg-500px'>Membership Management</td>
                    <td className='text-gray-700 fw-bolder'>off</td>
                    <td className='text-gray-500'>
                      <span className='d-flex align-items-center'>
                        <KTIcon iconName='information' className='fs-3 me-2' />
                        <span>Allow To Create Membership Category And Manage Members </span>
                      </span>
                    </td>
                  </tr>
                </tbody>
                {/* end::Table body */}
              </table>
              {/* end::Table */}
            </div>
          </div>
        </div>
        {/* begin::Table container */}
        {/* <SettingsTable /> */}
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default GeneralSettings
