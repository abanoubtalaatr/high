import { Link } from 'react-router-dom'
import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { useState } from 'react'
import DeleteModal from './DeleteHelpCenterModal'

function HelpCenterTable(props) {
  const { items, onComplete } = props

  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemDeleteId, setItemDeleteId] = useState('')

  const openDeleteModal = (id) => {
    setShowDeleteModal(true)
    setItemDeleteId(id)
  }
  const closeDeleteModal = () => setShowDeleteModal(false)
  const completeHandler = () => {
    setShowDeleteModal(false)
    onComplete(true)
  }
  return (
    <>
      <div className='table-responsive'>
        {/* begin::Table */}
        <table className='table table-row-dashed table-row-gray-300 align-middle gy-4 fs-6'>
          {/* begin::Table head */}
          <thead>
            <tr className='bg-light'>
              {/* <th className='w-100px'>image</th> */}
              <th className='min-w-100px'>name</th>
              <th className='min-w-100px text-center'>order</th>
              <th className='min-w-100px text-center'>children</th>
              <th className='min-w-100px text-center'>states</th>
              <th className='w-md-200px text-center'>Actions</th>
            </tr>
          </thead>
          {/* end::Table head */}
          {/* begin::Table body */}
          <tbody>
            {items.map((e) => {
              return (
                <tr key={e.id}>
                  <td>{e.title || '---'}</td>
                  <td className='text-center'>{e.order}</td>
                  <td className='text-center'>
                    {
                      e.children > 0 ? (<Link to={`${e.id}/children`} state={{ parentId: e.id, parentTitle: e.title }}>{`${e.children || '0'} children`}</Link>) : '0 children'
                    }
                  </td>
                  <td className='text-center'>
                    <span
                      className={`badge badge-light-${e.status !== 0 ? 'primary' : 'danger'
                        }`}
                    >
                      {e.status !== 0 ? 'active' : 'inactive'}
                    </span>
                  </td>
                  <td className='text-center'>
                    <Link
                      to={`/pages-content/help-center/translations/${e.id}`}
                      state={{ name: e.title, id: e.id, content: e.content }}
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                    >
                      <i className='fa-solid fa-globe fs-3'></i>
                    </Link>
                    <Link
                      to={`/pages-content/help-center/view/${e.id}`}
                      state={{ itemDetails: e, parentId: 0 }}
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                    >
                      <KTIcon iconName='eye' className='fs-3' />
                    </Link>
                    <Link
                      to={`/pages-content/help-center/edit/${e.id}`}
                      state={{ itemDetails: e, parentId: 0 }}
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
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

export default HelpCenterTable
