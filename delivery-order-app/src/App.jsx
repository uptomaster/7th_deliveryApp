import { BrowserRouter } from 'react-router-dom'
import Router from './routes/Router'
import { CreditProvider } from './contexts/CreditContext'

function App() {
  return (
    <CreditProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CreditProvider>
  )
}

export default App