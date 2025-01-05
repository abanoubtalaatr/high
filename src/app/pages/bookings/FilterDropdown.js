import React, {useEffect, useRef, useState} from 'react'
import Select from 'react-select'
import {getActivities, getActivityCategories} from './_requests'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export function FilterDropdown(porop) {
  const {onAplly, onReset} = porop
  const bookingTypesOptions = [
    {value: '', label: 'all'},
    {value: 'online', label: 'online'},
    {value: 'linked', label: 'linked'},
    {value: 'manual', label: 'manual'},
  ]
  const sessionGenderOptions = [
    {value: '', label: 'all'},
    {value: 'male', label: 'male'},
    {value: 'female', label: 'female'},
    {value: 'both', label: 'both'},
  ]

  const DefOptions = [{value: '', label: 'all'}]
  const loadOptions = [{value: '', label: 'loading ...'}]
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false)
  const [isCategoriesDisabled, setIsCategoriesDisabled] = useState(false)
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(false)
  const [isActivitiesDisabled, setIsActivitiesDisabled] = useState(false)
  const [categoriesOptions, setCategoriesOptions] = useState([])
  const [categoryChoice, setCategoryChoice] = useState(DefOptions[0])
  const [activitiesOptions, setActivitiesOptions] = useState([])
  const [activityChoice, setActivityChoice] = useState(DefOptions[0])
  const [bookingTypeChoice, setBookingTypeChoice] = useState(bookingTypesOptions[0])
  const [sessionGenderChoice, setSessionGenderChoice] = useState(sessionGenderOptions[0])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const categoriesOptionsHandler = () => {
    const newCategoriesOptions = [...DefOptions, ...categoriesOptions]
    setCategoriesOptions(newCategoriesOptions)
  }
  const activitesOptionsHandler = () => {
    const newActivitiesOptions = [...DefOptions, ...activitiesOptions]
    setActivitiesOptions(newActivitiesOptions)
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
  }, [])

  useEffect(() => {
    categoriesOptionsHandler()
  }, [isCategoriesLoading])
  useEffect(() => {
    activitesOptionsHandler()
  }, [isActivitiesLoading])

  // submit buttons
  const applyHandler = () => {
    const date_from = startDate ? new Date(startDate).toLocaleDateString('sv-SE') : ''
    const date_to = endDate ? new Date(endDate).toLocaleDateString('sv-SE') : ''
    onAplly(
      date_from,
      date_to,
      categoryChoice.value,
      activityChoice.value,
      sessionGenderChoice.value,
      bookingTypeChoice.value
    )
  }
  const resetHandler = () => {
    setStartDate('')
    setEndDate('')
    setCategoryChoice(DefOptions[0])
    setActivityChoice(DefOptions[0])
    setBookingTypeChoice(DefOptions[0])
    setSessionGenderChoice(DefOptions[0])
    setActivitiesOptions([])
  }
  return (
    <div
      className='menu menu-sub menu-sub-dropdown w-250px w-md-300px mh-500px scroll'
      data-kt-menu='true'
      data-kt-scroll='true'
    >
      <div className='px-7 py-5'>
        <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
      </div>
      <div className='separator border-gray-200'></div>
      <div className='px-7 py-5'>
        <div className='mb-3'>
          <label className='form-label fw-bold'>session date :</label>
          <div className='d-flex justify-content-start flex-column'>
            <DatePicker
              autoComplete='off'
              name='date_from'
              className='form-control form-control-solid mb-3'
              selected={startDate}
              placeholderText='select session start'
              dateFormat='dd/MM/yyyy'
              onChange={(date) => setStartDate(date)}
            />
            <DatePicker
              autoComplete='off'
              name='date_to'
              className='form-control form-control-solid'
              selected={endDate}
              placeholderText='select session end'
              dateFormat='dd/MM/yyyy'
              onChange={(date) => setEndDate(date)}
            />
          </div>
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
              placeholder='select activity'
              name='activity'
              defaultValue={!isActivitiesDisabled ? activityChoice : loadOptions[0]}
              value={!isActivitiesDisabled ? activityChoice : loadOptions[0]}
              options={activitiesOptions}
              onChange={(choice) => setActivityChoice(choice)}
            />
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>booking type:</label>
          <div>
            <Select
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='select booking type'
              name='booking_type'
              defaultValue={bookingTypeChoice}
              value={bookingTypeChoice}
              options={bookingTypesOptions}
              onChange={(choice) => setBookingTypeChoice(choice)}
            />
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>session Gender:</label>
          <div>
            <Select
              isSearchable={true}
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='select session Gender'
              name='gender'
              defaultValue={sessionGenderChoice}
              value={sessionGenderChoice}
              options={sessionGenderOptions}
              onChange={(choice) => setSessionGenderChoice(choice)}
            />
          </div>
        </div>

        <div className='d-flex justify-content-end'>
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
