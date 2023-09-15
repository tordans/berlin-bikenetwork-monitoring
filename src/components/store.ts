import { createSearchParams } from '@nanostores/router'
import type { LegendFokusType } from './AboutLegend'
import { atom } from 'nanostores'
import type { MapGeoJSONFeature } from 'react-map-gl/maplibre'

export type SearchParams = {
  anzeige: 'alles' | 'wesentliche' | 'teilweise'
  ueber: 'offen' | undefined
  fokus: LegendFokusType
}

export const $searchParams = createSearchParams()

export const $mapLoaded = atom(false)
export const $clickedMapData = atom<MapGeoJSONFeature[] | undefined>(undefined)
