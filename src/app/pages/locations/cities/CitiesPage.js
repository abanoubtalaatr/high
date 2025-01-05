import {useIntl} from 'react-intl'
import ItemsTableWrapper from './ItemsTableWrapper'
import CitiesPageToolbarWrapper from './CitiesPageToolbarWrapper'
import {PageTitle} from '../../../../_metronic/layout/core'
import {useState} from 'react'

function CitiesPage() {
  const intl = useIntl()
  const [refreshTableState, setRefreshTableState] = useState(false)
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
  const refreshTableHandler = () => {
    setRefreshTableState(true)
  }
  const stopRefreshTableHandler = () => {
    setRefreshTableState(false)
  }
  return (
    <>
      <CitiesPageToolbarWrapper refreshTable={refreshTableHandler} />
      <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'CITIES'})}</PageTitle>
      <ItemsTableWrapper
        refreshTable={refreshTableState}
        startRefreshTable={refreshTableHandler}
        stopRefresh={stopRefreshTableHandler}
      />
    </>
  )
}

export default CitiesPage
