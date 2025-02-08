import React, { useEffect, useState } from 'react'
import { KTIcon } from '../../../../../_metronic/helpers'
import { useParams } from 'react-router-dom'
import { getUser } from '../../_requests'
import { useIntl } from 'react-intl'
import EditProfileModal from './EditProfileModal'

function DetailsPage() {
  const intl = useIntl()
  const { userId } = useParams()
  const [userDetails, setUserDetails] = useState({})
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
    getUser(userId)
      .then((res) => {
        setUserDetails(res.data.data)
        setonComplete(false)
        // console.log(userDetails , "test")
      })
      .catch((err) => { })
  }, [onComplete])
  return (
    <div className='card mb-10'>
      {/* begin::Header */}
      <div className='card-header pt-5'>
        <h5 className='card-title align-items-start flex-column'>
          <span className='fw-bolder mb-3'>{intl.formatMessage({ id: 'INFO' })}</span>
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
          <EditProfileModal
            show={showEditModal}
            onHide={closeEditModal}
            onComplete={completeHandler}
            userDetails={userDetails}
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
                <td className='w-lg-300px'>name</td>
                <td className='text-gray-700 fw-bolder'>{userDetails.name || '---'}</td>
              </tr>
              
              <tr>
                <td className='w-lg-300px'>username</td>
                <td className='text-gray-700 fw-bolder'>
                  {userDetails.high_five_user_name || '---'}
                </td>
              </tr>
              <tr>
                <td className='w-lg-300px'>country</td>
                <td className='text-gray-700 fw-bolder'>{userDetails.country ? userDetails.country.name : '---'}</td>
              </tr>
              <tr>
                <td className='w-lg-300px'>phone</td>
                <td className='text-gray-700 fw-bolder'>{userDetails.phone || '---'}</td>
              </tr>
              <tr>
                <td className='w-lg-300px'>email</td>
                <td className='text-gray-700 fw-bolder'>{userDetails.email || '---'}</td>
              </tr>
             <tr>
                <td className='w-lg-300px'>gender</td>
                <td className='text-gray-700 fw-bolder'>{userDetails.gender || '---'}</td>
              </tr>
               <tr>
                <td className='w-lg-300px'>date of birth</td>
                <td className='text-gray-700 fw-bolder'>{userDetails.date_of_birth || '---'}</td>
              </tr>
             <tr>
                <td className='w-lg-300px'>location</td>
                <td className='text-gray-700 fw-bolder'>
                  {userDetails.location?.state|| '---'}
                </td>
              </tr>
               <tr>
                <td className='w-lg-300px'>registered at</td>
                <td className='text-gray-700 fw-bolder'>{userDetails.created_at || '---'}</td>
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

export default DetailsPage
