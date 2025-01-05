/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { KTIcon, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import EditStatusModal from './EditStatusModal'
import { getUser } from '../../_requests'
import { useIntl } from 'react-intl'

function ProfileHeader() {
  const intl = useIntl()
  const location = useLocation()
  const { userId } = useParams()
  const profilePath = '/users/profile/' + userId
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
    getUser(userId)
      .then((res) => {
        setUserDetails(res.data.data)
        setUserStatus(res.data.data.active)
        setAlertType('success')
      })
      .catch((err) => {
        setAlertType('danger')
        setErrorMessage(err.response.data.message)
      })
  }, [userStatus, userId])
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap'>
          <div className='d-flex justify-content-between align-items-start flex-wrap flex-grow-1'>
            {/* card column */}
            <div className='d-flex w-lg-50 w-100'>
              <div className='me-5 mb-3'>
                <div className='symbol symbol-100px symbol-lg-160px'>
                  <img
                    src={userDetails.photo || toAbsoluteUrl('/media/avatars/blank.png')}
                    alt={userDetails.name}
                  />
                </div>
              </div>
              <div className='d-flex flex-column w-100'>
                <h3 className='fs-2 fw-bolder mb-1'>{userDetails.name || '---'}</h3>
                <div className='text-muted mb-3'>({userDetails.high_five_user_name || '---'})</div>
                <div className='text-muted mb-3'>{userDetails.biography || '---'}</div>
                <div className='text-muted fw-bolder'>
                  {userDetails.country ? userDetails.country.name : '---'}
                </div>
                <div className='text-muted fw-bolder'>{`${userDetails.gender || '---'} - ${userDetails.age || '0'
                  } years`}</div>
                <div className='text-muted fw-bolder'>{`${userDetails.wallet_amount || 0} ${userDetails.country?.currency?.code}`} </div>
              </div>
            </div>
            {/* status column */}
            <div className='d-flex flex-grow-1 justify-content-end'>
              <div className='d-flex flex-column w-lg-50 w-100'>
                <div className='d-flex align-items-start'>
                  <h5 className='fs-5 fw-bolder flex-grow-1 mb-3'>user Status :</h5>
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
                    userId={userDetails.id}
                    onComplete={completeUpdateStatusHandler}
                  />
                )}
                {/* end modal */}
                <div className='row mb-3'>
                  <label className='col-lg-4 text-muted fw-bolder'>Status:</label>
                  <div className='col-lg-8'>
                    <span
                      className={`badge badge-${userDetails.status == 0 ? 'danger' : 'primary'}`}
                    >
                      {userDetails.status == 0 ? 'blocked' : 'active'}
                    </span>
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className='col-lg-4 text-muted fw-bolder'>Action By:</label>
                  <div className='col-lg-8'>
                    <span className='fw-bolder text-gray-800  text-muted'>
                      {userDetails.status_action_by ? userDetails.status_action_by.name : '---'}
                    </span>
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className='col-lg-4 text-muted fw-bolder'>Action On:</label>
                  <div className='col-lg-8'>
                    <span className='fw-bolder text-gray-800  text-muted'>
                      {userDetails.status_action_at || '---'}
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
                  `nav-link ` + (location.pathname.includes(userId + '/details') && 'active')
                }
                to={profilePath + '/details'}
              >
                {intl.formatMessage({ id: 'INFO' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link ` + (location.pathname.includes(userId + '/bookings') && 'active')
                }
                to={profilePath + '/bookings'}
              >
                {intl.formatMessage({ id: 'BOOKINGS' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link ` + (location.pathname.includes(userId + '/public-events') && 'active')
                }
                to={profilePath + '/public-events'}
              >
                {intl.formatMessage({ id: 'PUBLIC_EVENTS' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link ` + (location.pathname.includes(userId + '/wallet') && 'active')
                }
                to={profilePath + '/wallet'}
              >
                {intl.formatMessage({ id: 'WALLET' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link ` + (location.pathname.includes(userId + '/comments') && 'active')
                }
                to={profilePath + '/comments'}
              >
                {intl.formatMessage({ id: 'COMMENTS' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link ` + (location.pathname.includes(userId + '/notes') && 'active')
                }
                to={profilePath + '/notes'}
              >
                {intl.formatMessage({ id: 'NOTES' })}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
