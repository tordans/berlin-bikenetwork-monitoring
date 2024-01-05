import { FilterCategories } from './FilterCategories'
import { FilterStatus } from './FilterStatus'

export const Overlay = () => {
  return (
    <section className="absolute bottom-10 inset-x-0 items-center justify-center flex">
      <div className="bg-white shadow-lg p-3">
        <FilterCategories />
        <FilterStatus />
      </div>
    </section>
  )
}
