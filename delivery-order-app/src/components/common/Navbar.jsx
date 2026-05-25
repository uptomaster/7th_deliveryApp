import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const menus = [
    { id: 1, name: '홈', path: '/main' },
    { id: 2, name: '음식점', path: '/main' },
    { id: 3, name: '주문내역', path: '/main' },
    { id: 4, name: '마이페이지', path: '/main' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white">
      <nav className="mx-auto flex h-16 w-full max-w-[1725px] items-center justify-between px-5 dt:px-10">
        <Link to="/main" className="text-xl font-black text-orange-500">
          DELIFOOD
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-semibold text-zinc-700 dt:flex">
          {menus.map((menu) => (
            <li key={menu.id}>
              <Link to={menu.path} className="transition hover:text-orange-500">
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xl font-bold text-orange-500 dt:hidden"
          aria-label="메뉴 열기"
        >
          ☰
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-zinc-100 bg-white px-5 py-4 dt:hidden">
          <ul className="flex flex-col gap-4 text-sm font-semibold text-zinc-700">
            {menus.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.path}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl px-3 py-2 transition hover:bg-orange-50 hover:text-orange-500"
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar