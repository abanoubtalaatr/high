import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import {getCities, getCountries, getStates} from './_requests'

export function FilterDropdown(porop) {
  const {onAplly, onReset} = porop

  const [isCountriesLoading, setIsCountriesLoading] = useState(false)
  const [isStatesLoading, setIsStatesLoading] = useState(false)
  const [isCitiesLoading, setIsCitiesLoading] = useState(false)
  const [isCountriesDisabled, setIsCountriesDisabled] = useState(false)
  const [isStatesDisabled, setIsStatesDisabled] = useState(false)
  const [isCitiesDisabled, setIsCitiesDisabled] = useState(false)
  const DefOptions = [{value: '', label: 'all'}]
  const loadOptions = [{value: '', label: 'loading ...'}]
  const [countriesOptions, setCountriesOptions] = useState([])
  const [stateOptions, setStateOptions] = useState([])
  const [citiesOptions, setCitiesOptions] = useState([])
  const [countryChoice, setCountryChoice] = useState(DefOptions[0])
  const [stateChoice, setStateChoice] = useState(DefOptions[0])
  const [cityChoice, setCityChoice] = useState(DefOptions[0])

  const countriesOptionsHandler = () => {
    const newCountriesOptions = [...DefOptions, ...countriesOptions]
    setCountriesOptions(newCountriesOptions)
  }
  const stateOptionsHandler = (res) => {
    const newStatesOptions = [...DefOptions, ...stateOptions]
    setStateOptions(newStatesOptions)
  }
  const citiesOptionsHandler = (res) => {
    const newCitiesOptions = [...DefOptions, ...citiesOptions]
    setCitiesOptions(newCitiesOptions)
  }
  const countryOnChange = (choice) => {
    setIsStatesLoading(true)
    setIsStatesDisabled(true)
    setCountryChoice(choice)
    setStateChoice(DefOptions[0])
    setCityChoice(DefOptions[0])
    setCitiesOptions(DefOptions)
    if (choice.value) {
      getStates({country_iso: choice.value})
        .then((res) => {
          setStateOptions(
            res.data.data.map((el) => ({
              value: el.id,
              label: el.name,
            }))
          )
          setIsStatesLoading(false)
          setIsStatesDisabled(false)
        })
        .catch((err) => {
          setIsStatesLoading(false)
          setIsStatesDisabled(false)
        })
    } else {
      setStateOptions(DefOptions)
      setIsStatesLoading(false)
      setIsStatesDisabled(false)
    }
  }
  const stateOnChange = (choice) => {
    setIsCitiesLoading(true)
    setIsCitiesDisabled(true)
    setStateChoice(choice)
    setCityChoice(DefOptions[0])
    setCitiesOptions(DefOptions)
    if (choice.value) {
      getCities({state_id: choice.value})
        .then((res) => {
          setCitiesOptions(
            res.data.data.map((el) => ({
              value: el.id,
              label: el.name,
            }))
          )
          setIsCitiesLoading(false)
          setIsCitiesDisabled(false)
        })
        .catch((err) => {
          setIsCitiesLoading(false)
          setIsCitiesDisabled(false)
        })
    } else {
      setCitiesOptions(DefOptions)
      setIsCitiesLoading(false)
      setIsCitiesDisabled(false)
    }
  }
  const applyHandler = () => {
    onAplly(countryChoice.value, stateChoice.value, cityChoice.value)
  }
  const resetHandler = () => {
    // setIsLoading(true)
    setCountryChoice(DefOptions[0])
    setStateChoice(DefOptions[0])
    setCityChoice(DefOptions[0])
    setStateOptions([])
    setCitiesOptions([])
  }
  useEffect(() => {
    setIsCountriesLoading(true)
    setIsCountriesDisabled(true)
    getCountries()
      .then((res) => {
        setCountriesOptions(
          res.data.data.map((el) => ({
            value: el.iso,
            label: el.name,
          }))
        )
        setIsCountriesLoading(false)
        setIsCountriesDisabled(false)
      })
      .catch((err) => {
        countriesOptionsHandler()
      })
  }, [])
  useEffect(() => {
    countriesOptionsHandler()
  }, [isCountriesLoading])
  useEffect(() => {
    stateOptionsHandler()
  }, [isStatesLoading])
  useEffect(() => {
    citiesOptionsHandler()
  }, [isCitiesLoading])
 

  return (
    <div className='menu menu-sub menu-sub-dropdown w-250px w-md-300px ' data-kt-menu='true'>
      <div className='px-7 py-5'>
        <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
      </div>
      <div className='separator border-gray-200'></div>
      <div className='px-7 py-5'>
        <div className='mb-3'>
          <label className='form-label fw-bold'>country:</label>
          <div>
            <Select
              isLoading={isCountriesLoading}
              isDisabled={isCountriesDisabled}
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='select country'
              name='country'
              defaultValue={!isCountriesDisabled ? countryChoice : loadOptions[0]}
              value={!isCountriesDisabled ? countryChoice : loadOptions[0]}
              options={countriesOptions}
              onChange={countryOnChange}
            />
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>state:</label>
          <div>
            <Select
              isLoading={isStatesLoading}
              isDisabled={isStatesDisabled}
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select state'
              name='state'
              defaultValue={!isStatesDisabled ? stateChoice : loadOptions[0]}
              value={!isStatesDisabled ? stateChoice : loadOptions[0]}
              options={stateOptions}
              onChange={stateOnChange}
            />
          </div>
        </div>
        <div className='mb-5'>
          <label className='form-label fw-bold'>city:</label>
          <div>
            <Select
              isLoading={isCitiesLoading}
              isDisabled={isCitiesDisabled}
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select city'
              name='city'
              defaultValue={!isCitiesDisabled ? cityChoice : loadOptions[0]}
              value={!isCitiesDisabled ? cityChoice : loadOptions[0]}
              options={citiesOptions}
              onChange={(choice) => setCityChoice(choice)}
            />
          </div>
        </div>
        <div className='d-flex justify-content-end mt-5 pt-5 pb-5'>
          <button
            type='reset'
            className='btn btn-sm btn-light btn-active-light-primary me-2'
            // data-kt-menu-dismiss='true'
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
  )
}
