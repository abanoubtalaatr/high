import Select from 'react-select'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { getActivities, getActivityCategories } from '../../_requests'
import { useEffect, useState } from 'react'

function UnitsChart(props) {
  const { allUnits, pendingUnits, approvedUnits, notApprovedUnits, errorMessage, filter } = props
  const DefOptions = [{ value: '', label: 'all' }]
  const loadOptions = [{ value: '', label: 'loading ...' }]
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false)
  const [isCategoriesDisabled, setIsCategoriesDisabled] = useState(false)
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(false)
  const [isActivitiesDisabled, setIsActivitiesDisabled] = useState(false)
  const [categoriesOptions, setCategoriesOptions] = useState([])
  const [categoryChoice, setCategoryChoice] = useState(DefOptions[0])
  const [activitiesOptions, setActivitiesOptions] = useState([])
  const [activityChoice, setActivityChoice] = useState(DefOptions[0])

  // chart
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
  const [allColor, pendingColor, approvedColor, notApprovedColor] = [
    'rgba(219, 223, 223, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(255, 205, 86, 1)',
  ]
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
    },
  }
  const labels = ['all', 'pending', 'approved', 'not approved']
  const data = {
    labels,
    datasets: [
      {
        label: 'units',
        data: [allUnits, pendingUnits, approvedUnits, notApprovedUnits],
        backgroundColor: [
          'rgba(219, 223, 223, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(62, 151, 255, 1)',
          'rgba(241, 65, 108, 1)',
        ],
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15,
      },
    ],
  }
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
    filter(choice.value, activityChoice.value)
    // setParms({...parms, category_id: choice.value, activity_id: ''})
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
  const onActivityChange = (choice) => {
    setActivityChoice(choice)

    filter(categoryChoice.value, choice.value)
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

  return (
    <div className='card card-lg-stretch py-5'>
      {/* begin::Header */}
      <div className='card-header border-0 px-5 row'>
        <div className='card-title align-items-start flex-column col-md-8 m-0'>
          <h3 className='card-label fw-bold fs-3 m-0 text-gray-700'>units statistics</h3>
          <small className='text-muted mt-1 fw-semibold fs-7'>
            number of units based on activity.
          </small>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-5 px-5'>
        {/* filter */}
        <div className='row mb-5'>
          <div className='col-md-6'>
            <label className='form-label text-muted'>category</label>
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
          <div className='col-md-6'>
            <label className='form-label text-muted'>activity</label>
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
                onChange={onActivityChange}
              />
            </div>
          </div>
          <div className='col-md-6'></div>
          {/* <div className='col-md-2'>sas</div> */}
        </div>
        {/* end filter */}
        {/* Bar chart */}
        {errorMessage ? (
          <div className='alert alert-danger d-flex align-items-center mb-0'>
            <div className='d-flex flex-column'>{errorMessage}</div>
          </div>
        ) : (
          <Bar options={options} data={data} />
        )}
        {/* end Bar chart */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default UnitsChart
