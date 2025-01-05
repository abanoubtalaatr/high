import React, {useEffect, useRef, useState} from 'react'
import Select from 'react-select'
import {getMembershipsCategories} from '../../_requests'
import {useParams} from 'react-router-dom'

export function FilterDropdown(porop) {
  const {onAplly, onReset} = porop
  const {userId} = useParams()
  const DefOptions = [{value: '', label: 'all'}]
  const loadOptions = [{value: '', label: 'loading ...'}]
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false)
  const [isCategoriesDisabled, setIsCategoriesDisabled] = useState(false)
  const [categoriesOptions, setCategoriesOptions] = useState([])
  const [categoryChoice, setCategoryChoice] = useState(DefOptions[0])

  const categoriesOptionsHandler = () => {
    const newCategoriesOptions = [...DefOptions, ...categoriesOptions]
    setCategoriesOptions(newCategoriesOptions)
  }
  useEffect(() => {
    // categories
    setIsCategoriesLoading(true)
    setIsCategoriesDisabled(true)
    getMembershipsCategories({status: ''}, userId)
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
      })
  }, [])
  useEffect(() => {
    categoriesOptionsHandler()
  }, [isCategoriesLoading])
  const applyHandler = () => {
    onAplly(categoryChoice.value)
  }
  const resetHandler = () => {
    setCategoryChoice(DefOptions[0])
  }
  return (
    <div
      className='menu menu-sub menu-sub-dropdown w-250px w-md-300px mh-350px scroll '
      data-kt-menu='true'
      data-kt-scroll='true'
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
              onChange={(choice) => setCategoryChoice(choice)}
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
