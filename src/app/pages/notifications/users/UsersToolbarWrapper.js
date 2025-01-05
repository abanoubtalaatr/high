// import CreateEmployeeModal from './CreateEmployeeModal'
import {PageTitleWrapper} from '../../../../_metronic/layout/components/toolbar/page-title'
import {KTIcon} from '../../../../_metronic/helpers'
import {Link} from 'react-router-dom'

function UsersToolbarWrapper() {
  return (
    <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'>
      <div id='kt_app_toolbar_container' className='p-0 d-flex flex-stack container-fluid'>
        <PageTitleWrapper />
        <Link to='/notifications/users/new' className='btn btn-primary btn-sm btn-flex fw-bold'>
          <KTIcon iconName='plus' className='fs-6  me-1' />
          add new
        </Link>
      </div>
    </div>
  )
}

export default UsersToolbarWrapper
