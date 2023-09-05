import { useStore } from '@nanostores/react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import * as pmtiles from 'pmtiles'
import { useEffect, useRef } from 'react'
import { $searchParams, type SearchParams } from '../store'
import { essentialFilterWithStyleFilter, partialFilterWithStyleFilter } from './filters'
import { layers } from './layers'

export const Map = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<maplibregl.Map | null>(null)

  useEffect(() => {
    const protocol = new pmtiles.Protocol()
    maplibregl.addProtocol('pmtiles', protocol.tile)

    if (map.current) return // initialize map only once
    map.current = new maplibregl.Map({
      // @ts-expect-error
      container: mapContainer.current,
      style: 'https://api.maptiler.com/maps/dataviz/style.json?key=ur6Yh3ULc6QjatOYBgln',
      center: [13.390386527027175, 52.5180225850377],
      zoom: 12,
      hash: true,
    })

    map.current.on('load', () => {
      if (!map.current) return

      // Add sources and layers here
      map.current.addSource('boundaries', {
        type: 'vector',
        tiles: ['https://tiles.radverkehrsatlas.de/public.boundaries/{z}/{x}/{y}.pbf'],
      })

      map.current.addLayer({
        id: 'boundaries',
        type: 'line',
        source: 'boundaries',
        'source-layer': 'public.boundaries',
        paint: {
          'line-color': 'hsl(323, 43%, 76%)',
          'line-opacity': 0.6,
          'line-dasharray': [2.5, 1, 1, 1],
          'line-width': 1.5,
        },
        filter: ['match', ['get', 'admin_level'], ['9', '10'], true, false],
      })

      map.current.addSource('changing-cities-radnetz-monitoring', {
        type: 'vector',
        url: 'pmtiles://https://atlas-tiles.s3.eu-central-1.amazonaws.com/changing-cities-radnetz-monitoring.pmtiles',
        attribution:
          '© Geoportal Berlin/Radverkehrsnetz, GB infraVelo GmbH/Radschnellverbindungen, Changing Cities/Monitoring zum Radverkehrsnetz',
      })

      const fokusFilter = params?.fokus
        ? ['==', ['get', 'CC_Netzkategorie'], params.fokus]
        : undefined
      layers.forEach((layer) => {
        let filter = ['all', layer.filter, fokusFilter].filter(Boolean) as any
        if (params?.anzeige === 'wesentliche') {
          filter = essentialFilterWithStyleFilter(layer.filter, fokusFilter) as any
        }
        if (params?.anzeige === 'teilweise') {
          filter = partialFilterWithStyleFilter(layer.filter, fokusFilter) as any
        }
        map.current &&
          map.current.addLayer({
            id: layer.id,
            type: 'circle',
            ...(layer as any),
            source: 'changing-cities-radnetz-monitoring',
            'source-layer': 'default',
            filter: filter,
          })
      })

      // Add navigation control
      const nav = new maplibregl.NavigationControl({ showCompass: false })
      map.current.addControl(nav, 'top-right')
    })

    return () => {
      maplibregl.removeProtocol('pmtiles')
    }
  }, [mapContainer.current, map.current])

  const params = useStore($searchParams) as SearchParams

  if (map.current) {
    console.log('foo', params, layers)
    layers.forEach((layer) => {
      const fokusFilter = params.fokus
        ? ['==', ['get', 'CC_Netzkategorie'], params.fokus]
        : undefined
      let filter = ['all', layer.filter, fokusFilter].filter(Boolean) as any
      if (params?.anzeige === 'wesentliche') {
        filter = essentialFilterWithStyleFilter(layer.filter, fokusFilter) as any
      }
      if (params?.anzeige === 'teilweise') {
        filter = partialFilterWithStyleFilter(layer.filter, fokusFilter) as any
      }
      console.log('asdf', filter)
      // @ts-expect-error
      map.current.setFilter(layer.id, ['==', ['get', 'CC_Netzkategorie'], filter])
      console.log('foo success')
    })
    console.log('bar', params, layers)
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
