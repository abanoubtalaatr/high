import { Link } from "react-router-dom"

function BookingsStatistics(props) {
  const { allBookings, comingBookings, endedBookings, cancelledBookings, errorMessage } = props
  return (
    <div className='card card-xxl-stretch justify-content-center'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5 px-5 row'>
        <div className='text-center col-md-4 m-0'>
          <img
            className='mx-auto mh-150px'
            src='https://preview.keenthemes.com/metronic8/react/demo1/media/illustrations/misc/upgrade-dark.svg'
            alt=''
          />
        </div>
        <div className='card-title align-items-start flex-column col-md-8 m-0'>
          <h5 className='fw-bold text-gray-700' style={{ fontSize: '46px' }}>
            {allBookings}
          </h5>
          <h3 className='fw-bold fs-3 m-0 text-uppercase text-gray-700'>bookings</h3>
          <small className='text-muted mt-1 fw-semibold fs-7'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </small>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-5 px-5 flex-grow-0'>
        {errorMessage ? (
          <div className='alert alert-danger d-flex align-items-center mb-0'>
            <div className='d-flex flex-column'>{errorMessage}</div>
          </div>
        ) : (
          <div className='d-flex justify-content-center flex-wrap my-5' style={{ gap: '1%' }}>
            <div className='text-center ' style={{ width: '24%' }}>
              <h5 className='text-gray-500 fs-6'>coming</h5>
              <h5 className='text-gray-800 fw-bold fs-2'>{comingBookings ? comingBookings.total : 0}</h5>
              <div className='border border-gray-300 rounded py-2 px-1 mb-3 text-center'>
                <span className='fs-3 text-gray-700 fw-bold'>{comingBookings ? comingBookings.online : 0}</span>
                <div className='fs-7 fw-semibold text-gray-500'>online</div>
              </div>
              <div className='border border-gray-300 rounded py-2 px-1 mb-3 text-center'>
                <span className='fs-3 text-gray-700 fw-bold'>{comingBookings ? comingBookings.manual : 0}</span>
                <div className='fs-7 fw-semibold text-gray-500'>manual</div>
              </div>
            </div>
            <div className='text-center ' style={{ width: '24%' }}>
              <h5 className='text-gray-500 fs-6'>ended</h5>
              <h5 className='text-gray-800 fw-bold fs-2'>{endedBookings ? endedBookings.total : 0}</h5>
              <div className='border border-gray-300 rounded py-2 px-1 mb-3 text-center'>
                <span className='fs-3 text-gray-700 fw-bold'>{endedBookings ? endedBookings.online : 0}</span>
                <div className='fs-7 fw-semibold text-gray-500'>online</div>
              </div>
              <div className='border border-gray-300 rounded py-2 px-1 mb-3 text-center'>
                <span className='fs-3 text-gray-700 fw-bold'>{endedBookings ? endedBookings.manual : 0}</span>
                <div className='fs-7 fw-semibold text-gray-500'>manual</div>
              </div>
            </div>
            <div className='text-center ' style={{ width: '24%' }}>
              <h5 className='text-gray-500 fs-6'>canceled</h5>
              <h5 className='text-gray-800 fw-bold fs-2'>{cancelledBookings ? cancelledBookings.total : 0}</h5>
              <div className='border border-gray-300 rounded py-2 px-1 mb-3 text-center flex-grow-1'>
                <span className='fs-3 text-gray-700 fw-bold'>{cancelledBookings ? cancelledBookings.online : 0}</span>
                <div className='fs-7 fw-semibold text-gray-500'>online</div>
              </div>
              <div className='border border-gray-300 rounded py-2 px-1 mb-3 text-center flex-grow-1'>
                <span className='fs-3 text-gray-700 fw-bold'>{cancelledBookings ? cancelledBookings.manual : 0}</span>
                <div className='fs-7 fw-semibold text-gray-500'>manual</div>
              </div>
            </div>
          </div>
        )}

        <div className='text-center my-5'>
          <Link className='btn btn-primary' to={`/bookings`}>
            show all
          </Link>
        </div>
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default BookingsStatistics
