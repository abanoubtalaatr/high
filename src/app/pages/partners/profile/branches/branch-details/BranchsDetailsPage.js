import {useIntl} from 'react-intl'
// import 'bootstrap/dist/css/bootstrap.min.css';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api'
import {KTIcon} from '../../../../../../_metronic/helpers'
import {getBranchDetails, getCountries, getStates, getCities} from '../../../_requests'
import {useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select'

function BranchsDetailsPage() {
  const intl = useIntl()
  const location = useLocation()
  const API_URL = process.env.REACT_APP_API_URL
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  const DefOptions = [{value: '', label: 'All'}]
  const [countries, setCountries] = useState(DefOptions)
  const [states, setStates] = useState(DefOptions)
  const [cities, setCities] = useState(DefOptions)
  const PARTNERS_URL = `${API_URL}/partners`
  const [branch, setBranch] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [formData, setFormData] = useState({})
  const [isCountriesLoading, setIsCountriesLoading] = useState(false)
  const [isStatesLoading, setIsStatesLoading] = useState(false)
  const [isCitiesLoading, setIsCitiesLoading] = useState(false)

  const getBranchIdFromQuery = () => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('branchId')
  }

  const [isEditMode, setIsEditMode] = useState(false)
  const [pagination, setPagination] = useState({
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 100,
  })
  const branchId = getBranchIdFromQuery()

  const defaultPhoto = '/media/avatars/blank.png'
  const {userId} = useParams()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDetails = async () => {
      if (branchId) {
        try {
          setLoading(true)
          const response = await getBranchDetails(userId, branchId)
          setBranch(response.data.data)
          const countries = await getCountries()
          setCountries([
            ...DefOptions,
            ...countries.data.data.map((country) => ({
              value: country.iso,
              label: country.name,
            })),
          ])
          const states = await getStates()

          setStates([
            ...DefOptions,
            ...states.data.data.map((state) => ({
              value: state.id,
              label: state.name,
            })),
          ])
          const cities = await getCities()
          setCities([
            ...DefOptions,
            ...cities.data.data.map((city) => ({
              value: city.id,
              label: city.name,
            })),
          ])
          setSelectedCountry(branch?.country?.iso || '')
          setSelectedState(branch?.state?.id || '')
          setSelectedCity(branch?.city?.id || '')
        } catch (err) {
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchDetails()
  }, [userId, branchId])

  const handleCountryChange = async (selectedCountry) => {
    setSelectedCountry(selectedCountry?.value || '')
    setStates(DefOptions)
    setCities(DefOptions)
    setSelectedState('')
    setSelectedCity('')
    if (selectedCountry?.value) {
      setIsStatesLoading(true)
      try {
        const response = await getStates({countryId: selectedCountry.value})
        setStates([
          ...DefOptions,
          ...response.data.data.map((state) => ({
            value: state.id,
            label: state.name,
          })),
        ])
      } catch (error) {
        console.error('Error fetching states:', error)
      } finally {
        setIsStatesLoading(false)
      }
    }
  }

  const handleCityChange = (selectedCity) => {
    setSelectedCity(selectedCity?.value || '')
  }

  const handleStateChange = async (selectedState) => {
    setSelectedState(selectedState?.value || '')
    setCities(DefOptions)
    setSelectedCity('')
    if (selectedState?.value) {
      setIsCitiesLoading(true)
      try {
        const response = await getCities({stateId: selectedState.value})
        setCities([
          ...DefOptions,
          ...response.data.data.map((city) => ({
            value: city.id,
            label: city.name,
          })),
        ])
      } catch (error) {
        console.error('Error fetching cities:', error)
      } finally {
        setIsCitiesLoading(false)
      }
    }
  }
  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]: value}))
  }

  const handleInputChangeLocation = (e) => {
    const {name, value} = e.target
    setEditLocation((prev) => ({...prev, [name]: value}))
  }

  const handleUpdate = async () => {
    if (!branch.name || branch.name.length < 3) {
      alert('Name is required and should be at least 3 characters long')
      return
    }

    // Prepare the payload
    const payload = {
      name: formData.name || branch.name,
      description: formData.description || branch.description,
      country_iso: branch?.country?.iso || '',
      state_id: branch?.state?.id || null,
      city_id: branch?.city?.id || null,
      latitude: parseFloat(branch?.latitude || ''), // Ensure it's a number
      longitude: parseFloat(branch?.longitude), // Ensure it's a number
      _method: 'put',
    }
    // Append photo if exists
    if (formData.photo) {
      payload.photo = formData.photo
    }
    try {
      const response = await axios.post(`${PARTNERS_URL}/${userId}/branches/${branchId}`, payload)
      console.log('Updated successfully:', response.data.data)
      setBranch(response.data.data)
      setIsEditMode(false)
    } catch (error) {
      console.error('Update failed:', error)
      alert('Failed to update branch')
    }
  }
  const mapCenter = {
    lat: 37.7749,
    lng: -122.4194,
  }
  const [photo, setPhoto] = useState(null)

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    setFormData({...formData, photo: e.target.files[0]})
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhoto(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // if(branch.latitude && branch.longitude){
  //    mapCenter = {lat: parseFloat(branch.latitude), lng: parseFloat(branch.longitude)} || {
  //     lat: 37.7749,
  //     lng: -122.4194,
  //   } // Example coordinates (San Francisco)
  // }

  const mapContainerStyle = {width: '100%', height: '300px'}

  const handlePaginationChange = (newPage) => {
    setPagination((prev) => ({...prev, currentPage: newPage}))
  }
  const [isEditLocation, setIsEditLocation] = useState(false)
  const [editLocation, setEditLocation] = useState(null)
  const [searchAddress, setSearchAddress] = useState('')

  const handleSearchAddress = async (inputValue) => {
    setSearchAddress(inputValue) // Update the state with the current input value

    if (!inputValue) {
      alert('Please enter an address to search.')
      return
    }

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          inputValue,
          {mode: 'cors'} // CORS support
        )}&key=${'AIzaSyBtbpZ_-ETvYcJP5stMqWuSacGPj9MSTag'}`
      )
      const data = response.data

      if (data.status === 'OK') {
        const location = data.results[0].geometry.location
        setEditLocation(location)
        setIsEditLocation(true)
      } else if (data.status === 'ZERO_RESULTS') {
        alert('No results found for the given address.')
      } else {
        alert('An error occurred while searching for the address.')
      }
    } catch (error) {
      console.error('Error fetching location:', error)
      alert('An error occurred while searching for the address.')
    }
  }

  const handleUpdateLocation = () => {
    setBranch((prev) => ({
      ...prev,
      // location: editLocation,
    }))
    setIsEditLocation(false)
    alert('Location updated successfully.')
    // Make API request here to update the branch location on the backend
  }
  return (
    <div className=' mt-4'>
      {/* Branch Profile */}
      <div className='card mb-4'>
        <div className='card-body d-flex'>
          <img
            src={photo || branch?.photo || defaultPhoto}
            alt='Branch Photo'
            className='img-thumbnail me-3'
            style={{width: '150px', height: '150px', objectFit: 'cover'}}
          />
          <div>
            <h5> {branch?.name || 'branch name'}</h5>
            <h5 className='my-3'>
              {' '}
              <span className='d-inline-block' style={{minWidth: '200px'}}>
                ID:
              </span>{' '}
              <span className='text-muted'>{branch?.id}</span>
            </h5>
            <h5>
              {' '}
              <span className='d-inline-block' style={{minWidth: '200px'}}>
                Description:
              </span>{' '}
              <span className='text-muted'>{branch?.description || '---'}</span>
            </h5>
          </div>
          <div className='ms-auto'>
            <button
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
              onClick={() => setIsEditMode(true)}
            >
              <KTIcon iconName='pencil' className='fs-3' />
            </button>
          </div>
        </div>
      </div>
      <div className='card mb-4'>
        <div className='card-body'>
          <div className='d-flex justify-content-end'>
            <button
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
              onClick={() => setIsEditLocation(true)}
            >
              <KTIcon iconName='pencil' className='fs-3' />
            </button>
          </div>
          <div>
            <h5 className='mb-3'>
              <span className='d-inline-block' style={{minWidth: '100px'}}>
                Country:{''}
              </span>{' '}
              <span className='text-muted'>{branch?.country?.name || '---'}</span>
            </h5>
            <h5 className='mb-3'>
              {' '}
              <span className='d-inline-block' style={{minWidth: '100px'}}>
                State:{''}
              </span>{' '}
              <span className='text-muted'>{branch?.state?.name || '---'}</span>
            </h5>
            <h5 className='mb-3'>
              {' '}
              <span className='d-inline-block' style={{minWidth: '100px'}}>
                City:{' '}
              </span>{' '}
              <span className='text-muted'>{branch?.city?.name || '---'}</span>
            </h5>

            <h5 className='mb-3'>Map :</h5>
            <LoadScript googleMapsApiKey='AIzaSyBtbpZ_-ETvYcJP5stMqWuSacGPj9MSTag'>
              <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={10} />
            </LoadScript>
          </div>
        </div>
      </div>
      {/* Edit Modal */}
      {isEditMode && (
        <div
          className='modal show d-block'
          tabIndex='-1'
          style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Edit Branch</h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={() => setIsEditMode(false)}
                ></button>
              </div>
              <div className='modal-body'>
                <label className='form-label'>Photo</label>
                <img
            src={photo || branch?.photo || defaultPhoto}
            alt='Branch Photo'
            className='img-thumbnail me-3'
            style={{width: '150px', height: '150px', objectFit: 'cover'}}
          />
                <div className='mb-3'>
                  <input type='file' accept='image/*' onChange={handlePhotoChange} />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    name='name'
                    value={branch?.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Description</label>
                  <textarea
                    className='form-control'
                    name='description'
                    value={branch?.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => setIsEditMode(false)}
                >
                  Cancel
                </button>
                <button type='button' className='btn btn-primary' onClick={handleUpdate}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Edit Location Modal */}
      {isEditLocation && (
        <div className='modal show d-block' style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Edit Location</h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={() => setIsEditLocation(false)}
                ></button>
              </div>
              <div className='modal-body'>
                <div className='mb-3'>
                  <label className='form-label fw-bold'>Country:</label>
                  <div>
                    <Select
                      isLoading={isCountriesLoading}
                      isSearchable={true}
                      className='react-select-container'
                      classNamePrefix='react-select'
                      placeholder='Select Country'
                      value={countries.find((c) => c.value === selectedCountry) || null}
                      options={countries}
                      onChange={handleCountryChange}
                    />
                  </div>
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-bold'>State:</label>
                  <div>
                    <Select
                      isLoading={isStatesLoading}
                      isDisabled={states.length === 1}
                      isSearchable={true}
                      className='react-select-container'
                      classNamePrefix='react-select'
                      placeholder='Select State'
                      value={states.find((s) => s.value === selectedState) || null}
                      options={states}
                      onChange={handleStateChange}
                    />
                  </div>
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-bold'>City:</label>
                  <div>
                    <Select
                      isLoading={isCitiesLoading}
                      isDisabled={cities.length === 1}
                      isSearchable={true}
                      className='react-select-container'
                      classNamePrefix='react-select'
                      placeholder='Select City'
                      value={cities.find((c) => c.value === selectedCity) || null}
                      options={cities}
                      onChange={handleCityChange}
                    />
                  </div>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Search for Address</label>
                  <input
                    type='text'
                    className='form-control'
                    value={searchAddress}
                    onChange={(e) => handleSearchAddress(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <LoadScript googleMapsApiKey='AIzaSyBtbpZ_-ETvYcJP5stMqWuSacGPj9MSTag'>
                    <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={10} />
                  </LoadScript>
                </div>
              </div>
              <div className='modal-footer'>
                <button className='btn btn-secondary' onClick={() => setIsEditLocation(false)}>
                  Cancel
                </button>
                <button className='btn btn-primary' onClick={handleUpdateLocation}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BranchsDetailsPage
