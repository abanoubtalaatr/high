import {KTIcon} from '../../../../../_metronic/helpers'
import {Link, useParams} from 'react-router-dom'
import SessionPublicEventView from '../../../../modules/public-events/SessionPublicEventView'

function PublicEventView() {
  const {unitId, sessionId} = useParams()
  const profilePath = '/units/profile/' + unitId + '/public-events'
  return (
    <div className='card mb-10'>
      {/* begin::Header */}
      <div className='card-header pt-5 pb-5'>
        <h5 className='card-title align-items-start flex-column'>
          <span className='mb-3 fw-bolder'>public event id: {sessionId} </span>
        </h5>
        <div className='card-toolbar gap-3'>
          <Link to={profilePath} className='btn btn-light btn-sm btn-flex fw-bold'>
            <KTIcon iconName='arrow-left' className='fs-3' />
            <span>back</span>
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body'>{<SessionPublicEventView sessionId={sessionId} />}</div>
      {/* begin::Body */}
    </div>
  )
}

export default PublicEventView
