import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getCities } from '../../partners/_requests';
import { getStates } from '../_requests';

export function FilterDropdown({ onApply, onReset }) {
  const DefOptions = [{ value: '', label: 'all' }];
  const loadOptions = [{ value: '', label: 'loading ...' }];
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [isStatesLoading, setIsStatesLoading] = useState(false);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);
  const [isStatesDisabled, setIsStatesDisabled] = useState(false);
  const [isCitiesDisabled, setIsCitiesDisabled] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [stateChoice, setStateChoice] = useState(DefOptions[0]);
  const [cityChoice, setCityChoice] = useState(DefOptions[0]);

  // Fetch states on component mount
  useEffect(() => {
    setIsStatesLoading(true);
    setIsStatesDisabled(true);
    getStates({ country_iso: 'SA' })
      .then((res) => {
        setStateOptions([
          ...DefOptions,
          ...res.data.data.map((el) => ({
            value: el.id,
            label: el.name,
          })),
        ]);
        setIsStatesLoading(false);
        setIsStatesDisabled(false);
      })
      .catch((err) => {
        setIsStatesLoading(false);
        setIsStatesDisabled(false);
      });
  }, []);

  // Fetch cities when state is selected
  const stateOnChange = (choice) => {
    setIsCitiesLoading(true);
    setIsCitiesDisabled(true);
    setStateChoice(choice);
    setCityChoice(DefOptions[0]);
    setCitiesOptions(DefOptions);

    if (choice.value) {
      getCities({ state_id: choice.value })
        .then((res) => {
          setCitiesOptions([
            ...DefOptions,
            ...res.data.data.map((el) => ({
              value: el.id,
              label: el.name,
            })),
          ]);
          setIsCitiesLoading(false);
          setIsCitiesDisabled(false);
        })
        .catch((err) => {
          setIsCitiesLoading(false);
          setIsCitiesDisabled(false);
        });
    } else {
      setCitiesOptions(DefOptions);
      setIsCitiesLoading(false);
      setIsCitiesDisabled(false);
    }
  };

  // Apply filters
  const applyHandler = () => {
    const filters = {
      year: year ? year.getFullYear() : '',
      month: month ? month.getMonth() + 1 : '', // Months are 0-indexed
      state_id: stateChoice.value,
      city_id: cityChoice.value,
    };
    onApply(filters); // Pass filters to the parent component
  };

  // Reset filters
  const resetHandler = () => {
    setYear(null);
    setMonth(null);
    setStateChoice(DefOptions[0]);
    setCityChoice(DefOptions[0]);
    onReset(); // Notify parent component to reset filters
  };

  return (
    <div
      className='menu menu-sub menu-sub-dropdown w-250px w-md-300px mh-550px scroll'
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
        <div className='mb-3'>
          <label className='form-label fw-bold'>State:</label>
          <div>
            <Select
              isLoading={isStatesLoading}
              isDisabled={isStatesDisabled}
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select state'
              name='state'
              value={stateChoice}
              options={stateOptions}
              onChange={stateOnChange}
            />
          </div>
        </div>
        <div className='mb-5'>
          <label className='form-label fw-bold'>City:</label>
          <div>
            <Select
              isLoading={isCitiesLoading}
              isDisabled={isCitiesDisabled}
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select city'
              name='city'
              value={cityChoice}
              options={citiesOptions}
              onChange={(choice) => setCityChoice(choice)}
            />
          </div>
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