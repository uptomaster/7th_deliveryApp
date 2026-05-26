import Navbar from '../components/common/Navbar'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import { restaurants } from '../data/restaurants'

function Main() {
  return (
    <div className="min-h-screen bg-gray-1">
      <Navbar />
      <main className="mx-auto max-w-[1725px] px-5 py-10 dt:px-10">
        <section>
          <h2 className="mb-6 text-[24px] font-bold text-gray-5">인기 맛집 총집합</h2>
          <div className="grid grid-cols-1 gap-5 dt:grid-cols-4 dt:gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
export default Main