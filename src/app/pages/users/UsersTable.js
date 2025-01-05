import { Link } from 'react-router-dom'
import { KTIcon, toAbsoluteUrl } from '../../../_metronic/helpers'

function UsersTable(props) {
  const { items } = props

  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }

  return (
    <>
      <div className='table-responsive'>
        {/* begin::Table */}
        <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
          {/* begin::Table head */}
          <thead className='fs-6'>
            <tr className='bg-light'>
              <th className='min-w-200px'>user</th>
              {/* <th className='min-w-100px text-center'>email</th> */}
              <th className='min-w-100px text-center'>phone / country</th>
              <th className='min-w-100px text-center'>gender</th>
              <th className='min-w-100px text-center'>birth date</th>
              <th className='min-w-100px text-center'>profile location</th>
              <th className='min-w-100px text-center'>GPS location</th>
              <th className='min-w-100px text-center'>wallet</th>
              <th className='min-w-100px text-center'>statu activity</th>
              <th className='min-w-100px text-center'>status</th>
              <th className='min-w-100px text-center'>Actions</th>
            </tr>
          </thead>
          {/* end::Table head */}
          {/* begin::Table body */}
          <tbody className='fs-6'>
            {items.map((e) => {
              return (
                <tr key={e.id}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-5'>
                        <img
                          src={e.photo || toAbsoluteUrl('/media/avatars/blank.png')}
                          alt={e.name}
                          onError={imageErrorHandler}
                        />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-dark fw-bold fs-6'>{e.name || '---'}</span>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          {e.high_five_user_name || '---'}
                        </span>
                        <span className='d-flex gap-1 text-muted fw-semibold text-muted d-block fs-7'>
                          {e.email || '---'}
                          <span>
                            {e.email_verified ? (
                              <KTIcon iconName='verify' className='fs-3 text-success' />
                            ) : (
                              <KTIcon iconName='minus-circle' className='fs-3 text-danger' />
                            )}

                            {/* {e.email_verified ? '1' : '0'} */}
                          </span>
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className='text-center'>
                    <span>
                      {e.phone || '---'}
                    </span>
                    <br />
                    <span>{e.country ? e.country.name : '---'}</span>
                  </td>
                  <td className='text-center'>{e.gender || '---'}</td>
                  <td className='text-center'>
                    <span>
                      {e.age || '0'} <small>years</small>
                      <br />
                    </span>
                    <span>{e.date_of_birth || '---'}</span>
                  </td>
                  <td className='text-center'>
                    <div className='d-flex justify-content-start flex-column gap-2'>
                      <span> {e.location ? e.location.country : '---'}</span>
                      <span> {e.location ? e.location.state : '---'}</span>
                      <span> {e.location ? e.location.city : '---'}</span>
                    </div>
                  </td>
                  <td className='text-center'>
                    <div className='d-flex justify-content-start flex-column gap-2'>
                      <span> {e.location ? e.location.country : '---'}</span>
                      <span> {e.location ? e.location.state : '---'}</span>
                      <span> {e.location ? e.location.city : '---'}</span>
                    </div>
                  </td>
                  <td className='text-center'>
                    {e.wallet_amount || '0'}
                    <br />
                    <small>{e.country ? e.country.currency.code : ''}</small>
                  </td>
                  <td className='text-center'>
                    <span className={`badge badge-${e.active_status === 'Inactive' ? 'danger' : 'primary'}`}>
                      {e.active_status}
                    </span>
                  </td>
                  <td className='text-center'>
                    <span className={`badge badge-${e.status === 0 ? 'danger' : 'primary'}`}>
                      {e.status === 0 ? 'blocked' : 'available'}
                    </span>
                  </td>
                  <td className='text-center'>
                    <Link
                      to={`/users/profile/${e.id}/details`}
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
    </>
  )
}

export default UsersTable
