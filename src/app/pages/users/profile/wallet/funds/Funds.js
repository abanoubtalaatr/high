import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Select from 'react-select'
import { useIntl } from 'react-intl'
import FundsTable from './FundsTable'
import { getWalletFunds } from '../../../_requests'
import { KTIcon } from '../../../../../../_metronic/helpers'
import AddFundModal from './AddFundModal'
import Pagination from '../../../../../components/pagination/Pagination'

function Funds() {
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
    status: '',
    search: '',
    page: 1,
    limit: recordsPerPage,
  })
  const [classAllButton, setClassAllButton] = useState('btn-bg-dark btn-text-white')
  const [classActiveButton, setClassActiveButton] = useState('btn-light')
  const [classPendingButton, setClassPendingButton] = useState('btn-light')
  const [classInactiveButton, setClassInactiveButton] = useState('btn-light')
  const walletPath = '/users/profile/' + userId + '/wallet'
  const [showAddFundModal, setAddFundModal] = useState(false)

  const openAddFundModal = () => {
    setAddFundModal(true)
  }
  const closeAddFundModal = () => setAddFundModal(false)
  // paginationHandler
  const paginationHandler = (paginationParams) => {
    setParms({ ...parms, ...paginationParams })
  }
  // end paginationHandler
  const statusAllHandler = (e) => {
    setItemsState(e)
    setClassAllButton('btn-bg-dark btn-text-white')
    setClassActiveButton('btn-light')
    setClassInactiveButton('btn-light')
    setClassPendingButton('btn-light')
    setParms({ ...parms, status: '' })
  }
  const statusApprovedHandler = (e) => {
    setItemsState(e)
    setClassActiveButton('btn-bg-dark btn-text-white')
    setClassAllButton('btn-light')
    setClassInactiveButton('btn-light')
    setClassPendingButton('btn-light')
    setParms({ ...parms, status: e })
  }
  const statusPendingHandler = (e) => {
    setItemsState(e)
    setClassInactiveButton('btn-light')
    setClassAllButton('btn-light')
    setClassActiveButton('btn-light')
    setClassPendingButton('btn-bg-dark btn-text-white')
    setParms({ ...parms, status: e })
  }
  const statusNotApprovedHandler = (e) => {
    setItemsState(e)
    setClassInactiveButton('btn-bg-dark btn-text-white')
    setClassAllButton('btn-light')
    setClassActiveButton('btn-light')
    setClassPendingButton('btn-light')
    setParms({ ...parms, status: e })
  }
  const searchHandler = (e) => {
    let inputValue = e.target.value
    setParms({ ...parms, search: inputValue })
  }

  const completeHandler = () => {
    setAddFundModal(false)
    setRefresh(true)
  }
  // get items
  const getItemsHandler = () => {
    getWalletFunds(parms, userId)
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
            <span className='mb-3 fw-bolder'>{`${intl.formatMessage({
              id: 'WALLET',
            })} - ${intl.formatMessage({ id: 'FUNDS' })}`}</span>
          </h5>
        </div>
        <div>
          <div className='card-toolbar gap-3'>
            <div className='d-flex align-items-end flex-column'>
              <div className='card-toolbar gap-3 mb-5'>
                <Link to={walletPath} className='btn btn-light btn-sm btn-flex fw-bold'>
                  <KTIcon iconName='arrow-left' className='fs-3' />
                  <span>{intl.formatMessage({ id: 'BACK' })}</span>
                </Link>
                <button
                  type='button'
                  className='btn btn-primary btn-sm btn-flex fw-bold'
                  onClick={openAddFundModal}
                >
                  <KTIcon iconName='plus' />
                  {intl.formatMessage({ id: 'NEW_FUND' })}
                </button>

                {showAddFundModal && (
                  <AddFundModal
                    show={showAddFundModal}
                    onHide={closeAddFundModal}
                    onComplete={completeHandler}
                  />
                )}
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
          <FundsTable items={items} onComplete={completeHandler} />
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

export default Funds
