function PublicEventTable(props) {
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
              <td className='w-lg-500px'>Public Event Id</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.booking_id || '0'}</td>
            </tr>
            <tr>
              <td className='w-lg-500px'>Public Event Status</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.status || '---'}</td>
            </tr>
            <tr>
              <td className='w-lg-500px'>Number Of Player</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.joined_players_count || '0'}</td>
            </tr>
            <tr>
              <td className='w-lg-500px'>Age Group</td>
              <td className='text-gray-700 fw-bolder'>
                {itemDetails.age_group ? itemDetails.age_group.name : '---'}
              </td>
            </tr>
            <tr>
              <td className='w-lg-500px'>Created By</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.created_by || '---'}</td>
            </tr>
            <tr>
              <td className='w-lg-500px'>created At</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.created_at || '---'}</td>
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

export default PublicEventTable
