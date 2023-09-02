import { createSearchParams } from '@nanostores/router'

export type SearchParams = { filter: undefined | 'wesentliche' | 'teilweise' }

export const $searchParams = createSearchParams()
