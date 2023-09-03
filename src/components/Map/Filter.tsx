import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { $searchParams, type SearchParams } from '../stores/searchParams'

export const Filter = () => {
  const params = useStore($searchParams)
  // TODO: I really don't get why we need this but something prevents the rerendering of the buttons so the active state is wrong. Did not find any AstroJS Docs on this. And we are doing what we are supposed to do with nanostores.
  const [selected, setSelected] = useState<SearchParams['anzeige']>('alles')

  // Initialize URL with filter=none
  useEffect(() => {
    $searchParams.open({ ...params, ...{ anzeige: params?.anzeige || 'alles' } })
    setSelected((params?.anzeige as SearchParams['anzeige']) || 'alles')
  }, [])

  const baseKm = 2698
  const buttons: { name: string; key: SearchParams['anzeige']; km: number }[] = [
    { name: 'Zielnetz', key: 'alles', km: baseKm },
    { name: 'Teilweise erfüllt', key: 'teilweise', km: 113 },
    {
      name: 'Wesentliches erfüllt',
      key: 'wesentliche',
      km: 26.8,
    },
  ]

  return (
    <nav className="absolute bottom-10 inset-x-0 items-center justify-center flex">
      <dl className="grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
        {buttons.map((button) => {
          const percent = Number(button.km / baseKm).toLocaleString(undefined, {
            style: 'percent',
            minimumFractionDigits: 2,
          })
          return (
            <button
              key={button.name}
              className={twJoin(
                'px-4 py-5 sm:p-6 text-left w-60',
                selected === button.key ? 'bg-ccGray-200' : 'cursor-pointer hover:bg-ccGray-50',
              )}
              onClick={() => {
                $searchParams.open({ ...params, ...{ anzeige: button.key } })
                setSelected(button.key)
              }}
            >
              <dt className="text-base font-normal text-gray-900">{button.name}</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-ccBlue-600">
                  {button.km.toLocaleString(undefined, { minimumFractionDigits: 1 })}
                  <span className="ml-2 text-sm font-medium text-gray-500">km</span>
                </div>

                {button.km !== baseKm && (
                  <div
                    className={twJoin(
                      'bg-ccOrange-100 text-ccOrange-800',
                      'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0',
                    )}
                  >
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                        clipRule="evenodd"
                      />
                    </svg> */}

                    <span className="sr-only">Weniger als {percent}.</span>
                    {percent}
                  </div>
                )}
              </dd>
            </button>
          )
        })}
      </dl>
    </nav>
  )
}
