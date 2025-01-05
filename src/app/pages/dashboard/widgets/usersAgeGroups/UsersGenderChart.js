
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

function UsersGenderChart(props) {
  const { allGender, maleGender, femaleGender, otherGender, errorMessage } = props
  ChartJS.register(ArcElement, Tooltip, Legend)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }
  const data = {
    labels: ['male', 'female', 'N/I'],
    datasets: [
      {
        label: '',
        data: [maleGender, femaleGender, otherGender],
        backgroundColor: [
          'rgba(62, 151, 255, 1)',
          'rgba(241, 65, 108, 1)',
          'rgba(219, 223, 223, 1)',
        ],
        borderWidth: 0,
      },
    ],
  }
  const percentCalculate = (min, max) => {
    return parseInt(((min / max) * 100).toFixed(1)) || 0
  }
  return (
    <div className='card card-xxl-stretch justify-content-center'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5 px-5 row'>
        <div className='text-center col-md-4 m-0'>
          <img
            className='mx-auto mh-150px'
            src='https://preview.keenthemes.com/metronic8/react/demo1/media/illustrations/misc/upgrade-dark.svg'
            alt=''
          />
        </div>
        <div className='card-title align-items-start flex-column col-md-8 m-0'>
          <h3 className='card-label fw-bold fs-3 m-0 text-uppercase text-gray-700'>
            gender of users
          </h3>
          <small className='text-muted mt-1 fw-semibold fs-7'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </small>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-5 px-5 flex-grow-0'>
        {errorMessage ? (
          <div className='alert alert-danger d-flex align-items-center mb-0'>
            <div className='d-flex flex-column'>{errorMessage}</div>
          </div>
        ) : (
          <>
            <div className='h-300px d-flex align-items-center justify-content-center'>
              {allGender > 0 ?
                (
                  <Pie options={options} data={data} />
                )
                : '0 Statistics'}
            </div>
            <div className='d-flex flex-column content-justify-center flex-row-fluid w-lg-75 m-auto py-5'>
              <div className='d-flex fw-semibold align-items-center'>
                <div className='bullet w-8px h-3px rounded-2 bg-primary me-3'></div>
                <div className='text-gray-500 w-50 me-4'>male</div>
                <div className='fw-bolder text-gray-700 w-50 text-end'>
                  <span className='text-dark me-2 fs-6'>{percentCalculate(maleGender, allGender)}%</span>
                  <span className='text-muted me-2 fs-7'>{maleGender}</span>
                </div>
              </div>
              <div className='d-flex fw-semibold align-items-center my-3'>
                <div className='bullet w-8px h-3px rounded-2 bg-danger me-3'></div>
                <div className='text-gray-500 w-50 me-4'>female</div>
                <div className='fw-bolder text-gray-700 w-50 text-end'>
                  <span className='text-dark me-2 fs-6'>{percentCalculate(femaleGender, allGender)}%</span>
                  <span className='text-muted me-2 fs-7'>{femaleGender}</span>
                </div>
              </div>
              <div className='d-flex fw-semibold align-items-center'>
                <div className='bullet w-8px h-3px rounded-2 bg-secondary me-3'></div>
                <div className='text-gray-500 w-50 me-4'>N/I</div>
                <div className='fw-bolder text-gray-700 w-50 text-end'>
                  <span className='text-dark me-2 fs-6'>{percentCalculate(otherGender, allGender)}%</span>
                  <span className='text-muted me-2 fs-7'>{otherGender}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default UsersGenderChart
