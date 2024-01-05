import { useStore } from '@nanostores/react'
import { Layer, Source } from 'react-map-gl/maplibre'
import { $category, $clickedMapData, $status } from '../store'
import { essentialFilterWithStyleFilter, partialFilterWithStyleFilter } from './filters'
import { layers } from './layers'
import { categoryFilters } from './FilterCategories'

export const MapSourceMonitoring = () => {
  const category = useStore($category)
  const status = useStore($status)
  const mapData = useStore($clickedMapData)
  const mapDataIds = mapData?.map((feature) => feature.properties?.CC_FID) ?? []
  const categoryFilter = categoryFilters[category].filterKey
    ? ['==', ['get', 'CC_Netzkategorie'], categoryFilters[category].filterKey]
    : undefined

  return (
    <Source
      id="monitoring"
      type="vector"
      url="pmtiles://https://atlas-tiles.s3.eu-central-1.amazonaws.com/changing-cities-radnetz-monitoring.pmtiles"
      attribution="© Geoportal Berlin/Radverkehrsnetz, GB infraVelo GmbH/Radschnellverbindungen, Changing Cities/Monitoring zum Radverkehrsnetz"
    >
      <Layer
        key="selected"
        source="changing-cities-radnetz-monitoring"
        source-layer="default"
        type="line"
        paint={{
          'line-color': '#125767',
          'line-width': 15,
          'line-blur': 0,
          'line-opacity': 0.9,
        }}
        filter={['in', 'CC_FID', ...mapDataIds]}
      />

      {layers.map((layer) => {
        let filter = ['all', layer.filter, categoryFilter].filter(Boolean) as any
        if (status === 'wesentliche') {
          filter = essentialFilterWithStyleFilter(layer.filter, categoryFilter) as any
        }
        if (status === 'teilweise') {
          filter = partialFilterWithStyleFilter(layer.filter, categoryFilter) as any
        }
        return (
          <Layer
            key={layer.id}
            {...(layer as any)}
            source="changing-cities-radnetz-monitoring"
            source-layer="default"
            filter={filter}
          />
        )
      })}
    </Source>
  )
}
