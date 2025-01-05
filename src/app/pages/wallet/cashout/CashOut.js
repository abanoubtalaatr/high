import { useEffect, useState } from 'react'
import Pagination from '../../../components/pagination/Pagination'
import Spinner from '../../../components/spinner/Spinner'
import { getCashOut } from '../_requests'
import { KTIcon } from '../../../../_metronic/helpers'
import CashOutTable from './CashOutTable'
import { useParams } from 'react-router-dom'

function CashOut(props) {
  const { refreshTable, startRefreshTable, stopRefresh } = props
  const { iso } = useParams()
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
  const [classCompletedButton, setClassCompletedButton] = useState('btn-light')
  const [classPendingButton, setClassPendingButton] = useState('btn-light')
  const [classRejectedButton, setClassRejectedButton] = useState('btn-light')

  // paginationHandler
  const paginationHandler = (paginationParams) => {
    setParms({ ...parms, ...paginationParams })
  }
  // end paginationHandler
  // statusHandler
  const statusHandler = (e, buttonId) => {
    buttonId === 'all'
      ? setClassAllButton('btn-bg-dark btn-text-white')
      : setClassAllButton('btn-light')
    buttonId === 'pending'
      ? setClassPendingButton('btn-bg-dark btn-text-white')
      : setClassPendingButton('btn-light')
    buttonId === 'completed'
      ? setClassCompletedButton('btn-bg-dark btn-text-white')
      : setClassCompletedButton('btn-light')
    buttonId === 'Rejected'
      ? setClassRejectedButton('btn-bg-dark btn-text-white')
      : setClassRejectedButton('btn-light')
    setParms({ ...parms, status: e, page: 1 })
  }
  const searchHandler = (e) => {
    let inputValue = e.target.value
    setParms({ ...parms, search: inputValue })
  }
  const completeHandler = () => {
    startRefreshTable(true)
  }
  // get items
  const getItemsHandler = () => {
    getCashOut(iso, parms)
      .then((res) => {
        setItems(res.data.data)
        setIsLoaded(false)
        stopRefresh(true)
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
  useEffect(() => {
    if (refreshTable) {
      setIsLoaded(true)
      getItemsHandler()
    }
  }, [refreshTable])

  return (
    <div className='card'>
      <div className='card-header border-0 pt-5 align-items-end'>
        <div className=''>
          <div className='card-toolbar gap-3'>
            <button
              type='button'
              className={`btn ${classAllButton} btn-sm`}
              onClick={(s) => {
                statusHandler(' ', 'all')
              }}
            >
              all
            </button>
            <button
              type='button'
              className={`btn ${classPendingButton} btn-sm`}
              onClick={(s) => {
                statusHandler('pending', 'pending')
              }}
            >
              pending
            </button>
            <button
              type='button'
              className={`btn ${classCompletedButton} btn-sm`}
              onClick={(s) => {
                statusHandler('completed', 'completed')
              }}
            >
              completed
            </button>
            <button
              type='button'
              className={`btn ${classRejectedButton} btn-sm`}
              onClick={(s) => {
                statusHandler('rejected', 'rejected')
              }}
            >
              rejected
            </button>
          </div>
        </div>
        <div>
          <div className='card-toolbar gap-3 mb-5 '>
            <span className='w-lg-350px w-100'>
              <div className='d-flex align-items-center position-relative'>
                <KTIcon
                  iconName='magnifier'
                  className='fs-3 text-muted me-1 ms-4 position-absolute '
                />
                <input
                  type='search'
                  className='form-control form-control-solid form-control-sm ps-12'
                  placeholder='search by name'
                  name='target_title'
                  onChange={searchHandler}
                />
              </div>
            </span>
          </div>
        </div>
      </div>
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
          <CashOutTable items={items} onComplete={completeHandler} />
        )}
      </div>
      <div className='card-footer'>
        {/* Start Pagination */}
        <Pagination totalRecord={totalRecord} paginationParams={paginationHandler} />
        {/* End Pagination */}
      </div>
    </div>

  )
}

export default CashOut
