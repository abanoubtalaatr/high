import {KTIcon} from '../../../../../_metronic/helpers'
import PublicEventsTable from './PublicEventsTable'
import {FilterDropdown} from './FilterDropdown'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getPublicEvents} from '../../_requests'
import Select from 'react-select'
import {useIntl} from 'react-intl'

function PublicEvents() {
  const intl = useIntl()
  const {userId} = useParams()
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
    date_from: '',
    date_to: '',
    activity_category_id: '',
    activity_id: '',
    gender: '',
    age_group_id: '',
    page: 1,
    limit: recordsPerPage,
  })
  const [classAllButton, setClassAllButton] = useState('btn-bg-dark btn-text-white')
  const [classComingButton, setClassComingButton] = useState('btn-light')
  const [classEndedButton, setClassEndedButton] = useState('btn-light')
  const [classCanceledButton, setClassCanceledButton] = useState('btn-light')

  const statusAllHandler = (e) => {
    setItemsState(e)
    setClassAllButton('btn-bg-dark btn-text-white')
    setClassComingButton('btn-light')
    setClassEndedButton('btn-light')
    setClassCanceledButton('btn-light')
    setParms({...parms, status: ''})
  }
  const statusComigHandler = (e) => {
    setItemsState(e)
    setClassComingButton('btn-bg-dark btn-text-white')
    setClassAllButton('btn-light')
    setClassEndedButton('btn-light')
    setClassCanceledButton('btn-light')
    setParms({...parms, status: e})
  }
  const statusEndedHandler = (e) => {
    setItemsState(e)
    setClassEndedButton('btn-bg-dark btn-text-white')
    setClassAllButton('btn-light')
    setClassComingButton('btn-light')
    setClassCanceledButton('btn-light')
    setParms({...parms, status: e})
  }
  const statusCanceledHandler = (e) => {
    setItemsState(e)
    setClassCanceledButton('btn-bg-dark btn-text-white')
    setClassEndedButton('btn-light')
    setClassAllButton('btn-light')
    setClassComingButton('btn-light')
    setParms({...parms, status: e})
  }

  const searchHandler = (e) => {
    let inputValue = e.target.value
    setParms({...parms, search: inputValue})
  }

  const filterHandler = (
    date_from,
    date_to,
    activity_category_id,
    activity_id,
    gender,
    age_group_id
  ) => {
    setParms({
      ...parms,
      date_from: date_from,
      date_to: date_to,
      activity_category_id: activity_category_id,
      activity_id: activity_id,
      gender: gender,
      age_group_id: age_group_id,
    })
  }
  const resetFilterHandler = () => {
    setParms({...parms, country_id: '', state_id: '', city_id: ''})
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

  // get items
  const getItemsHandler = () => {
    getPublicEvents(parms, userId)
      .then((res) => {
        setapiRespone(true)
        setItems(res.data.data)
        setIsLoaded(false)
        setTotalRecord(res.data.total || 0)
      })
      .catch((err) => {
        setapiRespone(true)
        setErrorMessage(err.response.data.message)
        setIsLoaded(false)
      })
  }

  useEffect(() => {
    setIsLoaded(true)
    getItemsHandler()
  }, [parms])

  useEffect(() => {
    setIsLoaded(true)
    getItemsHandler()
    resetPagination(1)
  }, [recordsPerPage])

  return (
    <div className='card mb-10'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5 align-items-end'>
        <div className=''>
          <h5 className='card-title align-items-start flex-column'>
            <span className='mb-3 fw-bolder'>{intl.formatMessage({id: 'PUBLIC_EVENTS'})}</span>
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
              className={`btn ${classComingButton} btn-sm`}
              onClick={() => statusComigHandler('coming')}
            >
              coming
            </button>
            <button
              type='button'
              className={`btn ${classEndedButton} btn-sm`}
              onClick={() => statusEndedHandler('ended')}
            >
              ended
            </button>
            <button
              type='button'
              className={`btn ${classCanceledButton} btn-sm`}
              onClick={() => statusCanceledHandler('cancelled')}
            >
              cancelled
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
                  placeholder='search by unit name or id'
                  name='target_title'
                  onChange={searchHandler}
                />
              </div>
            </span>
            <span>
              <button
                type='button'
                className='btn btn-light btn-sm btn-flex fw-bold'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
                data-kt-menu-static='true'
              >
                <KTIcon iconName='filter' className='fs-6 text-muted me-1' />
                Filter
              </button>
              <FilterDropdown onAplly={filterHandler} onReset={resetFilterHandler} />
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
          <PublicEventsTable items={items} />
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

export default PublicEvents
