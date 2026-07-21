import { formatCredit, parseCredit } from '../../utils/format'

function MenuOptionSelector({
  optionGroups = [],
  selectedOptionMap = {},
  onSelectRadio,
  onToggleCheckbox,
}) {
  const formatOptionPrice = (price) => {
    const parsedPrice = parseCredit(price)

    if (parsedPrice === 0) return ''

    return `(+${formatCredit(parsedPrice)})`
  }

  if (optionGroups.length === 0) {
    return (
      <p className="text-[12px] font-medium text-gray-3">
        선택 가능한 옵션이 없습니다.
      </p>
    )
  }

  return (
    <div className="space-y-8">
      {optionGroups.map((group) => {
        const selectedValue = selectedOptionMap[group.id]

        return (
          <section key={group.id}>
            <div className="mb-3">
              <h4 className="text-[20px] font-bold text-gray-5">
                {group.title}
              </h4>

              {group.required && (
                <p className="mt-1 text-[12px] font-medium text-gray-3">
                  필수 옵션입니다.
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => {
                const isSelected =
                  group.type === 'radio'
                    ? selectedValue?.id === option.id
                    : Array.isArray(selectedValue) &&
                      selectedValue.some(
                        (selected) => selected.id === option.id,
                      )

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      if (group.type === 'radio') {
                        onSelectRadio(group, option)
                        return
                      }

                      onToggleCheckbox(group, option)
                    }}
                    className={`cursor-pointer rounded-small border px-2 py-1 text-[12px] font-medium transition ${
                      isSelected
                        ? 'border-primary bg-assistive text-primary'
                        : 'border-primary bg-gray-0 text-primary hover:bg-assistive'
                    }`}
                  >
                    {option.name} {formatOptionPrice(option.price)}
                  </button>
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