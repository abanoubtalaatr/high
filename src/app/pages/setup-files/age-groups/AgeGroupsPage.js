import {useState} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import AgeGroupsPageToolbarWrapper from './AgeGroupsPageToolbarWrapper'
import ItemsTableWrapper from './ItemsTableWrapper'
import {useIntl} from 'react-intl'

function AgeGroupsPage() {
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
      <AgeGroupsPageToolbarWrapper refreshTable={refreshTableHandler} />
      <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'AGE_GROUPS'})}</PageTitle>
      <ItemsTableWrapper
        refreshTable={refreshTableState}
        startRefreshTable={refreshTableHandler}
        stopRefresh={stopRefreshTableHandler}
      />
    </>
  )
}

export default AgeGroupsPage
