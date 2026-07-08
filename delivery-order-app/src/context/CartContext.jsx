import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // 1. selectedOptions 파라미터 추가 (기본값은 빈 배열)
  const addToCart = (restaurantName, menu, count, selectedOptions = []) => {
    setCartItems((prev) => {
      // 2. 고유 ID 생성: 식당이름 + 메뉴ID + 선택된옵션이름들
      // 이렇게 해야 같은 메뉴라도 옵션이 다르면 장바구니에 따로 담깁니다.
      const optionsString = selectedOptions.map(opt => opt.name).sort().join('-')
      const uniqueId = `${restaurantName}-${menu.id}-${optionsString}`

      const existingItem = prev.find((item) => item.id === uniqueId)

      // 3. 가격 계산: 문자열("15,000원")에서 숫자만 추출하여 옵션 가격 합산
      const parsePrice = (priceStr) => Number(priceStr.toString().replace(/[^0-9]/g, ''))
      const basePrice = parsePrice(menu.price)
      const optionsPrice = selectedOptions.reduce((sum, opt) => sum + parsePrice(opt.price), 0)
      const unitPrice = basePrice + optionsPrice // 옵션 포함된 1개당 최종 가격

      if (existingItem) {
        return prev.map((item) =>
          item.id === uniqueId ? { ...item, count: item.count + count } : item
        )
      }
      return [
        ...prev,
        {
          id: uniqueId,              // 수정된 고유 ID
          originalMenuId: menu.id,
          storeName: restaurantName,
          name: menu.name,
          description: menu.description,
          price: menu.price,         // 원래 가격 (문자열)
          unitPrice: unitPrice,      // 계산된 최종 가격 (숫자)
          selectedOptions: selectedOptions, // 선택된 옵션 내역
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