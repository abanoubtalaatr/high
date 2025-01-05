import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { deleteJob } from '../_requests';

function DeleteModal(props) {
  const { show, onHide, onComplete, itemId } = props;
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const confirmHandler = () => {
    setConfirmDelete(true);
  };

  useEffect(() => {
    if (confirmDelete) {
      setLoading(true);
      deleteJob(itemId)
        .then((res) => {
          setAlertType('success');
          setAlertMessage(res.data.message || 'Job deleted successfully!');
          setConfirmDelete(false);
          onComplete(false); // Notify parent of successful deletion
        })
        .catch((err) => {
          setAlertType('danger');
          setAlertMessage(err.response?.data?.message || 'Failed to delete job. Please try again later.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [confirmDelete, itemId, onComplete]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alertType && (
          <div className={`mb-lg-15 alert alert-${alertType}`}>
            <div className="alert-text font-weight-bold">{alertMessage}</div>
          </div>
        )}
        <p>Please confirm that you want to delete this item.</p>
        <span className="text-danger fs-6">
          You cannot delete any job that is linked to any employee.
        </span>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary mt-5 mb-5"
          data-kt-indicator={loading ? 'on' : undefined}
          onClick={confirmHandler}
          disabled={loading}
        >
          <span className="indicator-label">Confirm</span>
          {loading && (
            <span className="indicator-progress">
              Confirm ...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
