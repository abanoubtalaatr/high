import React, {useEffect, useRef, useState} from 'react'
import Select from 'react-select'

export function FilterDropdown() {
  const CategoryOptions = [
    {value: 'all', label: 'all'},
    {value: 'category1', label: 'category1'},
    {value: 'category2', label: 'category2'},
  ]
  const activityOptions = [
    {value: 'all', label: 'all'},
    {value: 'Activity1', label: 'Activity1'},
    {value: 'Activity2', label: 'Activity2'},
  ]
  const typeOptions = [
    {value: 'all', label: 'all'},
    {value: 'type1', label: 'type 1'},
    {value: 'type2', label: 'type 2'},
    {value: 'type3', label: 'type 3'},
    {value: 'type4', label: 'type 4'},
  ]
  const capacityOptions = [
    {value: 'all', label: 'all'},
    {value: 'capacity', label: 'capacity 1'},
    {value: 'capacity 2', label: 'capacity 2'},
    {value: 'capacity 3', label: 'capacity 3'},
  ]
  const availabilityOptions = [
    {value: 'all', label: 'all'},
    {value: 'Availabile', label: 'Availabile 1'},
    {value: 'Maintenance', label: 'Maintenance'},
  ]

  const [CategoryChoice, setCategoryChoice] = useState('')
  const [activityChoice, setActivityChoice] = useState('')
  const [typeChoice, setTypeChoice] = useState('')
  const [capacityChoice, setCapacityChoice] = useState('')
  const [availabilityChoice, setAvailabilityChoice] = useState('')

  useEffect(() => {
    // console.log(CategoryChoice.value)
    // console.log(stateChoice.value)
    // console.log(typeChoice.value)
    // console.log(statusChoice.value)
  }, [CategoryChoice, activityChoice, typeChoice, capacityChoice, availabilityChoice])
  return (
    <div
      className='menu menu-sub menu-sub-dropdown w-250px w-md-300px scroll '
      data-kt-menu='true'
      data-kt-scroll='true'
      data-kt-scroll-height="{default: '500px'}"
    >
      <div className='px-7 py-5'>
        <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
      </div>
      <div className='separator border-gray-200'></div>
      <div className='px-7 py-5'>
        <div className='mb-3'>
          <label className='form-label fw-bold'>Category :</label>
          <div>
            <Select
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select Category '
              name='Category '
              defaultValue={CategoryOptions[0]}
              options={CategoryOptions}
              onChange={(choice) => setCategoryChoice(choice)}
            />
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>activity:</label>
          <div>
            <Select
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select state'
              name='state'
              defaultValue={activityOptions[0]}
              options={activityOptions}
              onChange={(choice) => setActivityChoice(choice)}
            />
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>type:</label>
          <div>
            <Select
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select city'
              name='city'
              defaultValue={typeOptions[0]}
              options={typeOptions}
              onChange={(choice) => setTypeChoice(choice)}
            />
          </div>
        </div>
        <div className='mb-10'>
          <label className='form-label fw-bold'>capacity:</label>
          <div>
            <Select
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select status'
              name='status'
              defaultValue={capacityOptions[0]}
              options={capacityOptions}
              onChange={(choice) => setCapacityChoice(choice)}
            />
          </div>
        </div>
        <div className='mb-10'>
          <label className='form-label fw-bold'>availability:</label>
          <div>
            <Select
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Select status'
              name='status'
              defaultValue={availabilityOptions[0]}
              options={availabilityOptions}
              onChange={(choice) => setAvailabilityChoice(choice)}
            />
          </div>
        </div>

        {/* <div className='mb-10'>
          <label className='form-label fw-bold'>Member Type:</label>

          <div className='d-flex'>
            <label className='form-check form-check-sm form-check-custom form-check-solid me-5'>
              <input className='form-check-input' type='checkbox' value='1' />
              <span className='form-check-label'>Author</span>
            </label>

            <label className='form-check form-check-sm form-check-custom form-check-solid'>
              <input className='form-check-input' type='checkbox' value='2' defaultChecked={true} />
              <span className='form-check-label'>Customer</span>
            </label>
          </div>
        </div>

        <div className='mb-10'>
          <label className='form-label fw-bold'>Notifications:</label>

          <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              name='notifications'
              defaultChecked={true}
            />
            <label className='form-check-label'>Enabled</label>
          </div>
        </div> */}

        <div className='d-flex justify-content-end'>
          <button
            type='reset'
            className='btn btn-sm btn-light btn-active-light-primary me-2'
            data-kt-menu-dismiss='true'
          >
            Reset
          </button>

          <button type='button' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
