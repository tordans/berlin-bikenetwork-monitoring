import { useStore } from '@nanostores/react'
import React from 'react'
import { $clickedMapData } from '../store'

export const MapInspector: React.FC = () => {
  const clickedMapData = useStore($clickedMapData)

  if (!clickedMapData || !clickedMapData.length) return null

  return (
    <section className="absolute inset-y-6 right-6 w-96 rounded-lg shadow-xl overflow-y-auto bg-ccBlue-900 p-4 z-50 text-ccBlue-50">
      <button
        onClick={() => $clickedMapData.set(undefined)}
        className="absolute text-ccBlue-900 z-10 top-2.5 right-2.5 bg-white rounded-full p-1.5 hover:shadow-lg hover:bg-ccBlue-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>

        <span className="sr-only">Details ausblenden</span>
      </button>

      {clickedMapData.map((feature) => {
        return (
          <div key={feature.properties.CC_FID} className="mt-5">
            <h2 className="text-lg">{feature.properties.strassenname}</h2>
            <table>
              <tbody>
                {Object.entries(feature.properties)
                  .filter((entry) => !['strassenname', 'CC_FID'].includes(entry[0]))
                  .map(([key, value]) => {
                    return (
                      <tr key={key}>
                        <th className="text-left">{key}</th>
                        <td>{value}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        )
      })}
    </section>
  )
}
