import { useIntl } from 'react-intl'
import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import Transactions from './transactions/Transactions'
import TransactionsToolbarWrapper from './transactions/TransactionsToolbarWrapper'
import FinancialsToolbarWrapper from './FinancialsToolbarWrapper'
import FinancialsWrapper from './FinancialsWrapper'

function Financials() {
  const intl = useIntl()
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
  ]
  const breadCrumbs2 = [...breadCrumbs, {
    title: intl.formatMessage({ id: 'FINANCIALS' }),
    path: '/financials',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },]
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
              {/* <FinancialsToolbarWrapper /> */}
              <PageTitle breadcrumbs={breadCrumbs}>
                {intl.formatMessage({ id: 'FINANCIALS' })}
              </PageTitle>
              <FinancialsWrapper />
            </>
          }
        />
        <Route
          path='/:iso/transactions'
          element={
            <>
              <TransactionsToolbarWrapper />

              <Transactions refreshTable={refreshTableState}
                startRefreshTable={refreshTableHandler}
                stopRefresh={stopRefreshTableHandler} />
            </>
          }
        />
        <Route index element={<Navigate to='/financials/list' />} />
      </Route>
    </Routes>
  )
}
export default Financials
