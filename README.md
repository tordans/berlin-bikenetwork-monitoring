# Changing Cities Radnetz Berlin Monitoring Microsite

A microsite that shows the bike network monitoring by changing cities on an interactive map.

## Learn more

https://changing-cities.org/kampagnen/das-ist-kein/

## Development

Built with Vite + React. Maps use ReactMapGl. Styling with Tailwind CSS. State management with Zustand.

## Data update

- Map data: pmtiles are using the static data system from https://github.com/FixMyBerlin/atlas-app/ which provides us with a pmtile URL
- Update date in [data/updateDate.const.ts](./src/components/Map/data/updateDate.const.ts)
- Update stats in [data/stats.const.ts](./src/components/Map/data/stats.const.ts)
