import React, { useEffect, useState } from 'react'
import { KTIcon } from '../../../../_metronic/helpers'
import { getDocuments } from './_requests'
import { useParams } from 'react-router-dom'
import DocumentsTable from './DocumentsTable'
import Pagination from '../../../components/pagination/Pagination'
import Spinner from '../../../components/spinner/Spinner'

function DocumentsTableWrapper(props) {
  const { refreshTable, startRefreshTable, stopRefresh, location } = props
  const { codeId } = useParams()
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [totalRecord, setTotalRecord] = useState(0)
  const [classAllButton, setClassAllButton] = useState('btn-bg-dark btn-text-white')
  const [classRequiredButton, setClassRequiredButton] = useState('btn-light')
  const [classNorRequiredButton, setClassNorRequiredButton] = useState('btn-light')
  const [parms, setParms] = useState({
    required: '',
    search: '',
    page: 1,
    limit: 15,
  })

  const completeHandler = () => {
    setParms({ ...parms, page: 1 })
    startRefreshTable(true)
  }
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
    buttonId === 'required'
      ? setClassRequiredButton('btn-bg-dark btn-text-white')
      : setClassRequiredButton('btn-light')
    buttonId === 'not-required'
      ? setClassNorRequiredButton('btn-bg-dark btn-text-white')
      : setClassNorRequiredButton('btn-light')
    setParms({ ...parms, required: e, page: 1 })
  }
  const searchHandler = (e) => {
    let inputValue = e.target.value
    setParms({ ...parms, search: inputValue })
  }
  const getJobsHandler = () => {
    getDocuments(parms, codeId, location)
      .then((res) => {
        setItems(res.data.data)
        setIsLoaded(false)
        setTotalRecord(res.data.total)
        stopRefresh(true)
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
        setIsLoaded(false)
      })
  }
  useEffect(() => {
    setIsLoaded(true)
    getJobsHandler()
  }, [parms])
  useEffect(() => {
    if (refreshTable) {
      setIsLoaded(true)
      getJobsHandler()
    }
  }, [refreshTable])

  return (
    <>
      <div className='card'>
        <div className='card-header border-0 pt-5 align-items-end'>
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
              className={`btn ${classRequiredButton} btn-sm`}
              onClick={(s) => {
                statusHandler('1', 'required')
              }}
            >
              required
            </button>
            <button
              type='button'
              className={`btn ${classNorRequiredButton} btn-sm`}
              onClick={(s) => {
                statusHandler('0', 'not-required')
              }}
            >
              not required
            </button>
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
            <DocumentsTable items={items} onComplete={completeHandler} location={location} />
          )}
        </div>
        <div className='card-footer'>
          {/* Start Pagination */}
          <Pagination totalRecord={totalRecord} paginationParams={paginationHandler} />
          {/* End Pagination */}
        </div>
      </div>
    </>
  )
}

export default DocumentsTableWrapper
