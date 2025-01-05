import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import { Route, Routes, Outlet, Navigate } from 'react-router-dom'

import CategoriesPageToolbarWrapper from './categories/CategoriesPageToolbarWrapper'
import CatItemsTableWrapper from './categories/CatItemsTableWrapper'
import ActivitesPageToolbarWrapper from './activites/ActivitesPageToolbarWrapper'
import ItemsTableWrapper from './activites/ItemsTableWrapper'
import { useState } from 'react'
import Translation from '../../modules/translations/Translation'

function Activites() {
  const intl = useIntl()
  const [refreshTableState, setRefreshTableState] = useState(false)
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
          path='categories'
          element={
            <>
              <CategoriesPageToolbarWrapper refreshTable={refreshTableHandler} />
              <PageTitle breadcrumbs={breadCrumbs}>
                {intl.formatMessage({ id: 'ACTIVITIES_CATEGORIES' })}
              </PageTitle>
              <CatItemsTableWrapper
                refreshTable={refreshTableState}
                startRefreshTable={refreshTableHandler}
                stopRefresh={stopRefreshTableHandler} />
            </>
          }
        />
        <Route
          path='categories/:catId/activities'
          element={
            <>
              <ActivitesPageToolbarWrapper refreshTable={refreshTableHandler} />
              <ItemsTableWrapper
                refreshTable={refreshTableState}
                startRefreshTable={refreshTableHandler}
                stopRefresh={stopRefreshTableHandler}
              />
            </>
          }
        />
        <Route
          path='categories/:itemId/translation'
          element={
            <>
              <Translation modelName={'activity-category'} model={'categories'} />
            </>
          }
        />
        <Route
          path='categories/:catId/activities/:itemId/translation'
          element={
            <>
              <Translation modelName={'activity'} model={'categories'} />
            </>
          }
        />
        <Route index element={<Navigate to='/activites/categories' />} />
      </Route>
    </Routes>
  )
}

export default Activites
