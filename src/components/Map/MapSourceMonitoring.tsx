import { useStore } from '@nanostores/react'
import { Layer, Source } from 'react-map-gl/dist/es5/exports-maplibre.js'
import { $searchParams, type SearchParams } from '../store'
import { essentialFilterWithStyleFilter, partialFilterWithStyleFilter } from './filters'
import { layers } from './layers'

export const MapSourceMonitoring = () => {
  const params = useStore($searchParams) as SearchParams
  const fokusFilter = params?.fokus ? ['==', ['get', 'CC_Netzkategorie'], params.fokus] : undefined

  return (
    <Source
      id="monitoring"
      type="vector"
      url="pmtiles://https://atlas-tiles.s3.eu-central-1.amazonaws.com/changing-cities-radnetz-monitoring.pmtiles"
      attribution="© Geoportal Berlin/Radverkehrsnetz, GB infraVelo GmbH/Radschnellverbindungen, Changing Cities/Monitoring zum Radverkehrsnetz"
    >
      {layers.map((layer) => {
        let filter = ['all', layer.filter, fokusFilter].filter(Boolean) as any
        if (params?.anzeige === 'wesentliche') {
          filter = essentialFilterWithStyleFilter(layer.filter, fokusFilter) as any
        }
        if (params?.anzeige === 'teilweise') {
          filter = partialFilterWithStyleFilter(layer.filter, fokusFilter) as any
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
