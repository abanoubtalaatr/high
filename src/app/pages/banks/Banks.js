import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import BanksPageToolbarWrapper from './BanksPageToolbarWrapper'
import BanksItemsTableWrapper from './BanksItemsTableWrapper'

function Banks() {
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
              <BanksItemsTableWrapper />
              <PageTitle breadcrumbs={breadCrumbs}>
                {intl.formatMessage({id: 'BOOKINGS'})}
              </PageTitle>
              <BanksItemsTableWrapper />
            </>
          }
        />
        <Route
          path='Banks/list'
          element={
            <>
              <BanksItemsTableWrapper />
            </>
          }
        />

        <Route index element={<Navigate to='/Banks/list' />} />
      </Route>
    </Routes>
  )
}
export default Banks
