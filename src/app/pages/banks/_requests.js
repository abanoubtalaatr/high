import axios from 'axios'
import { getAuth } from '../../modules/auth'
const API_URL = process.env.REACT_APP_API_URL

export const BANK_URL = `${API_URL}/banks`

const user = getAuth()
const userToken = user ? user.data.token : ''

export function getBanks( params) {
  return axios.get(`${BANK_URL}`, {
    params: params,
  })
}

export function getBank(id) {
  return axios.get(BANK_URL+'/'+id)
}



export function createBank(name, order, active) {
  return axios.post(
    BANK_URL,
    {
      name: name,
      order: order,
      active: active,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  )
}
export function updateBank(name, order, active, itemId) {
  return axios.put(
    BANK_URL + '/' + itemId,
    {
      name: name,
      order: order,
      active: active,
    
    }
  )
}

// wallet-funds
export function deleteBank(id) {
  return axios.delete(`${BANK_URL}/${id}`)
}
