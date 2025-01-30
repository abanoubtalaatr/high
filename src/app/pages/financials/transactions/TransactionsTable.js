import { useState } from 'react';
import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Button } from 'react-bootstrap';

function TransactionsTable(props) {
  const { items } = props;
  const [itemDetails, setItemDetails] = useState('');
  const [showCashOutModal, setShowCashOutModal] = useState(false);
  const [showFundModal, setShowFundModal] = useState(false);

  const openCashOutModal = (item) => {
    setShowCashOutModal(true);
    setItemDetails(item);
  };

  const openFundModal = (item) => {
    setShowFundModal(true);
    setItemDetails(item);
  };

  const closeCashOutModal = () => setShowCashOutModal(false);
  const closeFundModal = () => setShowFundModal(false);

  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png');
  };

  return (
    <div className='table-responsive'>
      {/* begin::Table */}
      <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
        {/* begin::Table head */}
        <thead className='fs-6'>
          <tr className='bg-light'>
            <th className='min-w-100px'>Partner</th>
            <th className='min-w-100px'>Location</th>
            <th className='min-w-100px'>Booking</th>
            <th className='min-w-100px'>Public Event</th>
            <th className='min-w-100px'>All Revenues</th>
            <th className='min-w-100px text-center'>Date</th>
            <th className='min-w-100px text-center'>Actions</th>
          </tr>
        </thead>
        {/* end::Table head */}
        {/* begin::Table body */}
        <tbody className='fs-6'>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <div className='d-flex align-items-center'>
                  <div className='symbol symbol-45px me-5'>
                    <img
                      src={item.photo || toAbsoluteUrl('/media/avatars/blank.png')}
                      alt={item.partner_name}
                      onError={imageErrorHandler}
                    />
                  </div>
                  <div className='d-flex justify-content-start flex-column'>
                    <span className='text-dark fw-bold fs-6'>{item.partner_name}</span>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      #{item.id}
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <div className='d-flex justify-content-start flex-column gap-2'>
                  <span>{item.country}</span>
                  <span>{item.state}</span>
                  <span>{item.city}</span>
                </div>
              </td>
              <td>
                <div className='d-flex justify-content-start flex-column gap-2'>
                  <div className='d-flex'>
                    <span style={{ width: '60px' }}>Cash</span>
                    <span>{Number(item.booking.cash || 0).toFixed(2)}</span>
                  </div>
                  <div className='d-flex'>
                    <span style={{ width: '60px' }}>Online</span>
                    <span>{Number(item.booking.online || 0).toFixed(2)}</span>
                  </div>
                  <div className='d-flex text-dark fw-bold'>
                    <span style={{ width: '60px' }}>Total</span>
                    <span>{Number(item.booking.total || 0).toFixed(2)}</span>
                  </div>
                </div>
              </td>
              <td>
                <div className='d-flex justify-content-start flex-column gap-2'>
                  <div className='d-flex'>
                    <span style={{ width: '60px' }}>Cash</span>
                    <span>{Number(item.public_event.cash || 0).toFixed(2)}</span>
                  </div>
                  <div className='d-flex'>
                    <span style={{ width: '60px' }}>Online</span>
                    <span>{Number(item.public_event.online || 0).toFixed(2)}</span>
                  </div>
                  <div className='d-flex text-dark fw-bold'>
                    <span style={{ width: '60px' }}>Total</span>
                    <span>{Number(item.public_event.total || 0).toFixed(2)}</span>
                  </div>
                </div>
              </td>
              <td>
                <div className='d-flex justify-content-start flex-column gap-2'>
                  <div className='d-flex'>
                    <span style={{ width: '60px' }}>Cash</span>
                    <span>
                      {(
                        Number(item.booking.cash || 0) +
                        Number(item.public_event.cash || 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className='d-flex'>
                    <span style={{ width: '60px' }}>Online</span>
                    <span>
                      {(
                        Number(item.booking.online || 0) +
                        Number(item.public_event.online || 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className='d-flex text-dark fw-bold'>
                    <span style={{ width: '60px' }}>Total</span>
                    <span>
                      {(
                        Number(item.booking.total || 0) +
                        Number(item.public_event.total || 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </td>
              <td className='text-center'>{item.date}</td>
              <td className='text-center'>
                <Link
                  to={`/partners/profile/${item.id}/financials`}
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                >
                  <KTIcon iconName='eye' className='fs-3' />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        {/* end::Table body */}
      </table>
      {/* end::Table */}
    </div>
  );
}

export default TransactionsTable;