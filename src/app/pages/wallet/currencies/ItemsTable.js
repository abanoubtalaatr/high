import React, { useState } from 'react'
import { KTIcon } from '../../../../_metronic/helpers'
import EditModal from './EditModal'

function ItemsTable(props) {
  const { items, selectedCurrency } = props
  const [itemID, setItemId] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)

  const openEditModal = (id) => {
    setShowEditModal(true)
    setItemId(id)
  }
  const closeEditModal = () => setShowEditModal(false)

  return (
    <>
      <div className='table-responsive'>
        {/* begin::Table */}
        <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
          {/* begin::Table head */}
          <thead>
            <tr className='bg-light fs-6'>
              <th className='min-w-100px'>name</th>
              <th className='min-w-100px text-center'>currency</th>
              {/* <th className='min-w-100px '>API exchange value</th> */}
              {/* <th className='min-w-100px '>wallet exchange value</th> */}
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
                  <td className='text-center'>{e.code}</td>
                  {/* <td className=''>1 = {e.exchange_rate} {selectedCurrency}</td> */}
                  {/* <td className=''>1 = {e.exchange_rate} {selectedCurrency}</td> */}
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
    </>
  )
}

export default ItemsTable
