import {useIntl} from 'react-intl'
import {PageTitle} from '../../../../_metronic/layout/core'
import ItemsTableWrapper from './ItemsTableWrapper'
import JobsPageToolbarWrapper from './JobsPageToolbarWrapper'
import {useState} from 'react'

function JobsPage() {
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
      <JobsPageToolbarWrapper refreshTable={refreshTableHandler} />
      <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'JOBS'})}</PageTitle>
      <ItemsTableWrapper
        refreshTable={refreshTableState}
        startRefreshTable={refreshTableHandler}
        stopRefresh={stopRefreshTableHandler}
      />
    </>
  )
}

export default JobsPage
