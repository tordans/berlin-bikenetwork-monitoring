import { useStore } from '@nanostores/react'
import { Layer, Source } from 'react-map-gl/maplibre'
import { $searchParams, type SearchParams } from '../stores/searchParams'
import { essentialFilterWithStyleFilter, partialFilterWithStyleFilter } from './filters'
import { layers } from './layers'

export const MapSourceMonitoring = () => {
  const params = useStore($searchParams) as SearchParams

  return (
    <Source
      type="vector"
      url="pmtiles://https://atlas-tiles.s3.eu-central-1.amazonaws.com/changing-cities-radnetz-monitoring.pmtiles"
      attribution="© Geoportal Berlin/Radverkehrsnetz, GB infraVelo GmbH/Radschnellverbindungen, Changing Cities/Monitoring zum Radverkehrsnetz"
    >
      {layers.map((layer) => {
        let filter = layer.filter
        if (params?.anzeige === 'wesentliche') {
          filter = essentialFilterWithStyleFilter(layer.filter) as any
        }
        if (params?.anzeige === 'teilweise') {
          filter = partialFilterWithStyleFilter(layer.filter) as any
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
