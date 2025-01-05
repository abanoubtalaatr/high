import axios from 'axios'
import {getAuth} from '../../../modules/auth'

const API_URL = process.env.REACT_APP_API_URL

export const COUNTRIES_URL = `${API_URL}/countries`
export const STATES_URL = `${API_URL}/states`
export const CITIES_URL = `${API_URL}/cities`

const user = getAuth()
const userToken = user ? user.data.token : ''
// location_name = countries | states | cities
export function getaxes(params, code_id, location_name) {
  return axios.get(API_URL + '/' + location_name + '/' + code_id + '/taxes', {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    params: params,
  })
}
export function getTax(code_id, location_name, itemId) {
  return axios.get(API_URL + '/' + location_name + '/' + code_id +  '/taxes/' + itemId, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
}
export function createTax(tax_name, tax, active, code_id, location_name) {
  return axios.post(
    API_URL + '/' + location_name + '/' + code_id +  '/taxes',
    {
      name: tax_name,
      tax: tax,
      active: active,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  )
}

export function updateTax(tax_name, tax, active, code_id, location_name, itemId) {
  return axios.put(
    API_URL + '/' + location_name + '/' + code_id +  '/taxes/' + itemId,
    {
      name: tax_name,
      tax: tax,
      active: active,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  )
}

export function deleteTax(code_id, location_name, itemId) {
  return axios.delete(API_URL + '/' + location_name + '/' + code_id + '/taxes/' + itemId, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
}
export function getLocation(code_id,location_name) {
  return axios.get(API_URL + '/' + location_name + '/' + code_id , {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
}
