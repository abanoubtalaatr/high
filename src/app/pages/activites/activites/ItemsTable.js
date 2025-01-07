import React, { useState } from 'react'

import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { Link } from 'react-router-dom'

function ItemsTable(props) {
  const { items, onComplete } = props
  const [itemID, setItemId] = useState('')
  const [activityCategoryId, setActivityCategoryId] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }
  const openEditModal = (id) => {
    setShowEditModal(true)
    setItemId(id)
  }
  const openDeleteModal = (id, activityCategoryId) => {
    setShowDeleteModal(true)
    setItemId(id)
    setActivityCategoryId(activityCategoryId)
  }
  const closeEditModal = () => setShowEditModal(false)
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
              <th className='min-w-100px text-center'>order</th>
              <th className='min-w-100px text-center'>min / max</th>
              <th className='min-w-100px text-center'>type</th>
              <th className='min-w-100px text-center'>capacity</th>
              <th className='min-w-100px text-center'>services</th>
              <th className='min-w-100px text-center'>states</th>
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
                  <td className='text-center'>{e.order}</td>
                  <td className='text-center'>
                    {e.min_users_no || '0'} / {e.max_users_no || '0'}
                  </td>
                  <td className='text-center'>
                    {e.types.length > 0
                      ? e.types.map((t) => (
                        <span key={t.id} className='badge badge-light me-1'>
                          {t.name}
                        </span>
                      ))
                      : '---'}
                  </td>
                  <td className='text-center'>
                    {e.capacities.length > 0
                      ? e.capacities.map((c) => (
                        <span key={c.id} className='badge badge-light me-1'>
                          {c.name}
                        </span>
                      ))
                      : '---'}
                  </td>
                  <td className='text-center'>
                    {e.services.length > 0
                      ? e.services.map((s) => (
                        <span key={s.id} className='badge badge-light me-1'>
                          {s.name}
                        </span>
                      ))
                      : '---'}
                  </td>
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
                      onClick={() => openEditModal(e.id)}
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </button>
                    <button
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      onClick={() => openDeleteModal(e.id, e.activity_category_id)}
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
          itemId={itemID}
        />
      )}
      {showDeleteModal && (
        <DeleteModal show={showDeleteModal} onHide={closeDeleteModal} itemId={itemID} activityCategoryId={activityCategoryId}/>
      )}
    </>
  )
}

export default ItemsTable
