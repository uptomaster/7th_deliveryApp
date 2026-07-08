import { useEffect, useState } from 'react'
import Button from '../common/Button'
import QuantityControl from '../common/QuantityControl'
import MenuOptionSelector from './MenuOptionSelector'
import { useCart } from '../../context/CartContext'
import { formatCredit, parseCredit } from '../../utils/format'

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
          group.options.find((option) => parseCredit(option.price) === 0) ||
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

  const getUnitPrice = () => {
    if (!activeMenu) return 0

    const basePrice = parseCredit(activeMenu.price)

    const optionsPrice = getSelectedOptions().reduce(
      (sum, option) => sum + parseCredit(option.price),
      0,
    )

    return basePrice + optionsPrice
  }

  const getTotalPrice = () => {
    return getUnitPrice() * count
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
      <div className="fixed inset-0 z-[100] flex justify-end bg-black/30">
        <section className="flex h-full w-full max-w-[360px] flex-col bg-gray-0 px-4 py-6 shadow-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[24px] font-bold text-gray-5">
                {restaurant.name}
              </h2>

              <h3 className="mt-8 text-[20px] font-bold text-gray-5">
                {activeMenu.name}
              </h3>

              <p className="mt-1 text-[12px] font-medium text-gray-3">
                {activeMenu.description}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-[24px] font-medium text-gray-5 transition hover:text-primary"
              aria-label="모달 닫기"
            >
              ×
            </button>
          </div>

          <div className="mt-4 flex-1 overflow-y-auto pr-1">
            <MenuOptionSelector
              optionGroups={activeMenu.optionGroups}
              selectedOptionMap={selectedOptionMap}
              onSelectRadio={handleSelectRadio}
              onToggleCheckbox={handleToggleCheckbox}
            />
          </div>

          <div className="border-t border-gray-2 pt-5">
            <div className="mb-5 flex items-center justify-between">
              <strong className="text-[20px] font-bold text-gray-5">
                {formatCredit(getTotalPrice())}
              </strong>

              <QuantityControl
                count={count}
                onDecrease={() => setCount((prev) => Math.max(1, prev - 1))}
                onIncrease={() => setCount((prev) => prev + 1)}
              />
            </div>

            <div className="grid grid-cols-[80px_1fr] gap-3">
              <Button
                variant="outline"
                size="full"
                onClick={handleBackToMenuList}
              >
                이전
              </Button>

              <Button variant="primary" size="full" onClick={handleAddToCart}>
                담기
              </Button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/30">
      <section className="flex h-full w-full max-w-[360px] flex-col bg-gray-0 px-4 py-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[12px] font-medium text-primary">
              {restaurant.category}
            </p>

            <h2 className="mt-1 text-[24px] font-bold text-gray-5">
              {restaurant.name}
            </h2>

            <p className="mt-2 text-[12px] font-medium text-gray-3">
              ⭐ {restaurant.rating}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[24px] font-medium text-gray-5 transition hover:text-primary"
            aria-label="모달 닫기"
          >
            ×
          </button>
        </div>

        <div className="mt-8 flex-1 space-y-8 overflow-y-auto pr-1">
          {restaurant.menus?.map((menu) => (
            <article key={menu.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[20px] font-bold text-gray-5">
                    {menu.name}
                  </h3>

                  <p className="mt-1 text-[12px] font-medium text-gray-3">
                    {menu.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenOptionPage(menu)}
                  className="rounded-small border border-primary px-2 py-1 text-[12px] font-medium text-primary transition hover:bg-assistive"
                >
                  선택
                </button>
              </div>

              <p className="mt-4 text-right text-[20px] font-bold text-gray-5">
                {formatCredit(menu.price)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MenuModal