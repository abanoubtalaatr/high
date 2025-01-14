import { KTIcon, KTSVG } from '../../../../_metronic/helpers'

function InformationTable(props) {
  const { title, itemDetails } = props

  return (
    <>
      <h5 className='card-title mt-5'>
        <span className='mb-3 fw-bolder'>
          {title}
          {itemDetails.edited_after_booking && (
            <span className='badge  badge-success'>edited</span>
          )}
        </span>
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
              <td className='w-lg-500px'>Session Id </td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.session_id || '0'}</td>
            </tr>
            <tr>
              <td className='w-lg-500px'>Type</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.session_type || '---'}</td>
            </tr>
            <tr>
              <td className='w-lg-500px'>Date</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.date || '---'}</td>
            </tr>
            <tr>
              <td className='w-lg-500px'>Start</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.start_time || '---'}</td>
            </tr>
            <tr>
              <td className='w-lg-500px'>end</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.end_time || '---'}</td>
            </tr>
            <tr>
              <td className='w-lg-500px'>overnight</td>
              <td className='text-gray-700 fw-bolder'>
                {itemDetails.overnight != 0 ? 'yes' : 'no'}
              </td>
            </tr>
            <tr>
              <td className='w-lg-500px'>gender</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.session_gender || '---'}</td>
            </tr>
            <tr>
              <td className='w-lg-500px'>price</td>
              <td className='text-gray-700 fw-bolder'>
                <span className=' text-gray-700 fw-bolder d-flex'>
                  <KTIcon iconName='information' className='fs-3 me-1' />
                  {itemDetails?.total_income_from_event || '---'}
                </span>
              </td>
            </tr>
          </tbody>
          {/* end::Table body */}
        </table>
      </div>
      {/* end::Table */}
    </>
  )
}

export default InformationTable
