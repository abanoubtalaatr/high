import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function FilterDropdown({ onApply, onReset }) {
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);

  // Apply filters
  const applyHandler = () => {
    const yearValue = year ? year.getFullYear() : '';
    const monthValue = month ? month.getMonth() + 1 : ''; // Months are 0-indexed
    onApply(yearValue, monthValue);
  };

  // Reset filters
  const resetHandler = () => {
    setYear(null);
    setMonth(null);
    onReset();
  };

  return (
    <div
      className='menu menu-sub menu-sub-dropdown w-250px w-md-300px mh-350px scroll'
      data-kt-menu='true'
      data-kt-scroll='true'
    >
      <div className='px-7 py-5'>
        <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
      </div>
      <div className='separator border-gray-200'></div>
      <div className='px-7 py-5'>
        <div className='mb-3'>
          <label className='form-label fw-bold'>Year:</label>
          <DatePicker
            autocomplete='off'
            className='form-control form-control-solid mb-3'
            selected={year}
            showYearPicker
            placeholderText='Select year'
            dateFormat='yyyy'
            onChange={(date) => setYear(date)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>Month:</label>
          <DatePicker
            autocomplete='off'
            className='form-control form-control-solid'
            selected={month}
            placeholderText='Select month'
            dateFormat='MM'
            showMonthYearPicker
            onChange={(date) => setMonth(date)}
          />
        </div>
        <div className='d-flex justify-content-end mt-5 pt-5 pb-5'>
          <button
            type='reset'
            className='btn btn-sm btn-light btn-active-light-primary me-2'
            onClick={resetHandler}
          >
            Reset
          </button>
          <button
            type='button'
            className='btn btn-sm btn-primary'
            data-kt-menu-dismiss='true'
            onClick={applyHandler}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}