import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export const TRANSLATIONS_URL = `${API_URL}/translations`

// Translation
export function getTranslation(props) {
  return axios.get(TRANSLATIONS_URL + '/' + props.model_name + '/' + props.model_id)
}
export function updateTranslation(formData, modelName, itemId) {
  return axios.post(TRANSLATIONS_URL + '/' + modelName + '/' + itemId, formData)
}
export function deleteTranslation(formData, modelName, itemId) {
  return axios.post(TRANSLATIONS_URL + '/' + modelName + '/' + itemId + '/delete', formData)
}