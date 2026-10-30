import { addProtocol, removeProtocol, setWorkerUrl } from 'maplibre-gl'
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Protocol } from 'pmtiles'
import { useEffect } from 'react'
import { AttributionControl, NavigationControl, Map as ReactMapGlMap } from 'react-map-gl/maplibre'
import { useAppActions } from '../store'
import { MapInspector } from './MapInspector'
import { MapSourceMonitoring } from './MapSourceMonitoring'

// maplibre-gl v6 is ESM-only and derives the worker URL from its own module URL, which a bundled
// app does not have. Point it to the worker file that Vite emits.
setWorkerUrl(maplibreWorkerUrl)

export const Map = () => {
  const { setMapLoaded } = useAppActions()

  useEffect(() => {
    const protocol = new Protocol()
    addProtocol('pmtiles', protocol.tile)
    return () => {
      removeProtocol('pmtiles')
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
      // Basemap: https://openfreemap.org/ (Positron style)
      mapStyle="https://tiles.openfreemap.org/styles/positron"
      style={{ width: '100%', height: '100%' }}
      hash
      // Set map state for <MapData>:
      onLoad={() => setMapLoaded(true)}
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
