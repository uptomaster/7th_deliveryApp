import { BrowserRouter } from 'react-router-dom'
import Router from './routes/Router'
import { CartProvider } from './context/CartContext' // 👈 1. 불러오기 추가

function App() {
  return (
    <BrowserRouter>
      {/* 2. CartProvider로 Router 감싸기 */}
      <CartProvider>
        <Router />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App