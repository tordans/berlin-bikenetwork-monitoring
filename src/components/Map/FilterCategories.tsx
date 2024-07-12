import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useStore } from '@nanostores/react'
import { Fragment } from 'react'
import { twJoin } from 'tailwind-merge'
import { $category } from '../store'

export type CategoryKey = keyof typeof categoryFilters

export const categoryFilters = {
  alle: {
    name: 'Alle Netzkategorien',
    filterKey: undefined,
    color: 'transparent',
    borderColor: 'transparent',
    lineWidth: 1,
  },
  vorrangnetz: {
    name: 'Vorrangnetz',
    filterKey: 'Vorrangnetz',
    color: '#db1e2a',
    borderColor: 'transparent',
    lineWidth: 5,
  },
  ergaenzungsnetz: {
    name: 'Ergänzungsnetz',
    filterKey: 'Ergänzungsnetz',
    color: '#f7801e',
    borderColor: 'transparent',
    lineWidth: 3,
  },
  hvs: {
    name: 'Radverkehrsanlagen an Hauptstraßen', // nach § 43 MobG
    filterKey: 'HVS',
    color: '#db2ac3',
    borderColor: 'transparent',
    lineWidth: 3,
  },
  rsv: {
    name: 'Radschnellverbindungen (RSV)',
    filterKey: 'RSV',
    color: '#ff6011',
    borderColor: '#000000',
    lineWidth: 6,
  },
} as const

export const FilterCategories = () => {
  const category = useStore($category)

  return (
    <Listbox
      value={category}
      onChange={(selected) => {
        $category.set(selected)
      }}
    >
      {({ open }) => {
        return (
          <>
            <Listbox.Label className="sr-only">Netzkategorie filtern</Listbox.Label>
            <div className="relative hidden items-center justify-center sm:mt-2 sm:flex">
              <Listbox.Button className="relative cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:shadow focus:outline-none sm:text-sm sm:leading-6">
                <span className="block truncate">{categoryFilters[category].name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 -mt-64 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {Object.entries(categoryFilters).map(([key, filter]) => (
                    <Listbox.Option
                      key={key}
                      className={({ active }) =>
                        twJoin(
                          active
                            ? 'bg-gray-100 font-semibold text-white'
                            : 'font-normal text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                        )
                      }
                      value={key}
                    >
                      {({ selected, active }) => (
                        <>
                          <div
                            className={twJoin(
                              selected ? 'text-gray-900' : 'text-gray-700',
                              'group flex items-center truncate',
                            )}
                          >
                            <div
                              className={twJoin(
                                'flex items-center gap-2 py-1 text-left text-sm leading-tight hover:text-ccBlue-600',
                                selected ? 'font-bold text-ccBlue-600' : 'font-normal',
                              )}
                            >
                              <div
                                className="h-2 w-4 flex-none rounded-full border border-transparent"
                                style={{
                                  backgroundColor: filter.color,
                                  borderColor: filter.borderColor,
                                }}
                              />
                              {filter.name}
                            </div>
                          </div>

                          {selected ? (
                            <span
                              className={twJoin(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )
      }}
    </Listbox>
  )
}
