import React, {useState} from 'react'
import EditModal from './EditModal'
import {KTIcon} from '../../../../_metronic/helpers'
import DeleteModal from './DeleteModal'

function ItemsTable(props) {
  const {items, onComplete} = props
  const [itemID, setItemId] = useState('')
  const [itemDetails, setItemDetails] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const openEditModal = (item) => {
    setShowEditModal(true)
    setItemDetails(item)
  }
  const openDeleteModal = (id) => {
    setShowDeleteModal(true)
    setItemId(id)
  }
  const closeDeleteModal = () => setShowDeleteModal(false)
  const closeEditModal = () => setShowEditModal(false)
  const completeHandler = () => {
    setShowEditModal(false)
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
              <th className='min-w-100px text-center'>description</th>
              <th className='min-w-100px text-center'>employees</th>
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
                  <td>{e.name}</td>
                  <td className='text-center'>{e.description}</td>
                  <td className='text-center'>{e.employees_count}</td>
                  <td className='text-center'>
                    <span className={`badge badge-light-${e.active === 1 ? 'primary' : 'danger'}`}>
                      {e.active === 1 ? 'active' : 'inactive'}
                    </span>
                  </td>
                  <td className='text-center'>
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
        <EditModal
          show={showEditModal}
          onHide={closeEditModal}
          onComplete={completeHandler}
          itemDetails={itemDetails}
        />
      )}
      {showDeleteModal && (
        <DeleteModal show={showDeleteModal} onHide={closeDeleteModal} onComplete={completeHandler} itemId={itemID} />
      )}
    </>
  )
}

export default ItemsTable
