import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { KTIcon } from '../../../../../_metronic/helpers'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPublicEvents } from '../../_requests'
import { useIntl } from 'react-intl'
import Spinner from '../../../../components/spinner/Spinner'
import Pagination from '../../../../components/pagination/Pagination'
import FinancialsTable from './FinancialsTable'
import { FilterDropdown } from './FilterDropdown'
import { Button } from 'react-bootstrap';



function Financials() { 
  const intl = useIntl()
  const { userId } = useParams()
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [totalRecord, setTotalRecord] = useState(0)
  const [parms, setParms] = useState({
    status: '',
    search: '',
    page: 1,
    limit: 15,
  })
  // paginationHandler
  const paginationHandler = (paginationParams) => {
    setParms({ ...parms, ...paginationParams })
  }
  // end paginationHandler
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
    setParms({ ...parms, country_id: '', state_id: '', city_id: '' })
  }
  // get items
  const getItemsHandler = () => {
    getPublicEvents(parms, userId)
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
      <div className='card mb-10 py-5'>
        {/* begin::Header */}
        <div className='card-header border-0'>
          <h5 className='card-title align-items-start flex-column'>
            <span className='mb-3 fw-bolder'>{intl.formatMessage({ id: 'FINANCIALS' })} transactions of 26/03/2024 in all uints</span>
          </h5>
          <div>
            <div className='card-toolbar gap-3'>
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
            </div>
          </div>
        </div>
        <div className='card-body py-3'>
          <div className='row'>
            {/* booking */}
            <div className='col-md-4 px-5'>
              <table className='table table-row-dashed gs-0 gy-3'>
                {/* begin::Table body */}
                <thead className='fs-6'>
                  <tr>
                    <th className='min-w-100px text-dark fw-bold fs-3'>booking</th>
                    <th className='min-w-100px'>revenue</th>
                    <th className='min-w-100px'>collected</th>
                  </tr>
                </thead>
                <tbody className='fs-6'>
                  <tr>
                    <td>
                      <span>online</span>
                    </td>
                    <td>
                      <span>5000</span>
                    </td>
                    <td>
                      <span className='d-flex gap-2'>
                        5000
                        <OverlayTrigger
                          placement={'top'}
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip>
                              collected by highfive
                            </Tooltip>
                          }
                        >
                          <Button variant="" className='p-0 m-0'>
                            <i class="ki-duotone ki-information fs-3 text-danger">
                              <span class="path1"></span>
                              <span class="path2"></span>
                              <span class="path3"></span>
                            </i>
                          </Button>
                        </OverlayTrigger>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>cash</span>
                    </td>
                    <td>
                      <span>5000</span>
                    </td>
                    <td>
                      <span className='d-flex gap-2'>
                        1000
                        <OverlayTrigger
                          placement={'top'}
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip>
                              5.00 sar to be collected 
                            </Tooltip>
                          }
                        >
                          <Button variant="" className='p-0 m-0'>
                            <i class="ki-duotone ki-information fs-3 text-danger">
                              <span class="path1"></span>
                              <span class="path2"></span>
                              <span class="path3"></span>
                            </i>
                          </Button>
                        </OverlayTrigger></span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className='text-dark fw-bold'>total <small className='fs-7'>(SAR)</small></span>
                    </td>
                    <td>
                      <span className='text-dark fw-bold'>10000</span>
                    </td>
                    <td>
                      <span className='text-dark fw-bold'>6000</span>
                    </td>
                  </tr>
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
            {/* public event */}
            <div className='col-md-4 px-5'>
              <table className='table table-row-dashed gs-0 gy-3'>
                {/* begin::Table body */}
                <thead className='fs-6'>
                  <tr>
                    <th className='min-w-100px text-dark fw-bold fs-3'>public event</th>
                    <th className='min-w-100px'>revenue</th>
                    <th className='min-w-100px'>collected</th>
                  </tr>
                </thead>
                <tbody className='fs-6'>
                  <tr>
                    <td>
                      <span>online</span>
                    </td>
                    <td>
                      <span>5000 </span>
                    </td>
                    <td>
                      <span className='d-flex gap-2'>
                        5000
                        <OverlayTrigger
                          placement={'top'}
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip>
                              collected by highfive
                            </Tooltip>
                          }
                        >
                          <Button variant="" className='p-0 m-0'>
                            <i class="ki-duotone ki-information fs-3 text-danger">
                              <span class="path1"></span>
                              <span class="path2"></span>
                              <span class="path3"></span>
                            </i>
                          </Button>
                        </OverlayTrigger>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>cash</span>
                    </td>
                    <td>
                      <span>5000</span>
                    </td>
                    <td>
                      <span className='d-flex gap-2'>
                        1000
                        <OverlayTrigger
                          placement={'top'}
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip>
                              5.00 sar to be collected
                            </Tooltip>
                          }
                        >
                          <Button variant="" className='p-0 m-0'>
                            <i class="ki-duotone ki-information fs-3 text-danger">
                              <span class="path1"></span>
                              <span class="path2"></span>
                              <span class="path3"></span>
                            </i>
                          </Button>
                        </OverlayTrigger></span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className='text-dark fw-bold'>total <small className='fs-7'>(SAR)</small></span>
                    </td>
                    <td>
                      <span className='text-dark fw-bold'>10000</span>
                    </td>
                    <td>
                      <span className='text-dark fw-bold'>6000</span>
                    </td>
                  </tr>
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
            {/* revenues */}
            <div className='col-md-4 px-5'>
              <table className='table table-row-dashed'>
                {/* begin::Table body */}
                <thead className='fs-6'>
                  <tr>
                    <th className='min-w-100px text-dark fw-bold fs-3'>revenues</th>
                    <th className='min-w-100px'>revenue</th>
                    <th className='min-w-100px'>collected</th>
                  </tr>
                </thead>
                <tbody className='fs-6'>
                  <tr>
                    <td>
                      <span>online</span>
                    </td>
                    <td>
                      <span>5000</span>
                    </td>
                    <td>
                      <span className='d-flex gap-2'>
                        5000
                        <OverlayTrigger
                          placement={'top'}
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip>
                              collected by highfive
                            </Tooltip>
                          }
                        >
                          <Button variant="" className='p-0 m-0'>
                            <i class="ki-duotone ki-information fs-3 text-danger">
                              <span class="path1"></span>
                              <span class="path2"></span>
                              <span class="path3"></span>
                            </i>
                          </Button>
                        </OverlayTrigger>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>cash</span>
                    </td>
                    <td>
                      <span>5000</span>
                    </td>
                    <td>
                      <span className='d-flex gap-2'>
                        1000
                        <OverlayTrigger
                          placement={'top'}
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip>
                              5.00 sar to be collected
                            </Tooltip>
                          }
                        >
                          <Button variant="" className='p-0 m-0'>
                            <i class="ki-duotone ki-information fs-3 text-danger">
                              <span class="path1"></span>
                              <span class="path2"></span>
                              <span class="path3"></span>
                            </i>
                          </Button>
                        </OverlayTrigger></span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className='text-dark fw-bold'>total <small className='fs-7'>(SAR)</small></span>
                    </td>
                    <td>
                      <span className='text-dark fw-bold'>10000</span>
                    </td>
                    <td>
                      <span className='text-dark fw-bold'>6000</span>
                    </td>
                  </tr>
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
          </div>

        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card mb-10'>
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
            <FinancialsTable items={items} />
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
    </>
  )
}
export default Financials