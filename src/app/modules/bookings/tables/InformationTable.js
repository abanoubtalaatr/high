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
                <div className='d-flex'>
                  <span className='me-3'> {itemDetails.price || '0'} SAR </span>
                  <a
                    href='#'
                    className='btn-icon'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_1'
                  >
                    <KTIcon iconName='information' className='fs-3 text-danger' />
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
          {/* end::Table body */}
        </table>
      </div>
      {/* end::Table */}
      {/* modal 1 */}
      <div className='modal fade' tabIndex={-1} id='kt_modal_1'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Break Down</h5>
              <div
                className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <KTSVG
                  path='/media/icons/duotune/arrows/arr061.svg'
                  className='svg-icon svg-icon-2x'
                />
              </div>
            </div>
            <div className='modal-body'>
              <table className='table table-row-dashed gs-0 gy-3'>
                {/* begin::Table body */}
                <tbody>
                  <tr>
                    <td>Base Price :</td>
                    <td className='text-gray-700'>95.24 SAR</td>
                  </tr>
                  <tr>
                    <td>Discount :</td>
                    <td className='text-gray-700'>0.00 SAR</td>
                  </tr>
                  <tr>
                    <td>Total Session Price :</td>
                    <td className='text-gray-700'>190.95 SAR</td>
                  </tr>
                  <tr>
                    <td>Tax (5%) :</td>
                    <td className='text-gray-700'>4.76 SAR</td>
                  </tr>
                  <tr>
                    <td>Total:</td>
                    <td className='text-gray-700 fw-bolder'>100.00 SAR</td>
                  </tr>
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InformationTable
