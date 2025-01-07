import {Link} from 'react-router-dom'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'

function PartnersTable(props) {
  const {items} = props

  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }
  return (
    <>
      <div className='table-responsive'>
        {/* begin::Table */}
        <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
          {/* begin::Table head */}
          <thead>
            <tr className='bg-light'>
              <th className='min-w-100px'>name</th>
              <th className='min-w-100px'>owner</th>
              <th className='min-w-100px text-center'>country</th>
              <th className='min-w-100px text-center'>state</th>
              <th className='min-w-100px text-center'>city</th>
              <th className='min-w-100px text-center'>Units</th>
              <th className='min-w-100px text-center'>Status</th>
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
                      <div className='symbol symbol-45px me-5'>
                        <img
                          src={e.photo || toAbsoluteUrl('/media/avatars/blank.png')}
                          alt={e.name}
                          onError={imageErrorHandler}
                        />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-dark fw-bold fs-6'>{e.company_name}</span>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          #{e.id}
                        </span>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          {e.created_at}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-5'>
                        <img
                          src={e.profile_image}
                          alt={e.partner_name}
                          onError={imageErrorHandler}
                        />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-dark fw-bold fs-6'>{e.partner_name}</span>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          {e.partner_phone}
                        </span>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          {e.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className='text-center'>{e.country ? e.country.name : '---'}</td>
                  <td className='text-center'>{e.state ? e.state.name : '---'}</td>
                  <td className='text-center'>{e.city ? e.city.name : '---'}</td>
                  <td className='text-center'>{e.units_count}</td>
                  <td className='text-center'>
                    <span
                      className={`badge badge-light-${
                        e.active === 'waiting' ? 'warning' : e.active === 1 || e.active === 'active' ? 'primary' : 'danger'
                      }`}
                    >
                      {e.active === 'waiting' ? 'pending' : e.active === 1 || e.active === 'active' ? 'active' : 'inactive'}
                    </span>
                  </td>
                  <td className='text-center'>
                    <Link
                      to={`../profile/${e.id}/owner`}
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

export default PartnersTable
