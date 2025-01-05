import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { useEffect, useState } from 'react'
import { getPage } from '../_requests'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { decode } from 'html-entities'
import Spinner from '../../../components/spinner/Spinner'
import { PageTitle } from '../../../../_metronic/layout/core'
import { useIntl } from 'react-intl'

function ViewHelpCenter() {
  const intl = useIntl()
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state
  const itemDetails = state.itemDetails
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')
  const breadCrumbs = [
    {
      title: intl.formatMessage({ id: 'MENU.DASHBOARD' }),
      path: '/dashboard',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
    {
      title: intl.formatMessage({ id: 'HELP_CENTER' }),
      path: '/pages-content/help-center',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]
  const [initialValues, setInitialValues] = useState({
    title: '',
    image: '',
    slug: '',
    target: '',
    status: '',
    content: '',
  })

  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }
  return (
    <>
      <PageTitle breadcrumbs={breadCrumbs}>{itemDetails.title}</PageTitle>
      <div className='card'>
        <div className='card-body py-5 pt-5'>
          <div className='row justify-content-center text-align-center mb-5'>
            <div className='col-12'>
              <div dangerouslySetInnerHTML={{ __html: decode(itemDetails.content) }} />
            </div>
          </div>

          {/* card-footer */}
          <div className='card-footer ps-0 pe-0'>
            <div className='d-flex justify-content-between'>
              <Link to='/pages-content/help-center' className='btn btn-light'>
                <KTIcon iconName='arrow-left' className='fs-6 text-muted me-1' />
                back
              </Link>
            </div>
          </div>
          {/* end card-footer */}
        </div>
      </div>
    </>
  )
}

export default ViewHelpCenter
