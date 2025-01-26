import {memo, useCallback, useRef, useState} from 'react'
import {GoogleMap, Marker, Autocomplete, LoadScript} from '@react-google-maps/api'

const libraries = ['places']

function AddressSearchMap(props) {
  const {center, countryIso, cityPlaceId, mapResult} = props
  const [mapCenter, setMapCenter] = useState(center)
  const [mapZoom, setMapZoom] = useState(1)
  const [mapMarkerShow, setMapMarkerShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const mapRef = useRef()
  const autocompleteRef = useRef()

  const zoomInit = () => {
    mapCenter.lat === 0 || mapCenter.lng === 0 ? setMapZoom(1) : setMapZoom(13)
  }

  const markerInit = () => {
    mapCenter.lat === 0 || mapCenter.lng === 0 ? setMapMarkerShow(false) : setMapMarkerShow(true)
  }

  const options = {
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    mapId: process.env.REACT_APP_GOOGLE_MAPID,
  }

  const containerStyle = {
    width: '100%',
    height: '100%',
  }

  const autocompleteOption = {
    types: ['establishment'],
    componentRestrictions: {country: countryIso},
  }

  const onLoadMap = useCallback((map) => {
    mapRef.current = map
    zoomInit()
    markerInit()
    setIsLoading(false)
  }, [])

  const onLoadAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete
  }

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace()
    const {geometry} = place
    if (geometry) {
      const bounds = new window.google.maps.LatLngBounds()
      if (geometry.viewport) {
        bounds.union(geometry.viewport)
      } else {
        bounds.extend(geometry.location)
      }
      mapRef.current.fitBounds(bounds)
      setMapCenter(geometry.location)
      checkCityInState(geometry.location, cityPlaceId)
      setMapMarkerShow(true)
    }
  }

  const onMarkerDragEnd = (coord) => {
    const {latLng} = coord
    const newCenter = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    }
    setMapCenter(newCenter) // Update the marker's position
    checkCityInState(latLng, cityPlaceId) // Validate the new location
  }

  const checkCityInState = (geometry, cityPlaceId) => {
    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({location: geometry}, (results, status) => {
      if (status === 'OK') {
        const cr = results.filter((c) => c.types[0] === 'plus_code')
        const res = results.filter((e) => e.place_id === cityPlaceId)
        if (res.length === 0) {
          mapResult('')
        } else {
          mapResult({
            place_id: cr[0].place_id,
            location: cr[0].geometry.location,
          })
        }
      } else {
        alert('Geocode was not successful for the following reason: ' + status)
      }
    })
  }

  return (
    <div style={{position: 'relative', height: '100%'}}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter} // This ensures the map centers at the updated location
        zoom={mapZoom}
        options={options}
        onLoad={onLoadMap}
      >
        {mapMarkerShow && (
          <Marker
            position={mapCenter} // Marker will follow the updated mapCenter
            draggable={true}
            onDragEnd={(coord) => onMarkerDragEnd(coord)}
          />
        )}
      </GoogleMap>
    </div>
  )
}

export default memo(AddressSearchMap)
