import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export const GET_EMPLOYEES_URL = `${API_URL}/employees`
export const CREATE_EMPLOYEES_URL = `${API_URL}/employees`
export const DELETE_EMPLOYEES_URL = `${API_URL}/employees`
export const SET_PASSWORD_URL = `${API_URL}/employees/set-password`
export const JOBS_URL = `${API_URL}/jobs`
export const GENERAL_JOBS_URL = `${API_URL}/general/jobs`
export const COUNTRIES_URL = `${API_URL}/general/countries`

export function getEmployees(props) {
  return axios.get(GET_EMPLOYEES_URL, {
    params: props,
  })
}
export function getEmployeesActive() {
  return axios.get(GET_EMPLOYEES_URL, {
    params: {
      active: '0',
    },
  })
}
export function getEmployee(userId) {
  return axios.get(GET_EMPLOYEES_URL + '/' + userId)
}
export function createEmployee(formData) {
  return axios.post(CREATE_EMPLOYEES_URL, formData)
}
export function updateEmployee(formData, userId) {
  return axios.post(CREATE_EMPLOYEES_URL + '/' + userId, formData)
}
export function resetPassword(password, password_confirmation, employee_id) {
  return axios.post(SET_PASSWORD_URL, {
    password: password,
    password_confirmation: password_confirmation,
    employee_id: employee_id,
  })
}
export function deleteEmployee(userId) {
  return axios.delete(DELETE_EMPLOYEES_URL + '/' + userId)
}
// jobs
export function getJobs(props) {
  return axios.get(JOBS_URL, {
    params: props,
  })
}
export function getGeneralJobs(props) {
  return axios.get(GENERAL_JOBS_URL, {
    params: props,
  })
}

export function createjob(name, desc, active) {
  return axios.post(JOBS_URL, {
    name: name,
    description: desc,
    active: active,
  })
}
export function updatejob(name, desc, active, itemId) {
  return axios.put(JOBS_URL + '/' + itemId, {
    name: name,
    description: desc,
    active: active,
  })
}
export function getJob(itemId) {
  return axios.get(JOBS_URL + '/' + itemId, {})
}
export function deleteJob(itemId) {
  return axios.delete(JOBS_URL + '/' + itemId, {})
}
// countries
export function getCountries() {
  return axios.get(COUNTRIES_URL, {})
}
