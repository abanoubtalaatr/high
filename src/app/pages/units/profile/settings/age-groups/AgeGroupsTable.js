import {useEffect, useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {getAgeGroups, getAssignAgeGroups, updateAgeGroupsSettings} from '../../../_requests'
import {useParams} from 'react-router-dom'

function AgeGroupsTable() {
  const {unitId} = useParams()
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [checkedItems, setCheckedItems] = useState([])
  const [checkedStatus, setCheckedStatus] = useState(false)

  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }

  const handleCheckboxChange = (event) => {
    const {id, checked} = event.target
    if (checked) {
      setCheckedItems([...checkedItems, Number(id)])
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== Number(id)))
    }
    setCheckedStatus(true)
  }
  function removeDuplicates(array) {
    return [...new Set(array)]
  }
  const setAssign = () => {
    let newArray = removeDuplicates(checkedItems)
    updateAgeGroupsSettings(newArray, unitId)
      .then((res) => {})
      .catch((err) => {
        setErrorMessage(err.response.data.message)
        setIsLoaded(false)
      })
    setCheckedStatus(false)
  }
  useEffect(() => {
    if (checkedStatus) {
      setAssign()
    }
  }, [checkedStatus])
  const getitemsSHandler = () => {
    getAgeGroups()
      .then((res) => {
        setItems(res.data.data)
        setIsLoaded(false)
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
        setIsLoaded(false)
      })
    // get assign age groups
    getAssignAgeGroups(unitId)
      .then((res) => {
        if (res.data.data.length > 0) {
          setCheckedItems(res.data.data.map((e) => e.id))
        }
        setIsLoaded(false)
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
        setIsLoaded(false)
      })
  }
  useEffect(() => {
    setIsLoaded(true)
    getitemsSHandler()
  }, [])
  return (
    <>
      {isLoaded ? (
        'loading ...'
      ) : errorMessage ? (
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
              {items.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='symbol symbol-45px me-5'>
                          <img src={item.image} alt={item.name} onError={imageErrorHandler} />
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                          <span className='text-dark fw-bold fs-6'>{item.name}</span>
                          <span className='text-muted fw-semibold text-muted d-block fs-7'>
                            {item.created_at}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className='text-center'>{item.starting_age} year</td>
                    <td className='text-center'>{item.ending_age} year</td>
                    <td className='text-center'>{item.description}</td>
                    <td className='text-center'>
                      <div className='form-check form-switch d-flex justify-content-center align-items-center'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          id={item.id}
                          checked={checkedItems.includes(item.id) ? true : false}
                          onChange={handleCheckboxChange}
                        />
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
