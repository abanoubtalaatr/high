import {useEffect, useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {getAgeGroups} from '../../../_requests'

function AgeGroupsTable() {
  const [refresh, setRefresh] = useState(false)
  const [itemID, setItemId] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [apiRespone, setapiRespone] = useState(false)
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [itemsState, setItemsState] = useState('all')

  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }
  const completeHandler = () => {
    setRefresh(true)
  }
  const getitemssHandler = () => {
    getAgeGroups()
      .then((res) => {
        setapiRespone(true)
        setItems(res.data.data)
        setIsLoaded(false)
        setRefresh(true)
      })
      .catch((err) => {
        setapiRespone(true)
        setErrorMessage(err.response.data.message)
        setIsLoaded(false)
      })
  }
  useEffect(() => {
    setIsLoaded(true)
    getitemssHandler()
  }, [])
  // useEffect(() => {
  //   if (refresh) {
  //     setIsLoaded(true)
  //     getitemssHandler()
  //   }
  // }, [refresh])
  return (
    <>
      {!apiRespone || isLoaded ? (
        'loading ...'
      ) : !itemsState ? (
        <div className={`alert alert-danger d-flex align-items-center p-5 mb-0`}>
          <div className='d-flex flex-column'>{errorMessage}</div>
        </div>
      ) : items.length === 0 ? (
        'no data'
      ) : (
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='bg-light'>
                <th className='min-w-100px'>name</th>
                <th className='min-w-100px text-center'>starting age</th>
                <th className='min-w-100px text-center'>ending age</th>
                <th className='min-w-100px text-center'>description</th>
                <th className='min-w-100px text-center'>Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {items.map((e) => {
                return (
                  <tr key={e.id}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='symbol symbol-45px me-5'>
                          <img src={e.image} alt={e.name} onError={imageErrorHandler} />
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                          <span className='text-dark fw-bold fs-6'>{e.name}</span>
                          <span className='text-muted fw-semibold text-muted d-block fs-7'>
                            {e.created_at}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className='text-center'>{e.starting_age} year</td>
                    <td className='text-center'>{e.ending_age} year</td>
                    <td className='text-center'>{e.description}</td>
                    <td className='text-center'>
                      <div className='form-check form-switch d-flex justify-content-center align-items-center'>
                        <input className='form-check-input' type='checkbox' />
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
    </>
  )
}

export default AgeGroupsTable
