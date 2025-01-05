import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers'
import ExchangeModal from './ExchangeModal'

function ExchangesTable(props) {
  const { items } = props
  const [itemDetails, setItemDetails] = useState('')
  const [showExchangeModal, setShowExchangeModal] = useState(false)

  const openExchangeModal = (item) => {
    setShowExchangeModal(true)
    setItemDetails(item)
  }
  const closeExchangeModal = () => setShowExchangeModal(false)

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
            <th className='min-w-150px text-center'>date & time</th>
            <th className='min-w-100px text-center'>transaction</th>
            <th className='min-w-100px text-center'>giving amount</th>
            <th className='min-w-100px text-center'>currency</th>
            <th className='min-w-100px text-center'>exchanged amount</th>
            <th className='min-w-100px text-center'>exchanged currency</th>
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
                <td className='text-center'>{e.create_at || '---'}</td>
                <td className='text-center'>
                  <div className='d-flex justify-content-start flex-column'>
                    {e.transaction || '---'}
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>{e.info ? e.info.description : '---'}</span>
                  </div>
                </td>
                <td className='text-center'>{e.amount || '0'}</td>
                <td className='text-center'>
                  <div className='d-flex justify-content-start flex-column'>
                    {e.currency || '---'}
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>{e.country || '---'}</span>
                  </div>
                </td>
                <td className='text-center'>{e.exchanged_amount || '0'}</td>
                <td className='text-center'>
                  <div className='d-flex justify-content-start flex-column'>
                    {e.exchanged_currency || '---'}
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>{e.exchanged_country || '---'}</span>
                  </div>
                </td>
                <td className='text-center'>
                  <button
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                    onClick={() => openExchangeModal(e)}
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
      {showExchangeModal && (
        <ExchangeModal
          show={showExchangeModal}
          onHide={closeExchangeModal}
          itemDetails={itemDetails}
        />
      )}
    </div>
  )
}

export default ExchangesTable
