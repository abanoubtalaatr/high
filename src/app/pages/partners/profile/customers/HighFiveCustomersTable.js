import {Link} from 'react-router-dom'
import {KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'

function HighFiveCustomersTable(props) {
  const {items} = props
  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }
  return (
    <div className='table-responsive'>
      {/* begin::Table */}
      <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
        {/* begin::Table head */}
        <thead>
          <tr className='bg-light'>
            <th className='min-w-100px'>name</th>
            <th className='min-w-100px text-center'>
              booking <br /> ( coming - past - canceled )
            </th>
            <th className='min-w-100px text-center'>
              public event <br /> ( coming - past - canceled )
            </th>
            <th className='min-w-100px text-center'>booking</th>
            <th className='min-w-100px text-center'>public event</th>
          </tr>
        </thead>
        {/* end::Table head */}
        {/* begin::Table body */}
        <tbody>
          {items.map((e) => {
            return (
              <tr key={e.id}>
                <td>
                  <div className='d-flex justify-content-start flex-column'>
                    {e.name || '---'}
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      @{e.vie_id || '---'}
                    </span>
                  </div>
                </td>
                <td className='text-center'>
                  <div className='d-flex gap-3 justify-content-center'>
                    {e.upcoming_session_num || '0'} - {e.past_session_num || '0'} -{' '}
                    {e.canceled_session_num || '0'}
                  </div>
                </td>
                <td className='text-center'>
                  <div className='d-flex gap-3 justify-content-center'>
                    {e.upcoming_public_event_num || '0'} - {e.past_public_event_num || '0'} -{' '}
                    {e.cancelled_public_event_num || '0'}
                  </div>
                </td>
                <td className='text-center'>
                  <span
                    className={`badge badge-${e.blocked_from_booking === 0 ? 'danger' : 'primary'}`}
                  >
                    {e.blocked_from_booking === 1 ? 'blocked' : 'unblock'}
                  </span>
                </td>
                <td className='text-center'>
                  <span
                    className={`badge badge-${e.blocked_from_event === 0 ? 'danger' : 'primary'}`}
                  >
                    {e.blocked_from_event === 1 ? 'blocked' : 'unblock'}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
        {/* end::Table body */}
      </table>
      {/* end::Table */}
    </div>
  )
}

export default HighFiveCustomersTable
