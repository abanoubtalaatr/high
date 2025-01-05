import {useParams} from 'react-router-dom'
import {KTIcon} from '../../../../../_metronic/helpers'
import EditLocationModal from './EditLocationModal'
import {useEffect, useState} from 'react'
import {getPartner} from '../../_requests'

function LocationPage() {
  const {userId} = useParams()
  const [userDetails, setUserDetails] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [onComplete, setonComplete] = useState(false)

  const openEditModal = () => {
    setShowEditModal(true)
  }
  const closeEditModal = () => setShowEditModal(false)
  const completeHandler = () => {
    setShowEditModal(false)
    setonComplete(true)
  }
  useEffect(() => {
    getPartner(userId)
      .then((res) => {
        setUserDetails(res.data.data)
        setonComplete(false)
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
      })
  }, [onComplete])
  return (
    <div className='card mb-10'>
      {/* begin::Header */}
      <div className='card-header pt-5'>
        <h5 className='card-title align-items-start flex-column'>
          <span className='fw-bolder mb-3'>location</span>
        </h5>
        <div className='card-toolbar gap-3 mb-5'>
          <button
            type='button'
            className='btn btn-light btn-sm btn-flex fw-bold'
            onClick={openEditModal}
          >
            <KTIcon iconName='pencil' className='fs-6 text-muted me-1' />
            edit
          </button>
        </div>
        {/* modal */}
        {showEditModal && (
          <EditLocationModal
            show={showEditModal}
            onHide={closeEditModal}
            onComplete={completeHandler}
            country_iso={(userDetails.country && userDetails.country.iso) || 0}
            state_id={(userDetails.state && userDetails.state.id) || 0}
            city_id={(userDetails.city && userDetails.city.id) || 0}
          />
        )}
        {/* end modal */}
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='border-0'>
                <th className='p-0'></th>
                <th className='p-0'></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td className='w-lg-300px'>country</td>
                <td className='text-gray-700 fw-bolder'>
                  {(userDetails.country && userDetails.country.name) || '---'}
                </td>
              </tr>
              <tr>
                <td className='w-lg-300px'>state</td>
                <td className='text-gray-700 fw-bolder'>
                  {(userDetails.state && userDetails.state.name) || '---'}
                </td>
              </tr>
              <tr>
                <td className='w-lg-300px'>city</td>
                <td className='text-gray-700 fw-bolder'>
                  {(userDetails.city && userDetails.city.name) || '---'}
                </td>
              </tr>
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default LocationPage
