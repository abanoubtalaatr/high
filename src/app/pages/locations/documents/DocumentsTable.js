import React, { useState } from 'react'
import { KTIcon } from '../../../../_metronic/helpers'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import { Link } from 'react-router-dom'

function DocumentsTable(props) {
  const { items, onComplete, location } = props
  const [itemId, setItemId] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemDeleteId, setItemDeleteId] = useState('')

  const openEditModal = (id) => {
    setShowEditModal(true)
    setItemId(id)
  }
  const closeEditModal = () => setShowEditModal(false)
  const openDeleteModal = (id) => {
    setShowDeleteModal(true)
    setItemDeleteId(id)
  }
  const closeDeleteModal = () => setShowDeleteModal(false)

  const completeHandler = () => {
    setShowEditModal(false)
    setShowDeleteModal(false)
    onComplete(true)
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
              <th className='min-w-100px text-center'>required</th>
              <th className='min-w-100px text-center'>Actions</th>
            </tr>
          </thead>
          {/* end::Table head */}
          {/* begin::Table body */}
          <tbody>
            {items.map((e) => {
              return (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td className='text-center'>
                    <span
                      className={`badge badge-light-${e.required === 1 ? 'primary' : 'danger'}`}
                    >
                      {e.required === 1 ? 'yes' : 'no'}
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
                      onClick={() => openEditModal(e.id)}
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
        <EditModal
          show={showEditModal}
          onHide={closeEditModal}
          onComplete={completeHandler}
          itemId={itemId}
          location={location}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          onHide={closeDeleteModal}
          onComplete={completeHandler}
          itemId={itemDeleteId}
          location={location}
        />
      )}
    </>
  )
}

export default DocumentsTable
