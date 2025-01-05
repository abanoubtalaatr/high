import React, {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'

function CommentViewModal(props) {
  const {show, onHide, userName, comment} = props

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{userName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{comment}</Modal.Body>
    </Modal>
  )
}

export default CommentViewModal
