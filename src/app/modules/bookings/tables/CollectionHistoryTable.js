
function CollectionHistoryTable(props) {
  const {title, itemDetails} = props

  return (
    <>
      <h5 className='card-title mt-5'>
        <span className='mb-3 fw-bolder'>{title}</span>
      </h5>
      {/* begin::Table */}
      {itemDetails.transactions && (
        <div className='table-responsive'>
          <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
            <thead>
              <tr className='bg-light'>
                <th className='min-w-100px'>amount</th>
                <th className='min-w-100px text-center'>date</th>
              </tr>
            </thead>
            <tbody>
              {itemDetails.transactions.map((e) => {
                return (
                  <tr key={e.id}>
                    <td>
                      {e.amount || '0'} <span className='fs-8'>SAR</span>
                      <span className='ms-3'>({e.type || '---'})</span>
                    </td>
                    <td className='text-center'>{e.created_at || '---'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* end::Table */}
    </>
  )
}

export default CollectionHistoryTable
