import {memo, useCallback, useState} from 'react'
import {GoogleMap, Marker, InfoWindow, useLoadScript} from '@react-google-maps/api'
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
function Map(props) {
  const {draggable, markersList, newLocation} = props
  const [map, setMap] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  let [markers, setMarkers] = useState(markersList)
  const [infoWindowData, setInfoWindowData] = useState()
  const containerStyle = {
    width: '100%',
    height: '100%',
  }

  const center = {
    lat: 30.065556207571,
    lng: 31.224399783203,
  }

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: API_KEY,
  })

  const onLoad = useCallback(function callback(map) {
    // setMapRef(map)
    const bounds = new window.google.maps.LatLngBounds()
    markers?.forEach(({lat, lng}) => {
      bounds.extend({lat, lng})
    })
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handleMarkerClick = (id, lat, lng, address) => {
    map?.panTo({lat, lng})
    setInfoWindowData({id, address})
    setIsOpen(true)
  }
  let onMarkerDragEnd = (coord, index, markers) => {
    const {latLng} = coord
    const lat = latLng.lat()
    const lng = latLng.lng()
    markers[index] = {lat, lng}
    setMarkers(markers)
    newLocation(markers)
  }

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        zoom={3}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {markers.map(({address, lat, lng}, ind) => (
          <Marker
            key={ind}
            position={{lat, lng}}
            draggable={draggable}
            onDragEnd={(coord) => onMarkerDragEnd(coord, ind, markers)}
            // onDragEnd={(coord) => console.log(coord)}
            onClick={() => {
              handleMarkerClick(ind, lat, lng, address)
            }}
          >
            {isOpen && infoWindowData?.id === ind && (
              <InfoWindow
                onCloseClick={() => {
                  setIsOpen(false)
                }}
              >
                <h3>{infoWindowData.address}</h3>
              </InfoWindow>
            )}
          </Marker>
        ))}
        <></>
      </GoogleMap>
    </>
  ) : (
    <>
      <h1>Loading...</h1>
    </>
  )
}

export default Map
