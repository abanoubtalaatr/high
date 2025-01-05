import React, { useState } from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../_metronic/helpers'
import EditLanguageModal from './EditTranslationModal'
import DeleteModal from './DeleteTranslationModal'
import { Link, useLocation, useParams } from 'react-router-dom'
import EditTranslationPartnerModal from './partners/EditTranslationPartnerModal'
import EditTranslationUnitModal from './units/EditTranslationUnitModal'
import DeleteTranslationPartnerModal from './partners/DeleteTranslationPartnerModal'
import DeleteTranslationUnitModal from './units/DeleteTranslationUnitModal'
import DeleteTranslationPageModal from './DeleteTranslationPageModal'

function TranslationTable(props) {
  const location = useLocation()
  const itemDetails = location.state
  const { items, onComplete, modelName, translatePageUrl } = props
  const [translateItemDetails, setTranslateItemDetails] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showEditPartnersModal, setShowEditPartnersModal] = useState(false)
  const [showEditUnitsModal, setShowEditUnitsModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeletePartnersModal, setShowDeletePartnersModal] = useState(false)
  const [showDeletePageModal, setShowDeletePageModal] = useState(false)
  const [showDeleteUnitsModal, setShowDeleteUnitsModal] = useState(false)

  const openEditModal = (item) => {
    modelName === 'partner' ? setShowEditPartnersModal(true) : modelName === 'unit' ? setShowEditUnitsModal(true) : setShowEditModal(true)
    setTranslateItemDetails(item)
  }
  const openDeleteModal = (item) => {
    modelName === 'page' ? setShowDeletePageModal(true) :
      modelName === 'partner' ? setShowDeletePartnersModal(true) : modelName === 'unit' ? setShowDeleteUnitsModal(true) : setShowDeleteModal(true)
    setTranslateItemDetails(item)
  }
  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setShowDeletePartnersModal(false)
    setShowDeleteUnitsModal(false)
  }
  const closeEditModal = () => {
    setShowEditModal(false)
    setShowEditPartnersModal(false)
    setShowEditUnitsModal(false)
  }
  const completeHandler = () => {
    setShowEditModal(false)
    setShowEditPartnersModal(false)
    setShowEditUnitsModal(false)
    setShowDeleteModal(false)
    onComplete(true)
  }
  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }
  const translateValueHandler = (arr) => {
    if (Object.values(arr).length !== 0) {
      for (const [key, value] of Object.entries(arr)) {
        return (value.translation || '---')
      }
    }
  }
  const translateHeadHandler = () => {
    if (Object.values(items).length !== 0) {
      for (const [key, value] of Object.entries(items[0].translations)) {
        return (<th className='min-w-100px text-center'>{value.column_name}</th> || '---')
      }
    }
  }
  return (
    <>
      <div className='table-responsive'>
        {/* begin::Table */}
        <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
          {/* begin::Table head */}
          <thead>
            <tr className='bg-light fs-6'>
              <th className='min-w-100px'>language</th>
              {translateHeadHandler()}
              {/* <th className='min-w-100px text-center'>name</th> */}
              <th className='min-w-100px text-center'>created</th>
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
                  <td className='text-center'>{translateValueHandler(e.translations)}</td>
                  {/* <td className='text-center'>{e.translations ? e.translations.translation : '---'}</td> */}
                  <td className='text-center'>
                    <span className={`badge badge-light-${e.created === true ? 'primary' : 'danger'}`}>
                      {e.created === true ? 'yes' : 'no'}
                    </span>
                  </td>
                  <td className='text-center'>
                    {translatePageUrl ? (
                      <Link
                        to={`${translatePageUrl}`}
                        state={{ itemDetails: itemDetails, translateItemDetails: e }}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                        onClick={() => openEditModal(e)}
                      >
                        <KTIcon iconName='pencil' className='fs-3' />
                      </Link>
                    ) : (
                      <button
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                        onClick={() => openEditModal(e)}
                      >
                        <KTIcon iconName='pencil' className='fs-3' />
                      </button>
                    )}
                    <button
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      onClick={() => openDeleteModal(e)}
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
