import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import { getActivities, getActivityCategories, getCapacities, getTypes } from '../../_requests'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export function FilterDropdown(porop) {
  const { onAplly, onReset } = porop
  const DefOptions = [{ value: '', label: 'all' }]
  const loadOptions = [{ value: '', label: 'loading ...' }]
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false)
  const [isCategoriesDisabled, setIsCategoriesDisabled] = useState(false)
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(false)
  const [isActivitiesDisabled, setIsActivitiesDisabled] = useState(false)
  const [isCapacitiesLoading, setIsCapacitiesLoading] = useState(false)
  const [isCapacitiesDisabled, setIsCapacitiesDisabled] = useState(false)
  const [isTypesLoading, setIsTypesLoading] = useState(false)
  const [isTypesDisabled, setIsTypesDisabled] = useState(false)
  const [categoriesOptions, setCategoriesOptions] = useState([])
  const [categoryChoice, setCategoryChoice] = useState(DefOptions[0])
  const [activitiesOptions, setActivitiesOptions] = useState([])
  const [activityChoice, setActivityChoice] = useState(DefOptions[0])
  const [typesOptions, setTypesOptions] = useState([])
  const [typeChoice, setTypeChoice] = useState(DefOptions[0])
  const [capacitiesOptions, setCapacitiesOptions] = useState([])
  const [capacityChoice, setCapacityChoice] = useState(DefOptions[0])
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [collectionsOptions, setCollectionsOptions] = useState([
    { value: '', label: 'all' },
    {
      value: 'collected ',
      label: 'collected ',
    },
    {
      value: 'remaining ',
      label: 'remaining ',
    },
  ])
  const [paymentsOptions, setPaymentsOptions] = useState([
    { value: '', label: 'all' },
    {
      value: 'cash ',
      label: 'cash ',
    },
    {
      value: 'online ',
      label: 'online ',
    },
  ])
  const [availabilityChoice, setAvailabilityChoice] = useState(DefOptions[0])

  const categoriesOptionsHandler = () => {
    const newCategoriesOptions = [...DefOptions, ...categoriesOptions]
    setCategoriesOptions(newCategoriesOptions)
  }
  const activitesOptionsHandler = () => {
    const newActivitiesOptions = [...DefOptions, ...activitiesOptions]
    setActivitiesOptions(newActivitiesOptions)
  }
  const typesOptionsHandler = () => {
    const newTypesOptions = [...DefOptions, ...typesOptions]
    setTypesOptions(newTypesOptions)
  }
  const capacitiesOptionsHandler = () => {
    const newCapacitiesOptions = [...DefOptions, ...capacitiesOptions]
    setCapacitiesOptions(newCapacitiesOptions)
  }
  const onCategoriesChange = (choice) => {
    setIsActivitiesLoading(true)
    setIsActivitiesDisabled(true)
    setCategoryChoice(choice)
    setActivityChoice(DefOptions[0])
    if (choice.value) {
      getActivities(choice.value)
        .then((res) => {
          setActivitiesOptions(
            res.data.data.map((el) => ({
              value: el.id,
              label: el.name,
            }))
          )
          setIsActivitiesLoading(false)
          setIsActivitiesDisabled(false)
        })
        .catch((err) => {
          setIsActivitiesLoading(false)
          setIsActivitiesDisabled(false)
        })
    } else {
      setActivitiesOptions(DefOptions)
      setIsActivitiesLoading(false)
      setIsActivitiesDisabled(false)
    }
  }
  useEffect(() => {
    // activity categories
    setIsCategoriesLoading(true)
    setIsCategoriesDisabled(true)
    getActivityCategories()
      .then((res) => {
        setCategoriesOptions(
          res.data.data.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        )
        setIsCategoriesLoading(false)
        setIsCategoriesDisabled(false)
      })
      .catch((err) => {
        categoriesOptionsHandler()
        setIsCategoriesLoading(false)
        setIsCategoriesDisabled(false)
      })
    // types
    setIsTypesLoading(true)
    setIsTypesDisabled(true)
    getTypes()
      .then((res) => {
        setTypesOptions(
          res.data.data.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        )
        setIsTypesLoading(false)
        setIsTypesDisabled(false)
      })
      .catch((err) => {
        typesOptionsHandler()
        setIsTypesLoading(false)
        setIsTypesDisabled(false)
      })
    // Capacities
    setIsCapacitiesLoading(true)
    setIsCapacitiesDisabled(true)
    getCapacities()
      .then((res) => {
        setCapacitiesOptions(
          res.data.data.map((el) => ({
            value: el.name,
            label: el.name,
          }))
        )
        setIsCapacitiesLoading(false)
        setIsCapacitiesDisabled(false)
      })
      .catch((err) => {
        capacitiesOptionsHandler()
        setIsCapacitiesLoading(false)
        setIsCapacitiesDisabled(false)
      })
  }, [])
  useEffect(() => {
    categoriesOptionsHandler()
  }, [isCategoriesLoading])
  useEffect(() => {
    activitesOptionsHandler()
  }, [isActivitiesLoading])
  useEffect(() => {
    typesOptionsHandler()
  }, [isTypesLoading])
  useEffect(() => {
    capacitiesOptionsHandler()
  }, [isCapacitiesLoading])
  // submit buttons
  const applyHandler = () => {
    onAplly(
      categoryChoice.value,
      activityChoice.value,
      typeChoice.value,
      capacityChoice.value,
      availabilityChoice.value
    )
  }
  const resetHandler = () => {
    // setIsLoading(true)
    setCategoryChoice(DefOptions[0])
    setActivityChoice(DefOptions[0])
    setTypeChoice(DefOptions[0])
    setCapacityChoice(DefOptions[0])
    setAvailabilityChoice(DefOptions[0])
    setActivitiesOptions([])
  }

  return (
    <div
      className='menu menu-sub menu-sub-dropdown w-250px w-md-300px mh-350px scroll '
      data-kt-menu='true'
      data-kt-scroll='true'
    // data-kt-scroll-height="{default: '300px'}"
    >
      <div className='px-7 py-5'>
        <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
      </div>
      <div className='separator border-gray-200'></div>
      <div className='px-7 py-5'>
        <div className='mb-3'>
          <label className='form-label fw-bold'>year :</label>
          <DatePicker
            autocomplete='off'
            name='date_from'
            className='form-control form-control-solid mb-3'
            selected={year}
            showYearPicker
            placeholderText='select year'
            dateFormat='yyyy'
            onChange={(date) => setYear(date)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>month :</label>
          <DatePicker
            autocomplete='off'
            name='date_to'
            className='form-control form-control-solid'
            selected={month}
            placeholderText='select month'
            dateFormat='MM'
            showMonthYearPicker
            onChange={(date) => setMonth(date)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>Category :</label>
          <div>
            <Select
              isLoading={isCategoriesLoading}
              isDisabled={isCategoriesDisabled}
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='select category'
              name='category'
              defaultValue={!isCategoriesDisabled ? categoryChoice : loadOptions[0]}
              value={!isCategoriesDisabled ? categoryChoice : loadOptions[0]}
              options={categoriesOptions}
              onChange={onCategoriesChange}
            />
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>activity:</label>
          <div>
            <Select
              isLoading={isActivitiesLoading}
              isDisabled={isActivitiesDisabled}
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='select state'
              name='state'
              defaultValue={!isActivitiesDisabled ? activityChoice : loadOptions[0]}
              value={!isActivitiesDisabled ? activityChoice : loadOptions[0]}
              options={activitiesOptions}
              onChange={(choice) => setActivityChoice(choice)}
            />
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>unit:</label>
          <div>
            <Select
              isLoading={isTypesLoading}
              isDisabled={isTypesDisabled}
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='select state'
              name='type'
              defaultValue={!isTypesDisabled ? typeChoice : loadOptions[0]}
              value={!isTypesDisabled ? typeChoice : loadOptions[0]}
              options={typesOptions}
              onChange={(choice) => setTypeChoice(choice)}
            />
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>transactions type:</label>
          <div>
            <Select
              isLoading={isCapacitiesLoading}
              isDisabled={isCapacitiesDisabled}
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='select state'
              name='capacity'
              defaultValue={!isCapacitiesDisabled ? capacityChoice : loadOptions[0]}
              value={!isCapacitiesDisabled ? capacityChoice : loadOptions[0]}
              options={capacitiesOptions}
              onChange={(choice) => setCapacityChoice(choice)}
            />
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>payment method:</label>
          <div>
            <Select
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='select state'
              name='availability'
              defaultValue={availabilityChoice}
              value={availabilityChoice}
              options={paymentsOptions}
              onChange={(choice) => setAvailabilityChoice(choice)}
            />
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>collection status:</label>
          <div>
            <Select
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='select state'
              name='availability'
              defaultValue={availabilityChoice}
              value={availabilityChoice}
              options={collectionsOptions}
              onChange={(choice) => setAvailabilityChoice(choice)}
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
