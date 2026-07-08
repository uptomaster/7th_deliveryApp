function MenuOptionSelector({
  options = [],
  selectedOptions = [],
  onToggleOption,
}) {
  const parsePrice = (price) => {
    if (typeof price === 'number') return price
    return Number(price.toString().replace(/[^0-9]/g, ''))
  }

  if (options.length === 0) {
    return (
      <p className="text-[14px] font-medium text-gray-3">
        선택 가능한 옵션이 없습니다.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {options.map((option) => {
        const isSelected = selectedOptions.some(
          (selected) => selected.id === option.id,
        )

        return (
          <label
            key={option.id}
            className={`flex cursor-pointer items-center justify-between rounded-button border px-4 py-3 transition ${
              isSelected
                ? 'border-primary bg-assistive'
                : 'border-gray-2 bg-gray-0 hover:border-secondary'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleOption(option)}
                className="h-4 w-4 accent-primary"
              />

              <span className="text-[14px] font-medium text-gray-5">
                {option.name}
              </span>
            </div>

            <span className="text-[14px] font-bold text-gray-5">
              +{parsePrice(option.price).toLocaleString()}원
            </span>
          </label>
        )
      })}
    </div>
  )
}

export default MenuOptionSelector