import {KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'

function MembersTable(props) {
  const {items} = props
  return (
    <div className='table-responsive'>
      {/* begin::Table */}
      <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
        {/* begin::Table head */}
        <thead>
          <tr className='bg-light'>
            <th className='min-w-100px'>name</th>
            <th className='min-w-100px text-center'>reference number</th>
            <th className='min-w-100px text-center'>category</th>
            <th className='min-w-100px text-center'>requested on</th>
            <th className='min-w-100px text-center'>created</th>
            <th className='min-w-100px text-center'>ending on</th>
            <th className='min-w-100px text-center'>status</th>
          </tr>
        </thead>
        {/* end::Table head */}
        {/* begin::Table body */}
        <tbody>
          {items.map((e) => {
            return (
              <tr key={e.id}>
                <td className='min-w-100px'>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                      <span>{e.name || '---'}</span>
                      <span className='fs-7'>@{e.app_user_id || '---'}</span>
                    </div>
                  </div>
                </td>
                <td className='min-w-100px text-center'>{e.reference_number || '---'}</td>
                <td className='min-w-100px text-center'>{e.category_name || '---'}</td>
                <td className='min-w-100px text-center'>{e.expired_at || '---'}</td>
                <td className='min-w-100px text-center'>{e.created_at || '---'}</td>
                <td className='min-w-100px text-center'>{e.expired_at || '---'}</td>
                <td className='min-w-100px text-center'>
                  {e.status && (
                    <span
                      className={`badge badge-${
                        e.status && e.status.toLowerCase() === 'active'
                          ? 'success'
                          : e.status.toLowerCase() === 'expired'
                          ? 'danger'
                          : 'warning'
                      }`}
                    >
                      {e.status}
                    </span>
                  )}
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

export default MembersTable
