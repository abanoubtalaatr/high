import {KTIcon} from '../../../../../../_metronic/helpers'

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
            <td className='w-lg-300px'>highfive users bookings</td>
            <td className='text-gray-700 fw-bolder'>
              {settingsDetails.allow_highfive_user_booking != 1 ? 'off' : 'on'}
            </td>
            <td className='text-gray-500'>
              <span className='d-flex align-items-center'>
                <KTIcon iconName='information' className='fs-3 me-2' />
                <span>allow to receive online bookings via highfive app in approved units</span>
              </span>
            </td>
          </tr>
          <tr>
            <td className='w-lg-300px'>highfive users public events</td>
            <td className='text-gray-700 fw-bolder'>
              {
              settingsDetails.allow_highfive_user_public_events != 1
                ? 'off'
                : 'on'}
            </td>
            <td className='text-gray-500'>
              <span className='d-flex align-items-center'>
                <KTIcon iconName='information' className='fs-3 me-2' />
                <span>
                  allow to create online public events for highfive app users in approved units
                </span>
              </span>
            </td>
          </tr>
          <tr>
            <td className='w-lg-300px'>mixed gender public event</td>
            <td className='text-gray-700 fw-bolder'>
              {
              settingsDetails.allow_mix_gender_public_event  != 1
                ? 'off'
                : 'on'}
            </td>
            <td className='text-gray-500'>
              <span className='d-flex align-items-center'>
                <KTIcon iconName='information' className='fs-3 me-2' />
                <span>allow to create mixed gender public event</span>
              </span>
            </td>
          </tr>
          <tr>
            <td className='w-lg-300px'>min/max session length </td>
            <td className='text-gray-700 fw-bolder'>
              {settingsDetails.min_session_length_in_minutes || 0}M /{' '}
              {settingsDetails.max_session_length_in_minutes || 0}M{' '}
            </td>
            <td className='text-gray-500'>
              <span className='d-flex align-items-center'>
                <KTIcon iconName='information' className='fs-3 me-2' />
                <span>Set The minimum and Maximum duration of session in this unit </span>
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
