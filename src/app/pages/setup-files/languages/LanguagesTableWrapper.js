import {useEffect, useState} from 'react'
import {getLanguages} from '../_requests'
import LanguagesTable from './LanguagesTable'
import Pagination from '../../../components/pagination/Pagination'
import Spinner from '../../../components/spinner/Spinner'

function LanguagesTableWrapper(props) {
  const {refreshTable, startRefreshTable, stopRefresh} = props
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [totalRecord, setTotalRecord] = useState(0)

  const [parms, setParms] = useState({
    page: 1,
    limit: 15,
  })
  // paginationHandler
  const paginationHandler = (paginationParams) => {
    setParms({...parms, ...paginationParams})
  }
  // end paginationHandler
  const completeHandler = () => {
    startRefreshTable(true)
  }
  const getitemssHandler = () => {
    setIsLoaded(true)
    getLanguages(parms)
      .then((res) => {
        setItems(res.data.data)
        setIsLoaded(false)
        stopRefresh(true)
        setTotalRecord(res.data.total)
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
        setIsLoaded(false)
      })
  }
  useEffect(() => {
    getitemssHandler()
  }, [parms])

  useEffect(() => {
    if (refreshTable) {
      getitemssHandler()
    }
  }, [refreshTable])

  return (
    <>
      <div className='card'>
        {/* <div className='card-header border-0 pt-5 align-items-end'></div> */}
        <div className='card-body mt-3 py-3'>
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
            <LanguagesTable items={items} onComplete={completeHandler} />
          )}
        </div>
        {totalRecord > 0 && (
          <div className='card-footer'>
            {/* Start Pagination */}
            <Pagination totalRecord={totalRecord} paginationParams={paginationHandler} />
            {/* End Pagination */}
          </div>
        )}
      </div>
    </>
  )
}

export default LanguagesTableWrapper
