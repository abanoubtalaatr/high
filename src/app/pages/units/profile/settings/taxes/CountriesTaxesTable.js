import {useEffect, useState} from 'react'
import {getaxes} from '../../../../locations/taxes/_requests'
import {useIntl} from 'react-intl'
import {useParams} from 'react-router-dom'
import {updateAssignTaxesSettings} from '../../../_requests'

function CountriesTaxesTable(props) {
  const {unitId} = useParams()
  const intl = useIntl()
  const {codeId, location, locationName} = props
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [checkedCountryTaxesIds, setCheckedCountryTaxesIds] = useState([])
  const [checkedStatus, setCheckedStatus] = useState(false)

  const handleCheckedCountryTaxesIdsChange = (event) => {
    const {id, checked} = event.target
    if (checked) {
      setCheckedCountryTaxesIds([...checkedCountryTaxesIds, Number(id)])
    } else {
      setCheckedCountryTaxesIds(checkedCountryTaxesIds.filter((item) => item !== Number(id)))
    }
    setCheckedStatus(true)
  }
  function removeDuplicates(array) {
    return [...new Set(array)]
  }
  const setAssign = () => {
    let newArray = removeDuplicates(checkedCountryTaxesIds)
    updateAssignTaxesSettings(newArray, unitId)
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
  const getitemssHandler = () => {
    getaxes([{}], codeId, location)
      .then((res) => {
        setItems(res.data.data)
        setIsLoaded(false)
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
        setIsLoaded(false)
      })
  }
  useEffect(() => {
    setIsLoaded(true)
    getitemssHandler()
  }, [])
  return (
    <>
      <h5 className='card-title pt-5 pb-5'>
        <span className='fw-bolder'>
          {locationName} {intl.formatMessage({id: 'TAXES'})}
        </span>
      </h5>
      {isLoaded ? (
        'loading ...'
      ) : errorMessage ? (
        <div className={`alert alert-danger d-flex align-items-center p-5 mb-0`}>
          <div className='d-flex flex-column'>{errorMessage}</div>
        </div>
      ) : items.length === 0 ? (
        'No taxes have been generated'
      ) : (
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='bg-light'>
                <th className='min-w-100px'>name</th>
                <th className='min-w-100px text-center'>tax</th>
                <th className='min-w-100px text-center'>Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {items.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td className='text-center'>{item.tax}%</td>
                    <td className='text-center'>
                      <div className='form-check form-switch d-flex justify-content-center align-items-center'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          id={item.id}
                          checked={checkedCountryTaxesIds.includes(item.id) ? true : false}
                          onChange={handleCheckedCountryTaxesIdsChange}
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

export default CountriesTaxesTable
