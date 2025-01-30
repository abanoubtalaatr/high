import { useEffect, useState } from 'react';
import Pagination from '../../../components/pagination/Pagination';
import Spinner from '../../../components/spinner/Spinner';
import { KTIcon } from '../../../../_metronic/helpers';
import { useLocation, useParams } from 'react-router-dom';
import { getTransactionsCountry } from '../_requests';
import { useIntl } from 'react-intl';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Button } from 'react-bootstrap';
import TransactionsTable from './TransactionsTable';
import { FilterDropdown } from './FilterDropdown';

function Transactions() {
  const { iso } = useParams();
  const intl = useIntl();
  const location = useLocation();
  const countryName = location.state.countryName;
  const [totalRecord, setTotalRecord] = useState(0);
  const [items, setItems] = useState([]);
  const [statistics, setStatistics] = useState({
    booking: { online_revenue: 0, cash_revenue: 0, online_collected: 0, cash_collected: 0 },
    public_event: { online_revenue: 0, cash_revenue: 0, online_collected: 0, cash_collected: 0 },
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [filters, setFilters] = useState({
    year: '',
    month: '',
    state_id: '',
    city_id: '',
    page: 1,
    limit: 15,
  });

  // Get items with filters
  const getItemsHandler = async () => {
    setIsLoaded(true);
    try {
      const res = await getTransactionsCountry(iso, filters);
      setItems(res.data.data.items.data);
      setStatistics(res.data.data.statistics);
      setTotalRecord(res.data.data.items.total);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoaded(false);
    }
  };

  // Handle filter changes
  const handleFilter = (newFilters) => {
    setFilters({ ...filters, ...newFilters, page: 1 }); // Reset to first page when filters are applied
  };

  // Handle export
  const handleExport = () => {
    const csvContent = convertToCSV(items);
    downloadCSV(csvContent, 'transactions.csv');
  };

  // Convert data to CSV
  const convertToCSV = (data) => {
    console.log(data, 'data');
    
    // Get the headers by excluding 'public_event' and 'bookings'
    const headers = Object.keys(data[0])
      .filter(key => key !== 'public_event' && key !== 'booking')
      .join(',');
  
    // Get the rows by excluding 'public_event' and 'bookings' keys
    const rows = data
      .map((item) => 
        Object.entries(item)
          .filter(([key]) => key !== 'public_event' && key !== 'booking')  // Exclude these keys
          .map(([_, value]) => value)  // Get the values of the remaining keys
          .join(',')
      )
      .join('\n');
  
    return `${headers}\n${rows}`;
  };
  

  // Download CSV
  const downloadCSV = (content, fileName) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  // Get the dynamic date for the header
  const getDynamicDate = () => {
    const currentDate = new Date();
    const year = filters.year || currentDate.getFullYear();
    const month = filters.month || currentDate.getMonth() + 1; // Months are 0-indexed
    return `${String(month).padStart(2, '0')}/${year}`;
  };

  // Fetch data on component mount or when filters change
  useEffect(() => {
    getItemsHandler();
  }, [filters]);

  return (
    <>
      <div className='card mb-10 py-5'>
        {/* begin::Header */}
        <div className='card-header border-0'>
          <h5 className='card-title align-items-start flex-column'>
            <span className='mb-3 fw-bolder'>
              {countryName} transactions of {getDynamicDate()} in all partners
            </span>
          </h5>
          <div>
            <div className='card-toolbar gap-3'>
              <button
                type='button'
                className='btn btn-light btn-sm btn-flex fw-bold'
                onClick={handleExport}
              >
                <KTIcon iconName='file-up' className='fs-6 text-muted me-1' />
                Export
              </button>
              <button
                type='button'
                className='btn btn-light btn-sm btn-flex fw-bold'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
                data-kt-menu-static='true'
              >
                <KTIcon iconName='filter' className='fs-6 text-muted me-1' />
                Filter
              </button>
              <FilterDropdown onApply={handleFilter} onReset={() => setFilters({ ...filters, year: '', month: '', state_id: '', city_id: '', page: 1 })} />
            </div>
          </div>
        </div>
        <div className='card-body py-3'>
          <div className='row'>
            {/* Booking Statistics */}
            <div className='col-md-4 px-5'>
              <table className='table table-row-dashed gs-0 gy-3'>
                <thead className='fs-6'>
                  <tr>
                    <th className='min-w-100px text-dark fw-bold fs-3'>Booking</th>
                    <th className='min-w-100px'>Revenue</th>
                    <th className='min-w-100px'>Collected</th>
                  </tr>
                </thead>
                <tbody className='fs-6'>
                  <tr>
                    <td>Online</td>
                    <td>{Number(statistics.booking.online_revenue || 0).toFixed(2)}</td>
                    <td>
                      <span className='d-flex gap-2'>
                        {Number(statistics.booking.online_collected || 0).toFixed(2)}
                        <OverlayTrigger
                          placement='top'
                          overlay={<Tooltip>Collected by Highfive</Tooltip>}
                        >
                          <Button variant='' className='p-0 m-0'>
                            <i className='ki-duotone ki-information fs-3 text-danger'>
                              <span className='path1'></span>
                              <span className='path2'></span>
                              <span className='path3'></span>
                            </i>
                          </Button>
                        </OverlayTrigger>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Cash</td>
                    <td>{Number(statistics.booking.cash_revenue || 0).toFixed(2)}</td>
                    <td>
                      <span className='d-flex gap-2'>
                        {Number(statistics.booking.cash_collected || 0).toFixed(2)}
                        <OverlayTrigger
                          placement='top'
                          overlay={<Tooltip>Amount to be collected</Tooltip>}
                        >
                          <Button variant='' className='p-0 m-0'>
                            <i className='ki-duotone ki-information fs-3 text-danger'>
                              <span className='path1'></span>
                              <span className='path2'></span>
                              <span className='path3'></span>
                            </i>
                          </Button>
                        </OverlayTrigger>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-dark fw-bold'>Total (SAR)</td>
                    <td className='text-dark fw-bold'>
                      {(
                        Number(statistics.booking.online_revenue || 0) +
                        Number(statistics.booking.cash_revenue || 0)
                      ).toFixed(2)}
                    </td>
                    <td className='text-dark fw-bold'>
                      {(
                        Number(statistics.booking.online_collected || 0) +
                        Number(statistics.booking.cash_collected || 0)
                      ).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Public Event Statistics */}
            <div className='col-md-4 px-5'>
              <table className='table table-row-dashed gs-0 gy-3'>
                <thead className='fs-6'>
                  <tr>
                    <th className='min-w-100px text-dark fw-bold fs-3'>Public Event</th>
                    <th className='min-w-100px'>Revenue</th>
                    <th className='min-w-100px'>Collected</th>
                  </tr>
                </thead>
                <tbody className='fs-6'>
                  <tr>
                    <td>Online</td>
                    <td>{Number(statistics.public_event.online_revenue || 0).toFixed(2)}</td>
                    <td>
                      <span className='d-flex gap-2'>
                        {Number(statistics.public_event.online_collected || 0).toFixed(2)}
                        <OverlayTrigger
                          placement='top'
                          overlay={<Tooltip>Collected by Highfive</Tooltip>}
                        >
                          <Button variant='' className='p-0 m-0'>
                            <i className='ki-duotone ki-information fs-3 text-danger'>
                              <span className='path1'></span>
                              <span className='path2'></span>
                              <span className='path3'></span>
                            </i>
                          </Button>
                        </OverlayTrigger>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Cash</td>
                    <td>{Number(statistics.public_event.cash_revenue || 0).toFixed(2)}</td>
                    <td>
                      <span className='d-flex gap-2'>
                        {Number(statistics.public_event.cash_collected || 0).toFixed(2)}
                        <OverlayTrigger
                          placement='top'
                          overlay={<Tooltip>Amount to be collected</Tooltip>}
                        >
                          <Button variant='' className='p-0 m-0'>
                            <i className='ki-duotone ki-information fs-3 text-danger'>
                              <span className='path1'></span>
                              <span className='path2'></span>
                              <span className='path3'></span>
                            </i>
                          </Button>
                        </OverlayTrigger>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-dark fw-bold'>Total (SAR)</td>
                    <td className='text-dark fw-bold'>
                      {(
                        Number(statistics.public_event.online_revenue || 0) +
                        Number(statistics.public_event.cash_revenue || 0)
                      ).toFixed(2)}
                    </td>
                    <td className='text-dark fw-bold'>
                      {(
                        Number(statistics.public_event.online_collected || 0) +
                        Number(statistics.public_event.cash_collected || 0)
                      ).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Revenues Statistics */}
            <div className='col-md-4 px-5'>
              <table className='table table-row-dashed'>
                <thead className='fs-6'>
                  <tr>
                    <th className='min-w-100px text-dark fw-bold fs-3'>Revenues</th>
                    <th className='min-w-100px'>Revenue</th>
                    <th className='min-w-100px'>Collected</th>
                  </tr>
                </thead>
                <tbody className='fs-6'>
                  <tr>
                    <td>Online</td>
                    <td>
                      {(
                        Number(statistics.booking.online_revenue || 0) +
                        Number(statistics.public_event.online_revenue || 0)
                      ).toFixed(2)}
                    </td>
                    <td>
                      <span className='d-flex gap-2'>
                        {(
                          Number(statistics.booking.online_collected || 0) +
                          Number(statistics.public_event.online_collected || 0)
                        ).toFixed(2)}
                        <OverlayTrigger
                          placement='top'
                          overlay={<Tooltip>Collected by Highfive</Tooltip>}
                        >
                          <Button variant='' className='p-0 m-0'>
                            <i className='ki-duotone ki-information fs-3 text-danger'>
                              <span className='path1'></span>
                              <span className='path2'></span>
                              <span className='path3'></span>
                            </i>
                          </Button>
                        </OverlayTrigger>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Cash</td>
                    <td>
                      {(
                        Number(statistics.booking.cash_revenue || 0) +
                        Number(statistics.public_event.cash_revenue || 0)
                      ).toFixed(2)}
                    </td>
                    <td>
                      <span className='d-flex gap-2'>
                        {(
                          Number(statistics.booking.cash_collected || 0) +
                          Number(statistics.public_event.cash_collected || 0)
                        ).toFixed(2)}
                        <OverlayTrigger
                          placement='top'
                          overlay={<Tooltip>Amount to be collected</Tooltip>}
                        >
                          <Button variant='' className='p-0 m-0'>
                            <i className='ki-duotone ki-information fs-3 text-danger'>
                              <span className='path1'></span>
                              <span className='path2'></span>
                              <span className='path3'></span>
                            </i>
                          </Button>
                        </OverlayTrigger>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-dark fw-bold'>Total (SAR)</td>
                    <td className='text-dark fw-bold'>
                      {(
                        Number(statistics.booking.online_revenue || 0) +
                        Number(statistics.booking.cash_revenue || 0) +
                        Number(statistics.public_event.online_revenue || 0) +
                        Number(statistics.public_event.cash_revenue || 0)
                      ).toFixed(2)}
                    </td>
                    <td className='text-dark fw-bold'>
                      {(
                        Number(statistics.booking.online_collected || 0) +
                        Number(statistics.booking.cash_collected || 0) +
                        Number(statistics.public_event.online_collected || 0) +
                        Number(statistics.public_event.cash_collected || 0)
                      ).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className='card mb-10'>
        <div className='card-body py-3'>
          {isLoaded ? (
            <div className='mb-3'>
              <Spinner contentText={'Loading...'} />
            </div>
          ) : errorMessage ? (
            <div className='alert alert-danger d-flex align-items-center p-5 mb-0'>
              <div className='d-flex flex-column'>{errorMessage}</div>
            </div>
          ) : totalRecord === 0 ? (
            <div className='mb-3'>There is no data to display.</div>
          ) : (
            <TransactionsTable items={items} />
          )}
        </div>
        {totalRecord > 0 && (
          <div className='card-footer'>
            <Pagination totalRecord={totalRecord} paginationParams={(params) => setFilters({ ...filters, ...params })} />
          </div>
        )}
      </div>
    </>
  );
}

export default Transactions;