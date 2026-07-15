import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAccessToken } from '../api/axiosInstance'
import {
  addCartItem,
  deleteCartItem,
  fetchCart,
  updateCartItemQuantity,
} from '../api/cartApi'

const CartContext = createContext()

export function CartProvider({ children }) {
  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState([])
  const [cartId, setCartId] = useState(null)
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [isCartLoading, setIsCartLoading] = useState(false)

  const loadCart = async () => {
    const token = getAccessToken()
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

    if (!token || !isLoggedIn) {
      setCartItems([])
      setTotalCartPrice(0)
      return
    }

    try {
      setIsCartLoading(true)

      const response = await fetchCart()
      const cart = response.result

      setCartId(cart.cartId)
      setCartItems(cart.items)
      setTotalCartPrice(cart.totalCartPrice)
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error('장바구니 조회 실패:', error)
        console.error('장바구니 조회 실패 응답:', error.response?.data)
      }

      setCartItems([])
      setTotalCartPrice(0)
    } finally {
      setIsCartLoading(false)
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

  const addToCart = async (
    restaurantName,
    menu,
    count,
    selectedOptions = [],
  ) => {
    const token = getAccessToken()
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

    if (!token || !isLoggedIn) {
      alert('로그인 후 장바구니를 이용할 수 있습니다.')
      navigate('/login')
      return
    }

    try {
      const menuId = Number(menu.menuId ?? menu.id)

      const optionIds = selectedOptions
        .map((option) => option.optionId ?? option.id)
        .filter((id) => id !== undefined && id !== null)
        .map(Number)

      const payload = {
        menuId,
        itemQuantity: Number(count),
        optionIds,
      }

      console.log('장바구니 추가 restaurantName:', restaurantName)
      console.log('장바구니 추가 menu:', menu)
      console.log('장바구니 추가 selectedOptions:', selectedOptions)
      console.log('장바구니 추가 payload:', payload)

      if (!payload.menuId || Number.isNaN(payload.menuId)) {
        alert('메뉴 정보가 올바르지 않습니다.')
        console.error('menuId 오류:', payload)
        return
      }

      if (!payload.itemQuantity || Number.isNaN(payload.itemQuantity)) {
        alert('수량 정보가 올바르지 않습니다.')
        console.error('itemQuantity 오류:', payload)
        return
      }

      if (payload.optionIds.some((optionId) => Number.isNaN(optionId))) {
        alert('옵션 정보가 올바르지 않습니다.')
        console.error('optionIds 오류:', payload)
        return
      }

      await addCartItem(payload)

      await loadCart()

      alert('장바구니에 담겼습니다.')
    } catch (error) {
      console.error('장바구니 추가 실패:', error)
      console.error('장바구니 추가 실패 응답:', error.response?.data)

      alert(error.response?.data?.message ?? '장바구니 추가에 실패했습니다.')
    }
  }

  const handleIncrease = async (id) => {
    const targetItem = cartItems.find((item) => item.id === id)
    if (!targetItem) return

    const nextQuantity = targetItem.count + 1

    try {
      await updateCartItemQuantity(id, nextQuantity)
      await loadCart()
    } catch (error) {
      console.error('장바구니 수량 증가 실패:', error)
      console.error('장바구니 수량 증가 실패 응답:', error.response?.data)

      alert(error.response?.data?.message ?? '수량 변경에 실패했습니다.')
    }
  }

  const handleDecrease = async (id) => {
    const targetItem = cartItems.find((item) => item.id === id)
    if (!targetItem) return

    const nextQuantity = Math.max(1, targetItem.count - 1)

    try {
      await updateCartItemQuantity(id, nextQuantity)
      await loadCart()
    } catch (error) {
      console.error('장바구니 수량 감소 실패:', error)
      console.error('장바구니 수량 감소 실패 응답:', error.response?.data)

      alert(error.response?.data?.message ?? '수량 변경에 실패했습니다.')
    }
  }

  const handleRemove = async (id) => {
    try {
      await deleteCartItem(id)
      await loadCart()
    } catch (error) {
      console.error('장바구니 삭제 실패:', error)
      console.error('장바구니 삭제 실패 응답:', error.response?.data)

      alert(error.response?.data?.message ?? '장바구니 삭제에 실패했습니다.')
    }
  }

  const clearCart = () => {
    setCartItems([])
    setTotalCartPrice(0)
  }

  return (
    <CartContext.Provider
      value={{
        cartId,
        cartItems,
        totalCartPrice,
        isCartLoading,
        loadCart,
        addToCart,
        handleIncrease,
        handleDecrease,
        handleRemove,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}