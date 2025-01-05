/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import {Languages} from './Languages'
import {toAbsoluteUrl} from '../../../helpers'

const HeaderUserMenu: FC = () => {
  const {currentUser, logout} = useAuth()
  
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/300-1.jpg')} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {currentUser?.data.name}
              {/* <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span> */}
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {currentUser?.data.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>
      <div className='p-5'>
      <div className='row'>
        <span className='col-lg-3 fw-bolder fs-7'>email:</span>
        <span className='col text-muted fs-7'> {currentUser?.data.email}</span>
      </div>
      <div className='separator my-2 separator-dotted'></div>
      <div className='row'>
        <span className='col-lg-3 fw-bolder fs-7'>phone:</span>
        <span className='col text-muted fs-7'> {currentUser?.data.phone_code}{currentUser?.data.phone}</span>
      </div>
      <div className='separator my-2 separator-dotted'></div>
      <div className='row'>
        <span className='col-lg-3 fw-bolder fs-7'>job:</span>
        <span className='col text-muted fs-7'> {currentUser?.data.job.name}</span>
      </div>
      <div className='separator my-2 separator-dotted'></div>
      <div className='row'>
        <span className='col-lg-3 fw-bolder fs-7'>country:</span>
        <span className='col text-muted fs-7'> {currentUser?.data.country.name}</span>
      </div>
      <div className='separator my-2 separator-dotted'></div>

      {/* <Languages /> */}

      <div className='menu-item'>
        <a onClick={logout} className='menu-link text-danger'>
          Sign Out
        </a>
      </div>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
