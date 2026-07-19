import { useEffect, useState } from 'react'
import Navbar from '../components/common/Navbar'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import MenuModal from '../components/restaurant/MenuModal'
import { fetchCategories } from '../api/categoryApi'
import { fetchStoreDetail, fetchStores } from '../api/storeApi'

function Main() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [restaurants, setRestaurants] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const [isDetailLoading, setIsDetailLoading] = useState(false)

  const loadCategories = async () => {
    try {
      const response = await fetchCategories()
      setCategories([{ id: 'all', name: '전체' }, ...response.result])
    } catch (error) {
      console.error('카테고리 조회 실패:', error)
      setCategories([{ id: 'all', name: '전체' }])
    }
  }

  const loadStores = async (category) => {
    try {
      setIsLoading(true)

      const response = await fetchStores(category)
      setRestaurants(response.result)
    } catch (error) {
      console.error('음식점 목록 조회 실패:', error)
      setRestaurants([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName)
  }

  const handleRestaurantClick = async (restaurant) => {
    try {
      setIsDetailLoading(true)

      const response = await fetchStoreDetail(restaurant.storeId ?? restaurant.id)
      setSelectedRestaurant(response.result)
    } catch (error) {
      console.error('음식점 상세 조회 실패:', error)
      alert('음식점 정보를 불러오지 못했습니다.')
    } finally {
      setIsDetailLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    loadStores(selectedCategory)
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-gray-1">
      <Navbar />

      <main className="mx-auto max-w-[1725px] px-5 py-10 dt:px-10">
        <section>
          <div className="mb-6 flex flex-col gap-4 dt:flex-row dt:items-center dt:justify-between">
            <h2 className="text-[24px] font-bold text-gray-5">
              인기 맛집 총집합
            </h2>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryClick(category.name)}
                  className={`cursor-pointer rounded-small border px-3 py-2 text-[12px] font-bold transition ${
                    selectedCategory === category.name
                      ? 'border-primary bg-primary text-gray-0'
                      : 'border-gray-2 bg-gray-0 text-gray-5 hover:border-primary'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-[20px] font-medium text-gray-3">
                음식점 목록을 불러오는 중입니다.
              </p>
            </div>
          ) : restaurants.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-[20px] font-medium text-gray-3">
                표시할 음식점이 없습니다.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 dt:grid-cols-4 dt:gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => handleRestaurantClick(restaurant)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {isDetailLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
          <div className="rounded-modal bg-gray-0 px-8 py-6 text-[20px] font-bold text-gray-5">
            메뉴를 불러오는 중입니다.
          </div>
        </div>
      )}

      <MenuModal
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
      />
    </div>
  )
}

export default Main