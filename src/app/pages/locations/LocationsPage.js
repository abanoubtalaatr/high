import { useIntl } from 'react-intl'

import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import CountriesPage from './countries/CountriesPage'
import StatesPage from './states/StatesPage'
import CitiesPage from './cities/CitiesPage'
import TaxsPage from './taxes/TaxsPage'
import TaxesPageToolbarWrapper from './taxes/TaxesPageToolbarWrapper'
import DocumentsPage from './documents/DocumentsPage'
import DocumentsPageToolbarWrapper from './documents/DocumentsPageToolbarWrapper'
import Translation from '../../modules/translations/Translation'
import { useState } from 'react'

function Locations() {
  const intl = useIntl()

  const taxesBreadCrumbs = [
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
      title: intl.formatMessage({ id: 'COUNTRIES' }),
      path: '/locations/countries',
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
          path='countries'
          element={
            <>
              <CountriesPage />
            </>
          }
        />
        <Route
          path='countries/:codeId/taxes'
          element={
            <>
              <TaxsPage location='countries' />
            </>
          }
        />
        <Route
          path='countries/:codeId/documents'
          element={
            <>
              <DocumentsPage location='countries' />
            </>
          }
        />
        <Route
          path='countries/:itemId/translation'
          element={
            <>
              <Translation modelName={'country'} model={'countries'} />
            </>
          }
        />
        <Route
          path='countries/:codeId/documents/:itemId/translation'
          element={
            <>
              <Translation modelName={'country-document'} model={'countries'} />
            </>
          }
        />
        <Route
          path='countries/:codeId/taxes/:itemId/translation'
          element={
            <>
              <Translation modelName={'country-tax'} model={'countries'} />
            </>
          }
        />
        <Route
          path='states'
          element={
            <>
              <StatesPage />
            </>
          }
        />
           <Route
          path='states/:itemId/translation'
          element={
            <>
              <Translation modelName={'state'} model={'states'} />
            </>
          }
        />
        <Route
          path='states/:codeId/taxes'
          element={
            <>
              <TaxsPage location='states' />
            </>
          }
        />
        <Route
          path='states/:codeId/documents'
          element={
            <>
              <DocumentsPage location='states' />
            </>
          }
        />
        <Route
          path='states/:codeId/documents/:itemId/translation'
          element={
            <>
              <Translation modelName={'state-document'} model={'states'} />
            </>
          }
        />
        <Route
          path='states/:codeId/taxes/:itemId/translation'
          element={
            <>
              <Translation modelName={'state-tax'} model={'states'} />
            </>
          }
        />
        <Route
          path='cities/:itemId/translation'
          element={
            <>
              <Translation modelName={'city'} model={'cities'} />
            </>
          }
        />
        <Route
          path='cities'
          element={
            <>
              <CitiesPage />
            </>
          }
        />
        <Route
          path='cities/:codeId/taxes'
          element={
            <>
              <TaxsPage location='cities' />
            </>
          }
        />
        <Route
          path='cities/:codeId/documents'
          element={
            <>
              <DocumentsPage location='cities' />
            </>
          }
        />
        <Route
          path='cities/:itemId/translation'
          element={
            <>
              <Translation modelName={'city'} model={'cities'} />
            </>
          }
        />
        <Route
          path='cities/:codeId/documents/:itemId/translation'
          element={
            <>
              <Translation modelName={'city-document'} model={'cities'} />
            </>
          }
        />
        <Route
          path='cities/:codeId/taxes/:itemId/translation'
          element={
            <>
              <Translation modelName={'city-tax'} model={'cities'} />
            </>
          }
        />
        <Route index element={<Navigate to='/locations/countries' />} />
      </Route>
    </Routes>
  )
}
export default Locations
