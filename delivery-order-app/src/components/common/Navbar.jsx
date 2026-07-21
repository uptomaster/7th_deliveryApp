import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loginState = localStorage.getItem('isLoggedIn')
    setIsLoggedIn(loginState === 'true')
  }, [])

  const closeMenu = () => {
    setIsOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
    setIsOpen(false)
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 bg-primary">
      <nav className="mx-auto flex h-16 w-full max-w-[1725px] items-center justify-between px-5 dt:px-10">
        <Link to="/main" className="text-[24px] font-bold text-gray-0">
          어쩌구 저쩌구
        </Link>

        {/* dt 환경 */}
        <div className="hidden items-center gap-5 text-gray-0 dt:flex">
          <Link
            to="/cart"
            aria-label="장바구니"
            className="text-[20px] transition hover:text-assistive"
          >
            🛒
          </Link>

          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer text-[12px] font-medium text-gray-0 transition hover:text-assistive"
            >
              로그아웃
            </button>
          ) : (
            <Link
              to="/login"
              className="text-[12px] font-medium text-gray-0 transition hover:text-assistive"
            >
              로그인
            </Link>
          )}
        </div>

        {/* ph 환경 */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-button text-[24px] font-bold text-gray-0 dt:hidden"
          aria-label="메뉴 열기"
        >
          {isOpen ? '×' : '☰'}
        </button>
      </nav>

      {/* ph 환경 */}
      {isOpen && (
        <div className="border-t border-secondary bg-primary px-5 py-5 dt:hidden">
          <div className="flex flex-col gap-3 text-gray-0">
            <Link
              to="/main"
              onClick={closeMenu}
              className="block rounded-button px-4 py-3 text-[20px] font-medium text-gray-0 transition hover:bg-secondary"
            >
              홈
            </Link>

            <Link
              to="/cart"
              onClick={closeMenu}
              className="block rounded-button px-4 py-3 text-[20px] font-medium text-gray-0 transition hover:bg-secondary"
            >
              🛒 장바구니
            </Link>

            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="block cursor-pointer rounded-button px-4 py-3 text-left text-[20px] font-medium text-gray-0 transition hover:bg-secondary"
              >
                로그아웃
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="block rounded-button px-4 py-3 text-[20px] font-medium text-gray-0 transition hover:bg-secondary"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar