import { useStore } from '@nanostores/react'
import { twJoin } from 'tailwind-merge'
import { $category, $status } from '../store'
import { categoryFilters } from './FilterCategories'
import { FilterStatusExplainer } from './FilterStatusExplainer'

export type StatusKey = 'alles' | 'umgesetzt' | 'teilweise'
const stats = {
  alles: {
    alle: 2_698.5,
    rsv: 143.8,
    vorrangnetz: 766.1,
    ergaenzungsnetz: 1_482.7,
    hvs: 306.0,
  },
  umgesetzt: {
    alle: 32.7,
    rsv: 0.5,
    vorrangnetz: 16.1,
    ergaenzungsnetz: 14.3,
    hvs: 1.7,
  },
  teilweise: {
    alle: 135.7,
    rsv: 7.5,
    vorrangnetz: 59.1,
    ergaenzungsnetz: 51.2,
    hvs: 17.9,
  },
} satisfies Record<StatusKey, Record<keyof typeof categoryFilters, number>>

export const statusFilters: { name: string; key: StatusKey; explainer: string | undefined }[] = [
  { name: 'Ziel 2030', key: 'alles', explainer: undefined },
  {
    name: 'Umgesetzt',
    key: 'umgesetzt',
    explainer:
      'Radverkehrsanlagen, die auf einem hohen Qualitätsniveau erneuert wurden und die baulichen Standards erfüllen.',
  },
  {
    name: 'Teilweise umgesetzt',
    key: 'teilweise',
    explainer:
      'Radverkehrsanlagen, die mindestens auf einem niedrigen Qualitätsniveau erneuert wurden, teilweise aber Standards nicht erfüllen oder lückenhaft sind.',
  },
]

export const FilterStatus = () => {
  const status = useStore($status)
  const category = useStore($category)

  return (
    <nav className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2">
        {statusFilters.map((button) => {
          return (
            <button
              key={button.key}
              className={twJoin(
                'rounded px-2 py-1 font-regular ring-1 ring-inset ring-gray-300 focus:outline-none focus:shadow',
                status === button.key
                  ? 'bg-ccBlue-600 text-white pointer-events-none'
                  : 'cursor-pointer hover:bg-ccGray-100 border border-ccOrange-600 text-ccOrange-600',
              )}
              onClick={() => {
                $status.set(button.key)
              }}
            >
              {button.name}
            </button>
          )
        })}
      </div>
      <section className="relative">
        <FilterStatusExplainer />

        {statusFilters
          .filter((button) => status === button.key)
          .map((button) => {
            const currentKm = stats[button.key][category]
            const totalKm = stats.alles.alle

            return (
              <div key={button.key} className="mt-2 font-medium text-center leading-8">
                <p>
                  Länge{' '}
                  <span className="px-1.5 rounded bg-ccGray-200 text-ccOrange-600 ml-2 inline-block min-w-36 font-semibold">
                    {currentKm.toLocaleString(undefined, {
                      minimumFractionDigits: 1,
                    })}{' '}
                    km
                  </span>
                </p>

                <p className="mt-2">
                  {button.key === 'alles' ? (
                    category === 'alle' ? (
                      <> &nbsp;</>
                    ) : (
                      <>
                        Anteil an Gesamt:
                        <span className="px-1.5 rounded bg-ccGray-200 text-ccOrange-600 ml-2 inline-block min-w-36 font-semibold">
                          {/* This span is a duplicate of what is below… */}
                          {Number(currentKm / totalKm).toLocaleString(undefined, {
                            style: 'percent',
                            minimumFractionDigits: 1,
                          })}
                        </span>
                      </>
                    )
                  ) : (
                    <>
                      Anteil an der Ziellänge:{' '}
                      <span className="px-1.5 rounded bg-ccGray-200 text-ccOrange-600 ml-2 inline-block min-w-36 font-semibold">
                        {Number(currentKm / totalKm).toLocaleString(undefined, {
                          style: 'percent',
                          minimumFractionDigits: 1,
                        })}
                      </span>
                    </>
                  )}
                </p>
              </div>
            )
          })}
      </section>
    </nav>
  )
}
