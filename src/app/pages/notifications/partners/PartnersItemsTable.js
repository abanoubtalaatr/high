import {Link, useLocation, useNavigate} from 'react-router-dom'
import {KTIcon} from '../../../../_metronic/helpers'
import {useEffect, useState} from 'react'
import DeleteModal from './DeleteModal'
import {Button} from 'react-bootstrap'

function PartnersItemsTable(props) {
  const {items, onComplete} = props
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location.delet)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemDeleteId, setItemDeleteId] = useState('')
  const [alertType, setAlertType] = useState(location.state?.alertType)
  const [alertMessage, setAlertMessage] = useState(location.state?.alertMessage)
  const openDeleteModal = (id) => {
    setShowDeleteModal(true)
    setItemDeleteId(id)
  }
  const closeDeleteModal = () => setShowDeleteModal(false)
  const completeHandler = () => {
    setShowDeleteModal(false)
    onComplete(true)
  }
  useEffect(() => {
    navigate('/notifications/partners', {
      state: {
        alertType: '',
        alertMessage: '',
      },
    })
  }, [])
  return (
    <>
      {alertMessage && (
        <div className={`alert alert-${alertType}`}>
          <div className='alert-text font-weight-bold'>{alertMessage}</div>
        </div>
      )}
      <div className='table-responsive'>
        {/* begin::Table */}
        <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
          {/* begin::Table head */}
          <thead>
            <tr className='bg-light'>
              <th className='min-w-100px'>notification</th>
              <th className='min-w-100px text-center'>create</th>
              <th className='min-w-100px text-center'>sending</th>
              <th className='w-md-200px text-center'>Actions</th>
            </tr>
          </thead>
          {/* end::Table head */}
          {/* begin::Table body */}
          <tbody>
            {items.map((e) => {
              return (
                <>
                  <tr key={e.id}>
                    <td>
                      <h5>{e.title || '---'}</h5>
                      <small>{e.body || '---'}</small>
                    </td>
                    <td className='text-center'>
                      <h5>{e.created_by?.name} </h5>
                      <small>{e.created_at || '---'}</small>
                    </td>
                    <td className='text-center'>
                      <span
                        className={`mb-3 badge badge-light-${
                          e.status.toLowerCase() === 'pending'
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
                      {e.status.toLowerCase() === 'pending' && (
                        <>
                          <Link
                            to={`edit/${e.id}`}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                          >
                            <KTIcon iconName='pencil' className='fs-3' />
                          </Link>
                          <Button
                            variant='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                            onClick={() => openDeleteModal(e.id)}
                          >
                            <KTIcon iconName='trash' className='fs-3' />
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan='4' className='bg-light-secondary'>
                      <div className='d-flex justify-content-between flex-nowrap'>
                        <span className='d-flex justify-content-start flex-column w-100px'>
                          <span className='d-flex align-items-center mb-2'>
                            <KTIcon iconName='trash' className='fs-6 me-1' />
                            <span className='fs-7'>status</span>
                          </span>
                          <span className='text-dark fw-bold fs-7'>
                            {e.partner_status.split('_').join(' ') || '---'}
                          </span>
                        </span>
                        <span className='d-flex justify-content-start flex-column w-300px'>
                          <span className='d-flex align-items-center mb-2'>
                            <KTIcon iconName='geolocation' className='fs-6 me-1' />
                            <span className='fs-7'>main location</span>
                          </span>
                          <span className='text-dark fw-bold fs-7'>
                            {typeof e.country_iso === 'object' && e.country_iso !== null
                              ? e.country_iso.name
                              : ' all countries'}
                            -
                            {typeof e.state_id === 'object' && e.state_id !== null
                              ? e.state_id.name
                              : ' all states'}
                            -
                            {typeof e.city_id === 'object' && e.city_id !== null
                              ? e.city_id.name
                              : ' all cities'}
                          </span>
                        </span>
                        <span className='d-flex justify-content-start flex-column w-150px'>
                          <span className='d-flex align-items-center mb-2'>
                            <KTIcon iconName='abstract-36' className='fs-6 me-1' />
                            <span className='fs-7'>activity categories</span>
                          </span>
                          <span className='text-dark fw-bold fs-7'>
                            {Object.keys(e.activity_category_id).length > 0
                              ? e.activity_category_id.name
                              : 'all categories'}
                          </span>
                        </span>
                        <span className='d-flex justify-content-start flex-column w-300px'>
                          <span className='d-flex align-items-center mb-2'>
                            <KTIcon iconName='abstract-36' className='fs-6 me-1' />
                            <span className='fs-7'>activities</span>
                          </span>
                          <span className='text-dark fw-bold fs-7'>
                            {typeof e.activities === 'object' && e.activities[0].name
                              ? e.activities.map(
                                  (a, index) =>
                                    a.name + (index < e.activities.length - 1 ? ' - ' : '')
                                )
                              : 'all activities'}
                          </span>
                        </span>
                        <span className='d-flex justify-content-start flex-column w-100px'>
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

export default PartnersItemsTable
