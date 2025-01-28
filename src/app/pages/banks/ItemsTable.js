import React, { useState } from 'react'
import { KTIcon } from '../../../_metronic/helpers'
import EditModal from './EditModal'
import { Link } from 'react-router-dom'
import DeleteModal from './DeleteModal'

function ItemsTable(props) {
  const { items, selectedCurrency } = props
  
  const [itemID, setItemId] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const closeDeleteModal = () => setShowDeleteModal(false)

  const openEditModal = (id) => {
    setShowEditModal(true)
    setItemId(id)
  }
  const closeEditModal = () => setShowEditModal(false)
  const openDeleteModal = (id) => {
    setShowDeleteModal(true)
    setItemId(id)
  }

  const completeHandler = () => {
    setShowEditModal(false)
    setShowDeleteModal(false)
    // onComplete(true)
  }
  return (
    <>
      <div className='table-responsive'>
        {/* begin::Table */}
        <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
          {/* begin::Table head */}
          <thead>
            <tr className='bg-light fs-6'>
              <th className='min-w-100px'>name</th>
              <th className='min-w-100px text-center'>order</th>
              <th className='min-w-100px text-center'>states</th>
              <th className='min-w-100px text-center'>Actions</th>
            </tr>
          </thead>
          {/* end::Table head */}
          {/* begin::Table body */}
          <tbody>
            {items.map((e) => {
              return (
                <tr key={e.id} className='fs-6'>
                  <td>{e.name}</td>
                  <td className='text-center'>{e.order}</td>
                  
                  <td className='text-center'>
                    <span className={`badge badge-light-${e.active === 1 ? 'primary' : 'danger'}`}>
                      {e.active === 1 ? 'active' : 'inactive'}
                    </span>
                  </td>
                  <td className='text-center'>
                    <button
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                      onClick={() => openEditModal(e.id)}
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </button>
                    <Link
                      to={`${e.id}/translation`}
                      state={e}
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                    >
                      <i className='fa-solid fa-globe fs-3'></i>
                    </Link>
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

      {showEditModal && <EditModal show={showEditModal} onHide={closeEditModal} itemId={itemID} />}
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          onHide={closeDeleteModal}
          onComplete={completeHandler}
          itemId={itemID}
        />
      )}
    </>
  )
}

export default ItemsTable
