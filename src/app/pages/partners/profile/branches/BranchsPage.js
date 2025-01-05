import Pagination from '../../../../components/pagination/Pagination'
import Spinner from '../../../../components/spinner/Spinner'
import {KTIcon} from '../../../../../_metronic/helpers'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useIntl} from 'react-intl'
import BranchesTable from './BranchesTable'
import {FilterDropdown} from './FilterDropdown'
import {getBranchesForPartner} from '../../_requests'

function BranchsPage() {
  const intl = useIntl()
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [totalRecord, setTotalRecord] = useState(0)
  const [classAllButton, setClassAllButton] = useState('btn-bg-dark btn-text-white')
  const [classApprovedButton, setClassApprovedButton] = useState('btn-light')
  const [classNotApproveButton, setClassNotApproveButton] = useState('btn-light')
  const [classPendingButton, setClassPendingButton] = useState('btn-light')
  const [branches, setBranches] = useState([])
  const {userId} = useParams()

  const [params, setParams] = useState({})

  const filterHandler = async (paramsFilter) => {
    setParams({...params, ...paramsFilter})
    const response = await getBranchesForPartner(userId, params)

    setBranches(response.data.data)
  }

  const paginationHandler =async (paginationParams) => {
    setParams({...params, ...paginationParams})
    const response = await getBranchesForPartner(userId, params)

    setBranches(response.data.data)
  }
  
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
    setParams({...params, status: e, page: 1})
  }
  
  const searchHandler = async (e) => {
    const response = await getBranchesForPartner(userId, {search: e.target.value})

    setBranches(response.data.data)
  }
  const fetchBranches = async () => {
    try {
      setIsLoaded(false)
      const response = await getBranchesForPartner(userId)
      setBranches(response.data.data)
      setIsLoaded(true)
    } catch (error) {
      setErrorMessage('Failed to fetch branches')
      setIsLoaded(true)
    }
  }

  useEffect(() => {
    fetchBranches()
  }, [userId])
  const resetFilterHandler =async () => {
    setParams({})
    const response = await getBranchesForPartner(userId)

    setBranches(response.data.data)
  }
  return (
    <div className='card'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5 align-items-end'>
        <div className=''>
          <h5 className='card-title align-items-start flex-column'>
            <span className='mb-3 fw-bolder'>{intl.formatMessage({id: 'branches'})}</span>
          </h5>
          {/* <div className='card-toolbar gap-3'>
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
            </div> */}
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
                  placeholder='search by Branch Name'
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
              <FilterDropdown onApply={filterHandler} onReset={resetFilterHandler} />
            </span>
          </div>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        <BranchesTable branches={branches} />
      </div>
      {/* begin::Footer */}
      <div className='card-footer'>
        {/* Start Pagination */}
        <Pagination totalRecord='10' paginationParams={paginationHandler} />
        {/* End Pagination */}
      </div>
    </div>
  )
}

export default BranchsPage
