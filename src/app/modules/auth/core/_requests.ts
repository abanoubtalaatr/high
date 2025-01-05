import axios from 'axios'
import {AuthModel, UserModel} from './_models'

// const API_URL = process.env.REACT_APP_API_URL
const API_URL = process.env.REACT_APP_API_URL
console.log(API_URL)

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/me`
export const LOGIN_URL = `${API_URL}/login`
export const FORGET_PASSWORD_VERIFICATION = `${API_URL}/forget-password-verification`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forget-password`

// Server should return AuthModel
export function login(email_phone: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    email_phone,
    password,
  })
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
  return axios.get<AuthModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}


export function verificationCodein(email: string, code: string) {
  return axios.post(FORGET_PASSWORD_VERIFICATION, {
    email,
    code, 
  })
}
