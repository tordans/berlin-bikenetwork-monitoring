import { useStore } from '@nanostores/react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Protocol } from 'pmtiles'
import { useEffect } from 'react'
import ReactMapGl, { Layer, Source } from 'react-map-gl/maplibre'
import { essentialFilterWithStyleFilter, partialFilterWithStyleFilter } from './filters'
import { layers } from './layers'
import { $searchParams, type SearchParams } from './stores/searchParams'

export const Map = () => {
  useEffect(() => {
    let protocol = new Protocol()
    maplibregl.addProtocol('pmtiles', protocol.tile)
    return () => {
      maplibregl.removeProtocol('pmtiles')
    }
  }, [])

  const params = useStore($searchParams) as SearchParams

  return (
    <ReactMapGl
      initialViewState={{
        longitude: 13.390386527027175,
        latitude: 52.5180225850377,
        zoom: 12,
      }}
      style={{ width: '100%', height: '100%' }}
      // Style: https://cloud.maptiler.com/maps/dataviz/
      mapStyle="https://api.maptiler.com/maps/dataviz/style.json?key=ur6Yh3ULc6QjatOYBgln"
      hash
    >
      <Source
        type="vector"
        url="pmtiles://https://atlas-tiles.s3.eu-central-1.amazonaws.com/changing-cities-radnetz-monitoring.pmtiles"
        attribution="© Geoportal Berlin/Radverkehrsnetz, GB infraVelo GmbH/Radschnellverbindungen, Changing Cities/Monitoring zum Radverkehrsnetz"
      >
        {layers.map((layer) => {
          let filter = layer.filter
          if (params?.filter === 'wesentliche') {
            filter = essentialFilterWithStyleFilter(layer.filter) as any
          }
          if (params?.filter === 'teilweise') {
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
    </ReactMapGl>
  )
}
