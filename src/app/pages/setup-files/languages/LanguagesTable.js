import React, {useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import EditLanguageModal from './EditLanguageModal'
import DeleteModal from './DeleteModal'
import { Link } from 'react-router-dom'

function LanguagesTable(props) {
  const {items, onComplete} = props
  const [itemDetails, setUserDetails] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemDeleteId, setUserDeleteId] = useState('')

  const openEditModal = (item) => {
    setShowEditModal(true)
    setUserDetails(item)
  }
  const openDeleteModal = (id) => {
    setShowDeleteModal(true)
    setUserDeleteId(id)
  }
  const closeDeleteModal = () => setShowDeleteModal(false)
  const closeEditModal = () => setShowEditModal(false)
  const completeHandler = () => {
    setShowEditModal(false)
    setShowDeleteModal(false)
    onComplete(true)
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
            <tr className='bg-light fs-6'>
              <th className='min-w-100px'>name (display name)</th>
              <th className='min-w-100px text-center'>description</th>
              <th className='min-w-100px text-center'>order</th>
              <th className='min-w-100px text-center'>iso</th>
              <th className='min-w-100px text-center'>Status</th>
              <th className='min-w-100px text-center'>Actions</th>
            </tr>
          </thead>
          {/* end::Table head */}
          {/* begin::Table body */}
          <tbody>
            {items.map((e) => {
              return (
                <tr key={e.id} className=' fs-6'>
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
                      </div>
                    </div>
                  </td>
                  <td className='text-center'>{e.description || '---'}</td>
                  <td className='text-center'>{e.order || '---'}</td>
                  <td className='text-center'>{e.code || '---'}</td>
                  <td className='text-center'>
                    <span className={`badge badge-light-${e.active === 1 ? 'primary' : 'danger'}`}>
                      {e.active === 1 ? 'active' : 'inactive'}
                    </span>
                  </td>
                  <td className='text-center'>
                  <Link
                      to={`${e.id}/translation`}
                      state={e}
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                    >
                      <i className='fa-solid fa-globe fs-3'></i>
                    </Link>
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
      {showEditModal && (
        <EditLanguageModal
          show={showEditModal}
          onHide={closeEditModal}
          onComplete={completeHandler}
          itemDetails={itemDetails}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          onHide={closeDeleteModal}
          onComplete={completeHandler}
          itemId={itemDeleteId}
        />
      )}
    </>
  )
}

export default LanguagesTable
