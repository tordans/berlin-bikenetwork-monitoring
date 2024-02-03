import { Source, Layer } from 'react-map-gl/maplibre'

export const MapSourceBoundaries = () => {
  return (
    <Source
      id="boundaries"
      type="vector"
      tiles={['https://tiles.radverkehrsatlas.de/boundaries/{z}/{x}/{y}']}
      attribution=""
    >
      <Layer
        source="atlas_boundaries"
        source-layer="boundaries"
        type="line"
        paint={{
          'line-color': 'hsl(323, 43%, 40%)',
          'line-opacity': 0.9,
          'line-dasharray': [2.5, 1, 1, 1],
          'line-width': 1.5,
        }}
        filter={['match', ['get', 'admin_level'], [9, 10], true, false]}
      />
    </Source>
  )
}
