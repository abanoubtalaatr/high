
import { Link } from "react-router-dom"
import { toAbsoluteUrl } from "../../../../_metronic/helpers"

function BookingTable(props) {
  const { title, itemDetails } = props
  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }
  return (
    <>
      <h5 className='card-title mt-5'>
        <span className='mb-3 fw-bolder'>{title}</span>
      </h5>
      {/* begin::Table */}
      <div className='table-responsive'>
        <table className='table table-row-dashed gs-0 gy-4'>
          {/* begin::Table head */}
          <thead></thead>
          {/* end::Table head */}
          {/* begin::Table body */}
          <tbody>
            <tr>
              <td className='w-lg-500px'>booking Id</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.booking_id || '0'}</td>
            </tr>
            <tr>
              <td className='w-lg-500px'>Type </td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.booking_type || '---'}</td>
            </tr>
            <tr>
              <td className='w-lg-500px'>Booking Status</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.status || '---'}</td>
            </tr>
            <tr>
              <td className='w-lg-500px'>Booked for</td>
              <td className='text-gray-700 fw-bolder'>
                {itemDetails.booking_type || '---'}
                {itemDetails.booked_for && (
                  <div className='col-lg-6 pt-3'>
                    <div to={`/users/profile/${itemDetails.booked_for.id}/details`} className='d-flex border p-2'>
                      <div className='symbol symbol-45px me-5'>
                        <img
                          src={itemDetails.booked_for.image || toAbsoluteUrl('/media/avatars/blank.png')}
                          alt={itemDetails.booked_for.name}
                          onError={imageErrorHandler}
                        />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-dark fw-bold fs-6'>
                          {itemDetails.booked_for.name || '---'}
                        </span>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          @{itemDetails.booked_for.vie_id || '---'}
                        </span>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          {itemDetails.booked_for.type || '---'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td className='w-lg-500px'>Booked By</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.booked_via || '---'}</td>
            </tr>
            <tr>
              <td className='w-lg-500px'>Booked At</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.booked_at || '---'}</td>
            </tr>
            {itemDetails.status.toLowerCase() == 'canceled' && (
              <>
                <tr>
                  <td className='w-lg-500px'>Cancelled By</td>
                  <td className='text-gray-700 fw-bolder'>{itemDetails.cancelled_by || '---'}</td>
                </tr>
                <tr>
                  <td className='w-lg-500px'>Cancelled At</td>
                  <td className='text-gray-700 fw-bolder'>{itemDetails.cancelled_at || '---'}</td>
                </tr>
              </>
            )}
          </tbody>
          {/* end::Table body */}
        </table>
      </div>
      {/* end::Table */}
    </>
  )
}

export default BookingTable
