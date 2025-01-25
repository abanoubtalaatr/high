import {Link, useLocation, useParams} from 'react-router-dom'
import {KTIcon} from '../../../../../_metronic/helpers'
import EditLocationModal from './EditLocationModal'
import {useEffect, useState} from 'react'
import {getLocation} from '../../_requests'
import {useIntl} from 'react-intl'
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api'

function LocationPage() {
  let location = useLocation()
  const intl = useIntl()
  const {unitId} = useParams()
  const [locationDetails, setLocationDetails] = useState([])
  const [googleMapLoad, setGoogleMapLoad] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [onComplete, setonComplete] = useState(false)
  const [mapCenter, setMapCenter] = useState({
    lat: 24.713552,
    lng: 46.675297,
  })
  const openEditModal = () => {
    setShowEditModal(true)
  }
  const closeEditModal = () => setShowEditModal(false)
  const completeHandler = () => {
    setShowEditModal(false)
    setonComplete(true)
  }
  useEffect(() => {
    
    getLocation(unitId)
      .then((res) => {
        setLocationDetails(res.data.data)
        setGoogleMapLoad(true)
        setonComplete(false)
        setMapCenter({
          lat: Number(res.data.data.latitude),
          lng: Number(res.data.data.longitude),
        })
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
      })
  }, [onComplete])
  const mapContainerStyle = {width: '100%', height: '300px'}

  // map marker
  const markers = {
    lat: Number(locationDetails.latitude),
    lng: Number(locationDetails.longitude),
  }

  return (
    <div className='card mb-10'>
      {/* begin::Header */}
      <div className='card-header pt-5'>
        <h5 className='card-title align-items-start flex-column'>
          <span className='fw-bolder mb-3'>{intl.formatMessage({id: 'LOCATION'})}</span>
        </h5>
        <div className='card-toolbar gap-3 mb-5'>
          <button
            type='button'
            className='btn btn-light btn-sm btn-flex fw-bold'
            onClick={openEditModal}
          >
            <KTIcon iconName='pencil' className='fs-6 text-muted me-1' />
            edit
          </button>
        </div>
        {/* modal */}
        {showEditModal && (
          <EditLocationModal
            show={showEditModal}
            onHide={closeEditModal}
            onComplete={completeHandler}
            locationDetails={locationDetails}
            partnerId={location.state}
          />
        )}
        {/* end modal */}
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='border-0'>
                <th className='p-0'></th>
                <th className='p-0'></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td className='w-lg-300px'>type</td>
                <td className='text-gray-700 fw-bolder'>{locationDetails.type || '---'}</td>
              </tr>
              {locationDetails.type === 'part' && (
                <>
                  <tr>
                    <td className='w-lg-300px'>part from</td>
                    <td className='text-gray-700 fw-bolder'>
                      {locationDetails.part_from ? (
                        <Link
                          key={locationDetails.part_from.id}
                          to={`/units/profile/${locationDetails.part_from.id}/details`}
                          className='text-dark fw-bold text-hover-primary'
                        >
                          {locationDetails.part_from.name}
                        </Link>
                      ) : (
                        '---'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className='w-lg-300px'>conflicted with</td>
                    <td className='text-gray-700 fw-bolder d-flex gap-3'>
                      {locationDetails.conflicted_with
                        ? locationDetails.conflicted_with.map((con) => (
                            <Link
                              key={con.id}
                              to={`/units/profile/${con.id}/details`}
                              className='text-dark fw-bold text-hover-primary'
                            >
                              {con.name}
                            </Link>
                          ))
                        : '---'}
                    </td>
                  </tr>
                </>
              )}
              <tr>
                <td className='w-lg-300px'>country</td>
                <td className='text-gray-700 fw-bolder'>
                  {(locationDetails.country && locationDetails.country.name) || '---'}
                </td>
              </tr>
              <tr>
                <td className='w-lg-300px'>state</td>
                <td className='text-gray-700 fw-bolder'>
                  {(locationDetails.state && locationDetails.state.name) || '---'}
                </td>
              </tr>
              <tr>
                <td className='w-lg-300px'>city</td>
                <td className='text-gray-700 fw-bolder'>
                  {(locationDetails.city && locationDetails.city.name) || '---'}
                </td>
              </tr>
              <tr>
                <td className='w-lg-300px'>address</td>
                <td className='text-gray-700 fw-bolder'>{locationDetails.address || '---'}</td>
              </tr>

              <tr>
                <td className='w-lg-300px'>latitude</td>
                <td className='text-gray-700 fw-bolder'>{locationDetails.latitude || '---'}</td>
              </tr>
              <tr>
                <td className='w-lg-300px'>longitude</td>
                <td className='text-gray-700 fw-bolder'>{locationDetails.longitude || '---'}</td>
              </tr>
              <tr>
                <td className='w-lg-300px'>map</td>
                <td className='text-gray-700 fw-bolder'>
                  <LoadScript googleMapsApiKey='AIzaSyBtbpZ_-ETvYcJP5stMqWuSacGPj9MSTag'>
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      libraries={['places']}
                      center={mapCenter}
                      zoom={10}
                    >
                      {/* Marker to show the location */}
                      <Marker position={markers} />
                    </GoogleMap>
                  </LoadScript>
                </td>
              </tr>
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default LocationPage
