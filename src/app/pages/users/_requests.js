import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export const PARTNERS_URL = `${API_URL}/partners`
export const USERS_URL = `${API_URL}/users`
export const AGEGROUP_URL = `${API_URL}/age-groups`
export const COUNTRIES_URL = `${API_URL}/general/countries`
export const STATES_URL = `${API_URL}/general/states`
export const CITIES_URL = `${API_URL}/general/cities`
export const ACTIVITY_URL = `${API_URL}/activity-categories`
export const TYPES_URL = `${API_URL}/types`
export const CAPACITIES_URL = `${API_URL}/capacities`
export const SERVICES_URL = `${API_URL}/services`

// units
export function getUsers(props) {
  return axios.get(USERS_URL, {
    params: props,
  })
}
export function getUser(userId) {
  return axios.get(USERS_URL + '/' + userId)
}
// update unit info
export function updateUserInfo(values, userId) {
  return axios.put(USERS_URL + '/' + userId + '/update-info', {
    name: values.name || '',
    username: values.username || '',
    email: values.email || '',
    phone: values.phone || '',
    phone_code: values.phone_code,
    gender: values.gender.toLowerCase(),
    image: values.image,
    date_of_birth: values.date_of_birth,
  })
}
// profile
export function updateUserStatus(status, userId) {
  return axios.put(USERS_URL + '/' + userId + '/update-status', {
    status: status,
  })
}
// units
export function getPartnerUnits(userId) {
  return axios.get(PARTNERS_URL + '/' + userId + '/units')
}
// location
export function getLocation(userId) {
  return axios.get(USERS_URL + '/' + userId + '/location-details')
}
// update unit location
export function updateLocation(fromData, itemId) {
  return axios.put(USERS_URL + '/' + itemId + '/update-location', {
    state_id: fromData.state_id,
    city_id: fromData.city_id,
    address: fromData.address,
    // main_field_id: fromData.main_field_id,
    // conflicted_fields: fromData.conflicted_fields,
    latitude: fromData.latitude,
    // longitude: fromData.longitude,
  })
}
// wallet
export function getWallet(props, userId) {
  return axios.get(USERS_URL + '/' + userId + '/wallet', {
    params: props,
  })
}
// wallet
export function getTransaction(itemDetails, userId) {
  if (itemDetails.transactionType === 'wallet_fund') {
    return axios.get(USERS_URL + '/' + userId + '/wallet-fund/' + itemDetails.transactionId)
  }
  if (itemDetails.transactionType === 'cash_out') {
    return axios.get(USERS_URL + '/' + userId + '/cash-out/' + itemDetails.transactionId)
  }
}
// wallet-funds
export function getWalletFunds(props, userId) {
  return axios.get(USERS_URL + '/' + userId + '/wallet-fund', {
    params: props,
  })
}
// wallet-funds
export function getCashOut(props, userId) {
  return axios.get(USERS_URL + '/' + userId + '/cash-out', {
    params: props,
  })
}
// update wallet-funds
export function updateWalletFunds(status, action_reason, userId, itemId) {
  return axios.put(USERS_URL + '/' + userId + '/wallet-fund/' + itemId, {
    status: status,
    action_reason: action_reason,
  })
}
// update wallet-cash-out
export function updateWalletCashOut(status, action_reason, userId, itemId) {
  return axios.put(USERS_URL + '/' + userId + '/cash-out/' + itemId, {
    status: status,
    action_reason: action_reason,
  })
}
// add wallet-funds
export function addWalletFunds(amount, action_reason, userId) {
  return axios.post(USERS_URL + '/' + userId + '/wallet-fund', {
    amount: amount,
    reason: action_reason,
  })
}
// comments
export function getComments(props, userId) {
  return axios.get(USERS_URL + '/' + userId + '/comments', {
    params: props,
  })
}
// delete comment
export function deleteComment(userId, itemId) {
  return axios.delete(USERS_URL + '/' + userId + '/comments/' + itemId)
}


//restore comment
export function restoreComment(unitId, commentId) {
  const url = `${API_URL}/units/${unitId}/comments/${commentId}/restore`;
  return axios.put(url);
}

// contacts
export function getContacts(props, userId) {
  return axios.get(USERS_URL + '/' + userId + '/contacts', {
    params: props,
  })
}
// employees
export function getEmployees(props, userId) {
  return axios.get(USERS_URL + '/' + userId + '/employees', {
    params: props,
  })
}
// public events
export function getPublicEvents(props, userId) {
  return axios.get(USERS_URL + '/' + userId + '/public-events', {
    params: props,
  })
}
// bookings
export function getBookings(props, userId) {
  return axios.get(USERS_URL + '/' + userId + '/booking', {
    params: props,
  })
}
// policies
export function getPolicies(props, userId) {
  return axios.get(USERS_URL + '/' + userId + '/policies', {
    params: props,
  })
}
//get Policy
export function getPolicy(userId) {
  return axios.get(USERS_URL + '/' + userId + '/policy')
}
// gallery
export function getGallery(props, userId) {
  return axios.get(USERS_URL + '/' + userId + '/gallery', {
    params: props,
  })
}
// new gallery
export function createGallery(userId, formData) {
  return axios.post(USERS_URL + '/' + userId + '/gallery', formData)
}
// new gallery
export function updatePhoto(userId, photoId, formData) {
  return axios.post(USERS_URL + '/' + userId + '/gallery/' + photoId, formData)
}
// set main photo
export function setMainPhoto(userId, photoId) {
  return axios.put(USERS_URL + '/' + userId + '/gallery/' + photoId + '/set-as-main')
}
// delete Photo
export function deletePhoto(userId, photoId) {
  return axios.delete(USERS_URL + '/' + userId + '/gallery/' + photoId)
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
