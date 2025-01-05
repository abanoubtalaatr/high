import {Link} from 'react-router-dom'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'

function UnitsTable(props) {
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
              <th className='min-w-100px'>unit</th>
              <th className='min-w-100px'>company</th>
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
                      <div className='symbol symbol-45px me-5'>
                        <img
                          src={e.image || toAbsoluteUrl('/media/avatars/blank.png')}
                          alt={e.name}
                          onError={imageErrorHandler}
                        />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-dark fw-bold fs-6'>{e.name || '---'}</span>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          {e.created_at || '---'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-5'>
                        <img
                          src={
                            e.partner &&
                            (e.partner.photo || toAbsoluteUrl('/media/avatars/blank.png'))
                          }
                          alt={e.partner ? e.partner.company_name : '---'}
                          onError={imageErrorHandler}
                        />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <Link
                          className='text-dark fw-bold text-hover-primary'
                          to={`/partners/profile/${e.partner.id}/owner`}
                        >
                          {e.partner ? e.partner.company_name : '---'}
                        </Link>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          {e.partner ? e.partner.created_at : '---'}
                        </span>
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
                        e.status &&
                        (e.status.lable.toLowerCase() === 'pending'
                          ? 'warning'
                          : e.status.lable.toLowerCase() === 'approved'
                          ? 'primary'
                          : 'danger')
                      }`}
                    >
                      {e.status && e.status.lable}
                    </span>
                  </td>
                  <td className='text-center'>
                    <Link
                      to={`/units/profile/${e.id}/details`}
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

export default UnitsTable
