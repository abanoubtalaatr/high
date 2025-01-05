import {useEffect, useState} from 'react'
import {KTIcon} from '../../../../../_metronic/helpers'
import EditSettingsModal from './EditSettingsModal'
import SettingsTable from './SettingsTable'
import {useParams} from 'react-router-dom'
import {getPartnerSettings} from '../../_requests'

function SettingsPage() {
  const {userId} = useParams()
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
    getPartnerSettings(userId)
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
          <span className='fw-bolder mb-3'>settings</span>
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
        {errorMessage != '' ? (
          <div className={`alert alert-danger d-flex align-items-center p-5 mb-0`}>
            <div className='d-flex flex-column'>{errorMessage}</div>
          </div>
        ) : (
          <SettingsTable settingsDetails={settingsDetails} />
        )}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default SettingsPage
