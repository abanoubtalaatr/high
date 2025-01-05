import { useIntl } from 'react-intl'
import { PageTitle } from '../../../../_metronic/layout/core'
import TaxsTableWrapper from './TaxsTableWrapper'
import { getLocation } from './_requests'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TaxesPageToolbarWrapper from './TaxesPageToolbarWrapper'

function TaxsPage(props) {
  const { location } = props
  const { codeId } = useParams()
  const intl = useIntl()

  const [pageTitle, setPageTitle] = useState('')

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
        const title = res.data.data.name + ' ' + intl.formatMessage({ id: 'TAXES' })
        setPageTitle(title)
      })
      .catch((err) => {
        setPageTitle(intl.formatMessage({ id: 'TAXES' }))
        // setErrorMessage(err.response.data.message)
      })
  }, [])
  return (
    <>
      <TaxesPageToolbarWrapper refreshTable={refreshTableHandler} location={location} />
      <PageTitle breadcrumbs={breadCrumbs}>{pageTitle}</PageTitle>
      <TaxsTableWrapper refreshTable={refreshTableState}
        startRefreshTable={refreshTableHandler}
        stopRefresh={stopRefreshTableHandler} location={location} />
    </>
  )
}

export default TaxsPage
