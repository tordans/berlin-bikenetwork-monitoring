import type { categoryFilters } from '../categoryFilters.const'

export type StatusKey = 'alles' | 'umgesetzt' | 'teilweise'
export const stats = {
  alles: {
    rsv: 145.5,
    vorrangnetz: 769.9,
    ergaenzungsnetz: 1492.7,
    hvs: 293.0,
    alle: 2700.9,
  },
  umgesetzt: {
    rsv: 1.8,
    vorrangnetz: 27.7,
    ergaenzungsnetz: 21.1,
    hvs: 5.7,
    alle: 56.3,
  },
  teilweise: {
    rsv: 9.9,
    vorrangnetz: 82.3,
    ergaenzungsnetz: 67.4,
    hvs: 24.0,
    alle: 183.6,
  },
} satisfies Record<StatusKey, Record<keyof typeof categoryFilters, number>>
