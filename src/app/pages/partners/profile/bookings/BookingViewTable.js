function BookingViewTable() {
  const profilePath = '/partners/profile'
  return (
    <>
      {/* Session Information */}
      <h5 className='card-title'>
        <span className='mb-3 fw-bolder'>Session Information </span>
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
              <td className='w-lg-300px'>Session Id</td>
              <td className='text-gray-700 fw-bolder'>214587</td>
            </tr>
            <tr>
              <td className='w-lg-300px'>Type</td>
              <td className='text-gray-700 fw-bolder'>Fixed Session</td>
            </tr>
            <tr>
              <td className='w-lg-300px'>Date</td>
              <td className='text-gray-700 fw-bolder'>13/08/2023</td>
            </tr>
            <tr>
              <td className='w-lg-300px'>Start</td>
              <td className='text-gray-700 fw-bolder'>8:30 PM</td>
            </tr>
            <tr>
              <td className='w-lg-300px'>end</td>
              <td className='text-gray-700 fw-bolder'>10:30 PM</td>
            </tr>
            <tr>
              <td className='w-lg-300px'>gender</td>
              <td className='text-gray-700 fw-bolder'>male</td>
            </tr>
            <tr>
              <td className='w-lg-300px'>price</td>
              <td className='text-gray-700 fw-bolder'>100.00 SAR</td>
            </tr>
          </tbody>
          {/* end::Table body */}
        </table>
      </div>
      {/* end::Table */}
      {/* Public Event */}
      <h5 className='card-title mt-5'>
        <span className='mb-3 fw-bolder'>booking </span>
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
              <td className='w-lg-300px'>booking Id</td>
              <td className='text-gray-700 fw-bolder'>1254871</td>
            </tr>
            <tr>
              <td className='w-lg-300px'>type</td>
              <td className='text-gray-700 fw-bolder'>online booking</td>
            </tr>
            <tr>
              <td className='w-lg-300px'>booking statue</td>
              <td className='text-gray-700 fw-bolder'>past</td>
            </tr>
            <tr>
              <td className='w-lg-300px'>booking for</td>
              <td className='text-gray-700 fw-bolder'>high five user</td>
            </tr>
            <tr>
              <td className='w-lg-300px'>Created By</td>
              <td className='text-gray-700 fw-bolder'>unit name</td>
            </tr>
            <tr>
              <td className='w-lg-300px'>Booked At</td>
              <td className='text-gray-700 fw-bolder'>13/08/2023 7:46 PM</td>
            </tr>
          </tbody>
          {/* end::Table body */}
        </table>
      </div>
      {/* end::Table */}
      {/* Payment */}
      <h5 className='card-title mt-5'>
        <span className='mb-3 fw-bolder'>Payment </span>
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
              <td className='w-lg-300px'>Payment Method</td>
              <td className='text-gray-700 fw-bolder'>cash</td>
            </tr>
            <tr>
              <td className='w-lg-300px'>Payment status</td>
              <td className='text-gray-700 fw-bolder'>unpaid</td>
            </tr>
            <tr>
              <td className='w-lg-300px'>Cancelation fee</td>
              <td className='text-gray-700 fw-bolder'>subject to agreement</td>
            </tr>
          </tbody>
          {/* end::Table body */}
        </table>
      </div>
      {/* end::Table */}
      {/* Payment History */}
      <h5 className='card-title mt-5'>
        <span className='mb-3 fw-bolder'>collection History </span>
      </h5>
      {/* begin::Table */}
      <div className='table-responsive'>
        <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
          {/* begin::Table head */}
          <thead>
            <tr className='bg-light'>
              <th className='min-w-100px'>amount</th>
              <th className='min-w-100px text-center'>date</th>
            </tr>
          </thead>
          {/* end::Table head */}
          {/* begin::Table body */}
          <tbody>
            <tr>
              <td>
                100.00 <span className='fs-8'>SAR</span>
                <span className="ms-3">(paid)</span>
              </td>
              <td className='text-center'>13/05/2023 10:22 AM</td>
            </tr>
          </tbody>
          {/* end::Table body */}
        </table>
      </div>
      {/* end::Table */}
    </>
  )
}

export default BookingViewTable
