import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export const PARTNERS_URL = `${API_URL}/partners`
export const PARTNERS_MAIN_UNIT_URL = `${API_URL}/general/main-units`
export const PARTNERS_PART_UNIT_URL = `${API_URL}/general/part-units`
export const UNITS_URL = `${API_URL}/units`
export const AGEGROUP_URL = `${API_URL}/age-groups`
export const COUNTRIES_URL = `${API_URL}/general/countries`
export const STATES_URL = `${API_URL}/general/states`
export const CITIES_URL = `${API_URL}/general/cities`
export const ACTIVITY_URL = `${API_URL}/activity-categories`
export const TYPES_URL = `${API_URL}/types`
export const CAPACITIES_URL = `${API_URL}/capacities`
export const SERVICES_URL = `${API_URL}/services`

// units
export function getUnits(props) {
  return axios.get(UNITS_URL, {
    params: props,
  })
}
export function getUnit(userId) {
  return axios.get(UNITS_URL + '/' + userId)
}
// update unit info
export function updateUnitInfo(fromData, itemId) {
  const services = []
  fromData.services.map((s) => services.push(s.value))
  return axios.put(UNITS_URL + '/' + itemId, {
    name: fromData.name,
    activity_id: fromData.activity_id,
    type_id: fromData.type_id,
    length: fromData.length,
    width: fromData.width,
    capacity_id: fromData.capacity_id,
    services: services,
    gender: fromData.gender,
    description: fromData.description,
    branch_id : fromData.branch_id
  })
}
// profile
export function updateUnitStatus(active, userId) {
  return axios.put(UNITS_URL + '/' + userId + '/update-unit-status', {
    active: active,
  })
}
// units
export function getPartnerUnits(userId) {
  return axios.get(PARTNERS_URL + '/' + userId + '/units')
}
// main units
export function getPartnerMainUnits(props) {
  return axios.get(PARTNERS_MAIN_UNIT_URL, {
    params: props,
  })
}
// part units
export function getPartnerPartUnits(props) {
  return axios.get(PARTNERS_PART_UNIT_URL, {
    params: props,
  })
}
// location
export function getLocation(unitId) {
  return axios.get(UNITS_URL + '/' + unitId + '/location-details')
}
// update unit location
export function updateLocation(values, itemId) {
  const v = {
    state_id: values.state_id,
    city_id: values.city_id,
    address: values.address,
    main_field_id: values.main_field_id,
    // conflicted_fields: values.conflicted_with,
    place_id: values.place_id,
    type: values.type,
    latitude: values.latitude,
    longitude: values.longitude,
    
  }
  values.conflicted_with.forEach((c) => {
    v[`conflicted_fields[${c}]`] = [c]
  })
  console.log(v)
  return axios.put(UNITS_URL + '/' + itemId + '/update-location', v)
  // return axios.put(UNITS_URL + '/' + itemId + '/update-location', {
  //   state_id: values.state_id,
  //   city_id: values.city_id,
  //   address: values.address,
  //   main_field_id: values.main_field_id,
  //   conflicted_fields: values.conflicted_with,
  //   place_id: values.place_id,
  //   type: values.type,
  //   longitude: values.longitude,
  //   longitude: values.longitude,
  // })
}
// comments
export function getComments(params, unitId) {
  return axios.get(UNITS_URL + '/' + unitId + '/comments', {
    params: params,
  })
}
// delete comment
export function deleteComment(unitId, itemId) {
  return axios.delete(UNITS_URL + '/' + unitId + '/comments/' + itemId)
}
// restore comment
export function restoreComment(unitId, itemId) {
  return axios.put(UNITS_URL + '/' + unitId + '/comments/' + itemId + '/restore')
}
// contacts
export function getContacts(props, unitId) {
  return axios.get(UNITS_URL + '/' + unitId + '/contacts', {
    params: props,
  })
}
// employees
export function getEmployees(props, unitId) {
  return axios.get(UNITS_URL + '/' + unitId + '/employees', {
    params: props,
  })
}
// public events
export function getPublicEvents(props, userId) {
  return axios.get(UNITS_URL + '/' + userId + '/public-events', {
    params: props,
  })
}
// bookings
export function getBookings(props, userId) {
  return axios.get(UNITS_URL + '/' + userId + '/bookings', {
    params: props,
  })
}
// policies
export function getPolicies(props, userId) {
  return axios.get(UNITS_URL + '/' + userId + '/policies', {
    params: props,
  })
}
//get Policy
export function getPolicy(unitId) {
  return axios.get(UNITS_URL + '/' + unitId + '/policy')
}
// gallery
export function getGallery(props, unitId) {
  return axios.get(UNITS_URL + '/' + unitId + '/gallery', {
    params: props,
  })
}
// delete Photo
export function deletePhoto(unitId, photoId) {
  return axios.delete(UNITS_URL + '/' + unitId + '/gallery/' + photoId)
}
// new gallery
export function createGallery(unitId, formData) {
  return axios.post(UNITS_URL + '/' + unitId + '/gallery', formData)
}
// new gallery
export function updatePhoto(unitId, photoId, formData) {
  return axios.post(UNITS_URL + '/' + unitId + '/gallery/' + photoId, formData)
}
// set main photo
export function setMainPhoto(unitId, photoId) {
  return axios.put(UNITS_URL + '/' + unitId + '/gallery/' + photoId + '/set-as-main')
}
// countries
export function getCountries() {
  return axios.get(COUNTRIES_URL)
}

// states
export function getStates(props) {
  return axios.get(STATES_URL, {
    params: props,
  })
}
// cities
export function getCities(props) {
  return axios.get(CITIES_URL, {
    params: props,
  })
}
// age groups
export function getAgeGroups() {
  return axios.get(AGEGROUP_URL)
}
// activity categories
export function getActivityCategories() {
  return axios.get(ACTIVITY_URL)
}
// activities
export function getActivities(catId) {
  return axios.get(ACTIVITY_URL + '/' + catId + '/activities')
}
// types
export function getTypes() {
  return axios.get(TYPES_URL)
}
// Capacities
export function getCapacities() {
  return axios.get(CAPACITIES_URL)
}
// services
export function getServices() {
  return axios.get(SERVICES_URL)
}
// get settings
export function getUnitSettings(unitId) {
  return axios.get(UNITS_URL + '/' + unitId + '/settings')
}
// assign age groups
export function getAssignAgeGroups(unitId) {
  return axios.get(UNITS_URL + '/' + unitId + '/age-groups')
}
// update Unit settings
export function updateUnitSettings(values, unitId) {
  return axios.post(UNITS_URL + '/' + unitId + '/update-settings', values)
}
// update age groups settings
export function updateAgeGroupsSettings(values, unitId) {
  return axios.post(UNITS_URL + '/' + unitId + '/assign-age-groups', {
    age_groups: values,
  })
}
// assign assign taxes settings
export function getAssignTaxesSettings(unitId) {
  return axios.get(UNITS_URL + '/' + unitId + '/get-assigned-taxes')
}

export function getBranches() {
  return axios.get(API_URL + '/branches')
}
// update assign taxes settings
export function updateAssignTaxesSettings(
  countriesTaxesIds,
  statesTaxesIds,
  citiesTaxesIds,
  unitId
) {
  return axios.post(UNITS_URL + '/' + unitId + '/assign-taxes', {
    country_taxes: countriesTaxesIds,
    state_taxes: statesTaxesIds,
    city_taxes: citiesTaxesIds,
  })
}
