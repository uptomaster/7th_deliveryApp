function MenuOptionSelector({
  optionGroups = [],
  selectedOptionMap = {},
  onSelectRadio,
  onToggleCheckbox,
}) {
  const parsePrice = (price) => {
    if (typeof price === 'number') return price
    return Number(price.toString().replace(/[^0-9]/g, ''))
  }

  const formatPrice = (price) => {
    const parsedPrice = parsePrice(price)

    if (parsedPrice === 0) return '+0원'

    return `+${parsedPrice.toLocaleString()}원`
  }

  if (optionGroups.length === 0) {
    return (
      <p className="text-[14px] font-medium text-gray-3">
        선택 가능한 옵션이 없습니다.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      {optionGroups.map((group) => {
        const selectedValue = selectedOptionMap[group.id]

        return (
          <section key={group.id}>
            <div className="mb-3 flex items-center gap-2">
              <h4 className="text-[16px] font-bold text-gray-5">
                {group.title}
              </h4>

              {group.required && (
                <span className="rounded-full bg-assistive px-2 py-1 text-[12px] font-medium text-primary">
                  필수
                </span>
              )}
            </div>

            <div className="space-y-3">
              {group.options.map((option) => {
                const isSelected =
                  group.type === 'radio'
                    ? selectedValue?.id === option.id
                    : Array.isArray(selectedValue) &&
                      selectedValue.some(
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
                        type={group.type}
                        name={group.id}
                        checked={isSelected}
                        onChange={() => {
                          if (group.type === 'radio') {
                            onSelectRadio(group, option)
                            return
                          }

                          onToggleCheckbox(group, option)
                        }}
                        className="h-4 w-4 accent-primary"
                      />

                      <span className="text-[14px] font-medium text-gray-5">
                        {option.name}
                      </span>
                    </div>

                    <span className="text-[14px] font-bold text-gray-5">
                      {formatPrice(option.price)}
                    </span>
                  </label>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default MenuOptionSelector