import {useEffect, useState} from 'react'
import {getNoteComments} from './_requests'
import {useAuth} from '../auth'
import ToolBar from './components/ToolBar'
import AddNoteComment from './components/AddNoteComment'
import ReplieNoteComment from './components/ReplieNoteComment'
import MainNoteComment from './components/MainNoteComment'
import HeaderNoteComment from './components/HeaderNoteComment'

function NotesCommentsPage(props) {
  const {headerTitle, entity_id, noteType} = props
  const {currentUser} = useAuth()

  const [comments, setComments] = useState({})
  const [onComplete, setonComplete] = useState(false)
  const [responseState, setResponseState] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  const [parms, setParms] = useState({
    type: noteType,
    entity_id: entity_id,
  })

  const completeHandler = () => {
    setonComplete(true)
  }
  useEffect(() => {
    onComplete && getItemsHandler()
  }, [onComplete])

  const getItemsHandler = () => {
    getNoteComments(parms)
      .then((res) => {
        setComments(res.data.data)
        setIsLoaded(false)
        setResponseState(true)
      })
      .catch((err) => {
        setErrorMessage(err.message)
        setIsLoaded(false)
        setResponseState(false)
      })
    setonComplete(false)
  }
  useEffect(() => {
    setIsLoaded(true)
    getItemsHandler()
  }, [])

  return (
    <>
      <div className='card mb-5'>
        {/* begin::Header */}
        <HeaderNoteComment
          headerTitle={headerTitle}
          commentsCount={comments.length}
          currentUser={currentUser}
          replyTo={null}
          entityId={entity_id}
          noteType={noteType}
          onComplete={completeHandler}
        />
        {/* end::Header */}
      </div>
      {isLoaded ? (
        'loading ...'
      ) : !responseState ? (
        <div className={`alert alert-danger d-flex align-items-center p-5 mb-0`}>
          <div className='d-flex flex-column'>{errorMessage}</div>
        </div>
      ) : comments.length === 0 ? (
        'no data'
      ) : (
        <>
          {/* notes */}
          {comments.map((comment) => (
            <div className='card mb-5' key={comment.id}>
              {/* begin::Body */}
              <div className='card-body py-10 position-relative'>
                {/* note comment content */}
                <MainNoteComment commentDetails={comment} onComplete={completeHandler} />
                {/* date && replies info toolbar */}
                <ToolBar
                  commentDate={comment.created_at}
                  repliesCount={comment.replies ? comment.replies.length : '0'}
                  commentId={comment.id}
                />
                {/* replies */}
                <div className='collapse bg-light' id={`note-${comment.id}`}>
                  {comment.replies.length > 0 &&
                    comment.replies.map((replyComment) => (
                      <ReplieNoteComment
                        replyComment={replyComment}
                        key={replyComment.id}
                        onComplete={completeHandler}
                      />
                    ))}
                </div>
                {/* add comment area */}
                <AddNoteComment
                  currentUser={currentUser}
                  replyTo={comment.id}
                  entityId={entity_id}
                  noteType={noteType}
                  onComplete={completeHandler}
                />
              </div>
              {/* begin::Body */}
            </div>
          ))}
        </>
      )}
    </>
  )
}

export default NotesCommentsPage
