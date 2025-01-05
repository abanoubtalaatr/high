import React, {useEffect, useState} from 'react'
import {KTIcon} from '../../../../../_metronic/helpers'
import EditOwnerProfileModal from './EditOwnerProfileModal'
import EditOwnerpassModal from './EditOwnerpassModal'
import {useParams} from 'react-router-dom'
import {getPartner} from '../../_requests'

function OwnerPage() {
  const {userId} = useParams()
  const [userDetails, setUserDetails] = useState({})
  const [showEditModal, setShowEditModal] = useState(false)
  const [showEditPassModal, setShowEditPassModal] = useState(false)
  const [onComplete, setonComplete] = useState(false)

  const openEditModal = () => {
    setShowEditModal(true)
  }
  const openEditPassModal = () => {
    setShowEditPassModal(true)
  }
  const closeEditModal = () => setShowEditModal(false)
  const closeEditPassModal = () => setShowEditPassModal(false)
  const completeHandler = () => {
    setShowEditModal(false)
    setShowEditPassModal(false)
    setonComplete(true)
  }
  useEffect(() => {
    getPartner(userId)
      .then((res) => {
        setUserDetails(res.data.data)
        setonComplete(false)
      })
      .catch((err) => {})
  }, [onComplete])
  return (
    <div className='card mb-10'>
      {/* begin::Header */}
      <div className='card-header pt-5'>
        <h5 className='card-title align-items-start flex-column'>
          <span className='fw-bolder mb-3'>owner</span>
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
          <EditOwnerProfileModal
            show={showEditModal}
            onHide={closeEditModal}
            onComplete={completeHandler}
            name={(userDetails.owner_name && userDetails.owner_name) || ''}
            email={(userDetails.email && userDetails.email) || ''}
            phone={(userDetails.partner_phone && userDetails.partner_phone) || ''}
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
                <td className='text-gray-700 fw-bolder'>{userDetails.owner_name}</td>
              </tr>
              <tr>
                <td className='w-lg-300px'>email</td>
                <td className='text-gray-700 fw-bolder'>{userDetails.email}</td>
              </tr>
              <tr>
                <td className='w-lg-300px'>Phone</td>
                <td className='text-gray-700 fw-bolder'>{userDetails.partner_phone}</td>
              </tr>
              <tr>
                <td className='w-lg-300px'>Password</td>
                <td className='text-gray-700 fw-bolder'>
                  <span className='me-5'>*********</span>
                  <button
                    type='button'
                    className='btn btn-light btn-sm btn-flex fw-bold'
                    onClick={openEditPassModal}
                  >
                    <KTIcon iconName='pencil' className='fs-6 text-muted me-1' />
                    reset password
                  </button>
                  {/* modal */}
                  {showEditPassModal && (
                    <EditOwnerpassModal
                      show={showEditPassModal}
                      onHide={closeEditPassModal}
                      onComplete={completeHandler}
                    />
                  )}
                  {/* end modal */}
                </td>
              </tr>
              <tr>
                <td className='w-lg-300px'>Register On</td>
                <td className='text-gray-700 fw-bolder'>{userDetails.created_at}</td>
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

export default OwnerPage
