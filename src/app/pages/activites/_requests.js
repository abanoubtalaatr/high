import axios from 'axios'
import { getAuth } from '../../modules/auth'
const API_URL = process.env.REACT_APP_API_URL

export const ACTIVITIES_CATEGORIES_URL = `${API_URL}/activity-categories`

const user = getAuth()
const userToken = user ? user.data.token : ''
//activity categories
export function getActivitesCategories(props) {
  return axios.get(ACTIVITIES_CATEGORIES_URL, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    params: props,
  })
}
// export function createActivityCategory(name, image, order, active) {
//   return axios.post(
//     ACTIVITIES_CATEGORIES_URL,
//     {
//       name: name,
//       image: image,
//       order: order,
//       active: active,
//     }
//   )
// }
export function createActivityCategory(fromData, cat_id) {
  return axios.post(ACTIVITIES_CATEGORIES_URL, fromData)
}
export function getActivityCategory(id) {
  return axios.get(ACTIVITIES_CATEGORIES_URL + '/' + id, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
}
export function updateActivityCategory(fromData, itemId) {
  return axios.post(ACTIVITIES_CATEGORIES_URL + '/' + itemId, fromData)
}
export function deleteActivityCategory(itemId, activityCategoryId) {
  return axios.delete(ACTIVITIES_CATEGORIES_URL + '/' + activityCategoryId + '/activities/'+itemId , {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
}
//activities
export function getActivities(parms, cat_id) {
  return axios.get(ACTIVITIES_CATEGORIES_URL + '/' + cat_id + '/activities', {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    params: parms,
  })
}
export function getactivity(cat_id, itemId) {
  return axios.get(ACTIVITIES_CATEGORIES_URL + '/' + cat_id + '/activities/' + itemId)
}
export function createactivity(fromData, cat_id) {
  return axios.post(ACTIVITIES_CATEGORIES_URL + '/' + cat_id + '/activities', fromData)
}
export function updateactivity(fromData, cat_id, itemId) {

  return axios.post(ACTIVITIES_CATEGORIES_URL + '/' + cat_id + '/activities/' + itemId, fromData)
}
// export function updateactivity(values, cat_id, itemId) {
//   // values.types
//   let types_selected = Array.isArray(values.types) ? values.types.map((t) => t.value) : []
//   // values.capacities
//   let capacities_selected = Array.isArray(values.capacities)
//     ? values.capacities.map((c) => c.value)
//     : []
//   // values.services
//   let services_selected = Array.isArray(values.services) ? values.services.map((s) => s.value) : []

//   values.types = types_selected
//   values.services = services_selected
//   values.capacities = capacities_selected
//   return axios.put(ACTIVITIES_CATEGORIES_URL + '/' + cat_id + '/activities/' + itemId, {
//     name: values.name,
//     image: values.image,
//     order: values.order,
//     active: values.active,
//     min_users_no: values.min_users_no,
//     max_users_no: values.max_users_no,
//     types: types_selected,
//     services: services_selected,
//     capacities: capacities_selected,
//     activity_category_id: values.activity_category_id,
//   })
// }
export function deleteactivity(cat_id, itemId) {
  return axios.delete(ACTIVITIES_CATEGORIES_URL + '/' + cat_id + '/activities/' + itemId, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
}
export function getLocation(cat_id) {
  return axios.get(ACTIVITIES_CATEGORIES_URL + '/' + cat_id, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
}
