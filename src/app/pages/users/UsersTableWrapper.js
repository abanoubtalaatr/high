import {useEffect, useState} from 'react'
import Select from 'react-select'
import {KTIcon} from '../../../_metronic/helpers'
import {getUsers} from './_requests'
import {FilterDropdown} from './FilterDropdown'
import UsersTable from './UsersTable'
import Pagination from '../../components/pagination/Pagination'
import Spinner from '../../components/spinner/Spinner'

function UsersTableWrapper() {
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [totalRecord, setTotalRecord] = useState(0)
  const [classAllButton, setClassAllButton] = useState('btn-bg-dark btn-text-white')
  const [classActiveButton, setClassActiveButton] = useState('btn-light')
  const [classInactiveButton, setClassInactiveButton] = useState('btn-light')
  const [parms, setParms] = useState({
    status: '',
    search: '',
    country_id: '',
    state_id: '',
    city_id: '',
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
    buttonId === 'available'
      ? setClassActiveButton('btn-bg-dark btn-text-white')
      : setClassActiveButton('btn-light')
    buttonId === 'blocked'
      ? setClassInactiveButton('btn-bg-dark btn-text-white')
      : setClassInactiveButton('btn-light')
    setParms({...parms, status: e, page: 1})
  }

  const searchHandler = (e) => {
    let inputValue = e.target.value
    setParms({...parms, search: inputValue})
  }
  const filterHandler = (country_iso, state_id, city_id) => {
    setParms({...parms, country_id: country_iso, state_id: state_id, city_id: city_id})
  }
  const resetFilterHandler = () => {
    setParms({...parms, country_id: '', state_id: '', city_id: ''})
  }
  // get items
  const getItemsHandler = () => {
    getUsers(parms)
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
              className={`btn ${classActiveButton} btn-sm`}
              onClick={(s) => {
                statusHandler('1', 'available')
              }}
            >
              available
            </button>
            <button
              type='button'
              className={`btn ${classInactiveButton} btn-sm`}
              onClick={(s) => {
                statusHandler('0', 'blocked')
              }}
            >
              blocked
            </button>
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
                    placeholder='search by name, username, phone, or email'
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
            <UsersTable items={items} />
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

export default UsersTableWrapper
