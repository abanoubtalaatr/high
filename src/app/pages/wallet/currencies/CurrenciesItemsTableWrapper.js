import React, { useEffect, useState } from 'react'
import { KTIcon } from '../../../../_metronic/helpers'
import { getCurrencies, getGeneralCurrencies } from '../_requests'
import ItemsTable from './ItemsTable'
import Spinner from '../../../components/spinner/Spinner'
import Pagination from '../../../components/pagination/Pagination'
import Select from 'react-select'

function CurrenciesItemsTableWrapper(props) {
  const { refreshTable, startRefreshTable, stopRefresh } = props
  const DefOptions = [{ value: 'SAR', label: 'SAR' }]
  const loadOptions = [{ value: '', label: 'loading ...' }]
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [totalRecord, setTotalRecord] = useState(0)
  const [classAllButton, setClassAllButton] = useState('btn-bg-dark btn-text-white')
  const [classActiveButton, setClassActiveButton] = useState('btn-light')
  const [classInactiveButton, setClassInactiveButton] = useState('btn-light')
  const [isCurrenciesLoading, setIsCurrenciesLoading] = useState(false)
  const [isCurrenciesDisabled, setIsCurrenciesDisabled] = useState(false)
  const [CurrenciesOptions, setCurrenciesOptions] = useState([])
  const [currencyChoice, setcurrencyChoice] = useState(DefOptions[0])
  const [parms, setParms] = useState({
    active: '',
    search: '',
    currency: DefOptions[0].value,
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
    startRefreshTable(true)
  }

  const onChangeHandler = (e) => {
    setcurrencyChoice(e)
    setParms({ ...parms, currency: e.value })
  }
  // get items
  const getJobsHandler = () => {
    setIsCurrenciesLoading(true)
    setIsCurrenciesDisabled(true)
    getCurrencies(parms)
      .then((res) => {
        const data = res.data.data
        setItems(data)
        setIsLoaded(false)
        stopRefresh(true)
        setTotalRecord(res.data.total)
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
        setIsLoaded(false)
      })
    getGeneralCurrencies()
      .then((res) => {
        const data = res.data.data
        setTotalRecord(res.data.total)
        setIsCurrenciesLoading(false)
        setIsCurrenciesDisabled(false)
        setCurrenciesOptions(
          res.data.data.map((el) => ({
            value: el.code,
            label: el.code,
          }))
        )
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
        setIsCurrenciesLoading(false)
        setIsCurrenciesDisabled(false)
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
              <span>
                <Select
                  isLoading={isCurrenciesLoading}
                  isDisabled={isCurrenciesDisabled}
                  isSearchable={true}
                  className='react-select-container'
                  classNamePrefix='react-select'
                  placeholder='select currency'
                  name='currency'
                  defaultValue={!isCurrenciesDisabled ? currencyChoice : loadOptions[0]}
                  value={!isCurrenciesDisabled ? currencyChoice : loadOptions[0]}
                  options={CurrenciesOptions}
                  onChange={onChangeHandler}
                />
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
            <ItemsTable items={items} onComplete={completeHandler} selectedCurrency={currencyChoice.value} />
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

export default CurrenciesItemsTableWrapper
