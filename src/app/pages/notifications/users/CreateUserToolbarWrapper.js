import {PageTitleWrapper} from '../../../../_metronic/layout/components/toolbar/page-title'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../../_metronic/layout/core'

function CreateUserToolbarWrapper() {
  const intl = useIntl()
  const breadCrumbs = [
    {
      title: intl.formatMessage({id: 'MENU.DASHBOARD'}),
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
  ]
  return (
    <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'>
      <div id='kt_app_toolbar_container' className='p-0 d-flex flex-stack container-fluid'>
        <PageTitleWrapper />
        <PageTitle breadcrumbs={breadCrumbs}>
          {intl.formatMessage({id: 'CREATE_USERS_NOTIFICATIONS'})}
        </PageTitle>
      </div>
    </div>
  )
}

export default CreateUserToolbarWrapper
