import {KTIcon} from '../../../../../_metronic/helpers'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Select from 'react-select'
import {useIntl} from 'react-intl'
import {getBookings} from '../../_requests'
import BookingsTable from './BookingsTable'
import {FilterDropdown} from './FilterDropdown'
import Pagination from '../../../../components/pagination/Pagination'
import Spinner from '../../../../components/spinner/Spinner'

function BookingsPage() {
  const intl = useIntl()
  const {unitId} = useParams()
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [totalRecord, setTotalRecord] = useState(0)
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
    booking_type: '',
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
    booking_type
  ) => {
    setParms({
      ...parms,
      date_from: date_from,
      date_to: date_to,
      activity_category_id: activity_category_id,
      activity_id: activity_id,
      gender: gender,
      booking_type: booking_type,
    })
  }
  const resetFilterHandler = () => {
    setParms({...parms, country_id: '', state_id: '', city_id: ''})
  }

  // get items
  const getItemsHandler = () => {
    getBookings(parms, unitId)
      .then((res) => {
        setItems(res.data.data)
        setIsLoaded(false)
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

  return (
    <div className='card mb-10'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5 align-items-end'>
      <div className=''>
          <h5 className='card-title align-items-start flex-column'>
            <span className='mb-3 fw-bolder'>{intl.formatMessage({id: 'BOOKINGS'})}</span>
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
                  placeholder='search by booking id'
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
          <BookingsTable items={items} />
        )}
      </div>
      {/* end::Body */}
      {/* begin::footer */}
      <div className='card-footer'>
        {/* Start Pagination */}
        <Pagination totalRecord={totalRecord} paginationParams={paginationHandler} />
        {/* End Pagination */}
      </div>
      {/* end::footer */}
    </div>
  )
}

export default BookingsPage
