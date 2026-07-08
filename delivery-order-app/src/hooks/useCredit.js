import { useContext } from 'react'
import { CreditContext } from '../contexts/creditContextValue'

export function useCredit() {
  const context = useContext(CreditContext)

  if (!context) {
    throw new Error('useCredit은 CreditProvider 내부에서만 사용할 수 있습니다.')
  }

  return context
}
