import {KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'

function PolicyUnitsTable(props) {
  const {items} = props
  return (
    <div className='table-responsive'>
      {/* begin::Table */}
      <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
        {/* begin::Table head */}
        <thead>
          <tr className='bg-light'>
            <th className='min-w-100px'>name</th>
            <th className='min-w-100px text-center'>category</th>
            <th className='min-w-100px text-center'>activity</th>
            <th className='min-w-100px text-center'>type</th>
            <th className='min-w-100px text-center'>capacity</th>
            <th className='min-w-100px text-center'>booking methodology</th>
            <th className='min-w-100px text-center'>availability</th>
            <th className='min-w-100px text-center'>status</th>
            <th className='min-w-100px text-center'>Actions</th>
          </tr>
        </thead>
        {/* end::Table head */}
        {/* begin::Table body */}
        <tbody>
          {items.map((e) => {
            return (
              <tr key={e.id}>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                      <span>{e.name || '---'}</span>
                      <span className='fs-7'>{e.created_at || '---'}</span>
                    </div>
                  </div>
                </td>
                <td className='text-center'>
                  {e.activity_category ? e.activity_category.name : '---'}
                </td>
                <td className='text-center'>{e.activity ? e.activity.name : '---'}</td>
                <td className='text-center'>{e.type ? e.type.name : '---'}</td>
                <td className='text-center'>{e.capacity || '---'}</td>
                <td className='text-center'>{e.booking_methodology || '---'}</td>
                <td className='text-center'>
                  <span
                    className={`text-${
                      e.availability.toLowerCase() === 'available' ? 'primary' : 'danger'
                    }`}
                  >
                    {e.availability || '---'}
                  </span>
                </td>
                <td className='text-center'>
                  <span
                    className={`badge badge-${
                      e.status && e.status.lable.toLowerCase() === 'pending'
                        ? 'warning'
                        : e.status.lable.toLowerCase() === 'approved'
                        ? 'primary'
                        : 'danger'
                    }`}
                  >
                    {e.status && e.status.lable}
                  </span>
                </td>
                <td className='text-center'>
                  <Link
                    to='#'
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

export default PolicyUnitsTable
