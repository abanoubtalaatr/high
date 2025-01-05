import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'

const App = () => {

  return (
      <I18nProvider>          
        <AuthInit>
          <Outlet />
          <MasterInit />
        </AuthInit>
      </I18nProvider>
  )
}

export default App
