import { useEffect, useState } from 'react';
import { KTIcon } from '../../../_metronic/helpers';
import { getFinancials } from './_requests';
import Spinner from '../../components/spinner/Spinner';
import CountryFinancial from './CountryFinancial';
import FinancialsToolbarWrapper from './FinancialsToolbarWrapper';

function FinancialsWrapper() {
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalRecord, setTotalRecord] = useState(0);
  const [filters, setFilters] = useState({});

  // Get items with filters
  const getItemsHandler = async (filters = {}) => {
    setIsLoaded(true);
    try {
      const res = await getFinancials(filters);
      const data = res.data.data;
      setItems(data);
      setTotalRecord(data.length);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoaded(false);
    }
  };

  // Handle filter changes
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    getItemsHandler(newFilters);
  };

  // Handle export
  const handleExport = () => {
    const csvContent = convertToCSV(items);
    downloadCSV(csvContent, 'financials.csv');
  };

  // Convert data to CSV
  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((item) => Object.values(item).join(',')).join('\n');
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

  // Fetch data on component mount
  useEffect(() => {
    getItemsHandler();
  }, []);

  return (
    <>
      {/* Render FinancialsToolbarWrapper only once */}
      <FinancialsToolbarWrapper onFilter={handleFilter} onExport={handleExport} />
      <div className='row'>
        {isLoaded ? (
          <div className='mb-3'>
            <Spinner contentText={'Loading...'} />
          </div>
        ) : errorMessage ? (
          <div className='alert alert-danger d-flex align-items-center mb-0'>
            <div className='d-flex flex-column'>{errorMessage}</div>
          </div>
        ) : totalRecord === 0 ? (
          <div className='mb-3'>There is no data to display.</div>
        ) : (
          items.map((e) => (
            <CountryFinancial key={e.id} FinancialDetails={e} />
          ))
        )}
      </div>
    </>
  );
}

export default FinancialsWrapper;