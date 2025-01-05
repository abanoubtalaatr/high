import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export const PARTNERS_URL = `${API_URL}/partners`
export const COUNTRIES_URL = `${API_URL}/general/countries`
export const STATES_URL = `${API_URL}/general/states`
export const CITIES_URL = `${API_URL}/general/cities`
export const ACTIVITY_URL = `${API_URL}/activity-categories`
export const TYPES_URL = `${API_URL}/types`
export const CAPACITIES_URL = `${API_URL}/capacities`

// partners
export function getPartners(props) {
  return axios.get(PARTNERS_URL, {
    params: props,
  })
}
export function getPartner(userId) {
  return axios.get(PARTNERS_URL + '/' + userId)
}
// profile
export function updatePartnerStatus(active, userId) {
  return axios.post(PARTNERS_URL + '/' + userId + '/update-company-status', {
    active: active == 'active' || active == "1" ? 1 : 0
    
  })
}
export function updatePartnerProfile(formData, userId) {
  return axios.post(PARTNERS_URL + '/' + userId + '/update-company-info', formData)
}
// memberships/members
export function getMembershipsMembers(props, userId) {
  return axios.get(PARTNERS_URL + '/' + userId + '/memberships/members', {
    params: props,
  })
}
// memberships/categories
export function getMembershipsCategories(props, userId) {
  return axios.get(PARTNERS_URL + '/' + userId + '/memberships/category', {
    params: props,
  })
}
// units
export function getUnits(props, userId) {
  return axios.get(PARTNERS_URL + '/' + userId + '/units', {
    params: props,
  })
}
// customers
export function getCustomers(props, userId) {
  return axios.get(PARTNERS_URL + '/' + userId + '/customers', {
    params: props,
  })
}
// contacts
export function getContacts(props, userId) {
  return axios.get(PARTNERS_URL + '/' + userId + '/contacts', {
    params: props,
  })
}
// employees
export function getEmployees(props, userId) {
  return axios.get(PARTNERS_URL + '/' + userId + '/employees', {
    params: props,
  })
}
// public events
export function getPublicEvents(props, userId) {
  return axios.get(PARTNERS_URL + '/' + userId + '/public-events', {
    params: props,
  })
}
// bookings
export function getBookings(props, userId) {
  return axios.get(PARTNERS_URL + '/' + userId + '/bookings', {
    params: props,
  })
}
// documents
export function getDocuments(props, userId) {
  return axios.get(PARTNERS_URL + '/' + userId + '/documents', {
    params: props,
  })
}
// get document
export function getDocument(userId, itemId) {
  return axios.get(PARTNERS_URL + '/' + userId + '/documents/' + itemId)
}
// create documents
export function createDocument(fromData, userId) {
  return axios.post(PARTNERS_URL + '/' + userId + '/documents', fromData)
}
// update documents
export function updateDocument(fromData, userId, itemId) {
  return axios.post(PARTNERS_URL + '/' + userId + '/documents/' + itemId, fromData)
}
// delete documents
export function deleteDocument(userId, itemId) {
  return axios.delete(PARTNERS_URL + '/' + userId + '/documents/' + itemId)
}
// policies
export function getPolicies(props, userId) {
  return axios.get(PARTNERS_URL + '/' + userId + '/policies', {
    params: props,
  })
}
//get Policy
export function getPolicy(userId, itemId) {
  return axios.get(PARTNERS_URL + '/' + userId + '/policies/' + itemId)
}
// update location
export function updateLocation(fromData, userId) {
  return axios.post(PARTNERS_URL + '/' + userId + '/update-location', fromData)
}
// update owner-info
export function updateOwnerInfo(fromData, userId) {
  return axios.post(PARTNERS_URL + '/' + userId + '/update-owner-info', fromData)
}
// update update-password
export function updatePassword(fromData, userId) {
  return axios.post(PARTNERS_URL + '/' + userId + '/update-password', fromData)
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
// get settings
export function getPartnerSettings(userId) {
  return axios.get(PARTNERS_URL + '/' + userId + '/settings')
}
// update settings
export function updatePartnerSettings(values, userId) {
  return axios.post(PARTNERS_URL + '/' + userId + '/update-settings', values)
}
export function getBranchesForPartner(partnerId, params = {}) {
  return axios.get(`${PARTNERS_URL}/${partnerId}/branches`, {
    params,
  });
}

export function getBranchDetails(partnerId, branchId) {
  return axios.get(`${PARTNERS_URL}/${partnerId}/branches/${branchId}`);
}
