import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../../../_metronic/helpers'
import SettingsNav from '../SettingsNav'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {getUnitSettings} from '../../../_requests'
import EditSettingsModal from './EditSettingsModal'
import SettingsTable from './SettingsTable'

function GeneralSettings() {
  const intl = useIntl()
  const {unitId} = useParams()
  const [settingsDetails, setSettingsDetails] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [refreshState, setRefreshState] = useState(false)
  const openEditModal = () => {
    setShowEditModal(true)
  }
  const closeEditModal = () => setShowEditModal(false)
  const completeHandler = () => {
    setShowEditModal(false)
    setRefreshState(true)
  }
  useEffect(() => {
    getUnitSettings(unitId)
      .then((res) => {
        setSettingsDetails(res.data.data)
        setRefreshState(false)
      })
      .catch((err) => {
        setErrorMessage(err.message)
        setRefreshState(false)
      })
  }, [refreshState])

  return (
    <div className='card mb-10'>
      {/* begin::Header */}
      <div className='card-header pt-5'>
        <h5 className='card-title align-items-start flex-column'>
          <span className='fw-bolder mb-3'> {intl.formatMessage({id: 'GENERAL_SETTINGS'})}</span>
        </h5>
        <div className='card-toolbar gap-3 mb-5'>
          <button className='btn btn-light btn-sm btn-flex fw-bold' onClick={openEditModal}>
            <KTIcon iconName='pencil' className='fs-6 text-muted me-1' />
            edit
          </button>
        </div>
        {/* modal */}
        <EditSettingsModal
          settingsDetails={settingsDetails}
          show={showEditModal}
          onHide={closeEditModal}
          onComplete={completeHandler}
        />
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
          <div className='col-lg-10'>
            {errorMessage != '' ? (
              <div className={`alert alert-danger d-flex align-items-center p-5 mb-0`}>
                <div className='d-flex flex-column'>{errorMessage}</div>
              </div>
            ) : (
              <SettingsTable settingsDetails={settingsDetails} />
            )}
          </div>
        </div>
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default GeneralSettings
