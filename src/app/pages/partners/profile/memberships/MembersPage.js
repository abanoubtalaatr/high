import {KTIcon} from '../../../../../_metronic/helpers'
import {FilterDropdown} from './FilterDropdown'
import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {getMembershipsMembers} from '../../_requests'
import Select from 'react-select'
import {useIntl} from 'react-intl'
import MembersTable from './MembersTable'
import Pagination from '../../../../components/pagination/Pagination'
import Spinner from '../../../../components/spinner/Spinner'

function MembersPage() {
  const intl = useIntl()
  const {userId} = useParams()
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [totalRecord, setTotalRecord] = useState(0)
  const [classAllButton, setClassAllButton] = useState('btn-bg-dark btn-text-white')
  const [classRequestesButton, setClassRequestesButton] = useState('btn-light')
  const [classExpiredButton, setClassExpiredButton] = useState('btn-light')
  const [classMembersButton, setClassMembersButton] = useState('btn-light')
  const [parms, setParms] = useState({
    status: '',
    search: '',
    category_id: '',
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
    buttonId === 'requested'
      ? setClassRequestesButton('btn-bg-dark btn-text-white')
      : setClassRequestesButton('btn-light')
    buttonId === 'expired'
      ? setClassExpiredButton('btn-bg-dark btn-text-white')
      : setClassExpiredButton('btn-light')
    buttonId === 'active'
      ? setClassMembersButton('btn-bg-dark btn-text-white')
      : setClassMembersButton('btn-light')
    setParms({...parms, status: e, page: 1})
  }

  const filterHandler = (category_id) => {
    setParms({...parms, category_id: category_id})
  }
  const resetFilterHandler = () => {
    setParms({...parms, country_id: '', state_id: '', city_id: ''})
  }
  const searchHandler = (e) => {
    let inputValue = e.target.value
    setParms({...parms, search: inputValue})
  }
  // get items
  const getItemsHandler = () => {
    getMembershipsMembers(parms, userId)
      .then((res) => {
        setItems(res.data.data)
        setIsLoaded(false)
        setTotalRecord(res.data.total)
        setErrorMessage('')
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

  return (
    <div className='card'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5 align-items-center'>
        <div className=''>
          <h5 className='card-title align-items-start flex-column'>
            <span className='mb-3 fw-bolder'>{intl.formatMessage({id: 'MEMBERS'})}</span>
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
              className={`btn ${classMembersButton} btn-sm`}
              onClick={(s) => {
                statusHandler('active', 'active')
              }}
            >
              members
            </button>
            <button
              type='button'
              className={`btn ${classRequestesButton} btn-sm`}
              onClick={(s) => {
                statusHandler('requested', 'requested')
              }}
            >
              requested
            </button>
            <button
              type='button'
              className={`btn ${classExpiredButton} btn-sm`}
              onClick={(s) => {
                statusHandler('expired', 'expired')
              }}
            >
              expired
            </button>
          </div>
        </div>
        <div className='d-flex align-items-end flex-column'>
          <div className='mb-5'>
            <Link
              className='btn btn-link btn-color-muted btn-active-color-primary'
              to={`/partners/profile/${userId}/memberships/categories`}
            >
              {intl.formatMessage({id: 'MEMBERSHIPS_CATEGORIES'})}
              <KTIcon iconName='arrow-right' className='fs-6 text-muted mx-1' />
            </Link>
          </div>
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
                  placeholder='search by name'
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
          <MembersTable items={items} />
        )}
      </div>
      <div className='card-footer'>
        {/* Start Pagination */}
        <Pagination totalRecord={totalRecord} paginationParams={paginationHandler} />
        {/* End Pagination */}
      </div>
    </div>
  )
}

export default MembersPage
