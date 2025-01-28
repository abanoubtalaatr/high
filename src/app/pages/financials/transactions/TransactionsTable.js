
import { useState } from 'react'
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
        <thead className='fs-6'>
          <tr className='bg-light'>
            <th className='min-w-100px'>partner</th>
            <th className='min-w-100px '>location</th>
            <th className='min-w-100px'>booking</th>
            <th className='min-w-100px'>public event</th>
            <th className='min-w-100px'>all revenues</th>
            <th className='min-w-100px text-center'>date</th>
            <th className='min-w-100px text-center'>Actions</th>
          </tr>
        </thead>
        {/* end::Table head */}
        {/* begin::Table body */}
        <tbody className='fs-6'>
          <tr>
            <td>
              <div className='d-flex align-items-center'>
                <div className='symbol symbol-45px me-5'>
                  <img
                    src={toAbsoluteUrl('/media/avatars/blank.png')}
                    alt={'name'}
                    onError={imageErrorHandler}
                  />
                </div>
                <div className='d-flex justify-content-start flex-column'>
                  <span className='text-dark fw-bold fs-6'>partner name</span>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>
                    #32323
                  </span>
                </div>
              </div>
            </td>
            <td>
              <div className='d-flex justify-content-start flex-column gap-2'>
                <span>countr name</span>
                <span>state name</span>
                <span>city name</span>
              </div>
            </td>
            <td>
              <div className='d-flex justify-content-start flex-column gap-2'>
                <div className='d-flex'>
                  <span style={{ width: '60px' }}>cash</span>
                  <span>1000</span>
                </div>
                <div className='d-flex'>
                  <span style={{ width: '60px' }}>online</span>
                  <span>1000</span>
                </div>
                <div className='d-flex text-dark fw-bold'>
                  <span class style={{ width: '60px' }}>total</span>
                  <span>1000</span>
                </div>
              </div>
            </td>
            <td>
              <div className='d-flex justify-content-start flex-column gap-2'>
                <div className='d-flex'>
                  <span style={{ width: '60px' }}>cash</span>
                  <span>1000</span>
                </div>
                <div className='d-flex'>
                  <span style={{ width: '60px' }}>online</span>
                  <span>1000</span>
                </div>
                <div className='d-flex text-dark fw-bold'>
                  <span style={{ width: '60px' }}>total</span>
                  <span>1000</span>
                </div>
              </div>
            </td>
            <td>
              <div className='d-flex justify-content-start flex-column gap-2'>
                <div className='d-flex'>
                  <span style={{ width: '60px' }}>cash</span>
                  <span>1000</span>
                </div>
                <div className='d-flex'>
                  <span style={{ width: '60px' }}>online</span>
                  <span>1000</span>
                </div>
                <div className='d-flex text-dark fw-bold'>
                  <span style={{ width: '60px' }}>total</span>
                  <span>1000</span>
                </div>
              </div>
            </td>
            <td className='text-center'>
              02/2024
            </td>
            <td className='text-center'>
              <Link
                to={`/partners/profile/33/financials`}
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
              >
                <KTIcon iconName='eye' className='fs-3' />
              </Link>
            </td>
          </tr>
          
        </tbody>
        {/* end::Table body */}
      </table>
      {/* end::Table */}
    </div >
  )
}

export default TransactionsTable
