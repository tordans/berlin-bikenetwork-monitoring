import { ExpressionFilterSpecification } from 'maplibre-gl'

export const interactiveLayerIds = ['RSV', 'Vorrangnetz', 'Ergänzungsnetz', 'HVS']

export const layers: Array<{
  id: string
  type: 'line'
  paint: {
    'line-color': string
    'line-width': number
  }
  filter: ExpressionFilterSpecification
}> = [
  {
    id: 'RSV',
    type: 'line',
    paint: {
      'line-color': '#000000',
      'line-width': 7,
    },
    filter: ['==', ['get', 'CC_Netzkategorie'], 'RSV'],
  },
  {
    id: 'RSV-highlight',
    type: 'line',
    paint: {
      'line-color': '#ff6011',
      'line-width': 5,
    },
    filter: ['==', ['get', 'CC_Netzkategorie'], 'RSV'],
  },
  {
    id: 'Vorrangnetz',
    type: 'line',
    paint: {
      'line-color': '#db1e2a',
      'line-width': 5,
    },
    filter: ['==', ['get', 'CC_Netzkategorie'], 'Vorrangnetz'],
  },
  {
    id: 'Ergänzungsnetz',
    type: 'line',
    paint: {
      'line-color': '#f7801e',
      'line-width': 3,
    },
    filter: ['==', ['get', 'CC_Netzkategorie'], 'Ergänzungsnetz'],
  },
  {
    id: 'HVS',
    type: 'line',
    paint: {
      'line-color': '#db2ac3',
      'line-width': 3,
    },
    filter: ['==', ['get', 'CC_Netzkategorie'], 'HVS'],
  },
]
