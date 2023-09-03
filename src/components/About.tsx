import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import svgLogo from './assets/logo.svg'
import { $searchParams, type SearchParams } from './stores/searchParams'

export const About = () => {
  const params = useStore($searchParams)
  // TODO: I really don't get why we need this but something prevents the rerendering of the buttons so the active state is wrong. Did not find any AstroJS Docs on this. And we are doing what we are supposed to do with nanostores.
  const [open, setOpen] = useState<SearchParams['ueber']>(undefined)

  // Initialize URL with filter=none
  useEffect(() => {
    setOpen((params?.ueber as SearchParams['ueber']) || undefined)
  }, [])

  // Show open button
  if (open === undefined) {
    return (
      <nav className="absolute z-10 top-2.5 left-2.5 items-center justify-center flex">
        <button
          onClick={() => {
            $searchParams.open({ ...params, ...{ ueber: 'offen' } })
            setOpen('offen')
          }}
          className="bg-white rounded-full p-3 shadow-lg hover:bg-ccGray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Details anzeigen</span>
        </button>
        <h1
          className="mt-1.5 ml-2.5 font-normal text-xl font-display leading-[1.55rem] text-ccBlue-600 select-none"
          style={{
            textShadow: '-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white',
          }}
        >
          <div className="text-ccOrange-600">Changing Cities</div>
          Monitoring des Berliner Radnetzes
        </h1>
      </nav>
    )
  }

  return (
    <nav className="flex flex-col w-80 relative justify-between p-3">
      <button
        onClick={() => {
          delete params.ueber
          $searchParams.open({ ...params })
          setOpen(undefined)
        }}
        className="absolute z-10 top-2.5 left-2.5 bg-white rounded-full p-3 hover:shadow-lg hover:bg-ccGray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>

        <span className="sr-only">Details ausblenden</span>
      </button>
      <div className="mt-18">
        <div className="flex justify-center">
          <img src={svgLogo.src} alt="Changing Cities" className="h-20 p-0 m-0" />
        </div>
        <h1 className="mt-4 text-center font-normal text-xl font-display leading-[1.3rem] text-ccBlue-600">
          Monitoring des Berliner Radnetzes
        </h1>
        <h2 className="font-display mt-8">Legende</h2>
        <p className="text-sm">TODO</p>
        <h2 className="font-display mt-4">Details zum Monitoring</h2>
        <p className="text-sm">
          Das Monitoring berücksichtigt nur fertiggestellte Radwege seit 2018. Es betrachtet die
          baulichen Standard Breite, Führungsform, Oberlfäche und bewertet Maßnahmen zur Vermeidung
          von Konflikten mit Kfz. Die Bewertung erfolgt in den Kategorien "Erfüllt", "Teilweise
          erfüllt", "Nicht erfüllt".
        </p>
      </div>
      <div className="text-xs">
        <a href="https://changing-cities.org/impressum">Impressum</a> –{' '}
        <a href="/datenschutz">Datenschutz</a>
      </div>
    </nav>
  )
}
