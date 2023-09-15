import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import * as pmtiles from 'pmtiles'
import { useEffect, useState } from 'react'
import { NavigationControl, Map as ReactMapGlMap } from 'react-map-gl/maplibre'
import { $clickedMapData, $mapLoaded } from '../store'
import { MapInspector } from './MapInspector'
import { MapSourceBoundaries } from './MapSourceBoundaries'
import { MapSourceMonitoring } from './MapSourceMonitoring'
import { interactiveLayerIds } from './layers'

export const Map = () => {
  useEffect(() => {
    const protocol = new pmtiles.Protocol()
    maplibregl.addProtocol('pmtiles', protocol.tile)
    return () => {
      maplibregl.removeProtocol('pmtiles')
    }
  }, [])

  const [cursorStyle, setCursorStyle] = useState('grab')

  return (
    <ReactMapGlMap
      initialViewState={{
        longitude: 13.390386527027175,
        latitude: 52.5180225850377,
        zoom: 12,
      }}
      // Style: https://cloud.maptiler.com/maps/dataviz/
      mapStyle="https://api.maptiler.com/maps/dataviz/style.json?key=ur6Yh3ULc6QjatOYBgln"
      style={{ width: '100%', height: '100%' }}
      hash
      // Set map state for <MapData>:
      onLoad={() => $mapLoaded.set(true)}
      // Handle cursor and click:
      interactiveLayerIds={interactiveLayerIds}
      cursor={cursorStyle}
      onMouseEnter={() => setCursorStyle('pointer')}
      onMouseLeave={() => setCursorStyle('grab')}
      onClick={(event) => $clickedMapData.set(event.features)}
    >
      <MapSourceBoundaries />
      <MapSourceMonitoring />
      <NavigationControl showCompass={false} position="top-right" />
      <MapInspector />
      {/* <MapData /> */}
    </ReactMapGlMap>
  )
}
