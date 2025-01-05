// import CreateEmployeeModal from './CreateEmployeeModal'
import { PageTitleWrapper } from '../../../../_metronic/layout/components/toolbar/page-title'
import { KTIcon } from '../../../../_metronic/helpers'
import { Link, useLocation } from 'react-router-dom'
import { PageTitle } from '../../../../_metronic/layout/core'
import { useIntl } from 'react-intl'

function TransactionsToolbarWrapper() {
  const location = useLocation()
  const countryName = location.state.countryName
  const intl = useIntl()
  const breadCrumbs = [
    {
      title: intl.formatMessage({ id: 'MENU.DASHBOARD' }),
      path: '/dashboard',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
    {
      title: intl.formatMessage({ id: 'FINANCIALS' }),
      path: '/financials',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    }
  ]
  return (
    <>
      <PageTitle breadcrumbs={breadCrumbs}>
        {countryName}
      </PageTitle>
      <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'>
        <div id='kt_app_toolbar_container' className='p-0 d-flex flex-stack container-fluid'>
          <PageTitleWrapper />
          <div className='d-flex gap-5'>
            <Link to={`/financials`} className='btn btn-light btn-sm btn-flex fw-bold'>
              <KTIcon iconName='double-left' className='fs-6  me-1' />
              financials
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default TransactionsToolbarWrapper
