import { createContext, useContext, useState } from 'react'
import { parseCredit } from '../utils/format'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (restaurantName, menu, count, selectedOptions = []) => {
    setCartItems((prev) => {
      const optionsKey =
        selectedOptions
          .map((option) => option.id)
          .sort()
          .join('-') || 'default'

      const uniqueId = `${restaurantName}-${menu.id}-${optionsKey}`

      const existingItem = prev.find((item) => item.id === uniqueId)

      const basePrice = parseCredit(menu.price)

      const optionsPrice = selectedOptions.reduce(
        (sum, option) => sum + parseCredit(option.price),
        0,
      )

      const unitPrice = basePrice + optionsPrice

      if (existingItem) {
        return prev.map((item) =>
          item.id === uniqueId
            ? { ...item, count: item.count + count }
            : item,
        )
      }

      return [
        ...prev,
        {
          id: uniqueId,
          originalMenuId: menu.id,
          storeName: restaurantName,
          name: menu.name,
          description: menu.description,
          price: menu.price,
          unitPrice,
          selectedOptions,
          count,
        },
      ]
    })
  }

  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item,
      ),
    )
  }

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, count: Math.max(1, item.count - 1) }
          : item,
      ),
    )
  }

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
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