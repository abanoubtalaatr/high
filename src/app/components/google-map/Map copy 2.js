import {memo, useMemo, useRef, useState} from 'react'
import {GoogleMap, Marker, InfoWindow, useJsApiLoader, Autocomplete} from '@react-google-maps/api'

function Map(props) {
  const {center, draggable, autocomplete, country} = props
  const [mapCenter, setMapCenter] = useState(center)
  const [oldMapCenter, setOldMapCenter] = useState(center)
  const [verifyCityAddress, setVerifyCityAddress] = useState(false)
  const [previousPosition, setPreviousPosition] = useState(center)
  const mapRef = useRef()
  const autocompleteRef = useRef()
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
  // const libraries = ['places']
  const libraries = useMemo(() => ['places'], [])
  const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  })
  const autocompleteOption = {
    types: [],
    componentRestrictions: {country: 'SA'},
  }

  const onLoadMap = (map) => {
    mapRef.current = map
  }
  // autocomplete
  // when autocomplete loaded
  const onLoadAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete
  }
  // when search results in autocomplete
  const handlePlaceChanged = () => {
    const {geometry, place_id, types} = autocompleteRef.current.getPlace()
    console.log(autocompleteRef.current.getPlace())
    const bounds = new window.google.maps.LatLngBounds()
    if (geometry) {
      if (geometry.viewport) {
        bounds.union(geometry.viewport)
      } else {
        bounds.extend(geometry.location)
      }
      mapRef.current.fitBounds(bounds)
      setMapCenter(geometry.location)
      checkAddressInCity(geometry.location)
    }
  }
  const onMarkerChange = (coord) => {
    // console.log(coord)
    // console.log(coord.latLng.lat(), coord.latLng.lng())
    checkAddressInCity(coord.latLng)
  }
  const checkAddressInCity = (latLng) => {
    // const cityPlace_id = 'ChIJqZmg0WhB9xQRE6i6MmWEhaM'
    const cityPlace_id = 'ChIJAzRrJzIdNj4RdlZeeuwB2e8'
    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({location: latLng}, (results, status) => {
      if (status === 'OK') {
        console.log(results)
        results.map((r) => {
          // console.log(r.geometry.location.lat(), r.geometry.location.lng())
          // console.log(r.types[0])
        })
        const cr = results.filter((c) => c.types[0] === 'plus_code')
        const res = results.filter((e) => e.place_id == cityPlace_id)
        if (res.length == 0) {
          alert('This address does not exist in your city')
        } else {
          setVerifyCityAddress(true)
          alert('good')
        }
        console.log(res)
        // console.log('current', cr)
      } else {
        alert('Geocode was not successful for the following reason: ' + status)
      }
    })
  }
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={3}
      options={options}
      onLoad={onLoadMap}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {/* Marker */}
      <Marker
        position={mapCenter}
        draggable={draggable}
        onDragEnd={(coord) => onMarkerChange(coord)}
      />
      {/* Autocomplete */}
      {autocomplete && (
        <Autocomplete
          options={autocompleteOption}
          onLoad={onLoadAutocomplete}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type='search'
            placeholder='search address ...'
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
      )}
    </GoogleMap>
  ) : (
    <>
      <h3>Loading...</h3>
    </>
  )
}

export default memo(Map)
