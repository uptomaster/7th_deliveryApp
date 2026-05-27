import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (restaurantName, menu, count) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === menu.id)
      if (existingItem) {
        return prev.map((item) =>
          item.id === menu.id ? { ...item, count: item.count + count } : item
        )
      }
      return [
        ...prev,
        {
          id: menu.id,
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