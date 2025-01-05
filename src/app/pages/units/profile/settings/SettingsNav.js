import {Link, useLocation, useParams} from 'react-router-dom'
import {useIntl} from 'react-intl'

function SettingsNav() {
  const intl = useIntl()
  const location = useLocation()
  const {unitId} = useParams()
  const profilePath = '/units/profile/' + unitId + '/settings'
  return (
    <div className='d-flex overflow-auto'>
      <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-row flex-md-column w-100'>
        <li className='nav-item mb-5'>
          <Link
            className={
              `btn w-100 justify-content-center ` +
              (location.pathname.includes(unitId + '/settings/general')
                ? ' btn-text-white btn-bg-dark btn-active-dark '
                : ' btn-light ')
            }
            to={profilePath + '/general'}
          >
            {intl.formatMessage({id: 'GENERAL'})}
          </Link>
        </li>
        <li className='nav-item mb-5'>
          <Link
            className={
              `btn w-100 justify-content-center ` +
              (location.pathname.includes(unitId + '/settings/age-groups')
                ? ' btn-text-white btn-bg-dark btn-active-dark '
                : ' btn-light ')
            }
            to={profilePath + '/age-groups'}
          >
            {intl.formatMessage({id: 'AGE_GROUPS'})}
          </Link>
        </li>
        <li className='nav-item mb-5'>
          <Link
            className={
              `btn w-100 justify-content-center ` +
              (location.pathname.includes(unitId + '/settings/taxes')
                ? ' btn-text-white btn-bg-dark btn-active-dark '
                : ' btn-light ')
            }
            to={profilePath + '/taxes'}
          >
            {intl.formatMessage({id: 'TAXEX'})}
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SettingsNav
