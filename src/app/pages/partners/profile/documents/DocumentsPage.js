import {KTIcon} from '../../../../../_metronic/helpers'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Select from 'react-select'
import {useIntl} from 'react-intl'
import {getDocuments} from '../../_requests'
import UploadFileModal from './UploadFileModal'
import DocumentsTable from './DocumentsTable'
import Pagination from '../../../../components/pagination/Pagination'
import Spinner from '../../../../components/spinner/Spinner'

function DocumentsPage() {
  const intl = useIntl()
  const {userId} = useParams()
  const [refreshTableState, setRefreshTableState] = useState(false)
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [totalRecord, setTotalRecord] = useState(0)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [parms, setParms] = useState({

    search: '',
    page: 1,
    limit: 15,
  })
  const openCreateModal = () => {
    setShowCreateModal(true)
  }
  const closeCreateModal = () => {
    setShowCreateModal(false)
  }
  const completeHandler = () => {
    setShowCreateModal(false)
    setRefreshTableState(true)
  }
  // paginationHandler
  const paginationHandler = (paginationParams) => {
    setParms({...parms, ...paginationParams})
  }
  // get items
  const getItemsHandler = () => {
    setRefreshTableState(false)
    getDocuments(parms, userId)
      .then((res) => {
        setItems(res.data.data)
        setIsLoaded(false)
        setTotalRecord(res.data.total)
      })
      .catch((err) => {
        setErrorMessage(err.message)
        setIsLoaded(false)
      })
  }

  useEffect(() => {
    setIsLoaded(true)
    getItemsHandler()
  }, [parms, refreshTableState])

  return (
    <div className='card mb-10'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5 align-items-end'>
        <h5 className='card-title align-items-start flex-column'>
          <span className='mb-3 fw-bolder'>{intl.formatMessage({id: 'DOCUMENTS'})}</span>
        </h5>
        <div className='card-toolbar gap-3 mb-5'>
          <button className='btn btn-primary btn-sm btn-flex fw-bold' onClick={openCreateModal}>
            <KTIcon iconName='cloud' className='fs-6  me-1' />
            upload other document
          </button>
        </div>
        {/* modal */}
        <UploadFileModal
          show={showCreateModal}
          onHide={closeCreateModal}
          onComplete={completeHandler}
        />
        {/* end modal */}
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
          <DocumentsTable items={items} onComplete={completeHandler} />
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

export default DocumentsPage
