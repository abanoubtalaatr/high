import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getCountries, getGeneralJobs } from './_requests'; // Import getJobs from the API helper

export function FilterDropdown({ onApplyFilters }) {
  const [countryOptions, setCountryOptions] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ]);

  const [countryChoice, setCountryChoice] = useState({ value: 'all', label: 'All' });
  const [jobChoice, setJobChoice] = useState(null); // Initially set to null
  const [statusChoice, setStatusChoice] = useState(statusOptions[0]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        setCountryOptions([
          { value: 'all', label: 'All' },
          ...response.data.data.map(country => ({
            value: country.iso, // Use ISO code as value
            label: country.name, // Use country name as label
            iso: country.iso, // Include ISO for future use
          }))
        ]);
      } catch (error) {
        console.error('Failed to fetch countries', error);
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await getGeneralJobs();
        console.log(response.data.data, 'resonse')
        setJobOptions([
          { value: 'all', label: 'All' },
          ...response.data.data.map(job => ({
            value: job.id, // Use job ID
            label: job.name, // Use job name
          }))
        ]);
        setJobChoice({ value: 'all', label: 'All' }); // Default to 'All'
      } catch (error) {
        console.error('Failed to fetch jobs', error);
      }
    };

    fetchCountries();
    fetchJobs();
  }, []);

  const applyHandler = () => {
    const status = (statusChoice.value === 'all' || statusChoice.value === 'All') ? '' : statusChoice.value;

    onApplyFilters({
      country: countryChoice.value, // Send the country ISO code
      job_id: jobChoice.value, // Send the job ID
      
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
          <label className='form-label fw-bold'>Country:</label>
          <div>
            <Select
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select country'
              name='country'
              value={countryChoice} // Controlled component
              options={countryOptions}
              onChange={setCountryChoice}
            />
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>Job:</label>
          <div>
            <Select
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select job'
              name='job'
              value={jobChoice} // Controlled component
              options={jobOptions}
              onChange={setJobChoice}
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
