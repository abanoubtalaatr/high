import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import ProfilePage from './profile/ProfilePage'
import UnitsTableWrapper from './UnitsTableWrapper'
import UnitsPageToolbarWrapper from './UnitsPageToolbarWrapper'

function UnitsPage() {
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
              <UnitsPageToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'UNITS'})}</PageTitle>
              <UnitsTableWrapper />
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

        <Route index element={<Navigate to='/units/list' />} />
      </Route>
    </Routes>
  )
}
export default UnitsPage
