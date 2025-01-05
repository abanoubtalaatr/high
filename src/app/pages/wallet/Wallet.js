import { useIntl } from 'react-intl'
import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { useState } from 'react'
import CurrenciesPageToolbarWrapper from './currencies/CurrenciesPageToolbarWrapper'
import { PageTitle } from '../../../_metronic/layout/core'
import CurrenciesItemsTableWrapper from './currencies/CurrenciesItemsTableWrapper'
import WalletsWrapper from './wallet/WalletsWrapper'
import WalletToolbarWrapper from './wallet/WalletToolbarWrapper'
import Funds from './funds/Funds'
import FundsToolbarWrapper from './funds/FundsToolbarWrapper'
import CashOutToolbarWrapper from './cashout/CashOutToolbarWrapper'
import CashOut from './cashout/CashOut'
import Transactions from './transactions/Transactions'
import TransactionsToolbarWrapper from './transactions/TransactionsToolbarWrapper'
import Exchanges from './exchanges/Exchanges'
import ExchangesToolbarWrapper from './exchanges/ExchangesToolbarWrapper'
import PublicEventView from '../public-events/PublicEventView'
import TransactionViewToolbarWrapper from './transactions/TransactionViewToolbarWrapper'
import BookingView from '../bookings/BookingView'

function Wallet() {
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
    title: intl.formatMessage({ id: 'WALLET' }),
    path: '/wallet',
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
              <WalletToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs}>
                {intl.formatMessage({ id: 'WALLET' })}
              </PageTitle>
              <WalletsWrapper />
            </>
          }
        />
        <Route
          path='/:iso/funds'
          element={
            <>
              <FundsToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs2}>
                {intl.formatMessage({ id: 'FUNDS' })}
              </PageTitle>
              <Funds refreshTable={refreshTableState}
                startRefreshTable={refreshTableHandler}
                stopRefresh={stopRefreshTableHandler} />
            </>
          }
        />
        <Route
          path='/:iso/exchanges'
          element={
            <>
              <ExchangesToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs2}>
                {intl.formatMessage({ id: 'EXCHANGES' })}
              </PageTitle>
              <Exchanges refreshTable={refreshTableState}
                startRefreshTable={refreshTableHandler}
                stopRefresh={stopRefreshTableHandler} />
            </>
          }
        />
        <Route
          path='/:iso/cashout'
          element={
            <>
              <CashOutToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs2}>
                {intl.formatMessage({ id: 'CASH_OUT' })}
              </PageTitle>
              <CashOut refreshTable={refreshTableState}
                startRefreshTable={refreshTableHandler}
                stopRefresh={stopRefreshTableHandler} />
            </>
          }
        />
        <Route
          path='/:iso/transactions'
          element={
            <>
              <TransactionsToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs2}>
                {intl.formatMessage({ id: 'TRANSACTIONS' })}
              </PageTitle>
              <Transactions refreshTable={refreshTableState}
                startRefreshTable={refreshTableHandler}
                stopRefresh={stopRefreshTableHandler} />
            </>
          }
        />
        <Route
          path='/:iso/transactions/public-event/:sessionId'
          element={
            <>
              <TransactionViewToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs2}>
                {intl.formatMessage({ id: 'PUBLIC_EVENT' })}
              </PageTitle>
              <PublicEventView />
            </>
          }
        />
        <Route
          path='/:iso/transactions/booking/:sessionId'
          element={
            <>
              <TransactionViewToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs2}>
                {intl.formatMessage({ id: 'BOOKING' })}
              </PageTitle>
              <BookingView />
            </>
          }
        />
        <Route
          path='currencies'
          element={
            <>
              <CurrenciesPageToolbarWrapper refreshTable={refreshTableHandler} />
              <PageTitle breadcrumbs={breadCrumbs2}>
                {intl.formatMessage({ id: 'CURRENCIES' })}
              </PageTitle>
              <CurrenciesItemsTableWrapper
                refreshTable={refreshTableState}
                startRefreshTable={refreshTableHandler}
                stopRefresh={stopRefreshTableHandler}
              />
            </>
          }
        />
        <Route index element={<Navigate to='/wallet/list' />} />
      </Route>
    </Routes>
  )
}
export default Wallet
