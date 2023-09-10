import * as reactmapgl from 'react-map-gl/dist/es5/exports-maplibre.js'

export const MapSourceBoundaries = () => {
  return (
    <reactmapgl.Source
      id="boundaries"
      type="vector"
      tiles={['https://tiles.radverkehrsatlas.de/public.boundaries/{z}/{x}/{y}.pbf']}
      attribution=""
    >
      <reactmapgl.Layer
        source="tarmac_boundaries"
        source-layer="public.boundaries"
        type="line"
        paint={{
          'line-color': 'hsl(323, 43%, 76%)',
          'line-opacity': 0.6,
          'line-dasharray': [2.5, 1, 1, 1],
          'line-width': 1.5,
        }}
        filter={['match', ['get', 'admin_level'], ['9', '10'], true, false]}
      />
    </reactmapgl.Source>
  )
}
