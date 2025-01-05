// import CreateEmployeeModal from './CreateEmployeeModal'
import { PageTitleWrapper } from '../../../_metronic/layout/components/toolbar/page-title'
import { KTIcon } from '../../../_metronic/helpers'
import { useState } from 'react'
import { FilterDropdown } from './FilterDropdown'


function FinancialsToolbarWrapper() {
  const [parms, setParms] = useState({
    status: '',
    search: '',
    page: 1,
  })
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
  return (
    <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'>
      <div id='kt_app_toolbar_container' className='p-0 d-flex flex-stack container-fluid'>
        <PageTitleWrapper />
        <div className='d-flex gap-5'>
          <button
            type='button'
            className='btn btn-light btn-sm btn-flex fw-bold'
          >
            <KTIcon iconName='file-up' className='fs-6 text-muted me-1' />
            export
          </button>
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
  )
}

export default FinancialsToolbarWrapper
