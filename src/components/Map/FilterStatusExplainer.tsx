import { useStore } from '@nanostores/react'
import { twJoin } from 'tailwind-merge'
import { $showExplainer, $status } from '../store'
import { statusFilters } from './FilterStatus'

export const FilterStatusExplainer = () => {
  const status = useStore($status)
  const showExplainer = useStore($showExplainer)
  const explainer = statusFilters.find((s) => s.key == status)?.explainer
  if (!explainer) return null

  return (
    <>
      <button
        className={twJoin(
          'text-ccOrange2024-600 absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold hover:bg-ccGray-100 hover:shadow',
        )}
        onClick={() => $showExplainer.set(!showExplainer)}
      >
        {showExplainer ? (
          <svg
            // Close X
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fill-rule="evenodd"
              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        ) : (
          <svg
            // Question mark
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fill-rule="evenodd"
              d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-6 3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7.293 5.293a1 1 0 1 1 .99 1.667c-.459.134-1.033.566-1.033 1.29v.25a.75.75 0 1 0 1.5 0v-.115a2.5 2.5 0 1 0-2.518-4.153.75.75 0 1 0 1.061 1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        )}
        <span className="sr-only">Erklärung anzeigen</span>
      </button>
      {showExplainer ? (
        <p className="mr-8 mt-2 max-w-[30rem] text-sm leading-tight">{explainer}</p>
      ) : (
        ''
      )}
    </>
  )
}
