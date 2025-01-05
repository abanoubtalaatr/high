import {useState} from 'react'
import CountriesTableWrapper from './CountriesTableWrapper'
import CountriesPageToolbarWrapper from './CountriesPageToolbarWrapper'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../../_metronic/layout/core'

function CountriesPage() {
  const intl = useIntl()
  const [refreshTableState, setRefreshTableState] = useState(false)
  const refreshTableHandler = () => {
    setRefreshTableState(true)
  }
  const stopRefreshTableHandler = () => {
    setRefreshTableState(false)
  }
  const breadCrumbs = [
    {
      title: intl.formatMessage({id: 'MENU.DASHBOARD'}),
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
    <>
      <CountriesPageToolbarWrapper refreshTable={refreshTableHandler} />
      <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'COUNTRIES'})}</PageTitle>
      <CountriesTableWrapper
        refreshTable={refreshTableState}
        startRefreshTable={refreshTableHandler}
        stopRefresh={stopRefreshTableHandler}
      />
    </>
  )
}

export default CountriesPage
