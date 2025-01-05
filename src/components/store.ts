import { atom } from 'nanostores'
import type { MapGeoJSONFeature } from 'react-map-gl/maplibre'
import type { CategoryKey } from './Map/FilterCategories'
import type { StatusKey } from './Map/FilterStatus'

export const $category = atom<CategoryKey>('alle')
export const $status = atom<StatusKey>('alles')
export const $showExplainer = atom<boolean>(false)

export const $mapLoaded = atom(false)

export const $clickedMapData = atom<MapGeoJSONFeature[] | undefined>(undefined)
