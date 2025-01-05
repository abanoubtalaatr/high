import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EditFundModal from './EditFundModal'
import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers'
import FundModal from './FundModal'

function FundsTable(props) {
  const { items, onComplete } = props
  const [itemDetails, setItemDetails] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showFundModal, setShowFundModal] = useState(false)

  const openEditModal = (item) => {
    setShowEditModal(true)
    setItemDetails(item)
  }
  const openFundModal = (item) => {
    setShowFundModal(true)
    setItemDetails(item)
  }
  const closeEditModal = () => setShowEditModal(false)
  const closeFundModal = () => setShowFundModal(false)

  const completeHandler = () => {
    setShowEditModal(false)
    onComplete(true)
  }
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
            <th className='min-w-150px text-center'>amount</th>
            <th className='min-w-100px text-center'>currency</th>
            <th className='min-w-100px text-center'>status</th>
            <th className='min-w-100px text-center'>initiated by</th>
            <th className='min-w-100px text-center'>initiated on</th>
            <th className='min-w-100px text-center'>action by</th>
            <th className='min-w-100px text-center'>action on</th>
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
                <td className='text-center'>{e.amount || '0'}</td>
                <td className='text-center'>
                  <div className='d-flex justify-content-start flex-column'>
                    {e.currency || '---'}
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>{e.country || '---'}</span>
                  </div>
                </td>
                <td className='text-center'>
                  <span
                    className={`badge badge-${e.status.toLowerCase() === 'pending'
                      ? 'warning'
                      : e.status.toLowerCase() === 'completed'
                        ? 'primary'
                        : 'danger'
                      }`}
                  >
                    {e.status}
                  </span>
                </td>
                <td className='text-center text-dark fw-bold '>
                  <Link
                    to={`/users/profile/${e.initiated_by.id}/details`}
                    className='text-dark fw-bold text-hover-primary'
                  >
                    <span>{e.initiated_by ? e.initiated_by.name : '---'}</span>
                  </Link>
                </td>
                <td className='text-center'>{e.initiated_at || '---'}</td>
                <td className='text-center'>
                  {e.action_by ? (
                    <Link
                      to={`/users/profile/${e.action_by.id}/details`}
                      className='text-dark fw-bold text-hover-primary'
                    >
                      <span>{e.action_by.name}</span>
                    </Link>
                  ) : (
                    '---'
                  )}
                </td>
                <td className='text-center'>{e.action_at || '---'}</td>
                <td className='text-center'>
                  {e.status.toLowerCase() === 'pending' && (
                    <button
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                      onClick={() => openEditModal({ itemId: e.id, refundReason: e.refund_reason, userId: e.user.id })}
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </button>
                  )}
                  <button
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                    onClick={() => openFundModal({ transactionType: 'wallet_fund', transactionId: e.id, userId: e.user.id })}
                  >
                    <KTIcon iconName='eye' className='fs-3' />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
        {/* end::Table body */}
      </table>
      {/* end::Table */}
      {/* modal */}
      {showEditModal && (
        <EditFundModal
          show={showEditModal}
          onHide={closeEditModal}
          itemDetails={itemDetails}
          onComplete={completeHandler}
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

export default FundsTable
