import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export const SESSION_PUBLIC_EVENTS_URL = `${API_URL}/public-events`
// Public Events
export function getSessionPublicEvents(sessionId) {
  return axios.get(SESSION_PUBLIC_EVENTS_URL + '/' + sessionId)
}
