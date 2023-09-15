import { useStore } from '@nanostores/react'
import { Source, Layer } from 'react-map-gl/maplibre'
import { $clickedMapData, $searchParams, type SearchParams } from '../store'
import { essentialFilterWithStyleFilter, partialFilterWithStyleFilter } from './filters'
import { layers } from './layers'
import { Fragment } from 'react'

export const MapSourceMonitoring = () => {
  const params = useStore($searchParams) as SearchParams
  const mapData = useStore($clickedMapData)
  const mapDataIds = mapData?.map((feature) => feature.properties?.CC_FID) ?? []
  const fokusFilter = params?.fokus ? ['==', ['get', 'CC_Netzkategorie'], params.fokus] : undefined

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
