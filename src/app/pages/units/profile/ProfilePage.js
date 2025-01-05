import React from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../../_metronic/layout/core'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import ProfileHeader from './header/ProfileHeader'
import LocationPage from './location/LocationPage'
import PartnerProfilePageToolbarWrapper from './PartnerProfilePageToolbarWrapper'
import PublicEvents from './public-events/PublicEvents'
import PublicEventView from './public-events/PublicEventView'
import BookingView from './bookings/BookingView'
import EmployeesPage from './employees/EmployeesPage'
import BookingsPage from './bookings/BookingsPage'
import ContactsPage from './contacts/ContactsPage'
import EmployeeUnits from './employees/EmployeeUnits'
import ContactUnits from './contacts/ContactUnits'
import DetailsPage from './details/DetailsPage'
import CommentsPage from './comments/CommentsPage'
import GalleryPage from './gallery/GalleryPage'
import PolicyPage from './policy/PolicyPage'
import GeneralSettings from './settings/general/GeneralSettings'
import TaxesSettings from './settings/taxes/TaxesSettings'
import AgeGroupsSettings from './settings/age-groups/AgeGroupsSettings'
import Translation from '../../../modules/translations/Translation'

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
      title: intl.formatMessage({ id: 'UNITS' }),
      path: '/units',
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
            <PageTitle breadcrumbs={breadCrumbs}>units profile</PageTitle>
            <ProfileHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path=':unitId'
          element={
            <>
              <DetailsPage />
            </>
          }
        />
        <Route
          path=':unitId/details'
          element={
            <>
              <DetailsPage />
            </>
          }
        />
        <Route
          path=':unitId/location'
          element={
            <>
              <LocationPage />
            </>
          }
        />
        <Route
          path=':unitId/gallery'
          element={
            <>
              <GalleryPage />
            </>
          }
        />
        <Route
          path=':unitId/comments'
          element={
            <>
              <CommentsPage />
            </>
          }
        />
        <Route
          path=':unitId/public-events'
          element={
            <>
              <PublicEvents />
            </>
          }
        />
        <Route
          path=':unitId/public-events/view/:sessionId'
          element={
            <>
              <PublicEventView />
            </>
          }
        />
        <Route
          path=':unitId/bookings'
          element={
            <>
              <BookingsPage />
            </>
          }
        />
        <Route
          path=':unitId/bookings/view/:sessionId'
          element={
            <>
              <BookingView />
            </>
          }
        />
        <Route
          path=':unitId/policy'
          element={
            <>
              <PolicyPage />
            </>
          }
        />
        <Route
          path=':unitId/assigned-employees'
          element={
            <>
              <EmployeesPage />
            </>
          }
        />
        <Route
          path=':unitId/assigned-employees/:itemId/employee-units'
          element={
            <>
              <EmployeeUnits />
            </>
          }
        />
        <Route
          path=':unitId/contacts'
          element={
            <>
              <ContactsPage />
            </>
          }
        />
        <Route
          path=':unitId/contacts/:itemId/contact-units'
          element={
            <>
              <ContactUnits />
            </>
          }
        />
        <Route
          path=':unitId/settings'
          element={
            <>
              <GeneralSettings />
            </>
          }
        />
        <Route
          path=':unitId/settings/general'
          element={
            <>
              <GeneralSettings />
            </>
          }
        />
        <Route
          path=':unitId/settings/taxes'
          element={
            <>
              <TaxesSettings />
            </>
          }
        />
        <Route
          path=':unitId/settings/age-groups'
          element={
            <>
              <AgeGroupsSettings />
            </>
          }
        />
        <Route index element={<Navigate to='/units/profile/:unitId/details' />} />
      </Route>
      <Route
        path='/:itemId/translation'
        element={
          <>
            <Translation modelName={'unit'} model={'units'} />
          </>
        }
      />
    </Routes>
  )
}

export default ProfilePage
