import {useRef, useState} from 'react'
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api'

function Map(props) {
  const {center} = props
  const [mapCenter, setMapCenter] = useState(center)
  const [mapZoom, setMapZoom] = useState(1)
  const [mapMarkerShow, setMapMarkerShow] = useState(false)
  const mapRef = useRef()
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
  })
  const onLoadMap = (map) => {
    mapRef.current = map
    zoomInit()
    markerInit()
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
    </GoogleMap>
  ) : (
    <>
      <h3>Loading...</h3>
    </>
  )
}

export default Map
