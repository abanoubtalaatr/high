import PublicEventsTable from './PublicEventsTable'
import {FilterDropdown} from './FilterDropdown'
import {useEffect, useState} from 'react'
import {KTIcon} from '../../../_metronic/helpers'
import {getPublicEvents} from './_requests'
import Pagination from '../../components/pagination/Pagination'
import Spinner from '../../components/spinner/Spinner'

function TableWrapper() {
  const [items, setItems] = useState([])
  const [totalRecord, setTotalRecord] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [classAllButton, setClassAllButton] = useState('btn-bg-dark btn-text-white')
  const [classComingButton, setClassComingButton] = useState('btn-light')
  const [classEndedButton, setClassEndedButton] = useState('btn-light')
  const [classCanceledButton, setClassCanceledButton] = useState('btn-light')
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
    limit: 15,
  })

  // statusHandler
  const statusHandler = (e, buttonId) => {
    buttonId === 'all'
      ? setClassAllButton('btn-bg-dark btn-text-white')
      : setClassAllButton('btn-light')
    buttonId === 'coming'
      ? setClassComingButton('btn-bg-dark btn-text-white')
      : setClassComingButton('btn-light')
    buttonId === 'ended'
      ? setClassEndedButton('btn-bg-dark btn-text-white')
      : setClassEndedButton('btn-light')
    buttonId === 'cancelled'
      ? setClassCanceledButton('btn-bg-dark btn-text-white')
      : setClassCanceledButton('btn-light')
    setParms({...parms, status: e, page: 1})
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
  // paginationHandler
  const paginationHandler = (paginationParams) => {
    setParms({...parms, ...paginationParams})
  }
  // end paginationHandler
  // get items
  const getItemsHandler = () => {
    getPublicEvents(parms, 1)
      .then((res) => {
        setItems(res.data.data)
        setIsLoaded(false)
        setTotalRecord(res.data.total || 0)
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

  return (
    <div className='card mb-10'>
      {/* begin::Header */}
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
              className={`btn ${classComingButton} btn-sm`}
              onClick={(s) => {
                statusHandler('coming', 'coming')
              }}
            >
              coming
            </button>
            <button
              type='button'
              className={`btn ${classEndedButton} btn-sm`}
              onClick={(s) => {
                statusHandler('ended', 'ended')
              }}
            >
              ended
            </button>
            <button
              type='button'
              className={`btn ${classCanceledButton} btn-sm`}
              onClick={(s) => {
                statusHandler('cancelled', 'cancelled')
              }}
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
          <PublicEventsTable items={items} />
        )}
      </div>
      {/* begin::Body */}
      <div className='card-footer'>
        {/* Start Pagination */}
        <Pagination totalRecord={totalRecord} paginationParams={paginationHandler} />
        {/* End Pagination */}
      </div>
    </div>
  )
}

export default TableWrapper
