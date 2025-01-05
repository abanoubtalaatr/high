import {useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import DeleteModal from './DeleteModal'

function MainNoteComment(props) {
  const {commentDetails, onComplete} = props

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
    <>
      {/* delete button */}
      <div className='position-absolute top-0 end-0'>
        <button
          type='button'
          className='btn btn-light btn-sm btn-flex fw-bold'
          onClick={() => openDeleteModal(commentDetails.id)}
        >
          <KTIcon iconName='trash' className='fs-6 text-muted me-1' />
          delete
        </button>
      </div>

      <div className='d-flex '>
        <div className='symbol symbol-45px me-5'>
          <img
            src={
              commentDetails.comment_by
                ? commentDetails.comment_by.image
                : toAbsoluteUrl('/media/avatars/blank.png')
            }
          />
        </div>
        <div className='d-flex justify-content-start flex-column'>
          <span className='text-dark fw-bold fs-6 me-5 mb-3'>
            {commentDetails.comment_by ? commentDetails.comment_by.name : '---'}
          </span>
          <span className='text-muted fw-semibold text-muted d-block fs-7'>
            {commentDetails.comment || '---'}
          </span>
        </div>
      </div>
      {/* modal */}
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          onHide={closeDeleteModal}
          noteId={noteId}
          mainNote={true}
          onComplete={completeHandler}
        />
      )}
    </>
  )
}
export default MainNoteComment
