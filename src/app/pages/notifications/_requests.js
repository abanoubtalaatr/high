import axios from 'axios'
import { getAuth } from '../../modules/auth'
const API_URL = process.env.REACT_APP_API_URL
export const PARTNER_NOTIFICATIONS_URL = `${API_URL}/partner-push-notifications`
export const USER_NOTIFICATIONS_URL = `${API_URL}/player-push-notifications`
export const COUNTRIES_URL = `${API_URL}/general/countries`
export const GPSCOUNTRIES_URL = `${API_URL}/general/gps/countries`
export const STATES_URL = `${API_URL}/general/states`
export const GPSSTATES_URL = `${API_URL}/general/gps/states`
export const CITIES_URL = `${API_URL}/general/cities`
export const GPSCITIES_URL = `${API_URL}/general/gps/cities`
export const ACTIVITY_URL = `${API_URL}/activity-categories`
export const AGEGROUP_URL = `${API_URL}/age-groups`
export const LANGUAGES_URL = `${API_URL}/languages`

const user = getAuth()
const userToken = user ? user.data.token : ''

export function getPartnersNotifications(props) {
  return axios.get(PARTNER_NOTIFICATIONS_URL, {
    params: props,
  })
}
export function getUsersNotifications(props) {
  return axios.get(USER_NOTIFICATIONS_URL, {
    params: props,
  })
}
export function getPartnerNotification(itemId) {
  return axios.get(PARTNER_NOTIFICATIONS_URL + '/' + itemId)
}
export function createPartnerNotification(values) {
  let activitiesIds = Array.isArray(values.activities)
    ? values.activities.map((s) => s.value)
    : [-1]
  return axios.post(PARTNER_NOTIFICATIONS_URL, { ...values, activities: activitiesIds })
}
export function createUserNotification(values) {
  return axios.post(USER_NOTIFICATIONS_URL, { ...values })
}
export function updatePartnerNotification(values, itemId) {
  let activitiesIds = Array.isArray(values.activities)
    ? values.activities.map((s) => s.value)
    : [-1]
  return axios.put(PARTNER_NOTIFICATIONS_URL + '/' + itemId, {
    ...values,
    activities: activitiesIds,
  })
}
export function deletePartnerNotification(itemId) {
  return axios.delete(PARTNER_NOTIFICATIONS_URL + '/' + itemId)
}
export function deletePage(itemId) {
  return axios.delete(PARTNER_NOTIFICATIONS_URL + '/' + itemId)
}
// countries
export function getCountries() {
  return axios.get(COUNTRIES_URL)
}
// countries
export function getGpsCountries() {
  return axios.get(GPSCOUNTRIES_URL)
}

// states
export function getStates(props) {
  return axios.get(STATES_URL, {
    params: props,
  })
}
// states
export function getGpsStates(country) {
  return axios.get(`${GPSSTATES_URL}/${country}`)
}
// cities
export function getCities(props) {
  return axios.get(CITIES_URL, {
    params: props,
  })
}
// cities
export function getGpsCities(country,state) {
  return axios.get(`${GPSCITIES_URL}/${country}/${state}`)
}
// activity categories
export function getActivityCategories() {
  return axios.get(ACTIVITY_URL)
}
// activities
export function getActivities(catId) {
  return axios.get(ACTIVITY_URL + '/' + catId + '/activities')
}
// age group
export function getAgeGroups() {
  return axios.get(AGEGROUP_URL)
}
// languages
export function getLanguages(props) {
  return axios.get(LANGUAGES_URL, {
    params: props,
  })
}