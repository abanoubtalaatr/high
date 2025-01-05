import { useEffect, useState } from 'react'
import Pagination from '../../../components/pagination/Pagination'
import Spinner from '../../../components/spinner/Spinner'
import { KTIcon } from '../../../../_metronic/helpers'
import { Link, useParams } from 'react-router-dom'
import TransactionsTable from './TransactionsTable'
import { getTransactions } from '../_requests'
import { useIntl } from 'react-intl'

function Transactions() {
  const { iso } = useParams()
  const userId = 15
  const [totalRecord, setTotalRecord] = useState(0)
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [parms, setParms] = useState({
    status: '',
    search: '',
    page: 1,
    limit: 15,
  })
  const [classAllButton, setClassAllButton] = useState('btn-bg-dark btn-text-white')
  const [classInButton, setClassInButton] = useState('btn-light')
  const [classOutButton, setClassOutButton] = useState('btn-light')
  const fundsPath = '/users/profile/' + userId + '/wallet/funds'
  const cashOutPath = '/users/profile/' + userId + '/wallet/cash-out'
  // statusHandler
  const statusHandler = (e, buttonId) => {
    buttonId === 'all'
      ? setClassAllButton('btn-bg-dark btn-text-white')
      : setClassAllButton('btn-light')
    buttonId === 'in'
      ? setClassInButton('btn-bg-dark btn-text-white')
      : setClassInButton('btn-light')
    buttonId === 'out'
      ? setClassOutButton('btn-bg-dark btn-text-white')
      : setClassOutButton('btn-light')
    setParms({ ...parms, type: e, page: 1 })
  }
  const searchHandler = (e) => {
    let inputValue = e.target.value
    setParms({ ...parms, search: inputValue })
  }
  // paginationHandler
  const paginationHandler = (paginationParams) => {
    setParms({ ...parms, ...paginationParams })
  }
  // end paginationHandler

  // get items
  const getItemsHandler = () => {
    getTransactions(iso, parms)
      .then((res) => {
        setItems(res.data.data)
        setIsLoaded(false)
        setTotalRecord(res.data.total)
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
        setIsLoaded(false)
      })
  }

  useEffect(() => {
    setIsLoaded(true)
    getItemsHandler()
  }, [parms])

  return (
    <div className='card'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5 align-items-end'>
        <div className=''>
          <div className='card-toolbar gap-3'>
            <button
              type='button'
              className={`btn ${classAllButton} btn-sm`}
              onClick={(s) => {
                statusHandler('all', 'all')
              }}
            >
              all
            </button>
            <button
              type='button'
              className={`btn ${classInButton} btn-sm`}
              onClick={(s) => {
                statusHandler('in', 'in')
              }}
            >
              in
            </button>
            <button
              type='button'
              className={`btn ${classOutButton} btn-sm`}
              onClick={(s) => {
                statusHandler('out', 'out')
              }}
            >
              out
            </button>
          </div>
        </div>
        <div>
          <div className='card-toolbar gap-3'>
            <div className='d-flex align-items-end flex-column'>

              <span className='w-lg-350px w-100'>
                <div className='d-flex align-items-center position-relative'>
                  <KTIcon
                    iconName='magnifier'
                    className='fs-3 text-muted me-1 ms-4 position-absolute '
                  />
                  <input
                    type='search'
                    className='form-control form-control-solid form-control-sm ps-12'
                    placeholder='search by transaction id'
                    name='target_title'
                    onChange={searchHandler}
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {isLoaded ? (
          <div className='mb-3'>
            <Spinner contentText={'loading ...'} />
          </div>
        ) : errorMessage ? (
          <div className={`alert alert-danger d-flex align-items-center p-5 mb-0`}>
            <div className='d-flex flex-column'>{errorMessage}</div>
          </div>
        ) : totalRecord === 0 ? (
          <div className='mb-3'>there is no data to display</div>
        ) : (
          <TransactionsTable items={items} />
        )}
      </div>
      {/* begin::footer */}
      {totalRecord > 0 && (<div className='card-footer'>
        {/* Start Pagination */}
        <Pagination totalRecord={totalRecord} paginationParams={paginationHandler} />
        {/* End Pagination */}
      </div>)}
    </div>
  )
}

export default Transactions
