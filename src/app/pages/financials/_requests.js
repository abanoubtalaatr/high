import axios from 'axios'
import { getAuth } from '../../modules/auth'
const API_URL = process.env.REACT_APP_API_URL

export const USERS_URL = `${API_URL}/users`
export const WALLETS_URL = `${API_URL}/wallets`
export const Financial_URL = `${API_URL}/financials`
export const STATES_URL = `${API_URL}/general/states`
export const CURRENCIES_URL = `${API_URL}/currencies`
export const GENERAL_CURRENCIES_URL = `${API_URL}/general/currencies`
export const COUNTRIES_URL = `${API_URL}/general/countries`

const user = getAuth()
const userToken = user ? user.data.token : ''

export function getTransactions(iso, props) {
  return axios.get(`${WALLETS_URL}/${iso}/all`, {
    params: props,
  })
}

export function getTransactionsCountry(iso, props) {
  return axios.get(`${Financial_URL}/${iso}`, {
    params: props,
  })
}
// get Transaction
export function getTransaction(itemDetails) {
  if (itemDetails.transactionType === 'wallet_fund') {
    return axios.get(USERS_URL + '/' + itemDetails.userId + '/wallet-fund/' + itemDetails.transactionId)
  }
  if (itemDetails.transactionType === 'cash_out') {
    return axios.get(USERS_URL + '/' + itemDetails.userId + '/cash-out/' + itemDetails.transactionId)
  }
}
export function getWallets() {
  return axios.get(WALLETS_URL)
}
export function getFinancials(params) {
  return axios.get(Financial_URL, {
    params: params,
  })
}


export function getGeneralCurrencies() {
  return axios.get(GENERAL_CURRENCIES_URL)
}
export function getCurrencies(props) {
  return axios.get(CURRENCIES_URL, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    params: props,
  })
}
export function getStates(props) {
  return axios.get(STATES_URL, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    params: props,
  })
}

export function getCountries() {
  return axios.get(COUNTRIES_URL, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
}

export function createCurrency(currency_name, currency_code, active) {
  return axios.post(
    CURRENCIES_URL,
    {
      name: currency_name,
      code: currency_code,
      active: active,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  )
}
export function getCurrency(id) {
  return axios.get(CURRENCIES_URL + '/' + id, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
}
export function updateCurrency(currency_name, currency_code, active, itemId) {
  return axios.put(
    CURRENCIES_URL + '/' + itemId,
    {
      name: currency_name,
      code: currency_code,
      active: active,
      iso: itemId,
    }
  )
}
// exchanges
export function getExchanges(iso, props) {
  return axios.get(`${WALLETS_URL}/${iso}/exchanges`, {
    params: props,
  })
}
// wallet-funds
export function getWalletFunds(iso, props) {
  return axios.get(`${WALLETS_URL}/${iso}/transactions/wallet_fund`, {
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
// wallet-funds
export function getCashOut(iso, props) {
  return axios.get(`${WALLETS_URL}/${iso}/transactions/cash_out`, {
    params: props,
  })
}

