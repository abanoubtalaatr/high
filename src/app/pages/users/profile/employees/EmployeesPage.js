import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getEmployees} from '../../_requests'
import Select from 'react-select'
import EmployeesTable from './EmployeesTable'
import {useIntl} from 'react-intl'

function EmployeesPage() {
  const intl = useIntl()
  const {unitId} = useParams()
  const [apiRespone, setapiRespone] = useState(false)
  const [items, setItems] = useState([])
  const [totalRecord, setTotalRecord] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [recordsPerPage, setRecordsPerPage] = useState(15)
  const [parms, setParms] = useState({
    status: '',
    search: '',
    page: 1,
    limit: recordsPerPage,
  })

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
    getEmployees(parms, unitId)
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
    <div className='card'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5 align-items-end'>
        <h5 className='card-title align-items-start flex-column'>
          <span className='mb-3 fw-bolder'>{intl.formatMessage({id: 'EMPLOYEES'})}</span>
        </h5>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {!apiRespone || isLoaded ? (
          'loading ...'
        ) : errorMessage ? (
          <div className={`alert alert-danger d-flex align-items-center p-5 mb-0`}>
            <div className='d-flex flex-column'>{errorMessage}</div>
          </div>
        ) : items.length === 0 ? (
          'no data'
        ) : (
          <EmployeesTable items={items} />
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

export default EmployeesPage
