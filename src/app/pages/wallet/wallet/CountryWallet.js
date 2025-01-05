
import { Link } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'

function CountryWallet(props) {
  const { walletDetails } = props
  return (
    <div className='col-lg-2 mb-5' key={walletDetails.id}>
      <div className='card card-xxl-stretch justify-content-center'>
        {/* begin::Body */}
        <div className='card-body py-5 px-5 flex-grow-0 text-center'>
          <div className='d-flex align-items-center justify-content-center gap-3 '>
            <div className='symbol symbol-25px'>
              <img
                src={toAbsoluteUrl(`/media/flags/${walletDetails.iso.toLowerCase()}.svg`)}
              />
            </div>
            <h3 className='fw-bold text-gray-700 fs-5 m-0'>{walletDetails.name || '---'}</h3>
          </div>
          <h5 className='text-muted fs-6 pt-5'>total balance</h5>
          <h5 className='fw-bold text-gray-700' style={{ fontSize: '26px' }}> {walletDetails.total_balance || '0'}</h5>
          <h5 className='text-muted fs-7 pb-5'>{walletDetails.code || '---'}</h5>
          <div className='text-center'>
            <table className='table table-row-dashed gs-0 gy-3'>
              {/* begin::Table body */}
              <tbody>
                <tr>
                  <td>
                    <Link to={`/wallet/${walletDetails.iso}/funds`}>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-dark fw-bold fs-6'>pending funds</span>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          {walletDetails.funds_transactions || '0'} transictions
                        </span>
                      </div>
                    </Link>
                  </td>
                  <td className='text-gray-700 text-end'>
                    <div className='d-flex justify-content-start flex-column'>
                      <span className='text-dark fw-bold fs-6'>{walletDetails.pending_funds || '0'}</span>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        {walletDetails.code || '---'}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to={`/wallet/${walletDetails.iso}/cashout`}>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-dark fw-bold fs-6'>pending cash out</span>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          {walletDetails.cash_out_transactions || '0'} transictions
                        </span>
                      </div>
                    </Link>
                  </td>
                  <td className='text-gray-700 text-end'>
                    <div className='d-flex justify-content-start flex-column'>
                      <span className='text-dark fw-bold fs-6'>{walletDetails.pending_cash_out || '0'}</span>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        {walletDetails.code || '---'}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to={`/wallet/${walletDetails.iso}/exchanges`}>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-dark fw-bold fs-6'>exchanges</span>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          {walletDetails.exchange_transactions || '0'} transictions
                        </span>
                      </div>
                    </Link>
                  </td>
                  <td className='text-gray-700 text-end'>
                    <div className='d-flex justify-content-start flex-column'>
                      <span className='text-dark fw-bold fs-6'>{walletDetails.exchanges || '0'}</span>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        {walletDetails.code || '---'}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
              {/* end::Table body */}
            </table>
          </div>
          <div className='text-center '>
            <Link className='btn btn-primary' to={`/wallet/${walletDetails.iso}/transactions`}>
              show transictions
            </Link>
          </div>
        </div>
        {/* begin::Body */}
      </div>
    </div>
  )
}

export default CountryWallet
