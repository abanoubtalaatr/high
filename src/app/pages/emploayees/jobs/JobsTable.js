import React, {useEffect, useState} from 'react'
import {KTIcon} from '../../../../_metronic/helpers'
import {getJobs} from '../_requests'

function JobsTable() {
  const [apiRespone, setapiRespone] = useState(false)
  const [jobs, setjobs] = useState([])
  const [jobsState, setjobsState] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [userEditId, setUserEditId] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userDeleteId, setUserDeleteId] = useState('')
  const [userEditPassId, setUserEditPassId] = useState('')

  const openEditModal = (id) => {
    setShowEditModal(true)
    setUserEditId(id)
  }
  const openDeleteModal = (id) => {
    setShowDeleteModal(true)
    setUserDeleteId(id)
  }
  const closeEditModal = () => setShowEditModal(false)
  const closeDeleteModal = () => setShowDeleteModal(false)

  useEffect(() => {
    getJobs()
      .then((res) => {
        setapiRespone(true)
        setjobs(res.data.data)
        setjobsState(true)
      })
      .catch((err) => {
        setapiRespone(true)
        setjobsState(false)
        setErrorMessage(err.response.data.message)
      })
  }, [])
  return (
    <>
      {!apiRespone ? (
        'loading ...'
      ) : !jobsState ? (
        <div className={`alert alert-danger d-flex align-items-center p-5 mb-0`}>
          <div className='d-flex flex-column'>{errorMessage}</div>
        </div>
      ) : jobs.length === 0 ? (
        'no data'
      ) : (
        <div className='card'>
          <div className='card-header border-0 pt-5 align-items-end'>
            <div className=''>
              <div className='card-toolbar gap-3'>
                <a href='#' className='btn btn-bg-dark btn-text-white btn-sm'>
                  all ({jobs.length})
                </a>
                <a href='#' className='btn btn-light btn-sm'>
                  active (5)
                </a>
                <a href='#' className='btn btn-light btn-sm'>
                  inactive (5)
                </a>
              </div>
            </div>
            <div>
              <div className='card-toolbar gap-3 mb-5 '>
                <span className='w-lg-350px w-100'>
                  <div className='d-flex align-items-center position-relative'>
                    <KTIcon
                      iconName='magnifier'
                      className='fs-3 text-muted me-1 ms-4 position-absolute '
                    />
                    <input
                      type='text'
                      className='form-control form-control-solid form-control-sm ps-12'
                      placeholder='search by name, phone, or email'
                      name='target_title'
                    />
                  </div>
                </span>
              </div>
            </div>
          </div>
          <div className='card-body py-3'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
                {/* begin::Table head */}
                <thead>
                  <tr className='bg-light'>
                    <th className='min-w-100px'>name</th>
                    <th className='min-w-100px text-center'>description</th>
                    <th className='min-w-100px text-center'>employees</th>
                    <th className='min-w-100px text-center'>Actions</th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {jobsState &&
                    jobs.map((e) => {
                      return (
                        <tr key={e.id}>
                          <td>{e.name}</td>
                          <td className='text-center'></td>
                          <td className='text-center'></td>
                          <td className='text-center'>
                            <button
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                              onClick={() => openEditModal(e.id)}
                            >
                              <KTIcon iconName='pencil' className='fs-3' />
                            </button>
                            <button
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                              onClick={() => openDeleteModal(e.id)}
                            >
                              <KTIcon iconName='trash' className='fs-3' />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
                {/* end::Table body */}
              </table>
              {/* end::Table */}
            </div>
            {/* end::Table container */}
          </div>
          {/* {showEditModal && (
            <EditEmployeeModal show={showEditModal} onHide={closeEditModal} userId={userEditId} />
          )} */}
          {/* {showDeleteModal && (
            <DeleteModal show={showDeleteModal} onHide={closeDeleteModal} userId={userDeleteId} />
          )} */}
        </div>
      )}
    </>
  )
}

export default JobsTable
