import {useIntl} from 'react-intl'
import ItemsTableWrapper from './ItemsTableWrapper'
import {PageTitle} from '../../../../_metronic/layout/core'
import StatesPageToolbarWrapper from './StatesPageToolbarWrapper'
import {useState} from 'react'

function StatesPage() {
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
      <StatesPageToolbarWrapper refreshTable={refreshTableHandler} />
      <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'STATES'})}</PageTitle>
      <ItemsTableWrapper
        refreshTable={refreshTableState}
        startRefreshTable={refreshTableHandler}
        stopRefresh={stopRefreshTableHandler}
      />
    </>
  )
}

export default StatesPage
