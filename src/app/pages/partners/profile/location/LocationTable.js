import {KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'

function LocationTable() {
  return (
    <div className='table-responsive'>
      {/* begin::Table */}
      <table className='table table-row-dashed gs-0 gy-4'>
        {/* begin::Table head */}
        <thead>
          <tr className='border-0'>
            <th className='p-0'></th>
            <th className='p-0'></th>
          </tr>
        </thead>
        {/* end::Table head */}
        {/* begin::Table body */}
        <tbody>
          <tr>
            <td className='w-lg-300px'>country</td>
            <td className='text-gray-700 fw-bolder'>country name</td>
          </tr>
          <tr>
            <td className='w-lg-300px'>state</td>
            <td className='text-gray-700 fw-bolder'>state name</td>
          </tr>
          <tr>
            <td className='w-lg-300px'>city</td>
            <td className='text-gray-700 fw-bolder'>city name</td>
          </tr>
        </tbody>
        {/* end::Table body */}
      </table>
      {/* end::Table */}
    </div>
  )
}

export default LocationTable
