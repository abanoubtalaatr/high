import React, { useEffect, useState } from 'react'
import { KTIcon } from '../../../../_metronic/helpers'
import { getCountries } from '../_requests'
import CountriesTable from './CountriesTable'
import Pagination from '../../../components/pagination/Pagination'

function CountriesTableWrapper(props) {
  const { refreshTable, startRefreshTable, stopRefresh } = props
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [totalRecord, setTotalRecord] = useState(0)
  const [classAllButton, setClassAllButton] = useState('btn-bg-dark btn-text-white')
  const [classActiveButton, setClassActiveButton] = useState('btn-light')
  const [classInactiveButton, setClassInactiveButton] = useState('btn-light')
  const [parms, setParms] = useState({
    active: '',
    search: '',
    page: 1,
    limit: 15,
  })
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
    buttonId === 'active'
      ? setClassActiveButton('btn-bg-dark btn-text-white')
      : setClassActiveButton('btn-light')
    buttonId === 'inactive'
      ? setClassInactiveButton('btn-bg-dark btn-text-white')
      : setClassInactiveButton('btn-light')
    setParms({ ...parms, active: e, page: 1 })
  }
  const searchHandler = (e) => {
    let inputValue = e.target.value
    setParms({ ...parms, search: inputValue })
  }
  const completeHandler = () => {
    setParms({ ...parms, page: 1 })
    startRefreshTable(true)
  }
  const getItemsHandler = () => {
    getCountries(parms)
      .then((res) => {
        setItems(res.data.data)
        setTotalRecord(res.data.total)
        setIsLoaded(false)
        stopRefresh(true)
      })
      .catch((err) => {
        setErrorMessage(err.message)
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
    <>
      <div className='card'>
        <div className='card-header border-0 pt-5 align-items-end'>
          <div>
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
                className={`btn ${classActiveButton} btn-sm`}
                onClick={(s) => {
                  statusHandler('1', 'active')
                }}
              >
                active
              </button>
              <button
                type='button'
                className={`btn ${classInactiveButton} btn-sm`}
                onClick={(s) => {
                  statusHandler('0', 'inactive')
                }}
              >
                inactive
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
              <span className='spinner-border spinner-border-sm align-middle me-2'></span>
              <span className=''></span> loading ...
            </div>
          ) : errorMessage ? (
            <div className='alert alert-danger d-flex align-items-center  mb-0'>
              <div className='d-flex flex-column'>{errorMessage}</div>
            </div>
          ) : totalRecord === 0 ? (
            <div className='mb-3'>there is no data to display</div>
          ) : (
            <CountriesTable items={items} onComplete={completeHandler} />
          )}
        </div>
        {totalRecord > 0 && (<div className='card-footer'>
          {/* Start Pagination */}
          <Pagination totalRecord={totalRecord} paginationParams={paginationHandler} />
          {/* End Pagination */}
        </div>)}
      </div>
    </>
  )
}

export default CountriesTableWrapper
