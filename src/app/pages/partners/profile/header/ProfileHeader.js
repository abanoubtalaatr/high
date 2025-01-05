/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { KTIcon, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import EditProfileModal from './EditProfileModal'
import EditStatusModal from './EditStatusModal'
import { getPartner } from '../../_requests'
import { useIntl } from 'react-intl'

function ProfileHeader() {
  const intl = useIntl()
  const location = useLocation()
  const { userId } = useParams()
  const profilePath = '/partners/profile/' + userId
  const [userDetails, setUserDetails] = useState({})
  const [alertType, setAlertType] = useState('success')
  const [userStatus, setUserStatus] = useState('')
  const [userProfile, setUserProfile] = useState('')
  const [errorMessage, setErrorMessage] = useState('ddd')
  const [showEditStatusModal, setShowEditStatusModal] = useState(false)
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)
  const [imageBg, setImageBg] = useState('')
  const openEditStatusModal = () => {
    setShowEditStatusModal(true)
  }
  const openEditProfileModal = () => {
    setShowEditProfileModal(true)
  }
  const closeEditStatusModal = () => setShowEditStatusModal(false)
  const closeEditProfileModal = () => setShowEditProfileModal(false)
  const completeUpdateStatusHandler = (status) => {
    setUserStatus(status)
    setShowEditStatusModal(false)
  }
  const completeUpdateProfileHandler = (status) => {
    setUserStatus(status)
    setShowEditProfileModal(false)
  }
  const imageHandler = () => {
    if (imageBg) {
      setImageBg(imageBg)
    } else {
      setImageBg(toAbsoluteUrl('/media/avatars/blank.png'))
    }
  }
  useEffect(() => {
    getPartner(userId)
      .then((res) => {
        setUserDetails(res.data.data)
        setUserStatus(res.data.data.active)
        console.log(res.data.data.active)
        setAlertType('success')
        setImageBg(res.data.data.photo)
      })
      .catch((err) => {
        setAlertType('danger')
        setErrorMessage(err.response.data.message)
      })
    imageHandler()
  }, [userStatus])
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
                    src={imageBg || toAbsoluteUrl('/media/avatars/blank.png')}
                    alt={userDetails.name}
                  />
                </div>
              </div>
              <div className='d-flex flex-column w-100'>
                <div className='d-flex align-items-start'>
                  <h3 className='fs-2 fw-bolder flex-grow-1 mb-5'>{userDetails.company_name}</h3>
                  <Link
                    to={`${profilePath}/translation`}
                    state={{ name: userDetails.owner_name, id: userDetails.id }}
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                  >
                    <i className='fa-solid fa-globe fs-3'></i>
                  </Link>
                  <button
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                    onClick={openEditProfileModal}
                  >
                    <KTIcon iconName='pencil' className='fs-3' />
                  </button>
                </div>
                {/* modal */}
                {showEditProfileModal && (
                  <EditProfileModal
                    show={showEditProfileModal}
                    onHide={closeEditProfileModal}
                    userDetails={userDetails}
                    onComplete={completeUpdateProfileHandler}
                  />
                )}
                {/* end modal */}
                <h5 className='text-muted'>ID-{userDetails.id}</h5>
                <div className='text-muted  mb-5'>{userDetails.bio || '---'}</div>
              </div>
            </div>
            {/* status column */}
            <div className='d-flex flex-grow-1 justify-content-end'>
              <div className='d-flex flex-column w-lg-50 w-100'>
                <div className='d-flex align-items-start'>
                  <h5 className='fs-5 fw-bolder flex-grow-1 mb-3'>partner Status :</h5>
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
                    userStatus={userStatus}
                    userId={userDetails.id}
                    onComplete={completeUpdateStatusHandler}
                  />
                )}
                {/* end modal */}
                <div className='row mb-3'>
                  <label className='col-lg-4 text-muted fw-bolder'>Status:</label>
                  <div className='col-lg-8'>
                    <span
                      className={`badge badge-${userStatus === -1 ? 'warning' : userStatus === 1 ? 'primary' : 'danger'
                        }`}
                    >
                      {userStatus === -1 ? 'pending' : userStatus === 1 || userStatus === 'active' ? 'active' : 'inactive'}
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
                      {userDetails.activated_at || '---'}
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
                className={`nav-link ` + (location.pathname.includes('/owner') && 'active')}
                to={profilePath + '/owner'}
              >
                {intl.formatMessage({ id: 'OWNER' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link ` + (location.pathname.includes('/location') && 'active')}
                to={profilePath + '/location'}
              >
                {intl.formatMessage({ id: 'LOCATIONS' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link ` + (location.pathname.includes('/documents') && 'active')}
                to={profilePath + '/documents'}
              >
                {intl.formatMessage({ id: 'DOCUMENTS' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link ` + (location.pathname.includes('/settings') && 'active')}
                to={profilePath + '/settings'}
              >
                {intl.formatMessage({ id: 'SETTINGS' })}
              </Link>
            </li>


            <li className='nav-item'>
              <Link
                className={`nav-link ` + (location.pathname.includes('/branches') && 'active')}
                to={profilePath + '/branches'}
              >
                {intl.formatMessage({ id: 'branches' })}
              </Link>
            </li>



            <li className='nav-item'>
              <Link
                className={`nav-link ` + (location.pathname.includes('/units') && 'active')}
                to={profilePath + '/units'}
              >
                {intl.formatMessage({ id: 'UNITS' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link ` + (location.pathname.includes('/public-events') && 'active')}
                to={profilePath + '/public-events'}
              >
                {intl.formatMessage({ id: 'PUBLIC_EVENTS' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link ` + (location.pathname.includes('/bookings') && 'active')}
                to={profilePath + '/bookings'}
              >
                {intl.formatMessage({ id: 'BOOKINGS' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link ` + (location.pathname.includes('/policies') && 'active')}
                to={profilePath + '/policies'}
              >
                {intl.formatMessage({ id: 'POLICIES' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link ` + (location.pathname.includes('/employees') && 'active')}
                to={profilePath + '/employees'}
              >
                {intl.formatMessage({ id: 'EMPLOYEES' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link ` + (location.pathname.includes('/contacts') && 'active')}
                to={profilePath + '/contacts'}
              >
                {intl.formatMessage({ id: 'CONTACTS' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link ` + (location.pathname.includes('/customers') && 'active')}
                to={profilePath + '/customers'}
              >
                {intl.formatMessage({ id: 'CUSTOMERS' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link ` + (location.pathname.includes('/memberships') && 'active')}
                to={profilePath + '/memberships'}
              >
                {intl.formatMessage({ id: 'MEMBERSHIPS' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link ` + (location.pathname.includes('/financials') && 'active')}
                to={profilePath + '/financials'}
              >
                {intl.formatMessage({ id: 'FINANCIALS' })}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link ` + (location.pathname.includes('/notes') && 'active')}
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
