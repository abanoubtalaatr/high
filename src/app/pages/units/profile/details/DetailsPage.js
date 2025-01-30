import React, {useEffect, useState} from 'react'
import {KTIcon} from '../../../../../_metronic/helpers'
import {useParams} from 'react-router-dom'
import {getUnit} from '../../_requests'
import {useIntl} from 'react-intl'
import EditProfileModal from './EditProfileModal'

function DetailsPage() {
  const intl = useIntl()
  const {unitId} = useParams()
  const [unitDetails, setUserDetails] = useState({})
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
    getUnit(unitId)
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
          <span className='fw-bolder mb-3'>{intl.formatMessage({id: 'DETAILS'})}</span>
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
            unitDetails={unitDetails}
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
                <td className='text-gray-700 fw-bolder'>{unitDetails.name || '---'}</td>
              </tr>
              <tr>
                <td className='w-lg-300px'>company</td>
                <td className='text-gray-700 fw-bolder'>
                  {unitDetails.partner ? unitDetails.partner.company_name : '---'}
                </td>
              </tr>
              <tr>
                <td className='w-lg-300px'>category</td>
                <td className='text-gray-700 fw-bolder'>
                  {unitDetails.activity_category ? unitDetails.activity_category.name : '---'}
                </td>
              </tr>
              <tr>
                <td className='w-lg-300px'>activity</td>
                <td className='text-gray-700 fw-bolder'>
                  {unitDetails.activity ? unitDetails.activity.name : '---'}
                </td>
              </tr>
              <tr>
                <td className='w-lg-300px'>type</td>
                <td className='text-gray-700 fw-bolder'>
                  {unitDetails.type ? unitDetails.type.name : '---'}
                </td>
              </tr>
              {/* <tr>
                <td className='w-lg-300px'>size</td>
                <td className='text-gray-700 fw-bolder'>
                  {`${unitDetails.length || '0'} x ${unitDetails.width || '0'} `}
                </td>
              </tr> */}
              <tr>
                <td className='w-lg-300px'>capacity</td>
                <td className='text-gray-700 fw-bolder'>{unitDetails.capacity || '---'}</td>
              </tr>
              <tr>
                <td className='w-lg-300px'>availability</td>
                <td className='text-gray-700 fw-bolder'>{unitDetails.availability || '---'}</td>
              </tr>
              <tr>
                <td className='w-lg-300px'>services</td>
                <td className='text-gray-700 fw-bolder'>
                  {unitDetails.services &&
                    unitDetails.services.map((service, index) => (
                      <span key={service.id} className='me-2'>
                        {service.name}
                        {index != unitDetails.services.length - 1 && ','}
                      </span>
                    ))}
                </td>
              </tr>
              <tr>
                <td className='w-lg-300px'>gender</td>
                <td className='text-gray-700 fw-bolder'>{unitDetails.gender || '---'}</td>
              </tr>
              {/* <tr>
                <td className='w-lg-300px'>starting from</td>
                <td className='text-gray-700 fw-bolder'>{unitDetails.starting_from  || '---'} SAR</td>
              </tr> */}
              <tr>
                <td className='w-lg-300px'>created at</td>
                <td className='text-gray-700 fw-bolder'>{unitDetails.created_at || '---'}</td>
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
