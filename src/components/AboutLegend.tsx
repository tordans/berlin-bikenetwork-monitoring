import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { $searchParams, type SearchParams } from './store'
import { twJoin } from 'tailwind-merge'

export type LegendFokusType = undefined | 'hvs' | 'ergaenzungsnetz' | 'rsv' | 'vorrangnetz'

const legendItems = [
  {
    name: 'Vorrangnetz',
    filterKey: 'Vorrangnetz',
    color: '#db1e2a',
    borderColor: 'transparent',
    lineWidth: 5,
  },
  {
    name: 'Ergänzungsnetz',
    filterKey: 'Ergänzungsnetz',
    color: '#f7801e',
    borderColor: 'transparent',
    lineWidth: 3,
  },
  {
    name: 'Radverkehrsanlagen an Hauptstraßen nach § 43 MobG',
    filterKey: 'HVS',
    color: '#db2ac3',
    borderColor: 'transparent',
    lineWidth: 3,
  },
  {
    name: 'Radschnellverbindungen (RSV)',
    filterKey: 'RSV',
    color: '#ff6011',
    borderColor: '#000000',
    lineWidth: 6,
  },
]

export const AboutLegend = () => {
  const params = useStore($searchParams)
  // TODO: I really don't get why we need this but something prevents the rerendering of the buttons so the active state is wrong. Did not find any AstroJS Docs on this. And we are doing what we are supposed to do with nanostores.
  const [fokus, setFokus] = useState<SearchParams['fokus']>(undefined)

  // Initialize URL with filter=none
  useEffect(() => {
    setFokus((params?.fokus as SearchParams['fokus']) || undefined)
  }, [])

  return (
    <>
      <h2 className="font-display mt-8">Legende</h2>
      <ul>
        {legendItems.map((item) => {
          return (
            <li key={item.name}>
              <button
                className={twJoin(
                  'flex gap-2 items-center text-sm hover:text-ccBlue-600 text-left leading-tight py-1',
                  fokus === item.filterKey ? 'font-bold text-ccBlue-600' : 'font-normal',
                )}
                onClick={() => {
                  if (fokus === item.filterKey) {
                    delete params.fokus
                    $searchParams.open({ ...params })
                    setFokus(undefined)
                  } else {
                    $searchParams.open({ ...params, ...{ fokus: item.filterKey } })
                    setFokus(item.filterKey as any)
                  }
                  window.location.reload()
                }}
              >
                <div
                  className="rounded-full w-4 h-2 border border-transparent flex-none"
                  style={{ backgroundColor: item.color, borderColor: item.borderColor }}
                />
                {item.name}
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
