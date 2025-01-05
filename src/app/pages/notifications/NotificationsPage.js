import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {Route, Routes, Navigate} from 'react-router-dom'
import {useState} from 'react'
import PartnersToolbarWrapper from './partners/PartnersToolbarWrapper'
import PartnersTableWrapper from './partners/PartnersTableWrapper'
import UsersToolbarWrapper from './users/UsersToolbarWrapper'
import UsersTableWrapper from './users/UsersTableWrapper'
import CreateToolbarWrapper from './partners/CreateToolbarWrapper'
import CreateUserNotification from './users/CreateUserNotification'
import CreateUserToolbarWrapper from './users/CreateUserToolbarWrapper'
import CreatePartnerNotification from './partners/CreatePartnerNotification'
import EditPartnerNotification from './partners/EditPartnerNotification'
import EditToolbarWrapper from './partners/EditToolbarWrapper'

function NotificationsPage() {
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
  const [refreshTableState, setRefreshTableState] = useState(false)
  const refreshTableHandler = () => {
    setRefreshTableState(true)
  }
  const stopRefreshTableHandler = () => {
    setRefreshTableState(false)
  }
  return (
    <Routes>
      <Route>
        <Route
          path='partners'
          element={
            <>
              <PartnersToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs}>
                {intl.formatMessage({id: 'PARTNER_NOTIFICATIONS'})}
              </PageTitle>
              <PartnersTableWrapper
                refreshTable={refreshTableState}
                startRefreshTable={refreshTableHandler}
                stopRefresh={stopRefreshTableHandler}
              />
            </>
          }
        />
        <Route
          path='partners/new'
          element={
            <>
              <CreateToolbarWrapper />
              <CreatePartnerNotification />
            </>
          }
        />
        <Route
          path='partners/edit/:itemId'
          element={
            <>
              <EditToolbarWrapper />
              <EditPartnerNotification />
            </>
          }
        />
        <Route
          path='users'
          element={
            <>
              <UsersToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs}>
                {intl.formatMessage({id: 'USER_NOTIFICATIONS'})}
              </PageTitle>
              <UsersTableWrapper
                refreshTable={refreshTableState}
                startRefreshTable={refreshTableHandler}
                stopRefresh={stopRefreshTableHandler}
              />
            </>
          }
        />
        <Route
          path='users/new'
          element={
            <>
              <CreateUserToolbarWrapper />
              <CreateUserNotification />
            </>
          }
        />
         <Route
          path='notifications/edit:itemId'
          element={
            <>
              <CreateUserToolbarWrapper />
              <CreateUserNotification />
            </>
          }
        />
        <Route index element={<Navigate to='/notifications/partners' />} />
      </Route>
    </Routes>
  )
}
export default NotificationsPage
