
import { useState } from 'react'
import CashOutModal from './CashOutModal'
import FundModal from './FundModal'
import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { Link } from 'react-router-dom'

function TransactionsTable(props) {
  const { items } = props
  const [itemDetails, setItemDetails] = useState('')
  const [showCashOutModal, setShowCashOutModal] = useState(false)
  const [showFundModal, setShowFundModal] = useState(false)
  const openCashOutModal = (item) => {
    setShowCashOutModal(true)
    setItemDetails(item)
  }
  const openFundModal = (item) => {
    setShowFundModal(true)
    setItemDetails(item)
  }
  const closeCashOutModal = () => setShowCashOutModal(false)
  const closeFundModal = () => setShowFundModal(false)

  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }
  return (
    <div className='table-responsive'>
      {/* begin::Table */}
      <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
        {/* begin::Table head */}
        <thead>
          <tr className='bg-light fs-6'>
            <th className=''>id</th>
            <th className='min-w-200px'>user</th>
            <th className='min-w-100px text-center'>date & time</th>
            <th className='min-w-100px text-center'>transaction</th>
            <th className='min-w-100px text-center'>in</th>
            <th className='min-w-100px text-center'>out</th>
            <th className='min-w-100px text-center'>balance</th>
            <th className='min-w-100px text-center'>currency</th>
            <th className='min-w-100px text-center'>action</th>
          </tr>
        </thead>
        {/* end::Table head */}
        {/* begin::Table body */}
        <tbody>
          {items.map((e) => {
            return (
              <tr key={e.id} className='fs-6'>
                <td className=''>{e.id}</td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img
                        src={e.user.image || toAbsoluteUrl('/media/avatars/blank.png')}
                        alt={e.name}
                        onError={imageErrorHandler}
                      />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <span className='text-dark fw-bold '>
                        <Link
                          to={`/users/profile/${e.user.id}/details`}
                          className='text-dark fw-bold text-hover-primary'
                        >
                          <span>{e.user ? e.user.name : '---'}</span>
                        </Link>
                      </span>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        {e.user.vie_id || 'username'}
                      </span>
                    </div>
                  </div>
                </td>
                <td className='text-center'>{e.created_at || '---'}</td>
                <td className='text-center'>
                  <div className='d-flex justify-content-start flex-column'>
                    {e.transaction || '---'}
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>{e.info.description || '---'}</span>
                  </div>
                </td>
                <td className='text-center text-success'>{e.in || '---'}</td>
                <td className='text-center text-danger'>{e.out || '---'}</td>
                <td className='text-center'>{e.balance || '---'}</td>
                <td className='text-center'>
                  <div className='d-flex justify-content-start flex-column'>
                    {e.currency || '---'}
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>{e.country || '---'}</span>
                  </div>
                </td>
                <td className='text-center'>
                  {e.info.type === 'cash_out' && (
                    <button
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      onClick={() => openCashOutModal({ transactionType: e.info.type, transactionId: e.info.id, userId: e.user.id })}
                    >
                      <KTIcon iconName='eye' className='fs-3' />
                    </button>
                  )}
                  {e.info.type === 'wallet_fund' && (
                    <button
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      onClick={() => openFundModal({ transactionType: e.info.type, transactionId: e.info.id, userId: e.user.id })}
                    >
                      <KTIcon iconName='eye' className='fs-3' />
                    </button>
                  )}
                  {e.info.type === 'public_event' && (
                    <Link
                      to={`public-event/${e.info.id}`}
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    >
                      <KTIcon iconName='eye' className='fs-3' />
                    </Link>
                  )}
                  {e.info.type === 'booking' && (
                    <Link
                      to={`booking/${e.info.id}`}
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    >
                      <KTIcon iconName='eye' className='fs-3' />
                    </Link>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
        {/* end::Table body */}
      </table>
      {/* end::Table */}
      {/* modal */}
      {showCashOutModal && (
        <CashOutModal
          show={showCashOutModal}
          onHide={closeCashOutModal}
          itemDetails={itemDetails}
        />
      )}
      {showFundModal && (
        <FundModal
          show={showFundModal}
          onHide={closeFundModal}
          itemDetails={itemDetails}
        />
      )}
    </div>
  )
}

export default TransactionsTable
