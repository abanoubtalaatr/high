// import CreateEmployeeModal from './CreateEmployeeModal'
import {PageTitleWrapper} from '../../../../_metronic/layout/components/toolbar/page-title'
import {KTIcon} from '../../../../_metronic/helpers'
import {Link} from 'react-router-dom'

function PagesToolbarWrapper() {
  return (
    <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'>
      <div id='kt_app_toolbar_container' className='p-0 d-flex flex-stack container-fluid'>
        <PageTitleWrapper />
        <div>
          <Link to='/pages-content/pages/gallery' className='btn btn-success btn-sm btn-flex fw-bold me-3'>
            <KTIcon iconName='picture' className='fs-6  me-1' />
            gallery
          </Link>
          <Link to='/pages-content/pages/new' className='btn btn-primary btn-sm btn-flex fw-bold'>
            <KTIcon iconName='plus' className='fs-6  me-1' />
            add new
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PagesToolbarWrapper
