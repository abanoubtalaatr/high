import { Link } from 'react-router-dom'
import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { useState } from 'react'
import DeleteModal from './DeleteModal'

function UsersItemsTable(props) {
  const { items, onComplete } = props
  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemDeleteId, setItemDeleteId] = useState('')

  const openDeleteModal = (id) => {
    setShowDeleteModal(true)
    setItemDeleteId(id)
  }
  const closeDeleteModal = () => setShowDeleteModal(false)
  const completeHandler = () => {
    setShowDeleteModal(false)
    onComplete(true)
  }
  return (
    <>
      <div className='table-responsive'>
        {/* begin::Table */}
        <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
          {/* begin::Table head */}
          <thead className='fs-6'>
            <tr className='bg-light'>
              <th className='min-w-100px'>notification</th>
              <th className='min-w-100px text-center'>create</th>
              <th className='min-w-100px text-center'>sending</th>
              <th className='w-md-200px text-center'>Actions</th>
            </tr>
          </thead>
          {/* end::Table head */}
          {/* begin::Table body */}
          <tbody className='fs-6'>
            {items.map((e) => {
              return (
                <>
                  <tr key={e.id}>
                    <td>
                      <h5>{e.title || '---'}</h5>
                      <small>
                        {e.body || '---'}
                      </small>
                    </td>
                    <td className='text-center'>
                      <h5 className='fs-6'>
                        {e.created_by ?
                          <Link to={`/users/profile/${e.created_by.id}/details`}>
                            {e.created_by.name}
                          </Link>
                          : '---'}</h5>
                      <small> {e.created_at || '---'}</small>
                    </td>
                    <td className='text-center'>
                      <span
                        className={`mb-3 badge badge-light-${e.status.toLowerCase() === 'pending'
                            ? 'warning'
                            : e.status.toLowerCase() === 'send'
                              ? 'secondary'
                              : 'danger'
                          }`}
                      >
                        {e.status}
                      </span>
                      <br />
                      <small>{e.sending_date || '---'}</small>
                    </td>
                    <td className='text-center'>
                      <Link
                        to={`/notifications/edit/${e.id}`}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                      >
                        <KTIcon iconName='pencil' className='fs-3' />
                      </Link>
                      <button
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                        onClick={() => openDeleteModal(e.id)}
                      >
                        <KTIcon iconName='trash' className='fs-3' />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan='4' className='bg-light-secondary'>
                      <div className='d-flex justify-content-between'>
                        <span className='d-flex justify-content-start flex-column'>
                          <span className='d-flex align-items-center mb-2'>
                            <KTIcon iconName='trash' className='fs-6 me-1' />
                            <span className='fs-7'>users</span>
                          </span>
                          <span className='text-dark fw-bold fs-7'>{e.user_type || '---'}(active)</span>
                        </span>
                        <span className='d-flex justify-content-start flex-column'>
                          <span className='d-flex align-items-center mb-2'>
                            <KTIcon iconName='geolocation' className='fs-6 me-1' />
                            <span className='fs-7'>location type</span>
                          </span>
                          <span className='text-dark fw-bold fs-7'>
                          {e.location_type || '---'}
                          </span>
                        </span>
                        <span className='d-flex justify-content-start flex-column'>
                          <span className='d-flex align-items-center mb-2'>
                            <KTIcon iconName='geolocation' className='fs-6 me-1' />
                            <span className='fs-7'>location</span>
                          </span>
                          <span className='text-dark fw-bold fs-7'>
                            country name - state name - city name
                          </span>
                        </span>
                        <span className='d-flex justify-content-start flex-column'>
                          <span className='d-flex align-items-center mb-2'>
                            <KTIcon iconName='user' className='fs-6 me-1' />
                            <span className='fs-7'>gender</span>
                          </span>
                          <span className='text-dark fw-bold fs-7'>{e.gender || '---'}</span>
                        </span>
                        <span className='d-flex justify-content-start flex-column'>
                          <span className='d-flex align-items-center mb-2'>
                            <KTIcon iconName='calendar-8' className='fs-6 me-1' />
                            <span className='fs-7'>age</span>
                          </span>
                          <span className='text-dark fw-bold fs-7'>
                          {e.age || '---'}
                          </span>
                        </span>
                        <span className='d-flex justify-content-start flex-column'>
                          <span className='d-flex align-items-center mb-2'>
                            <KTIcon iconName='flag' className='fs-6 me-1' />
                            <span className='fs-7'>language</span>
                          </span>
                          <span className='text-dark fw-bold fs-7'>{e.app_lang || '---'}</span>
                        </span>
                        <span className='d-flex justify-content-start flex-column'>
                          <span className='d-flex align-items-center mb-2'>
                            <KTIcon iconName='time' className='fs-6 me-1' />
                            <span className='fs-7'>timing</span>
                          </span>
                          <span className='text-dark fw-bold fs-7'>{e.timing || '---'}</span>
                        </span>
                        <span className='d-flex justify-content-start flex-column'>
                          <span className='d-flex align-items-center mb-2'>
                            <KTIcon iconName='chart-pie-simple' className='fs-6 me-1' />
                            <span className='fs-7'>statistics</span>
                          </span>
                          <span className='text-dark fw-bold fs-7'>
                            200 targeted - 100 delivered - 50 opend
                          </span>
                        </span>
                      </div>
                    </td>
                  </tr>
                </>
              )
            })}
          </tbody>
          {/* end::Table body */}
        </table>
        {/* end::Table */}
      </div>
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          onHide={closeDeleteModal}
          onComplete={completeHandler}
          itemId={itemDeleteId}
        />
      )}
    </>
  )
}

export default UsersItemsTable
