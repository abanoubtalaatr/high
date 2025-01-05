import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { KTIcon } from '../../../../../_metronic/helpers';
import { Link } from 'react-router-dom';

function FinancialsTable(props) {
  const { items } = props;
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  return (
    <div className='table-responsive'>
      {/* begin::Table */}
      <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
        {/* begin::Table head */}
        <thead>
          <tr className='bg-light'>
            <th className='min-w-100px fs-6'>#</th>
            <th className='min-w-100px text-center fs-6'>Activity</th>
            <th className='min-w-100px text-center fs-6'>Unit</th>
            <th className='min-w-100px text-center fs-6'>Transaction Type</th>
            <th className='min-w-100px text-center fs-6'>Booking Status</th>
            <th className='min-w-100px text-center fs-6'>Date & Time</th>
            <th className='min-w-100px text-center fs-6'>Revenue</th>
            <th className='min-w-100px text-center fs-6'>Collected Amount</th>
            <th className='min-w-100px text-center fs-6'>Actions</th>
          </tr>
        </thead>
        {/* end::Table head */}
        {/* begin::Table body */}
        <tbody>
          {items.map((e) => {
            return (
              <tr key={e.id}>
                <td>#{e.id}</td>
                <td className='text-center fs-6'>
                  <div className='d-flex justify-content-start flex-column'>
                    <span>{e.activity_category_name || '---'}</span>
                    <span>{e.activity_name || '---'}</span>
                  </div>
                </td>
                <td className='text-center fs-6'>Unit name</td>
                <td className='text-center fs-6'>
                  <div className='d-flex justify-content-start flex-column'>
                    <span>Transaction type</span>
                    <span>ID: #1234</span>
                  </div>
                </td>
                <td className='text-center fs-6'>
                  <span
                    className={`badge badge-${
                      e.status.toLowerCase() === 'coming'
                        ? 'success'
                        : e.status.toLowerCase() === 'ended'
                        ? 'primary'
                        : 'danger'
                    }`}
                  >
                    {e.status}
                  </span>
                </td>
                <td className='text-center fs-6'>
                  <div className='d-flex justify-content-start flex-column'>
                    <span className='fs-6'>{e.start_time || '---'}</span>
                    <span className='fs-6'>{e.end_time || '---'}</span>
                  </div>
                </td>
                <td className='text-center fs-6'>
                  <div className='d-flex justify-content-start flex-column'>
                    <span>
                      {e.price_per_user || '0'} <span className='fs-8'>SAR</span>
                    </span>
                    <span>{e.payment_method || 'cash'}</span>
                  </div>
                </td>
                <td className='text-center fs-6'>
                  <div className='d-flex justify-content-start flex-column'>
                    <span>
                      {e.price_per_user || '0'} <span className='fs-8'>SAR</span>
                    </span>
                    <span>{e.payment_method || 'partner'}</span>
                  </div>
                </td>
                <td className='text-center fs-6'>
                  <Link
                    to='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    onClick={(event) => {
                      event.preventDefault();
                      handleShowModal(e);
                    }}
                  >
                    <KTIcon iconName='eye' className='fs-3' />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
        {/* end::Table body */}
      </table>
      {/* end::Table */}

      {/* Modal */}
      {selectedItem && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Details for #{selectedItem.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Activity:</strong> {selectedItem.activity_name || '---'}</p>
            <p><strong>Transaction Type:</strong> Transaction type here</p>
            <p><strong>Status:</strong> {selectedItem.status}</p>
            <p><strong>Start Time:</strong> {selectedItem.start_time || '---'}</p>
            <p><strong>End Time:</strong> {selectedItem.end_time || '---'}</p>
            <p><strong>Revenue:</strong> {selectedItem.price_per_user || '0'} SAR</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default FinancialsTable;
