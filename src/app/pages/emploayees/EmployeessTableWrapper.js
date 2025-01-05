import React, { useEffect, useState } from 'react';
import { KTIcon } from '../../../_metronic/helpers';
import { FilterDropdown } from './FilterDropdown';
import { getEmployees } from './_requests';
import EmployeessTable from './EmployeessTable';
import Pagination from '../../components/pagination/Pagination';
import Spinner from '../../components/spinner/Spinner';

function EmployeessTableWrapper(props) {
  const { refreshTable, startRefreshTable, stopRefresh } = props;
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalRecord, setTotalRecord] = useState(0);
  const [filters, setFilters] = useState({
    active: '',
    search: '',
    page: 1,
    limit: 15,
    country: '',
    job: '',
    status: ''
  });
  const [parms, setParms] = useState({
    active: '',
    search: '',
    page: 1,
    limit: 15,
  });

  // Apply Filters
  const applyFiltersHandler = (filters) => {
    setFilters(filters);
    console.log(filters,'filters')
    setParms({
      ...parms,
      ...filters,
      page: 1 // Reset to first page when filters are applied
    });
  };

  // Pagination Handler
  const paginationHandler = (paginationParams) => {
    setFilters({ ...filters, ...paginationParams });
  };

  // Status Filter Handler
  const statusHandler = (e, buttonId) => {
    buttonId === 'all'
      ? setFilters({ ...filters, active: '' })
      : setFilters({ ...filters, active: e });
    setParms({ ...parms, page: 1 }); // Reset to first page when status filter is applied
  };

  // Search Handler
  const searchHandler = (e) => {
    let inputValue = e.target.value;
    setFilters({ ...filters, search: inputValue });
  };

  // Filter Button Click
  const filterHandler = () => {
    startRefreshTable(true);
  };

  const getitemssHandler = () => {
    setIsLoaded(true);
    getEmployees(filters)
      .then((res) => {
        setItems(res.data.data);
        setIsLoaded(false);
        stopRefresh(true);
        setTotalRecord(res.data.total);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setIsLoaded(false);
      });
  };

  useEffect(() => {
    getitemssHandler();
  }, [filters]);

  useEffect(() => {
    if (refreshTable) {
      getitemssHandler();
    }
  }, [refreshTable]);

  return (
    <>
      <div className='card'>
        <div className='card-header border-0 pt-5 align-items-end'>
          <div>
            <div className='card-toolbar gap-3'>
              <button
                type='button'
                className={`btn ${filters.active === '' ? 'btn-bg-dark btn-text-white' : 'btn-light'}`}
                onClick={(s) => statusHandler(' ', 'all')}
              >
                all
              </button>
              <button
                type='button'
                className={`btn ${filters.active === '1' ? 'btn-bg-dark btn-text-white' : 'btn-light'}`}
                onClick={(s) => statusHandler('1', 'active')}
              >
                active
              </button>
              <button
                type='button'
                className={`btn ${filters.active === '0' ? 'btn-bg-dark btn-text-white' : 'btn-light'}`}
                onClick={(s) => statusHandler('0', 'inactive')}
              >
                inactive
              </button>
            </div>
          </div>
          <div>
            <div className='card-toolbar gap-3 mb-5'>
              <span className='w-lg-350px w-100'>
                <div className='d-flex align-items-center position-relative'>
                  <KTIcon
                    iconName='magnifier'
                    className='fs-3 text-muted me-1 ms-4 position-absolute'
                  />
                  <input
                    type='search'
                    className='form-control form-control-solid form-control-sm ps-12'
                    placeholder='search by name, phone, or email'
                    name='search'
                    onChange={searchHandler}
                  />
                </div>
              </span>
              <span>
                <a
                  href='#'
                  className='btn btn-light btn-sm btn-flex fw-bold'
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                  data-kt-menu-static='true'
                >
                  <KTIcon iconName='filter' className='fs-6 text-muted me-1' />
                  Filter
                </a>
                <FilterDropdown onApplyFilters={applyFiltersHandler} />
              </span>
            </div>
          </div>
        </div>
        <div className='card-body py-3'>
          {isLoaded ? (
            <div className='mb-3'>
              <Spinner contentText={'loading ...'} />
            </div>
          ) : errorMessage ? (
            <div className='alert alert-danger d-flex align-items-center mb-0'>
              <div className='d-flex flex-column'>{errorMessage}</div>
            </div>
          ) : totalRecord === 0 ? (
            <div className='mb-3'>there is no data to display</div>
          ) : (
            <EmployeessTable items={items} onComplete={filterHandler} />
          )}
        </div>
        {totalRecord > 0 && (
          <div className='card-footer'>
            <Pagination totalRecord={totalRecord} paginationParams={paginationHandler} />
          </div>
        )}
      </div>
    </>
  );
}

export default EmployeessTableWrapper;
