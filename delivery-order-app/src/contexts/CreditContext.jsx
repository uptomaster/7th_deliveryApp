import { useCallback, useEffect, useState } from 'react'
import { CreditContext, DEFAULT_CREDIT } from './creditContextValue'
import axiosInstance, { getAccessToken } from '../api/axiosInstance'
import { fetchMyInfo } from '../api/authApi'

export function CreditProvider({ children }) {
  const [credit, setCredit] = useState(DEFAULT_CREDIT)

  const fetchCredit = useCallback(async () => {
    const token = getAccessToken()
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

    if (!token || !isLoggedIn) {
      return null
    }

    try {
      const response = await fetchMyInfo()

      if (response.isSuccess) {
        const currentCredit = response.result.credit ?? DEFAULT_CREDIT
        setCredit(currentCredit)
        return currentCredit
      }

      return null
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error('크레딧 조회 실패:', error)
      }

      return null
    }
  }, [])

  useEffect(() => {
    fetchCredit()
  }, [fetchCredit])

  const chargeCredit = async (amount) => {
    try {
      const response = await axiosInstance.post('/credits/charge', {
        amount,
      })

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

  const payWithCredit = async (amount) => {
    if (credit < amount) {
      return {
        success: false,
        reason: 'insufficient',
      }
    }

    try {
      const response = await axiosInstance.post('/orders', {
        usedCredit: amount,
      })

      if (response.data.isSuccess) {
        await fetchCredit()

        return {
          success: true,
          orderId: response.data.result.orderId,
        }
      }

      return {
        success: false,
      }
    } catch (error) {
      console.error('결제 실패:', error)
      alert('결제 처리 중 오류가 발생했습니다.')

      return {
        success: false,
      }
    }
  }

  const hasEnoughCredit = (amount) => {
    return credit >= amount
  }

  return (
    <CreditContext.Provider
      value={{
        credit,
        fetchCredit,
        chargeCredit,
        payWithCredit,
        hasEnoughCredit,
      }}
    >
      {children}
    </CreditContext.Provider>
  )
}