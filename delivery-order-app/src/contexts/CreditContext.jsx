import { useEffect, useState } from 'react'
import { CreditContext, DEFAULT_CREDIT } from './creditContextValue'
import axiosInstance from '../api/axiosInstance'

export function CreditProvider({ children }) {
  const [credit, setCredit] = useState(DEFAULT_CREDIT)

  // 1. 내 크레딧 잔액 조회 API
  const fetchCredit = async () => {
    try {
      const response = await axiosInstance.get('/users/me')
      if (response.data.isSuccess) {
        setCredit(response.data.result.credit)
      }
    } catch (error) {
      console.error('크레딧 조회 실패:', error)
    }
  }

  useEffect(() => {
    fetchCredit()
  }, [])

  // 아래는 아직 임시 코드 (다음 커밋에서 수정할 예정)
  const chargeCredit = (amount) => { setCredit((prev) => prev + amount) }
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