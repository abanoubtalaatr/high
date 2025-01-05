import React, { useState } from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers'
import EditCountryModal from './EditCountryModal'
import { Link } from 'react-router-dom'
import DeleteModal from './DeleteModal'

function CountriesTable(props) {
  const { items, onComplete } = props
  const [itemDetails, setItemDetails] = useState('')
  const [itemID, setItemId] = useState('')
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
  const completeHandler = () => {
    setShowEditModal(false)
    setShowDeleteModal(false)
    onComplete(true)
  }
  const closeEditModal = () => setShowEditModal(false)
  const closeDeleteModal = () => setShowDeleteModal(false)
  return (
    <>
      <div className='table-responsive'>
        {/* begin::Table */}
        <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
          {/* begin::Table head */}
          <thead>
            <tr className='bg-light'>
              <th className='min-w-100px'>name</th>
              <th className='min-w-100px text-center'>ISO</th>
              <th className='min-w-100px text-center'>phone code</th>
              <th className='min-w-100px text-center'>currency</th>
              <th className='min-w-100px text-center'>time zone</th>
              <th className='min-w-100px text-center'>required documents</th>
              <th className='min-w-100px text-center'>taxes</th>
              <th className='min-w-100px text-center'>status</th>
              <th className='min-w-100px text-center'>Actions</th>
            </tr>
          </thead>
          {/* end::Table head */}
          {/* begin::Table body */}
          <tbody>
            {items.map((e) => {
              return (
                <tr key={e.iso}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-30px me-3'>
                        <img src={toAbsoluteUrl(`/media/flags/${e.iso.toLowerCase()}.svg`)} alt='' />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-dark fw-bold fs-6'>{e.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className='text-center'>{e.iso}</td>
                  <td className='text-center'>{e.phone_code || '---'}</td>
                  <td className='text-center'>{(e.currency && e.currency.code) || '---'}</td>
                  <td className='text-center'>{e.timezone || '---'}</td>
                  <td className='text-center'>
                    <Link to={`${e.iso}/documents`}>
                      {e.documents_count || 0}
                      <br />
                      <small>documents</small>
                    </Link>
                  </td>
                  <td className='text-center'>
                    <Link to={`${e.iso}/taxes`}>
                      {e.taxes_count || 0}
                      <br />
                      <small>taxes</small>
                    </Link>
                  </td>
                  <td className='text-center'>
                    <span className={`badge badge-light-${e.active === 1 ? 'primary' : 'danger'}`}>
                      {e.active === 1 ? 'active' : 'inactive'}
                    </span>
                  </td>
                  <td className='text-center'>
                    <Link
                      to={`${e.iso}/translation`}
                      state={{ name: e.name, id: e.iso }}
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
        <EditCountryModal
          show={showEditModal}
          onHide={closeEditModal}
          itemDetails={itemDetails}
          onComplete={completeHandler}
        />
      )}
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

export default CountriesTable
