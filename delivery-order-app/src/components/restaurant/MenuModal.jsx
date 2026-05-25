import Button from '../common/Button'

function MenuModal({ restaurant, onClose }) {
  if (!restaurant) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-5">
      <section className="w-full max-w-[520px] rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-orange-500">
              {restaurant.category}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-zinc-900">
              {restaurant.name}
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              {restaurant.description}
            </p>
          </div>

          <Button variant="secondary" size="sm" onClick={onClose}>
            닫기
          </Button>
        </div>

        <div className="mt-6 space-y-3">
          {restaurant.menus?.map((menu) => (
            <div
              key={menu.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-100 p-4"
            >
              <div>
                <h3 className="font-bold text-zinc-900">{menu.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  {menu.description}
                </p>
              </div>

              <strong className="shrink-0 text-orange-500">
                {menu.price}
              </strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MenuModal