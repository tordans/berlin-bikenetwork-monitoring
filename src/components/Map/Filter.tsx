import { useStore } from '@nanostores/react'
import { $searchParams } from './stores/searchParams'

export const Filter = () => {
  const params = useStore($searchParams)

  return (
    <nav>
      <button
        onClick={() => {
          $searchParams.open({ filter: 'wesentliche' })
        }}
        className={params?.filter === 'wesentliche' ? 'font-bold' : ''}
      >
        Wesentliche
      </button>
      <button
        onClick={() => {
          $searchParams.open({ filter: 'teilweise' })
        }}
        className={params?.filter === 'teilweise' ? 'font-bold' : ''}
      >
        Teilweise
      </button>
    </nav>
  )
}
