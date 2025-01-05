import axios from 'axios'
import {getAuth} from '../../../modules/auth'

const API_URL = process.env.REACT_APP_API_URL

export const COUNTRIES_URL = `${API_URL}/countries`

const user = getAuth()
const userToken = user ? user.data.token : ''
// location_name = countries | states | cities
export function getDocuments(parms, code_id, location_name) {
  return axios.get(API_URL + '/' + location_name + '/' + code_id + '/documents', {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    params: parms,
  })
}
export function getDocument(code_id, location_name, itemId) {
  return axios.get(API_URL + '/' + location_name + '/' + code_id + '/documents/' + itemId, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
}
export function createDocument(doc_name, required, code_id, location_name) {
  return axios.post(
    API_URL + '/' + location_name + '/' + code_id + '/documents',
    {
      name: doc_name,
      required: required,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  )
}

export function updateDocument(doc_name, required, code_id, location_name, itemId) {
  return axios.put(
    API_URL + '/' + location_name + '/' + code_id + '/documents/' + itemId,
    {
      name: doc_name,
      required: required,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  )
}

export function deleteDocument(code_id, location_name, itemId) {
  return axios.delete(API_URL + '/' + location_name + '/' + code_id + '/documents/' + itemId, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
}
export function getLocation(code_id, location_name) {
  return axios.get(API_URL + '/' + location_name + '/' + code_id, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
}
