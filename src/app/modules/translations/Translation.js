import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import { useState } from 'react'
import TranslationToolbarWrapper from './TranslationToolbarWrapper'
import TranslationTableWrapper from './TranslationTableWrapper'
import { useLocation, useParams } from 'react-router-dom'

function Translation(props) {
  const location = useLocation()
  const itemDetails = location.state
  const { modelName, model, translatePageUrl } = props
  const intl = useIntl()
  console.log('am here from any place');
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
  const [refreshTableState, setRefreshTableState] = useState(false)
  const refreshTableHandler = () => {
    setRefreshTableState(true)
  }
  const stopRefreshTableHandler = () => {
    setRefreshTableState(false)
  }
  return (
    <>
      <TranslationToolbarWrapper model={model} />
      <PageTitle breadcrumbs={breadCrumbs}>{`${itemDetails.name} ${intl.formatMessage({ id: 'TRANSLATION' })}`}</PageTitle>
      <TranslationTableWrapper
        refreshTable={refreshTableState}
        startRefreshTable={refreshTableHandler}
        stopRefresh={stopRefreshTableHandler}
        modelName={modelName}
        translatePageUrl={translatePageUrl}
      />
    </>
  )
}
export default Translation
