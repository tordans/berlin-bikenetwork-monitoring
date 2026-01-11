import { ExpressionFilterSpecification } from 'maplibre-gl'

export const essentialFilterWithStyleFilter = (
  filter: ExpressionFilterSpecification,
  fokusFilter: ExpressionFilterSpecification | undefined,
) => {
  /*
    // QGIS:
    "CC_Netzkategorie" is not null and
    "Monitor_JahrLetzteErneuerung">=2018 and
    "Monitor_Breite" IN ("E", "U") and
    "Monitor_Führungsform" IN ("E", "U") and
    "Monitor_Oberfläche" IN ("E", "U") AND
    "Monitor_KfzStörungVermeiden" IN ("E", "U")
    */
  return [
    'all',
    filter,
    fokusFilter ?? true,
    ['!=', ['get', 'CC_Netzkategorie'], null],
    ['>=', ['get', 'Monitor_JahrLetzteErneuerung'], 2018],
    ['in', ['get', 'Monitor_Breite'], ['literal', ['E', 'U']]],
    ['in', ['get', 'Monitor_Führungsform'], ['literal', ['E', 'U']]],
    ['in', ['get', 'Monitor_Oberfläche'], ['literal', ['E', 'U']]],
    ['in', ['get', 'Monitor_KfzStörungVermeiden'], ['literal', ['E', 'U']]],
  ] satisfies ExpressionFilterSpecification
}

export const partialFilterWithStyleFilter = (
  filter: ExpressionFilterSpecification,
  fokusFilter: ExpressionFilterSpecification | undefined,
) => {
  /*
    // QGIS:
    "CC_Netzkategorie" is not null and
    "Monitor_JahrLetzteErneuerung">=2018 and
    (
      "Monitor_Breite" IN ("E", "T", "U") or
      "Monitor_Führungsform" IN ("E", "T", "U") or
      "Monitor_Oberfläche" IN ("E", "T", "U") or
      "Monitor_KfzStörungVermeiden" IN ("E", "T", "U")
    )
    */
  return [
    'all',
    filter,
    fokusFilter ?? true,
    ['!=', ['get', 'CC_Netzkategorie'], null],
    ['>=', ['get', 'Monitor_JahrLetzteErneuerung'], 2018],
    [
      'any',
      ['in', ['get', 'Monitor_Breite'], ['literal', ['E', 'T', 'U']]],
      ['in', ['get', 'Monitor_Führungsform'], ['literal', ['E', 'T', 'U']]],
      ['in', ['get', 'Monitor_Oberfläche'], ['literal', ['E', 'T', 'U']]],
      ['in', ['get', 'Monitor_KfzStörungVermeiden'], ['literal', ['E', 'T', 'U']]],
    ],
  ] satisfies ExpressionFilterSpecification
}
