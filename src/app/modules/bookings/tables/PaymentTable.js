function PaymentTable(props) {
  const {title, itemDetails} = props

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
              <td className='w-lg-500px'>Payment Method</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.payment_method || '---'}</td>
            </tr>
            <tr>
              <td className='w-lg-500px'>Payment Status</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.payment_status || '---'}</td>
            </tr>
            {itemDetails.status.toLowerCase() == 'canceled' && (
              <tr>
                <td className='w-lg-500px'>Cancelation Fee</td>
                <td className='text-gray-700 fw-bolder'>
                  {itemDetails.cancellation_fee_percentage || '---'}% (
                  {itemDetails.cancellation_fees || '---'} SAR)
                </td>
              </tr>
            )}
          </tbody>
          {/* end::Table body */}
        </table>
      </div>
      {/* end::Table */}
    </>
  )
}

export default PaymentTable
