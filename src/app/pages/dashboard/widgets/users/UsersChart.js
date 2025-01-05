import DatePicker from 'react-datepicker'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useEffect, useState } from 'react'

function UsersChart(props) {
  const { statistics, errorMessage, filter } =
    props
  const fullYear = new Date().getFullYear()
  const month = new Date().getMonth() + 1

  const [classAllButton, setClassAllButton] = useState('btn-primary  btn-text-white')
  const [classYearButton, setClassYearButton] = useState('btn-light')
  const [classMonthButton, setClassMonthButton] = useState('btn-light')
  const [chartLabel, setChartLabel] = useState([])
  const [chartData, setChartData] = useState([])
  const [filterYear, setFilterYear] = useState(`${fullYear}`)
  const [filterMonth, setFilterMonth] = useState(`${month}/${fullYear}`)
  const [filterType, setFilterType] = useState('')
  const [yearButtonStatus, setYearButtonStatus] = useState(false)
  const [monthButtonStatus, setMonthButtonStatus] = useState(false)

  // start chart
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
    },
  }
  const lab = []
  const dat = []
  const chartHandler = () => {
    for (const [key, value] of Object.entries(statistics)) {
      lab.push(key)
      dat.push(value)
    }
  }

  useEffect(() => {
    chartHandler()
    setChartLabel(lab)
    setChartData(dat)
  }, [statistics])

  const data = {
    labels: chartLabel,
    datasets: [
      {
        label: 'users',
        data: chartData,
        borderColor: 'rgba(62, 151, 255, 1)',
        backgroundColor: 'rgba(62, 151, 255, 1)',
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15,
      },
    ],
  }
  // end chart
  // DatePicker
  const [monthDate, setMonthDate] = useState(new Date())
  const [yearDate, setYearDate] = useState(new Date())
  const statusHandler = (e, buttonId) => {
    if (buttonId === 'all') {
      setMonthButtonStatus(false)
      setYearButtonStatus(false)
      filter(e, '')
      setClassAllButton('btn-primary btn-text-white')
    } else {
      setClassAllButton('btn-light')
    }
    if (buttonId === 'year') {
      setMonthButtonStatus(false)
      setYearButtonStatus(true)
      filter(e, filterYear)
      setClassYearButton('btn-primary  btn-text-white')
    } else {
      setClassYearButton('btn-light')
    }
    if (buttonId === 'month') {
      setYearButtonStatus(false)
      setMonthButtonStatus(true)
      filter(e, filterMonth)
      setClassMonthButton('btn-primary  btn-text-white')
    } else {
      setClassMonthButton('btn-light')
    }
    setFilterType(e)
  }
  const monthHandler = (date) => {
    const fullYear = new Date(date).getFullYear()
    const month = new Date(date).getMonth() + 1
    filter(filterType, `${month}/${fullYear}`)
    setFilterMonth(`${month}/${fullYear}`)
    setMonthDate(date)
  }
  const yearHandler = (date) => {
    const fullYear = new Date(date).getFullYear()
    filter(filterType, fullYear)
    setFilterYear(fullYear)
    setYearDate(date)
  }
  return (
    <div className='card card-lg-stretch py-5'>
      {/* begin::Header */}
      <div className='card-header border-0 px-5'>
        <div className='card-title align-items-start flex-column col-md-8 m-0'>
          <h3 className='card-label fw-bold fs-3 m-0 text-gray-700'>users statistics</h3>
          <small className='text-muted mt-1 fw-semibold fs-7'>number of registered users.</small>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-5 px-5'>
        {/* filter */}
        <div className='row'>
          <div className='col-md-6'>
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
          <div className='col-md-6'>
            {monthButtonStatus && (
              <div>
                <DatePicker
                  autocomplete='off'
                  className='form-control form-control-solid mb-3 w-100'
                  selected={monthDate}
                  onChange={monthHandler}
                  showMonthYearPicker
                  dateFormat='MM/yyyy'
                />
              </div>
            )}

            {yearButtonStatus && (
              <div>
                <DatePicker
                  autocomplete='off'
                  className='form-control form-control-solid mb-3 w-100'
                  selected={yearDate}
                  onChange={yearHandler}
                  showYearPicker
                  dateFormat='yyyy'
                />
              </div>
            )}
          </div>
          {/* <div className='col-md-2'>sas</div> */}
        </div>
        {/* end filter */}
        {/* line chart */}
        {errorMessage ? (
          <div className='alert alert-danger d-flex align-items-center my-5'>
            <div className='d-flex flex-column'>{errorMessage}</div>
          </div>
        ) : (
          < Line options={options} data={data} />
        )}
        {/* end line chart */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default UsersChart
