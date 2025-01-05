import {Route, Routes} from 'react-router-dom'
import {Login} from './components/Login'
import {ForgotPassword} from './components/ForgotPassword'
import {AuthLayout} from './AuthLayout'
import { VerificationCode } from './components/VerificationCode'

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      {/* <Route path='registration' element={<Registration />} /> */}
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='forgot-password/verification-code' element={<VerificationCode />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
