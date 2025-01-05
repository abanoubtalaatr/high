function PaymentHistoryTable(props) {
  const {title, itemDetails} = props

  return (
    <>
      <h5 className='card-title mt-5'>
        <span className='mb-3 fw-bolder'>{title}</span>
      </h5>
      {/* begin::Table */}
      <div className='table-responsive'>
        <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
          {/* begin::Table head */}
          <thead>
            <tr className='bg-light'>
              <th className='min-w-100px'>player</th>
              <th className='min-w-100px text-center'>type</th>
              <th className='min-w-100px text-center'>amount</th>
              <th className='min-w-100px text-center'>date</th>
            </tr>
          </thead>
          {/* end::Table head */}
          {/* begin::Table body */}
          <tbody>
            {itemDetails.transactions.map((e) => {
              return (
                <tr key={e.id}>
                  <td>player name</td>
                  <td className='text-center'>online</td>
                  <td>
                    {e.amount || '0'} <span className='fs-8'>SAR</span>
                    <span className='ms-3'>({e.type || '---'})</span>
                  </td>
                  <td className='text-center'>{e.created_at || '---'}</td>
                </tr>
              )
            })}
          </tbody>
          {/* end::Table body */}
        </table>
      </div>
      {/* end::Table */}
    </>
  )
}

export default PaymentHistoryTable
