import { KTIcon, toAbsoluteUrl } from '../../../../../_metronic/helpers'

function UsersAgeGroupsTable(props) {
  const { ageGroups, errorMessage } = props
  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }
  const percentCalculate = (min, max) => {
    return parseInt(((min / max) * 100).toFixed(1)) || 0
  }
  return (
    <div className='card card-lg-stretch py-5'>
      {/* begin::Header */}
      <div className='card-header border-0 px-5 row'>
        <div className='card-title align-items-start flex-column col-md-8 m-0'>
          <h3 className='card-label fw-bold fs-3 m-0 text-gray-700'>
            number of users based on age groups and gender
          </h3>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-5 px-5'>
        {errorMessage ? (
          <div className='alert alert-danger d-flex align-items-center mb-0'>
            <div className='d-flex flex-column'>{errorMessage}</div>
          </div>
        ) : (
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className='text-muted fs-6'>
                  <th>age group</th>
                  <th>all</th>
                  <th>male</th>
                  <th>female</th>
                  <th>N/I</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {ageGroups.map((e) => {
                  return (
                    <tr key={e.id}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-45px me-5'>
                            <img src={e.image} alt={e.name} onError={imageErrorHandler} />
                          </div>
                          <h5 className='text-dark fw-bold fs-6'>{e.name}</h5>
                        </div>
                      </td>
                      <td>
                        <span className='text-dark text-muted d-block fs-6'>{e.users.total}</span>
                      </td>
                      <td>
                        <div className='d-flex flex-column w-100 me-2'>
                          <div className='d-flex flex-stack mb-2'>
                            <span className='text-muted me-2 fs-6'>{percentCalculate(e.users.males, e.users.total)}%</span>
                            <span className='text-muted me-2 fs-6'>{e.users.males}</span>
                          </div>
                          <div className='progress h-6px w-100'>
                            <div
                              className='progress-bar bg-primary'
                              role='progressbar'
                              style={{ width: `${percentCalculate(e.users.males, e.users.total)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='d-flex flex-column w-100 me-2'>
                          <div className='d-flex flex-stack mb-2'>
                            <span className='text-muted me-2 fs-6'>{percentCalculate(e.users.females, e.users.total)}%</span>
                            <span className='text-muted me-2 fs-6'>{e.users.females}</span>
                          </div>
                          <div className='progress h-6px w-100'>
                            <div
                              className='progress-bar bg-danger'
                              role='progressbar'
                              style={{ width: `${percentCalculate(e.users.females, e.users.total)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='d-flex flex-column w-100 me-2'>
                          <div className='d-flex flex-stack mb-2'>
                            <span className='text-muted me-2 fs-6'>{percentCalculate(e.users.not_determined, e.users.total)}%</span>
                            <span className='text-muted me-2 fs-6'>{e.users.not_determined}</span>
                          </div>
                          <div className='progress h-6px w-100'>
                            <div
                              className='progress-bar bg-secondary'
                              role='progressbar'
                              style={{ width: `${percentCalculate(e.users.not_determined, e.users.total)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
        )}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default UsersAgeGroupsTable
