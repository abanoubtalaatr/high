import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import TypesPageToolbarWrapper from './types/TypesPageToolbarWrapper'
import TypesPage from './types/TypesPage'
import CapacitiesPageToolbarWrapper from './capacities/CapacitiesPageToolbarWrapper'
import CapacitiesPage from './capacities/CapacitiesPage'
import ServicesPageToolbarWrapper from './services/ServicesPageToolbarWrapper'
import ServicesPage from './services/ServicesPage'
import AgeGroupsPageToolbarWrapper from './age-groups/AgeGroupsPageToolbarWrapper'
import AgeGroupsPage from './age-groups/AgeGroupsPage'
import Languages from './languages/Languages'
import Translation from '../../modules/translations/Translation'


function SetupFiles() {
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

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='types'
          element={
            <>
              <TypesPage />
            </>
          }
        />
        <Route
          path='types/:itemId/translation'
          element={
            <>
              <Translation modelName={'type'} model={'types'} />
            </>
          }
        />
        <Route
          path='capacities'
          element={
            <>
              <CapacitiesPage />
            </>
          }
        />
        <Route
          path='capacities/:itemId/translation'
          element={
            <>
              <Translation modelName={'capacity'} model={'capacities'} />
            </>
          }
        />
        <Route
          path='services'
          element={
            <>
              <ServicesPage />
            </>
          }
        />
        <Route
          path='services/:itemId/translation'
          element={
            <>
              <Translation modelName={'service'} model={'services'} />
            </>
          }
        />
        <Route
          path='age-groups'
          element={
            <>
              <AgeGroupsPage />
            </>
          }
        />
        <Route
          path='age-groups/:itemId/translation'
          element={
            <>
              <Translation modelName={'age-group'} model={'age-groups'} />
            </>
          }
        />
        <Route
          path='languages'
          element={
            <>
              <Languages />
            </>
          }
        />
         <Route
          path='languages/:itemId/translation'
          element={
            <>
              <Translation modelName={'language'} model={'languages'} />
            </>
          }
        />
        <Route index element={<Navigate to='/setup-files/types' />} />
      </Route>
    </Routes>
  )
}
export default SetupFiles
