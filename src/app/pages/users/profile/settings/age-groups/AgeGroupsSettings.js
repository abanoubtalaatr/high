import {useIntl} from 'react-intl'
import EditSettingsModal from '../EditSettingsModal'
import SettingsNav from '../SettingsNav'
import AgeGroupsTable from './AgeGroupsTable'
import { KTIcon } from '../../../../../../_metronic/helpers'

function AgeGroupsSettings() {
  const intl = useIntl()
  return (
    <div className='card mb-10'>
      {/* begin::Header */}
      <div className='card-header pt-5'>
        <h5 className='card-title align-items-start flex-column'>
          <span className='fw-bolder mb-3'>{intl.formatMessage({id: 'AGE_GROUPS_SETTINGS'})}</span>
        </h5>
        <div className='card-toolbar gap-3 mb-5'>
          <button
            type='button'
            className='btn btn-light btn-sm btn-flex fw-bold'
            data-bs-toggle='modal'
            data-bs-target='#edit_settings_modal'
          >
            <KTIcon iconName='pencil' className='fs-6 text-muted me-1' />
            edit
          </button>
        </div>
        {/* modal */}
        <EditSettingsModal />
        {/* end modal */}
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        <div className='row'>
          {/* navbar */}
          <div className='col-lg-2'>
            <SettingsNav />
          </div>
          {/* content */}
          <div className='col-lg-10'>
            <AgeGroupsTable />
          </div>
        </div>
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default AgeGroupsSettings
