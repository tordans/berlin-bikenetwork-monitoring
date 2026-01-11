import { ExpressionFilterSpecification } from 'maplibre-gl'
import { Layer, Source } from 'react-map-gl/maplibre'
import { useCategory, useClickedMapData, useStatus } from '../store'
import { categoryFilters } from './categoryFilters.const'
import { updateDate } from './data/updateDate.const'
import { essentialFilterWithStyleFilter, partialFilterWithStyleFilter } from './filters'
import { layers } from './layers'

export const MapSourceMonitoring = () => {
  const category = useCategory()
  const status = useStatus()
  const mapData = useClickedMapData()
  const mapDataIds = mapData?.map((feature) => feature.properties?.CC_FID) ?? []
  const categoryFilter = categoryFilters[category].filterKey
    ? ([
        '==',
        ['get', 'CC_Netzkategorie'],
        categoryFilters[category].filterKey,
      ] satisfies ExpressionFilterSpecification)
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
        let filter: ExpressionFilterSpecification = categoryFilter
          ? ['all', layer.filter, categoryFilter]
          : ['all', layer.filter]
        if (status === 'umgesetzt') {
          filter = essentialFilterWithStyleFilter(layer.filter, categoryFilter)
        }
        if (status === 'teilweise') {
          filter = partialFilterWithStyleFilter(layer.filter, categoryFilter)
        }
        return (
          <Layer
            key={layer.id}
            {...layer}
            source="changing-cities-radnetz-monitoring"
            source-layer="default"
            filter={filter}
          />
        )
      })}
    </Source>
  )
}
