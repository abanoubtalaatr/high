import {KTIcon} from '../../../../../_metronic/helpers'
import {Link, useParams} from 'react-router-dom'
import {getPolicy} from '../../_requests'
import {useEffect, useState} from 'react'

function PolicyView(props) {
  const {itemDetails} = props

  return (
    <>
      <div className='table-responsive'>
        <table className='table table-row-dashed gs-0 gy-4'>
          <thead></thead>
          <tbody>
            <tr>
              <td className='w-lg-500px'>name</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.name || '---'}</td>
            </tr>
            <tr>
              <td className='w-lg-500px'>who can book?</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.who_can_book || '---'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Public Event */}
      <h5 className=' mt-5 fs-4'>
        <span className='mb-3 fw-bolder'>booking frequency </span>
      </h5>
      <div className='table-responsive'>
        <table className='table table-row-dashed gs-0 gy-4'>
          <thead></thead>
          <tbody>
            <tr>
              <td className='w-lg-500px'>how many sessions can be booked by high five user?</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.booking_frequency || '---'}</td>
            </tr>
          </tbody>
          {/* end::Table body */}
        </table>
      </div>
      {/* Public Event */}
      <h5 className=' mt-5 fs-2'>
        <span className='mb-3 fw-bolder'>cancellation policy </span>
      </h5>
      <h5 className=' mt-5 fs-4'>
        <span className='mb-3 fw-bolder'>online payment </span>
      </h5>
      <div className='table-responsive'>
        <table className='table table-row-dashed gs-0 gy-4'>
          <thead></thead>
          <tbody>
            <tr>
              <td className='w-lg-500px'>free cancellation</td>
              <td className='text-gray-700 fw-bolder'>
                high five user will get full refund for cancellation if cancelled within
                <span className='badge badge-square badge-success mx-2 me-2'>
                  {itemDetails.free_cancellation_time || '0'}
                </span>
                hours before session start time`
              </td>
            </tr>
            <tr>
              <td className='w-lg-500px'>fees for cancellation</td>
              <td className='text-gray-700 fw-bolder'>
                charge high five user
                <span className='badge badge-square badge-success mx-2 me-2'>
                  {itemDetails.fees_for_cancellation || '0'}
                </span>
                % of paid amount if cancelled after free cancellation period
              </td>
            </tr>
          </tbody>
          {/* end::Table body */}
        </table>
      </div>
      <div className='mt-5 mb-5'>
        <h5 className=' mt-5 fs-4'>
          <span className='mb-3 fw-bolder'>cash payment </span>
        </h5>
        <span className=' text-danger d-flex'>
          <KTIcon iconName='information' className='fs-3 me-1  text-danger' />
          cancellation charge is subject to agreement with high five user and will not be considered
          financially in your accounting page
        </span>
      </div>
      <hr className='border-0' />
      <h5 className=' mt-5 fs-4'>
        <span className='mb-3 fw-bolder'>locker </span>
      </h5>
      <div className='table-responsive'>
        <table className='table table-row-dashed gs-0 gy-4'>
          <thead></thead>
          <tbody>
            <tr>
              <td className='w-lg-500px'>locker</td>
              <td className='text-gray-700 fw-bolder'>
                all unloked bookings will be auto locked in
                <span className='badge badge-square badge-success mx-2 me-2'>
                  {itemDetails.locker_time || '0'}
                </span>
                hours before start time . 3 hours minimum
              </td>
            </tr>
          </tbody>
          {/* end::Table body */}
        </table>
      </div>
      <h5 className=' mt-5 fs-4'>
        <span className='mb-3 fw-bolder'>receive bookings time control </span>
      </h5>
      <div className='table-responsive'>
        <table className='table table-row-dashed gs-0 gy-4'>
          <thead></thead>
          <tbody>
            <tr>
              <td className='w-lg-500px'>time control</td>
              <td className='text-gray-700 fw-bolder'>
                do not show any available session to high five users within
                <span className='badge badge-square badge-success mx-2 me-2'>
                  {itemDetails.receiving_booking_time_control || '0'}
                </span>
                hours before start time
              </td>
            </tr>
          </tbody>
          {/* end::Table body */}
        </table>
      </div>
      <span className=' text-danger d-flex'>
        {/* <KTIcon iconName='information' className='fs-3 me-1  text-danger' /> */}
        {/* (zero) is the best option if you are in unit during operations hour */}
      </span>
      <span className='d-flex text-danger'>
        {/* <KTIcon iconName='information' className='fs-3 me-1 text-danger' /> */}
        {/* note: you have full control to link or create manual booking in any avaliable session */}
      </span>
    </>
  )
}

export default PolicyView
