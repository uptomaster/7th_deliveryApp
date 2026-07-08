import { useEffect, useState } from 'react'
import { CreditContext, CREDIT_STORAGE_KEY, DEFAULT_CREDIT } from './creditContextValue'

function readStoredCredit() {
  const stored = localStorage.getItem(CREDIT_STORAGE_KEY)
  const parsed = Number(stored)
  return stored === null || Number.isNaN(parsed) ? DEFAULT_CREDIT : parsed
}

export function CreditProvider({ children }) {
  const [credit, setCredit] = useState(readStoredCredit)

  useEffect(() => {
    localStorage.setItem(CREDIT_STORAGE_KEY, String(credit))
  }, [credit])

  const chargeCredit = (amount) => {
    setCredit((prev) => prev + amount)
  }

  const payWithCredit = (amount) => {
    if (credit < amount) return false
    setCredit((prev) => prev - amount)
    return true
  }

  const hasEnoughCredit = (amount) => credit >= amount

  return (
    <CreditContext.Provider
      value={{ credit, chargeCredit, payWithCredit, hasEnoughCredit }}
    >
      {children}
    </CreditContext.Provider>
  )
}
