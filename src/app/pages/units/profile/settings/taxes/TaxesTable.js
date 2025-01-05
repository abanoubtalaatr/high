import {useEffect, useState} from 'react'
import {getaxes} from '../../../../locations/taxes/_requests'
import {useIntl} from 'react-intl'
import {useParams} from 'react-router-dom'
import {getAssignTaxesSettings, updateAssignTaxesSettings} from '../../../_requests'

function TaxesTable(props) {
  const {unitId} = useParams()
  const intl = useIntl()
  const {codeId, location, locationName} = props
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [checkedCountriesTaxesIds, setCheckedCountriesTaxesIds] = useState([])
  const [checkedStatesTaxesIds, setCheckedStatesTaxesIds] = useState([])
  const [checkedCitiesTaxesIds, setCheckedCitiesTaxesIds] = useState([])
  const [checkedStatus, setCheckedStatus] = useState(false)

  const handleCheckedTaxesIdsChange = (event, locationTaxes) => {
    const {id, checked} = event.target
    console.log(locationTaxes)
    if (locationTaxes === 'countries') {
      if (checked) {
        setCheckedCountriesTaxesIds([...checkedCountriesTaxesIds, Number(id)])
      } else {
        setCheckedCountriesTaxesIds(checkedCountriesTaxesIds.filter((item) => item !== Number(id)))
      }
    }
    if (locationTaxes === 'states') {
      if (checked) {
        setCheckedStatesTaxesIds([...checkedStatesTaxesIds, Number(id)])
      } else {
        setCheckedStatesTaxesIds(checkedStatesTaxesIds.filter((item) => item !== Number(id)))
      }
    }
    if (locationTaxes === 'cities') {
      if (checked) {
        setCheckedCitiesTaxesIds([...checkedCitiesTaxesIds, Number(id)])
      } else {
        setCheckedCitiesTaxesIds(checkedCitiesTaxesIds.filter((item) => item !== Number(id)))
      }
    }
    setCheckedStatus(true)
  }
  const checkdHandler = (locationTaxes, itemId) => {
    console.log(locationTaxes, itemId)
    if (locationTaxes === 'countries') {
      return checkedCountriesTaxesIds.includes(itemId) ? true : false
    }
    if (locationTaxes === 'states') {
      return checkedStatesTaxesIds.includes(itemId) ? true : false
    }
    if (locationTaxes === 'cities') {
      return checkedCitiesTaxesIds.includes(itemId) ? true : false
    }
  }
  const removeDuplicates = (array) => {
    return [...new Set(array)]
  }
  const setAssign = () => {
    let countriesTaxesIds = removeDuplicates(checkedCountriesTaxesIds)
    let statesTaxesIds = removeDuplicates(checkedStatesTaxesIds)
    let citiesTaxesIds = removeDuplicates(checkedCitiesTaxesIds)
    updateAssignTaxesSettings(countriesTaxesIds, statesTaxesIds, citiesTaxesIds, unitId)
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

    // get assign age groups
    getAssignTaxesSettings(unitId)
      .then((res) => {
        if (res.data.data) {
          setCheckedCountriesTaxesIds(res.data.data.country_taxes.map((e) => e.id))
          setCheckedStatesTaxesIds(res.data.data.state_taxes.map((e) => e.id))
          setCheckedCitiesTaxesIds(res.data.data.city_taxes.map((e) => e.id))
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
                          checked={checkdHandler(location, item.id)}
                          onChange={(e) => handleCheckedTaxesIdsChange(e, location)}
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

export default TaxesTable
