import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export const BOOKINGS_URL = `${API_URL}/session-booking`
export const ACTIVITY_URL = `${API_URL}/activity-categories`

// bookings
export function getBookings(props) {
  return axios.get(BOOKINGS_URL, {
    params: props,
  })
}

// activity categories
export function getActivityCategories() {
  return axios.get(ACTIVITY_URL)
}
// activities
export function getActivities(catId) {
  return axios.get(ACTIVITY_URL + '/' + catId + '/activities')
}
