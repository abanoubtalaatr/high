import {useIntl} from 'react-intl'
import CapacitiesPageToolbarWrapper from './CapacitiesPageToolbarWrapper'
import ItemsTableWrapper from './ItemsTableWrapper'
import {useState} from 'react'
import { PageTitle } from '../../../../_metronic/layout/core'

function CapacitiesPage() {
  const intl = useIntl()
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
  const [refreshTableState, setRefreshTableState] = useState(false)
  const refreshTableHandler = () => {
    setRefreshTableState(true)
  }
  const stopRefreshTableHandler = () => {
    setRefreshTableState(false)
  }
  return (
    <>
      <CapacitiesPageToolbarWrapper refreshTable={refreshTableHandler} />
      <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'CAPACITIES'})}</PageTitle>
      <ItemsTableWrapper
        refreshTable={refreshTableState}
        startRefreshTable={refreshTableHandler}
        stopRefresh={stopRefreshTableHandler}
      />
    </>
  )
}

export default CapacitiesPage
