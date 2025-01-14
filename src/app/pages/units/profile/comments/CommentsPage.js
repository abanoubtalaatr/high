import {KTIcon} from '../../../../../_metronic/helpers'
import {FilterDropdown} from './FilterDropdown'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getComments} from '../../_requests'
import Select from 'react-select'
import {useIntl} from 'react-intl'
import CommentsTable from './CommentsTable'
import Pagination from '../../../../components/pagination/Pagination'
import Spinner from '../../../../components/spinner/Spinner'

function CommentsPage() {
  const intl = useIntl()
  const {unitId} = useParams()
  const [refresh, setRefresh] = useState(false)
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [totalRecord, setTotalRecord] = useState(0)
  const [classAllButton, setClassAllButton] = useState('btn-bg-dark btn-text-white')
  const [classApprovedButton, setClassApprovedButton] = useState('btn-light')
  const [classNotApprovedButton, setClassNotApprovedButton] = useState('btn-light')
  const [classPendingButton, setClassPendingButton] = useState('btn-light')
  const [parms, setParms] = useState({
    status: '',
    search: '',
    page: 1,
    limit: 15,
  })

  // paginationHandler
  const paginationHandler = (paginationParams) => {
    setParms({...parms, ...paginationParams})
  }
  // end paginationHandler
  // statusHandler
  const statusHandler = (e, buttonId) => {
    buttonId === 'all'
      ? setClassAllButton('btn-bg-dark btn-text-white')
      : setClassAllButton('btn-light')
    buttonId === 'approved'
      ? setClassApprovedButton('btn-bg-dark btn-text-white')
      : setClassApprovedButton('btn-light')
    buttonId === 'notapproved'
      ? setClassNotApprovedButton('btn-bg-dark btn-text-white')
      : setClassNotApprovedButton('btn-light')
    buttonId === 'pending'
      ? setClassPendingButton('btn-bg-dark btn-text-white')
      : setClassPendingButton('btn-light')
      
    setParms({...parms, status: e, page: 1})
  }
  const searchHandler = (e) => {
    let inputValue = e.target.value
    setParms({...parms, search: inputValue})
  }
  const completeHandler = () => {
    setRefresh(true)
  }
  // get items
  const getItemsHandler = () => {
    getComments(parms, unitId)
      .then((res) => {
        setItems(res.data.data)
        setIsLoaded(false)
        setTotalRecord(res.data.total)
        setRefresh(false)
      })
      .catch((err) => {
        setErrorMessage(err.message)
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
      <div className='card-header border-0 pt-5 align-items-end'>
        <div className=''>
          <h5 className='card-title align-items-start flex-column'>
            <span className='mb-3 fw-bolder'>{intl.formatMessage({id: 'COMMENTS'})}</span>
          </h5>
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
                statusHandler('published', 'pending')
              }}
            >
              published
            </button>
            <button
              type='button'
              className={`btn ${classApprovedButton} btn-sm`}
              onClick={(s) => {
                statusHandler('deletion_request', 'approved')
              }}
            >
              deletion request
            </button>
            <button
              type='button'
              className={`btn ${classNotApprovedButton} btn-sm`}
              onClick={(s) => {
                statusHandler('deleted', 'notapproved')
              }}
            >
              deleted
            </button>
          </div>
        </div>
        <div>
          <div className='card-toolbar gap-3'>
            <span className='w-lg-350px w-100'>
              <div className='d-flex align-items-center position-relative'>
                <KTIcon
                  iconName='magnifier'
                  className='fs-3 text-muted me-1 ms-4 position-absolute '
                />
                <input
                  type='search'
                  className='form-control form-control-solid form-control-sm ps-12'
                  placeholder='search by user name'
                  name='target_title'
                  onChange={searchHandler}
                />
              </div>
            </span>
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
          <CommentsTable items={items} onComplete={completeHandler} />
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
export default CommentsPage
