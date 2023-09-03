import { createSearchParams } from '@nanostores/router'

export type SearchParams = {
  anzeige: 'alles' | 'wesentliche' | 'teilweise'
  ueber: 'offen' | undefined
}

export const $searchParams = createSearchParams()
