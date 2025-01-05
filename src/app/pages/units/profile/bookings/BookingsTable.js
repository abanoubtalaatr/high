import {KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'

function BookingsTable(props) {
  const {items} = props
  return (
    <div className='table-responsive'>
      {/* begin::Table */}
      <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
        {/* begin::Table head */}
        <thead>
          <tr className='bg-light'>
            <th className='min-w-100px fs-6'>#</th>
            <th className='min-w-100px text-center fs-6'>date & time</th>
            <th className='min-w-100px text-center fs-6'>activity</th>
            <th className='min-w-100px text-center fs-6'>user</th>
            <th className='min-w-100px text-center fs-6'>session gender</th>
            <th className='min-w-100px text-center fs-6'>booking type</th>
            <th className='min-w-100px text-center fs-6'>price per user</th>
            <th className='min-w-100px text-center fs-6'>status</th>
            <th className='min-w-100px text-center fs-6'>Actions</th>
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
                    <span>#{e.id}</span>
                    <span className='fs-6'>{e.created_at || '---'}</span>
                  </div>
                </td>
                <td className='text-center fs-6'>
                  <div className='d-flex justify-content-start flex-column'>
                    <span className='fs-6'>
                      {e.start_time || '---'}
                    </span>
                    <span className='fs-6'>{e.end_time || '---'}</span>
                  </div>
                </td>
                <td className='text-center fs-6'>
                  <div className='d-flex justify-content-start flex-column'>
                    <span>{e.activity_category_name || '---'}</span>
                    <span>{e.activity_name || '---'}</span>
                  </div>
                </td>
                <td className='text-center fs-6'>{e.user_name || '---'} </td>
                <td className='text-center fs-6'>{e.session_gender || '---'}</td>
                <td className='text-center fs-6'>{e.booking_type || '---'}</td>
                <td className='text-center fs-6'>
                  <div className='d-flex justify-content-start flex-column'>
                    <span>
                      {e.paid_price || '0'} <span className='fs-8'>SAR</span>
                    </span>
                    <span>{e.payment_method || '---'}</span>
                  </div>
                </td>
                <td className='text-center fs-6'>
                  <span
                    className={`badge badge-${
                      e.status.toLowerCase() === 'coming'
                        ? 'success'
                        : e.status.toLowerCase() === 'ended'
                        ? 'primary'
                        : 'danger'
                    }`}
                  >
                    {e.status}
                  </span>
                </td>
                <td className='text-center fs-6'>
                  <Link
                    to={`view/${e.id}`}
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                  >
                    <KTIcon iconName='eye' className='fs-3' />
                  </Link>
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

export default BookingsTable
