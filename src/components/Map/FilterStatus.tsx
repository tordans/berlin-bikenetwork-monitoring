import { useStore } from '@nanostores/react'
import { twJoin } from 'tailwind-merge'
import { $category, $status } from '../store'

export type StatusKey = 'alles' | 'wesentliche' | 'teilweise'

export const FilterStatus = () => {
  const status = useStore($status)
  const category = useStore($category)

  const baseKm = 2698
  const buttons: { name: string; key: StatusKey; km: number }[] = [
    { name: 'Zielnetz', key: 'alles', km: baseKm },
    {
      name: 'Umgesetzt',
      key: 'wesentliche',
      km: 26.8,
    },
    { name: 'Teilweise umgesetzt', key: 'teilweise', km: 113 },
  ]

  return (
    <nav className="mt-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2">
        {buttons.map((button) => {
          return (
            <button
              key={button.key}
              className={twJoin(
                'rounded px-2 py-1 font-regular ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-ccOrange-600',
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
      <div>
        {buttons
          .filter((button) => status === button.key)
          .map((button) => {
            const percent = Number(button.km / baseKm).toLocaleString(undefined, {
              style: 'percent',
              minimumFractionDigits: 2,
            })

            return (
              <div key={button.key} className="mt-3 font-semibold text-center leading-8">
                <p>
                  {category === 'alle' ? (
                    <>
                      Umgesetzt sind{' '}
                      <span className="py-0.5 px-1.5 rounded bg-ccGray-200 font-medium text-ccOrange-600">
                        {button.km.toLocaleString(undefined, { minimumFractionDigits: 1 })} km
                      </span>
                    </>
                  ) : (
                    <>&nbsp;</>
                  )}
                </p>

                <p>
                  {button.km !== baseKm && category === 'alle' ? (
                    <>
                      Das sind{' '}
                      <span className="py-0.5 px-1.5 rounded bg-ccGray-200 font-medium text-ccOrange-600">
                        {percent}
                      </span>{' '}
                      der Ziellänge.
                    </>
                  ) : (
                    <> &nbsp;</>
                  )}
                </p>
              </div>
            )
          })}
      </div>
    </nav>
  )
}
