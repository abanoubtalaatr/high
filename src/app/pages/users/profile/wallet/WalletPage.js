import { KTIcon } from '../../../../../_metronic/helpers'
import { FilterDropdown } from './FilterDropdown'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getWallet } from '../../_requests'
import Select from 'react-select'
import { useIntl } from 'react-intl'
import WalletTable from './WalletTable'
import Pagination from '../../../../components/pagination/Pagination'

function WalletPage() {
  const intl = useIntl()
  const { userId } = useParams()
  const [refresh, setRefresh] = useState(false)
  const [apiRespone, setapiRespone] = useState(false)
  const [items, setItems] = useState([])
  const [totalRecord, setTotalRecord] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [itemsState, setItemsState] = useState('all')
  const [recordsPerPage, setRecordsPerPage] = useState(15)
  const [parms, setParms] = useState({
    type: '',
    search: '',
    page: 1,
    limit: recordsPerPage,
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

  const resetFilterHandler = () => {
    setParms({ ...parms, country_id: '', state_id: '', city_id: '' })
  }
  const completeHandler = () => {
    setParms({ ...parms, page: 1 })
    setRefresh(true)
  }
  // get items
  const getItemsHandler = () => {
    getWallet(parms, userId)
      .then((res) => {
        setapiRespone(true)
        setItems(res.data.data)
        setIsLoaded(false)
        setTotalRecord(res.data.total || 0)
        setRefresh(false)
      })
      .catch((err) => {
        setapiRespone(true)
        setErrorMessage(err.response.data.message)
        setIsLoaded(false)
        setRefresh(false)
      })
  }

  useEffect(() => {
    setIsLoaded(true)
    getItemsHandler()
  }, [parms])

  useEffect(() => {
    if (refresh) {
      setIsLoaded(true)
      getItemsHandler()
    }
  }, [refresh])

  return (
    <div className='card'>
      {/* begin::Header */}
      <div className='card-header pt-5'>
        <div className=''>
          <h5 className='card-title align-items-start flex-column'>
            <span className='mb-3 fw-bolder'>{intl.formatMessage({ id: 'WALLET' })}</span>
          </h5>
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
              <div className='card-toolbar gap-3 mb-5'>
                <Link to={cashOutPath} className='btn btn-light btn-sm btn-flex fw-bold'>
                  <KTIcon iconName='arrow-up' className='fs-6 text-muted me-1' />
                  cash out
                  <KTIcon iconName='abstract-5' className='fs-6 text-danger ms-3' />
                </Link>
                <Link to={fundsPath} className='btn btn-light btn-sm btn-flex fw-bold'>
                  <KTIcon iconName='arrow-down' className='fs-6 text-muted me-1' />
                  funds
                  <KTIcon iconName='abstract-5' className='fs-6 text-danger ms-3' />
                </Link>
              </div>
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
        {!apiRespone || isLoaded ? (
          'loading ...'
        ) : !itemsState ? (
          <div className={`alert alert-danger d-flex align-items-center p-5 mb-0`}>
            <div className='d-flex flex-column'>{errorMessage}</div>
          </div>
        ) : items.length === 0 ? (
          'no data'
        ) : (
          <WalletTable items={items} />
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

export default WalletPage
