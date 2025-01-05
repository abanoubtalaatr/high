import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import ProfilePage from './profile/ProfilePage'
import PartnersTableWrapper from './PartnersTableWrapper'
import PartnersPageToolbarWrapper from './PartnersPageToolbarWrapper'

function Partners() {
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
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PartnersPageToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs}>
                {intl.formatMessage({id: 'PARTNERS'})}
              </PageTitle>
              <PartnersTableWrapper />
            </>
          }
        />
        <Route
          path='profile/*'
          element={
            <>
              <ProfilePage />
            </>
          }
        />
        
        <Route index element={<Navigate to='/partners/list' />} />
      </Route>
    </Routes>
  )
}
export default Partners
