import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (restaurantName, menu, count) => {
    setCartItems((prev) => {
      // 💡 핵심 포인트: 매장명과 메뉴ID를 합쳐서 세상에 하나뿐인 고유 ID 생성!
      const uniqueId = `${restaurantName}-${menu.id}`
      const existingItem = prev.find((item) => item.id === uniqueId)

      if (existingItem) {
        return prev.map((item) =>
          item.id === uniqueId ? { ...item, count: item.count + count } : item
        )
      }
      return [
        ...prev,
        {
          id: uniqueId, // 👈 고유 ID로 덮어씌워서 CartList.jsx 수정 없이 바로 호환되게 만듦
          originalMenuId: menu.id,
          storeName: restaurantName,
          name: menu.name,
          description: menu.description,
          price: menu.price,
          count: count,
        },
      ]
    })
  }

  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    )
  }

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: Math.max(1, item.count - 1) } : item
      )
    )
  }

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        handleIncrease,
        handleDecrease,
        handleRemove,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}