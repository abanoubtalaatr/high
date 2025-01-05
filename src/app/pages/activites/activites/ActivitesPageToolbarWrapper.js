// import CreateEmployeeModal from './CreateEmployeeModal'

import {KTIcon} from '../../../../_metronic/helpers'
import {PageTitleWrapper} from '../../../../_metronic/layout/components/toolbar/page-title'
import CreateModal from './CreateModal'
import {useState} from 'react'

function ActivitesPageToolbarWrapper() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const openCreateModal = () => {
    setShowCreateModal(true)
  }
  const closeCreateModal = () => setShowCreateModal(false)
  return (
    <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'>
      <div id='kt_app_toolbar_container' className='p-0 d-flex flex-stack container-fluid'>
        <PageTitleWrapper />
        <button className='btn btn-primary btn-sm btn-flex fw-bold' onClick={openCreateModal}>
          <KTIcon iconName='plus' className='fs-6  me-1' />
          add new
        </button>
        {/* modal */}
        <CreateModal show={showCreateModal} onHide={closeCreateModal} />
        {/* end modal */}
      </div>
    </div>
  )
}

export default ActivitesPageToolbarWrapper
