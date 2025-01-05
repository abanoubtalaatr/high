import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { getCountries, getStates, getCities } from '../../_requests'

export function FilterDropdown({ onApply, onReset }) {
  const DefOptions = [{ value: '', label: 'All' }]
  const [countries, setCountries] = useState(DefOptions)
  const [states, setStates] = useState(DefOptions)
  const [cities, setCities] = useState(DefOptions)
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [isCountriesLoading, setIsCountriesLoading] = useState(false)
  const [isStatesLoading, setIsStatesLoading] = useState(false)
  const [isCitiesLoading, setIsCitiesLoading] = useState(false)

  useEffect(() => {
    const fetchCountries = async () => {
      setIsCountriesLoading(true)
      try {
        const response = await getCountries()
        setCountries([
          ...DefOptions,
          ...response.data.data.map((country) => ({
            value: country.iso,
            label: country.name,
          })),
        ])
      } catch (error) {
        console.error('Error fetching countries:', error)
      } finally {
        setIsCountriesLoading(false)
      }
    }

    fetchCountries()
  }, [])

  const handleCountryChange = async (selectedCountry) => {
    setSelectedCountry(selectedCountry?.value || '')
    setStates(DefOptions)
    setCities(DefOptions)
    setSelectedState('')
    setSelectedCity('')
    if (selectedCountry?.value) {
      setIsStatesLoading(true)
      try {
        const response = await getStates({ countryId: selectedCountry.value })
        setStates([
          ...DefOptions,
          ...response.data.data.map((state) => ({
            value: state.id,
            label: state.name,
          })),
        ])
      } catch (error) {
        console.error('Error fetching states:', error)
      } finally {
        setIsStatesLoading(false)
      }
    }
  }

  const handleStateChange = async (selectedState) => {
    setSelectedState(selectedState?.value || '')
    setCities(DefOptions)
    setSelectedCity('')
    if (selectedState?.value) {
      setIsCitiesLoading(true)
      try {
        const response = await getCities({ stateId: selectedState.value })
        setCities([
          ...DefOptions,
          ...response.data.data.map((city) => ({
            value: city.id,
            label: city.name,
          })),
        ])
      } catch (error) {
        console.error('Error fetching cities:', error)
      } finally {
        setIsCitiesLoading(false)
      }
    }
  }

  const handleCityChange = (selectedCity) => {
    setSelectedCity(selectedCity?.value || '')
  }

  const applyHandler = () => {
    console.log(selectedCountry,'selected country')
    onApply({ country_iso: selectedCountry, state_id: selectedState, city_id: selectedCity })
  }

  const resetHandler = () => {
    setCountries(DefOptions)
    setStates(DefOptions)
    setCities(DefOptions)
    setSelectedCountry('')
    setSelectedState('')
    setSelectedCity('')
    onReset()
  }

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
          <label className='form-label fw-bold'>Country:</label>
          <div>
            <Select
              isLoading={isCountriesLoading}
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select Country'
              value={countries.find((c) => c.value === selectedCountry) || null}
              options={countries}
              onChange={handleCountryChange}
            />
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>State:</label>
          <div>
            <Select
              isLoading={isStatesLoading}
              isDisabled={states.length === 1}
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select State'
              value={states.find((s) => s.value === selectedState) || null}
              options={states}
              onChange={handleStateChange}
            />
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>City:</label>
          <div>
            <Select
              isLoading={isCitiesLoading}
              isDisabled={cities.length === 1}
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select City'
              value={cities.find((c) => c.value === selectedCity) || null}
              options={cities}
              onChange={handleCityChange}
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
          <button type='button' className='btn btn-sm btn-primary' onClick={applyHandler}>
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
