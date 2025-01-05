import axios from 'axios'
import {getAuth} from '../../../modules/auth'
const API_URL = process.env.REACT_APP_API_URL

export const COUNTRIES_URL = `${API_URL}/countries`
export const TIMEZONE_URL = `${API_URL}/general/timezones`
export const CURRENCIES_URL = `${API_URL}/general/currencies`

const user = getAuth()
const userToken = user ? user.data.token : ''

export function getCountries(props) {
  return axios.get(COUNTRIES_URL, {
    params: props,
  })
}
export function getCountry(iso) {
  return axios.get(COUNTRIES_URL + '/' + iso, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
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
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
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
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  )
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
