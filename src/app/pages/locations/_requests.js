import axios from 'axios'
import { getAuth } from '../../modules/auth'
const API_URL = process.env.REACT_APP_API_URL

export const GENERAL_COUNTRIES_URL = `${API_URL}/general/countries`
export const GENERAL_STATES_URL = `${API_URL}/general/states`
export const GENERAL_CITIES_URL = `${API_URL}/general/cities`
export const COUNTRIES_URL = `${API_URL}/countries`
export const STATES_URL = `${API_URL}/states`
export const CITIES_URL = `${API_URL}/cities`
export const TIMEZONE_URL = `${API_URL}/general/timezones`
export const CURRENCIES_URL = `${API_URL}/general/currencies`

const user = getAuth()
const userToken = user ? user.data.token : ''

export function getCountries(props) {
  return axios.get(GENERAL_COUNTRIES_URL, {
    params: props,
  })
}
export function getCities(props) {
  return axios.get(GENERAL_CITIES_URL, {
    params: props,
  })
}
export function getStates(props) {
  return axios.get(GENERAL_STATES_URL, {
    params: props,
  })
}

export function createState(values) {
  return axios.post(STATES_URL, {
    name: values.name,
    country: values.country,
    active: values.active,
    place_id: values.place_id,
    latitude: values.latitude,
    longitude: values.longitude,
  })
}
export function updateState(values, itemId) {
  return axios.put(STATES_URL + '/' + itemId, {
    name: values.name,
    country: values.country,
    active: values.active,
    place_id: values.place_id,
    latitude: values.latitude,
    longitude: values.longitude,
  })
}

export function createCountry(values) {
  return axios.post(
    COUNTRIES_URL,
    {
      iso: values.iso,
      name: values.name,
      phone_code: values.phone_code,
      currency_id: values.currency_id,
      timezone: values.timezone,
      active: values.active,
      place_id: values.place_id,
      latitude: values.latitude,
      longitude: values.longitude,
    }
  )
}

export function updateCountry(values, itemIso) {
  return axios.put(
    COUNTRIES_URL + '/' + itemIso,
    {
      iso: values.iso,
      name: values.name,
      phone_code: values.phone_code,
      currency_id: values.currency_id,
      timezone: values.timezone,
      active: values.active,
      place_id: values.place_id,
      latitude: values.latitude,
      longitude: values.longitude,
    }
  )
}
export function createCity(values) {
  return axios.post(CITIES_URL, {
    name: values.name,
    state_id: values.state_id,
    active: values.active,
    place_id: values.place_id,
    latitude: values.latitude,
    longitude: values.longitude,
  })
}
export function getCity(id) {
  return axios.get(CITIES_URL + '/' + id, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
}
export function updateCity(values, itemId) {
  return axios.put(CITIES_URL + '/' + itemId, {
    name: values.name,
    state_id: values.state_id,
    active: values.active,
    place_id: values.place_id,
    latitude: values.latitude,
    longitude: values.longitude,
  })
}
export function deleteCity(itemId) {
  return axios.delete(CITIES_URL + '/' + itemId)
}

export function deleteState(itemId) {
  return axios.delete(STATES_URL + '/' + itemId)
}

export function deleteCountry(itemId) {
  return axios.delete(COUNTRIES_URL + '/' + itemId)
}
export function getTimezones() {
  return axios.get(TIMEZONE_URL, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
}
export function getCurrencies() {
  return axios.get(CURRENCIES_URL, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
}
