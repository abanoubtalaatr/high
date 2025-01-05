import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import ProfilePage from './profile/ProfilePage'
import UsersPageToolbarWrapper from './UsersPageToolbarWrapper'
import UsersTableWrapper from './UsersTableWrapper'

function UsersPage() {
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
              <UsersPageToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'USERS'})}</PageTitle>
              <UsersTableWrapper />
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

        <Route index element={<Navigate to='/users/list' />} />
      </Route>
    </Routes>
  )
}
export default UsersPage
