import type { MapGeoJSONFeature } from 'react-map-gl/maplibre'
import { create } from 'zustand'
import type { CategoryKey } from './Map/categoryFilters.const'
import type { StatusKey } from './Map/data/stats.const'

type AppState = {
  category: CategoryKey
  status: StatusKey
  showExplainer: boolean
  mapLoaded: boolean
  clickedMapData: MapGeoJSONFeature[] | undefined

  actions: {
    setCategory: (category: CategoryKey) => void
    setStatus: (status: StatusKey) => void
    setShowExplainer: (show: boolean) => void
    toggleShowExplainer: () => void
    setMapLoaded: (loaded: boolean) => void
    setClickedMapData: (data: MapGeoJSONFeature[] | undefined) => void
  }
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  category: 'alle',
  status: 'alles',
  showExplainer: false,
  mapLoaded: false,
  clickedMapData: undefined,

  // Actions namespace
  actions: {
    setCategory: (category: CategoryKey) => set({ category }),
    setStatus: (status: StatusKey) => set({ status }),
    setShowExplainer: (show: boolean) => set({ showExplainer: show }),
    toggleShowExplainer: () => set((state: AppState) => ({ showExplainer: !state.showExplainer })),
    setMapLoaded: (loaded: boolean) => set({ mapLoaded: loaded }),
    setClickedMapData: (data: MapGeoJSONFeature[] | undefined) => set({ clickedMapData: data }),
  },
}))

export const useCategory = (): CategoryKey => useAppStore((state: AppState) => state.category)
export const useStatus = (): StatusKey => useAppStore((state: AppState) => state.status)
export const useShowExplainer = () => useAppStore((state: AppState) => state.showExplainer)
export const useMapLoaded = () => useAppStore((state: AppState) => state.mapLoaded)
export const useClickedMapData = () => useAppStore((state: AppState) => state.clickedMapData)

export const useAppActions = () => useAppStore((state: AppState) => state.actions)
