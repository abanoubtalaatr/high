import React from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../../_metronic/layout/core'
import { Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom'
import ProfileHeader from './header/ProfileHeader'
import OwnerPage from './owner/OwnerPage'
import LocationPage from './location/LocationPage'
import PartnerProfilePageToolbarWrapper from './PartnerProfilePageToolbarWrapper'
import SettingsPage from './settings/SettingsPage'
import BranchsPage from './branches/BranchsPage'

import BranchsDetailsPage from './branches/branch-details/BranchsDetailsPage'
import UnitsPage from './units/UnitsPage'
import PublicEvents from './public-events/PublicEvents'
import EmployeesPage from './employees/EmployeesPage'
import BookingsPage from './bookings/BookingsPage'
import PoliciesPage from './policies/PoliciesPage'
import PolicyView from './policies/PolicyView'
import DocumentsPage from './documents/DocumentsPage'
import ContactsPage from './contacts/ContactsPage'
import HighFiveCustomersPage from './customers/HighFiveCustomersPage'
import ManualCustomersPage from './customers/ManualCustomersPage'
import MembersPage from './memberships/MembersPage'
import CategoriesPage from './memberships/CategoriesPage'
import PolicyUnits from './policies/PolicyUnits'
import EmployeeUnits from './employees/EmployeeUnits'
import ContactUnits from './contacts/ContactUnits'
import MembershipCategoryUnits from './memberships/MembershipCategoryUnits'
import NotesPage from './notes/NotesPage'
import Translation from '../../../modules/translations/Translation'
import BookingView from '../../bookings/BookingView'
import PublicEventView from '../../public-events/PublicEventView'
import Financials from './financials/Financials'


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
      title: intl.formatMessage({ id: 'PARTNERS' }),
      path: '/partners',
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
            <PageTitle breadcrumbs={breadCrumbs}>partner profile</PageTitle>
            <ProfileHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path=':userId/owner'
          element={
            <>
              <OwnerPage />
            </>
          }
        />
        <Route
          path=':userId/location'
          element={
            <>
              <LocationPage />
            </>
          }
        />
        <Route
          path=':userId/documents'
          element={
            <>
              <DocumentsPage />
            </>
          }
        />
        <Route
          path=':userId/settings'
          element={
            <>
              <SettingsPage />
            </>
          }
        />
             <Route
          path=':userId/branches'
          element={
            <>
              <BranchsPage />
            </>
          }
        />
            <Route
          path=':userId/branches/branch-details'
          element={
            <>
              <BranchsDetailsPage />
            </>
          }
        />

        <Route
          path=':userId/units'
          element={
            <>
              <UnitsPage />
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
          path=':userId/policies'
          element={
            <>
              <PoliciesPage />
            </>
          }
        />
        <Route
          path=':userId/policies/:itemId/policy-units'
          element={
            <>
              <PolicyUnits />
            </>
          }
        />
        <Route
          path=':userId/policies/view/:itemId'
          element={
            <>
              <PolicyView />
            </>
          }
        />
        <Route
          path=':userId/employees'
          element={
            <>
              <EmployeesPage />
            </>
          }
        />
        <Route
          path=':userId/employees/:itemId/employee-units'
          element={
            <>
              <EmployeeUnits />
            </>
          }
        />
        <Route
          path=':userId/contacts'
          element={
            <>
              <ContactsPage />
            </>
          }
        />
        <Route
          path=':userId/contacts/:itemId/contact-units'
          element={
            <>
              <ContactUnits />
            </>
          }
        />
        <Route
          path=':userId/customers'
          element={
            <>
              <HighFiveCustomersPage />
            </>
          }
        />
        <Route
          path=':userId/customers/high-five'
          element={
            <>
              <HighFiveCustomersPage />
            </>
          }
        />
        <Route
          path=':userId/customers/manual'
          element={
            <>
              <ManualCustomersPage />
            </>
          }
        />
        <Route
          path=':userId/memberships'
          element={
            <>
              <MembersPage />
            </>
          }
        />
        <Route
          path=':userId/memberships/members'
          element={
            <>
              <MembersPage />
            </>
          }
        />
        <Route
          path=':userId/memberships/categories'
          element={
            <>
              <CategoriesPage />
            </>
          }
        />
        <Route
          path=':userId/financials'
          element={
            <>
              <Financials />
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
        <Route
          path=':userId/memberships/categories/:itemId/membership-category-units'
          element={
            <>
              <MembershipCategoryUnits />
            </>
          }
        />
        <Route index element={<Navigate to='/partners/profile/:userId/owner' />} />
      </Route>
      <Route
        path='/:itemId/translation'
        element={
          <>
            <Translation modelName={'partner'} model={'partners'} />
          </>
        }
      />
    </Routes>
  )
}

export default ProfilePage
