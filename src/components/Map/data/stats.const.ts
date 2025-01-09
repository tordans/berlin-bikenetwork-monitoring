import type { categoryFilters } from '../FilterCategories'

export type StatusKey = 'alles' | 'umgesetzt' | 'teilweise'
export const stats = {
  alles: {
    rsv: 143.8,
    vorrangnetz: 770.0,
    ergaenzungsnetz: 1493.5,
    hvs: 293.3,
    alle: 2700.6,
  },
  umgesetzt: {
    rsv: 0.8,
    vorrangnetz: 23.2,
    ergaenzungsnetz: 18.7,
    hvs: 4.3,
    alle: 47.1,
  },
  teilweise: {
    rsv: 8.2,
    vorrangnetz: 70.6,
    ergaenzungsnetz: 59.8,
    hvs: 19.9,
    alle: 158.4,
  },
} satisfies Record<StatusKey, Record<keyof typeof categoryFilters, number>>
