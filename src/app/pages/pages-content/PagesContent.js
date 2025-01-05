import { useIntl } from "react-intl"
import { Navigate, Route, Routes } from "react-router-dom"
import PagesToolbarWrapper from "./pages/PagesToolbarWrapper"
import { PageTitle } from "../../../_metronic/layout/core"
import PagesTableWrapper from "./pages/PagesTableWrapper"
import CreatePage from "./pages/CreatePage"
import EditPage from "./pages/EditPage"
import ViewPage from "./pages/ViewPage"
import GalleryPage from "./pages/gallery/GalleryPage"
import GalleryToolbarWrapper from "./pages/gallery/GalleryToolbarWrapper"
import Translation from "../../modules/translations/Translation"
import EditTranslationPage from "../../modules/translations/pages/EditTranslationPage"
import { useState } from "react"
import HelpCenterTableWrapper from "./help-center/HelpCenterTableWrapper"
import HelpCenterToolbarWrapper from "./help-center/HelpCenterToolbarWrapper"
import CreateHelpCenterToolbarWrapper from "./help-center/CreateHelpCenterToolbarWrapper"
import CreateHelpCenter from "./help-center/CreateHelpCenter"
import EditHelpCenter from "./help-center/EditHelpCenter"
import ViewHelpCenter from "./help-center/ViewHelpCenter"
import CreatePageToolbarWrapper from "./pages/CreatePageToolbarWrapper"
import ChildrenTableWrapper from "./help-center/ChildrenTableWrapper"
import ChildrenToolbarWrapper from "./help-center/ChildrenToolbarWrapper"
import EditTranslationHelpCenter from "../../modules/translations/help-center/EditTranslationHelpCenter"
import HelpCenterGalleryPage from "./help-center/gallery/HelpCenterGalleryPage"


function PagesContent() {
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
  const breadCrumbs2 = [
    ...breadCrumbs,
    {
      title: intl.formatMessage({ id: 'PAGES' }),
      path: '/pages-content/pages',
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
  const breadCrumbs3 = [
    ...breadCrumbs,
    {
      title: intl.formatMessage({ id: 'HELP_CENTER' }),
      path: '/pages-content/help-center',
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
      <Route>
        <Route
          path='pages'
          element={
            <>
              <PagesToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({ id: 'PAGES' })}</PageTitle>
              <PagesTableWrapper
                refreshTable={refreshTableState}
                startRefreshTable={refreshTableHandler}
                stopRefresh={stopRefreshTableHandler}
              />
            </>
          }
        />
        <Route
          path='pages/new'
          element={
            <>
              <CreatePageToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs2}>
                {intl.formatMessage({ id: 'CREATE_PAGE' })}
              </PageTitle>
              <CreatePage />
            </>
          }
        />
        <Route
          path='pages/edit/:itemId'
          element={
            <>
              <CreatePageToolbarWrapper />
              <EditPage />
            </>
          }
        />
        <Route
          path='pages/view/:itemId'
          element={
            <>
              <CreatePageToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({ id: 'PAGES' })}</PageTitle>
              <ViewPage />
            </>
          }
        />
        <Route
          path='pages/gallery'
          element={
            <>
              <GalleryToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs2}>
                {intl.formatMessage({ id: 'GALLERY' })}
              </PageTitle>
              <GalleryPage />
            </>
          }
        />
        <Route
          path='pages/translations/:itemId'
          element={
            <>
              <Translation modelName={'page'} model={'pages'} translatePageUrl={'update'} />
            </>
          }
        />
        <Route
          path='pages/translations/:itemId/update'
          element={
            <>
              <EditTranslationPage />
            </>
          }
        />
        {/* help center */}
        <Route
          path='help-center'
          element={
            <>
              <HelpCenterToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({ id: 'HELP_CENTER' })}</PageTitle>
              <HelpCenterTableWrapper
                refreshTable={refreshTableState}
                startRefreshTable={refreshTableHandler}
                stopRefresh={stopRefreshTableHandler}
              />
            </>
          }
        />
        <Route
          path='help-center/:itemId/children'
          element={
            <>
              <ChildrenToolbarWrapper />
              <ChildrenTableWrapper
                refreshTable={refreshTableState}
                startRefreshTable={refreshTableHandler}
                stopRefresh={stopRefreshTableHandler}
              />
            </>
          }
        />
        <Route
          path='help-center/new'
          element={
            <>
              <CreateHelpCenterToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs3}>
                {intl.formatMessage({ id: 'CREATE_HELP_CENTER' })}
              </PageTitle>
              <CreateHelpCenter />
            </>
          }
        />
        <Route
          path='help-center/edit/:itemId'
          element={
            <>
              <CreateHelpCenterToolbarWrapper />
              <EditHelpCenter />
            </>
          }
        />
        <Route
          path='help-center/view/:itemId'
          element={
            <>
              <CreateHelpCenterToolbarWrapper />
              <ViewHelpCenter />
            </>
          }
        />
        <Route
          path='help-center/gallery'
          element={
            <>
              <GalleryToolbarWrapper />
              <PageTitle breadcrumbs={breadCrumbs3}>
                {intl.formatMessage({ id: 'GALLERY' })}
              </PageTitle>
              <HelpCenterGalleryPage />
            </>
          }
        />
        <Route
          path='help-center/translations/:itemId'
          element={
            <>
              <Translation modelName={'help-center'} model={'help-center'} translatePageUrl={'update'} />
            </>
          }
        />
        <Route
          path='help-center/translations/:itemId/update'
          element={
            <>
              <EditTranslationHelpCenter />
            </>
          }
        />
        <Route index element={<Navigate to='/pages-content/pages' />} />
      </Route>
    </Routes>
  )
}
export default PagesContent

