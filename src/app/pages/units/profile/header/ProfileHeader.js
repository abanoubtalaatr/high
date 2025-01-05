/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { KTIcon, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import EditStatusModal from './EditStatusModal'
import { getUnit } from '../../_requests'
import { useIntl } from 'react-intl'

function ProfileHeader() {
  const intl = useIntl()
  const location = useLocation()
  const { unitId } = useParams()
  const profilePath = '/units/profile/' + unitId
  const [userDetails, setUserDetails] = useState({})
  const [alertType, setAlertType] = useState('success')
  const [userStatus, setUserStatus] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showEditStatusModal, setShowEditStatusModal] = useState(false)
  const openEditStatusModal = () => {
    setShowEditStatusModal(true)
  }

  const closeEditStatusModal = () => setShowEditStatusModal(false)
  const completeUpdateStatusHandler = (status) => {
    setUserStatus(status)
    setShowEditStatusModal(false)
  }
  useEffect(() => {
    getUnit(unitId)
      .then((res) => {
        setUserDetails(res.data.data)
        setUserStatus(res.data.data.active)
        setAlertType('success')
      })
      .catch((err) => {
        setAlertType('danger')
        setErrorMessage(err.response.data.message)
      })
  }, [userStatus, unitId])
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap'>
          <div className='d-flex justify-content-between align-items-start flex-wrap flex-grow-1'>
            {/* card column */}
            <div className='d-flex w-lg-50 w-100'>
              <div className='me-5 mb-3'>
                <div className='symbol symbol-100px symbol-lg-130px'>
                  <img
                    src={userDetails.image || toAbsoluteUrl('/media/avatars/blank.png')}
                    alt={userDetails.name}
                  />
                </div>
              </div>
              <div className='d-flex flex-column w-100'>
                <div className='d-flex align-items-start justify-content-between'>
                  <div>
                    <div className='d-flex align-items-center mb-3'>
                      <div className='me-6'>
                        <i className='fa fa-star me-1 text-warning fs-6'></i>
                        <i className='fa fa-star me-1 text-warning fs-6'></i>
                        <i className='fa fa-star me-1 text-warning fs-6'></i>
                        <i className='fa fa-star me-1 text-gray fs-6'></i>
                        <i className='fa fa-star me-1 text-gray fs-6'></i>
                        <span className='text-gray-800 fw-bold'>3.7</span>
                      </div>
                      <span className='badge badge-primary'>{userDetails.booking_methodology}</span>
                    </div>
                    <h3 className='fs-2 fw-bolder mb-3'>{userDetails.name || '---'}</h3>
                    <h5 className='text-muted'>
                      {userDetails.partner ? userDetails.partner.company_name : '---'}
                    </h5>
                    <div className='text-muted'>{userDetails.description || '---'}</div>
                  </div>
                  <Link
                    to={`${profilePath}/translation`}
                    state={{ name: userDetails.name, id: userDetails.id }}
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                  >
                    <i className='fa-solid fa-globe fs-3'></i>
                  </Link>
                </div>
              </div>
            </div>
            {/* status column */}
            <div className='d-flex flex-grow-1 justify-content-end'>
              <div className='d-flex flex-column w-lg-50 w-100'>
                <div className='d-flex align-items-start'>
                  <h5 className='fs-5 fw-bolder flex-grow-1 mb-3'>unit Status :</h5>
                  <button
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                    onClick={openEditStatusModal}
                  >
                    <KTIcon iconName='pencil' className='fs-3' />
                  </button>
                </div>
                {/* modal */}
                {showEditStatusModal && (
                  <EditStatusModal
                    show={showEditStatusModal}
                    onHide={closeEditStatusModal}
                    userStatus={userDetails.status ? userDetails.status.value : 0}
                    unitId={userDetails.id}
                    onComplete={completeUpdateStatusHandler}
                  />
                )}
                {/* end modal */}
                <div className='row mb-3'>
                  <label className='col-lg-4 text-muted fw-bolder'>Status:</label>
                  <div className='col-lg-8'>
                    <span
                      className={`badge badge-${userDetails.status &&
                        (userDetails.status.value === 2
                          ? 'warning'
                          : userDetails.status.value === 1
                            ? 'primary'
                            : 'danger')
                        }`}
                    >
                      {userDetails.status && userDetails.status.lable}
                    </span>
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className='col-lg-4 text-muted fw-bolder'>Action By:</label>
                  <div className='col-lg-8'>
                    <span className='fw-bolder text-gray-800  text-muted'>
                      {userDetails.activated_by ? userDetails.activated_by.name : '---'}
                    </span>
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className='col-lg-4 text-muted fw-bolder'>Action On:</label>
                  <div className='col-lg-8'>
                    <span className='fw-bolder text-gray-800  text-muted'>
                      {userDetails.active_action_at || '---'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* navbar */}
        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link ` + (location.pathname.includes(unitId + '/details') && 'active')
                }
                to={profilePath + '/details'}
              >
                {intl.formatMessage({ id: 'DETAILS' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link ` + (location.pathname.includes(unitId + '/location') && 'active')
                }
                to={profilePath + '/location'}
                state={userDetails.partner ? userDetails.partner.id : 0}
              >
                {intl.formatMessage({ id: 'LOCATION' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link ` + (location.pathname.includes(unitId + '/gallery') && 'active')
                }
                to={profilePath + '/gallery'}
              >
                {intl.formatMessage({ id: 'GALLERY' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link ` + (location.pathname.includes(unitId + '/comments') && 'active')
                }
                to={profilePath + '/comments'}
              >
                {intl.formatMessage({ id: 'COMMENTS' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link ` + (location.pathname.includes(unitId + '/public-events') && 'active')
                }
                to={profilePath + '/public-events'}
              >
                {intl.formatMessage({ id: 'PUBLIC_EVENTS' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link ` + (location.pathname.includes(unitId + '/bookings') && 'active')
                }
                to={profilePath + '/bookings'}
              >
                {intl.formatMessage({ id: 'BOOKINGS' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link ` + (location.pathname.includes(unitId + '/policy') && 'active')
                }
                to={profilePath + '/policy'}
              >
                {intl.formatMessage({ id: 'POLICY' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link ` + (location.pathname.includes(unitId + '/contacts') && 'active')
                }
                to={profilePath + '/contacts'}
              >
                {intl.formatMessage({ id: 'CONTACTS' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link ` +
                  (location.pathname.includes(unitId + '/assigned-employees') && 'active')
                }
                to={profilePath + '/assigned-employees'}
              >
                {intl.formatMessage({ id: 'ASSIGNED_EMPLOYEES' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link ` + (location.pathname.includes(unitId + '/settings') && 'active')
                }
                to={profilePath + '/settings/general'}
              >
                {intl.formatMessage({ id: 'SETTINGS' })}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
