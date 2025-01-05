import { useEffect, useState } from 'react'
import Select from 'react-select'
function Pagination(props) {
  const { totalRecord, paginationParams } = props
  const [recordsPerPage, setRecordsPerPage] = useState(15)
  const [currnetPage, setCurrentPage] = useState(1)
  const [firstRecord, setFirstRecord] = useState(1)
  const [lastRecord, setLastRecord] = useState(currnetPage * recordsPerPage)
  const [parms, setParms] = useState({
    page: 1,
    limit: 15,
  })
  const recordsPerPageOptions = [
    { value: '15', label: '15' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
  ]
  const lastRecordHandler = (n) => {
    const index = n * recordsPerPage
    index > totalRecord ? setLastRecord(totalRecord) : setLastRecord(index)
  }
  const firstRecordHandler = (n) => {
    const index = n * recordsPerPage - recordsPerPage
    totalRecord > 0 ? setFirstRecord(index + 1) : setFirstRecord(index)
  }
  const npage = totalRecord ? Math.ceil(totalRecord / recordsPerPage) : recordsPerPage
  const numbers = [...Array(npage + 1).keys()].slice(1)

  const pagehHandler = (n) => {
    firstRecordHandler(n)
    lastRecordHandler(n)
    setCurrentPage(n)
    paginationParams({ ...parms, page: n })
    setParms({ ...parms, page: n })
  }
  const prevPagehHandler = () => {
    firstRecordHandler(currnetPage - 1)
    lastRecordHandler(currnetPage - 1)
    setCurrentPage(currnetPage - 1)
    paginationParams({ ...parms, page: currnetPage - 1 })
    setParms({ ...parms, page: currnetPage - 1 })
  }
  const nextPagehHandler = () => {
    firstRecordHandler(currnetPage + 1)
    lastRecordHandler(currnetPage + 1)
    setCurrentPage(currnetPage + 1)
    paginationParams({ ...parms, page: currnetPage + 1 })
    setParms({ ...parms, page: currnetPage + 1 })
  }
  const resetPagination = () => {
    firstRecordHandler(1)
    lastRecordHandler(1)
    setCurrentPage(1)
    // paginationParams({ ...parms, page: 1 })
    // setParms({ ...parms, page: 1 })
  }
  const recordsPerPageHandler = (option) => {
    setRecordsPerPage(option)
    setCurrentPage(1)
    paginationParams({ ...parms, page: 1, limit: option })
    setParms({ ...parms, page: 1, limit: option })
  }
  useEffect(() => {
    resetPagination()
  }, [totalRecord])
  useEffect(() => {
    firstRecordHandler(1)
    lastRecordHandler(1)
  }, [recordsPerPage])
  return (
    <>
      {totalRecord > 0 && (
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
      )}
    </>
  )
}
export default Pagination
