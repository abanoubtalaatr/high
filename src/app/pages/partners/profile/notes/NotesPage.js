import {useParams} from 'react-router-dom'
import {useIntl} from 'react-intl'
import NotesCommentsPage from '../../../../modules/note-comments/NotesCommentsPage'

function NotesPage() {
  const intl = useIntl()
  const {userId} = useParams()

  return (
    <NotesCommentsPage
      headerTitle={intl.formatMessage({id: 'NOTES'})}
      entity_id={userId}
      noteType={'partner'}
    />
  )
}

export default NotesPage
