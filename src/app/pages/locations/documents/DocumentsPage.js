import { useEffect, useState } from 'react'
import { getLocation } from '../taxes/_requests'
import DocumentsTableWrapper from './DocumentsTableWrapper'
import { useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../../_metronic/layout/core'
import DocumentsPageToolbarWrapper from './DocumentsPageToolbarWrapper'

function DocumentsPage(props) {
  const { location } = props
  const { codeId } = useParams()
  const intl = useIntl()
  const [countries, setCountries] = useState([])
  const [pageTitle, setPageTitle] = useState([])
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
  useEffect(() => {
    getLocation(codeId, location)
      .then((res) => {
        const title = res.data.data.name + ' ' + intl.formatMessage({ id: 'DOCUMENTS' })
        // setCountries(res.data.data)
        setPageTitle(title)
      })
      .catch((err) => {
        setPageTitle(intl.formatMessage({ id: 'DOCUMENTS' }))
        // setErrorMessage(err.response.data.message)
      })
  }, [])
  return (
    <>
      <DocumentsPageToolbarWrapper refreshTable={refreshTableHandler} location={location} />
      <PageTitle breadcrumbs={breadCrumbs}>{pageTitle}</PageTitle>
      <DocumentsTableWrapper refreshTable={refreshTableState}
        startRefreshTable={refreshTableHandler}
        stopRefresh={stopRefreshTableHandler} location={location} />
    </>
  )
}

export default DocumentsPage
