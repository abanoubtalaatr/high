import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { restoreComment } from '../../_requests';
import { KTIcon, toAbsoluteUrl } from '../../../../../_metronic/helpers';
import DeleteModal from './DeleteModal';
import CommentViewModal from './CommentViewModal';

function CommentsTable({ items, onComplete }) {
  const { userId } = useParams();
  const [itemID, setItemId] = useState('');
  const [selectedComment, setSelectedComment] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openCommentModal = (comment) => {
    setSelectedComment(comment);
    setShowCommentModal(true);
  };

  const closeCommentModal = () => setShowCommentModal(false);

  const openDeleteModal = (id) => {
    setShowDeleteModal(true);
    setItemId(id);
  };

  const closeDeleteModal = () => setShowDeleteModal(false);

  const completeHandler = () => {
    setShowDeleteModal(false);
    onComplete(true);
  };

  const restoreHandler =  (sessionId, commentId) => {
    try {
       restoreComment(sessionId, commentId);
      alert('Comment restored successfully.');
      onComplete(true);
    } catch (error) {
      console.error('Error restoring comment:', error.response?.data || error.message);
      alert('Failed to restore comment. Please try again.');
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-row-dashed table-row-gray-300 align-middle gy-4">
        <thead>
          <tr className="bg-light">
            <th>Comment</th>
            <th className="text-center">Company</th>
            <th className="text-center">Unit</th>
            <th className="text-center">Time</th>
            <th className="text-center">Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((e) => (
            <tr key={e.id}>
              <td>{e.comment || '---'}</td>
              <td className="text-center">{e.company_name || '---'}</td>
              <td className="text-center">{e.unit_name || '---'}</td>
              <td className="text-center">{e.created_at || '---'}</td>
              <td className="text-center">
                <span
                  className={`badge badge-light-${
                    e.status === 0 ? 'dark' : e.status === 1 ? 'danger' : 'primary'
                  }`}
                >
                  {e.status === 0 ? 'Deleted' : e.status === 1 ? 'Deletion Request' : 'Published'}
                </span>
                <br />
                <span className="fs-8">{e.deleted_at}</span>
              </td>
              <td className="text-center">
                <button
                  className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3"
                  onClick={() => openCommentModal(e)}
                >
                  <KTIcon iconName="eye" className="fs-3" />
                </button>
                {e.status === 0 ? (
                  <button
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    onClick={() => restoreHandler(e.unit_id, e.id)}
                  >
                    <i className="fa-solid fa-trash-arrow-up"></i>
                  </button>
                ) : (
                  <button
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    onClick={() => openDeleteModal(e.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          onHide={closeDeleteModal}
          onComplete={completeHandler}
          itemId={itemID}
        />
      )}

      {showCommentModal && selectedComment && (
        <CommentViewModal
          show={showCommentModal}
          onHide={closeCommentModal}
          comment={selectedComment}
        />
      )}
    </div>
  );
}

export default CommentsTable;
