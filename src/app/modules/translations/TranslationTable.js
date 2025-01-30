import React, { useState } from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../_metronic/helpers'
import EditLanguageModal from './EditTranslationModal'
import DeleteModal from './DeleteTranslationModal'
import { Link, useLocation } from 'react-router-dom'
import EditTranslationPartnerModal from './partners/EditTranslationPartnerModal'
import EditTranslationUnitModal from './units/EditTranslationUnitModal'
import DeleteTranslationPartnerModal from './partners/DeleteTranslationPartnerModal'
import DeleteTranslationUnitModal from './units/DeleteTranslationUnitModal'
import DeleteTranslationPageModal from './DeleteTranslationPageModal'

function TranslationTable({ items, onComplete, modelName, translatePageUrl }) {
  const location = useLocation()
  const itemDetails = location.state
  const [translateItemDetails, setTranslateItemDetails] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showEditPartnersModal, setShowEditPartnersModal] = useState(false)
  const [showEditUnitsModal, setShowEditUnitsModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeletePartnersModal, setShowDeletePartnersModal] = useState(false)
  const [showDeletePageModal, setShowDeletePageModal] = useState(false)
  const [showDeleteUnitsModal, setShowDeleteUnitsModal] = useState(false)

  const openEditModal = (item) => {
    if (modelName === 'partner') setShowEditPartnersModal(true)
    else if (modelName === 'unit') setShowEditUnitsModal(true)
    else setShowEditModal(true)

    setTranslateItemDetails(item)
  }

  const openDeleteModal = (item) => {
    if (modelName === 'page') setShowDeletePageModal(true)
    else if (modelName === 'partner') setShowDeletePartnersModal(true)
    else if (modelName === 'unit') setShowDeleteUnitsModal(true)
    else setShowDeleteModal(true)

    setTranslateItemDetails(item)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setShowDeletePartnersModal(false)
    setShowDeleteUnitsModal(false)
    setShowDeletePageModal(false)
  }

  const closeEditModal = () => {
    setShowEditModal(false)
    setShowEditPartnersModal(false)
    setShowEditUnitsModal(false)
  }

  const completeHandler = () => {
    closeEditModal()
    closeDeleteModal()
    onComplete(true)
  }

  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }

  const getTranslationValue = (translations, columnName) => {
    const translation = translations.find((t) => t.column_name === columnName)
    return translation ? translation.translation || '---' : '---'
  }

  const getAllTranslationColumns = () => {
    const allColumns = new Set()
    items.forEach((item) => {
      item.translations.forEach((translation) => {
        allColumns.add(translation.column_name)
      })
    })
    return Array.from(allColumns)
  }

  const translationColumns = getAllTranslationColumns()

  return (
    <>
      <div className='table-responsive'>
        <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
          <thead>
            <tr className='bg-light fs-6'>
              <th className='min-w-100px'>Language</th>
              {translationColumns.map((col) => (
                <th key={col} className='min-w-100px text-center'>{col}</th>
              ))}
              <th className='min-w-100px text-center'>Created</th>
              <th className='min-w-100px text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className='fs-6'>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img
                        src={item.image || toAbsoluteUrl('/media/avatars/blank.png')}
                        alt={item.name}
                        onError={imageErrorHandler}
                      />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <span className='text-dark fw-bold fs-6'>{item.name}</span>
                    </div>
                  </div>
                </td>
                {translationColumns.map((col) => (
                  <td key={`${item.id}-${col}`} className='text-center'>
                    {getTranslationValue(item.translations, col)}
                  </td>
                ))}
                <td className='text-center'>
                  <span className={`badge badge-light-${item.created ? 'primary' : 'danger'}`}>
                    {item.created ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className='text-center'>
                  {translatePageUrl ? (
                    <Link
                      to={translatePageUrl}
                      state={{ itemDetails, translateItemDetails: item }}
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                      onClick={() => openEditModal(item)}
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </Link>
                  ) : (
                    <button
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                      onClick={() => openEditModal(item)}
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </button>
                  )}
                  <button
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    onClick={() => openDeleteModal(item)}
                  >
                    <KTIcon iconName='trash' className='fs-3' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEditModal && (
        <EditLanguageModal
          show={showEditModal}
          onHide={closeEditModal}
          onComplete={completeHandler}
          translateItemDetails={translateItemDetails}
          modelName={modelName}
        />
      )}
      {showEditPartnersModal && (
        <EditTranslationPartnerModal
          show={showEditPartnersModal}
          onHide={closeEditModal}
          onComplete={completeHandler}
          translateItemDetails={translateItemDetails}
          modelName={modelName}
        />
      )}
      {showEditUnitsModal && (
        <EditTranslationUnitModal
          show={showEditUnitsModal}
          onHide={closeEditModal}
          onComplete={completeHandler}
          translateItemDetails={translateItemDetails}
          modelName={modelName}
        />
      )}
      {showDeletePartnersModal && (
        <DeleteTranslationPartnerModal
          show={showDeletePartnersModal}
          onHide={closeDeleteModal}
          onComplete={completeHandler}
          translateItemDetails={translateItemDetails}
          modelName={modelName}
        />
      )}
      {showDeleteUnitsModal && (
        <DeleteTranslationUnitModal
          show={showDeleteUnitsModal}
          onHide={closeDeleteModal}
          onComplete={completeHandler}
          translateItemDetails={translateItemDetails}
          modelName={modelName}
        />
      )}
      {showDeletePageModal && (
        <DeleteTranslationPageModal
          show={showDeletePageModal}
          onHide={closeDeleteModal}
          onComplete={completeHandler}
          translateItemDetails={translateItemDetails}
          modelName={modelName}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          onHide={closeDeleteModal}
          onComplete={completeHandler}
          translateItemDetails={translateItemDetails}
          modelName={modelName}
        />
      )}
    </>
  )
}

export default TranslationTable
