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
      return false
    }
  }

  // 3. 결제 및 주문 생성 API 연동 (최종)
  const payWithCredit = async (amount) => {
    if (credit < amount) return { success: false, reason: 'insufficient' }
    
    try {
      const response = await axiosInstance.post('/orders', { usedCredit: amount })
      if (response.data.isSuccess) {
        await fetchCredit() 
        return { success: true, orderId: response.data.result.orderId } 
      }
      return { success: false }
    } catch (error) {
      console.error('결제 실패:', error)
      alert('결제 처리 중 오류가 발생했습니다.')
      return { success: false }
    }
  }

  const hasEnoughCredit = (amount) => credit >= amount

  return (
    <CreditContext.Provider value={{ credit, chargeCredit, payWithCredit, hasEnoughCredit }}>
      {children}
    </CreditContext.Provider>
  )
}