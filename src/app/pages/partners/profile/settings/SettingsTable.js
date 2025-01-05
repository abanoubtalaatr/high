import {KTIcon} from '../../../../../_metronic/helpers'

function SettingsTable(props) {
  const {settingsDetails} = props
  return (
    <div className='table-responsive'>
      {/* begin::Table */}
      <table className='table table-row-dashed gs-0 gy-4'>
        {/* begin::Table head */}
        <thead></thead>
        {/* end::Table head */}
        {/* begin::Table body */}
        <tbody>
          <tr>
            <td className='w-lg-500px'>Online booking Payment</td>
            <td className='text-gray-700 fw-bolder'>
              {settingsDetails.allow_booking_online_payment != 0 ? 'on' : 'off'}
            </td>
            <td className='text-gray-500'>
              <span className='d-flex align-items-center'>
                <KTIcon iconName='information' className='fs-3 me-2' />
                <span>Allow To Select Online Payment Option For Bookings </span>
              </span>
            </td>
          </tr>
          <tr>
            <td className='w-lg-500px'>Online public event Payment</td>
            <td className='text-gray-700 fw-bolder'>
              {settingsDetails.allow_public_event_online_payment != 0 ? 'on' : 'off'}
            </td>
            <td className='text-gray-500'>
              <span className='d-flex align-items-center'>
                <KTIcon iconName='information' className='fs-3 me-2' />
                <span>Allow To Select Online Payment Option For Public Events </span>
              </span>
            </td>
          </tr>
          <tr>
            <td className='w-lg-500px'>tax</td>
            <td className='text-gray-700 fw-bolder'>
              {settingsDetails.allow_tax != 0 ? 'on' : 'off'}
            </td>
            <td className='text-gray-500'>
              <span className='d-flex align-items-center'>
                <KTIcon iconName='information' className='fs-3 me-2' />
                <span>Allow tax </span>
              </span>
            </td>
          </tr>
          <tr>
            <td className='w-lg-500px'>Max Number Of Units</td>
            <td className='text-gray-700 fw-bolder'>{settingsDetails.max_units_count || '0'}</td>
            <td className='text-gray-500'>
              <span className='d-flex align-items-center'>
                <KTIcon iconName='information' className='fs-3 me-2' />
                <span>Set The Maximum Number Of Units To Be Created For This Company </span>
              </span>
            </td>
          </tr>
          <tr>
            <td className='w-lg-500px'>Units In Other Location</td>
            <td className='text-gray-700 fw-bolder'>
              {settingsDetails.allow_units_in_other_location != 0 ? 'on' : 'off'}
            </td>
            <td className='text-gray-500'>
              <span className='d-flex align-items-center'>
                <KTIcon iconName='information' className='fs-3 me-2' />
                <span>Allow To Create Untis In Other States/Cities </span>
              </span>
            </td>
          </tr>
          <tr>
            <td className='w-lg-500px'>Membership Management</td>
            <td className='text-gray-700 fw-bolder'>
              {settingsDetails.allow_membership_management != 0 ? 'on' : 'off'}
            </td>
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
  )
}

export default SettingsTable
