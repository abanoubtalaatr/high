import {Link} from 'react-router-dom'
import {KTIcon} from '../../../../_metronic/helpers'

function PartnerProfilePageToolbar() {

  return (
    <>
      <Link to='../../' className='btn btn-light btn-sm btn-flex fw-bold'>
        <KTIcon iconName='arrow-left' className='fs-6 text-muted me-1' />
        back
      </Link>
    </>
  )
}

export default PartnerProfilePageToolbar
