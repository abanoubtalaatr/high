import {useIntl} from 'react-intl'
import {PageTitle} from '../../../../_metronic/layout/core'
import {useState} from 'react'
import LanguagesToolbarWrapper from './LanguagesToolbarWrapper'
import LanguagesTableWrapper from './LanguagesTableWrapper'

function Languages() {
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
      <LanguagesToolbarWrapper refreshTable={refreshTableHandler} />
      <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'LANGUAGES'})}</PageTitle>
      <LanguagesTableWrapper
        refreshTable={refreshTableState}
        startRefreshTable={refreshTableHandler}
        stopRefresh={stopRefreshTableHandler}
      />
    </>
  )
}
export default Languages
