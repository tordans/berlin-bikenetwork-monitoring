import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Protocol } from 'pmtiles'
import { useEffect } from 'react'
import ReactMapGl, { NavigationControl } from 'react-map-gl/maplibre'
import { MapSourceMonitoring } from './MapSourceMonitoring'
import { $mapLoaded } from '../store'
import { MapSourceBoundaries } from './MapSourceBoundaries'

export const Map = () => {
  useEffect(() => {
    const protocol = new Protocol()
    maplibregl.addProtocol('pmtiles', protocol.tile)
    return () => {
      maplibregl.removeProtocol('pmtiles')
    }
  }, [])

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
      onLoad={() => $mapLoaded.set(true)}
      hash
    >
      <MapSourceBoundaries />
      <MapSourceMonitoring />
      <NavigationControl showCompass={false} position="top-right" />
    </ReactMapGl>
  )
}
