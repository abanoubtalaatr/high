import {KTIcon} from '../../../../../_metronic/helpers'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Select from 'react-select'
import {useIntl} from 'react-intl'
import {getPolicies} from '../../_requests'
import PoliciesTable from './PoliciesTable'
import Pagination from '../../../../components/pagination/Pagination'
import Spinner from '../../../../components/spinner/Spinner'

function PoliciesPage() {
  const intl = useIntl()
  const {userId} = useParams()
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [totalRecord, setTotalRecord] = useState(0)
  const [parms, setParms] = useState({
    search: '',
    page: 1,
    limit: 15,
  })

  // paginationHandler
  const paginationHandler = (paginationParams) => {
    setParms({...parms, ...paginationParams})
  }
  const searchHandler = (e) => {
    let inputValue = e.target.value
    setParms({...parms, search: inputValue})
  }
  // get items
  const getItemsHandler = () => {
    getPolicies(parms, userId)
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
  }, [parms])

  return (
    <div className='card mb-10'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5 align-items-end'>
        <h5 className='card-title align-items-start flex-column'>
          <span className='mb-3 fw-bolder'>{intl.formatMessage({id: 'POLICIES'})}</span>
        </h5>
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
                  placeholder='search by name'
                  name='target_title'
                  onChange={searchHandler}
                />
              </div>
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
          <PoliciesTable items={items} />
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

export default PoliciesPage
