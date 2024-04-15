import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Protocol } from 'pmtiles'
import { useEffect } from 'react'
import { AttributionControl, NavigationControl, Map as ReactMapGlMap } from 'react-map-gl/maplibre'
import { $mapLoaded } from '../store'
import { MapInspector } from './MapInspector'
import { MapSourceMonitoring } from './MapSourceMonitoring'

export const Map = () => {
  useEffect(() => {
    const protocol = new Protocol()
    maplibregl.addProtocol('pmtiles', protocol.tile)
    return () => {
      maplibregl.removeProtocol('pmtiles')
    }
  }, [])

  // const [cursorStyle, setCursorStyle] = useState('grab')

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
      //
      // This is disabled for now
      // Handle cursor and click:
      // cursor={cursorStyle}
      // interactiveLayerIds={interactiveLayerIds}
      // onMouseEnter={() => setCursorStyle('pointer')}
      // onMouseLeave={() => setCursorStyle('grab')}
      // onClick={(event) => $clickedMapData.set(event.features)}
      //
      // Setting up mobile
      touchPitch={true}
      touchZoomRotate={false}
      scrollZoom={false}
      attributionControl={false}
      // See https://github.com/tordans/berlin-bikenetwork-monitoring/issues/1
      RTLTextPlugin={undefined}
    >
      <AttributionControl position="top-left" compact={true} />
      {/* <MapSourceBoundaries /> */}
      <MapSourceMonitoring />
      <NavigationControl showCompass={false} position="top-right" />
      <MapInspector />
      {/* <MapData /> */}
    </ReactMapGlMap>
  )
}
