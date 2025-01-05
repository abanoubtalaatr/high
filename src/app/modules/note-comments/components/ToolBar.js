import {KTIcon} from '../../../../_metronic/helpers'

function ToolBar(props) {
  const {commentDate, repliesCount, commentId} = props
  return (
    <>
      <div className='separator my-5'></div>
      <div className='d-flex gap-5 align-items-center'>
        <span className=' text-gray-700 fw-bolder d-flex'>
          <KTIcon iconName='calendar' className='fs-3 me-1' />
          write on: {commentDate}
        </span>
        {repliesCount > 0 ? (
          <button
            type='button'
            data-bs-toggle='collapse'
            data-bs-target={`#note-${commentId}`}
            aria-expanded='false'
            aria-controls={`note-${commentId}`}
            className=' btn btn-light-primary'
          >
            <KTIcon iconName='message-text-2' className='fs-3 me-1' />
            {repliesCount} replies
          </button>
        ) : (
          <button className='btn btn-bg-light btn-color-muted'>
            <KTIcon iconName='message-text-2' className='fs-3 me-1' />
            {repliesCount} replies
          </button>
        )}
      </div>
      <div className='separator my-5'></div>
    </>
  )
}
export default ToolBar
