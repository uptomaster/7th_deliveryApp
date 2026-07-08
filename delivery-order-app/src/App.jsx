import { BrowserRouter } from 'react-router-dom'
import Router from './routes/Router'
import { CreditProvider } from './contexts/CreditContext'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CreditProvider>
      <BrowserRouter>
        <CartProvider>
          <Router />
        </CartProvider>
      </BrowserRouter>
    </CreditProvider>
  )
}

export default App