import { KTIcon, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import DeleteModal from './DeleteModal'
import { useState } from 'react'
import CommentViewModal from './CommentViewModal'
import { useParams } from 'react-router-dom'
import { restoreComment } from '../../_requests'

function CommentsTable(props) {
  const { unitId } = useParams()
  const { items, onComplete } = props
  const [itemID, setItemId] = useState('')
  const [comment, setComment] = useState('')
  const [userName, setUserName] = useState('')
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }
  const openCommentModal = (userName, text) => {
    setShowCommentModal(true)
    setComment(text)
    setUserName(userName)
  }
  const openDeleteModal = (id) => {
    setShowDeleteModal(true)
    setItemId(id)
  }
  const closeCommentModal = () => setShowCommentModal(false)
  const closeDeleteModal = () => setShowDeleteModal(false)
  const completeHandler = () => {
    setShowDeleteModal(false)
    onComplete(true)
  }
  const restoreHandler = (id) => {
    restoreComment(unitId, id).then((res) => {
      onComplete(true)
    })
  }
  return (
    <div className='table-responsive'>
      {/* begin::Table */}
      <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
        {/* begin::Table head */}
        <thead>
          <tr className='bg-light'>
            <th className='min-w-100px '>user</th>
            <th className='min-w-200px text-center'>comment</th>
            <th className='min-w-100px text-center'>comment on</th>
            <th className='min-w-100px text-center'>rating</th>
            <th className='min-w-100px text-center'>status</th>
            <th className='min-w-100px text-center'>Actions</th>
          </tr>
        </thead>
        {/* end::Table head */}
        {/* begin::Table body */}
        <tbody>
          {items.map((e) => {
            return (
              <tr key={e.id}>
                <td className=''>
                  <div className='d-flex align-items-center gap-5 w-100'>
                    <div className='symbol symbol-45px'>
                      <img
                        src={e.player.image || toAbsoluteUrl('/media/avatars/blank.png')}
                        alt={e.player.name}
                        onError={imageErrorHandler}
                      />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <span className='text-dark fw-bold fs-6'>
                        {e.player ? e.player.name : '---'}
                      </span>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        created at: {e.created_at || '---'}
                      </span>
                    </div>
                  </div>
                </td>
                <td className='text-center'>{e.comment || '---'}</td>
                <td className='text-center'>
                  <div className='d-flex justify-content-start flex-column'>
                    <span className='text-dark fw-bold fs-6'>
                      public event
                    </span>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      #{e.session_id || '---'}
                    </span>
                  </div>
                </td>
                <td className='text-center'>
                  <i className='fa fa-star me-1 text-warning fs-6'></i>
                  {e.rate || 0}
                </td>
                <td className='text-center'>
                  <span
                    className={`badge badge-light-${e.status === 0 ? 'dark' : e.status === 1 ? 'danger' : 'primary'
                      }`}
                  >
                    {e.status === 0 ? 'deleted' : e.status === 1 ? 'deletion request' : 'published'}
                  </span>
                  <br />
                  <span className='fs-8'>{e.deleted_at}</span>
                </td>
                <td className='text-center'>
                  <button
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                    onClick={() => openCommentModal(e.player.name, e.comment)}
                  >
                    <KTIcon iconName='eye' className='fs-3' />
                  </button>
                  {e.status === 0 ? (
                    <button
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      onClick={() => restoreHandler(e.id)}
                    >
                      <i className='fa-solid fa-trash-arrow-up'></i>
                    </button>
                  ) : (
                    <button
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      onClick={() => openDeleteModal(e.id)}
                    >
                      <i className='fa-solid fa-trash'></i>
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
        {/* end::Table body */}
      </table>
      {/* end::Table */}
      {/* modal */}
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          onHide={closeDeleteModal}
          onComplete={completeHandler}
          itemId={itemID}
        />
      )}
      {showCommentModal && (
        <CommentViewModal
          show={showCommentModal}
          onHide={closeCommentModal}
          userName={userName}
          comment={comment}
        />
      )}
    </div>
  )
}

export default CommentsTable
