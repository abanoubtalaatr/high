import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import EmployeesPageToolbarWrapper from './EmployeesPageToolbarWrapper'
import JobsPage from './jobs/JobsPage'
import EmployeessTableWrapper from './EmployeessTableWrapper'
import { useState } from 'react'

function Employees() {
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
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <EmployeesPageToolbarWrapper refreshTable={refreshTableHandler} />
              <PageTitle breadcrumbs={breadCrumbs}>
                {intl.formatMessage({id: 'EMPLOYEES'})}
              </PageTitle>
              <EmployeessTableWrapper
                refreshTable={refreshTableState}
                startRefreshTable={refreshTableHandler}
                stopRefresh={stopRefreshTableHandler}
              />
            </>
          }
        />
        <Route
          path='jobs'
          element={
            <>
              <JobsPage />
            </>
          }
        />
        <Route index element={<Navigate to='/Employeess/list' />} />
      </Route>
    </Routes>
  )
}
export default Employees
