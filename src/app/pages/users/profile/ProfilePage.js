import React from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../../_metronic/layout/core'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import ProfileHeader from './header/ProfileHeader'
import PartnerProfilePageToolbarWrapper from './PartnerProfilePageToolbarWrapper'
import PublicEvents from './public-events/PublicEvents'
import BookingsPage from './bookings/BookingsPage'
import DetailsPage from './details/DetailsPage'
import CommentsPage from './comments/CommentsPage'
import WalletPage from './wallet/WalletPage'
import Funds from './wallet/funds/Funds'
import NotesPage from './notes/NotesPage'
import CashOut from './wallet/cashOut/cashOut'
import PublicEventView from '../../public-events/PublicEventView'
import BookingView from '../../bookings/BookingView'

function ProfilePage() {
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
    {
      title: intl.formatMessage({ id: 'USERS' }),
      path: '/users',
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
      <Route
        element={
          <>
            <PartnerProfilePageToolbarWrapper />
            <PageTitle breadcrumbs={breadCrumbs}>user profile</PageTitle>
            <ProfileHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path=':userId'
          element={
            <>
              <DetailsPage />
            </>
          }
        />
        <Route
          path=':userId/details'
          element={
            <>
              <DetailsPage />
            </>
          }
        />
        <Route
          path=':userId/wallet'
          element={
            <>
              <WalletPage />
            </>
          }
        />
        <Route
          path=':userId/wallet/funds'
          element={
            <>
              <Funds />
            </>
          }
        />
        <Route
          path=':userId/wallet/cash-out'
          element={
            <>
              <CashOut />
            </>
          }
        />
        <Route
          path=':userId/comments'
          element={
            <>
              <CommentsPage />
            </>
          }
        />
        <Route
          path=':userId/public-events'
          element={
            <>
              <PublicEvents />
            </>
          }
        />
        <Route
          path=':userId/public-events/view/:sessionId'
          element={
            <>
              <PublicEventView />
            </>
          }
        />
        <Route
          path=':userId/wallet/public-event/:sessionId'
          element={
            <>
              <PublicEventView />
            </>
          }
        />
        <Route
          path=':userId/bookings'
          element={
            <>
              <BookingsPage />
            </>
          }
        />
        <Route
          path=':userId/bookings/view/:sessionId'
          element={
            <>
              <BookingView />
            </>
          }
        />
        <Route
          path=':userId/wallet/booking/:sessionId'
          element={
            <>
              <BookingView />
            </>
          }
        />
        <Route
          path=':userId/notes'
          element={
            <>
              <NotesPage />
            </>
          }
        />

        <Route index element={<Navigate to='/units/profile/:userId/details' />} />
      </Route>
    </Routes>
  )
}

export default ProfilePage
