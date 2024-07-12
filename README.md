# Changing Cities Radnetz Berlin Monitoring Microsite

A microsite that shows the bike network monitoring by changing cities on an interactive map.

## Learn more

https://changing-cities.org/kampagnen/das-ist-kein/

## Develpment

This Projects uses AstroJS with interactive React Components. The Maps are build using ReactMapGl. The styling is done using Tailwind CSS. State is stored in the URL with nanostores.

## Data update

- Map data: pmtiles are using the static data system from https://github.com/FixMyBerlin/atlas-app/ which provides us with a pmtile URL
- Update date in [Map/MapSourceMonitoring.tsx](./src/components/Map/MapSourceMonitoring.tsx)
- Numbers need to be updated in [Map/FilterStatus.tsx](./src/components/Map/FilterStatus.tsx)
