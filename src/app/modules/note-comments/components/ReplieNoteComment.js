import {useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import DeleteModal from './DeleteModal'

function ReplieNoteComment(props) {
  const {replyComment, onComplete} = props

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [noteId, setNoteId] = useState(0)

  const openDeleteModal = (id) => {
    setShowDeleteModal(true)
    setNoteId(id)
  }
  const closeDeleteModal = () => setShowDeleteModal(false)
  const completeHandler = () => {
    onComplete(true)
  }
  return (
    <div className='p-10 position-relative  border-gray-200 border-bottom' key={replyComment.id}>
      <div className='position-absolute top-0 end-0'>
        <button
          type='button'
          className='btn btn-light btn-sm btn-flex fw-bold'
          onClick={() => openDeleteModal(replyComment.id)}
        >
          <KTIcon iconName='trash' className='fs-6 text-muted me-1' />
          delete
        </button>
      </div>
      <div className='d-flex'>
        <div className='symbol symbol-45px me-5'>
          <img
            src={
              replyComment.comment_by
                ? replyComment.comment_by.image
                : toAbsoluteUrl('/media/avatars/blank.png')
            }
          />
        </div>
        <div className='d-flex justify-content-start flex-column'>
          <span className='mb-3'>
            <span className='text-dark fw-bold fs-6 me-5'>
              {replyComment.comment_by ? replyComment.comment_by.name : '---'}
            </span>
            <span className='text-muted fs-6'>{replyComment.created_at || '---'}</span>
          </span>
          <span className='text-muted fw-semibold text-muted d-block fs-7'>
            {replyComment.comment || '---'}
          </span>
        </div>
      </div>

      {/* modal */}
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          onHide={closeDeleteModal}
          noteId={noteId}
          mainNote={false}
          onComplete={completeHandler}
        />
      )}
    </div>
  )
}
export default ReplieNoteComment
