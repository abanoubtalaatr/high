import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { getCountries } from './_requests' // Adjust the import path if needed

export function FilterDropdown({ onApplyFilters }) {
  const [countryOptions, setCountryOptions] = useState([])
  const [jobOptions, setJobOptions] = useState([
    { value: 'all', label: 'all' },
    { value: 'job', label: 'job 1' },
    { value: 'job', label: 'job 2' },
  ])
  const [statusOptions, setStatusOptions] = useState([
    { value: 'all', label: 'all' },
    { value: 'active', label: 'active' },
    { value: 'inactive', label: 'inactive' },
  ])

  const [countryChoice, setCountryChoice] = useState({ value: 'all', label: 'all' })
  const [jobChoice, setJobChoice] = useState(jobOptions[0])
  const [statusChoice, setStatusChoice] = useState(statusOptions[0])

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        setCountryOptions([
          { value: 'all', label: 'all' },
          ...response.data.data.map(country => ({
            value: country.name,
            label: country.name,
            iso: country.iso, // Assuming 'iso' is a property in the API response
          }))
        ]);
      } catch (error) {
        console.error("Failed to fetch countries", error);
      }
    };

    fetchCountries();
  }, []);

  const applyHandler = () => {
    console.log(countryChoice, 'selected country');
    // Call the parent component's apply filter method with selected values
    onApplyFilters({
      country: countryChoice.iso, // Use ISO code here
      job: jobChoice.value,
      status: statusChoice.value,
    });
  };

  return (
    <div className='menu menu-sub menu-sub-dropdown w-250px w-md-300px' data-kt-menu='true'>
      <div className='px-7 py-5'>
        <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
      </div>
      <div className='separator border-gray-200'></div>
      <div className='px-7 py-5'>
        <div className='mb-3'>
          <label className='form-label fw-bold'>country:</label>
          <div>
            <Select
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select country'
              name='country'
              defaultValue={countryOptions[0]}
              options={countryOptions}
              onChange={setCountryChoice}
            />
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>job:</label>
          <div>
            <Select
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select job'
              name='job'
              defaultValue={jobOptions[0]}
              options={jobOptions}
              onChange={setJobChoice}
            />
          </div>
        </div>
        <div className='mb-10'>
          <label className='form-label fw-bold'>status:</label>
          <div>
            <Select
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select status'
              name='status'
              defaultValue={statusOptions[0]}
              options={statusOptions}
              onChange={setStatusChoice}
            />
          </div>
        </div>

        <div className='d-flex justify-content-end'>
          <button
            type='reset'
            className='btn btn-sm btn-light btn-active-light-primary me-2'
            data-kt-menu-dismiss='true'
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
