// import CreateEmployeeModal from './CreateEmployeeModal'
import { PageTitleWrapper } from '../../../../_metronic/layout/components/toolbar/page-title'
import { KTIcon } from '../../../../_metronic/helpers'
import { Link } from 'react-router-dom'

function FundsToolbarWrapper() {
  return (
    <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'>
      <div id='kt_app_toolbar_container' className='p-0 d-flex flex-stack container-fluid'>
        <PageTitleWrapper />
        <div className='d-flex gap-5'>
          <Link to={`/wallet`} className='btn btn-light btn-sm btn-flex fw-bold'>
            <KTIcon iconName='double-left' className='fs-6  me-1' />
            wallet
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FundsToolbarWrapper
