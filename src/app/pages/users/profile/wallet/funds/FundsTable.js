import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { KTIcon } from '../../../../../../_metronic/helpers'
import EditFundModal from './EditFundModal'
import FundModal from '../FundModal'

function FundsTable(props) {
  const { items, onComplete } = props
  const [itemID, setItemId] = useState('')
  const [itemDetails, setItemDetails] = useState('')
  const [refundReason, setRefundReason] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showFundModal, setShowFundModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const openEditModal = (itemId, refundReason) => {
    setShowEditModal(true)
    setItemId(itemId)
    setRefundReason(refundReason)
  }
  const openFundModal = (item) => {
    setShowFundModal(true)
    setItemDetails(item)
  }
  const closeFundModal = () => setShowFundModal(false)
  const closeEditModal = () => setShowEditModal(false)
  const completeHandler = () => {
    setShowEditModal(false)
    onComplete(true)
  }

  return (
    <div className='table-responsive'>
      {/* begin::Table */}
      <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
        {/* begin::Table head */}
        <thead>
          <tr className='bg-light'>
            <th className='min-w-100px'>id</th>
            <th className='min-w-100px text-center'>amount</th>
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
              <tr key={e.id}>
                <td className=''>{e.id}</td>
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
                <td className='text-center'>
                  <Link
                    to={`/users/profile/${e.initiated_by.id}/details`}
                    className='text-dark fw-bold text-hover-primary'
                  >
                    <span>{e.initiated_by ? e.initiated_by.name : '---'}</span>
                  </Link>
                </td>
                <td className='text-center'>{e.initiated_at || '---'}</td>
                <td className='text-center'>
                  {e.user ? (
                    <Link
                      to={`/users/profile/${e.user.id}/details`}
                      className='text-dark fw-bold text-hover-primary'
                    >
                      <span>{e.user.name}</span>
                    </Link>
                  ) : (
                    '---'
                  )}
                </td>
                <td className='text-center'>{e.initiated_at || '---'}</td>
                <td className='text-center'>
                  {e.status.toLowerCase() === 'pending' && (
                    <button
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                      onClick={() => openEditModal(e.id, e.refund_reason)}
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </button>
                  )}
                  <button
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                    onClick={() => openFundModal({ transactionType: 'wallet_fund', transactionId: e.id })}
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
          onComplete={completeHandler}
          itemId={itemID}
          refundReason={refundReason}
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
