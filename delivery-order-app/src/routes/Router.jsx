import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Main from '../pages/Main'
import ComponentTest from '../pages/ComponentTest'
import CreditCharge from '../pages/CreditCharge'
import Cart from '../pages/Cart'
import OrderComplete from '../pages/OrderComplete'
import OAuthRedirect from '../pages/OAuthRedirect'
import Terms from '../pages/Terms'

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/main" element={<Main />} />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order-complete"
        element={
          <ProtectedRoute>
            <OrderComplete />
          </ProtectedRoute>
        }
      />
      <Route path="/oauth2/redirect" element={<OAuthRedirect />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/test" element={<ComponentTest />} />
      <Route path="/credit/charge" element={<CreditCharge />} />
    </Routes>
  )
}

export default Router