import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import ToolbarWrapper from './ToolbarWrapper'
import TableWrapper from './TableWrapper'
import PublicEventView from './PublicEventView'

function PublicEvents() {
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
                {intl.formatMessage({id: 'PUBLIC_EVENTS'})}
              </PageTitle>
              <TableWrapper />
            </>
          }
        />
        <Route
          path='view/:sessionId'
          element={
            <>
              <PublicEventView />
            </>
          }
        />

        <Route index element={<Navigate to='/public-events/list' />} />
      </Route>
    </Routes>
  )
}
export default PublicEvents
