import {KTIcon} from '../../../../_metronic/helpers'
import AddNoteComment from './AddNoteComment'

function HeaderNoteComment(props) {
  const {headerTitle, commentsCount, currentUser, replyTo, entityId, noteType, onComplete} = props
  return (
    <>
      <div className='card-header pt-5'>
        <h5 className='card-title align-items-start flex-column'>
          <span className='fw-bolder mb-3'>
            {headerTitle}
            {`(${commentsCount || 0})`}
          </span>
        </h5>
        <div className='card-toolbar gap-3 mb-5'>
          <button
            className='btn btn-primary btn-sm btn-flex fw-bold'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#main-note'
            aria-expanded='false'
            aria-controls='main-note'
          >
            <KTIcon iconName='plus' className='fs-6 me-1' />
            new note
          </button>
        </div>
      </div>

      <div className='collapse' id='main-note'>
        <div className='card-body py-10 position-relative'>
          <AddNoteComment
            currentUser={currentUser}
            replyTo={replyTo}
            entityId={entityId}
            noteType={noteType}
            onComplete={onComplete}
          />
        </div>
      </div>
    </>
  )
}
export default HeaderNoteComment
