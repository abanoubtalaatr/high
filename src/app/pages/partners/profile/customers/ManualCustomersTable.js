import {Link} from 'react-router-dom'
import {KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'

function ManualCustomersTable(props) {
  const {items} = props

  return (
    <div className='table-responsive'>
      {/* begin::Table */}
      <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
        {/* begin::Table head */}
        <thead>
          <tr className='bg-light'>
            <th className='min-w-100px'>name</th>
            <th className='min-w-100px text-center'>phone</th>
            <th className='min-w-100px text-center'>
              booking <br /> ( coming - past - canceled )
            </th>
          </tr>
        </thead>
        {/* end::Table head */}
        {/* begin::Table body */}
        <tbody>
          {items.map((e) => {
            return (
              <tr key={e.id}>
                <td>{e.name || '---'}</td>
                <td className='text-center'>{e.phone || '---'}</td>
                <td className='text-center'>
                  <div className='d-flex gap-3 justify-content-center'>
                    {e.upcoming_session_num || '0'} - {e.past_session_num || '0'} -{' '}
                    {e.canceled_session_num || '0'}
                  </div>
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

export default ManualCustomersTable
