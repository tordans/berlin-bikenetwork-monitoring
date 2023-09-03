import { createSearchParams } from '@nanostores/router'
import type { LegendFokusType } from './AboutLegend'
import { atom } from 'nanostores'

export type SearchParams = {
  anzeige: 'alles' | 'wesentliche' | 'teilweise'
  ueber: 'offen' | undefined
  fokus: LegendFokusType
}

export const $searchParams = createSearchParams()

export const $mapLoaded = atom(false)
