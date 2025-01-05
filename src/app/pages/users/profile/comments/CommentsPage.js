import {KTIcon} from '../../../../../_metronic/helpers'
import {FilterDropdown} from './FilterDropdown'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getComments} from '../../_requests'
import Select from 'react-select'
import {useIntl} from 'react-intl'
import CommentsTable from './CommentsTable'

function CommentsPage() {
  const intl = useIntl()
  const {userId} = useParams()
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

  const statusAllHandler = (e) => {
    setItemsState(e)
    setClassAllButton('btn-bg-dark btn-text-white')
    setClassActiveButton('btn-light')
    setClassInactiveButton('btn-light')
    setClassPendingButton('btn-light')
    setParms({...parms, status: ''})
  }
  const statusApprovedHandler = (e) => {
    setItemsState(e)
    setClassActiveButton('btn-bg-dark btn-text-white')
    setClassAllButton('btn-light')
    setClassInactiveButton('btn-light')
    setClassPendingButton('btn-light')
    setParms({...parms, status: e})
  }
  const statusPendingHandler = (e) => {
    setItemsState(e)
    setClassInactiveButton('btn-light')
    setClassAllButton('btn-light')
    setClassActiveButton('btn-light')
    setClassPendingButton('btn-bg-dark btn-text-white')
    setParms({...parms, status: e})
  }
  const statusNotApprovedHandler = (e) => {
    setItemsState(e)
    setClassInactiveButton('btn-bg-dark btn-text-white')
    setClassAllButton('btn-light')
    setClassActiveButton('btn-light')
    setClassPendingButton('btn-light')
    setParms({...parms, status: e})
  }
  const searchHandler = (e) => {
    let inputValue = e.target.value
    setParms({...parms, search: inputValue})
  }
  // pagination
  const [currnetPage, setCurrentPage] = useState(1)
  const [firstRecord, setFirstRecord] = useState(1)
  const [lastRecord, setLastRecord] = useState(currnetPage * recordsPerPage)
  const recordsPerPageOptions = [
    {value: '15', label: '15'},
    {value: '50', label: '50'},
    {value: '100', label: '100'},
  ]
  const lastRecordHandler = (n) => {
    const index = n * recordsPerPage
    index > totalRecord ? setLastRecord(totalRecord) : setLastRecord(index)
  }
  const firstRecordHandler = (n) => {
    const index = n * recordsPerPage - recordsPerPage
    totalRecord > 0 ? setFirstRecord(index + 1) : setFirstRecord(index)
  }
  const npage = Math.ceil(totalRecord / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)
  const pagehHandler = (n) => {
    firstRecordHandler(n)
    lastRecordHandler(n)
    setCurrentPage(n)
    setParms({...parms, page: n, limit: recordsPerPage})
  }
  const prevPagehHandler = () => {
    firstRecordHandler(currnetPage - 1)
    lastRecordHandler(currnetPage - 1)
    setCurrentPage(currnetPage - 1)
    setParms({...parms, page: currnetPage - 1, limit: recordsPerPage})
  }
  const nextPagehHandler = () => {
    firstRecordHandler(currnetPage + 1)
    lastRecordHandler(currnetPage + 1)
    setCurrentPage(currnetPage + 1)
    setParms({...parms, page: currnetPage + 1, limit: recordsPerPage})
  }
  const resetPagination = (n) => {
    firstRecordHandler(n)
    lastRecordHandler(n)
    setCurrentPage(n)
    setParms({...parms, page: n, limit: recordsPerPage})
  }
  const recordsPerPageHandler = (option) => {
    setRecordsPerPage(option)
  }
  const filterHandler = (activity_category_id, activity_id, type_id, capacity, availability) => {
    setParms({
      ...parms,
      activity_category_id: activity_category_id,
      activity_id: activity_id,
      type_id: type_id,
      capacity: capacity,
      availability: availability,
    })
  }
  const resetFilterHandler = () => {
    setParms({...parms, country_id: '', state_id: '', city_id: ''})
  }
  const completeHandler = () => {
    setRefresh(true)
  }
  // get items
  const getItemsHandler = () => {
    getComments(parms, userId)
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

  useEffect(() => {
    setIsLoaded(true)
    getItemsHandler()
    resetPagination(1)
  }, [recordsPerPage])

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
              onClick={() => statusAllHandler('all')}
            >
              all
            </button>
            <button
              type='button'
              className={`btn ${classPendingButton} btn-sm`}
              onClick={() => statusPendingHandler('2')}
            >
              published
            </button>
            <button
              type='button'
              className={`btn ${classActiveButton} btn-sm`}
              onClick={() => statusApprovedHandler('1')}
            >
              deletion request
            </button>
            <button
              type='button'
              className={`btn ${classInactiveButton} btn-sm`}
              onClick={() => statusNotApprovedHandler('0')}
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
                  placeholder='Search by comment, company, unit'
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
        {!apiRespone || isLoaded ? (
          'loading ...'
        ) : !itemsState ? (
          <div className={`alert alert-danger d-flex align-items-center p-5 mb-0`}>
            <div className='d-flex flex-column'>{errorMessage}</div>
          </div>
        ) : items.length === 0 ? (
          'no data'
        ) : (
          <CommentsTable items={items} onComplete={completeHandler} />
        )}
      </div>
      {/* begin::Body */}
      <div className='card-footer'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='text-muted'>
            showing {firstRecord} to {lastRecord} of {totalRecord} items
          </div>
          <div className='text-muted d-flex align-items-center'>
            <span className='me-3'>show:</span>
            <Select
              className='me-3'
              defaultValue={recordsPerPageOptions[0]}
              options={recordsPerPageOptions}
              onChange={(selectedOption) => recordsPerPageHandler(selectedOption.value)}
            />
            <span>items</span>
          </div>

          {numbers.length > 0 ? (
            <ul className='pagination'>
              <li className={`page-item ${currnetPage === 1 ? 'disabled' : ''}`}>
                {currnetPage === 1 ? (
                  <span className='page-link'>first</span>
                ) : (
                  <button type='button' className='page-link' onClick={() => pagehHandler(1)}>
                    first
                  </button>
                )}
              </li>
              <li className={`page-item previous ${currnetPage === 1 ? 'disabled' : ''}`}>
                {currnetPage === 1 ? (
                  <span className='page-link'>
                    <i className='previous'></i>
                  </span>
                ) : (
                  <button type='button' className='page-link' onClick={() => prevPagehHandler()}>
                    <i className='previous'></i>
                  </button>
                )}
              </li>
              {numbers.map((n, i) => (
                <li className={`page-item ${currnetPage === n ? 'active' : ''}`} key={i}>
                  {currnetPage === n ? (
                    <span className='page-link'>{n}</span>
                  ) : (
                    <button type='button' className='page-link' onClick={() => pagehHandler(n)}>
                      {n}
                    </button>
                  )}
                </li>
              ))}
              <li className={`page-item next ${currnetPage === npage ? 'disabled' : ''}`}>
                {currnetPage === npage ? (
                  <span className='page-link'>
                    <i className='next'></i>
                  </span>
                ) : (
                  <button
                    type='button'
                    className='page-link'
                    onClick={() => nextPagehHandler(npage)}
                  >
                    <i className='next'></i>
                  </button>
                )}
              </li>
              <li className={`page-item ${currnetPage === npage ? 'disabled' : ''}`}>
                {currnetPage === npage ? (
                  <span className='page-link'>last</span>
                ) : (
                  <button type='button' className='page-link' onClick={() => pagehHandler(npage)}>
                    last
                  </button>
                )}
              </li>
            </ul>
          ) : (
            <span className='text-muted'>no pages</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentsPage
