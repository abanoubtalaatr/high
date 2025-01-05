import DatePicker from 'react-datepicker'
import Select from 'react-select'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import { getActivities, getActivityCategories } from '../../_requests'

function PublicEventsChart(props) {
  const { allPublicEvents, comingPublicEvents, endedPublicEvents, cancelledPublicEvents, statusPublicEvents, playersPublicEvents, errorMessage, filter } = props
  const fullYear = new Date().getFullYear()
  const month = new Date().getMonth() + 1

  const [classAllButton, setClassAllButton] = useState('btn-primary  btn-text-white')
  const [classYearButton, setClassYearButton] = useState('btn-light')
  const [classMonthButton, setClassMonthButton] = useState('btn-light')
  const [filterYear, setFilterYear] = useState(`${fullYear}`)
  const [filterMonth, setFilterMonth] = useState(`${month}/${fullYear}`)
  const [filterDate, setFilterDate] = useState('')
  const [filterType, setFilterType] = useState('')
  const [yearButtonStatus, setYearButtonStatus] = useState(false)
  const [monthButtonStatus, setMonthButtonStatus] = useState(false)
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
  ChartJS.register(ArcElement, Tooltip, Legend)
  const [comingColor, endedColor, canceledColor] = [
    'rgba(255, 205, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(255, 99, 132, 1)',
  ]
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }
  const publicEventsData = {
    labels: ['coming', 'ended', 'canceled'],
    datasets: [
      {
        label: '',
        data: [comingPublicEvents, endedPublicEvents, cancelledPublicEvents],
        backgroundColor: [comingColor, endedColor, canceledColor],
        borderWidth: 0,
      },
    ],
  }
  const numStatusData = statusPublicEvents.full + statusPublicEvents.missing + statusPublicEvents.blank
  const statusData = {
    labels: ['full', 'missing', 'empty'],
    datasets: [
      {
        label: '',
        data: [statusPublicEvents.full, statusPublicEvents.missing, statusPublicEvents.blank],
        backgroundColor: [comingColor, endedColor, canceledColor],
        borderWidth: 0,
      },
    ],
  }
  const numPlayersData = playersPublicEvents.joined + playersPublicEvents.lefted + playersPublicEvents.removed
  const playersData = {
    labels: ['joined', 'lefted', 'removed'],
    datasets: [
      {
        label: '',
        data: [playersPublicEvents.joined, playersPublicEvents.lefted, playersPublicEvents.removed],
        backgroundColor: [comingColor, endedColor, canceledColor],
        borderWidth: 0,
      },
    ],
  }
  // end chart
  const [monthDate, setMonthDate] = useState(new Date())
  const [yearDate, setYearDate] = useState(new Date())
  const statusHandler = (e, buttonId) => {
    if (buttonId === 'all') {
      setFilterDate('')
      setMonthButtonStatus(false)
      setYearButtonStatus(false)
      filter(categoryChoice.value, activityChoice.value, e, '')
      setClassAllButton('btn-primary btn-text-white')
    } else {
      setClassAllButton('btn-light')
    }
    if (buttonId === 'year') {
      const fullYear = new Date().getFullYear()
      setFilterYear(fullYear)
      setFilterDate(fullYear)
      setMonthButtonStatus(false)
      setYearButtonStatus(true)
      filter(categoryChoice.value, activityChoice.value, e, filterYear)
      setClassYearButton('btn-primary  btn-text-white')
    } else {
      setClassYearButton('btn-light')
    }
    if (buttonId === 'month') {
      const fullYear = new Date().getFullYear()
      const month = new Date().getMonth() + 1
      setFilterMonth(`${month}/${fullYear}`)
      setFilterDate(`${month}/${fullYear}`)
      setYearButtonStatus(false)
      setMonthButtonStatus(true)
      filter(categoryChoice.value, activityChoice.value, e, filterMonth)
      setClassMonthButton('btn-primary  btn-text-white')
    } else {
      setClassMonthButton('btn-light')
    }
    setFilterType(e)
  }
  const monthHandler = (date) => {
    const fullYear = new Date(date).getFullYear()
    const month = new Date(date).getMonth() + 1
    filter(categoryChoice.value, activityChoice.value, filterType, `${month}/${fullYear}`)
    setFilterMonth(`${month}/${fullYear}`)
    setMonthDate(date)
    setFilterDate(`${month}/${fullYear}`)
  }
  const yearHandler = (date) => {
    const fullYear = new Date(date).getFullYear()
    filter(categoryChoice.value, activityChoice.value, filterType, fullYear)
    setFilterYear(fullYear)
    setYearDate(date)
    setFilterDate(fullYear)
  }
  // end DatePicker
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
    filter(choice.value, DefOptions[0].value, filterType, filterDate)
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

    filter(categoryChoice.value, choice.value, filterType, filterDate)
  }
  const percentCalculate = (min, max) => {
    return parseInt(((min / max) * 100).toFixed(1)) || 0
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
      <div className='card-header border-0 px-5'>
        <div className='card-title align-items-start flex-column col-md-8 m-0'>
          <h3 className='card-label fw-bold fs-3 m-0 text-gray-700'>public events statistics</h3>
          <small className='text-muted mt-1 fw-semibold fs-7'>
            public events statistics for the current month.
          </small>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-5 px-5'>
        {/* filter */}
        <div className='row mb-5'>
          <div className='col-md-3'>
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
          <div className='col-md-3'>
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
          <div className='col-md-3'>
            <label className='form-label text-muted'>date type</label>
            <div className='d-flex gap-3 pb-4' data-kt-buttons='true'>
              <button
                type='button'
                className={`btn ${classAllButton} btn-sm`}
                onClick={(s) => {
                  statusHandler('all', 'all')
                }}
              >
                all
              </button>
              <button
                type='button'
                className={`btn ${classYearButton} btn-sm`}
                onClick={(s) => {
                  statusHandler('year', 'year')
                }}
              >
                year
              </button>
              <button
                type='button'
                className={`btn ${classMonthButton} btn-sm`}
                onClick={(s) => {
                  statusHandler('month', 'month')
                }}
              >
                month
              </button>
            </div>
          </div>
          <div className='col-md-3'>
            {monthButtonStatus && (
              <>
                <label className='form-label text-muted'>month</label>
                <div>
                  <DatePicker
                    autocomplete='off'
                    className='form-control form-control-sm form-control-solid mb-3 w-100'
                    selected={monthDate}
                    onChange={monthHandler}
                    showMonthYearPicker
                    dateFormat='MM/yyyy'
                  />
                </div>
              </>
            )}

            {yearButtonStatus && (
              <>
                <label className='form-label text-muted'>year</label>
                <div>
                  <DatePicker
                    autocomplete='off'
                    className='form-control form-control-sm form-control-solid mb-3 w-100'
                    selected={yearDate}
                    onChange={yearHandler}
                    showYearPicker
                    dateFormat='yyyy'
                  />
                </div>
              </>
            )}
          </div>
        </div>
        {/* end filter */}
        {/* pie chart */}
        {errorMessage ? (
          <div className='alert alert-danger d-flex align-items-center mb-0'>
            <div className='d-flex flex-column'>{errorMessage}</div>
          </div>
        ) : (
          <div className='row'>
            <div className='col-md-4'>
              <div className='h-300px d-flex align-items-center justify-content-center'>
                {allPublicEvents > 0 ?
                  (
                    <Doughnut options={options} data={publicEventsData} />
                  )
                  : '0 Statistics'}
              </div>

              <h5 className='text-gray-500 fs-6 text-center mt-5'>public events ({allPublicEvents})</h5>
              <div className='d-flex flex-column content-justify-center flex-row-fluid w-lg-75 m-auto py-5'>
                <div className='d-flex fw-semibold align-items-center'>
                  <div
                    className='bullet w-8px h-3px rounded-2 me-3'
                    style={{ background: comingColor }}
                  ></div>
                  <div className='text-gray-500 w-50 me-4'>coming</div>
                  <div className='fw-bolder text-gray-700 w-50 text-end'>
                    <span className='text-muted me-2 fs-7'>{percentCalculate(comingPublicEvents, allPublicEvents)}%</span>
                    <span className='text-muted me-2 fs-7'>{comingPublicEvents}</span>
                  </div>
                </div>
                <div className='d-flex fw-semibold align-items-center my-3'>
                  <div
                    className='bullet w-8px h-3px rounded-2 me-3'
                    style={{ background: endedColor }}
                  ></div>
                  <div className='text-gray-500 w-50 me-4'>ended</div>
                  <div className='fw-bolder text-gray-700 w-50 text-end'>
                    <span className='text-muted me-2 fs-7'>{percentCalculate(endedPublicEvents, allPublicEvents)}%</span>
                    <span className='text-muted me-2 fs-7'>{endedPublicEvents}</span>
                  </div>
                </div>
                <div className='d-flex fw-semibold align-items-center'>
                  <div
                    className='bullet w-8px h-3px rounded-2 me-3'
                    style={{ background: canceledColor }}
                  ></div>
                  <div className='text-gray-500 w-50 me-4'>canceled</div>
                  <div className='fw-bolder text-gray-700 w-50 text-end'>
                    <span className='text-muted me-2 fs-7'>{percentCalculate(cancelledPublicEvents, allPublicEvents)}%</span>
                    <span className='text-muted me-2 fs-7'>{cancelledPublicEvents}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='h-300px d-flex align-items-center justify-content-center'>
                {allPublicEvents > 0 ?
                  (
                    <Doughnut options={options} data={statusData} />
                  )
                  : '0 Statistics'}
              </div>
              <h5 className='text-gray-500 fs-6 text-center mt-5'>success performance ({numStatusData})</h5>
              <div className='d-flex flex-column content-justify-center flex-row-fluid w-lg-75 m-auto py-5'>
                <div className='d-flex fw-semibold align-items-center'>
                  <div
                    className='bullet w-8px h-3px rounded-2 me-3'
                    style={{ background: comingColor }}
                  ></div>
                  <div className='text-gray-500 w-50 me-4'>full</div>
                  <div className='fw-bolder text-gray-700 w-50 text-end'>
                    <span className='text-muted me-2 fs-7'>{percentCalculate(statusPublicEvents.full, numStatusData)}%</span>
                    <span className='text-muted me-2 fs-7'>{statusPublicEvents.full}</span>
                  </div>
                </div>
                <div className='d-flex fw-semibold align-items-center my-3'>
                  <div
                    className='bullet w-8px h-3px rounded-2 me-3'
                    style={{ background: endedColor }}
                  ></div>
                  <div className='text-gray-500 w-50 me-4'>missing</div>
                  <div className='fw-bolder text-gray-700 w-50 text-end'>
                    <span className='text-muted me-2 fs-7'>{percentCalculate(statusPublicEvents.missing, numStatusData)}%</span>
                    <span className='text-muted me-2 fs-7'>{statusPublicEvents.missing}</span>
                  </div>
                </div>
                <div className='d-flex fw-semibold align-items-center'>
                  <div
                    className='bullet w-8px h-3px rounded-2 me-3'
                    style={{ background: canceledColor }}
                  ></div>
                  <div className='text-gray-500 w-50 me-4'>empty</div>
                  <div className='fw-bolder text-gray-700 w-50 text-end'>
                    <span className='text-muted me-2 fs-7'>{percentCalculate(statusPublicEvents.blank, numStatusData)}%</span>
                    <span className='text-muted me-2 fs-7'>{statusPublicEvents.blank}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='h-300px d-flex align-items-center justify-content-center'>
                {allPublicEvents > 0 ?
                  (
                    <Doughnut options={options} data={playersData} />
                  )
                  : '0 Statistics'}
              </div>
              <h5 className='text-gray-500 fs-6 text-center mt-5'>in & out users ({numPlayersData})</h5>
              <div className='d-flex flex-column content-justify-center flex-row-fluid w-lg-75 m-auto py-5'>
                <div className='d-flex fw-semibold align-items-center'>
                  <div
                    className='bullet w-8px h-3px rounded-2 me-3'
                    style={{ background: comingColor }}
                  ></div>
                  <div className='text-gray-500 w-50 me-4'>joined</div>
                  <div className='fw-bolder text-gray-700 w-50 text-end'>
                    <span className='text-muted me-2 fs-7'>{percentCalculate(playersPublicEvents.joined, numPlayersData)}%</span>
                    <span className='text-muted me-2 fs-7'>{playersPublicEvents.joined}</span>
                  </div>
                </div>
                <div className='d-flex fw-semibold align-items-center my-3'>
                  <div
                    className='bullet w-8px h-3px rounded-2 me-3'
                    style={{ background: endedColor }}
                  ></div>
                  <div className='text-gray-500 w-50 me-4'>left</div>
                  <div className='fw-bolder text-gray-700 w-50 text-end'>
                    <span className='text-muted me-2 fs-7'>{percentCalculate(playersPublicEvents.lefted, numPlayersData)}%</span>
                    <span className='text-muted me-2 fs-7'>{playersPublicEvents.lefted}</span>
                  </div>
                </div>
                <div className='d-flex fw-semibold align-items-center'>
                  <div
                    className='bullet w-8px h-3px rounded-2 me-3'
                    style={{ background: canceledColor }}
                  ></div>
                  <div className='text-gray-500 w-50 me-4'>remove</div>
                  <div className='fw-bolder text-gray-700 w-50 text-end'>
                    <span className='text-muted me-2 fs-7'>{percentCalculate(playersPublicEvents.removed, numPlayersData)}%</span>
                    <span className='text-muted me-2 fs-7'>{playersPublicEvents.removed}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* end pie chart */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default PublicEventsChart
