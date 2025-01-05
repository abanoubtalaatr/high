import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import UnitsWrapper from './widgets/units/UnitsWrapper'
import UsersWrapper from './widgets/users/UsersWrapper'
import UsersAgeGroupsWrapper from './widgets/usersAgeGroups/UsersAgeGroupsWrapper'
import PartnersWrapper from './widgets/partners/PartnersWrapper'
import BookingsWrapper from './widgets/bookings/BookingsWrapper'
import PublicEventsWrapper from './widgets/publicEvents/PublicEventsWrapper'
import { PageTitleWrapper } from '../../../_metronic/layout/components/toolbar/page-title'
import { FilterDropdown } from './FilterDropdown'
import { KTIcon } from '../../../_metronic/helpers'
import { useState } from 'react'

function Dashboard() {
  const intl = useIntl()
  const [parmsInfo, setParmsInfo] = useState({
    country_name: 'all',
    state_name: 'all',
    city_name: 'all',
  })
  const [parms, setParms] = useState({
    country_iso: '',
    state_id: '',
    city_id: '',
  })
  const filterHandler = (country_iso, state_id, city_id) => {
    setParms({ ...parms, country_iso: country_iso, state_id: state_id, city_id: city_id })
  }
  const filterInfoHandler = (country_name, state_name, city_name) => {
    setParmsInfo({ ...parmsInfo, country_name: country_name, state_name: state_name, city_name: city_name })
  }
  return (
    <>
      <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'>
        <div id='kt_app_toolbar_container' className='p-0 d-flex flex-stack container-fluid'>
          <PageTitleWrapper />
          <span>
            <span className='me-3 fw-bold fs-7 text-muted'>
              {`${parmsInfo.country_name} - ${parmsInfo.state_name} - ${parmsInfo.city_name} `}
            </span>
            <button
              type='button'
              className='btn btn-primary btn-sm btn-flex fw-bold'
              data-kt-menu-trigger='click'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-static='true'
            >
              <KTIcon iconName='filter' className='fs-6 me-1' />
              Filter
            </button>
            <FilterDropdown onAplly={filterHandler} filterInfo={filterInfoHandler} />
          </span>
        </div>
      </div>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      {/* begin::Row */}
      <div className='row gy-5 gx-xl-8 card-xxl-stretch'>
        <PartnersWrapper countryIso={parms.country_iso} stateId={parms.state_id} cityId={parms.city_id} />
      </div>
      {/* begin::Row */}
      <div className='row gy-5 gx-xl-8 card-xxl-stretch'>
        <UnitsWrapper countryIso={parms.country_iso} stateId={parms.state_id} cityId={parms.city_id} />
      </div>
      {/* end::Row */}
      {/* begin::Row */}
      <div className='row gy-5 gx-xl-8 card-xxl-stretch'>
        <UsersWrapper countryIso={parms.country_iso} stateId={parms.state_id} cityId={parms.city_id} />
      </div>
      {/* end::Row */}
      {/* begin::Row */}
      <div className='row gy-5 gx-xl-8 card-xxl-stretch'>
        <UsersAgeGroupsWrapper countryIso={parms.country_iso} stateId={parms.state_id} cityId={parms.city_id} />
      </div>
      {/* end::Row */}
      {/* begin::Row */}
      <div className='row gy-5 gx-xl-8 card-xxl-stretch'>
        <BookingsWrapper countryIso={parms.country_iso} stateId={parms.state_id} cityId={parms.city_id} />
      </div>
      {/* end::Row */}
      {/* begin::Row */}
      <div className='row gy-5 gx-xl-8 card-xxl-stretch'>
        <PublicEventsWrapper countryIso={parms.country_iso} stateId={parms.state_id} cityId={parms.city_id} />
      </div>
      {/* end::Row */}
    </>
  )
}
export default Dashboard
