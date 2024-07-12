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
    <nav className="mt-1 sm:mt-4">
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-2 md:gap-3">
        {statusFilters.map((button) => {
          return (
            <button
              key={button.key}
              className={twJoin(
                'font-regular rounded px-2 py-1 ring-1 ring-inset ring-gray-300 focus:shadow focus:outline-none',
                status === button.key
                  ? 'pointer-events-none bg-ccBlue2024-900 text-white'
                  : 'border-ccOrange2024-600 text-ccOrange2024-600 cursor-pointer border hover:bg-ccGray-100',
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
              <div key={button.key} className="mt-2 text-center font-medium leading-8">
                <p>
                  Länge{' '}
                  <span className="text-ccOrange2024-600 ml-2 inline-block min-w-max rounded bg-ccGray-200 px-1.5 font-semibold sm:min-w-36">
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
                        <span className="text-ccOrange2024-600 ml-2 inline-block min-w-max rounded bg-ccGray-200 px-1.5 font-semibold sm:min-w-36">
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
                      <span className="text-ccOrange2024-600 ml-2 inline-block min-w-max rounded bg-ccGray-200 px-1.5 font-semibold sm:min-w-36">
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
