import { useEffect, useState } from 'react'
import Button from '../common/Button'
import QuantityControl from '../common/QuantityControl'
import MenuOptionSelector from './MenuOptionSelector'
import { useCart } from '../../context/CartContext'

// 💡 남혁 형이 작업할 부분: 나중에 실제 식당 데이터(restaurants.js)에 옵션이 추가되면 이 더미 데이터를 지우고 실제 데이터를 쓰면 됩니다!
const DUMMY_OPTIONS = [
  { id: 'opt1', name: '사이즈 업', price: 1000 },
  { id: 'opt2', name: '치즈 토핑', price: 500 },
  { id: 'opt3', name: '매운맛 변경', price: 500 },
]

function MenuModal({ restaurant, onClose }) {
  const { addToCart } = useCart()

  const [activeMenu, setActiveMenu] = useState(null)
  const [selectedOptionMap, setSelectedOptionMap] = useState({})
  const [count, setCount] = useState(1)

  useEffect(() => {
    setActiveMenu(null)
    setSelectedOptionMap({})
    setCount(1)
  }, [restaurant?.id])

  if (!restaurant) return null

  const parsePrice = (price) => {
    if (typeof price === 'number') return price
    return Number(price.toString().replace(/[^0-9]/g, ''))
  }

  const createSelectedOption = (group, option) => ({
    ...option,
    groupId: group.id,
    groupTitle: group.title,
  })

  const createInitialSelectedOptionMap = (menu) => {
    const initialMap = {}

    menu.optionGroups?.forEach((group) => {
      if (group.type === 'radio') {
        const defaultOption =
          group.options.find((option) => parsePrice(option.price) === 0) ||
          group.options[0]

        initialMap[group.id] = createSelectedOption(group, defaultOption)
      }

      if (group.type === 'checkbox') {
        initialMap[group.id] = []
      }
    })

    return initialMap
  }

  const getSelectedOptions = () => {
    return Object.values(selectedOptionMap).flatMap((value) => {
      if (Array.isArray(value)) return value
      if (value) return [value]
      return []
    })
  }

  const getTotalPrice = () => {
    if (!activeMenu) return 0

    const basePrice = parsePrice(activeMenu.price)

    const optionsPrice = getSelectedOptions().reduce(
      (sum, option) => sum + parsePrice(option.price),
      0,
    )

    return (basePrice + optionsPrice) * count
  }

  const handleSelectRadio = (group, option) => {
    setSelectedOptionMap((prev) => ({
      ...prev,
      [group.id]: createSelectedOption(group, option),
    }))
  }

  const handleToggleCheckbox = (group, option) => {
    setSelectedOptionMap((prev) => {
      const currentOptions = Array.isArray(prev[group.id])
        ? prev[group.id]
        : []

      const isSelected = currentOptions.some(
        (selected) => selected.id === option.id,
      )

      if (isSelected) {
        return {
          ...prev,
          [group.id]: currentOptions.filter(
            (selected) => selected.id !== option.id,
          ),
        }
      }

      return {
        ...prev,
        [group.id]: [...currentOptions, createSelectedOption(group, option)],
      }
    })
  }

  const handleOpenOptionPage = (menu) => {
    setActiveMenu(menu)
    setSelectedOptionMap(createInitialSelectedOptionMap(menu))
    setCount(1)
  }

  const handleBackToMenuList = () => {
    setActiveMenu(null)
    setSelectedOptionMap({})
    setCount(1)
  }

  const handleAddToCart = () => {
    if (!activeMenu) return

    addToCart(restaurant.name, activeMenu, count, getSelectedOptions())
    onClose()
  }

  if (activeMenu) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-5">
        <section className="flex w-full max-w-[420px] flex-col rounded-modal bg-gray-0 p-7 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[24px] font-bold text-gray-5">
                {activeMenu.name}
              </h2>

              <p className="mt-1 text-[12px] font-medium text-gray-3">
                {activeMenu.description}
              </p>

              <p className="mt-2 text-[20px] font-bold text-gray-5">
                {activeMenu.price}
              </p>
            </div>

            <button
              type="button"
              onClick={handleBackToMenuList}
              className="text-[24px] font-medium text-gray-4 transition hover:text-primary"
              aria-label="메뉴 목록으로 돌아가기"
            >
              ←
            </button>
          </div>

          <div className="my-6 h-px bg-gray-2" />

          <div className="max-h-[50vh] flex-1 overflow-y-auto pr-2">
            <MenuOptionSelector
              optionGroups={activeMenu.optionGroups}
              selectedOptionMap={selectedOptionMap}
              onSelectRadio={handleSelectRadio}
              onToggleCheckbox={handleToggleCheckbox}
            />
          </div>

          <div className="my-6 h-px bg-gray-2" />

          <div className="mb-6 flex items-center justify-between">
            <span className="text-[16px] font-bold text-gray-5">수량</span>

            <QuantityControl
              count={count}
              onDecrease={() => setCount((prev) => Math.max(1, prev - 1))}
              onIncrease={() => setCount((prev) => prev + 1)}
            />
          </div>

          <Button variant="primary" size="full" onClick={handleAddToCart}>
            {getTotalPrice().toLocaleString()}원 담기
          </Button>
        </section>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-5">
      <section className="flex w-full max-w-[420px] flex-col rounded-modal bg-gray-0 p-7 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[12px] font-medium text-primary">
              {restaurant.category}
            </p>

            <h2 className="mt-1 text-[36px] font-bold text-gray-5">
              {restaurant.name}
            </h2>

            <p className="mt-2 text-[12px] font-medium text-gray-3">
              ⭐ {restaurant.rating}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[24px] font-medium text-gray-4 transition hover:text-primary"
            aria-label="모달 닫기"
          >
            ×
          </button>
        </div>

        <div className="my-6 h-px bg-gray-2" />

        <div className="max-h-[50vh] space-y-9 overflow-y-auto pr-2">
          {restaurant.menus?.map((menu) => (
            <div
              key={menu.id}
              className="flex items-center justify-between gap-4"
            >
              <div>
                <h3 className="text-[20px] font-bold text-gray-5">
                  {menu.name}
                </h3>

                <p className="mt-1 text-[12px] font-medium text-gray-3">
                  {menu.description}
                </p>

                <p className="mt-1 text-[20px] font-bold text-gray-5">
                  {menu.price}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenOptionPage(menu)}
              >
                선택
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MenuModal