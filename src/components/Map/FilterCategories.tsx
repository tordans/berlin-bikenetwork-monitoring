import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { twJoin } from 'tailwind-merge'
import { useAppActions, useCategory } from '../store'
import { categoryFilters } from './categoryFilters.const'

export const FilterCategories = () => {
  const category = useCategory()
  const { setCategory } = useAppActions()

  return (
    <Listbox value={category} onChange={setCategory}>
      {({ open }) => {
        return (
          <>
            <h3 className="sr-only">Netzkategorie filtern</h3>
            <div className="relative hidden items-center justify-center sm:mt-2 sm:flex">
              <ListboxButton className="relative cursor-default rounded-md bg-white py-1.5 pr-10 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset focus:shadow focus:outline-none sm:text-sm sm:leading-6">
                <span className="block truncate">{categoryFilters[category].name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions className="ring-opacity-5 absolute z-10 -mt-64 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm">
                  {Object.entries(categoryFilters).map(([key, filter]) => (
                    <ListboxOption
                      key={key}
                      className={({ focus }) =>
                        twJoin(
                          focus
                            ? 'bg-gray-100 font-semibold text-white'
                            : 'font-normal text-gray-900',
                          'relative cursor-default py-2 pr-9 pl-3 select-none',
                        )
                      }
                      value={key}
                    >
                      {({ selected, focus }) => (
                        <>
                          <div
                            className={twJoin(
                              selected ? 'text-gray-900' : 'text-gray-700',
                              'group flex items-center truncate',
                            )}
                          >
                            <div
                              className={twJoin(
                                'hover:text-ccBlue-900 flex items-center gap-2 py-1 text-left text-sm leading-tight',
                                selected ? 'text-ccBlue-900 font-bold' : 'font-normal',
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
                                focus ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </>
        )
      }}
    </Listbox>
  )
}
