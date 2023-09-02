import { useStore } from '@nanostores/react'
import { $searchParams } from './stores/searchParams'
import { twJoin } from 'tailwind-merge'

export const Filter = () => {
  const params = useStore($searchParams)

  return (
    <nav>
      <button
        onClick={() => {
          $searchParams.open({})
        }}
        className={twJoin(
          params?.filter === undefined ? 'font-bold' : '',
          'flex items-center justify-center border p-3',
        )}
      >
        Radnetz
      </button>
      <button
        onClick={() => {
          $searchParams.open({ filter: 'wesentliche' })
        }}
        className={twJoin(
          params?.filter === 'wesentliche' ? 'font-bold' : '',
          'flex items-center justify-center border p-3',
        )}
      >
        Wesentliche
      </button>
      <button
        onClick={() => {
          $searchParams.open({ filter: 'teilweise' })
        }}
        className={twJoin(
          params?.filter === 'teilweise' ? 'font-bold' : '',
          'flex items-center justify-center border p-3',
        )}
      >
        Teilweise
      </button>
    </nav>
  )
}
