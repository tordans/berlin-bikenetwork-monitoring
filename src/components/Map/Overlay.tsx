import { FilterCategories } from './FilterCategories'
import { FilterStatus } from './FilterStatus'

export const Overlay = () => {
  return (
    <section className="absolute inset-x-0 bottom-2 flex items-center justify-center sm:bottom-10">
      <div className="bg-white p-3 shadow-lg">
        <FilterCategories />
        <FilterStatus />
      </div>
    </section>
  )
}
