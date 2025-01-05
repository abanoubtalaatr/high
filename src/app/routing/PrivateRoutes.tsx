import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import Partners from '../pages/partners/PartnersPage'
import Employees from '../pages/emploayees/EmploayeesPage'
import Locations from '../pages/locations/LocationsPage'
import SetupFiles from '../pages/setup-files/SetupFiles'
import Activites from '../pages/activites/ActivitesPage'
import UnitsPage from '../pages/units/UnitsPage'
import UsersPage from '../pages/users/UsersPage'
import NotificationsPage from '../pages/notifications/NotificationsPage'
import PublicEvents from '../pages/public-events/PublicEvents'
import Bookings from '../pages/bookings/Bookings'
import Dashboard from '../pages/dashboard/Dashboard'
import Wallet from '../pages/wallet/Wallet'
import PagesContent from '../pages/pages-content/PagesContent'
import Financials from '../pages/financials/Financials'



const PrivateRoutes = () => {

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='partners/*' element={<Partners />} />
        <Route path='units/*' element={<UnitsPage />} />
        <Route path='users/*' element={<UsersPage />} />
        <Route path='public-events/*' element={<PublicEvents />} />
        <Route path='bookings/*' element={<Bookings />} />
        <Route path='employees/*' element={<Employees />} />
        <Route path='locations/*' element={<Locations />} />
        <Route path='financials/*' element={<Financials />} />
        <Route path='wallet/*' element={<Wallet />} />
        <Route path='setup-files/*' element={<SetupFiles />} />
        <Route path='activites/*' element={<Activites />} />        
        <Route path='pages-content/*' element={<PagesContent />} />
        <Route path='notifications/*' element={<NotificationsPage />} />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export {PrivateRoutes}
