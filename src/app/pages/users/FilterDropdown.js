import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import {getCities, getCountries, getStates} from './_requests'

export function FilterDropdown(porop) {
  const {onAplly, onReset} = porop

  const [isCountriesLoading, setIsCountriesLoading] = useState(false)
  const [isLocationStatesLoading, setIsLocationStatesLoading] = useState(false)
  const [isLocationCitiesLoading, setIsLocationCitiesLoading] = useState(false)
  const [isCountriesDisabled, setIsCountriesDisabled] = useState(false)
  const [isLocationStatesDisabled, setIsLocationStatesDisabled] = useState(false)
  const [isLocationCitiesDisabled, setIsLocationCitiesDisabled] = useState(false)
  const DefOptions = [{value: '', label: 'all'}]
  const loadOptions = [{value: '', label: 'loading ...'}]
  const [countriesOptions, setCountriesOptions] = useState([])
  const [countryChoice, setCountryChoice] = useState(DefOptions[0])
  const [locationcountriesOptions, setLocationCountriesOptions] = useState([])
  const [stateOptions, setStateOptions] = useState([])
  const [citiesOptions, setLocationCitiesOptions] = useState([])
  const [locationcountryChoice, setLocationCountryChoice] = useState(DefOptions[0])
  const [stateChoice, setLocationStateChoice] = useState(DefOptions[0])
  const [cityChoice, setLocationCityChoice] = useState(DefOptions[0])
  const [genderChoice, setGenderChoice] = useState(DefOptions[0])
  const [ageMinValue, setAgeMinValue] = useState('')
  const [ageMaxValue, setAgeMaxValue] = useState('')
  const [genderOptions, setGenderOptions] = useState([
    {value: 'all', label: 'all'},
    {
      value: 'male',
      label: 'male',
    },
    {
      value: 'female',
      label: 'female',
    },
  ])

  const locationcountriesOptionsHandler = () => {
    const newCountriesOptions = [...DefOptions, ...locationcountriesOptions]
    setCountriesOptions(newCountriesOptions)
    setLocationCountriesOptions(newCountriesOptions)
  }
  const stateOptionsHandler = (res) => {
    const newStatesOptions = [...DefOptions, ...stateOptions]
    setStateOptions(newStatesOptions)
  }
  const citiesOptionsHandler = (res) => {
    const newCitiesOptions = [...DefOptions, ...citiesOptions]
    setLocationCitiesOptions(newCitiesOptions)
  }
  const onChangeCountry = (choice) => {
    setCountryChoice(choice)
  }
  const onChangeLocation = (choice) => {
    setIsLocationStatesLoading(true)
    setIsLocationStatesDisabled(true)
    setLocationCountryChoice(choice)
    setLocationStateChoice(DefOptions[0])
    setLocationCityChoice(DefOptions[0])
    setLocationCitiesOptions(DefOptions)
    if (choice.value) {
      getStates({country_iso: choice.value})
        .then((res) => {
          setStateOptions(
            res.data.data.map((el) => ({
              value: el.id,
              label: el.name,
            }))
          )
          setIsLocationStatesLoading(false)
          setIsLocationStatesDisabled(false)
        })
        .catch((err) => {
          setIsLocationStatesLoading(false)
          setIsLocationStatesDisabled(false)
        })
    } else {
      setStateOptions(DefOptions)
      setIsLocationStatesLoading(false)
      setIsLocationStatesDisabled(false)
    }
  }
  const stateOnChange = (choice) => {
    setIsLocationCitiesLoading(true)
    setIsLocationCitiesDisabled(true)
    setLocationStateChoice(choice)
    setLocationCityChoice(DefOptions[0])
    setLocationCitiesOptions(DefOptions)
    if (choice.value) {
      getCities({state_id: choice.value})
        .then((res) => {
          setLocationCitiesOptions(
            res.data.data.map((el) => ({
              value: el.id,
              label: el.name,
            }))
          )
          setIsLocationCitiesLoading(false)
          setIsLocationCitiesDisabled(false)
        })
        .catch((err) => {
          setIsLocationCitiesLoading(false)
          setIsLocationCitiesDisabled(false)
        })
    } else {
      setLocationCitiesOptions(DefOptions)
      setIsLocationCitiesLoading(false)
      setIsLocationCitiesDisabled(false)
    }
  }
  const onChangeAgeMax = (e) => {
    setAgeMaxValue(e.target.value)
  }
  const onChangeAgeMin = (e) => {
    setAgeMinValue(e.target.value)
  }
  const applyHandler = () => {
    onAplly(locationcountryChoice.value, stateChoice.value, cityChoice.value)
  }
  const resetHandler = () => {
    setCountryChoice(DefOptions[0])
    setLocationCountryChoice(DefOptions[0])
    setLocationStateChoice(DefOptions[0])
    setLocationCityChoice(DefOptions[0])
    setStateOptions([])
    setLocationCitiesOptions([])
    setGenderChoice(DefOptions[0])
    setAgeMaxValue('')
    setAgeMinValue('')
  }
  useEffect(() => {
    setIsCountriesLoading(true)
    setIsCountriesDisabled(true)
    getCountries()
      .then((res) => {
        setLocationCountriesOptions(
          res.data.data.map((el) => ({
            value: el.iso,
            label: el.name,
          }))
        )
        setIsCountriesLoading(false)
        setIsCountriesDisabled(false)
      })
      .catch((err) => {
        locationcountriesOptionsHandler()
      })
  }, [])
  useEffect(() => {
    locationcountriesOptionsHandler()
  }, [isCountriesLoading])
  useEffect(() => {
    stateOptionsHandler()
  }, [isLocationStatesLoading])
  useEffect(() => {
    citiesOptionsHandler()
  }, [isLocationCitiesLoading])
  useEffect(() => {
    // setIsLoading(false)
  }, [locationcountryChoice, stateChoice, cityChoice])

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
              onChange={onChangeCountry}
            />
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>GPS location:</label>
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
              onChange={onChangeCountry}
            />
          </div>
        </div>
        {/* location */}
        <div className='mb-5'>
          <label className='form-label fw-bold'>location:</label>
          <div className='mb-3'>
            <Select
              isLoading={isCountriesLoading}
              isDisabled={isCountriesDisabled}
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='select country'
              name='country'
              defaultValue={!isCountriesDisabled ? locationcountryChoice : loadOptions[0]}
              value={!isCountriesDisabled ? locationcountryChoice : loadOptions[0]}
              options={locationcountriesOptions}
              onChange={onChangeLocation}
            />
          </div>
          <div className='mb-3'>
            <Select
              isLoading={isLocationStatesLoading}
              isDisabled={isLocationStatesDisabled}
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select state'
              name='state'
              defaultValue={!isLocationStatesDisabled ? stateChoice : loadOptions[0]}
              value={!isLocationStatesDisabled ? stateChoice : loadOptions[0]}
              options={stateOptions}
              onChange={stateOnChange}
            />
          </div>
          <div className='mb-3'>
            <Select
              isLoading={isLocationCitiesLoading}
              isDisabled={isLocationCitiesDisabled}
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select city'
              name='city'
              defaultValue={!isLocationCitiesDisabled ? cityChoice : loadOptions[0]}
              value={!isLocationCitiesDisabled ? cityChoice : loadOptions[0]}
              options={citiesOptions}
              onChange={(choice) => setLocationCityChoice(choice)}
            />
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>gender:</label>
          <div>
            <Select
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='select gender'
              name='gender'
              defaultValue={genderChoice}
              value={genderChoice}
              options={genderOptions}
              onChange={(choice) => setGenderChoice(choice)}
            />
          </div>
        </div>

        <div className='mb-3'>
          <label className='form-label fw-bold'>age:</label>
          <div className='row'>
            <div className='col-sm-6'>
              <input
                name='age_from'
                type='number'
                min='1'
                autoComplete='off'
                className='form-control form-control-solid'
                placeholder='min year'
                value={ageMinValue}
                onChange={onChangeAgeMin}
              />
            </div>
            <div className='col-sm-6'>
              <input
                name='age_to'
                type='number'
                min='1'
                autoComplete='off'
                className='form-control form-control-solid'
                placeholder='max year'
                value={ageMaxValue}
                onChange={onChangeAgeMax}
              />
            </div>
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
