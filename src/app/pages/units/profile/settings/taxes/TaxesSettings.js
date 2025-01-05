import {useIntl} from 'react-intl'
import SettingsNav from '../SettingsNav'
import TaxesTable from './TaxesTable'
import {getLocation} from '../../../_requests'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

function TaxesSettings() {
  const {unitId} = useParams()
  const intl = useIntl()
  const [locationDetails, setLocationDetails] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    getLocation(unitId)
      .then((res) => {
        setLocationDetails(res.data.data)
        setIsLoaded(false)
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
        setIsLoaded(false)
      })
  }, [])
  return (
    <div className='card mb-10'>
      {errorMessage}
      {/* begin::Header */}
      <div className='card-header pt-5'>
        <h5 className='card-title align-items-start flex-column'>
          <span className='fw-bolder mb-3'>{intl.formatMessage({id: 'TAXEX_SETTINGS'})}</span>
        </h5>
        {/* modal */}
        
        {/* end modal */}
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        <div className='row'>
          {/* navbar */}
          <div className='col-lg-2'>
            <SettingsNav />
          </div>
          {/* content */}
          <div className='col-lg-10'>
            {/* taxex countries */}
            {errorMessage && (
              <div className={`alert alert-danger d-flex align-items-center p-5 mb-0`}>
                <div className='d-flex flex-column'>{errorMessage}</div>
              </div>
            )}
            {isLoaded && 'location loading ...'}
            {!isLoaded &&
              (locationDetails.country ? (
                <TaxesTable
                  codeId={locationDetails.country.iso}
                  location='countries'
                  locationName={locationDetails.country.name}
                />
              ) : (
                'There is no country data'
              ))}
            {/* taxex state */}
            {!isLoaded &&
              (locationDetails.state ? (
                <TaxesTable
                  codeId={locationDetails.state.id}
                  location='states'
                  locationName={locationDetails.state.name}
                />
              ) : (
                'There is no state data'
              ))}
            {/* taxex city */}
            {!isLoaded &&
              (locationDetails.city ? (
                <TaxesTable
                  codeId={locationDetails.city.id}
                  location='cities'
                  locationName={locationDetails.city.name}
                />
              ) : (
                'There is no city data'
              ))}
          </div>
        </div>
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default TaxesSettings
