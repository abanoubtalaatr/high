import { Link } from 'react-router-dom'
import { KTIcon, KTSVG } from '../../../../_metronic/helpers'

function GeneralInformationTable(props) {
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
              <td className='w-lg-500px'>partner </td>
              <td className='text-gray-700 fw-bolder'>
                <Link to={`/partners/profile/${itemDetails.partner.id}/owner`} >{itemDetails.partner.name}</Link>
              </td>
            </tr>
            <tr>
              <td className='w-lg-500px'>unit</td>
              <td className='text-gray-700 fw-bolder'>
                <Link to={`/units/profile/${itemDetails.unit.id}/details`} >{itemDetails.unit.name}</Link>
              </td>
            </tr>
            <tr>
              <td className='w-lg-500px'>category</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.category || '---'}</td>
            </tr>
            <tr>
              <td className='w-lg-500px'>activity</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.activity || '---'}</td>
            </tr>
          </tbody>
          {/* end::Table body */}
        </table>
      </div>
      {/* end::Table */}
    </>
  )
}

export default GeneralInformationTable
