import React from 'react'
import {Modal} from 'react-bootstrap'

function CommentViewModal(props) {
  const {show, onHide, comment} = props

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>View Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {comment ? (
          <div>
            <p><strong>ID:</strong> {comment.id}</p>
            <p><strong>Type:</strong> {comment.type}</p>
            <p><strong>Session ID:</strong> {comment.session_id}</p>
            <p><strong>Comment:</strong> {comment.comment}</p>
            <p><strong>Rate:</strong> {comment.rate}</p>
            <p><strong>Company Name:</strong> {comment.company_name}</p>
            <p><strong>Unit Name:</strong> {comment.unit_name}</p>
            <p><strong>Created At:</strong> {comment.created_at}</p>
            <p><strong>Deleted Reason:</strong> {comment.deleted_reason}</p>
            <p><strong>Deleted At:</strong> {comment.deleted_at}</p>
            <p><strong>Status:</strong> {comment.status}</p>
          </div>
        ) : (
          <p>No comment details available.</p>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default CommentViewModal
