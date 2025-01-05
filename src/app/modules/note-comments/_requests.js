import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export const NOTE_COMMENTS_URL = `${API_URL}/note-comments`

// note comments
export function getNoteComments(props) {
  return axios.get(NOTE_COMMENTS_URL, {
    params: props,
  })
}
// create note comments
export function createNoteComment(values) {
  return axios.post(NOTE_COMMENTS_URL, values)
}
// delete note comment
export function deleteNoteComment(noteId) {
  return axios.delete(NOTE_COMMENTS_URL + '/' + noteId)
}
