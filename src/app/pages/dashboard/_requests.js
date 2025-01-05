import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export const UNITS_URL = `${API_URL}/statistics/units`
export const USERS_URL = `${API_URL}/statistics/users`
export const GENDER_URL = `${API_URL}/statistics/genders`
export const PARTNERS_URL = `${API_URL}/statistics/partners`
export const BOOKINGS_URL = `${API_URL}/statistics/bookings`
export const PUBLIC_EVENTS_URL = `${API_URL}/statistics/public-events`
export const USERS_ENGAGMENT_URL = `${API_URL}/statistics/users-engagement`
export const COUNTRIES_URL = `${API_URL}/general/countries`
export const STATES_URL = `${API_URL}/general/states`
export const CITIES_URL = `${API_URL}/general/cities`
export const ACTIVITY_URL = `${API_URL}/activity-categories`

// partbookingsners
export function getBookings(props) {
  return axios.get(BOOKINGS_URL, {
    params: props,
  })
}
// partners
export function getPartners(props) {
  return axios.get(PARTNERS_URL, {
    params: props,
  })
}
// units
export function getUnits(props) {
  return axios.get(UNITS_URL, {
    params: props,
  })
}
// units
export function getGender(props) {
  return axios.get(GENDER_URL, {
    params: props,
  })
}
// users
export function getUsers(props) {
  return axios.get(USERS_URL, {
    params: props,
  })
}
// users engagement
export function getUsersEngagement(props) {
  return axios.get(USERS_ENGAGMENT_URL, {
    params: props,
  })
}
// public events
export function getPublicEvents(props) {
  return axios.get(PUBLIC_EVENTS_URL, {
    params: props,
  })
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
