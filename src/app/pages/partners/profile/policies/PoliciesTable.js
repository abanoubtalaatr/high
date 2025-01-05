import {KTIcon} from '../../../../../_metronic/helpers'
import {Link, useParams} from 'react-router-dom'

function PoliciesTable(props) {
  const {userId} = useParams()
  const {items} = props
  return (
    <div className='table-responsive'>
      {/* begin::Table */}
      <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
        {/* begin::Table head */}
        <thead>
          <tr className='bg-light'>
            <th className='min-w-100px'>name</th>
            <th className='min-w-100px text-center'>units</th>
            <th className='min-w-100px text-center'>Actions</th>
          </tr>
        </thead>
        {/* end::Table head */}
        {/* begin::Table body */}
        <tbody>
          {items.map((e) => {
            return (
              <tr key={e.id}>
                <td>{e.name || '---'}</td>
                <td className='text-center'>
                  <Link
                    className='text-dark fw-bold text-hover-primary'
                    to={`/partners/profile/${userId}/policies/${e.id}/policy-units`}
                    state={{policyName: e.name}}
                  >
                    {e.units_count || '0'} units
                  </Link>
                </td>
                <td className='text-center'>
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

export default PoliciesTable
