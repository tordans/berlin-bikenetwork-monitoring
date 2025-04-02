import { useStore } from '@nanostores/react'
import { Layer, Source } from 'react-map-gl/maplibre'
import { $category, $clickedMapData, $status } from '../store'
import { updateDate } from './data/updateDate.const'
import { categoryFilters } from './FilterCategories'
import { essentialFilterWithStyleFilter, partialFilterWithStyleFilter } from './filters'
import { layers } from './layers'

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
      // Can be updated by @tordans
      // Data at https://github.com/FixMyBerlin/atlas-static-data/tree/main/geojson/region-berlin/changing-cities-radnetz-monitoring
      url="pmtiles://https://tilda-geo.de/api/uploads/changing-cities-radnetz-monitoring"
      attribution={`© <span class="sm:hidden">CC</span><span class="hidden sm:inline">Changing Cities</span>/Monitoring zum Radverkehrsnetz (<span class="hidden md:inline">Stand </span>${updateDate}), Geoportal Berlin/Radverkehrsnetz, GB infraVelo<span class="hidden md:inline"> GmbH</span>/Radschnellverbindungen`}
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
        if (status === 'umgesetzt') {
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
