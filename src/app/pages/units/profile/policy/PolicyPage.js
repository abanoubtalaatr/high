import {KTIcon} from '../../../../../_metronic/helpers'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {getPolicy} from '../../_requests'
import PolicyView from './PolicyView'

function PolicyPage() {
  const intl = useIntl()
  const {unitId} = useParams()
  const [apiRespone, setapiRespone] = useState(false)
  const [itemDetails, setItemDetails] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  // get items
  const getItemsHandler = () => {
    getPolicy(unitId)
      .then((res) => {
        setapiRespone(true)
        setItemDetails(res.data.data)
        setIsLoaded(false)
      })
      .catch((err) => {
        setapiRespone(true)
        setErrorMessage(err.response.data.message)
        setIsLoaded(false)
      })
  }

  useEffect(() => {
    setIsLoaded(true)
    getItemsHandler()
  }, [])

  return (
    <div className='card mb-10'>
      {/* begin::Header */}
      {itemDetails.length != 0 && (
        <div className='card-header pt-5'>
          <h5 className='card-title align-items-start flex-column'>
            <span className='mb-3 fw-bolder'>{itemDetails.name || '---'}</span>
          </h5>
        </div>
      )}
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {!apiRespone || isLoaded ? (
          'loading ...'
        ) : errorMessage ? (
          <div className={`alert alert-danger d-flex align-items-center p-5 mb-0`}>
            <div className='d-flex flex-column'>{errorMessage}</div>
          </div>
        ) : itemDetails.length === 0 ? (
          'no data'
        ) : (
          <PolicyView itemDetails={itemDetails} />
        )}
      </div>
    </div>
  )
}

export default PolicyPage
