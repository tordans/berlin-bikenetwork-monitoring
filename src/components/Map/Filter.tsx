import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { $searchParams, type SearchParams } from './stores/searchParams'

export const Filter = () => {
  const params = useStore($searchParams)
  // TODO: I really don't get why we need this but something prevents the rerendering of the buttons so the active state is wrong. Did not find any AstroJS Docs on this. And we are doing what we are supposed to do with nanostores.
  const [selected, setSelected] = useState<SearchParams['anzeige']>('alles')

  // Initialize URL with filter=none
  useEffect(() => {
    $searchParams.open({ anzeige: params?.anzeige || 'alles' })
    setSelected((params?.anzeige as SearchParams['anzeige']) || 'alles')
  }, [])

  const buttons: { name: string; key: SearchParams['anzeige']; km: string }[] = [
    { name: 'Zielnetz', key: 'alles', km: '2.698' },
    { name: 'Teilweise', key: 'teilweise', km: '113' },
    {
      name: 'Wesentliche',
      key: 'wesentliche',
      km: '26,8',
    },
  ]

  return (
    <nav className="absolute bottom-10 inset-x-2 items-center justify-center flex ">
      {buttons.map((button) => {
        return (
          <button
            key={button.name}
            onClick={() => {
              $searchParams.open({ anzeige: button.key })
              setSelected(button.key)
            }}
            className={twJoin(
              selected === button.key ? 'font-bold' : '',
              'flex items-center justify-center border p-3',
            )}
          >
            {button.name}
            <br />
            {button.km} km
          </button>
        )
      })}
    </nav>
  )
}
