import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export const SESSION_BOOKING_URL = `${API_URL}/session-booking`
// Session Bookings
export function getSessionBookings(sessionId) {
  return axios.get(SESSION_BOOKING_URL + '/' + sessionId)
}
