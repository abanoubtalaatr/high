import {useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import UploadFileModal from './UploadFileModal'
import EditDocumentModal from './EditDocumentModal'
import DeleteModal from './DeleteModal'

function DocumentsTable(props) {
  const {items, onComplete} = props

  const [itemDetails, setItemDetails] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const openEditModal = (item) => {
    setShowEditModal(true)
    setItemDetails(item)
  }
  const openDeleteModal = (item) => {
    setShowDeleteModal(true)
    setItemDetails(item)
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
              <th className='min-w-100px text-center'>uploaded by</th>
              <th className='min-w-100px text-center'>uploaded at</th>
              <th className='min-w-100px text-center'>Actions</th>
            </tr>
          </thead>
          {/* end::Table head */}
          {/* begin::Table body */}
          <tbody>
            {items.map((e) => {
              return (
                <tr key={e.id}>
                  <td>{e.file_name || '---'}</td>
                  <td className='text-center'>{e.uploaded_by ? e.uploaded_by.name : '---'}</td>
                  <td className='text-center'>{e.uploaded_at || '---'}</td>
                  <td className='text-center d-flex gap-1 justify-content-center '>
                    <a
                      href={e.file_path || '#'}
                      target='_blank'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                    >
                      <KTIcon iconName='eye' className='fs-3' />
                    </a>
                    <button
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                      onClick={() => openEditModal({id: e.id, file_name: e.file_name})}
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </button>
                    <button
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      onClick={() => openDeleteModal({id: e.id, file_name: e.file_name})}
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
        <EditDocumentModal
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
          itemDetails={itemDetails}
        />
      )}
    </>
  )
}

export default DocumentsTable
