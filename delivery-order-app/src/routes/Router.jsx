import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Main from '../pages/Main'
import ComponentTest from '../pages/ComponentTest'
import Cart from '../pages/Cart'
import OrderComplete from '../pages/OrderComplete'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/main" element={<Main />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order-complete" element={<OrderComplete />} />
      <Route path="/test" element={<ComponentTest />} />
    </Routes>
  )
}

export default Router