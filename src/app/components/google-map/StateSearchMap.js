import {memo, useMemo, useRef, useState} from 'react'
import {GoogleMap, Marker, InfoWindow, useJsApiLoader, Autocomplete} from '@react-google-maps/api'

const libraries = ['places']
function StateSearchMap(props) {
  const {center, countryIso, marker, mapResult} = props
  const [mapCenter, setMapCenter] = useState(center)
  const [mapZoom, setMapZoom] = useState(1)
  const [mapMarkerShow, setMapMarkerShow] = useState(marker)
  const mapRef = useRef()
  const autocompleteRef = useRef()
  const zoomInit = () => {
    mapCenter.lat == 0 || mapCenter.lng == 0 ? setMapZoom(1) : setMapZoom(10)
  }
  const markerInit = () => {
    mapCenter.lat == 0 || mapCenter.lng == 0 ? setMapMarkerShow(false) : setMapMarkerShow(true)
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
  const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  })
  const autocompleteOption = {
    types: ['administrative_area_level_1'],
    componentRestrictions: {country: countryIso},
  }
  const onLoadMap = (map) => {
    mapRef.current = map
    zoomInit()
    markerInit()
  }
  // autocomplete
  // when autocomplete loaded
  const onLoadAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete
  }
  // when search results in autocomplete
  const handlePlaceChanged = () => {
    const {geometry, place_id, types, address_components} = autocompleteRef.current.getPlace()
    const bounds = new window.google.maps.LatLngBounds()
    if (geometry) {
      if (geometry.viewport) {
        bounds.union(geometry.viewport)
      } else {
        bounds.extend(geometry.location)
      }
      mapRef.current.fitBounds(bounds)
      setMapCenter(geometry.location)
      mapResult({
        place_id: place_id,
        short_name: address_components[0].short_name,
        location: geometry.location,
      })
      setMapMarkerShow(true)
    }
  }
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={mapZoom}
      options={options}
      onLoad={onLoadMap}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {/* Marker */}
      {mapMarkerShow && <Marker position={mapCenter} />}
      {/* Autocomplete */}
      <Autocomplete
        options={autocompleteOption}
        onLoad={onLoadAutocomplete}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type='search'
          placeholder='search state ...'
          autoComplete='off'
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: 'absolute',
            left: '50%',
            marginLeft: '-120px',
          }}
        />
      </Autocomplete>
    </GoogleMap>
  ) : (
    <>
      <h3>Loading...</h3>
    </>
  )
}

export default StateSearchMap
