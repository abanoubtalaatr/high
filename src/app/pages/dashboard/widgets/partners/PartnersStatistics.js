import { Link } from "react-router-dom"

function PartnersStatistics(props) {
  const { allPartners, pendingPartners, activePartners, inactivePartners, errorMessage } = props
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
          <h5 className='fw-bold text-gray-700' style={{ fontSize: '46px' }}>
            {allPartners}
          </h5>
          <h3 className='fw-bold fs-3 m-0 text-uppercase text-gray-700'>partners</h3>
          <small className='text-muted mt-1 fw-semibold fs-7'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </small>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-5 px-5 flex-grow-0'>
        {errorMessage ? (
          <div className='alert alert-danger d-flex align-items-center my-5'>
            <div className='d-flex flex-column'>{errorMessage}</div>
          </div>
        ) : (
          <div className='d-flex justify-content-center flex-wrap my-5' style={{ gap: '1%' }}>
            <div
              className='border border-gray-300 rounded py-2 px-1 mb-3 text-center '
              style={{ width: '24%' }}
            >
              <span className='fs-3 text-gray-700 fw-bold'>{pendingPartners}</span>
              <div className='fs-7 fw-semibold text-gray-500'>pending</div>
            </div>
            <div
              className='border border-gray-300 rounded py-2 px-1 mb-3 text-center '
              style={{ width: '24%' }}
            >
              <span className='fs-3 text-gray-700 fw-bold'>{activePartners}</span>
              <div className='fs-7 fw-semibold text-gray-500'>activated</div>
            </div>
            <div
              className='border border-gray-300 rounded py-2 px-1 mb-3 text-center '
              style={{ width: '24%' }}
            >
              <span className='fs-3 text-gray-700 fw-bold'>{inactivePartners}</span>
              <div className='fs-7 fw-semibold text-gray-500'>inactivated</div>
            </div>
          </div>
        )}
        <div className='text-center my-5'>
          <Link className='btn btn-primary' to={`/partners`}>
            show all
          </Link>
        </div>
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default PartnersStatistics
