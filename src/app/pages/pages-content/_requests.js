import axios from 'axios'
import { getAuth } from '../../modules/auth'
const API_URL = process.env.REACT_APP_API_URL

export const PAGES_URL = `${API_URL}/pages`
export const PAGES_GALLERY_URL = `${API_URL}/pages/image/gallery`
export const HELP_CENTER_GALLERY_URL = `${API_URL}/help-centers/image/gallery`
export const HELP_CENTER_URL = `${API_URL}/help-centers`

const user = getAuth()
const userToken = user ? user.data.token : ''

export function getPages(props) {
  return axios.get(PAGES_URL, {
    params: props,
  })
}
export function getPage(itemId) {
  return axios.get(PAGES_URL + '/' + itemId)
}
export function createPage(formData) {
  return axios.post(PAGES_URL, formData)
}
export function updatePage(formData, itemId) {
  return axios.post(PAGES_URL + '/' + itemId, formData)
}
export function deletePage(itemId) {
  return axios.delete(PAGES_URL + '/' + itemId)
}
//help center
export function getHelpCenter(props) {
  return axios.get(HELP_CENTER_URL, {
    params: props,
  })
}
export function getHelpCenterChildren(props, parentId) {
  return axios.get(`${HELP_CENTER_URL}/${parentId}`, {
    params: props,
  })
}
// create new help center
export function createHelpCenter(formData) {
  return axios.post(HELP_CENTER_URL, formData)
}
export function updateHelpCenter(formData, itemId) {
  return axios.put(HELP_CENTER_URL + '/' + itemId, formData)
}
export function deleteHelpCenter(itemId) {
  return axios.delete(HELP_CENTER_URL + '/' + itemId)
}
// pages gallery
export function getPagesGallery(props) {
  return axios.get(PAGES_GALLERY_URL, {
    params: props,
  })
}
// help center gallery
export function getHelpCenterGallery(props) {
  return axios.get(HELP_CENTER_GALLERY_URL, {
    params: props,
  })
}
// delete pages Photo
export function deletePhoto(photoId) {
  return axios.delete(PAGES_URL + '/image/' + photoId)
}
// delete help center Photo
export function deleteHelpCenterPhoto(photoId) {
  return axios.delete(HELP_CENTER_URL + '/image/' + photoId)
}
