import { Map } from './components/Map/Map.tsx'
import { Overlay } from './components/Map/Overlay.tsx'

export const App = () => {
  return (
    <main className="relative flex">
      <div className="relative h-screen w-full">
        <Map />
        <Overlay />
      </div>
    </main>
  )
}
