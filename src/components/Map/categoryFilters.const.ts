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

export type CategoryKey = keyof typeof categoryFilters
