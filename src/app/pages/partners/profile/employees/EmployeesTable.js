import {KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Link, useParams} from 'react-router-dom'

function EmployeesTable(props) {
  const {userId} = useParams()
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
            <th className='min-w-100px text-center'>Phone</th>
            <th className='min-w-100px text-center'>Email</th>
            <th className='min-w-100px text-center'>assignment</th>
            <th className='min-w-100px text-center'>status</th>
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
                    <div className='symbol symbol-45px me-5'>
                      <img
                        src={e.image || toAbsoluteUrl('/media/avatars/blank.png')}
                        alt={e.name}
                        onError={imageErrorHandler}
                      />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <span className='text-dark fw-bold fs-6'>{e.name}</span>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        {e.created_at}
                      </span>
                    </div>
                  </div>
                </td>
                <td className='text-center'>{e.phone || '---'}</td>
                <td className='text-center'>{e.email || '---'}</td>
                <td className='text-center'>
                  <Link
                    className='text-dark fw-bold text-hover-primary'
                    to={`/partners/profile/${userId}/employees/${e.id}/employee-units`}
                    state={{employeeName: e.name}}
                  >
                    {e.units_assigned_count || '0'} units
                  </Link>
                </td>
                <td className='text-center'>
                  <span className={`badge badge-light-${e.active === 1 ? 'primary' : 'danger'}`}>
                    {e.active === 1 ? 'active' : 'inactive'}
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

export default EmployeesTable
