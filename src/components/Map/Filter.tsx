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

  return (
    <nav className="absolute bottom-10 inset-x-2 items-center justify-center flex ">
      <button
        onClick={() => {
          $searchParams.open({ anzeige: 'alles' })
          setSelected('alles')
        }}
        className={twJoin(
          selected === 'alles' ? 'font-bold' : '',
          'flex items-center justify-center border p-3',
        )}
      >
        Radnetz
      </button>
      <button
        onClick={() => {
          $searchParams.open({ anzeige: 'wesentliche' })
          setSelected('wesentliche')
        }}
        className={twJoin(
          selected === 'wesentliche' ? 'font-bold' : '',
          'flex items-center justify-center border p-3',
        )}
      >
        Wesentliche
      </button>
      <button
        onClick={() => {
          $searchParams.open({ anzeige: 'teilweise' })
          setSelected('teilweise')
        }}
        className={twJoin(
          selected === 'teilweise' ? 'font-bold' : '',
          'flex items-center justify-center border p-3',
        )}
      >
        Teilweise
      </button>
    </nav>
  )
}
