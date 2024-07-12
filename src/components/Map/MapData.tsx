import { useStore } from '@nanostores/react'
import { length } from '@turf/turf'
import { useMap } from 'react-map-gl/maplibre'
import { $mapLoaded } from '../store'

export const MapData = () => {
  const { current: mainMap } = useMap()

  const mapLoaded = useStore($mapLoaded)

  if (!mapLoaded) return null

  const features = mainMap && mainMap.getMap().queryRenderedFeatures(undefined)
  const lengthByGroup: Record<string, number> = {}
  features
    ?.filter((feature) => feature.source === 'monitoring')
    ?.forEach((feature) => {
      lengthByGroup[feature.layer.id] ||= 0
      lengthByGroup[feature.layer.id] += length(feature)
    })
  lengthByGroup['Radnetz'] = Object.values(lengthByGroup).reduce((a, b) => a + b, 0)

  // console.log('MapData:', features?.at(0), lengthByGroup)

  return null
}
