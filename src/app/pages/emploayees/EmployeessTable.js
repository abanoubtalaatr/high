import React, {useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
import EditpassModal from './EditpassModal'
import EditEmployeeModal from './EditEmployeeModal'
import DeleteModal from './DeleteModal'

function EmployeessTable(props) {
  const {items, onComplete} = props
  const [userDetails, setUserDetails] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userDeleteId, setUserDeleteId] = useState('')
  const [showEditPassModal, setShowEditPassModal] = useState(false)
  const [userEditPassId, setUserEditPassId] = useState('')

  const openEditModal = (user) => {
    setShowEditModal(true)
    setUserDetails(user)
  }
  const openEditPassModal = (id) => {
    setShowEditPassModal(true)
    setUserEditPassId(id)
  }
  const openDeleteModal = (id) => {
    setShowDeleteModal(true)
    setUserDeleteId(id)
  }
  const closeDeleteModal = () => setShowDeleteModal(false)
  const closeEditModal = () => setShowEditModal(false)
  const closeEditPassModal = () => setShowEditPassModal(false)
  const completeHandler = () => {
    setShowEditModal(false)
    setShowDeleteModal(false)
    onComplete(true)
  }
  const completeUpdatePassHandler = () => {
    setShowEditPassModal(false)
  }
  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }
  return (
    <>
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='bg-light'>
                <th className='min-w-100px'>name</th>
                <th className='min-w-100px text-center'>Phone</th>
                <th className='min-w-100px text-center'>Email</th>
                <th className='min-w-100px text-center'>Job</th>
                <th className='min-w-100px text-center'>Country</th>
                <th className='min-w-100px text-center'>Status</th>
                <th className='min-w-100px text-center'>Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {items.map((e) => {
                return (
                  <tr key={e.id}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='symbol symbol-45px me-5'>
                          <img
                            src={e.image || toAbsoluteUrl('/media/avatars/blank.png')}
                            alt={e.name}
                            onError={imageErrorHandler}
                          />
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                          <span className='text-dark fw-bold fs-6'>{e.name}</span>
                          <span className='text-muted fw-semibold text-muted d-block fs-7'>
                            {e.created_at}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className='text-center'>{e.phone}</td>
                    <td className='text-center'>{e.email}</td>
                    <td className='text-center'>{e.job.name}</td>
                    <td className='text-center'>{e.country.name}</td>
                    <td className='text-center'>
                      <span className={`badge badge-light-${e.active === 1 ? 'primary' : 'danger'}`}>
                        {e.active === 1 ? 'active' : 'inactive'}
                      </span>
                    </td>
                    <td className='text-center'>
                      <button
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                        onClick={() => openEditPassModal(e.id)}
                      >
                        <KTIcon iconName='lock' className='fs-3' />
                      </button>
                      <button
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                        onClick={() => openEditModal(e)}
                      >
                        <KTIcon iconName='pencil' className='fs-3' />
                      </button>
                      <button
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                        onClick={() => openDeleteModal(e.id)}
                      >
                        <KTIcon iconName='trash' className='fs-3' />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
      {showEditPassModal && (
        <EditpassModal
          show={showEditPassModal}
          onHide={closeEditPassModal}
          onComplete={completeUpdatePassHandler}
          userId={userEditPassId}
        />
      )}
      {showEditModal && (
        <EditEmployeeModal
          show={showEditModal}
          onHide={closeEditModal}
          onComplete={completeHandler}
          userDetails={userDetails}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          onHide={closeDeleteModal}
          onComplete={completeHandler}
          userId={userDeleteId}
        />
      )}
    </>
  )
}

export default EmployeessTable
