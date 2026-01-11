import type { StatusKey } from './stats.const'

export const statusFilters: { name: string; key: StatusKey; explainer: string | undefined }[] = [
  { name: 'Ziel 2030', key: 'alles', explainer: undefined },
  {
    name: 'Umgesetzt',
    key: 'umgesetzt',
    explainer:
      'Radverkehrsanlagen, die auf einem hohen Qualitätsniveau erneuert wurden und die baulichen Standards erfüllen.',
  },
  {
    name: 'Teilweise umgesetzt',
    key: 'teilweise',
    explainer:
      'Radverkehrsanlagen, die mindestens auf einem niedrigen Qualitätsniveau erneuert wurden, teilweise aber Standards nicht erfüllen oder lückenhaft sind.',
  },
]
