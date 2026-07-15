import { createContext, useContext, useEffect, useState } from 'react'
import {
  addCartItem,
  deleteCartItem,
  fetchCart,
  updateCartItemQuantity,
} from '../api/cartApi'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [cartId, setCartId] = useState(null)
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [isCartLoading, setIsCartLoading] = useState(false)

  const loadCart = async () => {
    try {
      setIsCartLoading(true)

      const response = await fetchCart()
      const cart = response.result

      setCartId(cart.cartId)
      setCartItems(cart.items)
      setTotalCartPrice(cart.totalCartPrice)
    } catch (error) {
      console.error('장바구니 조회 실패:', error)
      setCartItems([])
      setTotalCartPrice(0)
    } finally {
      setIsCartLoading(false)
    }
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

    if (isLoggedIn) {
      loadCart()
    }
  }, [])

  const addToCart = async (restaurantName, menu, count, selectedOptions = []) => {
    try {
      const optionIds = selectedOptions
        .map((option) => option.optionId ?? option.id)
        .filter(Boolean)

      await addCartItem({
        menuId: menu.menuId ?? menu.id,
        itemQuantity: count,
        optionIds,
      })

      await loadCart()
    } catch (error) {
      console.error('장바구니 추가 실패:', error)
      alert('장바구니 추가에 실패했습니다.')
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
      alert('수량 변경에 실패했습니다.')
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
      alert('수량 변경에 실패했습니다.')
    }
  }

  const handleRemove = async (id) => {
    try {
      await deleteCartItem(id)
      await loadCart()
    } catch (error) {
      console.error('장바구니 삭제 실패:', error)
      alert('장바구니 삭제에 실패했습니다.')
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