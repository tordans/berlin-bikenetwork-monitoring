import { FilterCategories } from './FilterCategories'
import { FilterStatus } from './FilterStatus'

export const Overlay = () => {
  return (
    <section className="absolute bottom-10 inset-x-0 items-center justify-center flex">
      <div className="bg-white relative group shadow-lg p-3">
        <FilterCategories />
        <FilterStatus />
        <p className="absolute bottom-2 left-3 text-xs group-hover:text-gray-500 transition-opacity text-gray-300">
          Stand 31.12.2023
        </p>
      </div>
    </section>
  )
}
