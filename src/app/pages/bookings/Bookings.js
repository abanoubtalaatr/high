import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import ToolbarWrapper from './ToolbarWrapper'
import TableWrapper from './TableWrapper'
import BookingView from './BookingView'

function Bookings() {
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
              <ToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs}>
                {intl.formatMessage({id: 'BOOKINGS'})}
              </PageTitle>
              <TableWrapper />
            </>
          }
        />
        <Route
          path='view/:sessionId'
          element={
            <>
              <BookingView />
            </>
          }
        />

        <Route index element={<Navigate to='/bookings/list' />} />
      </Route>
    </Routes>
  )
}
export default Bookings
