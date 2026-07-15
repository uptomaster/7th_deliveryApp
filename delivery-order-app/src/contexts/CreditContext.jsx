import { useEffect, useState } from 'react'
import { CreditContext, DEFAULT_CREDIT } from './creditContextValue'
import axiosInstance from '../api/axiosInstance'

export function CreditProvider({ children }) {
  const [credit, setCredit] = useState(DEFAULT_CREDIT)

  const fetchCredit = async () => {
    try {
      const response = await axiosInstance.get('/users/me')
      if (response.data.isSuccess) setCredit(response.data.result.credit)
    } catch (error) {
      console.error('크레딧 조회 실패:', error)
    }
  }

  useEffect(() => { fetchCredit() }, [])

  // 2. 크레딧 충전 API 연동
  const chargeCredit = async (amount) => {
    try {
      const response = await axiosInstance.post('/credits/charge', { amount })
      if (response.data.isSuccess) {
        setCredit(response.data.result.balance)
        return true
      }
      return false
    } catch (error) {
      console.error('충전 실패:', error)
      alert('크레딧 충전에 실패했습니다.')
      return false
    }
  }

  // 아래는 아직 임시 코드
  const payWithCredit = (amount) => {
    if (credit < amount) return false
    setCredit((prev) => prev - amount)
    return true
  }
  const hasEnoughCredit = (amount) => credit >= amount

  return (
    <CreditContext.Provider value={{ credit, chargeCredit, payWithCredit, hasEnoughCredit }}>
      {children}
    </CreditContext.Provider>
  )
}