import { memo, useCallback, useRef, useState } from 'react';
import { GoogleMap, Marker, Autocomplete, LoadScript, useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];

function AddressSearchMap(props) {
  const { center, countryIso, cityPlaceId, mapResult } = props;
  const [mapCenter, setMapCenter] = useState(center);
  const [mapZoom, setMapZoom] = useState(1);
  const [mapMarkerShow, setMapMarkerShow] = useState(false);
  const mapRef = useRef();
  const autocompleteRef = useRef();

  const zoomInit = () => {
    mapCenter.lat === 0 || mapCenter.lng === 0 ? setMapZoom(1) : setMapZoom(13);
  };

  const markerInit = () => {
    mapCenter.lat === 0 || mapCenter.lng === 0 ? setMapMarkerShow(false) : setMapMarkerShow(true);
  };

  const options = {
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    mapId: process.env.REACT_APP_GOOGLE_MAPID,
  };

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  const autocompleteOption = {
    types: ['establishment'],
    componentRestrictions: { country: countryIso },
  };

  const onLoadMap = useCallback(function callback(map) {
    mapRef.current = map;
    zoomInit();
    markerInit();
  }, []);

  const onLoadAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceChanged = () => {
    const { geometry, place_id, types, address_components } = autocompleteRef.current.getPlace();
    const bounds = new window.google.maps.LatLngBounds();
    if (geometry) {
      if (geometry.viewport) {
        bounds.union(geometry.viewport);
      } else {
        bounds.extend(geometry.location);
      }
      mapRef.current.fitBounds(bounds);
      setMapCenter(geometry.location);
      checkCityInState(geometry.location, cityPlaceId);
      setMapMarkerShow(true);
    }
  };

  const onMarkerDragEnd = (coord) => {
    const { latLng } = coord;
    checkCityInState(latLng, cityPlaceId);
  };

  const checkCityInState = (geometry, cityPlaceId) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: geometry }, (results, status) => {
      if (status === 'OK') {
        const cr = results.filter((c) => c.types[0] === 'plus_code');
        const res = results.filter((e) => e.place_id === cityPlaceId);
        if (res.length === 0) {
          mapResult('');
        } else {
          mapResult({
            place_id: cr[0].place_id,
            location: cr[0].geometry.location,
          });
        }
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  return (
    <>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        libraries={libraries}
      >
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={mapZoom}
            options={options}
            onLoad={onLoadMap}
          >
            {mapMarkerShow && (
              <Marker
                position={mapCenter}
                draggable={true}
                onDragEnd={(coord) => onMarkerDragEnd(coord)}
              />
            )}
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
          <h3>Loading...</h3>
        )}
      </LoadScript>
    </>
  );
}

export default memo(AddressSearchMap);
