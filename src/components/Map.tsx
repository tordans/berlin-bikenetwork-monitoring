import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Protocol } from 'pmtiles'
import React, { useEffect, useState } from 'react'
import ReactMapGl, { Layer, Source } from 'react-map-gl/maplibre'

export const Map: React.FC = () => {
  useEffect(() => {
    let protocol = new Protocol()
    maplibregl.addProtocol('pmtiles', protocol.tile)
    return () => {
      maplibregl.removeProtocol('pmtiles')
    }
  }, [])

  return (
    <div>
      <ReactMapGl
        initialViewState={{
          longitude: 13.390386527027175,
          latitude: 52.5180225850377,
          zoom: 12,
        }}
        style={{ width: 600, height: 400 }}
        // Style: https://cloud.maptiler.com/maps/dataviz/
        mapStyle="https://api.maptiler.com/maps/dataviz/style.json?key=ur6Yh3ULc6QjatOYBgln"
        hash
      >
        <Source
          type="vector"
          url="pmtiles://https://atlas-tiles.s3.eu-central-1.amazonaws.com/changing-cities-radnetz-monitoring.pmtiles"
          attribution="© Geoportal Berlin/Radverkehrsnetz, GB infraVelo GmbH/Radschnellverbindungen, Changing Cities/Monitoring zum Radverkehrsnetz"
        >
          <Layer
            id="changing-cities-radnetz-monitoring"
            type="line"
            source="changing-cities-radnetz-monitoring"
            source-layer="default"
            paint={{
              'line-color': '#000',
              'line-width': 2,
            }}
          />
        </Source>
      </ReactMapGl>
    </div>
  )
}
