import { useEffect, useState } from 'react'
import TranslationTable from './TranslationTable'
import Pagination from '../../components/pagination/Pagination'
import Spinner from '../../components/spinner/Spinner'
import { useParams } from 'react-router-dom'
import { getTranslation } from './_requests'

function TranslationTableWrapper(props) {
  const { refreshTable, startRefreshTable, stopRefresh, modelName,translatePageUrl } = props
  
  const { itemId } = useParams()
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [totalRecord, setTotalRecord] = useState(0)

  const [parms, setParms] = useState({
    model_name: modelName,
    model_id: itemId,
    page: 1,
    limit: 15,
  })
  // paginationHandler
  const paginationHandler = (paginationParams) => {
    setParms({ ...parms, ...paginationParams })
  }
  // end paginationHandler
  const completeHandler = () => {
    startRefreshTable(true)
  }
  const getitemssHandler = () => {
    setIsLoaded(true)
    getTranslation(parms)
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
            
            <TranslationTable items={items} onComplete={completeHandler} modelName={modelName} translatePageUrl={translatePageUrl} />
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

export default TranslationTableWrapper
