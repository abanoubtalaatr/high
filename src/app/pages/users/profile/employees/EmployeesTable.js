import {toAbsoluteUrl} from '../../../../../_metronic/helpers'

function EmployeesTable(props) {
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
            <th className='min-w-100px text-center'>coordinator contact</th>
          </tr>
        </thead>
        {/* end::Table head */}
        {/* begin::Table body */}
        <tbody>
          <tr key={items.owner.id}>
            <td>
              <div className='d-flex align-items-center'>
                <div className='symbol symbol-45px me-5'>
                  <img
                    src={items.owner.image || toAbsoluteUrl('/media/avatars/blank.png')}
                    alt={items.owner.name}
                    onError={imageErrorHandler}
                  />
                </div>
                <div className='d-flex justify-content-start flex-column'>
                  <span className='text-dark fw-bold fs-6'>{items.owner.name} (owner)</span>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>
                    {items.owner.created_at || 'no date and time'}
                  </span>
                </div>
              </div>
            </td>
            <td className='text-center'>{items.owner.phone || '---'}</td>
            <td className='text-center'>{items.owner.email || '---'}</td>
            <td className='text-center'>{items.owner.coordinator_contact === 0 ? 'off' : 'on'}</td>
          </tr>
          {items.employees.map((e) => {
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
                        {e.created_at || 'no date and time'}
                      </span>
                    </div>
                  </div>
                </td>
                <td className='text-center'>{e.phone || '---'}</td>
                <td className='text-center'>{e.email || '---'}</td>
                <td className='text-center'>{e.coordinator_contact === 0 ? 'off' : 'on'}</td>
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
