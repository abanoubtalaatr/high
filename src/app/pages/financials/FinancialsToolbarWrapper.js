import { PageTitleWrapper } from '../../../_metronic/layout/components/toolbar/page-title';
import { KTIcon } from '../../../_metronic/helpers';
import { useState } from 'react';
import { FilterDropdown } from './FilterDropdown';

function FinancialsToolbarWrapper({ onFilter, onExport }) {
  const [parms, setParms] = useState({
    status: '',
    search: '',
    page: 1,
  });

  // Filter handler
  const filterHandler = (year, month) => {
    const newFilters = { year, month };
    setParms({ ...parms, ...newFilters });
    onFilter(newFilters); // Pass filters to the parent component
  };

  // Reset filter handler
  const resetFilterHandler = () => {
    setParms({ ...parms, year: '', month: '' });
    onFilter({}); // Reset filters in the parent component
  };

  // Export handler
  const exportHandler = () => {
    onExport(); // Trigger export in the parent component
  };

  return (
    <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'>
      <div id='kt_app_toolbar_container' className='p-0 d-flex flex-stack container-fluid'>
        <PageTitleWrapper />
        <div className='d-flex gap-5'>
          <button
            type='button'
            className='btn btn-light btn-sm btn-flex fw-bold'
            onClick={exportHandler}
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
          <FilterDropdown onApply={filterHandler} onReset={resetFilterHandler} />
        </div>
      </div>
    </div>
  );
}

export default FinancialsToolbarWrapper;