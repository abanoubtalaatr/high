import {useEffect, useState} from 'react'
import {KTIcon} from '../../../../_metronic/helpers'
import {getHelpCenter} from '../_requests'
import Pagination from '../../../components/pagination/Pagination'
import Spinner from '../../../components/spinner/Spinner'
import HelpCenterTable from './HelpCenterTable'

function HelpCenterTableWrapper(props) {
  const {refreshTable, startRefreshTable, stopRefresh} = props
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [totalRecord, setTotalRecord] = useState(0)
  const [classAllButton, setClassAllButton] = useState('btn-bg-dark btn-text-white')
  const [classPublishedButton, setClassPublishedButton] = useState('btn-light')
  const [classUnpublishedButton, setClassUnpublishedButton] = useState('btn-light')
  const [parms, setParms] = useState({
    status: '',
    search: '',
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
    buttonId === 'publish'
      ? setClassPublishedButton('btn-bg-dark btn-text-white')
      : setClassPublishedButton('btn-light')
    buttonId === 'unpublish'
      ? setClassUnpublishedButton('btn-bg-dark btn-text-white')
      : setClassUnpublishedButton('btn-light')
    setParms({...parms, status: e, page: 1})
  }
  const searchHandler = (e) => {
    let inputValue = e.target.value
    setParms({...parms, search: inputValue})
  }

  const completeHandler = () => {
    startRefreshTable(true)
  }
  // get items
  const getItemsHandler = (parms) => {
    getHelpCenter(parms)
      .then((res) => {
        setItems(res.data.data)
        setIsLoaded(false)
        stopRefresh(true)
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
    getItemsHandler(parms)
  }, [parms])
  useEffect(() => {
    if (refreshTable) {
      getItemsHandler()
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
                statusHandler('', 'all')
              }}
            >
              all
            </button>
            <button
              type='button'
              className={`btn ${classPublishedButton} btn-sm`}
              onClick={(s) => {
                statusHandler('publish', 'publish')
              }}
            >
              publish
            </button>
            <button
              type='button'
              className={`btn ${classUnpublishedButton} btn-sm`}
              onClick={(s) => {
                statusHandler('unpublish', 'unpublish')
              }}
            >
              unpublish
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
            <HelpCenterTable items={items} onComplete={completeHandler} />
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
export default HelpCenterTableWrapper
