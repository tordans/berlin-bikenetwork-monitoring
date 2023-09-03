import { createSearchParams } from '@nanostores/router'

export type SearchParams = { anzeige: 'alles' | 'wesentliche' | 'teilweise' }

export const $searchParams = createSearchParams()
