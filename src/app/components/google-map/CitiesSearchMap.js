import {memo, useMemo, useRef, useState} from 'react'
import {GoogleMap, Marker, InfoWindow, useJsApiLoader, Autocomplete} from '@react-google-maps/api'

const libraries = ['places']
function CitiesSearchMap(props) {
  const {center, countryIso, statePlaceId, mapResult} = props
  const [mapCenter, setMapCenter] = useState(center)
  const [mapZoom, setMapZoom] = useState(1)
  const [mapMarkerShow, setMapMarkerShow] = useState(false)
  const mapRef = useRef()
  const autocompleteRef = useRef()
  const zoomInit = () => {
    mapCenter.lat == 0 || mapCenter.lng == 0 ? setMapZoom(1) : setMapZoom(10)
  }
  const markerInit = () => {
    mapCenter.lat == 0 || mapCenter.lng == 0 ? setMapMarkerShow(false) : setMapMarkerShow(true)
  }
  console.log(process.env.REACT_APP_GOOGLE_API_KEY);
console.log(process.env.REACT_APP_GOOGLE_MAPID);

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
    types: ['administrative_area_level_2'],
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
      checkCityInState(geometry, place_id, address_components)
      setMapMarkerShow(true)
    }
  }
  const checkCityInState = (geometry, cityPlaceId, address_components) => {
    // const cityPlace_id = 'ChIJqZmg0WhB9xQRE6i6MmWEhaM'
    // const cityPlace_id = 'ChIJOYNFFvnm-RQRcs0NUo4nQcs'
    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({location: geometry.location}, (results, status) => {
      if (status === 'OK') {
        const cr = results.filter((c) => c.types[0] === 'plus_code')
        const res = results.filter((e) => e.place_id == statePlaceId)
        if (res.length == 0) {
          mapResult([])
        } else {
          mapResult({
            place_id: cityPlaceId,
            short_name: address_components[0].short_name,
            location: geometry.location,
          })
        }
      } else {
        alert('Geocode was not successful for the following reason: ' + status)
      }
    })
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

export default CitiesSearchMap
