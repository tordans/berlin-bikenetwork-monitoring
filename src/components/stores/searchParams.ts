import { createSearchParams } from '@nanostores/router'
import type { LegendFokusType } from '../AboutLegend'

export type SearchParams = {
  anzeige: 'alles' | 'wesentliche' | 'teilweise'
  ueber: 'offen' | undefined
  fokus: LegendFokusType
}

export const $searchParams = createSearchParams()
