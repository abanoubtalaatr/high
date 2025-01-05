import {useState} from 'react'
import {KTIcon} from '../../../../_metronic/helpers'
import {PageTitleWrapper} from '../../../../_metronic/layout/components/toolbar/page-title'
import CreateLanguageModal from './CreateLanguageModal'

function LanguagesToolbarWrapper(props) {
  const {refreshTable} = props
  const [showCreateModal, setShowCreateModal] = useState(false)
  const openCreateModal = () => {
    setShowCreateModal(true)
  }
  const closeCreateModal = () => {
    setShowCreateModal(false)
  }
  const completeHandler = () => {
    setShowCreateModal(false)
    refreshTable(true)
  }
  return (
    <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'>
      <div id='kt_app_toolbar_container' className='p-0 d-flex flex-stack container-fluid'>
        <PageTitleWrapper />
        <button className='btn btn-primary btn-sm btn-flex fw-bold' onClick={openCreateModal}>
          <KTIcon iconName='plus' className='fs-6  me-1' />
          add new
        </button>
        {/* modal */}
        <CreateLanguageModal
          show={showCreateModal}
          onHide={closeCreateModal}
          onComplete={completeHandler}
        />
        {/* end modal */}
      </div>
    </div>
  )
}

export default LanguagesToolbarWrapper
