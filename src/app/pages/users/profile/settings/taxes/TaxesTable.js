import {useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {getaxes} from '../../../../locations/taxes/_requests'
import {useIntl} from 'react-intl'

function TaxesTable(props) {
  const intl = useIntl()
  const {codeId, location, locationName} = props
  const [refresh, setRefresh] = useState(false)
  const [apiRespone, setapiRespone] = useState(false)
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [itemsState, setItemsState] = useState('all')

  const completeHandler = () => {
    setRefresh(true)
  }
  const getitemssHandler = () => {
    getaxes([{}], codeId, location)
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
  useEffect(() => {
    if (refresh) {
      setIsLoaded(true)
      getitemssHandler()
    }
  }, [refresh])
  return (
    <>
      <h5 className='card-title pt-5 pb-5'>
        <span className='fw-bolder'>
          {locationName} {intl.formatMessage({id: 'TAXES'})}
        </span>
      </h5>
      {!apiRespone || isLoaded ? (
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
              {items.map((e) => {
                return (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td className='text-center'>{e.tax}%</td>
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

export default TaxesTable
