
import { Link } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../_metronic/helpers'

function CountryFinancial(props) {
  const { FinancialDetails } = props
  return (
    <div className='col-lg-6 col-xl-4 col-xxl-3 mb-5' key={FinancialDetails.id}>
      <div className='card card-xxl-stretch justify-content-center'>
        {/* begin::Body */}
        <div className='card-body py-5 px-5 flex-grow-0 text-center'>
          <div className='d-flex align-items-center justify-content-center gap-3 '>
            <div className='symbol symbol-25px'>
              <img
                src={toAbsoluteUrl(`/media/flags/${FinancialDetails.iso.toLowerCase()}.svg`)}
              />
            </div>
            <h3 className='fw-bold text-gray-700 fs-5 m-0'>{FinancialDetails.name || '---'}</h3>
          </div>
          <h5 className='text-muted fs-6 py-5'>{FinancialDetails.code || '---'}</h5>
          <div className='table-responsive text-center'>
            <table className='table table-row-dashed'>
              {/* begin::Table body */}
              <thead className='fs-6'>
                <tr>
                  <th className='min-w-100px text-dark fw-bold fs-5'>revenues</th>
                  <th className='min-w-100px'>revenue</th>
                  <th className='min-w-100px'>collected</th>
                </tr>
              </thead>
              <tbody className='fs-6'>
                <tr>
                  <td>
                    <span>online</span>
                  </td>
                  <td>
                    <span>5000</span>
                  </td>
                  <td>
                    <span className='d-flex gap-2'>5000</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>cash</span>
                  </td>
                  <td>
                    <span>5000</span>
                  </td>
                  <td>
                    <span className='d-flex gap-2'>1000</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='text-dark fw-bold'>total</span>
                  </td>
                  <td>
                    <span className='text-dark fw-bold'>10000</span>
                  </td>
                  <td>
                    <span className='text-dark fw-bold'>6000</span>
                  </td>
                </tr>
              </tbody>
              {/* end::Table body */}
            </table>
          </div>
          <div className='text-center '>
            <Link className='btn btn-primary' to={`/financials/${FinancialDetails.iso}/transactions`}
              state={{countryName:FinancialDetails.name}}>
              show
            </Link>
          </div>
        </div>
        {/* begin::Body */}
      </div>
    </div>
  )
}

export default CountryFinancial
