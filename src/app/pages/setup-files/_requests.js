import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export const TYPES_URL = `${API_URL}/types`
export const CAPACITIES_URL = `${API_URL}/capacities`
export const SERVICES_URL = `${API_URL}/services`
export const AGE_GROUPS_URL = `${API_URL}/age-groups`
export const LANGUAGES_URL = `${API_URL}/languages`
export const TRANSLATIONS_URL = `${API_URL}/translations`
// types
export function getTypes(props) {
  return axios.get(TYPES_URL, {
    params: props,
  })
}
export function getType(id) {
  return axios.get(TYPES_URL + '/' + id)
}
export function createType(fromData) {
  return axios.post(TYPES_URL, fromData)
}
export function updateType(fromData, itemId) {
  return axios.post(TYPES_URL + '/' + itemId, fromData)
}
export function deleteType(itemId) {
  return axios.delete(TYPES_URL + '/' + itemId)
}
// services
export function getServices(props) {
  return axios.get(SERVICES_URL, {
    params: props,
  })
}
export function getService(id) {
  return axios.get(SERVICES_URL + '/' + id)
}
export function createService(formData) {
  return axios.post(SERVICES_URL, formData)
}
export function updateService(formData, itemId) {
  return axios.post(SERVICES_URL + '/' + itemId, formData)
}
export function deleteService(itemId) {
  return axios.delete(SERVICES_URL + '/' + itemId)
}
// age groups
export function getAgeGroups(props) {
  return axios.get(AGE_GROUPS_URL, {
    params: props,
  })
}
export function getAgeGroup(id) {
  return axios.get(AGE_GROUPS_URL + '/' + id)
}
export function createAgeGroup(formData) {
  return axios.post(AGE_GROUPS_URL, formData)
}
export function updateAgeGroup(formData, itemId) {
  return axios.post(AGE_GROUPS_URL + '/' + itemId, formData)
}
export function deleteAgeGroup(itemId) {
  return axios.delete(AGE_GROUPS_URL + '/' + itemId)
}
// capacities
export function getCapacities(props) {
  return axios.get(CAPACITIES_URL, {
    params: props,
  })
}
export function getCapacity(id) {
  return axios.get(CAPACITIES_URL + '/' + id)
}
export function createCapacity(fromData) {
  return axios.post(CAPACITIES_URL, fromData)
}
export function updateCapacity(fromData, itemId) {
  return axios.post(CAPACITIES_URL + '/' + itemId, fromData)
}
export function deleteCapacity(itemId) {
  return axios.delete(CAPACITIES_URL + '/' + itemId)
}
// languages
export function getLanguages(props) {
  return axios.get(LANGUAGES_URL, {
    params: props,
  })
}
export function createLanguage(formData) {
  return axios.post(LANGUAGES_URL, formData)
}
export function updateLanguage(formData, itemId) {
  return axios.post(LANGUAGES_URL + '/' + itemId, formData)
}
export function deleteLanguage(itemId) {
  return axios.delete(LANGUAGES_URL + '/' + itemId)
}