import {KTIcon} from '../../../../../_metronic/helpers'
import UnitsTable from './UnitsTable'
import {FilterDropdown} from './FilterDropdown'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getUnits} from '../../_requests'
import Select from 'react-select'
import {useIntl} from 'react-intl'
import Pagination from '../../../../components/pagination/Pagination'
import Spinner from '../../../../components/spinner/Spinner'

function UnitsPage() {
  const intl = useIntl()
  const {userId} = useParams()
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [totalRecord, setTotalRecord] = useState(0)
  const [classAllButton, setClassAllButton] = useState('btn-bg-dark btn-text-white')
  const [classApprovedButton, setClassApprovedButton] = useState('btn-light')
  const [classNotApproveButton, setClassNotApproveButton] = useState('btn-light')
  const [classPendingButton, setClassPendingButton] = useState('btn-light')
  const [parms, setParms] = useState({
    status: '',
    search: '',
    policy_id: '',
    activity_category_id: '',
    activity_id: '',
    type_id: '',
    capacity: '',
    availability: '',
    page: 1,
    limit: 15,
  })

  // pagination
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
    buttonId === 'not-approved'
      ? setClassNotApproveButton('btn-bg-dark btn-text-white')
      : setClassNotApproveButton('btn-light')
    buttonId === 'pending'
      ? setClassPendingButton('btn-bg-dark btn-text-white')
      : setClassPendingButton('btn-light')
    setParms({...parms, status: e, page: 1})
  }
  const searchHandler = (e) => {
    let inputValue = e.target.value
    setParms({...parms, search: inputValue})
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

  // get items
  const getItemsHandler = () => {
    getUnits(parms, userId)
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
    <div className='card'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5 align-items-end'>
        <div className=''>
          <h5 className='card-title align-items-start flex-column'>
            <span className='mb-3 fw-bolder'>{intl.formatMessage({id: 'UNITS'})}</span>
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
                statusHandler('2', 'pending')
              }}
            >
              pending
            </button>
            <button
              type='button'
              className={`btn ${classApprovedButton} btn-sm`}
              onClick={(s) => {
                statusHandler('1', 'approved')
              }}
            >
              approved
            </button>
            <button
              type='button'
              className={`btn ${classNotApproveButton} btn-sm`}
              onClick={(s) => {
                statusHandler('0', 'not-approved')
              }}
            >
              not approved
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
                  placeholder='search by unit name'
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
          <div className='alert alert-danger d-flex align-items-center  mb-0'>
            <div className='d-flex flex-column'>{errorMessage}</div>
          </div>
        ) : totalRecord === 0 ? (
          <div className='mb-3'>there is no data to display</div>
        ) : (
          <UnitsTable items={items} />
        )}
      </div>
      {/* begin::Footer */}
      <div className='card-footer'>
        {/* Start Pagination */}
        <Pagination totalRecord={totalRecord} paginationParams={paginationHandler} />
        {/* End Pagination */}
      </div>
    </div>
  )
}

export default UnitsPage
